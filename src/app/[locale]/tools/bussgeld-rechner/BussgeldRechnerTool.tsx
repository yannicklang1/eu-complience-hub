"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolNextSteps from "@/components/ToolNextSteps";
import SaveEvaluationButton from "@/components/SaveEvaluationButton";
import { useCountry } from "@/i18n/country-context";
import { COUNTRY_META } from "@/i18n/country/index";
import { useTranslations } from "@/i18n/use-translations";
import type { RegulationKey } from "@/i18n/country/types";

const LeadCaptureForm = dynamic(() => import("@/components/LeadCaptureForm"), {
  ssr: false,
});

/* ═══════════════════════════════════════════════════════════
   FINE CALCULATION DATA
   ═══════════════════════════════════════════════════════════ */

interface FineRule {
  id: string;
  /** Key in CountryData.regulations (may differ from id) */
  countryKey: RegulationKey;
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
    countryKey: "ai-act",
    name: "AI Act",
    fullName: "EU KI-Verordnung (2024/1689)",
    color: "#0A2540",
    fixedMax: 35_000_000,
    percentMax: 7,
    higherOfTwo: true,
    description: "Verbotene KI-Praktiken: bis zu 35 Mio. EUR oder 7% des Jahresumsatzes",
    guideUrl: "/eu-ai-act",
  },
  {
    id: "dsgvo",
    countryKey: "dsgvo",
    name: "DSGVO",
    fullName: "Datenschutz-Grundverordnung",
    color: "#6366f1",
    fixedMax: 20_000_000,
    percentMax: 4,
    higherOfTwo: true,
    description: "Schwerwiegende Verstöße: bis zu 20 Mio. EUR oder 4% des Jahresumsatzes",
    guideUrl: "#",
  },
  {
    id: "cra",
    countryKey: "cra",
    name: "CRA",
    fullName: "Cyber Resilience Act (2024/2847)",
    color: "#8b5cf6",
    fixedMax: 15_000_000,
    percentMax: 2.5,
    higherOfTwo: true,
    description: "Wesentliche Anforderungen: bis zu 15 Mio. EUR oder 2,5% des Jahresumsatzes",
    guideUrl: "/cra",
  },
  {
    id: "nis2",
    countryKey: "nis2",
    name: "NIS2 / NISG",
    fullName: "NIS2-Richtlinie / NISG 2026",
    color: "#0ea5e9",
    fixedMax: 10_000_000,
    percentMax: 2,
    higherOfTwo: true,
    description: "Wesentliche Einrichtungen: bis zu 10 Mio. EUR oder 2% des Jahresumsatzes",
    guideUrl: "/nisg-2026",
  },
  {
    id: "dora",
    countryKey: "dora",
    name: "DORA",
    fullName: "Digital Operational Resilience Act",
    color: "#10b981",
    fixedMax: 5_000_000,
    percentMax: 1,
    higherOfTwo: true,
    description: "Finanzunternehmen: bis zu 1% des durchschnittlichen Tagesumsatzes (oder 5 Mio. EUR)",
    guideUrl: "/dora",
  },
];

function calculateFine(rule: FineRule, revenue: number): number {
  const percentFine = (revenue * rule.percentMax) / 100;
  return rule.higherOfTwo ? Math.max(rule.fixedMax, percentFine) : rule.fixedMax;
}

/**
 * Severity-factor for realistic fine ranges.
 * Maximums are rarely imposed — real cases cluster at ~5–25% of maximum
 * based on DSB/EDPB decisions 2020–2025.
 */
const SEVERITY_FACTORS: Record<string, { min: number; typical: number; label: string; desc: string }> = {
  minor: { min: 0.005, typical: 0.02, label: "Geringfügig", desc: "Einzelfall, kooperativ, keine Vorstrafen, behoben" },
  moderate: { min: 0.03, typical: 0.08, label: "Mittel", desc: "Strukturelles Versagen, fahrlässig, begrenzte Betroffene" },
  serious: { min: 0.10, typical: 0.25, label: "Schwer", desc: "Vorsätzlich oder grob fahrlässig, viele Betroffene, Wiederholungstat" },
  severe: { min: 0.30, typical: 0.55, label: "Schwerwiegend", desc: "Systematisch, Datendiebstahl, massive Schäden, keine Kooperation" },
};

/**
 * Real-world precedent cases (2020–2025) sorted by regulation.
 * Source: EDPB register, DSK enforcement decisions, national DPA reports.
 */
