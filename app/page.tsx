"use client";

import Header from "@/components/Header";
import InputTabs from "@/components/InputTabs";
import BannerAd from "@/components/BannerAd";
import LoadingOverlay from "@/components/LoadingOverlay";
import { MobileLayout, MobileContainer } from "@/components/mobile";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnalyzeData, FileData, AnalyzeApiRequest } from "@/types";

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          // データURLからbase64部分のみを抽出
          const base64 = reader.result.split(",")[1];
          resolve(base64);
        } else {
          reject(new Error("Failed to convert file to base64"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAnalyze = async (data: AnalyzeData) => {
    setIsAnalyzing(true);

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
          } catch (error) {
            // パースに失敗した場合は、従来の base64 文字列として扱う
            imageData = data.image;
            fileType = "base64";
          }
        } else if (data.image instanceof File) {
          // Fileオブジェクトの場合はbase64に変換
          try {
            const base64 = await convertFileToBase64(data.image);
            imageData = {
              data: base64,
              mimeType: data.image.type,
              name: data.image.name,
            };
            fileType = "structured";
          } catch (error) {
            console.error("Error converting file to base64:", error);
            throw new Error("ファイルの変換に失敗しました");
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
    } catch (error) {
      console.error("Analysis failed:", error);
      setIsAnalyzing(false);
      // エラーハンドリング（後で実装）
      alert("解析に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-hidden flex flex-col">
        <MobileLayout>
          <MobileContainer>
            <div className="text-center bg-white rounded-2xl">
              <h3 className="truncate text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                What problem do you want to solve?
              </h3>
            </div>
            <InputTabs onAnalyze={handleAnalyze} />
          </MobileContainer>
        </MobileLayout>
      </main>
      <BannerAd />
      {isAnalyzing && <LoadingOverlay />}
    </div>
  );
}
