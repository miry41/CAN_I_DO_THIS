'use client';

import { useState } from 'react';
import { Link, Type, Upload } from 'lucide-react';
import UrlInput from './UrlInput';
import TextInput from './TextInput';
import FileInput from './FileInput';

interface InputTabsProps {
  onAnalyze: (data: { text: string; image: File | null; url: string }) => void;
}

type TabType = 'url' | 'text' | 'file';

export default function InputTabs({ onAnalyze }: InputTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('text');

  const tabs = [
    { id: 'url' as TabType, label: 'URL', icon: Link },
    { id: 'text' as TabType, label: 'Text', icon: Type },
    { id: 'file' as TabType, label: 'File', icon: Upload },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'url':
        return <UrlInput onAnalyze={onAnalyze} />;
      case 'text':
        return <TextInput onAnalyze={onAnalyze} />;
      case 'file':
        return <FileInput onAnalyze={onAnalyze} />;
      default:
        return <TextInput onAnalyze={onAnalyze} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex glass-effect rounded-2xl p-1.5 shadow-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg glow-effect'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Component */}
      <div className="min-h-[400px] glass-effect rounded-2xl p-6 shadow-lg card-hover">
        {renderActiveComponent()}
      </div>
    </div>
  );
}