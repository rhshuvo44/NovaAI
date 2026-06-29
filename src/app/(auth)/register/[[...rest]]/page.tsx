import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-appearance";

export const metadata: Metadata = {
  title: "Create your account",
  description: "Create your AI Workspace account and start collaborating with AI today.",
};

export default function RegisterPage() {
  return <SignUp appearance={clerkAppearance} path="/register" signInUrl="/login" />;
}
