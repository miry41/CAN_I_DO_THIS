"use client";

import { Clock, TrendingUp, BookOpen, CheckCircle } from "lucide-react";
import { ResultCardProps } from "@/types";

export default function ResultCard({ result }: ResultCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "text-green-600 bg-green-100";
      case "intermediate":
        return "text-yellow-600 bg-yellow-100";
      case "advanced":
        return "text-red-600 bg-red-100";
      default:
        return "text-wisteria-600 bg-wisteria-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Problem Summary */}
      <div className="natural-card rounded-2xl p-8 card-hover">
        <h3 className="text-xl font-bold gradient-text mb-4">
          Problem Analysis
        </h3>
        <p className="text-wisteria-800 bg-gradient-to-r from-wisteria-50 to-wisteria-100 p-5 rounded-xl font-medium">
          {result.problem}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center p-5 bg-gradient-to-br from-wisteria-50 to-wisteria-100 rounded-xl border border-wisteria-200 card-hover">
            <TrendingUp className="w-8 h-8 text-wisteria-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-wisteria-900">
              Difficulty
            </p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getDifficultyColor(
                result.knowledgeMap.difficulty_level
              )}`}
            >
              {result.knowledgeMap.difficulty_level}
            </span>
          </div>
          <div className="text-center p-5 bg-gradient-to-br from-wisteria-50 to-wisteria-100 rounded-xl border border-wisteria-200 card-hover">
            <Clock className="w-8 h-8 text-wisteria-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-wisteria-900">
              Time Needed
            </p>
            <p className="text-sm text-wisteria-600 font-bold mt-1">
              {result.knowledgeMap.estimated_time}
            </p>
          </div>
        </div>
      </div>

      {/* Knowledge Map JSON */}
      <div className="natural-card rounded-2xl p-8 card-hover">
        <h3 className="text-xl font-bold gradient-text mb-6 flex items-center">
          <BookOpen className="w-6 h-6 mr-3" />
          Knowledge Map
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-wisteria-900 mb-3">
              Core Concepts
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.knowledgeMap.core_concepts.map((concept, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-wisteria-100 to-wisteria-200 text-wisteria-800 rounded-full text-sm font-medium border border-wisteria-200"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-wisteria-900 mb-3">
              Prerequisites
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.knowledgeMap.prerequisites.map((prereq, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-wisteria-100 to-wisteria-200 text-wisteria-700 rounded-full text-sm font-medium border border-wisteria-200"
                >
                  {prereq}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="natural-card rounded-2xl p-8 card-hover">
        <h3 className="text-xl font-bold gradient-text mb-6 flex items-center">
          <CheckCircle className="w-6 h-6 mr-3" />
          Suggested Learning Path
        </h3>

        <div className="space-y-6">
          {result.knowledgeMap.learning_path.map((step, index) => (
            <div key={index} className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-wisteria-500 via-wisteria-600 to-wisteria-700 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {step.step}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-wisteria-900 text-lg">
                  {step.topic}
                </h4>
                <p className="text-sm text-wisteria-700 mt-2 font-medium">
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {step.resources.map((resource, resourceIndex) => (
                    <span
                      key={resourceIndex}
                      className="px-3 py-1 bg-gradient-to-r from-wisteria-50 to-wisteria-100 text-wisteria-700 rounded-full text-xs font-medium border border-wisteria-200"
                    >
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
