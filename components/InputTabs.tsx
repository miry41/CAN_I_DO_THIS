"use client";

import { useState } from "react";
import { Type, Upload } from "lucide-react";
import TextInput from "./TextInput";
import FileInput from "./FileInput";
import { InputFormProps, TabType } from "@/types";

export default function InputTabs({ onAnalyze }: InputFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("text");

  const tabs = [
    { id: "text" as TabType, label: "Text", icon: Type },
    { id: "file" as TabType, label: "File", icon: Upload },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "text":
        return <TextInput onAnalyze={onAnalyze} />;
      case "file":
        return <FileInput onAnalyze={onAnalyze} />;
      default:
        return <TextInput onAnalyze={onAnalyze} />;
    }
  };

  return (
    <div className="natural-card rounded-2xl overflow-hidden group">
      {/* Tab Navigation */}
      <div className="flex p-1.5 bg-wisteria-100/30">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-wisteria-500 to-wisteria-600 text-white shadow-lg glow-effect"
                  : "text-wisteria-700 hover:text-wisteria-900 hover:bg-white/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-2 border-dashed border-wisteria-300 group-hover:border-wisteria-400 transition-all duration-300"></div>

      {/* Active Component */}
      <div className="min-h-[400px] p-6">{renderActiveComponent()}</div>
    </div>
  );
}
