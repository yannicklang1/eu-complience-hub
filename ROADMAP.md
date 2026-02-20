# EU Compliance Hub — Produkt-Roadmap & Business Plan

> Letzte Aktualisierung: 20. Februar 2026
> Domain: eu-compliance-hub.eu
> Stack: Next.js 16, Tailwind v4, Framer Motion v12

---

## Die Business-Thesis

EU Compliance Hub ist kein Blog. Es ist eine **Lead-Maschine mit Content-Moat**.

**Revenue-Streams:**
- **A) Lead-Generierung (Aktiv):** Qualifizierte B2B-Leads (IT-Leiter, GFs, Compliance-Officer) uber interaktive Tools sammeln → an zertifizierte Auditoren, Kanzleien und IT-Systemhauser verkaufen. **50-150 EUR pro Lead.**
- **B) B2B SaaS Affiliate (Passiv):** Compliance-Software empfehlen (Vanta, Drata, DataGuard, OneTrust). **10-20% Provision auf Jahreslizenzen (5.000-15.000 EUR).** = 500-3.000 EUR pro vermitteltem Kunden.
- **C) Fristen-Radar E-Mail-Liste:** Hochkaratige GF-Liste aufbauen, nur bei kritischen Deadlines oder neuen Foerdergeldern kontaktieren. **Monetarisierbar durch Sponsored Blasts** (Auditoren, Software-Anbieter zahlen fuer Zugang).

**Traffic-Strategie:**
- **Hebel 1 — Programmatic SEO:** Dynamische Landingpages `/branchen/[branche]/[gesetz]` (z.B. `/branchen/maschinenbau/nis2`). Long-Tail ohne Konkurrenz.
- **Hebel 2 — Honey-Pot Tools:** "NIS2 Betroffenheits-Check", "GF-Haftungs-Pruefer", "Bussgeld-Rechner". Werden auf LinkedIn geteilt, generieren Backlinks, Lead-Capture am Ende.
- **Hebel 3 — Pan-EU Internationalisierung:** i18n-Landingpages fuer 27 EU-Laender × Regulierungen × Sprachen. Tausende hochspezifische Long-Tail-Pages ohne Konkurrenz.

**Post-2026 Zukunftssicherheit:** Nach Fristablauf verlagert sich Bedarf zu "Wie bestehe ich das Audit?", Mitarbeiter-Schulungen, Incident Response, neue Gesetze (Green Claims, Data Act, eIDAS, DPP/ESPR, MiCA). Die Seite waechst als permanenter Compliance-Kompass.

---

## Status Quo — Was wir haben (Stand: 19. Februar 2026)

- **18 Guide-Seiten** (NISG 2026, EU AI Act, DORA, CRA, GF-Haftung, DSGVO & KI 2026, CSRD/ESG, BaFG, HSchG, Green Claims, MiCA, DPP, PLD, DSA, EHDS, Data Act, ePrivacy, eIDAS 2.0) — statischer Content, fakten-geprueft
- 1 Coming-Soon-Seite (Foerdermittel)
- Homepage mit Pillar-Cards, SecondaryRegCards, Stats, Timeline, Newsletter-Formular
- **Dropdown-Navigation** im Header (Regulierungen + Tools Dropdowns, Mobile Accordion)
- Quellen-Sektionen mit EUR-Lex Links auf allen Guides
- 13+ Komponenten (GuidePageLayout, ToC, AccordionSection, DropdownMenu, MobileNavAccordion, etc.)
- 3 Interaktive Tools (NIS2-Check, GF-Haftungs-Pruefer, Bussgeld-Rechner)
- Vertrauensleiste auf allen Guides
- **41 Branchen-Landingpages** via Programmatic SEO Engine (17 Branchen x 4 Regulierungen)
- Branchen-Hub Uebersichtsseite `/branchen`
- Quellenbibliothek `/quellen`
- 3 Software-Vergleichsseiten (ISMS, Incident, Risikomanagement) mit Affiliate-Links
- `<ToolRecommendation />` in allen 18 Guides integriert (nis2, dora, ai-act, cra, dsgvo, csrd, bafg, hschg, green-claims, mica, dpp, pld, dsa, ehds, data-act, eprivacy, eidas, haftungs-check)
- **Supabase Backend** angebunden (Lead-Tabelle, RLS, Indexes, Stats-View)
- **LeadCaptureForm** Shared Component (Multi-Step, DSGVO-konform)
- **Lead-Capture** in allen 3 Tools integriert (NIS2-Check, Haftungs-Pruefer, Bussgeld-Rechner)
- **API Route** `/api/leads` (POST fuer Inserts, GET fuer Admin mit Auth)
- **Lead-Dashboard** unter `/admin/leads` (Login, Tabelle, Filter, CSV-Export, Detail-Modal)
- **Compliance-Verzeichnis** unter `/compliance-verzeichnis` (17 Eintraege, 4 Kategorien, Filter, Featured Listings)
- **Fristen-Radar** unter `/fristen-radar` (Signup-Formular, Fristen-Uebersicht, Benefits)
- **FristenRadarSignup** Shared Component (Hero + Card Variante)
- **API Route** `/api/subscribe` (POST fuer Anmeldung, GET fuer Double-Opt-In)
- **Subscribers-Tabelle** in Supabase (Migration 003)
- **Zentrale Navigation** `src/data/navigation.ts` (Single Source of Truth fuer Header, Footer, Mobile)
- **Zentrale Deadline-Datei** `src/data/deadlines.ts` (alle EU-Fristen inkl. CSRD, BaFG, HSchG mit `isPast()`, `daysUntil()`, `formatDateDE()` — auto-updating)
- **LawRef** erweitert (CSRD, EAA, BaFG, HSchG, NaBeG, Whistleblower-RL, DSA, Data Act, EHDS, eIDAS 2.0, ePrivacy-RL, MiCA, TKG, TDDDG)
- **88 Seiten total** (42 statisch + 44 SSG + 2 API Routes)
- **Erste Monetarisierung vorbereitet** (Featured Listings, Affiliate-Links fuer 8 Regulierungen), **E-Mail-Infrastruktur gebaut** (Resend noch ausstehend)

---

## Roadmap — Gesamtplan

---

### PHASE 1: Referenz-Qualitaet & Vertrauen (Woche 1) ✅ ABGESCHLOSSEN
*Ziel: Jeder der unsere Guides liest, denkt "das ist die serioeseste Quelle die ich je gesehen habe"*

