"use client";

import * as React from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSummarizeText } from "@/hooks";

interface AiSummaryPanelProps {
  content: string;
}

export function AiSummaryPanel({ content }: AiSummaryPanelProps) {
  const [summary, setSummary] = React.useState<string | null>(null);
  const summarize = useSummarizeText();

  return (
    <Card className="border-teal-200 bg-teal-50/40 dark:border-teal-800 dark:bg-teal-900/10">
      <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 text-accent" />
          AI Summary
        </CardTitle>
        <Button
          variant="accent"
          size="sm"
          disabled={summarize.isPending || content.trim().length === 0}
          onClick={() =>
            summarize.mutate(
              { text: content, maxSentences: 3 },
              { onSuccess: (result) => setSummary(result.summary) }
            )
          }
        >
          {summarize.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
          {summary ? "Regenerate" : "Summarize"}
        </Button>
      </CardHeader>
      {summary && (
        <CardContent className="annotation-tick pl-5 text-sm text-foreground/90">{summary}</CardContent>
      )}
    </Card>
  );
}
