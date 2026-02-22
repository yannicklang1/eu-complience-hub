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
    title: "Regulation (EU) 2022/2065 — Digital Services Act (Full Text)",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32022R2065",
    desc: "Official full text of the Digital Services Act in the EU Official Journal",
    type: "Regulation",
  },
  {
    id: 2,
    title: "EU Commission — Digital Services Act Package",
    url: "https://digital-strategy.ec.europa.eu/en/policies/digital-services-act-package",
    desc: "Official EU Commission information page on the DSA",
    type: "Authority",
  },
  {
    id: 3,
    title: "DSA Transparency Database",
    url: "https://transparency.dsa.ec.europa.eu/",
    desc: "Public EU database for moderation decisions under Art. 17 DSA",
    type: "Database",
  },
  {
    id: 4,
    title: "KommAustria — Digital Services Coordinator Austria",
    url: "https://www.rtr.at",
    desc: "RTR/KommAustria as the Austrian Coordinator for Digital Services",
    type: "Authority",
  },
  {
    id: 5,
    title: "Digital Services Act (DDG) — Germany",
    url: "https://www.gesetze-im-internet.de/ddg/",
    desc: "German implementing legislation for the Digital Services Act",
    type: "Law",
  },
  {
    id: 6,
    title: "EU Commission — VLOP/VLOSE Designations",
    url: "https://digital-strategy.ec.europa.eu/en/policies/list-designated-vlops-and-vloses",
    desc: "List of designated Very Large Online Platforms and Search Engines",
    type: "Authority",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Overview" },
  { id: "timeline", label: "Timeline & Deadlines" },
  { id: "betroffene", label: "Who Is Affected?" },
  { id: "pflichten-alle", label: "Obligations: All Intermediary Services" },
  { id: "pflichten-hosting", label: "Obligations: Hosting Services" },
  { id: "pflichten-plattformen", label: "Obligations: Online Platforms" },
  { id: "pflichten-vlop", label: "Obligations: VLOPs & VLOSEs" },
  { id: "werbung", label: "Advertising Transparency" },
  { id: "minderjaehrige", label: "Protection of Minors" },
  { id: "durchsetzung", label: "Enforcement & Sanctions" },
  { id: "oesterreich", label: "DSA in Austria & DACH" },
  { id: "zusammenspiel", label: "Interplay with Other Laws" },
  { id: "fahrplan", label: "Compliance Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Penalty", value: "6% of turnover" },
  { label: "In Force Since", value: "17 Feb 2024" },
  { label: "VLOP Threshold", value: "45M users" },
  { label: "Applies To", value: "Online Platforms" },
  { label: "Transparency", value: "Semi-annual" },
  { label: "Coordinator AT", value: "KommAustria" },
];

