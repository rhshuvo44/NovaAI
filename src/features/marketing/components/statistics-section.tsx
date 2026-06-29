"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "40K+", label: "Documents drafted" },
  { value: "2.1M", label: "AI annotations made" },
  { value: "98.4%", label: "Uptime" },
  { value: "12s", label: "Avg. summary time" },
];

export function StatisticsSection() {
  return (
    <section className="border-y border-border bg-surface-sunken px-4 py-14 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 lg:grid-cols-4">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="text-center"
          >
            <p className="font-display text-3xl font-semibold tabular-nums lg:text-4xl">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
