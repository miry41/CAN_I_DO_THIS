'use client';

import { Share2, Twitter, MessageSquare, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: 'CAN_I_DO_THIS?? - Problem Analysis Result',
    text: 'Check out this AI-powered problem analysis!',
    url: typeof window !== 'undefined' ? window.location.href : '',
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      handleCopyLink();
    }
  };

  const handleTwitterShare = () => {
    const tweetText = encodeURIComponent(`${shareData.text} ${shareData.url}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  const handleLineShare = () => {
    const lineText = encodeURIComponent(`${shareData.text}\n${shareData.url}`);
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareData.url)}&text=${lineText}`, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link');
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-8 shadow-lg border border-white/20 card-hover">
      <h3 className="text-xl font-bold gradient-text mb-6 flex items-center">
        <Share2 className="w-6 h-6 mr-3" />
        Share This Analysis
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          <span className="text-sm font-medium">Twitter</span>
        </button>
        
        <button
          onClick={handleLineShare}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm font-medium">LINE</span>
        </button>
        
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-500 to-slate-600 text-white px-4 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span className="text-sm font-medium">
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mt-6 text-center font-medium">
        Share your analysis to help others tackle similar challenges
      </p>
    </div>
  );
}