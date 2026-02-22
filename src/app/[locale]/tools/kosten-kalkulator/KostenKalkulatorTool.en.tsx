"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolNextSteps from "@/components/ToolNextSteps";
import { useTranslations } from "@/i18n/use-translations";

/* ══════════════════════════════════════════════════════════════
   Compliance Cost Calculator (English)
   Estimates the cost of EU regulation compliance
   ══════════════════════════════════════════════════════════════ */

type CompanySize = "micro" | "small" | "medium" | "large";
type MaturityLevel = "none" | "basic" | "advanced";

interface RegulationCost {
  key: string;
  name: string;
  href: string;
  color: string;
  selected: boolean;
  minCost: number;
  maxCost: number;
  breakdown: { item: string; min: number; max: number }[];
}

const COMPANY_SIZES: { value: CompanySize; label: string; desc: string }[] = [
  { value: "micro", label: "Micro-enterprise", desc: "1–9 employees" },
  { value: "small", label: "Small enterprise", desc: "10–49 employees" },
  { value: "medium", label: "Medium-sized enterprise", desc: "50–249 employees" },
  { value: "large", label: "Large enterprise", desc: "250+ employees" },
];

const MATURITY_LEVELS: { value: MaturityLevel; label: string; desc: string }[] = [
  { value: "none", label: "No existing system", desc: "No compliance structures in place" },
  { value: "basic", label: "Basic measures", desc: "Basic data protection and IT security" },
  { value: "advanced", label: "Advanced", desc: "ISMS or compliance framework in place" },
];

const REGULATIONS = [
  { key: "dsgvo", name: "GDPR", color: "#2563eb", href: "/dsgvo" },
  { key: "nis2", name: "NIS2 / NISG 2026", color: "#dc2626", href: "/nisg-2026" },
  { key: "ai-act", name: "AI Act", color: "#7c3aed", href: "/eu-ai-act" },
  { key: "dora", name: "DORA", color: "#0891b2", href: "/dora" },
  { key: "cra", name: "CRA", color: "#ea580c", href: "/cra" },
  { key: "csrd", name: "CSRD / ESG", color: "#16a34a", href: "/csrd-esg" },
] as const;

/* ── Cost estimation logic ── */
function estimateCosts(
  selectedRegs: string[],
  size: CompanySize,
  maturity: MaturityLevel
): RegulationCost[] {
  const sizeMultiplier: Record<CompanySize, number> = {
    micro: 0.3,
    small: 0.6,
    medium: 1.0,
    large: 2.0,
  };
  const maturityDiscount: Record<MaturityLevel, number> = {
    none: 1.0,
    basic: 0.7,
    advanced: 0.4,
  };

  const sm = sizeMultiplier[size];
  const md = maturityDiscount[maturity];

  const baseCosts: Record<string, { items: { item: string; min: number; max: number }[] }> = {
    dsgvo: {
      items: [
        { item: "Records of processing & gap analysis", min: 2000, max: 5000 },
        { item: "Privacy policy & contracts", min: 1500, max: 4000 },
        { item: "TOM implementation", min: 3000, max: 8000 },
        { item: "Training & awareness", min: 1000, max: 3000 },
        { item: "Data protection officer (external, annual)", min: 3000, max: 8000 },
      ],
    },
    nis2: {
      items: [
        { item: "Risk management & gap analysis", min: 8000, max: 20000 },
        { item: "ISMS setup / ISO 27001", min: 15000, max: 50000 },
        { item: "Incident response processes", min: 5000, max: 15000 },
        { item: "Supply chain security", min: 3000, max: 10000 },
        { item: "Management training & governance", min: 2000, max: 5000 },
        { item: "Technical measures (monitoring, SIEM)", min: 10000, max: 40000 },
      ],
    },
    "ai-act": {
      items: [
        { item: "AI inventory & risk assessment", min: 3000, max: 10000 },
        { item: "Conformity documentation", min: 5000, max: 15000 },
        { item: "Bias testing & monitoring", min: 4000, max: 12000 },
        { item: "Transparency measures", min: 2000, max: 5000 },
        { item: "Training (AI competence)", min: 1500, max: 4000 },
      ],
    },
    dora: {
      items: [
        { item: "ICT risk management framework", min: 10000, max: 30000 },
        { item: "Incident reporting system", min: 5000, max: 15000 },
        { item: "Resilience testing (TLPT)", min: 8000, max: 25000 },
        { item: "Third-party risk management", min: 5000, max: 15000 },
        { item: "Information sharing framework", min: 2000, max: 5000 },
      ],
    },
    cra: {
      items: [
        { item: "Security-by-design review", min: 5000, max: 15000 },
        { item: "Vulnerability management (SBOM)", min: 4000, max: 12000 },
        { item: "Conformity assessment", min: 8000, max: 25000 },
        { item: "Security update processes (5 years)", min: 3000, max: 10000 },
        { item: "Documentation & CE marking", min: 2000, max: 6000 },
      ],
    },
    csrd: {
      items: [
        { item: "Materiality assessment (double materiality)", min: 8000, max: 20000 },
        { item: "ESG data collection & KPIs", min: 5000, max: 15000 },
        { item: "ESRS-compliant report", min: 10000, max: 30000 },
        { item: "Audit by statutory auditor", min: 5000, max: 15000 },
        { item: "Software & tools", min: 3000, max: 10000 },
      ],
    },
  };

  return selectedRegs.map((key) => {
    const base = baseCosts[key];
    const reg = REGULATIONS.find((r) => r.key === key)!;

    if (!base) {
      return {
        key,
        name: reg.name,
        href: reg.href,
        color: reg.color,
        selected: true,
        minCost: 0,
        maxCost: 0,
        breakdown: [],
      };
    }

    const breakdown = base.items.map((item) => ({
      item: item.item,
      min: Math.round(item.min * sm * md / 100) * 100,
      max: Math.round(item.max * sm * md / 100) * 100,
    }));

    const minCost = breakdown.reduce((sum, b) => sum + b.min, 0);
    const maxCost = breakdown.reduce((sum, b) => sum + b.max, 0);

    return {
      key,
      name: reg.name,
      href: reg.href,
      color: reg.color,
      selected: true,
      minCost,
      maxCost,
      breakdown,
    };
  });
}

