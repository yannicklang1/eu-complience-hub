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
    title: "Directive (EU) 2019/882 — European Accessibility Act (Full Text)",
    url: "https://eur-lex.europa.eu/eli/dir/2019/882/oj/deu",
    desc: "Official text of the EAA Directive on the EUR-Lex portal",
    type: "Directive",
  },
  {
    id: 2,
    title: "BaFG — Accessibility Strengthening Act (RIS)",
    url: "https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20012387",
    desc: "Austrian Accessibility Strengthening Act, Federal Law Gazette I No. 76/2023",
    type: "Nat. Law",
  },
  {
    id: 3,
    title: "EN 301 549 — ICT Accessibility Standard",
    url: "https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf",
    desc: "European standard for accessible ICT products and services",
    type: "Standard",
  },
  {
    id: 4,
    title: "WCAG 2.1 — Web Content Accessibility Guidelines",
    url: "https://www.w3.org/TR/WCAG21/",
    desc: "W3C guidelines for accessible web content — Level AA as minimum standard",
    type: "Standard",
  },
  {
    id: 5,
    title: "Social Ministry Service — Accessibility",
    url: "https://www.sozialministeriumservice.at/Ueber_uns/Barrierefreiheit/Barrierefreiheit.de.html",
    desc: "Supervisory authority for the implementation of the BaFG in Austria",
    type: "Authority AT",
  },
  {
    id: 6,
    title: "WKO — Accessibility Strengthening Act",
    url: "https://www.wko.at/service/wirtschaftsrecht-gewerberecht/barrierefreiheitsstaerkungsgesetz",
    desc: "Practical guide by the Austrian Federal Economic Chamber on the BaFG",
    type: "Practical Guide",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Overview" },
  { id: "eaa-vs-bafg", label: "EAA vs. BaFG" },
  { id: "timeline", label: "Timeline & Deadlines" },
  { id: "betroffene", label: "Who Is Affected?" },
  { id: "ausnahmen", label: "Exemptions" },
  { id: "anforderungen", label: "Detailed Requirements" },
  { id: "produkte-dienste", label: "Digital Products & Services" },
  { id: "wcag", label: "WCAG & EN 301 549" },
  { id: "strafen", label: "Penalties" },
  { id: "oesterreich", label: "BaFG in Austria" },
  { id: "fahrplan", label: "Compliance Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Penalty", value: "up to 80,000 EUR" },
  { label: "Effective Since", value: "28 June 2025" },
  { label: "Applies To", value: "Digital Products & Services" },
  { label: "Exemption", value: "Micro-enterprises" },
  { label: "Standard", value: "WCAG 2.1 AA" },
  { label: "Legal Basis", value: "Dir. (EU) 2019/882" },
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
  accent = "#2563eb",
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
          done ? "bg-blue-600 border-blue-600" : active ? "bg-blue-600 border-blue-600 animate-pulse" : "bg-white border-[#d8dff0]"
        }`} />
        <div className="w-px flex-1 bg-[#e8ecf4] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] font-semibold text-[#7a8db0]">{date}</span>
          {done && <span className="text-[9px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-mono font-bold border border-blue-200">Done</span>}
          {active && <span className="text-[9px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-mono font-bold border border-blue-200">Active</span>}
        </div>
        <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">{title}</div>
        <p className="text-[14px] text-[#5a6a8a] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ─────────────────── Roadmap step ─────────────────── */
function RoadmapStep({
  phase, title, items, accent = "#2563eb",
}: { phase: string; title: string; items: string[]; accent?: string }) {
  return (
    <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full" style={{ background: accent }} />
      <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: accent }}>{phase}</div>
      <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
      title="BaFG"
      subtitle="Accessibility Strengthening Act: EU-wide accessibility requirements for digital products and services, WCAG standards, and a compliance roadmap for Austrian businesses."
      regulationKey="Directive (EU) 2019/882"
      accent="#2563eb"
      badgeLabel="Effective since June 2025"
      badgeColor="#1d4ed8"
      quickFacts={quickFacts}
      tocItems={tocItems}
      trustBadge={{ lastReview: "19.02.2026", sourceCount: 6 }}
      heroIcon={
        <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      }
      href="/bafg"
    >
      {/* ═══════════════════ 1. OVERVIEW ═══════════════════ */}
      <Section id="ueberblick" title="Overview: What Is the BaFG?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The <strong>Accessibility Strengthening Act (BaFG)</strong><SourceRef id={2} sources={sources} accent="#2563eb" /> is
          the Austrian transposition of EU Directive (EU) 2019/882, known as the <strong>European
          Accessibility Act (EAA)</strong>.<SourceRef id={1} sources={sources} accent="#2563eb" /> Since{" "}
          <strong>28 June 2025</strong>, the BaFG requires businesses to make digital products and
          services accessible.
        </p>
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Approximately <strong>87 million people with disabilities</strong> live in the EU. Together with
          the ageing population, well over 100 million EU citizens benefit from accessible digital
          offerings. The BaFG establishes uniform accessibility standards and eliminates the
          fragmentation of national regulations within the single market.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard value="June 2025" label="Effective" accent="#1d4ed8" />
          <StatCard value="87 M" label="Affected in EU" accent="#2563eb" />
          <StatCard value="80,000 EUR" label="Max. Penalty" accent="#dc2626" />
          <StatCard value="WCAG 2.1 AA" label="Standard" accent="#2563eb" />
        </div>

        <div className="rounded-2xl bg-blue-50/60 border border-blue-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-blue-700 mb-1">
                Note: This Law Is in Effect NOW
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                The BaFG has been in force since 28 June 2025. Businesses that place digital products
                or services on the market must already comply with the accessibility requirements.
                There is no longer a general transition period for new products and services. Only
                certain pre-existing contracts are subject to transitional provisions until 2030.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 2. EAA vs. BaFG ═══════════════════ */}
      <Section id="eaa-vs-bafg" title="EAA vs. BaFG: EU Directive and National Transposition">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The <strong>European Accessibility Act</strong> (Directive (EU) 2019/882)<SourceRef id={1} sources={sources} accent="#2563eb" />{" "}
          is an EU directive that had to be transposed into national law by each member state.
          Austria did so with the <strong>Accessibility Strengthening Act (BaFG)</strong>,
          enacted in July 2023 as Federal Law Gazette I No. 76/2023.<SourceRef id={2} sources={sources} accent="#2563eb" />
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#7a8db0] mb-2">
              EU Level
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              European Accessibility Act (EAA)
            </h3>
            <ul className="space-y-2">
              {[
                "Directive (EU) 2019/882",
                "Adopted on 17 June 2019",
                "Transposition deadline: 28 June 2022",
                "Harmonisation of accessibility requirements",
                "Minimum standards — national tightening possible",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-2" />
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border-2 border-blue-300 bg-blue-50/30 p-6"
          >
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-blue-700 mb-2">
              Austria
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              BaFG (Federal Law Gazette I No. 76/2023)
            </h3>
            <ul className="space-y-2">
              {[
                "National transposition of the EAA",
                "Enacted in July 2023",
                "Effective since 28 June 2025",
                "Supervisory authority: Social Ministry Service",
                "Administrative fines up to EUR 80,000",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-700 flex-shrink-0 mt-2" />
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Important for B2B businesses:</strong> Unlike the{" "}
            <LawRef law="DSGVO">GDPR</LawRef>, the EAA is a directive, not a regulation. The specific
            requirements may vary slightly from one member state to another. For the Austrian market,
            the BaFG is the governing law. If you operate across the EU, review the respective
            national transpositions.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 3. TIMELINE ═══════════════════ */}
      <Section id="timeline" title="Timeline & Deadlines">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          From the adoption of the EAA to the full applicability of the BaFG — the key milestones:
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8">
          <TimelineItem
            date="17 June 2019"
            title="EAA published in the Official Journal"
            description={<>Directive (EU) 2019/882 is published in the Official Journal of the European Union. Member states have until June 2022 to transpose it into national law.<SourceRef id={1} sources={sources} accent="#2563eb" /></>}
            done
          />
          <TimelineItem
            date="July 2023"
            title="BaFG enacted in Austria"
            description={<>Austria transposes the EAA belatedly: The Accessibility Strengthening Act (Federal Law Gazette I No. 76/2023) is enacted and published in the Federal Law Gazette.<SourceRef id={2} sources={sources} accent="#2563eb" /></>}
            done
          />
          <TimelineItem
            date="28 June 2025"
            title="BaFG enters into force — full applicability"
            description="All accessibility requirements apply immediately to new products and services. Businesses must ensure conformity."
            active
          />
          <TimelineItem
            date="Until 28 June 2030"
            title="Transition period for existing contracts"
            description="Service contracts concluded before 28 June 2025 may continue unchanged until 28 June 2030 at the latest. Self-service terminals already in operation may be used until the end of their economic useful life (max. 20 years)."
          />
        </div>
      </Section>

      {/* ═══════════════════ 4. WHO IS AFFECTED? ═══════════════════ */}
      <Section id="betroffene" title="Who Is Affected?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The BaFG applies to <strong>economic operators</strong> who manufacture, import,
          or distribute certain products or provide certain services. The decisive factor is that the
          products or services are offered on the Austrian or EU market.<SourceRef id={6} sources={sources} accent="#2563eb" />
        </p>

        <AccordionSection
          accent="#2563eb"
          items={[
            {
              title: "Manufacturers, Importers & Distributors (Products)",
              content: (
                <div>
                  <p className="mb-3">
                    Manufacturers bear primary responsibility. Importers and distributors have
                    due diligence and verification obligations. Affected product categories:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Computers and operating systems (desktops, laptops, tablets)</li>
                    <li>Smartphones and mobile devices</li>
                    <li>Self-service terminals: ATMs, ticket machines, check-in kiosks</li>
                    <li>Payment terminals (POS devices)</li>
                    <li>E-book readers (e-readers)</li>
                    <li>TV sets with digital services</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Service Providers",
              content: (
                <div>
                  <p className="mb-3">Providers of the following services must ensure accessibility:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>E-commerce — online shops and marketplaces</li>
                    <li>Consumer banking services (online banking, banking apps)</li>
                    <li>Electronic communication services (telephony, messaging)</li>
                    <li>Services providing access to audiovisual media services</li>
                    <li>E-books and specialised digital reading services</li>
                    <li>Passenger transport services (ticketing, real-time travel information)</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Relevance for B2B Businesses",
              content: (
                <div>
                  <p className="mb-3">
                    Although the BaFG primarily targets B2C products and services, it has
                    significant implications for B2B businesses:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>Suppliers:</strong> Those providing software components to B2C companies must ensure that the end products can be BaFG-compliant</li>
                    <li><strong>White-label providers:</strong> Web shops, apps, or payment solutions under third-party brands must be accessible</li>
                    <li><strong>SaaS providers:</strong> If your product is used as a consumer channel, accessibility becomes a contractual requirement</li>
                    <li><strong>Procurement:</strong> Public authorities and large enterprises increasingly require accessibility certifications</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 5. EXEMPTIONS ═══════════════════ */}
      <Section id="ausnahmen" title="Exemptions & Exceptions">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The BaFG provides for two key exemption grounds: the micro-enterprise exemption
          and the disproportionate burden defence. These exemptions are narrowly defined and must
          be carefully documented.
        </p>

        <div className="space-y-4 mb-6">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Micro-enterprises (Services Only)
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-4">
              Micro-enterprises that provide <strong>services</strong> are exempt from the BaFG.
              For <strong>product manufacturers</strong>, this exemption does not apply — regardless
              of company size.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl bg-blue-50/60 border border-blue-100 p-4">
                <div className="font-mono text-[10px] font-bold text-blue-600 uppercase mb-1">Criterion 1</div>
                <div className="font-[Syne] font-bold text-[15px] text-[#060c1a]">Fewer than 10 employees</div>
              </div>
              <div className="rounded-xl bg-blue-50/60 border border-blue-100 p-4">
                <div className="font-mono text-[10px] font-bold text-blue-600 uppercase mb-1">Criterion 2</div>
                <div className="font-[Syne] font-bold text-[15px] text-[#060c1a]">Annual turnover or balance sheet total &le; EUR 2 million</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/40 p-5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <p className="font-[Syne] font-bold text-sm text-amber-700 mb-1">
                  Note: BOTH Criteria Must Be Met (Cumulative)
                </p>
                <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                  The micro-enterprise exemption only applies when <strong>both</strong> criteria
                  are met simultaneously. A company with 8 employees but EUR 3 million in turnover
                  is <strong>not</strong> a micro-enterprise under the BaFG and must comply with
                  the accessibility requirements.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Disproportionate Burden
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
              Economic operators may claim individual accessibility requirements as a disproportionate
              burden if compliance would require a fundamental alteration of the product or represent
              a disproportionate financial burden.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px] text-[#5a6a8a]">
              <li>Must be documented and justified on a case-by-case basis</li>
              <li>The assessment must be renewed at least every 5 years</li>
              <li>Must be submitted to the authority upon request</li>
              <li>Does not exempt from the obligation to meet all other requirements</li>
              <li>When public funding is received: reliance on this exemption is not possible</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Purely B2B services:</strong> Services
            provided exclusively to other businesses with no consumer contact generally do not
            fall under the BaFG. However, as soon as a consumer channel exists (e.g. an
            end-customer portal), the obligations apply.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 6. REQUIREMENTS ═══════════════════ */}
      <Section id="anforderungen" title="Detailed Requirements: The POUR Principles">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          The BaFG&apos;s accessibility requirements are based on the four core principles of the
          WCAG<SourceRef id={4} sources={sources} accent="#2563eb" /> — known as <strong>POUR</strong>:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border bg-white p-6 relative overflow-hidden"
            style={{ borderColor: "#2563eb30" }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#2563eb]" />
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-1 text-[#2563eb]">
              Principle 1
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">Perceivable</h3>
            <p className="text-[13px] text-[#7a8db0] leading-relaxed mb-3">Information must be presentable to users in ways they can perceive.</p>
            <div className="space-y-1.5">
              {["Text alternatives for images (alt text)", "Captions for videos", "Colour contrast at least 4.5:1", "Scalable text sizes"].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb] flex-shrink-0 mt-1.5" />
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border bg-white p-6 relative overflow-hidden"
            style={{ borderColor: "#1d4ed830" }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#1d4ed8]" />
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-1 text-[#1d4ed8]">
              Principle 2
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">Operable</h3>
            <p className="text-[13px] text-[#7a8db0] leading-relaxed mb-3">All functionality must be usable via keyboard and assistive technology.</p>
            <div className="space-y-1.5">
              {["Full keyboard operability", "No time limits or option to disable them", "No flashing content (seizure risk)", "Clear navigation and focus order"].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8] flex-shrink-0 mt-1.5" />
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border bg-white p-6 relative overflow-hidden"
            style={{ borderColor: "#1e40af30" }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#1e40af]" />
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-1 text-[#1e40af]">
              Principle 3
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">Understandable</h3>
            <p className="text-[13px] text-[#7a8db0] leading-relaxed mb-3">Content and operation must be clear and predictable.</p>
            <div className="space-y-1.5">
              {["Clear, plain language", "Consistent navigation", "Error messages with corrective suggestions", "Forms with labels and help text"].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1e40af] flex-shrink-0 mt-1.5" />
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border bg-white p-6 relative overflow-hidden"
            style={{ borderColor: "#1e3a5f30" }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#1e3a5f]" />
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-1 text-[#1e3a5f]">
              Principle 4
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">Robust</h3>
            <p className="text-[13px] text-[#7a8db0] leading-relaxed mb-3">Content must be compatible with various assistive technologies.</p>
            <div className="space-y-1.5">
              {["Screen reader compatibility", "Correct semantic markup (HTML)", "WAI-ARIA for dynamic content", "Compatibility with magnification software"].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f] flex-shrink-0 mt-1.5" />
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════ 7. PRODUCTS & SERVICES ═══════════════════ */}
      <Section id="produkte-dienste" title="Digital Products & Services in Detail">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The BaFG defines specific requirements for various categories of digital products
          and services. Here are the key areas with their specific obligations:
        </p>

        <AccordionSection
          accent="#2563eb"
          items={[
            {
              title: "E-Commerce (Online Shops & Marketplaces)",
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Accessible product descriptions and images with alternative text</li>
                    <li>Accessible ordering process including shopping cart and checkout</li>
                    <li>Accessible payment processes and forms</li>
                    <li>Accessible search, filter, and sorting functions</li>
                    <li>Accessible customer communication (chat, contact forms)</li>
                    <li>Compatibility with screen readers and keyboard navigation</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Banking & Payment Services",
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Accessible online banking and mobile banking apps</li>
                    <li>Accessible transfer and payment processes</li>
                    <li>Accessible account overviews and statements</li>
                    <li>Accessible authentication methods (2FA must be accessible)</li>
                    <li>Accessible ATMs (speech output, tactile markers)</li>
                    <li>Accessible payment terminals (POS)</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "E-Books & E-Readers",
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>E-books must be compatible with assistive technologies</li>
                    <li>Navigable tables of contents</li>
                    <li>Adjustable font sizes and contrasts</li>
                    <li>Text-to-speech compatibility</li>
                    <li>DRM must not block accessibility features</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Ticketing & Passenger Transport",
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Accessible ticket machines (speech output, contrasts)</li>
                    <li>Accessible online booking systems</li>
                    <li>Accessible real-time travel information</li>
                    <li>Accessible check-in terminals at airports</li>
                    <li>Accessible mobile apps for timetable information</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Telecommunications",
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Accessible telephone services including emergency services</li>
                    <li>Accessible messaging services</li>
                    <li>Real-time text (RTT) as an alternative to voice</li>
                    <li>Accessible customer portals and self-service</li>
                    <li>Accessible contract information</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Self-Service Terminals",
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Speech output for screen content</li>
                    <li>Tactile markers and detectable controls</li>
                    <li>Sufficient colour contrast on screen</li>
                    <li>Appropriate operating height (wheelchair accessibility)</li>
                    <li>Headphone compatibility (private audio output)</li>
                    <li>Flexible time limits for operation</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 8. WCAG & EN 301 549 ═══════════════════ */}
      <Section id="wcag" title="WCAG 2.1 & EN 301 549: Technical Standards">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The technical foundation of the BaFG requirements is built on two central standards:
          the <strong>Web Content Accessibility Guidelines (WCAG) 2.1</strong><SourceRef id={4} sources={sources} accent="#2563eb" />{" "}
          and the European standard <strong>EN 301 549</strong>.<SourceRef id={3} sources={sources} accent="#2563eb" />
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">WCAG 2.1</h3>
            <p className="text-[13px] text-[#5a6a8a] leading-relaxed mb-3">
              The internationally recognised guidelines for accessible web content.{" "}
              <strong>Level AA</strong> is the minimum standard for the BaFG.
            </p>
            <div className="space-y-2">
              {[
                "78 success criteria in total",
                "Level A: 30 baseline criteria",
                "Level AA: 20 additional criteria (BaFG minimum)",
                "Level AAA: 28 enhanced criteria (optional)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">EN 301 549</h3>
            <p className="text-[13px] text-[#5a6a8a] leading-relaxed mb-3">
              The European standard for accessible ICT. Goes beyond web content and
              also covers hardware, software, and documents.
            </p>
            <div className="space-y-2">
              {[
                "Includes all WCAG 2.1 AA criteria",
                "Extended with hardware requirements",
                "Requirements for documents (PDF, Office)",
                "Specifications for telecommunications",
                "Requirements for self-service terminals",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-700 flex-shrink-0 mt-2" />
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <AccordionSection
          accent="#2563eb"
          items={[
            {
              title: "Level A — Basic Accessibility",
              content: (
                <div>
                  <p className="mb-3">The absolute minimum requirements. Without Level A, a website is simply unusable for many users with disabilities.</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Text alternatives for non-text content</li>
                    <li>Captions for pre-recorded audio/video content</li>
                    <li>Content structured in a meaningful order</li>
                    <li>All functions reachable via keyboard</li>
                    <li>No keyboard traps</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Level AA — BaFG Minimum Standard",
              content: (
                <div>
                  <p className="mb-3">This level is the <strong>minimum standard</strong> for BaFG compliance:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>Contrast 4.5:1</strong> for normal text (3:1 for large text)</li>
                    <li>Text resizable up to 200% without loss of content</li>
                    <li>Avoid images of text (use real text)</li>
                    <li>Provide multiple navigation paths (menu, search, sitemap)</li>
                    <li>Headings and labels describe their purpose</li>
                    <li>Consistent navigation and identification</li>
                    <li>Errors are identified and corrective suggestions are provided</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Level AAA — Recommended, Not Mandatory",
              content: (
                <div>
                  <p className="mb-3">Level AAA is not legally required but provides a higher degree of accessibility:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Contrast 7:1 for normal text</li>
                    <li>Sign language video for audio content</li>
                    <li>Easy language for complex texts</li>
                    <li>No time limits (at all)</li>
                  </ul>
                  <p className="mt-3 text-[13px] italic">Recommendation: Aim for AAA wherever economically feasible — it improves the user experience for everyone.</p>
                </div>
              ),
            },
          ]}
        />

        <div className="rounded-2xl bg-blue-50/60 border border-blue-200/50 p-5 mt-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-blue-700 mb-1">
                Presumption of Conformity
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                Compliance with the harmonised standard EN 301 549 triggers a{" "}
                <strong>presumption of conformity</strong> under the BaFG. This means it is assumed
                that the accessibility requirements are met unless evidence to the contrary is
                provided.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 9. PENALTIES ═══════════════════ */}
      <Section id="strafen" title="Fines & Penalties">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The BaFG provides for substantial administrative penalties. The{" "}
          <strong>Social Ministry Service</strong><SourceRef id={5} sources={sources} accent="#2563eb" />{" "}
          monitors compliance and can impose sanctions for violations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <StatCard value="80,000 EUR" label="Max. penalty per violation" accent="#dc2626" />
          <StatCard value="Market Ban" label="for serious violations" accent="#ea580c" />
          <StatCard value="Ongoing" label="Market Surveillance" accent="#2563eb" />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Sanction Measures
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Administrative fines up to EUR 80,000",
                "Order to establish conformity",
                "Product withdrawal from the market",
                "Restriction of market availability",
                "Public disclosure of violations",
                "Repeated violations: increased penalties",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border-2 border-red-200 bg-red-50/30 p-5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <p className="font-[Syne] font-bold text-sm text-red-700 mb-1">
                  Caution Regarding Repeated Violations
                </p>
                <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                  For repeated or serious violations, penalties can be significantly increased.
                  In addition, consumers and advocacy organisations can file complaints with the
                  Social Ministry Service, leading to reviews and proceedings. Compensation claims
                  by affected consumers are also possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 10. AUSTRIA ═══════════════════ */}
      <Section id="oesterreich" title="BaFG in Austria">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          The Austrian transposition of the EAA comes with certain national specificities.
          Supervision lies with the <strong>Social Ministry Service (Sozialministeriumservice)</strong><SourceRef id={5} sources={sources} accent="#2563eb" />,
          a subordinate agency of the Federal Ministry of Social Affairs, Health, Care
          and Consumer Protection.
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}>
                <span className="text-white text-lg font-bold">AT</span>
              </div>
              <div>
                <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
                  Social Ministry Service (SMS)
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
                  The Social Ministry Service is the competent market surveillance authority for
                  BaFG compliance in Austria. It reviews the conformity of products and
                  services, investigates complaints, and can impose administrative penalties.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-mono border border-blue-200">Market Surveillance</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-mono border border-blue-200">Right to Complain</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-mono border border-blue-200">Administrative Penalties</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Consumer Right to Complain
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
              Consumers and their representative organisations can file complaints with the
              Social Ministry Service when they encounter accessibility deficiencies.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px] text-[#5a6a8a]">
              <li>Any consumer can file a complaint</li>
              <li>Disability organisations have the right to bring collective actions</li>
              <li>Complaints can be submitted online</li>
              <li>The SMS informs the complainant of the outcome</li>
              <li>Mediation proceedings and judicial remedies are available</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-blue-50/60 border border-blue-200/50 p-5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-[Syne] font-bold text-sm text-blue-700 mb-1">
                  Practical Tip: Use the WKO Guide
                </p>
                <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                  The Austrian Federal Economic Chamber (WKO)<SourceRef id={6} sources={sources} accent="#2563eb" /> has published a comprehensive
                  practical guide on the BaFG to support businesses with implementation.
                  It contains practical explanations and checklists for various industries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 11. COMPLIANCE ROADMAP ═══════════════════ */}
      <Section id="fahrplan" title="Your Compliance Roadmap">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          The BaFG has been in effect since 28 June 2025. Five phases to bring your digital products and
          services into compliance:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <RoadmapStep
            phase="Phase 1 — Accessibility Audit"
            title="Assess the current state"
            accent="#2563eb"
            items={[
              "Inventory of all digital products and services",
              "Automated accessibility testing (e.g. axe, WAVE, Lighthouse)",
              "Manual testing with screen reader and keyboard navigation",
              "Create WCAG 2.1 AA conformity report",
            ]}
          />
          <RoadmapStep
            phase="Phase 2 — Gap Analysis & Prioritisation"
            title="Identify gaps"
            accent="#1d4ed8"
            items={[
              "Compare current state against BaFG requirements",
              "Prioritise critical barriers (checkout, login, navigation)",
              "Identify affected user groups",
              "Estimate effort and create implementation roadmap",
            ]}
          />
          <RoadmapStep
            phase="Phase 3 — Remediation (Fix)"
            title="Remove barriers"
            accent="#1e40af"
            items={[
              "Fix technical barriers (contrasts, alt text, focus order)",
              "Make forms and interactive elements accessible",
              "Publish an accessibility statement",
              "Create content guidelines for accessible content",
            ]}
          />
          <RoadmapStep
            phase="Phase 4 — Testing"
            title="Test automatically + manually"
            accent="#1e3a5f"
            items={[
              "Integrate automated tests into CI/CD pipeline",
              "Manual testing with real users with disabilities",
              "Regression testing with every release",
              "Conformity check against EN 301 549",
            ]}
          />
        </div>

        <RoadmapStep
          phase="Phase 5 — Monitoring & Training"
          title="Maintain ongoing compliance"
          accent="#2563eb"
          items={[
            "Continuous accessibility monitoring with every release",
            "Training for developers, designers, and content creators",
            "Appoint an accessibility officer",
            "Set up a feedback channel for users with disabilities",
            "Annual re-audit by an external testing body",
          ]}
        />

        <div className="mt-8">
          <ToolRecommendation regulationKey="bafg" accent="#2563eb" />
        </div>
      </Section>

      {/* ═══════════════════ 12. FAQ ═══════════════════ */}
      <Section id="faq" title="Frequently Asked Questions (FAQ)">
        <AccordionSection
          accent="#2563eb"
          allowMultiple
          items={[
            {
              title: "Does the BaFG also apply to purely B2B offerings?",
              content: (
                <p>
                  In principle, the BaFG targets products and services intended for consumers.
                  Purely B2B services with no consumer contact do not fall directly under the BaFG.
                  However, if your software or platform is used by your B2B customers as a consumer
                  channel (e.g. a white-label web shop), the accessibility requirements must be met.
                  Moreover, an increasing number of businesses and public contracting authorities
                  require accessibility even in B2B contracts.
                </p>
              ),
            },
            {
              title: "What is the difference between WCAG, EN 301 549, and the BaFG?",
              content: (
                <p>
                  <strong>WCAG 2.1</strong><SourceRef id={4} sources={sources} accent="#2563eb" /> are international
                  technical guidelines for accessible web content (W3C). <strong>EN 301 549</strong>
                  <SourceRef id={3} sources={sources} accent="#2563eb" /> is a European standard that
                  incorporates the WCAG criteria and extends them with requirements for hardware,
                  software, and documents. The <strong>BaFG</strong> is the Austrian law that makes
                  compliance with these standards legally mandatory. Compliance with EN 301 549
                  triggers a presumption of conformity.
                </p>
              ),
            },
            {
              title: "My company has fewer than 10 employees — am I exempt?",
              content: (
                <p>
                  Not necessarily. The micro-enterprise exemption applies only to{" "}
                  <strong>service providers</strong> that meet <strong>both</strong> criteria
                  simultaneously: fewer than 10 employees AND annual turnover/balance sheet total
                  of no more than EUR 2 million. For <strong>product manufacturers</strong> (hardware),
                  this exemption does not apply. Even as an exempt micro-enterprise, it is advisable
                  to implement accessibility — it improves usability and opens up markets.
                </p>
              ),
            },
            {
              title: "What are the consequences of non-compliance?",
              content: (
                <div>
                  <p className="mb-3">The consequences are multi-tiered:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Administrative fines up to EUR 80,000 per violation</li>
                    <li>Order to withdraw the product/service from the market</li>
                    <li>Consumer complaints and negative media coverage</li>
                    <li>Loss of tenders (especially public procurement)</li>
                    <li>Reputational damage as public awareness grows</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Do I need to publish an accessibility statement?",
              content: (
                <p>
                  Yes. Service providers must publish an accessibility statement describing how
                  their offering meets the accessibility requirements. For products, the manufacturer
                  must provide information about accessibility features in the user manual or on the
                  website. The statement must be available in an accessible format and easy to find.
                </p>
              ),
            },
            {
              title: "Are there transition periods for existing products?",
              content: (
                <div>
                  <p className="mb-3">Differentiated transition periods apply to existing products and services:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>New products/services from 28 June 2025:</strong> Must be accessible immediately</li>
                    <li><strong>Existing service contracts:</strong> Transition period until 28 June 2030 at the latest</li>
                    <li><strong>Self-service terminals:</strong> Terminals already in operation may be used until
                    the end of their economic useful life (max. 20 years)</li>
                    <li><strong>General rule:</strong> When significant changes are made to existing products/services,
                    the accessibility requirements apply immediately</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ RELATED REGULATIONS ═══════════════════ */}
      <RelatedGuides currentGuide="bafg" accent="#7e22ce" />

      {/* ═══════════════════ SOURCES ═══════════════════ */}
      <Section id="quellen" title="Sources & Official Documents">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          All information in this guide is based on official EU and Austrian legal texts as well
          as recognised standards. Here you will find the primary sources:
        </p>

        <SourceList sources={sources} accent="#2563eb" />

        <div className="mt-6 rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Disclaimer:</strong> This guide is for informational
            purposes and does not constitute legal advice. The linked documents are the official
            legal texts and standards. For questions regarding the specific application to your
            business, we recommend consulting specialised lawyers or accessibility consultants.
          </p>
        </div>
      </Section>
    </GuidePageLayout>
  );
}
