import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { sanitizeInput, truncateText, strictSanitizeInput, sanitizeJsonData } from '@/lib/utils';
import { checkRateLimit } from '@/lib/rate-limit';
import { AnalyzeApiRequest, AnalysisResult, PromptInputContent } from '@/types';
import { 
  buildAnalysisPrompt, 
  getFallbackPrompt, 
  ANALYSIS_PROMPT_CONFIG 
} from '@/lib/prompts';

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
    
    const { text, image, fileType }: AnalyzeApiRequest = await request.json();
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
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured' },
        { status: 500 }
      );
    }

    // プロンプト用の入力データを準備
    const promptInput: PromptInputContent = {
      text: sanitizedText,
      hasImage: !!image,
    };

    // プロンプトを生成
    const prompt = buildAnalysisPrompt(promptInput);

    // GEMINI APIを呼び出し
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: ANALYSIS_PROMPT_CONFIG.model });
    
    let geminiApiResponse;
    
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
          geminiApiResponse = await model.generateContent([prompt, imagePart]);
        } else {
          geminiApiResponse = await model.generateContent(prompt);
        }
      } else {
        // テキストのみの場合
        geminiApiResponse = await model.generateContent(prompt);
      }
    } catch (_) {
      const errorResponse = NextResponse.json(
        { error: 'AI service error. Please try again later.' },
        { status: 503 }
      );
      return addSecurityHeaders(errorResponse);
    }
    
    if (!geminiApiResponse || !geminiApiResponse.response) {
      const errorResponse = NextResponse.json(
        { error: 'AI service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
      return addSecurityHeaders(errorResponse);
    }
    
    // GEMINIの応答からJSONを抽出
    let geminiResponse;
    try {
      // Google Generative AIライブラリの正しい構造: response.response.text()
      geminiResponse = geminiApiResponse.response.text();
      console.log('Gemini response text length:', geminiResponse.length);
    } catch (textError) {
      console.error('Error extracting response text:', textError);
      const errorResponse = NextResponse.json(
        { error: 'AI service response error. Please try again later.' },
        { status: 503 }
      );
      return addSecurityHeaders(errorResponse);
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

    const finalResponse = NextResponse.json(result);
    return addSecurityHeaders(finalResponse);
    
  } catch (error) {
    console.error('Analysis error:', error);
    const errorResponse = NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
    return addSecurityHeaders(errorResponse);
  }
}

// 安全なフォールバック結果を生成
function createSafeFallbackResult(text: string): AnalysisResult {
  try {
    // フォールバックプロンプトからJSONを解析して返す
    const fallbackPromptJson = getFallbackPrompt();
    return JSON.parse(fallbackPromptJson);
  } catch (error) {
    // JSONパースに失敗した場合のハードコードされたフォールバック
    return {
      problem: text || "アップロードされたコンテンツの解析",
      knowledgeMap: {
        core_concepts: ["問題分析", "リサーチスキル"],
        prerequisites: ["基本的な分析スキル"],
        difficulty_level: "中級",
        estimated_time: "2-4週間",
        learning_path: [
          {
            step: 1,
            topic: "問題分析",
            description: "問題の構造を分析する",
            resources: ["問題解決フレームワーク"]
          }
        ]
      },
      dependencies: [
        { 
          from: "問題分析", 
          to: "解決策の開発", 
          relationship: "prerequisite" 
        }
      ]
    };
  }
} 