"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";
import { LayoutGrid, List, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/tables/data-table";
import { createSelectionColumn } from "@/components/tables/selection-column";
import { ContentCard } from "@/components/cards/content-card";
import { CardGridSkeleton } from "@/components/loaders/skeletons";
import { NoResultsState } from "@/components/empty-state/no-results-state";
import { CreateDocumentDialog } from "@/features/documents/components/create-document-dialog";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useDocuments, useDocumentSearch, useBulkDeleteDocuments } from "@/hooks";
import type { Document } from "@/types/document";

type ViewMode = "grid" | "table";

function DocumentsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(0);
  const debouncedSearch = useDebouncedValue(search);
  const bulkDelete = useBulkDeleteDocuments();

  React.useEffect(() => {
    if (searchParams.get("search") === "true") {
      setViewMode("table");
    }
  }, [searchParams]);

  const isSearching = debouncedSearch.trim().length > 0;
  const { data: searchResults, isLoading: isSearchLoading } = useDocumentSearch(debouncedSearch);
  const { data: listResults, isLoading: isListLoading } = useDocuments({
    page: page + 1,
    limit: 12,
    sort: "updatedAt",
    order: "desc",
  });

  const items = isSearching ? searchResults ?? [] : listResults?.items ?? [];
  const isLoading = isSearching ? isSearchLoading : isListLoading;

  const columns: ColumnDef<Document>[] = [
    createSelectionColumn<Document>(),
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <Link href={`/dashboard/documents/${row.original._id}`} className="font-medium hover:underline">
          {row.original.title}
        </Link>
      ),
    },
    {
      accessorKey: "isPublic",
      header: "Visibility",
      cell: ({ row }) => <Badge variant={row.original.isPublic ? "accent" : "outline"}>{row.original.isPublic ? "Public" : "Private"}</Badge>,
    },
    {
      accessorKey: "version",
      header: "Version",
    },
    {
      accessorKey: "updatedAt",
      header: "Last updated",
      cell: ({ row }) => format(new Date(row.original.updatedAt), "MMM d, yyyy"),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">My Documents</h1>
          <p className="text-sm text-muted-foreground">Everything you&apos;re writing, drafting, or summarizing.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border p-0.5">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("table")}
              aria-label="Table view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <CreateDocumentDialog />
        </div>
      </div>

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search documents…"
        className="w-full max-w-sm rounded-lg border border-border-strong bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />

      {viewMode === "grid" ? (
        isLoading ? (
          <CardGridSkeleton />
        ) : items.length === 0 ? (
          <NoResultsState query={isSearching ? debouncedSearch : undefined} />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((doc) => (
              <ContentCard
                key={doc._id}
                href={`/dashboard/documents/${doc._id}`}
                item={{
                  id: doc._id,
                  title: doc.title,
                  description: doc.content.slice(0, 140),
                  updatedAt: doc.updatedAt,
                  isAiGenerated: doc.aiGenerated,
                  tags: [],
                }}
              />
            ))}
          </div>
        )
      ) : (
        <DataTable
          columns={columns}
          data={items}
          isLoading={isLoading}
          enableRowSelection
          pageCount={listResults?.meta.totalPages}
          pageIndex={page}
          onPageChange={(p) => {
            setPage(p);
            router.push(`/dashboard/documents?page=${p + 1}`);
          }}
          bulkActions={(selected) => (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-error hover:text-error"
              onClick={() => bulkDelete.mutate(selected.map((d) => d._id))}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          )}
          emptyTitle="No documents found"
          emptyDescription="Create your first document or adjust your search."
        />
      )}
    </div>
  );
}

export default function DocumentsPage() {
  return (
    <React.Suspense fallback={<CardGridSkeleton />}>
      <DocumentsPageContent />
    </React.Suspense>
  );
}
