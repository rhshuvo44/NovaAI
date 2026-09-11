# Design System: "Ink & Annotation"

## Concept

NovaAI is a tool for focused knowledge work done *with* an AI collaborator. The design language avoids the generic "AI startup" look (purple/blue gradients, glassy cards everywhere) in favor of something closer to a well-made writing instrument: calm, warm, precise.

The core visual idea is the **annotation tick** -- a small vertical mark in the margin, echoing editorial markup. It appears wherever AI has added something (a summary, a suggestion, an AI chat response) so the product visually distinguishes "what you wrote" from "what the AI added," which is the actual product thesis.

## Color

Two accent colors, one neutral family, per the brief's "3 primary colors + 1 neutral palette" constraint (amber + teal + ink/graphite as the third structural color, all built from one warm-gray neutral scale):

| Token | Light mode role | Dark mode role |
|---|---|---|
| `--amber-400` (`primary`) | Brand, primary actions, "your content" | Same |
| `--teal-400` (`accent`) | AI-originated content, chat, generation | Same |
| `--ink-950` / `--paper-50` | Dark mode base / light mode base | Inverted |
| `--neutral-*` | Secondary text, borders, muted chrome | Same, mapped to ink scale |

All tokens are defined as CSS variables in `src/app/globals.css` under `:root` and `.dark`, then exposed to Tailwind via `@theme inline` (Tailwind v4's CSS-first config) as `bg-primary`, `text-accent`, `border-border`, etc. Never hardcode a hex value in a component -- always use the semantic token classes.

## Typography

Three font families, each with a specific job, all self-hosted via `next/font/local` (no Google Fonts CDN dependency):

- **Fraunces** (`font-display`) -- headlines, hero copy, brand mark. Used sparingly. A serif with personality, signaling "considered," never used for body text or UI chrome.
- **Inter** (`font-sans`, default) -- everything else: body copy, labels, buttons, navigation.
- **JetBrains Mono** (`font-mono`) -- code blocks, AI-generated structured output, document content in the editor. Treated as a first-class face, not an afterthought, since the product renders AI/code output constantly.

### Type scale

Defined as CSS custom properties in `globals.css` for consistency across breakpoints:

| Class | Variable | Size | Used for |
|-------|----------|------|----------|
| `.text-hero` | `--text-hero` | `clamp(2.25rem, 5vw, 3.75rem)` | Marketing hero H1 |
| `.text-heading-1` | `--text-h1` | `clamp(1.875rem, 3.5vw, 2.5rem)` | Section H2, page titles |
| `.text-heading-2` | `--text-h2` | `clamp(1.5rem, 2.5vw, 1.875rem)` | Subsection headings |
| `.text-heading-3` | `--text-h3` | `clamp(1.25rem, 2vw, 1.5rem)` | Card headings |
| `.text-heading-4` | `--text-h4` | `clamp(1.125rem, 1.5vw, 1.25rem)` | Minor headings |
| `text-sm` | `--text-body-sm` | `0.875rem` | Body secondary, descriptions |
| `text-xs` | `--text-caption` | `0.75rem` | Captions, metadata |
| `.text-label` | `--text-label` | `0.6875rem` | Sidebar section headers, field labels (uppercase) |

Use the utility class (e.g. `text-heading-1`) instead of manually stacking breakpoint classes like `text-3xl sm:text-4xl`. The `clamp()` values handle responsive sizing automatically.

## Spacing & Shape

- 8px base spacing system (Tailwind's default scale already aligns with this).
- `rounded-xl` (`--radius: 0.75rem`) is the default corner radius for cards, inputs, and buttons; `rounded-2xl`/`rounded-3xl` for larger surfaces (dialogs, the homepage CTA band).
- `max-w-7xl` is the standard content width for dashboard and marketing page containers.

## Glassmorphism (used sparingly)

`.glass-surface` (in `globals.css`) is reserved for floating chrome that sits above content: the dashboard `Topbar` and the public site's navbar once scrolled. It is **not** the default card style -- regular cards use solid `bg-surface-raised` with a simple border and shadow, per the brief's instruction to use glassmorphism "where appropriate" rather than everywhere.

## Light & Dark Mode

Implemented via `next-themes` (`attribute="class"`, `defaultTheme="system"`). Every color token has both a light and dark mapping in `globals.css`. Components always use semantic token classes (`bg-surface`, `text-foreground`, `border-border`) and never hardcode hex values. The theme system handles dark mode automatically — no `dark:` Tailwind variants needed in component code.

Badge variants use `bg-<token>/15` with `text-<token>` for semantic consistency across both modes.

## Motion

Framer Motion is used for entrance animations on marketing page sections (`whileInView`, fade + slight vertical offset) and for the homepage hero's floating "Summarized in 2s" chip. 

### Variant library (`src/constants/motion.ts`)

All motion variants are centralized in a single file for consistency:

| Export | Type | Use case |
|--------|------|----------|
| `entrance` | Variants | Standard fade + 16px vertical offset (0.4s ease) |
| `entranceSmall` | Variants | Subtle fade + 8px offset for small cards |
| `fadeIn` | Variants | Pure opacity fade |
| `scaleIn` | Variants | Fade + 0.96 scale for mockups/hero images |
| `slideInLeft` | Variants | Fade + -12px X offset for side-panel entries |
| `staggerContainer` | Variants | Parent variant that staggers children by 60ms |
| `floatKeyframes` + `floatTransition` | object + object | Infinite gentle vertical float for hero badges (use with `animate={{ y: floatKeyframes.y }} transition={floatTransition}`) |

Usage pattern:
```tsx
import { entrance } from "@/constants/motion";

<motion.div
  variants={entrance}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={index * 0.06}
>
  ...
</motion.div>
```

Motion respects `prefers-reduced-motion` globally via a CSS rule in `globals.css` that collapses all animation/transition durations to near-zero for users who request it.
