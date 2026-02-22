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
    title: "Regulation (EU) 2016/679 — GDPR (German full text)",
    url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj/deu",
    desc: "Official consolidated German version on the EUR-Lex portal",
    type: "EU Regulation",
  },
  {
    id: 2,
    title: "GDPR — English version",
    url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng",
    desc: "Official English version on the EUR-Lex portal",
    type: "EU Regulation",
  },
  {
    id: 3,
    title: "Data Protection Act (DSG) — Austria",
    url: "https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001597",
    desc: "Austrian Data Protection Act on RIS, supplementing the GDPR",
    type: "Law AT",
  },
  {
    id: 4,
    title: "Austrian Data Protection Authority (DSB)",
    url: "https://www.dsb.gv.at",
    desc: "Austrian supervisory authority — complaints, guidelines, decisions",
    type: "Authority AT",
  },
  {
    id: 5,
    title: "European Data Protection Board (EDPB)",
    url: "https://edpb.europa.eu",
    desc: "EU-wide body for consistent GDPR interpretation — guidelines and opinions",
    type: "EU Authority",
  },
  {
    id: 6,
    title: "EDPB Guidelines on Data Protection Impact Assessment",
    url: "https://edpb.europa.eu/our-work-tools/general-guidance/guidelines_en",
    desc: "Guidelines on Data Protection Impact Assessments under Art. 35 GDPR",
    type: "Guideline",
  },
  {
    id: 7,
    title: "EDPB-EDPS Joint Opinion 5/2021 on AI Act Proposal",
    url: "https://edpb.europa.eu/our-work-tools/our-documents/edpbedps-joint-opinion/edpb-edps-joint-opinion-52021-proposal_en",
    desc: "Joint opinion by EDPB and EDPS on the interface between the AI Act and GDPR",
    type: "Guideline",
  },
  {
    id: 8,
    title: "Regulation (EU) 2024/1689 — EU AI Act",
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/deu",
    desc: "EU AI Act full text — relevant for the GDPR-AI interface",
    type: "EU Regulation",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Overview" },
  { id: "grundprinzipien", label: "7 Core Principles" },
  { id: "rechtsgrundlagen", label: "Legal Bases" },
  { id: "betroffenenrechte", label: "Data Subject Rights" },
  { id: "pflichten", label: "Obligations for Businesses" },
  { id: "dsb", label: "Data Protection Officer" },
  { id: "dsfa", label: "Data Protection Impact Assessment" },
  { id: "strafen", label: "Fines & Penalties" },
  { id: "oesterreich", label: "GDPR in Austria" },
  { id: "dsgvo-ki", label: "GDPR & AI 2026" },
  { id: "chatgpt-daten", label: "AI Tools & Customer Data" },
  { id: "fahrplan", label: "Compliance Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Fine", value: "\u20AC20M or 4% of turnover" },
  { label: "In Force Since", value: "25 May 2018" },
  { label: "Applies To", value: "Any company with EU nexus" },
  { label: "Authority (AT)", value: "Data Protection Authority (DSB)" },
  { label: "EU Body", value: "EDPB (European Data Protection Board)" },
  { label: "Legal Basis", value: "Regulation (EU) 2016/679" },
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
  accent = "#7c3aed",
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

/* ─────────────────── Principle card ─────────────────── */
function PrincipleCard({
  number,
  title,
  article,
  description,
}: {
  number: number;
  title: string;
  article: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-[#d8dff0] bg-white p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-xl bg-[#f3f0ff] flex items-center justify-center font-[Syne] font-extrabold text-sm text-[#7c3aed]">
          {number}
        </div>
        <div>
          <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] leading-tight">
            {title}
          </div>
          <div className="font-mono text-[10px] text-[#7a8db0]">{article}</div>
        </div>
      </div>
      <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

/* ─────────────────── Right card ─────────────────── */
function RightCard({
  icon,
  title,
  article,
  description,
}: {
  icon: string;
  title: string;
  article: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-[#d8dff0] bg-white p-5 hover:border-[#7c3aed]/20 transition-colors"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{icon}</span>
        <div>
          <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-0.5">
            {title}
          </div>
          <div className="font-mono text-[10px] text-[#7a8db0] mb-2">
            {article}
          </div>
          <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────── Fine tier ─────────────────── */
function FineTier({
  level,
  amount,
  percentage,
  color,
  examples,
}: {
  level: string;
  amount: string;
  percentage: string;
  color: string;
  examples: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border bg-white p-6"
      style={{ borderColor: `${color}30` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: color }}
        />
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider" style={{ color }}>
          {level}
        </span>
      </div>
      <div className="font-[Syne] font-extrabold text-3xl mb-1" style={{ color }}>
        {amount}
      </div>
      <div className="font-mono text-[12px] text-[#7a8db0] mb-4">
        or {percentage} of global annual turnover
      </div>
      <div className="space-y-2">
        {examples.map((ex) => (
          <div key={ex} className="flex items-start gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
              style={{ background: color, opacity: 0.5 }}
            />
            <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{ex}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN CONTENT
   ═══════════════════════════════════════════════════ */
export default function GuideContentEN() {
  return (
    <GuidePageLayout
      title="GDPR & AI 2026"
      subtitle="The EU General Data Protection Regulation in the age of AI — obligations, rights, ChatGPT & customer data, AI Act x GDPR, and a practical compliance roadmap for Austrian businesses."
      regulationKey="DSGVO & KI 2026"
      accent="#7c3aed"
      badgeLabel="Update 2026"
      badgeColor="#7c3aed"
      quickFacts={quickFacts}
      tocItems={tocItems}
      trustBadge={{
        lastReview: "19.02.2026",
        sourceCount: 8,
        factChecked: true,
      }}
      heroIcon={
        <svg className="w-7 h-7 text-[#7c3aed]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      }
      href="/dsgvo"
    >
      {/* ═══════════════════ OVERVIEW ═══════════════════ */}
      <Section id="ueberblick" title="What is the GDPR?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The <strong>General Data Protection Regulation</strong> (<LawRef law="DSGVO" article="1">Regulation (EU) 2016/679</LawRef>)
          is the central EU data protection law and has been directly applicable in all 27 EU member states since <strong>25 May 2018</strong>.
          <SourceRef id={1} sources={sources} accent="#7c3aed" /> It replaced Directive 95/46/EC and established a uniform legal framework
          for the protection of personal data of natural persons.
        </p>

        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          The GDPR applies to <strong>every company</strong> that processes personal data of EU citizens —
          regardless of whether it is established in the EU (<LawRef law="DSGVO" article="3">market location principle</LawRef>).
          It grants data subjects extensive rights and obliges controllers and processors
          to implement comprehensive protective measures. Violations can be punished with fines of up to <strong>EUR 20 million</strong> or
          <strong> 4% of global annual turnover</strong>.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatCard value="EUR 20M" label="Max. Fine" accent="#dc2626" />
          <StatCard value="2018" label="In Force Since" accent="#7c3aed" />
          <StatCard value="8" label="Data Subject Rights" accent="#059669" />
          <StatCard value="99" label="Articles" accent="#0A2540" />
        </div>

        <div className="rounded-2xl bg-[#f8f5ff] border border-[#e8e0ff] p-6 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">💡</span>
            <div>
              <p className="font-[Syne] font-bold text-[#060c1a] mb-1">Important Distinction</p>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                The GDPR is a <strong>Regulation</strong> — it applies directly in all EU member states.
                Unlike a <em>Directive</em> (such as NIS2), it does not require national transposition.
                However, Austria has enacted supplementary provisions through the <strong>Data Protection Act (DSG)</strong>,
                in particular regarding the Data Protection Authority and penalty provisions. <SourceRef id={3} sources={sources} accent="#7c3aed" />
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 7 CORE PRINCIPLES ═══════════════════ */}
      <Section id="grundprinzipien" title="The 7 Core Principles of the GDPR">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          <LawRef law="DSGVO" article="5">Article 5 GDPR</LawRef> defines seven fundamental principles
          that must be observed in every processing of personal data.
          They form the foundation of the entire EU data protection framework:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <PrincipleCard
            number={1}
            title="Lawfulness, Transparency"
            article="Art. 5(1)(a)"
            description="Processing must be based on a legal basis and must be comprehensible to the data subject."
          />
          <PrincipleCard
            number={2}
            title="Purpose Limitation"
            article="Art. 5(1)(b)"
            description="Data may only be collected for specified, explicit, and legitimate purposes."
          />
          <PrincipleCard
            number={3}
            title="Data Minimisation"
            article="Art. 5(1)(c)"
            description="Only collect the data that is actually necessary for the purpose — nothing more."
          />
          <PrincipleCard
            number={4}
            title="Accuracy"
            article="Art. 5(1)(d)"
            description="Data must be factually correct and up to date. Inaccurate data must be rectified or erased."
          />
          <PrincipleCard
            number={5}
            title="Storage Limitation"
            article="Art. 5(1)(e)"
            description="Data may only be stored for as long as is necessary for the purpose."
          />
          <PrincipleCard
            number={6}
            title="Integrity & Confidentiality"
            article="Art. 5(1)(f)"
            description="Appropriate technical and organisational measures to protect the data are mandatory."
          />
          <PrincipleCard
            number={7}
            title="Accountability"
            article="Art. 5(2)"
            description="The controller must be able to demonstrate compliance with all principles (documentation obligation)."
          />
        </div>

        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5">
          <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Practical Tip:</strong> Accountability (no. 7) is the
            most common stumbling block. It is not enough to comply — you must also be able to <em>prove</em> it.
            A documented Data Protection Management System (DPMS) is therefore indispensable.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ LEGAL BASES ═══════════════════ */}
      <Section id="rechtsgrundlagen" title="The 6 Legal Bases for Processing">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Every data processing operation requires a legal basis under <LawRef law="DSGVO" article="6">Art. 6 GDPR</LawRef>.
          Without a valid legal basis, processing is unlawful — regardless of
          how well the data is protected.
        </p>

        <AccordionSection
          accent="#7c3aed"
          items={[
            {
              title: "1. Consent (Art. 6(1)(a))",
              content: (
                <div>
                  <p className="mb-3">
                    The data subject has given their <strong>freely given, informed, and unambiguous</strong> consent.
                    Must be revocable at any time (<LawRef law="DSGVO" article="7">Art. 7</LawRef>).
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    <strong>Example:</strong> Newsletter sign-up with double opt-in, cookie consent for marketing cookies.
                  </p>
                </div>
              ),
            },
            {
              title: "2. Performance of a Contract (Art. 6(1)(b))",
              content: (
                <div>
                  <p className="mb-3">
                    Processing is necessary for the <strong>performance of a contract</strong> or pre-contractual measures
                    with the data subject.
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    <strong>Example:</strong> Delivery address for an online order, payroll processing for employees.
                  </p>
                </div>
              ),
            },
            {
              title: "3. Legal Obligation (Art. 6(1)(c))",
              content: (
                <div>
                  <p className="mb-3">
                    Processing is necessary for compliance with a <strong>legal obligation</strong>
                    to which the controller is subject.
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    <strong>Example:</strong> Tax record-keeping obligations (Austrian BAO), reporting to social insurance.
                  </p>
                </div>
              ),
            },
            {
              title: "4. Vital Interests (Art. 6(1)(d))",
              content: (
                <p>
                  Processing is necessary to protect the <strong>vital interests</strong> of the data subject
                  or another natural person. Rarely relevant in practice —
                  primarily in medical emergencies.
                </p>
              ),
            },
            {
              title: "5. Public Interest (Art. 6(1)(e))",
              content: (
                <p>
                  Processing is necessary for the performance of a task carried out in the
                  <strong> public interest</strong> or in the exercise of official authority.
                  Relevant for public authorities and institutions.
                </p>
              ),
            },
            {
              title: "6. Legitimate Interests (Art. 6(1)(f))",
              content: (
                <div>
                  <p className="mb-3">
                    Processing is necessary for the <strong>legitimate interests</strong> of the controller
                    or a third party — provided that the interests of the data subject do not override them.
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    <strong>Example:</strong> Fraud prevention, IT security, direct marketing to existing customers.
                    Always requires a documented <em>balancing test</em>.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ DATA SUBJECT RIGHTS ═══════════════════ */}
      <Section id="betroffenenrechte" title="8 Data Subject Rights">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          The GDPR grants data subjects comprehensive rights.
          Companies must implement processes to fulfil these rights within
          <strong> one month</strong> (<LawRef law="DSGVO" article="12">Art. 12(3)</LawRef>).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <RightCard
            icon="ℹ️"
            title="Right of Access"
            article="Art. 15 GDPR"
            description="Data subjects have the right to know whether and what data is being processed about them, the purpose, the recipients, and the storage period."
          />
          <RightCard
            icon="✏️"
            title="Right to Rectification"
            article="Art. 16 GDPR"
            description="Inaccurate personal data must be rectified without undue delay."
          />
          <RightCard
            icon="🗑️"
            title="Right to Erasure"
            article="Art. 17 GDPR"
            description="The 'right to be forgotten': data must be erased when the purpose ceases to exist or consent is withdrawn."
          />
          <RightCard
            icon="⏸️"
            title="Right to Restriction"
            article="Art. 18 GDPR"
            description="Data subjects can request that processing be restricted, e.g. during a review of data accuracy."
          />
          <RightCard
            icon="📦"
            title="Data Portability"
            article="Art. 20 GDPR"
            description="Data subjects can receive their data in a commonly used, machine-readable format and transfer it to another provider."
          />
          <RightCard
            icon="🚫"
            title="Right to Object"
            article="Art. 21 GDPR"
            description="Data subjects can object at any time to processing based on Art. 6(1)(e) or (f) — in particular to direct marketing."
          />
          <RightCard
            icon="🤖"
            title="Automated Decisions"
            article="Art. 22 GDPR"
            description="Right not to be subject to decisions based solely on automated processing (including profiling) that produce legal effects."
          />
          <RightCard
            icon="📢"
            title="Right to Information"
            article="Art. 13 & 14 GDPR"
            description="Controllers must proactively inform data subjects about data processing — at the time of collection or within one month."
          />
        </div>
      </Section>

      {/* ═══════════════════ OBLIGATIONS FOR BUSINESSES ═══════════════════ */}
      <Section id="pflichten" title="Obligations for Businesses">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          In addition to safeguarding data subject rights, companies acting as controllers
          (<LawRef law="DSGVO" article="4">Art. 4(7)</LawRef>) or processors
          (<LawRef law="DSGVO" article="4">Art. 4(8)</LawRef>) must fulfil numerous obligations:
        </p>

        <AccordionSection
          accent="#7c3aed"
          items={[
            {
              title: "Records of Processing Activities (Art. 30)",
              content: (
                <div>
                  <p className="mb-3">
                    Every company with more than 250 employees <strong>must</strong> maintain a record of all
                    processing activities. Smaller companies are only exempt if processing is not carried out
                    on a regular basis — in practice, this obligation therefore applies to almost every company.
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    Contents: Name of the controller, purpose, categories of data subjects and data,
                    recipients, transfers to third countries, erasure deadlines, description of technical and organisational measures.
                  </p>
                </div>
              ),
            },
            {
              title: "Technical & Organisational Measures (Art. 32)",
              content: (
                <div>
                  <p className="mb-3">
                    Controllers and processors must implement <strong>appropriate</strong> technical
                    and organisational measures (TOMs). What is appropriate depends on
                    the state of the art, costs, and the level of risk.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-[14px] text-[#5a6a8a]">
                    <li>Pseudonymisation and encryption</li>
                    <li>Confidentiality, integrity, availability, and resilience</li>
                    <li>Ability to restore after incidents</li>
                    <li>Regular testing and evaluation of effectiveness</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Data Processing Agreements (Art. 28)",
              content: (
                <p>
                  When an external service provider (processor) processes personal data on behalf of the controller,
                  a written contract <strong>must</strong> be concluded (DPA).
                  This governs the subject matter, duration, type of data, obligations of the processor,
                  sub-processors, and binding instructions. Cloud services, IT service providers, and
                  marketing tools are typical cases.
                </p>
              ),
            },
            {
              title: "Data Breach Notification (Art. 33 & 34)",
              content: (
                <div>
                  <p className="mb-3">
                    In the event of a data breach, the controller must notify the supervisory authority
                    <strong> within 72 hours</strong> of becoming aware
                    (<LawRef law="DSGVO" article="33">Art. 33</LawRef>) — unless the breach
                    is unlikely to result in a risk to data subjects.
                  </p>
                  <p className="text-[14px] text-[#5a6a8a]">
                    In cases of <strong>high risk</strong> to data subjects, they must also be
                    notified directly (<LawRef law="DSGVO" article="34">Art. 34</LawRef>).
                  </p>
                </div>
              ),
            },
            {
              title: "Privacy by Design & Default (Art. 25)",
              content: (
                <p>
                  Data protection must be taken into account at the <strong>development</strong> stage of products and systems
                  (Privacy by Design). By default, only the data necessary for the specific purpose
                  may be processed (Privacy by Default). This concerns the amount of data collected,
                  the scope of processing, the storage period, and accessibility.
                </p>
              ),
            },
            {
              title: "Data Protection Impact Assessment (Art. 35)",
              content: (
                <p>
                  If a processing activity is likely to result in a <strong>high risk</strong> to
                  the rights and freedoms of natural persons, a
                  Data Protection Impact Assessment (DPIA) must be carried out in advance. More on this in the section below.
                </p>
              ),
            },
            {
              title: "International Data Transfers (Chapter V)",
              content: (
                <div>
                  <p className="mb-3">
                    Data transfers to third countries (outside the EEA) are only permissible if an
                    <strong> adequate level of protection</strong> is ensured.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-[14px] text-[#5a6a8a]">
                    <li><strong>Adequacy Decision:</strong> e.g. EU-US Data Privacy Framework</li>
                    <li><strong>Standard Contractual Clauses (SCCs):</strong> EU Commission-approved clauses</li>
                    <li><strong>Binding Corporate Rules (BCRs):</strong> Intra-group data protection rules</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ DATA PROTECTION OFFICER ═══════════════════ */}
      <Section id="dsb" title="Data Protection Officer (DPO)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          A <strong>Data Protection Officer</strong> (DPO) must be designated pursuant to <LawRef law="DSGVO" article="37">Art. 37 GDPR</LawRef>
          {" "}if one of the following conditions applies:
        </p>

        <div className="space-y-4 mb-8">
          {[
            {
              condition: "Public Authorities & Bodies",
              description: "Always, except for courts acting in their judicial capacity.",
            },
            {
              condition: "Core Activity: Monitoring",
              description:
                "When the core activities consist of large-scale, regular, and systematic monitoring of individuals (e.g. tracking, profiling).",
            },
            {
              condition: "Core Activity: Sensitive Data",
              description:
                "When the core activities consist of large-scale processing of special categories of data (health, biometric data, criminal convictions).",
            },
          ].map((item) => (
            <motion.div
              key={item.condition}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-5 rounded-2xl border border-[#d8dff0] bg-white"
            >
              <div className="w-2 h-2 rounded-full bg-[#7c3aed] flex-shrink-0 mt-2" />
              <div>
                <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">
                  {item.condition}
                </div>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="rounded-2xl bg-[#f8f5ff] border border-[#e8e0ff] p-6">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">🇦🇹</span>
            <div>
              <p className="font-[Syne] font-bold text-[#060c1a] mb-1">Austrian Specifics</p>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                In Austria, there is <strong>no extended DPO obligation</strong> beyond what the GDPR requires.
                Art. 37 GDPR applies exactly as written. The DPO may be appointed internally or externally
                and enjoys <strong>protection against dismissal</strong> under <LawRef law="DSGVO" article="38">Art. 38(3)</LawRef>.
                The DPO&apos;s contact details must be communicated to the Data Protection Authority.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ DPIA ═══════════════════ */}
      <Section id="dsfa" title="Data Protection Impact Assessment (DPIA)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          A <strong>DPIA</strong> is mandatory pursuant to <LawRef law="DSGVO" article="35">Art. 35 GDPR</LawRef>
          {" "}when a processing activity is likely to result in a <strong>high risk</strong> to data subjects.
          The supervisory authority publishes lists of processing activities
          for which a DPIA is required. <SourceRef id={6} sources={sources} accent="#7c3aed" />
        </p>

        <div className="mb-8">
          <p className="font-[Syne] font-bold text-[#060c1a] mb-4">When is a DPIA mandatory?</p>
          <div className="space-y-3">
            {[
              "Systematic and extensive evaluation of personal aspects (profiling)",
              "Large-scale processing of special categories of data (health, biometrics)",
              "Systematic monitoring of publicly accessible areas (video surveillance)",
              "New technologies with unclear risks (AI, IoT, facial recognition)",
              "Automated decision-making with legal effects",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <span className="text-[14px] text-[#3a4a6b] leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
          <p className="font-[Syne] font-bold text-[#060c1a] mb-3">Contents of a DPIA</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { step: "1", title: "Description", desc: "Nature, scope, context, and purpose of the processing" },
              { step: "2", title: "Necessity", desc: "Assess necessity and proportionality" },
              { step: "3", title: "Risk Assessment", desc: "Risks to the rights and freedoms of data subjects" },
              { step: "4", title: "Mitigation Measures", desc: "Planned measures to mitigate risks" },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3 p-3 rounded-xl bg-[#f8f9fd]">
                <div className="w-7 h-7 rounded-lg bg-[#f3f0ff] flex items-center justify-center font-[Syne] font-bold text-sm text-[#7c3aed] flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <div className="font-bold text-[13px] text-[#060c1a]">{s.title}</div>
                  <div className="text-[12px] text-[#7a8db0] leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════ FINES & PENALTIES ═══════════════════ */}
      <Section id="strafen" title="Fines & Penalties">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          The GDPR provides for two tiers of fines (<LawRef law="DSGVO" article="83">Art. 83</LawRef>).
          The amount depends on the nature, gravity, and duration of the infringement, intent or negligence,
          measures taken, and cooperation with the supervisory authority.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <FineTier
            level="Tier 2 (Severe)"
            amount="EUR 20M"
            percentage="4%"
            color="#dc2626"
            examples={[
              "Infringements of the core principles (Art. 5, 6, 9)",
              "Violation of data subject rights (Art. 12-22)",
              "Unlawful third-country transfers (Art. 44-49)",
              "Non-compliance with supervisory authority orders",
            ]}
          />
          <FineTier
            level="Tier 1 (Lower)"
            amount="EUR 10M"
            percentage="2%"
            color="#ea580c"
            examples={[
              "Obligations of the controller (Art. 25-39)",
              "Obligations of the processor",
              "Certification body obligations",
              "Monitoring body obligations",
            ]}
          />
        </div>

        <div className="rounded-2xl bg-[#fef2f2] border border-red-200 p-6 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">⚠️</span>
            <div>
              <p className="font-[Syne] font-bold text-[#060c1a] mb-1">Record Fines in Practice</p>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                The highest GDPR fines to date: Meta (EUR 1.2 billion — Ireland, 2023),
                Amazon (EUR 746 million — Luxembourg, 2021), WhatsApp (EUR 225 million — Ireland, 2021).
                In Austria, the DSB has imposed fines of up to several hundred thousand euros.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5">
          <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Austria:</strong> The DSG provides for supplementary penalty provisions
            in <LawRef law="DSG" paragraph="62">Section 62 DSG</LawRef>.{" "}
            Violations of certain DSG provisions can be punished with administrative fines of up
            to <strong>EUR 50,000</strong> — in addition to the GDPR fines.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ AUSTRIA ═══════════════════ */}
      <Section id="oesterreich" title="GDPR in Austria">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Although the GDPR applies uniformly across the EU, Austria has enacted national supplements through the
          <strong> Data Protection Act (DSG)</strong>. <SourceRef id={3} sources={sources} accent="#7c3aed" />{" "}
          Here are the key specifics:
        </p>

        <div className="space-y-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#f3f0ff] flex items-center justify-center">
                <span className="text-lg">🏛️</span>
              </div>
              <div>
                <div className="font-[Syne] font-bold text-[#060c1a]">Data Protection Authority (DSB)</div>
                <div className="font-mono text-[10px] text-[#7a8db0]">dsb.gv.at</div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              The <strong>Data Protection Authority</strong> (<LawRef law="DSG" paragraph="18">Section 18 DSG</LawRef>) is
              the independent supervisory authority for Austria. <SourceRef id={4} sources={sources} accent="#7c3aed" /> It receives complaints,
              conducts investigations, imposes fines, and provides guidance on data protection matters.
              Headquarters: Barichgasse 40-42, 1030 Vienna.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#f3f0ff] flex items-center justify-center">
                <span className="text-lg">📋</span>
              </div>
              <div>
                <div className="font-[Syne] font-bold text-[#060c1a]">Opening Clauses in the DSG</div>
                <div className="font-mono text-[10px] text-[#7a8db0]">National Specifics</div>
              </div>
            </div>
            <ul className="space-y-2 text-[14px] text-[#5a6a8a] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] font-bold mt-0.5">•</span>
                <span><strong>Employee Data Protection:</strong> No separate regulation — general GDPR law applies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] font-bold mt-0.5">•</span>
                <span><strong>Age of Consent:</strong> 14 years (instead of GDPR default of 16 years, Section 4(4) DSG)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] font-bold mt-0.5">•</span>
                <span><strong>Image Processing:</strong> Section 12 DSG regulates the use of image recordings (video surveillance) — stricter rules than the GDPR</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] font-bold mt-0.5">•</span>
                <span><strong>Data Secrecy:</strong> Section 6 DSG establishes a special duty of data secrecy for processors</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#f3f0ff] flex items-center justify-center">
                <span className="text-lg">⚖️</span>
              </div>
              <div>
                <div className="font-[Syne] font-bold text-[#060c1a]">Legal Remedies in Austria</div>
                <div className="font-mono text-[10px] text-[#7a8db0]">Complaints & Litigation</div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Data subjects can file complaints directly with the <strong>Data Protection Authority</strong>
              (right to lodge a complaint under <LawRef law="DSGVO" article="77">Art. 77</LawRef>) or bring civil proceedings for damages
              (<LawRef law="DSGVO" article="82">Art. 82</LawRef>). Decisions of the DSB can be appealed
              to the Federal Administrative Court.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════ GDPR & AI 2026 ═══════════════════ */}
      <Section id="dsgvo-ki" title="GDPR & AI — What Changes in 2026">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          With the <strong>EU AI Act</strong> (<LawRef law="AI Act" article="1">Regulation (EU) 2024/1689</LawRef>),
          the world&apos;s first comprehensive AI regulation enters into force in 2026.
          <SourceRef id={8} sources={sources} accent="#7c3aed" /> The GDPR remains the
          <strong> foundation of data protection</strong> — including for AI systems. Companies must
          comply with both regulations simultaneously.
        </p>

        <div className="space-y-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#f3f0ff] flex items-center justify-center"><span className="text-lg">🤖</span></div>
              <div>
                <div className="font-[Syne] font-bold text-[#060c1a]">Art. 22 GDPR Meets High-Risk AI</div>
                <div className="font-mono text-[10px] text-[#7a8db0]">Automated Decisions</div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              <LawRef law="DSGVO" article="22">Art. 22 GDPR</LawRef> prohibits purely automated decisions
              with legal effects. The AI Act classifies AI systems in employment, creditworthiness, and
              social benefits as <strong>high-risk</strong>. Companies must ensure that
              such systems guarantee a <strong>human review</strong> (human-in-the-loop).
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#f3f0ff] flex items-center justify-center"><span className="text-lg">📋</span></div>
              <div>
                <div className="font-[Syne] font-bold text-[#060c1a]">DPIA Obligation for AI Systems</div>
                <div className="font-mono text-[10px] text-[#7a8db0]">Art. 35 GDPR x AI Act</div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              AI systems that process personal data almost always require a
              <strong> Data Protection Impact Assessment</strong> under <LawRef law="DSGVO" article="35">Art. 35 GDPR</LawRef>.
              The AI Act additionally requires a <strong>Fundamental Rights Impact Assessment</strong> for high-risk AI.
              The EDPB and EDPS recommend integrating both assessments.
              <SourceRef id={7} sources={sources} accent="#7c3aed" />
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#f3f0ff] flex items-center justify-center"><span className="text-lg">🧠</span></div>
              <div>
                <div className="font-[Syne] font-bold text-[#060c1a]">AI Training Data & GDPR</div>
                <div className="font-mono text-[10px] text-[#7a8db0]">Legal Basis for Training</div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Training AI models with personal data requires a <strong>legal basis</strong>.
              Consent is often impractical for large datasets. Many AI providers rely on
              <strong> legitimate interests</strong> (<LawRef law="DSGVO" article="6">Art. 6(1)(f)</LawRef>) —
              but this requires a careful balancing test and an opt-out right for data subjects.
            </p>
          </motion.div>
        </div>

        <div className="rounded-2xl bg-[#f8f5ff] border border-[#e8e0ff] p-6">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">⚡</span>
            <div>
              <p className="font-[Syne] font-bold text-[#060c1a] mb-1">Recommended Action</p>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                Create an <strong>integrated compliance framework</strong> for GDPR and AI Act.
                Inventory all AI systems in your organisation, assess their risk class under the AI Act,
                and prepare a combined DPIA + Fundamental Rights Impact Assessment for each system.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ CHATGPT & CUSTOMER DATA ═══════════════════ */}
      <Section id="chatgpt-daten" title="Can I Enter Customer Data into ChatGPT?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          One of the most common questions in 2026: Can my company enter <strong>customer data into AI tools</strong> such as
          ChatGPT, Microsoft Copilot, or Google Gemini? The short answer: <strong>It depends</strong> —
          specifically on the tool, the contract, and the type of data.
        </p>

        <div className="rounded-2xl bg-[#fef2f2] border border-red-200 p-6 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">⚠️</span>
            <div>
              <p className="font-[Syne] font-bold text-[#060c1a] mb-1">Warning: Free AI Tools</p>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                With free versions of ChatGPT, Gemini & Co., inputs are typically used for
                <strong> model training</strong>. This is <strong>not compatible with the GDPR</strong>
                {" "}when personal data is involved. For business purposes, use
                <strong> exclusively enterprise versions</strong> with a Data Processing Agreement (DPA).
              </p>
            </div>
          </div>
        </div>

        <AccordionSection
          accent="#7c3aed"
          items={[
            {
              title: "ChatGPT / OpenAI — What is Allowed?",
              content: (
                <div>
                  <p className="mb-3">
                    <strong>ChatGPT Enterprise / API:</strong> OpenAI offers a <strong>DPA under Art. 28 GDPR</strong>.
                    Data is <strong>not</strong> used for training. Processing in the US, secured by
                    the EU-US Data Privacy Framework (OpenAI is certified) and Standard Contractual Clauses.
                  </p>
                  <p className="mb-3">
                    <strong>ChatGPT Free / Plus:</strong> Inputs may be used for training.
                    No DPA available. <strong>Not suitable for business data.</strong>
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    <strong>Recommendation:</strong> Use ChatGPT Enterprise or API with DPA. Activate opt-out for training.
                    Never enter sensitive or special categories of personal data.
                  </p>
                </div>
              ),
            },
            {
              title: "Microsoft Copilot / Azure OpenAI",
              content: (
                <div>
                  <p className="mb-3">
                    <strong>Microsoft 365 Copilot:</strong> Runs within the <strong>EU Data Boundary</strong>.
                    Microsoft acts as a processor with a comprehensive DPA. Data is <strong>not</strong> used for training.
                    From a GDPR perspective, currently the best option for businesses.
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    <strong>Azure OpenAI Service:</strong> Also available with a DPA and EU data centres.
                    Companies retain full control over their data.
                  </p>
                </div>
              ),
            },
            {
              title: "Google Gemini / Vertex AI",
              content: (
                <div>
                  <p className="mb-3">
                    <strong>Google Workspace with Gemini:</strong> DPA available via the Google Cloud contract.
                    Processing in EU data centres possible. According to Google, data is <strong>not</strong>
                    {" "}used for training Gemini models outside the customer&apos;s account.
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    <strong>Caution:</strong> The free Gemini (bard.google.com) uses inputs for training.
                    Only the enterprise version is suitable for GDPR-compliant use.
                  </p>
                </div>
              ),
            },
            {
              title: "Internal AI Policy — What Every Company Needs",
              content: (
                <div>
                  <p className="mb-3">Create an <strong>AI usage policy</strong> for your company:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px] text-[#5a6a8a]">
                    <li><strong>Whitelist:</strong> Approved AI tools with DPA (e.g. ChatGPT Enterprise, Copilot)</li>
                    <li><strong>Blacklist:</strong> Prohibited tools without DPA (free versions, unknown AI startups)</li>
                    <li><strong>Data Classification:</strong> Which data may be entered into AI tools? (Never: health data, biometrics, sensitive personnel data)</li>
                    <li><strong>Training Obligation:</strong> Train all employees before AI usage</li>
                    <li><strong>Records of Processing:</strong> Document AI tools as processing activities</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ COMPLIANCE ROADMAP ═══════════════════ */}
      <Section id="fahrplan" title="GDPR Compliance Roadmap">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Even though the GDPR has been in force since 2018, many companies still struggle with full implementation.
          Here is a pragmatic 5-phase roadmap:
        </p>

        <div className="space-y-4 mb-8">
          {[
            {
              phase: "1",
              title: "Inventory",
              weeks: "Week 1-2",
              color: "#7c3aed",
              tasks: [
                "Identify all data processing activities",
                "Review or create the records of processing activities",
                "Inventory all processors",
                "Document third-country transfers",
              ],
            },
            {
              phase: "2",
              title: "Legal Bases & Risk Assessment",
              weeks: "Week 3-4",
              color: "#059669",
              tasks: [
                "Determine the legal basis for each processing activity",
                "Conduct risk assessment — where is a DPIA needed?",
                "Review and update privacy notices",
                "Check consent management (cookie consent, forms)",
              ],
            },
            {
              phase: "3",
              title: "Technical & Organisational Measures",
              weeks: "Week 5-8",
              color: "#0A2540",
              tasks: [
                "Implement or document TOMs under Art. 32",
                "Create and automate a data retention and deletion policy",
                "Implement access rights management",
                "Define encryption standards for sensitive data",
              ],
            },
            {
              phase: "4",
              title: "Processes & Training",
              weeks: "Week 9-12",
              color: "#ea580c",
              tasks: [
                "Establish a data subject request process (max. 1-month deadline)",
                "Implement a data breach notification process (72-hour deadline)",
                "Conduct and document employee training",
                "Conclude DPAs with all processors",
              ],
            },
            {
              phase: "5",
              title: "Monitoring & Improvement",
              weeks: "Ongoing",
              color: "#dc2626",
              tasks: [
                "Conduct regular data protection audits",
                "Keep records of processing activities up to date",
                "Pre-screen new processing activities (Privacy by Design)",
                "Follow EDPB guidelines and DSB decisions",
              ],
            },
          ].map((phase) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#d8dff0] bg-white p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-[Syne] font-extrabold text-white text-sm"
                  style={{ background: phase.color }}
                >
                  {phase.phase}
                </div>
                <div>
                  <div className="font-[Syne] font-bold text-[#060c1a]">
                    {phase.title}
                  </div>
                  <div className="font-mono text-[10px] text-[#7a8db0]">
                    {phase.weeks}
                  </div>
                </div>
              </div>
              <div className="space-y-2 pl-[52px]">
                {phase.tasks.map((task) => (
                  <div key={task} className="flex items-start gap-2.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
                      style={{ background: phase.color, opacity: 0.4 }}
                    />
                    <span className="text-[14px] text-[#5a6a8a] leading-relaxed">
                      {task}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <Section id="faq" title="Frequently Asked Questions (FAQ)">
        <AccordionSection
          accent="#7c3aed"
          items={[
            {
              title: "Does the GDPR apply to my company?",
              content: (
                <p>
                  Very likely yes. The GDPR applies to <strong>every company</strong> that processes personal
                  data of individuals in the EU — regardless of size, industry, or location.
                  If you have employees, serve customers in the EU, operate a website with a contact form,
                  or send emails, you are processing personal data.
                </p>
              ),
            },
            {
              title: "What is personal data?",
              content: (
                <div>
                  <p className="mb-3">
                    Any information relating to an identified or identifiable natural person
                    (<LawRef law="DSGVO" article="4">Art. 4(1)</LawRef>). This includes:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-[14px]">
                    <li>Name, address, phone number, email</li>
                    <li>IP addresses, cookie IDs, device IDs</li>
                    <li>Location data, health data, biometric data</li>
                    <li>Account numbers, social security number</li>
                    <li>Photos, videos with identifiable individuals</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Do I need a Data Protection Officer?",
              content: (
                <p>
                  Not every company does. The obligation applies to: public authorities, companies whose
                  core activity involves systematic monitoring (e.g. tracking service providers), and
                  companies that carry out large-scale processing of special categories of data
                  (e.g. health data). Regardless, appointing a DPO is often advisable
                  to minimise risks and fulfil the accountability obligation.
                </p>
              ),
            },
            {
              title: "What happens in the event of a data breach?",
              content: (
                <div>
                  <p className="mb-3">
                    In the event of a personal data breach, you must:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
                    <li>
                      <strong>72 hours:</strong> Notify the Data Protection Authority (if there is a risk to data subjects)
                    </li>
                    <li>
                      <strong>Without undue delay:</strong> Directly inform the data subjects (if there is a high risk)
                    </li>
                    <li>
                      <strong>Documentation:</strong> Document every incident internally (even if no notification obligation arises)
                    </li>
                  </ol>
                </div>
              ),
            },
            {
              title: "What consent do I need for cookies?",
              content: (
                <p>
                  Strictly necessary cookies (session, shopping cart) do <strong>not require consent</strong>.
                  For all other cookies — in particular marketing, tracking, and analytics cookies —
                  <strong> informed, freely given consent</strong> is required before they are set
                  (opt-in). This follows from the ePrivacy Directive in conjunction with the GDPR.
                  A cookie banner with genuine opt-in (not merely an information banner) is mandatory.
                </p>
              ),
            },
            {
              title: "How long may I store data?",
              content: (
                <p>
                  As briefly as possible. The GDPR does not prescribe fixed retention periods but requires
                  that data be <strong>stored only for as long as is necessary for the purpose</strong>.
                  You must create a data retention policy that defines retention periods per data type.
                  Examples: Accounting records 7 years (Austrian BAO), job applications 6 months,
                  customer master data until end of contract + limitation period.
                </p>
              ),
            },
            {
              title: "Can I transfer data to the US?",
              content: (
                <p>
                  Since the <strong>EU-US Data Privacy Framework</strong> (adequacy decision of 10 July 2023),
                  data can be transferred to US companies that are certified under the framework.
                  For non-certified US companies or other third countries, you need
                  Standard Contractual Clauses (SCCs) including a Transfer Impact Assessment.
                </p>
              ),
            },
            {
              title: "How does the GDPR relate to NIS2 and the AI Act?",
              content: (
                <p>
                  The GDPR, NIS2, and the AI Act complement each other. NIS2 requires <strong>cybersecurity measures</strong>
                  {" "}that also serve data protection (confidentiality, integrity). The AI Act requires a
                  <strong> Data Protection Impact Assessment</strong> for high-risk AI systems and compliance with
                  the GDPR for training data. Companies affected by all three regulations
                  should establish an integrated compliance management system.
                </p>
              ),
            },
            {
              title: "Can I use ChatGPT in my company?",
              content: (
                <div>
                  <p className="mb-3">
                    Yes, but only under certain conditions: Use <strong>exclusively enterprise versions</strong>
                    {" "}with a Data Processing Agreement (DPA) under Art. 28 GDPR. The free ChatGPT version
                    uses inputs for model training — this is not GDPR-compliant when personal data is involved.
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    Additionally, create an internal AI usage policy that specifies which data
                    may be entered into which tools.
                  </p>
                </div>
              ),
            },
            {
              title: "Do I need a DPIA for AI systems?",
              content: (
                <p>
                  In most cases, yes. AI systems that process personal data typically involve
                  <strong> profiling, automated decision-making, or new technologies</strong> —
                  all triggers for a mandatory DPIA under Art. 35 GDPR. The AI Act additionally requires
                  a Fundamental Rights Impact Assessment for high-risk AI. Plan an integrated
                  assessment that covers both requirements.
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ RELATED REGULATIONS ═══════════════════ */}
      <RelatedGuides currentGuide="dsgvo" accent="#0e7490" />

      {/* ═══════════════════ SOFTWARE RECOMMENDATIONS ═══════════════════ */}
      <ToolRecommendation regulationKey="dsgvo" accent="#7c3aed" />

      {/* ═══════════════════ SOURCES ═══════════════════ */}
      <Section id="quellen" title="Sources & Official Documents">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          All information in this guide is based on official EU and
          Austrian documents. Here you can find the primary sources:
        </p>

        <SourceList sources={sources} accent="#7c3aed" />

        <div className="mt-6 rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Disclaimer:</strong> This guide is for informational purposes only
            and does not constitute legal advice. The linked documents are the official
            legal texts. For questions regarding the specific application to your company, we recommend
            consulting specialised data protection lawyers or certified Data Protection Officers.
          </p>
        </div>
      </Section>
    </GuidePageLayout>
  );
}
