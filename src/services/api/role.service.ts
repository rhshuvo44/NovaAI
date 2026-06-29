import { apiGet, apiGetPaginated, apiPost, apiPatch, apiDelete } from "./helpers";
import type { Role, Permission } from "@/types/rbac";
import type { PaginatedData, PaginationParams } from "@/types/api";

export interface RoleRecord {
  _id: string;
  name: Role;
  displayName: string;
  description?: string;
  permissions: Permission[];
  isSystemRole: boolean;
}

export interface PermissionRecord {
  _id: string;
  key: Permission;
  displayName: string;
  description?: string;
  category: string;
}

export const roleService = {
  list: (params?: PaginationParams): Promise<PaginatedData<RoleRecord>> =>
    apiGetPaginated<RoleRecord>("/roles", params),

  getById: (id: string): Promise<RoleRecord> => apiGet<RoleRecord>(`/roles/${id}`),

  create: (input: { name: Role; displayName: string; description?: string; permissions: Permission[] }) =>
    apiPost<RoleRecord>("/roles", input),

  updatePermissions: (id: string, permissions: Permission[]): Promise<RoleRecord> =>
    apiPatch<RoleRecord>(`/roles/${id}/permissions`, { permissions }),

  delete: (id: string): Promise<null> => apiDelete(`/roles/${id}`),
};

export const permissionService = {
  list: (params?: PaginationParams): Promise<PaginatedData<PermissionRecord>> =>
    apiGetPaginated<PermissionRecord>("/permissions", params),
};
