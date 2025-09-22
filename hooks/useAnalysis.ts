/**
 * 解析処理用カスタムフック
 * AI解析のデータ処理、API呼び出し、結果保存を提供
 */

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnalyzeData, AnalysisHook } from "@/types";
import { useFileConverter } from "./useFileConverter";

export function useAnalysis(): AnalysisHook {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { convertFileToStructured } = useFileConverter();

  /**
   * データを解析してAPI呼び出し
   */
  const analyzeData = useCallback(async (data: AnalyzeData): Promise<void> => {
    setIsAnalyzing(true);
    setError(null);

    try {
      let imageData = null;
      let fileType = null;

      // 画像データの処理
      if (data.image) {
        if (typeof data.image === "string") {
          try {
            // FileInputからのJSONデータをパース
            const parsedImageData = JSON.parse(data.image);
            imageData = parsedImageData;
            fileType = "structured";
          } catch (parseError) {
            // パースに失敗した場合は、従来の base64 文字列として扱う
            imageData = data.image;
            fileType = "base64";
          }
        } else if (data.image instanceof File) {
          // Fileオブジェクトの場合はbase64に変換
          try {
            imageData = await convertFileToStructured(data.image);
            fileType = "structured";
          } catch (conversionError) {
            console.error("Error converting file to base64:", conversionError);
            const errorMsg = "ファイルの変換に失敗しました";
            setError(errorMsg);
            throw new Error(errorMsg);
          }
        }
      }

      // GEMINI APIを呼び出し
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: data.text,
          image: imageData,
          fileType: fileType,
        }),
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const result = await response.json();

      // 結果をsessionStorageに保存
      sessionStorage.setItem(
        "analysisData",
        JSON.stringify({
          text: data.text,
          hasImage: !!imageData,
          timestamp: Date.now(),
          result: result, // GEMINI APIの結果も保存
        })
      );

      setIsAnalyzing(false);
      router.push("/result");
    } catch (analysisError) {
      console.error("Analysis failed:", analysisError);
      setIsAnalyzing(false);
      
      const errorMsg = analysisError instanceof Error 
        ? analysisError.message 
        : "解析に失敗しました。もう一度お試しください。";
      
      setError(errorMsg);
      throw analysisError;
    }
  }, [router, convertFileToStructured]);

  return {
    isAnalyzing,
    analyzeData,
    error,
  };
}
