"use client";

import { motion } from "framer-motion";
import GuidePageLayout from "@/components/GuidePageLayout";
import type { TocItem } from "@/components/TableOfContents";
import type { QuickFact } from "@/components/GuidePageLayout";
import AccordionSection from "@/components/AccordionSection";
import LawRef from "@/components/LawRef";
import { SourceRef, SourceList, type Source } from "@/components/SourceRef";
import ToolRecommendation from "@/components/ToolRecommendation";
import RelatedGuides from "@/components/RelatedGuides";

/* ─────────────────── Sources (Perplexity-style) ─────────────────── */
const sources: Source[] = [
  {
    id: 1,
    title: "Verordnung (EU) 2024/1689 — EU AI Act (Volltext)",
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/deu",
    desc: "Offizielle deutsche Fassung im EUR-Lex Portal",
    type: "Verordnung",
  },
  {
    id: 2,
    title: "EU AI Act — englische Fassung",
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng",
    desc: "Offizielle englische Fassung im EUR-Lex Portal",
    type: "Verordnung",
  },
  {
    id: 3,
    title: "EU AI Office — Europäischer Ansatz für KI",
    url: "https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence",
    desc: "EU-Kommission: KI-Strategie, Leitlinien und Umsetzung",
    type: "Behörde",
  },
  {
    id: 4,
    title: "RTR — KI-Servicestelle Österreich",
    url: "https://www.rtr.at",
    desc: "Rundfunk und Telekom Regulierungs-GmbH — KI-Aufsicht für Österreich",
    type: "Aufsicht AT",
  },
  {
    id: 5,
    title: "Digital Omnibus Verordnung — Entwurf",
    url: "https://ec.europa.eu/commission/presscorner/detail/de/ip_25_2882",
    desc: "EU-Kommission: Vereinfachungspaket für KMUs (Nov. 2025)",
    type: "Behörde",
  },
  {
    id: 6,
    title: "Anhang III — Hochrisiko-KI-Systeme",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32024R1689#anx_III",
    desc: "Vollständige Liste der Hochrisiko-Anwendungsbereiche",
    type: "Verordnung",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Überblick" },
  { id: "timeline", label: "Timeline & Fristen" },
  { id: "risiko", label: "Risiko-Klassifizierung" },
  { id: "betroffene", label: "Wer ist betroffen?" },
  { id: "pflichten", label: "Pflichten Hochrisiko-KI" },
  { id: "gpai", label: "GPAI-Modelle" },
  { id: "strafen", label: "Strafen" },
  { id: "oesterreich", label: "Österreich" },
  { id: "fahrplan", label: "Compliance-Fahrplan" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Strafe", value: "35 Mio. € oder 7% Umsatz" },
  { label: "Hauptdeadline", value: "2. August 2026" },
  { label: "Risikostufen", value: "4 Kategorien" },
  { label: "Aufsicht (AT)", value: "RTR / KI-Servicestelle" },
  { label: "In Kraft seit", value: "1. August 2024" },
  { label: "Gilt für", value: "Anbieter, Betreiber, Importeure" },
];

/* ─────────────────── Section wrapper ─────────────────── */
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 mb-16">
      <h2 className="font-[Syne] font-extrabold text-2xl sm:text-3xl text-[#060c1a] tracking-tight mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
}

/* ─────────────────── Stat card ─────────────────── */
function StatCard({
  value,
  label,
  accent = "#0A2540",
}: {
  value: string;
  label: string;
  accent?: string;
}) {
  const fontSize = value.length <= 5 ? "text-xl sm:text-2xl" : value.length <= 10 ? "text-lg sm:text-xl" : "text-base sm:text-lg";
  return (
    <div className="rounded-2xl border border-[#d8dff0] bg-white p-5 text-center overflow-hidden">
      <div
        className={`font-[Syne] font-extrabold ${fontSize} mb-1 break-words`}
        style={{ color: accent }}
      >
        {value}
      </div>
      <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

/* ─────────────────── Timeline item ─────────────────── */
function TimelineItem({
  date,
  title,
  description,
  active = false,
  done = false,
}: {
  date: string;
  title: string;
  description: string;
  active?: boolean;
  done?: boolean;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col items-center">
        <div
          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
            done
              ? "bg-emerald-500 border-emerald-500"
              : active
              ? "bg-[#0A2540] border-[#0A2540] animate-pulse"
              : "bg-white border-[#d8dff0]"
          }`}
        />
        <div className="w-px flex-1 bg-[#e8ecf4] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] font-semibold text-[#7a8db0]">
            {date}
          </span>
          {done && (
            <span className="text-[9px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-mono font-bold border border-emerald-200">
              Aktiv
            </span>
          )}
          {active && (
            <span className="text-[9px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-mono font-bold border border-blue-200">
              Hauptdeadline
            </span>
          )}
        </div>
        <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">
          {title}
        </div>
        <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────── Risk pyramid tier ─────────────────── */
function RiskTier({
  level,
  label,
  color,
  bgColor,
  description,
  examples,
  width,
}: {
  level: string;
  label: string;
  color: string;
  bgColor: string;
  description: string;
  examples: string[];
  width: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
    >
      <div
        className="rounded-2xl border-2 p-5 sm:p-6 transition-all duration-300 hover:shadow-lg"
        style={{
          borderColor: color,
          background: bgColor,
          width,
          maxWidth: "100%",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ background: color }}
          />
          <div>
            <span
              className="font-mono text-[10px] font-bold tracking-wider uppercase"
              style={{ color }}
            >
              {level}
            </span>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a]">
              {label}
            </h3>
          </div>
        </div>
        <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {examples.map((ex) => (
            <span
              key={ex}
              className="text-[11px] px-2.5 py-1 rounded-lg font-mono"
              style={{
                background: `${color}10`,
                color: color,
                border: `1px solid ${color}25`,
              }}
            >
              {ex}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────── Role card ─────────────────── */
function RoleCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 hover:border-[#0A2540]/20 hover:shadow-md transition-all duration-300">
      <div className="w-10 h-10 rounded-xl bg-[#0A2540]/[0.06] flex items-center justify-center mb-4 text-[#0A2540]">
        {icon}
      </div>
      <h3 className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-2">
        {title}
      </h3>
      <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

/* ─────────────────── Roadmap step ─────────────────── */
function RoadmapStep({
  phase,
  title,
  items,
  accent = "#0A2540",
}: {
  phase: string;
  title: string;
  items: string[];
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-1 h-full"
        style={{ background: accent }}
      />
      <div
        className="font-mono text-[10px] font-bold tracking-wider uppercase mb-2"
        style={{ color: accent }}
      >
        {phase}
      </div>
      <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <svg
              className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-[14px] text-[#5a6a8a] leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */
export default function GuideContent() {
  return (
    <GuidePageLayout
      title="EU AI Act"
      subtitle="Die europäische KI-Verordnung im Detail: Risikostufen, Fristen, Pflichten und Strafen. Was Ihr Unternehmen jetzt wissen und tun muss."
      regulationKey="Verordnung (EU) 2024/1689"
      accent="#0A2540"
      badgeLabel="Deadline Aug 2026"
      badgeColor="#dc2626"
      quickFacts={quickFacts}
      tocItems={tocItems}
      trustBadge={{ lastReview: "18.04.2026", sourceCount: 6 }}
      heroIcon={
        <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      }
      href="/eu-ai-act"
    >
      {/* ═══════════════════ 1. ÜBERBLICK ═══════════════════ */}
      <Section id="ueberblick" title="Überblick: Was ist der EU AI Act?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Der <strong>EU AI Act</strong> (Verordnung (EU) 2024/1689) ist das weltweit
          erste umfassende Gesetz zur Regulierung von Künstlicher Intelligenz.<SourceRef id={1} sources={sources} /> Am
          1. August 2024 in Kraft getreten, schafft er einen einheitlichen Rechtsrahmen
          für die Entwicklung, den Vertrieb und den Einsatz von KI-Systemen in der
          Europäischen Union.
        </p>
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Das Gesetz verfolgt einen <strong>risikobasierten Ansatz</strong>: Je höher
          das Risiko eines KI-Systems für Gesundheit, Sicherheit oder Grundrechte, desto
          strenger die Anforderungen. Der Act betrifft nicht nur EU-Unternehmen, sondern
          jeden Anbieter, dessen KI-System auf dem EU-Markt eingesetzt wird.
        </p>

        {/* Key stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard value="35M€" label="Max. Strafe" accent="#dc2626" />
          <StatCard value="Aug 2026" label="Hauptdeadline" />
          <StatCard value="4" label="Risikostufen" />
          <StatCard value="2024" label="In Kraft seit" accent="#059669" />
        </div>

        {/* Info box */}
        <div className="rounded-2xl bg-blue-50/60 border border-blue-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-[#0A2540] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-[#0A2540] mb-1">
                Digital Omnibus Verordnung
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                Am 26. November 2025 hat die EU-Kommission den Entwurf einer &quot;Omnibus-Vereinfachung&quot;
                vorgestellt.<SourceRef id={5} sources={sources} /> Einige Fristen und Schwellenwerte für KMUs könnten angepasst werden.
                Die Kernpflichten bleiben bestehen. Wir aktualisieren diesen Guide bei finaler Verabschiedung.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 2. TIMELINE ═══════════════════ */}
      <Section id="timeline" title="Timeline & Fristen">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Der EU AI Act wird schrittweise angewendet. Einige Bestimmungen gelten bereits,
          die Hauptpflichten treten im August 2026 in Kraft.
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8">
          <TimelineItem
            date="2. Februar 2025"
            title="Verbotene KI-Praktiken"
            description="Verbot von Social Scoring, manipulativer KI, biometrischer Kategorisierung nach sensiblen Merkmalen und Echtzeit-Gesichtserkennung im öffentlichen Raum (mit Ausnahmen)."
            done
          />
          <TimelineItem
            date="2. August 2025"
            title="GPAI & Governance"
            description="Pflichten für General Purpose AI (GPAI) Modelle wie GPT-4 oder Llama. Transparenzpflichten, technische Dokumentation, Copyright-Compliance. Einrichtung des EU AI Office."
            done
          />
          <TimelineItem
            date="2. August 2026"
            title="Hochrisiko-KI-Systeme"
            description="Kernstück des AI Act: Umfangreiche Pflichten für Hochrisiko-KI inkl. Risikomanagement, Daten-Governance, technische Dokumentation, Logging, Transparenz, menschliche Aufsicht und Cybersicherheit."
            active
          />
          <TimelineItem
            date="2. August 2027"
            title="KI in regulierten Produkten"
            description="Hochrisiko-KI-Systeme, die als Sicherheitskomponenten in bereits regulierten Produkten eingesetzt werden (z.B. Medizinprodukte, Maschinen, Aufzüge)."
          />
        </div>
      </Section>

      {/* ═══════════════════ 3. RISIKO-KLASSIFIZIERUNG ═══════════════════ */}
      <Section id="risiko" title="Risiko-Klassifizierung">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Der AI Act klassifiziert KI-Systeme in vier Risikostufen.<SourceRef id={6} sources={sources} /> Die regulatorischen
          Anforderungen steigen mit dem Risikoniveau.
        </p>

        <div className="space-y-4 flex flex-col items-center">
          <RiskTier
            level="Stufe 4"
            label="Unzulässiges Risiko"
            color="#dc2626"
            bgColor="#fef2f2"
            description="Diese KI-Systeme sind verboten. Sie stellen eine inakzeptable Bedrohung für die Grundrechte dar."
            examples={["Social Scoring", "Manipulative KI", "Biometrische Kategorisierung", "Echtzeit-Gesichtserkennung"]}
            width="65%"
          />
          <RiskTier
            level="Stufe 3"
            label="Hohes Risiko"
            color="#ea580c"
            bgColor="#fff7ed"
            description="Umfangreiche Compliance-Pflichten. Betrifft KI in kritischen Bereichen wie Personalwesen, Kreditvergabe, Bildung, Strafverfolgung."
            examples={["KI-Recruiting", "Kreditscoring", "Biometrie", "Kritische Infrastruktur", "Bildungs-KI"]}
            width="78%"
          />
          <RiskTier
            level="Stufe 2"
            label="Begrenztes Risiko"
            color="#ca8a04"
            bgColor="#fefce8"
            description="Transparenzpflichten: Nutzer müssen wissen, dass sie mit KI interagieren. Kennzeichnungspflicht für KI-generierte Inhalte."
            examples={["Chatbots", "Deepfakes", "Emotion Recognition", "KI-Content"]}
            width="90%"
          />
          <RiskTier
            level="Stufe 1"
            label="Minimales Risiko"
            color="#16a34a"
            bgColor="#f0fdf4"
            description="Keine besonderen Pflichten. Freiwillige Verhaltenskodizes empfohlen. Betrifft die große Mehrheit aller KI-Anwendungen."
            examples={["Spam-Filter", "KI-Empfehlungen", "Spiele-KI", "Übersetzungs-KI"]}
            width="100%"
          />
        </div>
      </Section>

      {/* ═══════════════════ 4. WER IST BETROFFEN? ═══════════════════ */}
      <Section id="betroffene" title="Wer ist betroffen?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Der AI Act definiert vier zentrale Rollen mit unterschiedlichen Pflichten.
          Ein Unternehmen kann mehrere Rollen gleichzeitig einnehmen.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RoleCard
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1M8.83 4.06c1.67-1.67 4.36-1.67 6.04 0l5.07 5.07c1.67 1.67 1.67 4.36 0 6.04l-5.07 5.07c-1.67 1.67-4.36 1.67-6.04 0l-5.07-5.07c-1.67-1.67-1.67-4.36 0-6.04l5.07-5.07z" />
              </svg>
            }
            title="Anbieter (Provider)"
            description="Entwickelt oder lässt KI-Systeme entwickeln und bringt sie unter eigenem Namen auf den EU-Markt. Trägt die Hauptverantwortung für Compliance."
          />
          <RoleCard
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            }
            title="Betreiber (Deployer)"
            description="Setzt KI-Systeme in eigener Verantwortung ein. Muss sicherstellen, dass die Nutzung den Vorgaben entspricht, menschliche Aufsicht gewährleisten und Logs führen."
          />
          <RoleCard
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            }
            title="Importeur"
            description="Bringt KI-Systeme von Anbietern außerhalb der EU auf den europäischen Markt. Muss CE-Konformität und Dokumentation prüfen."
          />
          <RoleCard
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
              </svg>
            }
            title="Händler (Distributor)"
            description="Stellt KI-Systeme auf dem EU-Markt bereit, ohne sie selbst zu verändern. Muss Konformität verifizieren und bei Risiken die Behörden informieren."
          />
        </div>
      </Section>

      {/* ═══════════════════ 5. PFLICHTEN HOCHRISIKO-KI ═══════════════════ */}
      <Section id="pflichten" title="Pflichten für Hochrisiko-KI-Systeme">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Hochrisiko-KI-Systeme unterliegen den strengsten Anforderungen des AI Act.
          Anbieter müssen alle folgenden Pflichten erfüllen, bevor das System auf den
          EU-Markt gebracht werden darf.
        </p>

        <AccordionSection
          accent="#0A2540"
          items={[
            {
              title: <span>1. Risikomanagementsystem (<LawRef law="AI Act" article="9" />)</span>,
              content: (
                <div>
                  <p className="mb-3">
                    Ein kontinuierliches, iteratives Risikomanagementsystem muss über den
                    gesamten Lebenszyklus des KI-Systems eingerichtet und gepflegt werden.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Identifikation und Analyse bekannter und vorhersehbarer Risiken</li>
                    <li>Schätzung und Bewertung der Risiken bei bestimmungsgemäßem und vorhersehbarem Fehlgebrauch</li>
                    <li>Geeignete Risikomanagement-Maßnahmen implementieren</li>
                    <li>Testen gegen vordefinierte Metriken und Schwellenwerte</li>
                  </ul>
                </div>
              ),
            },
            {
              title: <span>2. Daten-Governance (<LawRef law="AI Act" article="10" />)</span>,
              content: (
                <div>
                  <p className="mb-3">
                    Trainings-, Validierungs- und Testdatensätze müssen strengen Qualitätskriterien entsprechen.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Relevante, repräsentative und möglichst fehlerfreie Daten</li>
                    <li>Berücksichtigung besonderer geografischer, kontextueller und verhaltensbezogener Aspekte</li>
                    <li>Prüfung auf mögliche Verzerrungen (Bias)</li>
                    <li>Datenschutz-konforme Verarbeitung, Anonymisierung wenn möglich</li>
                  </ul>
                </div>
              ),
            },
            {
              title: <span>3. Technische Dokumentation (<LawRef law="AI Act" article="11" />)</span>,
              content: (
                <div>
                  <p className="mb-3">
                    Umfassende technische Dokumentation muss vor dem Inverkehrbringen erstellt werden
                    und laufend aktuell gehalten werden.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Allgemeine Beschreibung des KI-Systems und seines Zwecks</li>
                    <li>Detaillierte Beschreibung der Komponenten und des Entwicklungsprozesses</li>
                    <li>Informationen zu Monitoring, Funktionsweise und Kontrolle</li>
                    <li>Ergebnisse der Risikobewertung</li>
                  </ul>
                </div>
              ),
            },
            {
              title: <span>4. Aufzeichnungspflichten / Logging (<LawRef law="AI Act" article="12" />)</span>,
              content: (
                <div>
                  <p className="mb-3">
                    Hochrisiko-KI-Systeme müssen automatische Aufzeichnungen (Logs) erstellen, die eine
                    Rückverfolgbarkeit ermöglichen.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Aufzeichnung des Betriebs über den gesamten Lebenszyklus</li>
                    <li>Ermöglichung der Überwachung nach dem Inverkehrbringen</li>
                    <li>Logs müssen von Betreibern mindestens 6 Monate aufbewahrt werden</li>
                    <li>Automatische Erkennung von Anomalien und riskanten Situationen</li>
                  </ul>
                </div>
              ),
            },
            {
              title: <span>5. Transparenz &amp; Information (<LawRef law="AI Act" article="13" />)</span>,
              content: (
                <div>
                  <p className="mb-3">
                    Hochrisiko-KI muss so gestaltet sein, dass Betreiber das System verstehen und
                    die Ergebnisse interpretieren können.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Klare Gebrauchsanweisung mit allen relevanten Informationen</li>
                    <li>Angabe des Leistungsniveaus, bekannter Einschränkungen und Risiken</li>
                    <li>Informationen zu menschlicher Aufsicht</li>
                    <li>Erwartete Lebensdauer und Wartungsanforderungen</li>
                  </ul>
                </div>
              ),
            },
            {
              title: <span>6. Menschliche Aufsicht (<LawRef law="AI Act" article="14" />)</span>,
              content: (
                <div>
                  <p className="mb-3">
                    KI-Systeme müssen so gestaltet sein, dass natürliche Personen sie wirksam beaufsichtigen können.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Möglichkeit, das System jederzeit zu übersteuern oder abzuschalten</li>
                    <li>Aufsichtsperson muss Fähigkeiten und Grenzen des Systems verstehen</li>
                    <li>Erkennung und Korrektur von Automatisierungsverzerrungen (Automation Bias)</li>
                    <li>Entscheidungsfreiheit der aufsichtführenden Person sicherstellen</li>
                  </ul>
                </div>
              ),
            },
            {
              title: <span>7. Genauigkeit, Robustheit &amp; Cybersicherheit (<LawRef law="AI Act" article="15" />)</span>,
              content: (
                <div>
                  <p className="mb-3">
                    Hochrisiko-KI muss ein angemessenes Maß an Genauigkeit, Robustheit und
                    Cybersicherheit aufweisen.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Deklariertes Genauigkeitsniveau in der Gebrauchsanweisung</li>
                    <li>Resilienz gegen Fehler, Störungen und Angriffe (inkl. Data Poisoning, Adversarial Attacks)</li>
                    <li>Redundanz- und Ausfallsicherheitsmechanismen</li>
                    <li>Regelmäßige Sicherheitsupdates</li>
                  </ul>
                </div>
              ),
            },
            {
              title: <span>8. Konformitätsbewertung &amp; CE-Kennzeichnung (<LawRef law="AI Act" article="43" />)</span>,
              content: (
                <div>
                  <p className="mb-3">
                    Vor dem Inverkehrbringen muss eine Konformitätsbewertung durchgeführt und
                    das System in der EU-Datenbank registriert werden.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Interne Konformitätsbewertung oder Prüfung durch benannte Stelle</li>
                    <li>CE-Konformitätserklärung ausstellen</li>
                    <li>Registrierung in der EU-Datenbank vor dem Inverkehrbringen</li>
                    <li>Post-Market-Monitoring-System einrichten</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 6. GPAI ═══════════════════ */}
      <Section id="gpai" title="General Purpose AI (GPAI) Modelle">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          GPAI-Modelle wie GPT-4, Claude, Llama oder Gemini unterliegen eigenen Regeln.
          Der AI Act unterscheidet zwischen Standard-GPAI und GPAI mit systemischem Risiko.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Standard GPAI */}
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#0A2540] mb-2">
              Alle GPAI-Modelle
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Transparenzpflichten
            </h3>
            <ul className="space-y-2">
              {[
                "Technische Dokumentation erstellen",
                "Informationen für nachgelagerte Anbieter",
                "Copyright-Richtlinie einhalten",
                "Trainingsdaten-Zusammenfassung veröffentlichen",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0A2540] flex-shrink-0 mt-2" />
                  <span className="text-[14px] text-[#5a6a8a] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Systemic risk GPAI */}
          <div className="rounded-2xl border-2 border-orange-300 bg-orange-50/50 p-6">
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-orange-600 mb-2">
              Systemisches Risiko
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Zusätzliche Pflichten
            </h3>
            <ul className="space-y-2">
              {[
                "Modellbewertung durchführen (Red Teaming)",
                "Systemische Risiken bewerten und mindern",
                "Schwerwiegende Vorfälle melden",
                "Cybersicherheit gewährleisten",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 mt-2" />
                  <span className="text-[14px] text-[#5a6a8a] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Schwellenwert:</strong> GPAI-Modelle
            gelten als systemisch riskant, wenn das kumulative Training mehr als
            10<sup>25</sup> FLOPS an Rechenleistung benötigt hat, oder wenn die
            EU-Kommission sie aufgrund ihrer Fähigkeiten als solche einstuft.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 7. STRAFEN ═══════════════════ */}
      <Section id="strafen" title="Strafen & Bußgelder">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Der EU AI Act sieht empfindliche Strafen vor, gestaffelt nach Schwere
          des Verstoßes. Die tatsächliche Höhe richtet sich nach dem jeweiligen
          Verstoß, der Unternehmensgröße und den Umständen.
        </p>

        <div className="space-y-4">
          {/* Tier 1 */}
          <div className="rounded-2xl border-2 border-red-300 bg-red-50/40 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <span className="font-[Syne] font-extrabold text-red-600 text-lg">!</span>
              </div>
              <div>
                <div className="font-mono text-[10px] font-bold text-red-600 tracking-wider uppercase">
                  Höchste Stufe
                </div>
                <div className="font-[Syne] font-extrabold text-xl text-[#060c1a]">
                  Bis zu 35 Mio. € oder 7% des Umsatzes
                </div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed ml-[52px]">
              Für Verstöße gegen die verbotenen KI-Praktiken (<LawRef law="AI Act" article="5" />). Der höhere Betrag
              (Festbetrag oder Prozentsatz) ist maßgeblich.
            </p>
          </div>

          {/* Tier 2 */}
          <div className="rounded-2xl border border-orange-200 bg-orange-50/40 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <span className="font-[Syne] font-extrabold text-orange-600 text-lg">§</span>
              </div>
              <div>
                <div className="font-mono text-[10px] font-bold text-orange-600 tracking-wider uppercase">
                  Mittlere Stufe
                </div>
                <div className="font-[Syne] font-extrabold text-xl text-[#060c1a]">
                  Bis zu 15 Mio. € oder 3% des Umsatzes
                </div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed ml-[52px]">
              Für Verstöße gegen die meisten anderen Pflichten des AI Act, insbesondere
              die Anforderungen an Hochrisiko-KI-Systeme.
            </p>
          </div>

          {/* Tier 3 */}
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#f0f2f8] flex items-center justify-center">
                <span className="font-[Syne] font-extrabold text-[#0A2540] text-lg">i</span>
              </div>
              <div>
                <div className="font-mono text-[10px] font-bold text-[#7a8db0] tracking-wider uppercase">
                  Informationspflichten
                </div>
                <div className="font-[Syne] font-extrabold text-xl text-[#060c1a]">
                  Bis zu 7,5 Mio. € oder 1% des Umsatzes
                </div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed ml-[52px]">
              Für die Bereitstellung unrichtiger, unvollständiger oder irreführender
              Informationen an Behörden oder benannte Stellen.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-blue-50/60 border border-blue-200/50 p-5 mt-6">
          <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
            <strong>KMU-Regelung:</strong> Für KMUs und Startups gelten die Prozentsätze
            gleichermaßen, jedoch wird der niedrigere Betrag (Festbetrag oder Prozentsatz)
            als Obergrenze herangezogen.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 8. ÖSTERREICH ═══════════════════ */}
      <Section id="oesterreich" title="Umsetzung in Österreich">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Als EU-Verordnung gilt der AI Act direkt in Österreich. Für die nationale
          Durchsetzung sind jedoch spezifische Strukturen geschaffen worden.
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #0A2540, #0D3068)" }}>
                <span className="text-xl">🇦🇹</span>
              </div>
              <div>
                <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
                  RTR als KI-Servicestelle
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
                  Die Rundfunk und Telekom Regulierungs-GmbH (RTR) wurde als
                  KI-Servicestelle designiert.<SourceRef id={4} sources={sources} /> Sie fungiert als zentrale Anlaufstelle
                  für Fragen zur KI-Verordnung und koordiniert die Marktüberwachung.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-[#0A2540] font-mono border border-blue-200">
                    Beratung & Information
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-[#0A2540] font-mono border border-blue-200">
                    Marktüberwachung
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-[#0A2540] font-mono border border-blue-200">
                    Regulatory Sandbox
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              KI-Beirat
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Ein interdisziplinärer KI-Beirat berät die Bundesregierung bei der
              Umsetzung der KI-Strategie und der KI-Verordnung. Er setzt sich aus
              Vertretern aus Wissenschaft, Wirtschaft, Zivilgesellschaft und
              öffentlicher Verwaltung zusammen.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Regulatory Sandbox
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Österreich richtet KI-Reallabore (Regulatory Sandboxes) ein, in denen
              Unternehmen innovative KI-Systeme unter Aufsicht der Behörden testen
              können, bevor sie auf den Markt gebracht werden.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 9. COMPLIANCE-FAHRPLAN ═══════════════════ */}
      <Section id="fahrplan" title="Ihr Compliance-Fahrplan">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          In vier Phasen zum AI-Act-konformen Unternehmen. Starten Sie jetzt,
          um die August-2026-Deadline sicher einzuhalten.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RoadmapStep
            phase="Phase 1"
            title="Bestandsaufnahme"
            accent="#0A2540"
            items={[
              "KI-Systeme im Unternehmen inventarisieren",
              "Risikokategorien zuordnen",
              "Rollen (Anbieter/Betreiber) bestimmen",
              "Gap-Analyse durchführen",
            ]}
          />
          <RoadmapStep
            phase="Phase 2"
            title="Governance aufbauen"
            accent="#0e4bbd"
            items={[
              "KI-Verantwortliche benennen",
              "Risikomanagement-Framework einrichten",
              "Interne Richtlinien erstellen",
              "Schulungsprogramm starten",
            ]}
          />
          <RoadmapStep
            phase="Phase 3"
            title="Compliance umsetzen"
            accent="#1a6bdd"
            items={[
              "Technische Dokumentation erstellen",
              "Daten-Governance implementieren",
              "Logging & Monitoring einrichten",
              "Konformitätsbewertung vorbereiten",
            ]}
          />
          <RoadmapStep
            phase="Phase 4"
            title="Betrieb & Monitoring"
            accent="#2589f5"
            items={[
              "CE-Kennzeichnung & EU-DB-Registrierung",
              "Post-Market-Monitoring starten",
              "Vorfallmeldeprozess einrichten",
              "Regelmäßige Audits planen",
            ]}
          />
        </div>
      </Section>

      {/* ═══════════════════ 10. FAQ ═══════════════════ */}
      <Section id="faq" title="Häufige Fragen (FAQ)">
        <AccordionSection
          accent="#0A2540"
          allowMultiple
          items={[
            {
              title: "Gilt der AI Act auch für Open-Source-KI?",
              content: (
                <p>
                  Grundsätzlich ja, aber mit Ausnahmen: Open-Source-Modelle, die frei
                  verfügbar gemacht werden, sind von den meisten GPAI-Pflichten befreit,
                  sofern sie nicht als systemisches Risiko eingestuft werden. Die Verbote
                  und Hochrisiko-Pflichten gelten jedoch uneingeschränkt.
                </p>
              ),
            },
            {
              title: "Sind KMUs von den Pflichten befreit?",
              content: (
                <p>
                  Nein, KMUs sind nicht grundsätzlich befreit. Allerdings sieht der AI Act
                  verhältnismäßige Strafen vor (der niedrigere Betrag gilt als Obergrenze).
                  Zudem sollen Regulatory Sandboxes KMUs den Zugang erleichtern. Die
                  geplante Omnibus-Vereinfachung könnte weitere Erleichterungen bringen.
                </p>
              ),
            },
            {
              title: "Was ist, wenn ich KI nur intern nutze?",
              content: (
                <p>
                  Als Betreiber (Deployer) haben Sie eigene Pflichten, insbesondere bei
                  Hochrisiko-KI: menschliche Aufsicht gewährleisten, Logs führen, betroffene
                  Personen informieren und eine Datenschutz-Folgenabschätzung durchführen
                  (falls relevant). Die rein interne Nutzung befreit nicht von den Pflichten.
                </p>
              ),
            },
            {
              title: "Wie hängt der AI Act mit der DSGVO zusammen?",
              content: (
                <p>
                  Der AI Act ergänzt die <LawRef law="DSGVO">DSGVO</LawRef>, ersetzt sie aber nicht. Unternehmen müssen
                  beide Regulierungen parallel einhalten. Der AI Act verweist in mehreren
                  Artikeln explizit auf die DSGVO, insbesondere bei Daten-Governance,
                  Transparenz und der Datenschutz-Folgenabschätzung für Hochrisiko-KI.
                </p>
              ),
            },
            {
              title: "Was sind die ersten Schritte für mein Unternehmen?",
              content: (
                <div>
                  <p className="mb-3">
                    Beginnen Sie mit diesen drei Maßnahmen:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-[14px]">
                    <li>
                      <strong>KI-Inventar erstellen:</strong> Identifizieren Sie alle
                      KI-Systeme, die Sie entwickeln, nutzen oder vertreiben.
                    </li>
                    <li>
                      <strong>Risikobewertung:</strong> Ordnen Sie jedes System einer
                      Risikokategorie zu (unzulässig, hoch, begrenzt, minimal).
                    </li>
                    <li>
                      <strong>KI-Verantwortlichen benennen:</strong> Bestimmen Sie eine
                      Person oder ein Team für die AI-Act-Compliance.
                    </li>
                  </ol>
                </div>
              ),
            },
            {
              title: "Brauche ich eine CE-Kennzeichnung für mein KI-System?",
              content: (
                <p>
                  Nur wenn Ihr KI-System als Hochrisiko eingestuft wird. In diesem Fall
                  müssen Sie vor dem Inverkehrbringen eine Konformitätsbewertung durchführen,
                  eine EU-Konformitätserklärung ausstellen und das CE-Kennzeichen anbringen.
                  Für KI mit minimalem oder begrenztem Risiko ist keine CE-Kennzeichnung erforderlich.
                </p>
              ),
            },
            {
              title: "Was passiert bei Nichteinhaltung nach August 2026?",
              content: (
                <p>
                  Nach Ablauf der Übergangsfrist drohen Bußgelder von bis zu 35 Mio. Euro
                  oder 7% des weltweiten Jahresumsatzes. Die zuständigen nationalen Behörden
                  (in Österreich die RTR) können zudem den Rückruf oder Vertriebsstopp
                  nicht-konformer KI-Systeme anordnen.
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ VERWANDTE REGULIERUNGEN ═══════════════════ */}
      <RelatedGuides currentGuide="eu-ai-act" accent="#7c3aed" />

      {/* ═══════════════════ SOFTWARE-EMPFEHLUNGEN ═══════════════════ */}
      <ToolRecommendation regulationKey="ai-act" accent="#0A2540" />

      {/* ═══════════════════ QUELLEN ═══════════════════ */}
      <Section id="quellen" title="Quellen & Offizielle Dokumente">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Alle Informationen in diesem Guide basieren auf den folgenden offiziellen
          Primärquellen. Klicken Sie auf eine Quelle zum Nachlesen:
        </p>

        <SourceList sources={sources} accent="#0A2540" />

        <div className="mt-6 rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Hinweis:</strong> Dieser Guide dient der Information
            und ersetzt keine Rechtsberatung. Die verlinkten Dokumente sind die offiziellen
            Rechtstexte. Bei Fragen zur konkreten Anwendung auf Ihr Unternehmen empfehlen wir
            die Beratung durch spezialisierte Rechtsanwälte oder Compliance-Berater.
          </p>
        </div>
      </Section>
    </GuidePageLayout>
  );
}
