import { apiGet, apiPost } from "./helpers";
import type { User } from "@/types/user";

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  register: (data: { email: string; password: string; firstName?: string; lastName?: string }) =>
    apiPost<AuthResponse>("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    apiPost<AuthResponse>("/auth/login", data),

  refresh: (refreshToken: string) =>
    apiPost<AuthResponse>("/auth/refresh", { refreshToken }),

  logout: (refreshToken: string) =>
    apiPost("/auth/logout", { refreshToken }),

  logoutAll: () =>
    apiPost("/auth/logout-all"),

  getCurrentUser: (): Promise<User> =>
    apiGet<User>("/auth/me"),
};
