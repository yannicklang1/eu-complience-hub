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
    title: "Directive (EU) 2022/2555 — NIS2 Directive (Full Text)",
    url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj/deu",
    desc: "Official German version on the EUR-Lex portal",
    type: "EU Directive",
  },
  {
    id: 2,
    title: "NIS2 Directive — English Version",
    url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng",
    desc: "Official English version on the EUR-Lex portal",
    type: "EU Directive",
  },
  {
    id: 3,
    title: "NISG 2026 — Parliamentary Process",
    url: "https://www.parlament.gv.at/gegenstand/XXVIII/I/308",
    desc: "Government bill and legislative adoption in the Austrian Parliament",
    type: "Austrian Law",
  },
  {
    id: 4,
    title: "CERT.at — National CSIRT",
    url: "https://cert.at",
    desc: "Computer Emergency Response Team Austria — incident reporting and early warnings",
    type: "Austrian Authority",
  },
  {
    id: 5,
    title: "BMI — Cybersecurity Authority",
    url: "https://www.bmi.gv.at",
    desc: "Federal Ministry of the Interior — competent supervisory authority",
    type: "Austrian Authority",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "nis2-vs-nis1", label: "NIS2 vs. NIS1" },
  { id: "timeline", label: "Timeline & Deadlines" },
  { id: "affected-entities", label: "Who Is Affected?" },
  { id: "measures", label: "10 Minimum Measures" },
  { id: "reporting-obligations", label: "Reporting Obligations" },
  { id: "management-liability", label: "Management Liability" },
  { id: "penalties", label: "Penalties" },
  { id: "austria", label: "Implementation in Austria" },
  { id: "roadmap", label: "Compliance Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Penalty", value: "EUR 10M or 2% of revenue" },
  { label: "Effective from", value: "1 October 2026" },
  { label: "Affected (AT)", value: "approx. 3,000–4,000 companies" },
  { label: "Authority (AT)", value: "BMI / Cybersecurity Authority" },
  { label: "CSIRT (AT)", value: "CERT.at / GovCERT" },
  { label: "Reporting Duty", value: "24h early warning" },
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
              Done
            </span>
          )}
          {active && (
            <span className="text-[9px] px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 font-mono font-bold border border-sky-200">
              Current
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
export default function GuideContentEN() {
  return (
    <GuidePageLayout
      title="NISG 2026"
      subtitle="Austria's implementation of the NIS2 Directive in detail: affected sectors, reporting obligations, management liability, penalties, and your compliance roadmap."
      regulationKey="NIS2 Directive (EU) 2022/2555"
      accent="#0ea5e9"
      badgeLabel="Implementation AT"
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
      {/* ═══════════════════ 1. OVERVIEW ═══════════════════ */}
      <Section id="overview" title="Overview: What Is the NISG 2026?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The <strong>NISG 2026</strong> (Network and Information Systems Security Act 2026, Federal Law Gazette I No. 94/2025)<SourceRef id={3} sources={sources} accent="#0ea5e9" />{" "}
          is Austria&apos;s national transposition of the European <strong>NIS2 Directive</strong>{" "}
          (Directive (EU) 2022/2555)<SourceRef id={1} sources={sources} accent="#0ea5e9" />. It replaces the previous NISG from 2018 and drastically expands the
          scope of application: instead of approximately 100 operators of essential services, an
          estimated <strong>3,000 to 4,000 Austrian companies</strong> are now affected.
        </p>
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          The NIS2 Directive aims to establish a <strong>uniformly high level of cybersecurity</strong>{" "}
          across the entire EU. It obliges companies from 18 sectors to implement comprehensive
          risk management measures, comply with strict incident reporting obligations, and
          for the first time makes <strong>managing directors personally liable</strong> for cybersecurity compliance.
        </p>

        {/* Key stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard value="EUR 10M" label="Max. Penalty" accent="#dc2626" />
          <StatCard value="18" label="Affected Sectors" />
          <StatCard value="24h" label="Early Warning" accent="#0ea5e9" />
          <StatCard value="2022" label="EU Directive since" accent="#059669" />
        </div>

        {/* Info box */}
        <div className="rounded-2xl bg-sky-50/60 border border-sky-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-sky-700 mb-1">
                Transposition Status in Austria
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                The EU transposition deadline was 17 October 2024. An initial draft (NISG 2024) failed
                in July 2024 in the National Council due to the required two-thirds majority. The NISG 2026 was
                adopted on 12 December 2025 in the National Council and on 18 December 2025 in the Federal Council
                (Federal Law Gazette I No. 94/2025). It enters into force on <strong>1 October 2026</strong>.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 2. NIS2 VS NIS1 ═══════════════════ */}
      <Section id="nis2-vs-nis1" title="What Has Changed? NIS2 vs. NIS1">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          The NIS2 Directive is not merely an update — it represents a fundamental
          paradigm shift in European cybersecurity regulation. The key changes:
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8 overflow-x-auto">
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 pb-3 border-b-2 border-[#e8ecf4] mb-1">
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#7a8db0]">
              Aspect
            </div>
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#7a8db0]">
              NIS1 (old)
            </div>
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-sky-500">
              NIS2 (new)
            </div>
          </div>

          <ComparisonRow
            aspect="Affected Sectors"
            nis1="7 sectors"
            nis2="18 sectors"
          />
          <ComparisonRow
            aspect="Affected in AT"
            nis1="~100 operators"
            nis2="~3,000–4,000 companies"
          />
          <ComparisonRow
            aspect="Classification"
            nis1="Individually by authority"
            nis2="Automatic via size-cap"
          />
          <ComparisonRow
            aspect="Reporting Duty"
            nis1="Without delay"
            nis2="24h / 72h / 1 month (tiered)"
          />
          <ComparisonRow
            aspect="Management Liability"
            nis1="No explicit provision"
            nis2="Personal liability of directors"
          />
          <ComparisonRow
            aspect="Penalties (max.)"
            nis1="EUR 50,000"
            nis2="EUR 10M / 2% of revenue"
          />
          <ComparisonRow
            aspect="Supply Chain"
            nis1="Not explicit"
            nis2="Mandatory assessment"
          />
          <ComparisonRow
            aspect="Training Obligation"
            nis1="None"
            nis2="Mandatory for management"
          />
        </div>
      </Section>

      {/* ═══════════════════ 3. TIMELINE ═══════════════════ */}
      <Section id="timeline" title="Timeline & Deadlines">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          From EU adoption to full operational implementation in Austria — the key milestones:
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8">
          <TimelineItem
            date="16 January 2023"
            title="NIS2 Directive enters into force"
            description="Directive (EU) 2022/2555 enters into force at EU level. The 21-month transposition period for Member States begins."
            done
          />
          <TimelineItem
            date="July 2024"
            title="NISG 2024 fails in the National Council"
            description="An initial draft of the NISG fails on 3 July 2024 in the National Council due to the required two-thirds majority. Austria thus misses the EU transposition deadline."
            done
          />
          <TimelineItem
            date="December 2025"
            title="NISG 2026 adopted"
            description="On 12 December 2025, the National Council adopts the NISG 2026; on 18 December 2025, the Federal Council approves it. Federal Law Gazette I No. 94/2025. The law enters into force on 1 October 2026."
            done
          />
          <TimelineItem
            date="17 October 2024"
            title="EU transposition deadline"
            description="All Member States were required to transpose NIS2 into national law by this date. The old NIS Directive (NIS1) was repealed on 18 October 2024."
            done
          />
          <TimelineItem
            date="2025/2026"
            title="Registration & operational implementation"
            description="Gradual establishment of the registration system, reporting platform, and supervisory structures. Affected companies must register with the BMI and implement the minimum measures."
            active
          />
          <TimelineItem
            date="17 April 2025"
            title="Compilation of essential entities list"
            description="Each Member State must compile a list of essential and important entities and submit it to the EU cooperation network. Regular updates every 2 years."
          />
          <TimelineItem
            date="17 October 2027"
            title="Review of the Directive"
            description="The European Commission reviews the NIS2 Directive and presents a report to the European Parliament with potential amendments."
          />
        </div>
      </Section>

      {/* ═══════════════════ 4. WHO IS AFFECTED? ═══════════════════ */}
      <Section id="affected-entities" title="Who Is Affected?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-4">
          NIS2 distinguishes between <strong>essential</strong> and <strong>important
          entities</strong>. Classification is automatic via the{" "}
          <strong>size-cap mechanism</strong>: medium-sized and large companies in the
          affected sectors automatically fall within the scope.
        </p>

        {/* Size cap explanation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="rounded-2xl border-2 border-sky-300 bg-sky-50/50 p-6">
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-sky-600 mb-2">
              Essential Entities
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Large companies in highly critical sectors
            </h3>
            <ul className="space-y-2 text-[14px] text-[#5a6a8a]">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0 mt-2" />
                <span>&ge; 250 employees <strong>OR</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0 mt-2" />
                <span>&ge; EUR 50M revenue <strong>AND</strong> &ge; EUR 43M balance sheet total</span>
              </li>
            </ul>
            <div className="mt-4 px-3 py-2 rounded-lg bg-sky-100/60 text-[12px] text-sky-700 font-medium">
              Stricter supervision: proactive audits, higher penalties
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#7a8db0] mb-2">
              Important Entities
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Medium-sized companies in all NIS2 sectors
            </h3>
            <ul className="space-y-2 text-[14px] text-[#5a6a8a]">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7a8db0] flex-shrink-0 mt-2" />
                <span>&ge; 50 employees <strong>OR</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7a8db0] flex-shrink-0 mt-2" />
                <span>&ge; EUR 10M revenue <strong>AND</strong> &ge; EUR 10M balance sheet total</span>
              </li>
            </ul>
            <div className="mt-4 px-3 py-2 rounded-lg bg-[#f4f6fc] text-[12px] text-[#5a6a8a] font-medium">
              Reactive supervision: audits only upon suspicion or after an incident
            </div>
          </div>
        </div>

        {/* Sector lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SectorCard
            category="Sectors of High Criticality (Annex I)"
            categoryColor="#0ea5e9"
            sectors={[
              { name: "Energy", examples: "Electricity, gas, oil, district heating, hydrogen" },
              { name: "Transport", examples: "Air, rail, water, road" },
              { name: "Banking", examples: "Credit institutions" },
              { name: "Financial Market Infrastructure", examples: "Exchanges, clearing houses" },
              { name: "Healthcare", examples: "Hospitals, laboratories, pharma, medical devices" },
              { name: "Drinking Water", examples: "Water supply" },
              { name: "Waste Water", examples: "Waste water management" },
              { name: "Digital Infrastructure", examples: "IXPs, DNS, TLDs, cloud, data centres" },
              { name: "ICT Service Management (B2B)", examples: "MSPs, MSSPs" },
              { name: "Public Administration", examples: "Central and regional government" },
              { name: "Space", examples: "Ground stations, operators" },
            ]}
          />
          <SectorCard
            category="Other Critical Sectors (Annex II)"
            categoryColor="#7a8db0"
            sectors={[
              { name: "Postal and Courier", examples: "Parcel services, postal services" },
              { name: "Waste Management", examples: "Waste disposal companies" },
              { name: "Chemicals", examples: "Manufacturing, production, distribution" },
              { name: "Food", examples: "Wholesale, production, processing" },
              { name: "Manufacturing", examples: "Medical devices, electronics, machinery, vehicles" },
              { name: "Digital Services", examples: "Marketplaces, search engines, social media" },
              { name: "Research", examples: "Research institutions" },
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
                Special Cases: Micro-Enterprises Also Affected
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                Regardless of size, certain entities always fall under NIS2:
                providers of DNS services, TLD registries, qualified trust service providers,
                public electronic communications networks, and all entities that a
                Member State classifies as critical. Suppliers in the supply chain may also
                be indirectly affected.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 5. 10 MINIMUM MEASURES ═══════════════════ */}
      <Section id="measures" title="The 10 Minimum Measures (Art. 21)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          <LawRef law="NIS2" article="21">Article 21</LawRef> of the NIS2 Directive defines ten mandatory cybersecurity minimum measures
          that every affected entity must implement. The measures follow an{" "}
          <strong>all-hazards approach</strong> and must be proportionate — adapted
          to the entity&apos;s size, risk exposure, and societal significance.
        </p>

        <AccordionSection
          accent="#0ea5e9"
          items={[
            {
              title: "1. Risk Analysis & Security Policies",
              content: (
                <div>
                  <p className="mb-3">
                    The foundation of all measures: systematic identification, assessment, and
                    treatment of risks to network and information systems.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Regular risk analyses of IT and OT infrastructure</li>
                    <li>Documented information security policies (ISMS)</li>
                    <li>Consideration of availability, integrity, and confidentiality</li>
                    <li>Define risk appetite and accepted residual risks</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "2. Incident Handling",
              content: (
                <div>
                  <p className="mb-3">
                    Processes and capabilities for prevention, detection, analysis,
                    containment, and recovery from cyber incidents.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Incident response plan with defined roles and escalation paths</li>
                    <li>Integration with reporting obligations under <LawRef law="NIS2" article="23">Art. 23</LawRef> (24h/72h/1 month)</li>
                    <li>Forensic analysis and evidence preservation capabilities</li>
                    <li>Regular exercises and incident response tests</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "3. Business Continuity & Crisis Management",
              content: (
                <div>
                  <p className="mb-3">
                    Ensuring business continuity and rapid recovery
                    following a security incident.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Backup management with regular recovery testing</li>
                    <li>Disaster recovery plans for critical systems</li>
                    <li>Define crisis management processes and teams</li>
                    <li>Establish RPO and RTO targets for all critical services</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "4. Supply Chain Security",
              content: (
                <div>
                  <p className="mb-3">
                    One of the most important innovations: companies must actively manage the
                    cybersecurity of their entire supply chain.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Assessment of cybersecurity posture of all direct suppliers</li>
                    <li>Contractual security requirements for service providers</li>
                    <li>Consideration of overall product quality and security practices</li>
                    <li>Regular reviews and audits of the supply chain</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "5. Security in Acquisition, Development & Maintenance",
              content: (
                <div>
                  <p className="mb-3">
                    Security by design: integration of security measures throughout the
                    entire lifecycle of network and information systems.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Define security requirements during procurement</li>
                    <li>Secure development practices (Secure SDLC)</li>
                    <li>Vulnerability management and patch processes</li>
                    <li>Security testing before deployment (penetration tests)</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "6. Effectiveness Assessment",
              content: (
                <div>
                  <p className="mb-3">
                    Regular verification of whether the implemented security measures
                    are actually effective.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Internal audits and security reviews</li>
                    <li>Key Performance Indicators (KPIs) for cybersecurity</li>
                    <li>Regular vulnerability scans and penetration tests</li>
                    <li>Management reviews of the security posture</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "7. Cyber Hygiene & Training",
              content: (
                <div>
                  <p className="mb-3">
                    Basic cyber hygiene practices and mandatory training
                    for all employees — including management.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Regular security awareness training</li>
                    <li>Phishing simulations and social engineering tests</li>
                    <li>Mandatory management training (<LawRef law="NIS2" article="20" absatz="2" />)</li>
                    <li>Password policies, clean desk policy, secure device usage</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "8. Cryptography & Encryption",
              content: (
                <div>
                  <p className="mb-3">
                    Policies and procedures for the use of cryptography and
                    encryption to protect data.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Key management processes</li>
                    <li>Use of recognised cryptographic standards</li>
                    <li>Regular review of cryptographic algorithms</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "9. Human Resources Security & Access Control",
              content: (
                <div>
                  <p className="mb-3">
                    Ensuring that only authorised persons can access critical systems
                    and data.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Role-based access control (RBAC)</li>
                    <li>Principle of least privilege</li>
                    <li>Regular review of access rights</li>
                    <li>Secure onboarding/offboarding processes</li>
                    <li>Asset management and inventory</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "10. Multi-Factor Authentication & Secure Communication",
              content: (
                <div>
                  <p className="mb-3">
                    Deployment of modern authentication methods and secured
                    communication channels.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>MFA or continuous authentication for critical systems</li>
                    <li>Secured voice, video, and text communication</li>
                    <li>Secure emergency communication systems</li>
                    <li>Zero-trust approach where appropriate</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 6. REPORTING OBLIGATIONS ═══════════════════ */}
      <Section id="reporting-obligations" title="Reporting Obligations: The 24-72-30 System">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          NIS2 introduces a <strong>three-tiered reporting system</strong> for significant security incidents.
          An incident is considered &quot;significant&quot; if it causes or is capable of causing severe
          operational disruption, financial losses, or considerable material or immaterial damage.
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8">
          <ReportingStep
            time="Within 24 hours"
            title="Early Warning"
            description={<>Rapid initial notification to the CSIRT (CERT.at)<SourceRef id={4} sources={sources} accent="#0ea5e9" /> or the competent authority. Must indicate whether the incident is suspected to be unlawful or malicious and whether it could have cross-border impact. Focus on speed, not completeness.</>}
            icon="🚨"
            color="#dc2626"
          />
          <ReportingStep
            time="Within 72 hours"
            title="Incident Notification"
            description="Update of the early warning with an initial assessment of the incident: severity, impact, affected systems/users, attack method (if known), countermeasures taken, and Indicators of Compromise (IoCs)."
            icon="📝"
            color="#ea580c"
          />
          <ReportingStep
            time="On request"
            title="Intermediate Report"
            description="The CSIRT or authority may at any time request an intermediate report with current status updates, the evolution of the incident, and the effectiveness of the countermeasures."
            icon="📊"
            color="#0ea5e9"
          />
          <ReportingStep
            time="Within 1 month"
            title="Final Report"
            description="Detailed final report including: complete description of the incident, nature of the threat and root cause, applied and ongoing measures, cross-border impact. If the incident is still ongoing: progress report instead of final report."
            icon="📋"
            color="#059669"
          />
        </div>

        <div className="rounded-2xl bg-emerald-50/60 border border-emerald-200/50 p-5 mt-6">
          <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
            <strong>Liability Protection:</strong> The mere reporting of an incident does not
            create increased liability for the reporting entity. Companies should not refrain
            from reporting out of fear of consequences. However, penalties apply for
            <em> failure</em> to report.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 7. MANAGEMENT LIABILITY ═══════════════════ */}
      <Section id="management-liability" title="Management Liability">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          One of the most far-reaching innovations of the NIS2 Directive: <strong>management
          is personally responsible</strong> for compliance with cybersecurity obligations.
          &quot;This is too technical for me&quot; is no longer a valid excuse.
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
                  Approval &amp; Oversight (<LawRef law="NIS2" article="20" absatz="1" />)
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                  Management bodies must <strong>approve</strong> the risk management measures
                  under <LawRef law="NIS2" article="21">Art. 21</LawRef>, <strong>oversee</strong> their
                  implementation, and can be held <strong>personally liable</strong> for breaches.
                  Delegation to the IT department is not sufficient.
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
                  Training Obligation (<LawRef law="NIS2" article="20" absatz="2" />)
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                  Members of management bodies must <strong>participate in cybersecurity
                  training</strong>. They must acquire sufficient knowledge to identify
                  and assess cyber risks. Similar training should also be offered to
                  employees.
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
                  Consequences of Non-Compliance
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                  In cases of non-compliance, authorities may <strong>temporarily suspend
                  managing directors from their position</strong> until the deficiencies are
                  remedied. In addition, monetary fines and civil liability for
                  damages resulting from inadequate cybersecurity may apply.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-sky-50/60 border border-sky-200/50 p-5">
          <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
            <strong>Important for GmbH managing directors:</strong> The NIS2 liability supplements the
            existing duty of care under <LawRef law="GmbHG" paragraph="25" />. Managing directors must be able to
            demonstrate that they were informed about material cyber risks and made appropriate
            decisions based on this information. Building a structured information flow
            between IT and management is critical.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 8. PENALTIES ═══════════════════ */}
      <Section id="penalties" title="Penalties & Fines">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          NIS2 provides for massive penalties — a quantum leap compared to the old NISG, which
          provided for a maximum of EUR 50,000. Penalties are tiered by type of entity.
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
                  Essential Entities
                </div>
                <div className="font-[Syne] font-extrabold text-xl text-[#060c1a]">
                  Up to EUR 10M or 2% of revenue
                </div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed ml-[52px]">
              The higher amount (fixed sum or percentage of global annual revenue)
              applies. Proactive supervision: the authority may conduct audits at any time,
              even without specific suspicion.
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
                  Important Entities
                </div>
                <div className="font-[Syne] font-extrabold text-xl text-[#060c1a]">
                  Up to EUR 7M or 1.4% of revenue
                </div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed ml-[52px]">
              The higher amount applies. Reactive supervision: audits only upon
              specific suspicion, tip-off, or after a security incident.
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
                  Additional Sanctions
                </div>
                <div className="font-[Syne] font-extrabold text-xl text-[#060c1a]">
                  Suspension & Enforcement Measures
                </div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed ml-[52px]">
              In addition to fines, authorities may: temporarily suspend managing directors,
              order public disclosure of the breach, issue binding instructions to
              remedy deficiencies, and for essential entities, suspend certifications.
            </p>
          </div>
        </div>

        {/* Comparison box */}
        <div className="rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5 mt-6">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">For comparison:</strong> Under the
            old NISG, the maximum penalty was merely <strong>EUR 50,000</strong>.
            NIS2 increases the maximum to <strong>EUR 10M or 2% of global annual
            revenue</strong> — a factor of 200x. Add to that the new personal
            management liability.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 9. AUSTRIA ═══════════════════ */}
      <Section id="austria" title="Implementation in Austria">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          As an EU directive, NIS2 had to be transposed into national law.
          Austria has done so with the <strong>NISG 2026</strong> (Federal Law Gazette I No. 94/2025), which establishes
          specific national structures for supervision, incident reporting, and registration.
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
                  Federal Ministry of the Interior (BMI)<SourceRef id={5} sources={sources} accent="#0ea5e9" />
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
                  The BMI is the competent authority for the implementation of the NISG. It
                  operates the Cybersecurity Authority, which is responsible for supervision, registration,
                  and enforcement. Affected companies must register with the BMI and keep their
                  contact details up to date.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 font-mono border border-sky-200">
                    Registration
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 font-mono border border-sky-200">
                    Supervision
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 font-mono border border-sky-200">
                    Enforcement
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
              CERT.at serves as the national CSIRT (Computer Security Incident Response Team)
              and is the central point of contact for reporting security incidents. GovCERT
              is specifically responsible for the public sector. Both teams provide technical
              support for incident handling and coordinate cross-border
              cooperation.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">
                Incident Reports
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">
                Technical Assistance
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">
                Early Warning System
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Registration Obligation
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              All affected entities must proactively register with the BMI.
              Registration includes: name and contact details, the sector and sub-sector,
              the classification (essential/important), IP address ranges, and a list of
              EU Member States in which services are provided. The data must be
              updated without delay in the event of changes.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Sector-Specific Supervisory Authorities
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              In addition to the BMI, dedicated supervisory authorities may be responsible
              for specific sectors: the FMA for the financial sector (in coordination with DORA),
              E-Control for the energy sector, the RTR for telecommunications, and
              further sector-specific regulators.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 10. COMPLIANCE ROADMAP ═══════════════════ */}
      <Section id="roadmap" title="Your Compliance Roadmap">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Achieve NISG compliance in four phases. The law enters into force on 1 October 2026
          {"\u2014"} start preparing now to be compliant in time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RoadmapStep
            phase="Phase 1 — Immediately"
            title="Applicability Analysis"
            accent="#0ea5e9"
            items={[
              "Determine whether your company falls under NIS2 (sector + size)",
              "Classification as essential or important entity",
              "Prepare registration with the BMI",
              "Inform and raise awareness among management",
            ]}
          />
          <RoadmapStep
            phase="Phase 2 — Month 1–3"
            title="Governance & Gap Analysis"
            accent="#0891b2"
            items={[
              "Appoint a cybersecurity officer (CISO/ISM)",
              "Gap analysis against the 10 minimum measures (Art. 21)",
              "Start training programme for management",
              "Draft incident response plan",
            ]}
          />
          <RoadmapStep
            phase="Phase 3 — Month 3–9"
            title="Implement Measures"
            accent="#0e7490"
            items={[
              "Build or expand ISMS (ISO 27001 recommended)",
              "Assess supply chain security and establish contractual safeguards",
              "Set up reporting processes (24h/72h/1 month)",
              "Implement backup, BCP, and DR concepts",
            ]}
          />
          <RoadmapStep
            phase="Phase 4 — Ongoing"
            title="Operations & Improvement"
            accent="#155e75"
            items={[
              "Complete registration with the BMI",
              "Conduct regular audits and effectiveness reviews",
              "Continue training and awareness programmes",
              "Conduct incident response exercises",
            ]}
          />
        </div>
      </Section>

      {/* ═══════════════════ 11. FAQ ═══════════════════ */}
      <Section id="faq" title="Frequently Asked Questions (FAQ)">
        <AccordionSection
          accent="#0ea5e9"
          allowMultiple
          items={[
            {
              title: "How do I know if my company is affected?",
              content: (
                <div>
                  <p className="mb-3">
                    Check two criteria:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-[14px]">
                    <li>
                      <strong>Sector:</strong> Does your company operate in one of the 18 NIS2 sectors?
                      (<LawRef law="NIS2" annex="I">Annex I</LawRef>: 11 sectors of high criticality, <LawRef law="NIS2" annex="II">Annex II</LawRef>: 7 other
                      critical sectors)
                    </li>
                    <li>
                      <strong>Size:</strong> Does your company have &ge; 50 employees or &ge; EUR 10M
                      revenue? Then you automatically fall within the scope.
                    </li>
                  </ol>
                  <p className="mt-3">
                    Certain entities (DNS, TLD registries, telecommunications providers)
                    fall under NIS2 regardless of size.
                  </p>
                </div>
              ),
            },
            {
              title: "Our company has fewer than 50 employees — are we still affected?",
              content: (
                <p>
                  Generally not directly. SMEs below the thresholds are in principle
                  exempt — unless you operate in one of the special areas (DNS,
                  TLD, qualified trust services, public telecommunications) or
                  are classified as critical by a Member State. <strong>Note:</strong>{" "}
                  Even if you are not directly subject to NIS2, you may need to fulfil
                  requirements indirectly as part of the supply chain of an affected company.
                </p>
              ),
            },
            {
              title: "What is the difference between essential and important?",
              content: (
                <div>
                  <p className="mb-3">The key differences:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>Supervision:</strong> Essential entities are subject to proactive supervision (authority actively audits). Important entities are subject to reactive supervision (audits only upon suspicion).</li>
                    <li><strong>Penalties:</strong> Essential: up to EUR 10M / 2% of revenue. Important: up to EUR 7M / 1.4% of revenue.</li>
                    <li><strong>Obligations:</strong> Identical — both must fulfil all 10 minimum measures and reporting obligations.</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "We already have ISO 27001 — is that sufficient?",
              content: (
                <p>
                  ISO 27001 is an excellent foundation and covers many NIS2 requirements.
                  However, there are areas that go beyond ISO 27001: the specific
                  reporting obligations (24h/72h/1 month), the supply chain security requirements,
                  the management training obligation, and the registration requirement with the BMI.
                  A gap analysis between your ISMS and the NIS2 requirements is recommended.
                </p>
              ),
            },
            {
              title: "How does NIS2 relate to DORA?",
              content: (
                <p>
                  For the financial sector, DORA (Digital Operational Resilience Act) takes precedence
                  as a special law (lex specialis). Financial entities that fall under DORA must comply
                  with the DORA requirements — not the NIS2 requirements. DORA, however, contains
                  similar or stricter obligations. Financial entities should check which
                  regulation applies to them.
                </p>
              ),
            },
            {
              title: "Can the managing director be personally penalised?",
              content: (
                <p>
                  Yes. NIS2 introduces for the first time an explicit personal liability of management bodies.
                  In the event of breaches, managing directors may be <strong>temporarily suspended
                  from their position</strong> until the deficiencies are remedied. In addition,
                  civil liability towards the company (recourse) and towards
                  third parties (tort liability) applies. The NIS2 liability supplements existing obligations under{" "}
                  <LawRef law="GmbHG" paragraph="25" /> and <LawRef law="AktG" paragraph="84" />.
                </p>
              ),
            },
            {
              title: "What happens if we fail to report an incident?",
              content: (
                <p>
                  Failure to report a significant security incident constitutes a separate
                  breach that can be penalised independently of the incident itself.
                  Monetary fines up to the maximum amounts stated above may apply, along with
                  potential reputational damage through public disclosure. The early warning (24h)
                  does not need to contain a complete analysis — speed takes priority over
                  completeness.
                </p>
              ),
            },
            {
              title: "When should we start with implementation?",
              content: (
                <p>
                  <strong>Now.</strong> The NISG 2026 enters into force on 1 October 2026. Since a realistic
                  timeframe for full implementation is 9 to 18 months, affected companies should
                  begin preparations immediately. Those who start now have a strategic advantage
                  and avoid last-minute pressure before the deadline.
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ RELATED REGULATIONS ═══════════════════ */}
      <RelatedGuides currentGuide="nisg-2026" accent="#1e40af" />

      {/* ═══════════════════ SOFTWARE RECOMMENDATIONS ═══════════════════ */}
      <ToolRecommendation regulationKey="nis2" accent="#0ea5e9" />

      {/* ═══════════════════ SOURCES ═══════════════════ */}
      <Section id="sources" title="Sources & Official Documents">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          All information in this guide is based on official EU and
          Austrian documents. Here are the primary sources:
        </p>

        <SourceList sources={sources} accent="#0ea5e9" />

        <div className="mt-6 rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Disclaimer:</strong> This guide is for informational
            purposes and does not constitute legal advice. The linked documents are the official
            legal texts. For questions regarding the specific application to your company, we recommend
            consulting specialised lawyers or compliance advisors.
          </p>
        </div>
      </Section>
    </GuidePageLayout>
  );
}
