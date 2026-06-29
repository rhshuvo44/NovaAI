"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { FileText, MessageSquare, BookOpen, Bell, Plus, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/cards/stat-card";
import { AreaChart } from "@/components/charts/area-chart";
import { StatCardSkeleton } from "@/components/loaders/skeletons";
import { ErrorState } from "@/components/empty-state/error-state";
import { EmptyState } from "@/components/empty-state/empty-state";
import { useDashboardOverview, useAnalyticsSummary, useDocuments, useCreateChat, useCreateDocument } from "@/hooks";

export default function DashboardOverviewPage() {
  const router = useRouter();
  const { data: overview, isLoading, isError, refetch } = useDashboardOverview();
  const { data: analytics } = useAnalyticsSummary(14);
  const { data: recentDocs } = useDocuments({ page: 1, limit: 5, sort: "updatedAt", order: "desc" });
  const createChat = useCreateChat();
  const createDocument = useCreateDocument();

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Overview</h1>
          <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s happening in your workspace.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() =>
              createDocument.mutate(
                { title: "Untitled document", content: "" },
                { onSuccess: (doc) => router.push(`/dashboard/documents/${doc._id}`) }
              )
            }
          >
            <Plus className="h-4 w-4" />
            New document
          </Button>
          <Button
            onClick={() =>
              createChat.mutate(undefined, { onSuccess: (chat) => router.push(`/dashboard/chat/${chat._id}`) })
            }
          >
            <Sparkles className="h-4 w-4" />
            New AI chat
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading || !overview ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard label="Documents" value={overview.documentCount} icon={FileText} accent="primary" />
            <StatCard label="Active chats" value={overview.activeChatCount} icon={MessageSquare} accent="accent" />
            <StatCard label="Saved prompts" value={overview.promptCount} icon={BookOpen} accent="primary" />
            <StatCard label="Unread notifications" value={overview.unreadNotificationCount} icon={Bell} accent="accent" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity, last 14 days</CardTitle>
            <CardDescription>API requests and AI interactions across your workspace.</CardDescription>
          </CardHeader>
          <CardContent>
            {analytics?.dailyTimeSeries.length ? (
              <AreaChart data={analytics.dailyTimeSeries} xKey="date" yKey="count" />
            ) : (
              <EmptyState title="No activity yet" description="Your activity chart will populate as you use the workspace." />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent documents</CardTitle>
            <CardDescription>Your most recently updated work.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentDocs?.items.length ? (
              <ul className="space-y-3">
                {recentDocs.items.map((doc) => (
                  <li key={doc._id}>
                    <Link
                      href={`/dashboard/documents/${doc._id}`}
                      className="flex items-center gap-3 rounded-lg p-2 -mx-2 transition-colors hover:bg-muted"
                    >
                      <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(doc.updatedAt), { addSuffix: true })}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState title="No documents yet" description="Create your first document to get started." />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
