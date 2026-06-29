import type { Metadata } from "next";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const metadata: Metadata = {
  title: "About",
  description: "AI Workspace is built by a small team that thinks AI should annotate your work, not replace it.",
};

const TEAM = [
  { name: "Sasha Klein", role: "Co-founder & CEO", initials: "SK" },
  { name: "Devon Ruiz", role: "Co-founder & Engineering", initials: "DR" },
  { name: "Priya Shah", role: "Head of Trust & Safety", initials: "PS" },
  { name: "Marcus Webb", role: "Head of Product", initials: "MW" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
      <h1 className="font-display text-4xl font-semibold tracking-tight">About AI Workspace</h1>

      <div className="mt-8 space-y-5 text-muted-foreground">
        <p>
          We started AI Workspace because every AI writing tool we tried asked us to choose between two bad
          options: let the AI write for you and lose your voice, or ignore AI entirely and lose the speed.
        </p>
        <p>
          We wanted a third option — a workspace where AI behaves like a sharp editor sitting next to you, not a
          ghostwriter replacing you. Summaries that sit in the margin. Tag suggestions you can accept or ignore.
          A prompt optimizer that improves your instructions instead of guessing at your intent.
        </p>
        <p>
          AI Workspace is built by a small, distributed team. We use the product daily to write the same kind of
          documents, prompts, and follow-ups you do — which is the main reason it works the way it does.
        </p>
      </div>

      <h2 className="mt-12 font-display text-2xl font-semibold">Team</h2>
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {TEAM.map((member) => (
          <div key={member.name} className="text-center">
            <Avatar className="mx-auto h-16 w-16">
              <AvatarFallback className="text-lg">{member.initials}</AvatarFallback>
            </Avatar>
            <p className="mt-3 text-sm font-medium">{member.name}</p>
            <p className="text-xs text-muted-foreground">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
