"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TESTIMONIALS = [
  {
    quote:
      "We moved our entire content review process into AI Workspace. The summarizer alone saves our team a few hours a week.",
    name: "Priya Nair",
    role: "Head of Content, Lumen Studio",
    initials: "PN",
  },
  {
    quote:
      "The prompt optimizer is the feature I didn't know I needed. My first drafts now get usable output instead of generic filler.",
    name: "Marcus Webb",
    role: "Product Marketer, Northwind",
    initials: "MW",
  },
  {
    quote: "Tagging used to be a chore. Now it's basically automatic, and search actually finds what I'm looking for.",
    name: "Elena Castillo",
    role: "Operations Lead, Fairwind Co.",
    initials: "EC",
  },
];

export function TestimonialsSection() {
  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Loved by teams who write a lot</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-2xl border border-border bg-surface-raised p-6"
            >
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{testimonial.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
