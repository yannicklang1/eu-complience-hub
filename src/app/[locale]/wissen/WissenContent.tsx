"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialShareBar from "@/components/SocialShareBar";

/* ══════════════════════════════════════════════════════════════
   Knowledge Hub — Central Resource Page
   ══════════════════════════════════════════════════════════════ */

interface ResourceCard {
  title: string;
  description: string;
  href: string;
  icon: string;
  accent: string;
  badge?: string;
  /** keywords for search matching beyond title+description */
  keywords?: string[];
}

const CORE_REGULATIONS: ResourceCard[] = [
  { title: "NISG 2026", description: "Cybersicherheit: Registrierung, Risikomanagement, Meldepflichten", href: "/nisg-2026", icon: "\uD83D\uDEE1\uFE0F", accent: "#1e40af", badge: "Ab Okt. 2026", keywords: ["NIS2", "cybersecurity", "netzwerk"] },
  { title: "EU AI Act", description: "KI-Verordnung: Risikoklassen, Verbote, Transparenzpflichten", href: "/eu-ai-act", icon: "\uD83E\uDD16", accent: "#7c3aed", badge: "Ab Aug. 2025", keywords: ["künstliche intelligenz", "AI", "maschinelles lernen"] },
  { title: "DORA", description: "IT-Resilienz im Finanzsektor: IKT-Risikomanagement, TLPT", href: "/dora", icon: "\uD83C\uDFE6", accent: "#f59e0b", badge: "In Kraft", keywords: ["finanz", "bank", "versicherung", "digital operational"] },
  { title: "CRA", description: "Cybersicherheit für digitale Produkte: Security-by-Design, SBOM", href: "/cra", icon: "\uD83D\uDDA5\uFE0F", accent: "#ef4444", badge: "Ab Sep. 2026", keywords: ["cyber resilience", "produkt", "software", "IoT"] },
  { title: "DSGVO", description: "Datenschutz-Grundverordnung: Verarbeitung, Betroffenenrechte, TOMs", href: "/dsgvo", icon: "\uD83D\uDD12", accent: "#8b5cf6", badge: "In Kraft", keywords: ["GDPR", "datenschutz", "privacy", "personenbezogene daten"] },
  { title: "CSRD / ESG", description: "Nachhaltigkeitsberichte: Doppelte Wesentlichkeit, ESRS, Taxonomie", href: "/csrd-esg", icon: "\uD83C\uDF3F", accent: "#10b981", badge: "Ab 2025", keywords: ["nachhaltigkeit", "sustainability", "ESG", "umwelt"] },
];

const MORE_REGULATIONS: ResourceCard[] = [
  { title: "BaFG", description: "Barrierefreiheitsstärkungsgesetz: Digitale Zugänglichkeit", href: "/bafg", icon: "\u267F", accent: "#2563eb", keywords: ["barrierefreiheit", "accessibility", "a11y"] },
  { title: "HSchG", description: "Hinweisgeberschutzgesetz: Interne Meldekanäle", href: "/hschg", icon: "\uD83D\uDCE2", accent: "#d97706", keywords: ["whistleblower", "hinweisgeber", "meldekanal"] },
  { title: "GF-Haftung", description: "Persönliche Geschäftsführer-Haftung bei EU-Verstößen", href: "/haftungs-check", icon: "\u2696\uFE0F", accent: "#0A2540", keywords: ["haftung", "geschäftsführer", "vorstand", "liability"] },
  { title: "Green Claims", description: "Anti-Greenwashing: Belegpflicht für Umweltaussagen", href: "/green-claims", icon: "\uD83C\uDF31", accent: "#059669", keywords: ["greenwashing", "umwelt", "klimaneutral"] },
  { title: "MiCA", description: "Markets in Crypto-Assets: Krypto-Regulierung, Stablecoins", href: "/mica", icon: "\uD83E\uDE99", accent: "#f59e0b", keywords: ["krypto", "bitcoin", "blockchain", "stablecoin"] },
  { title: "Produkthaftung", description: "Neue PLD: Software und KI als Produkte, Beweislast", href: "/produkthaftung", icon: "\u26A0\uFE0F", accent: "#ef4444", keywords: ["product liability", "haftung", "schadenersatz"] },
  { title: "Digitaler Produktpass", description: "DPP: Nachhaltigkeitsdaten entlang der Lieferkette", href: "/digitaler-produktpass", icon: "\uD83D\uDCCB", accent: "#14b8a6", keywords: ["DPP", "lieferkette", "supply chain", "batterie"] },
  { title: "DSA", description: "Digital Services Act: Plattformregulierung und Content-Moderation", href: "/dsa", icon: "\uD83C\uDF10", accent: "#6366f1", keywords: ["plattform", "social media", "content moderation"] },
  { title: "Data Act", description: "Datenzugangsrechte: IoT-Daten und Cloud-Switching", href: "/data-act", icon: "\uD83D\uDCC8", accent: "#0ea5e9", keywords: ["daten", "IoT", "cloud", "switching"] },
  { title: "ePrivacy", description: "Cookie-Einwilligung und elektronische Kommunikation", href: "/eprivacy", icon: "\uD83C\uDF6A", accent: "#a855f7", keywords: ["cookie", "einwilligung", "tracking", "kommunikation"] },
  { title: "eIDAS 2.0", description: "EU Digital Identity Wallet: Elektronische Identifizierung", href: "/eidas", icon: "\uD83C\uDD94", accent: "#0891b2", keywords: ["identität", "wallet", "signatur", "authentifizierung"] },
  { title: "EHDS", description: "Europäischer Gesundheitsdatenraum: Primär- und Sekundärnutzung", href: "/ehds", icon: "\uD83C\uDFE5", accent: "#ec4899", keywords: ["gesundheit", "health", "patient", "medizin"] },
];

