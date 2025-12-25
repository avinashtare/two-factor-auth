// 1. Constants
export const API_CONFIG = {
  BASE_URL: "http://localhost:3000",
  DEFAULT_TIMEOUT: 8000,
} as const;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface APIOptions {
  method: HttpMethod;
  timeout?: number;
  credentials?: RequestCredentials;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

// 2. Mapping
export const API_ROUTES = {
  LOGIN: {
    url: `${API_CONFIG.BASE_URL}/api/v1/user/login`,
    method: "POST",
  },
} as const;

// 3. The Core Function
export const sendRequest = async <TResponse>(
  url: string,
  data: unknown,
  options: APIOptions
): Promise<TResponse | Error> => {
  const internalController = new AbortController();
  const timeoutValue = options.timeout ?? API_CONFIG.DEFAULT_TIMEOUT;
  const timeoutSignal = AbortSignal.timeout(timeoutValue);

  // Merge signals to free memory on settle
  const combinedSignal = options.signal
    ? AbortSignal.any([
        timeoutSignal,
        options.signal,
        internalController.signal,
      ])
    : AbortSignal.any([timeoutSignal, internalController.signal]);

  try {
    const res = await fetch(url, {
      method: options.method,

      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },

      signal: combinedSignal,
      ...(options.method !== "GET" && { body: JSON.stringify(data) }),
      ...(options.credentials && { credentials: options.credentials }),
    });

    return (await res.json()) as TResponse;
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.name === "TimeoutError") return new Error("Request timed out.");
      if (err.name === "AbortError") return new Error("Request cancelled.");
      return new Error(err.message);
    }
    return new Error("An unexpected error occurred.");
  } finally {
    // 4. Free signal memory immediately
    internalController.abort();
  }
};
