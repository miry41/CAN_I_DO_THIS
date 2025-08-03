"use client";

import Header from "@/components/Header";
import BannerAd from "@/components/BannerAd";

export default function Guide() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-8 pb-safe">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                How to Use CAN_I_DO_THIS??
              </h1>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Getting Started
                  </h2>
                  <p className="text-gray-700 mb-4">
                    CAN_I_DO_THIS?? is an AI-powered tool that helps you analyze
                    problems and visualize the knowledge required to solve them.
                    Here's how to get started:
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Step 1: Choose Your Input Method
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
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
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Text Input
                      </h3>
                      <p className="text-gray-600">
                        Simply type or paste your problem description into the
                        text area. Be as detailed as possible for better
                        analysis.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
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
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Image Upload
                      </h3>
                      <p className="text-gray-600">
                        Upload an image containing your problem. The AI will
                        analyze the visual content and extract relevant
                        information.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
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
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        URL Input
                      </h3>
                      <p className="text-gray-600">
                        Paste a URL to analyze content from a webpage. The tool
                        will extract and analyze the relevant information.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Step 2: Submit for Analysis
                  </h2>
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Click "Analyze"
                        </h3>
                        <p className="text-gray-700 mb-4">
                          Once you've entered your problem, click the "Analyze"
                          button. Our AI will process your input and generate a
                          comprehensive analysis.
                        </p>
                        <div className="bg-white p-4 rounded-lg border border-yellow-200">
                          <p className="text-sm text-gray-600">
                            <strong>Tip:</strong> The analysis typically takes
                            10-30 seconds. Please be patient while our AI
                            processes your request.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Step 3: Review Your Results
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Knowledge Graph Visualization
                      </h3>
                      <p className="text-gray-700 mb-4">
                        View an interactive knowledge graph that shows the
                        relationships between different concepts and skills
                        needed to solve your problem.
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Explore connected concepts by clicking on nodes</li>
                        <li>Zoom in/out to see different levels of detail</li>
                        <li>Hover over connections to see relationships</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Detailed Analysis
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Read through the comprehensive analysis that includes:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Problem breakdown and key components</li>
                        <li>Required skills and knowledge areas</li>
                        <li>Step-by-step solution approach</li>
                        <li>Potential challenges and solutions</li>
                        <li>Recommended learning resources</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Tips for Better Results
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
                          <h4 className="font-semibold text-gray-900">
                            Be Specific
                          </h4>
                          <p className="text-gray-600">
                            Provide detailed descriptions of your problem for
                            more accurate analysis.
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
                          <h4 className="font-semibold text-gray-900">
                            Include Context
                          </h4>
                          <p className="text-gray-600">
                            Mention your background, experience level, and
                            constraints.
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
                          <h4 className="font-semibold text-gray-900">
                            Use Clear Language
                          </h4>
                          <p className="text-gray-600">
                            Write in clear, concise language to help the AI
                            understand your needs.
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
                          <h4 className="font-semibold text-gray-900">
                            Share Results
                          </h4>
                          <p className="text-gray-600">
                            Use the share buttons to save or share your analysis
                            with others.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Need Help?
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                    <p className="text-gray-700 mb-4">
                      If you have any questions or need assistance, don't
                      hesitate to reach out:
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a
                        href="/contact"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
                      >
                        Contact Support
                      </a>
                      <a
                        href="/privacy"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
                      >
                        Privacy Policy
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BannerAd />
    </div>
  );
}
