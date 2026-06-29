"use client";

import * as React from "react";
import { Search, FileText, Sparkles, ShieldCheck, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NoResultsState } from "@/components/empty-state/no-results-state";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

const HELP_ARTICLES = [
  { title: "Getting started with your first document", category: "Basics", icon: FileText },
  { title: "How AI summarization works", category: "AI Features", icon: Sparkles },
  { title: "Writing effective prompts (or letting us optimize them)", category: "AI Features", icon: Sparkles },
  { title: "Understanding document visibility and sharing", category: "Security", icon: ShieldCheck },
  { title: "Setting up role-based access for your team", category: "Security", icon: ShieldCheck },
  { title: "Managing your subscription and billing", category: "Billing", icon: CreditCard },
  { title: "Exporting your documents and data", category: "Basics", icon: FileText },
  { title: "Troubleshooting AI chat response delays", category: "AI Features", icon: Sparkles },
];

export default function HelpCenterPage() {
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebouncedValue(query, 200);

  const filtered = HELP_ARTICLES.filter((article) =>
    article.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight">How can we help?</h1>
        <div className="relative mx-auto mt-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search help articles…"
            className="pl-9"
          />
        </div>
      </div>

      <div className="mt-10 space-y-3">
        {filtered.length === 0 ? (
          <NoResultsState query={debouncedQuery} onClearFilters={() => setQuery("")} />
        ) : (
          filtered.map((article) => (
            <Card key={article.title} className="cursor-pointer transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-3 pt-6">
                <article.icon className="h-5 w-5 shrink-0 text-primary" />
                <p className="flex-1 text-sm font-medium">{article.title}</p>
                <Badge variant="outline">{article.category}</Badge>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-surface-sunken p-6 text-center">
        <p className="font-medium">Still need help?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Reach out to our team directly and we&apos;ll get back to you within one business day.
        </p>
        <a href="/contact" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
          Contact support →
        </a>
      </div>
    </div>
  );
}
