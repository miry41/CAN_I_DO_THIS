"use client";

import { useState, useEffect } from "react";
import { Brain, Zap, Play } from "lucide-react";

export default function LoadingOverlay() {
  const [progress, setProgress] = useState(0);
  const [showRewardAd, setShowRewardAd] = useState(false);

  useEffect(() => {
    // Show reward ad after 1 second
    const adTimer = setTimeout(() => {
      setShowRewardAd(true);
    }, 1000);

    // Simulate progress
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearTimeout(adTimer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-effect rounded-3xl p-10 max-w-md w-full text-center space-y-8 shadow-2xl">
        {!showRewardAd ? (
          <>
            <div className="flex items-center justify-center">
              <div className="relative">
                <Brain className="w-20 h-20 text-indigo-500 animate-pulse floating-animation" />
                <Zap className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-3">
                Analyzing Your Problem
              </h3>
              <p className="text-gray-700 text-base font-medium">
                AI is processing your input and mapping knowledge
                requirements...
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300 shadow-lg"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              {progress < 30
                ? "Parsing input..."
                : progress < 60
                ? "Identifying concepts..."
                : progress < 90
                ? "Building knowledge map..."
                : "Finalizing analysis..."}
            </p>
          </>
        ) : (
          <>
            <div className="bg-gradient-to-br from-wisteria-400 via-wisteria-500 to-wisteria-600 rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <Play className="w-16 h-16 floating-animation" />
              </div>
              <h3 className="text-xl font-bold mb-3">Reward Ad</h3>
              <p className="text-base opacity-95 mb-6 font-medium">
                Watch this ad to support free AI analysis
              </p>
              <div className="bg-white bg-opacity-20 rounded-xl p-5">
                <p className="text-sm opacity-90 font-medium">
                  Simulated ad content - This keeps the service free for
                  everyone!
                </p>
              </div>
            </div>
            <div className="w-full bg-wisteria-200 rounded-full h-3 shadow-inner">
              <div
                className="bg-gradient-to-r from-wisteria-500 via-wisteria-600 to-wisteria-700 h-3 rounded-full transition-all duration-300 shadow-lg"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-wisteria-600 font-medium">
              Analysis will complete automatically after the ad
            </p>
          </>
        )}
      </div>
    </div>
  );
}
