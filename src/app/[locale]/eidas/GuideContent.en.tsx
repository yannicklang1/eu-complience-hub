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
    title: "Regulation (EU) 2024/1183 — eIDAS 2.0 (Full Text)",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1183",
    desc: "Official full text of the eIDAS 2.0 amending regulation",
    type: "Verordnung",
  },
  {
    id: 2,
    title: "EU Commission — European Digital Identity",
    url: "https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/europe-fit-digital-age/european-digital-identity_en",
    desc: "Official EU Commission information page on EU Digital Identity",
    type: "Behörde",
  },
  {
    id: 3,
    title: "ID Austria — Digital Identity Austria",
    url: "https://www.oesterreich.gv.at/id-austria.html",
    desc: "Austria's electronic identity credential as an eIDAS precursor",
    type: "Behörde",
  },
  {
    id: 4,
    title: "EU Digital Identity Wallet — Architecture Reference Framework",
    url: "https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework",
    desc: "Technical architecture and reference framework for the EU Digital Identity Wallet",
    type: "Technisch",
  },
  {
    id: 5,
    title: "ETSI — Qualified Trust Services Standards",
    url: "https://www.etsi.org",
    desc: "European standards for electronic signatures and trust services",
    type: "Norm",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Overview" },
  { id: "timeline", label: "Timeline & Deadlines" },
  { id: "wallet", label: "EU Digital Identity Wallet" },
  { id: "betroffene", label: "Who Is Affected?" },
  { id: "akzeptanz", label: "Acceptance Obligations" },
  { id: "trust-services", label: "Qualified Trust Services" },
  { id: "datenschutz", label: "Data Protection & Selective Disclosure" },
  { id: "oesterreich", label: "eIDAS in Austria (ID Austria)" },
  { id: "durchsetzung", label: "Enforcement & Sanctions" },
  { id: "zusammenspiel", label: "Interaction with Other Laws" },
  { id: "fahrplan", label: "Compliance Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Entry into Force", value: "20 May 2024" },
  { label: "Wallet Mandate", value: "From 2026/2027" },
  { label: "Applies to", value: "Platforms & Banks" },
  { label: "EU-wide", value: "Mutual Recognition" },
  { label: "Standard", value: "ISO 18013-5 / SD-JWT" },
  { label: "AT Precursor", value: "ID Austria" },
];

/* ─────────────────── Accent ─────────────────── */
const ACCENT = "#0891b2";

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

