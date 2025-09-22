/**
 * エラーモーダル管理用カスタムフック
 * アプリ全体のエラー表示を統一管理
 */

import { useState, useCallback } from "react";
import { ErrorModalData, ErrorModalHook, ErrorType } from "@/types";

export function useErrorModal(): ErrorModalHook {
  const [errors, setErrors] = useState<ErrorModalData[]>([]);

  /**
   * 汎用エラー表示
   */
  const showError = useCallback((error: Omit<ErrorModalData, "id" | "timestamp">) => {
    const newError: ErrorModalData = {
      ...error,
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };

    setErrors(prev => [...prev, newError]);
  }, []);

  /**
   * シンプルなエラー表示
   */
  const showSimpleError = useCallback((message: string, title?: string) => {
    showError({
      type: "error",
      title: title || "エラーが発生しました",
      message,
    });
  }, [showError]);

  /**
   * 警告表示
   */
  const showWarning = useCallback((message: string, title?: string) => {
    showError({
      type: "warning", 
      title: title || "警告",
      message,
    });
  }, [showError]);

  /**
   * 成功メッセージ表示
   */
  const showSuccess = useCallback((message: string, title?: string) => {
    showError({
      type: "success",
      title: title || "成功",
      message,
    });
  }, [showError]);

  /**
   * 特定のエラーを削除
   */
  const dismissError = useCallback((id: string) => {
    setErrors(prev => prev.filter(error => error.id !== id));
  }, []);

  /**
   * 全エラーをクリア
   */
  const clearAllErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return {
    errors,
    showError,
    showSimpleError,
    showWarning,
    showSuccess,
    dismissError,
    clearAllErrors,
  };
}

/**
 * API エラーレスポンスを解析してユーザーフレンドリーなメッセージに変換
 */
export function parseApiError(error: any): { title: string; message: string; details?: string } {
  // ネットワークエラー
  if (!navigator.onLine) {
    return {
      title: "接続エラー",
      message: "インターネット接続を確認してください。",
    };
  }

  // HTTPエラー
  if (error.status) {
    switch (error.status) {
      case 400:
        return {
          title: "入力エラー",
          message: error.error || "入力内容を確認してください。",
          details: `Status: ${error.status}`,
        };
      case 401:
        return {
          title: "認証エラー",
          message: "認証が必要です。ページを再読み込みしてください。",
          details: `Status: ${error.status}`,
        };
      case 403:
        return {
          title: "アクセス拒否",
          message: "この操作を実行する権限がありません。",
          details: `Status: ${error.status}`,
        };
      case 404:
        return {
          title: "リソースが見つかりません",
          message: "要求されたリソースが存在しません。",
          details: `Status: ${error.status}`,
        };
      case 429:
        return {
          title: "レート制限",
          message: "リクエストが多すぎます。しばらく待ってから再試行してください。",
          details: `Status: ${error.status}`,
        };
      case 500:
        return {
          title: "サーバーエラー",
          message: "サーバーで問題が発生しました。しばらく待ってから再試行してください。",
          details: `Status: ${error.status}`,
        };
      default:
        return {
          title: "エラーが発生しました",
          message: error.error || "予期しないエラーが発生しました。",
          details: `Status: ${error.status}`,
        };
    }
  }

  // 一般的なエラー
  if (error.message) {
    return {
      title: "エラーが発生しました",
      message: error.message,
      details: error.stack ? `${error.name}: ${error.message}` : undefined,
    };
  }

  // フォールバック
  return {
    title: "不明なエラー",
    message: "予期しないエラーが発生しました。ページを再読み込みしてください。",
    details: JSON.stringify(error, null, 2),
  };
}
