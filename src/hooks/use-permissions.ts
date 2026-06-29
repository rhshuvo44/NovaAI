"use client";

import { useMemo } from "react";
import { useCurrentUser } from "./use-current-user";
import { Permission, Role } from "@/types/rbac";

const ROLE_HIERARCHY: Record<Role, number> = {
  [Role.USER]: 1,
  [Role.MANAGER]: 2,
  [Role.ADMIN]: 3,
  [Role.SUPER_ADMIN]: 4,
};

/**
 * NOTE: This hook only controls what the UI *shows*. It is not a security
 * boundary - the backend independently enforces every permission check on
 * every request. Hiding a button here is a UX convenience, not protection.
 */
export function usePermissions() {
  const { data: user } = useCurrentUser();

  // The backend resolves a user's effective permission set from their Role
  // document; the frontend doesn't have that list directly on the User
  // record, so role-hierarchy checks are the primary tool here. Where a
  // specific permission distinction matters (e.g. AI_USE vs AI_MANAGE),
  // pages should treat a 403 response as the source of truth and fall back
  // gracefully rather than only relying on client-side role checks.
  const role = user?.role;

  return useMemo(
    () => ({
      role,
      hasRole: (minimumRole: Role) => (role ? ROLE_HIERARCHY[role] >= ROLE_HIERARCHY[minimumRole] : false),
      isAdmin: role === Role.ADMIN || role === Role.SUPER_ADMIN,
      isSuperAdmin: role === Role.SUPER_ADMIN,
      isManagerOrAbove: role ? ROLE_HIERARCHY[role] >= ROLE_HIERARCHY[Role.MANAGER] : false,
    }),
    [role]
  );
}

export { Permission, Role };
