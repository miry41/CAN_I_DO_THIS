import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

// 動的レンダリングを強制する
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log('API route called');
    const { text, image, url } = await request.json();
    console.log('Request data:', { text, image, url });
    
    // GEMINI APIキーをハードコーディング
    const apiKey = process.env.GEMINI_API_KEY;// ここに実際のAPIキーを入力
    
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      console.log('GEMINI_API_KEY is not configured');
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured' },
        { status: 500 }
      );
    }

    // 入力内容を整理
    let inputContent = '';
    if (text) inputContent += `Text: ${text}\n`;
    if (url) inputContent += `URL: ${url}\n`;
    if (image) inputContent += `Image: [Image data provided]\n`;

    // GEMINI APIに送信するプロンプト
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
      result = JSON.parse(jsonMatch[1]);
    } else {
      // JSONが見つからない場合は、応答全体をパースしてみる
      try {
        result = JSON.parse(geminiResponse);
      } catch (e) {
        // パースに失敗した場合は、モックデータを返す
        result = {
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