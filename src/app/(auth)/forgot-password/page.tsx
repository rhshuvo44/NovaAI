import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reset password",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="font-display text-2xl">Reset password</h1>
      <p className="text-muted-foreground">
        Password reset is not yet implemented. Please contact support.
      </p>
      <Link href="/login" className="text-sm text-amber-600 hover:text-amber-700">
        Back to login
      </Link>
    </div>
  );
}
