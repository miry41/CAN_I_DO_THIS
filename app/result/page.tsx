'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import ResultCard from '@/components/ResultCard';
import KnowledgeGraph from '@/components/KnowledgeGraph';
import ShareButtons from '@/components/ShareButtons';
import BannerAd from '@/components/BannerAd';
import LoadingOverlay from '@/components/LoadingOverlay';

interface AnalysisResult {
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
  dependencies: Array<{
    from: string;
    to: string;
    relationship: string;
  }>;
}

export default function ResultPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    const analysisData = sessionStorage.getItem('analysisData');
    
    if (!analysisData) {
      router.push('/');
      return;
    }

    const data = JSON.parse(analysisData);
    
    // Mock API call to generate result
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        problem: data.text || "Uploaded image analysis",
        knowledgeMap: {
          core_concepts: [
            "Problem decomposition",
            "Research methodology", 
            "Critical thinking",
            "Resource identification",
            "Solution validation"
          ],
          prerequisites: [
            "Basic analytical skills",
            "Information literacy",
            "Time management"
          ],
          difficulty_level: "Intermediate",
          estimated_time: "2-4 weeks",
          learning_path: [
            {
              step: 1,
              topic: "Problem Analysis",
              description: "Break down the problem into smaller, manageable components",
              resources: ["Problem-solving frameworks", "Mind mapping tools"]
            },
            {
              step: 2,
              topic: "Research Phase",
              description: "Gather relevant information and identify knowledge gaps",
              resources: ["Academic databases", "Expert interviews", "Case studies"]
            },
            {
              step: 3,
              topic: "Solution Development",
              description: "Develop and test potential solutions",
              resources: ["Prototyping tools", "Testing frameworks", "Feedback systems"]
            },
            {
              step: 4,
              topic: "Implementation",
              description: "Execute the solution and monitor progress",
              resources: ["Project management tools", "Progress tracking", "Iteration methods"]
            }
          ]
        },
        dependencies: [
          { from: "Problem Analysis", to: "Research Phase", relationship: "prerequisite" },
          { from: "Research Phase", to: "Solution Development", relationship: "prerequisite" },
          { from: "Solution Development", to: "Implementation", relationship: "prerequisite" }
        ]
      };
      
      setResult(mockResult);
      setIsLoading(false);
    }, 2000);
  }, [router]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!result) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-8 pb-safe">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                Analysis Complete!
              </h2>
              <p className="text-white/90 text-base md:text-lg font-medium drop-shadow-md">
                Here's your knowledge roadmap
              </p>
            </div>
            
            <ResultCard result={result} />
            <KnowledgeGraph dependencies={result.dependencies} />
            <ShareButtons />
          </div>
        </div>
      </main>
      <BannerAd />
    </div>
  );
}