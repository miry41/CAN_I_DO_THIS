import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { sanitizeInput, truncateText, strictSanitizeInput, sanitizeJsonData } from '@/lib/utils';
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

// 動的レンダリングを強制する
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log('API route called');
    
    // レート制限チェック
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    if (!checkRateLimit(clientIP, 5, 60000)) { // 1分間に5回まで
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    const { text, image, fileType } = await request.json();
    console.log('Request data:', { text, hasImage: !!image, fileType });

    // 厳格な入力サニタイゼーションとバリデーション
    const sanitizedText = strictSanitizeInput(text || '');

    // テキスト長の制限
    if (sanitizedText.length > 5000) {
      return NextResponse.json(
        { error: 'Text is too long. Maximum 5000 characters allowed.' },
        { status: 400 }
      );
    }


    
    // GEMINI APIキーを環境変数から取得
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      console.log('GEMINI_API_KEY is not configured');
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured' },
        { status: 500 }
      );
    }

    // 入力内容を整理（サニタイズ済み）
    let inputContent = '';
    if (sanitizedText) inputContent += `Text: ${sanitizedText}\n`;
    if (image) inputContent += `Image: [Image data provided]\n`;

    // GEMINI APIに送信するプロンプト（サニタイズ済み）
    const prompt = `
以下の問題を分析して、解決に必要な知識をJSON形式で返してください。

問題内容:
${inputContent}

以下の形式でJSONを返してください:
{
  "problem": "問題の要約",
  "knowledgeMap": {
    "core_concepts": ["必要な核心概念1", "必要な核心概念2"],
    "prerequisites": ["前提知識1", "前提知識2"],
    "difficulty_level": "初級/中級/上級",
    "estimated_time": "推定学習時間",
    "learning_path": [
      {
        "step": 1,
        "topic": "学習トピック",
        "description": "説明",
        "resources": ["リソース1", "リソース2"]
      }
    ]
  },
  "dependencies": [
    {
      "from": "前提項目",
      "to": "依存項目", 
      "relationship": "prerequisite"
    }
  ]
}
`;

    // GEMINI APIを呼び出し
    console.log('Calling GEMINI API...');
    console.log('Has image:', !!image, 'FileType:', fileType);
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    let response;
    
    try {
      
      if (image) {
        let imagePart;
        
        if (fileType === 'structured' && typeof image === 'object') {
          // 構造化されたファイルデータの場合
          console.log('Processing structured image data, mimeType:', image.mimeType);
          imagePart = {
            inlineData: {
              data: image.data,
              mimeType: image.mimeType || "image/jpeg",
            },
          };
        } else if (fileType === 'base64' && typeof image === 'string') {
          // 従来のbase64文字列の場合
          console.log('Processing base64 string data');
          imagePart = {
            inlineData: {
              data: image,
              mimeType: "image/jpeg", // デフォルト
            },
          };
        }
        
        if (imagePart) {
          console.log('Sending multimodal request');
          response = await model.generateContent([prompt, imagePart]);
        } else {
          console.log('No valid image part, sending text only');
          response = await model.generateContent(prompt);
        }
      } else {
        // テキストのみの場合
        console.log('Sending text-only request');
        response = await model.generateContent(prompt);
      }
    } catch (apiError) {
      console.error('GEMINI API call error:', apiError);
      const response = NextResponse.json(
        { error: 'AI service error. Please try again later.' },
        { status: 503 }
      );
      return addSecurityHeaders(response);
    }
    console.log('GEMINI API response received');
    
    if (!response || !response.response) {
      console.error('GEMINI API Error: No response');
      const response = NextResponse.json(
        { error: 'AI service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
      return addSecurityHeaders(response);
    }
    
    // GEMINIの応答からJSONを抽出
    let geminiResponse;
    try {
      geminiResponse = response.response.text();
      console.log('Gemini response text length:', geminiResponse.length);
    } catch (textError) {
      console.error('Error extracting response text:', textError);
      const response = NextResponse.json(
        { error: 'AI service response error. Please try again later.' },
        { status: 503 }
      );
      return addSecurityHeaders(response);
    }
    
    // JSON部分を抽出（```json と ``` で囲まれた部分）
    const jsonMatch = geminiResponse.match(/```json\s*([\s\S]*?)\s*```/);
    let result;
    
    if (jsonMatch) {
      try {
        const parsedResult = JSON.parse(jsonMatch[1]);
        // 結果をサニタイズ
        result = sanitizeJsonData(parsedResult);
      } catch (e) {
        console.error('Failed to parse JSON from GEMINI response');
        result = createSafeFallbackResult(sanitizedText);
      }
    } else {
      // JSONが見つからない場合は、応答全体をパースしてみる
      try {
        const parsedResult = JSON.parse(geminiResponse);
        result = sanitizeJsonData(parsedResult);
      } catch (e) {
        // パースに失敗した場合は、安全なフォールバックデータを返す
        result = createSafeFallbackResult(sanitizedText);
      }
    }

    const response = NextResponse.json(result);
    return addSecurityHeaders(response);
    
  } catch (error) {
    console.error('Analysis error:', error);
    const response = NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
    return addSecurityHeaders(response);
  }
}

// 安全なフォールバック結果を生成
function createSafeFallbackResult(text: string) {
  return {
    problem: text || "Uploaded content analysis",
    knowledgeMap: {
      core_concepts: ["Problem analysis", "Research skills"],
      prerequisites: ["Basic analytical skills"],
      difficulty_level: "Intermediate",
      estimated_time: "2-4 weeks",
      learning_path: [
        {
          step: 1,
          topic: "Problem Analysis",
          description: "Analyze the problem structure",
          resources: ["Problem-solving frameworks"]
        }
      ]
    },
    dependencies: [
      { from: "Problem Analysis", to: "Solution Development", relationship: "prerequisite" }
    ]
  };
} 