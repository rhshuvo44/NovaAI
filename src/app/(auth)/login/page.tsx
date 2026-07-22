import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your NovaAI account.",
};

export default function LoginPage() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <LoginForm />
    </div>
  );
}
