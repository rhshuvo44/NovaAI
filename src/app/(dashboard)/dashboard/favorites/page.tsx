"use client";

import * as React from "react";
import Link from "next/link";
import { Star, FileText, BookOpen, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardGridSkeleton } from "@/components/loaders/skeletons";
import { EmptyState } from "@/components/empty-state/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { useFavorites } from "@/hooks";
import { FavoriteEntityType } from "@/types/ai";

const TYPE_CONFIG = {
  [FavoriteEntityType.DOCUMENT]: { label: "Documents", icon: FileText, href: "/dashboard/documents" },
  [FavoriteEntityType.PROMPT]: { label: "Prompts", icon: BookOpen, href: "/dashboard/prompts" },
  [FavoriteEntityType.CHAT]: { label: "Chats", icon: MessageSquare, href: "/dashboard/chat" },
};

export default function FavoritesPage() {
  const [tab, setTab] = React.useState<FavoriteEntityType>(FavoriteEntityType.DOCUMENT);
  const { data, isLoading } = useFavorites({ page: 1, limit: 24, entityType: tab });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Favorites</h1>
        <p className="text-sm text-muted-foreground">Everything you&apos;ve bookmarked, in one place.</p>
      </div>

      <Tabs value={tab} onValueChange={(value) => setTab(value as FavoriteEntityType)}>
        <TabsList>
          {Object.entries(TYPE_CONFIG).map(([type, config]) => (
            <TabsTrigger key={type} value={type}>
              {config.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(TYPE_CONFIG).map(([type, config]) => (
          <TabsContent key={type} value={type}>
            {isLoading ? (
              <CardGridSkeleton count={3} />
            ) : data?.items.length ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {data.items.map((favorite) => (
                  <Link key={favorite._id} href={`${config.href}/${favorite.entityId}`}>
                    <Card className="transition-shadow hover:shadow-md">
                      <CardContent className="flex items-center gap-3 pt-6">
                        <config.icon className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">Favorited {config.label.toLowerCase().slice(0, -1)}</span>
                        <Star className="ml-auto h-4 w-4 fill-current text-primary" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState icon={Star} title={`No favorite ${config.label.toLowerCase()} yet`} />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
