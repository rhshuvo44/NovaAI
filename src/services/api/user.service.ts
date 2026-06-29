import { apiGet, apiGetPaginated, apiPatch, apiDelete } from "./helpers";
import type { User } from "@/types/user";
import type { PaginatedData, PaginationParams } from "@/types/api";
import type { Role } from "@/types/rbac";

export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export const userService = {
  list: (params?: PaginationParams): Promise<PaginatedData<User>> => apiGetPaginated<User>("/users", params),

  getById: (id: string): Promise<User> => apiGet<User>(`/users/${id}`),

  updateOwnProfile: (input: UpdateProfileInput): Promise<User> => apiPatch<User>("/users/me", input),

  changeRole: (id: string, role: Role): Promise<User> => apiPatch<User>(`/users/${id}/role`, { role }),

  deactivate: (id: string): Promise<User> => apiPatch<User>(`/users/${id}/deactivate`),

  activate: (id: string): Promise<User> => apiPatch<User>(`/users/${id}/activate`),

  delete: (id: string): Promise<null> => apiDelete(`/users/${id}`),
};
