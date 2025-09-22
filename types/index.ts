/**
 * 共通型定義ファイル
 * プロジェクト全体で使用される型を定義
 */

// ===========================================
// 解析結果関連の型定義
// ===========================================

export interface LearningPathStep {
  step: number;
  topic: string;
  description: string;
  resources: string[];
}

export interface KnowledgeMap {
  core_concepts: string[];
  prerequisites: string[];
  difficulty_level: string;
  estimated_time: string;
  learning_path: LearningPathStep[];
}

export interface Dependency {
  from: string;
  to: string;
  relationship: string;
}

export interface AnalysisResult {
  problem: string;
  knowledgeMap: KnowledgeMap;
  dependencies: Dependency[];
}

// ===========================================
// 入力・フォーム関連の型定義
// ===========================================

export interface FileData {
  data: string;
  mimeType: string;
  name: string;
}

export interface AnalyzeData {
  text: string;
  image: File | string | null;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ===========================================
// API関連の型定義
// ===========================================

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  error: string;
  status?: number;
}

export interface AnalyzeApiRequest {
  text: string;
  image?: FileData | string;
  fileType?: 'structured' | 'base64';
}

export interface ContactApiRequest extends ContactFormData {}

// ===========================================
// UI・状態関連の型定義
// ===========================================

export type TabType = "text" | "file";

export type SubmitStatus = "idle" | "success" | "error";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

// ===========================================
// モバイル関連の型定義
// ===========================================

export interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
  logoSrc?: string;
  logoAlt?: string;
}

export interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
}

// ===========================================
// コンポーネントProps関連の型定義
// ===========================================

export interface AnalyzeCallback {
  (data: AnalyzeData): void;
}

export interface InputFormProps {
  onAnalyze: AnalyzeCallback;
}

export interface ResultCardProps {
  result: AnalysisResult;
}

export interface KnowledgeGraphProps {
  dependencies: Dependency[];
}

// ===========================================
// セッションストレージ関連の型定義
// ===========================================

export interface SessionAnalysisData {
  text: string;
  hasImage: boolean;
  timestamp: number;
  result?: AnalysisResult;
}

// ===========================================
// レート制限関連の型定義
// ===========================================

export interface RateLimitInfo {
  remaining: number;
  resetTime: number;
}

export interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// ===========================================
// プロンプト関連の型定義
// ===========================================

export interface PromptInputContent {
  text?: string;
  hasImage?: boolean;
}

export interface PromptTemplate {
  system: string;
  user: string;
}

export interface PromptConfig {
  responseFormat: "json" | "text";
  maxTokens?: number;
  temperature?: number;
}

// ===========================================
// ユーティリティ型定義
// ===========================================

export type ValidMimeType = 
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/webp"
  | "text/plain"
  | "application/pdf";

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

export interface FormField {
  name: string;
  value: string;
  rules?: ValidationRule;
  error?: string;
}
