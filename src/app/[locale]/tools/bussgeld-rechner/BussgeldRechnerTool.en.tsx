"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolNextSteps from "@/components/ToolNextSteps";
import { useTranslations } from "@/i18n/use-translations";

const LeadCaptureForm = dynamic(() => import("@/components/LeadCaptureForm"), {
  ssr: false,
});

/* ═══════════════════════════════════════════════════════════
   FINE CALCULATION DATA
   ═══════════════════════════════════════════════════════════ */

interface FineRule {
  id: string;
  name: string;
  fullName: string;
  color: string;
  /** Fixed maximum fine in EUR */
  fixedMax: number;
  /** Percentage of global annual turnover */
  percentMax: number;
  /** "Whichever is higher" = true for most EU regulations */
  higherOfTwo: boolean;
  description: string;
  guideUrl: string;
}

const FINE_RULES: FineRule[] = [
  {
    id: "aiact",
    name: "AI Act",
    fullName: "EU AI Regulation (2024/1689)",
    color: "#0A2540",
    fixedMax: 35_000_000,
    percentMax: 7,
    higherOfTwo: true,
    description: "Prohibited AI practices: up to EUR 35M or 7% of annual turnover",
    guideUrl: "/eu-ai-act",
  },
  {
    id: "dsgvo",
    name: "GDPR",
    fullName: "General Data Protection Regulation",
    color: "#6366f1",
    fixedMax: 20_000_000,
    percentMax: 4,
    higherOfTwo: true,
    description: "Serious violations: up to EUR 20M or 4% of annual turnover",
    guideUrl: "#",
  },
  {
    id: "cra",
    name: "CRA",
    fullName: "Cyber Resilience Act (2024/2847)",
    color: "#8b5cf6",
    fixedMax: 15_000_000,
    percentMax: 2.5,
    higherOfTwo: true,
    description: "Essential requirements: up to EUR 15M or 2.5% of annual turnover",
    guideUrl: "/cra",
  },
  {
    id: "nis2",
    name: "NIS2 / NISG",
    fullName: "NIS2 Directive / NISG 2026",
    color: "#0ea5e9",
    fixedMax: 10_000_000,
    percentMax: 2,
    higherOfTwo: true,
    description: "Essential entities: up to EUR 10M or 2% of annual turnover",
    guideUrl: "/nisg-2026",
  },
  {
    id: "dora",
    name: "DORA",
    fullName: "Digital Operational Resilience Act",
    color: "#10b981",
    fixedMax: 5_000_000,
    percentMax: 1,
    higherOfTwo: true,
    description: "Financial entities: up to 1% of average daily turnover (or EUR 5M)",
    guideUrl: "/dora",
  },
];

function calculateFine(rule: FineRule, revenue: number): number {
  const percentFine = (revenue * rule.percentMax) / 100;
  return rule.higherOfTwo ? Math.max(rule.fixedMax, percentFine) : rule.fixedMax;
}

