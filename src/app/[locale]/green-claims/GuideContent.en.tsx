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
    title: "Directive (EU) 2024/825 — Green Claims Directive (Full Text)",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A52023PC0166",
    desc: "Official directive proposal by the European Commission from March 2023",
    type: "Directive",
  },
  {
    id: 2,
    title: "EU Commission — Green Claims Initiative",
    url: "https://environment.ec.europa.eu/topics/circular-economy/green-claims_en",
    desc: "Background information and official documents from the European Commission",
    type: "Authority",
  },
  {
    id: 3,
    title: "Directive (EU) 2024/825 — Empowering Consumers",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024L0825",
    desc: "Consumer protection directive on greenwashing, in force since March 2024",
    type: "Directive",
  },
  {
    id: 4,
    title: "BEUC — Green Claims: What Consumers Need",
    url: "https://www.beuc.eu/sites/default/files/publications/beuc-x-2023-046_green_claims_directive.pdf",
    desc: "European Consumer Organisation on the Green Claims Directive",
    type: "Study",
  },
  {
    id: 5,
    title: "ISO 14021 — Environmental Labelling",
    url: "https://www.iso.org/standard/66652.html",
    desc: "International standard for self-declared environmental claims",
    type: "Standard",
  },
  {
    id: 6,
    title: "ISO 14044 — Life Cycle Assessment (LCA)",
    url: "https://www.iso.org/standard/38498.html",
    desc: "Standard for life cycle assessment requirements",
    type: "Standard",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Overview" },
  { id: "timeline", label: "Timeline & Deadlines" },
  { id: "betroffene", label: "Who Is Affected?" },
  { id: "verbote", label: "Prohibited Practices" },
  { id: "anforderungen", label: "Substantiation Requirements" },
  { id: "zertifizierung", label: "Verification & Certification" },
  { id: "siegel", label: "Eco-Labels & Seals" },
  { id: "lca", label: "Life Cycle Assessment" },
  { id: "kommunikation", label: "Communication & Marketing" },
  { id: "durchsetzung", label: "Market Surveillance & Sanctions" },
  { id: "zusammenspiel", label: "Interplay with Other Laws" },
  { id: "fahrplan", label: "Compliance Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Penalty", value: "4% of turnover" },
  { label: "In Force", value: "2026/2027 (planned)" },
  { label: "Pre-verification", value: "Required before advertising" },
  { label: "Applies to", value: "B2C companies" },
  { label: "LCA", value: "Recommended/Required" },
  { label: "Label Requirement", value: "Accredited only" },
];

