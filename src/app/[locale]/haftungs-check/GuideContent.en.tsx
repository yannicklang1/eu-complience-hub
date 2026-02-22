"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GuidePageLayout from "@/components/GuidePageLayout";
import type { TocItem } from "@/components/TableOfContents";
import type { QuickFact } from "@/components/GuidePageLayout";
import AccordionSection from "@/components/AccordionSection";
import LawRef from "@/components/LawRef";
import { SourceRef, SourceList, type Source } from "@/components/SourceRef";
import ToolRecommendation from "@/components/ToolRecommendation";
import RelatedGuides from "@/components/RelatedGuides";
import { useTranslations } from "@/i18n/use-translations";

/* ─────────────────── Sources ─────────────────── */
const sources: Source[] = [
  {
    id: 1,
    title: "Directive (EU) 2022/2555 — NIS2",
    url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj/deu",
    desc: "Art. 20: Governance and obligations of management bodies",
    type: "EU Directive",
  },
  {
    id: 2,
    title: "Regulation (EU) 2022/2554 — DORA",
    url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj/deu",
    desc: "Art. 5: Governance and organisation of ICT risk management",
    type: "Regulation",
  },
  {
    id: 3,
    title: "Regulation (EU) 2024/1689 — AI Act",
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/deu",
    desc: "Art. 99: Fines and national sanction provisions",
    type: "Regulation",
  },
  {
    id: 4,
    title: "Regulation (EU) 2024/2847 — CRA",
    url: "https://eur-lex.europa.eu/eli/reg/2024/2847/oj/deu",
    desc: "Art. 64: Sanctions and market surveillance measures",
    type: "Regulation",
  },
  {
    id: 5,
    title: "\u00A7 25 GmbHG \u2014 Duty of Care for Managing Directors",
    url: "https://www.jusline.at/gesetz/gmbhg/paragraf/25",
    desc: "Duty of care and responsibility of managing directors",
    type: "Austrian Law",
  },
  {
    id: 6,
    title: "\u00A7 84 AktG \u2014 Duty of Care for Board Members",
    url: "https://www.jusline.at/gesetz/aktg/paragraf/84",
    desc: "Duty of care and responsibility of board members",
    type: "Austrian Law",
  },
  {
    id: 7,
    title: "NISG 2026 — Parliamentary Process",
    url: "https://www.parlament.gv.at/gegenstand/XXVIII/I/308",
    desc: "Austrian transposition of the NIS2 Directive (BGBl. I Nr. 94/2025)",
    type: "Austrian Law",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Why This Matters" },
  { id: "grundlagen", label: "Liability Fundamentals" },
  { id: "nis2", label: "Liability under NIS2/NISG" },
  { id: "dora", label: "Liability under DORA" },
  { id: "ai-act", label: "Liability under AI Act" },
  { id: "cra", label: "Liability under CRA" },
  { id: "vergleich", label: "Liability Comparison" },
  { id: "enthaftung", label: "Liability Mitigation" },
  { id: "dundo", label: "D&O Insurance" },
  { id: "checkliste", label: "Checklist" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Sources" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Affected Roles", value: "CEO, Board, Supervisory Board" },
  { label: "Max. Personal Liability", value: "Unlimited (recourse)" },
  { label: "NIS2 Training Obligation", value: "Yes (Art. 20 para. 2)" },
  { label: "DORA Responsibility", value: "Management body directly" },
  { label: "AI Act Max. Fine", value: "EUR 35m / 7%" },
  { label: "Mitigation Strategy", value: "Documentation + Delegation" },
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

/* ══════════════════════════════════════════════════════
   GUIDE CONTENT
   ══════════════════════════════════════════════════════ */

export default function GuideContentEN() {
  const { locale } = useTranslations();
  return (
    <GuidePageLayout
      title={"Executive Liability"}
      subtitle={"Personal liability risks under NIS2, DORA, AI Act & CRA \u2014 and how to protect yourself"}
      regulationKey={"Cross-Regulatory"}
      accent="#ef4444"
      tocItems={tocItems}
      quickFacts={quickFacts}
      trustBadge={{ lastReview: "18.02.2026", sourceCount: 7 }}
      href="/haftungs-check"
    >
      {/* ═══════════════ 1. UEBERBLICK ═══════════════ */}
      <Section id="ueberblick" title="Why Executives Must Act Now">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The new wave of EU regulations {"\u2014"} NIS2, DORA, AI Act and CRA {"\u2014"} share one
          common thread: <strong>Executive management is explicitly held accountable.</strong> For the first time,
          European regulations and directives go beyond mere corporate fines
          and establish a <strong>personal responsibility of management bodies</strong>.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { value: "4", label: "Regulations", accent: "#ef4444" },
            { value: "Art. 20", label: "NIS2 Exec. Duty", accent: "#0ea5e9" },
            { value: "Art. 5", label: "DORA Mgmt. Body", accent: "#10b981" },
            { value: "\u20AC35m", label: "Max. Fine AI Act", accent: "#7c3aed" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-[#d8dff0] bg-white p-5 text-center">
              <div className="font-[Syne] font-extrabold text-2xl sm:text-3xl mb-1" style={{ color: stat.accent }}>
                {stat.value}
              </div>
              <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 flex items-center gap-2">
            <span className="text-lg">{"\u26A0\uFE0F"}</span> The Core Problem
          </h3>
          <p className="text-sm text-[#3a4a6b] leading-relaxed">
            <strong>Ignorance does not protect against liability.</strong> All four regulations require
            executive management to <em>know</em> the risks, <em>approve</em> mitigation measures and
            <em> oversee</em> their implementation. Anyone who delegates these duties without exercising
            proper oversight remains liable {"\u2014"} often personally and with their private assets.
          </p>
        </div>
      </Section>

      {/* ═══════════════ 2. GRUNDLAGEN ═══════════════ */}
      <Section id="grundlagen" title="Liability Fundamentals at a Glance">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The personal liability of executives is based on multiple legal layers.
          The EU regulations create <strong>new, specific obligations</strong> that operate
          alongside the general corporate duty-of-care requirements:
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl mb-3">{"{\u2696\uFE0F}"}</div>
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 text-sm">Corporate Law</h3>
            <p className="text-xs text-[#3a4a6b] leading-relaxed">
              General duty of care under <LawRef law="GmbHG" paragraph="25" /><SourceRef id={5} sources={sources} accent="#ef4444" /> or <LawRef law="AktG" paragraph="84" /><SourceRef id={6} sources={sources} accent="#ef4444" />.
              Managing directors must act with the diligence of a prudent businessperson.
              Violations lead to <strong>internal liability</strong> (recourse by the company).
            </p>
          </div>
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-xl mb-3">{"\uD83D\uDCCB"}</div>
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 text-sm">EU Regulation (new)</h3>
            <p className="text-xs text-[#3a4a6b] leading-relaxed">
              NIS2, DORA and the AI Act create <strong>explicit obligations</strong> for executive management:
              risk approval, training requirements, oversight. Non-compliance can trigger direct
              sanctions against natural persons.
            </p>
          </div>
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl mb-3">{"\uD83D\uDCC4"}</div>
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 text-sm">Administrative Law</h3>
            <p className="text-xs text-[#3a4a6b] leading-relaxed">
              In the case of administrative penalties, competent authorities can also hold <strong>management
              personnel personally</strong> liable. NIS2, in particular, provides for the possibility
              of prohibiting executives from exercising management functions.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
          <p className="text-sm text-amber-900 flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">{"\u26A0\uFE0F"}</span>
            <span>
              <strong>Business Judgment Rule:</strong> The BJR only protects executives
              when they acted on the basis of adequate information, without conflicts of interest and in good
              faith for the benefit of the company. Compliance failures typically do <em>not</em> fall
              under this protection.
            </span>
          </p>
        </div>
      </Section>

      {/* ═══════════════ 3. NIS2/NISG ═══════════════ */}
      <Section id="nis2" title="Liability under NIS2 / NISG 2026">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The NIS2 Directive<SourceRef id={1} sources={sources} accent="#ef4444" /> (and consequently the Austrian NISG 2026) contains the
          <strong> most explicit executive obligations</strong> of all EU cybersecurity regulations.
          <LawRef law="NIS2" article="20">Art. 20 NIS2</LawRef> directly addresses management bodies:
        </p>

        <div className="space-y-4 mb-8">
          <div className="rounded-2xl border border-sky-200 bg-sky-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-sky-500 text-white text-xs font-bold">Art. 20 para. 1</span>
              Approval Obligation
            </h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed">
              The management bodies of essential and important entities must
              <strong> approve</strong> the risk management measures under <LawRef law="NIS2" article="21">Art. 21</LawRef> and
              <strong> oversee</strong> their implementation. They can be
              <strong> held liable for violations</strong>.
            </p>
          </div>

          <div className="rounded-2xl border border-sky-200 bg-sky-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-sky-500 text-white text-xs font-bold">Art. 20 para. 2</span>
              Training Obligation
            </h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed">
              Members of management bodies must <strong>participate in cybersecurity training</strong> and
              shall encourage corresponding training for employees as well. The training obligation
              is <em>non-delegable</em> {"\u2014"} the managing director must participate personally.
            </p>
          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-red-500 text-white text-xs font-bold">Art. 32 para. 5</span>
              Activity Ban
            </h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed">
              For <strong>essential entities</strong>, competent authorities may request that a natural
              person exercising management responsibilities at CEO/board level be
              <strong> temporarily prohibited</strong> from exercising management functions.
              This is the most severe personal sanction across all EU cybersecurity regulation.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 text-sm">NISG 2026 {"\u2014"} Austrian Specifics</h3>
          <ul className="space-y-2 text-sm text-[#3a4a6b]">
            <li className="flex items-start gap-2">
              <span className="text-sky-500 mt-0.5 shrink-0">{"\u25B8"}</span>
              <span>Executive management must <strong>personally approve</strong> the cybersecurity strategy</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500 mt-0.5 shrink-0">{"\u25B8"}</span>
              <span>Training records must be documented and presented to the authority upon request</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500 mt-0.5 shrink-0">{"\u25B8"}</span>
              <span>When registering with the BMI, executive management must be named individually</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500 mt-0.5 shrink-0">{"\u25B8"}</span>
              <span>The personal responsibility of executive management is explicitly enshrined in <LawRef law="NIS2" article="20" absatz="1">Art. 20 para. 1 NIS2</LawRef> and is <strong>non-delegable</strong></span>
            </li>
          </ul>
          <div className="mt-4">
            <Link href={`/${locale}/nisg-2026#geschaeftsfuehrer`} className="text-sm font-medium text-sky-500 hover:underline">
              More in the NISG 2026 Guide {"\u2192"}
            </Link>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 4. DORA ═══════════════ */}
      <Section id="dora" title="Liability under DORA">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          DORA<SourceRef id={2} sources={sources} accent="#ef4444" /> makes the <strong>management body the central accountable party</strong> for
          digital operational resilience. <LawRef law="DORA" article="5">Art. 5 DORA</LawRef> assigns comprehensive
          ultimate responsibility to the management body:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            {
              title: "ICT Risk Management Framework",
              desc: "The management body defines, approves, oversees and bears ultimate responsibility for the implementation of the ICT risk management framework (Art. 5 para. 2a).",
              icon: "\uD83D\uDEE1\uFE0F",
            },
            {
              title: "ICT Business Continuity",
              desc: "Approval and regular review of the ICT business continuity policy and ICT disaster recovery plans (Art. 5 para. 2e).",
              icon: "\uD83D\uDD04",
            },
            {
              title: "ICT Third-Party Strategy",
              desc: "Approval and regular review of the ICT third-party risk strategy, including exit strategies (Art. 5 para. 2h).",
              icon: "\uD83E\uDD1D",
            },
            {
              title: "Budget & Resources",
              desc: "Provision of adequate budgets and resources for digital operational resilience (Art. 5 para. 2g).",
              icon: "\uD83D\uDCB0",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-[#d8dff0] bg-white p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="font-[Syne] font-bold text-[#060c1a] text-sm">{item.title}</h3>
              </div>
              <p className="text-sm text-[#3a4a6b] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 mb-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 flex items-center gap-2">
            <span className="text-lg">{"\uD83C\uDF93"}</span> Training & Continuing Education Obligation
          </h3>
          <p className="text-sm text-[#3a4a6b] leading-relaxed">
            Members of the management body must <strong>actively and continuously maintain</strong> their
            <strong> knowledge and skills</strong> regarding ICT risks (<LawRef law="DORA" article="5" absatz="4">Art. 5 para. 4</LawRef>).
            The training content must be tailored to the complexity of the ICT-related functions
            of the financial entity.
          </p>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50/40 p-5">
          <p className="text-sm text-red-900 flex items-start gap-2">
            <span className="text-red-500 mt-0.5">{"\u26A0\uFE0F"}</span>
            <span>
              <strong>DORA Specifics:</strong> Unlike NIS2, DORA does not include an explicit
              activity ban for managing directors. However, the financial supervisory authorities
              (in Austria: FMA) can effectively achieve a de facto activity ban through existing
              supervisory law {"\u2014"} particularly through the fit and proper assessment.
            </span>
          </p>
          <div className="mt-3">
            <Link href={`/${locale}/dora#strafen`} className="text-sm font-medium text-emerald-600 hover:underline">
              More in the DORA Guide {"\u2192"}
            </Link>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 5. AI ACT ═══════════════ */}
      <Section id="ai-act" title="Liability under the AI Act">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The AI Act<SourceRef id={3} sources={sources} accent="#ef4444" /> addresses executive management less directly than NIS2 or DORA.
          Nevertheless, <strong>significant personal risks</strong> arise from the extremely high
          fines and the general corporate duty-of-care obligations:
        </p>

        <div className="space-y-4 mb-8">
          <div className="rounded-2xl border border-violet-200 bg-violet-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3">Indirect Executive Liability</h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed mb-3">
              The AI Act directs its obligations primarily at the organisation (provider, deployer).
              Personal liability arises <strong>indirectly</strong> through:
            </p>
            <ul className="space-y-2 text-sm text-[#3a4a6b]">
              <li className="flex items-start gap-2">
                <span className="text-violet-500 font-bold shrink-0">01</span>
                <strong>Internal liability (<LawRef law="GmbHG" paragraph="25" />):</strong> The company can hold the managing director
                liable through recourse for fines if a breach of the duty of care is established
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500 font-bold shrink-0">02</span>
                <strong>Administrative penalty liability:</strong> Member states may
                impose fines on natural persons as well {"\u2014"} the specific implementation is left to national legislators (<LawRef law="AI Act" article="99">Art. 99 AI Act</LawRef>)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500 font-bold shrink-0">03</span>
                <strong>Organisational negligence:</strong> A lack of AI governance structures
                can be deemed a breach of the duty of care
              </li>
            </ul>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border-2 border-red-200 bg-red-50/30 p-5 text-center">
              <div className="font-[Syne] font-extrabold text-2xl text-red-600 mb-1">{"\u20AC"}35m</div>
              <div className="font-mono text-xs text-red-400 mb-2">or 7% of turnover</div>
              <p className="text-xs text-[#3a4a6b]">Prohibited AI practices</p>
            </div>
            <div className="rounded-2xl border-2 border-orange-200 bg-orange-50/30 p-5 text-center">
              <div className="font-[Syne] font-extrabold text-2xl text-orange-600 mb-1">{"\u20AC"}15m</div>
              <div className="font-mono text-xs text-orange-400 mb-2">or 3% of turnover</div>
              <p className="text-xs text-[#3a4a6b]">Breach of AI obligations</p>
            </div>
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/30 p-5 text-center">
              <div className="font-[Syne] font-extrabold text-2xl text-amber-600 mb-1">{"\u20AC"}7.5m</div>
              <div className="font-mono text-xs text-amber-400 mb-2">or 1% of turnover</div>
              <p className="text-xs text-[#3a4a6b]">False information</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-5">
          <p className="text-sm text-[#3a4a6b]">
            <strong>Practical tip:</strong> Even though the AI Act does not directly address executive management,
            the adoption of AI systems should be treated as a <strong>management-level decision</strong>.
            Carefully document the risk assessment, system selection and
            governance structures {"\u2014"} this protects you in the event of liability claims.
          </p>
          <div className="mt-3">
            <Link href={`/${locale}/eu-ai-act#strafen`} className="text-sm font-medium text-violet-500 hover:underline">
              More in the AI Act Guide {"\u2192"}
            </Link>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 6. CRA ═══════════════ */}
      <Section id="cra" title="Liability under the CRA">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          The CRA is primarily directed at <strong>manufacturers</strong> as legal entities.
          For the executive management of manufacturing companies, risks arise primarily
          from the new <strong>product safety obligations</strong>:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 text-sm">Executive Liability Risks</h3>
            <ul className="space-y-2 text-sm text-[#3a4a6b]">
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] mt-0.5 shrink-0">{"\u25B8"}</span>
                Recourse for fines (up to {"\u20AC"}15m / 2.5%) for security-by-design violations
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] mt-0.5 shrink-0">{"\u25B8"}</span>
                Product liability claims under the new EU Product Liability Directive
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] mt-0.5 shrink-0">{"\u25B8"}</span>
                Market bans and product recalls with significant costs
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] mt-0.5 shrink-0">{"\u25B8"}</span>
                Reputational damage from public warnings
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 text-sm">Special Aspect: Product Liability</h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed">
              The new EU Product Liability Directive (2024/2853) explicitly extends
              to <strong>software and digital products</strong>. Injured parties may
              claim damages for harm caused by inadequate cybersecurity.
              Executive management can be held liable through recourse.
            </p>
            <div className="mt-3">
              <Link href={`/${locale}/cra#strafen`} className="text-sm font-medium text-[#8b5cf6] hover:underline">
                More in the CRA Guide {"\u2192"}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 7. VERGLEICH ═══════════════ */}
      <Section id="vergleich" title="Liability Comparison at a Glance">
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#f4f6fc]">
                <th className="text-left p-4 font-[Syne] font-bold text-[#060c1a] rounded-tl-xl">Criterion</th>
                <th className="text-left p-4 font-[Syne] font-bold text-sky-600">NIS2/NISG</th>
                <th className="text-left p-4 font-[Syne] font-bold text-emerald-600">DORA</th>
                <th className="text-left p-4 font-[Syne] font-bold text-violet-600">AI Act</th>
                <th className="text-left p-4 font-[Syne] font-bold text-[#8b5cf6] rounded-tr-xl">CRA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d8dff0]">
              <tr>
                <td className="p-4 font-medium text-[#060c1a]">Executives explicitly addressed?</td>
                <td className="p-4 text-sky-600 font-bold"><span>Yes (<LawRef law="NIS2" article="20" />)</span></td>
                <td className="p-4 text-emerald-600 font-bold"><span>Yes (<LawRef law="DORA" article="5" />)</span></td>
                <td className="p-4 text-[#3a4a6b]">Indirectly</td>
                <td className="p-4 text-[#3a4a6b]">Indirectly</td>
              </tr>
              <tr className="bg-[#fefce8]/20">
                <td className="p-4 font-medium text-[#060c1a]">Training obligation</td>
                <td className="p-4 text-sky-600 font-bold">Yes, mandatory</td>
                <td className="p-4 text-emerald-600 font-bold">Yes, ongoing</td>
                <td className="p-4 text-[#3a4a6b]"><span>AI literacy (<LawRef law="AI Act" article="4" />)</span></td>
                <td className="p-4 text-[#3a4a6b]">No</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[#060c1a]">Personal sanction</td>
                <td className="p-4 text-red-600 font-bold">Activity ban</td>
                <td className="p-4 text-[#3a4a6b]">Via supervisory law</td>
                <td className="p-4 text-[#3a4a6b]">Fine possible</td>
                <td className="p-4 text-[#3a4a6b]">Recourse</td>
              </tr>
              <tr className="bg-[#fefce8]/20">
                <td className="p-4 font-medium text-[#060c1a]">Max. corporate fine</td>
                <td className="p-4">{"\u20AC"}10m / 2%</td>
                <td className="p-4">1% daily turnover</td>
                <td className="p-4">{"\u20AC"}35m / 7%</td>
                <td className="p-4">{"\u20AC"}15m / 2.5%</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[#060c1a]">Liability waiver possible?</td>
                <td className="p-4 text-[#3a4a6b]">Limited*</td>
                <td className="p-4 text-[#3a4a6b]">Limited*</td>
                <td className="p-4 text-[#3a4a6b]">Limited</td>
                <td className="p-4 text-[#3a4a6b]">Limited</td>
              </tr>
              <tr className="bg-[#fefce8]/20">
                <td className="p-4 font-medium text-[#060c1a]">Supervisory authority (AT)</td>
                <td className="p-4">BMI / Cybersecurity Authority</td>
                <td className="p-4">FMA</td>
                <td className="p-4">RTR / AI Service Centre</td>
                <td className="p-4">Market surveillance (by sector)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* ═══════════════ 8. ENTHAFTUNG ═══════════════ */}
      <Section id="enthaftung" title="Liability Mitigation Strategies">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Personal liability cannot be entirely avoided, but can be significantly reduced through <strong>proactive
          measures</strong>. The most important strategies:
        </p>

        <AccordionSection
          items={[
            {
              title: "1. Establish a Compliance Management System (CMS)",
              content:
                "A documented CMS demonstrates that executive management takes its duty of care seriously. It encompasses: risk analysis, documented processes, regular audits, clear responsibilities and an escalation mechanism. The CMS should provide integrated coverage of all relevant regulations (NIS2, DORA, AI Act, CRA).",
            },
            {
              title: "2. Document all decisions",
              content:
                "Every compliance-relevant decision must be documented in writing: risk approvals, budget decisions, delegations, training participation. In a liability case, the burden of proof is decisive. Without documentation, there is a presumption that the duty was not fulfilled.",
            },
            {
              title: "3. Seek expert advice",
              content:
                "Executives do not need to know everything themselves, but they must seek expert advice when they lack the expertise. Consulting qualified cybersecurity experts, lawyers or compliance advisors, and documenting the advice received, strengthens the liability mitigation position.",
            },
            {
              title: "4. Delegate with control mechanisms",
              content:
                "Operational tasks may be delegated, but the oversight obligation remains with the managing director. Delegation must be in writing, to qualified persons, with clear reporting lines and regular controls. The training obligation under NIS2 and DORA is NOT delegable.",
            },
            {
              title: "5. Regular training & continuing education",
              content:
                "NIS2 and DORA explicitly require training. Beyond that, demonstrated continuing education also provides general protection against allegations of duty-of-care breaches. Recommendation: At least one annual cybersecurity training session, documented with date, content and proof of attendance.",
            },
            {
              title: "6. Insurance coverage (D&O)",
              content:
                "A D&O (Directors & Officers) insurance policy can cushion the financial consequences of personal liability. Caution: Not all policies cover EU regulatory fines. Key checks: Does the policy cover cyber compliance? Does it apply to all relevant regulations? Are there exclusions for intentional breaches of duty?",
            },
          ]}
        />
      </Section>

      {/* ═══════════════ 9. D&O ═══════════════ */}
      <Section id="dundo" title={"D&O Insurance & Regulation"}>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Directors & Officers (D&O) insurance policies are becoming significantly more important
          due to the new EU regulations. Key considerations:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl border border-green-200 bg-green-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-green-900 mb-2 flex items-center gap-2">
              <span>{"\u2705"}</span> Should be covered
            </h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Defence costs in regulatory proceedings</li>
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Internal claims (recourse by the company)</li>
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Cyber compliance extension</li>
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Crisis management costs</li>
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Worldwide coverage scope (EU regulations)</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-red-900 mb-2 flex items-center gap-2">
              <span>{"\u274C"}</span> Typical exclusions
            </h3>
            <ul className="space-y-2 text-sm text-red-800">
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Intentional breaches of duty</li>
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Direct fines (depending on jurisdiction)</li>
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Already known breaches of duty</li>
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Claims from prior insurance periods</li>
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Criminal proceedings (partially)</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
          <p className="text-sm text-amber-900 flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">{"\u26A0\uFE0F"}</span>
            <span>
              <strong>Recommendation:</strong> Have your existing D&O policy reviewed by a specialised
              insurance broker for coverage of the new EU regulations. Many older policies
              do not adequately cover cyber compliance issues. Pay particular attention to the coverage
              of defence costs in administrative proceedings.
            </span>
          </p>
        </div>
      </Section>

      {/* ═══════════════ 10. CHECKLISTE ═══════════════ */}
      <Section id="checkliste" title="Checklist for Executives">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          This checklist helps you systematically address the most important personal obligations:
        </p>

        <div className="space-y-4">
          {[
            {
              category: "Immediately",
              color: "#ef4444",
              items: [
                "Assess which EU regulations apply to your organisation",
                "Analyse your personal liability position (CEO, board, supervisory board)",
                "Review your D&O insurance for cyber compliance coverage",
                "Appoint a compliance officer",
              ],
            },
            {
              category: "Within 3 months",
              color: "#f59e0b",
              items: [
                "Complete cybersecurity training and document it",
                "Conduct a gap analysis for each relevant regulation",
                "Approve and document the budget for compliance measures",
                "Obtain legal advice on your personal liability situation",
              ],
            },
            {
              category: "Within 6 months",
              color: "#10b981",
              items: [
                "Establish or expand a compliance management system",
                "Approve risk management measures (documented!)",
                "Establish reporting lines and escalation mechanisms",
                "Set up regular compliance reporting to executive management",
              ],
            },
            {
              category: "Ongoing",
              color: "#3b82f6",
              items: [
                "Quarterly compliance status review by executives",
                "Complete annual cybersecurity training",
                "Document all compliance decisions in writing",
                "Review and update D&O insurance annually",
              ],
            },
          ].map((group) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#d8dff0] bg-white overflow-hidden"
            >
              <div className="h-1" style={{ background: group.color }} />
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3" style={{ background: group.color }}>
                  {group.category}
                </span>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#3a4a6b]">
                      <span className="w-5 h-5 rounded border-2 border-[#d8dff0] shrink-0 mt-0.5 flex items-center justify-center">
                        <span className="text-xs text-transparent">{"\u2713"}</span>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 11. FAQ ═══════════════ */}
      <Section id="faq" title="Frequently Asked Questions">
        <AccordionSection
          items={[
            {
              title: "Can I be held personally liable as a managing director for compliance violations?",
              content:
                "Yes. NIS2 (Art. 20) and DORA (Art. 5) directly address executive management. Beyond that, you can be held liable through recourse under general corporate law if a breach of the duty of care is established. This applies to all four regulations.",
            },
            {
              title: "Does a D&O insurance policy fully protect me?",
              content:
                "No, not fully. D&O policies typically cover defence costs and damages but usually do not cover direct fines in cases of intentional misconduct. Moreover, non-financial sanctions such as an activity ban (NIS2 Art. 32) cannot be insured. D&O insurance is an important building block but does not replace actual compliance.",
            },
            {
              title: "Is it sufficient to appoint a CISO and delegate responsibility?",
              content:
                "No. Operational implementation may be delegated, but the oversight obligation and ultimate responsibility remain with the managing director. Specifically, this means: the managing director must approve the measures, oversee their implementation and receive regular reports. The personal training obligation under NIS2 and DORA is non-delegable.",
            },
            {
              title: "What happens if my organisation is subject to multiple regulations?",
              content:
                "This is the standard scenario. A financial services provider with its own software products can simultaneously be subject to NIS2, DORA, the AI Act and the CRA. Executive obligations are cumulative. An integrated compliance management system covering all regulations is the most efficient approach.",
            },
            {
              title: "How do I document my fulfilment of the duty of care?",
              content:
                "Maintain a compliance log with: date and content of each compliance decision, training certificates, risk approvals with justification, minutes of compliance reviews and external advisory opinions. Digital documentation with timestamps is preferred.",
            },
            {
              title: "Does liability also apply to supervisory board members?",
              content:
                "Yes. Supervisory board members have an oversight obligation. If the supervisory board fails to monitor the board of directors' compliance with regulatory obligations, it can be held liable through recourse. Under NIS2, the term management bodies expressly includes supervisory bodies.",
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ VERWANDTE REGULIERUNGEN ═══════════════════ */}
      <RelatedGuides currentGuide="haftungs-check" accent="#0A2540" />

      {/* ═══════════════════ SOFTWARE-EMPFEHLUNGEN ═══════════════════ */}
      <ToolRecommendation regulationKey="nis2" accent="#ef4444" />

      {/* ═══════════════════ QUELLEN ═══════════════════ */}
      <Section id="quellen" title="Sources & Official Documents">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          All information in this guide is based on official EU and
          national legal sources. Here you will find the primary sources:
        </p>

        <SourceList sources={sources} accent="#ef4444" />

        <div className="mt-6 rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Disclaimer:</strong> This guide is for informational
            purposes only and does not constitute legal advice. The linked documents are the official
            legal texts. For questions regarding the specific application to your organisation, we recommend
            consulting specialised lawyers or compliance advisors.
          </p>
        </div>
      </Section>
    </GuidePageLayout>
  );
}
