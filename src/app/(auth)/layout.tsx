import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col items-center justify-center px-4 py-12 lg:w-1/2">
        <div className="mb-8">
          <Logo />
        </div>
        {children}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          By continuing, you agree to AI Workspace&apos;s{" "}
          <Link href="/terms" className="underline hover:text-foreground">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      <div className="relative hidden w-1/2 overflow-hidden bg-ink-950 lg:flex lg:items-center lg:justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(232,163,61,0.18),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(63,167,160,0.18),transparent_45%)]" />
        <div className="relative z-10 max-w-md px-8 text-paper-100">
          <p className="font-display text-3xl italic leading-snug">
            &ldquo;The margin is where the thinking happens.&rdquo;
          </p>
          <p className="mt-4 text-sm text-neutral-400">
            AI Workspace annotates your documents, drafts, and prompts without ever taking the pen out of your hand.
          </p>
        </div>
      </div>
    </div>
  );
}
