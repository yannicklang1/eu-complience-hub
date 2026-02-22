"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialShareBar from "@/components/SocialShareBar";
import { useTranslations } from "@/i18n/use-translations";

/* ══════════════════════════════════════════════════════════════
   Knowledge Hub — Central Resource Page (English)
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
  { title: "NISG 2026", description: "Cybersecurity: registration, risk management, reporting obligations", href: "/nisg-2026", icon: "\uD83D\uDEE1\uFE0F", accent: "#1e40af", badge: "From Oct. 2026", keywords: ["NIS2", "cybersecurity", "network"] },
  { title: "EU AI Act", description: "AI Regulation: risk classes, prohibitions, transparency obligations", href: "/eu-ai-act", icon: "\uD83E\uDD16", accent: "#7c3aed", badge: "From Aug. 2025", keywords: ["artificial intelligence", "AI", "machine learning"] },
  { title: "DORA", description: "IT resilience in the financial sector: ICT risk management, TLPT", href: "/dora", icon: "\uD83C\uDFE6", accent: "#f59e0b", badge: "In force", keywords: ["finance", "bank", "insurance", "digital operational"] },
  { title: "CRA", description: "Cybersecurity for digital products: security by design, SBOM", href: "/cra", icon: "\uD83D\uDDA5\uFE0F", accent: "#ef4444", badge: "From Sep. 2026", keywords: ["cyber resilience", "product", "software", "IoT"] },
  { title: "GDPR", description: "General Data Protection Regulation: processing, data subject rights, TOMs", href: "/dsgvo", icon: "\uD83D\uDD12", accent: "#8b5cf6", badge: "In force", keywords: ["GDPR", "data protection", "privacy", "personal data"] },
  { title: "CSRD / ESG", description: "Sustainability reports: double materiality, ESRS, taxonomy", href: "/csrd-esg", icon: "\uD83C\uDF3F", accent: "#10b981", badge: "From 2025", keywords: ["sustainability", "ESG", "environment"] },
];

const MORE_REGULATIONS: ResourceCard[] = [
  { title: "BaFG", description: "Accessibility Strengthening Act: digital accessibility", href: "/bafg", icon: "\u267F", accent: "#2563eb", keywords: ["accessibility", "a11y"] },
  { title: "HSchG", description: "Whistleblower Protection Act: internal reporting channels", href: "/hschg", icon: "\uD83D\uDCE2", accent: "#d97706", keywords: ["whistleblower", "reporting channel"] },
  { title: "MD Liability", description: "Personal managing director liability for EU violations", href: "/haftungs-check", icon: "\u2696\uFE0F", accent: "#0A2540", keywords: ["liability", "managing director", "board", "personal"] },
  { title: "Green Claims", description: "Anti-greenwashing: obligation to substantiate environmental claims", href: "/green-claims", icon: "\uD83C\uDF31", accent: "#059669", keywords: ["greenwashing", "environment", "climate neutral"] },
  { title: "MiCA", description: "Markets in Crypto-Assets: crypto regulation, stablecoins", href: "/mica", icon: "\uD83E\uDE99", accent: "#f59e0b", keywords: ["crypto", "bitcoin", "blockchain", "stablecoin"] },
  { title: "Product Liability", description: "New PLD: software and AI as products, burden of proof", href: "/produkthaftung", icon: "\u26A0\uFE0F", accent: "#ef4444", keywords: ["product liability", "damages"] },
  { title: "Digital Product Passport", description: "DPP: sustainability data along the supply chain", href: "/digitaler-produktpass", icon: "\uD83D\uDCCB", accent: "#14b8a6", keywords: ["DPP", "supply chain", "battery"] },
  { title: "DSA", description: "Digital Services Act: platform regulation and content moderation", href: "/dsa", icon: "\uD83C\uDF10", accent: "#6366f1", keywords: ["platform", "social media", "content moderation"] },
  { title: "Data Act", description: "Data access rights: IoT data and cloud switching", href: "/data-act", icon: "\uD83D\uDCC8", accent: "#0ea5e9", keywords: ["data", "IoT", "cloud", "switching"] },
  { title: "ePrivacy", description: "Cookie consent and electronic communications", href: "/eprivacy", icon: "\uD83C\uDF6A", accent: "#a855f7", keywords: ["cookie", "consent", "tracking", "communication"] },
  { title: "eIDAS 2.0", description: "EU Digital Identity Wallet: electronic identification", href: "/eidas", icon: "\uD83C\uDD94", accent: "#0891b2", keywords: ["identity", "wallet", "signature", "authentication"] },
  { title: "EHDS", description: "European Health Data Space: primary and secondary use", href: "/ehds", icon: "\uD83C\uDFE5", accent: "#ec4899", keywords: ["health", "patient", "medicine"] },
];

const TOOLS: ResourceCard[] = [
  { title: "Regulation Finder", description: "Quiz: Which EU regulations affect your company?", href: "/tools/regulierung-finder", icon: "\uD83E\uDDED", accent: "#FACC15", badge: "New", keywords: ["which regulation", "affected"] },
  { title: "NIS2 Applicability Check", description: "Find out in 2 minutes whether your company falls under NIS2", href: "/tools/nis2-betroffenheits-check", icon: "\u2705", accent: "#3b82f6", keywords: ["NIS2", "applicability", "check"] },
  { title: "Compliance Checklist", description: "Check your compliance status for all EU regulations", href: "/tools/compliance-checkliste", icon: "\uD83D\uDCCB", accent: "#FACC15", keywords: ["checklist", "status", "review"] },
  { title: "Cost Calculator", description: "Estimate the costs for implementing EU compliance", href: "/tools/kosten-kalkulator", icon: "\uD83D\uDCB0", accent: "#FACC15", badge: "New", keywords: ["costs", "budget", "estimate"] },
  { title: "Maturity Check", description: "Assess your compliance maturity across 5 categories", href: "/tools/reifegrad-check", icon: "\uD83D\uDCCA", accent: "#6366f1", badge: "New", keywords: ["maturity", "assessment"] },
  { title: "Liability Assessor", description: "Assess your personal liability risk as a managing director", href: "/tools/haftungs-pruefer", icon: "\u2696\uFE0F", accent: "#0A2540", keywords: ["liability", "managing director", "risk"] },
  { title: "Fine Calculator", description: "Calculate the penalty range for violations of EU regulations", href: "/tools/bussgeld-rechner", icon: "\uD83D\uDCB0", accent: "#ef4444", keywords: ["fine", "penalty", "sanction"] },
  { title: "Software Comparison", description: "ISMS and compliance tools compared side by side", href: "/tools/isms-software-vergleich", icon: "\uD83D\uDD0D", accent: "#06b6d4", keywords: ["software", "ISMS", "comparison", "tool"] },
];

const RESOURCES: ResourceCard[] = [
  { title: "News", description: "Compliance news, legislative changes and upcoming deadlines", href: "/aktuelles", icon: "\uD83D\uDCF0", accent: "#FACC15", badge: "New", keywords: ["news", "current"] },
  { title: "Regulation Comparison", description: "Compare EU regulations side by side", href: "/vergleich", icon: "\uD83D\uDD00", accent: "#FACC15", badge: "New", keywords: ["comparison", "matrix"] },
  { title: "Deadline Radar", description: "All EU compliance deadlines at a glance", href: "/fristen-radar", icon: "\u23F0", accent: "#FACC15", keywords: ["deadlines", "dates"] },
  { title: "Compliance Timeline", description: "Chronological overview of all deadlines 2025\u20132027", href: "/timeline", icon: "\uD83D\uDCC5", accent: "#3b82f6", keywords: ["timeline", "chronology"] },
  { title: "Industry Compliance", description: "Regulations filtered by industry: IT, manufacturing, health, etc.", href: "/branchen", icon: "\uD83C\uDFED", accent: "#059669", keywords: ["industry", "sector"] },
  { title: "Compliance Glossary", description: "Over 70 technical terms clearly explained", href: "/glossar", icon: "\uD83D\uDCD6", accent: "#8b5cf6", keywords: ["glossary", "terms", "definition", "lexicon"] },
  { title: "Compliance Directory", description: "Curated list of auditors, software and consultants", href: "/compliance-verzeichnis", icon: "\uD83D\uDCDA", accent: "#7c3aed", keywords: ["directory", "consultant", "auditor", "provider"] },
  { title: "Frequently Asked Questions (FAQ)", description: "Answers to the most important compliance questions", href: "/faq", icon: "\u2753", accent: "#6366f1", badge: "New", keywords: ["FAQ", "questions", "answers"] },
  { title: "Official Sources", description: "All referenced EU and AT legal sources", href: "/quellen", icon: "\uD83D\uDD17", accent: "#64748b", keywords: ["sources", "reference", "legislation"] },
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
  { value: "18", label: "EU Regulations", icon: "\uD83D\uDCDC" },
  { value: "8", label: "Interactive Tools", icon: "\uD83D\uDEE0\uFE0F" },
  { value: "70+", label: "Glossary Entries", icon: "\uD83D\uDCD6" },
  { value: "7", label: "Industry Guides", icon: "\uD83C\uDFED" },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

/* ══════════════════════════════════════════════════════════════ */

