"use client";

import Header from "@/components/Header";
import InputTabs from "@/components/InputTabs";
import BannerAd from "@/components/BannerAd";
import LoadingOverlay from "@/components/LoadingOverlay";
import { MobileLayout, MobileContainer } from "@/components/mobile";
import { ErrorProvider, useError } from "@/components/providers";
import { useAnalysis, parseApiError } from "@/hooks";
import { AnalyzeData, FileData, AnalyzeApiRequest } from "@/types";

function HomeContent() {
  const { isAnalyzing, analyzeData, error } = useAnalysis();
  const { showSimpleError } = useError();

  const handleAnalyze = async (data: AnalyzeData) => {
    try {
      await analyzeData(data);
    } catch (error) {
      // エラーハンドリングをモーダルに変更
      const { title, message, details } = parseApiError(error);
      showSimpleError(message, title);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-hidden flex flex-col">
        <MobileLayout>
          <MobileContainer>
            <InputTabs onAnalyze={handleAnalyze} />
          </MobileContainer>
        </MobileLayout>
      </main>
      <BannerAd />
      {isAnalyzing && <LoadingOverlay />}
    </div>
  );
}

export default function Home() {
  return (
    <ErrorProvider>
      <HomeContent />
    </ErrorProvider>
  );
}
