"use client";

import { useState } from "react";
import { Upload, Zap } from "lucide-react";
import { InputFormProps } from "@/types";

export default function InputForm({ onAnalyze }: InputFormProps) {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() || image) {
      onAnalyze({ text: text.trim(), image });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith("image/")) {
      setImage(files[0]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setImage(files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="problem-text"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Describe your problem or paste a URL
          </label>
          <textarea
            id="problem-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm md:text-base"
            placeholder="Example: How do I build a mobile app? Or paste a URL to a tutorial, job posting, or challenge..."
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or upload an image
          </label>
          <div
            className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="space-y-2">
              <Upload className="w-8 h-8 text-gray-400 mx-auto" />
              {image ? (
                <div>
                  <p className="text-sm font-medium text-green-600">
                    {image.name} selected
                  </p>
                  <p className="text-xs text-gray-500">
                    Drag another image or click to replace
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600">
                    Drag & drop an image here, or click to select
                  </p>
                  <p className="text-xs text-gray-500">
                    Screenshots, diagrams, or any image with text
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!text.trim() && !image}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <Zap className="w-5 h-5" />
        <span>Analyze Problem</span>
      </button>

      {!text.trim() && !image && (
        <p className="text-xs text-gray-500 text-center">
          Please provide either text or an image to analyze
        </p>
      )}
    </form>
  );
}
