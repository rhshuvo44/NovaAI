"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-24 lg:px-8 lg:pt-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(232,163,61,0.10),transparent_45%),radial-gradient(circle_at_85%_30%,rgba(63,167,160,0.10),transparent_45%)]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3 w-3 text-accent" />
            Now with AI-powered prompt optimization
          </span>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Write, think, and ship —{" "}
            <span className="italic text-amber-500">with AI at the margin.</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            NovaAI brings documents, prompts, and AI collaboration into one place. Draft, summarize, and
            organize your work with an assistant that annotates — it never takes the pen out of your hand.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/register">
                Start for free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/explore">Explore the workspace</Link>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">No credit card required. Free plan included.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="relative rounded-2xl border border-border bg-surface-raised p-6 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-teal-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
              <span className="ml-2 text-xs text-muted-foreground">Q3-strategy-draft.md</span>
            </div>

            <div className="mt-4 space-y-3 font-mono text-sm">
              <p className="font-display text-lg font-semibold not-italic text-foreground">Q3 Growth Strategy</p>
              <p className="text-muted-foreground">
                Our retention numbers improved 14% quarter over quarter, driven primarily by the onboarding
                redesign shipped in April.
              </p>

              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="annotation-tick rounded-lg bg-teal-50 p-3 text-xs text-teal-800 dark:bg-teal-900/20 dark:text-teal-300"
              >
                <span className="mb-1 flex items-center gap-1 font-semibold">
                  <Sparkles className="h-3 w-3" />
                  AI suggestion
                </span>
                Consider citing the specific cohort data here — it strengthens the causal claim.
              </motion.div>

              <p className="text-muted-foreground">
                Next, we should focus on expansion revenue from existing accounts...
              </p>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 -top-4 flex items-center gap-2 rounded-xl border border-border bg-surface-raised px-3 py-2 shadow-lg"
          >
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-xs font-medium">Summarized in 2s</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
