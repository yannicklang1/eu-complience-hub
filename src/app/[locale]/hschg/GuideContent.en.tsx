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
    title: "Directive (EU) 2019/1937 — Whistleblower Directive (Full Text)",
    url: "https://eur-lex.europa.eu/eli/dir/2019/1937/oj/deu",
    desc: "Official text of the EU Whistleblower Directive on the EUR-Lex portal",
    type: "Directive",
  },
  {
    id: 2,
    title: "HSchG — Whistleblower Protection Act (RIS)",
    url: "https://www.ris.bka.gv.at/eli/bgbl/I/2023/6",
    desc: "Austrian Whistleblower Protection Act in the Federal Legal Information System (BGBl. I 6/2023)",
    type: "Nat. Law",
  },
  {
    id: 3,
    title: "BMJ — HSchG Explanatory Notes",
    url: "https://www.bmj.gv.at",
    desc: "Federal Ministry of Justice — explanatory notes and materials on the HSchG",
    type: "Guidance",
  },
  {
    id: 4,
    title: "EU Commission — Whistleblower Protection Report",
    url: "https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives/13713-Whistleblower-protection-report-on-the-implementation-of-the-EU-Directive_en",
    desc: "European Commission — report on the implementation of the Whistleblower Directive across Member States",
    type: "Report",
  },
  {
    id: 5,
    title: "BAK — Federal Bureau of Anti-Corruption",
    url: "https://www.bak.gv.at",
    desc: "External reporting channel for whistleblower reports under the HSchG in Austria",
    type: "Authority AT",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Overview" },
  { id: "eu-vs-hschg", label: "EU Directive vs. HSchG" },
  { id: "timeline", label: "Timeline" },
  { id: "betroffene", label: "Who Is Affected?" },
  { id: "meldekanal", label: "Internal Reporting Channel" },
  { id: "schutz", label: "Whistleblower Protection" },
  { id: "meldeverfahren", label: "Reporting Procedure" },
  { id: "externe-stellen", label: "External Reporting Bodies" },
  { id: "strafen", label: "Penalties" },
  { id: "oesterreich", label: "Austria" },
  { id: "fahrplan", label: "Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Penalty", value: "\u20AC20,000 (\u20AC40,000 repeat)" },
  { label: "In Force Since", value: "25 Feb 2023" },
  { label: "Applies To", value: "Companies with 50+ employees" },
  { label: "Affected (AT)", value: "~6,000\u20138,000" },
  { label: "Reporting Channel", value: "Internal mandatory" },
  { label: "Legal Basis", value: "Directive (EU) 2019/1937" },
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
  accent = "#d97706",
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
          done ? "bg-amber-600 border-amber-600" : active ? "bg-amber-600 border-amber-600 animate-pulse" : "bg-white border-[#d8dff0]"
        }`} />
        <div className="w-px flex-1 bg-[#e8ecf4] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] font-semibold text-[#7a8db0]">{date}</span>
          {done && <span className="text-[9px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-mono font-bold border border-amber-200">Done</span>}
          {active && <span className="text-[9px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-mono font-bold border border-amber-200">Active</span>}
        </div>
        <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">{title}</div>
        <p className="text-[14px] text-[#5a6a8a] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ─────────────────── Roadmap step ─────────────────── */
function RoadmapStep({
  phase, title, items, accent = "#d97706",
}: { phase: string; title: string; items: string[]; accent?: string }) {
  return (
    <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full" style={{ background: accent }} />
      <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: accent }}>{phase}</div>
      <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
      title="HSchG"
      subtitle="The Whistleblower Protection Act fully explained: EU Whistleblower Directive, internal reporting channels, protection rights for whistleblowers, and a compliance roadmap for Austrian companies with 50 or more employees."
      regulationKey="Directive (EU) 2019/1937"
      accent="#d97706"
      badgeLabel="In force since Feb 2023"
      badgeColor="#b45309"
      quickFacts={quickFacts}
      tocItems={tocItems}
      trustBadge={{ lastReview: "19.02.2026", sourceCount: 5 }}
      heroIcon={
        <svg className="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
        </svg>
      }
      href="/hschg"
    >
      {/* ═══════════════════ 1. OVERVIEW ═══════════════════ */}
      <Section id="ueberblick" title="Overview: What Is the HSchG?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The <strong>HinweisgeberInnenschutzgesetz (HSchG)</strong><SourceRef id={2} sources={sources} accent="#d97706" /> is
          Austria&apos;s national transposition of the <strong>EU Whistleblower Directive</strong>{" "}
          (Directive (EU) 2019/1937).<SourceRef id={1} sources={sources} accent="#d97706" /> It protects individuals who
          report breaches of certain legal provisions within their professional environment from
          retaliation such as dismissal, reassignment, or harassment.
        </p>
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Companies with <strong>50 or more employees</strong> are required to establish an
          internal reporting channel through which employees can confidentially report
          misconduct. The objective is to uncover corruption, fraud, and other legal violations
          at an early stage while effectively protecting the reporting persons.
          An estimated <strong>6,000 to 8,000 companies</strong> in Austria are affected.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard value="Feb 2023" label="In Force" accent="#b45309" />
          <StatCard value="50+ Emp." label="Threshold" accent="#d97706" />
          <StatCard value="~6,000" label="AT Companies" />
          <StatCard value="3 Mo." label="Feedback" accent="#d97706" />
        </div>

        <div className="rounded-2xl bg-amber-50/60 border border-amber-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-amber-700 mb-1">
                Why Whistleblower Protection Matters
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                Studies by the European Commission show that approximately 43% of all fraud and
                corruption cases are uncovered by internal whistleblowers.<SourceRef id={4} sources={sources} accent="#d97706" /> Without
                effective protection, many reports are never filed due to fear of professional
                consequences. The HSchG aims to strengthen willingness to report while ensuring
                that companies learn about internal misconduct at an early stage.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 2. EU DIRECTIVE VS. HSCHG ═══════════════════ */}
      <Section id="eu-vs-hschg" title="EU Directive vs. HSchG">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          <strong>Directive (EU) 2019/1937</strong><SourceRef id={1} sources={sources} accent="#d97706" /> sets the
          European framework. The <strong>HSchG</strong> (BGBl. I 6/2023) is Austria&apos;s
          national transposition — with notable deviations. Most significantly,
          Austria was late: the EU deadline expired in December 2021,
          but the HSchG did not enter into force until February 2023.
        </p>

        <AccordionSection
          accent="#d97706"
          items={[
            {
              title: "Material Scope: AT Narrower Than EU",
              content: (
                <div>
                  <p className="mb-3">
                    The EU Directive protects reports on breaches of Union law across
                    the areas listed in Article 2. The HSchG is narrower in several respects:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>EU Directive:</strong> Expressly encourages Member States to extend protection beyond the EU catalogue to national law</li>
                    <li><strong>HSchG:</strong> Primarily covers breaches of EU law in the specified areas, but adds certain Austrian criminal offences (particularly corruption offences under the Criminal Code)</li>
                    <li>Purely domestic legal violations without an EU nexus are generally not covered by the HSchG — a widely criticised limitation</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Anonymous Reports: No Obligation Under the HSchG",
              content: (
                <p>
                  The EU Directive leaves it to Member States to decide whether anonymous reports
                  must be mandatorily accepted. The HSchG does <strong>not</strong> oblige companies
                  to accept anonymous tips. In practice, however, it is strongly recommended
                  to provide anonymous channels, as this demonstrably increases willingness to report.
                  If an anonymous report is received, it must nevertheless be processed provided the
                  information is substantiated.
                </p>
              ),
            },
            {
              title: "Group-Wide Reporting Systems: Austrian Specificity",
              content: (
                <p>
                  The HSchG expressly allows corporate groups to operate a <strong>centralised reporting
                  system</strong> for the entire group — including subsidiaries with 50 to 249
                  employees. The European Commission takes a critical view of this practice and
                  generally prefers separate channels per company. Austria deliberately opted for
                  this practical solution.
                </p>
              ),
            },
            {
              title: "Late Transposition and Infringement Proceedings",
              content: (
                <p>
                  The transposition deadline of the EU Directive expired on <strong>17 December 2021</strong>.
                  Austria significantly exceeded this deadline — the HSchG was published in the
                  Federal Law Gazette on 24 February 2023 and entered into force on
                  <strong> 25 February 2023</strong>. The European Commission had already initiated
                  infringement proceedings against Austria.<SourceRef id={4} sources={sources} accent="#d97706" /> Austria
                  was among the last Member States to transpose the Directive.
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 3. TIMELINE ═══════════════════ */}
      <Section id="timeline" title="Timeline & Status">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          From the EU Directive to full applicability in Austria — including the
          delayed national transposition:
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8">
          <TimelineItem
            date="16 December 2019"
            title="EU Whistleblower Directive Enters Into Force"
            description={<>Directive (EU) 2019/1937 enters into force. Member States have two years to transpose it into national law.<SourceRef id={1} sources={sources} accent="#d97706" /></>}
            done
          />
          <TimelineItem
            date="17 December 2021"
            title="Transposition Deadline Expired — AT Missed It!"
            description="The two-year transposition deadline expires. Austria has not yet adopted a law. The European Commission initiates infringement proceedings."
            done
          />
          <TimelineItem
            date="25 February 2023"
            title="HSchG Enters Into Force — 250+ Employees"
            description={<>The Whistleblower Protection Act (BGBl. I 6/2023) enters into force. Companies with 250 or more employees must immediately establish an internal reporting channel.<SourceRef id={2} sources={sources} accent="#d97706" /></>}
            done
          />
          <TimelineItem
            date="18 December 2023"
            title="HSchG Applies to All 50+ Employees"
            description="From this date, companies with 50 to 249 employees must also have established an internal reporting channel. The transitional period for smaller companies has expired."
            active
          />
        </div>

        <div className="rounded-2xl bg-red-50/60 border border-red-200/50 p-5 mt-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-red-700 mb-1">
                Austria Was Over a Year Late
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                The EU transposition deadline expired in December 2021. Austria was among the
                Member States against which the European Commission initiated infringement
                proceedings. The HSchG entered into force more than 14 months after the deadline —
                significantly later than Germany (June 2023), but one of the first laws adopted
                after the deadline was missed.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 4. WHO IS AFFECTED? ═══════════════════ */}
      <Section id="betroffene" title="Who Is Affected?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The HSchG affects companies and organisations depending on their size and
          sector. The reportable areas are predominantly derived from EU law, supplemented
          by certain Austrian criminal offences.
        </p>

        <AccordionSection
          accent="#d97706"
          items={[
            {
              title: "Private Sector: Companies With 50+ Employees",
              content: (
                <div>
                  <p className="mb-3">
                    All private companies with at least 50 employees must establish an
                    internal reporting channel. The employee count is calculated as an
                    annual average.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>250+ employees:</strong> Obligation since 25 February 2023</li>
                    <li><strong>50-249 employees:</strong> Obligation since 18 December 2023</li>
                    <li>Companies with 50-249 employees may use a shared (group-wide) reporting channel</li>
                    <li>Below 50 employees: generally not obligated (exception: financial sector)</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Financial Sector: Always Affected — Regardless of Size",
              content: (
                <div>
                  <p className="mb-3">
                    Companies in the financial sector are subject to the HSchG <strong>regardless
                    of the number of employees</strong>. This includes in particular:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Credit institutions and investment firms</li>
                    <li>Insurance and reinsurance undertakings</li>
                    <li>Payment institutions and electronic money institutions</li>
                    <li>Asset management companies and AIFMs</li>
                    <li>Others as listed in the Annex to Directive (EU) 2019/1937</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Public Sector",
              content: (
                <div>
                  <p className="mb-3">
                    The public sector is also subject to the HSchG:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Territorial authorities (federal, state, municipalities with 10,000+ inhabitants)</li>
                    <li>Legal entities under public law</li>
                    <li>Bodies controlled by public authorities</li>
                    <li>Municipalities with fewer than 10,000 inhabitants are exempt from the obligation</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Material Scope: Which Breaches Are Protected?",
              content: (
                <div>
                  <p className="mb-3">
                    The HSchG protects reports on breaches in the following areas:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Public procurement</li>
                    <li>Financial services and anti-money laundering</li>
                    <li>Product safety and product conformity</li>
                    <li>Transport safety (road, rail, air, maritime)</li>
                    <li>Environmental protection (emissions, chemicals, waste)</li>
                    <li>Food and feed safety, animal health</li>
                    <li>Radiation protection and nuclear safety</li>
                    <li>Public health (pharmaceuticals, medical devices)</li>
                    <li>Consumer protection</li>
                    <li>Data protection and privacy (<LawRef law="DSGVO">GDPR</LawRef>)</li>
                    <li>Network and information security</li>
                    <li>Certain national criminal offences (particularly corruption offences under the Criminal Code)</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 5. INTERNAL REPORTING CHANNEL ═══════════════════ */}
      <Section id="meldekanal" title="Internal Reporting Channels: Requirements">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Establishing an internal reporting channel is the central obligation under the HSchG.
          The requirements are set out in detail in the law:<SourceRef id={2} sources={sources} accent="#d97706" />
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.23, 1, 0.32, 1] as const, duration: 0.5 }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">Written & Oral</h3>
            <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
              The reporting channel must enable both <strong>written</strong> and <strong>oral</strong>{" "}
              reports. At the whistleblower&apos;s request, an in-person meeting must also be
              offered within a reasonable timeframe.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.23, 1, 0.32, 1] as const, duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">Confidentiality</h3>
            <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
              The identity of the whistleblower must be treated as <strong>strictly confidential</strong>.
              Only the unit responsible for processing the report may know the identity.
              A breach of the confidentiality obligation is punishable (up to EUR 20,000).
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.23, 1, 0.32, 1] as const, duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">Designated Unit</h3>
            <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
              The company must designate a <strong>responsible unit</strong> (internal reporting office)
              that receives reports, reviews them, and initiates follow-up measures.
              This can be an individual, a department, or an external service provider.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.23, 1, 0.32, 1] as const, duration: 0.5, delay: 0.3 }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
              </svg>
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">Group & Outsourcing</h3>
            <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
              Companies with 50-249 employees may use a <strong>shared group-wide
              reporting channel</strong>. The tasks of the internal reporting office can be
              outsourced to an <strong>external third party</strong> (e.g. law firm, compliance service provider).
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════ 6. WHISTLEBLOWER PROTECTION ═══════════════════ */}
      <Section id="schutz" title="Protection for Whistleblowers">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The core of the HSchG: comprehensive protection rights for persons who report
          breaches. The protection extends not only to the whistleblowers themselves but also
          to their supporters and persons of trust.
        </p>

        <div className="space-y-4 mb-6">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Prohibition of Retaliation
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
              Any form of retaliation against whistleblowers is prohibited. This includes, among others:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Dismissal and termination",
                "Suspension and demotion",
                "Transfer and change of duties",
                "Salary reduction and withdrawal of benefits",
                "Intimidation and harassment",
                "Damage to reputation and discrimination",
                "Non-conversion of fixed-term contracts",
                "Withdrawal of licences or permits",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Reversal of Burden of Proof
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              If a whistleblower suffers a detriment after making a report, it is presumed
              that this detriment constitutes a retaliatory measure. The <strong>employer</strong> must
              prove that the measure was <strong>not</strong> connected to the report.
              This reversal of the burden of proof is one of the strongest protective mechanisms
              of the law and enables whistleblowers to seek injunctive relief and claim damages.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Protected Persons
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
              The protection of the HSchG extends to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px] text-[#5a6a8a]">
              <li>Employees (including former employees and job applicants)</li>
              <li>Self-employed persons and freelancers</li>
              <li>Shareholders and board members (executive and supervisory boards)</li>
              <li>Trainees and volunteers</li>
              <li><strong>Facilitators</strong> — persons who assist the whistleblower in making the report</li>
              <li><strong>Connected persons</strong> — colleagues and relatives who could be disadvantaged because of the report</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl bg-amber-50/60 border border-amber-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-amber-700 mb-1">
                Prerequisite: Reasonable Grounds to Believe
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                Protection only applies if the whistleblower had
                <strong> reasonable grounds to believe</strong> at the time of reporting that the
                reported information was true. Anyone who <strong>knowingly makes false statements</strong>{" "}
                is not protected and risks administrative fines of up to EUR 20,000
                as well as civil damages claims.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 7. REPORTING PROCEDURE ═══════════════════ */}
      <Section id="meldeverfahren" title="Reporting Procedure in Detail">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The HSchG defines a clearly structured reporting procedure with binding
          deadlines. It also establishes a <strong>three-tier system</strong>:
          internal, external, and as a last resort, public disclosure.
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8 space-y-4 mb-6">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 text-lg font-bold text-amber-700">1</div>
            <div className="pb-4 border-b border-[#e8ecf4]">
              <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-amber-600 mb-1">Report Received</div>
              <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">Acknowledgement of Receipt Within 7 Days</div>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                The internal reporting office must confirm receipt of the report to the
                whistleblower within <strong>7 calendar days</strong>.
                For anonymous reports submitted via a platform, the confirmation is provided through the system.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 text-lg font-bold text-amber-700">2</div>
            <div className="pb-4 border-b border-[#e8ecf4]">
              <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-amber-600 mb-1">Review & Follow-Up</div>
              <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">Diligent Investigation</div>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                The reporting office reviews the merits of the report and initiates appropriate
                follow-up measures — such as an internal investigation, initiation of disciplinary
                proceedings, or referral to the competent authorities.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 text-lg font-bold text-amber-700">3</div>
            <div>
              <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-amber-600 mb-1">Within 3 Months</div>
              <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">Feedback to Whistleblower</div>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                No later than <strong>3 months</strong> after the acknowledgement of receipt, the
                whistleblower must be provided with feedback on the follow-up measures taken or
                planned. This includes the status of the investigation and preliminary findings.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
          <h3 className="font-[Syne] font-bold text-sm text-[#060c1a] mb-4">
            Three-Tier Reporting System
          </h3>
          <div className="space-y-3">
            {[
              { stufe: "Tier 1", name: "Internal Report", desc: "Preferred route: report through the company's internal reporting channel. The HSchG designates the internal channel as the primary reporting option." },
              { stufe: "Tier 2", name: "External Report", desc: "Report to an external reporting body (e.g. BAK). Permissible if the internal channel is missing, not functioning, retaliation is feared, or evidence could be destroyed." },
              { stufe: "Tier 3", name: "Disclosure (Public)", desc: "Report to the media or the public. Only as a last resort, if the external reporting body has not responded or there is an imminent threat to the public interest." },
            ].map((item) => (
              <div key={item.stufe} className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-3 border-b border-[#e8ecf4] last:border-b-0">
                <span className="text-[12px] text-amber-700 font-mono font-bold sm:w-20 flex-shrink-0">{item.stufe}</span>
                <div>
                  <span className="font-[Syne] font-bold text-[13px] text-[#060c1a]">{item.name}</span>
                  <p className="text-[13px] text-[#5a6a8a] leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 8. EXTERNAL REPORTING BODIES ═══════════════════ */}
      <Section id="externe-stellen" title="External Reporting Bodies in Austria">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          In addition to the internal reporting channel, whistleblowers may also report
          directly to external reporting bodies. In Austria, the <strong>Federal Bureau
          of Anti-Corruption (BAK)</strong> is the central external point of contact.<SourceRef id={5} sources={sources} accent="#d97706" />
        </p>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border-2 border-amber-300 bg-amber-50/30 p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #d97706, #b45309)" }}>
                <span className="text-white text-sm font-bold">BAK</span>
              </div>
              <div>
                <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
                  Federal Bureau of Anti-Corruption (BAK)
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
                  The BAK is the central external reporting body under the HSchG. It receives
                  reports in all areas covered by the HSchG, unless a specific sectoral
                  competence applies. The BAK is subordinate to the Federal Ministry of the
                  Interior and has investigative powers.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-mono border border-amber-200">Central Reporting Body</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-mono border border-amber-200">Anti-Corruption</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-mono border border-amber-200">Under BMI</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Other Competent Bodies (By Subject Area)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { stelle: "FMA", bereich: "Financial Market Authority — financial services, money laundering" },
                { stelle: "DSB", bereich: "Data Protection Authority — data protection and privacy (GDPR)" },
                { stelle: "BWB", bereich: "Federal Competition Authority — competition law, cartels" },
                { stelle: "BASG", bereich: "Federal Office for Safety in Health Care — pharmaceuticals" },
              ].map((item) => (
                <div key={item.stelle} className="flex items-start gap-3 p-3 rounded-xl bg-[#f8f9fd]">
                  <span className="font-mono text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex-shrink-0">{item.stelle}</span>
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item.bereich}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
            <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
              <strong className="text-[#060c1a]">When to report directly externally?</strong> A
              direct external report is permissible if: (1) no internal reporting channel exists,
              (2) the internal channel is not functioning properly, (3) there is a justified fear of
              retaliation, or (4) there is a risk of evidence being destroyed.
              The whistleblower is not obliged to report internally first.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 9. PENALTIES ═══════════════════ */}
      <Section id="strafen" title="Penalties & Sanctions">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The HSchG provides for administrative fines for various breaches. Notably,
          however, there is a <strong>legislative gap</strong>: there is currently no direct
          administrative fine for the mere absence of an internal reporting channel.<SourceRef id={3} sources={sources} accent="#d97706" />
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard value="\u20AC20,000" label="Max. Per Offence" accent="#dc2626" />
          <StatCard value="\u20AC40,000" label="In Case of Repeat" accent="#dc2626" />
          <StatCard value="\u20AC0" label="Missing System (!)" accent="#7a8db0" />
          <StatCard value="Punishable" label="False Report" accent="#d97706" />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Punishable Acts Under the HSchG
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Obstructing or preventing reports",
                "Retaliatory measures against whistleblowers",
                "Breach of confidentiality obligation",
                "Knowingly filing false reports",
                "Intimidation of potential whistleblowers",
                "Vexatious (harassing) proceedings against reporters",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-amber-50/60 border border-amber-200/50 p-5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <p className="font-[Syne] font-bold text-sm text-amber-700 mb-1">
                  Legislative Gap: No Fine for Missing Reporting System
                </p>
                <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                  The HSchG currently provides for <strong>no direct administrative fine</strong> for
                  companies that fail to establish an internal reporting channel. This gap is
                  criticised by experts and the European Commission. Nevertheless: if no internal
                  channel exists, whistleblowers can report directly externally to the BAK — the
                  company loses the opportunity to address misconduct internally. In addition,
                  civil liability risks and significant reputational damage may arise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 10. AUSTRIA ═══════════════════ */}
      <Section id="oesterreich" title="HSchG in Austria: Key Features">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Austria&apos;s transposition of the Whistleblower Directive has several
          distinctive features that companies should be aware of:<SourceRef id={3} sources={sources} accent="#d97706" />
        </p>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #d97706, #b45309)" }}>
                <span className="text-white text-lg font-bold">AT</span>
              </div>
              <div>
                <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
                  Responsibilities and Supervision
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
                  The <strong>Federal Ministry of Justice (BMJ)</strong><SourceRef id={3} sources={sources} accent="#d97706" /> is
                  responsible for the legislation. The <strong>BAK</strong><SourceRef id={5} sources={sources} accent="#d97706" /> serves
                  as the central external reporting body. Depending on the subject area, other
                  authorities (FMA, DSB, BWB) may also serve as external reporting bodies.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-mono border border-amber-200">BMJ (Legislation)</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-mono border border-amber-200">BAK (Reporting Body)</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-mono border border-amber-200">FMA / DSB (Sectoral)</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="rounded-2xl bg-amber-50/60 border border-amber-200/50 p-5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-[Syne] font-bold text-sm text-amber-700 mb-1">
                  Austrian Specificities at a Glance
                </p>
                <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                  Austria has adopted a rather <strong>restrictive approach</strong>: the material
                  scope was not significantly extended beyond the EU minimum requirements.
                  Anonymous reports do not need to be mandatorily enabled — but they are
                  recommended. The lack of a penalty for failing to set up a reporting channel
                  is considered a weakness by experts. On the positive side, the inclusion of
                  certain national corruption offences and the express permission for
                  group-wide reporting systems are noteworthy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 11. COMPLIANCE ROADMAP ═══════════════════ */}
      <Section id="fahrplan" title="Your Compliance Roadmap">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          The HSchG already applies to all companies with 50 or more employees. If your company
          has not yet established an internal reporting channel, you should take action immediately.
          This roadmap will help you implement the requirements in a structured manner:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <RoadmapStep
            phase="Phase 1 — Immediately"
            title="Set Up Reporting Office"
            accent="#d97706"
            items={[
              "Assess HSchG applicability (employee threshold, sector)",
              "Designate the responsible internal unit (person/department)",
              "Alternatively: engage an external service provider",
              "Select technical infrastructure for the reporting channel",
            ]}
          />
          <RoadmapStep
            phase="Phase 2 — Month 1-2"
            title="Internal Policy & Process"
            accent="#b45309"
            items={[
              "Draft an internal whistleblower protection policy",
              "Document the reporting procedure (receipt, review, feedback)",
              "Establish confidentiality rules and data protection impact assessment",
              "Ensure compliance with deadlines (7-day acknowledgement, 3-month feedback)",
            ]}
          />
          <RoadmapStep
            phase="Phase 3 — Month 2-3"
            title="Train All Employees"
            accent="#92400e"
            items={[
              "Inform employees about the reporting channel and protection rights",
              "Train managers on the prohibition of retaliation",
              "Educate reporting office staff on procedure management",
              "Make informational materials available internally",
            ]}
          />
          <RoadmapStep
            phase="Phase 4 — Month 3-4"
            title="Test Run & Optimisation"
            accent="#78350f"
            items={[
              "Conduct a test report (verify functionality)",
              "Review deadlines and documentation",
              "Collect and evaluate feedback from the reporting office",
              "Refine the process as needed",
            ]}
          />
        </div>

        <RoadmapStep
          phase="Phase 5 — Ongoing"
          title="Ongoing Operations & Documentation"
          accent="#d97706"
          items={[
            "Conduct regular training sessions (at least annually)",
            "Maintain complete documentation of all reports and measures",
            "Review the reporting channel for currency and functionality",
            "Prepare an annual report for management",
            "Monitor legislative changes and case law developments",
          ]}
        />

        <div className="mt-6">
          <ToolRecommendation regulationKey="hschg" accent="#d97706" />
        </div>
      </Section>

      {/* ═══════════════════ 12. FAQ ═══════════════════ */}
      <Section id="faq" title="Frequently Asked Questions (FAQ)">
        <AccordionSection
          accent="#d97706"
          allowMultiple
          items={[
            {
              title: "Must anonymous reports be possible?",
              content: (
                <p>
                  <strong>No.</strong> The HSchG does not oblige companies to enable anonymous
                  reports. However, it is expressly recommended to provide anonymous channels,
                  as this demonstrably increases willingness to report. If an anonymous report
                  is nevertheless received, it must be processed provided the information is
                  substantiated. Many professional whistleblowing software solutions offer
                  anonymous and encrypted reporting options as standard.
                </p>
              ),
            },
            {
              title: "What happens if we have no reporting channel?",
              content: (
                <div>
                  <p className="mb-3">
                    Currently, the HSchG provides for <strong>no direct administrative fine</strong> for the
                    absence of an internal reporting channel. However, this does not mean it is risk-free:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Whistleblowers can report <strong>directly externally</strong> to the BAK — bypassing the company entirely</li>
                    <li>Retaliatory measures are punishable (up to EUR 20,000, EUR 40,000 for repeat offences)</li>
                    <li>Civil <strong>damages claims</strong> by whistleblowers are possible</li>
                    <li><strong>Reputational risk</strong>: the absence of a reporting channel is increasingly perceived as a compliance shortcoming</li>
                    <li>In <strong>public procurement</strong>, lacking compliance can be disadvantageous</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Can the reporting office be operated externally?",
              content: (
                <p>
                  <strong>Yes.</strong> The HSchG expressly allows the outsourcing of the internal
                  reporting office to an <strong>external third party</strong> — for example, a
                  law firm, a compliance service provider, or a specialised ombudsperson.
                  The responsibility for meeting legal obligations (deadlines, confidentiality,
                  follow-up measures) remains with the company. Especially for smaller companies
                  (50-249 employees), this is a practical and frequently chosen solution.
                </p>
              ),
            },
            {
              title: "Who is protected as a whistleblower?",
              content: (
                <div>
                  <p className="mb-3">
                    The protection is deliberately broad and extends beyond employees to include:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Former employees and job applicants</li>
                    <li>Self-employed persons and freelancers</li>
                    <li>Trainees and volunteers</li>
                    <li>Board members (executive and supervisory boards) and shareholders</li>
                    <li>Facilitators and connected persons (colleagues, relatives)</li>
                  </ul>
                  <p className="mt-3">
                    Prerequisite: the whistleblower had reasonable grounds to believe at the time of
                    reporting that the information was true.
                  </p>
                </div>
              ),
            },
            {
              title: "How does the HSchG relate to the GDPR?",
              content: (
                <p>
                  The processing of personal data within the reporting procedure must
                  comply with the <LawRef law="DSGVO">GDPR</LawRef>. Companies must, among other things,
                  carry out a data protection impact assessment (DPIA), determine a legal basis for the
                  processing (typically Art. 6(1)(c) GDPR — legal obligation), limit the
                  storage period, and consider the rights of data subjects. The identity of the
                  whistleblower may not be disclosed to the accused person without the
                  whistleblower&apos;s consent.
                </p>
              ),
            },
            {
              title: "Which reports are NOT protected under the HSchG?",
              content: (
                <div>
                  <p className="mb-3">
                    Not every report falls under the protection of the HSchG:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Purely employment-related complaints (e.g. salary disputes) without an EU law nexus</li>
                    <li>Breaches that do not fall within the material scope</li>
                    <li><strong>Knowingly false reports</strong> — punishable with fines up to EUR 20,000</li>
                    <li>Information attributable to national security or defence</li>
                    <li>Information subject to attorney-client privilege or medical confidentiality</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ RELATED REGULATIONS ═══════════════════ */}
      <RelatedGuides currentGuide="hschg" accent="#b45309" />

      {/* ═══════════════════ SOURCES ═══════════════════ */}
      <Section id="quellen" title="Sources & Official Documents">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          All information in this guide is based on the official legal texts
          and regulatory explanatory materials. Here are the primary sources:
        </p>

        <SourceList sources={sources} accent="#d97706" />

        <div className="mt-6 rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Disclaimer:</strong> This guide is for informational
            purposes only and does not constitute legal advice. The linked documents are the
            official legal texts. For questions about how the law specifically applies to your
            company, we recommend consulting specialised lawyers or compliance advisors.
          </p>
        </div>
      </Section>
    </GuidePageLayout>
  );
}
