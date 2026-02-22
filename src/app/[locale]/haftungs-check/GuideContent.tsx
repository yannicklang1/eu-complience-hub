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
    title: "Richtlinie (EU) 2022/2555 — NIS2",
    url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj/deu",
    desc: "Art. 20: Governance und Pflichten der Leitungsorgane",
    type: "EU-Richtlinie",
  },
  {
    id: 2,
    title: "Verordnung (EU) 2022/2554 — DORA",
    url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj/deu",
    desc: "Art. 5: Governance und Organisation des IKT-Risikomanagements",
    type: "Verordnung",
  },
  {
    id: 3,
    title: "Verordnung (EU) 2024/1689 — AI Act",
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/deu",
    desc: "Art. 99: Geldbußen und nationale Sanktionsregelungen",
    type: "Verordnung",
  },
  {
    id: 4,
    title: "Verordnung (EU) 2024/2847 — CRA",
    url: "https://eur-lex.europa.eu/eli/reg/2024/2847/oj/deu",
    desc: "Art. 64: Sanktionen und Marktaufsichtsmaßnahmen",
    type: "Verordnung",
  },
  {
    id: 5,
    title: "\u00A7 25 GmbHG \u2014 Sorgfaltspflicht GF",
    url: "https://www.jusline.at/gesetz/gmbhg/paragraf/25",
    desc: "Sorgfaltspflicht und Verantwortlichkeit der Geschäftsführer",
    type: "Gesetz AT",
  },
  {
    id: 6,
    title: "\u00A7 84 AktG \u2014 Sorgfaltspflicht Vorstand",
    url: "https://www.jusline.at/gesetz/aktg/paragraf/84",
    desc: "Sorgfaltspflicht und Verantwortlichkeit der Vorstandsmitglieder",
    type: "Gesetz AT",
  },
  {
    id: 7,
    title: "NISG 2026 — Parlamentarischer Prozess",
    url: "https://www.parlament.gv.at/gegenstand/XXVIII/I/308",
    desc: "Österreichische Umsetzung der NIS2-Richtlinie (BGBl. I Nr. 94/2025)",
    type: "Gesetz AT",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Warum dieses Thema?" },
  { id: "grundlagen", label: "Haftungsgrundlagen" },
  { id: "nis2", label: "Haftung unter NIS2/NISG" },
  { id: "dora", label: "Haftung unter DORA" },
  { id: "ai-act", label: "Haftung unter AI Act" },
  { id: "cra", label: "Haftung unter CRA" },
  { id: "vergleich", label: "Haftungsvergleich" },
  { id: "enthaftung", label: "Enthaftungsstrategien" },
  { id: "dundo", label: "D&O-Versicherung" },
  { id: "checkliste", label: "Checkliste" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Betroffene Rollen", value: "GF, Vorstand, Aufsichtsrat" },
  { label: "Max. pers. Haftung", value: "Unbegrenzt (Regress)" },
  { label: "NIS2 Schulungspflicht", value: "Ja (Art. 20 Abs. 2)" },
  { label: "DORA Verantwortung", value: "Leitungsorgan direkt" },
  { label: "AI Act Geldbuße", value: "35 Mio. / 7%" },
  { label: "Enthaftungsstrategie", value: "Dokumentation + Delegation" },
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

export default function GuideContent() {
  const { locale } = useTranslations();
  return (
    <GuidePageLayout
      title={"Gesch\u00E4ftsf\u00FChrer-Haftung"}
      subtitle={"Pers\u00F6nliche Haftungsrisiken bei NIS2, DORA, AI Act & CRA \u2014 und wie Sie sich sch\u00FCtzen"}
      regulationKey={"Regulierungs\u00FCbergreifend"}
      accent="#ef4444"
      tocItems={tocItems}
      quickFacts={quickFacts}
      trustBadge={{ lastReview: "18.02.2026", sourceCount: 7 }}
      href="/haftungs-check"
    >
      {/* ═══════════════ 1. UEBERBLICK ═══════════════ */}
      <Section id="ueberblick" title="Warum Geschäftsführer jetzt handeln müssen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die neue Welle der EU-Regulierungen {"\u2014"} NIS2, DORA, AI Act und CRA {"\u2014"} hat eines
          gemeinsam: <strong>Die Geschäftsleitung wird explizit in die Pflicht genommen.</strong> Erstmals
          gehen europäische Verordnungen und Richtlinien über reine Unternehmensgeldbussen hinaus
          und verankern eine <strong>persönliche Verantwortung der Leitungsorgane</strong>.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { value: "4", label: "Regulierungen", accent: "#ef4444" },
            { value: "Art. 20", label: "NIS2 GF-Pflicht", accent: "#0ea5e9" },
            { value: "Art. 5", label: "DORA Leitungsorgan", accent: "#10b981" },
            { value: "35 Mio. \u20AC", label: "Max. Geldbuße AI Act", accent: "#7c3aed" },
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
            <span className="text-lg">{"\u26A0\uFE0F"}</span> Das Kernproblem
          </h3>
          <p className="text-sm text-[#3a4a6b] leading-relaxed">
            <strong>Unwissenheit schützt nicht vor Haftung.</strong> Alle vier Regulierungen verlangen,
            dass die Geschäftsleitung die Risiken <em>kennt</em>, Maßnahmen <em>genehmigt</em> und deren
            Umsetzung <em>überwacht</em>. Wer diese Pflichten delegiert, ohne Kontrolle auszuüben,
            haftet trotzdem {"\u2014"} oft persönlich und mit dem Privatvermögen.
          </p>
        </div>
      </Section>

      {/* ═══════════════ 2. GRUNDLAGEN ═══════════════ */}
      <Section id="grundlagen" title="Haftungsgrundlagen im Überblick">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die persönliche Haftung von Geschäftsführern basiert auf mehreren Rechtsebenen.
          Die EU-Regulierungen schaffen <strong>neue, spezifische Pflichten</strong>, die neben
          die allgemeinen gesellschaftsrechtlichen Sorgfaltspflichten treten:
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl mb-3">{"{\u2696\uFE0F}"}</div>
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 text-sm">Gesellschaftsrecht</h3>
            <p className="text-xs text-[#3a4a6b] leading-relaxed">
              Allgemeine Sorgfaltspflicht nach <LawRef law="GmbHG" paragraph="25" /><SourceRef id={5} sources={sources} accent="#ef4444" /> bzw. <LawRef law="AktG" paragraph="84" /><SourceRef id={6} sources={sources} accent="#ef4444" />.
              Geschäftsführer müssen mit der Sorgfalt eines ordentlichen Geschäftsmanns handeln.
              Verletzung führt zu <strong>Innenhaftung</strong> (Regress durch Gesellschaft).
            </p>
          </div>
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-xl mb-3">{"\uD83D\uDCCB"}</div>
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 text-sm">EU-Regulatorik (neu)</h3>
            <p className="text-xs text-[#3a4a6b] leading-relaxed">
              NIS2, DORA und AI Act schaffen <strong>explizite Pflichten</strong> für die Geschäftsleitung:
              Risikofreigabe, Schulungspflicht, Überwachung. Die Nichteinhaltung kann direkte
              Sanktionen gegen natürliche Personen auslösen.
            </p>
          </div>
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl mb-3">{"\uD83D\uDCC4"}</div>
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 text-sm">Verwaltungsrecht</h3>
            <p className="text-xs text-[#3a4a6b] leading-relaxed">
              Bei Verwaltungsstrafen können zuständige Behörden auch <strong>Leitungspersonen
              persönlich</strong> belangen. Insbesondere NIS2 sieht die Möglichkeit vor,
              Geschäftsführern die Ausübung von Leitungsfunktionen zu untersagen.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
          <p className="text-sm text-amber-900 flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">{"\u26A0\uFE0F"}</span>
            <span>
              <strong>Business Judgment Rule:</strong> Die BJR schützt Geschäftsführer nur,
              wenn sie auf Basis angemessener Informationen, ohne Interessenkonflikte und in gutem
              Glauben zum Unternehmenswohl gehandelt haben. Compliance-Versäumnisse fallen
              typischerweise <em>nicht</em> unter diesen Schutz.
            </span>
          </p>
        </div>
      </Section>

      {/* ═══════════════ 3. NIS2/NISG ═══════════════ */}
      <Section id="nis2" title="Haftung unter NIS2 / NISG 2026">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die NIS2-Richtlinie<SourceRef id={1} sources={sources} accent="#ef4444" /> (und damit das österreichische NISG 2026) enthält die
          <strong> explizitesten Geschäftsführerpflichten</strong> aller EU-Cybersecurity-Regulierungen.
          <LawRef law="NIS2" article="20">Art. 20 NIS2</LawRef> spricht die Leitungsorgane direkt an:
        </p>

        <div className="space-y-4 mb-8">
          <div className="rounded-2xl border border-sky-200 bg-sky-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-sky-500 text-white text-xs font-bold">Art. 20 Abs. 1</span>
              Genehmigungspflicht
            </h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed">
              Die Leitungsorgane wesentlicher und wichtiger Einrichtungen müssen die
              Risikomanagement-Maßnahmen nach <LawRef law="NIS2" article="21">Art. 21</LawRef> <strong>genehmigen</strong> und deren
              Umsetzung <strong>überwachen</strong>. Sie können für Verstöße
              <strong> haftbar gemacht werden</strong>.
            </p>
          </div>

          <div className="rounded-2xl border border-sky-200 bg-sky-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-sky-500 text-white text-xs font-bold">Art. 20 Abs. 2</span>
              Schulungspflicht
            </h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed">
              Mitglieder der Leitungsorgane müssen an <strong>Cybersecurity-Schulungen teilnehmen</strong> und
              sollen entsprechende Schulungen auch für Mitarbeiter fördern. Die Schulungspflicht
              ist <em>nicht delegierbar</em> {"\u2014"} der Geschäftsführer muss selbst teilnehmen.
            </p>
          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-red-500 text-white text-xs font-bold">Art. 32 Abs. 5</span>
              Tätigkeitsverbot
            </h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed">
              Bei <strong>wesentlichen Einrichtungen</strong> können die zuständigen Behörden beantragen,
              dass einer natürlichen Person, die Leitungsaufgaben auf GF-/Vorstandsebene wahrnimmt,
              die Ausübung von Leitungsfunktionen <strong>vorläufig untersagt</strong> wird.
              Dies ist die schärfste persönliche Sanktion in der gesamten EU-Cybersecurity-Regulierung.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 text-sm">NISG 2026 {"\u2014"} Österreichische Besonderheiten</h3>
          <ul className="space-y-2 text-sm text-[#3a4a6b]">
            <li className="flex items-start gap-2">
              <span className="text-sky-500 mt-0.5 shrink-0">{"\u25B8"}</span>
              <span>Die Geschäftsleitung muss die Cybersicherheitsstrategie <strong>persönlich freigeben</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500 mt-0.5 shrink-0">{"\u25B8"}</span>
              <span>Schulungsnachweis muss dokumentiert und auf Anfrage der Behörde vorgelegt werden</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500 mt-0.5 shrink-0">{"\u25B8"}</span>
              <span>Bei der Registrierung beim BMI muss die Geschäftsleitung namentlich genannt werden</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500 mt-0.5 shrink-0">{"\u25B8"}</span>
              <span>Die persönliche Verantwortung der Geschäftsleitung ist in <LawRef law="NIS2" article="20" absatz="1">Art. 20 Abs. 1 NIS2</LawRef> explizit verankert und <strong>nicht delegierbar</strong></span>
            </li>
          </ul>
          <div className="mt-4">
            <Link href={`/${locale}/nisg-2026#geschaeftsfuehrer`} className="text-sm font-medium text-sky-500 hover:underline">
              Mehr im NISG 2026 Guide {"\u2192"}
            </Link>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 4. DORA ═══════════════ */}
      <Section id="dora" title="Haftung unter DORA">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          DORA<SourceRef id={2} sources={sources} accent="#ef4444" /> macht das <strong>Leitungsorgan zum zentralen Verantwortlichen</strong> für die
          digitale operationelle Resilienz. <LawRef law="DORA" article="5">Art. 5 DORA</LawRef> weist dem Leitungsorgan eine umfassende
          Letztverantwortung zu:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            {
              title: "IKT-Risikomanagement-Rahmen",
              desc: "Das Leitungsorgan definiert, genehmigt, überwacht und trägt die letzte Verantwortung für die Umsetzung des IKT-Risikomanagement-Rahmens (Art. 5 Abs. 2a).",
              icon: "\uD83D\uDEE1\uFE0F",
            },
            {
              title: "IKT-Geschäftsfortführung",
              desc: "Genehmigung und regelmäßige Überprüfung der IKT-Geschäftsfortführungsleitlinie und IKT-Notfallpläne (Art. 5 Abs. 2e).",
              icon: "\uD83D\uDD04",
            },
            {
              title: "IKT-Drittparteien-Strategie",
              desc: "Genehmigung und regelmäßige Überprüfung der IKT-Drittparteien-Risikostrategie, einschließlich Ausstiegsstrategien (Art. 5 Abs. 2h).",
              icon: "\uD83E\uDD1D",
            },
            {
              title: "Budget & Ressourcen",
              desc: "Bereitstellung angemessener Budgets und Ressourcen für die digitale operationelle Resilienz (Art. 5 Abs. 2g).",
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
            <span className="text-lg">{"\uD83C\uDF93"}</span> Schulungs- und Weiterbildungspflicht
          </h3>
          <p className="text-sm text-[#3a4a6b] leading-relaxed">
            Mitglieder des Leitungsorgans müssen ihre <strong>Kenntnisse und Fähigkeiten</strong> in
            Bezug auf IKT-Risiken <strong>aktiv und laufend aktuell halten</strong> (<LawRef law="DORA" article="5" absatz="4">Art. 5 Abs. 4</LawRef>).
            Die Schulungsinhalte müssen auf die Komplexität der IKT-bezogenen Funktionen
            des Finanzunternehmens abgestimmt sein.
          </p>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50/40 p-5">
          <p className="text-sm text-red-900 flex items-start gap-2">
            <span className="text-red-500 mt-0.5">{"\u26A0\uFE0F"}</span>
            <span>
              <strong>Besonderheit DORA:</strong> Im Gegensatz zu NIS2 gibt es bei DORA kein explizites
              Tätigkeitsverbot für Geschäftsführer. Allerdings können die Finanzaufsichtsbehörden
              (in {"\u00D6"}sterreich: FMA) über das bestehende Aufsichtsrecht {"\u2014"} insbesondere
              die Eignungsprüfung {"\u2014"} de facto ein Tätigkeitsverbot erreichen.
            </span>
          </p>
          <div className="mt-3">
            <Link href={`/${locale}/dora#strafen`} className="text-sm font-medium text-emerald-600 hover:underline">
              Mehr im DORA Guide {"\u2192"}
            </Link>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 5. AI ACT ═══════════════ */}
      <Section id="ai-act" title="Haftung unter dem AI Act">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Der AI Act<SourceRef id={3} sources={sources} accent="#ef4444" /> adressiert die Geschäftsleitung weniger direkt als NIS2 oder DORA.
          Dennoch entstehen <strong>erhebliche persönliche Risiken</strong> durch die extrem hohen
          Geldbußen und die allgemeinen gesellschaftsrechtlichen Sorgfaltspflichten:
        </p>

        <div className="space-y-4 mb-8">
          <div className="rounded-2xl border border-violet-200 bg-violet-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3">Indirekte Geschäftsführerhaftung</h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed mb-3">
              Der AI Act richtet seine Pflichten primär an das Unternehmen (Anbieter, Betreiber).
              Die persönliche Haftung entsteht <strong>mittelbar</strong> über:
            </p>
            <ul className="space-y-2 text-sm text-[#3a4a6b]">
              <li className="flex items-start gap-2">
                <span className="text-violet-500 font-bold shrink-0">01</span>
                <strong>Innenhaftung (<LawRef law="GmbHG" paragraph="25" />):</strong> Die Gesellschaft kann den GF im
                Regressweg für Geldbußen haftbar machen, wenn ein Sorgfaltspflichtversagen vorliegt
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500 font-bold shrink-0">02</span>
                <strong>Verwaltungsstrafrechtliche Verantwortung:</strong> Mitgliedstaaten können
                Geldbußen auch gegen natürliche Personen verhängen {"\u2014"} die konkrete Ausgestaltung liegt bei den nationalen Gesetzgebern (<LawRef law="AI Act" article="99">Art. 99 AI Act</LawRef>)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-500 font-bold shrink-0">03</span>
                <strong>Organisationsverschulden:</strong> Fehlende KI-Governance-Strukturen
                können als Sorgfaltspflichtversagen gewertet werden
              </li>
            </ul>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border-2 border-red-200 bg-red-50/30 p-5 text-center">
              <div className="font-[Syne] font-extrabold text-2xl text-red-600 mb-1">35 Mio. {"\u20AC"}</div>
              <div className="font-mono text-xs text-red-400 mb-2">oder 7% Umsatz</div>
              <p className="text-xs text-[#3a4a6b]">Verbotene KI-Praktiken</p>
            </div>
            <div className="rounded-2xl border-2 border-orange-200 bg-orange-50/30 p-5 text-center">
              <div className="font-[Syne] font-extrabold text-2xl text-orange-600 mb-1">15 Mio. {"\u20AC"}</div>
              <div className="font-mono text-xs text-orange-400 mb-2">oder 3% Umsatz</div>
              <p className="text-xs text-[#3a4a6b]">Verstoss gegen KI-Pflichten</p>
            </div>
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/30 p-5 text-center">
              <div className="font-[Syne] font-extrabold text-2xl text-amber-600 mb-1">7,5 Mio. {"\u20AC"}</div>
              <div className="font-mono text-xs text-amber-400 mb-2">oder 1% Umsatz</div>
              <p className="text-xs text-[#3a4a6b]">Falsche Angaben</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-5">
          <p className="text-sm text-[#3a4a6b]">
            <strong>Praxistipp:</strong> Auch wenn der AI Act die Geschäftsleitung nicht direkt adressiert,
            sollte die Einführung von KI-Systemen als <strong>Geschäftsleitungsentscheidung</strong> behandelt
            werden. Dokumentieren Sie die Risikobewertung, die Auswahl des Systems und die
            Governance-Strukturen sorgfältig {"\u2014"} das schützt im Haftungsfall.
          </p>
          <div className="mt-3">
            <Link href={`/${locale}/eu-ai-act#strafen`} className="text-sm font-medium text-violet-500 hover:underline">
              Mehr im AI Act Guide {"\u2192"}
            </Link>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 6. CRA ═══════════════ */}
      <Section id="cra" title="Haftung unter dem CRA">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Der CRA richtet sich primär an <strong>Hersteller</strong> als juristische Personen.
          Für die Geschäftsleitung von Herstellerunternehmen entstehen Risiken vor allem
          durch die neuen <strong>Produktsicherheitspflichten</strong>:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 text-sm">Haftungsrisiken GF</h3>
            <ul className="space-y-2 text-sm text-[#3a4a6b]">
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] mt-0.5 shrink-0">{"\u25B8"}</span>
                Regress für Geldbußen (bis 15 Mio. {"\u20AC"}/2,5%) bei Security-by-Design-Verstößen
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] mt-0.5 shrink-0">{"\u25B8"}</span>
                Produkthaftungsansprüche durch die neue EU-Produkthaftungsrichtlinie
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] mt-0.5 shrink-0">{"\u25B8"}</span>
                Marktverbote und Rückrufaktionen mit erheblichen Kosten
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] mt-0.5 shrink-0">{"\u25B8"}</span>
                Reputationsschäden durch öffentliche Warnungen
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 text-sm">Besonderheit: Produkthaftung</h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed">
              Die neue EU-Produkthaftungsrichtlinie (2024/2853) erstreckt sich ausdrücklich
              auf <strong>Software und digitale Produkte</strong>. Geschädigte können
              Schadensersatz für Schäden verlangen, die durch mangelnde Cybersicherheit
              verursacht wurden. Die Geschäftsleitung kann im Regressweg haftbar gemacht werden.
            </p>
            <div className="mt-3">
              <Link href={`/${locale}/cra#strafen`} className="text-sm font-medium text-[#8b5cf6] hover:underline">
                Mehr im CRA Guide {"\u2192"}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 7. VERGLEICH ═══════════════ */}
      <Section id="vergleich" title="Haftungsvergleich auf einen Blick">
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#f4f6fc]">
                <th className="text-left p-4 font-[Syne] font-bold text-[#060c1a] rounded-tl-xl">Kriterium</th>
                <th className="text-left p-4 font-[Syne] font-bold text-sky-600">NIS2/NISG</th>
                <th className="text-left p-4 font-[Syne] font-bold text-emerald-600">DORA</th>
                <th className="text-left p-4 font-[Syne] font-bold text-violet-600">AI Act</th>
                <th className="text-left p-4 font-[Syne] font-bold text-[#8b5cf6] rounded-tr-xl">CRA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d8dff0]">
              <tr>
                <td className="p-4 font-medium text-[#060c1a]">GF explizit adressiert?</td>
                <td className="p-4 text-sky-600 font-bold"><span>Ja (<LawRef law="NIS2" article="20" />)</span></td>
                <td className="p-4 text-emerald-600 font-bold"><span>Ja (<LawRef law="DORA" article="5" />)</span></td>
                <td className="p-4 text-[#3a4a6b]">Indirekt</td>
                <td className="p-4 text-[#3a4a6b]">Indirekt</td>
              </tr>
              <tr className="bg-[#fefce8]/20">
                <td className="p-4 font-medium text-[#060c1a]">Schulungspflicht</td>
                <td className="p-4 text-sky-600 font-bold">Ja, verpflichtend</td>
                <td className="p-4 text-emerald-600 font-bold">Ja, laufend</td>
                <td className="p-4 text-[#3a4a6b]"><span>KI-Kompetenz (<LawRef law="AI Act" article="4" />)</span></td>
                <td className="p-4 text-[#3a4a6b]">Nein</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[#060c1a]">Persönliche Sanktion</td>
                <td className="p-4 text-red-600 font-bold">Tätigkeitsverbot</td>
                <td className="p-4 text-[#3a4a6b]">Via Aufsichtsrecht</td>
                <td className="p-4 text-[#3a4a6b]">Geldbuße möglich</td>
                <td className="p-4 text-[#3a4a6b]">Regress</td>
              </tr>
              <tr className="bg-[#fefce8]/20">
                <td className="p-4 font-medium text-[#060c1a]">Max. Unternehmensbusse</td>
                <td className="p-4">10 Mio. {"\u20AC"} / 2%</td>
                <td className="p-4">1% tägl. Umsatz</td>
                <td className="p-4">35 Mio. {"\u20AC"} / 7%</td>
                <td className="p-4">15 Mio. {"\u20AC"} / 2,5%</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-[#060c1a]">Haftungsverzicht möglich?</td>
                <td className="p-4 text-[#3a4a6b]">Eingeschränkt*</td>
                <td className="p-4 text-[#3a4a6b]">Eingeschränkt*</td>
                <td className="p-4 text-[#3a4a6b]">Eingeschränkt</td>
                <td className="p-4 text-[#3a4a6b]">Eingeschränkt</td>
              </tr>
              <tr className="bg-[#fefce8]/20">
                <td className="p-4 font-medium text-[#060c1a]">Aufsicht (AT)</td>
                <td className="p-4">BMI / Cybersicherheitsbehörde</td>
                <td className="p-4">FMA</td>
                <td className="p-4">RTR / KI-Servicestelle</td>
                <td className="p-4">Marktaufsicht (je Sektor)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* ═══════════════ 8. ENTHAFTUNG ═══════════════ */}
      <Section id="enthaftung" title="Enthaftungsstrategien">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Persönliche Haftung lässt sich nicht vollständig vermeiden, aber durch <strong>proaktive
          Maßnahmen</strong> erheblich reduzieren. Die wichtigsten Strategien:
        </p>

        <AccordionSection
          items={[
            {
              title: "1. Compliance Management System (CMS) aufbauen",
              content:
                "Ein dokumentiertes CMS zeigt, dass die Geschäftsleitung ihre Sorgfaltspflicht ernst nimmt. Es umfasst: Risikoanalyse, dokumentierte Prozesse, regelmäßige Audits, klare Verantwortlichkeiten und einen Eskalationsmechanismus. Das CMS sollte alle relevanten Regulierungen (NIS2, DORA, AI Act, CRA) integriert abdecken.",
            },
            {
              title: "2. Dokumentation aller Entscheidungen",
              content:
                "Jede Compliance-relevante Entscheidung muss schriftlich dokumentiert werden: Risikofreigaben, Budgetentscheidungen, Delegationen, Schulungsteilnahmen. Im Haftungsfall ist die Beweislast entscheidend. Ohne Dokumentation gilt die Vermutung, dass die Pflicht nicht erfüllt wurde.",
            },
            {
              title: "3. Sachkundige Beratung einholen",
              content:
                "Geschäftsführer müssen nicht alles selbst wissen, aber sie müssen sachkundigen Rat einholen, wenn ihnen die Expertise fehlt. Die Beratung durch qualifizierte Cybersecurity-Experten, Rechtsanwälte oder Compliance-Berater und die Dokumentation des Rates stärkt die Enthaftungsposition.",
            },
            {
              title: "4. Delegation mit Kontrollmechanismen",
              content:
                "Operative Aufgaben dürfen delegiert werden, aber die Überwachungspflicht bleibt beim GF. Delegation muss schriftlich erfolgen, an qualifizierte Personen, mit klaren Berichtslinien und regelmäßigen Kontrollen. Die Schulungspflicht unter NIS2 und DORA ist NICHT delegierbar.",
            },
            {
              title: "5. Regelmäßige Schulungen & Weiterbildung",
              content:
                "NIS2 und DORA verlangen explizit Schulungen. Darüber hinaus schützt nachgewiesene Weiterbildung auch allgemein gegen Sorgfaltspflichtvorwürfe. Empfehlung: Mindestens jährlich eine Cybersecurity-Schulung, dokumentiert mit Datum, Inhalt und Teilnehmernachweis.",
            },
            {
              title: "6. Versicherungsschutz (D&O)",
              content:
                "Eine D&O-Versicherung (Directors & Officers) kann die finanziellen Folgen persönlicher Haftung abfedern. Achtung: Nicht alle Policen decken EU-regulatorische Geldbußen ab. Prüfpunkte: Deckt die Police Cyber-Compliance ab? Gilt sie für alle relevanten Regulierungen? Gibt es Ausschlüsse für vorsätzliche Pflichtverletzungen?",
            },
          ]}
        />
      </Section>

      {/* ═══════════════ 9. D&O ═══════════════ */}
      <Section id="dundo" title={"D&O-Versicherung & Regulatorik"}>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Directors & Officers (D&O) Versicherungen gewinnen durch die neuen EU-Regulierungen
          stark an Bedeutung. Worauf Sie achten müssen:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl border border-green-200 bg-green-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-green-900 mb-2 flex items-center gap-2">
              <span>{"\u2705"}</span> Sollte abgedeckt sein
            </h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Verteidigungskosten bei behördlichen Verfahren</li>
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Innenansprüche (Regress durch Gesellschaft)</li>
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Cyber-Compliance-Erweiterung</li>
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Kosten für Crisis Management</li>
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Weltweiter Deckungsumfang (EU-Regulierungen)</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-red-900 mb-2 flex items-center gap-2">
              <span>{"\u274C"}</span> Typische Ausschlüsse
            </h3>
            <ul className="space-y-2 text-sm text-red-800">
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Vorsätzliche Pflichtverletzungen</li>
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Direkte Geldbußen (je nach Jurisdiktion)</li>
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Bereits bekannte Pflichtverletzungen</li>
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Ansprüche aus früheren Versicherungsperioden</li>
              <li className="flex items-start gap-2"><span>{"\u2022"}</span> Strafrechtliche Verfahren (teilweise)</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
          <p className="text-sm text-amber-900 flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">{"\u26A0\uFE0F"}</span>
            <span>
              <strong>Empfehlung:</strong> Lassen Sie Ihre bestehende D&O-Police von einem spezialisierten
              Versicherungsmakler auf die Deckung der neuen EU-Regulierungen prüfen. Viele ältere Policen
              decken Cyber-Compliance-Themen nicht ausreichend ab. Achten Sie besonders auf die Deckung
              von Verteidigungskosten bei verwaltungsrechtlichen Verfahren.
            </span>
          </p>
        </div>
      </Section>

      {/* ═══════════════ 10. CHECKLISTE ═══════════════ */}
      <Section id="checkliste" title="Checkliste für Geschäftsführer">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Diese Checkliste hilft Ihnen, die wichtigsten persönlichen Pflichten strukturiert abzuarbeiten:
        </p>

        <div className="space-y-4">
          {[
            {
              category: "Sofort",
              color: "#ef4444",
              items: [
                "Prüfen, welche EU-Regulierungen Ihr Unternehmen betreffen",
                "Eigene Haftungssituation (GF, Vorstand, AR) analysieren",
                "D&O-Versicherung auf Cyber-Compliance-Deckung prüfen",
                "Compliance-Verantwortlichen benennen",
              ],
            },
            {
              category: "Innerhalb von 3 Monaten",
              color: "#f59e0b",
              items: [
                "Cybersecurity-Schulung absolvieren und dokumentieren",
                "Gap-Analyse für jede relevante Regulierung durchführen",
                "Budget für Compliance-Maßnahmen freigeben und dokumentieren",
                "Rechtsberatung zur persönlichen Haftungssituation einholen",
              ],
            },
            {
              category: "Innerhalb von 6 Monaten",
              color: "#10b981",
              items: [
                "Compliance Management System aufbauen oder erweitern",
                "Risikomanagement-Maßnahmen genehmigen (dokumentiert!)",
                "Berichtslinien und Eskalationsmechanismen etablieren",
                "Regelmäßige Compliance-Berichterstattung an GF einrichten",
              ],
            },
            {
              category: "Laufend",
              color: "#3b82f6",
              items: [
                "Quartalsweise Compliance-Status-Review durch GF",
                "Jährliche Cybersecurity-Schulung absolvieren",
                "Alle Compliance-Entscheidungen schriftlich dokumentieren",
                "D&O-Versicherung jährlich überprüfen und anpassen",
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
      <Section id="faq" title="Häufige Fragen">
        <AccordionSection
          items={[
            {
              title: "Kann ich als GF persönlich für Compliance-Verstöße haftbar gemacht werden?",
              content:
                "Ja. NIS2 (Art. 20) und DORA (Art. 5) adressieren die Geschäftsleitung direkt. Darüber hinaus können Sie über das allgemeine Gesellschaftsrecht im Regressweg haftbar gemacht werden, wenn ein Sorgfaltspflichtversagen vorliegt. Das gilt für alle vier Regulierungen.",
            },
            {
              title: "Schützt mich eine D&O-Versicherung vollständig?",
              content:
                "Nein, nicht vollständig. D&O-Versicherungen decken typischerweise Verteidigungskosten und Schadensersatz ab, aber meist keine direkten Geldbußen bei Vorsatz. Zudem können nicht-finanzielle Sanktionen wie ein Tätigkeitsverbot (NIS2 Art. 32) nicht versichert werden. Die D&O ist ein wichtiger Baustein, ersetzt aber nicht die eigentliche Compliance.",
            },
            {
              title: "Reicht es, wenn ich einen CISO ernenne und die Verantwortung delegiere?",
              content:
                "Nein. Die operative Umsetzung darf delegiert werden, aber die Überwachungspflicht und letzte Verantwortung verbleibt beim GF. Konkret bedeutet das: Der GF muss die Maßnahmen genehmigen, deren Umsetzung überwachen und sich regelmäßig berichten lassen. Die persönliche Schulungspflicht unter NIS2 und DORA ist nicht delegierbar.",
            },
            {
              title: "Was passiert, wenn mein Unternehmen mehreren Regulierungen unterliegt?",
              content:
                "Das ist der Normalfall. Ein Finanzdienstleister mit eigenen Software-Produkten kann gleichzeitig NIS2, DORA, AI Act und CRA unterliegen. Die Geschäftsführerpflichten summieren sich. Ein integriertes Compliance Management System, das alle Regulierungen abdeckt, ist der effizienteste Ansatz.",
            },
            {
              title: "Wie dokumentiere ich meine Sorgfaltspflichterfüllung?",
              content:
                "Führen Sie ein Compliance-Protokoll mit: Datum und Inhalt jeder Compliance-Entscheidung, Schulungsnachweise, Risikofreigaben mit Begründung, Protokolle von Compliance-Reviews und externe Beratungsgutachten. Digitale Dokumentation mit Zeitstempeln ist vorzuziehen.",
            },
            {
              title: "Gilt die Haftung auch für Aufsichtsratsmitglieder?",
              content:
                "Ja. Aufsichtsratsmitglieder haben eine Überwachungspflicht. Wenn der Aufsichtsrat es versäumt, die Einhaltung der Compliance-Pflichten durch den Vorstand zu überwachen, kann er im Regressweg haftbar gemacht werden. Unter NIS2 umfasst der Begriff Leitungsorgane ausdrücklich auch Aufsichtsgremien.",
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ VERWANDTE REGULIERUNGEN ═══════════════════ */}
      <RelatedGuides currentGuide="haftungs-check" accent="#0A2540" />

      {/* ═══════════════════ SOFTWARE-EMPFEHLUNGEN ═══════════════════ */}
      <ToolRecommendation regulationKey="nis2" accent="#ef4444" />

      {/* ═══════════════════ QUELLEN ═══════════════════ */}
      <Section id="quellen" title="Quellen & Offizielle Dokumente">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Alle Informationen in diesem Guide basieren auf den offiziellen EU- und
          nationalen Rechtsquellen. Hier finden Sie die Primärquellen:
        </p>

        <SourceList sources={sources} accent="#ef4444" />

        <div className="mt-6 rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Hinweis:</strong> Dieser Guide dient der Information
            und ersetzt keine Rechtsberatung. Die verlinkten Dokumente sind die offiziellen
            Rechtstexte. Bei Fragen zur konkreten Anwendung auf Ihr Unternehmen empfehlen wir
            die Beratung durch spezialisierte Rechtsanwälte oder Compliance-Berater.
          </p>
        </div>
      </Section>
    </GuidePageLayout>
  );
}
