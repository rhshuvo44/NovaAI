"use client";

import { motion } from "framer-motion";
import { FileText, Megaphone, Mail, ClipboardList } from "lucide-react";

const TEMPLATES = [
  { icon: Megaphone, title: "Product launch brief", category: "Marketing" },
  { icon: Mail, title: "Customer follow-up", category: "Sales" },
  { icon: ClipboardList, title: "Sprint retro notes", category: "Engineering" },
  { icon: FileText, title: "Board update memo", category: "Leadership" },
];

export function TemplatesSection() {
  return (
    <section className="bg-surface-sunken px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Start from a template
          </h2>
          <p className="mt-3 text-muted-foreground">Skip the blank page. Adapt a starting point built for your team.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEMPLATES.map((template, index) => (
            <motion.div
              key={template.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="cursor-pointer rounded-2xl border border-border bg-surface-raised p-5 transition-shadow hover:shadow-md"
            >
              <template.icon className="h-6 w-6 text-amber-500" />
              <p className="mt-4 text-sm font-medium">{template.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{template.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
