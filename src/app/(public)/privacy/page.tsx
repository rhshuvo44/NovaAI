import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How NovaAI collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: June 1, 2026</p>

      <div className="prose prose-sm mt-8 max-w-none dark:prose-invert">
        <h2>1. Overview</h2>
        <p>
          This Privacy Policy describes how NovaAI (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, and
          protects information when you use our service. By using NovaAI, you agree to the practices
          described here.
        </p>

        <h2>2. Information we collect</h2>
        <p>We collect the following categories of information:</p>
        <ul>
          <li><strong>Account information:</strong> name, email address, and authentication identifiers provided via our authentication provider.</li>
          <li><strong>Content you create:</strong> documents, prompts, chat messages, and uploaded files.</li>
          <li><strong>Usage data:</strong> feature usage, AI request metadata (token counts, latency, provider), and analytics events.</li>
          <li><strong>Technical data:</strong> IP address, browser type, and device information for security and fraud prevention.</li>
        </ul>

        <h2>3. How we use your information</h2>
        <p>We use collected information to:</p>
        <ul>
          <li>Provide, maintain, and improve the service.</li>
          <li>Process AI requests through our integrated providers (OpenAI, Google Gemini).</li>
          <li>Detect, prevent, and respond to fraud, abuse, and security incidents.</li>
          <li>Communicate with you about your account, updates, and support requests.</li>
        </ul>

        <h2>4. AI processing</h2>
        <p>
          When you use AI features (chat, summarization, content generation, prompt optimization, tag
          generation), the relevant content is sent to our AI provider to generate a response. We do not use
          your content to train AI models without your explicit consent.
        </p>

        <h2>5. Data sharing</h2>
        <p>
          We do not sell your personal data. We share data with third-party service providers (authentication,
          AI providers, cloud storage, email delivery) only as necessary to operate the service, under
          contractual obligations that restrict their use of your data.
        </p>

        <h2>6. Data retention</h2>
        <p>
          We retain your content for as long as your account is active. You can delete documents, prompts, and
          chats at any time. Deleted content is retained in backups for a limited period before permanent
          removal.
        </p>

        <h2>7. Your rights</h2>
        <p>
          Depending on your jurisdiction, you may have the right to access, correct, export, or delete your
          personal data. Contact us at privacy@aiworkspace.dev to exercise these rights.
        </p>

        <h2>8. Security</h2>
        <p>
          We use industry-standard security practices, including encryption in transit, role-based access
          control, and audit logging, to protect your data. No system is perfectly secure, and we encourage you
          to use a strong, unique password and enable any available account security features.
        </p>

        <h2>9. Changes to this policy</h2>
        <p>
          We may update this policy from time to time. We will notify you of material changes via email or an
          in-product notice.
        </p>

        <h2>10. Contact</h2>
        <p>Questions about this policy can be directed to privacy@aiworkspace.dev.</p>
      </div>
    </div>
  );
}
