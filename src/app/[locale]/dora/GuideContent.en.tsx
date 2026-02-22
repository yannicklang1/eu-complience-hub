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
    title: "Regulation (EU) 2022/2554 — DORA (Full Text)",
    url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj/deu",
    desc: "Official German version on the EUR-Lex portal",
    type: "Regulation",
  },
  {
    id: 2,
    title: "DORA — English Version",
    url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng",
    desc: "Official English version on the EUR-Lex portal",
    type: "Regulation",
  },
  {
    id: 3,
    title: "FMA — DORA Information Page",
    url: "https://www.fma.gv.at/querschnittsthemen/dora/",
    desc: "Austrian Financial Market Authority — Guidelines, circulars and FAQs on DORA",
    type: "Authority AT",
  },
  {
    id: 4,
    title: "EBA — DORA Regulatory Standards",
    url: "https://www.eba.europa.eu/activities/single-rulebook/regulatory-activities/information-and-communication-technology-risk",
    desc: "EBA: Regulatory technical standards and implementing technical standards for DORA",
    type: "Authority",
  },
  {
    id: 5,
    title: "OeNB — TIBER-AT",
    url: "https://www.oenb.at",
    desc: "Austrian National Bank — TIBER framework for penetration testing",
    type: "Authority AT",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "timeline", label: "Timeline & Deadlines" },
  { id: "who-is-affected", label: "Who Is Affected?" },
  { id: "pillars", label: "The 5 Pillars" },
  { id: "ict-risk", label: "ICT Risk Management" },
  { id: "incident", label: "Incident Reporting" },
  { id: "testing", label: "Resilience Testing" },
  { id: "third-party", label: "Third-Party Management" },
  { id: "penalties", label: "Penalties & Supervision" },
  { id: "austria", label: "Austria" },
  { id: "roadmap", label: "Compliance Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Applicable since", value: "17 January 2025" },
  { label: "Regulation type", value: "EU Regulation (direct)" },
  { label: "Affected sectors", value: "21 financial categories" },
  { label: "Supervisor (AT)", value: "FMA" },
  { label: "TLPT obligation", value: "Every 3 years" },
  { label: "Reporting duty", value: "4h / 72h / 1 month" },
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
  accent = "#10b981",
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
          done ? "bg-emerald-500 border-emerald-500" : active ? "bg-emerald-500 border-emerald-500 animate-pulse" : "bg-white border-[#d8dff0]"
        }`} />
        <div className="w-px flex-1 bg-[#e8ecf4] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] font-semibold text-[#7a8db0]">{date}</span>
          {done && <span className="text-[9px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-mono font-bold border border-emerald-200">Done</span>}
          {active && <span className="text-[9px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-mono font-bold border border-emerald-200">Active</span>}
        </div>
        <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">{title}</div>
        <p className="text-[14px] text-[#5a6a8a] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ─────────────────── Pillar card ─────────────────── */
function PillarCard({
  number, title, description, color, items,
}: { number: string; title: string; description: string; color: string; items: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border bg-white p-6 relative overflow-hidden"
      style={{ borderColor: `${color}30` }}
    >
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: color }} />
      <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color }}>
        Pillar {number}
      </div>
      <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">{title}</h3>
      <p className="text-[13px] text-[#7a8db0] leading-relaxed mb-4">{description}</p>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: color }} />
            <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────── Roadmap step ─────────────────── */
function RoadmapStep({
  phase, title, items, accent = "#10b981",
}: { phase: string; title: string; items: string[]; accent?: string }) {
  return (
    <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full" style={{ background: accent }} />
      <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: accent }}>{phase}</div>
      <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
      title="DORA"
      subtitle="The Digital Operational Resilience Act in detail: ICT risk management, incident reporting, resilience testing and third-party management for the European financial sector."
      regulationKey="Regulation (EU) 2022/2554"
      accent="#10b981"
      badgeLabel="Applicable since Jan 2025"
      badgeColor="#059669"
      quickFacts={quickFacts}
      tocItems={tocItems}
      trustBadge={{ lastReview: "18.02.2026", sourceCount: 5 }}
      heroIcon={
        <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      }
      href="/dora"
    >
      {/* ═══════════════════ 1. OVERVIEW ═══════════════════ */}
      <Section id="overview" title="Overview: What Is DORA?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The <strong>Digital Operational Resilience Act</strong> (Regulation (EU) 2022/2554)<SourceRef id={1} sources={sources} accent="#10b981" /> is
          the EU-wide regulatory framework for digital operational stability in the financial sector. As
          an EU Regulation, DORA applies <strong>directly in all Member States</strong> — without
          national transposition. Since <strong>17 January 2025</strong>, DORA has been fully
          applicable.
        </p>
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          DORA establishes a uniform framework for <strong>ICT risk management</strong>{" "}
          across the entire European financial sector. The objective: financial entities shall be able
          to withstand, respond to and recover from ICT-related disruptions and cyber attacks — without
          interrupting critical financial services.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard value="Jan 2025" label="Applicable since" accent="#059669" />
          <StatCard value="21" label="Financial categories" />
          <StatCard value="5" label="Core areas" accent="#10b981" />
          <StatCard value="4h" label="Initial report" accent="#dc2626" />
        </div>

        <div className="rounded-2xl bg-emerald-50/60 border border-emerald-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-emerald-700 mb-1">
                DORA vs. NIS2: Lex Specialis
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                DORA is the sector-specific law for the financial sector and takes precedence over <LawRef law="NIS2">NIS2</LawRef>.
                Financial entities that fall under DORA must comply with the DORA requirements —
                not the NIS2 requirements. DORA contains stricter or more specific obligations
                than NIS2 in many areas.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 2. TIMELINE ═══════════════════ */}
      <Section id="timeline" title="Timeline & Deadlines">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          DORA is already fully in force. The key milestones:
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8">
          <TimelineItem
            date="27 December 2022"
            title="DORA published in the Official Journal"
            description="Regulation (EU) 2022/2554 is published in the Official Journal of the European Union."
            done
          />
          <TimelineItem
            date="16 January 2023"
            title="DORA enters into force"
            description="20 days after publication, DORA enters into force. The 24-month implementation period begins."
            done
          />
          <TimelineItem
            date="2024"
            title="RTS & ITS published"
            description={<>The European Supervisory Authorities (ESAs: EBA, EIOPA, ESMA) publish regulatory technical standards (RTS) and implementing technical standards (ITS) with detailed requirements.<SourceRef id={4} sources={sources} accent="#10b981" /></>}
            done
          />
          <TimelineItem
            date="17 January 2025"
            title="DORA fully applicable"
            description="All DORA requirements apply from this date. Financial entities must have fully implemented the ICT risk management framework, reporting processes, testing programmes and third-party management."
            active
          />
          <TimelineItem
            date="2025–2028"
            title="TLPT implementation"
            description="Threat-led penetration tests (TLPT) must be conducted every 3 years. The supervisory authorities identify the obligated financial entities."
          />
        </div>
      </Section>

      {/* ═══════════════════ 3. WHO IS AFFECTED? ═══════════════════ */}
      <Section id="who-is-affected" title="Who Is Affected?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          DORA applies to virtually the <strong>entire regulated financial sector</strong> of the EU —
          from banks and insurance companies to crypto-asset service providers. In total, the
          regulation defines <strong>21 categories</strong> of financial entities.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {[
            { icon: "\u{1F3E6}", name: "Credit institutions", desc: "Banks, savings banks" },
            { icon: "\u{1F4CA}", name: "Investment firms", desc: "Brokers, investment banks" },
            { icon: "\u{1F3DB}\u{FE0F}", name: "Payment institutions", desc: "Payment service providers" },
            { icon: "\u{1F4B3}", name: "E-money institutions", desc: "E-money providers" },
            { icon: "\u{1F6E1}\u{FE0F}", name: "Insurance companies", desc: "Insurance and reinsurance undertakings" },
            { icon: "\u{1F4C8}", name: "Fund managers", desc: "UCITS, AIFMs, management companies" },
            { icon: "\u{1F517}", name: "Crypto-asset providers", desc: "Crypto-asset service providers (CASPs)" },
            { icon: "\u{2699}\u{FE0F}", name: "Market infrastructure", desc: "Exchanges, CCPs, CSDs, trading venues" },
            { icon: "\u{1F4CB}", name: "Rating agencies", desc: "Credit rating agencies" },
            { icon: "\u{1F50D}", name: "Auditors", desc: "Statutory auditors" },
            { icon: "\u{1F4D1}", name: "Crowdfunding", desc: "Crowdfunding service providers" },
            { icon: "\u{2601}\u{FE0F}", name: "ICT third-party providers", desc: "Critical ICT third-party service providers (Cloud, SaaS)" },
          ].map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-[#d8dff0] bg-white p-4 hover:border-emerald-200 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <div className="font-[Syne] font-bold text-[13px] text-[#060c1a]">{item.name}</div>
                  <div className="text-[11px] text-[#7a8db0]">{item.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-amber-50/60 border border-amber-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-amber-700 mb-1">
                Special: Critical ICT Third-Party Providers
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                DORA does not only affect financial entities themselves, but also their
                <strong> critical ICT third-party service providers</strong> (e.g. cloud providers,
                SaaS providers, data centres). These are directly supervised by the European
                Supervisory Authorities (ESAs) — a first in financial regulation.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 4. THE 5 PILLARS ═══════════════════ */}
      <Section id="pillars" title="The 5 Pillars of DORA">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          DORA is structured around five core areas. Each pillar contains specific
          requirements that financial entities must implement:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <PillarCard
            number="I"
            title="ICT Risk Management"
            description="Comprehensive framework for the identification, management and monitoring of ICT risks."
            color="#10b981"
            items={[
              "ICT risk management framework",
              "Governance & responsibilities",
              "Identification & classification",
              "Protection & prevention",
              "Detection & response",
              "Recovery & lessons learned",
            ]}
          />
          <PillarCard
            number="II"
            title="Incident Management"
            description="Classification, reporting and management of ICT-related incidents."
            color="#059669"
            items={[
              "Incident classification",
              "Tiered reporting obligations",
              "4h initial report (major incidents)",
              "Voluntary cyber threat reports",
            ]}
          />
          <PillarCard
            number="III"
            title="Resilience Testing"
            description="Regular testing of digital operational resilience."
            color="#0d9488"
            items={[
              "Annual basic tests",
              "TLPT every 3 years (for systemically important entities)",
              "Vulnerability scans",
              "Scenario-based tests",
            ]}
          />
          <PillarCard
            number="IV"
            title="Third-Party Risk"
            description="Management of risks arising from ICT third-party relationships."
            color="#0891b2"
            items={[
              "Minimum contractual requirements",
              "Third-party register",
              "Exit strategies",
              "Assess concentration risks",
            ]}
          />
          <PillarCard
            number="V"
            title="Information Sharing"
            description="Voluntary exchange of cyber threat intelligence."
            color="#0284c7"
            items={[
              "Threat intelligence sharing",
              "Trusted communities",
              "Anonymised incident data",
              "Best practice exchange",
            ]}
          />
        </div>
      </Section>

      {/* ═══════════════════ 5. ICT RISK MANAGEMENT ═══════════════════ */}
      <Section id="ict-risk" title="ICT Risk Management (Pillar I)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The ICT risk management framework is the centrepiece of DORA. It must be approved
          and overseen by the <strong>management body</strong> — similar to <LawRef law="NIS2">NIS2</LawRef>,{" "}
          management bears personal responsibility.
        </p>

        <AccordionSection
          accent="#10b981"
          items={[
            {
              title: "Governance & Organisation",
              content: (
                <div>
                  <p className="mb-3">
                    The management body bears ultimate responsibility for ICT risk management.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Define, approve and oversee the ICT risk management framework</li>
                    <li>Allocate sufficient budget for ICT security</li>
                    <li>Establish an ICT risk management function with adequate authority</li>
                    <li>Regular training of the management body on ICT risks</li>
                    <li>Review the ICT risk strategy at least annually</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Identification & Classification",
              content: (
                <div>
                  <p className="mb-3">
                    Complete identification and classification of all ICT assets and dependencies.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Inventory of all ICT assets, systems and interfaces</li>
                    <li>Mapping of dependencies between systems and business processes</li>
                    <li>Identification of all ICT third-party providers and their criticality</li>
                    <li>Regular updates (at least annually)</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Protection & Prevention",
              content: (
                <div>
                  <p className="mb-3">
                    Technical and organisational measures to minimise risk.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Network security, access controls, encryption</li>
                    <li>Patch management and vulnerability management</li>
                    <li>Identity & Access Management (IAM)</li>
                    <li>Physical security of ICT infrastructure</li>
                    <li>Security awareness training for all staff</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Detection & Response",
              content: (
                <div>
                  <p className="mb-3">
                    Capabilities for rapid detection of and response to anomalies and attacks.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Continuous monitoring of all critical systems</li>
                    <li>Anomaly detection and threat detection</li>
                    <li>Security Operations Centre (SOC) or equivalent function</li>
                    <li>Defined incident response processes with clear escalation paths</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Recovery & Lessons Learned",
              content: (
                <div>
                  <p className="mb-3">
                    Ability to recover quickly and systematically learn from incidents.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Business continuity plans for all critical functions</li>
                    <li>Disaster recovery with defined RTO and RPO</li>
                    <li>Regular testing of backup and recovery processes</li>
                    <li>Post-incident reviews with documented lessons learned</li>
                    <li>Communication plans for internal and external stakeholders</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 6. INCIDENT REPORTING ═══════════════════ */}
      <Section id="incident" title="Incident Reporting (Pillar II)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          DORA defines a strict reporting regime for <strong>major ICT-related
          incidents</strong>. Classification is based on criteria such as affected clients,
          duration, geographical spread, data loss and economic impact.
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8 space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 text-xl">{"\u{1F6A8}"}</div>
            <div className="pb-4 border-b border-[#e8ecf4]">
              <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-red-600 mb-1">Within 4 hours</div>
              <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">Initial Notification</div>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                First notification to the competent authority about the major incident.
                Must be submitted as soon as the incident is classified as &quot;major&quot;.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 text-xl">{"\u{1F4DD}"}</div>
            <div className="pb-4 border-b border-[#e8ecf4]">
              <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-orange-600 mb-1">Within 72 hours</div>
              <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">Intermediate Report</div>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                Update with information on severity, impact, root cause
                (where known) and countermeasures taken.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 text-xl">{"\u{1F4CB}"}</div>
            <div>
              <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-emerald-600 mb-1">Within 1 month</div>
              <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">Final Report</div>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                Comprehensive final report with root cause analysis, actual
                impact, measures taken and lessons learned.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5 mt-6">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">DORA vs. NIS2 Reporting Obligations:</strong> DORA
            requires the initial notification within <strong>4 hours</strong> (<LawRef law="NIS2">NIS2</LawRef>: 24 hours).
            The classification criteria are specifically tailored to the financial sector.
            In addition, DORA provides for the voluntary reporting of cyber threats (not just incidents).
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 7. RESILIENCE TESTING ═══════════════════ */}
      <Section id="testing" title="Resilience Testing (Pillar III)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          DORA requires financial entities to regularly test their digital
          operational resilience. The testing programme encompasses two levels:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#10b981] mb-2">
              Basic tests (all entities)
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Annual Obligation
            </h3>
            <ul className="space-y-2">
              {[
                "Vulnerability scans and assessments",
                "Open-source analyses",
                "Network security reviews",
                "Gap analyses",
                "Physical security reviews",
                "Scenario-based tests",
                "Compatibility tests",
                "Performance tests",
                "End-to-end tests",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-2" />
                  <span className="text-[14px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/30 p-6">
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-emerald-700 mb-2">
              TLPT — Threat-Led Penetration Testing
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Every 3 Years (systemically important entities)
            </h3>
            <ul className="space-y-2">
              {[
                "Threat-led penetration tests",
                "Based on the TIBER-EU framework",
                "Covers critical live production systems",
                "Conducted by external red teams",
                "Inclusion of critical ICT third-party providers",
                "Results reported to supervisory authority",
                "Joint TLPT with third-party providers possible",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-700 flex-shrink-0 mt-2" />
                  <span className="text-[14px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 8. THIRD-PARTY ═══════════════════ */}
      <Section id="third-party" title="Third-Party Risk Management (Pillar IV)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          For the first time, DORA sets comprehensive requirements for managing ICT third-party risk.
          Financial entities must systematically identify, assess and manage
          their dependencies on external ICT service providers.
        </p>

        <AccordionSection
          accent="#10b981"
          items={[
            {
              title: "Register of All ICT Third-Party Providers",
              content: (
                <div>
                  <p className="mb-3">
                    Financial entities must maintain a complete register of all contractual
                    arrangements with ICT third-party providers and submit it to the supervisory authority upon request.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Record all ICT service contracts</li>
                    <li>Assess the criticality of each service</li>
                    <li>Document sub-outsourcing</li>
                    <li>Regular updates of the register</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Minimum Contractual Requirements",
              content: (
                <div>
                  <p className="mb-3">
                    DORA defines mandatory minimum clauses that must be included in all ICT service contracts.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Service level agreements (SLAs) with quantitative targets</li>
                    <li>Audit and access rights for the financial entity and supervisory authority</li>
                    <li>Incident reporting obligations of the third-party provider</li>
                    <li>Data localisation and processing</li>
                    <li>Exit clauses and transition periods</li>
                    <li>Business continuity requirements</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Exit Strategies",
              content: (
                <p>
                  Implementable exit strategies must exist for all critical ICT third-party providers.
                  These must enable an orderly termination of the business relationship
                  without jeopardising business continuity, impairing compliance
                  with regulatory requirements, or diminishing the quality of
                  services to clients.
                </p>
              ),
            },
            {
              title: "Oversight of Critical ICT Third-Party Providers",
              content: (
                <div>
                  <p className="mb-3">
                    An absolute first: the European Supervisory Authorities (ESAs) can designate ICT third-party providers
                    as &quot;critical&quot; and directly supervise them.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Direct oversight by a &quot;Lead Overseer&quot; (ESA)</li>
                    <li>On-site inspections at the ICT provider</li>
                    <li>Recommendations and measures in case of deficiencies</li>
                    <li>Criteria catalogue: systemic relevance, concentration risk, substitutability</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 9. PENALTIES ═══════════════════ */}
      <Section id="penalties" title="Penalties & Supervision">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          DORA itself does not define fixed fine ceilings — this falls within the
          competence of national supervisory authorities. However, the sanction regimes
          are significant and comprise various measures.
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Supervisory Powers of Competent Authorities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Ordering remediation of deficiencies",
                "Imposing fines",
                "Public disclosure of infringements",
                "Injunctions",
                "On-site inspections and examinations",
                "Requesting reports and documents",
                "Temporary suspension of functions",
                "Penalty surcharges for ongoing violations",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border-2 border-red-200 bg-red-50/30 p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              For Critical ICT Third-Party Providers
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
              The Lead Overseer may impose daily penalty payments of
              up to <strong>1% of the average daily worldwide turnover</strong>{" "}
              of the ICT third-party provider in case of non-compliance — for a maximum of 6 months.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 10. AUSTRIA ═══════════════════ */}
      <Section id="austria" title="Implementation in Austria">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          As an EU Regulation, DORA applies directly in Austria — without a national transposition act.
          The <strong>Financial Market Authority (FMA)</strong><SourceRef id={3} sources={sources} accent="#10b981" /> is the competent supervisory authority.
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                <span className="text-xl">{"\u{1F1E6}\u{1F1F9}"}</span>
              </div>
              <div>
                <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
                  Financial Market Authority (FMA)
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
                  The FMA is responsible for supervising all Austrian financial entities
                  under DORA. It has already published extensive guidelines and
                  circulars on DORA requirements and conducts ongoing
                  examinations.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">Supervision & Examination</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">Incident Reports</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">TLPT Coordination</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              OeNB (Austrian National Bank)
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              The OeNB supports the FMA in supervising the banking sector and plays
              an important role in implementing the TIBER-AT framework (Austrian
              adaptation of TIBER-EU) for threat-led penetration testing.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 11. COMPLIANCE ROADMAP ═══════════════════ */}
      <Section id="roadmap" title="Your Compliance Roadmap">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          DORA has been fully applicable since 17 January 2025. If your organisation still has gaps,
          you should close them on a priority basis.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RoadmapStep
            phase="Phase 1 — Immediate"
            title="Gap Analysis & Prioritisation"
            accent="#10b981"
            items={[
              "Confirm DORA applicability",
              "Gap analysis against all 5 DORA pillars",
              "Identify critical ICT third-party providers",
              "Engage and inform the management body",
            ]}
          />
          <RoadmapStep
            phase="Phase 2 — Month 1–3"
            title="Framework & Governance"
            accent="#059669"
            items={[
              "Establish ICT risk management framework",
              "Build incident response process (4h-capable)",
              "Create ICT third-party provider register",
              "Plan testing programme",
            ]}
          />
          <RoadmapStep
            phase="Phase 3 — Month 3–6"
            title="Implementation & Contracts"
            accent="#0d9488"
            items={[
              "Contractual adjustments with ICT third-party providers",
              "Exit strategies for critical providers",
              "Initial vulnerability scans and tests",
              "Training programme for management body",
            ]}
          />
          <RoadmapStep
            phase="Phase 4 — Ongoing"
            title="Operations & Optimisation"
            accent="#0891b2"
            items={[
              "Conduct annual basic tests",
              "TLPT planning (if systemically important)",
              "Keep third-party register up to date",
              "Regular management reviews",
            ]}
          />
        </div>
      </Section>

      {/* ═══════════════════ 12. FAQ ═══════════════════ */}
      <Section id="faq" title="Frequently Asked Questions (FAQ)">
        <AccordionSection
          accent="#10b981"
          allowMultiple
          items={[
            {
              title: "Does our company need to comply with DORA or NIS2?",
              content: (
                <p>
                  If your company is a regulated financial entity (bank, insurance company,
                  investment firm, etc.), DORA applies as the sector-specific law (lex specialis). You must
                  fulfil the DORA requirements, not <LawRef law="NIS2">NIS2</LawRef>. For financial entities that would also
                  fall under NIS2, DORA replaces the NIS2 obligations in the ICT area.
                </p>
              ),
            },
            {
              title: "Are small financial entities also affected?",
              content: (
                <p>
                  In principle, yes — DORA applies to all 21 categories of financial entities
                  regardless of size. However, the proportionality principle applies:
                  smaller entities may implement simplified frameworks. Micro-enterprises
                  (fewer than 10 employees and EUR 2 million turnover) are subject to a simplified
                  ICT risk management framework under <LawRef law="DORA" article="16">Art. 16</LawRef>.
                </p>
              ),
            },
            {
              title: "What does DORA mean for our cloud usage?",
              content: (
                <div>
                  <p className="mb-3">Cloud usage remains possible under DORA, but is strictly regulated:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>The cloud provider must be included in the ICT third-party register</li>
                    <li>The contract must contain all DORA minimum clauses (audit rights, SLAs, exit clause)</li>
                    <li>Concentration risks must be assessed (too much dependency on one provider)</li>
                    <li>If the provider is designated as &quot;critical&quot;, it is subject to direct EU oversight</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Do we need to conduct TLPT?",
              content: (
                <p>
                  TLPT (Threat-Led Penetration Testing) is not mandatory for all financial entities.
                  The competent authorities identify those entities that
                  must conduct TLPT due to their systemic importance. Typically, this affects
                  large banks, central market infrastructures and systemically important
                  insurance undertakings. All others must conduct the annual basic tests.
                </p>
              ),
            },
            {
              title: "How does the DORA reporting obligation differ from NIS2?",
              content: (
                <div>
                  <p className="mb-3">The key differences:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>Initial notification:</strong> DORA requires 4 hours (<LawRef law="NIS2">NIS2</LawRef>: 24 hours)</li>
                    <li><strong>Classification:</strong> DORA uses finance-specific criteria (affected clients, transaction volume)</li>
                    <li><strong>Voluntary reports:</strong> DORA also provides for the reporting of cyber threats (not just incidents)</li>
                    <li><strong>Authority:</strong> Report to the financial supervisor (FMA), not the CSIRT</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Is the board of directors personally liable?",
              content: (
                <p>
                  Yes. DORA requires the management body to approve the ICT risk management framework
                  and oversee its implementation. In case of failures, individual
                  sanctions may apply, including the temporary suspension
                  of management functions. The liability is similar to the <LawRef law="NIS2">NIS2</LawRef> management liability,
                  but is tailored to the financial sector.
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ RELATED REGULATIONS ═══════════════════ */}
      <RelatedGuides currentGuide="dora" accent="#0369a1" />

      {/* ═══════════════════ SOFTWARE RECOMMENDATIONS ═══════════════════ */}
      <ToolRecommendation regulationKey="dora" accent="#10b981" />

      {/* ═══════════════════ SOURCES ═══════════════════ */}
      <Section id="sources" title="Sources & Official Documents">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          All information in this guide is based on official EU documents.
          Here you will find the primary sources:
        </p>

        <SourceList sources={sources} accent="#10b981" />

        <div className="mt-6 rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Disclaimer:</strong> This guide is for informational purposes
            and does not constitute legal advice. The linked documents are the official
            legal texts. For questions regarding the specific application to your organisation, we recommend
            consulting specialised lawyers or compliance advisors.
          </p>
        </div>
      </Section>
    </GuidePageLayout>
  );
}
