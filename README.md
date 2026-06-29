# AI Workspace Frontend

Enterprise-grade, production-ready frontend for **AI Workspace**, built with Next.js 15 (App Router), React 19, and TypeScript. Integrates with the AI Workspace backend API for documents, AI chat, prompts, RBAC-driven admin tooling, and more.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4, custom design tokens, `tw-animate-css` |
| UI Primitives | Radix UI (via a hand-built shadcn-style component layer) |
| Forms | React Hook Form + Zod |
| Server state | TanStack Query |
| Client/UI state | Zustand |
| Auth | Clerk (`@clerk/nextjs`) |
| Charts | Recharts |
| Tables | TanStack Table |
| Animation | Framer Motion |
| Markdown / code | react-markdown, remark-gfm, rehype-highlight |
| Toasts | Sonner |
| Dates | date-fns |
| HTTP | Axios, with a typed service layer |

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

The app **boots and builds successfully without real credentials** -- Clerk and the backend API URL fall back to safe placeholders -- but auth, AI features, and any backend-dependent page will not function until real values are provided in `.env.local`.

### Required environment variables

See `.env.example`. At minimum for local development against a real backend:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | ESLint (enforces no-`any`, no-`console`) |

## Architecture

See `docs/ARCHITECTURE.md` for the folder structure walkthrough, `docs/DESIGN_SYSTEM.md` for the visual design system ("Ink & Annotation"), and `docs/COMPONENTS.md` for the component inventory.

In short:
- **`app/`** uses three route groups: `(public)` for the marketing site, `(auth)` for Clerk sign-in/sign-up, `(dashboard)` for both the user dashboard (`/dashboard/*`) and admin panel (`/admin/*`).
- **`features/`** holds page-specific components organized by domain (`documents`, `chat`, `prompts`, `ai`, `admin`, `marketing`, `auth`).
- **`components/ui/`** is the design-system layer: every primitive (Button, Dialog, Select, DataTable, etc.) lives here and is reused everywhere -- never duplicated per-feature.
- **`services/api/`** is the only place Axios is called directly. Every backend endpoint has a typed service function; components never call `axios` or `fetch` directly.
- **`hooks/`** wraps every service call in a TanStack Query hook (`useDocuments`, `useSendMessage`, etc.), with consistent cache keys (`constants/query-keys.ts`) and toast-based error handling.
- **`store/`** is Zustand, used only for client UI state (sidebar collapse, command palette open/closed) -- never for data that the backend owns.

## Backend Integration

This frontend is built against the **AI Workspace backend's actual API contract**: the standardized `{ success, message, data, meta }` response envelope, its specific RBAC permission model, and its specific endpoint paths (`/api/v1/...`). The type definitions in `src/types/` and the service layer in `src/services/api/` mirror the backend's Mongoose models and Express routes directly -- they are not generic placeholders.

Two integration details worth knowing:
1. **Auth model**: the backend's `requireAuth` middleware verifies a **Clerk session token** directly (not a separate backend-issued token) on every request's `Authorization` header. The Axios client (`src/services/api/client.ts`) is wired to Clerk's `getToken()` via `useApiAuthSync()`, mounted once in `DashboardShell`.
2. **A few admin pages present data honestly rather than fabricating it.** The backend has no dedicated "system logs" HTTP endpoint or per-feature AI-usage breakdown -- `/admin/logs` redirects to the real Audit Trail, and `/admin/ai-usage` / `/admin/reports` are built from the analytics and dashboard-overview endpoints that do exist, with UI copy that says so rather than inventing numbers.

## Testing the build

```bash
npm run build
```

This was verified to complete successfully -- all 43+ routes compile, type-check, and prerender (or correctly mark themselves dynamic where they use `useSearchParams`, `useParams`, etc.) -- using placeholder environment variables, confirming the app is structurally sound independent of live backend/Clerk credentials.

## Deployment

See `docs/DEPLOYMENT.md` for Vercel deployment, environment variable configuration, and production build notes.
