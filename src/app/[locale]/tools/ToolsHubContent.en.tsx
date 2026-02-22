"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ==================================================================
   Tools Hub (EN) -- Central landing page for all interactive tools
   ================================================================== */

type ToolCategory = "all" | "analysis" | "assessment" | "calculator" | "directory";

interface Tool {
  title: string;
  description: string;
  href: string;
  icon: string;
  accent: string;
  badge?: string;
  category: ToolCategory;
  features: string[];
  duration: string;
}

const TOOLS: Tool[] = [
  {
    title: "Regulation Finder",
    description:
      "Find out in 5 steps which of the 14+ EU regulations are relevant to your company.",
    href: "/tools/regulierung-finder",
    icon: "\uD83E\uDDED",
    accent: "#FACC15",
    badge: "Popular",
    category: "analysis",
    features: ["14 regulations", "5-step quiz", "Relevance rating"],
    duration: "~3 min",
  },
  {
    title: "NIS2 Applicability Check",
    description:
      "Check whether your company falls under the NIS2 Directive (NISG 2026) and which obligations apply.",
    href: "/tools/nis2-betroffenheits-check",
    icon: "\uD83D\uDEE1\uFE0F",
    accent: "#1e40af",
    badge: "Top Tool",
    category: "analysis",
    features: ["Sector analysis", "Size check", "Obligations overview"],
    duration: "~2 min",
  },
  {
    title: "Compliance Checklist",
    description:
      "Interactive checklist: Systematically review all EU compliance obligations for your company.",
    href: "/tools/compliance-checkliste",
    icon: "\u2705",
    accent: "#059669",
    category: "assessment",
    features: ["All regulations", "Progress tracking", "Export"],
    duration: "~10 min",
  },
  {
    title: "Liability Checker",
    description:
      "Determine the personal liability risk for management in the event of compliance violations.",
    href: "/tools/haftungs-pruefer",
    icon: "\u2696\uFE0F",
    accent: "#dc2626",
    category: "assessment",
    features: ["CEO liability", "Risk matrix", "Action plan"],
    duration: "~3 min",
  },
  {
    title: "Fine Calculator",
    description:
      "Calculate the potential penalty range for violations of EU regulations such as NIS2, GDPR and the AI Act.",
    href: "/tools/bussgeld-rechner",
    icon: "\uD83D\uDCB8",
    accent: "#b91c1c",
    category: "calculator",
    features: ["All penalty ranges", "Turnover-based", "Comparison table"],
    duration: "~2 min",
  },
  {
    title: "Cost Calculator",
    description:
      "Estimate the compliance budget for your company \u2014 broken down by regulation and cost centre.",
    href: "/tools/kosten-kalkulator",
    icon: "\uD83D\uDCB0",
    accent: "#16a34a",
    badge: "New",
    category: "calculator",
    features: ["Budget planning", "Cost breakdown", "Synergies"],
    duration: "~3 min",
  },
  {
    title: "Maturity Check",
    description:
      "Measure your company\u2019s compliance maturity across 5 categories and 25 questions \u2014 with A\u2013E grading.",
    href: "/tools/reifegrad-check",
    icon: "\uD83D\uDCCA",
    accent: "#7c3aed",
    badge: "New",
    category: "assessment",
    features: ["25 questions", "5 categories", "A\u2013E grading"],
    duration: "~5 min",
  },
  {
    title: "ISMS Software Comparison",
    description:
      "Compare ISMS and compliance software solutions \u2014 with ratings, pricing and feature comparisons.",
    href: "/tools/isms-software-vergleich",
    icon: "\uD83D\uDD0D",
    accent: "#0891b2",
    category: "directory",
    features: ["Software ratings", "Price comparison", "Feature matrix"],
    duration: "~5 min",
  },
];

