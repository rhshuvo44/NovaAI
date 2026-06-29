import Link from "next/link";
import { PenLine, FileSearch, Wand2, Lightbulb, MessageSquare, Tags } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const tools = [
  { href: "/dashboard/chat", title: "AI Chat", description: "Have a conversation with your AI assistant.", icon: MessageSquare },
  { href: "/dashboard/ai/content-generator", title: "Content Generator", description: "Generate a first draft on any topic.", icon: PenLine },
  { href: "/dashboard/ai/summarizer", title: "Summarizer", description: "Condense long text into key points.", icon: FileSearch },
  { href: "/dashboard/ai/prompt-optimizer", title: "Prompt Optimizer", description: "Sharpen a rough prompt.", icon: Wand2 },
  { href: "/dashboard/ai/recommendations", title: "Recommendations", description: "Discover related documents.", icon: Lightbulb },
  { href: "/dashboard/documents", title: "Tags Generator", description: "Auto-tag any document.", icon: Tags },
];

export default function AiToolsIndexPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">AI Tools</h1>
        <p className="text-sm text-muted-foreground">Every AI capability in AI Workspace, in one place.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardContent className="space-y-3 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                  <tool.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{tool.title}</p>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
