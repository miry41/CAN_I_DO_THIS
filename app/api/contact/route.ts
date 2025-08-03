import { NextRequest, NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';
import { sanitizeInput, validateUrl, strictSanitizeInput } from '@/lib/utils';
import { checkRateLimit } from '@/lib/rate-limit';

// セキュリティヘッダーを追加する関数
function addSecurityHeaders(response: NextResponse) {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  return response;
}

export async function POST(request: NextRequest) {
  try {
    // レート制限チェック
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    if (!checkRateLimit(clientIP, 3, 300000)) { // 5分間に3回まで
      const response = NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
      return addSecurityHeaders(response);
    }
    
    const { name, email, subject, message } = await request.json();

    // バリデーション
    if (!name || !email || !subject || !message) {
      const response = NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
      return addSecurityHeaders(response);
    }

    // 厳格な入力サニタイゼーション
    const sanitizedName = strictSanitizeInput(name);
    const sanitizedSubject = strictSanitizeInput(subject);
    const sanitizedMessage = strictSanitizeInput(message);

    // 追加のバリデーション
    if (sanitizedName.length < 1 || sanitizedName.length > 100) {
      const response = NextResponse.json(
        { error: 'Name must be between 1 and 100 characters' },
        { status: 400 }
      );
      return addSecurityHeaders(response);
    }

    if (sanitizedSubject.length < 1 || sanitizedSubject.length > 200) {
      const response = NextResponse.json(
        { error: 'Subject must be between 1 and 200 characters' },
        { status: 400 }
      );
      return addSecurityHeaders(response);
    }

    if (sanitizedMessage.length < 1 || sanitizedMessage.length > 2000) {
      const response = NextResponse.json(
        { error: 'Message must be between 1 and 2000 characters' },
        { status: 400 }
      );
      return addSecurityHeaders(response);
    }

    // メールアドレスの形式チェック（より厳格）
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      const response = NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
      return addSecurityHeaders(response);
    }

    // 環境変数の確認
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email configuration:', {
        EMAIL_USER: process.env.EMAIL_USER ? 'set' : 'missing',
        EMAIL_PASS: process.env.EMAIL_PASS ? 'set' : 'missing'
      });
      const response = NextResponse.json(
        { error: 'Email configuration is missing. Please check EMAIL_USER and EMAIL_PASS environment variables.' },
        { status: 500 }
      );
      return addSecurityHeaders(response);
    }

    // メール送信の設定
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1. 管理者宛のメール（管理者Gmailから管理者Gmailへ）
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `[CAN_I_DO_THIS?? Contact] ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">New Contact Form Submission</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${sanitizedSubject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #4f46e5;">
              ${sanitizedMessage.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="font-size: 12px; color: #64748b; text-align: center; margin-top: 30px;">
            <p>This message was sent from the CAN_I_DO_THIS?? contact form.</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    // 2. 利用者宛の確認メール
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `[CAN_I_DO_THIS??] お問い合わせを受け付けました`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">お問い合わせを受け付けました</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>${sanitizedName} 様</p>
            <p>CAN_I_DO_THIS?? のお問い合わせフォームから送信された以下の内容を受け付けました。</p>
            <p>内容を確認の上、担当者より回答いたします。</p>
          </div>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <h3 style="color: #1e293b; margin-top: 0;">お問い合わせ内容</h3>
            <p><strong>件名:</strong> ${sanitizedSubject}</p>
            <p><strong>メッセージ:</strong></p>
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 4px; border-left: 4px solid #4f46e5; margin-top: 10px;">
              ${sanitizedMessage.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
            <h4 style="color: #0c4a6e; margin-top: 0;">ご注意</h4>
            <ul style="color: #0c4a6e; margin: 10px 0; padding-left: 20px;">
              <li>このメールは自動送信されています</li>
              <li>返信はできませんのでご了承ください</li>
              <li>お急ぎの場合は、再度お問い合わせフォームをご利用ください</li>
            </ul>
          </div>
          
          <div style="font-size: 12px; color: #64748b; text-align: center; margin-top: 30px;">
            <p>送信日時: ${new Date().toLocaleString('ja-JP')}</p>
            <p>CAN_I_DO_THIS?? - AI-powered problem analyzer</p>
          </div>
        </div>
      `,
    };

    // 両方のメールを送信
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    const response = NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
    return addSecurityHeaders(response);
  } catch (error) {
    console.error('Contact form error:', error);
    
    // より詳細なエラー情報を返す
    let errorMessage = 'Failed to send message';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    const response = NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
    return addSecurityHeaders(response);
  }
} 