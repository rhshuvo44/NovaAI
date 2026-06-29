"use client";

import * as React from "react";
import Link from "next/link";
import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ShieldCheck, UserX, UserCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/tables/data-table";
import { useUsers, useChangeUserRole, useActivateUser, useDeactivateUser } from "@/hooks";
import { getUserDisplayName, getUserInitials, type User } from "@/types/user";
import { Role, ROLE_LABELS } from "@/types/rbac";

export default function AdminUsersPage() {
  const [page, setPage] = React.useState(0);
  const { data, isLoading } = useUsers({ page: page + 1, limit: 20 });
  const changeRole = useChangeUserRole();
  const activateUser = useActivateUser();
  const deactivateUser = useDeactivateUser();

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "email",
      header: "User",
      cell: ({ row }) => (
        <Link href={`/admin/users/${row.original._id}`} className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.avatarUrl} />
            <AvatarFallback className="text-xs">{getUserInitials(row.original)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{getUserDisplayName(row.original)}</p>
            <p className="text-xs text-muted-foreground">{row.original.email}</p>
          </div>
        </Link>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <Badge variant="primary">{ROLE_LABELS[row.original.role]}</Badge>,
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? "success" : "outline"}>
          {row.original.isActive ? "Active" : "Deactivated"}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Joined",
      cell: ({ row }) => format(new Date(row.original.createdAt), "MMM d, yyyy"),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="User actions">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Change role</DropdownMenuLabel>
              {Object.values(Role).map((role) => (
                <DropdownMenuItem
                  key={role}
                  disabled={user.role === role}
                  onClick={() => changeRole.mutate({ id: user._id, role })}
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {ROLE_LABELS[role]}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {user.isActive ? (
                <DropdownMenuItem className="text-error" onClick={() => deactivateUser.mutate(user._id)}>
                  <UserX className="h-3.5 w-3.5" />
                  Deactivate
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => activateUser.mutate(user._id)}>
                  <UserCheck className="h-3.5 w-3.5" />
                  Activate
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableHiding: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Users</h1>
        <p className="text-sm text-muted-foreground">Manage user accounts, roles, and access.</p>
      </div>

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        isLoading={isLoading}
        pageCount={data?.meta.totalPages}
        pageIndex={page}
        onPageChange={setPage}
        emptyTitle="No users found"
      />
    </div>
  );
}
