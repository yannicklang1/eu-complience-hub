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
    title: "Richtlinie (EU) 2019/1937 — Whistleblower-Richtlinie (Volltext)",
    url: "https://eur-lex.europa.eu/eli/dir/2019/1937/oj/deu",
    desc: "Offizielle deutsche Fassung der EU-Whistleblower-Richtlinie im EUR-Lex Portal",
    type: "Richtlinie",
  },
  {
    id: 2,
    title: "HSchG — HinweisgeberInnenschutzgesetz (RIS)",
    url: "https://www.ris.bka.gv.at/eli/bgbl/I/2023/6",
    desc: "Österreichisches HinweisgeberInnenschutzgesetz im Rechtsinformationssystem des Bundes (BGBl. I 6/2023)",
    type: "Nat. Gesetz",
  },
  {
    id: 3,
    title: "BMJ — HSchG Erläuterungen",
    url: "https://www.bmj.gv.at",
    desc: "Bundesministerium für Justiz — Erläuterungen und Materialien zum HSchG",
    type: "Guidance",
  },
  {
    id: 4,
    title: "EU Commission — Whistleblower Protection Report",
    url: "https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives/13713-Whistleblower-protection-report-on-the-implementation-of-the-EU-Directive_en",
    desc: "Europäische Kommission — Bericht zur Umsetzung der Whistleblower-Richtlinie in den Mitgliedstaaten",
    type: "Bericht",
  },
  {
    id: 5,
    title: "BAK — Bundesamt für Korruptionsbekämpfung",
    url: "https://www.bak.gv.at",
    desc: "Externe Meldestelle für Hinweise nach dem HSchG in Österreich",
    type: "Aufsicht AT",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Überblick" },
  { id: "eu-vs-hschg", label: "EU-RL vs. HSchG" },
  { id: "timeline", label: "Timeline" },
  { id: "betroffene", label: "Wer ist betroffen?" },
  { id: "meldekanal", label: "Interner Meldekanal" },
  { id: "schutz", label: "Schutz für Hinweisgeber" },
  { id: "meldeverfahren", label: "Meldeverfahren" },
  { id: "externe-stellen", label: "Externe Meldestellen" },
  { id: "strafen", label: "Strafen" },
  { id: "oesterreich", label: "Österreich" },
  { id: "fahrplan", label: "Fahrplan" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Strafe", value: "20.000 \u20AC (40.000 \u20AC Wdh.)" },
  { label: "In Kraft seit", value: "25. Feb. 2023" },
  { label: "Betrifft", value: "Unternehmen ab 50 MA" },
  { label: "Betroffene (AT)", value: "~6.000\u20138.000" },
  { label: "Meldekanal", value: "Intern verpflichtend" },
  { label: "Rechtsgrundlage", value: "RL (EU) 2019/1937" },
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
  accent = "#d97706",
}: {
  value: string;
  label: string;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#d8dff0] bg-white p-5 text-center">
      <div className="font-[Syne] font-extrabold text-2xl sm:text-3xl mb-1" style={{ color: accent }}>
        {value}
      </div>
      <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider">{label}</div>
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
          done ? "bg-amber-600 border-amber-600" : active ? "bg-amber-600 border-amber-600 animate-pulse" : "bg-white border-[#d8dff0]"
        }`} />
        <div className="w-px flex-1 bg-[#e8ecf4] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] font-semibold text-[#7a8db0]">{date}</span>
          {done && <span className="text-[9px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-mono font-bold border border-amber-200">Erledigt</span>}
          {active && <span className="text-[9px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-mono font-bold border border-amber-200">Aktiv</span>}
        </div>
        <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">{title}</div>
        <p className="text-[14px] text-[#5a6a8a] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ─────────────────── Roadmap step ─────────────────── */
function RoadmapStep({
  phase, title, items, accent = "#d97706",
}: { phase: string; title: string; items: string[]; accent?: string }) {
  return (
    <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full" style={{ background: accent }} />
      <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: accent }}>{phase}</div>
      <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
export default function GuideContent() {
  return (
    <GuidePageLayout
      title="HSchG"
      subtitle="HinweisgeberInnenschutzgesetz komplett erklärt: EU-Whistleblower-Richtlinie, interne Meldekanäle, Schutzrechte für Hinweisgeber und Compliance-Fahrplan für österreichische Unternehmen ab 50 Mitarbeitern."
      regulationKey="Richtlinie (EU) 2019/1937"
      accent="#d97706"
      badgeLabel="In Kraft seit Feb 2023"
      badgeColor="#b45309"
      quickFacts={quickFacts}
      tocItems={tocItems}
      trustBadge={{ lastReview: "19.02.2026", sourceCount: 5 }}
      heroIcon={
        <svg className="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
        </svg>
      }
      href="/hschg"
    >
      {/* ═══════════════════ 1. ÜBERBLICK ═══════════════════ */}
      <Section id="ueberblick" title="Überblick: Was ist das HSchG?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Das <strong>HinweisgeberInnenschutzgesetz (HSchG)</strong><SourceRef id={2} sources={sources} accent="#d97706" /> ist
          Österreichs nationale Umsetzung der <strong>EU-Whistleblower-Richtlinie</strong>{" "}
          (Richtlinie (EU) 2019/1937).<SourceRef id={1} sources={sources} accent="#d97706" /> Es schützt Personen, die
          Verstöße gegen bestimmte Rechtsvorschriften in ihrem beruflichen Umfeld melden, vor
          Vergeltungsmaßnahmen wie Kündigung, Versetzung oder Mobbing.
        </p>
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Unternehmen ab <strong>50 Mitarbeitern</strong> sind verpflichtet, einen
          internen Meldekanal einzurichten, über den Beschäftigte Missstände vertraulich
          melden können. Ziel ist es, Korruption, Betrug und andere Rechtsverletzungen
          frühzeitig aufzudecken und gleichzeitig die meldenden Personen wirksam zu schützen.
          In Österreich sind schätzungsweise <strong>6.000 bis 8.000 Unternehmen</strong> betroffen.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard value="Feb 2023" label="In Kraft" accent="#b45309" />
          <StatCard value="50+ MA" label="Schwelle" accent="#d97706" />
          <StatCard value="~6.000" label="AT-Unternehmen" />
          <StatCard value="3 Mon." label="Rückmeldung" accent="#d97706" />
        </div>

        <div className="rounded-2xl bg-amber-50/60 border border-amber-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-amber-700 mb-1">
                Warum Hinweisgeberschutz wichtig ist
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                Studien der EU-Kommission zeigen, dass rund 43 % aller Betrugs- und Korruptionsfälle
                durch interne Hinweisgeber aufgedeckt werden.<SourceRef id={4} sources={sources} accent="#d97706" /> Ohne wirksamen
                Schutz unterbleiben viele Meldungen aus Angst vor beruflichen Konsequenzen. Das HSchG
                soll diese Meldebereitschaft stärken und gleichzeitig sicherstellen, dass
                Unternehmen frühzeitig von internen Missständen erfahren.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 2. EU-RL VS. HSCHG ═══════════════════ */}
      <Section id="eu-vs-hschg" title="EU-Richtlinie vs. HSchG">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Die <strong>Richtlinie (EU) 2019/1937</strong><SourceRef id={1} sources={sources} accent="#d97706" /> gibt den
          europäischen Rahmen vor. Das <strong>HSchG</strong> (BGBl. I 6/2023) ist Österreichs
          nationale Umsetzung — mit bemerkenswerten Abweichungen. Insbesondere war
          Österreich verspätet: Die EU-Frist lief im Dezember 2021 ab,
          das HSchG trat erst im Februar 2023 in Kraft.
        </p>

        <AccordionSection
          accent="#d97706"
          items={[
            {
              title: "Sachlicher Anwendungsbereich: AT enger als EU",
              content: (
                <div>
                  <p className="mb-3">
                    Die EU-Richtlinie schützt Meldungen zu Verstößen gegen das gesamte Unionsrecht
                    in den in Art. 2 genannten Bereichen. Das HSchG ist in einigen Punkten enger gefasst:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>EU-RL:</strong> Ermutigt Mitgliedstaaten ausdrücklich, den Schutz über den EU-Katalog hinaus auf nationales Recht auszudehnen</li>
                    <li><strong>HSchG:</strong> Erfasst primär Verstöße gegen EU-Recht in den genannten Bereichen, ergänzt aber bestimmte österreichische Straftatbestände (insb. Korruptionsdelikte nach StGB)</li>
                    <li>Rein innerstaatliche Rechtsverstöße ohne EU-Bezug sind grundsätzlich nicht vom HSchG erfasst — eine kritisierte Einschränkung</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Anonyme Meldungen: Keine Pflicht im HSchG",
              content: (
                <p>
                  Die EU-Richtlinie überlässt es den Mitgliedstaaten, ob anonyme Meldungen
                  verpflichtend zugelassen werden müssen. Das HSchG verpflichtet Unternehmen <strong>nicht</strong>,
                  anonyme Hinweise entgegenzunehmen. In der Praxis wird jedoch dringend empfohlen,
                  anonyme Kanäle vorzusehen, da dies die Meldebereitschaft nachweislich erhöht. Geht eine anonyme
                  Meldung ein, ist sie dennoch zu bearbeiten, sofern der Hinweis substantiiert ist.
                </p>
              ),
            },
            {
              title: "Konzernweite Meldesysteme: AT-Besonderheit",
              content: (
                <p>
                  Das HSchG erlaubt es Konzernen ausdrücklich, ein <strong>zentrales Meldesystem</strong> für
                  die gesamte Unternehmensgruppe zu betreiben — auch für Tochtergesellschaften mit 50 bis 249
                  Beschäftigten. Die EU-Kommission steht dieser Praxis kritisch gegenüber und bevorzugt
                  grundsätzlich eigene Kanäle pro Unternehmen. Österreich hat sich bewusst für diese
                  praxistaugliche Lösung entschieden.
                </p>
              ),
            },
            {
              title: "Umsetzungsverspätung und Vertragsverletzung",
              content: (
                <p>
                  Die Umsetzungsfrist der EU-Richtlinie endete am <strong>17. Dezember 2021</strong>.
                  Österreich hat diese Frist deutlich überschritten — das HSchG wurde erst am
                  24. Februar 2023 im Bundesgesetzblatt kundgemacht und trat am
                  <strong> 25. Februar 2023</strong> in Kraft. Die EU-Kommission hatte bereits ein
                  Vertragsverletzungsverfahren gegen Österreich eingeleitet.<SourceRef id={4} sources={sources} accent="#d97706" /> Österreich
                  gehörte zu den letzten Mitgliedstaaten, die die Richtlinie umsetzten.
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 3. TIMELINE ═══════════════════ */}
      <Section id="timeline" title="Timeline & Status">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Von der EU-Richtlinie bis zur vollständigen Geltung in Österreich — inklusive der
          verspäteten nationalen Umsetzung:
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8">
          <TimelineItem
            date="16. Dezember 2019"
            title="EU-Whistleblower-Richtlinie in Kraft"
            description={<>Die Richtlinie (EU) 2019/1937 tritt in Kraft. Die Mitgliedstaaten haben zwei Jahre Zeit für die Umsetzung in nationales Recht.<SourceRef id={1} sources={sources} accent="#d97706" /></>}
            done
          />
          <TimelineItem
            date="17. Dezember 2021"
            title="Umsetzungsfrist abgelaufen — AT verfehlt!"
            description="Die zweijährige Umsetzungsfrist läuft ab. Österreich hat noch kein Gesetz verabschiedet. Die EU-Kommission leitet ein Vertragsverletzungsverfahren ein."
            done
          />
          <TimelineItem
            date="25. Februar 2023"
            title="HSchG in Kraft — 250+ MA"
            description={<>Das HinweisgeberInnenschutzgesetz (BGBl. I 6/2023) tritt in Kraft. Unternehmen ab 250 Mitarbeitern müssen sofort einen internen Meldekanal einrichten.<SourceRef id={2} sources={sources} accent="#d97706" /></>}
            done
          />
          <TimelineItem
            date="18. Dezember 2023"
            title="HSchG gilt für alle 50+ MA"
            description="Ab diesem Datum müssen auch Unternehmen mit 50 bis 249 Mitarbeitern einen internen Meldekanal eingerichtet haben. Die Übergangsfrist für kleinere Unternehmen ist abgelaufen."
            active
          />
        </div>

        <div className="rounded-2xl bg-red-50/60 border border-red-200/50 p-5 mt-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-red-700 mb-1">
                Österreich war über ein Jahr verspätet
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                Die EU-Umsetzungsfrist endete im Dezember 2021. Österreich gehörte zu den
                Mitgliedstaaten, gegen die die EU-Kommission ein Vertragsverletzungsverfahren
                einleitete. Das HSchG trat erst über 14 Monate nach der Frist in Kraft —
                deutlich später als etwa Deutschland (Juni 2023), aber eines der ersten nach der
                Fristversäumung verabschiedeten Gesetze.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 4. WER IST BETROFFEN? ═══════════════════ */}
      <Section id="betroffene" title="Wer ist betroffen?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Das HSchG betrifft Unternehmen und Organisationen in Abhängigkeit von ihrer Größe und
          Branche. Die meldepflichtigen Bereiche ergeben sich überwiegend aus dem EU-Recht, ergänzt
          um bestimmte österreichische Straftatbestände.
        </p>

        <AccordionSection
          accent="#d97706"
          items={[
            {
              title: "Privatsektor: Unternehmen ab 50 Mitarbeitern",
              content: (
                <div>
                  <p className="mb-3">
                    Alle privaten Unternehmen mit mindestens 50 Beschäftigten müssen einen
                    internen Meldekanal einrichten. Die Mitarbeiteranzahl wird als
                    Jahresdurchschnitt berechnet.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>250+ MA:</strong> Pflicht seit 25. Februar 2023</li>
                    <li><strong>50-249 MA:</strong> Pflicht seit 18. Dezember 2023</li>
                    <li>Unternehmen mit 50-249 MA dürfen einen gemeinsamen (konzernweiten) Meldekanal nutzen</li>
                    <li>Unter 50 MA: grundsätzlich nicht verpflichtet (Ausnahme: Finanzsektor)</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Finanzsektor: Immer betroffen — unabhängig von der Größe",
              content: (
                <div>
                  <p className="mb-3">
                    Unternehmen im Finanzsektor unterliegen dem HSchG <strong>unabhängig von
                    der Mitarbeiteranzahl</strong>. Dazu gehören insbesondere:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Kreditinstitute und Wertpapierfirmen</li>
                    <li>Versicherungs- und Rückversicherungsunternehmen</li>
                    <li>Zahlungsinstitute und E-Geld-Institute</li>
                    <li>Kapitalanlagegesellschaften und AIFM</li>
                    <li>Weitere gemäß dem Katalog in Anhang der RL (EU) 2019/1937</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Öffentlicher Sektor",
              content: (
                <div>
                  <p className="mb-3">
                    Auch der öffentliche Bereich unterliegt dem HSchG:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Gebietskörperschaften (Bund, Länder, Gemeinden ab 10.000 Einwohner)</li>
                    <li>Juristische Personen des öffentlichen Rechts</li>
                    <li>Von der öffentlichen Hand kontrollierte Einrichtungen</li>
                    <li>Gemeinden unter 10.000 Einwohnern sind von der Pflicht ausgenommen</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Sachlicher Anwendungsbereich: Welche Verstöße sind geschützt?",
              content: (
                <div>
                  <p className="mb-3">
                    Das HSchG schützt Meldungen über Verstöße in diesen Bereichen:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Öffentliches Auftragswesen (Vergaberecht)</li>
                    <li>Finanzdienstleistungen und Geldwäscheprävention</li>
                    <li>Produktsicherheit und Produktkonformität</li>
                    <li>Verkehrssicherheit (Straße, Schiene, Luft, Schifffahrt)</li>
                    <li>Umweltschutz (Emissionen, Chemikalien, Abfall)</li>
                    <li>Lebensmittel- und Futtermittelsicherheit, Tiergesundheit</li>
                    <li>Strahlenschutz und kerntechnische Sicherheit</li>
                    <li>Öffentliche Gesundheit (Arzneimittel, Medizinprodukte)</li>
                    <li>Verbraucherschutz</li>
                    <li>Datenschutz und Privatsphäre (<LawRef law="DSGVO">DSGVO</LawRef>)</li>
                    <li>Netz- und Informationssicherheit</li>
                    <li>Bestimmte nationale Straftatbestände (insb. Korruptionsdelikte nach StGB)</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 5. INTERNER MELDEKANAL ═══════════════════ */}
      <Section id="meldekanal" title="Interne Meldekanäle: Anforderungen">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Die Einrichtung eines internen Meldekanals ist die zentrale Pflicht des HSchG.
          Die Anforderungen sind im Gesetz detailliert geregelt:<SourceRef id={2} sources={sources} accent="#d97706" />
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.23, 1, 0.32, 1] as const, duration: 0.5 }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">Schriftlich & mündlich</h3>
            <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
              Der Meldekanal muss sowohl <strong>schriftliche</strong> als auch <strong>mündliche</strong>{" "}
              Meldungen ermöglichen. Auf Wunsch des Hinweisgebers muss auch ein persönliches
              Gespräch innerhalb angemessener Frist angeboten werden.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.23, 1, 0.32, 1] as const, duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">Vertraulichkeit</h3>
            <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
              Die Identität des Hinweisgebers muss <strong>streng vertraulich</strong> behandelt
              werden. Nur die für die Bearbeitung zuständige Stelle darf die Identität kennen.
              Ein Verstoß gegen die Vertraulichkeitspflicht ist strafbar (bis 20.000 Euro).
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.23, 1, 0.32, 1] as const, duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">Zuständige Stelle</h3>
            <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
              Das Unternehmen muss eine <strong>zuständige Stelle</strong> (interne Meldestelle)
              benennen, die Meldungen entgegennimmt, prüft und Folgemaßnahmen einleitet.
              Dies kann eine Person, eine Abteilung oder ein externer Dienstleister sein.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.23, 1, 0.32, 1] as const, duration: 0.5, delay: 0.3 }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
              </svg>
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">Konzern & Outsourcing</h3>
            <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
              Unternehmen mit 50-249 MA dürfen einen <strong>gemeinsamen konzernweiten
              Meldekanal</strong> nutzen. Die Aufgaben der internen Meldestelle können an
              einen <strong>externen Dritten</strong> (z.B. Rechtsanwaltskanzlei, Compliance-Dienstleister)
              ausgelagert werden.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════ 6. SCHUTZ FÜR HINWEISGEBER ═══════════════════ */}
      <Section id="schutz" title="Schutz für Hinweisgeber">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Der Kern des HSchG: Umfassende Schutzrechte für Personen, die Verstöße melden.
          Der Schutz erstreckt sich nicht nur auf die Hinweisgeber selbst, sondern auch
          auf deren Unterstützer und Vertrauenspersonen.
        </p>

        <div className="space-y-4 mb-6">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Vergeltungsverbot (Reprisalienverbot)
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
              Jede Form der Vergeltung gegen Hinweisgeber ist untersagt. Das umfasst unter anderem:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Kündigung und Entlassung",
                "Suspendierung und Degradierung",
                "Versetzung und Aufgabenänderung",
                "Gehaltskürzung und Entzug von Leistungen",
                "Einschüchterung und Mobbing",
                "Rufschädigung und Diskriminierung",
                "Nichtumwandlung befristeter Verträge",
                "Entzug von Lizenzen oder Genehmigungen",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Beweislastumkehr
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Erleidet ein Hinweisgeber nach einer Meldung einen Nachteil, wird vermutet,
              dass dieser Nachteil eine Vergeltungsmaßnahme darstellt. Der <strong>Arbeitgeber</strong> muss
              beweisen, dass die Maßnahme <strong>nicht</strong> im Zusammenhang mit der Meldung steht.
              Diese Beweislastumkehr ist einer der stärksten Schutzmechanismen des Gesetzes und
              ermöglicht es Hinweisgebern, einstweilige Verfügungen und Schadenersatz geltend zu machen.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Geschützter Personenkreis
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
              Der Schutz des HSchG erstreckt sich auf:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px] text-[#5a6a8a]">
              <li>Arbeitnehmer (auch ehemalige und Stellenbewerber)</li>
              <li>Selbstständige und freie Dienstnehmer</li>
              <li>Aktionäre und Organmitglieder (Vorstände, Aufsichtsräte)</li>
              <li>Praktikanten und Freiwillige</li>
              <li><strong>Unterstützer</strong> (Facilitators) — Personen, die den Hinweisgeber bei der Meldung unterstützen</li>
              <li><strong>Verbundene Personen</strong> — Kollegen und Verwandte, die aufgrund der Meldung benachteiligt werden könnten</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl bg-amber-50/60 border border-amber-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-amber-700 mb-1">
                Voraussetzung: Hinreichender Grund zur Annahme
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                Der Schutz greift nur, wenn der Hinweisgeber zum Zeitpunkt der Meldung
                <strong> hinreichenden Grund zur Annahme</strong> hatte, dass die gemeldeten
                Informationen der Wahrheit entsprechen. Wer <strong>bewusst falsche Angaben</strong> macht,
                genießt keinen Schutz und riskiert selbst Verwaltungsstrafen bis 20.000 Euro
                sowie zivilrechtliche Schadenersatzansprüche.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 7. MELDEVERFAHREN ═══════════════════ */}
      <Section id="meldeverfahren" title="Meldeverfahren im Detail">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Das HSchG definiert ein klar strukturiertes Meldeverfahren mit verbindlichen
          Fristen. Zusätzlich etabliert es ein <strong>dreistufiges System</strong>:
          intern, extern und als letztes Mittel die öffentliche Offenlegung.
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8 space-y-4 mb-6">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 text-lg font-bold text-amber-700">1</div>
            <div className="pb-4 border-b border-[#e8ecf4]">
              <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-amber-600 mb-1">Meldung geht ein</div>
              <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">Eingangsbestätigung innerhalb von 7 Tagen</div>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                Die interne Meldestelle muss dem Hinweisgeber innerhalb von <strong>7 Kalendertagen</strong>{" "}
                den Eingang der Meldung bestätigen. Bei anonymen Meldungen über eine Plattform
                erfolgt die Bestätigung über das System.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 text-lg font-bold text-amber-700">2</div>
            <div className="pb-4 border-b border-[#e8ecf4]">
              <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-amber-600 mb-1">Prüfung & Folgemaßnahmen</div>
              <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">Sorgfältige Untersuchung</div>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                Die Meldestelle prüft die Stichhaltigkeit der Meldung und leitet geeignete
                Folgemaßnahmen ein — z.B. interne Untersuchung, Einleitung von Disziplinarverfahren
                oder Weiterleitung an zuständige Behörden.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 text-lg font-bold text-amber-700">3</div>
            <div>
              <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-amber-600 mb-1">Innerhalb von 3 Monaten</div>
              <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">Rückmeldung an Hinweisgeber</div>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                Spätestens <strong>3 Monate</strong> nach der Eingangsbestätigung muss dem
                Hinweisgeber eine Rückmeldung über die ergriffenen oder geplanten Folgemaßnahmen
                gegeben werden. Dies umfasst den Stand der Untersuchung und die vorläufigen Ergebnisse.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
          <h3 className="font-[Syne] font-bold text-sm text-[#060c1a] mb-4">
            Dreistufiges Meldesystem
          </h3>
          <div className="space-y-3">
            {[
              { stufe: "Stufe 1", name: "Interne Meldung", desc: "Bevorzugter Weg: Meldung über den internen Meldekanal des Unternehmens. Das HSchG sieht den internen Kanal als primäre Meldeoption vor." },
              { stufe: "Stufe 2", name: "Externe Meldung", desc: "Meldung an eine externe Meldestelle (z.B. BAK). Zulässig wenn der interne Kanal fehlt, nicht funktioniert, Vergeltung droht oder Beweise vernichtet werden könnten." },
              { stufe: "Stufe 3", name: "Offenlegung (Öffentlichkeit)", desc: "Meldung an Medien oder Öffentlichkeit. Nur als letztes Mittel, wenn externe Meldestelle nicht reagiert hat oder eine unmittelbare Gefahr für das öffentliche Interesse besteht." },
            ].map((item) => (
              <div key={item.stufe} className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-3 border-b border-[#e8ecf4] last:border-b-0">
                <span className="text-[12px] text-amber-700 font-mono font-bold sm:w-20 flex-shrink-0">{item.stufe}</span>
                <div>
                  <span className="font-[Syne] font-bold text-[13px] text-[#060c1a]">{item.name}</span>
                  <p className="text-[13px] text-[#5a6a8a] leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 8. EXTERNE MELDESTELLEN ═══════════════════ */}
      <Section id="externe-stellen" title="Externe Meldestellen in Österreich">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Neben dem internen Meldekanal können Hinweisgeber auch direkt an externe
          Meldestellen berichten. In Österreich ist das <strong>Bundesamt für
          Korruptionsbekämpfung (BAK)</strong> die zentrale externe Anlaufstelle.<SourceRef id={5} sources={sources} accent="#d97706" />
        </p>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border-2 border-amber-300 bg-amber-50/30 p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #d97706, #b45309)" }}>
                <span className="text-white text-sm font-bold">BAK</span>
              </div>
              <div>
                <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
                  Bundesamt für Korruptionsbekämpfung (BAK)
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
                  Das BAK ist die zentrale externe Meldestelle gemäß HSchG. Es nimmt Hinweise
                  zu allen vom HSchG erfassten Bereichen entgegen, sofern keine spezielle
                  sektorale Zuständigkeit besteht. Das BAK untersteht dem Bundesministerium
                  für Inneres und verfügt über Untersuchungskompetenzen.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-mono border border-amber-200">Zentrale Meldestelle</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-mono border border-amber-200">Korruptionsbekämpfung</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-mono border border-amber-200">BMI unterstellt</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Weitere zuständige Stellen (je nach Sachgebiet)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { stelle: "FMA", bereich: "Finanzmarktaufsicht — Finanzdienstleistungen, Geldwäsche" },
                { stelle: "DSB", bereich: "Datenschutzbehörde — Datenschutz und Privatsphäre (DSGVO)" },
                { stelle: "BWB", bereich: "Bundeswettbewerbsbehörde — Wettbewerbsrecht, Kartelle" },
                { stelle: "BASG", bereich: "Bundesamt für Sicherheit im Gesundheitswesen — Arzneimittel" },
              ].map((item) => (
                <div key={item.stelle} className="flex items-start gap-3 p-3 rounded-xl bg-[#f8f9fd]">
                  <span className="font-mono text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex-shrink-0">{item.stelle}</span>
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item.bereich}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
            <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
              <strong className="text-[#060c1a]">Wann direkt extern melden?</strong> Eine
              direkte externe Meldung ist zulässig, wenn: (1) kein interner Meldekanal vorhanden ist,
              (2) der interne Kanal nicht ordnungsgemäß funktioniert, (3) begründete Angst vor
              Vergeltungsmaßnahmen besteht, oder (4) Gefahr der Beweisvereitelung droht.
              Der Hinweisgeber muss nicht zwingend zuerst intern melden.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 9. STRAFEN ═══════════════════ */}
      <Section id="strafen" title="Strafen & Sanktionen">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Das HSchG sieht Verwaltungsstrafen für verschiedene Verstöße vor. Bemerkenswert
          ist jedoch eine <strong>Gesetzeslücke</strong>: Für das bloße Fehlen eines internen
          Meldekanals gibt es derzeit keine direkte Verwaltungsstrafe.<SourceRef id={3} sources={sources} accent="#d97706" />
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard value="20.000 \u20AC" label="Max. pro Verstoß" accent="#dc2626" />
          <StatCard value="40.000 \u20AC" label="Im Wiederholungsfall" accent="#dc2626" />
          <StatCard value="0 \u20AC" label="Fehlendes System (!)" accent="#7a8db0" />
          <StatCard value="Strafbar" label="Falschmeldung" accent="#d97706" />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Strafbare Handlungen nach dem HSchG
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Behinderung oder Verhinderung von Meldungen",
                "Vergeltungsmaßnahmen gegen Hinweisgeber",
                "Verletzung der Vertraulichkeitspflicht",
                "Wissentlich falsche Meldungen abgeben",
                "Einschüchterung potenzieller Hinweisgeber",
                "Vexatorische (schikanöse) Verfahren gegen Melder",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-amber-50/60 border border-amber-200/50 p-5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <p className="font-[Syne] font-bold text-sm text-amber-700 mb-1">
                  Gesetzeslücke: Kein Bußgeld für fehlendes Meldesystem
                </p>
                <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                  Das HSchG sieht derzeit <strong>keine direkte Verwaltungsstrafe</strong> für
                  Unternehmen vor, die keinen internen Meldekanal einrichten. Diese Lücke wird
                  von Experten und der EU-Kommission kritisiert. Trotzdem: Fehlt ein interner Kanal,
                  können Hinweisgeber direkt extern an das BAK melden — das Unternehmen verliert
                  die Möglichkeit, Missstände intern zu klären. Zudem drohen zivilrechtliche
                  Haftungsrisiken und erhebliche Reputationsschäden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 10. ÖSTERREICH ═══════════════════ */}
      <Section id="oesterreich" title="HSchG in Österreich: Besonderheiten">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Die österreichische Umsetzung der Whistleblower-Richtlinie weist einige
          Besonderheiten auf, die Unternehmen kennen sollten:<SourceRef id={3} sources={sources} accent="#d97706" />
        </p>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #d97706, #b45309)" }}>
                <span className="text-white text-lg font-bold">AT</span>
              </div>
              <div>
                <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
                  Zuständigkeiten und Aufsicht
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
                  Das <strong>Bundesministerium für Justiz (BMJ)</strong><SourceRef id={3} sources={sources} accent="#d97706" /> ist
                  für die Gesetzgebung zuständig. Das <strong>BAK</strong><SourceRef id={5} sources={sources} accent="#d97706" /> fungiert
                  als zentrale externe Meldestelle. Je nach Sachbereich können auch andere Behörden
                  (FMA, DSB, BWB) als externe Meldestellen fungieren.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-mono border border-amber-200">BMJ (Gesetzgebung)</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-mono border border-amber-200">BAK (Meldestelle)</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-mono border border-amber-200">FMA / DSB (sektoral)</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="rounded-2xl bg-amber-50/60 border border-amber-200/50 p-5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-[Syne] font-bold text-sm text-amber-700 mb-1">
                  Österreichische Besonderheiten im Überblick
                </p>
                <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                  Österreich hat einen eher <strong>restriktiven Ansatz</strong> gewählt: Der sachliche
                  Anwendungsbereich wurde nicht wesentlich über die EU-Mindestanforderungen hinaus
                  erweitert. Anonyme Meldungen müssen nicht zwingend ermöglicht werden — werden
                  aber empfohlen. Die fehlende Sanktion für das Nichteinrichten eines Meldekanals
                  wird von Experten als Schwachstelle bewertet. Positiv ist die Einbeziehung
                  bestimmter nationaler Korruptionsdelikte und die ausdrückliche Zulassung
                  konzernweiter Meldesysteme.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 11. COMPLIANCE-FAHRPLAN ═══════════════════ */}
      <Section id="fahrplan" title="Ihr Compliance-Fahrplan">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Das HSchG gilt bereits für alle Unternehmen ab 50 Mitarbeitern. Wenn Ihr Unternehmen
          noch keinen internen Meldekanal eingerichtet hat, sollten Sie umgehend handeln.
          Dieser Fahrplan hilft bei der strukturierten Umsetzung:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <RoadmapStep
            phase="Phase 1 — Sofort"
            title="Meldestelle einrichten"
            accent="#d97706"
            items={[
              "HSchG-Betroffenheit prüfen (MA-Schwelle, Branche)",
              "Zuständige interne Stelle benennen (Person/Abteilung)",
              "Alternativ: Beauftragung eines externen Dienstleisters",
              "Technische Infrastruktur für den Meldekanal auswählen",
            ]}
          />
          <RoadmapStep
            phase="Phase 2 — Monat 1-2"
            title="Interne Richtlinie & Prozess"
            accent="#b45309"
            items={[
              "Interne Hinweisgeberschutz-Richtlinie erstellen",
              "Meldeverfahren dokumentieren (Eingang, Prüfung, Rückmeldung)",
              "Vertraulichkeitsregeln und Datenschutz-Folgenabschätzung",
              "Fristen sicherstellen (7 Tage Bestätigung, 3 Monate Rückmeldung)",
            ]}
          />
          <RoadmapStep
            phase="Phase 3 — Monat 2-3"
            title="Schulung aller Mitarbeiter"
            accent="#92400e"
            items={[
              "Mitarbeiter über Meldekanal und Schutzrechte informieren",
              "Führungskräfte zu Vergeltungsverbot schulen",
              "Meldestellen-Verantwortliche in Verfahrensführung ausbilden",
              "Informationsmaterial intern zugänglich machen",
            ]}
          />
          <RoadmapStep
            phase="Phase 4 — Monat 3-4"
            title="Testlauf & Optimierung"
            accent="#78350f"
            items={[
              "Testmeldung durchführen (Funktionsfähigkeit prüfen)",
              "Fristen und Dokumentation überprüfen",
              "Feedback der Meldestelle einholen und auswerten",
              "Prozess bei Bedarf nachbessern",
            ]}
          />
        </div>

        <RoadmapStep
          phase="Phase 5 — Laufend"
          title="Laufender Betrieb & Dokumentation"
          accent="#d97706"
          items={[
            "Regelmäßige Schulungen (mind. jährlich) durchführen",
            "Alle Meldungen und Maßnahmen lückenlos dokumentieren",
            "Meldekanal auf Aktualität und Funktionsfähigkeit prüfen",
            "Jährlichen Bericht für die Geschäftsleitung erstellen",
            "Gesetzesänderungen und Rechtsprechung beobachten",
          ]}
        />

        <div className="mt-6">
          <ToolRecommendation regulationKey="hschg" accent="#d97706" />
        </div>
      </Section>

      {/* ═══════════════════ 12. FAQ ═══════════════════ */}
      <Section id="faq" title="Häufige Fragen (FAQ)">
        <AccordionSection
          accent="#d97706"
          allowMultiple
          items={[
            {
              title: "Müssen anonyme Meldungen möglich sein?",
              content: (
                <p>
                  <strong>Nein.</strong> Das HSchG verpflichtet Unternehmen nicht dazu, anonyme
                  Meldungen zu ermöglichen. Es wird jedoch ausdrücklich empfohlen, anonyme Kanäle
                  vorzusehen, da dies die Meldebereitschaft nachweislich erhöht. Geht dennoch eine
                  anonyme Meldung ein, muss sie bearbeitet werden, wenn die Informationen
                  substantiiert sind. Viele professionelle Whistleblower-Software-Lösungen bieten
                  anonyme und verschlüsselte Meldemöglichkeiten standardmäßig an.
                </p>
              ),
            },
            {
              title: "Was passiert, wenn wir keinen Meldekanal haben?",
              content: (
                <div>
                  <p className="mb-3">
                    Derzeit sieht das HSchG <strong>keine direkte Verwaltungsstrafe</strong> für das
                    Fehlen eines internen Meldekanals vor. Das bedeutet aber nicht, dass es risikolos ist:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Hinweisgeber können <strong>direkt extern</strong> an das BAK melden — ohne Umweg über das Unternehmen</li>
                    <li>Vergeltungsmaßnahmen sind strafbar (bis 20.000 Euro, 40.000 Euro bei Wiederholung)</li>
                    <li>Zivilrechtliche <strong>Schadenersatzansprüche</strong> von Hinweisgebern sind möglich</li>
                    <li><strong>Reputationsrisiko</strong>: Das Fehlen eines Meldekanals wird zunehmend als Compliance-Mangel wahrgenommen</li>
                    <li>Bei <strong>öffentlichen Aufträgen</strong> kann fehlende Compliance nachteilig sein</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Kann die Meldestelle extern betrieben werden?",
              content: (
                <p>
                  <strong>Ja.</strong> Das HSchG erlaubt ausdrücklich die Auslagerung der internen
                  Meldestelle an einen <strong>externen Dritten</strong> — beispielsweise eine
                  Rechtsanwaltskanzlei, einen Compliance-Dienstleister oder eine spezialisierte
                  Ombudsperson. Die Verantwortung für die Einhaltung der gesetzlichen Pflichten
                  (Fristen, Vertraulichkeit, Folgemaßnahmen) bleibt jedoch beim Unternehmen.
                  Gerade für kleinere Unternehmen (50-249 MA) ist dies eine praktikable und
                  häufig gewählte Lösung.
                </p>
              ),
            },
            {
              title: "Wer ist als Hinweisgeber geschützt?",
              content: (
                <div>
                  <p className="mb-3">
                    Der Schutz ist bewusst weit gefasst und umfasst neben Arbeitnehmern auch:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Ehemalige Arbeitnehmer und Stellenbewerber</li>
                    <li>Selbstständige und freie Dienstnehmer</li>
                    <li>Praktikanten und Freiwillige</li>
                    <li>Organmitglieder (Vorstände, Aufsichtsräte) und Aktionäre</li>
                    <li>Unterstützer (Facilitators) und verbundene Personen (Kollegen, Verwandte)</li>
                  </ul>
                  <p className="mt-3">
                    Voraussetzung: Der Hinweisgeber hatte zum Zeitpunkt der Meldung hinreichenden
                    Grund zur Annahme, dass die Informationen der Wahrheit entsprechen.
                  </p>
                </div>
              ),
            },
            {
              title: "Wie verhält sich das HSchG zur DSGVO?",
              content: (
                <p>
                  Die Verarbeitung personenbezogener Daten im Rahmen des Meldeverfahrens muss
                  <LawRef law="DSGVO"> DSGVO</LawRef>-konform erfolgen. Unternehmen müssen u.a.
                  eine Datenschutz-Folgenabschätzung (DSFA) durchführen, eine Rechtsgrundlage für die
                  Verarbeitung festlegen (regelmäßig Art. 6 Abs. 1 lit. c DSGVO — rechtliche
                  Verpflichtung), die Speicherdauer begrenzen und die Betroffenenrechte
                  berücksichtigen. Die Identität des Hinweisgebers darf nicht ohne dessen
                  Zustimmung an die beschuldigte Person weitergegeben werden.
                </p>
              ),
            },
            {
              title: "Welche Meldungen sind NICHT vom HSchG geschützt?",
              content: (
                <div>
                  <p className="mb-3">
                    Nicht jede Meldung fällt unter den Schutz des HSchG:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Rein arbeitsrechtliche Beschwerden (z.B. Gehaltsstreitigkeiten) ohne EU-Rechtsbezug</li>
                    <li>Verstöße, die nicht in den sachlichen Anwendungsbereich fallen</li>
                    <li><strong>Wissentlich falsche Meldungen</strong> — strafbar bis 20.000 Euro</li>
                    <li>Informationen, die der nationalen Sicherheit oder Verteidigung zuzuordnen sind</li>
                    <li>Informationen unter anwaltlichem Berufsgeheimnis oder ärztlicher Schweigepflicht</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ VERWANDTE REGULIERUNGEN ═══════════════════ */}
      <RelatedGuides currentGuide="hschg" accent="#b45309" />

      {/* ═══════════════════ QUELLEN ═══════════════════ */}
      <Section id="quellen" title="Quellen & Offizielle Dokumente">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Alle Informationen in diesem Guide basieren auf den offiziellen Rechtstexten
          und behördlichen Erläuterungen. Hier finden Sie die Primärquellen:
        </p>

        <SourceList sources={sources} accent="#d97706" />

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
