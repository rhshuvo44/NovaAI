import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Reset password",
};

export default function ForgotPasswordPage() {
  // Clerk's <SignIn> component handles the full "forgot password" flow
  // internally (the "Forgot password?" link inside the sign-in form), so
  // this route exists purely so the URL from the marketing/email copy
  // ("/forgot-password") resolves somewhere sensible rather than 404ing.
  redirect("/login");
}
