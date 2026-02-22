"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolNextSteps from "@/components/ToolNextSteps";
import { useTranslations } from "@/i18n/use-translations";
import { useCountry } from "@/i18n/country-context";
import { COUNTRY_META } from "@/i18n/country";

const LeadCaptureForm = dynamic(() => import("@/components/LeadCaptureForm"), {
  ssr: false,
});

/* ===================================================================
   NIS2 / NISG 2026 -- SECTOR & SIZE DATA
   =================================================================== */

/** Annex I = "Sectors of high criticality" -> can be "essential"
 *  Annex II = "Other critical sectors"     -> can be "important"  */

interface Sector {
  id: string;
  label: string;
  annex: "I" | "II";
  subsectors?: string[];
  description?: string;
}

const SECTORS_ANNEX_I: Sector[] = [
  { id: "energie", label: "Energy", annex: "I", subsectors: ["Electricity", "District heating/cooling", "Oil", "Gas", "Hydrogen"], description: "Generation, distribution, transmission" },
  { id: "verkehr", label: "Transport", annex: "I", subsectors: ["Air transport", "Rail transport", "Shipping", "Road transport"], description: "Operators, management bodies, traffic management" },
  { id: "bankwesen", label: "Banking", annex: "I", description: "Credit institutions per CRR" },
  { id: "finanzmarkt", label: "Financial market infrastructure", annex: "I", description: "Trading venues, central counterparties" },
  { id: "gesundheit", label: "Healthcare", annex: "I", subsectors: ["Healthcare providers", "EU reference laboratories", "Medical devices", "Pharma"], description: "Hospitals, laboratories, pharmaceutical companies" },
  { id: "trinkwasser", label: "Drinking water", annex: "I", description: "Supply and distribution" },
  { id: "abwasser", label: "Waste water", annex: "I", description: "Collection, disposal, treatment" },
  { id: "digitale_infra", label: "Digital infrastructure", annex: "I", subsectors: ["IXP operators", "DNS services", "TLD registries", "Cloud computing", "Data centres", "CDN", "Trust services", "Telecommunications"], description: "Internet exchange points, DNS, cloud, data centres" },
  { id: "ikt_dienste", label: "ICT services (B2B)", annex: "I", description: "Managed service providers, managed security service providers" },
  { id: "oeffentlich", label: "Public administration", annex: "I", description: "Central government and regional authorities" },
  { id: "weltraum", label: "Space", annex: "I", description: "Ground infrastructure operators" },
];

const SECTORS_ANNEX_II: Sector[] = [
  { id: "post", label: "Postal and courier services", annex: "II" },
  { id: "abfallbewirtschaftung", label: "Waste management", annex: "II" },
  { id: "chemie", label: "Chemicals", annex: "II", description: "Manufacturing, production, distribution" },
  { id: "lebensmittel", label: "Food", annex: "II", description: "Manufacturing, processing, distribution" },
  { id: "verarbeitendes_gewerbe", label: "Manufacturing", annex: "II", subsectors: ["Medical devices & IVD", "IT, electronics, optics", "Electrical equipment", "Mechanical engineering", "Motor vehicles & trailers", "Other vehicle construction"], description: "Medical devices, electronics, mechanical engineering, automotive" },
  { id: "digitale_dienste", label: "Digital services", annex: "II", subsectors: ["Online marketplaces", "Online search engines", "Social networks"], description: "Marketplaces, search engines, social media" },
  { id: "forschung", label: "Research", annex: "II", description: "Research institutions" },
];

const ALL_SECTORS = [...SECTORS_ANNEX_I, ...SECTORS_ANNEX_II];

/** Size thresholds per NIS2 Art. 2 */
type CompanySize = "micro" | "small" | "medium" | "large";

interface SizeOption {
  id: CompanySize;
  label: string;
  employees: string;
  revenue: string;
  description: string;
}

