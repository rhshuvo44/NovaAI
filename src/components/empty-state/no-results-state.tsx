import { SearchX } from "lucide-react";
import { EmptyState } from "./empty-state";
import { Button } from "@/components/ui/button";

interface NoResultsStateProps {
  query?: string;
  onClearFilters?: () => void;
}

export function NoResultsState({ query, onClearFilters }: NoResultsStateProps) {
  return (
    <EmptyState
      icon={SearchX}
      title={query ? `No results for "${query}"` : "No results found"}
      description="Try adjusting your search or filters to find what you're looking for."
      action={
        onClearFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            Clear filters
          </Button>
        )
      }
    />
  );
}
