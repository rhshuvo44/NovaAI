import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BLOG_POSTS } from "@/constants/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on AI, product design, and building tools for people who think on the page.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight">From the team</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Notes on AI, product design, and building tools for people who think on the page.
        </p>
      </div>

      <div className="mt-12 space-y-4">
        {BLOG_POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="space-y-2 pt-6">
                <div className="flex items-center gap-2">
                  <Badge variant="accent">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(post.publishedAt), "MMMM d, yyyy")} · {post.readingMinutes} min read
                  </span>
                </div>
                <h2 className="font-display text-xl font-semibold">{post.title}</h2>
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                <p className="text-xs text-muted-foreground">
                  {post.author}, {post.authorRole}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
