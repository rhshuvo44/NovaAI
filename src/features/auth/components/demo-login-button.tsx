"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs/legacy";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const DEMO_EMAIL = process.env.NEXT_PUBLIC_DEMO_ACCOUNT_EMAIL;
const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_ACCOUNT_PASSWORD;

/**
 * Renders nothing unless a demo account has been configured via env vars.
 * This keeps the "Demo Login" feature available for sales/marketing demos
 * without ever shipping real credentials in the bundle by default.
 */
export function DemoLoginButton() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  if (!DEMO_EMAIL || !DEMO_PASSWORD) return null;

  const demoEmail = DEMO_EMAIL;
  const demoPassword = DEMO_PASSWORD;

  async function handleDemoLogin() {
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      const result = await signIn.create({
        identifier: demoEmail,
        password: demoPassword,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        toast.error("Demo sign-in is not fully configured. Please use a real account.");
      }
    } catch {
      toast.error("Couldn't start the demo session. Please try again or use a real account.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button variant="outline" className="w-full" onClick={handleDemoLogin} disabled={isLoading}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
      Try the live demo
    </Button>
  );
}
