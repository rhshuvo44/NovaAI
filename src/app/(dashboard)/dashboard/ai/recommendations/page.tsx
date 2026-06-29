"use client";

import Link from "next/link";
import { Lightbulb, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CardGridSkeleton } from "@/components/loaders/skeletons";
import { EmptyState } from "@/components/empty-state/empty-state";
import { useRecommendations } from "@/hooks";

export default function RecommendationsPage() {
  const { data, isLoading } = useRecommendations(8);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-xl font-semibold">Recommended for you</h1>
          <p className="text-sm text-muted-foreground">Based on your recent documents and activity.</p>
        </div>
      </div>

      {isLoading ? (
        <CardGridSkeleton />
      ) : data?.recommendations.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.recommendations.map((rec) => (
            <Link key={rec.documentId} href={`/dashboard/documents/${rec.documentId}`}>
              <Card className="annotation-tick h-full pl-5 transition-shadow hover:shadow-md">
                <CardContent className="space-y-2 pt-6">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{rec.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.reason}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Lightbulb}
          title="Nothing to recommend yet"
          description="Create a few documents and we'll start surfacing related work."
        />
      )}
    </div>
  );
}
