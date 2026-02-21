# EU Compliance Hub – AI Agent Instructions

## Architecture Overview

**EU Compliance Hub** is a Next.js 16 + React 19 website explaining EU compliance regulations (NISG 2026, AI Act, DORA, CRA, DSGVO, etc.) for businesses in Austria/Germany. The site combines:

- **Educational content** (regulation guides with interactive timelines, risk pyramids, role cards)
- **Programmatic SEO** (~80+ unique pages generated from `branchenData.ts` × regulation combinations)
- **Lead capture** (email forms → Supabase database)
- **Real-time deadline tracking** (Fristen Radar page with countdown badges)

## Key Project Patterns

### 1. Regulation Data Structure
All regulations are defined centrally in `src/data/`. Never hardcode regulation info:
- `branchenData.ts`: `Regulation` interface with `slug`, `name`, `accent`, `guideHref`, `maxFine`, `deadline`
- `deadlines.ts`: Chronological `DEADLINES` array (ISO dates, German labels, colors)
- `navigation.ts`: `NavDropdown` structure with `NavGroup`/`NavItem` (used by Header, DropdownMenu)

**Pattern**: Always reference regulations via these data files, not inline strings.

### 2. Guide Page Composition
All regulation guides follow the same **GuidePageLayout** wrapper (`src/components/GuidePageLayout.tsx`):
- Accepts: `title`, `subtitle`, `regulationKey`, `accent`, `quickFacts`, `tocItems`, `trustBadge`, `children`
- Renders: Hero with gradient (accent-based), breadcrumbs, ToC, quick facts sidebar, content
- Child guides (e.g., `src/app/eu-ai-act/GuideContent.tsx`) are **client components** using Framer Motion

**Pattern**: New regulation guide? Create `/src/app/[regulation-slug]/page.tsx` + `/src/app/[regulation-slug]/GuideContent.tsx`.

### 3. Section & Component Reusables
- `Section()`: Wraps heading + content with `id` for ToC linking
- `StatCard()`: Styled stat display (accent color, mono label)
- `TimelineItem()`: Visual timeline with dot/line, status badges
- `RiskTier()`: Risk pyramid level (color, examples, hover)
- `RoadmapStep()`: Vertical stepped roadmap with checkmarks

**Pattern**: Import from guide, reuse styling (Syne font 700/800, Tailwind tokens).

### 4. Styling & Design System
- **Colors**: Primary `#0A2540` (dark blue), EU blue `#0ea5e9`, accent varies per regulation
- **Fonts**: `Syne` (headlines 700/800), `mono` (labels, dates, counts)
- **Utilities**: `scroll-mt-28` (ToC link offset), `backdrop-blur-xl`, `radial-gradient` (hero backgrounds)
- **Tailwind v4** with PostCSS – use `@apply` sparingly, prefer inline classes

**Pattern**: Every regulation has a unique `accent` color; apply via inline `style={{color: accent}}`.

### 5. API Routes & Lead Capture
- `POST /api/leads`: Email validation (EMAIL_RE), GDPR consent required, country/tool tracking
- `POST /api/subscribe`: Newsletter signup
- Uses **Supabase Admin** client for server-side writes (`getSupabaseAdmin()`)
- Sanitization helper: `sanitize()` trims to 500 chars, validates type

**Pattern**: Always validate input, check GDPR consent, use admin client for Supabase writes.

### 6. SEO & Metadata
- Base metadata in `src/app/layout.tsx` (BASE_URL, title template, OpenGraph)
- Each page adds custom metadata (title, description, keywords)
- `robots.ts`, `sitemap.ts` auto-generated
- JSON-LD schema in layout for WebSite type

**Pattern**: Use Next.js `generateMetadata()` per page; reference central layout template.

### 7. Content Loading & Programmatic Pages
- `branchenData.ts` defines `Regulation` objects; used by `/branchen/[branche]/` dynamic routes
- Regulations have `guideHref` → links to `/[regulation]/page.tsx`
- Dynamic routes render 80+ combinations (industry × regulation)

**Pattern**: Dynamic routes query `branchenData.ts` for slug-to-data mapping.

## Development Workflow

### Build & Run
```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # SSG build
npm run start      # Production server
npm run lint       # ESLint check
```

### Adding a New Regulation Guide
1. Update `branchenData.ts` → add `Regulation` object with slug, accent, deadline
2. Update `deadlines.ts` → add `Deadline` entries for key milestones
3. Update `navigation.ts` → add to appropriate `NavGroup`
4. Create `/src/app/[slug]/page.tsx` + `/GuideContent.tsx`
5. GuideContent: define `sources` array, `tocItems`, `quickFacts`, use reusable components (Section, StatCard, TimelineItem, RiskTier, RoadmapStep)

### Adding a New Page Type
- Use `GuidePageLayout` as wrapper (not just a heading)
- Provide all required props: `title`, `subtitle`, `accent`, `tocItems`
- Client component for Framer Motion animations
- Import data centrally, never hardcode text

## Critical Integration Points

### Supabase
- Anon client: `supabase` (imported from `src/lib/supabase.ts`)
- Admin client: `getSupabaseAdmin()` in server-side API routes only
- Tables: `leads` (email, tool, size, country), `subscribers` (newsletter)

### Framer Motion
- Used in `GuideContent` for section reveals: `initial={{ opacity: 0, y: 20 }}`, `whileInView`, `viewport={{ once: true }}`
- Reusable across components; apply sparingly to avoid motion fatigue

### Navigation
- Central `navigation.ts` drives Header, DropdownMenu, MobileNavAccordion
- Badge logic: "Neu", "Live", "Update" based on `badge` field
- Color dots (accentColor) in dropdowns match regulation brand colors

## Conventions

- **Dates**: ISO format (`YYYY-MM-DD`) in data, German display format in UI (e.g., "1. Oktober 2026")
- **Component naming**: PascalCase, suffix with type if not obvious (e.g., `RiskTier`, `RoleCard`)
- **Prop drilling**: Use `TocItem`, `QuickFact`, `Regulation` interfaces; avoid magic strings
- **Comments**: Use `/* ─── Section Title ─── */` markers in guides for visual clarity
- **Accessibility**: Breadcrumbs use semantic `<nav>`, links have `aria-label`, images have alt text

## Common Tasks

| Task | File(s) to Edit |
|------|-----------------|
| Update regulation deadline | `src/data/deadlines.ts` |
| Change regulation accent color | `src/data/branchenData.ts` (Regulation.accent) |
| Add nav link | `src/data/navigation.ts` (NavDropdown/NavGroup) |
| Modify hero gradient | `src/components/GuidePageLayout.tsx` (radial-gradient style) |
| Update API validation | `src/app/api/[route]/route.ts` (sanitize, EMAIL_RE) |
| Add guide section | `src/app/[slug]/GuideContent.tsx` (Section component) |

## Files to Know

- `src/data/branchenData.ts` – Source of truth for regulations
- `src/components/GuidePageLayout.tsx` – Wrapper for all guide pages
- `src/app/eu-ai-act/GuideContent.tsx` – Exemplar of guide structure (1000+ lines)
- `src/lib/supabase.ts` – Supabase client setup
- `src/app/layout.tsx` – Global metadata, schema, providers
- `next.config.ts` – Image remotePatterns (Google favicons)
