import type { Metadata, Viewport } from "next";
import { fraunces, inter, jetbrainsMono } from "@/lib/fonts";
import { AppProviders } from "@/providers/app-providers";
import { env } from "@/lib/env";
import "highlight.js/styles/atom-one-dark.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: "AI Workspace — Write, think, and ship with AI at the margin",
    template: "%s · AI Workspace",
  },
  description:
    "AI Workspace is where documents, prompts, and AI collaboration live in one place. Draft, summarize, and organize your work with an AI that annotates, not replaces.",
  keywords: [
    "AI workspace",
    "AI document editor",
    "AI chat",
    "AI summarizer",
    "prompt library",
    "knowledge management",
  ],
  authors: [{ name: "AI Workspace" }],
  creator: "AI Workspace",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: env.siteUrl,
    siteName: env.siteName,
    title: "AI Workspace — Write, think, and ship with AI at the margin",
    description:
      "Documents, prompts, and AI collaboration in one place. Draft, summarize, and organize your work with an AI that annotates, not replaces.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Workspace" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Workspace — Write, think, and ship with AI at the margin",
    description:
      "Documents, prompts, and AI collaboration in one place. Draft, summarize, and organize your work with an AI that annotates, not replaces.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#14120f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
