import { cn } from "@/lib/utils";

interface AiToolLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  input: React.ReactNode;
  output: React.ReactNode;
  className?: string;
}

export function AiToolLayout({ title, description, icon, input, output, className }: AiToolLayoutProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
          {icon}
        </div>
        <div>
          <h1 className="font-display text-xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>{input}</div>
        <div>{output}</div>
      </div>
    </div>
  );
}