- [x] **1. Inline-Paragraph-Links in allen Guides** ✅ DONE (18.02.2026)
  `<LawRef>` Komponente mit Tooltip + Deep-Links zu EUR-Lex (#art_X, #anx_X), JusLine, RIS (NISG).
  60+ Inline-Links ueber alle 5 Guides verteilt (AI Act, NISG 2026, DORA, CRA, GF-Haftung).

- [x] **2. Quellen-Fussnoten Perplexity-Style** ✅ DONE (18.02.2026)
  `<SourceRef>` (Inline [1]-Badge mit Tooltip) + `<SourceList>` (Favicon + Titel + Domain + Typ-Badge).
  ~20 Inline-Referenzen + nummerierte Source-Cards am Ende jeder Guide-Seite (alle 5 Guides).

- [x] **3. Vertrauensleiste auf jedem Guide** ✅ DONE (18.02.2026)
  `TrustBadge` in `GuidePageLayout` — "Letzte Pruefung: 18.02.2026 | X Quellen | Faktengeprueft" zwischen Hero und Content. Auf allen 5 Guides aktiv.

- [ ] **4. Impressum mit echten Daten** *(verschoben → ganz am Ende, wenn alles andere steht)*
  Platzhalter ersetzen. Ohne echtes Impressum kein Vertrauen, keine TKG-Konformitaet, kein B2B-Geschaeft.

---

### PHASE 2: Honey-Pot Tools + Lead-Capture (Wochen 2-3) ✅ ABGESCHLOSSEN
*Ziel: Interaktive Tools die auf LinkedIn geteilt werden und qualifizierte Leads generieren*

**Das Lead-Capture-Prinzip:**
Jedes Tool folgt dem gleichen Muster:
1. Nutzer beantwortet 5-8 Fragen (Branche, Mitarbeiter, Umsatz, Sparten...)
2. Teilergebnisse werden SOFORT angezeigt (Wert vermitteln)
3. Fuer das **vollstaendige Ergebnis + PDF + personalisierte Empfehlungen** → E-Mail + Name + Firma Pflicht
4. Opt-In: "Ja, ich moechte bei kritischen Compliance-Fristen informiert werden" (= Fristen-Radar Liste)
5. Progressive Profiling: Je mehr Infos, desto bessere Empfehlungen

**Lead-Datenfelder (fuer alle Tools):**
```
- E-Mail (Pflicht)
- Vorname + Nachname (Pflicht)
- Firma (Pflicht)
- Position/Titel (optional aber empfohlen: "GF", "IT-Leiter", "CISO", "Compliance")
- Branche (Pflicht, Dropdown)
- Mitarbeiteranzahl (Pflicht: 1-9, 10-49, 50-249, 250-999, 1000+)
- Jahresumsatz-Sparte (Pflicht: <2 Mio, 2-10 Mio, 10-50 Mio, 50-250 Mio, >250 Mio)
- Bundesland (optional)
- Opt-In Fristen-Radar (Checkbox, vorausgewaehlt)
- Opt-In "Passende Berater duerfen mich kontaktieren" (Checkbox, NICHT vorausgewaehlt)
```
→ Der zweite Opt-In ist das Gold: erlaubt uns legal, den Lead an Auditoren/Kanzleien weiterzugeben.

- [x] **5. NIS2/NISG Betroffenheits-Check** ✅ DONE (18.02.2026)
  4-Step Quiz: Sektor (18 Sektoren Anhang I+II), Unternehmensgroesse (KMU-Definition), Kritische Dienste, Zusammenfassung.
  → Ergebnis: "Wesentlich" / "Wichtig" / "Nicht betroffen" / "Pruefung empfohlen" mit Pflichten, Fristen, Bussgeld.
  → Route: `/tools/nis2-betroffenheits-check` — Suchfunktion fuer Sektoren, animierte Progress Bar.

- [x] **6. GF-Haftungs-Pruefer** ✅ DONE (18.02.2026)
  3-Step Tool: Regulierungen auswaehlen (NIS2/DORA/AI Act/CRA), 8 Risiko-Fragen (CMS, CISO, Schulung, D&O...), Zusammenfassung.
  → Ergebnis: Risiko-Score 0-100 mit SVG-Kreis-Animation, Ampel pro Regulierung, personalisierte Handlungsempfehlungen.
  → Route: `/tools/haftungs-pruefer`

- [x] **7. Bussgeld-Rechner** ✅ DONE (18.02.2026)
  Jahresumsatz eingeben (Freitext + Quick-Presets 2M-1Mrd) → animiertes Ergebnis pro Regulierung (AI Act, DSGVO, CRA, NIS2, DORA).
  → Animierte Counter (Framer Motion useMotionValue), proportionale Balkendiagramme, sortiert nach Hoehe.
  → Route: `/tools/bussgeld-rechner` — Regulierungen ein-/ausschaltbar, Kontexthinweise.

- [x] **8. Lead-Capture Formularsystem (Shared Component)** ✅ DONE (19.02.2026)
  Wiederverwendbare `<LeadCaptureForm />` Komponente mit:
  - Progressive Multi-Step UI (3 Steps: Kontakt, Unternehmen, Zusammenfassung)
  - Email, Name, Firma, Telefon, Branche, Unternehmensgroesse
  - Validierung (E-Mail-Format, DSGVO-Consent required)
  - Framer Motion Step-Transitions + Success-Animation
  - Daten → `/api/leads` API Route → Supabase
  - Double-Opt-In Token generiert (E-Mail-Versand Phase 3)
  - UTM-Tracking (utm_source, utm_medium, utm_campaign)
  - Tool-Results JSON-Snapshot (was der User berechnet hat)
  - Integriert in alle 3 Tools (NIS2-Check, Haftungs-Pruefer, Bussgeld-Rechner)

- [x] **9. Lead-Dashboard (Admin)** ✅ DONE (19.02.2026)
  Admin-Panel unter `/admin/leads`:
  - Login mit Service-Role-Key
  - Leads-Tabelle mit Pagination (25 pro Seite)
  - Filter nach Tool und Branche
  - CSV-Export (UTF-8 BOM fuer Excel-Kompatibilitaet)
  - Detail-Modal mit allen Lead-Daten + Tool-Results JSON
  - Stat-Cards: Gesamt, 7 Tage, 30 Tage, Marketing Opt-in
  - robots: noindex (nicht fuer Suchmaschinen)

---

### PHASE 3: Programmatic SEO — Branchen-Landingpages (Wochen 3-4) ✅ ABGESCHLOSSEN
*Ziel: Hunderte Long-Tail Keywords ohne Konkurrenz besetzen*

- [x] **10. Programmatic SEO Engine** ✅ DONE (19.02.2026)
  Dynamische Routen: `/branchen/[branche]/[gesetz]` — 17 Branchen x 4 Regulierungen = **41 statisch generierte Landingpages**.
  → `generateStaticParams()` in Next.js 16 generiert alle Combos zur Build-Zeit (SSG).
  → Zentrale Daten-Datei: `src/data/branchenData.ts` mit Branchen, Regulierungen und Content-Generatoren.
  → Wiederverwendbare Komponente: `src/components/BranchenLandingPage.tsx` mit Hero, Relevance-Intro, Affected Areas, Obligations (Accordion), Bussgeld-Preview, Compliance-Roadmap, FAQ (mit JSON-LD FAQPage Schema), Internal Linking (andere Regulierungen + andere Branchen).
  → Jede Seite hat: SEO-Metadata, JSON-LD Article + FAQ, Breadcrumb, Quick Stats, CTA zu Tools.
  → Branchen: Maschinenbau, Finanzdienstleistung, Gesundheitswesen, IT/Software, Energie, Logistik, Handel, Telekommunikation, Pharma, Automotive, Bauwesen, Lebensmittel, Versicherungen, Oeffentl. Verwaltung, Beratung, Medien, Bildung.
  → Gesetze: NIS2/NISG, AI Act, DORA, CRA.
  → Sitemap automatisch generiert aus `getAllBranchenGesetzParams()`.

- [x] **11. Branchen-Hub `/branchen`** ✅ DONE (19.02.2026)
  Uebersichtsseite mit allen 17 Branchen als Cards. Jede Card zeigt relevante Regulierungen und Links zu den Branchen-Landingpages.
  → Route: `/branchen` — Stats, Regulation Legend, Industry Cards mit NIS2-Sektor-Info, CTA zu Tools.
  → Header Nav-Link + Footer Link hinzugefuegt.

---

### PHASE 4: Affiliate-Integration + Software-Empfehlungen (Woche 4-5) ✅ ABGESCHLOSSEN
*Ziel: Passives Einkommen durch B2B SaaS Affiliate (500-3.000 EUR pro Vermittlung)*

- [x] **12. Compliance-Software Vergleichsseiten** ✅ DONE (19.02.2026)
  3 Vergleichsseiten via dynamische Route `/tools/[vergleich]`:
  - `/tools/isms-software-vergleich` → Vanta vs. Drata vs. DataGuard vs. OneTrust
  - `/tools/incident-management-vergleich` → ServiceNow vs. PagerDuty vs. Jira SM
  - `/tools/risikomanagement-vergleich` → Archer vs. LogicGate vs. RiskOptics
  → Feature-Matrix (Tabelle), Star-Ratings (5 Kategorien), expandierbare Tool-Cards mit Pro/Contra.
  → Affiliate-Links (Placeholder), Transparenz-Disclaimer, JSON-LD SoftwareApplication Schema.
  → Daten in `src/data/softwareData.ts`, Komponente `src/components/SoftwareComparisonPage.tsx`.

- [x] **13. In-Guide Software-Empfehlungen** ✅ DONE (19.02.2026)
  `<ToolRecommendation />` Komponente in allen Guides integriert (vor Quellen-Sektion).
  → Zeigt 2-3 passende Tools pro Regulierung mit Logo, Preis, Zielgruppe.
  → Affiliate-Links + "Vollstaendigen Vergleich ansehen" Link zu Vergleichsseiten.
  → Daten in `src/components/ToolRecommendation.tsx` (toolSets fuer nis2, dora, ai-act, cra, dsgvo, csrd, bafg, hschg).
  → **Noch zu erweitern:** Neue toolSets fuer Green Claims (LCA-Software), DSA (Content-Moderation-APIs), MiCA (FinTech-Compliance), EHDS (eHealth-Zertifizierung), DPP/ESPR (PLM-Software), PLD (Tech-Versicherungen), ePrivacy (CMPs).

- [x] **14. Compliance-Verzeichnis (Coming Soon → Real)** ✅ DONE (19.02.2026)
  Kuratiertes Verzeichnis unter `/compliance-verzeichnis`:
  - **Software** (5 Eintraege: DataGuard, OneTrust, Secjur, heyData, Vanta)
  - **Auditoren** (4 Eintraege: TUEV Austria, CIS, Austrian Standards, SGS)
  - **Kanzleien** (4 Eintraege: Schoenherr, Freshfields, DLA Piper, bpv Huegel)
  - **Berater** (4 Eintraege: SEC Consult, KPMG, Deloitte, SBA Research)
  - Filter: Kategorie, Regulierung, Region + Freitext-Suche
  - Featured Listings mit Gold-Badge
  - Sticky Filter-Bar, Custom Dropdowns, AnimatePresence
  - CTA-Sektion "Ihr Unternehmen hier listen?" (Monetarisierung)
  - JSON-LD CollectionPage Schema, SEO-Metadata
  → Monetarisierung: Featured Placement = 200-500 EUR/Monat pro Partner

---

### PHASE 5: E-Mail-System "Fristen-Radar" (Woche 5-6) ✅ ABGESCHLOSSEN
*Ziel: Hochkaeraetige GF-Liste aufbauen, kein Newsletter-Spam*

- [x] **15. E-Mail-Backend (Supabase + API)** ✅ DONE (19.02.2026)
  Tech-Setup:
  - Supabase `subscribers` Tabelle (Migration 003)
  - `/api/subscribe` API Route (POST fuer Anmeldung, GET fuer Double-Opt-In Bestaetigung)
  - Double-Opt-In Tokens generiert (E-Mail-Versand via Resend noch ausstehend)
  - Status-Management: pending → active → unsubscribed
  - Duplicate-Handling (bereits angemeldet, re-subscribe nach Abmeldung)
  - Unsubscribe-Token fuer jeden Subscriber
  - UTM-Tracking + Source-Page Tracking
  → **Noch offen:** Resend-Integration (tatsaechlicher E-Mail-Versand)

- [x] **16. Fristen-Radar statt Newsletter** ✅ DONE (19.02.2026)
  Dedizierte `/fristen-radar` Seite mit:
  - Hero + FristenRadarSignup Komponente (funktionales Formular → /api/subscribe)
  - Benefits-Sektion (4 Karten: Kritische Fristen, Gesetzesaenderungen, Foerderprogramme, Max 3x/Monat)
  - Kommende Fristen Uebersicht (NISG, DORA, AI Act, CRA Deadlines)
  - Bottom-CTA mit erneutem Signup
  - Framer Motion Animationen
  - JSON-LD Schema, SEO-Metadata
  → Branding: "Fristen-Radar" statt "Newsletter"

- [x] **17. Homepage + Footer: Newsletter → Fristen-Radar umbenennen** ✅ DONE (19.02.2026)
  - Homepage: Newsletter-Sektion → Fristen-Radar mit funktionalem Formular
  - Header: CTA "Updates erhalten" → Link zu /fristen-radar
  - Footer: "Newsletter" → "Fristen-Radar"
  - ComingSoonLayout: CTA Links → /fristen-radar
  - Datenschutzseite: Newsletter → Fristen-Radar inkl. Double-Opt-In Beschreibung
  - Sitemap: /newsletter → /fristen-radar
  - /newsletter → Redirect zu /fristen-radar (preserves bookmarks)

---

### PHASE 6: Content-Ausbau — Bestehende Guides (Wochen 6-10) ✅ ABGESCHLOSSEN
*Ziel: Breitere Abdeckung = mehr SEO-Traffic = mehr Leads*

- [x] **18. DSGVO & KI 2026 Guide** ✅ DONE (19.02.2026)
  Umfangreicher DSGVO-Guide unter `/dsgvo`, umbenannt zu "DSGVO & KI 2026":
  - 14 Sektionen: Ueberblick, 7 Grundprinzipien, 6 Rechtsgrundlagen, 8 Betroffenenrechte, Unternehmenspflichten, DSB, DSFA, Bussgelder (20 Mio. EUR / 4%), Oesterreich-Besonderheiten, **DSGVO & KI (Art. 22 x Hochrisiko-KI, DSFA fuer KI, Trainingsdaten)**, **ChatGPT & Kundendaten (Art. 28, Auftragsverarbeitung, Enterprise vs. Free)**, Compliance-Fahrplan, FAQ (10 Fragen), Quellen
  - Accent-Farbe: #7c3aed (Lila), Trust Badge, 8 offizielle Quellen (inkl. EDPB AI Opinion, EU AI Act)
  - ToolRecommendation mit DataGuard, OneTrust, heyData

- [x] **18b. CSRD/ESG-Guide** ✅ DONE (19.02.2026)
  Neuer Guide unter `/csrd-esg`:
  - 12 Sektionen: Ueberblick, Timeline, Betroffene, Omnibus I, ESRS-Standards (12 Standards), Doppelte Wesentlichkeit, Berichtspflichten, Externe Pruefung, Bussgelder (100.000 EUR AT), NaBeG Oesterreich, Compliance-Fahrplan, FAQ + Quellen
  - Accent: #16a34a (Gruen), 6 Quellen (EUR-Lex, ESRS, NaBeG RIS, Omnibus I, EFRAG, WKO)
  - ToolRecommendation: Sweep, Plan A, Position Green

- [x] **18c. BaFG-Guide** ✅ DONE (19.02.2026)
  Neuer Guide unter `/bafg`:
  - 12 Sektionen: Ueberblick, EAA vs. BaFG, Timeline, Betroffene, Ausnahmen, Anforderungen (4 WCAG-Prinzipien), Digitale Produkte, WCAG & EN 301 549, Bussgelder (80.000 EUR), BaFG in AT, Compliance-Fahrplan, FAQ + Quellen
  - Accent: #2563eb (Blau), 6 Quellen (EAA EUR-Lex, BaFG RIS, EN 301 549, WCAG W3C, Sozialministerium, WKO)
  - ToolRecommendation: Eye-Able, Siteimprove, UserWay

- [x] **18d. HSchG-Guide** ✅ DONE (19.02.2026)
  Neuer Guide unter `/hschg`:
  - 12 Sektionen: Ueberblick, EU-RL vs. HSchG, Timeline, Betroffene, Meldekanale, Schutzrechte, Meldeverfahren, Externe Stellen (BAK), Bussgelder (20.000/40.000 EUR), HSchG in AT, Compliance-Fahrplan, FAQ + Quellen
  - Accent: #d97706 (Amber), 5 Quellen (Whistleblower-RL EUR-Lex, HSchG RIS, BMJ, EU Commission, BAK)
  - ToolRecommendation: EQS Integrity Line, Hintbox, Whistly

- [x] **18e. Dropdown-Navigation + Homepage-Erweiterung** ✅ DONE (19.02.2026)
  - Header: Dropdown-Menus fuer "Regulierungen" (8 Gesetze in 3 Gruppen) und "Tools" (7 Tools in 2 Gruppen)
  - Mobile: Accordion-Navigation fuer alle Dropdown-Gruppen
  - Zentrale Navigation: `src/data/navigation.ts` als Single Source of Truth
  - Footer: Alle 8 Regulierungen + 6 Tools gelistet
  - Homepage: "Weitere EU-Regulierungen" SecondaryRegCards-Sektion (DSGVO&KI, CSRD, BaFG, HSchG)
  - Homepage: Ticker, Stats (8 Regulierungen), BaFG-Countdown, Why-Us-Card (8 Regs)
  - Sitemap: 3 neue Seiten, LawRef: 6 neue Gesetze, Deadlines: 3 neue Fristen
  - **74 Seiten total**

---

### PHASE 7: Content-Ausbau — Welle 2: Markt-Regulierungen (Wochen 10-14) ✅ ABGESCHLOSSEN
*Ziel: Die "verzweifelten" Nischen besetzen — Bereiche wo Marketing, Finanz und Produkt-Teams Panik haben*

- [x] **19. Green Claims Directive / Anti-Greenwashing Guide** ✅ DONE (19.02.2026)
  Richtlinie (EU) 2024/825 — Ab voraussichtlich 2026/2027 verbietet die EU pauschale Werbeaussagen wie "Klimaneutral" oder "Umweltfreundlich", wenn sie nicht durch unabhaengige, wissenschaftliche Daten und Zertifikate belegt sind.
  → **Der Schmerz:** Jede Marketingagentur und jeder E-Commerce-Shop geraet in Panik. Claims wie "100% nachhaltig" oder "CO2-neutral" sind dann illegal ohne Nachweis.
  → **Monetarisierung:** LCA-Software (Life Cycle Assessment Tools) und Zertifizierungsstellen als Affiliate. Extrem hohe B2B-Budgets.
  → Route: `/green-claims`
  → Accent: #059669 (Emerald)
  → ToolRecommendation: LCA-Software (SimaPro, openLCA, Sphera), Zertifizierungsstellen
  → Verknuepfung: Querverweise zu CSRD/ESG (Nachhaltigkeitsberichterstattung), DPP/ESPR (Produktpass)
  → **Branchen-SEO Goldmine:** Jedes Unternehmen das "oeko" oder "gruen" im Marketing verwendet ist betroffen

- [x] **20. Digital Services Act (DSA) Guide** ✅ DONE (20.02.2026)
  Verordnung (EU) 2022/2065 — Gilt bereits, aber Aufsichtsbehoerden ziehen 2026 Daumenschrauben fuer kleinere Plattformen an. Jeder der nutzergenerierte Inhalte hostet (Foren, Marktplaetze, SaaS-Plattformen) braucht neue Meldesysteme fuer illegale Inhalte.
  → Route: `/dsa` — Accent: #6366f1 (Indigo) — 15 Sektionen, 6 Quellen
  → ToolRecommendation: Hive Moderation, Crisp, OneTrust, Zendesk, DataGuard

- [x] **21. MiCA (Markets in Crypto-Assets) Guide** ✅ DONE (19.02.2026)
  Verordnung (EU) 2023/1114 — Das komplette Regelwerk fuer Krypto-Dienstleister ist seit 2024/2025 scharf. Wer Krypto-Wallets, Exchanges oder Token-Ausgaben in der EU anbietet, braucht Lizenz und massive IT-Sicherheitsnachweise (oft DORA-Kombination).
  → **Der Schmerz:** Krypto-Startups muessen Lizenzen beantragen, MiSSP-Compliance nachweisen, AML-Systeme einrichten. Extrem komplex.
  → **Monetarisierung:** Krypto-Nische zahlt die hoechsten B2B-Leads ueberhaupt. Spezialisierte FinTech-Anwaelte (500+ EUR/h) und Blockchain-Auditoren als Lead-Vermittlung.
  → Route: `/mica`
  → Accent: #f59e0b (Amber/Gold — "Krypto-Gold")
  → ToolRecommendation: FinTech-Compliance-Software (Chainalysis, Elliptic, Notabene), Krypto-Kanzleien
  → Verknuepfung: Querverweise zu DORA (IKT-Sicherheit fuer Krypto), DSGVO (Pseudonymisierung)
  → **Revenue-Potenzial:** 200-500 EUR pro Lead (vs. 50-150 EUR Standard)

- [x] **22. European Health Data Space (EHDS) Guide** ✅ DONE (20.02.2026)
  Verordnung (EU) 2025/327 — Die EU reguliert den Austausch von elektronischen Gesundheitsdaten neu. Primaernutzung ab 2027, Sekundaernutzung ab 2029.
  → Route: `/ehds` — Accent: #ec4899 (Pink) — 14 Sektionen, 6 Quellen
  → ToolRecommendation: InterSystems, Dedalus, DataGuard, OneTrust, Smile CDR

- [x] **23. Data Act Guide** ✅ DONE (20.02.2026)
  Verordnung (EU) 2023/2854 — IoT-Datenzugang, Cloud-Switching, B2B-Datenregeln. Vollstaendig anwendbar ab September 2025.
  → Route: `/data-act` — Accent: #0ea5e9 (Sky Blue) — 14 Sektionen, 5 Quellen
  → ToolRecommendation: Snowflake, OneTrust, Collibra, DataGuard, HashiCorp Vault

---

### PHASE 8: Content-Ausbau — Welle 3: Deep Tech & Zukunft (Wochen 14-18) ✅ ABGESCHLOSSEN
*Ziel: Die "naechste Welle" EU-Regulierung frueh besetzen — First-Mover-Advantage sichern*

- [x] **24. Digitaler Produktpass (DPP) / ESPR Guide** ✅ DONE (19.02.2026)
  Verordnung (EU) 2024/1781 (Ecodesign for Sustainable Products Regulation) — Die EU will, dass jedes physische Produkt (Kleidung, Batterien, Moebel, Elektronik) einen "digitalen Zwilling" per QR-Code bekommt. Dort steht drin: Rohstoffe, Reparierbarkeit, Recycling-Anleitung.
  → **Der Schmerz:** Ein Albtraum fuer Hersteller. Sie muessen ihre gesamte Produktion digitalisieren und tracken. Supply-Chain-Transparenz auf Einzelteil-Ebene.
  → **Monetarisierung:** SaaS-Plattformen fuer "Product Lifecycle Management" (PLM) und DPP-Generatoren. Das ist ein gigantischer, komplett neuer Milliarden-Markt.
  → Route: `/digitaler-produktpass`
  → Accent: #14b8a6 (Teal)
  → ToolRecommendation: PLM-Software (Siemens Teamcenter, PTC Windchill, SAP PLM), DPP-Generatoren (Circulor, iPoint)
  → Verknuepfung: Querverweise zu CSRD (Nachhaltigkeitsdaten), Green Claims (verifizierte Umweltaussagen), CRA (Software-Komponenten im Produkt)
  → **Branchen-SEO:** Textil, Batterien, Elektronik, Bau — jeder braucht DPP

- [x] **25. Neue Produkthaftungsrichtlinie (PLD) Guide** ✅ DONE (19.02.2026)
  Richtlinie (EU) 2024/2853 — Bisher haftete man fuer kaputte physische Dinge (explodierender Toaster). Die neue PLD macht **Software und KI offiziell zu Produkten**.
  → **Der Schmerz:** Wenn eine App oder KI-Software einen Fehler macht und dadurch finanzieller oder physischer Schaden entsteht, haftet der Entwickler/Anbieter extrem streng. Beweislast-Umkehr zugunsten des Geschaedigten.
  → **Monetarisierung:** Vermittlung extrem teurer B2B-Tech-Versicherungen (Cyber- & IT-Haftpflicht ab 10.000 EUR/Jahr) und spezialisierter IT-Anwaelte (400+ EUR/h).
  → Route: `/produkthaftung`
  → Accent: #ef4444 (Red — Haftung/Danger)
  → ToolRecommendation: Tech-Versicherungen (Hiscox, Chubb, Allianz Cyber), IT-Haftpflicht-Vergleicher
  → Verknuepfung: Querverweise zu AI Act (Hochrisiko-KI = erhoehte Haftung), CRA (Sicherheitsmaengel = Haftung), GF-Haftung (persoenliche Haftung)
  → **Revenue-Potenzial:** Versicherungs-Leads bringen 100-300 EUR Provision pro Abschluss

- [x] **26. ePrivacy / Cookie-Zukunft Guide** ✅ DONE (20.02.2026)
  Richtlinie 2002/58/EG + geplante ePrivacy-Verordnung — Cookie-Einwilligung, Tracking-Regeln, TKG 2021 (AT), TDDDG (DE).
  → Route: `/eprivacy` — Accent: #a855f7 (Purple) — 14 Sektionen, 6 Quellen
  → ToolRecommendation: Usercentrics, Cookiebot, Consentmanager, JENTIS, Stape

- [x] **27. eIDAS 2.0 / EU Digital Identity Guide** ✅ DONE (20.02.2026)
  Verordnung (EU) 2024/1183 — EU Digital Identity Wallet ab Mai 2026, Akzeptanzpflichten fuer Unternehmen.
  → Route: `/eidas` — Accent: #0891b2 (Cyan) — 12 Sektionen, 5 Quellen
  → ToolRecommendation: IDnow, Veriff, Jumio, DocuSign, Yousign

---

### PHASE 9: Pan-EU Internationalisierung (Wochen 18-26) 🔜 NEU — LANGFRIST-GOLDMINE
*Ziel: Von "oesterreichischer Compliance-Hub" zu "Europas fuehrendem Compliance-Portal"*

**Die strategische Einsicht:**
Die EU hat zwei Rechtsformen — das ist der Schluessel zur Skalierung:
- **Verordnungen** (Regulations: AI Act, DORA, DSGVO, MiCA, Data Act): Gelten sofort und ueberall gleich. → Content uebersetzen = fertig.
- **Richtlinien** (Directives: NIS-2, Whistleblower, CSRD, PLD, EAA): Die EU gibt nur einen Rahmen vor. **Jedes der 27 Laender schreibt ein eigenes nationales Gesetz** mit eigenen Fristen, Behoerden und Bussgeldern.
  - Oesterreich: NISG 2026, HSchG, BaFG, NaBeG
  - Deutschland: BSIG (BSI-Gesetz), HinSchG, BFSG, CSRD-UmsG
  - Frankreich: Andere Namen, andere Fristen
  - etc.

**→ Tausende hochspezifische Landingpages durch strukturierte Datenbank:**

- [ ] **28. i18n-Infrastruktur (next-intl)** ⭐ CRITICAL
  - next-intl oder next-i18next Setup
  - Routing: `/[locale]/[land]/[regulierung]`
  - Beispiel-Routes:
    - `/de/de/nis2-gesetz-deutschland` (Deutscher Nutzer sucht deutsche NIS2-Fristen)
    - `/en/fr/nis2-compliance-france` (Englischer CEO sucht franzoesische NIS2-Infos)
    - `/de/at/nisg-2026` (Bestehender Content als Basis)
  - Locale-Switcher im Header
  - hreflang-Tags fuer SEO
  - Automatische Weiterleitung basierend auf Browser-Sprache

- [ ] **29. Laender-Datenbank**
  Strukturierte Daten fuer alle 27 EU-Laender:
  ```
  Land {
    code: "de" | "at" | "fr" | ...,
    name_de: "Deutschland",
    name_en: "Germany",
    name_local: "Deutschland",
    regulations: {
      nis2: { national_law: "BSIG", authority: "BSI", deadline: "2025-03-15", fines: "10 Mio EUR" },
      whistleblower: { national_law: "HinSchG", authority: "BfJ", ... },
      csrd: { national_law: "CSRD-UmsG", ... },
      eaa: { national_law: "BFSG", ... },
      ...
    }
  }
  ```
  → `generateStaticParams()` generiert 27 x N Regulierungen x M Sprachen Seiten

- [ ] **30. Laender-Landingpages (SSG)**
  Automatisch generierte Seiten pro Land x Regulierung:
  - Nationales Umsetzungsgesetz + Link zum nationalen Gesetzestext
  - Zustaendige nationale Behoerde
  - Nationale Fristen (oft abweichend von EU-Frist!)
  - Nationale Bussgelder (oft unterschiedlich)
  - Besonderheiten / Goldplating
  - CTA: "Berater in [Land] finden"
  → Sitemap-Explosion: 27 Laender x ~10 Richtlinien x 3 Sprachen = **810+ neue Pages**

- [ ] **31. Laender-Hub `/laender`**
  Uebersichtsseite: Karte von Europa, klickbare Laender, Fortschritts-Tracker ("Wie weit ist [Land] mit NIS-2?")
  → Interaktive SVG-Karte mit Hover-Tooltips
  → Filter nach Regulierung + Status (umgesetzt / verzoegert / offen)

---

### PHASE 10: Neue Honey-Pot Tools fuer neue Regulierungen (Wochen 14-20) 🔜 NEU
*Ziel: Jede neue Regulierung = neues Lead-Capture-Tool*

- [ ] **32. Green Claims Checker**
  "Ist Ihre Werbeaussage EU-konform?" — Marketing-Teams geben ihre Claims ein, Tool bewertet Risiko.
  → Route: `/tools/green-claims-checker`
  → Lead-Capture am Ende: "Erhalten Sie eine detaillierte Analyse + Handlungsempfehlung"
  → Extrem viral auf LinkedIn (jeder kennt Greenwashing-Beispiele)

- [ ] **33. DPP-Readiness-Check**
  "Ist Ihr Produkt bereit fuer den Digitalen Produktpass?" — Hersteller beantworten Fragen zu Supply-Chain-Tracking, Materialien, Reparierbarkeit.
  → Route: `/tools/dpp-readiness-check`
  → Lead-Capture: PLM-Software-Empfehlungen + Beratervermittlung

- [ ] **34. MiCA-Lizenz-Navigator**
  "Welche MiCA-Lizenz brauchen Sie?" — Krypto-Startups beantworten Fragen zu Asset-Typen, Dienstleistungen.
  → Route: `/tools/mica-lizenz-check`
  → Lead-Capture: FinTech-Anwalt-Vermittlung (500+ EUR/Lead)

- [ ] **35. ePrivacy / Cookie-Audit-Tool**
  "Wie compliant ist Ihre Website?" — URL eingeben, automatischer Scan der Cookie-Situation.
  → Route: `/tools/cookie-audit`
  → Lead-Capture: CMP-Empfehlungen
  → Technisch: Client-Side Check der haeufigsten Cookie-Banner-Fehler

---

### PHASE 11: Deep-Dive-Artikel & Spezialcontent (Wochen 12-20) 🔜 NEU
*Ziel: Long-Form Content fuer Experten-Keywords mit hohem CPC*

- [ ] **36. Deep-Dive-Artikel zu Spezialthemen**
  Detaillierte Einzelartikel (2000+ Woerter):
  - "DORA Incident Reporting — Schritt fuer Schritt"
  - "Hochrisiko-KI nach Annex III — Vollstaendige Anforderungsliste"
  - "NISG 2026 Registrierung — So funktioniert's"
  - "D&O-Versicherung bei Cyber-Compliance — Was ist gedeckt?"
  - "CRA CE-Kennzeichnung fuer Software — Der komplette Prozess"
  - **NEU:** "Green Claims — 10 Werbeaussagen die ab 2027 illegal sind"
  - **NEU:** "MiCA Lizenzantrag — Der komplette Leitfaden fuer Krypto-Startups"
  - **NEU:** "Digitaler Produktpass — Was Hersteller jetzt tun muessen"
  - **NEU:** "Software als Produkt — Die neue EU-Produkthaftung erklaert"
  - **NEU:** "Cookieless Future — Server-Side-Tracking vs. Consent-Management"
  → Jeder Artikel mit Lead-Capture CTA am Ende

---

### PHASE 12: News & Aktualitaet (Wochen 16-20)
*Ziel: Grund wiederzukommen. Google-Signal "aktive Seite".*

- [ ] **37. News-Section / Blog**
  Aktuelle Entwicklungen: Gesetzesaenderungen, Urteile, behoerdliche Guidance.
  → Route: `/news`
  → Jeder Artikel: Datum, Kategorie-Tags, betroffene Gesetze, Relevanz-Score
  → RSS-Feed fuer SEO + Syndication
  → 2-3 Artikel pro Woche (kurz, 300-500 Woerter)

- [ ] **38. "Zuletzt aktualisiert" Badges**
  Auf jeder Guide-Karte + im Guide: "Letzte Pruefung: [Datum]"
  Zeigt Google und Nutzern: diese Seite ist aktuell.

- [ ] **39. Aenderungs-Tracker pro Regulierung**
  Zeigt was sich geaendert hat (z.B. "Digital Omnibus aendert AI Act Art. 6").
  Diff-Darstellung: was war vorher, was ist jetzt.
  Unique Feature — hat niemand im DACH-Raum.

---

### PHASE 13: UX & Design Excellence (Wochen 20-24)
*Ziel: Feeling eines 100k EUR-Produkts*

- [ ] **40. Verbesserte Guide-Navigation**
  Reading-Progress-Bar. "Naechster Abschnitt" Buttons. Geschaetzte Lesezeit. Keyboard-Nav (j/k).

- [ ] **41. Globale Suche (Command-K)**
  Sofort-Suche ueber alle Guides, News, Tools. Wie Algolia oder Vercel Command-K.
  "Suche: DORA Meldepflicht" → direkter Jump.

- [ ] **42. Dark Mode**
  Fuer lange Lesesessions. Toggle im Header. System-Praeferenz.

- [ ] **43. PDF-Export fuer Guides**
  "Als PDF herunterladen" — schoen formatiert mit Logo, Datum, Quellen.
  Free: Basisversion. Lead-Gate: vollstaendige Version mit Empfehlungen.

- [ ] **44. Vergleichstabellen zwischen Regulierungen**
  NIS2 vs. DORA Meldepflichten. AI Act vs. CRA Anforderungen. PLD vs. CRA Haftung. Interaktiv.

---

### PHASE 14: Skalierung & Zukunft (Monat 6+)
*Ziel: Post-2026 Wachstum sichern + neue Revenue-Streams*

- [ ] **45. Audit-Vorbereitungs-Module**
  Post-2026 wird der Bedarf: "Wie bestehe ich das jaehrliche Audit?"
  → Interaktive Checklisten pro Regulierung + Audit-Typ
  → Lead-Capture: "Auditor finden"

- [ ] **46. Mitarbeiter-Schulungs-Content**
  NIS2 Art. 20 und AI Act Art. 4 verlangen Schulungen.
  → Kuratierte Schulungs-Uebersichten + Partner-Empfehlungen
  → Affiliate: Schulungsanbieter (z.B. DataGuard Academy, SANS, etc.)

- [ ] **47. Vorlagen-Bibliothek**
  Downloadbare Templates:
  - "DORA IKT-Risikoregister Vorlage"
  - "NIS2 Meldung Template"
  - "AI Act Konformitaetsbewertung Checkliste"
  - "Verarbeitungsverzeichnis DSGVO"
  - **NEU:** "Green Claims Pruefprotokoll"
  - **NEU:** "DPP-Datenerfassungsbogen fuer Hersteller"
  - **NEU:** "MiCA-Lizenzantrag Checkliste"
  → Free Basics + Lead-Gate fuer vollstaendige Vorlagen

- [ ] **48. Weitere EU-Gesetze (laufend)**
  Seite waechst mit jedem neuen EU-Gesetz:
  - [x] ESG/CSRD ✅
  - [x] BaFG/EAA ✅
  - [x] HSchG ✅
  - [x] Green Claims Directive ✅
  - [x] Digital Services Act (DSA) ✅
  - [x] MiCA ✅
  - [x] EHDS ✅
  - [x] Data Act ✅
  - [x] DPP/ESPR ✅
  - [x] Neue PLD ✅
  - [x] ePrivacy ✅
  - [x] eIDAS 2.0 ✅
  - [ ] Digital Markets Act (DMA)
  - [ ] CSDDD (Corporate Sustainability Due Diligence)
  - [ ] CBAM (Carbon Border Adjustment)
  → Permanenter Compliance-Kompass, nicht One-Shot.

- [ ] **49. Analytics & Performance**
  Plausible/Umami (DSGVO-konform). Core Web Vitals. Structured Data (FAQ, HowTo, BreadcrumbList Schema). OG-Images fuer Social Sharing.

---

## Revenue-Projektionen (aktualisiert)

### Monat 1-3 (Aufbau — JETZT):
- 0 EUR Revenue, 100% Invest in Content + Tools
- Ziel: 500 Leads gesammelt, 2.000 E-Mail-Subscriber

### Monat 4-6 (Erste Revenue — AT-Fokus):
| Stream | Annahme | Revenue/Monat |
|--------|---------|---------------|
| Lead-Verkauf | 20 Leads x 75 EUR | 1.500 EUR |
| SaaS Affiliate | 2 Vermittlungen x 750 EUR | 1.500 EUR |
| Sponsored E-Mail | 1 Blast x 500 EUR | 500 EUR |
| **Gesamt** | | **3.500 EUR** |

### Monat 7-12 (Skalierung — DACH + Nischen):
| Stream | Annahme | Revenue/Monat |
|--------|---------|---------------|
| Lead-Verkauf Standard | 50 Leads x 100 EUR | 5.000 EUR |
| Lead-Verkauf Premium (MiCA, PLD) | 10 Leads x 300 EUR | 3.000 EUR |
| SaaS Affiliate | 5 Vermittlungen x 1.000 EUR | 5.000 EUR |
| CMP/Cookie Affiliate | 20 Vermittlungen x 50 EUR | 1.000 EUR |
| Sponsored E-Mail | 2 Blasts x 750 EUR | 1.500 EUR |
| Verzeichnis Featured | 8 Partner x 350 EUR | 2.800 EUR |
| **Gesamt** | | **18.300 EUR** |

### Monat 13-24 (Pan-EU Expansion):
| Stream | Annahme | Revenue/Monat |
|--------|---------|---------------|
| Lead-Verkauf (EU-weit) | 200 Leads x 100 EUR | 20.000 EUR |
| Lead-Verkauf Premium | 30 Leads x 300 EUR | 9.000 EUR |
| SaaS Affiliate | 15 Vermittlungen x 1.000 EUR | 15.000 EUR |
| CMP/Cookie Affiliate | 50 Vermittlungen x 50 EUR | 2.500 EUR |
| Sponsored E-Mail | 4 Blasts x 1.000 EUR | 4.000 EUR |
| Verzeichnis Featured | 20 Partner x 400 EUR | 8.000 EUR |
| PLM/DPP Affiliate | 3 Vermittlungen x 2.000 EUR | 6.000 EUR |
| **Gesamt** | | **64.500 EUR** |

---

## Priorisierte Reihenfolge (aktualisiert)

### ✅ Abgeschlossen (Phasen 1-8 komplett)
1-18e → Alle Items von Phase 1-6 sind DONE. Siehe Details oben.
19, 21 → Green Claims + MiCA Guides DONE (Phase 7).
24, 25 → DPP/ESPR + PLD Guides DONE (Phase 8).
20, 22, 23, 26, 27 → DSA, EHDS, Data Act, ePrivacy, eIDAS 2.0 Guides DONE (Phase 7+8).
→ **18 Guide-Seiten total, alle Regulierungen aus Phase 7+8 abgedeckt.**

### 🟡 Parallel: Neue Tools
32-35. → **Neue Honey-Pot Tools** (Green Claims Checker, DPP-Check, MiCA-Navigator, Cookie-Audit)
36. → **Deep-Dive-Artikel** (10+ Spezialartikel)

### 🟢 Mid-Term: Infrastruktur
28-31. → **Pan-EU Internationalisierung** (i18n, Laender-DB, 810+ Pages)
37-39. → **News-Section + Aenderungs-Tracker**

### 🔵 Fortlaufend: Polish & Scale
40-44. → UX + Design Excellence
45-49. → Skalierung + Post-2026 + neue Gesetze

---

## Regulierungs-Ueberblick: Verordnungen vs. Richtlinien

### Verordnungen (gelten EU-weit gleich — Content uebersetzen = fertig):
| Regulierung | Status | Guide |
|-------------|--------|-------|
| DSGVO | In Kraft seit 2018 | ✅ `/dsgvo` |
| AI Act | Stufenweise ab 2025 | ✅ `/eu-ai-act` |
| DORA | In Kraft seit 01/2025 | ✅ `/dora` |
| CRA | Stufenweise ab 2025 | ✅ `/cra` |
| MiCA | In Kraft seit 12/2024 | ✅ `/mica` |
| Data Act | Anwendung ab 09/2025 | ✅ `/data-act` |
| DPP/ESPR | Stufenweise ab 2027 | ✅ `/digitaler-produktpass` |
| eIDAS 2.0 | Stufenweise ab 2026 | ✅ `/eidas` |

### Richtlinien (jedes Land setzt eigenes Gesetz um — Laender-Pages):
| EU-Richtlinie | AT-Umsetzung | DE-Umsetzung | Guide |
|---------------|-------------|-------------|-------|
| NIS-2-RL | NISG 2026 | BSIG/NIS2UmsuCG | ✅ `/nisg-2026` |
| CSRD | NaBeG | CSRD-UmsG | ✅ `/csrd-esg` |
| EAA | BaFG | BFSG | ✅ `/bafg` |
| Whistleblower-RL | HSchG | HinSchG | ✅ `/hschg` |
| Neue PLD | (ausstehend) | (ausstehend) | ✅ `/produkthaftung` |
| Green Claims | (ausstehend) | (ausstehend) | ✅ `/green-claims` |
| DSA | (KoPl-G?) | DDG | ✅ `/dsa` |
| ePrivacy | (DSG?) | TDDDG | ✅ `/eprivacy` |
| EHDS | (ausstehend) | (ausstehend) | ✅ `/ehds` |
| CSDDD | (ausstehend) | LkSG | ❌ Spaeter |

---

## Erfolgskriterien (aktualisiert)

### Traffic:
- [ ] 5.000 Visits/Monat nach 3 Monaten
- [ ] 20.000 Visits/Monat nach 6 Monaten
- [ ] 100.000 Visits/Monat nach 12 Monaten (Pan-EU)
- [ ] 80+ indexierte Branchen-Landingpages
- [ ] 500+ indexierte Laender-Landingpages (nach Phase 9)

### Leads:
- [ ] 100 Leads/Monat nach 3 Monaten
- [ ] 500 Leads/Monat nach 6 Monaten
- [ ] 2.000 Leads/Monat nach 12 Monaten (Pan-EU)
- [ ] >60% haben Firmen-E-Mail (Qualitaets-Indikator)
- [ ] >30% haben Berater-Opt-In (verkaufbar)
- [ ] >10 Premium-Leads/Monat (MiCA, PLD — 200+ EUR/Lead)

### E-Mail:
- [ ] 1.000 Fristen-Radar Subscriber nach 3 Monaten
- [ ] 5.000 nach 6 Monaten
- [ ] 25.000 nach 12 Monaten (Pan-EU)
- [ ] Open Rate >40% (weil nur relevante E-Mails)

### Revenue:
- [ ] Erster Lead-Verkauf nach 3 Monaten
- [ ] Erster Affiliate-Sale nach 4 Monaten
- [ ] 3.500 EUR/Monat nach 6 Monaten
- [ ] 18.000 EUR/Monat nach 12 Monaten
- [ ] 64.000 EUR/Monat nach 24 Monaten (Pan-EU)

---

## Technische Architektur (aktualisiert)

```
Frontend (Next.js 16):
├── Static Guides (SSG) — 18 Regulierungen live
├── Branchen-Seiten (SSG, generateStaticParams) — 41 Pages
├── Laender-Seiten (SSG, generateStaticParams) — 810+ Pages (Phase 9)
├── Honey-Pot Tools (Client Components) — 3 live + 4 geplant
├── Software-Vergleiche (SSG) — 3 live + weitere geplant
├── News/Blog (MDX oder CMS)
├── i18n (next-intl) — de/en/fr (Phase 9)
└── Admin Dashboard (geschuetzt)

Backend:
├── Supabase (PostgreSQL)
│   ├── leads (alle Tool-Leads)
│   ├── subscribers (Fristen-Radar)
│   ├── partners (Verzeichnis)
│   ├── countries (Laender-Daten, Phase 9)
│   └── analytics_events
├── Resend (E-Mail)
│   ├── Double-Opt-In
│   ├── Fristen-Radar Blasts
│   └── Transactional
└── API Routes (Next.js)
    ├── /api/leads (POST)
    ├── /api/subscribe (POST)
    ├── /api/verify (GET)
    └── /api/admin/* (geschuetzt)

Daten-Architektur:
├── src/data/navigation.ts — Single Source of Truth (Header, Footer, Mobile)
├── src/data/deadlines.ts — Alle EU-Fristen (auto-updating)
├── src/data/branchenData.ts — 17 Branchen x N Regulierungen
├── src/data/countriesData.ts — 27 EU-Laender x N Regulierungen (Phase 9)
├── src/data/softwareData.ts — Vergleichs-Daten
├── src/components/LawRef.tsx — EUR-Lex, RIS, JusLine Deep-Links
├── src/components/ToolRecommendation.tsx — 16 toolSets (alle Regulierungen)
└── src/components/GuidePageLayout.tsx — Wiederverwendbares Guide-Layout
```

---

## Zusammenfassung: Warum das so genial ist

**Kurzfristig (Monat 1-6):** 18 Guides + 3 Tools + 41 Branchen-Seiten = **Oesterreichs umfassendste B2B-Compliance-Ressource**. Kein Wettbewerber hat diese Breite + Tiefe + Interaktivitaet kombiniert. Alle 18 Regulierungen (inkl. Green Claims, MiCA, DPP, PLD, DSA, EHDS, Data Act, ePrivacy, eIDAS 2.0) sind live.

**Mittelfristig (Monat 6-12):** 4 neue Honey-Pot Tools + Deep-Dive-Artikel = **DACH-Marktfuehrer**. Premium-Leads aus Krypto (MiCA) und Versicherung (PLD) treiben Revenue auf 18k+/Monat.

**Langfristig (Monat 12-24):** Pan-EU Internationalisierung mit 810+ Laender-Landingpages = **Europas fuehrendes Compliance-Portal**. Der Unterschied zwischen Verordnungen (gleich ueberall) und Richtlinien (27 nationale Gesetze) ist die Programmatic-SEO-Goldmine, die niemand sonst so granular und nutzerfreundlich aufbaut.

**Die einzige Schnittstelle:** Zwischen verzweifelten europaeischen Unternehmen und den Software-Anbietern, Anwaelten und Auditoren die ihnen helfen koennen.

---

*Dieser Plan wird laufend aktualisiert. ✅ = fertig, 🔄 = in Arbeit, ❌ = geplant*
*Items ohne Markierung sind noch offen.*
