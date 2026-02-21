"use client";

import Link from "next/link";

/* ── Tool link definitions ── */
export interface ToolLink {
  title: string;
  description: string;
  href: string;
  icon: string; // emoji
  accent?: string;
}

const ALL_TOOLS: Record<string, ToolLink> = {
  "regulierung-finder": {
    title: "Regulierung-Finder",
    description: "Welche EU-Gesetze betreffen Sie?",
    href: "/tools/regulierung-finder",
    icon: "🔍",
    accent: "#FACC15",
  },
  "nis2-check": {
    title: "NIS2-Betroffenheits-Check",
    description: "Fällt Ihr Unternehmen unter NISG 2026?",
    href: "/tools/nis2-betroffenheits-check",
    icon: "🛡️",
    accent: "#1e40af",
  },
  "compliance-checkliste": {
    title: "Compliance-Checkliste",
    description: "Alle Pflichten systematisch abhaken",
    href: "/tools/compliance-checkliste",
    icon: "✅",
    accent: "#059669",
  },
  "haftungs-pruefer": {
    title: "Haftungs-Prüfer",
    description: "Persönliches GF-Haftungsrisiko prüfen",
    href: "/tools/haftungs-pruefer",
    icon: "⚖️",
    accent: "#dc2626",
  },
  "bussgeld-rechner": {
    title: "Bußgeld-Rechner",
    description: "Strafrahmen für Ihre Situation berechnen",
    href: "/tools/bussgeld-rechner",
    icon: "💸",
    accent: "#ea580c",
  },
  "kosten-kalkulator": {
    title: "Kosten-Kalkulator",
    description: "Compliance-Budget realistisch planen",
    href: "/tools/kosten-kalkulator",
    icon: "📊",
    accent: "#7c3aed",
  },
  "reifegrad-check": {
    title: "Reifegrad-Check",
    description: "Compliance-Reifegrad Ihres Unternehmens",
    href: "/tools/reifegrad-check",
    icon: "📈",
    accent: "#0891b2",
  },
  "fristen-radar": {
    title: "Fristen-Radar",
    description: "Keine Deadline mehr verpassen",
    href: "/fristen-radar",
    icon: "📡",
    accent: "#f59e0b",
  },
  vergleich: {
    title: "Regulierungsvergleich",
    description: "Regulierungen nebeneinander vergleichen",
    href: "/vergleich",
    icon: "🔀",
    accent: "#6366f1",
  },
};

/* ── Predefined tool workflows ── */
const TOOL_FLOWS: Record<string, string[]> = {
  "regulierung-finder": [
    "compliance-checkliste",
    "nis2-check",
    "bussgeld-rechner",
    "kosten-kalkulator",
  ],
  "nis2-check": [
    "haftungs-pruefer",
    "compliance-checkliste",
    "bussgeld-rechner",
    "kosten-kalkulator",
  ],
  "compliance-checkliste": [
    "reifegrad-check",
    "kosten-kalkulator",
    "haftungs-pruefer",
    "fristen-radar",
  ],
  "haftungs-pruefer": [
    "bussgeld-rechner",
    "compliance-checkliste",
    "nis2-check",
    "kosten-kalkulator",
  ],
  "bussgeld-rechner": [
    "haftungs-pruefer",
    "kosten-kalkulator",
    "compliance-checkliste",
    "regulierung-finder",
  ],
  "kosten-kalkulator": [
    "compliance-checkliste",
    "reifegrad-check",
    "regulierung-finder",
    "fristen-radar",
  ],
  "reifegrad-check": [
    "compliance-checkliste",
    "kosten-kalkulator",
    "regulierung-finder",
    "fristen-radar",
  ],
};

/* ── Component Props ── */
interface ToolNextStepsProps {
  /** Key of the current tool (to exclude from suggestions) */
  currentTool: keyof typeof TOOL_FLOWS;
  /** Max number of suggestions to show (default: 4) */
  maxSuggestions?: number;
  /** Dark theme for tools on dark backgrounds (default: true) */
  dark?: boolean;
  /** Optional custom heading */
  heading?: string;
  /** Optional custom subtext */
  subtext?: string;
}

export default function ToolNextSteps({
  currentTool,
  maxSuggestions = 4,
  dark = true,
  heading = "Nächste Schritte",
  subtext = "Vertiefen Sie Ihre Analyse mit weiteren Tools.",
}: ToolNextStepsProps) {
  const flow = TOOL_FLOWS[currentTool] ?? [];
  const links = flow
    .slice(0, maxSuggestions)
    .map((key) => ALL_TOOLS[key])
    .filter(Boolean);

  if (links.length === 0) return null;

  return (
    <div
      className={`rounded-2xl border p-6 sm:p-8 ${
        dark
          ? "border-white/[0.06] bg-slate-900/40"
          : "border-[#d8dff0] bg-white"
      }`}
    >
      <h3
        className={`font-[Syne] font-bold text-lg mb-1 ${
          dark ? "text-white" : "text-[#060c1a]"
        }`}
      >
        {heading}
      </h3>
      <p
        className={`text-sm mb-6 ${
          dark ? "text-slate-400" : "text-[#7a8db0]"
        }`}
      >
        {subtext}
      </p>

      <div
        className={`grid gap-3 ${
          links.length <= 2 ? "sm:grid-cols-2" : "sm:grid-cols-2"
        }`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3.5 p-4 rounded-xl border transition-all duration-200 group ${
              dark
                ? "border-white/[0.06] hover:border-white/15 hover:bg-white/[0.03]"
                : "border-[#d8dff0] hover:border-[#b0bdd4] hover:shadow-sm"
            }`}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
              style={{
                background: dark
                  ? `${link.accent ?? "#FACC15"}15`
                  : `${link.accent ?? "#0A2540"}08`,
              }}
            >
              {link.icon}
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`font-[Syne] font-bold text-[13px] leading-tight block transition-colors ${
                  dark
                    ? "text-white group-hover:text-yellow-400"
                    : "text-[#060c1a] group-hover:text-[#0A2540]"
                }`}
              >
                {link.title}
              </span>
              <span
                className={`text-[11px] leading-snug block mt-0.5 ${
                  dark ? "text-slate-500" : "text-[#7a8db0]"
                }`}
              >
                {link.description}
              </span>
            </div>
            <svg
              className={`w-4 h-4 flex-shrink-0 transition-all duration-200 group-hover:translate-x-0.5 ${
                dark
                  ? "text-slate-600 group-hover:text-yellow-400"
                  : "text-[#c0c8d8] group-hover:text-[#0A2540]"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
