import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";
import { BLOG_POSTS, getBlogPostBySlug } from "@/constants/blog-posts";
import { getBlogPostingJsonLd } from "@/lib/structured-data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const initials = post.author
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBlogPostingJsonLd(post)) }}
      />
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to blog
      </Link>

      <div className="mt-6">
        <Badge variant="accent">{post.category}</Badge>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>

        <div className="mt-5 flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{post.author}</p>
            <p className="text-xs text-muted-foreground">
              {post.authorRole} · {format(new Date(post.publishedAt), "MMMM d, yyyy")} · {post.readingMinutes} min read
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <MarkdownRenderer content={post.content} />
      </div>
    </article>
  );
}
