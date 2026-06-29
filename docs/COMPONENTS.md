# Component Inventory

## UI Primitives (`src/components/ui/`)

Button, Input, Textarea, Label, Card (+Header/Title/Description/Content/Footer), Badge, Avatar, Skeleton, Dialog, AlertDialog, DropdownMenu, Select, Checkbox, Switch, RadioGroup, Tabs, Tooltip, Popover, Separator, ScrollArea, Progress, Accordion, InputOTP, Calendar, DatePicker, Drawer, Command/CommandDialog, Form (React Hook Form context wrapper).

Every one of these is a single, reusable component used across every feature that needs it. None are duplicated per-feature -- e.g. there is exactly one `Dialog` implementation, used by document creation, prompt creation, category creation, and destructive-action confirmations (via `AlertDialog`, the distinct "are you sure" variant).

## Form Field Components (`src/components/forms/`)

`TextField`, `TextareaField`, `SelectField`, `CheckboxField`, `SwitchField`, `FileUploadField` -- each wraps a `ui/` primitive in the `Form`/`FormField`/`FormItem`/`FormControl`/`FormMessage` pattern, so every form in the app gets label, description, and validation-error display for free. Every form in the app (document create/edit, prompt create, category create, profile edit, contact, content generator) is built from these, never a raw `<input>`.

## Cards (`src/components/cards/`)

- `StatCard` -- dashboard metric tile with optional trend indicator. Used on both the user dashboard and admin dashboard.
- `ContentCard` -- the "document/template card" with image area, title, description, category/tag badges, AI-generated indicator, bookmark and share actions. Used on the Documents grid view, Explore page, and anywhere else a content preview card is needed.

## Charts (`src/components/charts/`)

`LineChart`, `BarChart`, `PieChart`, `AreaChart` -- thin, consistent Recharts wrappers that read the current theme (light/dark) to color gridlines/text correctly. All accept plain data + key props; no chart-specific styling logic lives outside these four files.

## Tables (`src/components/tables/`)

`DataTable` -- the single reusable table used by Documents (table view), Admin Users, and Admin Audit. Supports search, column sorting, column visibility toggling, row selection with bulk actions, server-driven pagination, loading skeleton, and empty state, all via props -- no feature reimplements any of this.

## Loaders & Empty States

`Spinner`, `FullPageSpinner`, `CardSkeleton`/`CardGridSkeleton`, `TableSkeleton`, `ListItemSkeleton`, `StatCardSkeleton` (`components/loaders/`); `EmptyState`, `NoResultsState`, `ErrorState` (`components/empty-state/`). Every async page in the app uses one of these for its loading and empty states -- none roll their own spinner or "no data" message.

## Layout (`src/components/layout/`)

`Sidebar`, `MobileNav`, `Topbar`, `CommandPalette`, `NotificationBell`, `ProfileDropdown`, `ThemeToggle`, `DashboardShell` (combines all of the above for both `/dashboard` and `/admin`), `PublicNavbar`, `PublicFooter`.

## Feature Components (`src/features/*/components/`)

Page-specific composition only -- e.g. `features/chat/components/message-bubble.tsx` knows about `Message` objects and the annotation-tick motif, but renders its content via the shared `MarkdownRenderer` and `CopyButton` rather than reimplementing markdown rendering or clipboard logic.

## Shared Utilities (`src/components/shared/`)

`Logo`, `ErrorBoundary`, `MarkdownRenderer` (react-markdown + remark-gfm + rehype-highlight, themed to match the design system), `CopyButton`.