const TOOLS: ResourceCard[] = [
  { title: "Regulierung-Finder", description: "Quiz: Welche EU-Regulierungen betreffen Ihr Unternehmen?", href: "/tools/regulierung-finder", icon: "\uD83E\uDDED", accent: "#FACC15", badge: "Neu", keywords: ["welche regulierung", "betroffen"] },
  { title: "NIS2 Betroffenheits-Check", description: "Finden Sie in 2 Minuten heraus, ob Ihr Unternehmen unter NIS2 fällt", href: "/tools/nis2-betroffenheits-check", icon: "\u2705", accent: "#3b82f6", keywords: ["NIS2", "betroffenheit", "check"] },
  { title: "Compliance-Checkliste", description: "Prüfen Sie Ihren Compliance-Status für alle EU-Regulierungen", href: "/tools/compliance-checkliste", icon: "\uD83D\uDCCB", accent: "#FACC15", keywords: ["checkliste", "status", "prüfung"] },
  { title: "Kosten-Kalkulator", description: "Schätzen Sie die Kosten für die Umsetzung von EU-Compliance", href: "/tools/kosten-kalkulator", icon: "\uD83D\uDCB0", accent: "#FACC15", badge: "Neu", keywords: ["kosten", "budget", "schätzung"] },
  { title: "Reifegrad-Check", description: "Bewerten Sie Ihren Compliance-Reifegrad in 5 Kategorien", href: "/tools/reifegrad-check", icon: "\uD83D\uDCCA", accent: "#6366f1", badge: "Neu", keywords: ["reifegrad", "maturity", "bewertung"] },
  { title: "Haftungs-Prüfer", description: "Bewerten Sie Ihr persönliches Haftungsrisiko als Geschäftsführer", href: "/tools/haftungs-pruefer", icon: "\u2696\uFE0F", accent: "#0A2540", keywords: ["haftung", "geschäftsführer", "risiko"] },
  { title: "Bußgeld-Rechner", description: "Berechnen Sie den Strafrahmen bei Verstößen gegen EU-Regulierungen", href: "/tools/bussgeld-rechner", icon: "\uD83D\uDCB0", accent: "#ef4444", keywords: ["bußgeld", "strafe", "fine", "sanktion"] },
  { title: "Software-Vergleich", description: "ISMS- und Compliance-Tools im direkten Vergleich", href: "/tools/isms-software-vergleich", icon: "\uD83D\uDD0D", accent: "#06b6d4", keywords: ["software", "ISMS", "vergleich", "tool"] },
];

