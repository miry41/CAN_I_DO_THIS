'use client';

import Header from '@/components/Header';
import InputTabs from '@/components/InputTabs';
import BannerAd from '@/components/BannerAd';
import LoadingOverlay from '@/components/LoadingOverlay';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  const handleAnalyze = async (data: { text: string; image: File | null; url: string }) => {
    setIsAnalyzing(true);
    
    // Mock API call with delay
    setTimeout(() => {
      // Store data in sessionStorage for the result page
      sessionStorage.setItem('analysisData', JSON.stringify({
        text: data.text,
        url: data.url,
        hasImage: !!data.image,
        timestamp: Date.now()
      }));
      
      setIsAnalyzing(false);
      router.push('/result');
    }, 3000);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-8 pb-safe">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                What problem do you want to solve?
              </h3>
              <p className="text-white/90 text-base md:text-lg font-medium drop-shadow-md">
                Choose your input method and let AI analyze the knowledge requirements
              </p>
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