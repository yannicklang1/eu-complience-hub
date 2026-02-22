"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialShareBar from "@/components/SocialShareBar";
import { useTranslations } from "@/i18n/use-translations";

/* ══════════════════════════════════════════════════════════════
   Regulation Comparison — Interactive comparison matrix (English)
   ══════════════════════════════════════════════════════════════ */

interface Regulation {
  id: string;
  name: string;
  fullName: string;
  type: "Regulation" | "Directive";
  status: string;
  statusColor: string;
  scope: string;
  penalty: string;
  penaltyDetail: string;
  deadline: string;
  affectedSize: string;
  keyObligation: string;
  personalLiability: boolean;
  href: string;
  accent: string;
}

const REGULATIONS: Regulation[] = [
  {
    id: "nisg",
    name: "NISG 2026",
    fullName: "Network and Information System Security Act",
    type: "Directive",
    status: "From Oct. 2026",
    statusColor: "#f59e0b",
    scope: "Cybersecurity for critical sectors",
    penalty: "EUR 10M / 2%",
    penaltyDetail: "EUR 10 million or 2% of global annual turnover",
    deadline: "1 October 2026",
    affectedSize: "50+ employees or EUR 10M+ turnover",
    keyObligation: "Risk management, incident reporting (24h), supply chain security",
    personalLiability: true,
    href: "/nisg-2026",
    accent: "#1e40af",
  },
  {
    id: "aiact",
    name: "AI Act",
    fullName: "EU Artificial Intelligence Act",
    type: "Regulation",
    status: "Phased 2025–27",
    statusColor: "#f59e0b",
    scope: "AI systems (development & deployment)",
    penalty: "EUR 35M / 7%",
    penaltyDetail: "EUR 35 million or 7% of global annual turnover",
    deadline: "2 August 2025 / 2026 / 2027",
    affectedSize: "All AI providers and deployers",
    keyObligation: "Risk classification, conformity assessment, transparency",
    personalLiability: false,
    href: "/eu-ai-act",
    accent: "#7c3aed",
  },
  {
    id: "dora",
    name: "DORA",
    fullName: "Digital Operational Resilience Act",
    type: "Regulation",
    status: "In force",
    statusColor: "#10b981",
    scope: "Digital resilience in the financial sector",
    penalty: "Supervisory",
    penaltyDetail: "Periodic penalty payments, licence revocation, activity bans",
    deadline: "17 January 2025",
    affectedSize: "All financial undertakings + critical ICT providers",
    keyObligation: "ICT risk management, TLPT, third-party management",
    personalLiability: true,
    href: "/dora",
    accent: "#059669",
  },
  {
    id: "dsgvo",
    name: "GDPR",
    fullName: "General Data Protection Regulation",
    type: "Regulation",
    status: "In force",
    statusColor: "#10b981",
    scope: "Processing of personal data",
    penalty: "EUR 20M / 4%",
    penaltyDetail: "EUR 20 million or 4% of global annual turnover",
    deadline: "25 May 2018",
    affectedSize: "Virtually every company",
    keyObligation: "Legal basis, data subject rights, TOMs, DPO",
    personalLiability: true,
    href: "/dsgvo",
    accent: "#2563eb",
  },
  {
    id: "cra",
    name: "CRA",
    fullName: "Cyber Resilience Act",
    type: "Regulation",
    status: "From Sep. 2026",
    statusColor: "#f59e0b",
    scope: "Products with digital elements",
    penalty: "EUR 15M / 2.5%",
    penaltyDetail: "EUR 15 million or 2.5% of global annual turnover",
    deadline: "September 2026 (reporting obligations)",
    affectedSize: "All manufacturers of digital products",
    keyObligation: "Security by design, SBOM, 5 years of updates, reporting obligation",
    personalLiability: false,
    href: "/cra",
    accent: "#ea580c",
  },
  {
    id: "csrd",
    name: "CSRD",
    fullName: "Corporate Sustainability Reporting Directive",
    type: "Directive",
    status: "Phased 2024–28",
    statusColor: "#f59e0b",
    scope: "Sustainability reporting",
    penalty: "Nationally regulated",
    penaltyDetail: "Depending on member state: administrative fines, penalties",
    deadline: "From FY 2024/2025/2026",
    affectedSize: "> 250 employees or > EUR 50M turnover",
    keyObligation: "ESRS reports, double materiality, assurance obligation",
    personalLiability: true,
    href: "/csrd-esg",
    accent: "#16a34a",
  },
  {
    id: "mica",
    name: "MiCA",
    fullName: "Markets in Crypto-Assets Regulation",
    type: "Regulation",
    status: "In force",
    statusColor: "#10b981",
    scope: "Crypto-assets and crypto service providers",
    penalty: "EUR 5M / 12.5%",
    penaltyDetail: "EUR 5 million or up to 12.5% of annual turnover",
    deadline: "30 December 2024",
    affectedSize: "CASPs, token issuers, stablecoin providers",
    keyObligation: "Authorisation, white paper, reserves, AML prevention",
    personalLiability: true,
    href: "/mica",
    accent: "#f59e0b",
  },
  {
    id: "dataact",
    name: "Data Act",
    fullName: "EU Data Act",
    type: "Regulation",
    status: "From Sep. 2025",
    statusColor: "#f59e0b",
    scope: "IoT data and cloud services",
    penalty: "Nationally regulated",
    penaltyDetail: "Member states define the sanctions framework",
    deadline: "12 September 2025",
    affectedSize: "IoT manufacturers, cloud providers, data holders",
    keyObligation: "Data access, cloud switching, interoperability",
    personalLiability: false,
    href: "/data-act",
    accent: "#0ea5e9",
  },
  {
    id: "bafg",
    name: "BaFG",
    fullName: "Accessibility Strengthening Act",
    type: "Directive",
    status: "In force",
    statusColor: "#10b981",
    scope: "Accessibility of digital products & services",
    penalty: "Nationally regulated",
    penaltyDetail: "Administrative fines, sales bans for non-compliance",
    deadline: "28 June 2025",
    affectedSize: "All providers of certain products & services",
    keyObligation: "WCAG conformity, accessibility statement, market surveillance",
    personalLiability: false,
    href: "/bafg",
    accent: "#2563eb",
  },
];

