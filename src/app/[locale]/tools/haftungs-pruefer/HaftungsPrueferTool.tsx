"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
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
   DATA: Regulations & risk factors
   ═══════════════════════════════════════════════════════════ */

interface Regulation {
  id: string;
  /** Key in CountryData.regulations */
  countryKey: RegulationKey;
  name: string;
  fullName: string;
  color: string;
  maxFine: string;
  liabilityBasis: string;
  guideUrl: string;
}

const REGULATIONS: Regulation[] = [
  {
    id: "nis2",
    countryKey: "nis2",
    name: "NIS2 / NISG",
    fullName: "NIS2-Richtlinie / NISG 2026",
    color: "#0ea5e9",
    maxFine: "10 Mio. EUR / 2% Umsatz",
    liabilityBasis: "Art. 20 NIS2 — Leitungsorgane tragen die Verantwortung",
    guideUrl: "/nisg-2026",
  },
  {
    id: "dora",
    countryKey: "dora",
    name: "DORA",
    fullName: "Digital Operational Resilience Act",
    color: "#10b981",
    maxFine: "Bis zu 1% des tgl. Nettoumsatzes",
    liabilityBasis: "Art. 5 DORA — Verantwortung des Leitungsorgans",
    guideUrl: "/dora",
  },
  {
    id: "aiact",
    countryKey: "ai-act",
    name: "AI Act",
    fullName: "EU KI-Verordnung",
    color: "#0A2540",
    maxFine: "35 Mio. EUR / 7% Umsatz",
    liabilityBasis: "Art. 4 AI Act — KI-Kompetenz der Führungsebene",
    guideUrl: "/eu-ai-act",
  },
  {
    id: "cra",
    countryKey: "cra",
    name: "CRA",
    fullName: "Cyber Resilience Act",
    color: "#8b5cf6",
    maxFine: "15 Mio. EUR / 2,5% Umsatz",
    liabilityBasis: "Produkthaftung + GmbHG/AktG Sorgfaltspflicht",
    guideUrl: "/cra",
  },
];

/* ── Legal form options — determine liability regime ── */
interface LegalForm {
  id: string;
  label: string;
  description: string;
  regime: "limited" | "unlimited" | "mixed";
  keyStatutes: string;
}

const LEGAL_FORMS: LegalForm[] = [
  { id: "gmbh", label: "GmbH / Ges.m.b.H.", description: "Gesellschaft mit beschränkter Haftung (DE/AT)", regime: "limited", keyStatutes: "§ 43 GmbHG (DE), § 25 GmbHG (AT)" },
  { id: "ag", label: "AG", description: "Aktiengesellschaft (DE/AT)", regime: "limited", keyStatutes: "§ 93 AktG (DE), § 84 AktG (AT)" },
  { id: "se", label: "SE", description: "Societas Europaea", regime: "limited", keyStatutes: "SE-VO + nationales AktG" },
  { id: "oekg", label: "OG / KG", description: "Offene Gesellschaft / Kommanditgesellschaft", regime: "mixed", keyStatutes: "UGB (AT), HGB (DE) — pers. Komplementärhaftung" },
  { id: "einzel", label: "Einzelunternehmer", description: "Einzelfirma, Freiberufler, Kaufmann", regime: "unlimited", keyStatutes: "Volle persönliche Haftung" },
  { id: "verein", label: "Verein / Genossenschaft", description: "Idealverein, Genossenschaft", regime: "limited", keyStatutes: "VerG (AT) / BGB (DE), Vorstandshaftung" },
  { id: "other", label: "Andere / Unsicher", description: "Stiftung, andere Rechtsform", regime: "mixed", keyStatutes: "Rechtsform-spezifisch" },
];

/* ── Governance & enthaftung documentation questions ── */
interface GovernanceQuestion {
  id: string;
  question: string;
  description: string;
  /** What document/evidence the question tests for */
  evidence: string;
  /** How critical is this for enthaftung? */
  criticality: "critical" | "important" | "supporting";
  /** Why lawyers ask for this in a liability case */
  whyItMatters: string;
  category: "governance" | "bjr" | "do";
}

