"use client";

import { useState } from "react";
import { Zap, FileText } from "lucide-react";
import { InputFormProps } from "@/types";

export default function TextInput({ onAnalyze }: InputFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze({ text: text.trim(), image: null });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="text-input"
          className="block text-sm font-semibold text-gray-800 mb-3"
        >
          Describe your problem or challenge
        </label>
        <div className="relative">
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-sm md:text-base transition-all duration-200 bg-white/80 backdrop-blur-sm"
            placeholder="Example: How do I build a mobile app with React Native? What skills do I need to become a data scientist? How can I solve this coding challenge..."
          />
          <FileText className="w-5 h-5 text-indigo-400 absolute right-4 top-4" />
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2 font-medium">
          <span>Be as specific as possible for better analysis</span>
          <span>{text.length}/2000</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl p-5 border border-emerald-200">
        <h4 className="font-semibold text-emerald-900 mb-3">
          Tips for better results:
        </h4>
        <ul className="text-sm text-emerald-800 space-y-2 font-medium">
          <li>• Include your current skill level</li>
          <li>• Mention specific technologies or domains</li>
          <li>• Describe your end goal or objective</li>
          <li>• Add any constraints or requirements</li>
        </ul>
      </div>

      <button
        type="submit"
        disabled={!text.trim()}
        className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] glow-effect"
      >
        <Zap className="w-5 h-5" />
        <span>Analyze Problem</span>
      </button>

      {!text.trim() && (
        <p className="text-xs text-gray-600 text-center font-medium">
          Please describe your problem to get started
        </p>
      )}
    </form>
  );
}
