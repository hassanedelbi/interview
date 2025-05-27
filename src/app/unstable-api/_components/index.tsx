"use client";
import { stocksApi, FAILURE_RATE } from "../_api";
import useApiCall from "../_hooks/useApiCall";
import React from "react";

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

const StocksSection: React.FC = () => {
  const {
    data: stocks,
    loading,
    error,
    retryCount,
    callApi,
  } = useApiCall<Stock[]>();
  console.log("retryCount", retryCount);
  const handleGetStocks = () => {
    callApi(() => stocksApi.getStocks());
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-black">
      <h2 className="text-xl font-bold mb-4">Stocks</h2>

      <button
        onClick={handleGetStocks}
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded mb-4"
      >
        {loading ? "Loading..." : `Get Stocks (${FAILURE_RATE}% fail rate)`}
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error.message}
        </div>
      )}

      {retryCount !== 0 && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <strong>Number of Tries:</strong> {retryCount}
        </div>
      )}

      {stocks && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stocks.map((stock: Stock) => (
            <div key={stock.symbol} className="border p-4 rounded bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">{stock.symbol}</span>
                <span className="text-xl font-semibold">{stock.price} QAR</span>
              </div>
              <div
                className={`text-sm font-medium ${
                  stock.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock.change >= 0 ? "+" : ""}
                {stock.change} ({stock.change >= 0 ? "▲" : "▼"})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StocksSection;