const GOVERNANCE_QUESTIONS: GovernanceQuestion[] = [
  /* ── Governance documentation ── */
  {
    id: "geschaeftsordnung",
    category: "governance",
    question: "Gibt es eine schriftliche Geschäftsordnung?",
    description: "Formal beschlossene Geschäftsordnung für die Geschäftsführung mit klaren Ressortzuständigkeiten.",
    evidence: "Geschäftsordnung (unterzeichnet, datiert)",
    criticality: "critical",
    whyItMatters: "Grundlage für jede Ressort-Enthaftung. Ohne schriftliche Ordnung gilt im Streitfall Gesamtverantwortung aller Geschäftsführer.",
  },
  {
    id: "ressortverteilung",
    category: "governance",
    question: "Ist die Ressortverteilung zwischen GF-Mitgliedern dokumentiert?",
    description: "Konkrete Zuständigkeiten je GF (IT, Finance, Personal, Compliance) mit Benennungsdatum.",
    evidence: "Ressortverteilungsplan (mit Datum, Unterschriften)",
    criticality: "critical",
    whyItMatters: "Ohne Ressortverteilung haftet jeder GF für alles. Mit dokumentierter Verteilung reduziert sich die eigene Zuständigkeit auf das eigene Ressort (Delegation).",
  },
  {
    id: "delegationen",
    category: "governance",
    question: "Sind IT-Security & Compliance-Aufgaben an Fachpersonen delegiert (schriftlich)?",
    description: "z.B. CISO, Compliance Officer, externer DSB — mit schriftlicher Bestellung und Vollmacht.",
    evidence: "Delegationsschreiben oder Bestellungsurkunde",
    criticality: "critical",
    whyItMatters: "Wirksame Delegation erfordert: klare Aufgabenübertragung, notwendige Befugnisse, geeignete Person, Überwachung. Erst dann Enthaftung.",
  },
  {
    id: "quartals_reporting",
    category: "governance",
    question: "Erhält die Geschäftsführung mindestens quartalsweise Compliance-Reports?",
    description: "Schriftliche Berichte über Risiken, Vorfälle, Stand der Umsetzung — dokumentiert und archiviert.",
    evidence: "Q-Reports (archiviert, nachvollziehbar)",
    criticality: "important",
    whyItMatters: "Beweis für laufende Überwachungspflicht. Ohne Reports: Annahme grober Fahrlässigkeit bei Versäumnissen.",
  },
  {
    id: "aufsichtsrat_info",
    category: "governance",
    question: "Wird der Aufsichtsrat/die Gesellschafter über wesentliche Compliance-Themen informiert?",
    description: "Eskalation bei Vorfällen, jährliche Berichterstattung über Risiken. Relevant ab mittlerer Größe.",
    evidence: "Aufsichtsrats-Protokolle mit Compliance-Tagesordnungspunkt",
    criticality: "important",
    whyItMatters: "NIS2 Art. 20 und AktG verlangen Information des Überwachungsorgans. Fehlen = GF-Alleinhaftung.",
  },

  /* ── Business Judgment Rule (4 Voraussetzungen) ── */
  {
    id: "bjr_info_basis",
    category: "bjr",
    question: "Werden wesentliche Entscheidungen auf dokumentierter Informationsgrundlage getroffen?",
    description: "Wirtschaftliche, rechtliche, technische Grundlagen vor der Entscheidung eingeholt und archiviert.",
    evidence: "Entscheidungsvorlagen mit Quellen, Abwägungen, Risikobewertung",
    criticality: "critical",
    whyItMatters: "Voraussetzung 1 der Business Judgment Rule. Ohne Info-Basis keine unternehmerische Ermessensentscheidung, sondern Pflichtverletzung.",
  },
  {
    id: "bjr_external_expert",
    category: "bjr",
    question: "Wird bei unklaren Rechts-/IT-Fragen externe Expertise eingeholt?",
    description: "Gutachten von Rechtsanwälten, IT-Sicherheitsberatern, Wirtschaftsprüfern — dokumentiert.",
    evidence: "Gutachten-Akten, E-Mail-Dokumentation externer Beratung",
    criticality: "important",
    whyItMatters: "Enthaftung durch Vertrauen auf Expertenrat (sogenannte \"ISION-Rechtsprechung\"). Voraussetzung: plausibler Rat, sorgfältig geprüft.",
  },
  {
    id: "bjr_protocol",
    category: "bjr",
    question: "Werden wesentliche Compliance-Entscheidungen schriftlich protokolliert?",
    description: "Board-Protokolle, GF-Sitzungs-Protokolle mit Entscheidungsinhalt, Begründung, Abweichungen.",
    evidence: "Board-/GF-Protokolle (unterzeichnet, archiviert)",
    criticality: "critical",
    whyItMatters: "Schriftform ist der einzig wirksame Beweis ex post. Ohne Protokoll: Behauptung des Gegners gilt.",
  },
  {
    id: "bjr_conflict",
    category: "bjr",
    question: "Sind Interessenkonflikte geklärt und dokumentiert?",
    description: "GF-Beteiligungen, Nebenbeschäftigungen, Verbindungen zu Lieferanten — offengelegt.",
    evidence: "Compliance-Register, Offenlegungs-Protokolle",
    criticality: "important",
    whyItMatters: "Voraussetzung 4 der Business Judgment Rule: Entscheidung frei von Sonderinteressen.",
  },

  /* ── D&O Insurance Details ── */
  {
    id: "do_policy",
    category: "do",
    question: "Besteht eine D&O-Versicherung mit ausreichender Deckungssumme?",
    description: "Directors & Officers — Richtwert: mind. 3-5 Mio. € für KMU, 10+ Mio. € für Mittelstand.",
    evidence: "D&O-Police (aktuell, gezahlt)",
    criticality: "important",
    whyItMatters: "Schutz vor Privatinsolvenz. Ohne D&O: Voller Zugriff auf Privatvermögen bei Haftungsfall.",
  },
  {
    id: "do_cyber_rider",
    category: "do",
    question: "Enthält die D&O explizit einen Cyber-/Compliance-Baustein?",
    description: "Viele Standard-D&O-Policen schließen Cyber-Schäden aus oder decken nur begrenzt.",
    evidence: "D&O mit Cyber-Deckung (Rider oder Standalone Cyber-Police)",
    criticality: "important",
    whyItMatters: "Ohne Cyber-Rider kein Versicherungsschutz bei NIS2/DSGVO-Bußgeldern an die GF persönlich.",
  },
  {
    id: "do_sanctions_rider",
    category: "do",
    question: "Deckt die D&O auch Bußgelder/Sanktionen ab (soweit zulässig)?",
    description: "Regulatorische Bußgelder sind oft ausgeschlossen. Nachgelagerte zivilrechtliche Ansprüche sollten gedeckt sein.",
    evidence: "Policendurchsicht mit Anwalt, schriftliche Bestätigung",
    criticality: "supporting",
    whyItMatters: "DSGVO-Bußgelder sind in DE/AT nicht versicherbar, aber Regress durch Gesellschaft (§43 GmbHG) ist es — solange D&O das deckt.",
  },
];