const SIZE_OPTIONS: SizeOption[] = [
  { id: "micro", label: "Micro-enterprise", employees: "< 10", revenue: "< EUR 2m", description: "Fewer than 10 employees AND under EUR 2m turnover" },
  { id: "small", label: "Small enterprise", employees: "10 \u2013 49", revenue: "EUR 2 \u2013 10m", description: "10 to 49 employees OR EUR 2 to 10m turnover" },
  { id: "medium", label: "Medium-sized enterprise", employees: "50 \u2013 249", revenue: "EUR 10 \u2013 50m", description: "50 to 249 employees OR EUR 10 to 50m turnover" },
  { id: "large", label: "Large enterprise", employees: "250+", revenue: "> EUR 50m", description: "250+ employees OR over EUR 50m turnover" },
];

/* ===================================================================
   ASSESSMENT LOGIC
   =================================================================== */

type NIS2Result = "wesentlich" | "wichtig" | "nicht_betroffen" | "moeglich";

interface Assessment {
  result: NIS2Result;
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
  borderColor: string;
  obligations: string[];
  deadline: string;
  maxFine: string;
  recommendation: string;
}

function assessNIS2(
  sectorId: string | null,
  size: CompanySize | null,
  isKritis: boolean,
  isDigitalService: boolean,
): Assessment {
  const sector = ALL_SECTORS.find((s) => s.id === sectorId);

  // Not in any NIS2 sector
  if (!sector) {
    return {
      result: "nicht_betroffen",
      title: "Likely not affected",
      subtitle: "Your company probably does not fall under NIS2/NISG 2026.",
      color: "#059669",
      bgColor: "#ecfdf5",
      borderColor: "#a7f3d0",
      obligations: [],
      deadline: "\u2014",
      maxFine: "\u2014",
      recommendation: "Even if you are not directly affected, you should be aware of the requirements \u2014 especially if you are a service provider for affected companies (supply chain obligations).",
    };
  }

  // Special cases: certain digital infrastructure & certain services are ALWAYS affected regardless of size
  const alwaysAffected = [
    "digitale_infra", // DNS, TLD, Cloud, Data centres, CDN, Trust services, Telecom
    "oeffentlich",    // Public administration
    "ikt_dienste",    // MSP, MSSP
  ];

  const isAlwaysAffected = alwaysAffected.includes(sector.id) || isKritis;

  // Size check
  const isMediumOrLarger = size === "medium" || size === "large";
  const isSmallOrMicro = size === "micro" || size === "small";

  // ESSENTIAL: Annex I + large OR always-affected critical
  if (sector.annex === "I" && (size === "large" || isAlwaysAffected)) {
    return {
      result: "wesentlich",
      title: "Essential Entity",
      subtitle: "Your company is very likely an ESSENTIAL entity under NIS2.",
      color: "#dc2626",
      bgColor: "#fef2f2",
      borderColor: "#fecaca",
      obligations: [
        "Comprehensive risk management (Art. 21 NIS2)",
        "Incident reporting obligation \u2014 24h early warning, 72h initial report (Art. 23)",
        "Personal liability of management (Art. 20)",
        "Mandatory cyber-security training for management",
        "Registration with the BMI (Austria)",
        "Business continuity / backup management",
        "Supply chain security & service provider monitoring",
        "Proactive supervision by authorities (ex-ante oversight)",
      ],
      deadline: "Since 18 October 2024 (EU) / NISG 2026 (AT)",
      maxFine: "Up to EUR 10m or 2% of global annual turnover",
      recommendation: "Immediate action is required. Start with a gap analysis of your current cyber-security measures and set up a project team.",
    };
  }

  // ESSENTIAL: Annex I + medium
  if (sector.annex === "I" && isMediumOrLarger) {
    return {
      result: "wesentlich",
      title: "Essential Entity",
      subtitle: "As a medium-sized or large company in a sector of high criticality, you are an ESSENTIAL entity.",
      color: "#dc2626",
      bgColor: "#fef2f2",
      borderColor: "#fecaca",
      obligations: [
        "Comprehensive risk management (Art. 21 NIS2)",
        "Incident reporting obligation \u2014 24h early warning, 72h initial report (Art. 23)",
        "Personal liability of management (Art. 20)",
        "Mandatory cyber-security training for management",
        "Registration with the BMI (Austria)",
        "Business continuity / backup management",
        "Supply chain security & service provider monitoring",
        "Proactive supervision by authorities (ex-ante oversight)",
      ],
      deadline: "Since 18 October 2024 (EU) / NISG 2026 (AT)",
      maxFine: "Up to EUR 10m or 2% of global annual turnover",
      recommendation: "Immediate action is required. Start with a gap analysis of your current cyber-security measures.",
    };
  }

  // IMPORTANT: Annex II + medium or large
  if (sector.annex === "II" && isMediumOrLarger) {
    return {
      result: "wichtig",
      title: "Important Entity",
      subtitle: "Your company is probably an IMPORTANT entity under NIS2.",
      color: "#d97706",
      bgColor: "#fffbeb",
      borderColor: "#fde68a",
      obligations: [
        "Risk management measures (Art. 21 NIS2)",
        "Incident reporting obligation \u2014 24h/72h (Art. 23)",
        "Management responsibility (Art. 20)",
        "Cyber-security training for management",
        "Registration with the BMI (Austria)",
        "Business continuity planning",
        "Reactive supervision (ex-post, after incidents)",
      ],
      deadline: "Since 18 October 2024 (EU) / NISG 2026 (AT)",
      maxFine: "Up to EUR 7m or 1.4% of global annual turnover",
      recommendation: "Action is needed. Start by taking stock of your information security and plan for NIS2 compliance.",
    };
  }

  // IMPORTANT: Annex I + small but provides critical service
  if (sector.annex === "I" && isSmallOrMicro && (isKritis || isDigitalService)) {
    return {
      result: "wichtig",
      title: "Potentially affected (special case)",
      subtitle: "Although you are a smaller company, you may still fall under NIS2 due to your critical services or your role as a sole provider.",
      color: "#d97706",
      bgColor: "#fffbeb",
      borderColor: "#fde68a",
      obligations: [
        "Risk management measures (Art. 21 NIS2)",
        "Incident reporting obligation (Art. 23)",
        "Management responsibility (Art. 20)",
      ],
      deadline: "Since 18 October 2024 (EU) / NISG 2026 (AT)",
      maxFine: "Up to EUR 7m or 1.4% of global annual turnover",
      recommendation: "Have your applicability assessed by a specialised consultant. Certain exemption rules for small companies may apply, but not in every case.",
    };
  }

  // Small/Micro in NIS2 sector but not critical
  if (isSmallOrMicro) {
    return {
      result: "moeglich",
      title: "Likely not directly affected",
      subtitle: "Your sector falls under NIS2, but as a smaller company you are probably not directly affected \u2014 unless you provide critical services.",
      color: "#0ea5e9",
      bgColor: "#f0f9ff",
      borderColor: "#bae6fd",
      obligations: [],
      deadline: "\u2014",
      maxFine: "\u2014",
      recommendation: "Even without being directly affected: if you are a supplier or service provider for NIS2-affected companies, they must verify your cyber-security (supply chain obligations). Prepare accordingly.",
    };
  }

  // Fallback
  return {
    result: "moeglich",
    title: "Review recommended",
    subtitle: "Based on your information, a final assessment is not possible. We recommend a professional review.",
    color: "#0ea5e9",
    bgColor: "#f0f9ff",
    borderColor: "#bae6fd",
    obligations: [],
    deadline: "\u2014",
    maxFine: "\u2014",
    recommendation: "Have your NIS2 applicability assessed by a specialised consultant.",
  };
}