function formatEuro(amount: number): string {
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}k EUR`;
  }
  return `${amount.toLocaleString("en-GB")} EUR`;
}

/* ═══════════════════════ Main Component ═══════════════════════ */

export default function KostenKalkulatorToolEN() {
  const { locale } = useTranslations();
  const [size, setSize] = useState<CompanySize | null>(null);
  const [maturity, setMaturity] = useState<MaturityLevel | null>(null);
  const [selectedRegs, setSelectedRegs] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState(false);

  const canCalculate = size !== null && maturity !== null && selectedRegs.size > 0;

  const results = useMemo(() => {
    if (!size || !maturity || selectedRegs.size === 0) return [];
    return estimateCosts(Array.from(selectedRegs), size, maturity);
  }, [size, maturity, selectedRegs]);

  const totalMin = results.reduce((s, r) => s + r.minCost, 0);
  const totalMax = results.reduce((s, r) => s + r.maxCost, 0);

  const toggleReg = (key: string) => {
    setSelectedRegs((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
    setShowResults(false);
  };

  const [expandedReg, setExpandedReg] = useState<string | null>(null);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#060c1a]">
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-8 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(250,204,21,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-5">
              <svg className="w-3.5 h-3.5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-semibold text-yellow-400">Free Calculator</span>
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              Compliance Cost
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                {" "}Calculator
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Estimate the costs of implementing EU regulations — tailored to your company size and maturity level.
            </p>
          </div>
        </section>

        {/* ── Calculator ── */}
        <section className="pb-20 px-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Step 1: Company Size */}
            <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-7 h-7 rounded-lg bg-yellow-400/15 flex items-center justify-center text-xs font-bold text-yellow-400">1</div>
                <h2 className="font-[Syne] font-bold text-lg text-white">Company Size</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {COMPANY_SIZES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => { setSize(s.value); setShowResults(false); }}
                    className={`text-left px-4 py-3 rounded-xl border transition-all cursor-pointer ${
                      size === s.value
                        ? "border-yellow-400/40 bg-yellow-400/10"
                        : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="text-sm text-white font-medium block">{s.label}</span>
                    <span className="text-xs text-slate-500">{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Maturity */}
            <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-7 h-7 rounded-lg bg-yellow-400/15 flex items-center justify-center text-xs font-bold text-yellow-400">2</div>
                <h2 className="font-[Syne] font-bold text-lg text-white">Current Maturity Level</h2>
              </div>
              <div className="space-y-2">
                {MATURITY_LEVELS.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => { setMaturity(m.value); setShowResults(false); }}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all cursor-pointer ${
                      maturity === m.value
                        ? "border-yellow-400/40 bg-yellow-400/10"
                        : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="text-sm text-white font-medium">{m.label}</span>
                    <span className="text-xs text-slate-500 block">{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Regulations */}
            <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-7 h-7 rounded-lg bg-yellow-400/15 flex items-center justify-center text-xs font-bold text-yellow-400">3</div>
                <h2 className="font-[Syne] font-bold text-lg text-white">Relevant Regulations</h2>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Not sure? Use the{" "}
                <Link href={`/${locale}/tools/regulierung-finder`} className="text-yellow-400/80 underline underline-offset-2">
                  Regulation Finder
                </Link>{" "}
                to determine which regulations apply to you.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {REGULATIONS.map((reg) => {
                  const selected = selectedRegs.has(reg.key);
                  return (
                    <button
                      key={reg.key}
                      onClick={() => toggleReg(reg.key)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all cursor-pointer ${
                        selected
                          ? "border-yellow-400/40 bg-yellow-400/10"
                          : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                          selected ? "border-yellow-400 bg-yellow-400" : "border-white/20"
                        }`}
                      >
                        {selected && (
                          <svg className="w-2.5 h-2.5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: reg.color }} />
                        <span className="text-xs text-white font-medium">{reg.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={() => setShowResults(true)}
              disabled={!canCalculate}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-900 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #FACC15, #EAB308)",
                boxShadow: canCalculate ? "0 8px 32px rgba(250,204,21,0.3)" : "none",
              }}
            >
              Calculate costs
            </button>

            {/* Results */}
            <AnimatePresence>
              {showResults && results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Total */}
                  <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-6 sm:p-8 text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                      Estimated Total Costs
                    </p>
                    <div className="font-[Syne] font-extrabold text-3xl sm:text-4xl text-white">
                      {formatEuro(totalMin)} – {formatEuro(totalMax)}
                    </div>
                    <p className="text-xs text-slate-500 mt-3">
                      One-off implementation costs (excluding ongoing operating costs)
                    </p>
                  </div>

                  {/* Per-regulation breakdown */}
                  {results.map((reg) => (
                    <div
                      key={reg.key}
                      className="rounded-xl border border-white/5 bg-slate-900/40 overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedReg(expandedReg === reg.key ? null : reg.key)}
                        className="w-full flex items-center justify-between px-5 py-4 cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ background: reg.color }} />
                          <span className="font-[Syne] font-bold text-sm text-white group-hover:text-yellow-400 transition-colors">
                            {reg.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono text-slate-300">
                            {formatEuro(reg.minCost)} – {formatEuro(reg.maxCost)}
                          </span>
                          <svg
                            className={`w-4 h-4 text-slate-500 transition-transform ${
                              expandedReg === reg.key ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>
                      </button>

                      <AnimatePresence>
                        {expandedReg === reg.key && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] as const }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-4 space-y-2">
                              {reg.breakdown.map((item, j) => (
                                <div
                                  key={j}
                                  className="flex items-center justify-between py-2 border-t border-white/[0.03]"
                                >
                                  <span className="text-xs text-slate-400">{item.item}</span>
                                  <span className="text-xs font-mono text-slate-300 whitespace-nowrap ml-4">
                                    {item.min.toLocaleString("en-GB")} – {item.max.toLocaleString("en-GB")} EUR
                                  </span>
                                </div>
                              ))}
                              <div className="pt-2">
                                <Link
                                  href={`/${locale}${reg.href}`}
                                  className="text-xs text-yellow-400/70 hover:text-yellow-400 transition-colors"
                                >
                                  Learn more about {reg.name} →
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {/* Disclaimer + CTA */}
                  <div className="rounded-xl bg-[#0f172a] border border-white/5 p-5">
                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-yellow-400/60 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                      <div>
                        <p className="text-xs text-slate-400 leading-relaxed mb-3">
                          This estimate is for rough orientation only. Actual costs depend on many factors: existing infrastructure, chosen tools, external consultants vs. in-house implementation, complexity of business processes. Synergies between regulations can reduce total costs by 20–40%.
                        </p>
                        <Link
                          href={`/${locale}/kontakt`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-yellow-400 hover:text-yellow-300 transition-colors"
                        >
                          Create a detailed compliance report
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Steps */}
            <div className="mt-8">
              <ToolNextSteps
                currentTool="kosten-kalkulator"
                subtext="Budget planned? Deepen your compliance strategy with these tools."
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
