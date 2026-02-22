"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ══════════════════════════════════════════════════════════════
   Glossary Data — English
   ══════════════════════════════════════════════════════════════ */

interface GlossaryEntry {
  term: string;
  definition: string;
  /** Internal link to guide page, if applicable */
  href?: string;
  /** Category tag */
  category: string;
}

const CATEGORIES = [
  "All",
  "Data Protection",
  "Cybersecurity",
  "AI",
  "Financial Sector",
  "Sustainability",
  "Platform",
  "General",
] as const;

type Category = (typeof CATEGORIES)[number];

const GLOSSARY: GlossaryEntry[] = [
  // A
  { term: "Adequacy Decision", definition: "Decision by the European Commission that a third country offers an adequate level of data protection. Enables data transfers without additional safeguards under GDPR Art. 45.", category: "Data Protection", href: "/dsgvo" },
  { term: "AI Act (AI Regulation)", definition: "EU Regulation 2024/1689 governing artificial intelligence. Classifies AI systems by risk class: prohibited, high-risk, limited and minimal. The first prohibitions apply from August 2025.", category: "AI", href: "/eu-ai-act" },
  { term: "AI Literacy", definition: "Obligation under the EU AI Act (Art. 4): providers and deployers of AI systems must ensure that their personnel have sufficient AI competence.", category: "AI", href: "/eu-ai-act" },
  { term: "Algorithmic Auditing", definition: "Examination of AI systems for fairness, transparency and non-discrimination. Required under the AI Act for high-risk AI as part of the conformity assessment.", category: "AI", href: "/eu-ai-act" },
  { term: "Accountability Principle", definition: "GDPR principle (Art. 5(2)): the controller must be able to demonstrate compliance with all data protection principles.", category: "Data Protection", href: "/dsgvo" },
  // B
  { term: "BaFG (Accessibility Strengthening Act)", definition: "Austrian transposition of the European Accessibility Act. Obliges companies from 28 June 2025 to ensure accessibility of digital products and services.", category: "General", href: "/bafg" },
  { term: "BCM (Business Continuity Management)", definition: "Systematic process to ensure business continuity during disruptions. A mandatory component under NIS2 and DORA.", category: "Cybersecurity" },
  { term: "Binding Corporate Rules (BCR)", definition: "Binding internal data protection rules for international groups. Enable data transfers to third countries without an adequacy decision under GDPR Art. 47.", category: "Data Protection", href: "/dsgvo" },
  // C
  { term: "CASP (Crypto-Asset Service Provider)", definition: "Crypto service provider under MiCA: exchanges, custodians, advisors and other providers of crypto services. Must apply for an EU-wide licence.", category: "Financial Sector", href: "/mica" },
  { term: "CE Marking", definition: "Conformity marking for products in the EU single market. Under the CRA it also becomes relevant for software and IoT products.", category: "General", href: "/cra" },
  { term: "Cloud Switching", definition: "Data Act right: customers must be able to switch their cloud provider without excessive barriers. Providers must ensure data portability and abolish switching fees by 2027.", category: "General", href: "/data-act" },
  { term: "Conformity Assessment", definition: "Procedure to demonstrate that a product or AI system meets the applicable EU requirements. Can be carried out by self-assessment or notified bodies.", category: "General" },
  { term: "CRA (Cyber Resilience Act)", definition: "EU Regulation 2024/2847 on cybersecurity requirements for products with digital elements. Manufacturers must implement security by design and actively manage vulnerabilities.", category: "Cybersecurity", href: "/cra" },
  { term: "CSIRD (Computer Security Incident Response Team)", definition: "Specialised team for responding to cybersecurity incidents. Each EU member state must operate a national CSIRT under NIS2.", category: "Cybersecurity", href: "/nisg-2026" },
  { term: "CSRD (Corporate Sustainability Reporting Directive)", definition: "EU Directive 2022/2464 on sustainability reporting. Obliges large companies to report according to ESRS standards with external assurance.", category: "Sustainability", href: "/csrd-esg" },
  { term: "Cyber Insurance", definition: "Insurance product to cover damages from cyber attacks. NIS2 compliance can positively influence insurance terms and premiums.", category: "Cybersecurity" },
  { term: "Cyber Threat Intelligence (CTI)", definition: "Structured information on current and potential cyber threats. NIS2 Art. 29 promotes the exchange of CTI between entities.", category: "Cybersecurity", href: "/nisg-2026" },
  // D
  { term: "Data Act", definition: "EU Regulation 2023/2854 on fair data access and data use rules. Governs access to IoT data and cloud switching. Applicable from September 2025.", category: "General", href: "/data-act" },
  { term: "Data Inventory", definition: "Comprehensive stocktaking of all data processed within a company. Basis for the GDPR record of processing activities and CSRD sustainability reporting.", category: "Data Protection" },
  { term: "Data Protection Impact Assessment (DPIA)", definition: "Mandatory assessment under GDPR Art. 35 for processing activities with a high risk to the rights of data subjects. Must be carried out before processing begins.", category: "Data Protection", href: "/dsgvo" },
  { term: "Data Subject Rights", definition: "GDPR rights of data subjects: access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction (Art. 18), data portability (Art. 20), objection (Art. 21).", category: "Data Protection", href: "/dsgvo" },
  { term: "Digital Operational Resilience Testing", definition: "DORA requirement: financial undertakings must regularly test their ICT systems through penetration tests, scenario analyses and stress tests.", category: "Financial Sector", href: "/dora" },
  { term: "Digital Product Passport (DPP)", definition: "Electronic data record with sustainability and lifecycle information of a product. From 2027 for batteries, then progressively for textiles and further product categories.", category: "Sustainability", href: "/digitaler-produktpass" },
  { term: "DMA (Digital Markets Act)", definition: "EU Regulation on contestable and fair markets in the digital sector. Governs the behaviour of gatekeepers such as Google, Apple, Amazon, Meta.", category: "Platform" },
  { term: "DORA (Digital Operational Resilience Act)", definition: "EU Regulation 2022/2554 on digital operational resilience in the financial sector. Binding since 17 January 2025 for banks, insurers, investment firms and ICT third-party providers.", category: "Financial Sector", href: "/dora" },
  { term: "Double Materiality", definition: "Core CSRD principle: companies must assess both their impacts on the environment/society (impact materiality) and the financial risks (financial materiality).", category: "Sustainability", href: "/csrd-esg" },
  { term: "DSA (Digital Services Act)", definition: "EU Regulation 2022/2065 on digital services. Governs the liability and obligations of online platforms, hosting services and search engines. Contains transparency obligations and content moderation requirements.", category: "Platform", href: "/dsa" },
  // E
  { term: "EDPB (European Data Protection Board)", definition: "European Data Protection Board. Ensures the consistent application of the GDPR through guidelines, recommendations and binding decisions.", category: "Data Protection" },
  { term: "EHDS (European Health Data Space)", definition: "EU Regulation on the European Health Data Space. Governs the primary and secondary use of health data to improve healthcare and research.", category: "Data Protection", href: "/ehds" },
  { term: "eIDAS 2.0", definition: "Amendment to the EU Regulation on electronic identification. Introduces the European Digital Identity Wallet, enabling citizens to identify themselves digitally across the EU.", category: "General", href: "/eidas" },
  { term: "ENISA", definition: "EU Agency for Cybersecurity. Supports EU member states in implementing NIS2 and coordinates cross-border cybersecurity activities.", category: "Cybersecurity" },
  { term: "ESRS (European Sustainability Reporting Standards)", definition: "Reporting standards by EFRAG for CSRD reporting. Comprise 12 thematic standards on Environment (E1-E5), Social (S1-S4) and Governance (G1).", category: "Sustainability", href: "/csrd-esg" },
  { term: "EU Taxonomy", definition: "EU classification system for environmentally sustainable economic activities. Defines technical screening criteria for six environmental objectives.", category: "Sustainability", href: "/csrd-esg" },
  { term: "Explainability", definition: "AI Act requirement: users of high-risk AI must be able to understand the functioning and decisions of the system. Closely linked to transparency obligations.", category: "AI", href: "/eu-ai-act" },
  // F
  { term: "Foundation Model", definition: "Large AI model pre-trained on broad data (e.g. GPT, Claude). Regulated under the AI Act as 'General-Purpose AI' (GPAI) with transparency and, where applicable, systemic risk obligations.", category: "AI", href: "/eu-ai-act" },
  // G
  { term: "Gatekeeper", definition: "Platform classified as dominant under the DMA (e.g. Google, Apple, Meta, Amazon). Subject to special behavioural obligations for fair competition.", category: "Platform" },
  { term: "GDPR (General Data Protection Regulation)", definition: "EU Regulation 2016/679 on the protection of personal data. In force since 25 May 2018 and the central data protection law in the EU with fines up to EUR 20 million or 4% of annual turnover.", category: "Data Protection", href: "/dsgvo" },
  { term: "Green Claims Directive", definition: "EU Directive against misleading environmental claims (greenwashing). Companies must substantiate environmental claims scientifically and have them independently verified.", category: "Sustainability", href: "/green-claims" },
  { term: "Greenwashing", definition: "Misleading marketing of products or companies as environmentally friendly. The Green Claims Directive will in future require scientific evidence for all environmental claims.", category: "Sustainability", href: "/green-claims" },
  // H
  { term: "High-Risk AI System", definition: "AI system under AI Act Annex III deployed in sensitive areas (e.g. recruitment, credit scoring, healthcare). Subject to strict requirements on documentation, testing and human oversight.", category: "AI", href: "/eu-ai-act" },
  { term: "HSchG (Whistleblower Protection Act)", definition: "Austrian transposition of the EU Whistleblower Directive. Obliges companies with 50+ employees to establish internal reporting channels for whistleblowers.", category: "General", href: "/hschg" },
  // I
  { term: "ICT (Information and Communication Technology)", definition: "Umbrella term for all technological systems for information processing. Central to the scope definition in DORA and NIS2.", category: "Cybersecurity" },
  { term: "ICT Risk Management", definition: "DORA Art. 6-16: systematic framework for identifying, assessing and mitigating ICT-related risks in the financial sector.", category: "Financial Sector", href: "/dora" },
  { term: "Incident Response", definition: "Structured process for detecting, analysing and responding to security incidents. NIS2 requires a 72-hour reporting deadline to the competent authority.", category: "Cybersecurity", href: "/nisg-2026" },
  { term: "ISMS (Information Security Management System)", definition: "Systematic approach to managing sensitive information. ISO 27001 is the key standard. Recognised under NIS2 as evidence of appropriate measures.", category: "Cybersecurity", href: "/nisg-2026" },
  // J
  { term: "Joint Controllership", definition: "GDPR Art. 26: when two or more controllers jointly determine the purposes and means of processing, they must conclude an arrangement on their respective obligations.", category: "Data Protection", href: "/dsgvo" },
  // M
  { term: "MFA (Multi-Factor Authentication)", definition: "Security procedure with at least two independent authentication factors. Prescribed under NIS2 as a minimum technical measure for essential and important entities.", category: "Cybersecurity", href: "/nisg-2026" },
  { term: "MiCA (Markets in Crypto-Assets)", definition: "EU Regulation 2023/1114 governing crypto-assets. Creates a uniform legal framework for stablecoins, utility tokens and crypto-asset service providers (CASPs) in the EU.", category: "Financial Sector", href: "/mica" },
  // N
  { term: "NIS2 Directive", definition: "EU Directive 2022/2555 on network and information security. Extends the scope to 18 sectors and distinguishes between essential and important entities.", category: "Cybersecurity", href: "/nisg-2026" },
  { term: "NISG 2026", definition: "Austrian Network and Information System Security Act 2026. National transposition of the NIS2 Directive with registration obligation at the BMI and fines up to EUR 10 million.", category: "Cybersecurity", href: "/nisg-2026" },
  { term: "Notified Body", definition: "Organisation designated by EU member states for conformity assessments. Under the CRA and AI Act they examine whether products and AI systems meet EU requirements.", category: "General" },
  // P
  { term: "Penetration Test", definition: "Controlled attack on IT systems to uncover vulnerabilities. NIS2 requires regular security tests; DORA specifically demands TLPT for systemically important institutions.", category: "Cybersecurity" },
  { term: "Privacy by Design", definition: "GDPR principle (Art. 25): data protection must be considered at the design stage of systems and processes, not just as an afterthought.", category: "Data Protection", href: "/dsgvo" },
  { term: "Processor", definition: "Natural or legal person that processes personal data on behalf of the controller. Must be bound by a data processing agreement (DPA).", category: "Data Protection", href: "/dsgvo" },
  { term: "Product Liability Directive", definition: "Revised EU Directive 2024/2853 on product liability. For the first time software and AI systems are also classified as products. Eased burden of proof for complex products.", category: "General", href: "/produkthaftung" },
  // R
  { term: "Record of Processing Activities", definition: "GDPR Art. 30: documentation of all personal data processing activities. Mandatory for controllers and processors with more than 250 employees (with exceptions).", category: "Data Protection", href: "/dsgvo" },
  { term: "Registration Obligation", definition: "NIS2/NISG 2026 obliges affected entities to register with the national authority (in AT: BMI). Deadline: 3 months after entry into force.", category: "Cybersecurity", href: "/nisg-2026" },
  { term: "Risk Management", definition: "Systematic process for identifying, assessing and treating risks. A core obligation in NIS2 (Art. 21), DORA (Art. 6), AI Act and GDPR.", category: "General" },
  // S
  { term: "SBOM (Software Bill of Materials)", definition: "Machine-readable inventory of all software components in a product. Mandatory under the CRA to trace vulnerabilities in dependencies.", category: "Cybersecurity", href: "/cra" },
  { term: "Scope 1/2/3 Emissions", definition: "Categorisation of greenhouse gas emissions: Scope 1 (direct), Scope 2 (energy purchases), Scope 3 (supply chain). CSRD/ESRS requires reporting of all three scopes.", category: "Sustainability", href: "/csrd-esg" },
  { term: "Security by Design", definition: "Development principle under the CRA: security must be integrated into product development from the outset — not as a later addition.", category: "Cybersecurity", href: "/cra" },
  { term: "Stablecoin", definition: "Crypto-asset pegged to a stable asset (e.g. euro, USD). Under MiCA, stablecoins are subject to strict reserve requirements and issuer obligations.", category: "Financial Sector", href: "/mica" },
  { term: "Standard Contractual Clauses (SCCs)", definition: "Contract templates approved by the European Commission for data transfers to third countries. The new SCCs (Implementing Decision 2021/914) have applied since June 2021.", category: "Data Protection", href: "/dsgvo" },
  { term: "Supply Chain Security", definition: "NIS2 Art. 21(2)(d) obliges entities to assess and monitor the cybersecurity of their suppliers and service providers.", category: "Cybersecurity", href: "/nisg-2026" },
  // T
  { term: "TLPT (Threat-Led Penetration Testing)", definition: "Method prescribed under DORA for threat-led security testing. Large financial institutions must have external TLPT carried out every 3 years.", category: "Financial Sector", href: "/dora" },
  { term: "TOMs (Technical and Organisational Measures)", definition: "GDPR Art. 32: controllers must implement appropriate technical (encryption, pseudonymisation) and organisational (access controls, training) measures for data protection.", category: "Data Protection", href: "/dsgvo" },
  { term: "Transparency Obligations", definition: "Cross-cutting requirement in GDPR (Art. 13/14), AI Act (Art. 50), DSA and CSRD: companies must provide clear and comprehensible information about their practices.", category: "General" },
  // V
  { term: "Vulnerability Disclosure", definition: "CRA obligation: manufacturers must report actively exploited vulnerabilities to ENISA within 24 hours. Coordinated disclosure is mandatory.", category: "Cybersecurity", href: "/cra" },
  // W
  { term: "WCAG (Web Content Accessibility Guidelines)", definition: "International guidelines for accessible web content. Level AA is prescribed as the minimum standard under the BaFG/European Accessibility Act.", category: "General", href: "/bafg" },
  { term: "Whistleblower", definition: "Person who reports violations of EU law. Protected against retaliation by the EU Whistleblower Directive 2019/1937 and national laws (HSchG).", category: "General", href: "/hschg" },
  // E (essential/important)
  { term: "Essential Entity", definition: "NIS2 category for entities in critical sectors (energy, transport, health etc.) with 250+ employees or EUR 50 million+ turnover. Subject to proactive supervision.", category: "Cybersecurity", href: "/nisg-2026" },
  { term: "Important Entity", definition: "NIS2 category for entities in further sectors with 50+ employees or EUR 10 million+ turnover. Subject to reactive supervision (only upon indications of violations).", category: "Cybersecurity", href: "/nisg-2026" },
  // Z
  { term: "Zero Trust", definition: "Security model based on the principle 'trust nobody, verify everything'. Every access is authenticated and authorised regardless of network location. Recommended under NIS2 and DORA.", category: "Cybersecurity" },
].sort((a, b) => a.term.localeCompare(b.term, "en"));

