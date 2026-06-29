"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { roleService, permissionService } from "@/services/api/role.service";
import { auditLogService } from "@/services/api/settings.service";
import { queryKeys } from "@/constants/query-keys";
import { ApiError } from "@/services/api/api-error";
import type { PaginationParams } from "@/types/api";
import type { Permission } from "@/types/rbac";

export function useAuditLogs(params?: PaginationParams & { resourceType?: string; actorId?: string }) {
  return useQuery({
    queryKey: queryKeys.auditLogs(params),
    queryFn: () => auditLogService.list(params),
  });
}

export function useRoles(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.roles(params),
    queryFn: () => roleService.list(params),
  });
}

export function usePermissionsCatalog(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.permissions(params),
    queryFn: () => permissionService.list(params),
  });
}

export function useUpdateRolePermissions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, permissions }: { id: string; permissions: Permission[] }) =>
      roleService.updatePermissions(id, permissions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Role permissions updated");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}
