"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/shared/copy-button";
import { FullPageSpinner } from "@/components/loaders/spinner";
import { ErrorState } from "@/components/empty-state/error-state";
import { usePrompt, useOptimizePrompt, useDeletePrompt } from "@/hooks";

export default function PromptDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: prompt, isLoading, isError, refetch } = usePrompt(params.id);
  const optimizePrompt = useOptimizePrompt();
  const deletePrompt = useDeletePrompt();

  if (isLoading) return <FullPageSpinner />;
  if (isError || !prompt) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/prompts")}>
        <ArrowLeft className="h-4 w-4" />
        Back to library
      </Button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold">{prompt.title}</h1>
          <Badge variant="accent" className="mt-2">
            {prompt.feature}
          </Badge>
        </div>
        <Button
          variant="outline"
          className="text-error hover:text-error"
          onClick={() => deletePrompt.mutate(prompt._id, { onSuccess: () => router.push("/dashboard/prompts") })}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm">Original prompt</CardTitle>
          <CopyButton value={prompt.content} />
        </CardHeader>
        <CardContent className="font-mono text-sm whitespace-pre-wrap">{prompt.content}</CardContent>
      </Card>

      <Card className="border-teal-200 bg-teal-50/40 dark:border-teal-800 dark:bg-teal-900/10">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-accent" />
            Optimized version
          </CardTitle>
          <div className="flex items-center gap-2">
            {prompt.optimizedVersion && <CopyButton value={prompt.optimizedVersion} />}
            <Button
              variant="accent"
              size="sm"
              disabled={optimizePrompt.isPending}
              onClick={() => optimizePrompt.mutate(prompt._id)}
            >
              {optimizePrompt.isPending ? "Optimizing…" : prompt.optimizedVersion ? "Re-optimize" : "Optimize"}
            </Button>
          </div>
        </CardHeader>
        {prompt.optimizedVersion && (
          <CardContent className="annotation-tick pl-5 font-mono text-sm whitespace-pre-wrap">
            {prompt.optimizedVersion}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
