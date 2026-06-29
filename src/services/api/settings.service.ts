import { apiGet, apiGetPaginated, apiPut, apiPost, apiDelete } from "./helpers";
import type { PaginatedData, PaginationParams } from "@/types/api";

export const settingsService = {
  listUserSettings: (): Promise<{ key: string; value: unknown }[]> =>
    apiGet<{ key: string; value: unknown }[]>("/settings/user"),

  getUserSetting: <T = unknown>(key: string): Promise<{ key: string; value: T }> =>
    apiGet(`/settings/user/${key}`),

  setUserSetting: <T = unknown>(key: string, value: T) => apiPut(`/settings/user/${key}`, { value }),

  getSystemSetting: <T = unknown>(key: string): Promise<{ key: string; value: T }> =>
    apiGet(`/settings/system/${key}`),

  setSystemSetting: <T = unknown>(key: string, value: T) => apiPut(`/settings/system/${key}`, { value }),
};

export interface AuditLogEntry {
  _id: string;
  actorId: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  changes?: Record<string, unknown>;
  createdAt: string;
}

export const auditLogService = {
  list: (params?: PaginationParams & { resourceType?: string; actorId?: string }): Promise<PaginatedData<AuditLogEntry>> =>
    apiGetPaginated<AuditLogEntry>("/audit-logs", params),
};

export interface ApiKeyRecord {
  _id: string;
  ownerId: string;
  name: string;
  keyPrefix: string;
  scopes: string[];
  isActive: boolean;
  lastUsedAt?: string;
  expiresAt?: string;
  createdAt: string;
}

export const apiKeyService = {
  list: (params?: PaginationParams): Promise<PaginatedData<ApiKeyRecord>> =>
    apiGetPaginated<ApiKeyRecord>("/api-keys", params),

  create: (name: string, scopes: string[], expiresAt?: string): Promise<{ apiKey: ApiKeyRecord; rawKey: string }> =>
    apiPost<{ apiKey: ApiKeyRecord; rawKey: string }>("/api-keys", { name, scopes, expiresAt }),

  revoke: (id: string): Promise<null> => apiDelete(`/api-keys/${id}`),
};
