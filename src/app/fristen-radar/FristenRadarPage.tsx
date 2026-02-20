"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FristenRadarSignup from "@/components/FristenRadarSignup";
import { isPast, formatDateDE } from "@/data/deadlines";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const BENEFITS = [
  {
    icon: "📅",
    title: "Kritische Fristen",
    description:
      "Wir informieren Sie rechtzeitig vor NIS2, DORA, AI Act und CRA Deadlines — damit Sie nie eine Frist verpassen.",
  },
  {
    icon: "📜",
    title: "Gesetzesänderungen",
    description:
      "Neue Durchführungsverordnungen, Digital Omnibus, delegierte Rechtsakte — wir filtern das Relevante für Sie.",
  },
  {
    icon: "💰",
    title: "Neue Förderprogramme",
    description:
      "AWS-Zuschüsse, FFG-Programme, EU-Fördertöpfe — sobald ein neues Programm für Compliance-Investitionen aufgelegt wird, erfahren Sie es.",
  },
  {
    icon: "🔔",
    title: "Maximal 3× pro Monat",
    description:
      "Kein Newsletter-Spam. Nur echte Alerts bei kritischen Ereignissen. Ihre Zeit ist wertvoll — das respektieren wir.",
  },
];

const UPCOMING_DEADLINES = [
  { iso: "2025-01-17", label: "DORA — Anwendungsbeginn", color: "#10b981" },
  { iso: "2025-02-02", label: "AI Act — Verbotene KI-Systeme", color: "#7c3aed" },
  { iso: "2025-08-02", label: "AI Act — GPAI Pflichten", color: "#7c3aed" },
  { iso: "2026-09-11", label: "CRA — Meldepflichten", color: "#8b5cf6" },
  { iso: "2026-10-01", label: "NISG 2026 — Registrierungspflicht", color: "#0ea5e9" },
  { iso: "2027-12-11", label: "CRA — Vollständige Anwendung", color: "#8b5cf6" },
];

export default function FristenRadarPage() {
  return (
    <>
      <Header />
      <main>
        {/* ═══════ Hero ═══════ */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#060c1a] via-[#0a1628] to-[#060c1a]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(10,37,64,0.2) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f4f6fc] to-transparent" />

          <div className="relative max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-blue-300 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Fristen-Radar
              </div>

              <h1 className="font-[Syne] font-[800] text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight mb-5">
                Keine{" "}
                <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  Compliance-Frist
                </span>{" "}
                verpassen.
              </h1>
              <p className="text-lg text-[#94a3c4] max-w-xl mx-auto leading-relaxed mb-10">
                Nur bei kritischen Fristen, Gesetzesänderungen und neuen
                Förderprogrammen. Kein Spam. Maximal 3× pro Monat.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <FristenRadarSignup variant="hero" />
            </motion.div>
          </div>
        </section>

        {/* ═══════ Benefits ═══════ */}
        <section className="py-20 bg-[#f4f6fc]">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <h2 className="font-[Syne] font-[800] text-3xl text-[#060c1a] mb-3">
                Was Sie erwartet
              </h2>
              <p className="text-[#7a8db0] max-w-lg mx-auto">
                Kein klassischer Newsletter. Ein Frühwarnsystem für
                regulatorische Deadlines und Chancen.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="p-6 rounded-2xl bg-white border border-[#e0e5f0] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{b.icon}</span>
                    <div>
                      <h3 className="font-[Syne] font-bold text-lg text-[#060c1a] mb-1">
                        {b.title}
                      </h3>
                      <p className="text-sm text-[#3a4a6b] leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ Upcoming Deadlines ═══════ */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="font-[Syne] font-[800] text-3xl text-[#060c1a] mb-3">
                Kommende Fristen
              </h2>
              <p className="text-[#7a8db0]">
                Die wichtigsten EU-Compliance-Deadlines im Überblick.
              </p>
            </motion.div>

            <div className="space-y-3">
              {UPCOMING_DEADLINES.map((d, i) => {
                const past = isPast(d.iso);
                return (
                  <motion.div
                    key={d.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                      past
                        ? "bg-[#f8fafc] border-[#e0e5f0] opacity-60"
                        : "bg-white border-[#e0e5f0] hover:border-[#0A2540]/20"
                    }`}
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: d.color }}
                    />
                    <span
                      className={`font-mono text-sm font-semibold shrink-0 w-32 ${
                        past ? "text-[#7a8db0] line-through" : "text-[#060c1a]"
                      }`}
                    >
                      {formatDateDE(d.iso)}
                    </span>
                    <span
                      className={`text-sm ${
                        past ? "text-[#7a8db0]" : "text-[#3a4a6b]"
                      }`}
                    >
                      {d.label}
                    </span>
                    {past && (
                      <span className="ml-auto text-[10px] font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        In Kraft
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <p className="text-center text-xs text-[#7a8db0] mt-6">
              Stand: {new Date().toLocaleDateString("de-AT", { month: "long", year: "numeric" })}. Änderungen durch delegierte Rechtsakte
              möglich.
            </p>
          </div>
        </section>

        {/* ═══════ Bottom CTA ═══════ */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[#0A2540]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,20,80,0.5) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-2xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="font-[Syne] font-[800] text-3xl md:text-4xl text-white mb-4">
              Jetzt anmelden.
            </h2>
            <p className="text-white/45 mb-8 max-w-md mx-auto">
              Schließen Sie sich Compliance-Verantwortlichen aus Österreich,
              Deutschland und der Schweiz an.
            </p>
            <FristenRadarSignup variant="hero" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
