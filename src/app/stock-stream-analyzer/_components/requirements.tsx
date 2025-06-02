import React from "react";

export const Requirements = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Stock Trading Stream Analyzer
        </h1>
      </div>
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="font-medium text-gray-900 dark:text-gray-200 mb-4">
          Implementation Requirements:
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">1.</span>
            <span>
              Create a custom hook{" "}
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                useStreamAnalyzer(inputString)
              </code>
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">2.</span>
            <span>
              Hook should return:{" "}
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                &#123; compressed, invalidSymbols, isLoading, error &#125;
              </code>
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">4.</span>
            <span>Sort by frequency (highest first), then alphabetically</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">5.</span>
            <span>
              Handle edge cases: empty strings, invalid symbols, mixed case
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
