export enum Role {
  USER = "user",
  MANAGER = "manager",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

export enum Permission {
  USER_READ = "user:read",
  USER_WRITE = "user:write",
  USER_DELETE = "user:delete",
  DOCUMENT_READ = "document:read",
  DOCUMENT_WRITE = "document:write",
  DOCUMENT_DELETE = "document:delete",
  ROLE_MANAGE = "role:manage",
  PERMISSION_MANAGE = "permission:manage",
  SETTINGS_MANAGE = "settings:manage",
  ANALYTICS_READ = "analytics:read",
  AUDIT_READ = "audit:read",
  AI_USE = "ai:use",
  AI_MANAGE = "ai:manage",
}

export const ROLE_LABELS: Record<Role, string> = {
  [Role.USER]: "User",
  [Role.MANAGER]: "Manager",
  [Role.ADMIN]: "Admin",
  [Role.SUPER_ADMIN]: "Super Admin",
};