/* ===================================================================
   COMPONENT
   =================================================================== */

const TOTAL_STEPS = 4;
const ACCENT = "#0ea5e9"; // Sky blue, matching NISG guide

export default function NIS2CheckTool() {
  const { locale } = useTranslations();
  const { countryCode } = useCountry();
  const countryMeta = COUNTRY_META[countryCode];
  const [step, setStep] = useState(0);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<CompanySize | null>(null);
  const [isKritis, setIsKritis] = useState(false);
  const [isDigitalService, setIsDigitalService] = useState(false);
  const [sectorSearch, setSectorSearch] = useState("");
  const [showResult, setShowResult] = useState(false);

  const next = useCallback(() => {
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
    else setShowResult(true);
  }, [step]);

  const back = useCallback(() => {
    if (showResult) {
      setShowResult(false);
    } else if (step > 0) {
      setStep((s) => s - 1);
    }
  }, [step, showResult]);

  const restart = useCallback(() => {
    setStep(0);
    setSelectedSector(null);
    setSelectedSize(null);
    setIsKritis(false);
    setIsDigitalService(false);
    setSectorSearch("");
    setShowResult(false);
  }, []);

  const canProceed =
    step === 0
      ? selectedSector !== null
      : step === 1
      ? selectedSize !== null
      : true; // steps 2 & 3 have defaults (checkboxes)

  const assessment = assessNIS2(selectedSector, selectedSize, isKritis, isDigitalService);
  const progressPercent = showResult ? 100 : ((step + 1) / TOTAL_STEPS) * 100;

  const filteredSectors = ALL_SECTORS.filter(
    (s) =>
      s.label.toLowerCase().includes(sectorSearch.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(sectorSearch.toLowerCase())) ||
      (s.subsectors && s.subsectors.some((sub) => sub.toLowerCase().includes(sectorSearch.toLowerCase())))
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#040a18]">
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${ACCENT}30 0%, transparent 70%)`,
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f4f6fc] to-transparent" />

          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <nav className="flex items-center justify-center gap-2 mb-8">
              <Link href={`/${locale}`} className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors">
                Home
              </Link>
              <span className="font-mono text-[11px] text-white/35">/</span>
              <Link href={`/${locale}/nisg-2026`} className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors">
                NISG 2026
              </Link>
              <span className="font-mono text-[11px] text-white/35">/</span>
              <span className="font-mono text-[11px] text-white/60">Applicability Check</span>
            </nav>

            <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-400/20 bg-sky-400/10">
                <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sky-300 text-xs font-mono font-semibold">Duration: approx. 2 minutes</span>
              </div>
              {countryMeta && (
                <div className="flex items-center gap-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] px-2.5 py-1">
                  <span className="text-sm leading-none">{countryMeta.flag}</span>
                  <span className="font-mono text-[10px] text-white/60 font-medium">{countryMeta.nameDE}</span>
                </div>
              )}
            </div>

            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-4">
              NIS2 Applicability Check
            </h1>
            <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Find out whether your company falls under the NIS2 Directive or the NISG 2026 \u2014 and what that means in practice.
            </p>
          </div>
        </section>

        {/* Quiz Area */}
        <section className="pb-20" style={{ background: "linear-gradient(180deg, #f4f6fc 0%, #eef1fa 100%)" }}>
          <div className="max-w-2xl mx-auto px-6">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] text-[#7a8db0] uppercase tracking-wider">
                  {showResult ? "Result" : `Step ${step + 1} of ${TOTAL_STEPS}`}
                </span>
                <span className="font-mono text-[11px] font-bold" style={{ color: ACCENT }}>
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <div
                className="h-1.5 rounded-full bg-[#e0e5f0] overflow-hidden"
                role="progressbar"
                aria-valuenow={Math.round(progressPercent)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progress of the applicability check"
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${ACCENT}, #38bdf8)` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={`step-${step}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8 shadow-sm">
                    {/* Step 0: Sector */}
                    {step === 0 && (
                      <>
                        <StepHeader
                          number={1}
                          title="Which sector does your company operate in?"
                          description="NIS2 defines 18 sectors in two categories: sectors of high criticality (Annex I) and other critical sectors (Annex II)."
                        />

                        {/* Search */}
                        <div className="relative mb-4">
                          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a8db0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                          </svg>
                          <input
                            type="text"
                            placeholder="Search sector..."
                            aria-label="Search sector"
                            value={sectorSearch}
                            onChange={(e) => setSectorSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#d8dff0] bg-[#f8f9fd] text-sm text-[#060c1a] placeholder:text-[#7a8db0] focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
                          />
                        </div>

                        {/* Annex I */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-red-50 text-red-700 border border-red-200">
                              Annex I
                            </span>
                            <span className="text-[11px] text-[#7a8db0] font-medium">Sectors of high criticality</span>
                          </div>
                          <div className="grid gap-2">
                            {filteredSectors
                              .filter((s) => s.annex === "I")
                              .map((s) => (
                                <SectorCard
                                  key={s.id}
                                  sector={s}
                                  selected={selectedSector === s.id}
                                  onClick={() => setSelectedSector(s.id)}
                                />
                              ))}
                          </div>
                        </div>

                        {/* Annex II */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              Annex II
                            </span>
                            <span className="text-[11px] text-[#7a8db0] font-medium">Other critical sectors</span>
                          </div>
                          <div className="grid gap-2">
                            {filteredSectors
                              .filter((s) => s.annex === "II")
                              .map((s) => (
                                <SectorCard
                                  key={s.id}
                                  sector={s}
                                  selected={selectedSector === s.id}
                                  onClick={() => setSelectedSector(s.id)}
                                />
                              ))}
                          </div>
                        </div>

                        {/* No sector match */}
                        <button
                          onClick={() => { setSelectedSector("none"); }}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                            selectedSector === "none"
                              ? "border-sky-400 bg-sky-50"
                              : "border-[#e0e5f0] hover:border-[#c0c8e0] bg-white"
                          }`}
                        >
                          <span className="font-[Syne] font-bold text-sm text-[#060c1a]">
                            None of these sectors applies
                          </span>
                          <span className="block text-[12px] text-[#7a8db0] mt-0.5">
                            My company does not operate in any of the sectors listed above
                          </span>
                        </button>
                      </>
                    )}

                    {/* Step 1: Company Size */}
                    {step === 1 && (
                      <>
                        <StepHeader
                          number={2}
                          title="How large is your company?"
                          description="NIS2 uses the EU SME definition. The decisive factors are employee count OR annual turnover/balance sheet total (the higher value applies)."
                        />

                        <div className="grid gap-3">
                          {SIZE_OPTIONS.map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => setSelectedSize(opt.id)}
                              className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                                selectedSize === opt.id
                                  ? "border-sky-400 bg-sky-50 shadow-sm"
                                  : "border-[#e0e5f0] hover:border-[#c0c8e0] bg-white"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-[Syne] font-bold text-[15px] text-[#060c1a]">
                                  {opt.label}
                                </span>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                  selectedSize === opt.id ? "border-sky-400 bg-sky-400" : "border-[#d0d5e0]"
                                }`}>
                                  {selectedSize === opt.id && (
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-[12px] text-[#7a8db0]">
                                <span className="flex items-center gap-1">
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128H5.228A2.25 2.25 0 013 16.878V4.5A2.25 2.25 0 015.25 2.25h13.5A2.25 2.25 0 0121 4.5v1.627M15 19.128c1.72-.18 3.337-.702 4.788-1.517M9.75 6.75h4.5m-4.5 3h4.5m-4.5 3h3" />
                                  </svg>
                                  {opt.employees} emp.
                                </span>
                                <span className="flex items-center gap-1">
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                  </svg>
                                  {opt.revenue}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Step 2: Critical Infrastructure */}
                    {step === 2 && (
                      <>
                        <StepHeader
                          number={3}
                          title="Do you provide critical services?"
                          description="Certain services fall under NIS2 regardless of company size (Art. 2(2))."
                        />

                        <div className="space-y-3">
                          <CheckboxCard
                            checked={isKritis}
                            onChange={setIsKritis}
                            title="Critical infrastructure (KRITIS)"
                            description="My company operates critical infrastructure whose failure would have a significant impact on public safety, health or the economy."
                          />
                          <CheckboxCard
                            checked={isDigitalService}
                            onChange={setIsDigitalService}
                            title="Sole provider of an essential service"
                            description="My company is the sole provider of a service that is essential for maintaining critical social or economic activities."
                          />
                        </div>

                        <div className="mt-6 p-4 rounded-xl bg-[#f0f9ff] border border-sky-200">
                          <div className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                            <p className="text-[12px] text-sky-800 leading-relaxed">
                              <strong>Note:</strong> If neither of these points applies, simply click {"\u201CNext\u201D"}. The checkboxes are optional and only affect the result for smaller companies.
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 3: Confirmation / Summary */}
                    {step === 3 && (
                      <>
                        <StepHeader
                          number={4}
                          title="Summary of your details"
                          description="Review your details and click 'Show results'."
                        />

                        <div className="space-y-3 mb-6">
                          <SummaryRow
                            label="Sector"
                            value={
                              selectedSector === "none"
                                ? "None of the NIS2 sectors"
                                : ALL_SECTORS.find((s) => s.id === selectedSector)?.label || "\u2014"
                            }
                            badge={
                              selectedSector !== "none"
                                ? ALL_SECTORS.find((s) => s.id === selectedSector)?.annex === "I"
                                  ? "Annex I"
                                  : "Annex II"
                                : undefined
                            }
                            badgeColor={
                              ALL_SECTORS.find((s) => s.id === selectedSector)?.annex === "I"
                                ? "#dc2626"
                                : "#d97706"
                            }
                            onEdit={() => { setStep(0); }}
                          />
                          <SummaryRow
                            label="Company size"
                            value={SIZE_OPTIONS.find((s) => s.id === selectedSize)?.label || "\u2014"}
                            onEdit={() => { setStep(1); }}
                          />
                          <SummaryRow
                            label="Critical services"
                            value={
                              isKritis && isDigitalService
                                ? "KRITIS + Sole provider"
                                : isKritis
                                ? "Critical infrastructure"
                                : isDigitalService
                                ? "Sole provider"
                                : "No special characteristics"
                            }
                            onEdit={() => { setStep(2); }}
                          />
                        </div>

                        <div className="p-4 rounded-xl bg-[#fff8e1] border border-[#f0e6c0]">
                          <div className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-[#b8960c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            <p className="text-[12px] text-[#8a7020] leading-relaxed">
                              <strong>Disclaimer:</strong> This tool provides an initial assessment. It does not replace professional legal advice. Actual applicability depends on additional factors.
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#e8ecf4]">
                      <button
                        onClick={back}
                        disabled={step === 0}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          step === 0
                            ? "text-[#c0c8d8] cursor-not-allowed"
                            : "text-[#3a4a6b] hover:bg-[#f0f2f8]"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        Back
                      </button>

                      <button
                        onClick={next}
                        disabled={!canProceed}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-[Syne] font-bold transition-all duration-300 ${
                          canProceed
                            ? "text-white hover:-translate-y-0.5 shadow-lg"
                            : "bg-[#e0e5f0] text-[#a0a8b8] cursor-not-allowed"
                        }`}
                        style={
                          canProceed
                            ? {
                                background: `linear-gradient(135deg, ${ACCENT}, #38bdf8)`,
                                boxShadow: `0 4px 16px ${ACCENT}40`,
                              }
                            : undefined
                        }
                      >
                        {step === TOTAL_STEPS - 1 ? "Show results" : "Next"}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* =========== RESULT =========== */
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  aria-live="polite"
                  role="region"
                  aria-label="Result of the NIS2 applicability check"
                >
                  {/* Result Card */}
                  <div
                    className="rounded-2xl border-2 p-6 sm:p-8 mb-6"
                    style={{
                      background: assessment.bgColor,
                      borderColor: assessment.borderColor,
                    }}
                  >
                    {/* Result badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${assessment.color}15` }}
                      >
                        {assessment.result === "wesentlich" ? (
                          <svg className="w-6 h-6" style={{ color: assessment.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                          </svg>
                        ) : assessment.result === "wichtig" ? (
                          <svg className="w-6 h-6" style={{ color: assessment.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />
                          </svg>
                        ) : assessment.result === "nicht_betroffen" ? (
                          <svg className="w-6 h-6" style={{ color: assessment.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" style={{ color: assessment.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <span
                          className="text-[10px] px-2.5 py-1 rounded-lg font-mono font-bold tracking-wide text-white mb-1 inline-block"
                          style={{ background: assessment.color }}
                        >
                          {assessment.result === "wesentlich"
                            ? "ESSENTIAL ENTITY"
                            : assessment.result === "wichtig"
                            ? "IMPORTANT ENTITY"
                            : assessment.result === "nicht_betroffen"
                            ? "NOT AFFECTED"
                            : "REVIEW RECOMMENDED"}
                        </span>
                        <h2 className="font-[Syne] font-extrabold text-xl sm:text-2xl text-[#060c1a] leading-tight">
                          {assessment.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
                      {assessment.subtitle}
                    </p>

                    {/* Key metrics */}
                    {assessment.result !== "nicht_betroffen" && assessment.result !== "moeglich" && (
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="rounded-xl bg-white/80 border border-white p-4">
                          <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-1">
                            Max. fine
                          </div>
                          <div className="font-[Syne] font-bold text-lg" style={{ color: assessment.color }}>
                            {assessment.maxFine}
                          </div>
                        </div>
                        <div className="rounded-xl bg-white/80 border border-white p-4">
                          <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-1">
                            Deadline
                          </div>
                          <div className="font-[Syne] font-bold text-sm text-[#060c1a] leading-snug">
                            {assessment.deadline}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Obligations */}
                    {assessment.obligations.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-3">
                          Your obligations at a glance
                        </h3>
                        <div className="space-y-2">
                          {assessment.obligations.map((obligation, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <div
                                className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-mono font-bold text-white"
                                style={{ background: assessment.color }}
                              >
                                {i + 1}
                              </div>
                              <span className="text-[14px] text-[#3a4a6b] leading-relaxed">
                                {obligation}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommendation */}
                    <div className="rounded-xl bg-white/80 border border-white p-5">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                        </svg>
                        <div>
                          <div className="font-[Syne] font-bold text-[13px] text-[#060c1a] mb-1">Recommendation</div>
                          <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                            {assessment.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Section */}
                  <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8 mb-6">
                    <h3 className="font-[Syne] font-bold text-lg text-[#060c1a] mb-2">
                      Next steps
                    </h3>
                    <p className="text-[14px] text-[#7a8db0] mb-6">
                      Deepen your knowledge and start implementing.
                    </p>

                    <div className="grid gap-3">
                      <Link
                        href={`/${locale}/nisg-2026`}
                        className="flex items-center gap-4 p-4 rounded-xl border border-[#d8dff0] hover:border-sky-300 hover:shadow-sm transition-all group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <span className="font-[Syne] font-bold text-[14px] text-[#060c1a] group-hover:text-sky-700 transition-colors">
                            NISG 2026 \u2014 Complete Guide
                          </span>
                          <span className="block text-[12px] text-[#7a8db0]">
                            All obligations, deadlines and implementation steps in detail
                          </span>
                        </div>
                        <svg className="w-4 h-4 text-[#c0c8d8] group-hover:text-sky-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </Link>

                      <Link
                        href={`/${locale}/haftungs-check`}
                        className="flex items-center gap-4 p-4 rounded-xl border border-[#d8dff0] hover:border-red-300 hover:shadow-sm transition-all group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <span className="font-[Syne] font-bold text-[14px] text-[#060c1a] group-hover:text-red-700 transition-colors">
                            CEO liability under NIS2
                          </span>
                          <span className="block text-[12px] text-[#7a8db0]">
                            Personal liability risks and mitigation strategies
                          </span>
                        </div>
                        <svg className="w-4 h-4 text-[#c0c8d8] group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Tool Cross-Links */}
                  <div className="mb-6">
                    <ToolNextSteps
                      currentTool="nis2-check"
                      dark={false}
                      subtext="Continue analysing your compliance situation with our interactive tools."
                    />
                  </div>

                  {/* Lead Capture */}
                  <div className="mb-6">
                    <LeadCaptureForm
                      sourceTool="nis2-check"
                      toolResults={{
                        result: assessment.result,
                        title: assessment.title,
                        sector: selectedSector,
                        companySize: selectedSize,
                      }}
                      accent="#0ea5e9"
                      title="Receive NIS2 result by email"
                      subtitle="Your applicability analysis as a summary \u2014 plus notifications for NIS2 updates and deadlines."
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={restart}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#3a4a6b] hover:bg-white transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                      </svg>
                      Check again
                    </button>

                    <button
                      onClick={() => {
                        if (typeof navigator !== "undefined" && navigator.share) {
                          navigator.share({
                            title: "NIS2 Applicability Check",
                            text: "Find out whether your company falls under NIS2.",
                            url: window.location.href,
                          });
                        } else if (typeof navigator !== "undefined") {
                          navigator.clipboard.writeText(window.location.href);
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#3a4a6b] hover:bg-white transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                      </svg>
                      Share
                    </button>
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

/* ===================================================================
   SUB-COMPONENTS
   =================================================================== */

function StepHeader({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span
          className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold text-white"
          style={{ background: ACCENT }}
        >
          {number}
        </span>
        <h2 className="font-[Syne] font-bold text-lg text-[#060c1a]">{title}</h2>
      </div>
      <p className="text-[13px] text-[#7a8db0] leading-relaxed ml-8">{description}</p>
    </div>
  );
}

function SectorCard({ sector, selected, onClick }: { sector: Sector; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all duration-200 ${
        selected
          ? "border-sky-400 bg-sky-50 shadow-sm"
          : "border-[#e8ecf4] hover:border-[#c0c8e0] bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <span className="font-[Syne] font-bold text-[13px] text-[#060c1a] block truncate">
            {sector.label}
          </span>
          {sector.description && (
            <span className="text-[11px] text-[#7a8db0] block truncate mt-0.5">
              {sector.description}
            </span>
          )}
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3 transition-all ${
          selected ? "border-sky-400 bg-sky-400" : "border-[#d0d5e0]"
        }`}>
          {selected && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

function CheckboxCard({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  title: string;
  description: string;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
        checked
          ? "border-sky-400 bg-sky-50"
          : "border-[#e8ecf4] hover:border-[#c0c8e0] bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
          checked ? "border-sky-400 bg-sky-400" : "border-[#d0d5e0]"
        }`}>
          {checked && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <div>
          <span className="font-[Syne] font-bold text-[14px] text-[#060c1a] block">{title}</span>
          <span className="text-[12px] text-[#7a8db0] leading-relaxed block mt-1">{description}</span>
        </div>
      </div>
    </button>
  );
}

function SummaryRow({
  label,
  value,
  badge,
  badgeColor,
  onEdit,
}: {
  label: string;
  value: string;
  badge?: string;
  badgeColor?: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-[#f8f9fd] border border-[#e8ecf4]">
      <div>
        <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-0.5">{label}</div>
        <div className="flex items-center gap-2">
          <span className="font-[Syne] font-bold text-[14px] text-[#060c1a]">{value}</span>
          {badge && (
            <span
              className="text-[9px] px-1.5 py-0.5 rounded-md font-mono font-bold text-white"
              style={{ background: badgeColor }}
            >
              {badge}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={onEdit}
        className="text-[12px] font-medium text-sky-600 hover:text-sky-700 transition-colors"
      >
        Edit
      </button>
    </div>
  );
}
