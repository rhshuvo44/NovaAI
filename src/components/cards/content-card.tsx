"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Bookmark, Share2, FileText, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface ContentCardData {
  id: string;
  title: string;
  description: string;
  categoryLabel?: string;
  tags?: string[];
  updatedAt: string;
  isAiGenerated?: boolean;
  isFavorited?: boolean;
}

interface ContentCardProps {
  item: ContentCardData;
  href: string;
  onToggleFavorite?: (id: string) => void;
  className?: string;
}

export function ContentCard({ item, href, onToggleFavorite, className }: ContentCardProps) {
  return (
    <Card className={cn("flex h-full flex-col transition-shadow hover:shadow-md", className)}>
      <div className="relative flex h-32 items-center justify-center rounded-t-xl bg-gradient-to-br from-amber-50 to-teal-50 dark:from-amber-900/15 dark:to-teal-900/15">
        <FileText className="h-8 w-8 text-amber-400/70" />
        {item.isAiGenerated && (
          <Badge variant="accent" className="absolute left-3 top-3">
            <Sparkles className="h-3 w-3" />
            AI generated
          </Badge>
        )}
      </div>

      <CardContent className="flex-1 space-y-2 pt-4">
        <Link href={href} className="line-clamp-1 font-medium hover:underline">
          {item.title}
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {item.categoryLabel && <Badge variant="primary">{item.categoryLabel}</Badge>}
          {item.tags?.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border pt-3">
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label={item.isFavorited ? "Remove from favorites" : "Add to favorites"}
            onClick={() => onToggleFavorite?.(item.id)}
          >
            <Bookmark className={cn("h-4 w-4", item.isFavorited && "fill-current text-primary")} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Share"
            onClick={() => {
              void navigator.clipboard.writeText(`${window.location.origin}${href}`);
              toast.success("Link copied to clipboard");
            }}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
