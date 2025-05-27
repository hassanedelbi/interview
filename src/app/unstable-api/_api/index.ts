// Types
interface Stock {
  symbol: string;
  price: number;
  change: number;
}

// 80% failure rate
export const FAILURE_RATE = 0.8;

// Simple Mock Backend - Just Stocks
const mockDatabase = {
  stocks: [
    { symbol: "QIBK", price: 18.5, change: 2.3 },
    { symbol: "BLDN", price: 5.8, change: -1.2 },
    { symbol: "ORDS", price: 7.9, change: 5.7 },
    { symbol: "VDFN", price: 8.2, change: 1.8 },
  ],
};

const shouldFail = (): boolean => Math.random() < FAILURE_RATE;

// Simple delay
const delay = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 2000 + 500));

// Get all stocks - fails FAILURE_RATE of time
const getStocks = async (): Promise<Stock[]> => {
  await delay();

  if (shouldFail()) {
    throw new Error("Failed to fetch stocks");
  }

  // Random price changes
  return mockDatabase.stocks.map((stock) => ({
    ...stock,
    price: +(stock.price + (Math.random() - 0.5) * 10).toFixed(2),
    change: +((Math.random() - 0.5) * 5).toFixed(2),
  }));
};

export const stocksApi = {
  getStocks,
};
