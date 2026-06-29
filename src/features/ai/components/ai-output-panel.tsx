import { Sparkles, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/copy-button";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";
import { EmptyState } from "@/components/empty-state/empty-state";
import { Spinner } from "@/components/loaders/spinner";

interface AiOutputPanelProps {
  content: string | null;
  isLoading: boolean;
  onRegenerate?: () => void;
  emptyMessage?: string;
}

export function AiOutputPanel({ content, isLoading, onRegenerate, emptyMessage = "Your result will appear here." }: AiOutputPanelProps) {
  return (
    <Card className="h-full border-teal-200 bg-teal-50/30 dark:border-teal-800 dark:bg-teal-900/10">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 text-accent" />
          AI Result
        </CardTitle>
        {content && !isLoading && (
          <div className="flex items-center gap-1">
            <CopyButton value={content} />
            {onRegenerate && (
              <Button variant="ghost" size="sm" onClick={onRegenerate}>
                <RotateCcw className="h-3.5 w-3.5" />
                Regenerate
              </Button>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="min-h-[200px]">
        {isLoading ? (
          <div className="flex h-full items-center justify-center py-12">
            <Spinner />
          </div>
        ) : content ? (
          <div className="annotation-tick pl-5">
            <MarkdownRenderer content={content} />
          </div>
        ) : (
          <EmptyState title={emptyMessage} className="py-12" />
        )}
      </CardContent>
    </Card>
  );
}
