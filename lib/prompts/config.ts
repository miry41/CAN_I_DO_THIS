/**
 * プロンプト設定管理
 * 各種プロンプトの設定値を集約管理
 */

export const PROMPT_CONFIGS = {
  // 解析用プロンプト設定
  analysis: {
    model: "gemini-1.5-pro",
    temperature: 0.7,
    maxTokens: 4000,
    responseFormat: "json" as const,
    timeoutMs: 30000,
  },

  // 将来的な拡張用
  validation: {
    model: "gemini-1.5-flash",
    temperature: 0.3,
    maxTokens: 1000,
    responseFormat: "text" as const,
    timeoutMs: 10000,
  },

  // システム共通設定
  system: {
    retryCount: 3,
    retryDelayMs: 1000,
    fallbackEnabled: true,
    debugMode: process.env.NODE_ENV === "development",
  },
} as const;

/**
 * 環境変数から設定を上書き
 */
export function getPromptConfig(type: keyof typeof PROMPT_CONFIGS) {
  const baseConfig = PROMPT_CONFIGS[type];
  
  // 環境変数による上書き（必要に応じて）
  if (type === "analysis") {
    return {
      ...baseConfig,
      model: process.env.GEMINI_MODEL || baseConfig.model,
      temperature: process.env.GEMINI_TEMPERATURE 
        ? parseFloat(process.env.GEMINI_TEMPERATURE) 
        : baseConfig.temperature,
    };
  }
  
  return baseConfig;
}
