"use client";

import { motion } from "framer-motion";
import { Sparkles, User } from "lucide-react";

export function AiShowcaseSection() {
  return (
    <section className="bg-ink-950 px-4 py-20 text-paper-100 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-900 px-3 py-1 text-xs font-medium text-teal-300">
              <Sparkles className="h-3 w-3" />
              AI Chat
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Ask, draft, and refine — without leaving your workspace
            </h2>
            <p className="mt-4 text-neutral-400">
              AI Workspace chat understands your documents and prompt library. Ask it to summarize a report,
              draft a follow-up email, or brainstorm a structure for your next proposal.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Markdown rendering with syntax-highlighted code",
                "One-click copy for any AI response",
                "Full conversation history, searchable anytime",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-ink-700 bg-ink-900 p-5"
          >
            <div className="space-y-4">
              <div className="flex flex-row-reverse gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
                  <User className="h-4 w-4" />
                </div>
                <div className="rounded-2xl bg-amber-400 px-4 py-2.5 text-sm text-ink-950">
                  Summarize this contract in 3 bullet points
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-400/20 text-teal-300">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="annotation-tick max-w-[85%] rounded-2xl border border-ink-700 bg-ink-800 px-4 py-2.5 text-sm">
                  <ul className="space-y-1.5">
                    <li>• 12-month term, auto-renews unless cancelled 30 days prior</li>
                    <li>• Payment due net-30, 1.5% late fee after grace period</li>
                    <li>• Either party may terminate for material breach with 14-day cure window</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
