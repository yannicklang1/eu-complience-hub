"use client";

import Link from "next/link";
import { useState, memo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccordionSection from "@/components/AccordionSection";
import type { ComparisonCategory, SoftwareTool } from "@/data/softwareData";

/* ─── Company favicon with emoji fallback ─── */
function CompanyIcon({ tool, size = 32 }: { tool: SoftwareTool; size?: number }) {
  const [imgError, setImgError] = useState(false);

  if (imgError || !tool.faviconUrl) {
    return <span style={{ fontSize: size * 0.85 }}>{tool.logo}</span>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={tool.faviconUrl}
      alt={`${tool.name} Logo`}
      width={size}
      height={size}
      className="rounded-md object-contain"
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
}

/* ─── Star rating ─── */
function Stars({ count, accent }: { count: number; accent: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5"
          fill={i < count ? accent : "#e0e5f0"}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ─── Tool Card ─── */
const ToolCard = memo(function ToolCard({
  tool,
  index,
  accent,
  isExpanded,
  onToggle,
}: {
  tool: SoftwareTool;
  index: number;
  accent: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="rounded-2xl border bg-white shadow-sm overflow-hidden"
      style={{ borderColor: isExpanded ? `${accent}40` : "#d8dff015" }}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
              <CompanyIcon tool={tool} size={36} />
            </div>
            <div>
              <h3 className="font-[Syne] font-bold text-lg text-[#060c1a]">
                {tool.name}
              </h3>
              <p className="text-xs text-[#7a8db0]">{tool.tagline}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="font-[Syne] font-bold text-sm" style={{ color: accent }}>
              {tool.priceRange}
            </div>
            <div className="text-[10px] text-[#7a8db0]">{tool.targetSize}</div>
          </div>
        </div>

        <p className="text-sm text-[#3a4a6b] leading-relaxed mb-4">
          {tool.description}
        </p>

        {/* Regulation badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.regulations.map((reg) => (
            <span
              key={reg}
              className="text-[10px] px-2 py-0.5 rounded-md font-mono font-semibold bg-[#0A2540]/[0.06] text-[#0A2540] border border-[#0A2540]/10"
            >
              {reg}
            </span>
          ))}
        </div>

        {/* Ratings */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {[
            { label: "Bedienung", value: tool.ratings.usability },
            { label: "Funktionen", value: tool.ratings.features },
            { label: "Support", value: tool.ratings.support },
            { label: "Preis-Leistung", value: tool.ratings.priceValue },
            { label: "DACH-Relevanz", value: tool.ratings.dachRelevance },
          ].map((r) => (
            <div key={r.label}>
              <div className="text-[10px] text-[#7a8db0] font-mono uppercase tracking-wider mb-1">
                {r.label}
              </div>
              <Stars count={r.value} accent={accent} />
            </div>
          ))}
        </div>

        {/* Expand button */}
        <button
          onClick={onToggle}
          className="text-sm font-[Syne] font-semibold transition-colors flex items-center gap-1"
          style={{ color: accent }}
        >
          {isExpanded ? "Weniger anzeigen" : "Details anzeigen"}
          <svg
            className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-[#e8ecf4] pt-4">
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            {/* Pros */}
            <div>
              <div className="font-mono text-[10px] font-semibold tracking-wider uppercase text-emerald-600 mb-2">
                Vorteile
              </div>
              <ul className="space-y-1.5">
                {tool.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div>
              <div className="font-mono text-[10px] font-semibold tracking-wider uppercase text-red-500 mb-2">
                Nachteile
              </div>
              <ul className="space-y-1.5">
                {tool.cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Best for */}
          <div className="rounded-xl p-4 mb-4" style={{ background: `${accent}08`, border: `1px solid ${accent}15` }}>
            <div className="font-mono text-[10px] font-semibold tracking-wider uppercase mb-1" style={{ color: accent }}>
              Am besten geeignet für
            </div>
            <p className="text-sm text-[#060c1a] font-medium">{tool.bestFor}</p>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#7a8db0]">
              Hauptsitz: {tool.headquarter}
            </span>
            <a
              href={tool.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="px-4 py-2 rounded-xl text-sm font-[Syne] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: accent }}
            >
              Website besuchen *
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
});

/* ═══════════════ Main Component ═══════════════ */
export default function SoftwareComparisonPage({
  category,
}: {
  category: ComparisonCategory;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const accent = "#0A2540";

  const toggleExpand = (slug: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[#040a18]" />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 40%, #0A254020 0%, transparent 70%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f4f6fc] to-transparent" />

          <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8 flex-wrap">
              <Link href="/" className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors">
                Startseite
              </Link>
              <span className="font-mono text-[11px] text-white/35">/</span>
              <Link href="/tools/nis2-betroffenheits-check" className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors">
                Tools
              </Link>
              <span className="font-mono text-[11px] text-white/35">/</span>
              <span className="font-mono text-[11px] text-white/60">
                {category.title}
              </span>
            </nav>

            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[11px] font-semibold tracking-[0.15em] uppercase text-white/40">
                Software-Vergleich
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-lg font-mono font-bold tracking-wide text-[#0A2540] bg-[#FACC15]">
                {category.tools.length} Tools
              </span>
            </div>

            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-[2.6rem] text-white tracking-tight leading-[1.1] mb-4 max-w-3xl">
              {category.title}
            </h1>
            <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl">
              {category.intro}
            </p>

            {/* Regulation badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              {category.regulations.map((reg) => (
                <span
                  key={reg}
                  className="text-[10px] px-2.5 py-1 rounded-lg font-mono font-semibold border border-white/15 text-white/60 bg-white/[0.05]"
                >
                  Relevant für: {reg}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Freshness Notice ── */}
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-5xl mx-auto px-6 lg:px-12 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-amber-800">
              <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                <strong>Stand: Februar 2026.</strong>{" "}
                Preise, Funktionen und Bewertungen können sich ändern.
              </span>
            </div>
            <a
              href="mailto:hello@eu-compliance-hub.eu?subject=Software-Vergleich-Korrektur"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
              </svg>
              Fehler melden
            </a>
          </div>
        </div>

        {/* ── Content ── */}
        <section
          className="py-12 lg:py-16"
          style={{ background: "linear-gradient(180deg, #f4f6fc 0%, #eef1fa 100%)" }}
        >
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            {/* ── Feature Comparison Table ── */}
            <div className="mb-12">
              <h2 className="font-[Syne] font-bold text-2xl text-[#060c1a] mb-6">
                Feature-Vergleich
              </h2>
              <div className="rounded-2xl border bg-white overflow-hidden shadow-sm" style={{ borderColor: "#d8dff020" }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#e8ecf4]">
                        <th className="text-left p-4 font-mono text-[10px] font-semibold tracking-wider uppercase text-[#7a8db0] min-w-[180px]">
                          Feature
                        </th>
                        {category.tools.map((tool) => (
                          <th
                            key={tool.slug}
                            className="p-4 text-center font-[Syne] font-bold text-xs text-[#060c1a] min-w-[100px]"
                          >
                            <div className="flex justify-center mb-1.5">
                              <CompanyIcon tool={tool} size={28} />
                            </div>
                            {tool.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {category.featureHeaders.map((header, hi) => (
                        <tr
                          key={hi}
                          className={hi % 2 === 0 ? "bg-[#f8f9fd]" : "bg-white"}
                        >
                          <td className="p-4 text-[#3a4a6b] font-medium text-sm">
                            {header}
                          </td>
                          {category.tools.map((tool) => {
                            const hasFeature = category.featureMatrix[tool.slug]?.[hi] ?? false;
                            return (
                              <td key={tool.slug} className="p-4 text-center">
                                {hasFeature ? (
                                  <svg className="w-5 h-5 mx-auto text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                  </svg>
                                ) : (
                                  <svg className="w-5 h-5 mx-auto text-[#d8dff0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                  </svg>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                      {/* Price row */}
                      <tr className="border-t border-[#e8ecf4] bg-[#f8f9fd]">
                        <td className="p-4 font-[Syne] font-bold text-sm text-[#060c1a]">
                          Preis
                        </td>
                        {category.tools.map((tool) => (
                          <td
                            key={tool.slug}
                            className="p-4 text-center font-[Syne] font-bold text-sm"
                            style={{ color: accent }}
                          >
                            {tool.priceRange}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ── Tool Details ── */}
            <h2 className="font-[Syne] font-bold text-2xl text-[#060c1a] mb-6">
              Detailvergleich
            </h2>
            <div className="space-y-4 mb-12">
              {category.tools.map((tool, i) => (
                <ToolCard
                  key={tool.slug}
                  tool={tool}
                  index={i}
                  accent={accent}
                  isExpanded={expanded.has(tool.slug)}
                  onToggle={() => toggleExpand(tool.slug)}
                />
              ))}
            </div>

            {/* ── Fazit / Empfehlung ── */}
            <div className="rounded-2xl border bg-white p-8 shadow-sm mb-12" style={{ borderColor: "#d8dff020" }}>
              <h2 className="font-[Syne] font-bold text-xl text-[#060c1a] mb-4">
                Unsere Empfehlung
              </h2>
              <AccordionSection
                items={category.tools.map((tool) => ({
                  title: `${tool.name} — ${tool.bestFor}`,
                  content: (
                    <div className="space-y-3">
                      <p className="text-[#3a4a6b] text-sm leading-relaxed">
                        <strong>Preis:</strong> {tool.priceRange}
                        {tool.priceNote && ` (${tool.priceNote})`}
                      </p>
                      <p className="text-[#3a4a6b] text-sm leading-relaxed">
                        <strong>Zielgruppe:</strong> {tool.targetSize}
                      </p>
                      <p className="text-[#3a4a6b] text-sm leading-relaxed">
                        <strong>DACH-Relevanz:</strong>{" "}
                        {"★".repeat(tool.ratings.dachRelevance)}
                        {"☆".repeat(5 - tool.ratings.dachRelevance)}
                      </p>
                      <a
                        href={tool.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:underline"
                        style={{ color: accent }}
                      >
                        {tool.name} ansehen *
                      </a>
                    </div>
                  ),
                }))}
                accent={accent}
                allowMultiple
              />
            </div>

            {/* ── Werbung / Affiliate Disclosure (DDG §6, UWG §5a, ECG §6) ── */}
            <div className="rounded-xl bg-[#fff8e1] border border-[#f0e6c0] p-5 mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#b8960c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p className="text-sm text-[#8a7020] font-semibold mb-1">
                    Werbung / Transparenzhinweis
                  </p>
                  <p className="text-xs text-[#8a7020] leading-relaxed mb-2">
                    Diese Seite enthält Affiliate-Links (mit * gekennzeichnet). Wenn Sie über
                    einen solchen Link eine Software erwerben, erhalten wir möglicherweise eine
                    Vergütung vom Anbieter — ohne Mehrkosten für Sie. Die redaktionelle
                    Bewertung und Reihenfolge der Anbieter wird dadurch <strong>nicht</strong>{" "}
                    beeinflusst. Alle Vergleiche basieren auf objektiven Kriterien, eigener
                    Recherche und öffentlich verfügbaren Informationen.
                  </p>
                  <p className="text-[11px] text-[#a08a30] leading-relaxed">
                    Rechtsgrundlage: DDG §6 (Digitale-Dienste-Gesetz), UWG §5a
                    (Gesetz gegen unlauteren Wettbewerb), ECG §6 (E-Commerce-Gesetz AT).
                  </p>
                </div>
              </div>
            </div>

            {/* ── Trademark Disclaimer ── */}
            <p className="text-[11px] text-[#7a8db0] leading-relaxed mb-12">
              Alle genannten Produkt- und Firmennamen sind Marken oder eingetragene Marken
              der jeweiligen Unternehmen. Die Nennung dient ausschließlich der
              Produktidentifikation und stellt keine Empfehlung durch die Markeninhaber dar.
            </p>

            {/* ── CTA: Tools ── */}
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                background: "linear-gradient(135deg, #0A254008, #0ea5e910)",
                border: "1px solid #0A254015",
              }}
            >
              <h2 className="font-[Syne] font-bold text-xl text-[#060c1a] mb-3">
                Erst prüfen, dann kaufen
              </h2>
              <p className="text-[#3a4a6b] text-sm mb-6 max-w-lg mx-auto">
                Bevor Sie in Software investieren: Prüfen Sie mit unseren kostenlosen
                Tools, welche Regulierungen für Sie gelten.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/tools/nis2-betroffenheits-check"
                  className="px-5 py-2.5 rounded-xl text-sm font-[Syne] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg bg-[#0ea5e9]"
                >
                  NIS2-Betroffenheits-Check
                </Link>
                <Link
                  href="/tools/haftungs-pruefer"
                  className="px-5 py-2.5 rounded-xl text-sm font-[Syne] font-bold transition-all hover:-translate-y-0.5 bg-white text-[#ef4444] border border-[#ef444440]"
                >
                  GF-Haftungs-Prüfer
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
