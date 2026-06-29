import { apiGet } from "./helpers";
import type { User } from "@/types/user";

export const authService = {
  getCurrentUser: (): Promise<User> => apiGet<User>("/auth/me"),
};
