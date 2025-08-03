"use client";

import { Share2, Twitter, MessageSquare } from "lucide-react";

// URLの検証とサニタイゼーション
const validateAndSanitizeUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    // 許可されたドメインのみ
    const allowedDomains = ["twitter.com", "x.com", "social-plugins.line.me"];

    if (!allowedDomains.some((domain) => urlObj.hostname.endsWith(domain))) {
      return null;
    }

    return urlObj.toString();
  } catch {
    return null;
  }
};

// テキストのサニタイゼーション
const sanitizeText = (text: string): string => {
  return text.replace(/[<>\"'&]/g, "");
};

export default function ShareButtons() {
  const shareData = {
    title: "CAN_I_DO_THIS?? - Problem Analysis Result",
    text: "Check out this AI-powered problem analysis!",
    url: typeof window !== "undefined" ? window.location.href : "",
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      console.log("Native share not supported");
    }
  };

  const handleTwitterShare = () => {
    const sanitizedText = sanitizeText(shareData.text);
    const tweetText = encodeURIComponent(`${sanitizedText} ${shareData.url}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

    const validatedUrl = validateAndSanitizeUrl(twitterUrl);
    if (validatedUrl) {
      window.open(validatedUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleLineShare = () => {
    const sanitizedText = sanitizeText(shareData.text);
    const lineText = encodeURIComponent(`${sanitizedText}\n${shareData.url}`);
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      shareData.url
    )}&text=${lineText}`;

    const validatedUrl = validateAndSanitizeUrl(lineUrl);
    if (validatedUrl) {
      window.open(validatedUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-8 shadow-lg border border-white/20 card-hover">
      <h3 className="text-xl font-bold gradient-text mb-6 flex items-center">
        <Share2 className="w-6 h-6 mr-3" />
        Share This Analysis
      </h3>

      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={handleNativeShare}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-sm font-medium">Share</span>
        </button>

        <button
          onClick={handleTwitterShare}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-800 to-black text-white px-4 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
        >
          <Twitter className="w-4 h-4" />
          <span className="text-sm font-medium">X</span>
        </button>

        <button
          onClick={handleLineShare}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm font-medium">LINE</span>
        </button>
      </div>

      <p className="text-sm text-gray-600 mt-6 text-center font-medium">
        Share your analysis to help others tackle similar challenges
      </p>
    </div>
  );
}
