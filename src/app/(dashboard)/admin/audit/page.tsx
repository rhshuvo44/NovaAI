"use client";

import * as React from "react";
import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";
import { ScrollText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/tables/data-table";
import { useAuditLogs } from "@/hooks";
import type { AuditLogEntry } from "@/services/api/settings.service";

export default function AdminAuditPage() {
  const [page, setPage] = React.useState(0);
  const { data, isLoading } = useAuditLogs({ page: page + 1, limit: 25 });

  const columns: ColumnDef<AuditLogEntry>[] = [
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => <Badge variant="primary">{row.original.action}</Badge>,
    },
    { accessorKey: "resourceType", header: "Resource" },
    { accessorKey: "resourceId", header: "Resource ID" },
    { accessorKey: "actorId", header: "Actor" },
    {
      accessorKey: "createdAt",
      header: "Timestamp",
      cell: ({ row }) => format(new Date(row.original.createdAt), "MMM d, yyyy 'at' h:mm a"),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
          <ScrollText className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-xl font-semibold">Audit Trail</h1>
          <p className="text-sm text-muted-foreground">A record of mutating actions across the workspace.</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        isLoading={isLoading}
        pageCount={data?.meta.totalPages}
        pageIndex={page}
        onPageChange={setPage}
        emptyTitle="No audit entries yet"
      />
    </div>
  );
}