/* ═══════════════════════════════════════════════════════════
   ENTHAFTUNGS-ASSESSMENT LOGIC (v2 — document-based)
   ═══════════════════════════════════════════════════════════ */

type GovernanceRating = "vorhanden" | "teilweise" | "nicht_vorhanden" | "nicht_angegeben";

interface EnthaftungGap {
  question: GovernanceQuestion;
  rating: GovernanceRating;
}

interface EnthaftungAssessment {
  legalForm: LegalForm | null;
  /* BJR (Business Judgment Rule) check — 4 requirements */
  bjrScore: number; // 0-4: number of BJR prerequisites met
  bjrMetRequirements: string[];
  bjrMissingRequirements: string[];
  /* Document status groups */
  criticalGaps: EnthaftungGap[]; // "nicht_vorhanden" on critical questions
  importantGaps: EnthaftungGap[]; // "nicht_vorhanden" on important questions
  existingDocs: EnthaftungGap[]; // "vorhanden"
  partialDocs: EnthaftungGap[]; // "teilweise"
  /* Overall enthaftung strength */
  level: "stark" | "mittel" | "schwach";
  levelTitle: string;
  levelDescription: string;
  color: string;
  bgColor: string;
  borderColor: string;
  /* Rechtsform-specific note */
  legalFormNote: string;
}

function assessEnthaftung(
  legalFormId: string | null,
  ratings: Record<string, GovernanceRating>,
): EnthaftungAssessment {
  const legalForm = LEGAL_FORMS.find((l) => l.id === legalFormId) ?? null;

  /* Classify answers into gap lists */
  const enriched: EnthaftungGap[] = GOVERNANCE_QUESTIONS.map((q) => ({
    question: q,
    rating: ratings[q.id] ?? "nicht_angegeben",
  }));

  const criticalGaps = enriched.filter((g) => g.question.criticality === "critical" && g.rating === "nicht_vorhanden");
  const importantGaps = enriched.filter((g) => g.question.criticality === "important" && g.rating === "nicht_vorhanden");
  const existingDocs = enriched.filter((g) => g.rating === "vorhanden");
  const partialDocs = enriched.filter((g) => g.rating === "teilweise");

  /* Business Judgment Rule check */
  const bjrQuestions = GOVERNANCE_QUESTIONS.filter((q) => q.category === "bjr");
  const bjrMet = bjrQuestions.filter((q) => ratings[q.id] === "vorhanden");
  const bjrMissing = bjrQuestions.filter((q) => ratings[q.id] !== "vorhanden");
  const bjrScore = bjrMet.length;
  const bjrMetRequirements = bjrMet.map((q) => q.question);
  const bjrMissingRequirements = bjrMissing.map((q) => q.question);

  /* Overall level */
  let level: "stark" | "mittel" | "schwach";
  let levelTitle: string;
  let levelDescription: string;
  let color: string;
  let bgColor: string;
  let borderColor: string;

  if (criticalGaps.length >= 3 || bjrScore <= 1) {
    level = "schwach";
    levelTitle = "Enthaftungs-Grundlage schwach";
    levelDescription =
      "Im Haftungsfall fehlen Ihnen mehrere zentrale Nachweise. Die Business Judgment Rule greift ohne Informationsgrundlage und Protokolle nicht. Unbeschränkte persönliche Haftung ist hoch wahrscheinlich.";
    color = "#dc2626";
    bgColor = "#fef2f2";
    borderColor = "#fecaca";
  } else if (criticalGaps.length >= 1 || bjrScore <= 3 || importantGaps.length >= 3) {
    level = "mittel";
    levelTitle = "Enthaftungs-Grundlage mittel";
    levelDescription =
      "Einzelne zentrale Dokumente fehlen. Im Ernstfall müsste der Anwalt die verbleibenden Lücken konstruieren. Schließen Sie die kritischen Lücken zuerst.";
    color = "#d97706";
    bgColor = "#fffbeb";
    borderColor = "#fde68a";
  } else {
    level = "stark";
    levelTitle = "Enthaftungs-Grundlage solide";
    levelDescription =
      "Die zentralen Enthaftungs-Nachweise liegen vor. Business Judgment Rule kann greifen. Halten Sie die Dokumentation aktuell und überprüfen Sie jährlich.";
    color = "#059669";
    bgColor = "#ecfdf5";
    borderColor = "#a7f3d0";
  }

  /* Rechtsform-specific hint */
  let legalFormNote = "Ohne Rechtsform-Angabe keine spezifische Aussage möglich.";
  if (legalForm) {
    if (legalForm.regime === "unlimited") {
      legalFormNote = `Als ${legalForm.label} haften Sie grundsätzlich unbeschränkt mit Ihrem Privatvermögen. Eine D&O-Versicherung greift nicht analog zu Kapitalgesellschaften — prüfen Sie Berufshaftpflicht und Vermögensschaden-Haftpflicht.`;
    } else if (legalForm.regime === "mixed") {
      legalFormNote = `Bei ${legalForm.label} ist die Haftung gemischt: Komplementäre/geschäftsführende Gesellschafter haften persönlich, Kommanditisten/stille Gesellschafter nur begrenzt. Gesetzliche Grundlage: ${legalForm.keyStatutes}.`;
    } else {
      legalFormNote = `Als GF einer ${legalForm.label} haften Sie grundsätzlich nur in Ausnahmefällen persönlich: bei Pflichtverletzungen nach ${legalForm.keyStatutes}, deliktischer Haftung, strafrechtlicher Verantwortung, Steuerrecht (§ 69 AO DE / § 9 BAO AT) und insolvenzbezogen (verspäteter Insolvenzantrag).`;
    }
  }

  return {
    legalForm,
    bjrScore,
    bjrMetRequirements,
    bjrMissingRequirements,
    criticalGaps,
    importantGaps,
    existingDocs,
    partialDocs,
    level,
    levelTitle,
    levelDescription,
    color,
    bgColor,
    borderColor,
    legalFormNote,
  };
}

