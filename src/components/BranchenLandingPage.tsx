"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccordionSection from "@/components/AccordionSection";
import BranchenIcon from "@/components/BranchenIcon";
import { useTranslations } from "@/i18n/use-translations";
import type {
  Branche,
  Regulation,
  BranchenRegContent,
} from "@/data/branchenData";
import { calculateMaxFine, formatEuro } from "@/data/branchenData";

/* ─────────── animations ─────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

/* ─────────── Component ─────────── */
export default function BranchenLandingPage({
  branche,
  regulation,
  content,
  otherRegulations,
  otherBranchen,
}: {
  branche: Branche;
  regulation: Regulation;
  content: BranchenRegContent;
  /** Other regulations relevant for this industry */
  otherRegulations: Regulation[];
  /** Other industries for this regulation (for internal linking) */
  otherBranchen: Branche[];
}) {
  const { locale } = useTranslations();
  const accent = regulation.accent;
  const maxFine =
    branche.typicalRevenue > 0
      ? calculateMaxFine(branche.typicalRevenue, regulation.slug)
      : 0;

  return (
    <>
      <Header />
      <main>
        {/* ═══════ Hero ═══════ */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-[#040a18]" />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${accent}25 0%, transparent 70%)`,
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f4f6fc] to-transparent" />

          <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8 flex-wrap">
              <Link
                href={`/${locale}`}
                className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors"
              >
                Startseite
              </Link>
              <span className="font-mono text-[11px] text-white/35">/</span>
              <Link
                href={`/${locale}/branchen`}
                className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors"
              >
                Branchen
              </Link>
              <span className="font-mono text-[11px] text-white/35">/</span>
              <Link
                href={`/${locale}/branchen#${branche.slug}`}
                className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors"
              >
                {branche.name}
              </Link>
              <span className="font-mono text-[11px] text-white/35">/</span>
              <span className="font-mono text-[11px] text-white/60">
                {regulation.name}
              </span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 text-white">
                <BranchenIcon icon={branche.icon} />
              </div>
              <span
                className="text-[10px] px-2.5 py-1 rounded-lg font-mono font-bold tracking-wide text-white"
                style={{ background: accent }}
              >
                {regulation.name}
              </span>
            </div>

            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-[2.8rem] text-white tracking-tight leading-[1.1] mb-5 max-w-3xl">
              {content.title}
            </h1>
            <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl">
              {content.heroSubtitle}
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mt-8">
              {[
                { label: "Deadline", value: regulation.deadline },
                { label: "Max. Strafe", value: regulation.maxFine },
                ...(branche.nis2Sector && regulation.slug === "nis2"
                  ? [
                      {
                        label: "NIS2-Einstufung",
                        value:
                          branche.nis2Sector === "annex1"
                            ? "Wesentliche Einrichtung"
                            : "Wichtige Einrichtung",
                      },
                    ]
                  : []),
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-xl px-4 py-3 border border-white/10 bg-white/[0.04] backdrop-blur-sm"
                >
                  <div className="font-mono text-[9px] text-white/30 uppercase tracking-wider mb-1">
                    {stat.label}
                  </div>
                  <div
                    className="font-[Syne] font-bold text-sm"
                    style={{ color: accent }}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ Content ═══════ */}
        <section
          className="py-12 lg:py-16"
          style={{
            background: "linear-gradient(180deg, #f4f6fc 0%, #eef1fa 100%)",
          }}
        >
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            {/* ── Relevance intro ── */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
              className="rounded-2xl border bg-white p-8 mb-10 shadow-sm"
              style={{ borderColor: `${accent}15` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-1.5 h-6 rounded-full"
                  style={{ background: accent }}
                />
                <h2 className="font-[Syne] font-bold text-xl text-[#060c1a]">
                  Warum betrifft Sie das {regulation.name}?
                </h2>
              </div>
              <p className="text-[#3a4a6b] leading-relaxed text-[15px]">
                {content.relevanceIntro}
              </p>
            </motion.div>

            {/* ── Affected Areas ── */}
            <div className="mb-12">
              <h2 className="font-[Syne] font-bold text-2xl text-[#060c1a] mb-6">
                Betroffene Bereiche in Ihrem Unternehmen
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {content.affectedAreas.map((area, i) => (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    custom={i}
                    variants={fadeUp}
                    className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                    style={{ borderColor: `${accent}12` }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-[Syne] font-bold text-sm"
                        style={{ background: accent }}
                      >
                        {i + 1}
                      </div>
                      <h3 className="font-[Syne] font-bold text-[15px] text-[#060c1a]">
                        {area.title}
                      </h3>
                    </div>
                    <p className="text-[#3a4a6b] text-sm leading-relaxed">
                      {area.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Obligations (Accordion) ── */}
            <div className="mb-12">
              <h2 className="font-[Syne] font-bold text-2xl text-[#060c1a] mb-6">
                Ihre konkreten Pflichten
              </h2>
              <AccordionSection
                items={content.obligations.map((obl, i) => ({
                  title: `${i + 1}. ${obl.title}`,
                  content: (
                    <p className="text-[#3a4a6b] text-sm leading-relaxed">
                      {obl.description}
                    </p>
                  ),
                }))}
                accent={accent}
              />
            </div>

            {/* ── Fine Calculator Preview ── */}
            {maxFine > 0 && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={0}
                variants={fadeUp}
                className="rounded-2xl border bg-white p-8 mb-12 shadow-sm"
                style={{ borderColor: "#ef444420" }}
              >
                <h2 className="font-[Syne] font-bold text-2xl text-[#060c1a] mb-2">
                  Bußgeld-Risiko für {branche.name}
                </h2>
                <p className="text-[#7a8db0] text-sm mb-6">
                  Berechnung auf Basis eines typischen Jahresumsatzes von{" "}
                  {branche.typicalRevenueLabel}
                </p>

                <div className="flex items-end gap-4 mb-4">
                  <div
                    className="font-[Syne] font-extrabold text-4xl sm:text-5xl"
                    style={{ color: "#ef4444" }}
                  >
                    {formatEuro(maxFine)}
                  </div>
                  <div className="text-sm text-[#7a8db0] pb-1">
                    maximales Bußgeld
                  </div>
                </div>

                <p className="text-[#3a4a6b] text-sm leading-relaxed mb-6">
                  {content.fineContext}
                </p>

                <Link
                  href={`/${locale}/tools/bussgeld-rechner`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-[Syne] font-bold transition-all hover:-translate-y-0.5"
                  style={{
                    background: `${accent}10`,
                    color: accent,
                    border: `1px solid ${accent}30`,
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                  </svg>
                  Eigenes Bußgeld berechnen
                </Link>
              </motion.div>
            )}

            {/* ── Compliance Roadmap ── */}
            <div className="mb-12">
              <h2 className="font-[Syne] font-bold text-2xl text-[#060c1a] mb-6">
                Ihr Compliance-Fahrplan
              </h2>
              <div className="relative">
                {/* Timeline line */}
                <div
                  className="absolute left-[19px] top-8 bottom-8 w-0.5"
                  style={{ background: `${accent}25` }}
                />
                <div className="space-y-6">
                  {content.roadmap.map((step, i) => (
                    <motion.div
                      key={i}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      custom={i}
                      variants={fadeUp}
                      className="flex gap-4"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-[Syne] font-bold text-sm relative z-10"
                        style={{ background: accent }}
                      >
                        {i + 1}
                      </div>
                      <div className="rounded-2xl border bg-white p-5 flex-1 shadow-sm" style={{ borderColor: `${accent}12` }}>
                        <div className="font-mono text-[10px] font-semibold tracking-wider uppercase mb-1" style={{ color: accent }}>
                          {step.phase}
                        </div>
                        <h3 className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-2">
                          {step.title}
                        </h3>
                        <p className="text-[#3a4a6b] text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── CTA: Tools ── */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
              className="rounded-2xl p-8 mb-12 text-center"
              style={{
                background: `linear-gradient(135deg, ${accent}08, ${accent}15)`,
                border: `1px solid ${accent}20`,
              }}
            >
              <h2 className="font-[Syne] font-bold text-xl text-[#060c1a] mb-3">
                Wie betroffen ist Ihr Unternehmen?
              </h2>
              <p className="text-[#3a4a6b] text-sm mb-6 max-w-lg mx-auto">
                Nutzen Sie unsere kostenlosen Tools für eine erste Einschätzung
                — in unter 5 Minuten.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {regulation.slug === "nis2" && (
                  <Link
                    href={`/${locale}/tools/nis2-betroffenheits-check`}
                    className="px-5 py-2.5 rounded-xl text-sm font-[Syne] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: accent }}
                  >
                    NIS2-Betroffenheits-Check
                  </Link>
                )}
                <Link
                  href={`/${locale}/tools/haftungs-pruefer`}
                  className="px-5 py-2.5 rounded-xl text-sm font-[Syne] font-bold transition-all hover:-translate-y-0.5"
                  style={{
                    background: "white",
                    color: accent,
                    border: `1px solid ${accent}40`,
                  }}
                >
                  GF-Haftungs-Prüfer
                </Link>
                <Link
                  href={`/${locale}/tools/bussgeld-rechner`}
                  className="px-5 py-2.5 rounded-xl text-sm font-[Syne] font-bold transition-all hover:-translate-y-0.5"
                  style={{
                    background: "white",
                    color: accent,
                    border: `1px solid ${accent}40`,
                  }}
                >
                  Bußgeld-Rechner
                </Link>
              </div>
            </motion.div>

            {/* ── FAQ ── */}
            <div className="mb-12">
              <h2 className="font-[Syne] font-bold text-2xl text-[#060c1a] mb-6">
                Häufig gestellte Fragen
              </h2>
              <AccordionSection
                items={content.faq.map((item) => ({
                  title: item.q,
                  content: (
                    <p className="text-[#3a4a6b] text-sm leading-relaxed">
                      {item.a}
                    </p>
                  ),
                }))}
                accent={accent}
              />
            </div>

            {/* ── Internal Linking: Other regulations for this industry ── */}
            {otherRegulations.length > 0 && (
              <div className="mb-12">
                <h2 className="font-[Syne] font-bold text-xl text-[#060c1a] mb-4">
                  Weitere Regulierungen für {branche.name}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {otherRegulations.map((reg) => (
                    <Link
                      key={reg.slug}
                      href={`/${locale}/branchen/${branche.slug}/${reg.slug}`}
                      className="rounded-xl border bg-white p-4 hover:shadow-md transition-all hover:-translate-y-0.5 group"
                      style={{ borderColor: `${reg.accent}20` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ background: reg.accent }}
                        />
                        <span className="font-[Syne] font-bold text-sm group-hover:text-[#0A2540] transition-colors">
                          {reg.name}
                        </span>
                      </div>
                      <p className="text-[#7a8db0] text-xs leading-relaxed">
                        {reg.shortDesc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ── Internal Linking: Other industries ── */}
            {otherBranchen.length > 0 && (
              <div className="mb-8">
                <h2 className="font-[Syne] font-bold text-xl text-[#060c1a] mb-4">
                  {regulation.name} in anderen Branchen
                </h2>
                <div className="flex flex-wrap gap-2">
                  {otherBranchen.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/${locale}/branchen/${b.slug}/${regulation.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d8dff0] bg-white text-xs font-medium text-[#3a4a6b] hover:text-[#0A2540] hover:border-[#0A2540]/30 transition-all hover:-translate-y-0.5"
                    >
                      <BranchenIcon icon={b.icon} className="w-3.5 h-3.5" />
                      <span>{b.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ── Guide CTA ── */}
            <div
              className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{
                background: "white",
                borderColor: `${accent}20`,
              }}
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#7a8db0] mb-1">
                  Vollständiger Guide
                </div>
                <h3 className="font-[Syne] font-bold text-base text-[#060c1a]">
                  {regulation.name} — Alle Details lesen
                </h3>
                <p className="text-[#7a8db0] text-sm mt-1">
                  Umfassende Erklärung aller Pflichten, Fristen und
                  Handlungsschritte.
                </p>
              </div>
              <Link
                href={`/${locale}${regulation.guideHref}`}
                className="px-5 py-2.5 rounded-xl text-sm font-[Syne] font-bold text-white flex-shrink-0 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: accent }}
              >
                Zum {regulation.name}-Guide →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
