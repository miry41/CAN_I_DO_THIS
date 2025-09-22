/**
 * エラーモーダルコンポーネント
 * 統一されたエラー表示UI
 */

"use client";

import { useEffect } from "react";
import { X, AlertCircle, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { ErrorModalData, ErrorType } from "@/types";

interface ErrorModalProps {
  error: ErrorModalData;
  onDismiss: (id: string) => void;
}

export default function ErrorModal({ error, onDismiss }: ErrorModalProps) {
  // 自動消去タイマー（成功メッセージのみ）
  useEffect(() => {
    if (error.type === "success") {
      const timer = setTimeout(() => {
        onDismiss(error.id);
      }, 4000); // 4秒後に自動消去

      return () => clearTimeout(timer);
    }
  }, [error.id, error.type, onDismiss]);

  const getIconAndColors = (type: ErrorType) => {
    switch (type) {
      case "error":
        return {
          icon: <AlertCircle className="w-6 h-6" />,
          iconColor: "text-red-500",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          titleColor: "text-red-900",
          messageColor: "text-red-800",
          buttonColor: "bg-red-500 hover:bg-red-600",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-6 h-6" />,
          iconColor: "text-yellow-500",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          titleColor: "text-yellow-900",
          messageColor: "text-yellow-800",
          buttonColor: "bg-yellow-500 hover:bg-yellow-600",
        };
      case "info":
        return {
          icon: <Info className="w-6 h-6" />,
          iconColor: "text-blue-500",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          titleColor: "text-blue-900",
          messageColor: "text-blue-800",
          buttonColor: "bg-blue-500 hover:bg-blue-600",
        };
      case "success":
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          iconColor: "text-green-500",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          titleColor: "text-green-900",
          messageColor: "text-green-800",
          buttonColor: "bg-green-500 hover:bg-green-600",
        };
      default:
        return {
          icon: <AlertCircle className="w-6 h-6" />,
          iconColor: "text-gray-500",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          titleColor: "text-gray-900",
          messageColor: "text-gray-800",
          buttonColor: "bg-gray-500 hover:bg-gray-600",
        };
    }
  };

  const {
    icon,
    iconColor,
    bgColor,
    borderColor,
    titleColor,
    messageColor,
    buttonColor,
  } = getIconAndColors(error.type);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-md mx-auto ${bgColor} ${borderColor} border-2 rounded-2xl shadow-2xl transform transition-all duration-300 animate-in slide-in-from-bottom-4`}
      >
        {/* ヘッダー */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-center space-x-3">
            <div className={iconColor}>{icon}</div>
            <h2 className={`text-lg font-bold ${titleColor}`}>{error.title}</h2>
          </div>
          <button
            onClick={() => onDismiss(error.id)}
            className="p-1 rounded-full hover:bg-white/50 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* メッセージ本文 */}
        <div className="px-6 pb-4">
          <p className={`text-sm leading-relaxed ${messageColor}`}>
            {error.message}
          </p>

          {error.details && (
            <div className="mt-3 p-3 bg-white/60 rounded-lg">
              <p className="text-xs text-gray-600 font-mono">{error.details}</p>
            </div>
          )}
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col gap-2 p-6 pt-0">
          {error.actions && error.actions.length > 0 ? (
            <div className="flex flex-col sm:flex-row gap-2">
              {error.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    action.action();
                    onDismiss(error.id);
                  }}
                  className={`flex-1 px-4 py-2 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
                    action.variant === "danger"
                      ? "bg-red-500 hover:bg-red-600"
                      : action.variant === "secondary"
                      ? "bg-gray-500 hover:bg-gray-600"
                      : buttonColor
                  }`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => onDismiss(error.id)}
              className={`w-full px-4 py-2 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${buttonColor}`}
            >
              OK
            </button>
          )}
        </div>

        {/* タイムスタンプ（デバッグ用） */}
        {process.env.NODE_ENV === "development" && (
          <div className="px-6 pb-3">
            <p className="text-xs text-gray-400">
              {new Date(error.timestamp).toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
