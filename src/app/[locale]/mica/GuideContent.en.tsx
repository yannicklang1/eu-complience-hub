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
    title: "Regulation (EU) 2023/1114 — Markets in Crypto-Assets (MiCA) Full Text",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32023R1114",
    desc: "Official text in the EUR-Lex Portal",
    type: "Regulation",
  },
  {
    id: 2,
    title: "ESMA — MiCA Level-2 Measures and Q&A",
    url: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica",
    desc: "Guidelines, technical standards, and FAQs from the European Securities and Markets Authority",
    type: "Authority",
  },
  {
    id: 3,
    title: "EBA — MiCA for E-Money Tokens",
    url: "https://www.eba.europa.eu/regulation-and-policy/crypto-assets",
    desc: "European Banking Authority — Guidelines on E-Money Tokens and ART",
    type: "Authority",
  },
  {
    id: 4,
    title: "BaFin — MiCA in Germany",
    url: "https://www.bafin.de/DE/RechtUndGrundsaetze/RechtlicheGrundlagen/Gesetze_Verordnungen/MiCA/mica_node.html",
    desc: "Federal Financial Supervisory Authority — National implementation",
    type: "Authority",
  },
  {
    id: 5,
    title: "EU Commission — Digital Finance Package",
    url: "https://finance.ec.europa.eu/digital-finance/digital-finance-package_en",
    desc: "Overview of the EU Commission's Digital Finance Package",
    type: "Authority",
  },
  {
    id: 6,
    title: "FATF — Crypto-Asset Guidance",
    url: "https://www.fatf-gafi.org/en/publications/Fatfrecommendations/guidance-rba-virtual-assets-2021.html",
    desc: "FATF guidelines on virtual assets and anti-money laundering",
    type: "Authority",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Overview" },
  { id: "timeline", label: "Timeline & Deadlines" },
  { id: "token-typen", label: "Token Types" },
  { id: "casp", label: "Crypto-Asset Service Providers (CASP)" },
  { id: "whitepaper", label: "Whitepaper Requirements" },
  { id: "emittenten", label: "Issuer Obligations" },
  { id: "art-emt", label: "ART & EMT Special Rules" },
  { id: "aml", label: "Anti-Money Laundering (AML)" },
  { id: "marktmissbrauch", label: "Market Abuse" },
  { id: "zulassung", label: "Authorisation & Licensing" },
  { id: "strafen", label: "Penalties & Sanctions" },
  { id: "drittstaaten", label: "Third-Country Rules" },
  { id: "fahrplan", label: "Compliance Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Fully applicable", value: "30 Dec 2024" },
  { label: "ART/EMT from", value: "30 June 2024" },
  { label: "Max. fine CASP", value: "EUR 700,000 pers." },
  { label: "Min. capital CASP", value: "from EUR 50,000" },
  { label: "Whitepaper", value: "Mandatory (most tokens)" },
  { label: "Licence", value: "EU Passport available" },
];

