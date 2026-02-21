# EU Compliance Hub — Project Context

## Tech Stack
- **Framework:** Next.js 16.x (App Router, SSG, Turbopack)
- **Styling:** Tailwind CSS v4 (`@theme`, `@utility` syntax)
- **Animations:** Framer Motion v12
- **Backend:** Supabase (admin client via service role key)
- **Email:** Resend API (`src/lib/resend.ts`) — double-opt-in + welcome emails
- **Fonts:** `next/font/google` — Syne, DM Sans, DM Mono (CSS variable mode)
- **Language:** TypeScript (`strict: true`, `forceConsistentCasingInFileNames`, `noImplicitOverride`)

## Key Conventions
- **German UI** — all user-facing text in German (AT locale)
- **BASE_URL** centralized in `src/lib/constants.ts` — use template literals, never hardcode domain
- **Shared libs:** `src/lib/rate-limit.ts`, `src/lib/validation.ts`, `src/lib/logger.ts`, `src/lib/supabase.ts`, `src/lib/resend.ts`, `src/lib/og-image.ts`
- **API error handling:** Use `log` from `@/lib/logger` (structured JSON in production, readable in dev)
- **Rate limiting:** Use `publicFormLimiter` / `adminLimiter` from `@/lib/rate-limit`
- **Validation:** Use `sanitize()` / `validateEmail()` from `@/lib/validation`
- **Email sending:** Use `sendOptInEmail()` / `sendWelcomeEmail()` from `@/lib/resend`
- **OG Images:** Use `generateOgImage()` from `@/lib/og-image` for dynamic OpenGraph images
- **Error boundaries:** Every route has `error.tsx`; guide pages re-export `@/components/GuideError`
- **Loading states:** Every route has `loading.tsx` with gold/accent spinner
- **Accessibility:** `aria-hidden="true"` on decorative SVGs, `role="alert"` on errors, `htmlFor`/`id` pairing on forms, `aria-expanded`/`aria-controls`/`aria-current` on interactive elements, `<main>` landmark in root layout
- **External links:** Always `target="_blank" rel="noopener noreferrer"`
- **Social Sharing:** `SocialShareBar` component — supports `dark` prop for dark-themed pages, auto-rendered in `GuidePageLayout` for guides, manually added to `/aktuelles`, `/vergleich`, `/wissen`
- **Guide CTAs:** `GuideCTA` component auto-rendered at bottom of all guide pages (newsletter signup + quick links to Tools, FAQ, Kontakt)

## Build & Development
- Dev server: port 3002 (`npm run dev -- -p 3002`)
- Build: `npm run build` (113 static pages, Turbopack)
- Lint: `npx eslint src/` (should be 0 problems)
- TypeScript: `npx tsc --noEmit`

## Deferred / Pending
- **DO NOT deploy** without explicit permission
- Referral/affiliate links — deferred to "ganz am ende vor dem deploy"
- Impressum with real data — standing deferral from user
- Replace placeholder IDs: GA4 `G-XXXXXXXXXX`, AdSense `ca-pub-XXXXXXXXXXXXXXXX`
- Google Ads — deprioritized, focus on high-value leads
- Supabase migration: `ALTER TABLE subscribers ADD COLUMN commercial_consent BOOLEAN DEFAULT FALSE, ADD COLUMN commercial_consent_at TIMESTAMPTZ;`

## Architecture Notes
- Guide pages: `src/app/[regulation]/page.tsx` (metadata + JSON-LD) + `GuideContent.tsx` (client component with framer-motion)
- Guide layout: `GuidePageLayout.tsx` wraps all guides — Hero, TrustBadge, TOC, QuickFacts sidebar, SocialShareBar (auto), GuideCTA (auto)
- Tools: `src/app/tools/[tool]/page.tsx` + `[Tool]Tool.tsx` client component
- Tools Hub: `/tools` — central landing page listing all 8 interactive tools with filtering
- Branchen: dynamic routes `src/app/branchen/[branche]/[gesetz]/page.tsx` with `generateStaticParams()`
- Newsletter flow: Subscribe → Resend double-opt-in email → `/newsletter/bestaetigung?token=xxx` → API confirms → Welcome email
- Unsubscribe flow: Email link → `/newsletter/abmeldung?token=xxx` → API deactivates subscriber
- Lead generation: `/kontakt` form → `/api/leads` endpoint → Supabase
- JSON-LD schemas: Article, FAQPage, BreadcrumbList (guides + legal pages), WebApplication (tools), WebSite + Organization + SiteNavigationElement (root), DefinedTermSet (glossar), CollectionPage (wissen, tools, quellen), FAQPage (faq + all guides + /tools hub), ContactPage (kontakt), ItemList (/aktuelles), AboutPage + Organization (/ueber-uns)
- Sitelinks searchbox: JSON-LD SearchAction in root layout pointing to `/wissen?q={query}`
- Tool cross-linking: `ToolNextSteps` component integrated in all 7 tool pages with predefined workflows
- Deadline data: `src/data/deadlines.ts` — 24 deadlines (2024–2030), used by StickyTimeline, FristenRadar, Countdown, Timeline page
- Navigation data: `src/data/navigation.ts` — single source for Header, Footer, Mobile menu
- Security headers configured in `next.config.ts`
- Print stylesheet in `globals.css` — hides nav/footer/CTAs, optimizes for paper (data-* attributes on components)
- AI scraper blocking via `robots.ts` (GPTBot, ChatGPT-User, CCBot, Google-Extended, anthropic-ai, Claude-Web)
- RFC 9116 security.txt at `/.well-known/security.txt`

