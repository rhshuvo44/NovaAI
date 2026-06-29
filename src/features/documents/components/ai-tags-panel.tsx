"use client";

import * as React from "react";
import { Tags, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGenerateTags } from "@/hooks";

interface AiTagsPanelProps {
  content: string;
}

export function AiTagsPanel({ content }: AiTagsPanelProps) {
  const [tags, setTags] = React.useState<string[]>([]);
  const generateTags = useGenerateTags();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-medium">
          <Tags className="h-4 w-4 text-accent" />
          Suggested tags
        </p>
        <Button
          variant="ghost"
          size="sm"
          disabled={generateTags.isPending || content.trim().length === 0}
          onClick={() => generateTags.mutate(content, { onSuccess: (result) => setTags(result.tags) })}
        >
          {generateTags.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
          Generate
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} variant="accent">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
