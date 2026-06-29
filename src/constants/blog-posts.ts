export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  category: string;
  readingMinutes: number;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-ai-should-annotate-not-replace",
    title: "Why AI should annotate, not replace",
    excerpt:
      "The most useful AI tools we've used don't write for us — they write in the margin. Here's why that distinction matters.",
    author: "Sasha Klein",
    authorRole: "Co-founder",
    publishedAt: "2026-05-12",
    category: "Product",
    readingMinutes: 5,
    content: `Most AI writing tools are built around a single interaction: you ask, it generates, you accept or reject. That model works fine for short, disposable text. It breaks down for anything you actually care about.

When we started building AI Workspace, we kept running into the same problem in our own work: AI-generated drafts read fine on the surface, but they didn't carry our judgment. They didn't know which client was sensitive about pricing language, or that a particular phrase had failed in a previous proposal.

So we inverted the model. Instead of "AI writes, you edit," AI Workspace treats AI as an annotator — something that comments in the margin, suggests a summary, flags an unclear sentence, but never silently overwrites your words.

This shows up in small ways throughout the product: AI summaries sit next to your document, not inside it. Tag suggestions are proposals, not automatic labels. Chat responses are clearly distinguished from your own writing, visually and structurally.

We think this is the right default for any tool that handles real work. The pen should stay in your hand.`,
  },
  {
    slug: "prompt-engineering-for-people-who-hate-prompt-engineering",
    title: "Prompt engineering for people who hate prompt engineering",
    excerpt:
      "You don't need to learn a new discipline to get good output from AI. You need a tool that fixes your prompt for you.",
    author: "Devon Ruiz",
    authorRole: "Engineering",
    publishedAt: "2026-04-28",
    category: "AI",
    readingMinutes: 4,
    content: `"Just learn to write better prompts" is the most common, least helpful advice in AI tooling right now. Most people don't want to become amateur prompt engineers. They want their first draft to not be garbage.

That's the entire premise behind our Prompt Optimizer. You write the prompt the way you'd naturally write it — rough, underspecified, a little vague — and the optimizer rewrites it into something more likely to produce a useful response, then shows you both versions side by side.

Under the hood, this isn't magic. It's a second AI call with a system prompt specifically trained on the gap between "what people actually type" and "what gets good results." But the experience of using it is closer to a spell-checker than a tutorial: you get better output without doing more work.

We'd rather build tools that adapt to how people actually write than ask people to adapt to how AI wants to be talked to.`,
  },
  {
    slug: "the-case-for-private-by-default-documents",
    title: "The case for private-by-default documents",
    excerpt: "Every document you create in AI Workspace starts private. Here's why we didn't make sharing the default.",
    author: "Priya Shah",
    authorRole: "Head of Trust & Safety",
    publishedAt: "2026-04-09",
    category: "Security",
    readingMinutes: 3,
    content: `A lot of workspace tools default to "shared with your team" because it drives adoption metrics. We think that's the wrong call for a tool that handles drafts, internal notes, and half-formed ideas.

In AI Workspace, every new document is private until you explicitly mark it public. The same goes for prompts. This isn't just a checkbox — it shapes how the product behaves end to end. AI summarization, tagging, and chat all operate within that privacy boundary by default.

The tradeoff is that "share this with my team" requires one extra click compared to competitors. We think that's a reasonable price for not accidentally exposing someone's rough draft before they're ready.`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
