# Deployment Guide

## Vercel (recommended)

1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import the project into Vercel.
3. Set environment variables in the Vercel project settings (Production, Preview, and Development as needed):

   ```
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
   CLERK_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NEXT_PUBLIC_SITE_NAME=NovaAI
   ```

4. Deploy. Vercel auto-detects Next.js and runs `next build`.

No `vercel.json` is required for the default setup -- the App Router, route groups, middleware, and `sitemap.ts`/`robots.ts` all work with Vercel's zero-config Next.js support.

## Manual / other hosts

```bash
npm ci
npm run build
npm start
```

`next start` runs a Node.js server on port 3000 by default (`PORT` env var to override). For containerized deployment, a standard multi-stage Dockerfile (Node 22 base image, `npm ci` + `npm run build` in a build stage, copy `.next/`, `public/`, `node_modules`, `package.json` into a slim runtime stage) is the typical pattern -- not included here since this project ships as source for direct Vercel deployment, but it's a drop-in addition if self-hosting is required.

## Production build verification

This project's production build (`npm run build`) was verified to complete successfully end-to-end during development -- all marketing, auth, dashboard, and admin routes compile, type-check under `strict` TypeScript, pass ESLint with `no-explicit-any` and `no-console` enforced, and either prerender as static HTML or correctly mark themselves dynamic (routes using `useSearchParams`/`useParams`/Clerk session data).

## Bundle size notes

First Load JS shared by all routes is ~102 kB. Dashboard and admin routes carrying TanStack Query, TanStack Table, and Recharts run 190-320 kB First Load JS depending on the page -- within normal range for an authenticated SaaS dashboard. The marketing homepage (with Framer Motion-driven sections) is ~171 kB. No additional bundle optimization (route-level code splitting beyond Next.js's automatic per-page splitting, dynamic `import()` for heavy below-the-fold sections) was required to hit these numbers, but the homepage's later sections (Templates, Testimonials, FAQ) are good candidates for `next/dynamic` with `ssr: false` if further trimming the initial homepage bundle becomes a priority.

## SEO

- `src/app/sitemap.ts` and `src/app/robots.ts` generate `/sitemap.xml` and `/robots.txt` dynamically at request time, including all static marketing pages and every blog post slug.
- Every public page exports its own `metadata` (title, description) via the Next.js Metadata API; the root layout sets the default Open Graph and Twitter Card metadata.
- JSON-LD structured data (`Organization`, `SoftwareApplication`, `BlogPosting`) is injected via inline `<script type="application/ld+json">` tags on the homepage and blog post pages (`src/lib/structured-data.ts`).
- `/dashboard` and `/admin` are excluded from the sitemap and disallowed in `robots.txt`, since they require authentication and have no SEO value.
