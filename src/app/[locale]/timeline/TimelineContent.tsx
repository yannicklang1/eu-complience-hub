"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DEADLINES, isPast, daysUntil, formatDateDE } from "@/data/deadlines";

/* ── Per-locale UI strings ── */
const UI = {
  de: {
    home: "Startseite",
    breadcrumb: "Compliance-Timeline",
    tagline: "Zeitplan 2025 -- 2027",
    heroTitle1: "Compliance-",
    heroTitle2: "Timeline.",
    heroDesc:
      "Alle wichtigen EU-Compliance-Fristen auf einen Blick. Klicke auf ein Ereignis, um mehr ueber die jeweilige Regulierung zu erfahren.",
    legendActive: "Bereits in Kraft",
    legendUpcoming: "Bevorstehend",
    statusActive: "In Kraft",
    statusDays: (d: number) => `${d} Tage`,
    toGuide: "Zum Guide",
    ctaTitle: "Compliance-Briefing aktivieren",
    ctaDesc:
      "Ihr regulatorisches Fruehwarnsystem -- nur bei kritischen Fristen und Gesetzesaenderungen. Maximal 3x pro Monat.",
    ctaButton: "Briefing aktivieren",
  },
  en: {
    home: "Home",
    breadcrumb: "Compliance Timeline",
    tagline: "Schedule 2025 -- 2027",
    heroTitle1: "Compliance ",
    heroTitle2: "Timeline.",
    heroDesc:
      "All important EU compliance deadlines at a glance. Click on an event to learn more about the respective regulation.",
    legendActive: "Already in effect",
    legendUpcoming: "Upcoming",
    statusActive: "In effect",
    statusDays: (d: number) => `${d} days`,
    toGuide: "Read guide",
    ctaTitle: "Activate compliance briefing",
    ctaDesc:
      "Your regulatory early warning system -- only for critical deadlines and legislative changes. Up to 3 times per month.",
    ctaButton: "Activate briefing",
  },
} as const;

function getUI(locale: string) {
  return UI[locale as keyof typeof UI] ?? UI.de;
}

/* ── Regulation -> page mapping ── */
const regHref: Record<string, string> = {
  DORA: "/dora",
  "AI Act": "/eu-ai-act",
  NISG: "/nisg-2026",
  CRA: "/cra",
  CSRD: "/csrd-esg",
  BaFG: "/bafg",
  HSchG: "/hschg",
  DSGVO: "/dsgvo",
};

/* ── Regulation -> SVG icon ── */
function RegIcon({ reg, className = "w-5 h-5" }: { reg: string; className?: string }) {
  switch (reg) {
    case "NISG":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "AI Act":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a5 5 0 0 1 4.5 7.2A5 5 0 0 1 18 14a5 5 0 0 1-3.5 4.8V22h-5v-3.2A5 5 0 0 1 6 14a5 5 0 0 1 1.5-4.8A5 5 0 0 1 12 2z" />
          <path d="M12 2v6m-4 4h8" />
        </svg>
      );
    case "DORA":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18m6-18v18M3 9h18M3 15h18" />
        </svg>
      );
    case "CRA":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v3m6-3v3M9 20v3m6-3v3M1 9h3m-3 6h3M20 9h3m-3 6h3" />
        </svg>
      );
    case "CSRD":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      );
    case "BaFG":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8a2 2 0 1 1 0 4 2 2 0 0 1-2 2" />
          <path d="M12 18h.01" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
        </svg>
      );
  }
}

