import type { Metadata } from "next";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Create your account",
  description: "Create your NovaAI account and start collaborating with AI today.",
};

export default function RegisterPage() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <RegisterForm />
    </div>
  );
}
