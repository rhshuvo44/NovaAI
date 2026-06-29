# Architecture

## Folder Structure

```
src/
  app/
    (public)/        # Marketing site: home, explore, pricing, blog, about, contact, legal, help
    (auth)/           # Clerk-hosted login, register, forgot-password
    (dashboard)/
      dashboard/       # User dashboard: overview, documents, chat, prompts, AI tools, favorites,
                        # profile, settings, notifications, history, billing
      admin/            # Admin panel: dashboard, users, roles, categories, analytics, AI usage,
                         # prompts, settings, audit, reports
    layout.tsx, error.tsx, global-error.tsx, not-found.tsx, robots.ts, sitemap.ts

  components/
    ui/                # Design-system primitives (Button, Dialog, Select, DataTable, Form, etc.)
    shared/             # Cross-feature shared components (Logo, ErrorBoundary, MarkdownRenderer, CopyButton)
    layout/             # App shell pieces (Sidebar, Topbar, MobileNav, CommandPalette, PublicNavbar/Footer)
    navigation/         # Breadcrumb
    cards/              # StatCard, ContentCard
    charts/             # LineChart, BarChart, PieChart, AreaChart (Recharts wrappers)
    tables/             # DataTable, selection column helper
    forms/               # TextField, TextareaField, SelectField, Checkbox/SwitchField, FileUploadField
    empty-state/         # EmptyState, NoResultsState, ErrorState
    loaders/              # Spinner, Skeleton layouts

  features/
    auth/, dashboard/, documents/, chat/, prompts/, ai/, admin/, marketing/
    -- each holds page-specific components that compose the shared `components/ui` primitives.
       Nothing here duplicates a primitive; feature components only add domain logic and layout.

  hooks/                # One file per domain, wrapping TanStack Query around services/api/*
  services/api/         # Axios instance + typed service functions, one file per backend module
  store/                 # Zustand stores for UI-only state
  types/                  # TypeScript types mirroring the backend's Mongoose models and API envelope
  constants/               # query-keys, navigation structure, pricing data, blog data
  lib/                      # utils (cn), env, fonts, validations (Zod schemas), clerk-appearance
```

## Data Flow

```
Component
  -> TanStack Query hook (hooks/use-*.ts)
    -> Service function (services/api/*.service.ts)
      -> apiGet/apiPost/... helper (services/api/helpers.ts)
        -> Axios instance (services/api/client.ts) - attaches Clerk session token
          -> Backend API (/api/v1/...)
```

Every mutation hook follows the same pattern: call the service, invalidate the relevant query key(s) on success, surface errors via Sonner toast using the typed `ApiError` class (`services/api/api-error.ts`), which exposes `.isAuthError`, `.isForbidden`, `.isValidationError`, etc. for callers that need to branch on status.

## State Management Boundary

- **TanStack Query** owns anything that originates from the backend: documents, chats, prompts, users, notifications, analytics. Components never hold this in `useState` -- they read it from a query hook and mutate it through a mutation hook.
- **Zustand** owns transient UI state that has no server representation: sidebar collapsed/expanded, command palette open/closed, mobile nav open/closed, in-progress chat draft text. `useUIStore` persists only `sidebarCollapsed` to `localStorage`; everything else resets on reload by design.

## Auth & Route Protection

`src/middleware.ts` uses `clerkMiddleware` to protect `/dashboard/*` and `/admin/*` at the edge -- unauthenticated requests are redirected before any page code runs. On top of that, `AdminGuard` (`features/admin/components/admin-guard.tsx`) adds a client-side redirect for authenticated-but-insufficiently-privileged users trying to reach `/admin/*`. Both layers are UX conveniences; **the backend independently re-checks every permission on every request**, which is the actual security boundary.

## Why some admin pages route or compute differently

- `/admin/logs` redirects to `/admin/audit`, because the backend exposes an audit trail over HTTP but not raw system logs (those are file-based Winston logs, internal to the backend process).
- `/admin/ai-usage` and `/admin/reports` are built from `/dashboard/overview` and `/analytics/summary`, the two aggregation endpoints that actually exist, rather than fabricating a token-by-feature breakdown the backend doesn't compute.

## Error Handling

Three layers, smallest to largest:
1. **Per-query**: every list/detail page checks `isError` and renders `<ErrorState onRetry={refetch} />`.
2. **Per-section**: `<ErrorBoundary>` (class component) wraps the main content area inside `DashboardShell`, catching render-time exceptions without taking down the whole shell (sidebar/topbar stay interactive).
3. **Per-route-segment / root**: Next.js `error.tsx` catches anything an `ErrorBoundary` didn't (e.g. errors thrown outside React's render cycle in a Server Component), and `global-error.tsx` is the last resort if the root layout itself fails -- it renders raw inline-styled HTML since it can't assume the app's CSS pipeline is intact.
