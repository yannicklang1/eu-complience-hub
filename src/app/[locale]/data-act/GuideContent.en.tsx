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
    title: "Regulation (EU) 2023/2854 — Data Act (Full Text)",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32023R2854",
    desc: "Official full text of the Data Act in the EU Official Journal",
    type: "Regulation",
  },
  {
    id: 2,
    title: "EU Commission — European Data Strategy",
    url: "https://digital-strategy.ec.europa.eu/en/policies/data-act",
    desc: "Official EU Commission information page on the Data Act",
    type: "Authority",
  },
  {
    id: 3,
    title: "EU Commission — Data Act FAQ",
    url: "https://digital-strategy.ec.europa.eu/en/faqs/data-act-questions-and-answers",
    desc: "Official EU Commission FAQ on the Data Act",
    type: "Authority",
  },
  {
    id: 4,
    title: "GDPR — General Data Protection Regulation",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32016R0679",
    desc: "Interplay between the Data Act and GDPR for personal data",
    type: "Regulation",
  },
  {
    id: 5,
    title: "EU Data Governance Act — Regulation 2022/868",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32022R0868",
    desc: "Complementary regulation to the Data Act for public data",
    type: "Regulation",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Overview" },
  { id: "timeline", label: "Timeline & Deadlines" },
  { id: "betroffene", label: "Who Is Affected?" },
  { id: "iot-zugang", label: "IoT Data Access (B2C)" },
  { id: "b2b-sharing", label: "B2B Data Sharing" },
  { id: "unfaire-klauseln", label: "Unfair Contract Terms" },
  { id: "cloud-switching", label: "Cloud Switching & Interop." },
  { id: "behoerden", label: "Government Data Access" },
  { id: "durchsetzung", label: "Enforcement & Penalties" },
  { id: "oesterreich", label: "Data Act in Austria & DACH" },
  { id: "zusammenspiel", label: "Interplay with Other Laws" },
  { id: "fahrplan", label: "Compliance Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Applies from", value: "12 Sep 2025" },
  { label: "Covers", value: "IoT & Cloud" },
  { label: "Switching", value: "Max. 45 Days" },
  { label: "Switching Fee", value: "EUR 0 from 2027" },
  { label: "FRAND", value: "Fair & Reasonable" },
  { label: "Regulation", value: "Directly applicable" },
];

