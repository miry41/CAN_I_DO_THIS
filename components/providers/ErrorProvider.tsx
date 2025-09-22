/**
 * エラープロバイダー
 * アプリ全体のエラー管理を提供
 */

"use client";

import { createContext, useContext, ReactNode } from "react";
import ErrorModalContainer from "@/components/ErrorModalContainer";
import { useErrorModal } from "@/hooks";
import { ErrorModalHook } from "@/types";

const ErrorContext = createContext<ErrorModalHook | null>(null);

interface ErrorProviderProps {
  children: ReactNode;
}

export function ErrorProvider({ children }: ErrorProviderProps) {
  const errorModal = useErrorModal();

  return (
    <ErrorContext.Provider value={errorModal}>
      {children}
      <ErrorModalContainer
        errors={errorModal.errors}
        onDismiss={errorModal.dismissError}
      />
    </ErrorContext.Provider>
  );
}

/**
 * エラーコンテキストを使用するフック
 */
export function useError(): ErrorModalHook {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
}
