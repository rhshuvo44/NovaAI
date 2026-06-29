"use client";

import { format } from "date-fns";
import { FileText, History as HistoryIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ListItemSkeleton } from "@/components/loaders/skeletons";
import { EmptyState } from "@/components/empty-state/empty-state";
import { useDocuments } from "@/hooks";

export default function HistoryPage() {
  const { data, isLoading } = useDocuments({ page: 1, limit: 30, sort: "updatedAt", order: "desc" });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">History</h1>
        <p className="text-sm text-muted-foreground">A timeline of your recent work.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="space-y-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <ListItemSkeleton key={i} />
              ))}
            </div>
          ) : data?.items.length ? (
            <ol className="relative space-y-6 border-l border-border pl-6">
              {data.items.map((doc) => (
                <li key={doc._id} className="relative">
                  <span className="absolute -left-[29px] flex h-4 w-4 items-center justify-center rounded-full bg-amber-400">
                    <FileText className="h-2.5 w-2.5 text-ink-950" />
                  </span>
                  <p className="text-sm font-medium">{doc.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Updated {format(new Date(doc.updatedAt), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <EmptyState icon={HistoryIcon} title="No activity yet" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
