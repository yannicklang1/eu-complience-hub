"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialShareBar from "@/components/SocialShareBar";
import { useTranslations } from "@/i18n/use-translations";

/* ══════════════════════════════════════════════════════════════
   Regulierungsvergleich — Interactive comparison matrix
   ══════════════════════════════════════════════════════════════ */

interface Regulation {
  id: string;
  name: string;
  fullName: string;
  type: "Verordnung" | "Richtlinie";
  status: string;
  statusColor: string;
  scope: string;
  penalty: string;
  penaltyDetail: string;
  deadline: string;
  affectedSize: string;
  keyObligation: string;
  personalLiability: boolean;
  href: string;
  accent: string;
}

const REGULATIONS: Regulation[] = [
  {
    id: "nisg",
    name: "NISG 2026",
    fullName: "Netz- und Informationssystemsicherheitsgesetz",
    type: "Richtlinie",
    status: "Ab Okt. 2026",
    statusColor: "#f59e0b",
    scope: "Cybersicherheit für kritische Sektoren",
    penalty: "10 Mio. € / 2%",
    penaltyDetail: "10 Mio. € oder 2% des weltweiten Jahresumsatzes",
    deadline: "1. Oktober 2026",
    affectedSize: "50+ MA oder 10+ Mio. € Umsatz",
    keyObligation: "Risikomanagement, Vorfallmeldung (24h), Lieferkettensicherheit",
    personalLiability: true,
    href: "/nisg-2026",
    accent: "#1e40af",
  },
  {
    id: "aiact",
    name: "AI Act",
    fullName: "EU Artificial Intelligence Act",
    type: "Verordnung",
    status: "Stufenweise 2025–27",
    statusColor: "#f59e0b",
    scope: "KI-Systeme (Entwicklung & Einsatz)",
    penalty: "35 Mio. € / 7%",
    penaltyDetail: "35 Mio. € oder 7% des weltweiten Jahresumsatzes",
    deadline: "2. August 2025 / 2026 / 2027",
    affectedSize: "Alle KI-Anbieter und -Betreiber",
    keyObligation: "Risikoklassifizierung, Konformitätsbewertung, Transparenz",
    personalLiability: false,
    href: "/eu-ai-act",
    accent: "#7c3aed",
  },
  {
    id: "dora",
    name: "DORA",
    fullName: "Digital Operational Resilience Act",
    type: "Verordnung",
    status: "In Kraft",
    statusColor: "#10b981",
    scope: "Digitale Resilienz im Finanzsektor",
    penalty: "Aufsichtsrechtlich",
    penaltyDetail: "Zwangsgelder, Lizenzentzug, Tätigkeitsverbote",
    deadline: "17. Januar 2025",
    affectedSize: "Alle Finanzunternehmen + krit. IKT-Anbieter",
    keyObligation: "IKT-Risikomanagement, TLPT, Drittanbieter-Management",
    personalLiability: true,
    href: "/dora",
    accent: "#059669",
  },
  {
    id: "dsgvo",
    name: "DSGVO",
    fullName: "Datenschutz-Grundverordnung",
    type: "Verordnung",
    status: "In Kraft",
    statusColor: "#10b981",
    scope: "Verarbeitung personenbezogener Daten",
    penalty: "20 Mio. € / 4%",
    penaltyDetail: "20 Mio. € oder 4% des weltweiten Jahresumsatzes",
    deadline: "25. Mai 2018",
    affectedSize: "Praktisch jedes Unternehmen",
    keyObligation: "Rechtsgrundlage, Betroffenenrechte, TOMs, DPO",
    personalLiability: true,
    href: "/dsgvo",
    accent: "#2563eb",
  },
  {
    id: "cra",
    name: "CRA",
    fullName: "Cyber Resilience Act",
    type: "Verordnung",
    status: "Ab Sep. 2026",
    statusColor: "#f59e0b",
    scope: "Produkte mit digitalen Elementen",
    penalty: "15 Mio. € / 2,5%",
    penaltyDetail: "15 Mio. € oder 2,5% des weltweiten Jahresumsatzes",
    deadline: "September 2026 (Meldepflichten)",
    affectedSize: "Alle Hersteller digitaler Produkte",
    keyObligation: "Security-by-Design, SBOM, 5 Jahre Updates, Meldepflicht",
    personalLiability: false,
    href: "/cra",
    accent: "#ea580c",
  },
  {
    id: "csrd",
    name: "CSRD",
    fullName: "Corporate Sustainability Reporting Directive",
    type: "Richtlinie",
    status: "Stufenweise 2024–28",
    statusColor: "#f59e0b",
    scope: "Nachhaltigkeitsberichterstattung",
    penalty: "National geregelt",
    penaltyDetail: "Je nach Mitgliedstaat: Ordnungsstrafen, Bußgelder",
    deadline: "Ab GJ 2024/2025/2026",
    affectedSize: "> 250 MA oder > 50 Mio. € Umsatz",
    keyObligation: "ESRS-Berichte, Doppelte Wesentlichkeit, Prüfungspflicht",
    personalLiability: true,
    href: "/csrd-esg",
    accent: "#16a34a",
  },
  {
    id: "mica",
    name: "MiCA",
    fullName: "Markets in Crypto-Assets Regulation",
    type: "Verordnung",
    status: "In Kraft",
    statusColor: "#10b981",
    scope: "Kryptoassets und Krypto-Dienstleister",
    penalty: "5 Mio. € / 12,5%",
    penaltyDetail: "5 Mio. € oder bis zu 12,5% des Jahresumsatzes",
    deadline: "30. Dezember 2024",
    affectedSize: "CASPs, Token-Emittenten, Stablecoin-Anbieter",
    keyObligation: "Zulassung, Whitepaper, Reserven, Geldwäsche-Prävention",
    personalLiability: true,
    href: "/mica",
    accent: "#f59e0b",
  },
  {
    id: "dataact",
    name: "Data Act",
    fullName: "EU Data Act",
    type: "Verordnung",
    status: "Ab Sep. 2025",
    statusColor: "#f59e0b",
    scope: "IoT-Daten und Cloud-Dienste",
    penalty: "National geregelt",
    penaltyDetail: "Mitgliedstaaten legen Sanktionsrahmen fest",
    deadline: "12. September 2025",
    affectedSize: "IoT-Hersteller, Cloud-Anbieter, Dateninhaber",
    keyObligation: "Datenzugang, Cloud-Switching, Interoperabilität",
    personalLiability: false,
    href: "/data-act",
    accent: "#0ea5e9",
  },
  {
    id: "bafg",
    name: "BaFG",
    fullName: "Barrierefreiheitsstärkungsgesetz",
    type: "Richtlinie",
    status: "In Kraft",
    statusColor: "#10b981",
    scope: "Barrierefreiheit digitaler Produkte & Dienste",
    penalty: "National geregelt",
    penaltyDetail: "Ordnungsstrafen, Verkaufsverbote bei Nichtkonformität",
    deadline: "28. Juni 2025",
    affectedSize: "Alle Anbieter bestimmter Produkte & Dienste",
    keyObligation: "WCAG-Konformität, Barrierefreiheitserklärung, Marktüberwachung",
    personalLiability: false,
    href: "/bafg",
    accent: "#2563eb",
  },
];