## Key Pages
- **Homepage:** `/` — Hero with ComplianceRadar animation, pillar cards, tools section (7 tools), news preview, trust signals with AnimatedCounter
- **Guide pages:** `/nisg-2026`, `/eu-ai-act`, `/dora`, `/cra`, `/dsgvo`, `/csrd-esg`, `/bafg`, `/hschg`, + 10 more
- **Interactive Tools:**
  - `/tools` — Tools Hub: central overview of all 8 tools with category filtering, FAQ section with FAQPage JSON-LD
  - `/tools/regulierung-finder` — Quiz to identify applicable regulations (5 questions, evaluates 14 regulations)
  - `/tools/compliance-checkliste` — Interactive checklist for 6 regulations with progress tracking
  - `/tools/kosten-kalkulator` — Cost estimation for compliance implementation (by size, maturity, regulations)
  - `/tools/reifegrad-check` — Compliance maturity assessment across 5 categories (25 questions, A-E grading)
  - `/tools/nis2-betroffenheits-check` — NIS2 applicability check
  - `/tools/haftungs-pruefer` — Personal liability assessment
  - `/tools/bussgeld-rechner` — Fine calculator
- **Knowledge:** `/wissen` (hub with search via ?q= param, stats counters, 4 sections), `/glossar` (70+ terms with search, category filter, alphabet nav), `/faq` (34 questions across 19 categories with FAQPage JSON-LD), `/branchen` (industry pages)
- **News:** `/aktuelles` — Compliance news feed with 28 regulatory updates, year-grouped timeline, type filtering, ItemList JSON-LD, SocialShareBar
- **Comparison:** `/vergleich` — Side-by-side regulation comparison matrix (9 regulations incl. MiCA, Data Act, BaFG; 8 criteria, interactive selector, 5 quick presets incl. Finanz, SocialShareBar)
- **Reference:** `/fristen-radar`, `/timeline`, `/compliance-verzeichnis`, `/quellen`
- **Newsletter:** `/newsletter/bestaetigung`, `/newsletter/abmeldung`
- **Lead Gen:** `/kontakt` (form with 10 regulation interests, urgency field, company info, GDPR + commercial consent)
- **About:** `/ueber-uns` (E-E-A-T page with mission, values, stats, target groups, AboutPage + Organization JSON-LD)
- **Admin:** `/admin/leads` — Lead management dashboard (Supabase-backed), `/admin/subscribers` — Subscriber management dashboard with stats, filtering, CSV export
- **Legal:** `/impressum`, `/datenschutz`, `/haftungsausschluss`

## Components
- `Header.tsx` — Fixed header with dropdowns, mobile menu, CommandPalette (Cmd+K search), Aktuelles + Kontakt + CTA
- `Footer.tsx` — Regulation links, tool links (incl. Alle Tools), legal links (incl. Aktuelles, FAQ, Kontakt, Über uns)
- `GuidePageLayout.tsx` — Shared layout for all guide pages (Hero, TrustBadge, TOC, QuickFacts, SocialShareBar, GuideCTA)
- `SocialShareBar.tsx` — Copy link, LinkedIn, X, Email sharing (auto-included in guides, `dark` prop for dark pages, customizable labels)
- `GuideCTA.tsx` — Newsletter signup + quick links to Tools/FAQ/Kontakt (auto-included in guides)
- `ComplianceRadar.tsx` — Animated SVG radar for homepage hero
- `FristenRadarSignup.tsx` — Newsletter signup with Supabase backend
- `BackToTop.tsx` — Floating scroll-to-top button (global, in root layout)
- `CookieConsent.tsx` — Cookie banner with GA4 conditional loading
- `RelatedGuides.tsx` — Cross-linking between regulation guides (18 guides, relationship map)
- `ToolRecommendation.tsx` — Software recommendations per regulation
- `ToolNextSteps.tsx` — Reusable cross-linking between tools (workflow-based suggestions, dark/light themes)
- `AnimatedCounter.tsx` — Intersection Observer-triggered number animation (used in homepage trust signals)
- `Breadcrumbs.tsx` — Visual breadcrumb navigation with JSON-LD (used in GuidePageLayout)
- `AccordionSection.tsx` — Accordion with ARIA controls/regions, animated expand/collapse (used in guide pages)
- `TableOfContents.tsx` — Scrollspy TOC with active item highlighting, mobile floating button (used in GuidePageLayout)
- `CommandPalette.tsx` — Cmd+K global search overlay with fuzzy search, keyboard navigation, category grouping (40+ indexed pages)
