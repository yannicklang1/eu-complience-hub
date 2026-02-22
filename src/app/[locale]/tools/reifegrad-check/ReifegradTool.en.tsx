"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolNextSteps from "@/components/ToolNextSteps";
import { useTranslations } from "@/i18n/use-translations";
import { useCountry } from "@/i18n/country-context";
import { COUNTRY_META } from "@/i18n/country";

/* ══════════════════════════════════════════════════════════════
   Compliance Maturity Check — Self-Assessment Tool (EN)
   Rates company compliance maturity across 5 categories
   ══════════════════════════════════════════════════════════════ */

interface Category {
  id: string;
  title: string;
  icon: string;
  color: string;
  questions: { id: string; text: string }[];
}

const CATEGORIES: Category[] = [
  {
    id: "governance",
    title: "Governance & Organisation",
    icon: "\u{1F3DB}\uFE0F",
    color: "#6366f1",
    questions: [
      { id: "g1", text: "There is a clearly defined compliance responsibility (person/department)" },
      { id: "g2", text: "Senior management is regularly informed about compliance topics" },
      { id: "g3", text: "A documented compliance management system (CMS) exists" },
      { id: "g4", text: "Compliance policies are accessible to all employees" },
      { id: "g5", text: "There is a dedicated budget for compliance measures" },
    ],
  },
  {
    id: "datenschutz",
    title: "Data Protection (GDPR)",
    icon: "\u{1F512}",
    color: "#2563eb",
    questions: [
      { id: "d1", text: "A record of processing activities (Art. 30 GDPR) is maintained and up to date" },
      { id: "d2", text: "Data protection impact assessments are conducted when required" },
      { id: "d3", text: "There is a process for data subject requests (access, erasure, etc.)" },
      { id: "d4", text: "Data processing agreements (DPAs) are in place with all service providers" },
      { id: "d5", text: "Data breaches are reported within 72 hours" },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity (NIS2/CRA)",
    icon: "\u{1F6E1}\uFE0F",
    color: "#dc2626",
    questions: [
      { id: "c1", text: "An ISMS (e.g. ISO 27001) is implemented or being planned" },
      { id: "c2", text: "Regular risk assessments for IT systems are conducted" },
      { id: "c3", text: "A documented incident response plan exists" },
      { id: "c4", text: "Employees receive regular IT security training" },
      { id: "c5", text: "Supply chain risks are systematically assessed" },
    ],
  },
  {
    id: "ki-compliance",
    title: "AI & Technology (AI Act)",
    icon: "\u{1F916}",
    color: "#7c3aed",
    questions: [
      { id: "k1", text: "AI systems in use are inventoried and classified" },
      { id: "k2", text: "Policies for responsible AI use are in place" },
      { id: "k3", text: "Human oversight of AI decisions is ensured" },
      { id: "k4", text: "Affected individuals are informed about AI use" },
      { id: "k5", text: "AI systems are tested for bias and discrimination" },
    ],
  },
  {
    id: "reporting",
    title: "Reporting & Documentation",
    icon: "\u{1F4CA}",
    color: "#16a34a",
    questions: [
      { id: "r1", text: "Compliance measures are documented and stored in a traceable manner" },
      { id: "r2", text: "Sustainability/ESG reporting is established or being planned" },
      { id: "r3", text: "Regular internal audits are conducted" },
      { id: "r4", text: "A whistleblowing system is in place" },
      { id: "r5", text: "Compliance training is documented and its effectiveness is reviewed" },
    ],
  },
];

type Rating = 0 | 1 | 2 | 3; // 0=n/a, 1=not, 2=partial, 3=fully
const RATING_LABELS: Record<Rating, string> = {
  0: "Not applicable",
  1: "Not implemented",
  2: "Partially implemented",
  3: "Fully implemented",
};
const RATING_COLORS: Record<Rating, string> = {
  0: "#64748b",
  1: "#ef4444",
  2: "#f59e0b",
  3: "#10b981",
};

/* ── Scoring ── */
function calculateResults(ratings: Record<string, Rating>) {
  return CATEGORIES.map((cat) => {
    const applicable = cat.questions.filter((q) => (ratings[q.id] ?? 0) !== 0);
    if (applicable.length === 0) return { ...cat, score: 0, maxScore: 0, percentage: 0 };
    const score = applicable.reduce((sum, q) => sum + ((ratings[q.id] ?? 0) as number), 0);
    const maxScore = applicable.length * 3;
    return { ...cat, score, maxScore, percentage: Math.round((score / maxScore) * 100) };
  });
}

function getOverallGrade(percentage: number): { label: string; color: string; description: string } {
  if (percentage >= 80) return { label: "A \u2013 Exemplary", color: "#10b981", description: "Your company is excellently positioned. Focus on continuous improvement and stay up to date with regulatory changes." };
  if (percentage >= 60) return { label: "B \u2013 Advanced", color: "#3b82f6", description: "A solid foundation is in place. Close the remaining gaps systematically and document all measures." };
  if (percentage >= 40) return { label: "C \u2013 Basic", color: "#f59e0b", description: "Initial measures are implemented, but there is significant need for action. Prioritise the areas with the lowest score." };
  if (percentage >= 20) return { label: "D \u2013 Beginner", color: "#f97316", description: "Considerable compliance gaps exist. Start with the most critical regulations (GDPR, NIS2 if applicable) and build up step by step." };
  return { label: "E \u2013 Critical", color: "#ef4444", description: "Urgent action needed. The risk of fines and liability is high. Seek professional advice and start with fundamental measures immediately." };
}

/* ═══════════════════════ Component ═══════════════════════ */

export default function ReifegradTool() {
  const { locale } = useTranslations();
  const { countryCode } = useCountry();
  const countryMeta = COUNTRY_META[countryCode];
  const [ratings, setRatings] = useState<Record<string, Rating>>({});
  const [showResults, setShowResults] = useState(false);
  const [activeCat, setActiveCat] = useState(0);

  const currentCat = CATEGORIES[activeCat];
  const answeredCount = Object.keys(ratings).length;
  const totalQuestions = CATEGORIES.reduce((sum, c) => sum + c.questions.length, 0);
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  const results = useMemo(() => calculateResults(ratings), [ratings]);
  const overallPercentage = useMemo(() => {
    const applicableResults = results.filter((r) => r.maxScore > 0);
    if (applicableResults.length === 0) return 0;
    const totalScore = applicableResults.reduce((s, r) => s + r.score, 0);
    const totalMax = applicableResults.reduce((s, r) => s + r.maxScore, 0);
    return totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
  }, [results]);
  const grade = useMemo(() => getOverallGrade(overallPercentage), [overallPercentage]);

  const setRating = (qId: string, value: Rating) => {
    setRatings((prev) => ({ ...prev, [qId]: value }));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#060c1a]">
        {/* Hero */}
        <section className="relative pt-32 pb-8 overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 flex-wrap mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-400/10 border border-indigo-400/20">
                <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
                <span className="text-xs font-semibold text-indigo-400">Self-Assessment</span>
              </div>
              {countryMeta && (
                <div className="flex items-center gap-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] px-2.5 py-1">
                  <span className="text-sm leading-none">{countryMeta.flag}</span>
                  <span className="font-mono text-[10px] text-white/60 font-medium">{countryMeta.nameDE}</span>
                </div>
              )}
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              Compliance
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent"> Maturity</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Assess your company&apos;s compliance maturity across 5 categories and receive actionable recommendations.
            </p>
          </div>
        </section>

        {/* Progress */}
        <div className="max-w-2xl mx-auto px-6 mb-6">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>{answeredCount} of {totalQuestions} questions answered</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }}
            />
          </div>
        </div>

        <section className="pb-20 px-6">
          <div className="max-w-2xl mx-auto">
            {!showResults ? (
              <>
                {/* Category Tabs */}
                <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
                  {CATEGORIES.map((cat, i) => {
                    const catAnswered = cat.questions.filter((q) => ratings[q.id] !== undefined).length;
                    const isComplete = catAnswered === cat.questions.length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCat(i)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                          activeCat === i
                            ? "bg-white/10 text-white border border-white/10"
                            : "text-slate-500 hover:text-slate-300 border border-transparent"
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span className="hidden sm:inline">{cat.title.split(" ")[0]}</span>
                        {isComplete && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                      </button>
                    );
                  })}
                </div>

                {/* Questions */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCat.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl">{currentCat.icon}</span>
                        <div>
                          <h2 className="font-[Syne] font-bold text-lg text-white">{currentCat.title}</h2>
                          <p className="text-xs text-slate-500">Rate each statement for your company</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {currentCat.questions.map((q) => (
                          <div key={q.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                            <p className="text-sm text-slate-300 mb-3">{q.text}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {([3, 2, 1, 0] as Rating[]).map((val) => {
                                const isSelected = ratings[q.id] === val;
                                return (
                                  <button
                                    key={val}
                                    onClick={() => setRating(q.id, val)}
                                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
                                      isSelected
                                        ? "text-white"
                                        : "text-slate-500 border-white/5 hover:border-white/10"
                                    }`}
                                    style={isSelected ? { background: `${RATING_COLORS[val]}25`, borderColor: `${RATING_COLORS[val]}50`, color: RATING_COLORS[val] } : {}}
                                  >
                                    {RATING_LABELS[val]}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Nav */}
                      <div className="flex items-center justify-between mt-6">
                        <button
                          onClick={() => setActiveCat((p) => Math.max(0, p - 1))}
                          disabled={activeCat === 0}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white transition disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                        >
                          &larr; Back
                        </button>
                        {activeCat < CATEGORIES.length - 1 ? (
                          <button
                            onClick={() => setActiveCat((p) => p + 1)}
                            className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-white/10 hover:bg-white/15 transition cursor-pointer"
                          >
                            Next &rarr;
                          </button>
                        ) : (
                          <button
                            onClick={() => setShowResults(true)}
                            disabled={answeredCount === 0}
                            className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-900 transition disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                            style={{ background: "linear-gradient(135deg, #FACC15, #EAB308)", boxShadow: answeredCount > 0 ? "0 8px 32px rgba(250,204,21,0.3)" : "none" }}
                          >
                            Show Results
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </>
            ) : (
              /* Results */
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                {/* Overall Grade */}
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 text-center mb-6">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Your Compliance Maturity</p>
                  <div className="w-24 h-24 rounded-full border-4 flex items-center justify-center mx-auto mb-4" style={{ borderColor: grade.color }}>
                    <span className="font-[Syne] font-extrabold text-3xl" style={{ color: grade.color }}>{overallPercentage}%</span>
                  </div>
                  <h2 className="font-[Syne] font-bold text-xl mb-2" style={{ color: grade.color }}>{grade.label}</h2>
                  <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">{grade.description}</p>
                </div>

                {/* Category Bars */}
                <div className="space-y-3 mb-6">
                  {results.map((r) => (
                    <div key={r.id} className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span>{r.icon}</span>
                          <span className="text-sm font-semibold text-white">{r.title}</span>
                        </div>
                        <span className="text-sm font-mono font-bold" style={{ color: r.color }}>
                          {r.maxScore > 0 ? `${r.percentage}%` : "\u2013"}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: r.color }}
                          initial={{ width: 0 }}
                          animate={{ width: r.maxScore > 0 ? `${r.percentage}%` : "0%" }}
                          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] as const }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <button
                    onClick={() => { setShowResults(false); setActiveCat(0); }}
                    className="flex-1 py-3 rounded-xl border border-white/10 text-sm font-semibold text-slate-300 hover:bg-white/[0.04] transition cursor-pointer"
                  >
                    Adjust Assessment
                  </button>
                  <Link
                    href={`/${locale}/kontakt`}
                    className="flex-1 py-3 rounded-xl font-bold text-sm text-slate-900 text-center"
                    style={{ background: "linear-gradient(135deg, #FACC15, #EAB308)", boxShadow: "0 8px 32px rgba(250,204,21,0.3)" }}
                  >
                    Generate Compliance Report
                  </Link>
                </div>

                {/* Cross-links */}
                <ToolNextSteps
                  currentTool="reifegrad-check"
                  subtext="Maturity assessed? Deepen your compliance planning with these tools."
                />
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
