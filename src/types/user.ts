import type { Role } from "./rbac";

export interface User {
  _id: string;
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  role: Role;
  isActive: boolean;
  isEmailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export function getUserDisplayName(user: Pick<User, "firstName" | "lastName" | "email">): string {
  if (user.firstName || user.lastName) {
    return [user.firstName, user.lastName].filter(Boolean).join(" ");
  }
  return user.email;
}

export function getUserInitials(user: Pick<User, "firstName" | "lastName" | "email">): string {
  if (user.firstName || user.lastName) {
    return [user.firstName?.[0], user.lastName?.[0]].filter(Boolean).join("").toUpperCase();
  }
  return user.email.slice(0, 2).toUpperCase();
}
