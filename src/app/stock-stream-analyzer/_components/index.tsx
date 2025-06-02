"use client";
import React, { useState } from "react";
import { ArrowRight, AlertTriangle, Shuffle, LoaderCircle } from "lucide-react";
import { generateTestData } from "@/app/stock-stream-analyzer/_utils/generateStreamData";
import { useStreamAnalyzer } from "@/app/stock-stream-analyzer/_hooks/useStreamAnalyzer";

const StockAnalyzer = () => {
  const [input, setInput] = useState("");

  const generateSampleData = () => {
    setInput(generateTestData());
  };

  const result = useStreamAnalyzer(input);

  return (
    <div className="mx-auto p-8 bg-white dark:bg-gray-900 h-full">
      {/* Generate Test Data Button */}
      <div className="text-center mb-8">
        <button
          onClick={generateSampleData}
          className="flex items-center gap-2 mx-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <Shuffle className="w-4 h-4" />
          Generate Test Data
        </button>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          (30% chance of including invalid symbols for testing)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <label
            htmlFor="stock-input"
            className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-4"
          >
            Input
          </label>
          <textarea
            id="stock-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="QNBKIGRDCBQKDHBK..."
            className="w-full h-64 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {input.length} characters
          </div>
        </div>

        {/* Arrow */}
        {!result.isLoading && (
          <div className="lg:col-span-1 flex justify-center items-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
              <ArrowRight className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        )}

        {result.isLoading && (
          <div className="lg:col-span-1 flex justify-center items-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
              <LoaderCircle className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          </div>
        )}

        {/* Output Section */}
        <div className="lg:col-span-1">
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">
            Output
          </label>
          <div className="w-full h-64 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 font-mono text-sm overflow-y-auto text-gray-900 dark:text-white">
            {result.compressed || (
              <span className="text-gray-400 dark:text-gray-500">
                Compressed output will appear here...
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {result.compressed.length} characters
          </div>
        </div>
      </div>

      {/* Warnings */}
      {result.invalidSymbols && result.invalidSymbols.length > 0 && (
        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <span className="font-medium text-yellow-800 dark:text-yellow-200">
              Warning
            </span>
          </div>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
            Invalid symbols detected:{" "}
            <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">
              {result.invalidSymbols.join(", ")}
            </code>
            <br />
            Stock symbols must be exactly 4 characters. Invalid parts have been
            ignored.
          </p>
        </div>
      )}

      {/* Example */}
      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
          Example:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-sm">
          <div>
            <div className="font-medium text-blue-800 dark:text-blue-300 mb-1">
              Input:
            </div>
            <code className="bg-blue-100 dark:bg-blue-800 p-2 rounded block">
              QNBKQNBKQNBKIGRDCBQK
            </code>
          </div>
          <div className="text-center">
            <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto" />
          </div>
          <div>
            <div className="font-medium text-blue-800 dark:text-blue-300 mb-1">
              Output:
            </div>
            <code className="bg-blue-100 dark:bg-blue-800 p-2 rounded block">
              QNBK3CBQK1IGRD1
            </code>
          </div>
        </div>
        <div className="mt-4 text-xs text-blue-700 dark:text-blue-300">
          <strong>Explanation:</strong> QNBK appears 3 times (most frequent),
          CBQK and IGRD each appear 1 time. When frequency is the same (CBQK=1,
          IGRD=1), sort alphabetically (CBQK comes before IGRD).
        </div>
      </div>
    </div>
  );
};

export default StockAnalyzer;
