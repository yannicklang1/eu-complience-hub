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
    desc: "Official German version on the EUR-Lex portal",
    type: "Regulation",
  },
  {
    id: 2,
    title: "EU AI Act — englische Fassung",
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng",
    desc: "Official English version on the EUR-Lex portal",
    type: "Regulation",
  },
  {
    id: 3,
    title: "EU AI Office — Europäischer Ansatz für KI",
    url: "https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence",
    desc: "European Commission: AI strategy, guidelines and implementation",
    type: "Authority",
  },
  {
    id: 4,
    title: "RTR — KI-Servicestelle Österreich",
    url: "https://www.rtr.at",
    desc: "Austrian Regulatory Authority for Broadcasting and Telecommunications — AI supervision for Austria",
    type: "Supervisor AT",
  },
  {
    id: 5,
    title: "Digital Omnibus Verordnung — Entwurf",
    url: "https://ec.europa.eu/commission/presscorner/detail/de/ip_25_2882",
    desc: "European Commission: Simplification package for SMEs (Nov. 2025)",
    type: "Authority",
  },
  {
    id: 6,
    title: "Anhang III — Hochrisiko-KI-Systeme",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32024R1689#anx_III",
    desc: "Complete list of high-risk application areas",
    type: "Regulation",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "timeline", label: "Timeline & Deadlines" },
  { id: "risk", label: "Risk Classification" },
  { id: "affected", label: "Who Is Affected?" },
  { id: "obligations", label: "High-Risk AI Obligations" },
  { id: "gpai", label: "GPAI Models" },
  { id: "penalties", label: "Penalties" },
  { id: "austria", label: "Austria" },
  { id: "roadmap", label: "Compliance Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "sources", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Penalty", value: "€35M or 7% of turnover" },
  { label: "Key Deadline", value: "2 August 2026" },
  { label: "Risk Levels", value: "4 Categories" },
  { label: "Supervisor (AT)", value: "RTR / AI Service Centre" },
  { label: "In Force Since", value: "1 August 2024" },
  { label: "Applies To", value: "Providers, Deployers, Importers" },
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
              Active
            </span>
          )}
          {active && (
            <span className="text-[9px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-mono font-bold border border-blue-200">
              Key Deadline
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
export default function GuideContentEN() {
  return (
    <GuidePageLayout
      title="EU AI Act"
      subtitle="The European AI Regulation in detail: risk levels, deadlines, obligations and penalties. What your organisation needs to know and do now."
      regulationKey="Verordnung (EU) 2024/1689"
      accent="#0A2540"
      badgeLabel="Deadline Aug 2026"
      badgeColor="#dc2626"
      quickFacts={quickFacts}
      tocItems={tocItems}
      trustBadge={{ lastReview: "18.02.2026", sourceCount: 6 }}
      heroIcon={
        <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      }
      href="/eu-ai-act"
    >
      {/* ═══════════════════ 1. OVERVIEW ═══════════════════ */}
      <Section id="overview" title="Overview: What Is the EU AI Act?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The <strong>EU AI Act</strong> (Regulation (EU) 2024/1689) is the world&apos;s
          first comprehensive law regulating Artificial Intelligence.<SourceRef id={1} sources={sources} /> Having
          entered into force on 1 August 2024, it establishes a uniform legal framework
          for the development, distribution and deployment of AI systems within the
          European Union.
        </p>
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          The legislation follows a <strong>risk-based approach</strong>: the higher
          the risk an AI system poses to health, safety or fundamental rights, the
          stricter the requirements. The Act applies not only to EU companies but to
          any provider whose AI system is deployed on the EU market.
        </p>

        {/* Key stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard value="€35M" label="Max. Penalty" accent="#dc2626" />
          <StatCard value="Aug 2026" label="Key Deadline" />
          <StatCard value="4" label="Risk Levels" />
          <StatCard value="2024" label="In Force Since" accent="#059669" />
        </div>

        {/* Info box */}
        <div className="rounded-2xl bg-blue-50/60 border border-blue-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-[#0A2540] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-[#0A2540] mb-1">
                Digital Omnibus Regulation
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                On 26 November 2025, the European Commission presented a draft &quot;Omnibus Simplification&quot;
                package.<SourceRef id={5} sources={sources} /> Some deadlines and thresholds for SMEs may be adjusted.
                The core obligations remain unchanged. We will update this guide once the final version is adopted.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 2. TIMELINE ═══════════════════ */}
      <Section id="timeline" title="Timeline & Deadlines">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          The EU AI Act is being applied in stages. Some provisions are already in effect,
          while the main obligations take effect in August 2026.
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8">
          <TimelineItem
            date="2 February 2025"
            title="Prohibited AI Practices"
            description="Ban on social scoring, manipulative AI, biometric categorisation based on sensitive characteristics, and real-time facial recognition in public spaces (with exceptions)."
            done
          />
          <TimelineItem
            date="2 August 2025"
            title="GPAI & Governance"
            description="Obligations for General Purpose AI (GPAI) models such as GPT-4 or Llama. Transparency requirements, technical documentation, copyright compliance. Establishment of the EU AI Office."
            done
          />
          <TimelineItem
            date="2 August 2026"
            title="High-Risk AI Systems"
            description="Core of the AI Act: comprehensive obligations for high-risk AI including risk management, data governance, technical documentation, logging, transparency, human oversight and cybersecurity."
            active
          />
          <TimelineItem
            date="2 August 2027"
            title="AI in Regulated Products"
            description="High-risk AI systems used as safety components in already regulated products (e.g. medical devices, machinery, lifts)."
          />
        </div>
      </Section>

      {/* ═══════════════════ 3. RISK CLASSIFICATION ═══════════════════ */}
      <Section id="risk" title="Risk Classification">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          The AI Act classifies AI systems into four risk levels.<SourceRef id={6} sources={sources} /> Regulatory
          requirements increase with the level of risk.
        </p>

        <div className="space-y-4 flex flex-col items-center">
          <RiskTier
            level="Level 4"
            label="Unacceptable Risk"
            color="#dc2626"
            bgColor="#fef2f2"
            description="These AI systems are prohibited. They pose an unacceptable threat to fundamental rights."
            examples={["Social Scoring", "Manipulative AI", "Biometric Categorisation", "Real-Time Facial Recognition"]}
            width="65%"
          />
          <RiskTier
            level="Level 3"
            label="High Risk"
            color="#ea580c"
            bgColor="#fff7ed"
            description="Extensive compliance obligations. Applies to AI in critical areas such as human resources, credit scoring, education, and law enforcement."
            examples={["AI Recruiting", "Credit Scoring", "Biometrics", "Critical Infrastructure", "Education AI"]}
            width="78%"
          />
          <RiskTier
            level="Level 2"
            label="Limited Risk"
            color="#ca8a04"
            bgColor="#fefce8"
            description="Transparency obligations: users must know they are interacting with AI. Labelling requirement for AI-generated content."
            examples={["Chatbots", "Deepfakes", "Emotion Recognition", "AI Content"]}
            width="90%"
          />
          <RiskTier
            level="Level 1"
            label="Minimal Risk"
            color="#16a34a"
            bgColor="#f0fdf4"
            description="No special obligations. Voluntary codes of conduct are recommended. Covers the vast majority of all AI applications."
            examples={["Spam Filters", "AI Recommendations", "Game AI", "Translation AI"]}
            width="100%"
          />
        </div>
      </Section>

      {/* ═══════════════════ 4. WHO IS AFFECTED? ═══════════════════ */}
      <Section id="affected" title="Who Is Affected?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          The AI Act defines four key roles with different obligations.
          A single organisation may hold multiple roles simultaneously.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RoleCard
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1M8.83 4.06c1.67-1.67 4.36-1.67 6.04 0l5.07 5.07c1.67 1.67 1.67 4.36 0 6.04l-5.07 5.07c-1.67 1.67-4.36 1.67-6.04 0l-5.07-5.07c-1.67-1.67-1.67-4.36 0-6.04l5.07-5.07z" />
              </svg>
            }
            title="Provider"
            description="Develops or commissions AI systems and places them on the EU market under its own name. Bears primary responsibility for compliance."
          />
          <RoleCard
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            }
            title="Deployer"
            description="Uses AI systems under its own authority. Must ensure usage complies with the rules, guarantee human oversight and maintain logs."
          />
          <RoleCard
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            }
            title="Importer"
            description="Places AI systems from providers outside the EU onto the European market. Must verify CE conformity and documentation."
          />
          <RoleCard
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
              </svg>
            }
            title="Distributor"
            description="Makes AI systems available on the EU market without modifying them. Must verify conformity and notify authorities of any risks."
          />
        </div>
      </Section>

      {/* ═══════════════════ 5. HIGH-RISK AI OBLIGATIONS ═══════════════════ */}
      <Section id="obligations" title="Obligations for High-Risk AI Systems">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          High-risk AI systems are subject to the strictest requirements of the AI Act.
          Providers must fulfil all of the following obligations before the system may
          be placed on the EU market.
        </p>

        <AccordionSection
          accent="#0A2540"
          items={[
            {
              title: <span>1. Risk Management System (<LawRef law="AI Act" article="9" />)</span>,
              content: (
                <div>
                  <p className="mb-3">
                    A continuous, iterative risk management system must be established and
                    maintained throughout the entire lifecycle of the AI system.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Identification and analysis of known and foreseeable risks</li>
                    <li>Estimation and evaluation of risks arising from intended use and reasonably foreseeable misuse</li>
                    <li>Implementation of appropriate risk management measures</li>
                    <li>Testing against predefined metrics and thresholds</li>
                  </ul>
                </div>
              ),
            },
            {
              title: <span>2. Data Governance (<LawRef law="AI Act" article="10" />)</span>,
              content: (
                <div>
                  <p className="mb-3">
                    Training, validation and testing datasets must meet strict quality criteria.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Relevant, representative and as error-free as possible data</li>
                    <li>Consideration of specific geographical, contextual and behavioural aspects</li>
                    <li>Assessment for potential biases</li>
                    <li>Data protection-compliant processing, anonymisation where possible</li>
                  </ul>
                </div>
              ),
            },
            {
              title: <span>3. Technical Documentation (<LawRef law="AI Act" article="11" />)</span>,
              content: (
                <div>
                  <p className="mb-3">
                    Comprehensive technical documentation must be prepared before the system is
                    placed on the market and kept up to date on an ongoing basis.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>General description of the AI system and its purpose</li>
                    <li>Detailed description of components and the development process</li>
                    <li>Information on monitoring, functioning and control</li>
                    <li>Results of the risk assessment</li>
                  </ul>
                </div>
              ),
            },
            {
              title: <span>4. Record-Keeping / Logging (<LawRef law="AI Act" article="12" />)</span>,
              content: (
                <div>
                  <p className="mb-3">
                    High-risk AI systems must automatically generate logs that enable
                    traceability.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Recording of operations throughout the entire lifecycle</li>
                    <li>Enabling post-market monitoring</li>
                    <li>Logs must be retained by deployers for at least 6 months</li>
                    <li>Automatic detection of anomalies and risky situations</li>
                  </ul>
                </div>
              ),
            },
            {
              title: <span>5. Transparency &amp; Information (<LawRef law="AI Act" article="13" />)</span>,
              content: (
                <div>
                  <p className="mb-3">
                    High-risk AI must be designed so that deployers can understand the system
                    and interpret its outputs.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Clear instructions for use containing all relevant information</li>
                    <li>Disclosure of performance level, known limitations and risks</li>
                    <li>Information on human oversight measures</li>
                    <li>Expected lifetime and maintenance requirements</li>
                  </ul>
                </div>
              ),
            },
            {
              title: <span>6. Human Oversight (<LawRef law="AI Act" article="14" />)</span>,
              content: (
                <div>
                  <p className="mb-3">
                    AI systems must be designed to allow natural persons to effectively oversee them.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Ability to override or shut down the system at any time</li>
                    <li>Oversight personnel must understand the capabilities and limitations of the system</li>
                    <li>Detection and correction of automation bias</li>
                    <li>Ensuring the decision-making autonomy of the oversight person</li>
                  </ul>
                </div>
              ),
            },
            {
              title: <span>7. Accuracy, Robustness &amp; Cybersecurity (<LawRef law="AI Act" article="15" />)</span>,
              content: (
                <div>
                  <p className="mb-3">
                    High-risk AI must demonstrate an appropriate level of accuracy, robustness
                    and cybersecurity.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Declared accuracy level in the instructions for use</li>
                    <li>Resilience against errors, disruptions and attacks (incl. data poisoning, adversarial attacks)</li>
                    <li>Redundancy and fail-safe mechanisms</li>
                    <li>Regular security updates</li>
                  </ul>
                </div>
              ),
            },
            {
              title: <span>8. Conformity Assessment &amp; CE Marking (<LawRef law="AI Act" article="43" />)</span>,
              content: (
                <div>
                  <p className="mb-3">
                    A conformity assessment must be carried out before placing the system on
                    the market, and the system must be registered in the EU database.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Internal conformity assessment or assessment by a notified body</li>
                    <li>Issue an EU declaration of conformity</li>
                    <li>Registration in the EU database before placing on the market</li>
                    <li>Establish a post-market monitoring system</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 6. GPAI ═══════════════════ */}
      <Section id="gpai" title="General Purpose AI (GPAI) Models">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          GPAI models such as GPT-4, Claude, Llama or Gemini are subject to their own rules.
          The AI Act distinguishes between standard GPAI and GPAI with systemic risk.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Standard GPAI */}
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#0A2540] mb-2">
              All GPAI Models
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Transparency Obligations
            </h3>
            <ul className="space-y-2">
              {[
                "Prepare technical documentation",
                "Provide information for downstream providers",
                "Comply with copyright policy",
                "Publish a training data summary",
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
              Systemic Risk
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Additional Obligations
            </h3>
            <ul className="space-y-2">
              {[
                "Conduct model evaluations (red teaming)",
                "Assess and mitigate systemic risks",
                "Report serious incidents",
                "Ensure cybersecurity",
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
            <strong className="text-[#060c1a]">Threshold:</strong> GPAI models
            are deemed to pose systemic risk when their cumulative training required
            more than 10<sup>25</sup> FLOPS of computing power, or when the
            European Commission classifies them as such based on their capabilities.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 7. PENALTIES ═══════════════════ */}
      <Section id="penalties" title="Penalties & Fines">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          The EU AI Act provides for severe penalties, graduated according to the
          severity of the infringement. The actual amount depends on the specific
          violation, the size of the company and the circumstances.
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
                  Highest Level
                </div>
                <div className="font-[Syne] font-extrabold text-xl text-[#060c1a]">
                  Up to &euro;35M or 7% of turnover
                </div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed ml-[52px]">
              For violations of the prohibited AI practices (<LawRef law="AI Act" article="5" />). The higher amount
              (fixed sum or percentage) applies.
            </p>
          </div>

          {/* Tier 2 */}
          <div className="rounded-2xl border border-orange-200 bg-orange-50/40 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <span className="font-[Syne] font-extrabold text-orange-600 text-lg">&sect;</span>
              </div>
              <div>
                <div className="font-mono text-[10px] font-bold text-orange-600 tracking-wider uppercase">
                  Mid Level
                </div>
                <div className="font-[Syne] font-extrabold text-xl text-[#060c1a]">
                  Up to &euro;15M or 3% of turnover
                </div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed ml-[52px]">
              For violations of most other obligations under the AI Act, in particular
              the requirements for high-risk AI systems.
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
                  Information Obligations
                </div>
                <div className="font-[Syne] font-extrabold text-xl text-[#060c1a]">
                  Up to &euro;7.5M or 1% of turnover
                </div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed ml-[52px]">
              For providing incorrect, incomplete or misleading information to
              authorities or notified bodies.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-blue-50/60 border border-blue-200/50 p-5 mt-6">
          <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
            <strong>SME Provision:</strong> For SMEs and startups, the same percentages apply;
            however, the lower amount (fixed sum or percentage) is used as the upper limit.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 8. AUSTRIA ═══════════════════ */}
      <Section id="austria" title="Implementation in Austria">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          As an EU regulation, the AI Act applies directly in Austria. However, specific
          structures have been established for national enforcement.
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
                  RTR as AI Service Centre
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
                  The Austrian Regulatory Authority for Broadcasting and Telecommunications
                  (RTR) has been designated as the AI Service Centre.<SourceRef id={4} sources={sources} /> It serves
                  as the central point of contact for questions regarding the AI Regulation
                  and coordinates market surveillance.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-[#0A2540] font-mono border border-blue-200">
                    Advice & Information
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-[#0A2540] font-mono border border-blue-200">
                    Market Surveillance
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
              AI Advisory Board
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              An interdisciplinary AI Advisory Board advises the Austrian federal
              government on the implementation of the AI strategy and the AI Regulation.
              It is composed of representatives from academia, industry, civil society
              and public administration.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Regulatory Sandbox
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Austria is establishing AI regulatory sandboxes in which companies
              can test innovative AI systems under the supervision of authorities
              before placing them on the market.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 9. COMPLIANCE ROADMAP ═══════════════════ */}
      <Section id="roadmap" title="Your Compliance Roadmap">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Achieve AI Act compliance in four phases. Start now to comfortably
          meet the August 2026 deadline.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RoadmapStep
            phase="Phase 1"
            title="Inventory"
            accent="#0A2540"
            items={[
              "Catalogue all AI systems within the organisation",
              "Assign risk categories",
              "Determine roles (provider/deployer)",
              "Conduct a gap analysis",
            ]}
          />
          <RoadmapStep
            phase="Phase 2"
            title="Establish Governance"
            accent="#0e4bbd"
            items={[
              "Appoint AI officers",
              "Set up a risk management framework",
              "Draft internal policies",
              "Launch a training programme",
            ]}
          />
          <RoadmapStep
            phase="Phase 3"
            title="Implement Compliance"
            accent="#1a6bdd"
            items={[
              "Prepare technical documentation",
              "Implement data governance",
              "Set up logging & monitoring",
              "Prepare for the conformity assessment",
            ]}
          />
          <RoadmapStep
            phase="Phase 4"
            title="Operations & Monitoring"
            accent="#2589f5"
            items={[
              "CE marking & EU database registration",
              "Start post-market monitoring",
              "Establish an incident reporting process",
              "Schedule regular audits",
            ]}
          />
        </div>
      </Section>

      {/* ═══════════════════ 10. FAQ ═══════════════════ */}
      <Section id="faq" title="Frequently Asked Questions (FAQ)">
        <AccordionSection
          accent="#0A2540"
          allowMultiple
          items={[
            {
              title: "Does the AI Act also apply to open-source AI?",
              content: (
                <p>
                  In principle, yes, but with exceptions: open-source models that are made
                  freely available are exempt from most GPAI obligations, provided they
                  are not classified as posing systemic risk. However, the prohibitions
                  and high-risk obligations apply without restriction.
                </p>
              ),
            },
            {
              title: "Are SMEs exempt from the obligations?",
              content: (
                <p>
                  No, SMEs are not fundamentally exempt. However, the AI Act provides
                  for proportionate penalties (the lower amount applies as the upper limit).
                  Regulatory sandboxes are also intended to facilitate access for SMEs. The
                  planned Omnibus Simplification could bring further relief.
                </p>
              ),
            },
            {
              title: "What if I only use AI internally?",
              content: (
                <p>
                  As a deployer, you have your own obligations, particularly for high-risk AI:
                  ensure human oversight, maintain logs, inform affected persons and carry out a
                  data protection impact assessment (where relevant). Purely internal use does
                  not exempt you from these obligations.
                </p>
              ),
            },
            {
              title: "How does the AI Act relate to the GDPR?",
              content: (
                <p>
                  The AI Act complements the <LawRef law="DSGVO">GDPR</LawRef> but does not replace it. Organisations must
                  comply with both regulations in parallel. The AI Act explicitly references
                  the GDPR in several articles, particularly regarding data governance,
                  transparency and the data protection impact assessment for high-risk AI.
                </p>
              ),
            },
            {
              title: "What are the first steps for my organisation?",
              content: (
                <div>
                  <p className="mb-3">
                    Start with these three measures:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-[14px]">
                    <li>
                      <strong>Create an AI inventory:</strong> Identify all AI systems
                      that you develop, use or distribute.
                    </li>
                    <li>
                      <strong>Risk assessment:</strong> Assign each system to a risk
                      category (unacceptable, high, limited, minimal).
                    </li>
                    <li>
                      <strong>Appoint an AI officer:</strong> Designate a person or
                      team responsible for AI Act compliance.
                    </li>
                  </ol>
                </div>
              ),
            },
            {
              title: "Do I need CE marking for my AI system?",
              content: (
                <p>
                  Only if your AI system is classified as high-risk. In that case, you must
                  carry out a conformity assessment before placing it on the market, issue an
                  EU declaration of conformity and affix the CE marking. No CE marking is
                  required for AI with minimal or limited risk.
                </p>
              ),
            },
            {
              title: "What happens for non-compliance after August 2026?",
              content: (
                <p>
                  After the transitional period expires, fines of up to EUR 35 million or
                  7% of worldwide annual turnover may be imposed. The competent national
                  authorities (in Austria, the RTR) can also order the recall or withdrawal
                  of non-compliant AI systems from the market.
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ RELATED REGULATIONS ═══════════════════ */}
      <RelatedGuides currentGuide="eu-ai-act" accent="#7c3aed" />

      {/* ═══════════════════ SOFTWARE RECOMMENDATIONS ═══════════════════ */}
      <ToolRecommendation regulationKey="ai-act" accent="#0A2540" />

      {/* ═══════════════════ SOURCES ═══════════════════ */}
      <Section id="sources" title="Sources & Official Documents">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          All information in this guide is based on the following official primary
          sources. Click on a source to read the original:
        </p>

        <SourceList sources={sources} accent="#0A2540" />

        <div className="mt-6 rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Disclaimer:</strong> This guide is for informational
            purposes only and does not constitute legal advice. The linked documents are the official
            legal texts. For questions on specific application to your organisation, we recommend
            consulting specialised lawyers or compliance advisors.
          </p>
        </div>
      </Section>
    </GuidePageLayout>
  );
}