/* ─────────────────── Accent ─────────────────── */
const ACCENT = "#059669";

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
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "bg-[#059669] border-[#059669]" : active ? "bg-white border-[#059669] ring-4 ring-emerald-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done ? "text-[#059669]" : active ? "text-[#059669]" : "text-[#7a8db0]"}`}>
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
      title="Green Claims Directive"
      subtitle="EU directive against greenwashing: environmental advertising must be scientifically substantiated — before it is published."
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      regulationKey="green-claims"
      href="/green-claims"
    >
      {/* ═══════════════ 1. OVERVIEW ═══════════════ */}
      <Section id="ueberblick" title="Overview: What Is the Green Claims Directive?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The <strong>Green Claims Directive (GCD)</strong> is an EU directive proposal by the Commission
          from March 2023 that requires companies to scientifically substantiate environmental claims in
          their advertising <em>before publication</em> and have them verified by independent third parties.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Background: According to the EU Commission, over <strong>53% of all environmental claims</strong> in
          the EU are vague, misleading, or unfounded. The directive aims to end this practice and ensure
          fair competition for sustainable companies.
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          In parallel, the <strong>Empowering Consumers Directive</strong> (EU 2024/825) has already entered
          into force, prohibiting greenwashing as an unfair commercial practice.
          <SourceRef id={3} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="53 %" label="Environmental claims misleading" />
          <StatCard value="4 %" label="Max. turnover penalty" />
          <StatCard value="2026+" label="Planned entry into force" />
        </div>
        <p className="text-[#3a4a6b] text-sm leading-relaxed bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <strong>Important:</strong> The GCD is still in the legislative process (as of spring 2025).
          The timeline may shift. However, companies should already review their environmental communication
          now, as the Empowering Consumers Directive is already in effect.
        </p>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Deadlines">
        <div className="space-y-0">
          <TimelineItem
            date="March 2023"
            title="Commission Proposal"
            description="The EU Commission publishes the directive proposal for the Green Claims Directive."
            done
          />
          <TimelineItem
            date="March 2024"
            title="Empowering Consumers Directive Enters into Force"
            description="EU 2024/825 enters into force — greenwashing prohibited as an unfair practice. Member states have 24 months for transposition."
            done
          />
          <TimelineItem
            date="2024/2025"
            title="Trilogue Negotiations"
            description="Parliament, Council, and Commission negotiate the final text of the Green Claims Directive."
            active
          />
          <TimelineItem
            date="2025/2026"
            title="Expected Adoption"
            description="After trilogue agreement: publication in the EU Official Journal, start of the transposition period (expected 18–24 months)."
          />
          <TimelineItem
            date="2027 (expected)"
            title="Full Application"
            description="All companies in the B2C sector must have pre-verified their environmental claims and may only use approved labels."
          />
        </div>
      </Section>

      {/* ═══════════════ 3. WHO IS AFFECTED ═══════════════ */}
      <Section id="betroffene" title="Who Is Affected?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The Green Claims Directive targets <strong>all companies</strong> operating in the B2C sector
          that make environmental claims about their products or services — regardless of size or industry.
        </p>
        <AccordionSection
          items={[
            {
              title: "Affected Companies",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  All companies with B2C business in the EU: manufacturers, retailers, service providers,
                  online platforms. Also companies from third countries marketing their products in the EU.
                  Exempted: pure B2B companies without end-consumer contact (national regulations may differ).
                </p>
              ),
            },
            {
              title: "Affected Claims and Channels",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  All voluntary environmental claims on products, packaging, in advertising (online/offline),
                  on websites, and on social media. Examples: &quot;climate neutral&quot;, &quot;sustainable&quot;,
                  &quot;CO&#8322;-compensated&quot;, &quot;eco-friendly&quot;, &quot;recycled&quot;, &quot;biodegradable&quot;.
                </p>
              ),
            },
            {
              title: "SME Special Provisions",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Micro-enterprises (&lt; 10 employees, &lt; EUR 2 million turnover) are exempt from the
                  pre-verification requirement. Simplified procedures and extended transition periods are
                  foreseen for small and medium-sized enterprises. However, the prohibition of misleading
                  claims applies to all.
                </p>
              ),
            },
            {
              title: "Areas Not Affected",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Legally mandated environmental labels (e.g., energy labels) do not fall under the GCD.
                  Pure B2B transactions without consumer contact are also exempt. National minimum standards
                  remain unaffected.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 4. PROHIBITED PRACTICES ═══════════════ */}
      <Section id="verbote" title="Prohibited Greenwashing Practices">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The directive explicitly lists prohibited practices that constitute misleading environmental advertising:
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Vague and Generic Environmental Claims",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Terms such as &quot;green&quot;, &quot;eco-friendly&quot;, &quot;ecological&quot;,
                  &quot;sustainable&quot;, or &quot;natural&quot; without a clear, verifiable basis
                  are prohibited. Claims must be specific and refer to concrete, demonstrable
                  environmental aspects.
                </p>
              ),
            },
            {
              title: "Carbon Neutrality and Climate Neutrality Claims",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Claims such as &quot;climate neutral&quot; or &quot;net zero&quot; that are based
                  solely on carbon offsets without actual emission reductions are prohibited. Offsetting
                  may only be communicated as a supplementary measure, not as the sole proof of climate
                  neutrality.
                </p>
              ),
            },
            {
              title: "Unrecognised or Self-Created Labels",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The use of environmental labels that are not issued by accredited bodies is prohibited.
                  This also applies to labels that companies award themselves (e.g., proprietary
                  &quot;green stars&quot;). Only EU-wide recognised or notified certification systems
                  are permitted.
                </p>
              ),
            },
            {
              title: "Selective Communication and Distraction",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  It is prohibited to highlight only positive environmental aspects while concealing
                  significant negative impacts. Example: advertising a product as &quot;recycled&quot;
                  even though its production is highly environmentally harmful. The overall environmental
                  footprint must be adequately represented.
                </p>
              ),
            },
            {
              title: "Future Promises Without a Plan",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Environmental promises for the future (e.g., &quot;climate neutral by 2030&quot;) are
                  only permitted if a concrete, credible, and time-bound implementation plan exists.
                  Vague goals without an action plan are prohibited.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 5. SUBSTANTIATION REQUIREMENTS ═══════════════ */}
      <Section id="anforderungen" title="Substantiation Requirements">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The core principle of the GCD: every environmental claim must be scientifically substantiated
          <strong> before publication</strong> and verified by an independent body.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Scientific Basis",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Claims must be based on recognised scientific evidence, international standards
                  (e.g., ISO 14020 series, EN standards), or EU methods (e.g., Product Environmental Footprint).
                  Proprietary methodologies must be transparent and peer-reviewed.
                </p>
              ),
            },
            {
              title: "Life Cycle Assessment (LCA)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Claims about the overall environmental footprint of a product require a full life cycle
                  assessment in accordance with ISO 14040/44. The LCA must cover all significant environmental
                  aspects (raw materials, production, transport, use, disposal).
                  <SourceRef id={6} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "Independent Third-Party Verification",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Before publication, an accredited conformity assessment body must review and confirm the
                  claim and its underlying evidence. The verification body must have no economic interest
                  in the outcome. The verification certificate must be publicly accessible.
                </p>
              ),
            },
            {
              title: "Documentation Requirements",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Companies must document the entire evidence base for each claim and keep it available
                  for authorities: studies, LCA reports, verification certificates, calculation bases.
                  Retention period: at least 5 years after the last use of the claim.
                </p>
              ),
            },
            {
              title: "Comparative Environmental Claims",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Claims such as &quot;X% more climate-friendly than Y&quot; are subject to particularly
                  strict requirements: the basis and method of comparison must be transparent, equivalent
                  products must be compared, and the data must be current (max. 5 years old).
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 6. VERIFICATION & CERTIFICATION ═══════════════ */}
      <Section id="zertifizierung" title="Verification & Certification">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The GCD provides for a two-tier verification system: independent pre-verification and
          regulatory market surveillance after publication.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <StatCard value="Before" label="Publication (pre-verification)" />
          <StatCard value="After" label="Market surveillance (ex-post)" />
        </div>
        <AccordionSection
          items={[
            {
              title: "Accredited Verification Bodies",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Verification bodies must be accredited under ISO/IEC 17065. Accreditation is handled
                  by the national accreditation body (in Germany: DAkkS). The EU Commission will maintain
                  a list of notified bodies. Company-owned bodies are generally not permitted.
                </p>
              ),
            },
            {
              title: "Certificate of Conformity",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Following successful verification, the accredited body issues a certificate of conformity
                  containing the claim, its basis, the verification method, and the validity period.
                  This certificate must be made publicly accessible (e.g., via QR code or website).
                </p>
              ),
            },
            {
              title: "Validity Period and Renewal",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Certificates of conformity have a limited validity period (expected 3–5 years).
                  In the event of material changes to the product, production, or data basis, the
                  claim must be reassessed and recertified.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 7. ECO-LABELS ═══════════════ */}
      <Section id="siegel" title="Eco-Labels & Environmental Seals">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The GCD massively restricts the use of environmental labels. Only recognised systems
          are permitted.
          <SourceRef id={2} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Permitted Labels",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Only labels from EU-wide recognised or officially notified certification systems
                  are admissible. These currently include: EU Ecolabel, EU Organic Logo, Blue Angel
                  (nationally recognised), FSC, PEFC, as well as other systems approved through an
                  EU recognition procedure.
                </p>
              ),
            },
            {
              title: "Prohibited Labels",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Company-internal labels without external accreditation are prohibited. Labels from
                  systems that do not meet sufficient requirements for third-party verification,
                  transparency, and ambition level will not be recognised. Existing labels may lose
                  their status if they fail to meet the new requirements.
                </p>
              ),
            },
            {
              title: "Requirements for Certification Systems",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Recognised systems must: have scientifically founded criteria, require independent
                  third-party verification, be transparent (public criteria documents), be regularly
                  reviewed and updated, and maintain a complaints procedure.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 8. LCA ═══════════════ */}
      <Section id="lca" title="Life Cycle Assessment (LCA) as a Foundation">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          For comprehensive environmental claims, a life cycle assessment (LCA) in accordance with
          ISO 14040/44 is the preferred or, in many cases, mandatory method.
          <SourceRef id={6} sources={sources} accent={ACCENT} />
        </p>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 mb-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3">LCA Phases per ISO 14040/44</h3>
          <ol className="list-decimal list-inside space-y-2 text-[#3a4a6b] text-sm">
            <li><strong>Goal and Scope Definition:</strong> Defining the system boundaries and functional unit</li>
            <li><strong>Inventory Analysis (LCI):</strong> Recording all material and energy flows</li>
            <li><strong>Impact Assessment (LCIA):</strong> Evaluating environmental impacts across various categories</li>
            <li><strong>Interpretation:</strong> Conclusions, recommendations, and critical review</li>
          </ol>
        </div>
        <AccordionSection
          items={[
            {
              title: "Product Environmental Footprint (PEF)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The EU has developed the Product Environmental Footprint (PEF) as a standardised LCA method,
                  specified for various product categories (Category Rules, PEFCR). PEF-based claims receive
                  preferential treatment under the GCD and are easier to substantiate.
                </p>
              ),
            },
            {
              title: "Cost and Effort of an LCA",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  A full ISO-compliant LCA typically costs EUR 10,000–50,000 per product line, depending
                  on supply chain complexity. Screening LCAs or sector-specific tools can be less expensive
                  (EUR 2,000–10,000). Simplified approaches and funding opportunities are available for SMEs.
                </p>
              ),
            },
            {
              title: "Critical Review",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  For comparative claims and for claims intended to be used under the GCD, a critical review
                  of the LCA by external experts is mandatory (ISO 14044, Section 6). The critical review
                  ensures scientific validity and reproducibility.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 9. COMMUNICATION ═══════════════ */}
      <Section id="kommunikation" title="Communication & Marketing Requirements">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Beyond substantiation, the GCD sets specific requirements for how environmental claims
          may be communicated.
        </p>
        <AccordionSection
          items={[
            {
              title: "Transparency Requirements",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The following information must be easily accessible for every environmental claim: the
                  exact claim, which aspect it refers to, the assessment method used, the verification
                  certificate, and, where applicable, the benchmark for comparison. QR codes or links to
                  detailed information are a recommended approach.
                </p>
              ),
            },
            {
              title: "Prohibition of Distraction and Cherry-Picking",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Companies may not highlight individual positive aspects when the overall picture is
                  negative. Communication must convey a balanced view of environmental performance.
                  Even the presentation (e.g., font size, placement) must not be misleading.
                </p>
              ),
            },
            {
              title: "Digital Product Passports as Support",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The EU Digital Product Passport (DPP) can serve as a vehicle for environmental information
                  and help fulfil the GCD&apos;s transparency obligations. Particularly for products where a DPP
                  is already becoming mandatory (e.g., batteries, textiles), integration is advisable.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 10. MARKET SURVEILLANCE & SANCTIONS ═══════════════ */}
      <Section id="durchsetzung" title="Market Surveillance & Sanctions">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The GCD provides for effective, proportionate, and dissuasive sanctions. Enforcement
          is the responsibility of national authorities.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="4 %" label="Max. annual turnover (penalty)" />
          <StatCard value="Public" label="Disclosure of violations" />
          <StatCard value="Recall" label="Withdrawal of claim possible" />
        </div>
        <AccordionSection
          items={[
            {
              title: "Sanctions Overview",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Minimum penalty: 4% of annual turnover for EU-wide infringements. Additional measures
                  include disgorgement of profits, public disclosure of the violation (name-and-shame),
                  and temporary exclusion from participation in public procurement.
                </p>
              ),
            },
            {
              title: "Competent Authorities",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Market surveillance authorities of the member states are responsible for enforcement.
                  In Germany, this will likely be the Federal Environment Agency, competition authorities,
                  and consumer protection authorities. Coordination at the EU level is handled by the
                  European Product Compliance Network (EPCN).
                </p>
              ),
            },
            {
              title: "Consumer and Competitor Litigation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  In addition to regulatory enforcement, competitors can take action against greenwashing
                  through unfair competition law, and consumer protection organisations can pursue
                  representative actions (EU Representative Actions Directive). The risk of legal
                  challenges is already high today.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 11. INTERPLAY WITH OTHER LAWS ═══════════════ */}
      <Section id="zusammenspiel" title="Interplay with Other EU Laws">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The Green Claims Directive is part of a broad EU regulatory framework for sustainable
          products and corporate governance:
        </p>
        <AccordionSection
          items={[
            {
              title: "CSRD — Sustainability Reporting",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The CSRD requires large companies to disclose sustainability data. This data can
                  serve as a basis for green claims — but must comply with GCD requirements.
                  Contradictions between CSRD reports and marketing claims represent a liability risk.
                </p>
              ),
            },
            {
              title: "Digital Product Passport (DPP)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The DPP will provide the technical infrastructure for environmental information
                  across many product categories. Green claims can be communicated and verified via
                  the DPP. Leveraging synergies: companies implementing the DPP will significantly
                  facilitate GCD compliance.
                </p>
              ),
            },
            {
              title: "EU Taxonomy / Sustainable Finance",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Companies marketing themselves as &quot;taxonomy-aligned&quot; or &quot;sustainable&quot;
                  in a financial market context must ensure that these claims also meet GCD standards.
                  Greenwashing in the financial sector is simultaneously regulated by the SFDR and the
                  Taxonomy Regulation.
                </p>
              ),
            },
            {
              title: "Empowering Consumers Directive (Already in Force)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Directive EU 2024/825 must already be transposed into national law (deadline: March 2026).
                  It explicitly prohibits generic environmental claims, unsubstantiated future promises,
                  and unrecognised labels. Companies should adapt their advertising now.
                  <SourceRef id={3} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 12. COMPLIANCE ROADMAP ═══════════════ */}
      <Section id="fahrplan" title="Compliance Roadmap for Companies">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Even though the GCD has not yet been finally adopted, companies should act now —
          the Empowering Consumers Directive is already in effect:
        </p>
        <AccordionSection
          items={[
            {
              title: "Phase 1 (Immediately): Inventory",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Catalogue all current environmental claims in advertising, on packaging, and on your
                  website. Assess which of these claims are already substantiated and documented.
                  Identify high-risk claims (vague, unsubstantiated, comparative).
                </p>
              ),
            },
            {
              title: "Phase 2 (Short-Term): Immediate Risk Mitigation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Remove or revise claims that cannot be substantiated. Replace vague terms with specific,
                  evidenced claims. Remove unrecognised labels. Train your marketing and communications
                  teams on the new requirements.
                </p>
              ),
            },
            {
              title: "Phase 3 (Medium-Term): Building Methodology",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Commission LCAs for your key product lines. Select recognised certification systems
                  (EU Ecolabel, Blue Angel, etc.). Build internal processes for data collection and
                  documentation. Identify accredited verification bodies for pre-verification.
                </p>
              ),
            },
            {
              title: "Phase 4 (Long-Term): System Integration",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Integrate environmental data into product development processes. Link CSRD reporting
                  with green claims documentation. Prepare for digital disclosure (DPP, QR codes).
                  Establish continuous monitoring of communicated claims.
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
              title: "Does the Green Claims Directive also apply to small businesses?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Micro-enterprises (fewer than 10 employees and less than EUR 2 million turnover) are
                  exempt from the pre-verification requirement. However, the prohibition of misleading
                  claims applies to all companies — even micro-enterprises may not make false or
                  misleading environmental claims.
                </p>
              ),
            },
            {
              title: 'Can I still put "climate neutral" on my product?',
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Only if the claim is scientifically substantiated, verified by an accredited body,
                  and not based solely on carbon offsets. Pure offset-based climate neutrality claims
                  will be prohibited under the GCD. Recommendation: switch to more precise claims
                  now (e.g., &quot;X% CO&#8322; reduced since 2020&quot;).
                </p>
              ),
            },
            {
              title: "What does compliance with the Green Claims Directive cost?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The EU Commission estimates costs of EUR 1,000–2,500 per claim for pre-verification.
                  LCAs cost an additional EUR 10,000–50,000 per product line. Companies with few,
                  specific environmental claims will face lower costs than those with broad sustainability
                  communications.
                </p>
              ),
            },
            {
              title: "When does the Green Claims Directive enter into force?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The final timeline depends on the conclusion of trilogue negotiations. After publication
                  in the EU Official Journal, member states will likely have 18–24 months for transposition.
                  Full application is expected no earlier than 2027. The Empowering Consumers Directive
                  (greenwashing ban) has been in effect since March 2024.
                </p>
              ),
            },
            {
              title: "How does the GCD differ from existing advertising rules?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Existing advertising rules (unfair competition law, Unfair Commercial Practices Directive)
                  are based on ex-post control — authorities or competitors must prove a violation. The GCD
                  introduces an ex-ante obligation: companies must prove that their claims are accurate
                  before publication.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════════ RELATED REGULATIONS ═══════════════════ */}
      <RelatedGuides currentGuide="green-claims" accent="#15803d" />

      {/* ═══════════════ TOOL RECOMMENDATION ═══════════════ */}
      <ToolRecommendation regulationKey="green-claims" accent={ACCENT} />

      {/* ═══════════════ SOURCES ═══════════════ */}
      <Section id="quellen" title="Sources & Further Reading">
        <SourceList sources={sources} />
      </Section>
    </GuidePageLayout>
  );
}