export default function WissenContentEN() {
  const { locale } = useTranslations();
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
              Knowledge Centre
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              All about EU{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Compliance</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              18 EU regulations explained, interactive tools, industry guides and technical terms. Your central reference for all compliance requirements.
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
                placeholder="Search regulation, tool or topic..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-slate-500 outline-none focus:border-yellow-400/40 focus:bg-white/[0.06] transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  aria-label="Reset search"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {search && (
              <p className="text-xs text-slate-500 mt-3">
                {totalResults} {totalResults === 1 ? "result" : "results"} for &ldquo;{search}&rdquo;
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
              <Section title="Core Pillars of EU Compliance" subtitle="The most important regulations that affect virtually every company">
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
              <Section title="Further EU Regulations" subtitle="Specialised legislation for specific industries and use cases">
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
              <Section title="Interactive Tools" subtitle="Free self-assessments and calculators for your compliance review">
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
              <Section title="Resources & Reference Works" subtitle="Deadlines, directories, glossary and more">
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
                No results found for &ldquo;{search}&rdquo;.
              </p>
              <button
                onClick={() => setSearch("")}
                className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
              >
                Reset search
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
                title="EU Compliance Knowledge Centre"
                dark
                label="Share knowledge centre"
                sublabel="Share this compliance overview with your team"
              />
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="pb-20 px-6">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto text-center">
            <div className="rounded-2xl border border-yellow-400/15 bg-yellow-400/5 p-8 sm:p-10">
              <h2 className="font-[Syne] font-bold text-xl text-white mb-3">
                Never miss an update
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-lg mx-auto">
                Subscribe to the Compliance Briefing and receive deadline warnings, legislative updates and practical tips straight to your inbox.
              </p>
              <Link
                href={`/${locale}/fristen-radar`}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-slate-900"
                style={{
                  background: "linear-gradient(135deg, #FACC15, #EAB308)",
                  boxShadow: "0 8px 32px rgba(250,204,21,0.3), 0 2px 8px rgba(250,204,21,0.2)",
                }}
              >
                Subscribe to Compliance Briefing
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
