"use client";

import * as React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { ContentCard } from "@/components/cards/content-card";
import { CardGridSkeleton } from "@/components/loaders/skeletons";
import { NoResultsState } from "@/components/empty-state/no-results-state";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useDocuments, useDocumentSearch, useCategories } from "@/hooks";

type SortOption = "newest" | "oldest" | "updated";

export default function ExplorePage() {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortOption>("newest");
  const [categoryId, setCategoryId] = React.useState<string>("");
  const [page, setPage] = React.useState(0);
  const debouncedQuery = useDebouncedValue(query);
  const isSearching = debouncedQuery.trim().length > 0;

  const { data: categories } = useCategories({ page: 1, limit: 50 });
  const { data: searchResults, isLoading: isSearchLoading } = useDocumentSearch(debouncedQuery);
  const { data: listResults, isLoading: isListLoading } = useDocuments({
    page: page + 1,
    limit: 12,
    sort: sort === "updated" ? "updatedAt" : "createdAt",
    order: sort === "oldest" ? "asc" : "desc",
  });

  const items = isSearching ? searchResults ?? [] : listResults?.items ?? [];
  const filteredItems = categoryId ? items.filter((doc) => doc.categoryId === categoryId) : items;
  const isLoading = isSearching ? isSearchLoading : isListLoading;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Explore public work</h1>
        <p className="mt-2 text-muted-foreground">Browse documents and templates shared by the community.</p>
      </div>

      <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search public documents…"
            className="pl-9"
          />
        </div>

        <Select value={sort} onValueChange={(value) => setSort(value as SortOption)}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="updated">Recently updated</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                {categories?.items.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </PopoverContent>
        </Popover>
      </div>

      <div className="mt-10">
        {isLoading ? (
          <CardGridSkeleton count={9} />
        ) : filteredItems.length === 0 ? (
          <NoResultsState query={isSearching ? debouncedQuery : undefined} onClearFilters={() => setCategoryId("")} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((doc) => (
              <ContentCard
                key={doc._id}
                href={`/dashboard/documents/${doc._id}`}
                item={{
                  id: doc._id,
                  title: doc.title,
                  description: doc.content.slice(0, 140),
                  updatedAt: doc.updatedAt,
                  isAiGenerated: doc.aiGenerated,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {!isSearching && listResults && listResults.meta.totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 0} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <span className="flex items-center px-3 text-sm text-muted-foreground">
            Page {page + 1} of {listResults.meta.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page + 1 >= listResults.meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
