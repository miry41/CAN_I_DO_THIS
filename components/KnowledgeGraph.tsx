"use client";

import { Network, GitBranch } from "lucide-react";
import { KnowledgeGraphProps } from "@/types";

export default function KnowledgeGraph({ dependencies }: KnowledgeGraphProps) {
  return (
    <div className="natural-card rounded-2xl p-8 card-hover">
      <h3 className="text-xl font-bold gradient-text mb-6 flex items-center">
        <Network className="w-6 h-6 mr-3" />
        Dependency Graph
      </h3>

      {/* Placeholder for actual graph library like Cytoscape.js */}
      <div className="bg-gradient-to-br from-wisteria-50 via-wisteria-100 to-wisteria-200 rounded-2xl p-10 text-center min-h-[350px] flex flex-col items-center justify-center border border-wisteria-200">
        <GitBranch className="w-20 h-20 text-wisteria-400 mb-6 floating-animation" />
        <p className="text-wisteria-700 mb-4 font-semibold text-lg">
          Interactive dependency graph will render here
        </p>
        <p className="text-sm text-wisteria-600 font-medium">
          Using Cytoscape.js or similar graph library
        </p>

        {/* Simple dependency list as fallback */}
        <div className="mt-8 space-y-3 w-full max-w-md">
          {dependencies.map((dep, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 text-left text-sm shadow-sm border border-wisteria-200 card-hover"
            >
              <span className="font-semibold text-wisteria-600">
                {dep.from}
              </span>
              <span className="text-wisteria-400 mx-2 font-bold">→</span>
              <span className="font-semibold text-wisteria-700">{dep.to}</span>
              <span className="block text-xs text-wisteria-600 mt-2 font-medium">
                ({dep.relationship})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