const PRECEDENT_CASES: Record<string, { company: string; year: number; fine: number; summary: string }[]> = {
  dsgvo: [
    { company: "Meta Platforms Ireland", year: 2023, fine: 1_200_000_000, summary: "EU-US-Datentransfers ohne angemessene Rechtsgrundlage" },
    { company: "Amazon Europe", year: 2021, fine: 746_000_000, summary: "Cookie-Tracking ohne gültige Einwilligung" },
    { company: "TikTok", year: 2023, fine: 345_000_000, summary: "Kinderdaten-Verarbeitung ohne DSFA" },
    { company: "H&M Deutschland", year: 2020, fine: 35_300_000, summary: "Mitarbeiter-Profiling im Service-Center" },
    { company: "Österreichische Post", year: 2019, fine: 18_000_000, summary: "Verkauf von politischen Affinitäts-Scores" },
  ],
  aiact: [
    { company: "(keine finalen Fälle)", year: 2026, fine: 0, summary: "Erste Durchsetzungen erwartet ab H2 2026 (verbotene Praktiken)" },
  ],
  cra: [
    { company: "(keine Fälle)", year: 2027, fine: 0, summary: "Volle Anwendung ab 11. Dezember 2027" },
  ],
  nis2: [
    { company: "(nationale Fälle in Vorbereitung)", year: 2026, fine: 0, summary: "DE/AT: Erste Bußgelder nach NIS2UmsuCG/NISG 2026 erwartet" },
  ],
  dora: [
    { company: "(Aufsichtspraxis laufend)", year: 2025, fine: 0, summary: "BaFin/FMA: Laufende Prüfungen, erste Sanktionen zeichnen sich ab" },
  ],
};

