# UI Patterns

## Page Layouts

### List page (with search + pagination)

```
┌─────────────────────────────────────────┐
│  Page title (text-heading-1)            │
│  ┌─────────────────────────────────────┐│
│  │  Search bar    [Columns ▽]          ││
│  ├─────────────────────────────────────┤│
│  │  Table with zebra stripes            ││
│  │  Alternating row: bg-surface-sunken  ││
│  ├─────────────────────────────────────┤│
│  │  Page 1 of 5        [Prev] [Next]   ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

**Components**: `<DataTable>`, `<PageHeader>`, `<TableSkeleton>`, `<EmptyState>`

### Detail page

```
┌─────────────────────────────────────────┐
│  ← Back to list     [Edit] [Delete]     │
│  ─────────────────────────────────────  │
│  Content area (max-w-3xl)               │
│  Card-based sections                    │
└─────────────────────────────────────────┘
```

**Components**: `<Card>`, `<PageHeader>`

### Settings form

```
┌─────────────────────────────────────────┐
│  Settings                               │
│  ┌─────────────────────────────────────┐│
│  │  Section heading (text-heading-2)   ││
│  │  ┌───────────────────────────────┐  ││
│  │  │ Label │ Input                │  ││
│  │  │ Label │ Select               │  ││
│  │  └───────────────────────────────┘  ││
│  │               [Cancel] [Save]       ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

**Components**: `<Card>`, `<Input>`, `<Select>`, `<Button>`, `<FormField>`

## Loading States

| State | Component | Usage |
|-------|-----------|-------|
| Table loading | `<TableSkeleton rows={6} columns={5} />` | Placeholder for `<DataTable>` when `isLoading` is true |
| Card grid loading | `<CardGridSkeleton count={6} />` | Grid of card placeholders |
| Single card | `<CardSkeleton />` | Individual card placeholder |
| Stat card | `<StatCardSkeleton />` | Analytics stat card placeholder |
| List item | `<ListItemSkeleton />` | Inline list item placeholder |
| Shimmer | `shimmer-skeleton` utility class | Animated gradient shimmer effect replacing plain `animate-pulse` |

## Empty States

The `<EmptyState>` component follows a consistent pattern:

```
      [Icon in rounded-full bg-muted]
         [Title - text medium]
     [Description - text-sm muted]
           [Optional CTA button]
```

Props:
- `icon`: LucideIcon (optional, shown in muted circle)
- `title`: string (required)
- `description`: string (optional, max-width constrained)
- `action`: ReactNode (optional, typically a `<Button>`)
- `className`: string (optional, for custom positioning)

### Commonly used icons by context

| Context | Icon |
|---------|------|
| Documents | `FileText` |
| Search results | `SearchX` or `Inbox` |
| Notifications | `Bell` |
| Favorites | `Heart` |
| Tags | `Tags` |
| Chat | `MessageSquare` |
| Comments | `MessageCircle` |

## Form Conventions

- Labels use `text-label` class (0.6875rem, uppercase, tracking-wider)
- Inputs use `rounded-lg border border-border-strong bg-surface h-10 px-3`
- Required fields not marked; instead, optional fields are marked "(optional)"
- Error state: `border-error` on input + `text-xs text-error` below
- Submit buttons: right-aligned or full-width on mobile, with Cancel to the left

## Motion

All entrance animations use the centralized variants from `src/constants/motion.ts`.

| Variant | When to use |
|---------|-------------|
| `entrance` | Default entrance for cards, sections (16px offset) |
| `entranceSmall` | Small cards, template cards, compact elements |
| `scaleIn` | Hero mockups, imagery that benefits from scaling |
| `slideInLeft` | Side panels, AI suggestion annotations |
| `floatKeyframes` + `floatTransition` | Floating badges/chips that should pulse subtly (`animate={{ y: floatKeyframes.y }} transition={floatTransition}`) |

Do not create new inline `initial`/`animate`/`transition` props — reuse or extend the variants in `constants/motion.ts`.

## Accessibility

- Every page has a `<SkipNav />` component as the first child of `<body>`.
- The main content area has `id="main-content"` as the skip target.
- Focus-visible rings use `--ring` (amber-400) consistently.
- `prefers-reduced-motion` is enforced globally in CSS — no JavaScript checks needed.
