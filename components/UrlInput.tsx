'use client';

import { useState } from 'react';
import { Zap, ExternalLink } from 'lucide-react';

interface UrlInputProps {
  onAnalyze: (data: { text: string; image: File | null; url: string }) => void;
}

export default function UrlInput({ onAnalyze }: UrlInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze({ text: '', image: null, url: url.trim() });
    }
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="url-input" className="block text-sm font-semibold text-gray-800 mb-3">
          Enter URL to analyze
        </label>
        <div className="relative">
          <input
            id="url-input"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:text-base transition-all duration-200 bg-white/80 backdrop-blur-sm"
            placeholder="https://example.com/tutorial-or-challenge"
          />
          <ExternalLink className="w-5 h-5 text-indigo-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
        </div>
        {url && !isValidUrl(url) && (
          <p className="text-red-500 text-xs mt-2 font-medium">Please enter a valid URL</p>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-3">Supported URLs:</h4>
        <ul className="text-sm text-blue-800 space-y-2 font-medium">
          <li>• Tutorial websites and documentation</li>
          <li>• Job postings and requirements</li>
          <li>• Challenge descriptions and problems</li>
          <li>• Course syllabi and learning materials</li>
        </ul>
      </div>

      <button
        type="submit"
        disabled={!url.trim() || !isValidUrl(url)}
        className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] glow-effect"
      >
        <Zap className="w-5 h-5" />
        <span>Analyze URL</span>
      </button>
      
      {(!url.trim() || !isValidUrl(url)) && (
        <p className="text-xs text-gray-600 text-center font-medium">
          Please enter a valid URL to analyze
        </p>
      )}
    </form>
  );
}