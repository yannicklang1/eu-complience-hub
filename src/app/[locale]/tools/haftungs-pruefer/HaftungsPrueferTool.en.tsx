"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolNextSteps from "@/components/ToolNextSteps";
import { useTranslations } from "@/i18n/use-translations";

const LeadCaptureForm = dynamic(() => import("@/components/LeadCaptureForm"), {
  ssr: false,
});

/* ═══════════════════════════════════════════════════════════
   DATA: Regulations & risk factors
   ═══════════════════════════════════════════════════════════ */

interface Regulation {
  id: string;
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
    name: "NIS2 / NISG",
    fullName: "NIS2 Directive / NISG 2026",
    color: "#0ea5e9",
    maxFine: "EUR 10M / 2% of turnover",
    liabilityBasis: "Art. 20 NIS2 \u2014 Management bodies bear responsibility",
    guideUrl: "/nisg-2026",
  },
  {
    id: "dora",
    name: "DORA",
    fullName: "Digital Operational Resilience Act",
    color: "#10b981",
    maxFine: "Up to 1% of daily net turnover",
    liabilityBasis: "Art. 5 DORA \u2014 Management body responsibility",
    guideUrl: "/dora",
  },
  {
    id: "aiact",
    name: "AI Act",
    fullName: "EU AI Regulation",
    color: "#0A2540",
    maxFine: "EUR 35M / 7% of turnover",
    liabilityBasis: "Art. 4 AI Act \u2014 AI competence at management level",
    guideUrl: "/eu-ai-act",
  },
  {
    id: "cra",
    name: "CRA",
    fullName: "Cyber Resilience Act",
    color: "#8b5cf6",
    maxFine: "EUR 15M / 2.5% of turnover",
    liabilityBasis: "Product liability + company law duty of care",
    guideUrl: "/cra",
  },
];

interface RiskQuestion {
  id: string;
  question: string;
  description: string;
  weight: number; // 1-3 risk weight
  inverse?: boolean; // true = "Yes" reduces risk
}

const RISK_QUESTIONS: RiskQuestion[] = [
  {
    id: "documented_compliance",
    question: "Is there a documented compliance management system?",
    description: "Formalised policies, processes and responsibilities for cybersecurity and regulatory compliance.",
    weight: 3,
    inverse: true,
  },
  {
    id: "ciso_appointed",
    question: "Is there a CISO or IT security officer?",
    description: "A dedicated person (internal or external) responsible for information security.",
    weight: 2,
    inverse: true,
  },
  {
    id: "gf_training",
    question: "Have you completed a cybersecurity training as a director?",
    description: "NIS2 Art. 20 and AI Act Art. 4 explicitly require management-level training.",
    weight: 3,
    inverse: true,
  },
  {
    id: "risk_assessment",
    question: "Has a formal risk assessment been conducted?",
    description: "Systematic evaluation of IT risks, documented and regularly updated.",
    weight: 2,
    inverse: true,
  },
  {
    id: "incident_plan",
    question: "Does an incident response plan exist?",
    description: "Documented emergency plan for cybersecurity incidents with reporting chains and responsibilities.",
    weight: 2,
    inverse: true,
  },
  {
    id: "dando",
    question: "Do you have D&O insurance?",
    description: "Directors & Officers insurance with cyber coverage and compliance extension.",
    weight: 1,
    inverse: true,
  },
  {
    id: "no_budget",
    question: "Is there no dedicated IT security budget?",
    description: "No fixed budget or less than 5% of the IT budget allocated to security.",
    weight: 2,
    inverse: false,
  },
  {
    id: "supplier_mgmt",
    question: "Are IT service providers and suppliers regularly reviewed?",
    description: "Contractual security requirements, audits and supply chain security assessments.",
    weight: 2,
    inverse: true,
  },
];

/* ═══════════════════════════════════════════════════════════
   ASSESSMENT LOGIC
   ═══════════════════════════════════════════════════════════ */

type RiskLevel = "high" | "medium" | "low";