/* ─────────────────── Accent ─────────────────── */
const ACCENT = "#0ea5e9";

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
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "bg-[#0ea5e9] border-[#0ea5e9]" : active ? "bg-white border-[#0ea5e9] ring-4 ring-sky-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done ? "text-[#0ea5e9]" : active ? "text-[#0ea5e9]" : "text-[#7a8db0]"}`}>
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
      title="EU Data Act"
      subtitle="Data access rights for IoT users, cloud switching freedom, and fair B2B data contracts — effective September 2025."
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      regulationKey="data-act"
      href="/data-act"
    >
      {/* ═══════════════ 1. OVERVIEW ═══════════════ */}
      <Section id="ueberblick" title="Overview: What Is the Data Act?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The <strong>Data Act</strong> — Regulation (EU) 2023/2854 — is the EU&apos;s central legislation
          governing data access rights in the connected economy. It regulates who may access data from
          IoT devices (smart products), how cloud switching must work, and which contract terms in
          B2B data sharing are considered unfair.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The core principle: <strong>&quot;Those who generate data should be able to benefit from it&quot;</strong>.
          Until now, IoT data has mostly remained with the manufacturer. The Data Act grants users and
          businesses an enforceable right to access the data generated by their devices.
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          As an EU regulation, the Data Act applies directly in all 27 member states —
          without requiring national transposition. It becomes fully applicable on{" "}
          <strong>12 September 2025</strong>.
          <SourceRef id={2} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="Sep 2025" label="Full Application" />
          <StatCard value="IoT" label="Connected Products" />
          <StatCard value="EUR 0" label="Cloud Switch Fee from 2027" />
        </div>
        <p className="text-[#3a4a6b] text-sm leading-relaxed bg-sky-50 border border-sky-200 rounded-xl p-4">
          <strong>Important:</strong> The Data Act is the most comprehensive EU regulation for data access
          in the IoT economy. It affects manufacturers of smart products (vehicles, industrial machinery,
          household appliances), cloud providers, and any company that uses or shares IoT data.
        </p>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Deadlines">
        <div className="space-y-0">
          <TimelineItem
            date="23 Feb 2022"
            title="Commission Proposal"
            description="The EU Commission presents the Data Act draft as part of the European Data Strategy."
            done
          />
          <TimelineItem
            date="11 Jan 2024"
            title="Entry into Force"
            description="Regulation (EU) 2023/2854 officially enters into force. The 20-month transition period begins."
            done
          />
          <TimelineItem
            date="12 Sep 2025"
            title="Full Application"
            description="All provisions of the Data Act apply — IoT data access, B2B rules, unfair terms, cloud switching."
            active
          />
          <TimelineItem
            date="12 Sep 2026"
            title="Cloud Switching: Reduced Fees"
            description="Cloud providers must limit switching fees to the actual costs of the switch."
          />
          <TimelineItem
            date="12 Sep 2027"
            title="Cloud Switching: Zero Fees"
            description="Switching fees for cloud services are reduced to zero. Maximum switching duration: 45 days."
          />
        </div>
      </Section>

      {/* ═══════════════ 3. WHO IS AFFECTED ═══════════════ */}
      <Section id="betroffene" title="Who Is Affected?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The Data Act affects numerous actors in both the digital and physical economy:
        </p>
        <AccordionSection
          items={[
            {
              title: "IoT Manufacturers (Data Holders)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Manufacturers of connected products: industrial machinery, smart home devices, connected
                  vehicles, agricultural machinery, medical devices, wearables.
                  They must grant users access to generated data and design products so that
                  data access is technically straightforward (Data Access by Design).
                </p>
              ),
            },
            {
              title: "Users (Natural and Legal Persons)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Anyone who buys or uses a connected product receives an enforceable right
                  to access the data generated by that product — free of charge, without undue delay, and
                  in a machine-readable format. Users may also request that the data be shared
                  with third parties.
                </p>
              ),
            },
            {
              title: "Cloud/SaaS/Edge Providers",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  All providers of cloud computing, edge computing, and SaaS services must
                  facilitate switching for their customers: no lock-in strategies,
                  data portability in standard formats, and from 2027 onwards, no switching fees.
                </p>
              ),
            },
            {
              title: "B2B Data Recipients",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Companies that receive IoT data from users (e.g., workshops reading
                  vehicle data, or service providers analyzing machine data)
                  may only use this data for the agreed purpose — not for
                  competing products or to derive trade secrets.
                </p>
              ),
            },
            {
              title: "SME Protection",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  SMEs are protected against abusive data access demands. Unfair
                  contract terms in B2B data agreements are void. Data holders that
                  are micro-enterprises are exempt from the B2C data access obligation.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 4. IoT ACCESS ═══════════════ */}
      <Section id="iot-zugang" title="IoT Data Access: User Rights (Chapter II)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The centrepiece of the Data Act — users gain access to data from their connected devices:
        </p>
        <AccordionSection
          items={[
            {
              title: "Data Access by Design (Art. 3)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Connected products must be designed so that product data is directly, easily, securely,
                  and free of charge accessible to the user. Manufacturers must provide transparent
                  pre-purchase information: what data is generated, how access works,
                  and whether data is shared with third parties.
                </p>
              ),
            },
            {
              title: "Data Holder Access Obligation (Art. 4–5)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The data holder (usually the manufacturer) must make product data available to the user
                  without undue delay, free of charge, and in a comprehensive, structured, commonly used,
                  and machine-readable format. The user may request that the data be transmitted to a
                  third party of their choice.
                </p>
              ),
            },
            {
              title: "Restrictions for Data Recipients (Art. 6)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Third parties that receive data from the user may only use it for the agreed purpose.
                  Prohibited: use for developing a competing connected product, profiling,
                  or sharing with additional third parties without consent.
                </p>
              ),
            },
            {
              title: "Trade Secret Protection (Art. 4(6)–(8))",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Trade secrets must be preserved. The data holder may require reasonable
                  technical protective measures. In exceptional cases, access to
                  certain data may be restricted if disclosure would cause serious economic
                  damage through the loss of trade secrets.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 5. B2B ═══════════════ */}
      <Section id="b2b-sharing" title="B2B Data Sharing (Chapter III)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The Data Act establishes rules for mandatory data sharing between businesses:
        </p>
        <AccordionSection
          items={[
            {
              title: "FRAND Terms",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  When the data holder must share data with third parties (at the user&apos;s request),
                  they may charge reasonable compensation — on <strong>FRAND terms</strong>
                  (Fair, Reasonable And Non-Discriminatory). The compensation must not exceed the costs of
                  provision plus a reasonable margin.
                </p>
              ),
            },
            {
              title: "Special SME Conditions",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  If the data recipient is an SME, charges may not exceed the direct
                  costs of provision — no margin for SME recipients. The EU Commission
                  will publish model contract terms for B2B data sharing.
                  <SourceRef id={3} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "No Gatekeeper Data Access",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Gatekeepers within the meaning of the Digital Markets Act (Art. 2(8) DMA) may not be
                  designated as data recipients. This prevents Big Tech from gaining
                  additional data access through the Data Act.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 6. UNFAIR TERMS ═══════════════ */}
      <Section id="unfaire-klauseln" title="Unfair Contract Terms (Chapter IV)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The Data Act protects SMEs against one-sided B2B data contracts:
        </p>
        <AccordionSection
          items={[
            {
              title: "Per-se Unfair Terms (Black List)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Automatically void are clauses that: (1) exclude liability of the data-granting
                  party for intentional or grossly negligent conduct, (2) exclude
                  remedies for non-performance, (3) grant the data-granting
                  party the right to unilaterally interpret or modify the data.
                </p>
              ),
            },
            {
              title: "Presumption of Unfairness (Grey List)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Clauses presumed unfair include those that: unreasonably restrict data access,
                  stipulate excessively long notice periods, contain unilateral modification rights, or
                  result in disproportionate shifts in liability. These may be rebutted on a
                  case-by-case basis.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 7. CLOUD SWITCHING ═══════════════ */}
      <Section id="cloud-switching" title="Cloud Switching & Interoperability (Chapter VI)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The Data Act puts an end to cloud lock-in and establishes portability:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="45 Days" label="Max. Switching Duration" />
          <StatCard value="EUR 0" label="Switching Fee from Sep 2027" />
          <StatCard value="30 Days" label="Free Parallel Access" />
        </div>
        <AccordionSection
          items={[
            {
              title: "Right to Switch & Data Portability",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Customers have the right to switch from one cloud/SaaS/edge provider to another.
                  The departing provider must export all data, applications, and digital
                  assets — in an interoperable, machine-readable standard format.
                  The maximum timeframe for the switch is 45 days.
                </p>
              ),
            },
            {
              title: "Fee Reduction & Elimination",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  <strong>From Sep 2025:</strong> Switching fees must be transparent and stated
                  in the contract.<br />
                  <strong>From Sep 2026:</strong> Fees may only cover the direct costs of the switch
                  (no margin).<br />
                  <strong>From Sep 2027:</strong> Switching fees are completely abolished (EUR 0).
                </p>
              ),
            },
            {
              title: "Functional Equivalence",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Cloud providers must support customers in achieving functional equivalence with the new
                  provider. Open standards and APIs must be used to ensure
                  data portability and application compatibility.
                </p>
              ),
            },
            {
              title: "Multi-Cloud & Parallel Access",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Cloud providers must not impede parallel operation across multiple providers.
                  During the switch, the departing provider must grant at least 30 days of free
                  access to the service (transition phase).
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 8. GOVERNMENT ACCESS ═══════════════ */}
      <Section id="behoerden" title="Government Data Access in Emergencies (Chapter V)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Public bodies may request access to private data under certain conditions:
        </p>
        <AccordionSection
          items={[
            {
              title: "Exceptional Circumstances",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Authorities may only request data access in cases of: (1) public emergencies (pandemics,
                  natural disasters), (2) necessity for the fulfilment of statutory tasks where no
                  other means are available. Routine data access is expressly not
                  envisaged.
                </p>
              ),
            },
            {
              title: "Proportionality & Purpose Limitation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The data request must be proportionate — only the minimum necessary data
                  may be requested. The data may be used exclusively for the stated purpose
                  and must be deleted once the purpose has been fulfilled.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 9. ENFORCEMENT ═══════════════ */}
      <Section id="durchsetzung" title="Enforcement & Penalties">
        <AccordionSection
          items={[
            {
              title: "National Enforcement Authorities",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Each member state designates competent authorities for enforcement. These may
                  launch investigations, order corrective measures, and impose fines.
                  The specific penalty amounts are determined by the member states — they
                  must be effective, proportionate, and dissuasive.
                </p>
              ),
            },
            {
              title: "Dispute Resolution",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Disputes over data access can be brought before a certified dispute resolution body.
                  This offers a faster and more cost-effective alternative to litigation.
                  The ordinary judicial route also remains available.
                </p>
              ),
            },
            {
              title: "Interoperability Oversight",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  For cloud switching and interoperability, market surveillance authorities monitor
                  compliance. The EU Commission may adopt implementing acts on technical standards
                  and interoperability specifications.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 10. AUSTRIA & DACH ═══════════════ */}
      <Section id="oesterreich" title="Data Act in Austria & DACH">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          As an EU regulation, the Data Act applies directly — but national implementation concerns
          the authority structure:
        </p>
        <AccordionSection
          items={[
            {
              title: "Austria: Competent Authorities",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Austria must designate a competent authority for Data Act enforcement.
                  For the data protection component, the DSB (Data Protection Authority) remains responsible.
                  For cloud switching and interoperability, the RTR or
                  a market surveillance authority is expected to be designated.
                </p>
              ),
            },
            {
              title: "Germany: BNetzA and BfDI",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  In Germany, responsibility is expected to be divided between the BfDI
                  (Federal Commissioner for Data Protection) for personal data, and the
                  Bundesnetzagentur (Federal Network Agency) for cloud switching and interoperability.
                </p>
              ),
            },
            {
              title: "Impact on the DACH Industry",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The DACH region, with its strong industrial and mechanical engineering tradition, is
                  particularly affected. Manufacturers of industrial machinery (Siemens, ABB, TRUMPF)
                  and IoT systems must implement Data Access by Design. The cloud
                  switching rules affect all SaaS and cloud providers.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 11. INTERPLAY ═══════════════ */}
      <Section id="zusammenspiel" title="Interplay with Other EU Laws">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The Data Act is part of the EU Data Strategy and complements existing regulations:
        </p>
        <AccordionSection
          items={[
            {
              title: "GDPR — Data Protection",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The Data Act does not affect the GDPR — all GDPR requirements continue to apply
                  to personal data. When IoT data is personal (e.g., vehicle data
                  of an identifiable driver), data access requires a GDPR legal basis.
                  <SourceRef id={4} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "AI Act — Training Data",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  IoT data made accessible through the Data Act can be used for AI training
                  — provided the user consents and the AI Act requirements (data quality,
                  documentation) are met.
                </p>
              ),
            },
            {
              title: "DPP / ESPR — Product Data",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The Digital Product Passport (DPP) captures product characteristics; the Data Act covers
                  usage data. Both complement each other: DPP for static product information,
                  Data Act for dynamic usage data.
                </p>
              ),
            },
            {
              title: "Data Governance Act (DGA)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The DGA governs the re-use of public data and data altruism;
                  the Data Act governs private data access. Together they form the EU Data Strategy.
                  <SourceRef id={5} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 12. ROADMAP ═══════════════ */}
      <Section id="fahrplan" title="Compliance Roadmap">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The Data Act applies from September 2025 — companies must act now:
        </p>
        <AccordionSection
          items={[
            {
              title: "IoT Manufacturers: Data Access by Design",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Assess what data your connected products generate. Implement
                  secure data access interfaces (APIs). Update product information
                  (what data, how accessible, to whom shared). Adapt terms of use
                  to Data Act requirements.
                </p>
              ),
            },
            {
              title: "Cloud Providers: Switching & Portability",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Review your contracts for lock-in clauses. Implement
                  data export functionality in standard formats. Plan the fee reduction
                  (cost-covering from 2026, free from 2027). Document the switching process
                  transparently.
                </p>
              ),
            },
            {
              title: "B2B Data Users: Adapt Contracts",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Review existing B2B data contracts for unfair terms. Ensure
                  that compensation is FRAND-compliant. Document data access requests and
                  their processing.
                </p>
              ),
            },
            {
              title: "All Companies: Inventory Assessment",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Identify your role in the Data Act ecosystem (data holder, user,
                  recipient, cloud provider). Assess which data flows are affected by the Data Act.
                  Clarify trade secret protection for sensitive data.
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
              title: "As a machinery manufacturer, must I disclose all sensor data?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  You must grant the user access to the data generated by their specific device.
                  Aggregated data from multiple users or purely internal processing data
                  (e.g., software algorithms) are not covered. Trade secrets can
                  be protected — but not used as an excuse for a blanket refusal of access.
                </p>
              ),
            },
            {
              title: "Can my cloud provider refuse to let me switch?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  No. From September 2025, you have a statutory right to cloud switching.
                  The provider must actively assist: data export, API access for the new
                  provider, 30 days of parallel access. Contract clauses that impede switching
                  are void.
                </p>
              ),
            },
            {
              title: "How does the Data Act relate to the GDPR for smart home data?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Smart home data is often personal (movement patterns, energy consumption).
                  The Data Act gives you the right to data access — the GDPR additionally governs
                  how this data may be processed. Both apply in parallel.
                </p>
              ),
            },
            {
              title: "Does the Data Act also apply to software without an IoT connection?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The IoT data access rights (Chapter II/III) apply only to data from connected
                  products. However, cloud switching (Chapter VI) and the unfair contract terms
                  (Chapter IV) apply to all cloud/SaaS services — even without an IoT connection.
                </p>
              ),
            },
            {
              title: "What happens if my IoT provider is based outside the EU?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The Data Act applies to connected products placed on the EU market
                  — regardless of where the manufacturer is based. Non-EU manufacturers must
                  appoint an authorised representative in the EU.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════════ RELATED REGULATIONS ═══════════════════ */}
      <RelatedGuides currentGuide="data-act" accent="#0f766e" />

      {/* ═══════════════ TOOL RECOMMENDATION ═══════════════ */}
      <ToolRecommendation regulationKey="data-act" accent={ACCENT} />

      {/* ═══════════════ SOURCES ═══════════════ */}
      <Section id="quellen" title="Sources & Further Reading">
        <SourceList sources={sources} />
      </Section>
    </GuidePageLayout>
  );
}