const COMPARISON_FIELDS: { key: keyof Regulation; label: string; icon: string }[] = [
  { key: "type", label: "Rechtsform", icon: "📜" },
  { key: "status", label: "Status", icon: "🔔" },
  { key: "scope", label: "Anwendungsbereich", icon: "🎯" },
  { key: "penalty", label: "Max. Bußgeld", icon: "💸" },
  { key: "deadline", label: "Deadline", icon: "⏰" },
  { key: "affectedSize", label: "Betroffene Größe", icon: "🏢" },
  { key: "keyObligation", label: "Kernpflichten", icon: "📋" },
];

export default function VergleichContent() {
  const { locale } = useTranslations();
  const [selected, setSelected] = useState<Set<string>>(
    new Set(REGULATIONS.map((r) => r.id))
  );

  function toggleRegulation(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 2) next.delete(id); // min 2
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const filteredRegs = REGULATIONS.filter((r) => selected.has(r.id));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#060c1a]">
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(250,204,21,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-6">
              <span className="text-yellow-400 text-xs font-semibold">
                {REGULATIONS.length} Regulierungen
              </span>
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              Regulierungs
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                vergleich
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Vergleichen Sie EU-Regulierungen Seite an Seite: Bußgelder,
              Fristen, Pflichten und Anwendungsbereiche auf einen Blick.
            </p>
          </div>
        </section>

        {/* ── Regulation Selector ── */}
        <section className="px-6 pb-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs text-slate-500 mb-3 text-center">
              Wählen Sie die Regulierungen zum Vergleich (min. 2):
            </p>

            {/* Quick Presets */}
            <div className="flex items-center gap-2 flex-wrap justify-center mb-4">
              {[
                { label: "Alle", ids: REGULATIONS.map((r) => r.id) },
                { label: "IT & Cyber", ids: ["nisg", "dora", "cra"] },
                { label: "Daten & KI", ids: ["dsgvo", "aiact", "dataact"] },
                { label: "Finanz", ids: ["dora", "mica", "dsgvo"] },
                { label: "GF-Haftung", ids: REGULATIONS.filter((r) => r.personalLiability).map((r) => r.id) },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setSelected(new Set(preset.ids))}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-semibold text-yellow-400/70 border border-yellow-400/10 bg-yellow-400/[0.03] hover:border-yellow-400/25 hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              {REGULATIONS.map((reg) => {
                const isSelected = selected.has(reg.id);
                return (
                  <button
                    key={reg.id}
                    onClick={() => toggleRegulation(reg.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-white/[0.08] text-white border-white/15"
                        : "bg-white/[0.02] text-slate-500 border-white/5 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        background: isSelected ? reg.accent : "transparent",
                        border: isSelected ? "none" : "2px solid rgba(255,255,255,0.1)",
                      }}
                    />
                    {reg.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Comparison Matrix ── */}
        <section className="px-6 pb-12">
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <motion.div
              layout
              className="min-w-[600px]"
            >
              {/* Header Row */}
              <div
                className="grid gap-px bg-white/[0.04] rounded-t-2xl overflow-hidden"
                style={{
                  gridTemplateColumns: `200px repeat(${filteredRegs.length}, 1fr)`,
                }}
              >
                <div className="bg-slate-900/80 p-4 flex items-end">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                    Kriterium
                  </span>
                </div>
                {filteredRegs.map((reg) => (
                  <div key={reg.id} className="bg-slate-900/80 p-4 text-center">
                    <Link
                      href={reg.href}
                      className="group inline-block"
                    >
                      <div
                        className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center"
                        style={{ background: `${reg.accent}20` }}
                      >
                        <span
                          className="font-[Syne] font-extrabold text-xs"
                          style={{ color: reg.accent }}
                        >
                          {reg.name.slice(0, 3).toUpperCase()}
                        </span>
                      </div>
                      <h3 className="font-[Syne] font-bold text-sm text-white group-hover:text-yellow-400 transition-colors">
                        {reg.name}
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                        {reg.fullName}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Data Rows */}
              {COMPARISON_FIELDS.map((field, i) => (
                <div
                  key={field.key}
                  className={`grid gap-px ${i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}`}
                  style={{
                    gridTemplateColumns: `200px repeat(${filteredRegs.length}, 1fr)`,
                  }}
                >
                  <div className="bg-slate-900/60 p-4 flex items-center gap-2">
                    <span className="text-sm">{field.icon}</span>
                    <span className="text-xs font-semibold text-slate-400">
                      {field.label}
                    </span>
                  </div>
                  {filteredRegs.map((reg) => {
                    const value = String(reg[field.key]);
                    const isStatus = field.key === "status";
                    const isPenalty = field.key === "penalty";

                    return (
                      <div
                        key={reg.id}
                        className="bg-slate-900/60 p-4 flex items-center justify-center"
                      >
                        {isStatus ? (
                          <span
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold"
                            style={{
                              background: `${reg.statusColor}15`,
                              color: reg.statusColor,
                            }}
                          >
                            {value}
                          </span>
                        ) : isPenalty ? (
                          <span className="text-sm font-bold text-red-400 text-center">
                            {value}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-300 text-center leading-relaxed">
                            {value}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Personal Liability Row */}
              <div
                className="grid gap-px bg-white/[0.03] rounded-b-2xl overflow-hidden"
                style={{
                  gridTemplateColumns: `200px repeat(${filteredRegs.length}, 1fr)`,
                }}
              >
                <div className="bg-slate-900/60 p-4 flex items-center gap-2">
                  <span className="text-sm">⚠️</span>
                  <span className="text-xs font-semibold text-slate-400">
                    GF-Haftung
                  </span>
                </div>
                {filteredRegs.map((reg) => (
                  <div
                    key={reg.id}
                    className="bg-slate-900/60 p-4 flex items-center justify-center"
                  >
                    {reg.personalLiability ? (
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-red-500/15 text-red-400">
                        Ja — persönlich
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-500/15 text-slate-400">
                        Nein
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Related Tools ── */}
        <section className="px-6 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: "Regulierung-Finder", desc: "Welche Gesetze betreffen Sie?", href: "/tools/regulierung-finder", icon: "\uD83E\uDDED", accent: "#FACC15" },
                { title: "Bußgeld-Rechner", desc: "Strafrahmen berechnen", href: "/tools/bussgeld-rechner", icon: "\uD83D\uDCB8", accent: "#ef4444" },
                { title: "Haftungs-Prüfer", desc: "Persönliches Risiko prüfen", href: "/tools/haftungs-pruefer", icon: "\u2696\uFE0F", accent: "#dc2626" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex items-center gap-3 px-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: `${tool.accent}15` }}>
                    {tool.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-300 group-hover:text-yellow-400 transition-colors">
                      {tool.title}
                    </p>
                    <p className="text-xs text-slate-500">{tool.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Summary Cards ── */}
        <section className="px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-[Syne] font-bold text-lg text-white mb-6 text-center">
              Auf einen Blick
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-red-400/10 bg-red-400/5 p-5 text-center">
                <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-2">
                  Höchstes Bußgeld
                </p>
                <p className="font-[Syne] font-extrabold text-2xl text-red-400">
                  35 Mio. €
                </p>
                <p className="text-xs text-slate-400 mt-1">AI Act (7% Umsatz)</p>
              </div>
              <div className="rounded-xl border border-amber-400/10 bg-amber-400/5 p-5 text-center">
                <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-2">
                  Nächste Frist
                </p>
                <p className="font-[Syne] font-extrabold text-2xl text-amber-400">
                  Okt. 2026
                </p>
                <p className="text-xs text-slate-400 mt-1">NISG 2026 Inkrafttreten</p>
              </div>
              <div className="rounded-xl border border-blue-400/10 bg-blue-400/5 p-5 text-center">
                <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-2">
                  GF-Haftung
                </p>
                <p className="font-[Syne] font-extrabold text-2xl text-blue-400">
                  {REGULATIONS.filter((r) => r.personalLiability).length} von {REGULATIONS.length}
                </p>
                <p className="text-xs text-slate-400 mt-1">Regulierungen mit persönlicher Haftung</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Share ── */}
        <section className="px-6 pb-4">
          <div className="max-w-3xl mx-auto">
            <SocialShareBar
              path="/vergleich"
              title="EU-Regulierungsvergleich"
              dark
              label="Vergleich teilen"
              sublabel="Teilen Sie diese Regulierungsübersicht mit Kollegen"
            />
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto rounded-2xl border border-yellow-400/10 bg-yellow-400/5 p-8 sm:p-10 text-center">
            <h2 className="font-[Syne] font-bold text-xl text-white mb-3">
              Welche Regulierungen betreffen Sie?
            </h2>
            <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">
              Nutzen Sie unseren Regulierung-Finder für eine individuelle
              Analyse — kostenlos in 3 Minuten.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/${locale}/tools/regulierung-finder`}
                className="px-6 py-3 rounded-xl font-bold text-sm text-slate-900"
                style={{
                  background: "linear-gradient(135deg, #FACC15, #EAB308)",
                  boxShadow:
                    "0 8px 32px rgba(250,204,21,0.3), 0 2px 8px rgba(250,204,21,0.2)",
                }}
              >
                Regulierung-Finder starten
              </Link>
              <Link
                href={`/${locale}/kontakt`}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-slate-300 border border-white/10 hover:bg-white/[0.04] transition-all"
              >
                Compliance-Report erstellen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
