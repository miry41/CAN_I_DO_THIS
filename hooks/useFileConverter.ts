/**
 * ファイル変換用カスタムフック
 * Base64変換や構造化データ変換を提供
 */

import { useState, useCallback } from "react";
import { FileData, FileConverterHook } from "@/types";

export function useFileConverter(): FileConverterHook {
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * ファイルをBase64文字列に変換
   */
  const convertToBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      setIsConverting(true);
      setError(null);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        setIsConverting(false);
        if (typeof reader.result === "string") {
          // データURLからbase64部分のみを抽出
          const base64 = reader.result.split(",")[1];
          resolve(base64);
        } else {
          const errorMsg = "Failed to convert file to base64";
          setError(errorMsg);
          reject(new Error(errorMsg));
        }
      };

      reader.onerror = (error) => {
        setIsConverting(false);
        const errorMsg = "FileReader error occurred";
        setError(errorMsg);
        reject(error);
      };
    });
  }, []);

  /**
   * ファイルを構造化データに変換
   */
  const convertFileToStructured = useCallback(async (file: File): Promise<FileData> => {
    try {
      const base64 = await convertToBase64(file);
      return {
        data: base64,
        mimeType: file.type,
        name: file.name,
      };
    } catch (error) {
      const errorMsg = `Failed to convert file ${file.name} to structured data`;
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, [convertToBase64]);

  return {
    convertToBase64,
    convertFileToStructured,
    isConverting,
    error,
  };
}