const COMPARISON_FIELDS: { key: keyof Regulation; label: string; icon: string }[] = [
  { key: "type", label: "Legal form", icon: "📜" },
  { key: "status", label: "Status", icon: "🔔" },
  { key: "scope", label: "Scope", icon: "🎯" },
  { key: "penalty", label: "Max. fine", icon: "💸" },
  { key: "deadline", label: "Deadline", icon: "⏰" },
  { key: "affectedSize", label: "Affected size", icon: "🏢" },
  { key: "keyObligation", label: "Key obligations", icon: "📋" },
];

export default function VergleichContentEN() {
  const { locale } = useTranslations();
  const [selected, setSelected] = useState<Set<string>>(
    new Set(REGULATIONS.map((r) => r.id))
  );

  function toggleRegulation(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 2) next.delete(id); // min 2
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const filteredRegs = REGULATIONS.filter((r) => selected.has(r.id));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#060c1a]">
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(250,204,21,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-6">
              <span className="text-yellow-400 text-xs font-semibold">
                {REGULATIONS.length} Regulations
              </span>
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              Regulation{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Comparison
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Compare EU regulations side by side: fines, deadlines,
              obligations and scope at a glance.
            </p>
          </div>
        </section>

        {/* ── Regulation Selector ── */}
        <section className="px-6 pb-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs text-slate-500 mb-3 text-center">
              Select the regulations to compare (min. 2):
            </p>

            {/* Quick Presets */}
            <div className="flex items-center gap-2 flex-wrap justify-center mb-4">
              {[
                { label: "All", ids: REGULATIONS.map((r) => r.id) },
                { label: "IT & Cyber", ids: ["nisg", "dora", "cra"] },
                { label: "Data & AI", ids: ["dsgvo", "aiact", "dataact"] },
                { label: "Finance", ids: ["dora", "mica", "dsgvo"] },
                { label: "MD Liability", ids: REGULATIONS.filter((r) => r.personalLiability).map((r) => r.id) },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setSelected(new Set(preset.ids))}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-semibold text-yellow-400/70 border border-yellow-400/10 bg-yellow-400/[0.03] hover:border-yellow-400/25 hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              {REGULATIONS.map((reg) => {
                const isSelected = selected.has(reg.id);
                return (
                  <button
                    key={reg.id}
                    onClick={() => toggleRegulation(reg.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-white/[0.08] text-white border-white/15"
                        : "bg-white/[0.02] text-slate-500 border-white/5 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        background: isSelected ? reg.accent : "transparent",
                        border: isSelected ? "none" : "2px solid rgba(255,255,255,0.1)",
                      }}
                    />
                    {reg.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Comparison Matrix ── */}
        <section className="px-6 pb-12">
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <motion.div
              layout
              className="min-w-[600px]"
            >
              {/* Header Row */}
              <div
                className="grid gap-px bg-white/[0.04] rounded-t-2xl overflow-hidden"
                style={{
                  gridTemplateColumns: `200px repeat(${filteredRegs.length}, 1fr)`,
                }}
              >
                <div className="bg-slate-900/80 p-4 flex items-end">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                    Criterion
                  </span>
                </div>
                {filteredRegs.map((reg) => (
                  <div key={reg.id} className="bg-slate-900/80 p-4 text-center">
                    <Link
                      href={reg.href}
                      className="group inline-block"
                    >
                      <div
                        className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center"
                        style={{ background: `${reg.accent}20` }}
                      >
                        <span
                          className="font-[Syne] font-extrabold text-xs"
                          style={{ color: reg.accent }}
                        >
                          {reg.name.slice(0, 3).toUpperCase()}
                        </span>
                      </div>
                      <h3 className="font-[Syne] font-bold text-sm text-white group-hover:text-yellow-400 transition-colors">
                        {reg.name}
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                        {reg.fullName}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Data Rows */}
              {COMPARISON_FIELDS.map((field, i) => (
                <div
                  key={field.key}
                  className={`grid gap-px ${i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}`}
                  style={{
                    gridTemplateColumns: `200px repeat(${filteredRegs.length}, 1fr)`,
                  }}
                >
                  <div className="bg-slate-900/60 p-4 flex items-center gap-2">
                    <span className="text-sm">{field.icon}</span>
                    <span className="text-xs font-semibold text-slate-400">
                      {field.label}
                    </span>
                  </div>
                  {filteredRegs.map((reg) => {
                    const value = String(reg[field.key]);
                    const isStatus = field.key === "status";
                    const isPenalty = field.key === "penalty";

                    return (
                      <div
                        key={reg.id}
                        className="bg-slate-900/60 p-4 flex items-center justify-center"
                      >
                        {isStatus ? (
                          <span
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold"
                            style={{
                              background: `${reg.statusColor}15`,
                              color: reg.statusColor,
                            }}
                          >
                            {value}
                          </span>
                        ) : isPenalty ? (
                          <span className="text-sm font-bold text-red-400 text-center">
                            {value}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-300 text-center leading-relaxed">
                            {value}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Personal Liability Row */}
              <div
                className="grid gap-px bg-white/[0.03] rounded-b-2xl overflow-hidden"
                style={{
                  gridTemplateColumns: `200px repeat(${filteredRegs.length}, 1fr)`,
                }}
              >
                <div className="bg-slate-900/60 p-4 flex items-center gap-2">
                  <span className="text-sm">⚠️</span>
                  <span className="text-xs font-semibold text-slate-400">
                    MD Liability
                  </span>
                </div>
                {filteredRegs.map((reg) => (
                  <div
                    key={reg.id}
                    className="bg-slate-900/60 p-4 flex items-center justify-center"
                  >
                    {reg.personalLiability ? (
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-red-500/15 text-red-400">
                        Yes — personal
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-500/15 text-slate-400">
                        No
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Related Tools ── */}
        <section className="px-6 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: "Regulation Finder", desc: "Which laws affect you?", href: "/tools/regulierung-finder", icon: "\uD83E\uDDED", accent: "#FACC15" },
                { title: "Fine Calculator", desc: "Calculate penalty range", href: "/tools/bussgeld-rechner", icon: "\uD83D\uDCB8", accent: "#ef4444" },
                { title: "Liability Assessor", desc: "Check personal risk", href: "/tools/haftungs-pruefer", icon: "\u2696\uFE0F", accent: "#dc2626" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex items-center gap-3 px-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: `${tool.accent}15` }}>
                    {tool.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-300 group-hover:text-yellow-400 transition-colors">
                      {tool.title}
                    </p>
                    <p className="text-xs text-slate-500">{tool.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Summary Cards ── */}
        <section className="px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-[Syne] font-bold text-lg text-white mb-6 text-center">
              At a Glance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-red-400/10 bg-red-400/5 p-5 text-center">
                <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-2">
                  Highest Fine
                </p>
                <p className="font-[Syne] font-extrabold text-2xl text-red-400">
                  EUR 35M
                </p>
                <p className="text-xs text-slate-400 mt-1">AI Act (7% turnover)</p>
              </div>
              <div className="rounded-xl border border-amber-400/10 bg-amber-400/5 p-5 text-center">
                <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-2">
                  Next Deadline
                </p>
                <p className="font-[Syne] font-extrabold text-2xl text-amber-400">
                  Oct. 2026
                </p>
                <p className="text-xs text-slate-400 mt-1">NISG 2026 entry into force</p>
              </div>
              <div className="rounded-xl border border-blue-400/10 bg-blue-400/5 p-5 text-center">
                <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-2">
                  MD Liability
                </p>
                <p className="font-[Syne] font-extrabold text-2xl text-blue-400">
                  {REGULATIONS.filter((r) => r.personalLiability).length} of {REGULATIONS.length}
                </p>
                <p className="text-xs text-slate-400 mt-1">Regulations with personal liability</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Share ── */}
        <section className="px-6 pb-4">
          <div className="max-w-3xl mx-auto">
            <SocialShareBar
              path="/vergleich"
              title="EU Regulation Comparison"
              dark
              label="Share comparison"
              sublabel="Share this regulation overview with colleagues"
            />
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto rounded-2xl border border-yellow-400/10 bg-yellow-400/5 p-8 sm:p-10 text-center">
            <h2 className="font-[Syne] font-bold text-xl text-white mb-3">
              Which regulations affect you?
            </h2>
            <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">
              Use our Regulation Finder for an individual analysis
              — free in 3 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/${locale}/tools/regulierung-finder`}
                className="px-6 py-3 rounded-xl font-bold text-sm text-slate-900"
                style={{
                  background: "linear-gradient(135deg, #FACC15, #EAB308)",
                  boxShadow:
                    "0 8px 32px rgba(250,204,21,0.3), 0 2px 8px rgba(250,204,21,0.2)",
                }}
              >
                Start Regulation Finder
              </Link>
              <Link
                href={`/${locale}/kontakt`}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-slate-300 border border-white/10 hover:bg-white/[0.04] transition-all"
              >
                Create Compliance Report
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
