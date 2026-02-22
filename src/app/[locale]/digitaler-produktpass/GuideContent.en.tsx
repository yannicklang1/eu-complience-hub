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
    title: "Regulation (EU) 2024/1781 — Ecodesign for Sustainable Products (ESPR)",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R1781",
    desc: "Legal basis for the Digital Product Passport — in force since July 2024",
    type: "Verordnung",
  },
  {
    id: 2,
    title: "European Commission — Digital Product Passport",
    url: "https://environment.ec.europa.eu/topics/circular-economy/digital-product-passport_en",
    desc: "Official EU Commission information page on the DPP",
    type: "Behörde",
  },
  {
    id: 3,
    title: "Regulation (EU) 2023/1542 — Batteries Regulation (DPP for Batteries)",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32023R1542",
    desc: "First product group with mandatory DPP from February 2027",
    type: "Verordnung",
  },
  {
    id: 4,
    title: "ECOS — Digital Product Passport Position Paper",
    url: "https://ecostandard.org/wp-content/uploads/2023/03/ECOS-DPP-Position-Paper.pdf",
    desc: "Technical analysis of the DPP concept",
    type: "Studie",
  },
  {
    id: 5,
    title: "GS1 — Digital Product Passport Standards",
    url: "https://www.gs1.org/standards/digital-product-passport",
    desc: "Industry standards for DPP implementation (barcode, RFID, QR code)",
    type: "Norm",
  },
  {
    id: 6,
    title: "Textile Fibre Regulation — DPP for Textiles",
    url: "https://environment.ec.europa.eu/topics/circular-economy/textiles_en",
    desc: "EU strategy for sustainable textiles and DPP requirements",
    type: "Behörde",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Overview" },
  { id: "timeline", label: "Timeline & Deadlines" },
  { id: "betroffene", label: "Who Is Affected?" },
  { id: "produktgruppen", label: "Product Groups" },
  { id: "dateninhalte", label: "Data Contents & Required Fields" },
  { id: "traegermedien", label: "Data Carriers & Access" },
  { id: "batterien", label: "Battery DPP (2027)" },
  { id: "textilien", label: "Textiles DPP" },
  { id: "technische-umsetzung", label: "Technical Implementation" },
  { id: "datenschutz", label: "Data Protection & Access Rights" },
  { id: "marktüberwachung", label: "Market Surveillance" },
  { id: "zusammenspiel", label: "Interplay with Other Laws" },
  { id: "fahrplan", label: "Compliance Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "ESPR in force", value: "July 2024" },
  { label: "Batteries DPP from", value: "Feb. 2027" },
  { label: "Textiles DPP from", value: "2027/2028 (planned)" },
  { label: "Applies to", value: "Manufacturers, Importers" },
  { label: "Data carrier", value: "QR Code / RFID / NFC" },
  { label: "Storage", value: "Decentralised, 10+ years" },
];

/* ─────────────────── Accent ─────────────────── */
const ACCENT = "#14b8a6";

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
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "bg-[#14b8a6] border-[#14b8a6]" : active ? "bg-white border-[#14b8a6] ring-4 ring-teal-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done ? "text-[#14b8a6]" : active ? "text-[#14b8a6]" : "text-[#7a8db0]"}`}>
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
      title="Digital Product Passport (DPP)"
      subtitle="The EU-wide digital identity for products: sustainability data, repairability, and circular economy information at a single scan."
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      regulationKey="dpp"
      href="/digitaler-produktpass"
    >
      {/* ═══════════════ 1. OVERVIEW ═══════════════ */}
      <Section id="ueberblick" title="Overview: What Is the Digital Product Passport?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The <strong>Digital Product Passport (DPP)</strong> is an EU-wide digital data structure
          that makes product-related information accessible across the entire lifecycle of a product
          — from raw material extraction through production to disposal.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The legal basis is the <strong>Ecodesign for Sustainable Products Regulation (ESPR)</strong>
          (EU 2024/1781), which entered into force in July 2024. The DPP is not a uniform system but
          is specified for each product group through delegated acts.
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The goal of the DPP is to promote the circular economy: consumers, repair services,
          recyclers, and authorities gain structured access to information about materials,
          repairability, spare parts, and proper disposal.
          <SourceRef id={2} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="30+" label="Planned product groups" />
          <StatCard value="10 yrs" label="Minimum storage period" />
          <StatCard value="2027" label="First DPP mandate (batteries)" />
        </div>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Deadlines">
        <div className="space-y-0">
          <TimelineItem
            date="July 2024"
            title="ESPR enters into force"
            description="The Ecodesign for Sustainable Products Regulation (EU 2024/1781) enters into force. It forms the legal basis for all product-group-specific DPP requirements."
            done
          />
          <TimelineItem
            date="2025–2026"
            title="Delegated acts for first product groups"
            description="The European Commission is developing delegated acts for priority product groups (textiles, electronics, furniture, steel, cement, chemicals)."
            active
          />
          <TimelineItem
            date="18 Feb. 2027"
            title="DPP mandate for batteries"
            description="All industrial batteries above 2 kWh and electric vehicle batteries must have a DPP (Batteries Regulation EU 2023/1542). Later deadlines apply to other battery categories."
          />
          <TimelineItem
            date="2027/2028"
            title="DPP for textiles & apparel"
            description="Expected introduction of the DPP for textile products, following adoption of the relevant delegated act."
          />
          <TimelineItem
            date="2030+"
            title="Full product coverage"
            description="Gradual introduction for all remaining product groups according to the Commission's ESPR work programme."
          />
        </div>
      </Section>

      {/* ═══════════════ 3. WHO IS AFFECTED ═══════════════ */}
      <Section id="betroffene" title="Who Is Affected?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The DPP affects all actors in the supply chain — with different roles
          and responsibilities:
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Manufacturers",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Manufacturers bear primary responsibility: they must create the DPP, populate it with data,
                  and keep it accessible for the entire product lifecycle. When substantial product changes
                  are made, the DPP data must be updated. Manufacturers are liable for the accuracy
                  of DPP data.
                </p>
              ),
            },
            {
              title: "Importers and distributors",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Importers and distributors must ensure that products they place on the market
                  have a DPP. They may not sell products without a DPP where one is required.
                  They are also responsible for passing on DPP data to the next level of the
                  supply chain.
                </p>
              ),
            },
            {
              title: "Suppliers and supply chain",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Suppliers will need to provide data for the DPP — even if they are not directly
                  obligated themselves. Manufacturers will impose contractual requirements on their
                  suppliers to obtain the necessary data (material composition, carbon footprint,
                  origin).
                </p>
              ),
            },
            {
              title: "Repair services, recyclers, authorities",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  These actors are primarily users of the DPP. Repair services need information
                  on disassembly and spare parts. Recyclers require material information for
                  optimal raw material recovery. Market surveillance authorities use the DPP for
                  conformity checks.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 4. PRODUCT GROUPS ═══════════════ */}
      <Section id="produktgruppen" title="Priority Product Groups">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The ESPR provides for a phased introduction. The European Commission has set the
          following priorities:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { group: "Batteries & accumulators", year: "2027", priority: "High" },
            { group: "Textiles & apparel", year: "2027/28", priority: "High" },
            { group: "Electronics & ICT", year: "2028", priority: "High" },
            { group: "Furniture & wood products", year: "2028/29", priority: "Medium" },
            { group: "Steel, cement, aluminium", year: "2028/29", priority: "Medium" },
            { group: "Chemicals & detergents", year: "2029+", priority: "Medium" },
          ].map((item) => (
            <div key={item.group} className="rounded-xl border border-[#d8dff0] bg-white p-4">
              <div className="flex justify-between items-start mb-1">
                <span className="font-[Syne] font-bold text-sm text-[#060c1a]">{item.group}</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-teal-50 text-[#14b8a6]">{item.priority}</span>
              </div>
              <div className="font-mono text-xs text-[#7a8db0]">Planned from: {item.year}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 5. DATA CONTENTS ═══════════════ */}
      <Section id="dateninhalte" title="Data Contents & Required Fields">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The exact data content is determined for each product group through delegated acts.
          However, the ESPR defines categories of information that may generally be included
          in the DPP:
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "General product information",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Unique Product Identifier (UPI), manufacturer and contact details,
                  product designation, model and variant, EAN/GTIN or other product codes,
                  date and place of manufacture, relevant conformity certificates and CE marking.
                </p>
              ),
            },
            {
              title: "Materials & substances",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Material composition (materials, weight proportions), use of recycled
                  materials (recycled content share), presence of hazardous substances or
                  substances of very high concern (SVHCs), origin of critical raw materials.
                  Level of detail depends on the product group.
                </p>
              ),
            },
            {
              title: "Environmental performance",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Carbon footprint (Product Carbon Footprint, PCF) according to recognised
                  methodology, water consumption, durability class, energy efficiency class,
                  Environmental Product Declaration (EPD). For some product groups: full
                  Environmental Product Footprint (PEF).
                </p>
              ),
            },
            {
              title: "Repairability & spare parts",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Repairability index or rating, availability of spare parts and their
                  sources, disassembly instructions for repair services, information on
                  software updates and their availability, expected product lifespan.
                </p>
              ),
            },
            {
              title: "End-of-life & recycling",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Disposal instructions for consumers, disassembly information for recyclers,
                  take-back schemes and addresses, recyclability rate, information on hazardous
                  materials that require special handling during disposal.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 6. DATA CARRIERS ═══════════════ */}
      <Section id="traegermedien" title="Data Carriers & Access Systems">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The DPP data carrier on the product or packaging enables physical access
          to the digital data. The ESPR permits various technologies.
          <SourceRef id={5} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Permitted data carriers",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  QR code (most commonly expected), RFID tag, NFC chip, Data Matrix code, barcode
                  (EAN/GS1). The data carrier must be affixed directly to the product or packaging
                  and remain readable for the entire product lifespan. Exemptions may apply for
                  small products.
                </p>
              ),
            },
            {
              title: "Access rights and visibility levels",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Not all DPP data is visible to all users. The system distinguishes:
                  publicly accessible data (for consumers), restricted data
                  (only for repair services, recyclers, authorities), and confidential business data
                  (only for authorities). Access rights are managed through technical systems and roles.
                </p>
              ),
            },
            {
              title: "Data storage and sovereignty",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Data does not have to be stored centrally. The DPP functions as a decentralised
                  system: the data carrier contains a Unique Product Identifier (UPI) that points to
                  the data held by the manufacturer or an authorised data operator. Manufacturers
                  retain data control but must ensure availability and integrity.
                </p>
              ),
            },
            {
              title: "EU Registry system",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The European Commission is developing a central registry system (Ecodesign for
                  Sustainable Products Registry, ESPR Registry) that registers UIDs and stores
                  references to data holders. This enables interoperable access without storing
                  all data centrally. Details are still under development.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 7. BATTERIES ═══════════════ */}
      <Section id="batterien" title="Battery DPP: First Mandatory Implementation">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The <strong>Batteries Regulation (EU 2023/1542)</strong> is the first EU regulation with
          an explicit, time-bound DPP obligation from <strong>18 February 2027</strong>.
          <SourceRef id={3} sources={sources} accent={ACCENT} />
        </p>
        <div className="rounded-2xl border border-teal-200 bg-teal-50 p-6 mb-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3">Affected battery categories</h3>
          <ul className="list-disc list-inside space-y-1 text-[#3a4a6b] text-sm">
            <li>Industrial batteries with a capacity &gt; 2 kWh</li>
            <li>Electric vehicle batteries (EV batteries)</li>
            <li>Light means of transport batteries (e-bikes, e-scooters)</li>
            <li>Starter batteries (later deadline)</li>
          </ul>
        </div>
        <AccordionSection
          items={[
            {
              title: "Mandatory contents of the battery DPP",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The battery DPP must include: capacity, energy density and performance data,
                  carbon footprint (according to EU calculation methodology), recycled content
                  (cobalt, lithium, nickel, lead), cell chemistry, due diligence report on the
                  raw material supply chain, conformity certificates, and information on return
                  and recycling programmes.
                </p>
              ),
            },
            {
              title: "Carbon Footprint Declaration for batteries",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  From February 2027, EV batteries and industrial batteries must have a Carbon
                  Footprint Declaration (CFD) linked in the DPP. From 2028, CO2 thresholds
                  will be introduced: batteries exceeding these may no longer be placed on the
                  market. The European Commission will set the thresholds in delegated acts.
                </p>
              ),
            },
            {
              title: "Supply chain due diligence",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  For certain critical raw materials (cobalt, lithium, graphite, nickel),
                  manufacturers must conduct supply chain due diligence and disclose this in
                  the DPP. The due diligence must address human rights and environmental risks
                  in the raw materials chain and be verified by an independent third party.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 8. TEXTILES ═══════════════ */}
      <Section id="textilien" title="Textiles DPP">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Textiles and apparel are another priority product group with high environmental
          relevance — the sector is responsible for approximately 10% of global CO2 emissions.
          <SourceRef id={6} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Expected data requirements for textiles",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Likely mandatory: fibre composition (material share in %), country of origin
                  of raw materials and processing, environmental certifications (GOTS, OEKO-TEX, etc.),
                  care instructions for maximum lifespan, information on repairability and
                  take-back programmes, carbon footprint and water consumption.
                </p>
              ),
            },
            {
              title: "Connection with ecodesign requirements",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The textiles DPP is part of a broader ESPR delegated act for textiles,
                  which will also include minimum requirements for durability, recyclability,
                  recycled content, and substance restrictions. Companies must plan for both together.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 9. TECHNICAL IMPLEMENTATION ═══════════════ */}
      <Section id="technische-umsetzung" title="Technical Implementation">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Technical DPP implementation requires systems for data creation, storage,
          management, and transmission across the product lifecycle.
          <SourceRef id={4} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Data model and formats",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The EU is developing interoperability standards based on existing approaches
                  (Asset Administration Shell — AAS, GS1 standards, W3C Verifiable Credentials).
                  Manufacturers should rely on open, standardised data formats. Proprietary
                  systems may limit interoperability with authorities and partners.
                </p>
              ),
            },
            {
              title: "System integration",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  DPP data must be aggregated from various internal systems: PLM systems
                  (product data), ERP (production data), supply chain management systems (supplier
                  data), and environmental management systems (emissions data). API interfaces
                  to suppliers for automated data transfer are recommended.
                </p>
              ),
            },
            {
              title: "Data maintenance and updates",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  DPP data must be kept up to date throughout the entire lifecycle. When
                  product changes occur, new suppliers are onboarded, or environmental data is updated,
                  an update is required. Systems should support versioning and change history.
                  A minimum of 10 years of data availability after the last placing on the market.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 10. DATA PROTECTION ═══════════════ */}
      <Section id="datenschutz" title="Data Protection & Access Rights">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The DPP also contains confidential business information. The ESPR provides for
          differentiated access rights that must be compatible with the GDPR.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Three-tier access model",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Tier 1 (Public): Basic product information, environmental properties,
                  disposal instructions. Accessible to everyone without authentication.
                  Tier 2 (Restricted): Technical disassembly information for repair services,
                  detailed material information for recyclers. Access after role verification.
                  Tier 3 (Confidential): Trade secrets, accessible only to authorities in the
                  context of market surveillance.
                </p>
              ),
            },
            {
              title: "GDPR and personal data",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  DPP data must not, as a rule, contain or enable personal data about end
                  consumers (tracking concerns). Where a DPP system collects usage data,
                  GDPR requirements apply. Manufacturers must conduct a Data Protection
                  Impact Assessment (DPIA) for their DPP system.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 11. MARKET SURVEILLANCE ═══════════════ */}
      <Section id="marktüberwachung" title="Market Surveillance & Sanctions">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Market surveillance authorities gain significantly improved tools for
          product conformity checks through the DPP.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="Digital" label="Access for authorities" />
          <StatCard value="Instant" label="Retrievable on-site" />
          <StatCard value="EU-wide" label="Harmonised inspection" />
        </div>
        <AccordionSection
          items={[
            {
              title: "Authority inspection rights",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Market surveillance authorities have the right to access all DPP data —
                  including confidential information. They can request manufacturers to correct
                  or supplement DPP data. Where violations are identified, they can prohibit
                  the sale of products without a correct DPP.
                </p>
              ),
            },
            {
              title: "Sanctions for DPP violations",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The ESPR requires Member States to introduce effective, proportionate, and
                  dissuasive sanctions. The specific level of sanctions is determined nationally.
                  Typical measures include: fines, recall orders, and sales bans for
                  non-compliant products.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 12. INTERPLAY ═══════════════ */}
      <Section id="zusammenspiel" title="Interplay with Other EU Laws">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The DPP is part of a broad EU regulatory framework for sustainable products
          and the circular economy:
        </p>
        <AccordionSection
          items={[
            {
              title: "Green Claims Directive",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The DPP can serve as a technical basis for green claims — it provides the
                  data foundation on which environmental statements can be based. Companies
                  using DPP data for their sustainability communications must comply with the
                  requirements of the Green Claims Directive.
                </p>
              ),
            },
            {
              title: "CSRD — Sustainability reporting",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  DPP data (particularly product environmental data, carbon footprints) can
                  feed directly into CSRD reporting. Companies implementing both systems
                  should use a common data foundation to avoid duplication of effort and
                  ensure consistency.
                </p>
              ),
            },
            {
              title: "Supply chain due diligence obligations (CSDDD)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The DPP data requirements on the supply chain (raw material origin, due
                  diligence reports) overlap with the requirements of the CSDDD. An integrated
                  supply chain data strategy helps to efficiently fulfil both regulations.
                </p>
              ),
            },
            {
              title: "CE marking & conformity assessment",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The DPP contains references to CE conformity certificates and technical
                  documentation. It complements the existing CE processes but does not replace
                  them. Declarations of conformity must be easily accessible via the DPP.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 13. COMPLIANCE ROADMAP ═══════════════ */}
      <Section id="fahrplan" title="Compliance Roadmap">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Given the complexity of the DPP, we recommend the following phased approach:
        </p>
        <AccordionSection
          items={[
            {
              title: "Phase 1 (Now): Impact analysis",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Determine which of your products will be subject to DPP obligations and when.
                  Monitor the development of delegated acts for your product groups.
                  Start with pilot projects for priority product groups (batteries, textiles).
                </p>
              ),
            },
            {
              title: "Phase 2 (Short-term): Develop data strategy",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Identify which data you have today and which still needs to be collected.
                  Analyse your existing IT systems for DPP integration capability. Begin
                  building data collection processes for the supply chain. Choose a DPP
                  platform concept (in-house development vs. standard software vs. SaaS).
                </p>
              ),
            },
            {
              title: "Phase 3 (Medium-term): Technical implementation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Implement DPP systems for priority product groups. Integrate supplier
                  interfaces for automated data transfer. Test data carrier concepts
                  (QR code, NFC) and access rights management. Conduct a GDPR Data Protection
                  Impact Assessment.
                </p>
              ),
            },
            {
              title: "Phase 4 (Long-term): Full implementation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Extend to all affected product groups. Ensure long-term data availability
                  (10+ years). Integrate with CSRD reporting and Green Claims documentation.
                  Establish processes for ongoing data maintenance and updates.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 14. FAQ ═══════════════ */}
      <Section id="faq" title="Frequently Asked Questions (FAQ)">
        <AccordionSection
          items={[
            {
              title: "Does every single product need its own DPP?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  It depends on the product group. For serialised products (e.g. EV batteries),
                  a unique identifier per unit is expected. For mass-produced products (e.g.
                  textiles), a model-level DPP will likely suffice that applies to all products
                  of a given model. The delegated acts will specify this in detail.
                </p>
              ),
            },
            {
              title: "Who pays for the DPP implementation?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Implementation costs are borne by manufacturers. The European Commission
                  estimates one-off costs at EUR 3,000 to 10,000 per company for simple systems,
                  significantly more for complex product groups. In the long term, efficiency
                  gains from better data use are expected to outweigh the costs.
                </p>
              ),
            },
            {
              title: "Does the DPP also apply to imported products?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Yes. All products placed on the EU market must meet DPP requirements —
                  regardless of the place of manufacture. Importers are responsible when the
                  manufacturer is based outside the EU. This creates a competitive advantage
                  for EU producers who already have experience.
                </p>
              ),
            },
            {
              title: "How long must the DPP remain available?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  At least for the expected product lifespan, but for a minimum of 10 years
                  after the last unit of a model is placed on the market. For long-lived
                  products such as industrial batteries, the requirement may be significantly
                  longer. Companies must ensure data availability even after business cessation.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════════ RELATED REGULATIONS ═══════════════════ */}
      <RelatedGuides currentGuide="digitaler-produktpass" accent="#166534" />

      {/* ═══════════════ TOOL RECOMMENDATION ═══════════════ */}
      <ToolRecommendation regulationKey="dpp" accent={ACCENT} />

      {/* ═══════════════ SOURCES ═══════════════ */}
      <Section id="quellen" title="Sources & Further Reading">
        <SourceList sources={sources} />
      </Section>
    </GuidePageLayout>
  );
}