/* Back-compat shim for existing code paths (kept for SaveEvaluationButton payload shape) */
type RiskLevel = "hoch" | "mittel" | "niedrig";
interface RiskAssessment {
  level: RiskLevel;
  score: number;
  color: string;
  bgColor: string;
  borderColor: string;
  title: string;
  description: string;
  perRegulation: { regulation: Regulation; riskLevel: RiskLevel; riskNote: string }[];
  recommendations: string[];
}
function calculateRisk(
  selectedRegulations: string[],
): RiskAssessment {
  /* Legacy scorer — kept for backwards-compatible save payloads.
     Real assessment happens in assessEnthaftung() above. */
  const level: RiskLevel = "mittel";
  const perRegulation = selectedRegulations.map((regId) => {
    const reg = REGULATIONS.find((r) => r.id === regId)!;
    return {
      regulation: reg,
      riskLevel: level,
      riskNote: `Prüfen Sie die Enthaftungs-Dokumentation für ${reg.name}.`,
    };
  });
  return {
    level,
    score: 50,
    color: "#d97706",
    bgColor: "#fffbeb",
    borderColor: "#fde68a",
    title: "Enthaftungs-Assessment abgeschlossen",
    description: "Details siehe Ergebnis-Bereich.",
    perRegulation,
    recommendations: [],
  };
}

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

const ACCENT = "#ef4444";
const TOTAL_STEPS = 4; // 0: Rechtsform, 1: Regulierungen, 2: Enthaftungs-Fragen, 3: Zusammenfassung

