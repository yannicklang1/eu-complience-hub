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
    title: "Directive 2002/58/EC — ePrivacy Directive (Full Text)",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32002L0058",
    desc: "Official full text of the ePrivacy Directive",
    type: "Directive",
  },
  {
    id: 2,
    title: "CJEU C-673/17 — Planet49 (Cookie Consent)",
    url: "https://curia.europa.eu/juris/liste.jsf?num=C-673/17",
    desc: "Landmark CJEU ruling on active cookie consent (opt-in)",
    type: "Ruling",
  },
  {
    id: 3,
    title: "TKG 2021 — Telecommunications Act (Austria)",
    url: "https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20011678",
    desc: "Austrian transposition of the ePrivacy Directive, Sections 165-167",
    type: "Law",
  },
  {
    id: 4,
    title: "TDDDG — Telecommunications Digital Services Data Protection Act (Germany)",
    url: "https://www.gesetze-im-internet.de/ttdsg/",
    desc: "German transposition of the ePrivacy Directive, Section 25 (cookie rules)",
    type: "Law",
  },
  {
    id: 5,
    title: "EDPB Guidelines 2/2023 — Scope of Art. 5(3) ePrivacy",
    url: "https://www.edpb.europa.eu/our-work-tools/general-guidance/guidelines-recommendations-best-practices_en",
    desc: "European Data Protection Board guidelines on cookies and tracking",
    type: "Guideline",
  },
  {
    id: 6,
    title: "EU Commission — ePrivacy Regulation Proposal",
    url: "https://digital-strategy.ec.europa.eu/en/policies/eprivacy-regulation",
    desc: "Status of the ePrivacy Regulation proposal (under negotiation since 2017)",
    type: "Authority",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Overview" },
  { id: "rechtslage", label: "Current Legal Framework" },
  { id: "cookies", label: "Cookie Consent" },
  { id: "tracking", label: "Tracking & Technologies" },
  { id: "direktmarketing", label: "Direct Marketing Rules" },
  { id: "dsgvo-eprivacy", label: "GDPR vs. ePrivacy" },
  { id: "oesterreich", label: "ePrivacy in Austria" },
  { id: "deutschland", label: "ePrivacy in Germany" },
  { id: "cmp", label: "Consent Management Platforms" },
  { id: "zukunft", label: "ePrivacy Regulation (Future)" },
  { id: "zusammenspiel", label: "Interplay with Other Laws" },
  { id: "fahrplan", label: "Compliance Roadmap" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Legal Basis", value: "Dir. 2002/58/EC" },
  { label: "Cookie Rule", value: "Opt-in Required" },
  { label: "AT Transposition", value: "TKG 2021" },
  { label: "DE Transposition", value: "TDDDG Section 25" },
  { label: "Penalty (GDPR)", value: "EUR 20M / 4%" },
  { label: "ePR Status", value: "Still Under Negotiation" },
];

/* ─────────────────── Accent ─────────────────── */
const ACCENT = "#a855f7";

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

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════ */
export default function GuideContentEN() {
  return (
    <GuidePageLayout
      title="ePrivacy – Cookie Law & Tracking"
      subtitle="Cookie consent, tracking rules, and direct marketing — the specialised regulation alongside the GDPR."
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      regulationKey="eprivacy"
      href="/eprivacy"
    >
      {/* ═══════════════ 1. OVERVIEW ═══════════════ */}
      <Section id="ueberblick" title="Overview: What Is ePrivacy?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          The <strong>ePrivacy Directive</strong> (2002/58/EC, amended by 2009/136/EC) is the
          EU&apos;s specialised regulation for the protection of privacy in electronic communications.
          It is the &quot;Cookie Directive&quot; — but its scope extends far beyond that:
          tracking technologies, direct marketing, location data, and confidentiality of communications.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          As a <strong>directive</strong>, it must be transposed into national law by each EU Member State
          — which is why the specific rules differ: In Austria, the
          <strong> TKG 2021</strong> (Sections 165-167) applies, while in Germany the <strong>TDDDG</strong> (Section 25) governs.
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The ePrivacy Directive is the <strong>lex specialis</strong> to the GDPR: For cookies,
          tracking, and electronic marketing, the ePrivacy rules take precedence. The GDPR
          applies supplementarily — particularly for the legal basis of the subsequent data processing.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="Opt-in" label="Cookie Consent Required" />
          <StatCard value="2002" label="Directive Since" />
          <StatCard value="EUR 20M" label="GDPR Fine Possible" />
        </div>
        <p className="text-[#3a4a6b] text-sm leading-relaxed bg-purple-50 border border-purple-200 rounded-xl p-4">
          <strong>Status of the ePrivacy Regulation:</strong> Since 2017, the EU has been negotiating a new
          ePrivacy Regulation (ePR) to replace the directive. Negotiations have stalled.
          Until an agreement is reached, the existing directive remains in force — tightened by CJEU rulings and GDPR penalties.
          <SourceRef id={6} sources={sources} accent={ACCENT} />
        </p>
      </Section>

      {/* ═══════════════ 2. LEGAL FRAMEWORK ═══════════════ */}
      <Section id="rechtslage" title="Current Legal Framework (2026)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The ePrivacy landscape is shaped by three legal sources:
        </p>
        <AccordionSection
          items={[
            {
              title: "1. ePrivacy Directive (EU Level)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Art. 5(3) of the ePrivacy Directive is the core provision: Storing
                  information on a user&apos;s terminal device (cookies, fingerprinting, local storage)
                  requires informed consent — except for technically necessary cookies.
                </p>
              ),
            },
            {
              title: "2. National Transposition Laws",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Each Member State has its own transposition laws: Austria (TKG 2021), Germany
                  (TDDDG), France (LCEN/CNIL guidelines), Italy (Codice Privacy). The specific
                  requirements and sanctions differ considerably in some cases.
                </p>
              ),
            },
            {
              title: "3. CJEU Case Law",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The CJEU has tightened the rules in landmark rulings: <strong>Planet49</strong> (C-673/17):
                  Pre-ticked cookie checkboxes do not constitute valid consent.
                  <strong> CNIL/Google</strong>: EUR 150 million fine for cookie violations.
                  <strong> Meta/Facebook</strong>: No &quot;legitimate interest&quot; for advertising tracking.
                  <SourceRef id={2} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 3. COOKIES ═══════════════ */}
      <Section id="cookies" title="Cookie Consent: The Rules">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The cookie rules are the heart of ePrivacy compliance:
        </p>
        <AccordionSection
          items={[
            {
              title: "Principle: Opt-in Before Setting",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Before cookies (or similar technologies) are stored on a user&apos;s terminal device,
                  <strong> active, informed, and voluntary consent</strong> is required.
                  Pre-ticked checkboxes, implied consent (&quot;By continuing to browse,
                  you agree&quot;), or cookie walls are not permissible.
                </p>
              ),
            },
            {
              title: "Exception: Technically Necessary Cookies",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  No consent is required for cookies that are <strong>strictly necessary</strong>:
                  session cookies, shopping cart cookies, load balancing, security cookies (CSRF),
                  language and accessibility settings. Analytics cookies with low privacy impact
                  may also be exempt depending on the Member State (e.g. in Germany
                  under certain conditions).
                </p>
              ),
            },
            {
              title: "Consent Requirements",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Consent must be GDPR-compliant (Art. 4(11), Art. 7 GDPR): <strong>active</strong>
                  (no pre-checks), <strong>informed</strong> (which cookies, which purpose,
                  which recipients), <strong>voluntary</strong> (no tying prohibition), <strong>revocable</strong>
                  (just as easy as granting it). Withdrawal must be possible at any time.
                </p>
              ),
            },
            {
              title: "Cookie Walls: Permitted or Not?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  &quot;Pay or Consent&quot; models are controversial. The EDPB has issued guidelines that
                  fundamentally consider cookie walls as impermissible — consent is not
                  voluntary if the alternative is complete exclusion from the service.
                  However, some data protection authorities tolerate paid alternatives
                  (e.g. CNIL for media publishers).
                  <SourceRef id={5} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 4. TRACKING ═══════════════ */}
      <Section id="tracking" title="Tracking Technologies & Alternatives">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The ePrivacy rules apply not only to cookies but to all terminal device access:
        </p>
        <AccordionSection
          items={[
            {
              title: "Browser Fingerprinting",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Reading device properties (browser version, screen resolution, installed
                  fonts) for identification purposes falls under Art. 5(3) of the ePrivacy Directive —
                  and therefore requires consent, even if no cookies are set.
                </p>
              ),
            },
            {
              title: "Server-Side Tracking",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Server-side tracking (e.g. via Server-Side GTM, JENTIS, Stape) shifts data
                  collection from the browser to the server. This <em>technically</em> bypasses
                  cookie setting — but not the GDPR consent requirement for processing
                  personal data. The legal situation is complex and supervisory authorities
                  are tightening their positions.
                </p>
              ),
            },
            {
              title: "Cookieless Analytics",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Privacy-friendly alternatives: <strong>Plausible</strong> and <strong>Umami</strong>
                  (GDPR-compliant without cookies), <strong>Matomo</strong> (configurable without consent
                  when forgoing third-party cookies). Recommended for DACH companies: Plausible
                  or self-hosted Matomo.
                </p>
              ),
            },
            {
              title: "Pixels & Web Beacons",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Tracking pixels (Meta Pixel, LinkedIn Insight Tag) set third-party cookies and
                  therefore require explicit consent. First-party pixels with server-side
                  integration still require a GDPR legal basis.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 5. DIRECT MARKETING ═══════════════ */}
      <Section id="direktmarketing" title="Direct Marketing Rules">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The ePrivacy Directive also governs electronic direct marketing (email, SMS, phone calls):
        </p>
        <AccordionSection
          items={[
            {
              title: "Email Marketing: Opt-in Principle",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  For electronic advertising (email, SMS, messenger), prior consent is
                  generally required. Double opt-in is best practice and
                  is the de facto standard in both Austria (TKG 2021 Section 174) and Germany.
                </p>
              ),
            },
            {
              title: "Soft Opt-in for Existing Customers",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Exception for existing customer relationships (Art. 13(2) ePrivacy Directive): If a
                  customer provided their email address in the context of a purchase, the seller may
                  advertise <strong>similar own products</strong> — provided that every email includes
                  a simple opt-out option and the initial contact contained the necessary notice.
                </p>
              ),
            },
            {
              title: "B2B Marketing: Country-Specific",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  In the B2B sector, the rules differ: In Austria, B2B email marketing also
                  generally requires consent (Section 174 TKG 2021). In Germany, B2B marketing
                  is possible without consent under stricter conditions (UWG Section 7(2) No. 3).
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 6. GDPR VS EPRIVACY ═══════════════ */}
      <Section id="dsgvo-eprivacy" title="GDPR vs. ePrivacy: How They Interact">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The relationship is often confusing — here is the clarification:
        </p>
        <AccordionSection
          items={[
            {
              title: "Lex Specialis: ePrivacy Takes Precedence",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  For <strong>access to the terminal device</strong> (setting/reading cookies),
                  ePrivacy takes priority. For the <strong>subsequent processing</strong> of the
                  collected data, the GDPR applies. Two assessment steps: (1) ePrivacy consent
                  for the cookie, (2) GDPR legal basis for the data processing.
                </p>
              ),
            },
            {
              title: "Dual Legal Basis Required",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  In practice, cookie consent under ePrivacy usually also covers
                  GDPR consent — if it meets the GDPR requirements (informed,
                  voluntary, active, revocable). However: for technically necessary cookies
                  (no ePrivacy consent needed), the processing still requires a
                  GDPR legal basis (usually Art. 6(1)(f) — legitimate interest).
                </p>
              ),
            },
            {
              title: "Penalties: GDPR Level",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Since cookie violations almost always also constitute GDPR violations (missing legal basis
                  for data processing), GDPR penalties apply: up to EUR 20 million or 4%
                  of global annual turnover. The CNIL (France) has demonstrated this multiple times:
                  EUR 150 million against Google, EUR 60 million against Microsoft — for cookie violations.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 7. AUSTRIA ═══════════════ */}
      <Section id="oesterreich" title="ePrivacy in Austria: TKG 2021">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          In Austria, the ePrivacy rules are transposed in the TKG 2021:
          <SourceRef id={3} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Section 165 TKG 2021: Cookies & Tracking",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Consent is required for storing and reading information on
                  terminal devices — except where technically necessary. The DSB (Data Protection Authority)
                  is responsible for enforcing the GDPR aspects.
                </p>
              ),
            },
            {
              title: "Section 174 TKG 2021: Electronic Marketing",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Email advertising only with consent. Soft opt-in for similar products to
                  existing customers. B2B email marketing also requires consent. Cold
                  emails to business contacts are generally not permitted.
                </p>
              ),
            },
            {
              title: "Jurisdiction: RTR and DSB",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The RTR (Austrian Regulatory Authority for Broadcasting and Telecommunications) is responsible
                  for telecommunications-specific violations. The DSB handles data protection aspects.
                  In practice, overlaps frequently occur — complaints can be filed with both authorities.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 8. GERMANY ═══════════════ */}
      <Section id="deutschland" title="ePrivacy in Germany: TDDDG">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Germany has transposed the ePrivacy rules in the TDDDG:
          <SourceRef id={4} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Section 25 TDDDG: The Cookie Provision",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Section 25(1) TDDDG: Consent is required for storing and reading
                  information on terminal devices. Section 25(2): Exception for technically necessary access
                  (narrow interpretation). Consent must be GDPR-compliant.
                </p>
              ),
            },
            {
              title: "PIMS: Personal Information Management Services",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The TDDDG provides for the possibility of &quot;recognised consent management services&quot;
                  (PIMS) — services that centrally manage cookie consent on behalf of the user.
                  The concrete implementation is still pending but could replace cookie banners in the long term.
                </p>
              ),
            },
            {
              title: "Jurisdiction: BfDI and State Authorities",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The Federal Network Agency is responsible for TDDDG-specific provisions.
                  For the GDPR aspects (data processing after cookie setting), the
                  State Commissioners for Data Protection are responsible.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 9. CMP ═══════════════ */}
      <Section id="cmp" title="Consent Management Platforms (CMPs)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          A Consent Management Platform is indispensable for most websites:
        </p>
        <AccordionSection
          items={[
            {
              title: "What a CMP Must Deliver",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Legally compliant cookie banner: genuine choice (accept/reject equally prominent),
                  granular purpose selection, first-party/third-party distinction, withdrawal possible
                  at any time, consent documentation (proof), TCF 2.2 compatible (for
                  programmatic advertising).
                </p>
              ),
            },
            {
              title: "Recommended CMPs for DACH Region",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  <strong>Usercentrics</strong> (Munich, EU servers, TCF 2.2, from EUR 49/month),
                  <strong> Cookiebot</strong> (Denmark, GDPR-compliant, from EUR 12/month),
                  <strong> Consentmanager</strong> (Hamburg, TCF 2.2, from EUR 18/month),
                  <strong> Borlabs Cookie</strong> (WordPress, one-time EUR 39).
                  For Austrian companies: EU server location and GDPR DPA are important.
                </p>
              ),
            },
            {
              title: "Common CMP Mistakes",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  &quot;Accept&quot; prominent, &quot;Reject&quot; hidden → dark pattern, unlawful.
                  Cookies set before consent → technical violation. &quot;Legitimate interest&quot; as
                  default setting for marketing cookies → not permissible. Missing withdrawal option
                  → GDPR violation. Consent not documented → burden of proof problem.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 10. FUTURE ═══════════════ */}
      <Section id="zukunft" title="ePrivacy Regulation: The Long Road">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Since 2017, the EU has been negotiating a new ePrivacy Regulation — so far without result:
          <SourceRef id={6} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "What the ePR Would Change",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Uniform rules as a regulation (no more national transposition). Browser-based
                  consent management (set once instead of on every website). Extended
                  exceptions for statistical analysis. Clear rules for IoT and M2M communication.
                  Metadata usage regulated.
                </p>
              ),
            },
            {
              title: "Why Progress Has Stalled",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Fundamental conflict of interest: Privacy advocates want stricter rules,
                  the advertising industry and telecom sector want more flexibility. Points of contention:
                  cookie wall ban, browser-based consent, metadata processing,
                  server-side tracking classification.
                </p>
              ),
            },
            {
              title: "Practical Consequence",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Until the ePR arrives, the national transposition laws of the existing directive apply.
                  Companies should follow the strictest interpretation (CJEU case law
                  + EDPB guidelines) and not wait for the ePR.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 11. INTERPLAY ═══════════════ */}
      <Section id="zusammenspiel" title="Interplay with Other EU Laws">
        <AccordionSection
          items={[
            {
              title: "GDPR — General Data Protection Regulation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  ePrivacy as lex specialis takes precedence for terminal device access. The GDPR supplements
                  the subsequent data processing. GDPR penalties apply to cookie violations.
                </p>
              ),
            },
            {
              title: "DSA — Digital Services Act",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  The DSA complements ePrivacy in advertising transparency: Art. 26 DSA prohibits
                  targeting based on special categories of data. ePrivacy governs the
                  technical consent (cookie), the DSA governs advertisement transparency.
                </p>
              ),
            },
            {
              title: "AI Act — Profiling & Targeting",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  AI-based advertising targeting must comply with both ePrivacy consent requirements and
                  AI Act transparency obligations. Manipulative AI systems (Art. 5 AI Act)
                  may not use ePrivacy data.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 12. ROADMAP ═══════════════ */}
      <Section id="fahrplan" title="Compliance Roadmap">
        <AccordionSection
          items={[
            {
              title: "Phase 1: Cookie Audit",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Inventory all cookies and tracking technologies on your website.
                  Classification: necessary / analytics / marketing / social media. Check which
                  cookies are actually set before consent. Tool recommendation: CookieBot Scan
                  or Ghostery.
                </p>
              ),
            },
            {
              title: "Phase 2: Implement CMP",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Set up a professional Consent Management Platform. Cookie banner with a genuine
                  reject button (equally prominent as accept). Granular purpose selection.
                  Configure consent documentation. Create a cookie policy page.
                </p>
              ),
            },
            {
              title: "Phase 3: Review Tracking Stack",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Google Analytics → evaluate alternatives (Plausible, Matomo). Meta Pixel → Server-Side
                  Conversion API with CMP integration. Google Tag Manager → evaluate Server-Side GTM.
                  Check all marketing pixels for CMP consent gating.
                </p>
              ),
            },
            {
              title: "Phase 4: Ongoing Compliance",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Regular cookie scans (quarterly). Monitor CMP consent rates (benchmark:
                  40-70% accept rate). Track case law updates. Implement new CJEU rulings and
                  EDPB guidelines promptly.
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
              title: "Do I need a cookie banner if I only set technically necessary cookies?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  No, for purely technically necessary cookies (session, shopping cart, security),
                  no consent and therefore no banner is required. However, you must
                  provide information about them in your privacy policy.
                </p>
              ),
            },
            {
              title: "Is Google Analytics permitted without consent?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  In the standard configuration: No. Google Analytics sets cookies and transfers
                  data to the USA. Alternative: Google Analytics in server-side mode with IP anonymisation
                  and EU data processing — but even then consent is required since cookies
                  are being set. Recommendation: Plausible or Umami as a cookieless alternative.
                </p>
              ),
            },
            {
              title: "What are the consequences of cookie violations?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  GDPR fines of up to EUR 20 million or 4% of annual turnover. Warnings by
                  consumer protection associations. Civil damages claims. The CNIL
                  (France) imposed a total of over EUR 300 million in cookie-related
                  fines in 2022 — including against non-French companies.
                </p>
              ),
            },
            {
              title: "Is server-side tracking the solution for cookie consent?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Partially. Server-side tracking bypasses the setting of third-party cookies. However:
                  (1) first-party cookies still require consent, (2) the processing of
                  personal data requires a GDPR legal basis, (3) supervisory authorities
                  are increasingly tightening their position on server-side tracking.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════════ RELATED REGULATIONS ═══════════════════ */}
      <RelatedGuides currentGuide="eprivacy" accent="#6d28d9" />

      {/* ═══════════════ TOOL RECOMMENDATION ═══════════════ */}
      <ToolRecommendation regulationKey="eprivacy" accent={ACCENT} />

      {/* ═══════════════ SOURCES ═══════════════ */}
      <Section id="quellen" title="Sources & Further Reading">
        <SourceList sources={sources} />
      </Section>
    </GuidePageLayout>
  );
}
