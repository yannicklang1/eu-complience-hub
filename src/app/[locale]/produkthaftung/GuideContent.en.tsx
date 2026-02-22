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
    title: "Richtlinie (EU) 2024/2853 — Produkthaftung (Volltext)",
    url: "https://eur-lex.europa.eu/eli/dir/2024/2853/oj/deu",
    desc: "Official full text of the new EU Product Liability Directive",
    type: "Richtlinie",
  },
  {
    id: 2,
    title: "EU-Kommission — Neue Produkthaftungsrichtlinie",
    url: "https://commission.europa.eu/business-economy-euro/product-safety-and-requirements/product-liability_de",
    desc: "Official EU Commission information page with FAQ",
    type: "Behörde",
  },
  {
    id: 3,
    title: "Bundesministerium der Justiz — Umsetzung PLD in Deutschland",
    url: "https://www.bmj.de/DE/Themen/GerichteUndRechtsstaat/Produkthaftung/produkthaftung_node.html",
    desc: "Information on the German transposition of the new Product Liability Directive",
    type: "Behörde",
  },
  {
    id: 4,
    title: "EU AI Act (EU) 2024/1689 — KI-Haftungskomponente",
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/deu",
    desc: "EU AI Act: interaction with the new product liability rules for AI systems",
    type: "Verordnung",
  },
  {
    id: 5,
    title: "Cyber Resilience Act (EU) 2024/2847",
    url: "https://eur-lex.europa.eu/eli/reg/2024/2847/oj/deu",
    desc: "CRA: security requirements that reduce product liability risks",
    type: "Verordnung",
  },
  {
    id: 6,
    title: "GDV — Cyber-Versicherung und neue Produkthaftung",
    url: "https://www.gdv.de/de/themen/news/was-unternehmen-zur-neuen-eu-produkthaftung-wissen-muessen-126864",
    desc: "German Insurance Association: implications for insurance obligations",
    type: "Behörde",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Overview" },
  { id: "timeline", label: "Timeline & Deadlines" },
  { id: "software-als-produkt", label: "Software as a Product" },
  { id: "ki-haftung", label: "AI & Algorithms" },
  { id: "beweislast", label: "Reversal of Burden of Proof" },
  { id: "betroffene", label: "Who Is Liable?" },
  { id: "haftungsumfang", label: "Scope of Liability" },
  { id: "open-source", label: "Open Source" },
  { id: "versicherung", label: "Insurance" },
  { id: "praevention", label: "Liability Prevention" },
  { id: "fahrplan", label: "Compliance Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Liability Cap", value: "No Cap" },
  { label: "Transposition DE", value: "9 Dec 2026" },
  { label: "Software Affected", value: "Yes (incl. SaaS)" },
  { label: "AI Systems", value: "Yes (High-Risk)" },
  { label: "Burden of Proof", value: "Reversed (Claimant)" },
  { label: "Limitation Period", value: "10 Years (Pers. Inj.)" },
];

