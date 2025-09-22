/**
 * プロンプト管理モジュール
 * 各種プロンプトテンプレートと関連関数をエクスポート
 */

// 解析用プロンプト
export {
  ANALYSIS_PROMPT_TEMPLATE,
  ANALYSIS_PROMPT_CONFIG,
  buildAnalysisPrompt,
  buildInputContent,
  getFallbackPrompt,
  getSystemInstruction,
} from "./analysis";

// 設定管理
export {
  PROMPT_CONFIGS,
  getPromptConfig,
} from "./config";

// 将来的に他のプロンプトも追加予定
// export { CONTACT_PROMPT_TEMPLATE } from "./contact";
// export { VALIDATION_PROMPT_TEMPLATE } from "./validation";
