"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useUIStore } from "@/store";
import type { NavSection } from "@/constants/navigation";

interface MobileNavProps {
  sections: NavSection[];
}

export function MobileNav({ sections }: MobileNavProps) {
  const pathname = usePathname();
  const { mobileNavOpen, setMobileNavOpen } = useUIStore();

  return (
    <Drawer open={mobileNavOpen} onOpenChange={setMobileNavOpen} direction="left">
      <DrawerContent>
        <div className="flex h-16 items-center border-b border-border px-4">
          <Logo />
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </p>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileNavOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-200"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <Icon className="h-4.5 w-4.5 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
