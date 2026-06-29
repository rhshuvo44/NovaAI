import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { NewsletterForm } from "@/features/marketing/components/newsletter-form";

const FOOTER_SECTIONS = [
  {
    title: "Product",
    links: [
      { label: "Explore", href: "/explore" },
      { label: "Pricing", href: "/pricing" },
      { label: "AI Chat", href: "/dashboard/chat" },
      { label: "Prompt Library", href: "/dashboard/prompts" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Help Center", href: "/help" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-surface-sunken">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              The workspace where you write, think, and ship — with AI annotating the margin, not taking the pen.
            </p>
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium">Get product updates</p>
              <NewsletterForm />
            </div>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="text-sm font-semibold">{section.title}</p>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} NovaAI. All rights reserved.</p>
          <p>Built for people who think on the page.</p>
        </div>
      </div>
    </footer>
  );
}
