import { useState } from "react";

// Types
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  retryCount: number;
}

interface UseApiCallReturn<T> extends ApiState<T> {
  callApi: (apiCall: () => Promise<T>, maxRetries?: number) => Promise<void>;
}

// Custom hook for API calls with retry logic
const useApiCall = <T = unknown>(): UseApiCallReturn<T> => {};

export default useApiCall;
