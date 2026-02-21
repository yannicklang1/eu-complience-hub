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
    title: "Richtlinie (EU) 2022/2555 — NIS2-Richtlinie (Volltext)",
    url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj/deu",
    desc: "Offizielle deutsche Fassung im EUR-Lex Portal",
    type: "EU-Richtlinie",
  },
  {
    id: 2,
    title: "NIS2-Richtlinie — englische Fassung",
    url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng",
    desc: "Offizielle englische Fassung im EUR-Lex Portal",
    type: "EU-Richtlinie",
  },
  {
    id: 3,
    title: "NISG 2026 — Parlamentarischer Prozess",
    url: "https://www.parlament.gv.at/gegenstand/XXVIII/I/308",
    desc: "Regierungsvorlage und Beschlussfassung im österreichischen Parlament",
    type: "Gesetz AT",
  },
  {
    id: 4,
    title: "CERT.at — Nationales CSIRT",
    url: "https://cert.at",
    desc: "Computer Emergency Response Team Österreich — Vorfallmeldungen und Frühwarnungen",
    type: "Aufsicht AT",
  },
  {
    id: 5,
    title: "BMI — Cybersicherheitsbehörde",
    url: "https://www.bmi.gv.at",
    desc: "Bundesministerium für Inneres — zuständige Aufsichtsbehörde",
    type: "Aufsicht AT",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Überblick" },
  { id: "nis2-vs-nis1", label: "NIS2 vs. NIS1" },
  { id: "timeline", label: "Timeline & Fristen" },
  { id: "betroffene", label: "Wer ist betroffen?" },
  { id: "massnahmen", label: "10 Mindestmaßnahmen" },
  { id: "meldepflichten", label: "Meldepflichten" },
  { id: "geschaeftsfuehrer", label: "Geschäftsführer-Haftung" },
  { id: "strafen", label: "Strafen" },
  { id: "oesterreich", label: "Umsetzung Österreich" },
  { id: "fahrplan", label: "Compliance-Fahrplan" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Strafe", value: "10 Mio. € oder 2% Umsatz" },
  { label: "In Kraft ab", value: "1. Oktober 2026" },
  { label: "Betroffene (AT)", value: "ca. 3.000–4.000 Unternehmen" },
  { label: "Aufsicht (AT)", value: "BMI / Cybersicherheitsbehörde" },
  { label: "CSIRT (AT)", value: "CERT.at / GovCERT" },
  { label: "Meldepflicht", value: "24h Frühwarnung" },
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
  accent = "#0ea5e9",
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
              ? "bg-sky-500 border-sky-500 animate-pulse"
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
              Erledigt
            </span>
          )}
          {active && (
            <span className="text-[9px] px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 font-mono font-bold border border-sky-200">
              Aktuell
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

/* ─────────────────── Sector card ─────────────────── */
function SectorCard({
  category,
  categoryColor,
  sectors,
}: {
  category: string;
  categoryColor: string;
  sectors: { name: string; examples: string }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border bg-white p-6"
      style={{ borderColor: `${categoryColor}30` }}
    >
      <div
        className="font-mono text-[10px] font-bold tracking-wider uppercase mb-4 px-3 py-1.5 rounded-lg inline-block"
        style={{ background: `${categoryColor}10`, color: categoryColor }}
      >
        {category}
      </div>
      <div className="space-y-4">
        {sectors.map((s) => (
          <div key={s.name}>
            <div className="font-[Syne] font-bold text-[14px] text-[#060c1a] mb-0.5">
              {s.name}
            </div>
            <p className="text-[13px] text-[#7a8db0] leading-relaxed">
              {s.examples}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────── Comparison row ─────────────────── */
function ComparisonRow({
  aspect,
  nis1,
  nis2,
}: {
  aspect: string;
  nis1: string;
  nis2: string;
}) {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 py-3 border-b border-[#e8ecf4] last:border-b-0">
      <div className="font-[Syne] font-bold text-[13px] text-[#060c1a]">
        {aspect}
      </div>
      <div className="text-[13px] text-[#7a8db0] leading-relaxed">{nis1}</div>
      <div className="text-[13px] text-[#0ea5e9] leading-relaxed font-medium">
        {nis2}
      </div>
    </div>
  );
}

/* ─────────────────── Roadmap step ─────────────────── */
function RoadmapStep({
  phase,
  title,
  items,
  accent = "#0ea5e9",
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

/* ─────────────────── Reporting Step ─────────────────── */
function ReportingStep({
  time,
  title,
  description,
  icon,
  color,
}: {
  time: string;
  title: string;
  description: React.ReactNode;
  icon: string;
  color: string;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col items-center">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
          style={{ background: `${color}15` }}
        >
          {icon}
        </div>
        <div className="w-px flex-1 bg-[#e8ecf4] min-h-[20px]" />
      </div>
      <div className="pb-6">
        <div
          className="font-mono text-[11px] font-bold tracking-wider uppercase mb-1"
          style={{ color }}
        >
          {time}
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

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */
export default function GuideContent() {
  return (
    <GuidePageLayout
      title="NISG 2026"
      subtitle="Österreichs Umsetzung der NIS2-Richtlinie im Detail: Betroffene Sektoren, Meldepflichten, Geschäftsführer-Haftung, Strafen und Ihr Compliance-Fahrplan."
      regulationKey="NIS2-Richtlinie (EU) 2022/2555"
      accent="#0ea5e9"
      badgeLabel="Umsetzung AT"
      badgeColor="#0ea5e9"
      quickFacts={quickFacts}
      tocItems={tocItems}
      trustBadge={{ lastReview: "18.02.2026", sourceCount: 5 }}
      heroIcon={
        <svg className="w-7 h-7 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      }
      href="/nisg-2026"
    >
      {/* ═══════════════════ 1. ÜBERBLICK ═══════════════════ */}
      <Section id="ueberblick" title="Überblick: Was ist das NISG 2026?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Das <strong>NISG 2026</strong> (Netz- und Informationssystemsicherheitsgesetz 2026, BGBl. I Nr. 94/2025)<SourceRef id={3} sources={sources} accent="#0ea5e9" />{" "}
          ist Österreichs nationale Umsetzung der europäischen <strong>NIS2-Richtlinie</strong>{" "}
          (Richtlinie (EU) 2022/2555)<SourceRef id={1} sources={sources} accent="#0ea5e9" />. Es ersetzt das bisherige NISG aus 2018 und erweitert den
          Anwendungsbereich drastisch: Statt bisher rund 100 Betreibern wesentlicher Dienste sind
          nun geschätzt <strong>3.000 bis 4.000 österreichische Unternehmen</strong> betroffen.
        </p>
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Die NIS2-Richtlinie verfolgt das Ziel, ein <strong>einheitlich hohes Cybersicherheitsniveau</strong>{" "}
          in der gesamten EU zu schaffen. Sie verpflichtet Unternehmen aus 18 Sektoren zu umfassenden
          Risikomanagement-Maßnahmen, strengen Meldepflichten bei Sicherheitsvorfällen und
          macht erstmals <strong>Geschäftsführer persönlich haftbar</strong> für Cybersecurity-Compliance.
        </p>

        {/* Key stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard value="10M€" label="Max. Strafe" accent="#dc2626" />
          <StatCard value="18" label="Betroffene Sektoren" />
          <StatCard value="24h" label="Frühwarnung" accent="#0ea5e9" />
          <StatCard value="2022" label="EU-Richtlinie seit" accent="#059669" />
        </div>

        {/* Info box */}
        <div className="rounded-2xl bg-sky-50/60 border border-sky-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-sky-700 mb-1">
                Umsetzungsstatus Österreich
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                Die EU-Umsetzungsfrist war der 17. Oktober 2024. Ein erster Entwurf (NISG 2024) scheiterte
                im Juli 2024 im Nationalrat an der erforderlichen Zweidrittelmehrheit. Das NISG 2026 wurde
                am 12. Dezember 2025 im Nationalrat und am 18. Dezember 2025 im Bundesrat beschlossen
                (BGBl. I Nr. 94/2025). Es tritt am <strong>1. Oktober 2026</strong> in Kraft.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 2. NIS2 VS NIS1 ═══════════════════ */}
      <Section id="nis2-vs-nis1" title="Was hat sich geändert? NIS2 vs. NIS1">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Die NIS2-Richtlinie ist keine bloße Aktualisierung — sie ist ein grundlegender
          Paradigmenwechsel in der europäischen Cybersicherheitsregulierung. Die wichtigsten Änderungen:
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8 overflow-x-auto">
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 pb-3 border-b-2 border-[#e8ecf4] mb-1">
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#7a8db0]">
              Aspekt
            </div>
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#7a8db0]">
              NIS1 (alt)
            </div>
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-sky-500">
              NIS2 (neu)
            </div>
          </div>

          <ComparisonRow
            aspect="Betroffene Sektoren"
            nis1="7 Sektoren"
            nis2="18 Sektoren"
          />
          <ComparisonRow
            aspect="Betroffene in AT"
            nis1="~100 Betreiber"
            nis2="~3.000–4.000 Unternehmen"
          />
          <ComparisonRow
            aspect="Einstufung"
            nis1="Individuell durch Behörde"
            nis2="Automatisch per Size-Cap"
          />
          <ComparisonRow
            aspect="Meldepflicht"
            nis1="Unverzüglich"
            nis2="24h / 72h / 1 Monat (gestuft)"
          />
          <ComparisonRow
            aspect="Management-Haftung"
            nis1="Keine explizite"
            nis2="Persönliche Haftung der GF"
          />
          <ComparisonRow
            aspect="Strafen (max.)"
            nis1="€ 50.000"
            nis2="10 Mio. € / 2% Umsatz"
          />
          <ComparisonRow
            aspect="Supply-Chain"
            nis1="Nicht explizit"
            nis2="Verpflichtende Prüfung"
          />
          <ComparisonRow
            aspect="Schulungspflicht"
            nis1="Keine"
            nis2="Verpflichtend für Management"
          />
        </div>
      </Section>

      {/* ═══════════════════ 3. TIMELINE ═══════════════════ */}
      <Section id="timeline" title="Timeline & Fristen">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Von der EU-Verabschiedung bis zur vollen operativen Umsetzung in Österreich — die wichtigsten Meilensteine:
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8">
          <TimelineItem
            date="16. Januar 2023"
            title="NIS2-Richtlinie in Kraft"
            description="Die Richtlinie (EU) 2022/2555 tritt auf EU-Ebene in Kraft. Ab jetzt läuft die 21-monatige Umsetzungsfrist für die Mitgliedstaaten."
            done
          />
          <TimelineItem
            date="Juli 2024"
            title="NISG 2024 scheitert im Nationalrat"
            description="Ein erster Entwurf des NISG scheitert am 3. Juli 2024 im Nationalrat an der erforderlichen Zweidrittelmehrheit. Österreich versäumt damit die EU-Umsetzungsfrist."
            done
          />
          <TimelineItem
            date="Dezember 2025"
            title="NISG 2026 beschlossen"
            description="Am 12. Dezember 2025 beschließt der Nationalrat das NISG 2026, am 18. Dezember 2025 stimmt der Bundesrat zu. BGBl. I Nr. 94/2025. Das Gesetz tritt am 1. Oktober 2026 in Kraft."
            done
          />
          <TimelineItem
            date="17. Oktober 2024"
            title="EU-Umsetzungsfrist"
            description="Alle Mitgliedstaaten mussten NIS2 bis zu diesem Datum in nationales Recht umgesetzt haben. Die alte NIS-Richtlinie (NIS1) wurde mit 18. Oktober 2024 aufgehoben."
            done
          />
          <TimelineItem
            date="2025/2026"
            title="Registrierung & operative Umsetzung"
            description="Schrittweiser Aufbau des Registrierungssystems, der Meldeplattform und der Aufsichtsstrukturen. Betroffene Unternehmen müssen sich beim BMI registrieren und die Mindestmaßnahmen umsetzen."
            active
          />
          <TimelineItem
            date="17. April 2025"
            title="Erstellung der Liste wesentlicher Einrichtungen"
            description="Jeder Mitgliedstaat muss eine Liste wesentlicher und wichtiger Einrichtungen erstellen und dem EU-Kooperationsnetzwerk übermitteln. Regelmäßige Aktualisierung alle 2 Jahre."
          />
          <TimelineItem
            date="17. Oktober 2027"
            title="Überprüfung der Richtlinie"
            description="Die EU-Kommission überprüft die NIS2-Richtlinie und legt dem Europäischen Parlament einen Bericht mit möglichen Anpassungen vor."
          />
        </div>
      </Section>

      {/* ═══════════════════ 4. WER IST BETROFFEN? ═══════════════════ */}
      <Section id="betroffene" title="Wer ist betroffen?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-4">
          NIS2 unterscheidet zwischen <strong>wesentlichen</strong> und <strong>wichtigen
          Einrichtungen</strong>. Die Einstufung erfolgt automatisch über den{" "}
          <strong>Size-Cap-Mechanismus</strong>: Mittelgroße und große Unternehmen in den
          betroffenen Sektoren fallen automatisch in den Anwendungsbereich.
        </p>

        {/* Size cap explanation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="rounded-2xl border-2 border-sky-300 bg-sky-50/50 p-6">
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-sky-600 mb-2">
              Wesentliche Einrichtungen
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Große Unternehmen in Sektoren mit hoher Kritikalität
            </h3>
            <ul className="space-y-2 text-[14px] text-[#5a6a8a]">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0 mt-2" />
                <span>≥ 250 Mitarbeiter <strong>ODER</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0 mt-2" />
                <span>≥ 50 Mio. € Umsatz <strong>UND</strong> ≥ 43 Mio. € Bilanzsumme</span>
              </li>
            </ul>
            <div className="mt-4 px-3 py-2 rounded-lg bg-sky-100/60 text-[12px] text-sky-700 font-medium">
              Strengere Aufsicht: Proaktive Prüfungen, höhere Strafen
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#7a8db0] mb-2">
              Wichtige Einrichtungen
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Mittelgroße Unternehmen in allen NIS2-Sektoren
            </h3>
            <ul className="space-y-2 text-[14px] text-[#5a6a8a]">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7a8db0] flex-shrink-0 mt-2" />
                <span>≥ 50 Mitarbeiter <strong>ODER</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7a8db0] flex-shrink-0 mt-2" />
                <span>≥ 10 Mio. € Umsatz <strong>UND</strong> ≥ 10 Mio. € Bilanzsumme</span>
              </li>
            </ul>
            <div className="mt-4 px-3 py-2 rounded-lg bg-[#f4f6fc] text-[12px] text-[#5a6a8a] font-medium">
              Reaktive Aufsicht: Prüfung nur bei Verdacht oder Vorfall
            </div>
          </div>
        </div>

        {/* Sector lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SectorCard
            category="Sektoren mit hoher Kritikalität (Anhang I)"
            categoryColor="#0ea5e9"
            sectors={[
              { name: "Energie", examples: "Strom, Gas, Öl, Fernwärme, Wasserstoff" },
              { name: "Verkehr", examples: "Luft, Schiene, Wasser, Straße" },
              { name: "Bankwesen", examples: "Kreditinstitute" },
              { name: "Finanzmarktinfrastruktur", examples: "Börsen, Clearingstellen" },
              { name: "Gesundheitswesen", examples: "Krankenhäuser, Labore, Pharma, Medizinprodukte" },
              { name: "Trinkwasser", examples: "Wasserversorgung" },
              { name: "Abwasser", examples: "Abwasserentsorgung" },
              { name: "Digitale Infrastruktur", examples: "IXPs, DNS, TLDs, Cloud, Rechenzentren" },
              { name: "ICT-Service-Management (B2B)", examples: "MSPs, MSSPs" },
              { name: "Öffentliche Verwaltung", examples: "Zentral- und Regionalverwaltung" },
              { name: "Weltraum", examples: "Bodenstationen, Betreiber" },
            ]}
          />
          <SectorCard
            category="Sonstige kritische Sektoren (Anhang II)"
            categoryColor="#7a8db0"
            sectors={[
              { name: "Post und Kurier", examples: "Paketdienste, Briefpost" },
              { name: "Abfallbewirtschaftung", examples: "Entsorgungsunternehmen" },
              { name: "Chemie", examples: "Herstellung, Produktion, Vertrieb" },
              { name: "Lebensmittel", examples: "Großhandel, Produktion, Verarbeitung" },
              { name: "Verarbeitendes Gewerbe", examples: "Medizinprodukte, Elektronik, Maschinen, KFZ" },
              { name: "Digitale Dienste", examples: "Marktplätze, Suchmaschinen, Social Media" },
              { name: "Forschung", examples: "Forschungseinrichtungen" },
            ]}
          />
        </div>

        {/* Special cases box */}
        <div className="rounded-2xl bg-amber-50/60 border border-amber-200/50 p-5 mt-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-amber-700 mb-1">
                Sonderfälle: Auch Kleinstunternehmen betroffen
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                Unabhängig von der Größe fallen bestimmte Einrichtungen immer unter NIS2:
                Anbieter von DNS-Diensten, TLD-Registries, Vertrauensdiensteanbieter (qualifiziert),
                öffentliche elektronische Kommunikationsnetze und alle Einrichtungen, die ein
                Mitgliedstaat als kritisch einstuft. Auch Zulieferer in der Lieferkette können
                indirekt betroffen sein.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 5. 10 MINDESTMASSNAHMEN ═══════════════════ */}
      <Section id="massnahmen" title="Die 10 Mindestmaßnahmen (Art. 21)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          <LawRef law="NIS2" article="21">Artikel 21</LawRef> der NIS2-Richtlinie definiert zehn verbindliche Cybersicherheits-Mindestmaßnahmen,
          die jede betroffene Einrichtung umsetzen muss. Die Maßnahmen folgen einem{" "}
          <strong>All-Hazards-Ansatz</strong> und müssen verhältnismäßig sein — angepasst
          an Größe, Risikoexposition und gesellschaftliche Bedeutung.
        </p>

        <AccordionSection
          accent="#0ea5e9"
          items={[
            {
              title: "1. Risikoanalyse & Sicherheitskonzepte",
              content: (
                <div>
                  <p className="mb-3">
                    Grundlage aller Maßnahmen: Systematische Identifikation, Bewertung und
                    Behandlung von Risiken für Netz- und Informationssysteme.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Regelmäßige Risikoanalysen der IT- und OT-Infrastruktur</li>
                    <li>Dokumentierte Informationssicherheitskonzepte (ISMS)</li>
                    <li>Berücksichtigung von Verfügbarkeit, Integrität und Vertraulichkeit</li>
                    <li>Risk Appetite und akzeptierte Restrisiken definieren</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "2. Bewältigung von Sicherheitsvorfällen",
              content: (
                <div>
                  <p className="mb-3">
                    Prozesse und Fähigkeiten zur Prävention, Erkennung, Analyse,
                    Eindämmung und Wiederherstellung bei Cybervorfällen.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Incident-Response-Plan mit definierten Rollen und Eskalationswegen</li>
                    <li>Zusammenspiel mit den Meldepflichten nach <LawRef law="NIS2" article="23">Art. 23</LawRef> (24h/72h/1 Monat)</li>
                    <li>Forensische Analyse- und Beweissicherungsfähigkeiten</li>
                    <li>Regelmäßige Übungen und Incident-Response-Tests</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "3. Business Continuity & Krisenmanagement",
              content: (
                <div>
                  <p className="mb-3">
                    Sicherstellung der Betriebskontinuität und schnelle Wiederherstellung
                    nach einem Sicherheitsvorfall.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Backup-Management mit regelmäßigen Tests der Wiederherstellung</li>
                    <li>Disaster-Recovery-Pläne für kritische Systeme</li>
                    <li>Krisenmanagement-Prozesse und -Teams definieren</li>
                    <li>RPO- und RTO-Ziele für alle kritischen Services festlegen</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "4. Sicherheit der Lieferkette",
              content: (
                <div>
                  <p className="mb-3">
                    Einer der wichtigsten Neuerungen: Unternehmen müssen die Cybersicherheit
                    ihrer gesamten Lieferkette aktiv managen.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Bewertung der Cybersicherheit aller direkten Zulieferer</li>
                    <li>Vertragliche Sicherheitsanforderungen an Dienstleister</li>
                    <li>Berücksichtigung der Gesamtqualität der Produkte und Sicherheitspraktiken</li>
                    <li>Regelmäßige Überprüfung und Audits der Supply Chain</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "5. Sicherheit bei Erwerb, Entwicklung & Wartung",
              content: (
                <div>
                  <p className="mb-3">
                    Security by Design: Integration von Sicherheitsmaßnahmen über den
                    gesamten Lebenszyklus von Netz- und Informationssystemen.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Sicherheitsanforderungen bei Beschaffung definieren</li>
                    <li>Sichere Entwicklungspraktiken (Secure SDLC)</li>
                    <li>Schwachstellenmanagement und Patch-Prozesse</li>
                    <li>Sicherheitstests vor Inbetriebnahme (Penetrationstests)</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "6. Bewertung der Wirksamkeit",
              content: (
                <div>
                  <p className="mb-3">
                    Regelmäßige Überprüfung, ob die implementierten Sicherheitsmaßnahmen
                    tatsächlich wirksam sind.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Interne Audits und Sicherheitsüberprüfungen</li>
                    <li>Key Performance Indicators (KPIs) für Cybersicherheit</li>
                    <li>Regelmäßige Schwachstellenscans und Penetrationstests</li>
                    <li>Management-Reviews der Sicherheitslage</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "7. Cyberhygiene & Schulungen",
              content: (
                <div>
                  <p className="mb-3">
                    Grundlegende Cyberhygiene-Praktiken und verpflichtende Schulungen
                    für alle Mitarbeiter — einschließlich der Geschäftsleitung.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Regelmäßige Security-Awareness-Trainings</li>
                    <li>Phishing-Simulationen und Social-Engineering-Tests</li>
                    <li>Verpflichtende Schulung der Geschäftsleitung (<LawRef law="NIS2" article="20" absatz="2" />)</li>
                    <li>Passwort-Richtlinien, Clean-Desk-Policy, sichere Nutzung von Geräten</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "8. Kryptografie & Verschlüsselung",
              content: (
                <div>
                  <p className="mb-3">
                    Konzepte und Verfahren für den Einsatz von Kryptografie und
                    Verschlüsselung zum Schutz von Daten.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Verschlüsselung von Daten in Transit und at Rest</li>
                    <li>Schlüsselmanagement-Prozesse</li>
                    <li>Einsatz anerkannter kryptografischer Standards</li>
                    <li>Regelmäßige Überprüfung der Krypto-Algorithmen</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "9. Personalsicherheit & Zugangssteuerung",
              content: (
                <div>
                  <p className="mb-3">
                    Sicherstellung, dass nur autorisierte Personen auf kritische Systeme
                    und Daten zugreifen können.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Rollenbasierte Zugriffskontrolle (RBAC)</li>
                    <li>Principle of Least Privilege</li>
                    <li>Regelmäßige Überprüfung von Zugriffsrechten</li>
                    <li>Sichere Onboarding-/Offboarding-Prozesse</li>
                    <li>Asset-Management und Inventarisierung</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "10. Multi-Faktor-Authentifizierung & sichere Kommunikation",
              content: (
                <div>
                  <p className="mb-3">
                    Einsatz moderner Authentifizierungsmethoden und gesicherter
                    Kommunikationskanäle.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>MFA oder Continuous Authentication für kritische Systeme</li>
                    <li>Gesicherte Sprach-, Video- und Textkommunikation</li>
                    <li>Sichere Notfallkommunikationssysteme</li>
                    <li>Zero-Trust-Ansatz wo angemessen</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 6. MELDEPFLICHTEN ═══════════════════ */}
      <Section id="meldepflichten" title="Meldepflichten: Das 24-72-30 System">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          NIS2 führt ein <strong>dreistufiges Meldesystem</strong> für erhebliche Sicherheitsvorfälle ein.
          Ein Vorfall gilt als &quot;erheblich&quot;, wenn er schwerwiegende Betriebsstörungen,
          finanzielle Verluste oder erheblichen materiellen/immateriellen Schaden verursacht
          oder verursachen kann.
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8">
          <ReportingStep
            time="Innerhalb von 24 Stunden"
            title="Frühwarnung"
            description={<>Schnelle Erstmeldung an das CSIRT (CERT.at)<SourceRef id={4} sources={sources} accent="#0ea5e9" /> oder die zuständige Behörde. Muss angeben, ob der Vorfall mutmaßlich rechtswidrig oder böswillig ist und ob er grenzüberschreitende Auswirkungen haben könnte. Fokus auf Geschwindigkeit, nicht Vollständigkeit.</>}
            icon="🚨"
            color="#dc2626"
          />
          <ReportingStep
            time="Innerhalb von 72 Stunden"
            title="Vorfallmeldung"
            description="Aktualisierung der Frühwarnung mit einer ersten Bewertung des Vorfalls: Schweregrad, Auswirkungen, betroffene Systeme/Nutzer, Angriffsmethode (soweit bekannt), ergriffene Gegenmaßnahmen und Indicators of Compromise (IoCs)."
            icon="📝"
            color="#ea580c"
          />
          <ReportingStep
            time="Auf Anfrage"
            title="Zwischenbericht"
            description="Das CSIRT oder die Behörde kann jederzeit einen Zwischenbericht mit aktuellen Status-Updates, der Entwicklung des Vorfalls und der Wirksamkeit der Gegenmaßnahmen anfordern."
            icon="📊"
            color="#0ea5e9"
          />
          <ReportingStep
            time="Innerhalb von 1 Monat"
            title="Abschlussbericht"
            description="Detaillierter Abschlussbericht mit: vollständiger Beschreibung des Vorfalls, Art der Bedrohung und Grundursache, angewandten und laufenden Maßnahmen, grenzüberschreitenden Auswirkungen. Bei andauerndem Vorfall: Fortschrittsbericht statt Abschlussbericht."
            icon="📋"
            color="#059669"
          />
        </div>

        <div className="rounded-2xl bg-emerald-50/60 border border-emerald-200/50 p-5 mt-6">
          <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
            <strong>Haftungsschutz:</strong> Die bloße Meldung eines Vorfalls begründet keine
            erhöhte Haftung für die meldende Einrichtung. Unternehmen sollen nicht aus Angst
            vor Konsequenzen von der Meldung absehen. Allerdings drohen Strafen bei
            <em> Nicht</em>meldung.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 7. GESCHÄFTSFÜHRER-HAFTUNG ═══════════════════ */}
      <Section id="geschaeftsfuehrer" title="Geschäftsführer-Haftung">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Eine der einschneidendsten Neuerungen der NIS2-Richtlinie: <strong>Die
          Geschäftsleitung ist persönlich verantwortlich</strong> für die Einhaltung der
          Cybersicherheits-Pflichten. &quot;Das ist zu technisch für mich&quot; gilt nicht mehr als
          Ausrede.
        </p>

        <div className="space-y-4 mb-6">
          {/* Obligation 1 */}
          <div className="rounded-2xl border-2 border-red-200 bg-red-50/30 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
                  Genehmigung &amp; Überwachung (<LawRef law="NIS2" article="20" absatz="1" />)
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                  Die Leitungsorgane müssen die Risikomanagement-Maßnahmen nach <LawRef law="NIS2" article="21">Art. 21</LawRef>{" "}
                  <strong>genehmigen</strong>, deren Umsetzung <strong>überwachen</strong> und
                  können für Verstöße <strong>persönlich haftbar</strong> gemacht werden.
                  Delegation an die IT-Abteilung reicht nicht aus.
                </p>
              </div>
            </div>
          </div>

          {/* Obligation 2 */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/30 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <div>
                <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
                  Schulungspflicht (<LawRef law="NIS2" article="20" absatz="2" />)
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                  Mitglieder der Leitungsorgane müssen an <strong>Cybersicherheits-Schulungen
                  teilnehmen</strong>. Sie müssen ausreichende Kenntnisse erwerben, um
                  Cyberrisiken zu erkennen und bewerten zu können. Ähnliche Schulungen sollen
                  auch den Beschäftigten angeboten werden.
                </p>
              </div>
            </div>
          </div>

          {/* Obligation 3 */}
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#f0f2f8] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#0A2540]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <div>
                <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
                  Konsequenzen bei Verstoß
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                  Bei Nicht-Einhaltung können Behörden Geschäftsführer <strong>vorübergehend
                  von ihrer Funktion suspendieren</strong>, bis die Mängel behoben sind.
                  Dazu kommen mögliche Geldstrafen und zivilrechtliche Haftung für
                  Schäden, die aus mangelhafter Cybersicherheit resultieren.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-sky-50/60 border border-sky-200/50 p-5">
          <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
            <strong>Wichtig für GmbH-Geschäftsführer:</strong> Die NIS2-Haftung ergänzt die
            bestehende Sorgfaltspflicht nach <LawRef law="GmbHG" paragraph="25" />. Geschäftsführer müssen nachweisen
            können, dass sie über wesentliche Cyberrisiken informiert waren und angemessene
            Entscheidungen auf Basis dieser Informationen getroffen haben. Der Aufbau eines
            strukturierten Informationsflusses zwischen IT und Geschäftsleitung ist entscheidend.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 8. STRAFEN ═══════════════════ */}
      <Section id="strafen" title="Strafen & Bußgelder">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          NIS2 sieht massive Strafen vor — ein Quantensprung gegenüber dem alten NISG, das
          maximal € 50.000 vorsah. Die Strafen sind nach Art der Einrichtung gestaffelt.
        </p>

        <div className="space-y-4">
          {/* Essential entities */}
          <div className="rounded-2xl border-2 border-red-300 bg-red-50/40 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <span className="font-[Syne] font-extrabold text-red-600 text-lg">!</span>
              </div>
              <div>
                <div className="font-mono text-[10px] font-bold text-red-600 tracking-wider uppercase">
                  Wesentliche Einrichtungen
                </div>
                <div className="font-[Syne] font-extrabold text-xl text-[#060c1a]">
                  Bis zu 10 Mio. € oder 2% des Umsatzes
                </div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed ml-[52px]">
              Der höhere Betrag (Festbetrag oder Prozentsatz des weltweiten Jahresumsatzes)
              ist maßgeblich. Proaktive Aufsicht: Die Behörde kann jederzeit Prüfungen
              durchführen, auch ohne konkreten Verdacht.
            </p>
          </div>

          {/* Important entities */}
          <div className="rounded-2xl border border-orange-200 bg-orange-50/40 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <span className="font-[Syne] font-extrabold text-orange-600 text-lg">§</span>
              </div>
              <div>
                <div className="font-mono text-[10px] font-bold text-orange-600 tracking-wider uppercase">
                  Wichtige Einrichtungen
                </div>
                <div className="font-[Syne] font-extrabold text-xl text-[#060c1a]">
                  Bis zu 7 Mio. € oder 1,4% des Umsatzes
                </div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed ml-[52px]">
              Der höhere Betrag ist maßgeblich. Reaktive Aufsicht: Prüfung nur bei
              konkretem Verdacht, Hinweis oder nach einem Sicherheitsvorfall.
            </p>
          </div>

          {/* Additional sanctions */}
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#f0f2f8] flex items-center justify-center">
                <span className="font-[Syne] font-extrabold text-[#0A2540] text-lg">+</span>
              </div>
              <div>
                <div className="font-mono text-[10px] font-bold text-[#7a8db0] tracking-wider uppercase">
                  Zusätzliche Sanktionen
                </div>
                <div className="font-[Syne] font-extrabold text-xl text-[#060c1a]">
                  Suspendierung & Maßnahmen
                </div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed ml-[52px]">
              Neben Geldstrafen können Behörden: Geschäftsführer vorübergehend
              suspendieren, öffentliche Bekanntmachung des Verstoßes anordnen,
              verbindliche Anweisungen zur Mängelbehebung erteilen und
              bei wesentlichen Einrichtungen Zertifizierungen aussetzen.
            </p>
          </div>
        </div>

        {/* Comparison box */}
        <div className="rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5 mt-6">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Zum Vergleich:</strong> Unter dem
            alten NISG betrug die Höchststrafe lediglich <strong>€ 50.000</strong>.
            NIS2 erhöht das Maximum auf <strong>10 Mio. € bzw. 2% des weltweiten
            Jahresumsatzes</strong> — ein Faktor von 200x. Dazu kommt die neue
            persönliche Geschäftsführer-Haftung.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 9. ÖSTERREICH ═══════════════════ */}
      <Section id="oesterreich" title="Umsetzung in Österreich">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Als EU-Richtlinie musste NIS2 in nationales Recht umgesetzt werden.
          Österreich hat dies mit dem <strong>NISG 2026</strong> (BGBl. I Nr. 94/2025) getan, das spezifische nationale
          Strukturen für Aufsicht, Meldewesen und Registrierung schafft.
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #0284c7)" }}>
                <span className="text-xl">🇦🇹</span>
              </div>
              <div>
                <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
                  Bundesministerium für Inneres (BMI)<SourceRef id={5} sources={sources} accent="#0ea5e9" />
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
                  Das BMI ist die zuständige Behörde für die Umsetzung des NISG. Es
                  betreibt die Cybersicherheitsbehörde, die für Aufsicht, Registrierung
                  und Durchsetzung verantwortlich ist. Betroffene Unternehmen müssen sich
                  beim BMI registrieren und ihre Kontaktdaten aktuell halten.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 font-mono border border-sky-200">
                    Registrierung
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 font-mono border border-sky-200">
                    Aufsicht
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 font-mono border border-sky-200">
                    Durchsetzung
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              CERT.at & GovCERT
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
              CERT.at fungiert als nationales CSIRT (Computer Security Incident Response Team)
              und ist die zentrale Anlaufstelle für die Meldung von Sicherheitsvorfällen. GovCERT
              ist speziell für den öffentlichen Sektor zuständig. Beide Teams bieten technische
              Unterstützung bei der Vorfallbewältigung und koordinieren grenzüberschreitende
              Zusammenarbeit.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">
                Vorfallmeldungen
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">
                Technische Hilfe
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">
                Frühwarnsystem
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Registrierungspflicht
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Alle betroffenen Einrichtungen müssen sich proaktiv beim BMI registrieren.
              Die Registrierung umfasst: Name und Kontaktdaten, den Sektor und Teilsektor,
              die Einstufung (wesentlich/wichtig), IP-Adressbereiche und eine Liste der
              EU-Mitgliedstaaten, in denen Dienste erbracht werden. Die Daten müssen bei
              Änderungen unverzüglich aktualisiert werden.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Sektorspezifische Aufsichtsbehörden
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Neben dem BMI können für bestimmte Sektoren eigene Aufsichtsbehörden
              zuständig sein: Die FMA für den Finanzsektor (in Abstimmung mit DORA),
              die E-Control für den Energiesektor, die RTR für Telekommunikation und
              weitere sektorspezifische Regulatoren.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 10. COMPLIANCE-FAHRPLAN ═══════════════════ */}
      <Section id="fahrplan" title="Ihr Compliance-Fahrplan">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          In vier Phasen zum NISG-konformen Unternehmen. Das Gesetz tritt am 1. Oktober 2026
          in Kraft {"\u2014"} beginnen Sie jetzt mit der Vorbereitung, um rechtzeitig compliant zu sein.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RoadmapStep
            phase="Phase 1 — Sofort"
            title="Betroffenheitsanalyse"
            accent="#0ea5e9"
            items={[
              "Prüfen ob Ihr Unternehmen unter NIS2 fällt (Sektor + Größe)",
              "Einstufung als wesentliche oder wichtige Einrichtung",
              "Registrierung beim BMI vorbereiten",
              "Geschäftsleitung informieren und sensibilisieren",
            ]}
          />
          <RoadmapStep
            phase="Phase 2 — Monat 1–3"
            title="Governance & Gap-Analyse"
            accent="#0891b2"
            items={[
              "Cybersicherheits-Verantwortlichen ernennen (CISO/ISB)",
              "Gap-Analyse gegen die 10 Mindestmaßnahmen (Art. 21)",
              "Schulungsprogramm für Geschäftsleitung starten",
              "Incident-Response-Plan entwerfen",
            ]}
          />
          <RoadmapStep
            phase="Phase 3 — Monat 3–9"
            title="Maßnahmen umsetzen"
            accent="#0e7490"
            items={[
              "ISMS aufbauen oder erweitern (ISO 27001 empfohlen)",
              "Supply-Chain-Sicherheit bewerten und vertraglich absichern",
              "Meldeprozesse einrichten (24h/72h/1 Monat)",
              "Backup-, BCP- und DR-Konzepte implementieren",
            ]}
          />
          <RoadmapStep
            phase="Phase 4 — Laufend"
            title="Betrieb & Verbesserung"
            accent="#155e75"
            items={[
              "Registrierung beim BMI abschließen",
              "Regelmäßige Audits und Wirksamkeitsprüfungen",
              "Schulungen und Awareness-Programm fortführen",
              "Incident-Response-Übungen durchführen",
            ]}
          />
        </div>
      </Section>

      {/* ═══════════════════ 11. FAQ ═══════════════════ */}
      <Section id="faq" title="Häufige Fragen (FAQ)">
        <AccordionSection
          accent="#0ea5e9"
          allowMultiple
          items={[
            {
              title: "Wie weiß ich, ob mein Unternehmen betroffen ist?",
              content: (
                <div>
                  <p className="mb-3">
                    Prüfen Sie zwei Kriterien:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-[14px]">
                    <li>
                      <strong>Sektor:</strong> Ist Ihr Unternehmen in einem der 18 NIS2-Sektoren
                      tätig? (<LawRef law="NIS2" annex="I">Anhang I</LawRef>: 11 Sektoren mit hoher Kritikalität, <LawRef law="NIS2" annex="II">Anhang II</LawRef>: 7 sonstige
                      kritische Sektoren)
                    </li>
                    <li>
                      <strong>Größe:</strong> Hat Ihr Unternehmen ≥ 50 Mitarbeiter oder ≥ 10 Mio. €
                      Umsatz? Dann fallen Sie automatisch in den Anwendungsbereich.
                    </li>
                  </ol>
                  <p className="mt-3">
                    Bestimmte Einrichtungen (DNS, TLD-Registries, Telekommunikationsanbieter)
                    fallen unabhängig von der Größe unter NIS2.
                  </p>
                </div>
              ),
            },
            {
              title: "Unser Unternehmen hat unter 50 Mitarbeiter — sind wir trotzdem betroffen?",
              content: (
                <p>
                  In der Regel nicht direkt. KMU unter den Schwellenwerten sind grundsätzlich
                  ausgenommen — es sei denn, Sie sind in einem der Sonderbereiche tätig (DNS,
                  TLD, qualifizierte Vertrauensdienste, öffentliche Telekommunikation) oder
                  werden von einem Mitgliedstaat als kritisch eingestuft. <strong>Achtung:</strong>{" "}
                  Auch wenn Sie nicht direkt unter NIS2 fallen, können Sie als Teil der
                  Lieferkette eines betroffenen Unternehmens indirekt Anforderungen erfüllen müssen.
                </p>
              ),
            },
            {
              title: "Was ist der Unterschied zwischen wesentlich und wichtig?",
              content: (
                <div>
                  <p className="mb-3">Die Kernunterschiede:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>Aufsicht:</strong> Wesentliche Einrichtungen unterliegen proaktiver Aufsicht (Behörde prüft aktiv). Wichtige Einrichtungen unterliegen reaktiver Aufsicht (Prüfung nur bei Verdacht).</li>
                    <li><strong>Strafen:</strong> Wesentlich: bis 10 Mio. € / 2% Umsatz. Wichtig: bis 7 Mio. € / 1,4% Umsatz.</li>
                    <li><strong>Pflichten:</strong> Identisch — beide müssen alle 10 Mindestmaßnahmen und Meldepflichten erfüllen.</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Wir haben bereits ISO 27001 — reicht das?",
              content: (
                <p>
                  ISO 27001 ist eine exzellente Grundlage und deckt viele NIS2-Anforderungen ab.
                  Allerdings gibt es Bereiche, die über ISO 27001 hinausgehen: die spezifischen
                  Meldepflichten (24h/72h/1 Monat), die Supply-Chain-Sicherheitsanforderungen,
                  die Management-Schulungspflicht und die Registrierungspflicht beim BMI.
                  Eine Gap-Analyse zwischen Ihrem ISMS und den NIS2-Anforderungen ist empfehlenswert.
                </p>
              ),
            },
            {
              title: "Wie hängt NIS2 mit DORA zusammen?",
              content: (
                <p>
                  Für den Finanzsektor ist DORA (Digital Operational Resilience Act) als Spezialgesetz
                  (lex specialis) vorrangig. Finanzunternehmen, die unter DORA fallen, müssen die
                  DORA-Anforderungen erfüllen — nicht die NIS2-Anforderungen. DORA enthält jedoch
                  ähnliche oder strengere Pflichten. Finanzunternehmen sollten prüfen, welche
                  Verordnung für sie maßgeblich ist.
                </p>
              ),
            },
            {
              title: "Kann der Geschäftsführer persönlich bestraft werden?",
              content: (
                <p>
                  Ja. NIS2 führt erstmals eine explizite persönliche Haftung der Leitungsorgane ein.
                  Bei Verstößen können Geschäftsführer <strong>vorübergehend von ihrer Funktion
                  suspendiert</strong> werden, bis die Mängel behoben sind. Dazu kommt die
                  zivilrechtliche Haftung gegenüber dem Unternehmen (Regress) und gegenüber
                  Dritten (Deliktshaftung). Die NIS2-Haftung ergänzt bestehende Pflichten nach{" "}
                  <LawRef law="GmbHG" paragraph="25" /> bzw. <LawRef law="AktG" paragraph="84" />.
                </p>
              ),
            },
            {
              title: "Was passiert, wenn wir einen Vorfall nicht melden?",
              content: (
                <p>
                  Die Nichtmeldung eines erheblichen Sicherheitsvorfalls ist ein eigenständiger
                  Verstoß, der unabhängig vom Vorfall selbst bestraft werden kann. Es drohen
                  Geldstrafen gemäß den oben genannten Höchstbeträgen sowie mögliche
                  Reputationsschäden durch öffentliche Bekanntmachung. Die Frühwarnung (24h)
                  muss keine vollständige Analyse enthalten — Geschwindigkeit geht vor
                  Vollständigkeit.
                </p>
              ),
            },
            {
              title: "Wann sollten wir mit der Umsetzung beginnen?",
              content: (
                <p>
                  <strong>Jetzt.</strong> Das NISG 2026 tritt am 1. Oktober 2026 in Kraft. Da ein realistischer
                  Zeitrahmen für die vollständige Umsetzung bei 9 bis 18 Monaten liegt, sollten
                  betroffene Unternehmen umgehend mit der Vorbereitung beginnen. Wer jetzt startet,
                  hat einen strategischen Vorteil und vermeidet Hektik vor dem Stichtag.
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ VERWANDTE REGULIERUNGEN ═══════════════════ */}
      <RelatedGuides currentGuide="nisg-2026" accent="#1e40af" />

      {/* ═══════════════════ SOFTWARE-EMPFEHLUNGEN ═══════════════════ */}
      <ToolRecommendation regulationKey="nis2" accent="#0ea5e9" />

      {/* ═══════════════════ QUELLEN ═══════════════════ */}
      <Section id="quellen" title="Quellen & Offizielle Dokumente">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Alle Informationen in diesem Guide basieren auf den offiziellen EU- und
          {"\u00D6"}sterreich-Dokumenten. Hier finden Sie die Primärquellen:
        </p>

        <SourceList sources={sources} accent="#0ea5e9" />

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
