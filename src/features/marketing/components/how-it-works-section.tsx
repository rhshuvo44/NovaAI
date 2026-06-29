"use client";

import { motion } from "framer-motion";
import { FilePlus, Sparkles, Share2 } from "lucide-react";

const STEPS = [
  {
    icon: FilePlus,
    title: "Create or import",
    description: "Start a new document, paste in existing content, or upload a file to bring into your workspace.",
  },
  {
    icon: Sparkles,
    title: "Let AI annotate",
    description: "Summarize, generate tags, optimize prompts, or chat through your ideas — all in context.",
  },
  {
    icon: Share2,
    title: "Organize and share",
    description: "Tag, categorize, and favorite your best work. Share what's ready, keep drafts private.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
          <p className="mt-3 text-muted-foreground">Three steps from blank page to finished work.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 font-display text-lg font-semibold text-ink-950">
                {index + 1}
              </div>
              <step.icon className="mt-4 h-5 w-5 text-accent" />
              <h3 className="mt-3 font-medium">{step.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
