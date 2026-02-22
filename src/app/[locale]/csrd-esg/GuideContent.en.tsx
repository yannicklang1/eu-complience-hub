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

/* ─────────────────── Sources ─────────────────── */
const sources: Source[] = [
  {
    id: 1,
    title: "Richtlinie (EU) 2022/2464 — CSRD (Volltext)",
    url: "https://eur-lex.europa.eu/eli/dir/2022/2464/oj/deu",
    desc: "Official full text of the Corporate Sustainability Reporting Directive on the EUR-Lex portal",
    type: "Directive",
  },
  {
    id: 2,
    title: "Delegierte VO (EU) 2023/2772 — ESRS",
    url: "https://eur-lex.europa.eu/eli/del_reg/2023/2772/oj/deu",
    desc: "European Sustainability Reporting Standards — the 12 mandatory reporting standards",
    type: "Standards",
  },
  {
    id: 3,
    title: "NaBeG — Nachhaltigkeitsberichterstattung (RIS)",
    url: "https://www.ris.bka.gv.at/Ergebnis.wxe?Abfrage=Bundesnormen&Suchworte=NaBeG",
    desc: "Austrian Sustainability Reporting Act — national transposition of the CSRD",
    type: "Nat. Law",
  },
  {
    id: 4,
    title: "Omnibus I — COM(2025) 80",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=COM:2025:80:FIN",
    desc: "EU Commission proposal to simplify sustainability reporting obligations",
    type: "Draft",
  },
  {
    id: 5,
    title: "EFRAG — ESRS Guidance",
    url: "https://www.efrag.org/lab6",
    desc: "European Financial Reporting Advisory Group — implementation guidance on the ESRS",
    type: "Guidance",
  },
  {
    id: 6,
    title: "WKO — Nachhaltigkeitsberichterstattung",
    url: "https://www.wko.at/nachhaltigkeit/nachhaltigkeitsberichterstattung",
    desc: "Austrian Federal Economic Chamber — practical guide for Austrian companies",
    type: "Practical Guide",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Overview" },
  { id: "timeline", label: "Timeline & Deadlines" },
  { id: "betroffene", label: "Who Is Affected?" },
  { id: "omnibus", label: "Omnibus I" },
  { id: "esrs-standards", label: "ESRS Standards" },
  { id: "wesentlichkeit", label: "Double Materiality" },
  { id: "berichtspflichten", label: "Reporting Obligations" },
  { id: "pruefung", label: "External Assurance" },
  { id: "strafen", label: "Penalties" },
  { id: "oesterreich", label: "Austria" },
  { id: "fahrplan", label: "Compliance Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Penalty (AT)", value: "up to EUR 100,000" },
  { label: "EU Effective Since", value: "5 Jan 2023" },
  { label: "AT Transposition", value: "NaBeG (from 2026)" },
  { label: "Scope (Omnibus I)", value: "1,000+ empl. & EUR 450M+" },
  { label: "Standards", value: "12 ESRS" },
  { label: "Legal Basis", value: "Dir. (EU) 2022/2464" },
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
  accent = "#16a34a",
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
  date, title, description, active = false, done = false,
}: { date: string; title: string; description: React.ReactNode; active?: boolean; done?: boolean }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
          done ? "bg-green-600 border-green-600" : active ? "bg-green-600 border-green-600 animate-pulse" : "bg-white border-[#d8dff0]"
        }`} />
        <div className="w-px flex-1 bg-[#e8ecf4] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] font-semibold text-[#7a8db0]">{date}</span>
          {done && <span className="text-[9px] px-2 py-0.5 rounded-md bg-green-50 text-green-700 font-mono font-bold border border-green-200">Done</span>}
          {active && <span className="text-[9px] px-2 py-0.5 rounded-md bg-green-50 text-green-700 font-mono font-bold border border-green-200">Active</span>}
        </div>
        <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">{title}</div>
        <p className="text-[14px] text-[#5a6a8a] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ─────────────────── Roadmap step ─────────────────── */
function RoadmapStep({
  phase, title, items, accent = "#16a34a",
}: { phase: string; title: string; items: string[]; accent?: string }) {
  return (
    <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full" style={{ background: accent }} />
      <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: accent }}>{phase}</div>
      <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[14px] text-[#5a6a8a] leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */
export default function GuideContentEN() {
  return (
    <GuidePageLayout
      title="CSRD / ESG"
      subtitle="Corporate Sustainability Reporting Directive: sustainability reporting, ESRS standards, double materiality, and compliance roadmap for Austrian companies."
      regulationKey="Richtlinie (EU) 2022/2464"
      accent="#16a34a"
      badgeLabel="NaBeG from 2026"
      badgeColor="#15803d"
      quickFacts={quickFacts}
      tocItems={tocItems}
      trustBadge={{ lastReview: "19.02.2026", sourceCount: 6 }}
      heroIcon={
        <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3.284 14.253A8.96 8.96 0 003 12c0-.778.099-1.533.284-2.253" />
        </svg>
      }
      href="/csrd-esg"
    >
      {/* ═══════════════════ 1. OVERVIEW ═══════════════════ */}
      <Section id="ueberblick" title="Overview: What Is the CSRD?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The <strong>Corporate Sustainability Reporting Directive</strong> (Directive (EU) 2022/2464)
          <SourceRef id={1} sources={sources} accent="#16a34a" /> fundamentally modernises and expands
          sustainability reporting across the EU. It replaces the former{" "}
          <strong>Non-Financial Reporting Directive (NFRD)</strong> from 2014 and, for the first time,
          establishes <strong>binding, standardised ESG reporting obligations</strong> for
          companies in the European Union.
        </p>
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          The core objective of the CSRD is to raise the quality, comparability, and reliability of
          sustainability information to the level of financial reporting.
          Companies must report on environmental, social, and governance aspects in accordance with the{" "}
          <strong>European Sustainability Reporting Standards (ESRS)</strong>
          <SourceRef id={2} sources={sources} accent="#16a34a" /> — including a{" "}
          <strong>double materiality assessment</strong>.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard value="Jan 2023" label="Effective" accent="#15803d" />
          <StatCard value="~50,000" label="EU Companies (Original)" />
          <StatCard value="12" label="ESRS Standards" accent="#16a34a" />
          <StatCard value="2026+" label="AT Application" accent="#059669" />
        </div>

        <div className="rounded-2xl bg-green-50/60 border border-green-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-green-700 mb-1">
                CSRD Replaces the NFRD
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                The former NFRD (Directive 2014/95/EU) only applied to approximately 120 large
                capital-market-oriented companies in Austria and largely left them free to choose
                their reporting format and methodology. The CSRD massively expands the scope and
                mandates the use of the uniform ESRS standards. Sustainability information thus
                becomes auditable, comparable, and machine-readable (iXBRL).
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 2. TIMELINE ═══════════════════ */}
      <Section id="timeline" title="Timeline & Deadlines">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          The CSRD provides for a phased introduction. Due to the Commission&apos;s Omnibus I
          proposal, some timelines are currently in flux:
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8">
          <TimelineItem
            date="5 January 2023"
            title="CSRD Enters into Force"
            description="Directive (EU) 2022/2464 enters into force. Member states have 18 months to transpose it into national law."
            done
          />
          <TimelineItem
            date="1 January 2024"
            title="Wave 1: Large PIEs (>500 employees)"
            description="Companies already subject to the NFRD — large public-interest entities with more than 500 employees — report for the first time under ESRS for the financial year 2024."
            done
          />
          <TimelineItem
            date="1 January 2025"
            title="Wave 2: All Large Companies"
            description={<>Large companies meeting 2 of 3 criteria: &gt;250 employees, &gt;EUR 50M revenue, &gt;EUR 25M total assets. <strong>Note:</strong> Omnibus I proposes a deferral to 2027 and significantly higher thresholds.<SourceRef id={4} sources={sources} accent="#16a34a" /></>}
            active
          />
          <TimelineItem
            date="1 January 2026"
            title="Wave 3: Listed SMEs"
            description="Listed small and medium-sized enterprises were to report under simplified ESRS (LSME). Omnibus I proposes a deferral to 2028 and voluntary application — the obligation is largely dropped."
          />
          <TimelineItem
            date="26 February 2025"
            title="Omnibus I Published"
            description={<>The EU Commission publishes COM(2025) 80 — a comprehensive simplification proposal that would restrict the scope to companies with &gt;1,000 employees and &gt;EUR 450M revenue and defer deadlines by two years.<SourceRef id={4} sources={sources} accent="#16a34a" /></>}
            active
          />
          <TimelineItem
            date="2026+"
            title="NaBeG — Transposition in Austria"
            description={<>Austria transposes the CSRD into national law through the Sustainability Reporting Act (NaBeG).<SourceRef id={3} sources={sources} accent="#16a34a" /> The precise application dates depend on the progress of the Omnibus I legislative process.</>}
          />
        </div>

        <div className="rounded-2xl bg-amber-50/60 border border-amber-200/50 p-5 mt-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-amber-700 mb-1">
                Omnibus I: Timeline in Flux
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                The Omnibus I proposal envisages deferring application dates by two years
                (Wave 2 to 2027, Wave 3 to 2028). As long as the legislative process is not
                concluded, the original CSRD deadlines formally remain in effect.
                Companies should plan flexibly and not pause their preparations.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 3. WHO IS AFFECTED? ═══════════════════ */}
      <Section id="betroffene" title="Who Is Affected?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The CSRD has massively expanded the scope compared to the NFRD. However, the
          Omnibus I proposal points towards a significant reduction. A comparison of both
          sets of thresholds:
        </p>

        <AccordionSection
          accent="#16a34a"
          items={[
            {
              title: "Original CSRD Thresholds (Currently Applicable Law)",
              content: (
                <div>
                  <p className="mb-3">
                    Companies meeting at least <strong>two of three</strong> criteria are subject to reporting:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>250+ employees</strong></li>
                    <li><strong>EUR 50M net revenue</strong></li>
                    <li><strong>EUR 25M total assets</strong></li>
                  </ul>
                  <p className="mt-3 text-[13px] text-[#7a8db0]">
                    This also includes all capital-market-oriented companies (including listed
                    SMEs, except micro-enterprises) as well as all insurance companies and credit
                    institutions regardless of size.
                    Estimated scope: approximately 50,000 companies EU-wide.
                  </p>
                </div>
              ),
            },
            {
              title: "Omnibus I Proposal: New Thresholds (Draft)",
              content: (
                <div>
                  <p className="mb-3">
                    The Omnibus I proposal<SourceRef id={4} sources={sources} accent="#16a34a" /> envisages a drastic restriction.
                    Both criteria must be met <strong>simultaneously</strong>:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>1,000+ employees</strong> (instead of 250)</li>
                    <li><strong>EUR 450M net revenue</strong> (instead of EUR 50M)</li>
                  </ul>
                  <p className="mt-3 text-[13px] text-[#7a8db0]">
                    Estimated scope: approximately 5,500 companies EU-wide instead of approximately 50,000.
                    Smaller companies may report voluntarily under simplified
                    standards (Voluntary VSME).
                  </p>
                </div>
              ),
            },
            {
              title: "Third-Country Companies",
              content: (
                <p>
                  Companies from third countries with net revenue exceeding EUR 150M
                  in the EU and at least one subsidiary or branch in the EU also fall
                  under the CSRD. This threshold could also be raised to EUR 450M through
                  Omnibus I.
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 4. OMNIBUS I ═══════════════════ */}
      <Section id="omnibus" title="Omnibus I: What Is Changing?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          On 26 February 2025, the EU Commission published the <strong>Omnibus I proposal</strong>{" "}
          (COM(2025) 80)<SourceRef id={4} sources={sources} accent="#16a34a" /> — a comprehensive
          simplification package affecting the CSRD, the EU Taxonomy, and the
          Corporate Sustainability Due Diligence Directive (CSDDD). The key changes:
        </p>

        <div className="space-y-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-green-700 mb-2">
              Scope
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Drastic Reduction of Scope
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Only companies with more than 1,000 employees AND more than EUR 450M
              net revenue are subject to mandatory reporting. Listed SMEs are fully
              exempted from the obligation. The estimated EU scope drops from approximately 50,000
              to approximately 5,500 companies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-green-700 mb-2">
              Voluntary Reporting
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Simplified Standards for Voluntary Reporters
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Companies no longer subject to the obligation may report voluntarily under
              simplified standards (Voluntary SME Standard — VSME). This secures access
              to green financing and meets information requests from the supply chain
              without the full ESRS burden.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-green-700 mb-2">
              Timeline
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Deferral of Application Dates
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Wave 2 (large companies) is deferred by two years to the financial year 2027,
              Wave 3 (listed SMEs) to 2028. Wave 1 (large PIEs &gt;500 employees)
              remains unaffected and has been reporting since the financial year 2024.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-green-700 mb-2">
              Simplification
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Reduced Data Points and Taxonomy Requirements
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              The Commission announces a reduction of mandatory ESRS data points by
              up to 70-80%. EU Taxonomy reporting is to be simplified and sector-specific
              standards are to be suspended for the time being. Value chain reporting
              is to be limited to the direct supply chain.
            </p>
          </motion.div>
        </div>

        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/40 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-amber-700 mb-1">
                Important: Omnibus I Is Still a Draft
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                COM(2025) 80 is a proposal by the EU Commission and must still pass through the
                ordinary legislative procedure (European Parliament and Council of the EU).
                Amendments to the draft are likely. Until Omnibus enters into force,
                the <strong>current CSRD thresholds and deadlines</strong> remain in effect.
                Companies should continue their preparations and plan flexibly.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 5. ESRS STANDARDS ═══════════════════ */}
      <Section id="esrs-standards" title="ESRS Standards at a Glance">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          The <strong>European Sustainability Reporting Standards (ESRS)</strong>
          <SourceRef id={2} sources={sources} accent="#16a34a" /> form the substantive framework
          of CSRD reporting. Developed by EFRAG<SourceRef id={5} sources={sources} accent="#16a34a" />,
          they comprise 12 standards in four groups:
        </p>

        <div className="space-y-6">
          {/* Cross-cutting */}
          <div>
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-green-700 mb-3 px-1">
              Cross-Cutting Standards
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { code: "ESRS 1", name: "General Requirements", desc: "Fundamental principles, structure, and conventions of reporting" },
                { code: "ESRS 2", name: "General Disclosures", desc: "Mandatory disclosures on governance, strategy, materiality assessment, and metrics (obligatory for all companies)" },
              ].map((item) => (
                <motion.div
                  key={item.code}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border-2 border-green-200 bg-green-50/30 p-5"
                >
                  <div className="font-mono text-[11px] font-bold text-green-700 mb-1">{item.code}</div>
                  <h4 className="font-[Syne] font-bold text-[14px] text-[#060c1a] mb-1">{item.name}</h4>
                  <p className="text-[13px] text-[#5a6a8a] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Environment */}
          <div>
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-emerald-700 mb-3 px-1">
              Environment
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { code: "E1", name: "Climate Change", desc: "GHG emissions (Scope 1-3), transition plan, physical risks" },
                { code: "E2", name: "Pollution", desc: "Emissions to air, water, and soil; pollutants" },
                { code: "E3", name: "Water and Marine Resources", desc: "Water consumption, withdrawal, and impacts on water bodies" },
                { code: "E4", name: "Biodiversity and Ecosystems", desc: "Impacts on ecosystems, land use, species diversity" },
                { code: "E5", name: "Resource Use and Circular Economy", desc: "Material flows, waste, circular economy strategies" },
              ].map((item) => (
                <motion.div
                  key={item.code}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-[#d8dff0] bg-white p-5"
                >
                  <div className="font-mono text-[11px] font-bold text-emerald-600 mb-1">{item.code}</div>
                  <h4 className="font-[Syne] font-bold text-[14px] text-[#060c1a] mb-1">{item.name}</h4>
                  <p className="text-[13px] text-[#5a6a8a] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-blue-700 mb-3 px-1">
              Social
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { code: "S1", name: "Own Workforce", desc: "Working conditions, health, diversity, remuneration" },
                { code: "S2", name: "Workers in the Value Chain", desc: "Labour rights at suppliers and subcontractors" },
                { code: "S3", name: "Affected Communities", desc: "Impacts on local communities and indigenous peoples" },
                { code: "S4", name: "Consumers and End-Users", desc: "Product safety, data protection, access to products" },
              ].map((item) => (
                <motion.div
                  key={item.code}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-[#d8dff0] bg-white p-5"
                >
                  <div className="font-mono text-[11px] font-bold text-blue-600 mb-1">{item.code}</div>
                  <h4 className="font-[Syne] font-bold text-[14px] text-[#060c1a] mb-1">{item.name}</h4>
                  <p className="text-[13px] text-[#5a6a8a] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Governance */}
          <div>
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-violet-700 mb-3 px-1">
              Governance
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-[#d8dff0] bg-white p-5"
              >
                <div className="font-mono text-[11px] font-bold text-violet-600 mb-1">G1</div>
                <h4 className="font-[Syne] font-bold text-[14px] text-[#060c1a] mb-1">Business Conduct</h4>
                <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
                  Corporate culture, anti-corruption, lobbying, payment practices,
                  political influence, and supplier relationships
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5 mt-6">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Materiality principle:</strong> Only ESRS 2
            (General Disclosures) is mandatory for all companies subject to reporting.
            The topical standards E1-E5, S1-S4, and G1 must only be reported if
            the respective topic has been identified as material in the double
            materiality assessment.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 6. DOUBLE MATERIALITY ═══════════════════ */}
      <Section id="wesentlichkeit" title="Double Materiality">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          The <strong>double materiality assessment</strong> is the cornerstone of CSRD reporting.
          Companies must evaluate each ESG aspect from two perspectives — and report
          if at least one dimension is material:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl border-2 border-green-300 bg-green-50/40 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-green-700">
                Inside-Out
              </div>
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Impact Materiality
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              What <strong>actual or potential impacts</strong> does the company&apos;s
              business activity have on the environment and society? Both positive and negative
              impacts are considered — in the short, medium, and long term.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-blue-300 bg-blue-50/40 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-blue-700">
                Outside-In
              </div>
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Financial Materiality
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              What <strong>financial risks and opportunities</strong> arise for the
              company from sustainability aspects? For example: costs from
              carbon pricing, revenue opportunities from sustainable products, or
              reputational risks from environmental scandals.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-green-50/60 border border-green-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-green-700 mb-1">
                Assess Both Dimensions
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                A sustainability aspect is reportable if it is deemed material under <strong>at least
                one</strong> of the two dimensions. Even if a topic appears financially immaterial,
                it may still be reportable due to its impact on the environment or society — and
                vice versa. The materiality assessment must be documented and reviewed by the
                auditor.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 7. REPORTING OBLIGATIONS ═══════════════════ */}
      <Section id="berichtspflichten" title="Reporting Obligations & Format">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The CSRD sets high requirements for the format, content, and integration of the
          sustainability report into existing corporate reporting:
        </p>

        <AccordionSection
          accent="#16a34a"
          items={[
            {
              title: "Integration into the Management Report",
              content: (
                <p>
                  The sustainability report is integrated as a dedicated section within the
                  management report — not as a separate document.
                  This underscores the equal standing of financial and sustainability
                  information and ensures that the report is subject to the same publication
                  and audit obligations as the annual financial statements.
                </p>
              ),
            },
            {
              title: "Digital Format: XHTML and iXBRL Tagging",
              content: (
                <div>
                  <p className="mb-3">
                    The management report must be prepared in ESEF-compliant XHTML format.
                    Sustainability information must be digitally tagged (iXBRL —
                    Inline eXtensible Business Reporting Language) to be machine-readable
                    and automatically processable.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>ESEF Regulation (Single Electronic Reporting Format)</li>
                    <li>iXBRL tags for all quantitative and selected qualitative disclosures</li>
                    <li>Enables automated comparability across companies and years</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Quantitative and Qualitative Disclosures",
              content: (
                <div>
                  <p className="mb-3">
                    The ESRS require a mix of numerical key performance indicators (KPIs),
                    narrative descriptions, and strategic targets:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>Metrics:</strong> GHG emissions (Scope 1-3), energy consumption, water withdrawal, gender pay gap, etc.</li>
                    <li><strong>Policies:</strong> Documented policies for each material topic</li>
                    <li><strong>Targets:</strong> Measurable goals with timeframes and base years</li>
                    <li><strong>Actions:</strong> Description of concrete measures and their progress</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Forward-Looking Information",
              content: (
                <p>
                  The CSRD requires not only retrospective data but also forward-looking
                  information: transition plans (particularly for climate targets), medium-
                  and long-term objectives, scenario analyses, and expected financial impacts
                  of sustainability risks and opportunities. For climate risks, alignment
                  with the Paris Agreement&apos;s 1.5-degree target is expected.
                </p>
              ),
            },
            {
              title: "Value Chain",
              content: (
                <p>
                  Reporting extends across the entire value chain — both upstream (suppliers,
                  raw materials) and downstream (customers, end-users). The Omnibus I proposal
                  envisages limiting this to the direct supply chain to reduce the data
                  collection effort. Until adopted, the full value chain scope applies.
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 8. EXTERNAL ASSURANCE ═══════════════════ */}
      <Section id="pruefung" title="External Assurance">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          One of the most significant innovations of the CSRD: the sustainability report must be
          <strong> externally assured</strong> — for the first time in the history of EU sustainability reporting.
        </p>

        <AccordionSection
          accent="#16a34a"
          items={[
            {
              title: "Limited Assurance (First Phase)",
              content: (
                <div>
                  <p className="mb-3">
                    In the first phase, an engagement providing <strong>limited assurance</strong> is
                    required. The assurance level corresponds roughly to a review — the
                    assurance provider states that no material misstatements have come to their
                    attention.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Less extensive than the audit of financial statements</li>
                    <li>Focus on plausibility, consistency, and completeness</li>
                    <li>Review of the materiality assessment and methodology applied</li>
                    <li>Negative conclusion: no material misstatements identified</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Reasonable Assurance (Planned for the Future)",
              content: (
                <p>
                  The CSRD provides that the EU Commission shall assess by 2028 whether a
                  transition to <strong>reasonable assurance</strong> is feasible and
                  appropriate. Reasonable assurance corresponds to the audit level of
                  financial statements and would require a positive opinion — significantly
                  more resource-intensive and costly than limited assurance. The Omnibus I
                  proposal makes this transition less likely for the time being.
                </p>
              ),
            },
            {
              title: "Who May Provide Assurance?",
              content: (
                <div>
                  <p className="mb-3">
                    In Austria, <strong>statutory auditors</strong> and audit firms are primarily
                    authorised to provide assurance on the sustainability report. Member states
                    may additionally accredit independent assurance service providers (IASPs).
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Assurance providers must possess sustainability expertise</li>
                    <li>Independence requirements analogous to the statutory audit</li>
                    <li>The same auditor may audit the financial statements and the sustainability report</li>
                    <li>Assurance of iXBRL tags and machine-readable preparation</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 9. PENALTIES ═══════════════════ */}
      <Section id="strafen" title="Fines & Penalties">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The CSRD itself does not define specific fine ceilings — this falls within the
          competence of the member states. In Austria, the NaBeG
          <SourceRef id={3} sources={sources} accent="#16a34a" /> provides for substantial sanctions:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <StatCard value="EUR 100,000" label="Maximum Fine (AT)" accent="#dc2626" />
          <StatCard value="2x" label="For Repeat Offences" accent="#ea580c" />
          <StatCard value="Personal" label="Director Liability" accent="#b91c1c" />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-red-200 bg-red-50/30 p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Fines Under the NaBeG
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              The NaBeG provides for fines of <strong>up to EUR 100,000</strong> for
              breaches of reporting obligations. For repeat offences, the fine may
              be doubled. Sanctioned violations include, in particular: failure to report
              or late reporting, material errors in the report, failure to comply
              with the assurance requirement, and missing or inadequate materiality assessments.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Civil Liability
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              In addition to administrative penalties, board members (management board,
              managing directors, supervisory board) may be held <strong>personally
              liable</strong> for damages arising from erroneous or omitted sustainability
              reporting. Liability derives from the general duty of care under{" "}
              <LawRef law="GmbHG" paragraph="25" /> and{" "}
              <LawRef law="AktG" paragraph="84" />.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Reputational Damage
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Beyond legal sanctions, significant reputational damage looms:
              investors, customers, and business partners increasingly expect transparent
              ESG reporting. A missing or deficient report can impede access to
              capital (ESG funds, green bonds) and public procurement contracts,
              and damage the employer brand.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 10. AUSTRIA ═══════════════════ */}
      <Section id="oesterreich" title="CSRD in Austria (NaBeG)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Austria transposes the CSRD into national law through the <strong>Sustainability
          Reporting Act (NaBeG)</strong><SourceRef id={3} sources={sources} accent="#16a34a" />.
          The Austrian Federal Economic Chamber (WKO)<SourceRef id={6} sources={sources} accent="#16a34a" /> provides
          accompanying practical guides for Austrian companies.
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}>
                <span className="text-white text-sm font-bold">AT</span>
              </div>
              <div>
                <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
                  NaBeG — National Transposition
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
                  The NaBeG incorporates CSRD requirements into Austrian corporate law
                  (UGB). It governs reporting obligations, assurance requirements, and
                  sanctions for Austrian companies. Application dates follow the CSRD
                  waves and will be adjusted to the final Omnibus I decision as necessary.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-green-50 text-green-700 font-mono border border-green-200">UGB Integration</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-green-50 text-green-700 font-mono border border-green-200">Assurance Obligation</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-green-50 text-green-700 font-mono border border-green-200">Sanctions Regime</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              WKO Support
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              The Austrian Federal Economic Chamber (WKO) offers comprehensive practical
              guides, webinars, and advisory services for CSRD implementation. Particularly
              for SMEs that are indirectly affected as part of the supply chain, there
              is specific guidance on voluntary reporting under the VSME standard.
            </p>
          </div>

          <div className="rounded-2xl bg-green-50/60 border border-green-200/50 p-5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-[Syne] font-bold text-sm text-green-700 mb-1">
                  Current Transposition Status
                </p>
                <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                  The Austrian transposition is closely linked to the progress of the
                  Omnibus I legislative process at EU level. The legislator has signalled
                  its intention to align national application dates with the final EU
                  regulation to avoid double transitions for companies. Wave 1 companies
                  (large PIEs &gt;500 employees) are already reporting under ESRS for the
                  financial year 2024.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 11. COMPLIANCE ROADMAP ═══════════════════ */}
      <Section id="fahrplan" title="Your Compliance Roadmap">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Five phases to a CSRD-compliant sustainability report. Regardless of the
          Omnibus I outcome, affected companies should begin preparations now —
          data collection and process development take time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <RoadmapStep
            phase="Phase 1 — Immediately"
            title="Gap Analysis & Applicability"
            accent="#16a34a"
            items={[
              "Clarify CSRD applicability (Wave 1, 2, or 3?)",
              "Monitor Omnibus I status and factor it into planning",
              "Analyse existing reporting for ESRS gaps",
              "Set up a project team (Finance, Sustainability, IT)",
            ]}
          />
          <RoadmapStep
            phase="Phase 2 — Months 1-3"
            title="Double Materiality Assessment"
            accent="#15803d"
            items={[
              "Conduct stakeholder mapping and engagement",
              "Assess impact materiality (inside-out)",
              "Assess financial materiality (outside-in)",
              "Identify and document material ESRS topics",
            ]}
          />
          <RoadmapStep
            phase="Phase 3 — Months 3-9"
            title="Data Collection & Systems"
            accent="#059669"
            items={[
              "Define data requirements per material ESRS topic",
              "Identify data sources (internal + supply chain)",
              "Select and implement an ESG data management system",
              "Collect baseline data and close data gaps",
            ]}
          />
          <RoadmapStep
            phase="Phase 4 — Months 9-12"
            title="Report Preparation"
            accent="#0d9488"
            items={[
              "Draft the ESRS-compliant report",
              "Prepare iXBRL tagging (ESEF compliance)",
              "Ensure integration into the management report",
              "Internal review by specialist departments",
            ]}
          />
          <RoadmapStep
            phase="Phase 5 — Ongoing"
            title="Assurance & Publication"
            accent="#0891b2"
            items={[
              "Engage an auditor for limited assurance",
              "Conduct the assurance process and resolve findings",
              "Publish the report (with the management report)",
              "Lessons learned and process optimisation for the following year",
            ]}
          />
        </div>

        <ToolRecommendation regulationKey="csrd" accent="#16a34a" />
      </Section>

      {/* ═══════════════════ 12. FAQ ═══════════════════ */}
      <Section id="faq" title="Frequently Asked Questions (FAQ)">
        <AccordionSection
          accent="#16a34a"
          allowMultiple
          items={[
            {
              title: "Does our company have to report under the CSRD already?",
              content: (
                <p>
                  That depends on your wave classification. <strong>Wave 1</strong> (large PIEs
                  with &gt;500 employees that were already subject to the NFRD) has been reporting
                  since the financial year 2024. <strong>Wave 2</strong> (all large companies) is
                  formally due from the financial year 2025, but the Omnibus I proposal envisages
                  a deferral to 2027. Check your applicability against both the current and
                  proposed thresholds.
                </p>
              ),
            },
            {
              title: "What does Omnibus I mean in practice for our company?",
              content: (
                <div>
                  <p className="mb-3">
                    If the Omnibus I proposal is adopted in its current form:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Companies with fewer than 1,000 employees or below EUR 450M revenue fall out of scope</li>
                    <li>Wave 2 and Wave 3 are each deferred by two years</li>
                    <li>Voluntary reporting under the simplified VSME standard remains possible</li>
                    <li>Fewer data points and simplified taxonomy disclosures</li>
                  </ul>
                  <p className="mt-3 text-[13px] text-[#7a8db0]">
                    Note: The Omnibus has not yet been adopted. Companies should closely
                    monitor developments and plan flexibly.
                  </p>
                </div>
              ),
            },
            {
              title: "Do we need an auditor for the sustainability report?",
              content: (
                <p>
                  Yes. The CSRD requires external assurance of the sustainability report.
                  In the first phase, limited assurance is required — a lower level of
                  assurance than for the financial statements, but still an independent
                  review by an authorised auditor. The same auditor who audits the
                  financial statements may also provide assurance on the sustainability
                  report.
                </p>
              ),
            },
            {
              title: "What is the difference between the CSRD and the EU Taxonomy?",
              content: (
                <p>
                  The CSRD governs <strong>what</strong> and <strong>how</strong> companies
                  must report on sustainability (the reporting framework). The
                  EU Taxonomy is a <strong>classification system</strong> that defines
                  which economic activities qualify as environmentally sustainable. Both are
                  interlinked: as part of CSRD reporting, companies must also disclose
                  taxonomy KPIs (revenue, CapEx, and OpEx from taxonomy-aligned
                  activities).
                </p>
              ),
            },
            {
              title: "What data do we need to collect from our supply chain?",
              content: (
                <div>
                  <p className="mb-3">
                    The ESRS require information across the entire value chain:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Scope 3 GHG emissions (indirect emissions from the supply chain)</li>
                    <li>Working conditions at suppliers (ESRS S2)</li>
                    <li>Human rights due diligence obligations</li>
                    <li>Environmental impacts of upstream activities</li>
                  </ul>
                  <p className="mt-3 text-[13px] text-[#7a8db0]">
                    The Omnibus I proposal envisages limiting this to the direct supply chain
                    (Tier 1). Where primary data is not available, sector-specific averages
                    and estimates may be used.
                  </p>
                </div>
              ),
            },
            {
              title: "Can SMEs report voluntarily?",
              content: (
                <p>
                  Yes. EFRAG has developed a dedicated simplified standard for voluntary
                  reporters (VSME — Voluntary Standard for SMEs). This covers significantly
                  fewer data points than the full ESRS and is specifically tailored to the
                  resources of smaller companies. Voluntary reporting can be strategically
                  advantageous to meet requirements from banks, investors, and large
                  customers in the supply chain.
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ RELATED REGULATIONS ═══════════════════ */}
      <RelatedGuides currentGuide="csrd-esg" accent="#047857" />

      {/* ═══════════════════ SOURCES ═══════════════════ */}
      <Section id="quellen" title="Sources & Official Documents">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          All information in this guide is based on official EU and Austrian documents.
          Here you will find the primary sources:
        </p>

        <SourceList sources={sources} accent="#16a34a" />

        <div className="mt-6 rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Disclaimer:</strong> This guide is provided for
            informational purposes and does not constitute legal advice. The linked documents
            are the official legal texts. For questions regarding the specific application to
            your company, we recommend consulting specialised lawyers, auditors, or
            sustainability advisors. The Omnibus I process was not yet concluded at the time
            of the last update (February 2026).
          </p>
        </div>
      </Section>
    </GuidePageLayout>
  );
}
