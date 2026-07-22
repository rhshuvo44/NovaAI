import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { env } from "@/lib/env";
import { ApiError } from "./api-error";
import type { ApiErrorResponse } from "@/types/api";

let getAccessToken: (() => string | null) | null = null;

export function setAccessTokenGetter(fn: () => string | null): void {
  getAccessToken = fn;
}

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  if (getAccessToken) {
    const token = getAccessToken();
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
