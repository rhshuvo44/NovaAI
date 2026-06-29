"use client";

import * as React from "react";
import { ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardGridSkeleton } from "@/components/loaders/skeletons";
import { useRoles, usePermissionsCatalog, useUpdateRolePermissions } from "@/hooks";
import type { Permission } from "@/types/rbac";
import type { PermissionRecord } from "@/services/api/role.service";

function groupByCategory(permissions: PermissionRecord[] | undefined): Record<string, PermissionRecord[]> {
  const groups: Record<string, PermissionRecord[]> = {};
  for (const permission of permissions ?? []) {
    if (!groups[permission.category]) groups[permission.category] = [];
    groups[permission.category].push(permission);
  }
  return groups;
}

export default function AdminRolesPage() {
  const { data: roles, isLoading } = useRoles({ page: 1, limit: 20 });
  const { data: permissionsCatalog } = usePermissionsCatalog({ page: 1, limit: 100 });
  const updatePermissions = useUpdateRolePermissions();
  const [editingRoleId, setEditingRoleId] = React.useState<string | null>(null);
  const [draftPermissions, setDraftPermissions] = React.useState<Permission[]>([]);

  const groupedPermissions = React.useMemo(
    () => groupByCategory(permissionsCatalog?.items),
    [permissionsCatalog]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Roles</h1>
        <p className="text-sm text-muted-foreground">Configure permissions for each role in your workspace.</p>
      </div>

      {isLoading ? (
        <CardGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {roles?.items.map((role) => {
            const isEditing = editingRoleId === role._id;
            const activePermissions = isEditing ? draftPermissions : role.permissions;

            return (
              <Card key={role._id}>
                <CardHeader className="flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      {role.displayName}
                      {role.isSystemRole && <Badge variant="outline">System</Badge>}
                    </CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </div>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setEditingRoleId(null)}>
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          updatePermissions.mutate(
                            { id: role._id, permissions: draftPermissions },
                            { onSuccess: () => setEditingRoleId(null) }
                          )
                        }
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingRoleId(role._id);
                        setDraftPermissions(role.permissions);
                      }}
                    >
                      Edit permissions
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(groupedPermissions).map(([category, permissions]) => (
                    <div key={category}>
                      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {category}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {permissions.map((permission) => {
                          const checked = activePermissions.includes(permission.key);
                          return (
                            <Label
                              key={permission.key}
                              className="flex items-center gap-2 text-xs font-normal"
                            >
                              <Checkbox
                                checked={checked}
                                disabled={!isEditing}
                                onCheckedChange={(value) => {
                                  setDraftPermissions((prev) =>
                                    value
                                      ? [...prev, permission.key]
                                      : prev.filter((p) => p !== permission.key)
                                  );
                                }}
                              />
                              {permission.displayName}
                            </Label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
