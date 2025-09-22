/**
 * ドラッグ&ドロップ処理用カスタムフック
 * ファイルのドラッグ&ドロップ機能を提供
 */

import { useState, useCallback } from "react";
import { DragAndDropHook, ValidMimeType } from "@/types";

interface UseDragAndDropOptions {
  onDrop: (files: FileList) => void;
  acceptedTypes?: ValidMimeType[];
  maxFileSize?: number; // bytes
  onError?: (error: string) => void;
}

export function useDragAndDrop({
  onDrop,
  acceptedTypes,
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  onError,
}: UseDragAndDropOptions): DragAndDropHook {
  const [dragActive, setDragActive] = useState(false);

  /**
   * ファイルタイプの検証
   */
  const isValidFileType = useCallback((file: File): boolean => {
    if (!acceptedTypes || acceptedTypes.length === 0) {
      return true; // 制限なしの場合は全て許可
    }
    return acceptedTypes.includes(file.type as ValidMimeType);
  }, [acceptedTypes]);

  /**
   * ファイルサイズの検証
   */
  const isValidFileSize = useCallback((file: File): boolean => {
    return file.size <= maxFileSize;
  }, [maxFileSize]);

  /**
   * ドラッグイベントハンドラー
   */
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  /**
   * ドロップイベントハンドラー
   */
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    
    if (!files || files.length === 0) {
      return;
    }

    // ファイル検証
    const file = files[0];
    
    if (!isValidFileType(file)) {
      const error = `サポートされていないファイル形式です。許可された形式: ${acceptedTypes?.join(", ")}`;
      onError?.(error);
      return;
    }

    if (!isValidFileSize(file)) {
      const error = `ファイルサイズが大きすぎます。最大サイズ: ${Math.round(maxFileSize / (1024 * 1024))}MB`;
      onError?.(error);
      return;
    }

    // 検証通過後にコールバック実行
    onDrop(files);
  }, [onDrop, isValidFileType, isValidFileSize, acceptedTypes, maxFileSize, onError]);

  return {
    dragActive,
    handleDrag,
    handleDrop,
  };
}
