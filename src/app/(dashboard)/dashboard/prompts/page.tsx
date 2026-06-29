"use client";

import Link from "next/link";
import { Star, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardGridSkeleton } from "@/components/loaders/skeletons";
import { EmptyState } from "@/components/empty-state/empty-state";
import { CreatePromptDialog } from "@/features/prompts/components/create-prompt-dialog";
import { usePrompts, useTogglePromptFavorite } from "@/hooks";
import { cn } from "@/lib/utils";

const FEATURE_LABELS: Record<string, string> = {
  chat: "Chat",
  content_generator: "Content",
  prompt_optimizer: "Optimizer",
  summarizer: "Summary",
  tags_generator: "Tags",
  recommendation: "Recommend",
};

export default function PromptsPage() {
  const { data, isLoading } = usePrompts({ page: 1, limit: 24 });
  const toggleFavorite = useTogglePromptFavorite();

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Prompt Library</h1>
          <p className="text-sm text-muted-foreground">Save and reuse the prompts that work best for you.</p>
        </div>
        <CreatePromptDialog />
      </div>

      {isLoading ? (
        <CardGridSkeleton />
      ) : data?.items.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((prompt) => (
            <Card key={prompt._id} className="flex flex-col">
              <CardContent className="flex-1 space-y-2 pt-6">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/dashboard/prompts/${prompt._id}`} className="font-medium hover:underline">
                    {prompt.title}
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0"
                    onClick={() => toggleFavorite.mutate(prompt._id)}
                    aria-label="Toggle favorite"
                  >
                    <Star className={cn("h-4 w-4", prompt.isFavorite && "fill-current text-primary")} />
                  </Button>
                </div>
                <p className="line-clamp-3 font-mono text-xs text-muted-foreground">{prompt.content}</p>
              </CardContent>
              <CardFooter className="justify-between border-t border-border pt-3">
                <Badge variant="accent">{FEATURE_LABELS[prompt.feature] ?? prompt.feature}</Badge>
                <span className="text-xs text-muted-foreground">{prompt.usageCount} uses</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon={Sparkles} title="No prompts yet" description="Save your first prompt to build your library." />
      )}
    </div>
  );
}
