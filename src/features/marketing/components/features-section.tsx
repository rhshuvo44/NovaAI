"use client";

import { motion } from "framer-motion";
import { FileText, MessageSquare, Sparkles, Tags, Wand2, Search } from "lucide-react";

const FEATURES = [
  {
    icon: FileText,
    title: "Documents that remember context",
    description: "Every document carries its own history, categories, and tags — searchable in milliseconds.",
  },
  {
    icon: MessageSquare,
    title: "Conversational AI, in context",
    description: "Chat with AI that understands your workspace, not just the current message.",
  },
  {
    icon: Sparkles,
    title: "Summarize anything, instantly",
    description: "Turn a 10-page report into three sentences without losing the substance.",
  },
  {
    icon: Wand2,
    title: "Prompts that improve themselves",
    description: "The prompt optimizer rewrites rough instructions into ones that actually work.",
  },
  {
    icon: Tags,
    title: "Auto-tagging that's actually useful",
    description: "AI suggests tags based on content, not keyword stuffing.",
  },
  {
    icon: Search,
    title: "Search that understands intent",
    description: "Find what you meant, not just what you typed.",
  },
];

export function FeaturesSection() {
  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-3 text-muted-foreground">
            AI Workspace is built around a simple idea: AI should annotate your work, not replace your thinking.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="rounded-2xl border border-border bg-surface-raised p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-medium">{feature.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