const CATEGORIES: { value: ToolCategory; label: string; icon: string }[] = [
  { value: "all", label: "All Tools", icon: "\u26A1" },
  { value: "analysis", label: "Analysis", icon: "\uD83D\uDD0E" },
  { value: "assessment", label: "Assessment", icon: "\uD83D\uDCCB" },
  { value: "calculator", label: "Calculators", icon: "\uD83E\uDDEE" },
  { value: "directory", label: "Directory", icon: "\uD83D\uDCD6" },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors cursor-pointer"
      >
        <span className="font-semibold text-[14px] text-slate-200 leading-snug">
          {question}
        </span>
        <svg
          className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4">
              <p className="text-sm text-slate-400 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ToolsHubContent() {
  const [category, setCategory] = useState<ToolCategory>("all");

  const filtered =
    category === "all" ? TOOLS : TOOLS.filter((t) => t.category === category);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#060c1a]">
        {/* -- Hero -- */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(250,204,21,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-6">
              <span className="text-yellow-400 text-xs font-semibold">
                {TOOLS.length} free tools
              </span>
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              Compliance{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Tools
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Interactive tools for your EU compliance \u2014 from applicability
              analysis to cost planning to maturity checks. Use instantly, no
              registration required.
            </p>
          </div>
        </section>

        {/* -- Category Filter -- */}
        <section className="px-6 pb-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {CATEGORIES.map((cat) => {
                const isActive = category === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-yellow-400/15 text-yellow-400 border border-yellow-400/30"
                        : "bg-white/[0.03] text-slate-400 border border-white/5 hover:bg-white/[0.06] hover:text-slate-300"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* -- Tools Grid -- */}
        <section className="px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((tool) => (
                  <motion.div
                    key={tool.href}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={tool.href}
                      className="group block rounded-2xl border border-white/5 bg-slate-900/40 p-6 hover:border-white/10 hover:bg-slate-900/60 transition-all duration-300"
                    >
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                          style={{ background: `${tool.accent}15` }}
                        >
                          {tool.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="font-[Syne] font-bold text-[17px] text-white group-hover:text-yellow-400 transition-colors truncate">
                              {tool.title}
                            </h2>
                            {tool.badge && (
                              <span
                                className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex-shrink-0"
                                style={{
                                  background: `${tool.accent}20`,
                                  color: tool.accent,
                                }}
                              >
                                {tool.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                            {tool.description}
                          </p>
                        </div>
                      </div>

                      {/* Features + Duration */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {tool.features.map((f) => (
                            <span
                              key={f}
                              className="px-2 py-1 rounded-md bg-white/[0.04] text-[11px] text-slate-500 font-medium"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                        <span className="text-[11px] text-slate-600 font-mono flex-shrink-0 ml-3">
                          {tool.duration}
                        </span>
                      </div>

                      {/* Arrow indicator */}
                      <div className="flex justify-end mt-3">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-yellow-400/10 group-hover:border-yellow-400/20 transition-all">
                          <svg
                            className="w-4 h-4 text-slate-600 group-hover:text-yellow-400 transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-slate-500 text-sm">
                  No tools in this category.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* -- Additional Resources -- */}
        <section className="px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-[Syne] font-bold text-lg text-white mb-4 text-center">
              Additional Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { title: "Compliance Directory", description: "Find auditors & consultants", href: "/compliance-verzeichnis", icon: "\uD83D\uDCC7" },
                { title: "Deadline Radar", description: "All deadlines at a glance", href: "/fristen-radar", icon: "\uD83D\uDCC5" },
                { title: "Compliance Timeline", description: "Deadlines 2025\u20132027", href: "/timeline", icon: "\uD83D\uDDD3\uFE0F" },
                { title: "Compliance Glossary", description: "Key terms explained", href: "/glossar", icon: "\uD83D\uDCDA" },
              ].map((res) => (
                <Link
                  key={res.href}
                  href={res.href}
                  className="group flex items-center gap-3 px-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all"
                >
                  <span className="text-lg">{res.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-300 group-hover:text-yellow-400 transition-colors">
                      {res.title}
                    </p>
                    <p className="text-xs text-slate-500">{res.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* -- FAQ Section -- */}
        <section className="px-6 pb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[Syne] font-bold text-lg text-white mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: "Are the EU compliance tools free?",
                  a: "Yes, all tools on the EU Compliance Hub are completely free and can be used immediately \u2014 without registration or sign-up. All calculations are processed locally in your browser.",
                },
                {
                  q: "How accurate are the compliance tool results?",
                  a: "Our tools provide a qualified initial assessment based on current EU regulations. They do not replace individual legal advice, but offer a solid basis for further compliance planning.",
                },
                {
                  q: "Which tool should I use first?",
                  a: "Start with the Regulation Finder to identify which EU regulations are relevant to your company. Then we recommend the NIS2 Applicability Check and the Compliance Checklist for a detailed analysis.",
                },
                {
                  q: "Is my data stored or shared with third parties?",
                  a: "No. All calculations and analyses of our interactive tools are processed exclusively locally in your browser. No personal data is transmitted to servers or stored.",
                },
              ].map((faq) => (
                <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* -- CTA Section -- */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto rounded-2xl border border-yellow-400/10 bg-yellow-400/5 p-8 sm:p-10 text-center">
            <h2 className="font-[Syne] font-bold text-xl text-white mb-3">
              Personalised Compliance Consulting
            </h2>
            <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">
              Our tools give you an initial assessment. For a personalised
              compliance analysis, create your free report \u2014 tailored
              specifically to your company.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/kontakt"
                className="px-6 py-3 rounded-xl font-bold text-sm text-slate-900"
                style={{
                  background: "linear-gradient(135deg, #FACC15, #EAB308)",
                  boxShadow:
                    "0 8px 32px rgba(250,204,21,0.3), 0 2px 8px rgba(250,204,21,0.2)",
                }}
              >
                Create Compliance Report
              </Link>
              <Link
                href="/faq"
                className="px-6 py-3 rounded-xl font-semibold text-sm text-slate-300 border border-white/10 hover:bg-white/[0.04] transition-all"
              >
                Frequently Asked Questions
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
