import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl bg-ink-950 px-8 py-16 text-center text-paper-100">
        <h2 className="font-display text-3xl font-semibold text-white tracking-tight sm:text-4xl">
          Start writing with AI in the margin
        </h2>
        <p className="mx-auto mt-3 max-w-md text-neutral-400">
          Free to start. No credit card required. Set up your first document in under a minute.
        </p>
        <Button size="lg" className="mt-8" asChild>
          <Link href="/register">
            Create your workspace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