/* ─────────────────── Accent ─────────────────── */
const ACCENT = "#f59e0b";

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
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "bg-[#f59e0b] border-[#f59e0b]" : active ? "bg-white border-[#f59e0b] ring-4 ring-amber-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done ? "text-[#f59e0b]" : active ? "text-[#f59e0b]" : "text-[#7a8db0]"}`}>
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
      title="MiCA — Markets in Crypto-Assets"
      subtitle="The first comprehensive EU regulatory framework for crypto-assets: authorisation requirements, whitepapers, market abuse prohibitions, and investor protection."
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      regulationKey="mica"
      href="/mica"
    >
      {/* ═══════════════ 1. OVERVIEW ═══════════════ */}
      <Section id="ueberblick" title="Overview: What Is MiCA?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The <strong>Markets in Crypto-Assets Regulation (MiCA)</strong> is the world&apos;s first
          comprehensive legislative regulation for crypto-assets at the EU level. It entered into force on
          29 June 2023 and applies in two phases.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          MiCA establishes a uniform EU legal framework for the issuance of crypto-assets and the
          provision of crypto-asset services. Its objectives are investor protection, market integrity, and
          financial stability — without stifling innovation.
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Once authorised, providers receive an <strong>EU Passport</strong>: they can offer their
          services across all 27 EU Member States without requiring additional national authorisation.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="27" label="EU Countries (Uniform)" />
          <StatCard value="2024" label="Full Application" />
          <StatCard value="3" label="Token Categories" />
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-[#3a4a6b] text-sm leading-relaxed">
            <strong>NFTs and DeFi:</strong> Unique, non-fungible tokens (NFTs) generally do not fall
            under MiCA. Fully decentralised protocols without an identifiable issuer are also not
            covered. Decentralised finance (DeFi) is being monitored separately — a Commission
            report is planned.
          </p>
        </div>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Deadlines">
        <div className="space-y-0">
          <TimelineItem
            date="29 June 2023"
            title="MiCA Enters into Force"
            description="The Regulation is published in the Official Journal of the EU and enters into force 20 days later."
            done
          />
          <TimelineItem
            date="30 June 2024"
            title="Application for ART & EMT"
            description="Title III (Asset-Referenced Tokens) and Title IV (E-Money Tokens) become applicable. Issuers require authorisation from the competent authority."
            done
          />
          <TimelineItem
            date="30 Dec 2024"
            title="Full Application"
            description="All remaining MiCA Titles become applicable — in particular Title V for Crypto-Asset Service Providers (CASPs). Transitional arrangements for existing providers apply for up to 18 months."
            done
          />
          <TimelineItem
            date="by June 2026"
            title="End of Transitional Periods"
            description="By this date at the latest, all providers that were already operating before MiCA must hold a full MiCA authorisation."
            active
          />
          <TimelineItem
            date="2025/2026"
            title="MiCA II — Possible Extension"
            description="The EU Commission is expected to present a report on DeFi, NFTs, and further adjustment needs. A possible expansion of the MiCA framework."
          />
        </div>
      </Section>

      {/* ═══════════════ 3. TOKEN TYPES ═══════════════ */}
      <Section id="token-typen" title="Token Categories under MiCA">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          MiCA distinguishes three main categories of crypto-assets, each with different
          requirements:
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "1. Asset-Referenced Tokens (ART) — Title III",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Crypto-assets that maintain their value by referencing multiple fiat currencies,
                  commodities, or other crypto-assets (e.g. classic stablecoins such as the DAI type).
                  Particularly stringent requirements: authorisation by the national authority, minimum
                  capital, reserve assets, governance requirements. Issuers must be established in the EU.
                </p>
              ),
            },
            {
              title: "2. E-Money Tokens (EMT) — Title IV",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Crypto-assets that reference a single fiat currency and qualify as electronic money
                  (e.g. USDC type, EUROC). Only credit institutions and e-money institutions may issue
                  EMTs. Holders have a redemption right at par value. Interest payments are prohibited.
                  The EBA has special supervisory powers for significant EMTs.
                  <SourceRef id={3} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "3. Other Crypto-Assets (Utility Tokens) — Title II",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  All other crypto-assets that are neither ART nor EMT and do not have the characteristics
                  of a security — typically utility tokens that provide access to a service or network.
                  Primary obligation: whitepaper preparation and publication. Lower requirements than
                  ART/EMT, but market abuse rules still apply.
                </p>
              ),
            },
            {
              title: "Exemptions from the MiCA Scope",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Not covered: securities (MiFID II applies), e-money under the E-Money Directive, unique
                  NFTs (if genuinely non-fungible), central bank digital currencies (CBDCs), and fully
                  decentralised protocols without an issuer. Some stablecoins may fall under multiple
                  categories — a case-by-case assessment is required.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 4. CASP ═══════════════ */}
      <Section id="casp" title="Crypto-Asset Service Providers (CASPs)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Crypto-asset service providers require a <strong>MiCA authorisation</strong> from the competent
          national authority (in Germany: BaFin) and are subject to ongoing conduct-of-business rules.
          <SourceRef id={4} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <StatCard value="50K EUR" label="Min. Capital Class 1" />
          <StatCard value="125K EUR" label="Min. Capital Class 2" />
          <StatCard value="150K EUR" label="Min. Capital Class 3" />
          <StatCard value="EU Pass" label="Cross-Border" />
        </div>
        <AccordionSection
          items={[
            {
              title: "Authorised CASP Services",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  MiCA defines ten crypto-asset services: (1) custody/administration, (2) operation of a
                  trading platform, (3) exchange against fiat currency, (4) exchange against other
                  crypto-assets, (5) execution of orders, (6) placing, (7) reception/transmission of
                  orders, (8) advice, (9) portfolio management, and (10) transfer services. A separate
                  authorisation is required for each service.
                </p>
              ),
            },
            {
              title: "Requirements for Management and Shareholders",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Directors must demonstrate sufficient knowledge, experience, and competence (fit &
                  proper). Qualifying shareholders (from a 10% stake) are assessed for reliability and
                  integrity. At least two persons must direct the business activities. The registered
                  office must be located in the EU.
                </p>
              ),
            },
            {
              title: "Conduct-of-Business Rules",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  CASPs must: act honestly, fairly, and professionally in the best interest of clients,
                  provide clear and transparent information, identify and manage conflicts of interest,
                  ensure best execution, and keep client assets segregated from their own assets.
                  Client assets may not be used for the provider&apos;s own purposes.
                </p>
              ),
            },
            {
              title: "Organisational Requirements",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Robust governance structures, effective risk management processes, adequate internal
                  controls, and a compliance function are mandatory. ICT security must meet DORA
                  requirements. Business continuity plans must be in place and regularly tested.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 5. WHITEPAPER ═══════════════ */}
      <Section id="whitepaper" title="Whitepaper Requirements">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Issuers of crypto-assets (with certain exemptions) must prepare a <strong>crypto-asset
          whitepaper</strong>, notify the competent authority, and publish it.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Mandatory Whitepaper Content",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The whitepaper must contain: information about the issuer, the crypto-asset project,
                  the public offer, admission to trading, rights and obligations of holders, the
                  blockchain technology and underlying protocols used, risks and associated warnings,
                  as well as information on the environmental footprint (consensus mechanism).
                </p>
              ),
            },
            {
              title: "Exemptions from the Whitepaper Requirement",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  No whitepaper is required for: offers to fewer than 150 persons per Member State,
                  total consideration below EUR 1 million over 12 months, offers exclusively to
                  qualified investors, free mining/staking rewards, unique NFTs, and crypto-assets
                  for service rewards (loyalty programmes without a secondary market).
                </p>
              ),
            },
            {
              title: "Liability for the Whitepaper",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Issuers are liable for the content of the whitepaper. Investors who suffer losses
                  due to misleading or inaccurate information in the whitepaper have a right to
                  compensation. The whitepaper must contain a clear responsibility statement.
                  Minimum liability period: during the public offer.
                </p>
              ),
            },
            {
              title: "Notification and Publication",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The whitepaper must be notified to the competent national authority at least 20
                  working days before the public offer. It must be published on the issuer&apos;s website
                  and remain accessible for at least 10 years. Material changes require an updated
                  whitepaper.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 6. ISSUERS ═══════════════ */}
      <Section id="emittenten" title="Issuer Obligations (Title II)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Issuers of other crypto-assets (neither ART nor EMT) have the following main obligations:
        </p>
        <AccordionSection
          items={[
            {
              title: "Honest, Fair, and Professional Conduct",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Issuers must act in the best interest of token holders and may not disseminate
                  misleading information. Marketing communications must be identified as such and
                  be consistent with the whitepaper. No false or exaggerated promises about future
                  value developments are permitted.
                </p>
              ),
            },
            {
              title: "Ongoing Disclosure Obligations",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Material changes to the project as described in the whitepaper must be disclosed
                  without delay on the website and, if applicable, in an updated whitepaper. Regular
                  updates on project progress foster investor confidence and reduce legal risks.
                </p>
              ),
            },
            {
              title: "Right of Withdrawal (Cooling-Off)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  In the case of public offers of crypto-assets, investors generally have a 14-day
                  right of withdrawal to reverse their investment without giving any reason. Exceptions
                  apply where the token has already been admitted to trading. Issuers must clearly
                  inform investors about this right.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 7. ART & EMT ═══════════════ */}
      <Section id="art-emt" title="Special Rules for ART & EMT">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Asset-referenced tokens and e-money tokens are subject to significantly stricter requirements
          due to their potential to affect financial stability.
          <SourceRef id={3} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Authorisation Requirement for ART Issuers",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  ART issuers require explicit authorisation from the national authority (not merely a
                  notification procedure). Requirements: minimum capital (EUR 350,000), detailed
                  business plan, governance framework, conflict-of-interest management, reserve assets,
                  and a redemption right for holders. Only EU-established legal entities may issue ARTs.
                </p>
              ),
            },
            {
              title: "Reserve Assets for ART",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  ART issuers must maintain a reserve of assets that fully covers the issued tokens.
                  The reserve assets must be safe and liquid, held in custody by a credit institution,
                  and segregated from the issuer&apos;s own assets. Investment rules and concentration
                  limits apply.
                </p>
              ),
            },
            {
              title: "Significant ART/EMT — ESMA/EBA Supervision",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  ART or EMT with more than 10 million holders, an outstanding value exceeding
                  EUR 5 billion, or more than 2.5 million daily transactions are classified as
                  &quot;significant&quot;. Significant tokens are subject to direct supervision by the EBA
                  (EMT) or ESMA (ART) with stricter requirements and higher capital and liquidity
                  buffers.
                  <SourceRef id={2} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "Prohibition of Interest Payments",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  EMT holders may not receive interest or similar benefits linked to the holding
                  period. This is intended to prevent EMTs from functioning as a substitute for bank
                  deposits. ART issuers are subject to similar, though less strict, restrictions
                  regarding returns from reserve assets.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 8. AML ═══════════════ */}
      <Section id="aml" title="Anti-Money Laundering (AML) Requirements">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          MiCA supplements the general AML obligations. CASPs are obliged entities under the EU
          Anti-Money Laundering Directive and must implement comprehensive due diligence measures.
          <SourceRef id={6} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Travel Rule for Crypto-Asset Transfers",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The EU Transfer of Funds Regulation also applies to crypto-asset transfers: CASPs
                  must collect, verify, and transmit information about the originator and beneficiary
                  for every transfer. This applies from the first euro (no de minimis threshold).
                  Transfers to and from unhosted wallets require enhanced due diligence.
                </p>
              ),
            },
            {
              title: "KYC and Customer Due Diligence",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Full identification and verification of all customers (KYC) is required before
                  providing services. Enhanced due diligence applies to high-risk customers, politically
                  exposed persons (PEPs), and transactions from high-risk third countries. Ongoing
                  transaction monitoring and reporting of suspicious activities to FIUs is mandatory.
                </p>
              ),
            },
            {
              title: "EU AML Authority (AMLA)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The new EU Anti-Money Laundering Authority (AMLA) will assume direct supervision over
                  certain CASPs — particularly those operating across borders. AMLA will develop
                  guidelines and binding technical standards for AML compliance of CASPs and will
                  have direct inspection powers.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 9. MARKET ABUSE ═══════════════ */}
      <Section id="marktmissbrauch" title="Market Abuse Rules">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          MiCA introduces a market abuse regime for crypto-assets modelled on the framework for
          traditional financial instruments (MAR).
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Prohibited Market Manipulation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Prohibited practices include: wash trading (artificial trading volume), pump-and-dump
                  schemes, spoofing (phantom orders), dissemination of false or misleading information,
                  and coordinated price-fixing. The use of algorithms for market distortion is also
                  explicitly prohibited.
                </p>
              ),
            },
            {
              title: "Insider Trading",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Persons in possession of inside information (e.g. issuers, CASPs, their employees)
                  may not trade on the basis of such information or disclose it. Inside information must
                  be made public as soon as possible. Suspicious transaction reports to authorities are
                  mandatory for certain entities.
                </p>
              ),
            },
            {
              title: "Market Sounding",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Before major transactions, CASPs and issuers may disclose information to potential
                  investors (market sounding) — under strict conditions regarding documentation, the
                  assessment of whether information is insider-relevant, and the obtaining of
                  confidentiality consent.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 10. AUTHORISATION ═══════════════ */}
      <Section id="zulassung" title="Authorisation & Licensing Process">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The authorisation process for CASPs follows a structured procedure with clear deadlines:
        </p>
        <AccordionSection
          items={[
            {
              title: "Application Contents",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The authorisation application must contain: a business plan, description of governance
                  structures, information on directors (fit & proper), proof of initial capital,
                  description of risk management processes, ICT security concept, client safeguarding
                  concept, and information on qualifying shareholders.
                </p>
              ),
            },
            {
              title: "Processing Timelines",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  After receipt of a complete application, the competent authority has 25 working days
                  to assess completeness. A further 60 working days are available for the substantive
                  assessment (extendable). The overall process typically takes 3 to 6 months.
                </p>
              ),
            },
            {
              title: "EU Passport Mechanism",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  A MiCA authorisation in one Member State entitles the holder to provide cross-border
                  services throughout the entire EU (passporting). To do so, the CASP must notify the
                  competent home authority, which then notifies the host authority. Services may
                  commence after a short waiting period.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 11. PENALTIES ═══════════════ */}
      <Section id="strafen" title="Penalties & Sanctions">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          MiCA provides for a two-tier sanctions system: administrative sanctions by authorities and
          criminal sanctions by Member States.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <StatCard value="700K EUR" label="Max. Fine Directors" />
          <StatCard value="5M EUR" label="Max. Fine Companies" />
          <StatCard value="15 %" label="Alternative: Disgorgement" />
          <StatCard value="Revoked" label="Licence Withdrawal Possible" />
        </div>
        <AccordionSection
          items={[
            {
              title: "Administrative Sanctions",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Authorities may impose: public disclosure of the infringement, temporary prohibition
                  or ban on CASP activities, licence withdrawal, temporary ban on directors, and fines
                  of up to EUR 5 million for companies and EUR 700,000 for natural persons (or higher
                  amounts through disgorgement of profits).
                </p>
              ),
            },
            {
              title: "Market Abuse Sanctions",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  For market manipulation and insider trading, Member States may provide for criminal
                  sanctions. Administrative sanctions: up to EUR 15 million or 15% of annual turnover
                  (whichever is higher). Natural persons: up to EUR 5 million. Additionally, full
                  disgorgement of profits obtained.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 12. THIRD COUNTRIES ═══════════════ */}
      <Section id="drittstaaten" title="Third-Country Rules">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          MiCA has clear rules for providers from non-EU countries that wish to serve EU customers.
        </p>
        <AccordionSection
          items={[
            {
              title: "Reverse Solicitation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Third-country CASPs may only provide crypto-asset services in the EU if the customer
                  has requested the service on their own initiative (reverse solicitation). Active
                  advertising or marketing to EU customers without an EU authorisation is prohibited.
                  ESMA will clarify what constitutes &quot;own initiative&quot;.
                </p>
              ),
            },
            {
              title: "No Equivalence Regime for CASPs",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Unlike other financial market regulations (MiFID II), MiCA does not include a general
                  equivalence regime that would allow third-country CASPs to operate in the EU market.
                  Third-country providers must generally establish an EU subsidiary and apply for a
                  MiCA authorisation.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 13. ROADMAP ═══════════════ */}
      <Section id="fahrplan" title="Compliance Roadmap">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          For existing and new market participants, the following step-by-step approach is recommended:
        </p>
        <AccordionSection
          items={[
            {
              title: "Step 1: Classification of Activities",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Determine whether your crypto-assets are to be classified as ART, EMT, or other
                  tokens. Assess whether your activities qualify as CASP services. Clarify whether
                  your tokens could potentially be classified as securities (MiFID II) — which would
                  exclude MiCA. Seek legal advice for borderline cases.
                </p>
              ),
            },
            {
              title: "Step 2: Gap Analysis and Authorisation Application",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Compare your current processes, governance structures, and capitalisation against
                  MiCA requirements. Identify gaps and develop an implementation plan. Begin the
                  authorisation application early — authorities are under heavy workload and
                  processing times may exceed the statutory deadlines.
                </p>
              ),
            },
            {
              title: "Step 3: Whitepaper and Compliance Documentation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Prepare MiCA-compliant whitepapers for all crypto-assets to be offered. Develop
                  compliance manuals, policies, and procedures for all MiCA requirements. Implement
                  AML/KYC processes in accordance with the Travel Rule. Train staff on MiCA
                  requirements.
                </p>
              ),
            },
            {
              title: "Step 4: Ongoing Compliance",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  After authorisation: regularly review compliance processes, report material changes
                  to the competent authority, update whitepapers in the event of material project
                  changes, and continuously monitor ESMA/EBA guidelines and Level-2 measures.
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
              title: "Do I need to apply for a separate licence in each country?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  No. A MiCA authorisation in one EU Member State entitles you to operate throughout
                  the entire EU (passport principle). You only need to apply for authorisation in the
                  country where your company has its EU registered office. For cross-border activities,
                  a notification to the home authority is sufficient.
                </p>
              ),
            },
            {
              title: "Does MiCA also apply to decentralised exchanges (DEXs)?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Fully decentralised protocols without an identifiable issuer or service provider
                  generally do not fall under MiCA. However, if a natural or legal person stands behind
                  the protocol or centralised elements exist (e.g. admin keys), MiCA may be applicable.
                  The boundary is fluid and will be clarified through ESMA guidelines.
                </p>
              ),
            },
            {
              title: "What happens to existing crypto companies in the EU?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Existing providers that were already authorised in an EU Member State before MiCA
                  benefit from a transitional arrangement: they may continue their activities for up
                  to 18 months after the application date of the respective MiCA Title without full
                  MiCA authorisation — provided they file an authorisation application.
                </p>
              ),
            },
            {
              title: "Which national authorities are responsible?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  In Germany, the BaFin (Federal Financial Supervisory Authority) is the competent
                  authority for MiCA. For the supervision of significant ART and EMT, the ESMA
                  (for ART) and the EBA (for EMT) are directly responsible, respectively.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════════ RELATED REGULATIONS ═══════════════════ */}
      <RelatedGuides currentGuide="mica" accent="#a16207" />

      {/* ═══════════════ TOOL RECOMMENDATION ═══════════════ */}
      <ToolRecommendation regulationKey="mica" accent={ACCENT} />

      {/* ═══════════════ SOURCES ═══════════════ */}
      <Section id="quellen" title="Sources & Further Reading">
        <SourceList sources={sources} />
      </Section>
    </GuidePageLayout>
  );
}
