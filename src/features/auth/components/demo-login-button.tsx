"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/api";
import { useAuthStore } from "@/store/use-auth-store";

const DEMO_EMAIL = process.env.NEXT_PUBLIC_DEMO_ACCOUNT_EMAIL;
const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_ACCOUNT_PASSWORD;

export function DemoLoginButton() {
  const router = useRouter();
  const setTokens = useAuthStore((s) => s.setTokens);
  const [isLoading, setIsLoading] = React.useState(false);

  if (!DEMO_EMAIL || !DEMO_PASSWORD) return null;

  async function handleDemoLogin() {
    setIsLoading(true);
    try {
      const result = await authService.login({ email: DEMO_EMAIL!, password: DEMO_PASSWORD! });
      setTokens(result.accessToken, result.refreshToken);
      router.push("/dashboard");
    } catch {
      toast.error("Couldn't start the demo session.");
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
