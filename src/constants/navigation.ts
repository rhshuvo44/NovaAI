import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  FileText,
  Star,
  MessageSquare,
  BookOpen,
  History,
  User,
  Settings,
  Bell,
  CreditCard,
  Users,
  ShieldCheck,
  BarChart3,
  FolderTree,
  Sparkles,
  FileBarChart,
  ScrollText,
  ClipboardList,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const userNavSections: NavSection[] = [
  {
    title: "Workspace",
    items: [
      { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { label: "My Documents", href: "/dashboard/documents", icon: FileText },
      { label: "Favorites", href: "/dashboard/favorites", icon: Star },
      { label: "AI Chat", href: "/dashboard/chat", icon: MessageSquare },
      { label: "AI Tools", href: "/dashboard/ai", icon: Sparkles },
      { label: "Prompt Library", href: "/dashboard/prompts", icon: BookOpen },
      { label: "History", href: "/dashboard/history", icon: History },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Profile", href: "/dashboard/profile", icon: User },
      { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
      { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export const adminNavSections: NavSection[] = [
  {
    title: "Admin",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Roles", href: "/admin/roles", icon: ShieldCheck },
      { label: "Categories", href: "/admin/categories", icon: FolderTree },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { label: "Reports", href: "/admin/reports", icon: FileBarChart },
      { label: "AI Usage", href: "/admin/ai-usage", icon: Sparkles },
      { label: "Prompt Library", href: "/admin/prompts", icon: ClipboardList },
      { label: "System Settings", href: "/admin/settings", icon: Settings },
      { label: "Logs", href: "/admin/logs", icon: ScrollText },
      { label: "Audit", href: "/admin/audit", icon: ClipboardList },
    ],
  },
];