export default function HaftungsPrueferTool() {
  const { locale } = useTranslations();
  const { countryCode, countryData } = useCountry();
  const countryMeta = COUNTRY_META[countryCode];
  const [step, setStep] = useState(0);
  const [legalForm, setLegalForm] = useState<string | null>(null);
  const [selectedRegs, setSelectedRegs] = useState<string[]>([]);
  /* NEW: ratings per governance question (3-state instead of binary) */
  const [govRatings, setGovRatings] = useState<Record<string, GovernanceRating>>({});
  const [showResult, setShowResult] = useState(false);

  const toggleReg = useCallback((id: string) => {
    setSelectedRegs((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  }, []);

  const setGovRating = useCallback((qId: string, value: GovernanceRating) => {
    setGovRatings((prev) => ({ ...prev, [qId]: value }));
  }, []);

  const next = useCallback(() => {
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
    else setShowResult(true);
  }, [step]);

  const back = useCallback(() => {
    if (showResult) setShowResult(false);
    else if (step > 0) setStep((s) => s - 1);
  }, [step, showResult]);

  const restart = useCallback(() => {
    setStep(0);
    setLegalForm(null);
    setSelectedRegs([]);
    setGovRatings({});
    setShowResult(false);
  }, []);

  const canProceed =
    step === 0 ? legalForm !== null :
    step === 1 ? selectedRegs.length > 0 :
    true;
  const assessment = calculateRisk(selectedRegs); // legacy save compat (unused in new UI)
  void assessment;
  const enthaftung = assessEnthaftung(legalForm, govRatings);
  const progressPercent = showResult ? 100 : ((step + 1) / TOTAL_STEPS) * 100;
  const govAnsweredCount = Object.keys(govRatings).length;
  const govTotalQuestions = GOVERNANCE_QUESTIONS.length;

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
              <Link href={`/${locale}/haftungs-check`} className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors">GF-Haftung</Link>
              <span className="font-mono text-[11px] text-white/35">/</span>
              <span className="font-mono text-[11px] text-white/60">Haftungs-Prüfer</span>
            </nav>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-red-400/20 bg-red-400/10">
              <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <span className="text-red-300 text-xs font-mono font-semibold">Dauer: ca. 3 Minuten</span>
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-4">
              GF-Haftungs-Prüfer
            </h1>
            <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Wie hoch ist Ihr persönliches Haftungsrisiko als Geschäftsführer bei NIS2, DORA, AI Act und CRA?
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

        {/* Quiz */}
        <section className="pb-20" style={{ background: "linear-gradient(180deg, #f4f6fc 0%, #eef1fa 100%)" }}>
          <div className="max-w-2xl mx-auto px-6">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] text-[#7a8db0] uppercase tracking-wider">
                  {showResult ? "Ergebnis" : `Schritt ${step + 1} von ${TOTAL_STEPS}`}
                </span>
                <span className="font-mono text-[11px] font-bold" style={{ color: ACCENT }}>{Math.round(progressPercent)}%</span>
              </div>
              <div
                className="h-1.5 rounded-full bg-[#e0e5f0] overflow-hidden"
                role="progressbar"
                aria-valuenow={Math.round(progressPercent)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Fortschritt der Haftungsprüfung"
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${ACCENT}, #f87171)` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

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
                    {/* Step 0: Rechtsform */}
                    {step === 0 && (
                      <>
                        <StepHeader
                          number={1}
                          title="Welche Rechtsform hat Ihr Unternehmen?"
                          description="Die Haftungsregeln unterscheiden sich fundamental zwischen Kapitalgesellschaft, Personengesellschaft und Einzelunternehmen."
                        />
                        <div className="grid gap-2">
                          {LEGAL_FORMS.map((lf) => (
                            <button
                              key={lf.id}
                              onClick={() => setLegalForm(lf.id)}
                              className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-200 ${
                                legalForm === lf.id
                                  ? "border-red-400 bg-red-50/50 shadow-sm"
                                  : "border-[#e8ecf4] hover:border-[#c0c8e0] bg-white"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <span className="font-[Syne] font-bold text-[14px] text-[#060c1a]">{lf.label}</span>
                                  <span className="block text-[11px] text-[#7a8db0] leading-snug mt-0.5">{lf.description}</span>
                                </div>
                                <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  legalForm === lf.id ? "border-red-400 bg-red-500" : "border-[#d0d5e0]"
                                }`}>
                                  {legalForm === lf.id && (
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Step 1: Select regulations */}
                    {step === 1 && (
                      <>
                        <StepHeader
                          number={2}
                          title="Welche Regulierungen betreffen Ihr Unternehmen?"
                          description="Wählen Sie alle zutreffenden EU-Regulierungen. Falls Sie unsicher sind, wählen Sie alle aus."
                        />
                        <div className="grid gap-3">
                          {REGULATIONS.map((reg) => (
                            <button
                              key={reg.id}
                              onClick={() => toggleReg(reg.id)}
                              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                                selectedRegs.includes(reg.id)
                                  ? "border-red-400 bg-red-50/50 shadow-sm"
                                  : "border-[#e8ecf4] hover:border-[#c0c8e0] bg-white"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: reg.color }} />
                                  <div>
                                    <span className="font-[Syne] font-bold text-[14px] text-[#060c1a]">{reg.name}</span>
                                    <span className="block text-[11px] text-[#7a8db0]">{reg.fullName}</span>
                                  </div>
                                </div>
                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                  selectedRegs.includes(reg.id) ? "border-red-400 bg-red-500" : "border-[#d0d5e0]"
                                }`}>
                                  {selectedRegs.includes(reg.id) && (
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                              <div className="mt-2 ml-6 space-y-1 text-[11px] text-[#7a8db0]">
                                <div className="flex items-center gap-4">
                                  <span>Bußgeld: <strong className="text-[#3a4a6b]">{countryData?.regulations?.[reg.countryKey]?.nationalFines ?? reg.maxFine}</strong></span>
                                </div>
                                {countryData?.regulations?.[reg.countryKey]?.authority && countryMeta && (
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] leading-none">{countryMeta.flag}</span>
                                    <span className="text-[10px]">Aufsicht: {countryData.regulations[reg.countryKey]!.authority}</span>
                                  </div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setSelectedRegs(REGULATIONS.map((r) => r.id))}
                          className="mt-3 text-[12px] font-medium text-red-600 hover:text-red-700 transition-colors"
                        >
                          Alle auswählen
                        </button>
                      </>
                    )}

                    {/* Step 2: Enthaftungs-Dokumentation */}
                    {step === 2 && (
                      <>
                        <StepHeader
                          number={3}
                          title="Welche Enthaftungs-Nachweise liegen vor?"
                          description={`Das sind die Dokumente, die Anwälte im Haftungsfall sehen wollen. ${govAnsweredCount}/${govTotalQuestions} beantwortet.`}
                        />
                        {(["governance", "bjr", "do"] as const).map((cat) => {
                          const catQuestions = GOVERNANCE_QUESTIONS.filter((q) => q.category === cat);
                          const catTitle =
                            cat === "governance" ? "Governance-Dokumentation" :
                            cat === "bjr" ? "Business Judgment Rule (Enthaftung)" :
                            "D&O-Versicherung";
                          const catDesc =
                            cat === "governance" ? "Schriftliche Grundlagen der GF-Organisation" :
                            cat === "bjr" ? "4 Voraussetzungen der unternehmerischen Ermessensentscheidung" :
                            "Versicherungsschutz für die persönliche Haftung";
                          return (
                            <div key={cat} className="mb-5">
                              <div className="mb-2 flex items-baseline gap-2">
                                <h3 className="font-[Syne] font-bold text-[13px] text-[#060c1a]">{catTitle}</h3>
                                <span className="text-[10px] text-[#7a8db0]">— {catDesc}</span>
                              </div>
                              <div className="space-y-2">
                                {catQuestions.map((q) => {
                                  const val = govRatings[q.id];
                                  return (
                                    <div
                                      key={q.id}
                                      className={`p-3 rounded-xl border transition-all ${
                                        val ? "border-[#d8dff0] bg-[#f8f9fd]" : "border-[#e8ecf4] bg-white"
                                      }`}
                                    >
                                      <div className="mb-2">
                                        <div className="flex items-start gap-2">
                                          {q.criticality === "critical" && (
                                            <span className="inline-block mt-1 flex-shrink-0 text-[9px] px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-bold uppercase tracking-wider">Kritisch</span>
                                          )}
                                          <span className="font-[Syne] font-bold text-[12px] text-[#060c1a] leading-snug">
                                            {q.question}
                                          </span>
                                        </div>
                                        <span className="text-[11px] text-[#7a8db0] leading-relaxed block mt-1">
                                          {q.description}
                                        </span>
                                      </div>
                                      <div className="flex flex-wrap gap-1.5 mt-2">
                                        {(["vorhanden", "teilweise", "nicht_vorhanden"] as GovernanceRating[]).map((r) => {
                                          const isActive = val === r;
                                          const label =
                                            r === "vorhanden" ? "Ja, vollständig" :
                                            r === "teilweise" ? "Teilweise / in Arbeit" :
                                            "Nein / unsicher";
                                          const colorClass =
                                            isActive && r === "vorhanden" ? "bg-emerald-100 text-emerald-700 border-emerald-300" :
                                            isActive && r === "teilweise" ? "bg-amber-100 text-amber-700 border-amber-300" :
                                            isActive && r === "nicht_vorhanden" ? "bg-red-100 text-red-700 border-red-300" :
                                            "bg-[#f0f2f8] text-[#7a8db0] border-transparent hover:bg-slate-100";
                                          return (
                                            <button
                                              key={r}
                                              onClick={() => setGovRating(q.id, r)}
                                              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all border ${colorClass}`}
                                            >
                                              {label}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}

                    {/* Step 3: Summary */}
                    {step === 3 && (
                      <>
                        <StepHeader
                          number={4}
                          title="Zusammenfassung"
                          description="Prüfen Sie Ihre Angaben und klicken Sie auf 'Enthaftung prüfen'."
                        />
                        <div className="space-y-3 mb-6">
                          {enthaftung.legalForm && (
                            <div className="p-4 rounded-xl bg-[#f8f9fd] border border-[#e8ecf4]">
                              <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-1">Rechtsform</div>
                              <span className="font-[Syne] font-bold text-[14px] text-[#060c1a]">{enthaftung.legalForm.label}</span>
                              <span className="block text-[11px] text-[#7a8db0] mt-0.5">{enthaftung.legalForm.description}</span>
                            </div>
                          )}
                          <div className="p-4 rounded-xl bg-[#f8f9fd] border border-[#e8ecf4]">
                            <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-1">Betroffene Regulierungen</div>
                            <div className="flex flex-wrap gap-2">
                              {selectedRegs.map((id) => {
                                const reg = REGULATIONS.find((r) => r.id === id)!;
                                return (
                                  <span key={id} className="text-[11px] px-2.5 py-1 rounded-lg font-mono font-bold text-white" style={{ background: reg.color }}>
                                    {reg.name}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                          <div className="p-4 rounded-xl bg-[#f8f9fd] border border-[#e8ecf4]">
                            <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-1">Fragen beantwortet</div>
                            <span className="font-[Syne] font-bold text-[14px] text-[#060c1a]">{govAnsweredCount} von {govTotalQuestions}</span>
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-[#fff8e1] border border-[#f0e6c0]">
                          <div className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-[#b8960c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            <p className="text-[12px] text-[#8a7020] leading-relaxed">
                              <strong>Disclaimer:</strong> Dieses Tool bietet eine Einschätzung auf Basis Ihrer Selbstauskunft. Es ersetzt keine professionelle Rechtsberatung — konsultieren Sie einen auf Gesellschaftsrecht spezialisierten Anwalt.
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#e8ecf4]">
                      <button onClick={back} disabled={step === 0} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${step === 0 ? "text-[#c0c8d8] cursor-not-allowed" : "text-[#3a4a6b] hover:bg-[#f0f2f8]"}`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                        Zurück
                      </button>
                      <button onClick={next} disabled={!canProceed} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-[Syne] font-bold transition-all duration-300 ${canProceed ? "text-white hover:-translate-y-0.5 shadow-lg" : "bg-[#e0e5f0] text-[#a0a8b8] cursor-not-allowed"}`}
                        style={canProceed ? { background: `linear-gradient(135deg, ${ACCENT}, #f87171)`, boxShadow: `0 4px 16px ${ACCENT}40` } : undefined}
                      >
                        {step === TOTAL_STEPS - 1 ? "Enthaftung prüfen" : "Weiter"}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* ═══════════ RESULT ═══════════ */
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  aria-live="polite"
                  role="region"
                  aria-label="Ergebnis der Haftungsprüfung"
                >
                  {/* Header with level assessment */}
                  <div className="rounded-2xl border-2 p-6 sm:p-8 mb-6" style={{ background: enthaftung.bgColor, borderColor: enthaftung.borderColor }}>
                    <div className="mb-4">
                      <span className="text-[10px] px-2.5 py-1 rounded-lg font-mono font-bold tracking-wide text-white mb-2 inline-block" style={{ background: enthaftung.color }}>
                        ENTHAFTUNGS-ASSESSMENT
                      </span>
                      <h2 className="font-[Syne] font-extrabold text-xl sm:text-2xl text-[#060c1a] leading-tight">
                        {enthaftung.levelTitle}
                      </h2>
                    </div>
                    <p className="text-[14px] text-[#3a4a6b] leading-relaxed">{enthaftung.levelDescription}</p>
                  </div>

                  {/* Rechtsform-spezifischer Hinweis */}
                  {enthaftung.legalForm && (
                    <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 mb-6">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-[Syne] font-bold text-[15px] text-[#060c1a]">
                          Haftungsregime Ihrer Rechtsform
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-[#f0f2f8] text-[#3a4a6b]">
                          {enthaftung.legalForm.label}
                        </span>
                      </div>
                      <p className="text-[13px] text-[#3a4a6b] leading-relaxed mb-2">
                        {enthaftung.legalFormNote}
                      </p>
                      <p className="text-[11px] text-[#7a8db0] font-mono">
                        Kern-Statuten: {enthaftung.legalForm.keyStatutes}
                      </p>
                    </div>
                  )}

                  {/* Business Judgment Rule Status */}
                  <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 mb-6">
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <h3 className="font-[Syne] font-bold text-[15px] text-[#060c1a]">
                        Business Judgment Rule — Enthaftungs-Check
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`w-5 h-1.5 rounded-full ${i <= enthaftung.bjrScore ? "" : "bg-[#e0e5f0]"}`}
                              style={i <= enthaftung.bjrScore ? { background: enthaftung.color } : {}}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-mono font-bold" style={{ color: enthaftung.color }}>
                          {enthaftung.bjrScore}/4
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#7a8db0] mb-3">
                      Die Business Judgment Rule schützt vor Haftung, wenn alle 4 Voraussetzungen dokumentiert erfüllt sind.
                    </p>
                    {enthaftung.bjrMetRequirements.length > 0 && (
                      <div className="mb-3">
                        <div className="font-mono text-[10px] text-emerald-700 uppercase tracking-wider mb-1.5">✓ Erfüllt</div>
                        <ul className="space-y-1">
                          {enthaftung.bjrMetRequirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-[12px] text-[#3a4a6b]">
                              <span className="text-emerald-600 flex-shrink-0">✓</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {enthaftung.bjrMissingRequirements.length > 0 && (
                      <div>
                        <div className="font-mono text-[10px] text-red-700 uppercase tracking-wider mb-1.5">✗ Nicht erfüllt / offen</div>
                        <ul className="space-y-1">
                          {enthaftung.bjrMissingRequirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-[12px] text-[#3a4a6b]">
                              <span className="text-red-600 flex-shrink-0">✗</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Kritische Lücken — was fehlt im Haftungsfall */}
                  {enthaftung.criticalGaps.length > 0 && (
                    <div className="rounded-2xl border-2 border-red-200 bg-red-50/50 p-6 mb-6">
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        <h3 className="font-[Syne] font-bold text-[15px] text-[#060c1a]">
                          Was Ihnen im Haftungsfall fehlen würde
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-red-600 text-white">
                          {enthaftung.criticalGaps.length} kritisch
                        </span>
                      </div>
                      <p className="text-[12px] text-red-800 mb-4">
                        Das sind die Dokumente, die Anwälte im Haftungsfall als erstes anfordern. Ohne sie: erhöhte persönliche Haftung.
                      </p>
                      <div className="space-y-3">
                        {enthaftung.criticalGaps.map((gap, i) => (
                          <div key={i} className="bg-white rounded-xl p-4 border border-red-100">
                            <div className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-700 text-[11px] font-bold flex items-center justify-center">
                                {i + 1}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="font-[Syne] font-bold text-[13px] text-[#060c1a] mb-1">
                                  {gap.question.question}
                                </p>
                                <p className="text-[11px] text-[#7a8db0] mb-2 leading-snug">
                                  <strong className="text-[#3a4a6b]">Was fehlt:</strong> {gap.question.evidence}
                                </p>
                                <p className="text-[11px] text-[#3a4a6b] leading-snug italic">
                                  {gap.question.whyItMatters}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Wichtige, nicht-kritische Lücken */}
                  {enthaftung.importantGaps.length > 0 && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/30 p-6 mb-6">
                      <h3 className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-3">
                        Weitere empfohlene Dokumente
                      </h3>
                      <ul className="space-y-2">
                        {enthaftung.importantGaps.map((gap, i) => (
                          <li key={i} className="flex items-start gap-2 text-[12px] text-[#3a4a6b]">
                            <span className="text-amber-600 flex-shrink-0">›</span>
                            <div>
                              <strong>{gap.question.evidence}</strong> — {gap.question.whyItMatters}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Vorhandene Dokumente (positive reinforcement) */}
                  {enthaftung.existingDocs.length > 0 && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-6 mb-6">
                      <h3 className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-3">
                        Ihre bestehenden Nachweise
                      </h3>
                      <ul className="space-y-1.5">
                        {enthaftung.existingDocs.map((gap, i) => (
                          <li key={i} className="flex items-start gap-2 text-[12px] text-[#3a4a6b]">
                            <span className="text-emerald-600 flex-shrink-0">✓</span>
                            <span>{gap.question.evidence}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Regulierungs-Kontext */}
                  {selectedRegs.length > 0 && (
                    <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 mb-6">
                      <h3 className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-3">
                        Haftungsgrundlagen der gewählten Regulierungen
                      </h3>
                      <div className="space-y-2">
                        {selectedRegs.map((id) => {
                          const reg = REGULATIONS.find((r) => r.id === id);
                          if (!reg) return null;
                          const regData = countryData?.regulations?.[reg.countryKey];
                          return (
                            <div key={id} className="flex items-start gap-3 p-3 rounded-xl bg-[#f8f9fd] border border-[#e8ecf4]">
                              <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5" style={{ background: reg.color }} />
                              <div className="flex-1 min-w-0">
                                <span className="font-[Syne] font-bold text-[13px] text-[#060c1a]">{reg.name}</span>
                                <p className="text-[11px] text-[#3a4a6b] leading-relaxed mt-0.5">
                                  <strong>Haftungsbasis:</strong> {reg.liabilityBasis}
                                </p>
                                <p className="text-[11px] text-[#7a8db0] mt-0.5">
                                  Bußgeld: {regData?.nationalFines ?? reg.maxFine}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Cross-links */}
                  <div className="mb-6">
                    <ToolNextSteps
                      currentTool="haftungs-pruefer"
                      dark={false}
                      subtext="Haftungsrisiken kennen Sie nun. Analysieren Sie Ihre Compliance-Situation weiter:"
                    />
                  </div>

                  {/* Save Evaluation */}
                  <div className="mb-6 flex justify-center">
                    <SaveEvaluationButton
                      toolId="haftungs-pruefer"
                      toolName="Haftungs-Prüfer"
                      inputs={{
                        legalForm: legalForm,
                        selectedRegulations: selectedRegs,
                        governanceRatings: govRatings,
                      }}
                      results={{
                        level: enthaftung.level,
                        levelTitle: enthaftung.levelTitle,
                        bjrScore: enthaftung.bjrScore,
                        bjrMax: 4,
                        criticalGapsCount: enthaftung.criticalGaps.length,
                        importantGapsCount: enthaftung.importantGaps.length,
                        existingDocsCount: enthaftung.existingDocs.length,
                        criticalGaps: enthaftung.criticalGaps.map((g) => g.question.evidence),
                      }}
                      summary={`${enthaftung.levelTitle} — BJR ${enthaftung.bjrScore}/4 · ${enthaftung.criticalGaps.length} kritische Lücken`}
                    />
                  </div>

                  {/* Lead Capture */}
                  <div className="mb-6">
                    <LeadCaptureForm
                      sourceTool="haftungs-pruefer"
                      toolResults={{
                        score: assessment.score,
                        level: assessment.level,
                        title: assessment.title,
                        regulations: selectedRegs,
                      }}
                      accent="#ef4444"
                      title="Haftungs-Analyse per E-Mail erhalten"
                      subtitle="Ihre Risikobewertung als Zusammenfassung — plus Updates bei relevanten Haftungsänderungen."
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button onClick={restart} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#3a4a6b] hover:bg-white transition-all">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" /></svg>
                      Erneut prüfen
                    </button>
                    <button
                      onClick={() => {
                        if (typeof navigator !== "undefined" && navigator.share) {
                          navigator.share({ title: "GF-Haftungs-Prüfer", text: "Wie hoch ist Ihr Haftungsrisiko als GF?", url: window.location.href });
                        } else if (typeof navigator !== "undefined") {
                          navigator.clipboard.writeText(window.location.href);
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#3a4a6b] hover:bg-white transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
                      Teilen
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

/* ═══════════════════════════════════════════════════════════ */

function StepHeader({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold text-white" style={{ background: ACCENT }}>{number}</span>
        <h2 className="font-[Syne] font-bold text-lg text-[#060c1a]">{title}</h2>
      </div>
      <p className="text-[13px] text-[#7a8db0] leading-relaxed ml-8">{description}</p>
    </div>
  );
}