interface RiskAssessment {
  level: RiskLevel;
  score: number; // 0-100 (higher = more risk)
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
  answers: Record<string, boolean>,
): RiskAssessment {
  // Calculate raw risk score based on answers
  let riskPoints = 0;
  let maxPoints = 0;

  RISK_QUESTIONS.forEach((q) => {
    maxPoints += q.weight * 3;
    const answered = answers[q.id];
    if (answered === undefined) return;

    if (q.inverse) {
      // "Yes" reduces risk
      riskPoints += answered ? 0 : q.weight * 3;
    } else {
      // "Yes" increases risk
      riskPoints += answered ? q.weight * 3 : 0;
    }
  });

  // More regulations = more exposure
  const regulationMultiplier = 1 + (selectedRegulations.length - 1) * 0.15;
  const rawScore = maxPoints > 0 ? (riskPoints / maxPoints) * 100 : 50;
  const score = Math.min(100, Math.round(rawScore * regulationMultiplier));

  const level: RiskLevel = score >= 65 ? "high" : score >= 35 ? "medium" : "low";

  const perRegulation = selectedRegulations.map((regId) => {
    const reg = REGULATIONS.find((r) => r.id === regId)!;
    // Slightly vary per regulation
    const regRiskLevel: RiskLevel =
      score >= 60 ? "high" : score >= 30 ? "medium" : "low";

    let riskNote = "";
    if (regRiskLevel === "high") {
      riskNote = `High liability risk: ${reg.liabilityBasis}. Fine up to ${reg.maxFine}.`;
    } else if (regRiskLevel === "medium") {
      riskNote = `Medium risk: Basic measures in place, but gaps in ${reg.name}-specific requirements.`;
    } else {
      riskNote = `Low residual risk: Solid foundation in place. Regular review recommended.`;
    }

    return { regulation: reg, riskLevel: regRiskLevel, riskNote };
  });

  // Generate recommendations
  const recommendations: string[] = [];
  if (!answers.documented_compliance) {
    recommendations.push("Establish a documented compliance management system with clear responsibilities.");
  }
  if (!answers.gf_training) {
    recommendations.push("Complete a cybersecurity training \u2014 NIS2 Art. 20 and AI Act Art. 4 explicitly require this from management.");
  }
  if (!answers.ciso_appointed) {
    recommendations.push("Appoint a CISO or external IT security officer.");
  }
  if (!answers.risk_assessment) {
    recommendations.push("Conduct a formal IT risk assessment and document the results.");
  }
  if (!answers.incident_plan) {
    recommendations.push("Create an incident response plan with 24h/72h reporting chains (NIS2 requirement).");
  }
  if (!answers.dando) {
    recommendations.push("Consider D&O insurance with cyber compliance coverage.");
  }
  if (answers.no_budget) {
    recommendations.push("Define a dedicated IT security budget (recommendation: at least 10\u201315% of IT budget).");
  }
  if (!answers.supplier_mgmt) {
    recommendations.push("Implement supplier risk management with contractual security requirements.");
  }

  if (recommendations.length === 0) {
    recommendations.push("Your foundation is solid. Conduct regular reviews and keep training up to date.");
  }

  return {
    level,
    score,
    color: level === "high" ? "#dc2626" : level === "medium" ? "#d97706" : "#059669",
    bgColor: level === "high" ? "#fef2f2" : level === "medium" ? "#fffbeb" : "#ecfdf5",
    borderColor: level === "high" ? "#fecaca" : level === "medium" ? "#fde68a" : "#a7f3d0",
    title: level === "high" ? "High Liability Risk" : level === "medium" ? "Medium Liability Risk" : "Low Liability Risk",
    description:
      level === "high"
        ? "Your current setup has significant gaps. As a director, you are personally and unlimitedly liable."
        : level === "medium"
        ? "You have taken basic measures, but there are still relevant gaps in your compliance setup."
        : "You have built a solid compliance foundation. Nevertheless, you should review and update regularly.",
    perRegulation,
    recommendations,
  };
}

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

const ACCENT = "#ef4444";
const TOTAL_STEPS = 3;

