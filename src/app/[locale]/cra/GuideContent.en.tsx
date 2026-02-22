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
    title: "Regulation (EU) 2024/2847 — Cyber Resilience Act (Full Text)",
    url: "https://eur-lex.europa.eu/eli/reg/2024/2847/oj/deu",
    desc: "Official German version on the EUR-Lex portal",
    type: "Regulation",
  },
  {
    id: 2,
    title: "CRA — English Version",
    url: "https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng",
    desc: "Official English version on the EUR-Lex portal",
    type: "Regulation",
  },
  {
    id: 3,
    title: "EU Commission — Cyber Resilience Act",
    url: "https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act",
    desc: "Background information, FAQ and factsheets from the EU Commission",
    type: "Authority",
  },
  {
    id: 4,
    title: "ENISA — Vulnerability Reporting Platform",
    url: "https://www.enisa.europa.eu",
    desc: "European Union Agency for Cybersecurity — central reporting platform",
    type: "EU Authority",
  },
  {
    id: 5,
    title: "Directive (EU) 2024/2853 — Product Liability",
    url: "https://eur-lex.europa.eu/eli/dir/2024/2853/oj/deu",
    desc: "New EU Product Liability Directive — now extends to software",
    type: "Directive",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Overview" },
  { id: "timeline", label: "Timeline & Deadlines" },
  { id: "betroffene", label: "Who Is Affected?" },
  { id: "kategorien", label: "Product Categories" },
  { id: "hersteller", label: "Manufacturer Obligations" },
  { id: "importeure", label: "Importers & Distributors" },
  { id: "sbom", label: "SBOM & Updates" },
  { id: "schwachstellen", label: "Vulnerability Reporting" },
  { id: "konformitaet", label: "CE & Conformity" },
  { id: "opensource", label: "Open Source" },
  { id: "strafen", label: "Penalties" },
  { id: "zusammenspiel", label: "Interplay with NIS2 & Co." },
  { id: "fahrplan", label: "Compliance Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Penalty", value: "\u20AC15M or 2.5%" },
  { label: "Main Deadline", value: "11 December 2027" },
  { label: "Reporting Obligation", value: "From 11 Sep 2026" },
  { label: "Regulation Type", value: "EU Regulation (direct)" },
  { label: "SBOM Requirement", value: "Yes (machine-readable)" },
  { label: "Update Obligation", value: "Min. 5 years" },
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
  accent = "#8b5cf6",
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
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "bg-[#8b5cf6] border-[#8b5cf6]" : active ? "bg-white border-[#8b5cf6] ring-4 ring-violet-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done ? "text-[#8b5cf6]" : active ? "text-[#8b5cf6]" : "text-[#7a8db0]"}`}>
          {date} {done && "\u2713"}
        </span>
        <h3 className="font-[Syne] font-bold text-[#060c1a] mt-0.5">{title}</h3>
        <p className="text-[#3a4a6b] text-sm mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ─────────────────── Product Category Card ─────────────────── */
function CategoryCard({
  level,
  color,
  title,
  description,
  examples,
  assessment,
}: {
  level: string;
  color: string;
  title: string;
  description: string;
  examples: string[];
  assessment: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-[#d8dff0] bg-white overflow-hidden"
    >
      <div className="h-1.5" style={{ background: color }} />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: color }}>
            {level}
          </span>
          <h3 className="font-[Syne] font-bold text-[#060c1a]">{title}</h3>
        </div>
        <p className="text-[#3a4a6b] text-sm leading-relaxed mb-4">{description}</p>
        <div className="mb-4">
          <h4 className="text-xs font-bold text-[#7a8db0] uppercase tracking-wider mb-2">Examples</h4>
          <div className="flex flex-wrap gap-1.5">
            {examples.map((ex) => (
              <span key={ex} className="px-2.5 py-1 bg-[#f4f6fc] text-[#3a4a6b] text-xs rounded-lg">{ex}</span>
            ))}
          </div>
        </div>
        <div className="pt-3 border-t border-[#d8dff0]">
          <span className="text-xs font-medium text-[#7a8db0]">Conformity Assessment: </span>
          <span className="text-xs font-bold" style={{ color }}>{assessment}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────── Obligation Card ─────────────────── */
function ObligationCard({
  icon,
  title,
  items,
}: {
  icon: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-[Syne] font-bold text-[#060c1a]">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
            <span className="text-[#8b5cf6] mt-0.5 shrink-0">&bull;</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────── Reporting Step ─────────────────── */
function ReportingStep({
  icon,
  time,
  title,
  description,
}: {
  icon: string;
  time: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#d8dff0]">
      <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-2xl shrink-0">
        {icon}
      </div>
      <div>
        <div className="font-mono text-xs font-bold text-[#8b5cf6] mb-1">{time}</div>
        <h3 className="font-[Syne] font-bold text-[#060c1a] text-sm">{title}</h3>
        <p className="text-[#3a4a6b] text-sm mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════
   GUIDE CONTENT
   ══════════════════════════════════════════════════════ */

export default function GuideContentEN() {
  return (
    <GuidePageLayout
      title="Cyber Resilience Act"
      subtitle="Security by Design for all products with digital elements — from IoT devices to enterprise software"
      regulationKey="Regulation (EU) 2024/2847"
      accent="#8b5cf6"
      tocItems={tocItems}
      quickFacts={quickFacts}
      trustBadge={{ lastReview: "18.02.2026", sourceCount: 5 }}
      href="/cra"
    >
      {/* ═══════════════ 1. OVERVIEW ═══════════════ */}
      <Section id="ueberblick" title="What Is the Cyber Resilience Act?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The <strong>Cyber Resilience Act (CRA)</strong><SourceRef id={1} sources={sources} accent="#8b5cf6" /> is the first EU-wide horizontal regulation
          that introduces mandatory cybersecurity requirements for <strong>all products with digital elements</strong>.
          Whether it is a smart home device, operating system, firewall or industrial control system — anyone placing
          such a product on the EU single market must demonstrate that it was <em>designed to be secure from the outset</em>.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard value="\u20AC15M" label="or 2.5% — max. penalty" />
          <StatCard value="Dec 2027" label="Main deadline" />
          <StatCard value="4" label="Product categories" />
          <StatCard value="5 Years" label="min. update obligation" />
        </div>

        <div className="rounded-2xl border border-violet-200 bg-violet-50/40 p-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 flex items-center gap-2">
            <span className="text-lg">{"\uD83D\uDD11"}</span> Key Takeaways
          </h3>
          <ul className="space-y-2 text-sm text-[#3a4a6b]">
            <li className="flex items-start gap-2">
              <span className="text-[#8b5cf6] mt-0.5">{"\u25B8"}</span>
              <span><strong>Horizontal regulation</strong> — applies directly across the EU, no national transposition required</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8b5cf6] mt-0.5">{"\u25B8"}</span>
              <span><strong>Covers hardware and software</strong> — every product with a digital component that has a data connection</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8b5cf6] mt-0.5">{"\u25B8"}</span>
              <span><strong>Lifecycle approach</strong> — obligations from development through distribution to end-of-life</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8b5cf6] mt-0.5">{"\u25B8"}</span>
              <span><strong>CE marking</strong> — no product may be sold without proof of conformity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8b5cf6] mt-0.5">{"\u25B8"}</span>
              <span><strong>Complements NIS2</strong> — <LawRef law="NIS2">NIS2</LawRef> secures organisations, CRA secures their products</span>
            </li>
          </ul>
        </div>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Deadlines">
        <p className="text-[#3a4a6b] text-sm leading-relaxed mb-8">
          The CRA was published in the Official Journal of the EU on 20 November 2024 and entered
          into force on 10 December 2024. The obligations take effect in stages:
        </p>

        <div className="space-y-0">
          <TimelineItem
            date="10 December 2024"
            title="Entry into Force"
            description="Publication in the Official Journal. 36-month transition period begins."
            done
          />
          <TimelineItem
            date="11 June 2026"
            title="Conformity Assessment Bodies"
            description="Notified bodies for third-party assessments must be operational. The EU Commission may adopt harmonised standards."
            active
          />
          <TimelineItem
            date="11 September 2026"
            title="Reporting Obligations Active"
            description="Manufacturers must report actively exploited vulnerabilities and severe security incidents to ENISA/CSIRTs within 24 hours."
          />
          <TimelineItem
            date="11 December 2027"
            title="Full Application"
            description="All obligations apply: Security by Design, SBOM, update obligation, CE marking. Products without conformity may no longer be placed on the market."
          />
          <TimelineItem
            date="Ongoing"
            title="Harmonised Standards"
            description={<>CEN/CENELEC are working on harmonised standards (EN standards). Until these are available, the requirements from <LawRef law="CRA" annex="I">Annex I</LawRef> apply directly.</>}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
          <p className="text-sm text-amber-900 flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">{"\u26A0\uFE0F"}</span>
            <span>
              <strong>Important:</strong> Products already placed on the market before 11 December 2027
              do not need to comply with the CRA retroactively — unless a substantial modification
              is made to the product. New product versions or major updates trigger CRA obligations.
            </span>
          </p>
        </div>
      </Section>

      {/* ═══════════════ 3. WHO IS AFFECTED ═══════════════ */}
      <Section id="betroffene" title="Who Is Affected?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The CRA defines <strong>four economic operators</strong>, each with their own obligations. The decisive
          factor is the role in which you place a product with digital elements on the EU market:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <ObligationCard
            icon="\uD83C\uDFED"
            title="Manufacturer"
            items={[
              "Bears primary responsibility for CRA conformity",
              "Must implement Security by Design (Annex I)",
              "Creates technical documentation + SBOM",
              "Conducts conformity assessment",
              "Provides security updates for at least 5 years",
              "Reports actively exploited vulnerabilities to ENISA",
            ]}
          />
          <ObligationCard
            icon="\uD83D\uDCE6"
            title="Importer"
            items={[
              "Verifies that the manufacturer has conducted the conformity assessment",
              "Ensures CE marking is present",
              "Checks availability of technical documentation",
              "Confirms contact details are on the product",
              "Informs the manufacturer if non-conformity is suspected",
            ]}
          />
          <ObligationCard
            icon="\uD83C\uDFEA"
            title="Distributor"
            items={[
              "Checks CE marking and EU declaration of conformity",
              "Verifies that manufacturer/importer are identifiable",
              "Informs market surveillance authorities of security risks",
              "Ensures proper storage and transport conditions",
            ]}
          />
          <ObligationCard
            icon="\u2699\uFE0F"
            title="Open-Source Steward"
            items={[
              "New role: Open-Source Software Steward",
              "Applies to legal persons that systematically support OS development",
              "Must document a cybersecurity policy",
              "Cooperates in vulnerability handling",
              "Lighter obligations than manufacturers (no CE marking)",
            ]}
          />
        </div>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 text-sm">What is a {"\u201Cproduct with digital elements\u201D"}?</h3>
          <p className="text-sm text-[#3a4a6b] leading-relaxed mb-4">
            Any hardware or software product that is directly or indirectly connected, or connectable, to a device or
            network. This also includes <strong>remote data processing solutions</strong> where they are necessary
            for the core functionality of the product (<LawRef law="CRA" article="3">Art. 3(1) CRA</LawRef>).
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "\uD83D\uDCF1", label: "Smart Devices" },
              { icon: "\uD83D\uDCBB", label: "Software & Apps" },
              { icon: "\uD83D\uDD10", label: "Firewalls & VPN" },
              { icon: "\uD83C\uDFE0", label: "Smart Home" },
              { icon: "\uD83E\uDD16", label: "Industrial IoT" },
              { icon: "\uD83C\uDFAE", label: "Game Consoles" },
              { icon: "\u231A", label: "Wearables" },
              { icon: "\uD83D\uDDC4\uFE0F", label: "Operating Systems" },
            ].map((item) => (
              <div key={item.label} className="text-center p-3 rounded-xl bg-[#f4f6fc]">
                <span className="text-xl">{item.icon}</span>
                <div className="text-xs text-[#3a4a6b] mt-1 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════ 4. PRODUCT CATEGORIES ═══════════════ */}
      <Section id="kategorien" title="Product Categories & Risk Classes">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The CRA classifies products into <strong>four categories</strong>. The higher the category,
          the stricter the conformity assessment. The majority of all products (~90%) fall under
          the default category with self-assessment.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <CategoryCard
            level="Default"
            color="#22c55e"
            title="Default Products"
            description="The vast majority of all products. The manufacturer can self-assess conformity (Module A — internal production control)."
            examples={["Smart TVs", "Wi-Fi enabled toys", "Speakers", "Photo apps", "Word processing software"]}
            assessment="Self-assessment (Module A)"
          />
          <CategoryCard
            level="Important Cl. I"
            color="#f59e0b"
            title="Important Products — Class I"
            description="Products with elevated risk. Self-assessment is possible if harmonised standards are applied — otherwise third-party assessment is required."
            examples={["Browsers", "Password managers", "VPN software", "Network management", "SIEM systems", "Boot managers"]}
            assessment="Self (with hEN) or third-party"
          />
          <CategoryCard
            level="Important Cl. II"
            color="#f97316"
            title="Important Products — Class II"
            description="Products with a high cybersecurity risk. Third-party conformity assessment is mandatory."
            examples={["Firewalls", "IDS/IPS systems", "Hypervisors", "Container runtime", "Microprocessors", "Industrial firewalls"]}
            assessment="Mandatory third-party assessment"
          />
          <CategoryCard
            level="Critical"
            color="#ef4444"
            title="Critical Products"
            description="Highest risk class. Products that are central to essential services and critical infrastructure. EU certification (EUCC) required."
            examples={["Smart meter gateways", "Smart cards", "Hardware security modules (HSM)", "Secure cryptographic devices"]}
            assessment="EU Cybersecurity Certification"
          />
        </div>

        <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50/40 p-5">
          <p className="text-sm text-[#3a4a6b] flex items-start gap-2">
            <span className="text-[#8b5cf6] mt-0.5">{"\uD83D\uDCA1"}</span>
            <span>
              <strong>Not covered by the CRA</strong> include, among others: medical devices (MDR/IVDR),
              motor vehicles (UNECE R155/R156), aviation (EASA regulations), military products,
              and SaaS solutions <em>without</em> an on-premise component. Purely non-commercial
              open-source software is also excluded.
            </span>
          </p>
        </div>
      </Section>

      {/* ═══════════════ 5. MANUFACTURER OBLIGATIONS ═══════════════ */}
      <Section id="hersteller" title="Manufacturer Obligations (Annex I)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          <LawRef law="CRA" annex="I">Annex I</LawRef> of the CRA defines the <strong>essential cybersecurity requirements</strong>.
          Manufacturers must fulfil these throughout the entire product lifecycle — from conception
          to end-of-life.
        </p>

        <AccordionSection
          items={[
            {
              title: "1. Security by Design & Default",
              content:
                "Products must be designed, developed and manufactured with an appropriate level of cybersecurity. The default configuration must be the most secure one (Secure by Default). No known exploitable vulnerabilities at the time of placing on the market. Access control, encryption and minimal attack surface are mandatory.",
            },
            {
              title: <span>2. Risk Assessment (<LawRef law="CRA" article="13" />)</span>,
              content:
                "A cybersecurity risk assessment must be carried out and documented before placing on the market. It must be updated whenever substantial changes are made to the product. The risk assessment feeds into planning, development, production and vulnerability handling.",
            },
            {
              title: <span>3. Technical Documentation (<LawRef law="CRA" article="31" />)</span>,
              content:
                "Comprehensive technical documentation must be prepared before placing on the market. It includes: product description, cybersecurity risk assessment, description of applied standards and solutions, SBOM, conformity assessment report. Must be retained for 10 years.",
            },
            {
              title: "4. Protection of Confidentiality (Data)",
              content:
                "Protection of the confidentiality of stored, transmitted and processed data (encrypted or otherwise). Protection of the integrity of all data, commands and configurations. Minimisation of data processing (data minimisation).",
            },
            {
              title: "5. Availability & Resilience",
              content:
                "Products must remain functional as far as possible even under adverse conditions (e.g. DoS attacks). Essential functions must not be restricted without reason. Recovery must be facilitated after an incident.",
            },
            {
              title: "6. Minimisation of Attack Surface",
              content:
                "Restrict external interfaces to what is necessary. Disable unused ports and protocols by default. Minimise hardware attack surfaces. Implement component isolation and access control.",
            },
            {
              title: "7. Secure Update Mechanism",
              content:
                "An automatic and secure update mechanism is mandatory. Updates must be provided for at least 5 years (or the expected product lifetime, if longer). Security updates must be free of charge and must be deliverable separately from feature updates.",
            },
            {
              title: <span>8. Vulnerability Handling (<LawRef law="CRA" annex="I">Annex I</LawRef> Part II)</span>,
              content:
                "Manufacturers must establish a documented process for identifying, documenting and remediating vulnerabilities. This includes: regular testing (penetration tests, reviews), coordinated vulnerability disclosure, a contact point for vulnerability reports and timely free-of-charge patches.",
            },
          ]}
        />
      </Section>

      {/* ═══════════════ 6. IMPORTERS & DISTRIBUTORS ═══════════════ */}
      <Section id="importeure" title="Obligations for Importers & Distributors">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Those who do not manufacture products themselves but place them on the EU market or distribute them
          also have <strong>their own due diligence obligations</strong>:
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-4 flex items-center gap-2">
              <span className="text-lg">{"\uD83D\uDCE6"}</span> Importers (<LawRef law="CRA" article="19" />)
            </h3>
            <ul className="space-y-3 text-sm text-[#3a4a6b]">
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">01</span>
                Only place conforming products on the market (verify the manufacturer has conducted the conformity assessment)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">02</span>
                Verify CE marking and EU declaration of conformity
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">03</span>
                Affix own name and contact address on the product or packaging
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">04</span>
                Inform the market surveillance authority if a product poses a cybersecurity risk
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">05</span>
                Retain technical documentation for 10 years and provide it upon request
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-4 flex items-center gap-2">
              <span className="text-lg">{"\uD83C\uDFEA"}</span> Distributors (<LawRef law="CRA" article="20" />)
            </h3>
            <ul className="space-y-3 text-sm text-[#3a4a6b]">
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">01</span>
                Before making available on the market: verify CE marking and safety information
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">02</span>
                Verify that manufacturer and importer are identifiable and contactable
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">03</span>
                If aware of non-conformity: do not make the product available or take corrective action
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">04</span>
                Inform the market surveillance authority about risks
              </li>
            </ul>

            <div className="mt-5 p-4 rounded-xl bg-violet-50/60 border border-violet-100">
              <p className="text-xs text-[#3a4a6b]">
                <strong>Caution:</strong> Importers and distributors who place a product on the market under
                their own name or brand, or make substantial modifications, are
                considered <strong>manufacturers</strong> and must fulfil all manufacturer obligations (<LawRef law="CRA" article="21">Art. 21 CRA</LawRef>).
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 7. SBOM & UPDATES ═══════════════ */}
      <Section id="sbom" title="SBOM Requirement & Update Obligations">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Two of the most impactful innovations of the CRA: the obligation to create
          a <strong>Software Bill of Materials</strong> and the legally enshrined <strong>update obligation</strong>.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 flex items-center gap-2">
              <span className="text-lg">{"\uD83D\uDCCB"}</span> Software Bill of Materials (SBOM)
            </h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed mb-4">
              Manufacturers must create and maintain a machine-readable SBOM documenting all top-level dependencies
              of the product (<LawRef law="CRA" article="13" absatz="5">Art. 13(5)</LawRef>, <LawRef law="CRA" annex="I">Annex I</LawRef> Part II No. 1).
            </p>
            <div className="space-y-2">
              {[
                "Machine-readable format (e.g. CycloneDX, SPDX)",
                "At least all top-level dependencies",
                "Must be regularly updated",
                "Part of the technical documentation",
                "Does not need to be public, but available upon request",
                "Facilitates vulnerability tracking (CVE matching)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
                  <span className="text-[#8b5cf6] mt-0.5">{"\u2713"}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 flex items-center gap-2">
              <span className="text-lg">{"\uD83D\uDD04"}</span> Update Obligation
            </h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed mb-4">
              Security updates must be provided for the entire support period —
              at least 5 years or the expected product lifetime, whichever is longer.
            </p>
            <div className="space-y-2">
              {[
                "Free-of-charge security updates — mandatory",
                "At least 5 years from placing on the market",
                "Automatic update mechanism required",
                "Security updates separate from feature updates",
                "Users must be informed about available updates",
                "End of support must be clearly communicated",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
                  <span className="text-[#8b5cf6] mt-0.5">{"\u2713"}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 8. VULNERABILITY REPORTING ═══════════════ */}
      <Section id="schwachstellen" title="Vulnerability & Incident Reporting">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          From <strong>11 September 2026</strong>, manufacturers must report actively exploited vulnerabilities
          and severe security incidents. Reporting is done via a central
          EU reporting platform operated by <strong>ENISA</strong><SourceRef id={4} sources={sources} accent="#8b5cf6" />.
        </p>

        <div className="space-y-4 mb-8">
          <ReportingStep
            icon="\uD83D\uDEA8"
            time="WITHIN 24 HOURS"
            title="Early Warning"
            description="Initial notification to ENISA and the responsible national CSIRT: which vulnerability, whether actively exploited, whether other products could be affected."
          />
          <ReportingStep
            icon="\uD83D\uDCCA"
            time="WITHIN 72 HOURS"
            title="Vulnerability Notification"
            description="Detailed description of the vulnerability: type, severity, affected versions, remediation status. Provisional countermeasures if applicable."
          />
          <ReportingStep
            icon="\uD83D\uDCDD"
            time="14 DAYS AFTER CORRECTIVE MEASURE"
            title="Final Report"
            description="Due 14 days after a corrective measure is available. Complete report including: root cause analysis, corrective measures taken and planned, spread of the vulnerability."
          />
        </div>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 text-sm">Who reports to whom?</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-[#f4f6fc]">
              <span className="text-2xl block mb-2">{"\uD83C\uDFED"}</span>
              <div className="text-xs font-bold text-[#060c1a] mb-1">Manufacturer</div>
              <div className="text-xs text-[#7a8db0]">Reports vulnerability</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-violet-50">
              <span className="text-2xl block mb-2">{"\u2192"}</span>
              <div className="text-xs font-bold text-[#8b5cf6] mb-1">ENISA Platform</div>
              <div className="text-xs text-[#7a8db0]">Central EU reporting point</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-[#f4f6fc]">
              <span className="text-2xl block mb-2">{"\uD83C\uDFDB\uFE0F"}</span>
              <div className="text-xs font-bold text-[#060c1a] mb-1">CSIRT + Market Surveillance</div>
              <div className="text-xs text-[#7a8db0]">Informed by ENISA</div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 9. CE & CONFORMITY ═══════════════ */}
      <Section id="konformitaet" title="CE Marking & Conformity Assessment">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Products with digital elements may only be sold in the EU with a valid <strong>CE marking</strong>.
          Which conformity assessment procedure applies depends on the product category:
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#f4f6fc]">
                <th className="text-left p-4 font-[Syne] font-bold text-[#060c1a] rounded-tl-xl">Category</th>
                <th className="text-left p-4 font-[Syne] font-bold text-[#060c1a]">Assessment Procedure</th>
                <th className="text-left p-4 font-[Syne] font-bold text-[#060c1a] rounded-tr-xl">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d8dff0]">
              <tr>
                <td className="p-4 font-medium text-[#060c1a]">Default</td>
                <td className="p-4 text-[#3a4a6b]">Module A — Self-assessment</td>
                <td className="p-4 text-[#3a4a6b]">Manufacturer self-assesses whether requirements are met</td>
              </tr>
              <tr className="bg-[#fefce8]/30">
                <td className="p-4 font-medium text-[#060c1a]">Important Cl. I</td>
                <td className="p-4 text-[#3a4a6b]">Self (with hEN) or third-party</td>
                <td className="p-4 text-[#3a4a6b]">If harmonised standards are applied: self-assessment. Otherwise: notified body</td>
              </tr>
              <tr className="bg-[#fff7ed]/30">
                <td className="p-4 font-medium text-[#060c1a]">Important Cl. II</td>
                <td className="p-4 text-[#3a4a6b]">Third-party assessment</td>
                <td className="p-4 text-[#3a4a6b]">Module H (comprehensive QM) or Module B+C (type examination)</td>
              </tr>
              <tr className="bg-[#fef2f2]/30">
                <td className="p-4 font-medium text-[#060c1a]">Critical</td>
                <td className="p-4 text-[#3a4a6b]">EU Cybersecurity Certification</td>
                <td className="p-4 text-[#3a4a6b]">EUCC scheme or equivalent EU certification scheme</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-5">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 text-sm">EU Declaration of Conformity</h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed">
              Every manufacturer must draw up an EU declaration of conformity (<LawRef law="CRA" article="28">Art. 28</LawRef>) confirming
              that the product meets all CRA requirements. It must be retained for 10 years
              and made available to market surveillance authorities on request.
            </p>
          </div>
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-5">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 text-sm">Support Period on the Product</h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed">
              In addition to the CE marking, the expected <strong>end of the support period</strong> must also be
              clearly and understandably indicated on the product or in the documentation — so that users know
              how long they can expect to receive security updates.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 10. OPEN SOURCE ═══════════════ */}
      <Section id="opensource" title="Open Source & the CRA">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The treatment of open-source software was one of the most contentious issues. The final
          version creates a <strong>differentiated set of rules</strong>:
        </p>

        <div className="space-y-4 mb-8">
          <div className="rounded-2xl border border-green-200 bg-green-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-green-900 mb-2 flex items-center gap-2">
              <span>{"\u2705"}</span> Exempt from the CRA
            </h3>
            <p className="text-sm text-green-800 leading-relaxed">
              Open-source software developed and made available <strong>outside of a commercial activity</strong>.
              This means: hobby projects, university research and community projects without a commercial
              character do not fall under the CRA, even if they are used by businesses.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-amber-900 mb-2 flex items-center gap-2">
              <span>{"\u26A0\uFE0F"}</span> Subject to the CRA
            </h3>
            <p className="text-sm text-amber-800 leading-relaxed mb-3">
              Open-source software placed on the market <strong>in the course of a commercial activity</strong>.
              Indicators of commercial activity include:
            </p>
            <ul className="space-y-1 text-sm text-amber-800">
              <li className="flex items-start gap-2"><span>&bull;</span> Paid support or premium features</li>
              <li className="flex items-start gap-2"><span>&bull;</span> Use as part of a commercial product</li>
              <li className="flex items-start gap-2"><span>&bull;</span> Targeted processing of personal data for non-security-related purposes</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-violet-200 bg-violet-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 flex items-center gap-2">
              <span>{"\uD83C\uDD95"}</span> New Role: Open-Source Steward
            </h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed mb-3">
              <LawRef law="CRA" article="24">Art. 24 CRA</LawRef> introduces the <strong>Open-Source Software Steward</strong> — a legal person
              that systematically supports the development of commercially used open-source software
              (e.g. foundations such as the Apache Foundation, Eclipse Foundation).
            </p>
            <ul className="space-y-1 text-sm text-[#3a4a6b]">
              <li className="flex items-start gap-2"><span className="text-[#8b5cf6]">{"\u25B8"}</span> Must document and publish a cybersecurity policy</li>
              <li className="flex items-start gap-2"><span className="text-[#8b5cf6]">{"\u25B8"}</span> Cooperates in vulnerability handling</li>
              <li className="flex items-start gap-2"><span className="text-[#8b5cf6]">{"\u25B8"}</span> Lighter obligations than manufacturers — no conformity assessment, no CE</li>
              <li className="flex items-start gap-2"><span className="text-[#8b5cf6]">{"\u25B8"}</span> Exempt from fines (<LawRef law="CRA" article="64" absatz="10">Art. 64(10) CRA</LawRef>)</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-5">
          <p className="text-sm text-[#3a4a6b]">
            <strong>Practical tip:</strong> If your company uses open-source components in its own products,
            <em>you</em> as the manufacturer are liable for CRA conformity — not the
            open-source developer. Your SBOM must fully capture these dependencies.
          </p>
        </div>
      </Section>

      {/* ═══════════════ 11. PENALTIES ═══════════════ */}
      <Section id="strafen" title="Penalties & Enforcement">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Market surveillance authorities in the member states monitor compliance. Fines
          are structured in <strong>three tiers</strong>:
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border-2 border-red-200 bg-red-50/30 p-6 text-center"
          >
            <div className="font-[Syne] font-extrabold text-3xl text-red-600 mb-1">{"\u20AC15M"}</div>
            <div className="font-mono text-xs text-red-400 mb-3">or 2.5% of global annual turnover</div>
            <p className="text-sm text-[#3a4a6b]">
              Violations of the essential cybersecurity requirements (<LawRef law="CRA" annex="I">Annex I</LawRef>)
              and manufacturer obligations (<LawRef law="CRA" article="13">Art. 13</LawRef>, <LawRef law="CRA" article="14">14</LawRef>)
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border-2 border-orange-200 bg-orange-50/30 p-6 text-center"
          >
            <div className="font-[Syne] font-extrabold text-3xl text-orange-600 mb-1">{"\u20AC10M"}</div>
            <div className="font-mono text-xs text-orange-400 mb-3">or 2% of global annual turnover</div>
            <p className="text-sm text-[#3a4a6b]">
              Violations of other manufacturer obligations and obligations
              for importers and distributors
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border-2 border-amber-200 bg-amber-50/30 p-6 text-center"
          >
            <div className="font-[Syne] font-extrabold text-3xl text-amber-600 mb-1">{"\u20AC5M"}</div>
            <div className="font-mono text-xs text-amber-400 mb-3">or 1% of global annual turnover</div>
            <p className="text-sm text-[#3a4a6b]">
              False, incomplete or misleading information
              provided to notified bodies and market surveillance authorities
            </p>
          </motion.div>
        </div>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 text-sm">Additional Enforcement Measures</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "\uD83D\uDEAB", title: "Market Ban", desc: "Products can be withdrawn from the market or their availability prohibited" },
              { icon: "\uD83D\uDD04", title: "Recall", desc: "Mandatory product recall in case of serious cybersecurity risks" },
              { icon: "\uD83D\uDCE2", title: "Public Warning", desc: "Authorities can publicly warn about unsafe products" },
              { icon: "\u23F1\uFE0F", title: "Corrective Deadlines", desc: "Manufacturers can be given deadlines to achieve conformity" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-3 rounded-xl bg-[#f4f6fc]">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <div className="text-sm font-bold text-[#060c1a]">{item.title}</div>
                  <div className="text-xs text-[#3a4a6b] mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════ 12. INTERPLAY WITH NIS2 & CO. ═══════════════ */}
      <Section id="zusammenspiel" title="Interplay with NIS2 & Other Regulations">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The CRA does not stand in isolation. It complements and interacts with several EU regulations:
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: "#0ea5e9" }}>NIS2</div>
              <h3 className="font-[Syne] font-bold text-[#060c1a]">NIS2 Directive / NISG 2026</h3>
            </div>
            <p className="text-sm text-[#3a4a6b] leading-relaxed">
              <strong>NIS2 secures organisations, CRA secures products.</strong><SourceRef id={3} sources={sources} accent="#8b5cf6" /> NIS2 obliges essential and
              important entities to use secure products. The CRA ensures that the products
              these entities purchase are actually secure. Manufacturers who are subject to NIS2
              and use their own products must comply with both regulations simultaneously.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: "#0A2540" }}>AI</div>
              <h3 className="font-[Syne] font-bold text-[#060c1a]">EU AI Act</h3>
            </div>
            <p className="text-sm text-[#3a4a6b] leading-relaxed">
              AI systems that qualify as a {"\u201Cproduct with digital elements\u201D"} must comply with both the AI Act and the
              CRA. The cybersecurity requirements of the CRA apply in addition to the AI-specific
              requirements. High-risk AI systems with CRA conformity automatically satisfy the cybersecurity requirement
              of the AI Act (<LawRef law="AI Act" article="15">Art. 15</LawRef>).
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#d8dff0] bg-white p-5">
              <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 text-sm">RED — Radio Equipment Directive</h3>
              <p className="text-xs text-[#3a4a6b] leading-relaxed">
                The RED delegated acts on cybersecurity (Art. 3(3)(d/e/f))
                will be replaced by the CRA. From December 2027, only the CRA will apply to
                the cybersecurity of radio equipment.
              </p>
            </div>
            <div className="rounded-2xl border border-[#d8dff0] bg-white p-5">
              <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 text-sm">Product Liability Directive</h3>
              <p className="text-xs text-[#3a4a6b] leading-relaxed">
                The new EU Product Liability Directive (2024/2853)<SourceRef id={5} sources={sources} accent="#8b5cf6" /> complements the CRA with
                civil liability. Injured parties can claim damages
                when a product causes harm due to inadequate cybersecurity.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 13. COMPLIANCE ROADMAP ═══════════════ */}
      <Section id="fahrplan" title="Compliance Roadmap">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-8">
          Four phases to make your organisation CRA-compliant in time:
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              phase: "Phase 1",
              title: "Inventory & Assessment",
              period: "Start immediately",
              color: "#8b5cf6",
              items: [
                "Identify all products with digital elements",
                "Determine product category (Default / Important I / Important II / Critical)",
                "Document existing cybersecurity measures",
                "Conduct gap analysis against Annex I requirements",
                "Map supplier landscape for third-party components",
              ],
            },
            {
              phase: "Phase 2",
              title: "Processes & Documentation",
              period: "H1 2026",
              color: "#7c3aed",
              items: [
                "Establish a Secure Development Lifecycle (SDLC)",
                "Implement SBOM creation process (CycloneDX/SPDX)",
                "Set up vulnerability management process",
                "Publish a Coordinated Vulnerability Disclosure policy",
                "Prepare technical documentation",
              ],
            },
            {
              phase: "Phase 3",
              title: "Reporting & Testing",
              period: "By Sep 2026",
              color: "#6d28d9",
              items: [
                "Set up reporting process for the ENISA platform",
                "Clarify responsibilities for 24h reporting",
                "Conduct security testing (penetration tests, code reviews)",
                "Select and prepare conformity assessment procedure",
                "Contact a notified body if required",
              ],
            },
            {
              phase: "Phase 4",
              title: "Conformity & Monitoring",
              period: "By Dec 2027",
              color: "#5b21b6",
              items: [
                "Complete conformity assessment",
                "Draw up EU declaration of conformity",
                "Affix CE marking and support period on the product",
                "Establish ongoing vulnerability monitoring",
                "Ensure update pipeline for 5+ years",
              ],
            },
          ].map((phase) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#d8dff0] bg-white overflow-hidden"
            >
              <div className="h-1.5" style={{ background: phase.color }} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: phase.color }}>
                    {phase.phase}
                  </span>
                  <span className="font-mono text-xs text-[#7a8db0]">{phase.period}</span>
                </div>
                <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
                      <span className="mt-0.5 shrink-0" style={{ color: phase.color }}>{"\u25B8"}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 14. FAQ ═══════════════ */}
      <Section id="faq" title="Frequently Asked Questions">
        <AccordionSection
          items={[
            {
              title: "Does the CRA also apply to pure software without hardware?",
              content:
                "Yes. The CRA covers all products with digital elements \u2014 this includes both hardware with embedded software and standalone software that has a direct or indirect data connection. Operating systems, browsers, firewalls and VPN clients are typical examples of pure software products under the CRA.",
            },
            {
              title: "What happens with products placed on the market before December 2027?",
              content:
                "Products already placed on the market do not need to comply with the CRA retroactively. However, as soon as a substantial modification is made to the product (e.g. a major update), the product is considered a new placing on the market and must be CRA-compliant. New versions or variants must also meet the requirements.",
            },
            {
              title: "Are cloud services (SaaS) affected by the CRA?",
              content:
                "Pure SaaS solutions that run entirely in the cloud and have no on-premise component generally do not fall under the CRA. However, if a SaaS solution is a remote data processing component that is required for the core functionality of a product with digital elements, it may indirectly fall under the CRA.",
            },
            {
              title: "What is an SBOM and how do I create one?",
              content:
                "A Software Bill of Materials (SBOM) is a machine-readable inventory of all software components in a product \u2014 comparable to an ingredients list. Common formats are CycloneDX and SPDX. Tools such as Syft, Trivy or OWASP Dependency-Track can automatically generate SBOMs from build processes. The SBOM must contain at least all top-level dependencies.",
            },
            {
              title: "My product uses open-source libraries \u2014 who is liable?",
              content:
                "You, as the manufacturer. If you integrate open-source components into your commercial product, you are responsible for the CRA conformity of the entire product \u2014 regardless of who developed the component. This is why a complete SBOM and ongoing vulnerability monitoring for all dependencies is so important.",
            },
            {
              title: "Do I need a notified body for the conformity assessment?",
              content:
                "That depends on the product category. Default products (~90% of all products) can be assessed via self-assessment (Module A). Important Products Class I can self-assess if harmonised standards are applied. Important Products Class II and critical products mandatorily require third-party assessment by a notified body.",
            },
            {
              title: "How does the CRA interact with the Machinery Regulation?",
              content:
                "Products that fall under both the CRA and the Machinery Regulation (2023/1230) must comply with both. The CRA\u2019s cybersecurity requirements apply in addition. If a product has passed the CRA conformity assessment, the cybersecurity requirement of the Machinery Regulation is deemed to be fulfilled (presumption of conformity).",
            },
            {
              title: "What happens if I fail to report vulnerabilities on time?",
              content:
                "Failure to report actively exploited vulnerabilities or severe incidents within the prescribed deadlines (24h early warning, 72h detailed notification, 14 days final report) can be sanctioned with fines of up to \u20AC15 million or 2.5% of global annual turnover \u2014 as it constitutes a violation of manufacturer obligations.",
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ RELATED REGULATIONS ═══════════════════ */}
      <RelatedGuides currentGuide="cra" accent="#dc2626" />

      {/* ═══════════════════ SOFTWARE RECOMMENDATIONS ═══════════════════ */}
      <ToolRecommendation regulationKey="cra" accent="#8b5cf6" />

      {/* ═══════════════════ SOURCES ═══════════════════ */}
      <Section id="quellen" title="Sources & Official Documents">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          All information in this guide is based on official EU documents.
          Here you can find the primary sources:
        </p>

        <SourceList sources={sources} accent="#8b5cf6" />

        <div className="mt-6 rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Disclaimer:</strong> This guide is for informational purposes
            and does not constitute legal advice. The linked documents are the official
            legal texts. For questions regarding specific application to your organisation, we recommend
            consulting specialised lawyers or compliance consultants.
          </p>
        </div>
      </Section>
    </GuidePageLayout>
  );
}