/* ─────────────────── Helpers ─────────────────── */
const ACCENT = "#ef4444";

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
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "border-[#ef4444] bg-[#ef4444]" : active ? "bg-white border-[#ef4444] ring-4 ring-red-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done || active ? "text-[#ef4444]" : "text-[#7a8db0]"}`}>
          {date} {done && "✓"}
        </span>
        <h3 className="font-[Syne] font-bold text-[#060c1a] mt-0.5">{title}</h3>
        <p className="text-[#3a4a6b] text-sm mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function RiskCard({
  risk, level, description,
}: { risk: string; level: "High" | "Medium" | "Low"; description: string }) {
  const colors = { High: "#dc2626", Medium: "#f59e0b", Low: "#059669" };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-[#d8dff0] bg-white p-6"
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className="px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{ background: colors[level] }}
        >
          {level}
        </span>
        <h3 className="font-[Syne] font-bold text-[#060c1a]">{risk}</h3>
      </div>
      <p className="text-[#3a4a6b] text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   GUIDE CONTENT
   ══════════════════════════════════════════════════════ */
export default function GuideContentEN() {
  return (
    <GuidePageLayout
      title="New EU Product Liability (PLD)"
      subtitle="Directive (EU) 2024/2853: Software as a product, AI liability and reversal of burden of proof — what developers and SaaS providers need to know now"
      regulationKey="Richtlinie (EU) 2024/2853"
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      trustBadge={{ lastReview: "19.02.2026", sourceCount: 6, factChecked: true }}
      href="/produkthaftung"
    >

      {/* ═══════════════ 1. OVERVIEW ═══════════════ */}
      <Section id="ueberblick" title="What Does the New Product Liability Directive Change?">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          The <strong>new Product Liability Directive (EU) 2024/2853 (PLD)</strong> replaces the 40-year-old
          Directive from 1985 and revolutionises liability for digital products. The crucial innovation:
          <strong> software is now explicitly classified as a product for the first time</strong> — including SaaS, AI systems
          and automatic software updates. <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          Previously, software occupied a grey area in German law — typically classified as a service
          and therefore only subject to liability in cases of intent or gross negligence. The new PLD establishes
          <strong> strict (no-fault) liability</strong>: anyone who places a defective product
          on the market is liable — regardless of whether they acted negligently. <SourceRef id={2} sources={sources} accent={ACCENT} />
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <StatCard value="Unlimited" label="Liability (no cap for personal injury)" />
          <StatCard value="9 Dec 2026" label="Transposition into national law" />
          <StatCard value="SaaS Affected" label="Cloud software = product too" />
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 mb-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3">What Fundamentally Changes</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-sm mb-2 text-[#060c1a]">Old Directive (1985)</h4>
              <ul className="space-y-1">
                {["Software = service (typically)", "Claimant must prove fault", "Immaterial damages excluded", "10-year limitation period (product)"].map((item) => (
                  <li key={item} className="text-xs text-[#3a4a6b] flex items-start gap-1"><span>✗</span> {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-2 text-[#060c1a]">New PLD (2024)</h4>
              <ul className="space-y-1">
                {["Software = product (always)", "Reversal of burden of proof in favour of claimant", "Data loss and digital damages included", "25-year limitation period (latent damages)"].map((item) => (
                  <li key={item} className="text-xs text-[#3a4a6b] flex items-start gap-1"><span>✓</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Deadlines">
        <div className="space-y-0">
          <TimelineItem
            date="23 October 2024"
            title="PLD published in the EU Official Journal"
            description="Directive (EU) 2024/2853 enters into force. 25-month transposition period for Member States begins."
            done
          />
          <TimelineItem
            date="9 December 2026"
            title="National Transposition — Deadline"
            description="Member States must have transposed the PLD into national law. In Germany: amendment of the ProdHaftG (Product Liability Act)."
            active
          />
          <TimelineItem
            date="From 10 December 2026"
            title="New PLD applies to all new products"
            description="For products placed on the market from this date onwards, the new liability regime applies in full."
          />
          <TimelineItem
            date="Ongoing"
            title="AI Liability Directive (AILD)"
            description="The planned AI Liability Directive (AILD) is intended to complement the PLD and specify burden-of-proof facilitations for AI damages. Status: under negotiation."
          />
        </div>
      </Section>

      {/* ═══════════════ 3. SOFTWARE AS A PRODUCT ═══════════════ */}
      <Section id="software-als-produkt" title="Software as a Product — the Paradigm Shift">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          <LawRef law="Produkthaftungsrichtlinie" article="4" absatz="1" /> explicitly defines software as a product.
          This applies to all distribution models — not only sold software, but also
          SaaS, APIs and automatic updates. <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>

        <div className="grid gap-4 mb-8">
          <RiskCard risk="On-Premises Software" level="High" description="Classic installed software: a bug in the software = product defect. The manufacturer is strictly liable for damages caused by software bugs." />
          <RiskCard risk="SaaS / Cloud Software" level="High" description="Explicitly defined as a product. Updates that introduce a defect can trigger product liability — even if the defect existed only briefly." />
          <RiskCard risk="Automatic Software Updates" level="High" description="If an automatic update introduces a defect, this can trigger product liability — even if the original product was defect-free." />
          <RiskCard risk="Open-Source Software" level="Medium" description="Anyone who commercially distributes OSS or integrates it into their product is liable as a manufacturer. Pure community OSS without a commercial background is generally exempt." />
          <RiskCard risk="Internal Corporate Software" level="Low" description="Software that is only used internally and not placed on the market does not fall under the PLD. Once third parties gain access, liability may arise." />
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2">What Is a &quot;Product Defect&quot; in Software?</h3>
          <p className="text-[#3a4a6b] text-sm leading-relaxed">
            A software product is defective if it does not provide the safety that users
            may legitimately expect. This includes: security vulnerabilities, data loss caused by bugs,
            incorrect calculations, crashes in safety-critical systems and — new — also the
            failure to provide security updates after vulnerabilities become known.
          </p>
        </div>
      </Section>

      {/* ═══════════════ 4. AI LIABILITY ═══════════════ */}
      <Section id="ki-haftung" title="AI Systems & Algorithms">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          AI systems qualify as products within the meaning of the PLD. This has far-reaching consequences
          for AI developers and providers. <SourceRef id={4} sources={sources} accent={ACCENT} />
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { icon: "🤖", title: "High-Risk AI (EU AI Act)", text: "For high-risk AI systems under the AI Act (e.g. healthcare, credit scoring, recruitment), stricter liability rules apply: reversal of burden of proof for suspected defects." },
            { icon: "💊", title: "AI in Medical Devices", text: "AI diagnostic tools, medical image analysis: unlimited liability for bodily harm caused by defective AI decisions." },
            { icon: "🚗", title: "Autonomous Systems", text: "Autonomous driving software, robots, drones: any damage caused by software defects falls under the PLD." },
            { icon: "📊", title: "Decision-Making Algorithms", text: "Credit scoring, risk models, pricing algorithms: discriminatory or erroneous decisions may constitute compensable damages." },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-[#d8dff0] bg-white p-6">
              <div className="text-2xl mb-3">{card.icon}</div>
              <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2">{card.title}</h3>
              <p className="text-[#3a4a6b] text-sm leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 5. BURDEN OF PROOF ═══════════════ */}
      <Section id="beweislast" title="Reversal of Burden of Proof — the Practical Difference">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          The reversal of the burden of proof is the most dangerous instrument of the new PLD for manufacturers.
          <LawRef law="Produkthaftungsrichtlinie" article="9" /> <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white overflow-hidden mb-8">
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#d8dff0]">
            <div className="p-6">
              <h3 className="font-[Syne] font-bold text-[#060c1a] mb-4 text-red-600">Old: Claimant must prove</h3>
              <p className="text-[#3a4a6b] text-sm leading-relaxed mb-4">
                Under the old rules, the injured party had to prove:
              </p>
              <ul className="space-y-2">
                {["Product defect exists", "Damage has occurred", "Causation between defect and damage"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
                    <span className="text-red-500">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6">
              <h3 className="font-[Syne] font-bold mb-4" style={{ color: ACCENT }}>New: Facilitated Burden of Proof</h3>
              <p className="text-[#3a4a6b] text-sm leading-relaxed mb-4">
                In cases of technical complexity, the court presumes defect and causation if:
              </p>
              <ul className="space-y-2">
                {[
                  "Product does not meet the state of the art",
                  "Obvious connection between defect and damage",
                  "Manufacturer fails to disclose evidence (disclosure obligation)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
                    <span style={{ color: ACCENT }}>•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2">Disclosure Obligation: A New Risk</h3>
          <p className="text-[#3a4a6b] text-sm leading-relaxed">
            Courts can compel manufacturers to disclose internal documents, logs, test reports and
            quality data. Those who cannot produce these (e.g. no audit trails)
            risk the presumption of a product defect. Documentation thus becomes a key defence against liability.
          </p>
        </div>
      </Section>

      {/* ═══════════════ 6. WHO IS LIABLE? ═══════════════ */}
      <Section id="betroffene" title="Who Is Liable?">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          The PLD defines a liability cascade — from manufacturers through importers to distributors. <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>

        <div className="space-y-3 mb-8">
          {[
            { prio: "1st Priority", title: "Manufacturer (EU-based)", desc: "Primarily liable. Whoever manufactures the product and places it on the market is strictly liable." },
            { prio: "2nd Priority", title: "Importers (for non-EU manufacturers)", desc: "If the manufacturer is based outside the EU and no EU authorised representative has been designated, the importer is liable as if they were the manufacturer." },
            { prio: "3rd Priority", title: "Authorised Representatives", desc: "EU authorised representatives of non-EU manufacturers bear subsidiary liability." },
            { prio: "4th Priority", title: "Distributors", desc: "Distributors are liable if none of the above-mentioned actors can be identified within 1 month — or if they have modified the product themselves." },
          ].map((item) => (
            <div key={item.prio} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#d8dff0]">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white shrink-0" style={{ background: ACCENT }}>
                {item.prio}
              </span>
              <div>
                <h3 className="font-[Syne] font-bold text-[#060c1a]">{item.title}</h3>
                <p className="text-[#3a4a6b] text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 7. SCOPE OF LIABILITY ═══════════════ */}
      <Section id="haftungsumfang" title="Scope of Liability & Compensable Damages">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          The new PLD significantly expands compensable damages — particularly for digital harm. <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { icon: "🏥", title: "Personal Injury", text: "Death, bodily harm, health damage. No liability cap. Unlimited liability.", color: "#dc2626" },
            { icon: "💻", title: "Data Loss", text: "New: loss or corruption of data is compensable damage — even if no physical product is affected.", color: ACCENT },
            { icon: "🏠", title: "Property Damage", text: "Damage to privately used property above a EUR 1,000 deductible. The threshold protects against minor claims.", color: "#f59e0b" },
            { icon: "🧠", title: "Psychological Harm", text: "Severe psychological harm caused by defective products may now be compensable.", color: "#7c3aed" },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-[#d8dff0] bg-white overflow-hidden">
              <div className="h-1.5" style={{ background: card.color }} />
              <div className="p-6">
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2">{card.title}</h3>
                <p className="text-[#3a4a6b] text-sm leading-relaxed">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 8. OPEN SOURCE ═══════════════ */}
      <Section id="open-source" title="Open-Source Software">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          Open-source software is partially exempt from the PLD — but with important limitations. <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>

        <AccordionSection
          items={[
            {
              title: "When is OSS exempt?",
              content: (
                <div>
                  <p className="text-[#3a4a6b] text-sm leading-relaxed mb-3">OSS is exempt when it:</p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2 text-sm text-[#3a4a6b]"><span style={{ color: ACCENT }}>✓</span> Is provided free of charge and without a commercial background</li>
                    <li className="flex items-start gap-2 text-sm text-[#3a4a6b]"><span style={{ color: ACCENT }}>✓</span> Is not part of a commercial product or commercial service</li>
                    <li className="flex items-start gap-2 text-sm text-[#3a4a6b]"><span style={{ color: ACCENT }}>✓</span> Is not developed by an enterprise in the course of its economic activity</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "When is an OSS maintainer liable regardless?",
              content: (
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-sm text-[#3a4a6b]"><span className="text-red-500">⚠</span> When OSS is used commercially (e.g. SaaS built on OSS)</li>
                  <li className="flex items-start gap-2 text-sm text-[#3a4a6b]"><span className="text-red-500">⚠</span> When the enterprise integrates OSS into its proprietary product</li>
                  <li className="flex items-start gap-2 text-sm text-[#3a4a6b]"><span className="text-red-500">⚠</span> When OSS is provided as part of a commercial support offering</li>
                  <li className="flex items-start gap-2 text-sm text-[#3a4a6b]"><span className="text-red-500">⚠</span> When the maintainer receives compensation for maintenance and upkeep</li>
                </ul>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 9. INSURANCE ═══════════════ */}
      <Section id="versicherung" title="Insurance & Risk Transfer">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          The new PLD creates significant insurance needs — especially for software and AI companies. <SourceRef id={6} sources={sources} accent={ACCENT} />
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3">Product Liability Insurance</h3>
            <p className="text-[#3a4a6b] text-sm leading-relaxed mb-3">Covers damages caused by defective products. Must be extended to include software — many policies are not yet adapted.</p>
            <span className="text-xs font-bold" style={{ color: ACCENT }}>Check your coverage!</span>
          </div>
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3">Cyber Insurance</h3>
            <p className="text-[#3a4a6b] text-sm leading-relaxed mb-3">Covers data loss and cyberattacks. Complements product liability insurance for the data-damage scope of the PLD.</p>
            <span className="text-xs font-bold" style={{ color: ACCENT }}>Combination recommended</span>
          </div>
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3">D&O Insurance</h3>
            <p className="text-[#3a4a6b] text-sm leading-relaxed mb-3">Protects directors and officers from personal liability for breaches of duty — including PLD compliance failures.</p>
            <span className="text-xs font-bold text-amber-600">Consider additionally</span>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 10. PREVENTION ═══════════════ */}
      <Section id="praevention" title="Liability Prevention: What Companies Must Do Now">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          The best defence against liability is a comprehensive quality and documentation system. <SourceRef id={5} sources={sources} accent={ACCENT} />
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { icon: "📋", title: "Documentation", items: ["Complete audit trails for all software versions", "Archive test reports and code reviews", "Release notes and change history", "Incident response protocols"] },
            { icon: "🔒", title: "Security by Design", items: ["CRA-compliant security architecture", "Vulnerability management process", "SBOM (Software Bill of Materials)", "Penetration tests before releases"] },
            { icon: "🔄", title: "Update Management", items: ["Controlled update rollout with rollback option", "Automatic updates only with a clear kill switch", "User notification for security-critical updates", "Define and meet patch SLAs"] },
            { icon: "⚖️", title: "Contractual Safeguards", items: ["Adapt terms and conditions to the new PLD", "Supplier contracts with recourse clauses", "Review software licence agreements", "Supply chain liability agreements"] },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-[#d8dff0] bg-white p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{card.icon}</span>
                <h3 className="font-[Syne] font-bold text-[#060c1a]">{card.title}</h3>
              </div>
              <ul className="space-y-2">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
                    <span style={{ color: ACCENT }} className="mt-0.5 shrink-0">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 11. ROADMAP ═══════════════ */}
      <Section id="fahrplan" title="Compliance Roadmap">
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { phase: "Phase 1 (immediately)", title: "Risk Analysis", items: ["Assess all software products for PLD relevance", "Evaluate AI systems for high-risk classification", "Review existing insurance for software damage coverage"] },
            { phase: "Phase 2 (3 months)", title: "Documentation", items: ["Implement an audit trail system", "Create SBOMs for all products", "Update terms and conditions and contracts"] },
            { phase: "Phase 3 (6 months)", title: "Security & Quality", items: ["Implement CRA requirements", "Schedule penetration tests", "Formalise update processes"] },
            { phase: "Phase 4 (ongoing)", title: "Monitoring", items: ["Track new case law", "Review insurance coverage annually", "Regularly audit supplier liability"] },
          ].map((phase) => (
            <div key={phase.phase} className="rounded-2xl border border-[#d8dff0] bg-white p-6">
              <span className="font-mono text-xs font-bold text-[#ef4444]">{phase.phase}</span>
              <h3 className="font-[Syne] font-bold text-[#060c1a] mt-1 mb-3">{phase.title}</h3>
              <ul className="space-y-1.5">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
                    <span style={{ color: ACCENT }} className="shrink-0 mt-0.5">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 12. FAQ ═══════════════ */}
      <Section id="faq" title="FAQ">
        <AccordionSection
          items={[
            {
              title: "Is my SaaS company liable under the new PLD?",
              content: (<p className="text-[#3a4a6b] text-sm leading-relaxed">Yes — SaaS software qualifies as a product. If your software has a defect and this causes damage (data loss, personal injury, property damage), you are strictly liable regardless of fault. This was not previously this clear-cut.</p>),
            },
            {
              title: "Can I exclude liability in my terms and conditions?",
              content: (<p className="text-[#3a4a6b] text-sm leading-relaxed">No. PLD liability is mandatory and cannot be excluded through terms and conditions. What is possible: shifting liability contractually between businesses in a B2B context (supplier recourse).</p>),
            },
            {
              title: "What does the new PLD mean for GitHub projects?",
              content: (<p className="text-[#3a4a6b] text-sm leading-relaxed">Pure community OSS without a commercial background is generally exempt. Once you use the project commercially, integrate it into products or receive payment for it, the PLD may apply.</p>),
            },
            {
              title: "When exactly does the new PLD apply in Germany?",
              content: (<p className="text-[#3a4a6b] text-sm leading-relaxed">Germany must transpose the Directive into national law by 9 December 2026 (amendment of the ProdHaftG). The new liability regime will then apply to all products placed on the market from that date onwards.</p>),
            },
            {
              title: "How does the PLD differ from the AI Liability Directive (AILD)?",
              content: (<p className="text-[#3a4a6b] text-sm leading-relaxed">The PLD governs strict (no-fault) product liability for all products (including AI systems). The AILD (still under negotiation) is intended to complement this by introducing specific burden-of-proof facilitations for AI-related damages under fault-based liability.</p>),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════════ RELATED REGULATIONS ═══════════════════ */}
      <RelatedGuides currentGuide="produkthaftung" accent="#991b1b" />

      {/* ═══════════════════ SOFTWARE RECOMMENDATIONS ═══════════════════ */}
      <ToolRecommendation regulationKey="pld" accent={ACCENT} />

      {/* ═══════════════════ SOURCES ═══════════════════ */}
      <Section id="quellen" title="Sources & References">
        <SourceList sources={sources} />
      </Section>

    </GuidePageLayout>
  );
}
