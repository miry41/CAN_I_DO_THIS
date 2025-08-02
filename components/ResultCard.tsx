'use client';

import { Clock, TrendingUp, BookOpen, CheckCircle } from 'lucide-react';

interface ResultCardProps {
  result: {
    problem: string;
    knowledgeMap: {
      core_concepts: string[];
      prerequisites: string[];
      difficulty_level: string;
      estimated_time: string;
      learning_path: Array<{
        step: number;
        topic: string;
        description: string;
        resources: string[];
      }>;
    };
  };
}

export default function ResultCard({ result }: ResultCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Problem Summary */}
      <div className="glass-effect rounded-2xl p-8 shadow-lg border border-white/20 card-hover">
        <h3 className="text-xl font-bold gradient-text mb-4">Problem Analysis</h3>
        <p className="text-gray-800 bg-gradient-to-r from-gray-50 to-blue-50 p-5 rounded-xl font-medium">
          {result.problem}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 card-hover">
            <TrendingUp className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-900">Difficulty</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getDifficultyColor(result.knowledgeMap.difficulty_level)}`}>
              {result.knowledgeMap.difficulty_level}
            </span>
          </div>
          <div className="text-center p-5 bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-xl border border-emerald-200 card-hover">
            <Clock className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-900">Time Needed</p>
            <p className="text-sm text-emerald-600 font-bold mt-1">
              {result.knowledgeMap.estimated_time}
            </p>
          </div>
        </div>
      </div>

      {/* Knowledge Map JSON */}
      <div className="glass-effect rounded-2xl p-8 shadow-lg border border-white/20 card-hover">
        <h3 className="text-xl font-bold gradient-text mb-6 flex items-center">
          <BookOpen className="w-6 h-6 mr-3" />
          Knowledge Map
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Core Concepts</h4>
            <div className="flex flex-wrap gap-2">
              {result.knowledgeMap.core_concepts.map((concept, index) => (
                <span key={index} className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                  {concept}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Prerequisites</h4>
            <div className="flex flex-wrap gap-2">
              {result.knowledgeMap.prerequisites.map((prereq, index) => (
                <span key={index} className="px-4 py-2 bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                  {prereq}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="glass-effect rounded-2xl p-8 shadow-lg border border-white/20 card-hover">
        <h3 className="text-xl font-bold gradient-text mb-6 flex items-center">
          <CheckCircle className="w-6 h-6 mr-3" />
          Suggested Learning Path
        </h3>
        
        <div className="space-y-6">
          {result.knowledgeMap.learning_path.map((step, index) => (
            <div key={index} className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {step.step}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-lg">{step.topic}</h4>
                <p className="text-sm text-gray-700 mt-2 font-medium">{step.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {step.resources.map((resource, resourceIndex) => (
                    <span key={resourceIndex} className="px-3 py-1 bg-gradient-to-r from-emerald-50 to-cyan-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200">
                      {resource}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}