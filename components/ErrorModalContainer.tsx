/**
 * エラーモーダルコンテナ
 * 複数のエラーモーダルを管理・表示
 */

"use client";

import ErrorModal from "./ErrorModal";
import { ErrorModalData } from "@/types";

interface ErrorModalContainerProps {
  errors: ErrorModalData[];
  onDismiss: (id: string) => void;
}

export default function ErrorModalContainer({
  errors,
  onDismiss,
}: ErrorModalContainerProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {errors.map((error, index) => (
        <div
          key={error.id}
          className="pointer-events-auto"
          style={{
            zIndex: 50 + index, // 複数のモーダルが重ならないように
          }}
        >
          <ErrorModal error={error} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
}
