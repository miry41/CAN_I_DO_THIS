/**
 * 解析用プロンプトテンプレートとビルダー関数
 */

import { PromptInputContent } from "@/types";
import { getPromptConfig } from "./config";

/**
 * 解析用プロンプトテンプレート
 */
export const ANALYSIS_PROMPT_TEMPLATE = {
  systemInstruction: `
あなたは問題解析の専門家です。
与えられた問題を分析し、解決に必要な知識を構造化して提示することが得意です。
回答は必ずJSON形式で返してください。
`,

  userPromptTemplate: `
以下の問題を分析して、解決に必要な知識をJSON形式で返してください。

問題内容:
{inputContent}

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

注意事項:
- 問題の難易度は「初級」「中級」「上級」のいずれかで判定してください
- 学習時間は現実的な期間を設定してください（例：「2-4週間」「1-3ヶ月」）
- 学習パスは論理的な順序で構成してください
- リソースは具体的で実用的なものを提案してください
`,

  fallbackPrompt: `
問題を分析しましたが、詳細な情報が不足しています。
一般的な問題解決アプローチを提示します。

{
  "problem": "問題解決のアプローチ",
  "knowledgeMap": {
    "core_concepts": ["問題分析", "解決策の検討", "実装計画"],
    "prerequisites": ["基本的な分析スキル"],
    "difficulty_level": "中級",
    "estimated_time": "2-4週間",
    "learning_path": [
      {
        "step": 1,
        "topic": "問題の理解",
        "description": "問題の本質を把握し、要件を整理する",
        "resources": ["問題解決フレームワーク", "要件定義手法"]
      }
    ]
  },
  "dependencies": [
    {
      "from": "問題の理解",
      "to": "解決策の検討",
      "relationship": "prerequisite"
    }
  ]
}
`,
};

/**
 * 入力内容に基づいてプロンプト用のコンテンツを生成
 */
export function buildInputContent(data: PromptInputContent): string {
  let inputContent = "";

  if (data.text) {
    inputContent += `テキスト: ${data.text}\n`;
  }

  if (data.hasImage) {
    inputContent += `画像: [画像データが提供されています]\n`;
  }

  if (!inputContent.trim()) {
    inputContent = "詳細な情報が提供されていません。一般的なアプローチを提示してください。";
  }

  return inputContent.trim();
}

/**
 * 解析用プロンプトを構築
 */
export function buildAnalysisPrompt(data: PromptInputContent): string {
  const inputContent = buildInputContent(data);
  
  return ANALYSIS_PROMPT_TEMPLATE.userPromptTemplate.replace(
    "{inputContent}",
    inputContent
  );
}

/**
 * フォールバック用プロンプトを取得
 */
export function getFallbackPrompt(): string {
  return ANALYSIS_PROMPT_TEMPLATE.fallbackPrompt;
}

/**
 * システム指示を取得
 */
export function getSystemInstruction(): string {
  return ANALYSIS_PROMPT_TEMPLATE.systemInstruction;
}

/**
 * プロンプト設定（設定ファイルから取得）
 */
export const ANALYSIS_PROMPT_CONFIG = getPromptConfig("analysis");
