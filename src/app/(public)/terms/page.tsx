import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of AI Workspace.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: June 1, 2026</p>

      <div className="prose prose-sm mt-8 max-w-none dark:prose-invert">
        <h2>1. Acceptance of terms</h2>
        <p>
          By creating an account or using AI Workspace, you agree to be bound by these Terms of Service. If you
          do not agree, do not use the service.
        </p>

        <h2>2. Description of service</h2>
        <p>
          AI Workspace provides document management, AI-assisted writing, chat, and prompt library
          functionality. Features may be added, modified, or removed at our discretion.
        </p>

        <h2>3. Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and for all
          activity under your account. Notify us immediately of any unauthorized use.
        </p>

        <h2>4. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the service to generate or distribute illegal, abusive, or infringing content.</li>
          <li>Attempt to gain unauthorized access to other accounts or our systems.</li>
          <li>Use automated means to scrape or extract data beyond what our API permits.</li>
          <li>Use the service to build a directly competing product without authorization.</li>
        </ul>

        <h2>5. AI-generated content</h2>
        <p>
          AI features generate content based on automated models, which may produce inaccurate, incomplete, or
          inappropriate output. You are responsible for reviewing and verifying any AI-generated content before
          relying on it.
        </p>

        <h2>6. Subscription and billing</h2>
        <p>
          Paid plans are billed in advance on a recurring basis. You may cancel at any time; cancellation takes
          effect at the end of the current billing period. We do not provide refunds for partial billing
          periods except where required by law.
        </p>

        <h2>7. Intellectual property</h2>
        <p>
          You retain ownership of content you create in AI Workspace. We claim no ownership over your documents
          or prompts. You grant us a limited license to process your content solely to provide the service.
        </p>

        <h2>8. Termination</h2>
        <p>
          We may suspend or terminate your account for violation of these terms. You may delete your account at
          any time; this will result in deletion of your content as described in our Privacy Policy.
        </p>

        <h2>9. Disclaimer of warranties</h2>
        <p>
          The service is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied,
          including merchantability, fitness for a particular purpose, and non-infringement.
        </p>

        <h2>10. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, AI Workspace shall not be liable for indirect, incidental, or
          consequential damages arising from your use of the service.
        </p>

        <h2>11. Changes to these terms</h2>
        <p>We may update these terms periodically. Continued use of the service after changes constitutes acceptance of the revised terms.</p>

        <h2>12. Contact</h2>
        <p>Questions about these terms can be directed to legal@aiworkspace.dev.</p>
      </div>
    </div>
  );
}
