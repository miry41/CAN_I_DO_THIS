"use client";

import Header from "@/components/Header";
import InputTabs from "@/components/InputTabs";
import BannerAd from "@/components/BannerAd";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  const handleAnalyze = async (data: {
    text: string;
    image: File | null;
    url: string;
  }) => {
    setIsAnalyzing(true);

    try {
      // GEMINI APIを呼び出し
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: data.text,
          url: data.url,
          image: data.image ? "image_provided" : null, // 画像データは後で実装
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
          url: data.url,
          hasImage: !!data.image,
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
        <div className="flex-1 overflow-y-auto px-4 py-8 pb-safe">
          <div className="max-w-2xl mx-auto">
            <div className="text-center bg-white rounded-2xl">
              <h3 className="truncate text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                What problem do you want to solve?
              </h3>
            </div>
            <InputTabs onAnalyze={handleAnalyze} />
          </div>
        </div>
      </main>
      <BannerAd />
      {isAnalyzing && <LoadingOverlay />}
    </div>
  );
}
