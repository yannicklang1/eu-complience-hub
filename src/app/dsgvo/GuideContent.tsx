"use client";

import { motion } from "framer-motion";
import GuidePageLayout from "@/components/GuidePageLayout";
import type { TocItem } from "@/components/TableOfContents";
import type { QuickFact } from "@/components/GuidePageLayout";
import AccordionSection from "@/components/AccordionSection";
import LawRef from "@/components/LawRef";
import { SourceRef, SourceList, type Source } from "@/components/SourceRef";
import ToolRecommendation from "@/components/ToolRecommendation";

/* ─────────────────── Sources (Perplexity-style) ─────────────────── */
const sources: Source[] = [
  {
    id: 1,
    title: "Verordnung (EU) 2016/679 — DSGVO (Volltext deutsch)",
    url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj/deu",
    desc: "Offizielle konsolidierte deutsche Fassung im EUR-Lex Portal",
    type: "EU-Verordnung",
  },
  {
    id: 2,
    title: "DSGVO — englische Fassung (GDPR)",
    url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng",
    desc: "Offizielle englische Fassung im EUR-Lex Portal",
    type: "EU-Verordnung",
  },
  {
    id: 3,
    title: "Datenschutzgesetz (DSG) — Österreich",
    url: "https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001597",
    desc: "Österreichisches Datenschutzgesetz auf RIS, ergänzt die DSGVO",
    type: "Gesetz AT",
  },
  {
    id: 4,
    title: "Datenschutzbehörde Österreich (DSB)",
    url: "https://www.dsb.gv.at",
    desc: "Österreichische Aufsichtsbehörde — Beschwerden, Leitfäden, Entscheidungen",
    type: "Aufsicht AT",
  },
  {
    id: 5,
    title: "European Data Protection Board (EDPB)",
    url: "https://edpb.europa.eu",
    desc: "EU-weites Gremium für einheitliche DSGVO-Auslegung — Leitlinien und Stellungnahmen",
    type: "EU-Behörde",
  },
  {
    id: 6,
    title: "EDPB Guidelines on Data Protection Impact Assessment",
    url: "https://edpb.europa.eu/our-work-tools/general-guidance/guidelines_en",
    desc: "Leitlinien zur Datenschutz-Folgenabschätzung nach Art. 35 DSGVO",
    type: "Leitlinie",
  },
  {
    id: 7,
    title: "EDPB-EDPS Joint Opinion 5/2021 on AI Act Proposal",
    url: "https://edpb.europa.eu/our-work-tools/our-documents/edpbedps-joint-opinion/edpb-edps-joint-opinion-52021-proposal_en",
    desc: "Gemeinsame Stellungnahme von EDPB und EDPS zur Schnittstelle AI Act und DSGVO",
    type: "Leitlinie",
  },
  {
    id: 8,
    title: "Verordnung (EU) 2024/1689 — EU AI Act",
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/deu",
    desc: "EU AI Act Volltext — relevant für die DSGVO-KI-Schnittstelle",
    type: "EU-Verordnung",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Überblick" },
  { id: "grundprinzipien", label: "7 Grundprinzipien" },
  { id: "rechtsgrundlagen", label: "Rechtsgrundlagen" },
  { id: "betroffenenrechte", label: "Betroffenenrechte" },
  { id: "pflichten", label: "Pflichten für Unternehmen" },
  { id: "dsb", label: "Datenschutzbeauftragter" },
  { id: "dsfa", label: "Datenschutz-Folgenabschätzung" },
  { id: "strafen", label: "Bußgelder & Strafen" },
  { id: "oesterreich", label: "DSGVO in Österreich" },
  { id: "dsgvo-ki", label: "DSGVO & KI 2026" },
  { id: "chatgpt-daten", label: "KI-Tools & Kundendaten" },
  { id: "fahrplan", label: "Compliance-Fahrplan" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Strafe", value: "20 Mio. € oder 4% Umsatz" },
  { label: "In Kraft seit", value: "25. Mai 2018" },
  { label: "Betrifft", value: "Jedes Unternehmen mit EU-Bezug" },
  { label: "Aufsicht (AT)", value: "Datenschutzbehörde (DSB)" },
  { label: "EU-Gremium", value: "EDPB (Europ. Datenschutzausschuss)" },
  { label: "Rechtsgrundlage", value: "Verordnung (EU) 2016/679" },
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
  accent = "#7c3aed",
}: {
  value: string;
  label: string;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#d8dff0] bg-white p-5 text-center">
      <div
        className="font-[Syne] font-extrabold text-2xl sm:text-3xl mb-1"
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

/* ─────────────────── Principle card ─────────────────── */
function PrincipleCard({
  number,
  title,
  article,
  description,
}: {
  number: number;
  title: string;
  article: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-[#d8dff0] bg-white p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-xl bg-[#f3f0ff] flex items-center justify-center font-[Syne] font-extrabold text-sm text-[#7c3aed]">
          {number}
        </div>
        <div>
          <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] leading-tight">
            {title}
          </div>
          <div className="font-mono text-[10px] text-[#7a8db0]">{article}</div>
        </div>
      </div>
      <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

/* ─────────────────── Right card ─────────────────── */
function RightCard({
  icon,
  title,
  article,
  description,
}: {
  icon: string;
  title: string;
  article: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-[#d8dff0] bg-white p-5 hover:border-[#7c3aed]/20 transition-colors"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{icon}</span>
        <div>
          <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-0.5">
            {title}
          </div>
          <div className="font-mono text-[10px] text-[#7a8db0] mb-2">
            {article}
          </div>
          <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────── Fine tier ─────────────────── */
function FineTier({
  level,
  amount,
  percentage,
  color,
  examples,
}: {
  level: string;
  amount: string;
  percentage: string;
  color: string;
  examples: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border bg-white p-6"
      style={{ borderColor: `${color}30` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: color }}
        />
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider" style={{ color }}>
          {level}
        </span>
      </div>
      <div className="font-[Syne] font-extrabold text-3xl mb-1" style={{ color }}>
        {amount}
      </div>
      <div className="font-mono text-[12px] text-[#7a8db0] mb-4">
        oder {percentage} des weltweiten Jahresumsatzes
      </div>
      <div className="space-y-2">
        {examples.map((ex) => (
          <div key={ex} className="flex items-start gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
              style={{ background: color, opacity: 0.5 }}
            />
            <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{ex}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN CONTENT
   ═══════════════════════════════════════════════════ */
export default function GuideContent() {
  return (
    <GuidePageLayout
      title="DSGVO & KI 2026"
      subtitle="Die EU-Datenschutz-Grundverordnung im KI-Zeitalter — Pflichten, Rechte, ChatGPT & Kundendaten, AI Act × DSGVO und ein konkreter Compliance-Fahrplan für österreichische Unternehmen."
      regulationKey="DSGVO & KI 2026"
      accent="#7c3aed"
      badgeLabel="Update 2026"
      badgeColor="#7c3aed"
      quickFacts={quickFacts}
      tocItems={tocItems}
      trustBadge={{
        lastReview: "19.02.2026",
        sourceCount: 8,
        factChecked: true,
      }}
      heroIcon={
        <svg className="w-7 h-7 text-[#7c3aed]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      }
    >
      {/* ═══════════════════ ÜBERBLICK ═══════════════════ */}
      <Section id="ueberblick" title="Was ist die DSGVO?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Die <strong>Datenschutz-Grundverordnung</strong> (<LawRef law="DSGVO" article="1">Verordnung (EU) 2016/679</LawRef>)
          ist das zentrale EU-Datenschutzrecht und gilt seit dem <strong>25. Mai 2018</strong> unmittelbar in allen 27 EU-Mitgliedstaaten.
          <SourceRef id={1} sources={sources} accent="#7c3aed" /> Sie ersetzt die Datenschutzrichtlinie 95/46/EG und schafft einen einheitlichen Rechtsrahmen
          für den Schutz personenbezogener Daten natürlicher Personen.
        </p>

        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Die DSGVO betrifft <strong>jedes Unternehmen</strong>, das personenbezogene Daten von EU-Bürgern verarbeitet —
          unabhängig davon, ob es seinen Sitz in der EU hat (<LawRef law="DSGVO" article="3">Marktortprinzip</LawRef>).
          Sie gewährt Betroffenen weitreichende Rechte und verpflichtet Verantwortliche und Auftragsverarbeiter
          zu umfassenden Schutzmaßnahmen. Verstöße können mit Bußgeldern von bis zu <strong>20 Millionen Euro</strong> oder
          <strong> 4% des weltweiten Jahresumsatzes</strong> geahndet werden.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatCard value="20M€" label="Max. Strafe" accent="#dc2626" />
          <StatCard value="2018" label="In Kraft seit" accent="#7c3aed" />
          <StatCard value="8" label="Betroffenenrechte" accent="#059669" />
          <StatCard value="99" label="Artikel" accent="#0A2540" />
        </div>

        <div className="rounded-2xl bg-[#f8f5ff] border border-[#e8e0ff] p-6 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">💡</span>
            <div>
              <p className="font-[Syne] font-bold text-[#060c1a] mb-1">Wichtige Unterscheidung</p>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                Die DSGVO ist eine <strong>Verordnung</strong> — sie gilt unmittelbar in allen EU-Staaten.
                Im Gegensatz zu einer <em>Richtlinie</em> (wie NIS2) bedarf sie keiner nationalen Umsetzung.
                Österreich hat jedoch mit dem <strong>Datenschutzgesetz (DSG)</strong> ergänzende Regelungen
                erlassen, insbesondere zur Datenschutzbehörde und zu Strafbestimmungen. <SourceRef id={3} sources={sources} accent="#7c3aed" />
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 7 GRUNDPRINZIPIEN ═══════════════════ */}
      <Section id="grundprinzipien" title="Die 7 Grundprinzipien der DSGVO">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          <LawRef law="DSGVO" article="5">Artikel 5 DSGVO</LawRef> definiert sieben fundamentale Grundsätze,
          die bei jeder Verarbeitung personenbezogener Daten einzuhalten sind.
          Sie bilden das Fundament des gesamten EU-Datenschutzrechts:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <PrincipleCard
            number={1}
            title="Rechtmäßigkeit, Transparenz"
            article="Art. 5 Abs. 1 lit. a"
            description="Verarbeitung muss auf einer Rechtsgrundlage basieren und für die betroffene Person nachvollziehbar sein."
          />
          <PrincipleCard
            number={2}
            title="Zweckbindung"
            article="Art. 5 Abs. 1 lit. b"
            description="Daten dürfen nur für festgelegte, eindeutige und legitime Zwecke erhoben werden."
          />
          <PrincipleCard
            number={3}
            title="Datenminimierung"
            article="Art. 5 Abs. 1 lit. c"
            description="Nur die Daten erheben, die für den Zweck tatsächlich erforderlich sind — nicht mehr."
          />
          <PrincipleCard
            number={4}
            title="Richtigkeit"
            article="Art. 5 Abs. 1 lit. d"
            description="Daten müssen sachlich richtig und aktuell sein. Unrichtige Daten sind zu berichtigen oder löschen."
          />
          <PrincipleCard
            number={5}
            title="Speicherbegrenzung"
            article="Art. 5 Abs. 1 lit. e"
            description="Daten dürfen nur so lange gespeichert werden, wie es für den Zweck erforderlich ist."
          />
          <PrincipleCard
            number={6}
            title="Integrität & Vertraulichkeit"
            article="Art. 5 Abs. 1 lit. f"
            description="Angemessene technische und organisatorische Maßnahmen zum Schutz der Daten sind Pflicht."
          />
          <PrincipleCard
            number={7}
            title="Rechenschaftspflicht"
            article="Art. 5 Abs. 2"
            description="Der Verantwortliche muss die Einhaltung aller Grundsätze nachweisen können (Dokumentationspflicht)."
          />
        </div>

        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5">
          <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Praxis-Tipp:</strong> Die Rechenschaftspflicht (Nr. 7) ist der
            häufigste Stolperstein. Nicht nur die Einhaltung zählt, sondern auch der <em>Nachweis</em>.
            Ein dokumentiertes Datenschutz-Management-System (DSMS) ist daher unverzichtbar.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ RECHTSGRUNDLAGEN ═══════════════════ */}
      <Section id="rechtsgrundlagen" title="Die 6 Rechtsgrundlagen der Verarbeitung">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Jede Datenverarbeitung braucht eine Rechtsgrundlage nach <LawRef law="DSGVO" article="6">Art. 6 DSGVO</LawRef>.
          Ohne gültige Rechtsgrundlage ist die Verarbeitung rechtswidrig — unabhängig davon,
          wie gut die Daten geschützt sind.
        </p>

        <AccordionSection
          accent="#7c3aed"
          items={[
            {
              title: "1. Einwilligung (Art. 6 Abs. 1 lit. a)",
              content: (
                <div>
                  <p className="mb-3">
                    Die betroffene Person hat ihre <strong>freiwillige, informierte und eindeutige</strong> Einwilligung
                    gegeben. Muss jederzeit widerrufbar sein (<LawRef law="DSGVO" article="7">Art. 7</LawRef>).
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    <strong>Beispiel:</strong> Newsletter-Anmeldung mit Double-Opt-In, Cookie-Consent für Marketing-Cookies.
                  </p>
                </div>
              ),
            },
            {
              title: "2. Vertragserfüllung (Art. 6 Abs. 1 lit. b)",
              content: (
                <div>
                  <p className="mb-3">
                    Die Verarbeitung ist zur <strong>Erfüllung eines Vertrags</strong> oder vorvertraglicher Maßnahmen
                    mit der betroffenen Person erforderlich.
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    <strong>Beispiel:</strong> Lieferadresse für Online-Bestellung, Gehaltsabrechnung für Arbeitnehmer.
                  </p>
                </div>
              ),
            },
            {
              title: "3. Rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c)",
              content: (
                <div>
                  <p className="mb-3">
                    Die Verarbeitung ist zur Erfüllung einer <strong>rechtlichen Verpflichtung</strong> erforderlich,
                    der der Verantwortliche unterliegt.
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    <strong>Beispiel:</strong> Steuerliche Aufbewahrungspflichten (BAO), Meldung an die Sozialversicherung.
                  </p>
                </div>
              ),
            },
            {
              title: "4. Lebenswichtige Interessen (Art. 6 Abs. 1 lit. d)",
              content: (
                <p>
                  Die Verarbeitung ist zum Schutz <strong>lebenswichtiger Interessen</strong> der betroffenen
                  oder einer anderen natürlichen Person erforderlich. In der Praxis selten relevant —
                  hauptsächlich im medizinischen Notfall.
                </p>
              ),
            },
            {
              title: "5. Öffentliches Interesse (Art. 6 Abs. 1 lit. e)",
              content: (
                <p>
                  Die Verarbeitung ist für die Wahrnehmung einer Aufgabe erforderlich, die im
                  <strong> öffentlichen Interesse</strong> liegt oder in Ausübung öffentlicher Gewalt erfolgt.
                  Relevant für Behörden und öffentliche Einrichtungen.
                </p>
              ),
            },
            {
              title: "6. Berechtigtes Interesse (Art. 6 Abs. 1 lit. f)",
              content: (
                <div>
                  <p className="mb-3">
                    Die Verarbeitung ist zur Wahrung <strong>berechtigter Interessen</strong> des Verantwortlichen
                    oder eines Dritten erforderlich — sofern die Interessen der betroffenen Person nicht überwiegen.
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    <strong>Beispiel:</strong> Betrugsprävention, IT-Sicherheit, Direktwerbung an Bestandskunden.
                    Erfordert immer eine dokumentierte <em>Interessensabwägung</em>.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ BETROFFENENRECHTE ═══════════════════ */}
      <Section id="betroffenenrechte" title="8 Betroffenenrechte">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Die DSGVO gewährt betroffenen Personen umfassende Rechte.
          Unternehmen müssen Prozesse implementieren, um diese Rechte innerhalb von
          <strong> einem Monat</strong> zu erfüllen (<LawRef law="DSGVO" article="12">Art. 12 Abs. 3</LawRef>).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <RightCard
            icon="ℹ️"
            title="Auskunftsrecht"
            article="Art. 15 DSGVO"
            description="Betroffene haben das Recht zu erfahren, ob und welche Daten über sie verarbeitet werden, den Zweck, die Empfänger und die Speicherdauer."
          />
          <RightCard
            icon="✏️"
            title="Berichtigungsrecht"
            article="Art. 16 DSGVO"
            description="Unrichtige personenbezogene Daten müssen unverzüglich berichtigt werden."
          />
          <RightCard
            icon="🗑️"
            title="Recht auf Löschung"
            article="Art. 17 DSGVO"
            description="Das 'Recht auf Vergessenwerden': Daten müssen gelöscht werden, wenn der Zweck entfällt oder die Einwilligung widerrufen wird."
          />
          <RightCard
            icon="⏸️"
            title="Recht auf Einschränkung"
            article="Art. 18 DSGVO"
            description="Betroffene können verlangen, dass die Verarbeitung eingeschränkt wird, z.B. während einer Prüfung der Datenrichtigkeit."
          />
          <RightCard
            icon="📦"
            title="Datenübertragbarkeit"
            article="Art. 20 DSGVO"
            description="Betroffene können ihre Daten in einem gängigen, maschinenlesbaren Format erhalten und an einen anderen Anbieter übertragen."
          />
          <RightCard
            icon="🚫"
            title="Widerspruchsrecht"
            article="Art. 21 DSGVO"
            description="Betroffene können jederzeit Widerspruch gegen Verarbeitung aufgrund von Art. 6 Abs. 1 lit. e oder f einlegen — insbesondere gegen Direktwerbung."
          />
          <RightCard
            icon="🤖"
            title="Automatisierte Entscheidungen"
            article="Art. 22 DSGVO"
            description="Recht, nicht ausschließlich automatisierten Entscheidungen (inkl. Profiling) unterworfen zu werden, die rechtliche Wirkung entfalten."
          />
          <RightCard
            icon="📢"
            title="Informationspflicht"
            article="Art. 13 & 14 DSGVO"
            description="Verantwortliche müssen Betroffene proaktiv über die Datenverarbeitung informieren — bei Erhebung oder innerhalb eines Monats."
          />
        </div>
      </Section>

      {/* ═══════════════════ PFLICHTEN FÜR UNTERNEHMEN ═══════════════════ */}
      <Section id="pflichten" title="Pflichten für Unternehmen">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Neben der Wahrung der Betroffenenrechte müssen Unternehmen als Verantwortliche
          (<LawRef law="DSGVO" article="4">Art. 4 Nr. 7</LawRef>) oder Auftragsverarbeiter
          (<LawRef law="DSGVO" article="4">Art. 4 Nr. 8</LawRef>) zahlreiche Pflichten erfüllen:
        </p>

        <AccordionSection
          accent="#7c3aed"
          items={[
            {
              title: "Verarbeitungsverzeichnis (Art. 30)",
              content: (
                <div>
                  <p className="mb-3">
                    Jedes Unternehmen mit mehr als 250 Mitarbeitern <strong>muss</strong> ein Verzeichnis aller
                    Verarbeitungstätigkeiten führen. Kleinere Unternehmen sind nur befreit, wenn die
                    Verarbeitung nicht regelmäßig erfolgt — in der Praxis trifft die Pflicht daher fast jedes Unternehmen.
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    Inhalt: Name des Verantwortlichen, Zweck, Kategorien betroffener Personen und Daten,
                    Empfänger, Übermittlungen in Drittländer, Löschfristen, TOM-Beschreibung.
                  </p>
                </div>
              ),
            },
            {
              title: "Technische & organisatorische Maßnahmen (Art. 32)",
              content: (
                <div>
                  <p className="mb-3">
                    Verantwortliche und Auftragsverarbeiter müssen <strong>angemessene</strong> technische
                    und organisatorische Maßnahmen (TOM) implementieren. Was angemessen ist, richtet sich nach
                    dem Stand der Technik, den Kosten und dem Risiko.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-[14px] text-[#5a6a8a]">
                    <li>Pseudonymisierung und Verschlüsselung</li>
                    <li>Vertraulichkeit, Integrität, Verfügbarkeit, Belastbarkeit</li>
                    <li>Wiederherstellbarkeit nach Zwischenfällen</li>
                    <li>Regelmäßige Überprüfung und Bewertung der Wirksamkeit</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Auftragsverarbeitungs-Verträge (Art. 28)",
              content: (
                <p>
                  Wenn ein externer Dienstleister (Auftragsverarbeiter) personenbezogene Daten im Auftrag
                  verarbeitet, <strong>muss</strong> ein schriftlicher Vertrag geschlossen werden (AVV).
                  Dieser regelt Gegenstand, Dauer, Art der Daten, Pflichten des Auftragsverarbeiters,
                  Sub-Auftragsverarbeiter und Weisungsbindung. Cloud-Dienste, IT-Dienstleister und
                  Marketing-Tools sind typische Fälle.
                </p>
              ),
            },
            {
              title: "Data Breach Notification (Art. 33 & 34)",
              content: (
                <div>
                  <p className="mb-3">
                    Bei einer Datenpanne muss der Verantwortliche die Aufsichtsbehörde
                    <strong> innerhalb von 72 Stunden</strong> nach Bekanntwerden benachrichtigen
                    (<LawRef law="DSGVO" article="33">Art. 33</LawRef>) — es sei denn, die Verletzung
                    führt voraussichtlich nicht zu einem Risiko für die Betroffenen.
                  </p>
                  <p className="text-[14px] text-[#5a6a8a]">
                    Bei <strong>hohem Risiko</strong> für die Betroffenen müssen auch diese direkt
                    benachrichtigt werden (<LawRef law="DSGVO" article="34">Art. 34</LawRef>).
                  </p>
                </div>
              ),
            },
            {
              title: "Privacy by Design & Default (Art. 25)",
              content: (
                <p>
                  Datenschutz muss bereits bei der <strong>Entwicklung</strong> von Produkten und Systemen
                  berücksichtigt werden (Privacy by Design). Standardmäßig dürfen nur die für den jeweiligen
                  Zweck erforderlichen Daten verarbeitet werden (Privacy by Default). Das betrifft die Menge
                  der erhobenen Daten, den Umfang der Verarbeitung, die Speicherfrist und die Zugänglichkeit.
                </p>
              ),
            },
            {
              title: "Datenschutz-Folgenabschätzung (Art. 35)",
              content: (
                <p>
                  Wenn eine Verarbeitungstätigkeit voraussichtlich ein <strong>hohes Risiko</strong> für
                  die Rechte und Freiheiten natürlicher Personen birgt, muss vorab eine
                  Datenschutz-Folgenabschätzung (DSFA) durchgeführt werden. Mehr dazu im Abschnitt unten.
                </p>
              ),
            },
            {
              title: "Internationale Datenübermittlung (Kap. V)",
              content: (
                <div>
                  <p className="mb-3">
                    Datenübermittlungen in Drittländer (außerhalb des EWR) sind nur zulässig, wenn ein
                    <strong> angemessenes Schutzniveau</strong> gewährleistet ist.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-[14px] text-[#5a6a8a]">
                    <li><strong>Angemessenheitsbeschluss:</strong> z.B. EU-US Data Privacy Framework</li>
                    <li><strong>Standardvertragsklauseln (SCCs):</strong> EU-Kommission genehmigte Klauseln</li>
                    <li><strong>Binding Corporate Rules (BCRs):</strong> Konzerninterne Datenschutzregeln</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ DATENSCHUTZBEAUFTRAGTER ═══════════════════ */}
      <Section id="dsb" title="Datenschutzbeauftragter (DSB)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Ein <strong>Datenschutzbeauftragter</strong> (DSB) muss gemäß <LawRef law="DSGVO" article="37">Art. 37 DSGVO</LawRef> bestellt
          werden, wenn eine der folgenden Bedingungen zutrifft:
        </p>

        <div className="space-y-4 mb-8">
          {[
            {
              condition: "Behörden & öffentliche Stellen",
              description: "Immer, außer bei Gerichten in ihrer justiziellen Tätigkeit.",
            },
            {
              condition: "Kerntätigkeit: Überwachung",
              description:
                "Wenn die Kerntätigkeit in der umfangreichen, regelmäßigen und systematischen Überwachung von Personen besteht (z.B. Tracking, Profiling).",
            },
            {
              condition: "Kerntätigkeit: Sensible Daten",
              description:
                "Wenn die Kerntätigkeit in der umfangreichen Verarbeitung besonderer Datenkategorien (Gesundheit, biometrische Daten, strafrechtliche Verurteilungen) besteht.",
            },
          ].map((item) => (
            <motion.div
              key={item.condition}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-5 rounded-2xl border border-[#d8dff0] bg-white"
            >
              <div className="w-2 h-2 rounded-full bg-[#7c3aed] flex-shrink-0 mt-2" />
              <div>
                <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">
                  {item.condition}
                </div>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="rounded-2xl bg-[#f8f5ff] border border-[#e8e0ff] p-6">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">🇦🇹</span>
            <div>
              <p className="font-[Syne] font-bold text-[#060c1a] mb-1">Österreich-Besonderheit</p>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                In Österreich gibt es <strong>keine erweiterte DSB-Pflicht</strong> über die DSGVO hinaus.
                Es gilt exakt Art. 37 DSGVO. Der DSB kann intern oder extern bestellt werden
                und genießt <strong>Kündigungsschutz</strong> nach <LawRef law="DSGVO" article="38">Art. 38 Abs. 3</LawRef>.
                Die Kontaktdaten des DSB sind der Datenschutzbehörde mitzuteilen.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ DSFA ═══════════════════ */}
      <Section id="dsfa" title="Datenschutz-Folgenabschätzung (DSFA)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Eine <strong>DSFA</strong> ist gemäß <LawRef law="DSGVO" article="35">Art. 35 DSGVO</LawRef> verpflichtend,
          wenn eine Verarbeitungstätigkeit voraussichtlich ein <strong>hohes Risiko</strong> für Betroffene birgt.
          Die Aufsichtsbehörde veröffentlicht Listen von Verarbeitungstätigkeiten,
          für die eine DSFA erforderlich ist. <SourceRef id={6} sources={sources} accent="#7c3aed" />
        </p>

        <div className="mb-8">
          <p className="font-[Syne] font-bold text-[#060c1a] mb-4">Wann ist eine DSFA Pflicht?</p>
          <div className="space-y-3">
            {[
              "Systematische und umfassende Bewertung persönlicher Aspekte (Profiling)",
              "Umfangreiche Verarbeitung besonderer Datenkategorien (Gesundheit, Biometrie)",
              "Systematische Überwachung öffentlich zugänglicher Bereiche (Videoüberwachung)",
              "Neue Technologien mit unklaren Risiken (KI, IoT, Gesichtserkennung)",
              "Automatisierte Entscheidungsfindung mit rechtlicher Wirkung",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <span className="text-[14px] text-[#3a4a6b] leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
          <p className="font-[Syne] font-bold text-[#060c1a] mb-3">Inhalt einer DSFA</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { step: "1", title: "Beschreibung", desc: "Art, Umfang, Kontext und Zweck der Verarbeitung" },
              { step: "2", title: "Notwendigkeit", desc: "Notwendigkeit und Verhältnismäßigkeit prüfen" },
              { step: "3", title: "Risikobewertung", desc: "Risiken für Rechte und Freiheiten der Betroffenen" },
              { step: "4", title: "Abhilfemaßnahmen", desc: "Geplante Maßnahmen zur Risikominderung" },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3 p-3 rounded-xl bg-[#f8f9fd]">
                <div className="w-7 h-7 rounded-lg bg-[#f3f0ff] flex items-center justify-center font-[Syne] font-bold text-sm text-[#7c3aed] flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <div className="font-bold text-[13px] text-[#060c1a]">{s.title}</div>
                  <div className="text-[12px] text-[#7a8db0] leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════ BUSSGELDER & STRAFEN ═══════════════════ */}
      <Section id="strafen" title="Bußgelder & Strafen">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Die DSGVO kennt zwei Bußgeldstufen (<LawRef law="DSGVO" article="83">Art. 83</LawRef>).
          Die Höhe richtet sich nach Art, Schwere und Dauer des Verstoßes, Vorsatz oder Fahrlässigkeit,
          getroffenen Maßnahmen und Zusammenarbeit mit der Aufsichtsbehörde.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <FineTier
            level="Stufe 2 (schwer)"
            amount="20 Mio. €"
            percentage="4%"
            color="#dc2626"
            examples={[
              "Verstöße gegen Grundprinzipien (Art. 5, 6, 9)",
              "Verletzung der Betroffenenrechte (Art. 12–22)",
              "Unzulässige Drittlandübermittlung (Art. 44–49)",
              "Nichtbefolgung behördlicher Anordnungen",
            ]}
          />
          <FineTier
            level="Stufe 1 (leicht)"
            amount="10 Mio. €"
            percentage="2%"
            color="#ea580c"
            examples={[
              "Pflichten des Verantwortlichen (Art. 25–39)",
              "Pflichten des Auftragsverarbeiters",
              "Zertifizierungsstellen-Pflichten",
              "Pflichten der Überwachungsstelle",
            ]}
          />
        </div>

        <div className="rounded-2xl bg-[#fef2f2] border border-red-200 p-6 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">⚠️</span>
            <div>
              <p className="font-[Syne] font-bold text-[#060c1a] mb-1">Rekord-Bußgelder in der Praxis</p>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                Die höchsten DSGVO-Bußgelder bisher: Meta (1,2 Mrd. € — Irland, 2023),
                Amazon (746 Mio. € — Luxemburg, 2021), WhatsApp (225 Mio. € — Irland, 2021).
                In Österreich verhängte die DSB bisher Strafen bis zu mehreren Hunderttausend Euro.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5">
          <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Österreich:</strong> Das DSG sieht in <LawRef law="DSG" paragraph="62">§ 62 DSG</LawRef>{" "}
            ergänzende Strafbestimmungen vor. Verstöße gegen bestimmte DSG-Vorschriften können mit bis
            zu <strong>50.000 €</strong> Verwaltungsstrafe geahndet werden — zusätzlich zu den DSGVO-Bußgeldern.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ ÖSTERREICH ═══════════════════ */}
      <Section id="oesterreich" title="DSGVO in Österreich">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Die DSGVO gilt zwar EU-weit einheitlich, aber Österreich hat mit dem
          <strong> Datenschutzgesetz (DSG)</strong> nationale Ergänzungen erlassen. <SourceRef id={3} sources={sources} accent="#7c3aed" />{" "}
          Hier die wichtigsten Besonderheiten:
        </p>

        <div className="space-y-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#f3f0ff] flex items-center justify-center">
                <span className="text-lg">🏛️</span>
              </div>
              <div>
                <div className="font-[Syne] font-bold text-[#060c1a]">Datenschutzbehörde (DSB)</div>
                <div className="font-mono text-[10px] text-[#7a8db0]">dsb.gv.at</div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Die <strong>Datenschutzbehörde</strong> (<LawRef law="DSG" paragraph="18">§ 18 DSG</LawRef>) ist die
              unabhängige Aufsichtsbehörde für Österreich. <SourceRef id={4} sources={sources} accent="#7c3aed" /> Sie nimmt Beschwerden entgegen,
              führt Untersuchungen durch, verhängt Bußgelder und berät zu Datenschutzfragen.
              Sitz: Barichgasse 40–42, 1030 Wien.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#f3f0ff] flex items-center justify-center">
                <span className="text-lg">📋</span>
              </div>
              <div>
                <div className="font-[Syne] font-bold text-[#060c1a]">Öffnungsklauseln im DSG</div>
                <div className="font-mono text-[10px] text-[#7a8db0]">Nationale Besonderheiten</div>
              </div>
            </div>
            <ul className="space-y-2 text-[14px] text-[#5a6a8a] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] font-bold mt-0.5">•</span>
                <span><strong>Beschäftigtendatenschutz:</strong> Keine eigene Regelung — es gilt allgemeines DSGVO-Recht</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] font-bold mt-0.5">•</span>
                <span><strong>Altersgrenze Einwilligung:</strong> 14 Jahre (statt 16 Jahre DSGVO-Standard, § 4 Abs. 4 DSG)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] font-bold mt-0.5">•</span>
                <span><strong>Bildverarbeitung:</strong> § 12 DSG regelt die Verwendung von Bildaufnahmen (Videoüberwachung) — strengere Regeln als DSGVO</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7c3aed] font-bold mt-0.5">•</span>
                <span><strong>Datengeheimnis:</strong> § 6 DSG begründet ein besonderes Datengeheimnis für Auftragsverarbeiter</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#f3f0ff] flex items-center justify-center">
                <span className="text-lg">⚖️</span>
              </div>
              <div>
                <div className="font-[Syne] font-bold text-[#060c1a]">Rechtsschutz in Österreich</div>
                <div className="font-mono text-[10px] text-[#7a8db0]">Beschwerden & Klagen</div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Betroffene können sich direkt an die <strong>Datenschutzbehörde</strong> wenden (Beschwerderecht
              nach <LawRef law="DSGVO" article="77">Art. 77</LawRef>) oder zivilrechtlich auf Schadenersatz klagen
              (<LawRef law="DSGVO" article="82">Art. 82</LawRef>). Gegen Bescheide der DSB steht der Rechtsweg
              zum Bundesverwaltungsgericht offen.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════ DSGVO & KI 2026 ═══════════════════ */}
      <Section id="dsgvo-ki" title="DSGVO & KI — Was sich 2026 ändert">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Mit dem <strong>EU AI Act</strong> (<LawRef law="AI Act" article="1">Verordnung (EU) 2024/1689</LawRef>)
          tritt 2026 die weltweit erste umfassende KI-Regulierung in Kraft.
          <SourceRef id={8} sources={sources} accent="#7c3aed" /> Die DSGVO bleibt dabei das
          <strong> Fundament des Datenschutzes</strong> — auch für KI-Systeme. Unternehmen müssen
          beide Regulierungen gleichzeitig erfüllen.
        </p>

        <div className="space-y-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#f3f0ff] flex items-center justify-center"><span className="text-lg">🤖</span></div>
              <div>
                <div className="font-[Syne] font-bold text-[#060c1a]">Art. 22 DSGVO trifft Hochrisiko-KI</div>
                <div className="font-mono text-[10px] text-[#7a8db0]">Automatisierte Entscheidungen</div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              <LawRef law="DSGVO" article="22">Art. 22 DSGVO</LawRef> verbietet rein automatisierte Entscheidungen
              mit rechtlicher Wirkung. Der AI Act stuft KI-Systeme in Beschäftigung, Kreditwürdigkeit und
              Sozialleistungen als <strong>Hochrisiko</strong> ein. Unternehmen müssen sicherstellen, dass
              bei solchen Systemen eine <strong>menschliche Überprüfung</strong> (Human-in-the-Loop) garantiert ist.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#f3f0ff] flex items-center justify-center"><span className="text-lg">📋</span></div>
              <div>
                <div className="font-[Syne] font-bold text-[#060c1a]">DSFA-Pflicht für KI-Systeme</div>
                <div className="font-mono text-[10px] text-[#7a8db0]">Art. 35 DSGVO × AI Act</div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              KI-Systeme, die personenbezogene Daten verarbeiten, erfordern fast immer eine
              <strong> Datenschutz-Folgenabschätzung</strong> nach <LawRef law="DSGVO" article="35">Art. 35 DSGVO</LawRef>.
              Der AI Act verlangt zusätzlich eine <strong>Grundrechte-Folgenabschätzung</strong> für Hochrisiko-KI.
              EDPB und EDPS empfehlen, beide Prüfungen zu integrieren.
              <SourceRef id={7} sources={sources} accent="#7c3aed" />
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#f3f0ff] flex items-center justify-center"><span className="text-lg">🧠</span></div>
              <div>
                <div className="font-[Syne] font-bold text-[#060c1a]">KI-Trainingsdaten & DSGVO</div>
                <div className="font-mono text-[10px] text-[#7a8db0]">Rechtsgrundlage für Training</div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Das Training von KI-Modellen mit personenbezogenen Daten braucht eine <strong>Rechtsgrundlage</strong>.
              Einwilligung ist für große Datensätze oft unpraktisch. Viele KI-Anbieter berufen sich auf
              <strong> berechtigtes Interesse</strong> (<LawRef law="DSGVO" article="6">Art. 6 Abs. 1 lit. f</LawRef>) —
              das erfordert aber eine sorgfältige Interessensabwägung und ein Opt-Out-Recht für Betroffene.
            </p>
          </motion.div>
        </div>

        <div className="rounded-2xl bg-[#f8f5ff] border border-[#e8e0ff] p-6">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">⚡</span>
            <div>
              <p className="font-[Syne] font-bold text-[#060c1a] mb-1">Handlungsempfehlung</p>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                Erstellen Sie ein <strong>integriertes Compliance-Konzept</strong> für DSGVO und AI Act.
                Inventarisieren Sie alle KI-Systeme im Unternehmen, prüfen Sie deren Risikoklasse nach AI Act
                und erstellen Sie für jedes System eine kombinierte DSFA + Grundrechte-Folgenabschätzung.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ CHATGPT & KUNDENDATEN ═══════════════════ */}
      <Section id="chatgpt-daten" title="Darf ich Kundendaten in ChatGPT eingeben?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Eine der häufigsten Fragen 2026: Darf mein Unternehmen <strong>Kundendaten in KI-Tools</strong> wie
          ChatGPT, Microsoft Copilot oder Google Gemini eingeben? Die kurze Antwort: <strong>Es kommt darauf an</strong> —
          und zwar auf das konkrete Tool, den Vertrag und die Art der Daten.
        </p>

        <div className="rounded-2xl bg-[#fef2f2] border border-red-200 p-6 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">⚠️</span>
            <div>
              <p className="font-[Syne] font-bold text-[#060c1a] mb-1">Achtung: Kostenlose KI-Tools</p>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                Bei kostenlosen Versionen von ChatGPT, Gemini & Co. werden Eingaben typischerweise zum
                <strong> Modelltraining</strong> verwendet. Das ist mit der DSGVO <strong>nicht vereinbar</strong>,
                wenn personenbezogene Daten enthalten sind. Nutzen Sie für Unternehmenszwecke
                <strong> ausschließlich Enterprise-Versionen</strong> mit Auftragsverarbeitungsvertrag (AVV).
              </p>
            </div>
          </div>
        </div>

        <AccordionSection
          accent="#7c3aed"
          items={[
            {
              title: "ChatGPT / OpenAI — Was ist erlaubt?",
              content: (
                <div>
                  <p className="mb-3">
                    <strong>ChatGPT Enterprise / API:</strong> OpenAI bietet einen <strong>AVV nach Art. 28 DSGVO</strong> an.
                    Daten werden <strong>nicht</strong> zum Training verwendet. Verarbeitung in den USA, abgesichert durch
                    das EU-US Data Privacy Framework (OpenAI ist zertifiziert) und Standardvertragsklauseln.
                  </p>
                  <p className="mb-3">
                    <strong>ChatGPT Free / Plus:</strong> Eingaben können zum Training verwendet werden.
                    Kein AVV verfügbar. <strong>Nicht für Unternehmensdaten geeignet.</strong>
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    <strong>Empfehlung:</strong> ChatGPT Enterprise oder API mit AVV nutzen. Opt-Out für Training aktivieren.
                    Keine sensiblen oder besonderen Kategorien personenbezogener Daten eingeben.
                  </p>
                </div>
              ),
            },
            {
              title: "Microsoft Copilot / Azure OpenAI",
              content: (
                <div>
                  <p className="mb-3">
                    <strong>Microsoft 365 Copilot:</strong> Läuft in der <strong>EU-Datengrenze</strong> (EU Data Boundary).
                    Microsoft ist Auftragsverarbeiter mit umfassendem AVV. Daten werden <strong>nicht</strong> zum Training
                    verwendet. Aus DSGVO-Sicht die derzeit beste Option für Unternehmen.
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    <strong>Azure OpenAI Service:</strong> Ebenfalls mit AVV und EU-Rechenzentren verfügbar.
                    Unternehmen behalten volle Kontrolle über ihre Daten.
                  </p>
                </div>
              ),
            },
            {
              title: "Google Gemini / Vertex AI",
              content: (
                <div>
                  <p className="mb-3">
                    <strong>Google Workspace mit Gemini:</strong> AVV über Google Cloud-Vertrag verfügbar.
                    Verarbeitung in EU-Rechenzentren möglich. Daten werden laut Google <strong>nicht</strong>
                    zum Training von Gemini-Modellen außerhalb des Kundenkontos verwendet.
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    <strong>Achtung:</strong> Das kostenlose Gemini (bard.google.com) verwendet Eingaben zum Training.
                    Nur die Enterprise-Version ist DSGVO-konform einsetzbar.
                  </p>
                </div>
              ),
            },
            {
              title: "Interne KI-Policy — Was jedes Unternehmen braucht",
              content: (
                <div>
                  <p className="mb-3">Erstellen Sie eine <strong>KI-Nutzungsrichtlinie</strong> für Ihr Unternehmen:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px] text-[#5a6a8a]">
                    <li><strong>Whitelist:</strong> Freigegebene KI-Tools mit AVV (z.B. ChatGPT Enterprise, Copilot)</li>
                    <li><strong>Blacklist:</strong> Verbotene Tools ohne AVV (Free-Versionen, unbekannte KI-Startups)</li>
                    <li><strong>Datenklassifizierung:</strong> Welche Daten dürfen in KI-Tools eingegeben werden? (Nie: Gesundheitsdaten, Biometrie, sensible Personaldaten)</li>
                    <li><strong>Schulungspflicht:</strong> Alle Mitarbeiter vor KI-Nutzung schulen</li>
                    <li><strong>Verarbeitungsverzeichnis:</strong> KI-Tools als Verarbeitungstätigkeit dokumentieren</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ COMPLIANCE-FAHRPLAN ═══════════════════ */}
      <Section id="fahrplan" title="DSGVO Compliance-Fahrplan">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Auch wenn die DSGVO seit 2018 gilt, kämpfen viele Unternehmen noch mit der vollständigen Umsetzung.
          Hier ein pragmatischer 5-Phasen-Fahrplan:
        </p>

        <div className="space-y-4 mb-8">
          {[
            {
              phase: "1",
              title: "Bestandsaufnahme",
              weeks: "Woche 1–2",
              color: "#7c3aed",
              tasks: [
                "Alle Datenverarbeitungstätigkeiten identifizieren",
                "Bestehendes Verarbeitungsverzeichnis prüfen oder erstellen",
                "Auftragsverarbeiter inventarisieren",
                "Drittlandübermittlungen dokumentieren",
              ],
            },
            {
              phase: "2",
              title: "Rechtsgrundlagen & Risikobewertung",
              weeks: "Woche 3–4",
              color: "#059669",
              tasks: [
                "Rechtsgrundlage für jede Verarbeitungstätigkeit festlegen",
                "Risikobewertung durchführen — wo ist eine DSFA nötig?",
                "Datenschutzhinweise überprüfen und aktualisieren",
                "Einwilligungsmanagement prüfen (Cookie-Consent, Formulare)",
              ],
            },
            {
              phase: "3",
              title: "Technische & organisatorische Maßnahmen",
              weeks: "Woche 5–8",
              color: "#0A2540",
              tasks: [
                "TOM nach Art. 32 implementieren oder dokumentieren",
                "Löschkonzept erstellen und automatisieren",
                "Zugriffsrechte-Management implementieren",
                "Verschlüsselungsstandards für sensible Daten festlegen",
              ],
            },
            {
              phase: "4",
              title: "Prozesse & Schulung",
              weeks: "Woche 9–12",
              color: "#ea580c",
              tasks: [
                "Betroffenenanfragen-Prozess etablieren (max. 1 Monat Frist)",
                "Datenpannen-Meldeprozess implementieren (72h-Frist)",
                "Mitarbeiterschulungen durchführen und dokumentieren",
                "AVV-Verträge mit allen Auftragsverarbeitern abschließen",
              ],
            },
            {
              phase: "5",
              title: "Monitoring & Verbesserung",
              weeks: "Fortlaufend",
              color: "#dc2626",
              tasks: [
                "Regelmäßige Datenschutz-Audits durchführen",
                "Verarbeitungsverzeichnis aktuell halten",
                "Neue Verarbeitungstätigkeiten vorab prüfen (Privacy by Design)",
                "EDPB-Leitlinien und DSB-Entscheidungen verfolgen",
              ],
            },
          ].map((phase) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#d8dff0] bg-white p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-[Syne] font-extrabold text-white text-sm"
                  style={{ background: phase.color }}
                >
                  {phase.phase}
                </div>
                <div>
                  <div className="font-[Syne] font-bold text-[#060c1a]">
                    {phase.title}
                  </div>
                  <div className="font-mono text-[10px] text-[#7a8db0]">
                    {phase.weeks}
                  </div>
                </div>
              </div>
              <div className="space-y-2 pl-[52px]">
                {phase.tasks.map((task) => (
                  <div key={task} className="flex items-start gap-2.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
                      style={{ background: phase.color, opacity: 0.4 }}
                    />
                    <span className="text-[14px] text-[#5a6a8a] leading-relaxed">
                      {task}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <Section id="faq" title="Häufig gestellte Fragen (FAQ)">
        <AccordionSection
          accent="#7c3aed"
          items={[
            {
              title: "Gilt die DSGVO für mein Unternehmen?",
              content: (
                <p>
                  Sehr wahrscheinlich ja. Die DSGVO gilt für <strong>jedes Unternehmen</strong>, das personenbezogene
                  Daten von Personen in der EU verarbeitet — unabhängig von Größe, Branche oder Sitz.
                  Wenn Sie Mitarbeiter haben, Kunden in der EU bedienen, eine Website mit Kontaktformular
                  betreiben oder E-Mails versenden, verarbeiten Sie personenbezogene Daten.
                </p>
              ),
            },
            {
              title: "Was sind personenbezogene Daten?",
              content: (
                <div>
                  <p className="mb-3">
                    Alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person
                    beziehen (<LawRef law="DSGVO" article="4">Art. 4 Nr. 1</LawRef>). Das umfasst:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-[14px]">
                    <li>Name, Adresse, Telefonnummer, E-Mail</li>
                    <li>IP-Adressen, Cookie-IDs, Geräte-IDs</li>
                    <li>Standortdaten, Gesundheitsdaten, biometrische Daten</li>
                    <li>Kontonummern, Sozialversicherungsnummer</li>
                    <li>Fotos, Videos mit erkennbaren Personen</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Brauche ich einen Datenschutzbeauftragten?",
              content: (
                <p>
                  Nicht jedes Unternehmen. Die Pflicht besteht bei: Behörden, Unternehmen mit
                  Kerntätigkeit in systematischer Überwachung (z.B. Tracking-Dienstleister) und
                  Unternehmen mit umfangreicher Verarbeitung besonderer Datenkategorien
                  (z.B. Gesundheitsdaten). Unabhängig davon ist ein DSB oft empfehlenswert,
                  um Risiken zu minimieren und die Rechenschaftspflicht zu erfüllen.
                </p>
              ),
            },
            {
              title: "Was passiert bei einer Datenpanne?",
              content: (
                <div>
                  <p className="mb-3">
                    Bei einer Verletzung des Schutzes personenbezogener Daten müssen Sie:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
                    <li>
                      <strong>72 Stunden:</strong> Meldung an die Datenschutzbehörde (falls Risiko für Betroffene)
                    </li>
                    <li>
                      <strong>Unverzüglich:</strong> Betroffene direkt informieren (falls hohes Risiko)
                    </li>
                    <li>
                      <strong>Dokumentation:</strong> Jeden Vorfall intern dokumentieren (auch wenn keine Meldepflicht)
                    </li>
                  </ol>
                </div>
              ),
            },
            {
              title: "Welche Einwilligungen brauche ich für Cookies?",
              content: (
                <p>
                  Technisch notwendige Cookies (Session, Warenkorb) brauchen <strong>keine Einwilligung</strong>.
                  Für alle anderen Cookies — insbesondere Marketing-, Tracking- und Analyse-Cookies — ist
                  eine <strong>informierte, freiwillige Einwilligung</strong> vor dem Setzen erforderlich
                  (Opt-In). Das ergibt sich aus der ePrivacy-Richtlinie in Verbindung mit der DSGVO.
                  Ein Cookie-Banner mit echtem Opt-In (nicht nur Info-Banner) ist Pflicht.
                </p>
              ),
            },
            {
              title: "Wie lange darf ich Daten speichern?",
              content: (
                <p>
                  So kurz wie möglich. Die DSGVO gibt keine fixen Fristen vor, sondern verlangt,
                  dass Daten <strong>nur so lange gespeichert werden, wie es für den Zweck erforderlich ist</strong>.
                  Sie müssen ein Löschkonzept erstellen, das Aufbewahrungsfristen pro Datenart definiert.
                  Beispiele: Buchhaltungsunterlagen 7 Jahre (BAO), Bewerbungsunterlagen 6 Monate,
                  Kundenstammdaten bis Vertragsende + Verjährungsfrist.
                </p>
              ),
            },
            {
              title: "Darf ich Daten in die USA übermitteln?",
              content: (
                <p>
                  Seit dem <strong>EU-US Data Privacy Framework</strong> (Angemessenheitsbeschluss vom 10. Juli 2023)
                  können Daten an US-Unternehmen übermittelt werden, die sich unter dem Framework zertifiziert haben.
                  Für nicht-zertifizierte US-Unternehmen oder andere Drittländer benötigen Sie
                  Standardvertragsklauseln (SCCs) inklusive Transfer Impact Assessment.
                </p>
              ),
            },
            {
              title: "Wie hängt die DSGVO mit NIS2 und AI Act zusammen?",
              content: (
                <p>
                  Die DSGVO, NIS2 und der AI Act ergänzen sich. NIS2 fordert <strong>Cybersicherheitsmaßnahmen</strong>,
                  die auch dem Datenschutz dienen (Vertraulichkeit, Integrität). Der AI Act verlangt bei
                  Hochrisiko-KI-Systemen eine <strong>Datenschutz-Folgenabschätzung</strong> und die Einhaltung
                  der DSGVO für Trainingsdaten. Unternehmen, die alle drei Regulierungen betrifft,
                  sollten ein integriertes Compliance-Management aufbauen.
                </p>
              ),
            },
            {
              title: "Darf ich ChatGPT im Unternehmen nutzen?",
              content: (
                <div>
                  <p className="mb-3">
                    Ja, aber nur unter bestimmten Bedingungen: Verwenden Sie <strong>ausschließlich Enterprise-Versionen</strong>
                    mit einem Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO. Die kostenlose ChatGPT-Version
                    verwendet Eingaben zum Modelltraining — das ist bei personenbezogenen Daten nicht DSGVO-konform.
                  </p>
                  <p className="text-[13px] text-[#7a8db0]">
                    Erstellen Sie zudem eine interne KI-Nutzungsrichtlinie, die regelt, welche Daten
                    in welche Tools eingegeben werden dürfen.
                  </p>
                </div>
              ),
            },
            {
              title: "Brauche ich eine DSFA für KI-Systeme?",
              content: (
                <p>
                  In den meisten Fällen ja. KI-Systeme, die personenbezogene Daten verarbeiten, verwenden
                  typischerweise <strong>Profiling, automatisierte Entscheidungsfindung oder neue Technologien</strong> —
                  alles Trigger für eine verpflichtende DSFA nach Art. 35 DSGVO. Der AI Act verlangt zusätzlich
                  eine Grundrechte-Folgenabschätzung für Hochrisiko-KI. Planen Sie eine integrierte
                  Prüfung, die beide Anforderungen abdeckt.
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ SOFTWARE-EMPFEHLUNGEN ═══════════════════ */}
      <ToolRecommendation regulationKey="dsgvo" accent="#7c3aed" />

      {/* ═══════════════════ QUELLEN ═══════════════════ */}
      <Section id="quellen" title="Quellen & Offizielle Dokumente">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Alle Informationen in diesem Guide basieren auf den offiziellen EU- und
          {"\u00D6"}sterreich-Dokumenten. Hier finden Sie die Primärquellen:
        </p>

        <SourceList sources={sources} accent="#7c3aed" />

        <div className="mt-6 rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Hinweis:</strong> Dieser Guide dient der Information
            und ersetzt keine Rechtsberatung. Die verlinkten Dokumente sind die offiziellen
            Rechtstexte. Bei Fragen zur konkreten Anwendung auf Ihr Unternehmen empfehlen wir
            die Beratung durch spezialisierte Datenschutz-Anwälte oder zertifizierte Datenschutzbeauftragte.
          </p>
        </div>
      </Section>
    </GuidePageLayout>
  );
}
