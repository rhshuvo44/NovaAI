"use client";

import * as React from "react";
import { Wand2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AiToolLayout } from "@/features/ai/components/ai-tool-layout";
import { AiOutputPanel } from "@/features/ai/components/ai-output-panel";
import { useOptimizePromptText } from "@/hooks";

export default function PromptOptimizerPage() {
  const [prompt, setPrompt] = React.useState("");
  const optimize = useOptimizePromptText();

  return (
    <AiToolLayout
      title="Prompt Optimizer"
      description="Rewrite a rough prompt to be clearer and more effective."
      icon={<Wand2 className="h-5 w-5" />}
      input={
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="optimizer-prompt">Your prompt</Label>
              <Textarea
                id="optimizer-prompt"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                rows={8}
                placeholder="write something about our product"
                className="font-mono text-sm"
              />
            </div>
            <Button
              className="w-full"
              disabled={optimize.isPending || prompt.trim().length === 0}
              onClick={() => optimize.mutate(prompt)}
            >
              {optimize.isPending ? "Optimizing…" : "Optimize prompt"}
            </Button>
          </CardContent>
        </Card>
      }
      output={
        <AiOutputPanel
          content={optimize.data?.optimizedPrompt ?? null}
          isLoading={optimize.isPending}
          onRegenerate={() => optimize.mutate(prompt)}
          emptyMessage="Write a rough prompt and we'll sharpen it."
        />
      }
    />
  );
}