function formatEuro(amount: number): string {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(1)} Mrd. EUR`;
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)} Mio. EUR`;
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}.000 EUR`;
  return `${amount.toLocaleString("de-DE")} EUR`;
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
  { label: "2 Mio.", value: 2_000_000 },
  { label: "10 Mio.", value: 10_000_000 },
  { label: "50 Mio.", value: 50_000_000 },
  { label: "100 Mio.", value: 100_000_000 },
  { label: "500 Mio.", value: 500_000_000 },
  { label: "1 Mrd.", value: 1_000_000_000 },
];

type SeverityKey = "minor" | "moderate" | "serious" | "severe";

export default function BussgeldRechnerTool() {
  const [revenue, setRevenue] = useState<number | null>(null);
  const [revenueInput, setRevenueInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedRegs, setSelectedRegs] = useState<string[]>(FINE_RULES.map((r) => r.id));
  const [severity, setSeverity] = useState<SeverityKey>("moderate");

  const { countryCode, countryData } = useCountry();
  const { locale } = useTranslations();
  const countryMeta = COUNTRY_META[countryCode];

  const handleRevenueSubmit = () => {
    if (revenue && revenue > 0) {
      setShowResults(true);
    }
  };

  const handlePreset = (value: number) => {
    setRevenue(value);
    setRevenueInput(value.toLocaleString("de-DE"));
    setShowResults(true);
  };

  const handleInputChange = (val: string) => {
    setRevenueInput(val);
    // Parse German number format
    const cleaned = val.replace(/\./g, "").replace(/,/g, ".").replace(/[^\d.]/g, "");
    const num = parseFloat(cleaned);
    setRevenue(isNaN(num) ? null : num);
    setShowResults(false);
  };

  const toggleReg = (id: string) => {
    setSelectedRegs((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const severityFactor = SEVERITY_FACTORS[severity];

  const activeFines = FINE_RULES.filter((r) => selectedRegs.includes(r.id)).map((rule) => {
    const regData = countryData?.regulations?.[rule.countryKey];
    const maxFine = revenue ? calculateFine(rule, revenue) : 0;
    return {
      ...rule,
      guideUrl: `/${locale}${rule.guideUrl}`,
      maxFine,
      fine: maxFine, // Back-compat for existing rendering
      /* Realistic range: typical fines cluster around severity.typical × max */
      realisticFine: Math.round(maxFine * severityFactor.typical),
      realisticMin: Math.round(maxFine * severityFactor.min),
      nationalFines: regData?.nationalFines,
      nationalAuthority: regData?.authority,
      nationalAuthorityUrl: regData?.authorityUrl,
      nationalLawName: regData?.nationalLawName,
    };
  });

  /* Total MAX risk — shown as upper theoretical ceiling (disclaimer required) */
  const totalRisk = activeFines.reduce((sum, f) => sum + f.maxFine, 0);
  /* Realistic worst-case single event — NOT summed (cumulative sum is misleading).
     Regulators typically address ONE violation category per enforcement action. */
  const realisticWorstCase = activeFines.reduce(
    (max, f) => (f.realisticFine > max ? f.realisticFine : max),
    0,
  );

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
              <Link href={`/${locale}`} className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors">Startseite</Link>
              <span className="font-mono text-[11px] text-white/35">/</span>
              <span className="font-mono text-[11px] text-white/60">Bußgeld-Rechner</span>
            </nav>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-amber-400/20 bg-amber-400/10">
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
              <span className="text-amber-300 text-xs font-mono font-semibold">Sofort-Ergebnis</span>
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-4">
              Bußgeld-Rechner
            </h1>
            <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Was kostet Nicht-Compliance? Geben Sie Ihren Jahresumsatz ein und sehen Sie das maximale Bußgeldrisiko pro EU-Regulierung.
            </p>
            {countryMeta && (
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="text-base leading-none">{countryMeta.flag}</span>
                <span className="text-white/60 text-xs font-medium">
                  Ergebnisse für {countryMeta.nameDE}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Calculator */}
        <section className="pb-20" style={{ background: "linear-gradient(180deg, #f4f6fc 0%, #eef1fa 100%)" }}>
          <div className="max-w-2xl mx-auto px-6">
            {/* Input Card */}
            <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8 shadow-sm mb-6">
              <h2 className="font-[Syne] font-bold text-lg text-[#060c1a] mb-1">Jahresumsatz eingeben</h2>
              <p className="text-[13px] text-[#7a8db0] mb-6">Weltweiter Jahresumsatz Ihres Unternehmens (oder Konzernumsatz)</p>

              {/* Input */}
              <div className="relative mb-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a8db0] font-mono text-sm">EUR</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="z.B. 50.000.000"
                  aria-label="Jahresumsatz in EUR"
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
                <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-2">Regulierungen einbeziehen</div>
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

              {/* Severity selector — dramatically changes realistic fine estimate */}
              <div className="mb-6">
                <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-2">Verstoß-Szenario</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(Object.keys(SEVERITY_FACTORS) as SeverityKey[]).map((key) => {
                    const s = SEVERITY_FACTORS[key];
                    const isActive = severity === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSeverity(key)}
                        className={`text-left px-3 py-2 rounded-lg border transition-all ${
                          isActive
                            ? "border-amber-400 bg-amber-50"
                            : "border-[#e0e5f0] bg-white hover:border-amber-200"
                        }`}
                      >
                        <div className={`text-[12px] font-bold ${isActive ? "text-amber-700" : "text-[#3a4a6b]"}`}>
                          {s.label}
                        </div>
                        <div className="text-[10px] text-[#7a8db0] leading-snug mt-0.5">
                          {s.desc}
                        </div>
                      </button>
                    );
                  })}
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
                  Bußgeld berechnen
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
                  aria-label="Berechnungsergebnis"
                >
                  {/* Realistic vs. Maximum — two cards side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Realistic scenario */}
                    <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100 p-6 text-center">
                      <div className="font-mono text-[10px] text-amber-800 uppercase tracking-wider mb-2">
                        Realistisches Szenario
                      </div>
                      <div className="mb-2">
                        <AnimatedCounter value={realisticWorstCase} color="#92400e" />
                      </div>
                      <p className="text-[11px] text-amber-900/80 leading-snug max-w-xs mx-auto">
                        Typische Strafe bei <strong>{severityFactor.label.toLowerCase()}em</strong> Verstoß
                        gegen die teuerste Regulierung.
                      </p>
                      <p className="text-[10px] text-amber-900/60 mt-2 italic">
                        Median-Faktor: {Math.round(severityFactor.typical * 100)}% des Höchstmaßes
                      </p>
                    </div>

                    {/* Theoretical maximum */}
                    <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 text-center">
                      <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-2">
                        Theoretisches Höchstmaß
                      </div>
                      <div className="mb-2">
                        <span className="font-[Syne] font-extrabold text-2xl sm:text-3xl text-[#3a4a6b] tabular-nums">
                          {formatEuro(totalRisk)}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7a8db0] leading-snug max-w-xs mx-auto">
                        Summe aller Maximal-Bußgelder — statistisch nicht kumuliert,
                        aber rechtlich möglich.
                      </p>
                    </div>
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
                            href={item.guideUrl}
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

                            {/* Country-specific info */}
                            {(item.nationalAuthority || item.nationalFines) && countryMeta && (
                              <div className="mt-2 pt-2 border-t border-[#e8ecf4] space-y-1">
                                {item.nationalFines && (
                                  <div className="flex items-center gap-1.5 text-[10px] text-[#5a6a8b]">
                                    <span className="leading-none">{countryMeta.flag}</span>
                                    <span><strong>{countryMeta.nameDE}:</strong> {item.nationalFines}</span>
                                  </div>
                                )}
                                {item.nationalAuthority && (
                                  <div className="flex items-center gap-1.5 text-[10px] text-[#5a6a8b]">
                                    <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
                                    </svg>
                                    <span>
                                      Aufsicht:{" "}
                                      {item.nationalAuthorityUrl ? (
                                        <a href={item.nationalAuthorityUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#3a4a6b] transition-colors" onClick={(e) => e.stopPropagation()}>
                                          {item.nationalAuthority}
                                        </a>
                                      ) : (
                                        item.nationalAuthority
                                      )}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </Link>
                        </motion.div>
                      ))}
                  </div>

                  {/* Real precedent cases */}
                  <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                      <h3 className="font-[Syne] font-bold text-[15px] text-[#060c1a]">Echte Präzedenzfälle zur Einordnung</h3>
                    </div>
                    <p className="text-[12px] text-[#7a8db0] mb-4">
                      Die aktuellen Top-Bußgelder aus DSB/EDPB-Verfahren 2019–2025 geben den realistischen Rahmen:
                    </p>
                    <div className="space-y-2">
                      {PRECEDENT_CASES.dsgvo.map((c, i) => (
                        <div key={i} className="flex items-start justify-between gap-4 py-2 border-b border-[#f0f2f8] last:border-0">
                          <div className="min-w-0 flex-1">
                            <div className="text-[13px] font-semibold text-[#060c1a]">{c.company}</div>
                            <div className="text-[11px] text-[#7a8db0] mt-0.5">{c.summary}</div>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <div className="text-[13px] font-[Syne] font-bold text-amber-700 tabular-nums">{formatEuro(c.fine)}</div>
                            <div className="text-[10px] text-[#7a8db0]">{c.year}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-[#7a8db0] mt-4 italic">
                      Für NIS2, AI Act und CRA liegen noch keine finalen Bußgeld-Entscheidungen vor —
                      Aufsichtsbehörden erwarten erste Präzedenzfälle im Laufe 2026.
                    </p>
                  </div>

                  {/* Context note */}
                  <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8 mb-6">
                    <h3 className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-3">Wichtige Hinweise</h3>
                    <div className="space-y-2 text-[13px] text-[#3a4a6b] leading-relaxed">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">1.</span>
                        <span>Das Höchstmaß wird selten verhängt. Reale Strafen liegen typischerweise bei <strong>5–25% des Maximums</strong>, abhängig von Schwere, Kooperation und Vorstrafen.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">2.</span>
                        <span>Bei NIS2, AI Act, CRA und DSGVO gilt: <strong>der höhere Betrag</strong> aus Festbetrag und Umsatz-Prozentsatz wird angewandt.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">3.</span>
                        <span>Bußgelder werden pro Verstoß einzeln verhängt — ein Vorfall kann aber mehrere Regulierungen berühren (z.B. Data Breach → DSGVO + NIS2-Meldepflicht).</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">4.</span>
                        <span>Zusätzlich zu Bußgeldern drohen: <strong>persönliche GF-Haftung</strong>, Reputationsschäden, Betriebsuntersagung und zivilrechtliche Schadensersatzansprüche.</span>
                      </div>
                    </div>
                  </div>

                  {/* Tool Cross-Links */}
                  <div className="mb-6">
                    <ToolNextSteps
                      currentTool="bussgeld-rechner"
                      dark={false}
                      subtext="Strafrahmen kennen Sie nun. Analysieren Sie Ihre Compliance-Situation weiter:"
                    />
                  </div>

                  {/* Save Evaluation */}
                  <div className="mb-6 flex justify-center">
                    <SaveEvaluationButton
                      toolId="bussgeld-rechner"
                      toolName="Bußgeld-Rechner"
                      inputs={{
                        revenue,
                        selectedRegulations: selectedRegs,
                      }}
                      results={{
                        totalRisk,
                        perRegulation: activeFines.map((f) => ({ name: f.name, fine: f.fine })),
                      }}
                      summary={`${formatEuro(totalRisk)} Gesamtrisiko`}
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
                      title="Bußgeld-Analyse per E-Mail erhalten"
                      subtitle="Ihre Ergebnisse als Übersicht — plus Benachrichtigung bei relevanten Gesetzesänderungen."
                    />
                  </div>

                  {/* Disclaimer */}
                  <div className="p-4 rounded-xl bg-[#fff8e1] border border-[#f0e6c0]">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-[#b8960c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                      <p className="text-[12px] text-[#8a7020] leading-relaxed">
                        <strong>Disclaimer:</strong> Dieser Rechner zeigt maximale theoretische Bußgelder. Keine Rechtsberatung. Die tatsächliche Strafhöhe wird von Behörden im Einzelfall bestimmt.
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