/* ── Timeline Card ── */
function TimelineCard({
  deadline,
  isLeft,
  ui,
}: {
  deadline: (typeof DEADLINES)[0];
  isLeft: boolean;
  ui: ReturnType<typeof getUI>;
}) {
  const past = isPast(deadline.iso);
  const days = daysUntil(deadline.iso);
  const href = regHref[deadline.reg] || "/";
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 md:gap-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Card */}
      <div className={`flex-1 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
        <motion.div
          initial={false}
          animate={vis ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] as const }}
        >
          <Link
            href={href}
            className="group block rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/[0.08] relative overflow-hidden"
            style={{ borderColor: past ? "#d8dff0" : `${deadline.color}30` }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ background: deadline.color, opacity: past ? 0.3 : 0.8 }}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: `${deadline.color}12`, color: deadline.color }}
                >
                  <RegIcon reg={deadline.reg} className="w-5 h-5" />
                </div>
                <div>
                  <span
                    className="font-mono text-[11px] font-bold tracking-wide"
                    style={{ color: deadline.color }}
                  >
                    {deadline.reg}
                  </span>
                  <div className="font-mono text-[10px] text-[#7a8db0]">
                    {formatDateDE(deadline.iso)}
                  </div>
                </div>
              </div>

              {/* Status */}
              {past ? (
                <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {ui.statusActive}
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  {ui.statusDays(days)}
                </span>
              )}
            </div>

            {/* Content */}
            <h3
              className={`font-[Syne] font-bold text-lg mb-1.5 transition-colors ${
                past ? "text-[#7a8db0]" : "text-[#060c1a] group-hover:text-[#0A2540]"
              }`}
            >
              {deadline.title}
            </h3>
            <p className="text-sm text-[#7a8db0] leading-relaxed mb-3">
              {deadline.desc}
            </p>

            {/* CTA */}
            <div
              className="flex items-center gap-1.5 text-[12px] font-semibold transition-all group-hover:gap-2.5"
              style={{ color: deadline.color }}
            >
              {ui.toGuide}
              <svg
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Center dot (desktop) */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0 w-0 relative">
        <motion.div
          initial={false}
          animate={vis ? { scale: 1, opacity: 1 } : { scale: 0.3, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="absolute top-7 -translate-x-1/2 left-0 z-10"
        >
          <div
            className="w-4 h-4 rounded-full border-[3px]"
            style={{
              borderColor: deadline.color,
              background: past ? deadline.color : "white",
            }}
          />
          {!past && (
            <div
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ background: deadline.color }}
            />
          )}
        </motion.div>
      </div>

      {/* Mobile dot */}
      <div className="md:hidden absolute left-0 top-7 flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full border-2"
          style={{
            borderColor: deadline.color,
            background: past ? deadline.color : "white",
          }}
        />
      </div>

      {/* Empty space for opposite side (desktop) */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}

/* ═══════════════ Main Component ═══════════════ */
export default function TimelineContent({ locale }: { locale: string }) {
  const ui = getUI(locale);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[#040a18]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, #0A254025 0%, transparent 70%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f4f6fc] to-transparent" />

          <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
            <nav className="flex items-center gap-2 mb-8">
              <Link
                href="/"
                className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors"
              >
                {ui.home}
              </Link>
              <span className="font-mono text-[11px] text-white/35">/</span>
              <span className="font-mono text-[11px] text-white/60">
                {ui.breadcrumb}
              </span>
            </nav>

            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-[#FACC15]" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium text-[#FACC15]">
                {ui.tagline}
              </span>
            </div>

            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-4">
              {ui.heroTitle1}
              <span className="text-[#FACC15]">{ui.heroTitle2}</span>
            </h1>
            <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl">
              {ui.heroDesc}
            </p>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-8">
              <div className="flex items-center gap-2 text-[11px] text-white/40">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>{ui.legendActive}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/40">
                <span className="relative w-3 h-3 rounded-full border-2 border-amber-500">
                  <span className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-30" />
                </span>
                <span>{ui.legendUpcoming}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Content */}
        <section
          className="py-16 lg:py-24 relative"
          style={{
            background: "linear-gradient(180deg, #f4f6fc 0%, #eef1fa 100%)",
          }}
        >
          {/* Center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d8dff0] to-transparent" />

          {/* Mobile left line */}
          <div className="md:hidden absolute left-[5px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d8dff0] to-transparent mx-6" />

          <div className="max-w-5xl mx-auto px-6 lg:px-12 relative">
            <div className="space-y-6 md:space-y-8 pl-8 md:pl-0">
              {DEADLINES.map((d, i) => (
                <TimelineCard
                  key={`${d.reg}-${d.iso}`}
                  deadline={d}
                  isLeft={i % 2 === 0}
                  ui={ui}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto px-6 mt-20 text-center">
            <div
              className="rounded-2xl p-8"
              style={{
                background: "linear-gradient(135deg, #0A254008, #0ea5e910)",
                border: "1px solid #0A254015",
              }}
            >
              <h2 className="font-[Syne] font-bold text-xl text-[#060c1a] mb-3">
                {ui.ctaTitle}
              </h2>
              <p className="text-[#3a4a6b] text-sm mb-6 max-w-lg mx-auto">
                {ui.ctaDesc}
              </p>
              <Link
                href="/fristen-radar"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-[Syne] font-bold text-[#0A2540] transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #FACC15, #EAB308)",
                  boxShadow: "0 4px 16px rgba(250,204,21,0.25)",
                }}
              >
                {ui.ctaButton}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-7-7l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
