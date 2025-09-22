"use client";

import Header from "@/components/Header";
import BannerAd from "@/components/BannerAd";
import { MobileLayout, MobileContainer, MobileCard } from "@/components/mobile";

export default function Guide() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-hidden flex flex-col">
        <MobileLayout>
          <MobileContainer maxWidth="max-w-4xl">
            <MobileCard className="p-8">
              <h1 className="text-3xl font-bold text-wisteria-900 mb-6">
                How to Use CAN_I_DO_THIS??
              </h1>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-wisteria-900 mb-4">
                    What is CAN_I_DO_THIS??
                  </h2>
                  <p className="text-wisteria-700 mb-4">
                    CAN_I_DO_THIS?? is an AI-powered problem analysis tool that
                    helps you understand what knowledge and skills you need to
                    solve any problem. It creates visual knowledge maps and
                    learning roadmaps tailored to your specific challenges.
                  </p>
                  <div className="bg-gradient-to-r from-wisteria-50 to-wisteria-100 p-4 rounded-lg">
                    <p className="text-wisteria-800 font-medium">
                      ✨ Simply describe your problem, and get a complete
                      breakdown of concepts, prerequisites, difficulty levels,
                      and step-by-step learning paths!
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-wisteria-900 mb-4">
                    Step 1: Choose Your Input Method
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-wisteria-50 to-wisteria-100 p-6 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-wisteria-500 to-wisteria-600 rounded-lg flex items-center justify-center mb-4">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-wisteria-900 mb-2">
                        Text Input
                      </h3>
                      <p className="text-wisteria-600 mb-3">
                        Type or paste your problem description. The more
                        detailed you are, the better analysis you&apos;ll
                        receive.
                      </p>
                      <div className="bg-white p-3 rounded border border-wisteria-200">
                        <p className="text-sm text-wisteria-600 font-medium">
                          Example:
                        </p>
                        <p className="text-sm text-wisteria-700 italic">
                          &quot;I want to build a mobile app but don&apos;t know
                          programming. What do I need to learn?&quot;
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-wisteria-100 to-wisteria-200 p-6 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-wisteria-600 to-wisteria-700 rounded-lg flex items-center justify-center mb-4">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-wisteria-900 mb-2">
                        File Upload
                      </h3>
                      <p className="text-wisteria-600 mb-3">
                        Upload documents, images, or files related to your
                        problem. Our AI will analyze and extract key
                        information.
                      </p>
                      <div className="bg-white p-3 rounded border border-wisteria-200">
                        <p className="text-sm text-wisteria-600 font-medium">
                          Supported:
                        </p>
                        <p className="text-sm text-wisteria-700">
                          Images, PDFs, Text files, Documents
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-wisteria-900 mb-4">
                    Step 2: AI Analysis Process
                  </h2>
                  <div className="bg-gradient-to-r from-wisteria-50 to-wisteria-100 p-6 rounded-xl">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-wisteria-500 to-wisteria-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-wisteria-900 mb-2">
                          Click &quot;Analyze&quot;
                        </h3>
                        <p className="text-wisteria-700 mb-4">
                          Once you&apos;ve entered your problem, click the
                          &quot;Analyze&quot; button. Our AI will process your
                          input and generate a comprehensive knowledge analysis.
                        </p>
                        <div className="bg-white p-4 rounded-lg border border-wisteria-200">
                          <p className="text-sm text-wisteria-600">
                            <strong>Processing Time:</strong> Analysis typically
                            takes 10-30 seconds. The AI examines your problem
                            and creates a complete knowledge breakdown.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-wisteria-900 mb-4">
                    Step 3: Understanding Your Results
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-wisteria-50 to-wisteria-100 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-wisteria-900 mb-3">
                        📊 Knowledge Graph Visualization
                      </h3>
                      <p className="text-wisteria-700 mb-4">
                        Explore an interactive knowledge graph that shows the
                        relationships between different concepts and skills
                        needed to solve your problem.
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-wisteria-700">
                        <li>Interactive nodes representing key concepts</li>
                        <li>Visual connections showing dependencies</li>
                        <li>Prerequisites and relationships mapped out</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-wisteria-50 to-wisteria-100 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-wisteria-900 mb-3">
                        📋 Detailed Knowledge Map
                      </h3>
                      <p className="text-wisteria-700 mb-4">
                        Review your comprehensive analysis that includes:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-wisteria-700">
                        <li>
                          <strong>Core Concepts:</strong> Essential knowledge
                          areas you need to master
                        </li>
                        <li>
                          <strong>Prerequisites:</strong> Foundational skills
                          required before starting
                        </li>
                        <li>
                          <strong>Difficulty Level:</strong> Complexity
                          assessment (Beginner/Intermediate/Advanced)
                        </li>
                        <li>
                          <strong>Estimated Time:</strong> Projected learning
                          timeline
                        </li>
                        <li>
                          <strong>Learning Path:</strong> Step-by-step
                          progression with resources
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-wisteria-50 to-wisteria-100 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-wisteria-900 mb-3">
                        🎯 Step-by-Step Learning Path
                      </h3>
                      <p className="text-wisteria-700 mb-4">
                        Follow a structured learning journey:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-wisteria-200">
                          <h4 className="font-semibold text-wisteria-900 mb-2">
                            Each Step Includes:
                          </h4>
                          <ul className="text-sm text-wisteria-700 space-y-1">
                            <li>• Topic focus area</li>
                            <li>• Clear description</li>
                            <li>• Recommended resources</li>
                            <li>• Progress milestones</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-wisteria-200">
                          <h4 className="font-semibold text-wisteria-900 mb-2">
                            Learning Order:
                          </h4>
                          <ul className="text-sm text-wisteria-700 space-y-1">
                            <li>• Logical progression</li>
                            <li>• Prerequisite awareness</li>
                            <li>• Skill building sequence</li>
                            <li>• Practical application</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-wisteria-900 mb-4">
                    💡 Tips for Better Results
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-wisteria-900">
                            Be Specific and Detailed
                          </h4>
                          <p className="text-wisteria-600">
                            Include context, goals, constraints, and your
                            current skill level for more accurate analysis.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-wisteria-900">
                            Include Your Background
                          </h4>
                          <p className="text-wisteria-600">
                            Mention your experience level, available time, and
                            any relevant skills you already have.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-wisteria-900">
                            State Your End Goal
                          </h4>
                          <p className="text-wisteria-600">
                            Clearly define what you want to achieve to get a
                            more targeted learning path.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-wisteria-900">
                            Share Your Results
                          </h4>
                          <p className="text-wisteria-600">
                            Use the share buttons to save your analysis or share
                            it with mentors and study partners.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-wisteria-900 mb-4">
                    🎯 Example Use Cases
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-wisteria-50 to-wisteria-100 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-wisteria-900 mb-3">
                        Career Transition
                      </h3>
                      <p className="text-wisteria-600 mb-3">
                        &quot;I&apos;m a marketing professional who wants to
                        become a data scientist. What skills do I need?&quot;
                      </p>
                      <div className="text-sm text-wisteria-800 font-medium">
                        → Get roadmap for statistics, programming, ML, and
                        domain knowledge
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-wisteria-50 to-wisteria-100 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-wisteria-900 mb-3">
                        Academic Project
                      </h3>
                      <p className="text-wisteria-600 mb-3">
                        &quot;I need to research renewable energy solutions for
                        my thesis but don&apos;t know where to start.&quot;
                      </p>
                      <div className="text-sm text-wisteria-800 font-medium">
                        → Get structured research methodology and topic
                        breakdown
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-wisteria-100 to-wisteria-200 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-wisteria-900 mb-3">
                        Technical Challenge
                      </h3>
                      <p className="text-wisteria-600 mb-3">
                        &quot;I want to build an e-commerce website but I&apos;m
                        a complete beginner in web development.&quot;
                      </p>
                      <div className="text-sm text-wisteria-800 font-medium">
                        → Get step-by-step tech stack and development process
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-wisteria-50 to-wisteria-100 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-wisteria-900 mb-3">
                        Personal Goal
                      </h3>
                      <p className="text-wisteria-600 mb-3">
                        &quot;I want to learn investing and financial planning
                        but find it overwhelming.&quot;
                      </p>
                      <div className="text-sm text-wisteria-800 font-medium">
                        → Get beginner-friendly path through financial concepts
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-wisteria-900 mb-4">
                    🤔 Need Help?
                  </h2>
                  <div className="bg-gradient-to-r from-wisteria-50 to-wisteria-100 p-6 rounded-xl">
                    <p className="text-wisteria-700 mb-4">
                      If you have questions about using CAN_I_DO_THIS?? or need
                      assistance with your analysis results, we&apos;re here to
                      help:
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a
                        href="/contact"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-wisteria-400 to-wisteria-500 text-white rounded-lg hover:from-wisteria-500 hover:to-wisteria-600 transition-all duration-200"
                      >
                        Contact Support
                      </a>
                      <a
                        href="/privacy"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-wisteria-400 to-wisteria-500 text-white rounded-lg hover:from-wisteria-500 hover:to-wisteria-600 transition-all duration-200"
                      >
                        Privacy Policy
                      </a>
                      <a
                        href="/"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-wisteria-400 to-wisteria-500 text-white rounded-lg hover:from-wisteria-500 hover:to-wisteria-600 transition-all duration-200"
                      >
                        Try It Now
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </MobileCard>
          </MobileContainer>
        </MobileLayout>
      </main>
      <BannerAd />
    </div>
  );
}
