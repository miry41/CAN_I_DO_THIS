import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import { sanitizeInput, validateUrl, truncateText, strictSanitizeInput, sanitizeJsonData } from '@/lib/utils';
import { checkRateLimit } from '@/lib/rate-limit';

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
    
    const { text, image, url } = await request.json();
    console.log('Request data:', { text, image, url });

    // 厳格な入力サニタイゼーションとバリデーション
    const sanitizedText = strictSanitizeInput(text || '');
    const sanitizedUrl = url ? strictSanitizeInput(url) : '';

    // テキスト長の制限
    if (sanitizedText.length > 5000) {
      return NextResponse.json(
        { error: 'Text is too long. Maximum 5000 characters allowed.' },
        { status: 400 }
      );
    }

    // URLの検証
    if (sanitizedUrl && !validateUrl(sanitizedUrl)) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
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
    if (sanitizedUrl) inputContent += `URL: ${sanitizedUrl}\n`;
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
    
    const ai = new GoogleGenAI({ apiKey });
    const model = ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: prompt,
    });
    
    const response = await model;
    console.log('GEMINI API response received');
    
    if (!response || !response.text) {
      console.error('GEMINI API Error: No response or text');
      return NextResponse.json(
        { error: 'Failed to get response from GEMINI API' },
        { status: 500 }
      );
    }
    
    // GEMINIの応答からJSONを抽出
    const geminiResponse = response.text;
    
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

    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
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