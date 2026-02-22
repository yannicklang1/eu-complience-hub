"use client";

import GuidePageLayout from "@/components/GuidePageLayout";
import type { TocItem } from "@/components/TableOfContents";
import type { QuickFact } from "@/components/GuidePageLayout";
import AccordionSection from "@/components/AccordionSection";
import { SourceRef, SourceList, type Source } from "@/components/SourceRef";
import ToolRecommendation from "@/components/ToolRecommendation";
import RelatedGuides from "@/components/RelatedGuides";

/* ─────────────────── Sources ─────────────────── */
const sources: Source[] = [
  {
    id: 1,
    title: "Regulation (EU) 2025/327 — European Health Data Space (Full Text)",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32025R0327",
    desc: "Official full text of the EHDS Regulation in the EU Official Journal",
    type: "Regulation",
  },
  {
    id: 2,
    title: "European Commission — European Health Data Space",
    url: "https://health.ec.europa.eu/ehealth-digital-health-and-care/european-health-data-space_en",
    desc: "Official information page of the European Commission on the EHDS",
    type: "Authority",
  },
  {
    id: 3,
    title: "ELGA GmbH — Electronic Health Record Austria",
    url: "https://www.elga.gv.at/",
    desc: "Austrian eHealth infrastructure as an EHDS precursor",
    type: "Authority",
  },
  {
    id: 4,
    title: "HL7 FHIR Standard — Interoperability",
    url: "https://www.hl7.org/fhir/",
    desc: "The international standard for health data exchange",
    type: "Standard",
  },
  {
    id: 5,
    title: "European Commission — eHealth Network",
    url: "https://health.ec.europa.eu/ehealth-digital-health-and-care/ehealth-and-covid-19_en",
    desc: "EU Member State cooperation in the field of eHealth",
    type: "Authority",
  },
  {
    id: 6,
    title: "GDPR Art. 9 — Health Data as a Special Category",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32016R0679#art_9",
    desc: "Processing of special categories of personal data under the GDPR",
    type: "Regulation",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Overview" },
  { id: "timeline", label: "Timeline & Deadlines" },
  { id: "betroffene", label: "Who Is Affected?" },
  { id: "primaernutzung", label: "Primary Use" },
  { id: "sekundaernutzung", label: "Secondary Use" },
  { id: "ehr-systeme", label: "EHR Systems" },
  { id: "interoperabilitaet", label: "Interoperability" },
  { id: "patientenrechte", label: "Patient Rights" },
  { id: "durchsetzung", label: "Enforcement & Sanctions" },
  { id: "oesterreich", label: "EHDS in Austria (ELGA)" },
  { id: "zusammenspiel", label: "Interaction with Other Laws" },
  { id: "fahrplan", label: "Compliance Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "In Force", value: "March 2025" },
  { label: "Application", value: "2027–2031 (phased)" },
  { label: "Standard", value: "HL7 FHIR" },
  { label: "Affects", value: "eHealth & Pharma" },
  { label: "Primary Use", value: "Patient Access" },
  { label: "Secondary Use", value: "Research & AI" },
];

/* ─────────────────── Accent ─────────────────── */
const ACCENT = "#ec4899";

/* ─────────────────── Section wrapper ─────────────────── */
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
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
function StatCard({ value, label, accent = ACCENT }: { value: string; label: string; accent?: string }) {
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
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "bg-[#ec4899] border-[#ec4899]" : active ? "bg-white border-[#ec4899] ring-4 ring-pink-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done ? "text-[#ec4899]" : active ? "text-[#ec4899]" : "text-[#7a8db0]"}`}>
          {date} {done && "✓"}
        </span>
        <h3 className="font-[Syne] font-bold text-[#060c1a] mt-0.5">{title}</h3>
        <p className="text-[#3a4a6b] text-sm mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════ */
export default function GuideContentEN() {
  return (
    <GuidePageLayout
      title="EHDS – European Health Data Space"
      subtitle="EU Regulation for the secure exchange of electronic health data — from patient records to research access."
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      regulationKey="ehds"
      href="/ehds"
    >
      {/* ═══════════════ 1. OVERVIEW ═══════════════ */}
      <Section id="ueberblick" title="Overview: What Is the EHDS?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The <strong>European Health Data Space (EHDS)</strong> — Regulation (EU) 2025/327 — establishes
          a unified European space for the use of electronic health data. The regulation governs both
          the <strong>primary use</strong> (patient care) and the
          <strong> secondary use</strong> (research, innovation, policymaking) of health data.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          For the first time, the EHDS gives patients the EU-wide right to access their electronic health
          data, transfer it, and restrict its use. At the same time, it enables researchers and AI developers
          to access pseudonymised health data under strict conditions.
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          For the healthcare industry, this means massive investments in interoperability, data quality,
          and cybersecurity — but also enormous opportunities through cross-border data exchange and
          evidence-based innovation.
          <SourceRef id={2} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="2027" label="Primary Use From" />
          <StatCard value="2029" label="Secondary Use From" />
          <StatCard value="27 EU" label="Countries Connected" />
        </div>
        <p className="text-[#3a4a6b] text-sm leading-relaxed bg-pink-50 border border-pink-200 rounded-xl p-4">
          <strong>Important:</strong> The EHDS Regulation entered into force in March 2025 but will be
          applied in phases. Initial obligations for primary use apply from 2027, secondary use from
          2029. Manufacturers of EHR systems must make their products compliant by then.
        </p>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Deadlines">
        <div className="space-y-0">
          <TimelineItem
            date="May 2022"
            title="Commission Proposal"
            description="The European Commission presents the EHDS regulation proposal."
            done
          />
          <TimelineItem
            date="March 2025"
            title="Entry into Force"
            description="Regulation (EU) 2025/327 enters into force. Transitional periods begin."
            done
          />
          <TimelineItem
            date="2026"
            title="Establish National Authorities"
            description="Member States must designate Digital Health Authorities and Health Data Access Bodies (HDAB)."
            active
          />
          <TimelineItem
            date="2027"
            title="Primary Use: Patient Access"
            description="Patients gain EU-wide access to their electronic health data. EHR systems must be interoperable."
          />
          <TimelineItem
            date="2029"
            title="Secondary Use: Research Access"
            description="Health Data Access Bodies enable researchers and innovators to access pseudonymised health data."
          />
          <TimelineItem
            date="2031"
            title="Full Application"
            description="All provisions of the EHDS Regulation apply in full. Cross-border infrastructure (HealthData@EU) fully operational."
          />
        </div>
      </Section>

      {/* ═══════════════ 3. WHO IS AFFECTED ═══════════════ */}
      <Section id="betroffene" title="Who Is Affected?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The EHDS affects a broad range of actors in the healthcare sector:
        </p>
        <AccordionSection
          items={[
            {
              title: "Healthcare Providers",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Hospitals, medical practices, pharmacies, laboratories, and all facilities that process
                  health data electronically. They must provide patient data through interoperable systems
                  and ensure patient rights (access, portability, opt-out for secondary use).
                </p>
              ),
            },
            {
              title: "EHR System Manufacturers",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Manufacturers of Electronic Health Record (EHR) systems must demonstrate EU conformity:
                  interoperability (HL7 FHIR, IHE profiles), security, privacy by design, and EU
                  self-declaration. Non-compliant systems may no longer be put into service after the
                  application deadlines.
                  <SourceRef id={4} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "Pharma & Medical Devices",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Pharmaceutical companies can access real-world data through HDAB for clinical trials,
                  pharmacovigilance, and drug development. At the same time, as health data holders,
                  they themselves become data contributors.
                </p>
              ),
            },
            {
              title: "Health App & Wearable Developers",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Wellness apps and wearables that generate health data (heart rate, sleep tracking,
                  blood glucose) fall under the EHDS if they are classified as an EHR system or feed
                  data into the EHR ecosystem.
                </p>
              ),
            },
            {
              title: "Researchers & AI Developers",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Universities, research institutions, and AI companies can apply through HDAB for
                  access to pseudonymised health data — for research, training of AI models,
                  epidemiology, and health policy analysis.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 4. PRIMARY USE ═══════════════ */}
      <Section id="primaernutzung" title="Primary Use: Patient Care">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Primary use concerns the access to and utilisation of health data for direct patient care:
        </p>
        <AccordionSection
          items={[
            {
              title: "Priority Data Categories",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The EHDS defines priority electronic health data categories that must be exchangeable
                  across the EU: <strong>patient summaries</strong>,
                  <strong> e-prescriptions / e-dispensations</strong>,
                  <strong> laboratory results</strong>, <strong>discharge reports</strong>,
                  <strong> medical imaging reports</strong>, and <strong>medical images</strong>.
                  These categories will be expanded over time.
                </p>
              ),
            },
            {
              title: "Cross-Border Data Access",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  A patient from Austria who is admitted to a hospital in Portugal should have access
                  to their patient summary and current prescriptions there. The EU infrastructure
                  MyHealth@EU connects the national systems.
                </p>
              ),
            },
            {
              title: "Patient Identification",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  An EU-wide patient identification system is being established for cross-border data
                  access. Member States must ensure that their citizens can be uniquely and securely
                  identified — while safeguarding data protection rights.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 5. SECONDARY USE ═══════════════ */}
      <Section id="sekundaernutzung" title="Secondary Use: Research & Innovation">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Secondary use enables the utilisation of health data beyond direct patient care — under
          strict conditions:
        </p>
        <AccordionSection
          items={[
            {
              title: "Health Data Access Bodies (HDAB)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Each Member State must establish at least one independent access body (HDAB).
                  It reviews data access applications, issues data permits, and provides pseudonymised
                  or anonymised datasets in secure processing environments.
                </p>
              ),
            },
            {
              title: "Permitted Purposes",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Access is granted for: public health interest, research and development, training
                  of AI systems (including for medical devices), pharmacovigilance, regulation,
                  personalised medicine, official statistics, and education/teaching.
                </p>
              ),
            },
            {
              title: "Prohibited Purposes",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Expressly prohibited are: decisions detrimental to natural persons (insurance exclusion,
                  creditworthiness assessment), advertising to healthcare professionals for medicinal
                  products, development of harmful products (addictive substances, weapons), and
                  forwarding to third parties outside the permit scope.
                </p>
              ),
            },
            {
              title: "Secure Processing Environment",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Data is not &quot;downloaded&quot; but made available in a secure, isolated processing
                  environment. Researchers can perform analyses and export results — but not raw data.
                  Strict logging and audit trails ensure traceability.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 6. EHR SYSTEMS ═══════════════ */}
      <Section id="ehr-systeme" title="EHR Systems: Requirements & Certification">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Manufacturers of Electronic Health Record (EHR) systems face extensive new obligations:
        </p>
        <AccordionSection
          items={[
            {
              title: "EU Declaration of Conformity",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  EHR systems must issue an EU self-declaration of conformity. Technical documentation,
                  risk assessment, and evidence of interoperability must be provided. Market access is
                  supervised by national market surveillance authorities.
                </p>
              ),
            },
            {
              title: "Interoperability Standards",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  EHR systems must support the <strong>European EHR exchange format</strong>, which
                  is based on <strong>HL7 FHIR</strong>. In addition, IHE profiles (Integrating the
                  Healthcare Enterprise), SNOMED CT (terminology), LOINC (laboratory data), and other
                  EU-defined standards apply.
                  <SourceRef id={4} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "Security by Design",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  EHR systems must meet security requirements: encryption, access controls, audit
                  logging, identity management, and resilience. The requirements are aligned with
                  EN ISO 27799 (information security in healthcare) and NIS2 requirements.
                </p>
              ),
            },
            {
              title: "Labelling & EU Mark",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Compliant EHR systems receive an EU conformity mark. This must be displayed in the
                  technical documentation and in marketing materials. Non-compliant systems may no
                  longer be distributed after the transitional periods expire.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 7. INTEROPERABILITY ═══════════════ */}
      <Section id="interoperabilitaet" title="Interoperability & Infrastructure">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The EHDS is built on two EU-wide infrastructures:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <StatCard value="MyHealth@EU" label="Primary Use Cross-Border" />
          <StatCard value="HealthData@EU" label="Secondary Use Cross-Border" />
        </div>
        <AccordionSection
          items={[
            {
              title: "MyHealth@EU — Patient Care",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The existing infrastructure for the cross-border exchange of patient summaries and
                  e-prescriptions is being expanded. National Contact Points for eHealth serve as the
                  technical gateways. Austria&apos;s ELGA is already partially connected.
                </p>
              ),
            },
            {
              title: "HealthData@EU — Research Access",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  A new decentralised infrastructure for cross-border access to pseudonymised health
                  data for secondary use. It connects the national HDABs with each other. Enables
                  multi-country research without physical data transfer (federated analysis).
                </p>
              ),
            },
            {
              title: "European EHR Exchange Format",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  A standardised data format for the priority categories, based on HL7 FHIR profiles.
                  The European Commission adopts implementing acts that define the exact format,
                  terminologies (SNOMED CT, ICD-10/11, LOINC), and transport protocols.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 8. PATIENT RIGHTS ═══════════════ */}
      <Section id="patientenrechte" title="Patient Rights Under the EHDS">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The EHDS significantly strengthens the rights of patients in digital healthcare:
        </p>
        <AccordionSection
          items={[
            {
              title: "Right of Access",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Patients have the right to access their electronic health data free of charge and
                  without delay — in a readable, machine-readable format. This goes beyond the GDPR
                  right of access and encompasses all data in the EHR.
                </p>
              ),
            },
            {
              title: "Data Portability",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Patients can have their data transferred from one healthcare provider to another —
                  including cross-border within the EU. The data must be provided in the European EHR
                  exchange format.
                </p>
              ),
            },
            {
              title: "Opt-Out for Secondary Use",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Patients can object to the secondary use of their data (opt-out). This objection
                  must be simple and free of charge. However, the opt-out may be limited in certain
                  cases (public health, official statistics).
                </p>
              ),
            },
            {
              title: "Transparency & Control",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Patients must be informed when their data is made accessible for secondary use.
                  They have the right to know who has applied for access and for what purpose.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 9. ENFORCEMENT ═══════════════ */}
      <Section id="durchsetzung" title="Enforcement & Sanctions">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Enforcement takes place at the national level through designated authorities:
        </p>
        <AccordionSection
          items={[
            {
              title: "Competent Authorities",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Each Member State designates a <strong>Digital Health Authority</strong> for primary
                  use and a <strong>Health Data Access Body (HDAB)</strong> for secondary use.
                  Additionally, <strong>market surveillance authorities</strong> oversee EHR system
                  compliance.
                </p>
              ),
            },
            {
              title: "Sanctions Framework",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The specific sanctions are determined by Member States and must be effective,
                  proportionate, and dissuasive. Violations of secondary use provisions (unauthorised
                  data use) can also trigger GDPR fines — up to EUR 20 million or 4% of annual
                  global turnover.
                  <SourceRef id={6} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "EHR System Market Surveillance",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Non-compliant EHR systems can be withdrawn from the market. Manufacturers may be
                  required to make corrections, issue recalls, or have their EU declaration of
                  conformity revoked.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 10. AUSTRIA ═══════════════ */}
      <Section id="oesterreich" title="EHDS in Austria: ELGA as the Foundation">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Austria already has a well-established eHealth infrastructure with the
          <strong> ELGA (Elektronische Gesundheitsakte — Electronic Health Record)</strong>, which
          serves as the foundation for the EHDS:
          <SourceRef id={3} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "ELGA as a Precursor",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  ELGA has been operational since 2015 and covers discharge letters, laboratory
                  results, diagnostic imaging reports, and e-medication. It connects over 14,000
                  healthcare providers in Austria. ELGA will serve as the national contact point
                  for MyHealth@EU.
                </p>
              ),
            },
            {
              title: "E-Medication & Electronic Vaccination Record",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Austria&apos;s e-medication and electronic vaccination record are already EHDS-relevant
                  data categories. The systems must be migrated to the European EHR exchange format to
                  ensure cross-border compatibility.
                </p>
              ),
            },
            {
              title: "Adaptation Requirements",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Despite the strong starting position, adaptation is needed: HL7 FHIR compliance of
                  ELGA interfaces, establishment of an HDAB for secondary use, patient opt-out
                  mechanisms, and integration into HealthData@EU.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 11. INTERACTION WITH OTHER LAWS ═══════════════ */}
      <Section id="zusammenspiel" title="Interaction with Other EU Laws">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The EHDS interacts with numerous EU regulations:
        </p>
        <AccordionSection
          items={[
            {
              title: "GDPR — Special Categories of Data (Art. 9)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Health data constitutes a special category under Art. 9 GDPR. The EHDS creates
                  specific legal bases for primary and secondary use (Art. 6(1)(e) and Art. 9(2)(i)
                  GDPR). GDPR rights (access, erasure) remain fully intact.
                </p>
              ),
            },
            {
              title: "AI Act — High-Risk AI in Medicine",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  AI systems trained with EHDS data fall under the high-risk category of the AI Act
                  (Annex III — Healthcare). Dual compliance: EHDS for data access, AI Act for the AI
                  system itself.
                </p>
              ),
            },
            {
              title: "MDR — Medical Devices Regulation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  EHR systems classified as medical devices are additionally subject to the MDR
                  (EU 2017/745). The EHDS avoids double regulation by recognising that MDR-compliant
                  products already meet certain EHDS requirements.
                </p>
              ),
            },
            {
              title: "NIS2 / NISG — Cybersecurity",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Healthcare providers fall under NIS2 as &quot;essential entities&quot;. The EHDS
                  cybersecurity requirements for EHR systems complement the NIS2 obligations for
                  healthcare institutions.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 12. COMPLIANCE ROADMAP ═══════════════ */}
      <Section id="fahrplan" title="Compliance Roadmap">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The required actions differ depending on your role:
        </p>
        <AccordionSection
          items={[
            {
              title: "EHR System Manufacturers: Act Now",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Conduct a gap analysis of current HL7 FHIR conformity. Implement the EU EHR exchange
                  format. Prepare technical documentation for the EU declaration of conformity. Perform
                  a security-by-design review. Timeline: by 2027 for primary use.
                </p>
              ),
            },
            {
              title: "Healthcare Providers: Upgrade Systems",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Verify whether your EHR systems are EHDS-compliant (or coordinate upgrade plans with
                  manufacturers). Establish processes for patient access and data portability. Implement
                  opt-out mechanisms for secondary use. Train staff.
                </p>
              ),
            },
            {
              title: "Researchers & AI Developers: Build Structures",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Familiarise yourself with HDAB application procedures. Design data management plans
                  in line with EHDS requirements. Evaluate secure processing environments. Align ethics
                  requirements with EHDS conditions. Timeline: from 2029 for secondary use.
                </p>
              ),
            },
            {
              title: "Health App Developers: Clarify Classification",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Determine whether your app qualifies as an EHR system. If yes: implement
                  interoperability standards. If no: assess whether data exchange with the EHR
                  ecosystem is desired or required. Ensure API compatibility with HL7 FHIR.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 13. FAQ ═══════════════ */}
      <Section id="faq" title="Frequently Asked Questions (FAQ)">
        <AccordionSection
          items={[
            {
              title: "Can insurers use my health data?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  No. Secondary use for decisions detrimental to natural persons is expressly
                  prohibited. Insurers may not use EHDS data for risk assessments, premium
                  calculations, or the exclusion of benefits.
                </p>
              ),
            },
            {
              title: "What happens to my ELGA data?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  ELGA will be integrated into the EHDS as Austria&apos;s national EHR infrastructure.
                  Your existing data in ELGA will become part of the EHDS ecosystem. You retain all
                  previous rights (including the opt-out from ELGA) and additionally receive the EHDS
                  rights (cross-border access, secondary use opt-out).
                </p>
              ),
            },
            {
              title: "Does the EHDS also apply to wellness apps (Fitbit, Apple Health)?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Only if these apps are classified as an EHR system or feed data into an EHR system.
                  Pure wellness trackers without medical claims do not fall directly under the EHDS
                  but may be covered by national implementation provisions.
                </p>
              ),
            },
            {
              title: "How much will EHDS compliance cost?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  For EHR system manufacturers: EUR 100,000–500,000 for HL7 FHIR conformity and
                  certification documentation. For hospitals: depending on the existing level of
                  digitalisation — from EUR 50,000 (system upgrade) to several million (complete EHR
                  implementation). The EU provides funding (Digital Europe Programme).
                </p>
              ),
            },
            {
              title: "Can AI models be trained with EHDS data?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Yes, under strict conditions. AI training with health data is an explicitly permitted
                  secondary use purpose. Requirements: approval by the HDAB, processing in a secure
                  environment, pseudonymisation of data, and compliance with the AI Act (high-risk
                  classification).
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════════ RELATED REGULATIONS ═══════════════════ */}
      <RelatedGuides currentGuide="ehds" accent="#be123c" />

      {/* ═══════════════ TOOL RECOMMENDATION ═══════════════ */}
      <ToolRecommendation regulationKey="ehds" accent={ACCENT} />

      {/* ═══════════════ SOURCES ═══════════════ */}
      <Section id="quellen" title="Sources & Further Reading">
        <SourceList sources={sources} />
      </Section>
    </GuidePageLayout>
  );
}