const RESOURCES: ResourceCard[] = [
  { title: "Aktuelles", description: "Compliance-News, Gesetzesänderungen und kommende Fristen", href: "/aktuelles", icon: "\uD83D\uDCF0", accent: "#FACC15", badge: "Neu", keywords: ["news", "nachrichten", "aktuell"] },
  { title: "Regulierungsvergleich", description: "EU-Regulierungen Seite an Seite vergleichen", href: "/vergleich", icon: "\uD83D\uDD00", accent: "#FACC15", badge: "Neu", keywords: ["vergleich", "matrix", "gegenüberstellung"] },
  { title: "Fristen-Radar", description: "Alle EU-Compliance-Deadlines auf einen Blick", href: "/fristen-radar", icon: "\u23F0", accent: "#FACC15", keywords: ["fristen", "deadline", "termin"] },
  { title: "Compliance-Timeline", description: "Chronologische Übersicht aller Fristen 2025\u20132027", href: "/timeline", icon: "\uD83D\uDCC5", accent: "#3b82f6", keywords: ["timeline", "chronologie", "zeitstrahl"] },
  { title: "Branchen-Compliance", description: "Regulierungen nach Branche gefiltert: IT, Industrie, Gesundheit, etc.", href: "/branchen", icon: "\uD83C\uDFED", accent: "#059669", keywords: ["branche", "industrie", "sektor"] },
  { title: "Compliance-Glossar", description: "Über 70 Fachbegriffe verständlich erklärt", href: "/glossar", icon: "\uD83D\uDCD6", accent: "#8b5cf6", keywords: ["glossar", "begriffe", "definition", "lexikon"] },
  { title: "Compliance-Verzeichnis", description: "Kuratierte Liste von Auditoren, Software und Beratern", href: "/compliance-verzeichnis", icon: "\uD83D\uDCDA", accent: "#7c3aed", keywords: ["verzeichnis", "berater", "auditor", "anbieter"] },
  { title: "Häufige Fragen (FAQ)", description: "Antworten auf die wichtigsten Compliance-Fragen", href: "/faq", icon: "\u2753", accent: "#6366f1", badge: "Neu", keywords: ["FAQ", "fragen", "antworten"] },
  { title: "Offizielle Quellen", description: "Alle referenzierten EU- und AT-Rechtsquellen", href: "/quellen", icon: "\uD83D\uDD17", accent: "#64748b", keywords: ["quellen", "referenz", "gesetzestext"] },
];

const ALL_ITEMS = [...CORE_REGULATIONS, ...MORE_REGULATIONS, ...TOOLS, ...RESOURCES];

function matchesSearch(item: ResourceCard, query: string): boolean {
  const q = query.toLowerCase();
  return (
    item.title.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    (item.keywords?.some((k) => k.toLowerCase().includes(q)) ?? false)
  );
}

