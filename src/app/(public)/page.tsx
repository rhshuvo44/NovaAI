import type { Metadata } from "next";
import { HeroSection } from "@/features/marketing/components/hero-section";
import { StatisticsSection } from "@/features/marketing/components/statistics-section";
import { FeaturesSection } from "@/features/marketing/components/features-section";
import { AiShowcaseSection } from "@/features/marketing/components/ai-showcase-section";
import { HowItWorksSection } from "@/features/marketing/components/how-it-works-section";
import { TemplatesSection } from "@/features/marketing/components/templates-section";
import { TestimonialsSection } from "@/features/marketing/components/testimonials-section";
import { PricingTeaserSection } from "@/features/marketing/components/pricing-teaser-section";
import { FaqSection } from "@/features/marketing/components/faq-section";
import { CtaSection } from "@/features/marketing/components/cta-section";
import { getOrganizationJsonLd, getSoftwareApplicationJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "AI Workspace — Write, think, and ship with AI at the margin",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getSoftwareApplicationJsonLd()) }}
      />
      <HeroSection />
      <StatisticsSection />
      <FeaturesSection />
      <AiShowcaseSection />
      <HowItWorksSection />
      <TemplatesSection />
      <TestimonialsSection />
      <PricingTeaserSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
