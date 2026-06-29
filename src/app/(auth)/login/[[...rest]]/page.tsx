import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { DemoLoginButton } from "@/features/auth/components/demo-login-button";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your NovaAI account.",
};

export default function LoginPage() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <DemoLoginButton />
      <SignIn appearance={clerkAppearance} path="/login" signUpUrl="/register" />
    </div>
  );
}
