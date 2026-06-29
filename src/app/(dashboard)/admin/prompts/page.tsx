"use client";

import { BookOpen } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CardGridSkeleton } from "@/components/loaders/skeletons";
import { EmptyState } from "@/components/empty-state/empty-state";
import { usePrompts } from "@/hooks";

export default function AdminPromptsPage() {
  const { data, isLoading } = usePrompts({ page: 1, limit: 30 });
  const publicPrompts = data?.items.filter((p) => p.isPublic) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Prompt Library</h1>
        <p className="text-sm text-muted-foreground">Public prompts shared across the workspace.</p>
      </div>

      {isLoading ? (
        <CardGridSkeleton />
      ) : publicPrompts.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {publicPrompts.map((prompt) => (
            <Card key={prompt._id}>
              <CardContent className="space-y-2 pt-6">
                <p className="font-medium">{prompt.title}</p>
                <p className="line-clamp-3 font-mono text-xs text-muted-foreground">{prompt.content}</p>
              </CardContent>
              <CardFooter className="justify-between border-t border-border pt-3">
                <Badge variant="accent">{prompt.feature}</Badge>
                <span className="text-xs text-muted-foreground">{prompt.usageCount} uses</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon={BookOpen} title="No public prompts yet" description="Prompts marked public will appear here." />
      )}
    </div>
  );
}