const STATS = [
  { value: "18", label: "EU-Regulierungen", icon: "\uD83D\uDCDC" },
  { value: "8", label: "Interaktive Tools", icon: "\uD83D\uDEE0\uFE0F" },
  { value: "70+", label: "Glossar-Einträge", icon: "\uD83D\uDCD6" },
  { value: "7", label: "Branchen-Guides", icon: "\uD83C\uDFED" },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

/* ══════════════════════════════════════════════════════════════ */

export default function WissenContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [search, setSearch] = useState(initialQuery);

  const filteredCore = useMemo(
    () => (search ? CORE_REGULATIONS.filter((r) => matchesSearch(r, search)) : CORE_REGULATIONS),
    [search],
  );
  const filteredMore = useMemo(
    () => (search ? MORE_REGULATIONS.filter((r) => matchesSearch(r, search)) : MORE_REGULATIONS),
    [search],
  );
  const filteredTools = useMemo(
    () => (search ? TOOLS.filter((t) => matchesSearch(t, search)) : TOOLS),
    [search],
  );
  const filteredResources = useMemo(
    () => (search ? RESOURCES.filter((r) => matchesSearch(r, search)) : RESOURCES),
    [search],
  );

  const totalResults = search
    ? filteredCore.length + filteredMore.length + filteredTools.length + filteredResources.length
    : ALL_ITEMS.length;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#060c1a]">
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(250,204,21,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-mono font-semibold tracking-wider uppercase mb-6">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              Wissenszentrum
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              Alles über EU-
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Compliance</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              18 EU-Regulierungen erklärt, interaktive Tools, Branchen-Guides und Fachbegriffe. Ihr zentrales Nachschlagewerk für alle Compliance-Anforderungen.
            </p>

            {/* ── Search ── */}
            <div className="max-w-lg mx-auto relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="search"
                placeholder="Regulierung, Tool oder Thema suchen..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-slate-500 outline-none focus:border-yellow-400/40 focus:bg-white/[0.06] transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  aria-label="Suche zurücksetzen"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {search && (
              <p className="text-xs text-slate-500 mt-3">
                {totalResults} {totalResults === 1 ? "Ergebnis" : "Ergebnisse"} für &ldquo;{search}&rdquo;
              </p>
            )}
          </div>
        </section>

        {/* ── Stats ── */}
        {!search && (
          <section className="pb-12 px-6">
            <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  {...fadeIn}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center"
                >
                  <span className="text-lg mb-1 block" aria-hidden="true">{stat.icon}</span>
                  <span className="font-[Syne] font-extrabold text-2xl text-white block">{stat.value}</span>
                  <span className="text-[11px] text-slate-500 font-medium">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ── Core Regulations ── */}
        <AnimatePresence mode="popLayout">
          {filteredCore.length > 0 && (
            <motion.div key="core" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Section title="Kernsäulen der EU-Compliance" subtitle="Die wichtigsten Regulierungen, die nahezu jedes Unternehmen betreffen">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCore.map((r) => (
                    <RegCard key={r.href} item={r} />
                  ))}
                </div>
              </Section>
            </motion.div>
          )}

          {/* ── More Regulations ── */}
          {filteredMore.length > 0 && (
            <motion.div key="more" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Section title="Weitere EU-Regulierungen" subtitle="Spezialgesetze für bestimmte Branchen und Anwendungsbereiche">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {filteredMore.map((r) => (
                    <RegCard key={r.href} item={r} compact />
                  ))}
                </div>
              </Section>
            </motion.div>
          )}

          {/* ── Tools ── */}
          {filteredTools.length > 0 && (
            <motion.div key="tools" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Section title="Interaktive Tools" subtitle="Kostenlose Selbst-Checks und Rechner für Ihre Compliance-Prüfung">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTools.map((t) => (
                    <RegCard key={t.href} item={t} />
                  ))}
                </div>
              </Section>
            </motion.div>
          )}

          {/* ── Resources ── */}
          {filteredResources.length > 0 && (
            <motion.div key="resources" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Section title="Ressourcen & Nachschlagewerke" subtitle="Fristen, Verzeichnisse, Glossar und mehr">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredResources.map((r) => (
                    <RegCard key={r.href} item={r} />
                  ))}
                </div>
              </Section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── No results ── */}
        {search && totalResults === 0 && (
          <section className="pb-16 px-6">
            <div className="max-w-lg mx-auto text-center py-12">
              <span className="text-4xl mb-4 block" aria-hidden="true">🔍</span>
              <p className="text-slate-400 text-sm mb-4">
                Keine Ergebnisse für &ldquo;{search}&rdquo; gefunden.
              </p>
              <button
                onClick={() => setSearch("")}
                className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
              >
                Suche zurücksetzen
              </button>
            </div>
          </section>
        )}

        {/* ── Share ── */}
        {!search && (
          <section className="px-6 pb-4">
            <div className="max-w-3xl mx-auto">
              <SocialShareBar
                path="/wissen"
                title="EU Compliance Wissenszentrum"
                dark
                label="Wissenszentrum teilen"
                sublabel="Teilen Sie diese Compliance-Übersicht mit Ihrem Team"
              />
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="pb-20 px-6">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto text-center">
            <div className="rounded-2xl border border-yellow-400/15 bg-yellow-400/5 p-8 sm:p-10">
              <h2 className="font-[Syne] font-bold text-xl text-white mb-3">
                Kein Update verpassen
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-lg mx-auto">
                Abonnieren Sie das Compliance-Briefing und erhalten Sie Fristen-Warnungen, Gesetzes-Updates und Praxistipps direkt in Ihren Posteingang.
              </p>
              <Link
                href="/fristen-radar"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-slate-900"
                style={{
                  background: "linear-gradient(135deg, #FACC15, #EAB308)",
                  boxShadow: "0 8px 32px rgba(250,204,21,0.3), 0 2px 8px rgba(250,204,21,0.2)",
                }}
              >
                Compliance-Briefing abonnieren
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ── Section Wrapper ── */

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeIn} className="mb-8">
          <h2 className="font-[Syne] font-bold text-xl sm:text-2xl text-white mb-2">
            {title}
          </h2>
          <p className="text-sm text-slate-400">{subtitle}</p>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

/* ── Regulation Card ── */

function RegCard({ item, compact = false }: { item: ResourceCard; compact?: boolean }) {
  return (
    <motion.div {...fadeIn}>
      <Link
        href={item.href}
        className="group block rounded-xl border border-white/5 bg-slate-900/40 hover:border-white/10 hover:bg-slate-900/60 transition-all duration-200 h-full"
        style={{ borderColor: `${item.accent}10` }}
      >
        <div className={compact ? "p-4" : "p-5"}>
          <div className="flex items-start gap-3">
            <span className={compact ? "text-lg" : "text-xl"} aria-hidden="true">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className={`font-bold text-white group-hover:text-yellow-400 transition-colors ${compact ? "text-sm" : "text-[15px]"}`}>
                  {item.title}
                </h3>
                {item.badge && (
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-md font-mono font-bold text-white/80"
                    style={{ background: `${item.accent}30` }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <p className={`text-slate-400 leading-relaxed ${compact ? "text-xs" : "text-xs"}`}>
                {item.description}
              </p>
            </div>
            <svg
              className="flex-shrink-0 mt-1 w-4 h-4 text-slate-600 group-hover:text-yellow-400 transition-colors"
              fill="none"
              viewBox="0 0 16 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 3l5 5-5 5" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
