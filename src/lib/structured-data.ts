import { env } from "@/lib/env";

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: env.siteName,
    url: env.siteUrl,
    description: "AI Workspace is an AI-powered SaaS platform for document management, chat, and prompt collaboration.",
  };
}

export function getSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: env.siteName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function getBlogPostingJsonLd(post: { title: string; excerpt: string; author: string; publishedAt: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.publishedAt,
    url: `${env.siteUrl}/blog/${post.slug}`,
  };
}
