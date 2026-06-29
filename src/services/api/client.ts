import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { env } from "@/lib/env";
import { ApiError } from "./api-error";
import type { ApiErrorResponse } from "@/types/api";

/**
 * A function that returns the current Clerk session token, or null if
 * unauthenticated. Wired up once at app startup via `setAuthTokenGetter`
 * (see `src/hooks/use-api-auth-sync.ts`), since the Axios instance is a
 * plain module-level singleton and can't call Clerk's `useAuth()` hook
 * directly.
 */
let getAuthToken: (() => Promise<string | null>) | null = null;

export function setAuthTokenGetter(fn: () => Promise<string | null>): void {
  getAuthToken = fn;
}

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  if (getAuthToken) {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      const body = error.response.data;
      return Promise.reject(
        new ApiError(
          body?.message ?? error.message ?? "Something went wrong",
          error.response.status,
          body?.errorCode ?? "UNKNOWN_ERROR",
          body?.details
        )
      );
    }

    if (error.request) {
      return Promise.reject(
        new ApiError("Could not reach the server. Check your connection and try again.", 0, "NETWORK_ERROR")
      );
    }

    return Promise.reject(new ApiError(error.message, 0, "REQUEST_SETUP_ERROR"));
  }
);