function TimelineItem({
  date, title, description, active = false, done = false,
}: { date: string; title: string; description: React.ReactNode; active?: boolean; done?: boolean }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "bg-[#0891b2] border-[#0891b2]" : active ? "bg-white border-[#0891b2] ring-4 ring-cyan-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done ? "text-[#0891b2]" : active ? "text-[#0891b2]" : "text-[#7a8db0]"}`}>
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
      title="eIDAS 2.0 – EU Digital Identity"
      subtitle="The EU Digital Identity Wallet is coming: acceptance obligations for platforms, banks, and public authorities."
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      regulationKey="eidas"
      href="/eidas"
    >
      {/* ═══════════════ 1. OVERVIEW ═══════════════ */}
      <Section id="ueberblick" title="Overview: What Is eIDAS 2.0?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          <strong>eIDAS 2.0</strong> — Regulation (EU) 2024/1183 — is the fundamental revision
          of the EU regulation on electronic identification and trust services. At its core:
          Every EU citizen is to receive an <strong>EU Digital Identity Wallet (EUDIW)</strong> — a
          smartphone app that digitally stores ID cards, driving licences, diplomas, health data,
          and more.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The original eIDAS Regulation (910/2014) harmonised electronic signatures and
          trust services, but for electronic identification it only provided for
          mutual recognition of national systems. eIDAS 2.0 goes radically further:
          the EU Wallet becomes a universal digital identity — mandatorily accepted by
          platforms, banks, telecom providers, and public authorities.
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          For businesses, this means: anyone offering online services must accept the EU Wallet as
          an identification method — including age verification, KYC processes, and
          proof of qualifications.
          <SourceRef id={2} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="450 M" label="EU Citizens with Wallet Right" />
          <StatCard value="2026/27" label="Wallet Rollout" />
          <StatCard value="100 %" label="Free for Citizens" />
        </div>
        <p className="text-[#3a4a6b] text-sm leading-relaxed bg-cyan-50 border border-cyan-200 rounded-xl p-4">
          <strong>Important:</strong> The regulation entered into force on 20 May 2024. Member States
          have 24 months (until May 2026) to build the wallet infrastructure. Acceptance obligations
          for businesses follow in phases. Austria&apos;s ID Austria is a direct precursor.
        </p>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Deadlines">
        <div className="space-y-0">
          <TimelineItem
            date="20 May 2024"
            title="Entry into Force of eIDAS 2.0"
            description="Regulation (EU) 2024/1183 enters into force. Implementing acts are being prepared."
            done
          />
          <TimelineItem
            date="Nov 2024"
            title="Technical Specifications"
            description="EU Commission adopts first implementing acts: wallet architecture, security standards, interoperability protocol."
            done
          />
          <TimelineItem
            date="May 2026"
            title="Wallet Rollout"
            description="Member States must offer at least one EU Digital Identity Wallet free of charge."
            active
          />
          <TimelineItem
            date="2026/2027"
            title="Acceptance Obligations Phase 1"
            description="Public administration, very large online platforms (VLOPs), and banks must accept the EU Wallet."
          />
          <TimelineItem
            date="2027/2028"
            title="Acceptance Obligations Phase 2"
            description="Extension to telecoms, healthcare, transport, and education sectors. Electronic Attestations of Attributes (EAA) become widely available."
          />
        </div>
      </Section>

      {/* ═══════════════ 3. WALLET ═══════════════ */}
      <Section id="wallet" title="EU Digital Identity Wallet (EUDIW)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The wallet is the centrepiece of eIDAS 2.0 — a secure app on the smartphone:
          <SourceRef id={4} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Person Identification Data (PID)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The wallet stores core identity data: first and last name, date of birth,
                  nationality, and a unique identifier. This data is issued by the Member State
                  and has the same legal effect as a physical ID document.
                </p>
              ),
            },
            {
              title: "Electronic Attestations of Attributes (EAA)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Beyond the basic identity, attributes can be attested:
                  <strong> driving licence</strong> (mDL), <strong>diplomas and qualifications</strong>,
                  <strong> health data</strong> (ePrescriptions, vaccination certificates),
                  <strong> company affiliation</strong>, and <strong>bank details</strong>.
                  Qualified EAAs have the same legal effect as officially issued documents.
                </p>
              ),
            },
            {
              title: "Qualified Electronic Signatures (QES)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The wallet enables qualified electronic signatures — free of charge for
                  natural persons. QES have the same legal effect as handwritten
                  signatures. Businesses can handle contracts, applications, and documents
                  entirely digitally.
                </p>
              ),
            },
            {
              title: "Technical Architecture",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The wallet is based on a standardised architecture: <strong>ISO 18013-5</strong>
                  (Mobile Driving Licence), <strong>SD-JWT</strong> (Selective Disclosure JWT),
                  <strong> OpenID4VP/OpenID4VCI</strong> (Verifiable Credentials exchange).
                  Cryptographic security at hardware level (Secure Element or TEE).
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 4. WHO IS AFFECTED ═══════════════ */}
      <Section id="betroffene" title="Who Is Affected?">
        <AccordionSection
          items={[
            {
              title: "Public Administration",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  All public bodies must accept the EU Wallet as an identification method.
                  E-government services, administrative procedures, and public procurement
                  must be wallet-compatible.
                </p>
              ),
            },
            {
              title: "Banks & Financial Service Providers",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  For KYC processes (Know Your Customer) and account openings, the EU Wallet
                  must be accepted as an identification method. The wallet can replace
                  video identification and postal identification procedures.
                </p>
              ),
            },
            {
              title: "Very Large Online Platforms (VLOPs)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Very Large Online Platforms (VLOPs as defined by the DSA, 45 million+ users in the EU)
                  must offer the EU Wallet as a login and verification option. Also relevant for
                  age verification.
                </p>
              ),
            },
            {
              title: "Telecommunications Providers",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Telecom companies must accept the wallet for prepaid SIM card registration
                  and contract conclusions. The eIDAS Wallet replaces the ID card
                  scan in the shop.
                </p>
              ),
            },
            {
              title: "Healthcare & Education",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Healthcare providers accept the wallet for patient identification
                  and electronic prescriptions (synergies with EHDS). Educational institutions for
                  enrolments and digital certificates/diplomas.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 5. ACCEPTANCE ═══════════════ */}
      <Section id="akzeptanz" title="Acceptance Obligations for Businesses">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Businesses in regulated sectors must integrate the EU Wallet as an identification option:
        </p>
        <AccordionSection
          items={[
            {
              title: "Relying Party: What Does It Mean?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  A &quot;Relying Party&quot; is a service that uses wallet data for identification or
                  attribute verification. Relying Parties must register, declare their
                  data requirements, and may only request the minimum necessary data.
                  Registration takes place with the national supervisory authority.
                </p>
              ),
            },
            {
              title: "Technical Integration",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Integration is carried out via standardised protocols: OpenID4VP for
                  credential presentation, OpenID4VCI for issuance. SDKs and
                  reference implementations are provided by the EU. Most
                  identity verification providers (IDnow, Veriff, Jumio) will offer wallet integration.
                </p>
              ),
            },
            {
              title: "Costs & Implementation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  For most businesses, integration will run through existing identity providers.
                  Estimated costs: EUR 10,000–50,000 for initial integration at
                  mid-sized platforms. Large enterprises with their own IAM: EUR 100,000–500,000.
                  EU Wallet verification is fundamentally free of charge for Relying Parties.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 6. TRUST SERVICES ═══════════════ */}
      <Section id="trust-services" title="Qualified Trust Services">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          eIDAS 2.0 expands the range of qualified trust services:
          <SourceRef id={5} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Electronic Signatures & Seals",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Qualified electronic signatures (QES) for natural persons and
                  qualified electronic seals for legal persons retain their
                  legal effect. New: free QES via the EU Wallet for all citizens.
                </p>
              ),
            },
            {
              title: "Electronic Attestations (New)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  New trust service category: Qualified Electronic Attestations of Attributes
                  (QEAA). Reliable digital proof of qualifications, authorisations, or
                  properties — issued by qualified trust service providers.
                </p>
              ),
            },
            {
              title: "Electronic Archiving (New)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  New qualified service for the long-term preservation of electronic
                  documents and signatures. Ensures the evidentiary value of electronically signed
                  documents over decades.
                </p>
              ),
            },
            {
              title: "Electronic Ledgers (New)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  New qualified service for electronic registers (blockchain-based
                  or conventional). Enables legally secure records of transactions,
                  transfers of ownership, and timestamps.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 7. DATA PROTECTION ═══════════════ */}
      <Section id="datenschutz" title="Data Protection & Selective Disclosure">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          eIDAS 2.0 contains strong data protection guarantees — stronger than many previous identity solutions:
        </p>
        <AccordionSection
          items={[
            {
              title: "Selective Disclosure",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Users can selectively share only the attributes that a service requires.
                  Example: an online shop asks for the user&apos;s age — the wallet confirms only
                  &quot;over 18&quot;, without disclosing the name, address, or date of birth.
                </p>
              ),
            },
            {
              title: "Unlinkability",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The wallet prevents different services from correlating a citizen&apos;s usage.
                  Different transactions should not be linkable to each other — no
                  &quot;super cookie&quot; for digital identity.
                </p>
              ),
            },
            {
              title: "Dashboard & Transparency",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The wallet includes a dashboard that shows the user: who queried which data
                  and when? Which attributes were shared? The user retains full
                  control over their digital identity.
                </p>
              ),
            },
            {
              title: "GDPR Compliance",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The wallet architecture is GDPR-compliant by design: data minimisation (Selective
                  Disclosure), purpose limitation (registered Relying Parties), transparency (dashboard),
                  user control (consent per transaction). Wallet data is stored locally on the
                  device, not centrally.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 8. AUSTRIA ═══════════════ */}
      <Section id="oesterreich" title="eIDAS in Austria: ID Austria as the Foundation">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Austria, with <strong>ID Austria</strong> (successor to the Handy-Signatur), already has
          one of the most advanced eID infrastructures in the EU:
          <SourceRef id={3} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "ID Austria as a Precursor",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  ID Austria already enables digital identification, qualified electronic
                  signatures, and e-government access. Over 4 million Austrians use ID Austria.
                  The system will be further developed into the EU Digital Identity Wallet.
                </p>
              ),
            },
            {
              title: "Migration to the EU Wallet",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Austria plans to seamlessly transition ID Austria into the EU Wallet. Existing
                  ID Austria users are expected to automatically gain access to the enhanced wallet.
                  The technical migration includes: wallet app update, credential migration, and
                  new attributes (driving licence, health data).
                </p>
              ),
            },
            {
              title: "Germany: AusweisApp2 & BundID",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Germany has a comparable starting position with AusweisApp2 (online ID function of
                  the national identity card) and BundID (unified citizen account). Integration
                  into the EU Wallet is proceeding in parallel. Adoption has been lower
                  than in Austria so far.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 9. ENFORCEMENT ═══════════════ */}
      <Section id="durchsetzung" title="Enforcement & Sanctions">
        <AccordionSection
          items={[
            {
              title: "National Supervisory Authorities",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Each Member State designates a supervisory authority for trust services and
                  the wallet infrastructure. In Austria, this is the RTR. Qualified
                  trust service providers are regularly audited.
                </p>
              ),
            },
            {
              title: "Sanctions Framework",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Sanctions are determined by the Member States and must be effective,
                  proportionate, and dissuasive. Trust service providers that fail to meet
                  quality requirements may lose their qualified status.
                  Businesses that refuse wallet acceptance may be sanctioned.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 10. INTERACTION WITH OTHER LAWS ═══════════════ */}
      <Section id="zusammenspiel" title="Interaction with Other EU Laws">
        <AccordionSection
          items={[
            {
              title: "GDPR — Data Protection",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The EU Wallet is GDPR-compliant by design. Selective Disclosure and local
                  data storage minimise data protection risks. The processing of wallet data
                  by Relying Parties is fully subject to the GDPR.
                </p>
              ),
            },
            {
              title: "DSA — Age Verification",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  VLOPs must protect minors (Art. 28 DSA). The EU Wallet offers
                  privacy-friendly age verification: confirmation of &quot;over 18&quot; without
                  disclosing the date of birth. This resolves the previous dilemma between
                  youth protection and data minimisation.
                </p>
              ),
            },
            {
              title: "AML / KYC — Anti-Money Laundering",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The EU Wallet can revolutionise KYC processes (Know Your Customer) in the
                  financial industry: instant, verified identity checks without video identification.
                  Integration into existing AML compliance systems is possible.
                </p>
              ),
            },
            {
              title: "EHDS — Health Data",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The EU Wallet can serve as patient identification within the EHDS. Electronic
                  prescriptions and health attributes can be shared cross-border
                  via the wallet.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 11. COMPLIANCE ROADMAP ═══════════════ */}
      <Section id="fahrplan" title="Compliance Roadmap">
        <AccordionSection
          items={[
            {
              title: "Obligated Sectors: Prepare Now",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Banks, telecom companies, VLOPs, and public administration: assess which
                  processes are affected by the EU Wallet (KYC, age verification, login).
                  Evaluate identity verification providers for wallet readiness. Budget
                  for the technical integration.
                </p>
              ),
            },
            {
              title: "Online Services: Wallet as a Login Option",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Plan the EU Wallet as an additional login option alongside existing methods.
                  Integration is carried out via standardised APIs (OpenID4VP). Test with
                  the EU reference wallets, which are available as open source.
                </p>
              ),
            },
            {
              title: "Trust Service Providers: New Services",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Evaluate new business opportunities: Qualified Attestations (QEAA),
                  electronic archiving, and ledger services. Qualification is carried out through
                  the national supervisory authority.
                </p>
              ),
            },
            {
              title: "All Businesses: Leverage Digital Signatures",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Examine which processes can be digitised using QES: contracts,
                  orders, HR documents, meeting minutes. Free QES via the EU Wallet
                  significantly lowers the entry barrier.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 12. FAQ ═══════════════ */}
      <Section id="faq" title="Frequently Asked Questions (FAQ)">
        <AccordionSection
          items={[
            {
              title: "Do I have to accept the EU Wallet as a login method?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Only if you operate in an obligated sector (public administration,
                  banks, telecoms, VLOPs). Other online services can integrate the wallet voluntarily
                  — but it is expected that the wallet will become the de facto standard.
                </p>
              ),
            },
            {
              title: "Can the EU Wallet replace my ID card?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Yes, the PID (Person Identification Data) in the wallet has the same legal effect
                  as a physical ID document — for online transactions. For physical border controls,
                  the physical ID remains required for now, but pilot projects are planned
                  in this area as well.
                </p>
              ),
            },
            {
              title: "What happens to ID Austria?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  ID Austria will be transitioned into the EU Wallet. Existing functions (e-government,
                  QES) will be retained and extended (driving licence, health data,
                  cross-border use). For users, the transition should be seamless.
                </p>
              ),
            },
            {
              title: "How secure is the EU Wallet?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The wallet uses hardware-based security (Secure Element or Trusted
                  Execution Environment). Cryptographic keys never leave the device.
                  The architecture is regularly audited. The security level is higher than
                  that of conventional username/password systems or social login.
                </p>
              ),
            },
            {
              title: "Can businesses offer their own wallets?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  No. The EU Wallet is provided by the Member States (or by
                  commissioned providers). However, private wallet providers can act as qualified
                  trust service providers to issue EAAs or offer wallet infrastructure services.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════════ RELATED REGULATIONS ═══════════════════ */}
      <RelatedGuides currentGuide="eidas" accent="#0e7490" />

      {/* ═══════════════ TOOL RECOMMENDATION ═══════════════ */}
      <ToolRecommendation regulationKey="eidas" accent={ACCENT} />

      {/* ═══════════════ SOURCES ═══════════════ */}
      <Section id="quellen" title="Sources & Further Reading">
        <SourceList sources={sources} />
      </Section>
    </GuidePageLayout>
  );
}
