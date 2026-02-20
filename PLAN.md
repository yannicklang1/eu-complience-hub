# EU Compliance Hub – Implementierungsplan

## Design-System

### Farben
- Primär: #003399 (EU-Blau)
- Akzent: #FFCC00 (EU-Gelb – sparsam)
- Dunkel: #0A0F1E (Headlines)
- Hintergrund: #F8FAFF (warmes Off-White)
- Grau: #64748B (Body Text)
- Erfolg: #10B981 (compliant)
- Warnung: #F59E0B (Fristen)
- Gefahr: #EF4444 (Strafen)

### Typografie
- Inter (Headlines 700/800, Body 400/500)
- JetBrains Mono (Fristen, Daten)

### Komponenten
- Glassmorphism-Cards für Pillars
- Countdown-Badges für Fristen
- Gradient Hero (Dunkelblau → EU-Blau)
- Status-Pills ("Gilt ab 1.10.2026", "Bereits in Kraft")

## Seitenstruktur
```
/                         → Landing Page
/nisg-2026                → NISG 2026 Deep Dive
/eu-ai-act                → EU AI Act Deep Dive
/dora                     → DORA Deep Dive
/cra                      → CRA Deep Dive
/foerdermittel            → Fördermittel-Radar
/haftungs-check           → GF-Haftungscheck (interaktiv)
/compliance-verzeichnis   → Auditoren & Software
/newsletter               → Updates abonnieren
```

## Tech-Stack
- Next.js 14 (App Router, SSG)
- Tailwind CSS + Custom Tokens
- Framer Motion
- shadcn/ui Komponenten
- Vercel Deployment

## Schritte
1. Projekt-Setup (Next.js + Tailwind + shadcn/ui)
2. Design-System (globals.css, Tokens, Fonts)
3. Layout (Header, Footer, Navigation)
4. Landing Page (Hero, Pillars, CTA, Features)
5. Pillar-Seiten (NISG, AI Act, DORA, CRA)
6. Interaktive Tools (Haftungs-Check, Fördermittel)
7. SEO Optimierung (Meta, OG, Sitemap)
8. Vercel Deployment