export default function HaftungsPrueferTool() {
  const { locale } = useTranslations();
  const [step, setStep] = useState(0);
  const [selectedRegs, setSelectedRegs] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const toggleReg = useCallback((id: string) => {
    setSelectedRegs((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  }, []);

  const setAnswer = useCallback((qId: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
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
    setSelectedRegs([]);
    setAnswers({});
    setShowResult(false);
  }, []);

  const canProceed = step === 0 ? selectedRegs.length > 0 : true;
  const assessment = calculateRisk(selectedRegs, answers);
  const progressPercent = showResult ? 100 : ((step + 1) / TOTAL_STEPS) * 100;
  const answeredCount = Object.keys(answers).length;

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
              <Link href={`/${locale}/haftungs-check`} className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors">Director Liability</Link>
              <span className="font-mono text-[11px] text-white/35">/</span>
              <span className="font-mono text-[11px] text-white/60">Liability Assessment</span>
            </nav>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-red-400/20 bg-red-400/10">
              <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <span className="text-red-300 text-xs font-mono font-semibold">Duration: approx. 3 minutes</span>
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-4">
              Director Liability Assessment
            </h1>
            <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              How high is your personal liability risk as a director under NIS2, DORA, AI Act and CRA?
            </p>
          </div>
        </section>

        {/* Quiz */}
        <section className="pb-20" style={{ background: "linear-gradient(180deg, #f4f6fc 0%, #eef1fa 100%)" }}>
          <div className="max-w-2xl mx-auto px-6">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] text-[#7a8db0] uppercase tracking-wider">
                  {showResult ? "Result" : `Step ${step + 1} of ${TOTAL_STEPS}`}
                </span>
                <span className="font-mono text-[11px] font-bold" style={{ color: ACCENT }}>{Math.round(progressPercent)}%</span>
              </div>
              <div
                className="h-1.5 rounded-full bg-[#e0e5f0] overflow-hidden"
                role="progressbar"
                aria-valuenow={Math.round(progressPercent)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Liability assessment progress"
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
                    {/* Step 0: Select regulations */}
                    {step === 0 && (
                      <>
                        <StepHeader
                          number={1}
                          title="Which regulations apply to your company?"
                          description="Select all applicable EU regulations. If unsure, select all."
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
                              <div className="mt-2 ml-6 flex items-center gap-4 text-[11px] text-[#7a8db0]">
                                <span>Fine: <strong className="text-[#3a4a6b]">{reg.maxFine}</strong></span>
                              </div>
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setSelectedRegs(REGULATIONS.map((r) => r.id))}
                          className="mt-3 text-[12px] font-medium text-red-600 hover:text-red-700 transition-colors"
                        >
                          Select all
                        </button>
                      </>
                    )}

                    {/* Step 1: Risk Questions */}
                    {step === 1 && (
                      <>
                        <StepHeader
                          number={2}
                          title="Assess your current setup"
                          description={`Answer the following ${RISK_QUESTIONS.length} questions honestly. ${answeredCount}/${RISK_QUESTIONS.length} answered.`}
                        />
                        <div className="space-y-3">
                          {RISK_QUESTIONS.map((q) => (
                            <div
                              key={q.id}
                              className={`p-4 rounded-xl border transition-all ${
                                answers[q.id] !== undefined
                                  ? "border-[#d8dff0] bg-[#f8f9fd]"
                                  : "border-[#e8ecf4] bg-white"
                              }`}
                            >
                              <div className="mb-2">
                                <span className="font-[Syne] font-bold text-[13px] text-[#060c1a] leading-snug block">
                                  {q.question}
                                </span>
                                <span className="text-[11px] text-[#7a8db0] leading-relaxed block mt-0.5">
                                  {q.description}
                                </span>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <button
                                  onClick={() => setAnswer(q.id, true)}
                                  className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-all ${
                                    answers[q.id] === true
                                      ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                                      : "bg-[#f0f2f8] text-[#7a8db0] border border-transparent hover:bg-emerald-50 hover:text-emerald-600"
                                  }`}
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setAnswer(q.id, false)}
                                  className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-all ${
                                    answers[q.id] === false
                                      ? "bg-red-100 text-red-700 border border-red-300"
                                      : "bg-[#f0f2f8] text-[#7a8db0] border border-transparent hover:bg-red-50 hover:text-red-600"
                                  }`}
                                >
                                  No
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Step 2: Summary */}
                    {step === 2 && (
                      <>
                        <StepHeader
                          number={3}
                          title="Summary"
                          description="Review your details and click 'Calculate Risk'."
                        />
                        <div className="space-y-3 mb-6">
                          <div className="p-4 rounded-xl bg-[#f8f9fd] border border-[#e8ecf4]">
                            <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-1">Applicable Regulations</div>
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
                            <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-1">Questions Answered</div>
                            <span className="font-[Syne] font-bold text-[14px] text-[#060c1a]">{answeredCount} of {RISK_QUESTIONS.length}</span>
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-[#fff8e1] border border-[#f0e6c0]">
                          <div className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-[#b8960c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            <p className="text-[12px] text-[#8a7020] leading-relaxed">
                              <strong>Disclaimer:</strong> This tool provides an initial assessment. It does not replace professional legal advice.
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#e8ecf4]">
                      <button onClick={back} disabled={step === 0} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${step === 0 ? "text-[#c0c8d8] cursor-not-allowed" : "text-[#3a4a6b] hover:bg-[#f0f2f8]"}`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                        Back
                      </button>
                      <button onClick={next} disabled={!canProceed} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-[Syne] font-bold transition-all duration-300 ${canProceed ? "text-white hover:-translate-y-0.5 shadow-lg" : "bg-[#e0e5f0] text-[#a0a8b8] cursor-not-allowed"}`}
                        style={canProceed ? { background: `linear-gradient(135deg, ${ACCENT}, #f87171)`, boxShadow: `0 4px 16px ${ACCENT}40` } : undefined}
                      >
                        {step === TOTAL_STEPS - 1 ? "Calculate Risk" : "Next"}
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
                  aria-label="Liability assessment result"
                >
                  {/* Score Card */}
                  <div className="rounded-2xl border-2 p-6 sm:p-8 mb-6" style={{ background: assessment.bgColor, borderColor: assessment.borderColor }}>
                    <div className="flex items-center gap-4 mb-6">
                      {/* Risk Score Circle */}
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                          <circle cx="40" cy="40" r="34" fill="none" stroke="#e0e5f0" strokeWidth="6" />
                          <circle
                            cx="40" cy="40" r="34"
                            fill="none"
                            stroke={assessment.color}
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={`${(assessment.score / 100) * 213.6} 213.6`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-[Syne] font-extrabold text-xl" style={{ color: assessment.color }}>
                            {assessment.score}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] px-2.5 py-1 rounded-lg font-mono font-bold tracking-wide text-white mb-1 inline-block" style={{ background: assessment.color }}>
                          {assessment.level.toUpperCase()}
                        </span>
                        <h2 className="font-[Syne] font-extrabold text-xl sm:text-2xl text-[#060c1a] leading-tight">
                          {assessment.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">{assessment.description}</p>

                    {/* Per-regulation breakdown */}
                    {assessment.perRegulation.length > 0 && (
                      <div className="space-y-2 mb-6">
                        <h3 className="font-[Syne] font-bold text-[14px] text-[#060c1a] mb-2">Risk per Regulation</h3>
                        {assessment.perRegulation.map(({ regulation, riskLevel, riskNote }) => (
                          <div key={regulation.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/80 border border-white">
                            <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5" style={{ background: regulation.color }} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="font-[Syne] font-bold text-[13px] text-[#060c1a]">{regulation.name}</span>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-mono font-bold ${
                                  riskLevel === "high" ? "bg-red-100 text-red-700" : riskLevel === "medium" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                                }`}>{riskLevel.toUpperCase()}</span>
                              </div>
                              <p className="text-[12px] text-[#7a8db0] leading-relaxed">{riskNote}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Recommendations */}
                    <div>
                      <h3 className="font-[Syne] font-bold text-[14px] text-[#060c1a] mb-3">Recommendations</h3>
                      <div className="space-y-2">
                        {assessment.recommendations.map((rec, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-mono font-bold text-white" style={{ background: assessment.color }}>
                              {i + 1}
                            </div>
                            <span className="text-[13px] text-[#3a4a6b] leading-relaxed">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cross-links */}
                  <div className="mb-6">
                    <ToolNextSteps
                      currentTool="haftungs-pruefer"
                      dark={false}
                      subtext="Now that you know your liability risks, analyse your compliance situation further:"
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
                      title="Receive Liability Analysis by Email"
                      subtitle="Your risk assessment as a summary \u2014 plus updates on relevant liability changes."
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button onClick={restart} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#3a4a6b] hover:bg-white transition-all">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" /></svg>
                      Check Again
                    </button>
                    <button
                      onClick={() => {
                        if (typeof navigator !== "undefined" && navigator.share) {
                          navigator.share({ title: "Director Liability Assessment", text: "How high is your liability risk as a director?", url: window.location.href });
                        } else if (typeof navigator !== "undefined") {
                          navigator.clipboard.writeText(window.location.href);
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#3a4a6b] hover:bg-white transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
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