/* ─────────────────── Accent ─────────────────── */
const ACCENT = "#6366f1";

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
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "bg-[#6366f1] border-[#6366f1]" : active ? "bg-white border-[#6366f1] ring-4 ring-indigo-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done ? "text-[#6366f1]" : active ? "text-[#6366f1]" : "text-[#7a8db0]"}`}>
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
      title="Digital Services Act (DSA)"
      subtitle="EU platform regulation: due diligence obligations for online services — from notice-and-action to advertising transparency."
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      regulationKey="dsa"
      href="/dsa"
    >
      {/* ═══════════════ 1. OVERVIEW ═══════════════ */}
      <Section id="ueberblick" title="Overview: What Is the Digital Services Act?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The <strong>Digital Services Act (DSA)</strong> — Regulation (EU) 2022/2065 — is the central
          EU law governing online platforms and digital services. It imposes comprehensive due diligence
          obligations on intermediary services, hosting providers, and online platforms regarding the
          handling of illegal content, advertising transparency, and user rights.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The DSA follows the principle <strong>&quot;What is illegal offline must also be illegal online&quot;</strong> and
          partially replaces the 20-year-old E-Commerce Directive (2000/31/EC). The liability exemption
          for neutral intermediaries remains in place, but the obligations to actively combat illegal
          content increase significantly.
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          As an <strong>EU Regulation</strong>, the DSA applies directly in all 27 Member States — without
          national transposition. For enforcement, Digital Services Coordinators have been appointed
          in each country.
          <SourceRef id={2} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="6 %" label="Max. penalty on turnover" />
          <StatCard value="45M" label="VLOP threshold (users)" />
          <StatCard value="Feb 2024" label="Applies to all platforms" />
        </div>
        <p className="text-[#3a4a6b] text-sm leading-relaxed bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <strong>Important:</strong> The DSA has been in force since 17 February 2024 for all affected services —
          including small and medium-sized platforms. For designated VLOPs/VLOSEs (e.g. Google, Meta, Amazon,
          TikTok), the strictest obligations have applied since August 2023.
        </p>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Deadlines">
        <div className="space-y-0">
          <TimelineItem
            date="15 Dec 2020"
            title="Commission Proposal"
            description="The EU Commission presents the DSA draft as part of the Digital Services Package."
            done
          />
          <TimelineItem
            date="19 Oct 2022"
            title="Publication in the Official Journal"
            description="Regulation (EU) 2022/2065 is published in the EU Official Journal and enters into force on 16 November 2022."
            done
          />
          <TimelineItem
            date="25 Aug 2023"
            title="VLOPs/VLOSEs: Full Application"
            description="17 designated Very Large Online Platforms (VLOPs) and Very Large Online Search Engines (VLOSEs) must comply with all DSA obligations."
            done
          />
          <TimelineItem
            date="17 Feb 2024"
            title="All Intermediary Services: Full Application"
            description="The DSA applies fully to all intermediary services, hosting providers, and online platforms — regardless of their size."
            done
          />
          <TimelineItem
            date="2025/2026"
            title="First Enforcement Wave"
            description="The EU Commission and national coordinators are intensifying inspections. Initial proceedings against platforms are already underway."
            active
          />
          <TimelineItem
            date="Ongoing"
            title="Semi-Annual Transparency Reports"
            description="Online platforms must publish transparency reports on content moderation at least semi-annually."
          />
        </div>
      </Section>

      {/* ═══════════════ 3. WHO IS AFFECTED ═══════════════ */}
      <Section id="betroffene" title="Who Is Affected?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The DSA uses a <strong>tiered system</strong>: the larger the platform and the higher the
          risk, the more obligations apply. Four categories of services are distinguished:
        </p>
        <AccordionSection
          items={[
            {
              title: "Intermediary Services (all) — Art. 11–15 DSA",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  <strong>Applies to:</strong> All digital services acting as intermediaries — Internet Service Providers (ISPs),
                  domain registrars, CDNs, VPN services, search engines, and cloud infrastructure.
                  <br /><br />
                  <strong>Liability exemption:</strong> Mere conduit (Art. 4), caching (Art. 5), and hosting (Art. 6)
                  continue to enjoy a conditional liability exemption — as long as the provider has no knowledge of
                  illegal content or acts expeditiously upon obtaining knowledge.
                </p>
              ),
            },
            {
              title: "Hosting Services — Art. 16–18 DSA",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  <strong>Applies to:</strong> All services that store user-generated content — cloud storage,
                  web hosting, databases, as well as SaaS platforms with user content features
                  (comments, uploads, profiles).
                  <br /><br />
                  <strong>Additional obligations:</strong> Notice-and-action mechanism (Art. 16), statement of reasons
                  for decisions (Art. 17), notification obligation upon suspicion of criminal offences (Art. 18).
                </p>
              ),
            },
            {
              title: "Online Platforms — Art. 19–32 DSA",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  <strong>Applies to:</strong> Hosting services that disseminate content publicly — social networks,
                  online marketplaces, app stores, review portals, travel booking platforms, forums
                  with public reach.
                  <br /><br />
                  <strong>Additional obligations:</strong> Internal complaint handling system (Art. 20), out-of-court
                  dispute settlement (Art. 21), trusted flagger system (Art. 22), measures against misuse (Art. 23),
                  advertising transparency (Art. 26), recommender system transparency (Art. 27).
                  <br /><br />
                  <strong>SME exemption:</strong> Micro and small enterprises (fewer than 50 employees and under EUR 10 million
                  in turnover) are exempt from certain online platform obligations.
                </p>
              ),
            },
            {
              title: "VLOPs & VLOSEs — Art. 33–48 DSA",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  <strong>Applies to:</strong> Platforms and search engines with at least 45 million monthly
                  active users in the EU. Designated by the EU Commission.
                  <br /><br />
                  <strong>Designated VLOPs (selection):</strong> Amazon, Apple App Store, Booking.com, Facebook,
                  Google Maps, Google Play, Google Shopping, Instagram, LinkedIn, Pinterest, Snapchat, TikTok,
                  X (Twitter), Wikipedia, YouTube, Zalando, AliExpress, Temu, Shein.
                  <SourceRef id={6} sources={sources} accent={ACCENT} />
                  <br /><br />
                  <strong>Designated VLOSEs:</strong> Google Search, Bing.
                  <br /><br />
                  <strong>Strictest obligations:</strong> Annual risk assessment (Art. 34), risk mitigation measures
                  (Art. 35), crisis response (Art. 36), independent audit (Art. 37), recommender systems without profiling
                  (Art. 38), data access for researchers (Art. 40), compliance officer (Art. 41).
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 4. OBLIGATIONS ALL ═══════════════ */}
      <Section id="pflichten-alle" title="Obligations: All Intermediary Services">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The baseline obligations apply to <em>every</em> intermediary service, regardless of size or type:
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Point of Contact & Legal Representative (Art. 11–13)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Every intermediary service must designate a central point of contact for authorities and users.
                  Non-EU providers must appoint a legal representative in the EU. This information must be publicly
                  available and easily accessible.
                </p>
              ),
            },
            {
              title: "Terms of Service Transparency (Art. 14)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The terms of service must be clear, comprehensible, and available in the language of the
                  users. Changes must be communicated in a timely manner. Terms must include information
                  on content moderation policies, algorithmic decision-making, and complaint mechanisms.
                </p>
              ),
            },
            {
              title: "Transparency Reports (Art. 15)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  At least annually (semi-annually for VLOPs), public reports must be published covering:
                  number of orders received from authorities, notice-and-action statistics, own content
                  moderation measures, and use of automated systems for content detection.
                </p>
              ),
            },
            {
              title: "Cooperation with Authorities (Art. 9–10)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Orders from authorities to remove illegal content or to provide information must be
                  processed without delay. The service must inform authorities of the measures taken.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 5. OBLIGATIONS HOSTING ═══════════════ */}
      <Section id="pflichten-hosting" title="Obligations: Hosting Services">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Hosting services that store user content have the following obligations in addition
          to the baseline requirements:
        </p>
        <AccordionSection
          items={[
            {
              title: "Notice-and-Action Mechanism (Art. 16)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Hosting services must establish a simple, electronic mechanism through which any person
                  can report illegal content. The notice must include an explanation of why the content
                  is illegal, along with the URL. The service must make a timely and diligent decision —
                  and inform the notifier of the outcome.
                </p>
              ),
            },
            {
              title: "Statement of Reasons (Art. 17)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  When a hosting service restricts or removes content, it must inform the affected user
                  with a clear and specific statement of reasons. The statement must identify the specific
                  violation and inform the user about available remedies. All decisions are published
                  in the EU Commission&apos;s DSA Transparency Database.
                  <SourceRef id={3} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "Notification Obligation for Suspected Criminal Offences (Art. 18)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  When there is suspicion of serious criminal offences threatening the life or safety
                  of persons, hosting services must immediately notify the relevant law enforcement
                  authorities.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 6. OBLIGATIONS PLATFORMS ═══════════════ */}
      <Section id="pflichten-plattformen" title="Obligations: Online Platforms">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Online platforms — services that disseminate content publicly — are subject to the
          most extensive set of obligations below the VLOP threshold:
        </p>
        <AccordionSection
          items={[
            {
              title: "Internal Complaint Handling System (Art. 20)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Users must be able to lodge complaints against moderation decisions through an internal
                  system — free of charge, electronically, and within 6 months. The platform must review
                  complaints through qualified personnel (not solely through automated means) and decide
                  in a timely manner.
                </p>
              ),
            },
            {
              title: "Out-of-Court Dispute Settlement (Art. 21)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Users have the right to refer disputes to certified out-of-court dispute settlement
                  bodies. These bodies are independent and while their decisions are not binding, the
                  platform must engage with the outcome.
                </p>
              ),
            },
            {
              title: "Trusted Flaggers (Art. 22)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Trusted flaggers designated by the Digital Services Coordinator receive priority
                  treatment for their notices. In Austria, these are certified by KommAustria.
                  Platforms must process notices from trusted flaggers with priority and within
                  shorter timeframes.
                </p>
              ),
            },
            {
              title: "Dark Patterns Prohibition (Art. 25)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Platforms must not design their user interfaces in ways that manipulate, deceive,
                  or impair the decision-making freedom of users (dark patterns). This includes:
                  hidden opt-out options, forced consent, misleading default settings, and manipulative
                  design of cookie banners.
                </p>
              ),
            },
            {
              title: "Online Marketplace Obligations (Art. 30–32)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Online marketplaces must identify traders before allowing them to offer products
                  (Know Your Business Customer). This includes: commercial register extract, contact details,
                  VAT identification number, and product safety information. Random checks against official
                  databases are mandatory. In case of counterfeit or dangerous products, the platform must
                  act proactively.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 7. VLOP/VLOSE ═══════════════ */}
      <Section id="pflichten-vlop" title="Obligations: VLOPs & VLOSEs (45M+ Users)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Very Large Online Platforms (VLOPs) and Very Large Online Search Engines (VLOSEs) with
          at least 45 million monthly active users in the EU bear the highest obligations:
          <SourceRef id={6} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="Annual" label="Risk assessment required" />
          <StatCard value="Audit" label="Independent review" />
          <StatCard value="Real-time" label="Data access for researchers" />
        </div>
        <AccordionSection
          items={[
            {
              title: "Systemic Risk Assessment (Art. 34)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  VLOPs must conduct a comprehensive risk assessment at least annually: risks from the
                  dissemination of illegal content, negative effects on fundamental rights (freedom of expression,
                  privacy, non-discrimination), manipulation (electoral interference, disinformation),
                  and impacts on minors and public health.
                </p>
              ),
            },
            {
              title: "Risk Mitigation Measures (Art. 35)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Based on the risk assessment, VLOPs must take appropriate measures: adaptation of algorithms,
                  enhanced moderation, cooperation with trusted flaggers, awareness-raising measures,
                  and access to audit APIs for independent researchers.
                </p>
              ),
            },
            {
              title: "Crisis Response (Art. 36)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  In times of crisis (pandemics, armed conflicts, terrorist attacks), the EU Commission
                  may require VLOPs to take reinforced measures — e.g. prioritising official information,
                  enhanced moderation of disinformation, or temporary restriction of viral dissemination.
                </p>
              ),
            },
            {
              title: "Independent Audit (Art. 37)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  At least annually, an independent audit must be carried out by EU-certified auditors.
                  The audit covers: risk assessment, moderation practices, advertising transparency,
                  algorithmic systems, and overall DSA compliance. The results are public.
                </p>
              ),
            },
            {
              title: "Data Access for Researchers (Art. 40)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  VLOPs must grant vetted researchers access to their data — for the study of systemic
                  risks. The EU Commission can enforce access. This includes publicly available data
                  as well as aggregated usage data.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 8. ADVERTISING ═══════════════ */}
      <Section id="werbung" title="Advertising Transparency (Art. 26–28)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The DSA contains strict rules on online advertising that go far beyond the GDPR:
        </p>
        <AccordionSection
          items={[
            {
              title: "Labelling Obligation (Art. 26)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Every advertisement on a platform must be clearly identifiable as such. Users must be
                  able to see in real time: (1) that it is an advertisement, (2) on whose behalf the
                  advertisement is displayed, (3) who paid for it, and (4) the main parameters used
                  for targeting. This information must be displayed directly alongside the advertisement.
                </p>
              ),
            },
            {
              title: "Prohibition of Profiling-Based Advertising to Minors (Art. 28)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Platforms must not show minors advertisements based on profiling. When the platform
                  can determine with reasonable certainty that a user is a minor, any advertising
                  profiling is prohibited.
                </p>
              ),
            },
            {
              title: "Prohibition of Sensitive Targeting Categories (Art. 26(3))",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Advertising targeting based on special categories of personal data (GDPR Art. 9)
                  is prohibited — meaning no targeting based on health status, political opinion,
                  ethnic origin, sexual orientation, or religious beliefs.
                </p>
              ),
            },
            {
              title: "VLOP: Ad Repository (Art. 39)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  VLOPs must maintain a public, searchable ad repository — for one year after the
                  last display. The repository must include: content of the advertisement, advertiser,
                  display period, targeting parameters, audience groups reached, and total reach.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 9. PROTECTION OF MINORS ═══════════════ */}
      <Section id="minderjaehrige" title="Protection of Minors">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The DSA contains specific protective measures for minors:
        </p>
        <AccordionSection
          items={[
            {
              title: "High Level of Protection (Art. 28)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Platforms must ensure a high level of protection for the privacy, safety, and
                  well-being of minors. This includes age-appropriate default settings, restrictions
                  on recommender systems, and refraining from manipulation techniques that exploit
                  minors.
                </p>
              ),
            },
            {
              title: "No Profiling-Based Targeting",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Advertising based on profiling is completely prohibited for minors. Platforms must
                  take reasonable measures to determine the age of their users — without collecting
                  disproportionate amounts of data.
                </p>
              ),
            },
            {
              title: "VLOPs: Specific Risk Assessment",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  VLOPs must explicitly analyse the impact on minors in their annual risk assessment
                  (Art. 34) — in particular regarding algorithms that may promote addictive usage
                  patterns.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 10. ENFORCEMENT ═══════════════ */}
      <Section id="durchsetzung" title="Enforcement & Sanctions">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="6 %" label="Max. penalty on annual turnover" />
          <StatCard value="1 %" label="Penalty for false information" />
          <StatCard value="5 %" label="Periodic penalty per day" />
        </div>
        <AccordionSection
          items={[
            {
              title: "Sanctions Framework",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  For infringements, fines of up to <strong>6% of global annual turnover</strong> may be imposed.
                  False, incomplete, or misleading information provided to authorities: up to 1% of annual
                  turnover. Non-compliance with interim measures: periodic penalty payments of up to 5% of
                  average daily turnover per day.
                </p>
              ),
            },
            {
              title: "Dual Enforcement System",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  <strong>VLOPs/VLOSEs:</strong> Direct supervision by the EU Commission. The Commission can
                  initiate proceedings, order audits, and impose fines itself.
                  <br /><br />
                  <strong>All others:</strong> National Digital Services Coordinators (DSCs) are responsible.
                  In Austria, this is KommAustria/RTR; in Germany, the Federal Network Agency (Bundesnetzagentur).
                </p>
              ),
            },
            {
              title: "Cross-Border Cooperation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The European Board for Digital Services coordinates cooperation between national DSCs.
                  Each DSC can request mutual assistance from the DSC of another Member State.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 11. AUSTRIA ═══════════════ */}
      <Section id="oesterreich" title="DSA in Austria & DACH">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Although the DSA applies directly as an EU Regulation, Member States have enacted
          implementing legislation:
          <SourceRef id={4} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Austria: KommAustria as DSC",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  In Austria, <strong>KommAustria</strong> (Austrian Communications Authority) has been
                  designated as the Digital Services Coordinator. It is housed within the RTR (Austrian
                  Regulatory Authority for Broadcasting and Telecommunications). KommAustria was previously
                  responsible for the Communications Platforms Act (KoPl-G) — which has been effectively
                  superseded by the DSA.
                  <br /><br />
                  Responsibilities: supervision of platforms established in Austria, certification of trusted
                  flaggers and out-of-court dispute settlement bodies, and handling complaints from Austrian
                  users.
                </p>
              ),
            },
            {
              title: "Germany: Federal Network Agency as DSC",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Germany has enacted the <strong>Digital Services Act (DDG)</strong> as its implementing legislation.
                  The <strong>Federal Network Agency (Bundesnetzagentur/BNetzA)</strong> serves as the Digital Services
                  Coordinator. The NetzDG (Network Enforcement Act) has been largely superseded by the DSA.
                  <SourceRef id={5} sources={sources} accent={ACCENT} />
                  <br /><br />
                  Fines: Germany has established a national sanctions framework with fines of up to EUR 10 million
                  for certain infringements.
                </p>
              ),
            },
            {
              title: "Switzerland: Not Directly Affected",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  As a non-EU state, Switzerland is not directly subject to the DSA. However, Swiss platforms
                  that serve EU users are affected if they operate as intermediary services in the EU — they
                  must then appoint a legal representative in the EU (Art. 13).
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
          The DSA is part of a comprehensive EU regulatory package for the digital economy:
        </p>
        <AccordionSection
          items={[
            {
              title: "GDPR — General Data Protection Regulation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The DSA complements the GDPR: advertising transparency (Art. 26 DSA) builds on
                  GDPR consent rules. Art. 26(3) DSA prohibits advertising targeting based on special
                  categories of data (Art. 9 GDPR). Data from content moderation is subject to
                  GDPR retention periods.
                </p>
              ),
            },
            {
              title: "AI Act — AI Regulation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Automated content moderation systems and recommendation algorithms may fall under
                  the AI Act. VLOPs using AI for moderation must comply with both DSA transparency
                  obligations and AI Act requirements.
                </p>
              ),
            },
            {
              title: "Digital Markets Act (DMA)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The DMA regulates the market power of large platforms (&quot;gatekeepers&quot;), while the
                  DSA governs due diligence obligations. Many VLOPs are simultaneously DMA gatekeepers.
                  The obligations are cumulative.
                </p>
              ),
            },
            {
              title: "ePrivacy / TDDDG / TKG 2021",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Cookie consent and tracking continue to be governed by national implementations of the
                  ePrivacy Directive (Austria: TKG 2021, Germany: TDDDG). The DSA supplements this with
                  transparency obligations for advertising targeting.
                </p>
              ),
            },
            {
              title: "P2B Regulation (2019/1150)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The Platform-to-Business Regulation protects business users of platforms. The DSA
                  extends this protection to all users (including consumers) and strengthens transparency
                  obligations for ranking and recommender systems.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 13. ROADMAP ═══════════════ */}
      <Section id="fahrplan" title="Compliance Roadmap for Platform Operators">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The DSA is already in force — platform operators must act now:
        </p>
        <AccordionSection
          items={[
            {
              title: "Phase 1 (Immediate): Assessment & Point of Contact",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Determine your category (intermediary service / hosting / platform / VLOP).
                  Designate a point of contact for authorities and users. Check whether you need
                  a legal representative in the EU. Adapt your terms of service to DSA transparency
                  requirements.
                </p>
              ),
            },
            {
              title: "Phase 2 (Short-term): Set Up Notice-and-Action",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Implement an electronic reporting system for illegal content. Define internal
                  processes and SLAs for handling notices. Create templates for statements of
                  reasons (Art. 17). Train your moderation team.
                </p>
              ),
            },
            {
              title: "Phase 3 (Medium-term): Complaint System & Advertising Transparency",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Set up an internal complaint handling system (Art. 20). Ensure that advertisements
                  are correctly labelled (Art. 26). Review targeting practices for DSA compliance
                  (no sensitive categories, no profiling for minors).
                </p>
              ),
            },
            {
              title: "Phase 4 (Ongoing): Transparency Reports & Monitoring",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Publish annual (platforms: semi-annual) transparency reports. Monitor dark pattern
                  compliance in UI changes. Stay up to date on new implementing acts and guidelines
                  from the EU Commission.
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
              title: "Does the DSA apply to my small SaaS with community features?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Yes, if users create content and it is visible to others, it constitutes an online
                  platform. Micro and small enterprises (fewer than 50 employees, under EUR 10 million
                  in turnover) are exempt from certain platform obligations but must still comply with
                  the baseline obligations (point of contact, ToS transparency, notice-and-action).
                </p>
              ),
            },
            {
              title: "What is the difference between the DSA and Germany's NetzDG?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Germany&apos;s NetzDG applied only to social networks with more than 2 million users in
                  Germany. The DSA is significantly broader: it applies to all intermediary services EU-wide,
                  has a tiered obligation system, and harmonises the rules across all 27 Member States.
                  The NetzDG has been largely superseded by the DSA.
                </p>
              ),
            },
            {
              title: "As a hosting provider, must I immediately delete all reported content?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  No. The DSA requires a diligent assessment, not automatic deletion. You must process
                  notices in a timely manner, carry out an independent evaluation, and inform both the
                  notifier and the content provider of your decision. Over-blocking can itself constitute
                  a DSA infringement (impairment of freedom of expression).
                </p>
              ),
            },
            {
              title: "How do I find out if my company will be classified as a VLOP?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The EU Commission designates VLOPs based on the number of monthly active users in the
                  EU (threshold: 45 million). Platforms must calculate their user numbers and submit them
                  to the Commission upon request. The list of designated platforms is publicly maintained.
                </p>
              ),
            },
            {
              title: "What does DSA compliance cost?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Costs vary significantly by category. Small platforms: EUR 5,000–20,000 for adapting
                  terms of service, reporting systems, and initial transparency reports. Medium-sized
                  platforms: EUR 50,000–200,000 for full compliance (complaint system, advertising
                  transparency, moderation). VLOPs: multi-million euro amounts for risk assessments,
                  audits, compliance teams, and technical infrastructure.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════════ RELATED REGULATIONS ═══════════════════ */}
      <RelatedGuides currentGuide="dsa" accent="#4338ca" />

      {/* ═══════════════ TOOL RECOMMENDATION ═══════════════ */}
      <ToolRecommendation regulationKey="dsa" accent={ACCENT} />

      {/* ═══════════════ SOURCES ═══════════════ */}
      <Section id="quellen" title="Sources & Further Reading">
        <SourceList sources={sources} />
      </Section>
    </GuidePageLayout>
  );
}
