import { apiClient } from "./client";
import type { ApiSuccessResponse, PaginatedData, PaginationMeta, PaginationParams } from "@/types/api";
import type { AxiosRequestConfig } from "axios";

/** Unwraps `{ success, data, ... }` and returns just the `data` payload. */
export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res = await apiClient.get<ApiSuccessResponse<T>>(url, config);
  return res.data.data;
}

export async function apiPost<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const res = await apiClient.post<ApiSuccessResponse<T>>(url, body, config);
  return res.data.data;
}

export async function apiPatch<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const res = await apiClient.patch<ApiSuccessResponse<T>>(url, body, config);
  return res.data.data;
}

export async function apiPut<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const res = await apiClient.put<ApiSuccessResponse<T>>(url, body, config);
  return res.data.data;
}

export async function apiDelete<T = null>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res = await apiClient.delete<ApiSuccessResponse<T>>(url, config);
  return res.data.data;
}

/**
 * Some DELETE endpoints (e.g. removing a favorite by entity type + id)
 * require a request body, which Axios supports via `config.data` on a
 * DELETE call rather than a dedicated body parameter.
 */
export async function apiDeleteWithBody<T = null>(url: string, body: unknown): Promise<T> {
  const res = await apiClient.delete<ApiSuccessResponse<T>>(url, { data: body });
  return res.data.data;
}

/**
 * For paginated list endpoints, which return items in `data` and pagination
 * metadata in `meta` (rather than nested inside `data`).
 */
export async function apiGetPaginated<T, P extends object = PaginationParams>(
  url: string,
  params?: P
): Promise<PaginatedData<T>> {
  const res = await apiClient.get<ApiSuccessResponse<T[]>>(url, { params });
  return {
    items: res.data.data,
    meta: res.data.meta as PaginationMeta,
  };
}