/* ── Extract first letters for alphabet nav ── */
const ALPHABET = Array.from(new Set(GLOSSARY.map((g) => g.term[0].toUpperCase()))).sort((a, b) =>
  a.localeCompare(b, "en"),
);

/* ══════════════════════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════════════════════ */

export default function GlossarContentEN() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = useMemo(() => {
    return GLOSSARY.filter((entry) => {
      const matchesCategory =
        activeCategory === "All" || entry.category === activeCategory;
      const matchesSearch =
        search.length < 2 ||
        entry.term.toLowerCase().includes(search.toLowerCase()) ||
        entry.definition.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  /* Group by first letter */
  const grouped = useMemo(() => {
    const map = new Map<string, GlossaryEntry[]>();
    for (const entry of filtered) {
      const letter = entry.term[0].toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(entry);
    }
    return map;
  }, [filtered]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#060c1a]">
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,92,246,0.08) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-400/10 border border-violet-400/20 text-violet-400 text-xs font-mono font-semibold tracking-wider uppercase mb-6">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              Reference
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              Compliance{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Glossary</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {GLOSSARY.length} technical terms from EU compliance, data protection, cybersecurity and ESG. Clearly explained with references to the relevant regulations.
            </p>
          </div>
        </section>

        {/* ── Search + Filter ── */}
        <section className="pb-4 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Search */}
            <div className="relative mb-6">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search term..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-violet-400/40 transition-colors"
                aria-label="Search glossary"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    background: activeCategory === cat ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.04)",
                    color: activeCategory === cat ? "#a78bfa" : "#94a3b8",
                    borderWidth: 1,
                    borderColor: activeCategory === cat ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.06)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Alphabet jump */}
            <div className="flex flex-wrap gap-1 mb-8">
              {ALPHABET.map((letter) => {
                const hasEntries = grouped.has(letter);
                return (
                  <a
                    key={letter}
                    href={hasEntries ? `#letter-${letter}` : undefined}
                    className="w-8 h-8 flex items-center justify-center rounded-md text-xs font-mono font-bold transition-colors"
                    style={{
                      color: hasEntries ? "#a78bfa" : "#334155",
                      background: hasEntries ? "rgba(139,92,246,0.08)" : "transparent",
                      cursor: hasEntries ? "pointer" : "default",
                    }}
                  >
                    {letter}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Glossary Entries ── */}
        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-slate-400 text-sm">
                  No term found. Try a different search term.
                </p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {Array.from(grouped.entries()).map(([letter, entries]) => (
                  <motion.div
                    key={letter}
                    id={`letter-${letter}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mb-8 scroll-mt-24"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-[Syne] font-extrabold text-3xl text-violet-400/30">
                        {letter}
                      </span>
                      <div className="flex-1 h-px bg-white/5" />
                    </div>

                    <div className="space-y-3">
                      {entries.map((entry) => (
                        <div
                          key={entry.term}
                          className="rounded-xl border border-white/5 bg-slate-900/40 p-5 hover:border-violet-400/15 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-2">
                                <h3 className="font-bold text-white text-sm">
                                  {entry.term}
                                </h3>
                                <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-semibold bg-white/5 text-slate-400">
                                  {entry.category}
                                </span>
                              </div>
                              <p className="text-sm text-slate-400 leading-relaxed">
                                {entry.definition}
                              </p>
                            </div>
                            {entry.href && (
                              <Link
                                href={entry.href}
                                className="flex-shrink-0 mt-1 text-violet-400 hover:text-violet-300 transition-colors"
                                title={`Go to ${entry.term} guide`}
                              >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
