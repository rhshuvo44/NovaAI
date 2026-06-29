export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For individuals trying out AI Workspace.",
    features: [
      "100,000 AI tokens / month",
      "Unlimited documents",
      "1 AI chat thread at a time",
      "Community support",
    ],
    cta: "Start for free",
    href: "/register",
  },
  {
    name: "Pro",
    price: "$24",
    period: "per user / month",
    description: "For professionals who write and think for a living.",
    features: [
      "2,000,000 AI tokens / month",
      "Unlimited documents and chats",
      "Prompt optimizer & tags generator",
      "Priority email support",
    ],
    cta: "Start free trial",
    href: "/register",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$60",
    period: "per user / month",
    description: "For teams that collaborate across documents and prompts.",
    features: [
      "10,000,000 AI tokens / month pooled",
      "Shared prompt library",
      "Role-based access control",
      "Audit log & admin analytics",
    ],
    cta: "Talk to sales",
    href: "/contact",
  },
];