function formatEuro(amount: number): string {
  if (amount >= 1_000_000_000) return `EUR ${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `EUR ${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `EUR ${(amount / 1_000).toFixed(0)},000`;
  return `EUR ${amount.toLocaleString("en-GB")}`;
}

/* ═══════════════════════════════════════════════════════════
   Animated Counter
   ═══════════════════════════════════════════════════════════ */

function AnimatedCounter({ value, color }: { value: number; color: string }) {
  const motionVal = useMotionValue(0);
  const display = useTransform(motionVal, (v) => formatEuro(Math.round(v)));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(motionVal, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [value, motionVal]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
    return unsubscribe;
  }, [display]);

  return (
    <span ref={ref} className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl tabular-nums" style={{ color }}>
      {formatEuro(0)}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

const ACCENT = "#d97706"; // Amber

const REVENUE_PRESETS = [
  { label: "2M", value: 2_000_000 },
  { label: "10M", value: 10_000_000 },
  { label: "50M", value: 50_000_000 },
  { label: "100M", value: 100_000_000 },
  { label: "500M", value: 500_000_000 },
  { label: "1B", value: 1_000_000_000 },
];

export default function BussgeldRechnerTool() {
  const { locale } = useTranslations();
  const [revenue, setRevenue] = useState<number | null>(null);
  const [revenueInput, setRevenueInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedRegs, setSelectedRegs] = useState<string[]>(FINE_RULES.map((r) => r.id));

  const handleRevenueSubmit = () => {
    if (revenue && revenue > 0) {
      setShowResults(true);
    }
  };

  const handlePreset = (value: number) => {
    setRevenue(value);
    setRevenueInput(value.toLocaleString("en-GB"));
    setShowResults(true);
  };

  const handleInputChange = (val: string) => {
    setRevenueInput(val);
    // Parse number format
    const cleaned = val.replace(/,/g, "").replace(/[^\d.]/g, "");
    const num = parseFloat(cleaned);
    setRevenue(isNaN(num) ? null : num);
    setShowResults(false);
  };

  const toggleReg = (id: string) => {
    setSelectedRegs((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const activeFines = FINE_RULES.filter((r) => selectedRegs.includes(r.id)).map((rule) => ({
    ...rule,
    fine: revenue ? calculateFine(rule, revenue) : 0,
  }));

  const totalRisk = activeFines.reduce((sum, f) => sum + f.fine, 0);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#040a18]">
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${ACCENT}30 0%, transparent 70%)` }} />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f4f6fc] to-transparent" />
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <nav className="flex items-center justify-center gap-2 mb-8">
              <Link href={`/${locale}`} className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors">Home</Link>
              <span className="font-mono text-[11px] text-white/35">/</span>
              <span className="font-mono text-[11px] text-white/60">Fine Calculator</span>
            </nav>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-amber-400/20 bg-amber-400/10">
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
              <span className="text-amber-300 text-xs font-mono font-semibold">Instant Results</span>
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-4">
              Fine Calculator
            </h1>
            <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              What does non-compliance cost? Enter your annual revenue and see the maximum fine exposure per EU regulation.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="pb-20" style={{ background: "linear-gradient(180deg, #f4f6fc 0%, #eef1fa 100%)" }}>
          <div className="max-w-2xl mx-auto px-6">
            {/* Input Card */}
            <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8 shadow-sm mb-6">
              <h2 className="font-[Syne] font-bold text-lg text-[#060c1a] mb-1">Enter Annual Revenue</h2>
              <p className="text-[13px] text-[#7a8db0] mb-6">Global annual revenue of your company (or group revenue)</p>

              {/* Input */}
              <div className="relative mb-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a8db0] font-mono text-sm">EUR</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 50,000,000"
                  aria-label="Annual revenue in EUR"
                  value={revenueInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleRevenueSubmit(); }}
                  className="w-full pl-14 pr-4 py-4 rounded-xl border border-[#d8dff0] bg-[#f8f9fd] text-lg font-[Syne] font-bold text-[#060c1a] placeholder:text-[#c0c8d8] focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                />
              </div>

              {/* Presets */}
              <div className="flex flex-wrap gap-2 mb-6">
                {REVENUE_PRESETS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => handlePreset(p.value)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-mono font-bold border transition-all ${
                      revenue === p.value
                        ? "border-amber-400 bg-amber-50 text-amber-700"
                        : "border-[#e0e5f0] text-[#7a8db0] hover:border-amber-300 hover:text-amber-600"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Regulation toggles */}
              <div className="mb-4">
                <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-2">Include Regulations</div>
                <div className="flex flex-wrap gap-2">
                  {FINE_RULES.map((rule) => (
                    <button
                      key={rule.id}
                      onClick={() => toggleReg(rule.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold border transition-all ${
                        selectedRegs.includes(rule.id)
                          ? "border-current bg-opacity-10 shadow-sm"
                          : "border-[#e0e5f0] text-[#c0c8d8]"
                      }`}
                      style={
                        selectedRegs.includes(rule.id)
                          ? { color: rule.color, borderColor: `${rule.color}40`, background: `${rule.color}08` }
                          : undefined
                      }
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: selectedRegs.includes(rule.id) ? rule.color : "#d0d5e0" }}
                      />
                      {rule.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculate button */}
              {!showResults && (
                <button
                  onClick={handleRevenueSubmit}
                  disabled={!revenue || revenue <= 0}
                  className={`w-full py-3.5 rounded-xl text-sm font-[Syne] font-bold transition-all duration-300 ${
                    revenue && revenue > 0
                      ? "text-white hover:-translate-y-0.5 shadow-lg"
                      : "bg-[#e0e5f0] text-[#a0a8b8] cursor-not-allowed"
                  }`}
                  style={
                    revenue && revenue > 0
                      ? { background: `linear-gradient(135deg, ${ACCENT}, #f59e0b)`, boxShadow: `0 4px 16px ${ACCENT}40` }
                      : undefined
                  }
                >
                  Calculate Fines
                </button>
              )}
            </div>

            {/* Results */}
            <AnimatePresence>
              {showResults && revenue && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  aria-live="polite"
                  role="region"
                  aria-label="Calculation results"
                >
                  {/* Total Risk */}
                  <div className="rounded-2xl border-2 border-[#fde68a] bg-gradient-to-br from-[#fffbeb] to-[#fef3c7] p-6 sm:p-8 mb-6 text-center">
                    <div className="font-mono text-[10px] text-[#92400e] uppercase tracking-wider mb-2">
                      Maximum Total Exposure
                    </div>
                    <div className="mb-3">
                      <AnimatedCounter value={totalRisk} color="#92400e" />
                    </div>
                    <p className="text-[13px] text-[#92400e]/70 max-w-md mx-auto">
                      Cumulative maximum fine exposure for violations across all {activeFines.length} selected regulations
                    </p>
                  </div>

                  {/* Per-regulation breakdown */}
                  <div className="space-y-3 mb-6">
                    {activeFines
                      .sort((a, b) => b.fine - a.fine)
                      .map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                        >
                          <Link
                            href={`/${locale}${item.guideUrl}`}
                            className="block rounded-2xl border border-[#d8dff0] bg-white p-5 hover:shadow-md hover:border-opacity-60 transition-all group"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                                <span className="font-[Syne] font-bold text-[15px] text-[#060c1a] group-hover:text-[color:var(--c)] transition-colors"
                                  style={{ "--c": item.color } as React.CSSProperties}
                                >
                                  {item.name}
                                </span>
                              </div>
                              <span className="font-[Syne] font-extrabold text-lg" style={{ color: item.color }}>
                                {formatEuro(item.fine)}
                              </span>
                            </div>

                            {/* Visual bar */}
                            <div className="h-2 rounded-full bg-[#f0f2f8] overflow-hidden mb-2">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: item.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${totalRisk > 0 ? (item.fine / totalRisk) * 100 : 0}%` }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                              />
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-[#7a8db0]">
                              <span>{item.description}</span>
                              <svg className="w-3.5 h-3.5 text-[#c0c8d8] group-hover:text-[color:var(--c)] transition-colors" style={{ "--c": item.color } as React.CSSProperties} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                  </div>

                  {/* Context note */}
                  <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8 mb-6">
                    <h3 className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-3">Important Notes</h3>
                    <div className="space-y-2 text-[13px] text-[#3a4a6b] leading-relaxed">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">1.</span>
                        <span>The amounts shown are <strong>maximum penalties</strong>. The actual amount depends on the severity of the violation, willingness to cooperate, and prior history.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">2.</span>
                        <span>For NIS2, AI Act, CRA and GDPR: <strong>the higher amount</strong> of the fixed sum and the turnover percentage applies.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">3.</span>
                        <span>In addition to fines, you may face: <strong>personal director liability</strong>, reputational damage, operational bans and civil liability claims.</span>
                      </div>
                    </div>
                  </div>

                  {/* Tool Cross-Links */}
                  <div className="mb-6">
                    <ToolNextSteps
                      currentTool="bussgeld-rechner"
                      dark={false}
                      subtext="Now that you know the penalty framework, analyse your compliance situation further:"
                    />
                  </div>

                  {/* Lead Capture */}
                  <div className="mb-6">
                    <LeadCaptureForm
                      sourceTool="bussgeld-rechner"
                      toolResults={{
                        revenue,
                        totalRisk,
                        regulationCount: activeFines.length,
                      }}
                      accent="#d97706"
                      title="Receive Fine Analysis by Email"
                      subtitle="Your results as a summary — plus notifications on relevant regulatory changes."
                    />
                  </div>

                  {/* Disclaimer */}
                  <div className="p-4 rounded-xl bg-[#fff8e1] border border-[#f0e6c0]">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-[#b8960c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                      <p className="text-[12px] text-[#8a7020] leading-relaxed">
                        <strong>Disclaimer:</strong> This calculator shows maximum theoretical fines. This is not legal advice. The actual penalty amount is determined by authorities on a case-by-case basis.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
