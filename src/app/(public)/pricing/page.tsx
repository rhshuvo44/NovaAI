import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PRICING_PLANS } from "@/constants/pricing";
import { FaqSection } from "@/features/marketing/components/faq-section";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for NovaAI. Start free, upgrade when you need more.",
};

export default function PricingPage() {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 py-16 text-center lg:px-8">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Pricing built for how you actually work</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Start free. Upgrade only when your usage grows. No hidden fees, no surprise overages.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-2xl border p-8",
                plan.highlighted ? "border-amber-400 bg-amber-50/40 shadow-lg dark:bg-amber-900/10" : "border-border bg-surface-raised"
              )}
            >
              {plan.highlighted && <Badge variant="primary">Most popular</Badge>}
              <h2 className="mt-3 font-display text-xl font-semibold">{plan.name}</h2>
              <p className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-semibold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">/ {plan.period}</span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 w-full" size="lg" variant={plan.highlighted ? "primary" : "outline"}>
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>

      <FaqSection />
    </div>
  );
}
