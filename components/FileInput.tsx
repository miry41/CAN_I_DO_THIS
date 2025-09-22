"use client";

import { useState } from "react";
import { Upload, Zap, Image as ImageIcon, FileText, X } from "lucide-react";
import { InputFormProps, ValidMimeType } from "@/types";
import { useFileConverter, useDragAndDrop } from "@/hooks";

export default function FileInput({ onAnalyze }: InputFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const {
    convertFileToStructured,
    isConverting,
    error: conversionError,
  } = useFileConverter();

  const acceptedTypes: ValidMimeType[] = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "text/plain",
    "application/pdf",
  ];

  const { dragActive, handleDrag, handleDrop } = useDragAndDrop({
    onDrop: (files) => {
      if (files[0]) {
        setFile(files[0]);
      }
    },
    acceptedTypes,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    onError: (error) => {
      alert(error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      try {
        const imageData = await convertFileToStructured(file);
        onAnalyze({ text: "", image: JSON.stringify(imageData) });
      } catch (error) {
        console.error("Error converting file:", error);
        alert("ファイルの処理に失敗しました。もう一度お試しください。");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      // ファイルタイプとサイズの検証
      if (!acceptedTypes.includes(files[0].type as ValidMimeType)) {
        alert(
          `サポートされていないファイル形式です。許可された形式: ${acceptedTypes.join(
            ", "
          )}`
        );
        return;
      }

      if (files[0].size > 10 * 1024 * 1024) {
        alert(
          "ファイルサイズが大きすぎます。10MB以下のファイルを選択してください。"
        );
        return;
      }

      setFile(files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="w-6 h-6 text-blue-500" />;
    }
    return <FileText className="w-6 h-6 text-green-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          Upload file to analyze
        </label>

        {!file ? (
          <div
            className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${
              dragActive
                ? "border-indigo-500 bg-indigo-50 shadow-lg"
                : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*,.txt,.pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="space-y-4">
              <Upload className="w-16 h-16 text-indigo-400 mx-auto floating-animation" />
              <div>
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  Drop your file here, or click to select
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  Supports images, text files, and PDFs (max 10MB)
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getFileIcon(file)}
                <div>
                  <p className="font-semibold text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-600 font-medium">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-2 hover:bg-red-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
        <h4 className="font-semibold text-purple-900 mb-3">
          Supported file types:
        </h4>
        <ul className="text-sm text-purple-800 space-y-2 font-medium">
          <li>
            • <strong>Images:</strong> Screenshots, diagrams, charts,
            handwritten notes
          </li>
          <li>
            • <strong>Text files:</strong> Code snippets, requirements,
            documentation
          </li>
          <li>
            • <strong>PDFs:</strong> Research papers, tutorials, specifications
          </li>
        </ul>
      </div>

      <button
        type="submit"
        disabled={!file || isConverting}
        className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] glow-effect"
      >
        <Zap className="w-5 h-5" />
        <span>{isConverting ? "Converting..." : "Analyze File"}</span>
      </button>

      {!file && (
        <p className="text-xs text-gray-600 text-center font-medium">
          Please upload a file to analyze
        </p>
      )}

      {conversionError && (
        <p className="text-xs text-red-600 text-center font-medium">
          {conversionError}
        </p>
      )}
    </form>
  );
}
