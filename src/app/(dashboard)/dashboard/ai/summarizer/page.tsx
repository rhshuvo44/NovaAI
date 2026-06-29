"use client";

import * as React from "react";
import { FileSearch } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AiToolLayout } from "@/features/ai/components/ai-tool-layout";
import { AiOutputPanel } from "@/features/ai/components/ai-output-panel";
import { useSummarizeText } from "@/hooks";

export default function SummarizerPage() {
  const [text, setText] = React.useState("");
  const summarize = useSummarizeText();

  return (
    <AiToolLayout
      title="Summarizer"
      description="Condense long text into a few clear sentences."
      icon={<FileSearch className="h-5 w-5" />}
      input={
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="summarizer-text">Text to summarize</Label>
              <Textarea
                id="summarizer-text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                rows={12}
                placeholder="Paste an article, report, or document…"
              />
            </div>
            <Button
              className="w-full"
              disabled={summarize.isPending || text.trim().length === 0}
              onClick={() => summarize.mutate({ text, maxSentences: 3 })}
            >
              {summarize.isPending ? "Summarizing…" : "Summarize"}
            </Button>
          </CardContent>
        </Card>
      }
      output={
        <AiOutputPanel
          content={summarize.data?.summary ?? null}
          isLoading={summarize.isPending}
          onRegenerate={() => summarize.mutate({ text, maxSentences: 3 })}
          emptyMessage="Paste some text to get a concise summary."
        />
      }
    />
  );
}
