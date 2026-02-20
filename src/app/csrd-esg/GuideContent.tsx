"use client";

import { motion } from "framer-motion";
import GuidePageLayout from "@/components/GuidePageLayout";
import type { TocItem } from "@/components/TableOfContents";
import type { QuickFact } from "@/components/GuidePageLayout";
import AccordionSection from "@/components/AccordionSection";
import LawRef from "@/components/LawRef";
import { SourceRef, SourceList, type Source } from "@/components/SourceRef";
import ToolRecommendation from "@/components/ToolRecommendation";

/* ─────────────────── Sources ─────────────────── */
const sources: Source[] = [
  {
    id: 1,
    title: "Richtlinie (EU) 2022/2464 — CSRD (Volltext)",
    url: "https://eur-lex.europa.eu/eli/dir/2022/2464/oj/deu",
    desc: "Offizielle deutsche Fassung der Corporate Sustainability Reporting Directive im EUR-Lex Portal",
    type: "Richtlinie",
  },
  {
    id: 2,
    title: "Delegierte VO (EU) 2023/2772 — ESRS",
    url: "https://eur-lex.europa.eu/eli/del_reg/2023/2772/oj/deu",
    desc: "European Sustainability Reporting Standards — die 12 verbindlichen Berichtsstandards",
    type: "Standards",
  },
  {
    id: 3,
    title: "NaBeG — Nachhaltigkeitsberichterstattung (RIS)",
    url: "https://www.ris.bka.gv.at/Ergebnis.wxe?Abfrage=Bundesnormen&Suchworte=NaBeG",
    desc: "Österreichisches Nachhaltigkeitsberichterstattungsgesetz — nationale Umsetzung der CSRD",
    type: "Nat. Gesetz",
  },
  {
    id: 4,
    title: "Omnibus I — COM(2025) 80",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=COM:2025:80:FIN",
    desc: "Vorschlag der EU-Kommission zur Vereinfachung der Nachhaltigkeitsberichterstattung",
    type: "Entwurf",
  },
  {
    id: 5,
    title: "EFRAG — ESRS Guidance",
    url: "https://www.efrag.org/lab6",
    desc: "European Financial Reporting Advisory Group — Implementierungsleitfäden zu den ESRS",
    type: "Guidance",
  },
  {
    id: 6,
    title: "WKO — Nachhaltigkeitsberichterstattung",
    url: "https://www.wko.at/nachhaltigkeit/nachhaltigkeitsberichterstattung",
    desc: "Wirtschaftskammer Österreich — Praxisleitfaden für österreichische Unternehmen",
    type: "Praxisleitfaden",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Überblick" },
  { id: "timeline", label: "Timeline & Fristen" },
  { id: "betroffene", label: "Wer ist betroffen?" },
  { id: "omnibus", label: "Omnibus I" },
  { id: "esrs-standards", label: "ESRS Standards" },
  { id: "wesentlichkeit", label: "Doppelte Wesentlichkeit" },
  { id: "berichtspflichten", label: "Berichtspflichten" },
  { id: "pruefung", label: "Externe Prüfung" },
  { id: "strafen", label: "Strafen" },
  { id: "oesterreich", label: "Österreich" },
  { id: "fahrplan", label: "Compliance-Fahrplan" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Strafe (AT)", value: "bis 100.000 €" },
  { label: "EU in Kraft seit", value: "5. Jan. 2023" },
  { label: "AT-Umsetzung", value: "NaBeG (ab 2026)" },
  { label: "Betrifft (Omnibus I)", value: "1.000+ MA & 450M+ €" },
  { label: "Standards", value: "12 ESRS" },
  { label: "Rechtsgrundlage", value: "RL (EU) 2022/2464" },
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
  accent = "#16a34a",
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
          done ? "bg-green-600 border-green-600" : active ? "bg-green-600 border-green-600 animate-pulse" : "bg-white border-[#d8dff0]"
        }`} />
        <div className="w-px flex-1 bg-[#e8ecf4] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] font-semibold text-[#7a8db0]">{date}</span>
          {done && <span className="text-[9px] px-2 py-0.5 rounded-md bg-green-50 text-green-700 font-mono font-bold border border-green-200">Erledigt</span>}
          {active && <span className="text-[9px] px-2 py-0.5 rounded-md bg-green-50 text-green-700 font-mono font-bold border border-green-200">Aktiv</span>}
        </div>
        <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">{title}</div>
        <p className="text-[14px] text-[#5a6a8a] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ─────────────────── Roadmap step ─────────────────── */
function RoadmapStep({
  phase, title, items, accent = "#16a34a",
}: { phase: string; title: string; items: string[]; accent?: string }) {
  return (
    <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full" style={{ background: accent }} />
      <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: accent }}>{phase}</div>
      <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
      title="CSRD / ESG"
      subtitle="Corporate Sustainability Reporting Directive: Nachhaltigkeitsberichterstattung, ESRS-Standards, doppelte Wesentlichkeit und Compliance-Fahrplan für österreichische Unternehmen."
      regulationKey="Richtlinie (EU) 2022/2464"
      accent="#16a34a"
      badgeLabel="NaBeG ab 2026"
      badgeColor="#15803d"
      quickFacts={quickFacts}
      tocItems={tocItems}
      trustBadge={{ lastReview: "19.02.2026", sourceCount: 6 }}
      heroIcon={
        <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3.284 14.253A8.96 8.96 0 003 12c0-.778.099-1.533.284-2.253" />
        </svg>
      }
    >
      {/* ═══════════════════ 1. ÜBERBLICK ═══════════════════ */}
      <Section id="ueberblick" title="Überblick: Was ist die CSRD?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Die <strong>Corporate Sustainability Reporting Directive</strong> (Richtlinie (EU) 2022/2464)
          <SourceRef id={1} sources={sources} accent="#16a34a" /> modernisiert und erweitert die
          Nachhaltigkeitsberichterstattung in der EU grundlegend. Sie ersetzt die bisherige{" "}
          <strong>Non-Financial Reporting Directive (NFRD)</strong> aus dem Jahr 2014 und schafft
          erstmals <strong>verbindliche, standardisierte ESG-Berichtspflichten</strong> für
          Unternehmen in der Europäischen Union.
        </p>
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Kernziel der CSRD ist es, die Qualität, Vergleichbarkeit und Zuverlässigkeit von
          Nachhaltigkeitsinformationen auf das Niveau der Finanzberichterstattung zu heben.
          Unternehmen müssen anhand der <strong>European Sustainability Reporting Standards (ESRS)</strong>
          <SourceRef id={2} sources={sources} accent="#16a34a" /> über Umwelt-, Sozial- und
          Governance-Aspekte berichten — einschließlich einer <strong>doppelten
          Wesentlichkeitsanalyse</strong>.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard value="Jan 2023" label="In Kraft" accent="#15803d" />
          <StatCard value="~50.000" label="EU-Unternehmen (Original)" />
          <StatCard value="12" label="ESRS Standards" accent="#16a34a" />
          <StatCard value="2026+" label="AT Anwendung" accent="#059669" />
        </div>

        <div className="rounded-2xl bg-green-50/60 border border-green-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-green-700 mb-1">
                CSRD ersetzt die NFRD
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                Die bisherige NFRD (RL 2014/95/EU) betraf in Österreich nur rund 120 große
                kapitalmarktorientierte Unternehmen und ließ ihnen weitgehend freie Wahl bei
                Format und Methodik. Die CSRD weitet den Anwendungsbereich massiv aus und
                verpflichtet zur Nutzung der einheitlichen ESRS-Standards. Nachhaltigkeits-
                informationen werden damit prüfbar, vergleichbar und maschinenlesbar (iXBRL).
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 2. TIMELINE ═══════════════════ */}
      <Section id="timeline" title="Timeline & Fristen">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Die CSRD sieht eine stufenweise Einführung vor. Durch den Omnibus-I-Vorschlag der
          Kommission sind einige Zeitpläne in Bewegung geraten:
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8">
          <TimelineItem
            date="5. Januar 2023"
            title="CSRD tritt in Kraft"
            description="Die Richtlinie (EU) 2022/2464 tritt in Kraft. Die Mitgliedstaaten haben 18 Monate zur nationalen Umsetzung."
            done
          />
          <TimelineItem
            date="1. Januar 2024"
            title="Wave 1: Große PIEs (>500 MA)"
            description="Unternehmen, die bereits unter die NFRD fielen — große Unternehmen von öffentlichem Interesse mit mehr als 500 Mitarbeitern — berichten erstmals nach ESRS für das Geschäftsjahr 2024."
            done
          />
          <TimelineItem
            date="1. Januar 2025"
            title="Wave 2: Alle großen Unternehmen"
            description={<>Große Unternehmen, die 2 von 3 Kriterien erfüllen: &gt;250 MA, &gt;50 Mio. € Umsatz, &gt;25 Mio. € Bilanzsumme. <strong>Achtung:</strong> Omnibus I sieht Aufschub auf 2027 und deutlich höhere Schwellenwerte vor.<SourceRef id={4} sources={sources} accent="#16a34a" /></>}
            active
          />
          <TimelineItem
            date="1. Januar 2026"
            title="Wave 3: Börsennotierte KMU"
            description="Börsennotierte kleine und mittlere Unternehmen sollten nach vereinfachten ESRS (LSME) berichten. Omnibus I sieht Aufschub auf 2028 und freiwillige Anwendung vor — die Pflicht entfällt weitgehend."
          />
          <TimelineItem
            date="26. Februar 2025"
            title="Omnibus I vorgelegt"
            description={<>Die EU-Kommission legt COM(2025) 80 vor — einen umfassenden Vereinfachungsvorschlag, der den Anwendungsbereich auf Unternehmen mit &gt;1.000 MA und &gt;450 Mio. € Umsatz beschränken und die Fristen um zwei Jahre verschieben soll.<SourceRef id={4} sources={sources} accent="#16a34a" /></>}
            active
          />
          <TimelineItem
            date="2026+"
            title="NaBeG — Umsetzung in Österreich"
            description={<>Österreich setzt die CSRD durch das Nachhaltigkeitsberichterstattungsgesetz (NaBeG) in nationales Recht um.<SourceRef id={3} sources={sources} accent="#16a34a" /> Die genauen Anwendungszeitpunkte hängen vom Fortgang des Omnibus-I-Verfahrens ab.</>}
          />
        </div>

        <div className="rounded-2xl bg-amber-50/60 border border-amber-200/50 p-5 mt-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-amber-700 mb-1">
                Omnibus I: Timeline in Bewegung
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                Der Omnibus-I-Vorschlag sieht eine Verschiebung der Anwendungszeitpunkte
                um zwei Jahre vor (Wave 2 auf 2027, Wave 3 auf 2028). Solange das Gesetzgebungsverfahren
                nicht abgeschlossen ist, gelten formal die ursprünglichen CSRD-Fristen fort.
                Unternehmen sollten flexibel planen und die Vorbereitungen nicht aussetzen.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 3. WER IST BETROFFEN? ═══════════════════ */}
      <Section id="betroffene" title="Wer ist betroffen?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Die CSRD hat den Anwendungsbereich gegenüber der NFRD massiv ausgeweitet. Mit dem
          Omnibus-I-Vorschlag zeichnet sich jedoch eine deutliche Reduzierung ab. Beide
          Schwellenwerte im Vergleich:
        </p>

        <AccordionSection
          accent="#16a34a"
          items={[
            {
              title: "Ursprüngliche CSRD-Schwellenwerte (aktuell geltendes Recht)",
              content: (
                <div>
                  <p className="mb-3">
                    Betroffen sind Unternehmen, die mindestens <strong>zwei von drei</strong> Kriterien erfüllen:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>250+ Mitarbeiter</strong></li>
                    <li><strong>50 Mio. € Nettoumsatz</strong></li>
                    <li><strong>25 Mio. € Bilanzsumme</strong></li>
                  </ul>
                  <p className="mt-3 text-[13px] text-[#7a8db0]">
                    Dazu kommen alle kapitalmarktorientierten Unternehmen (einschließlich
                    börsennotierter KMU, außer Kleinstunternehmen) sowie alle Versicherungs-
                    unternehmen und Kreditinstitute unabhängig von der Größe.
                    Geschätzter Scope: ca. 50.000 Unternehmen EU-weit.
                  </p>
                </div>
              ),
            },
            {
              title: "Omnibus-I-Vorschlag: Neue Schwellenwerte (Entwurf)",
              content: (
                <div>
                  <p className="mb-3">
                    Der Omnibus-I-Vorschlag<SourceRef id={4} sources={sources} accent="#16a34a" /> sieht eine drastische Einschränkung vor.
                    Beide Kriterien müssen <strong>gleichzeitig</strong> erfüllt sein:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>1.000+ Mitarbeiter</strong> (statt 250)</li>
                    <li><strong>450 Mio. € Nettoumsatz</strong> (statt 50 Mio. €)</li>
                  </ul>
                  <p className="mt-3 text-[13px] text-[#7a8db0]">
                    Geschätzter Scope: ca. 5.500 Unternehmen EU-weit statt ca. 50.000.
                    Kleinere Unternehmen können freiwillig nach vereinfachten
                    Standards berichten (Voluntary VSME).
                  </p>
                </div>
              ),
            },
            {
              title: "Drittstaatenunternehmen",
              content: (
                <p>
                  Unternehmen aus Drittstaaten mit einem Nettoumsatz von mehr als 150 Mio. €
                  in der EU und mindestens einer Tochtergesellschaft oder Zweigniederlassung
                  in der EU fallen ebenfalls unter die CSRD. Auch diese Schwelle könnte durch
                  Omnibus I angehoben werden (auf 450 Mio. €).
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 4. OMNIBUS I ═══════════════════ */}
      <Section id="omnibus" title="Omnibus I: Was ändert sich?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Am 26. Februar 2025 hat die EU-Kommission den <strong>Omnibus-I-Vorschlag</strong>{" "}
          (COM(2025) 80)<SourceRef id={4} sources={sources} accent="#16a34a" /> vorgelegt — ein
          umfassendes Vereinfachungspaket, das die CSRD, die EU-Taxonomie und die
          Lieferketten-Richtlinie (CSDDD) betrifft. Die wichtigsten Änderungen:
        </p>

        <div className="space-y-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-green-700 mb-2">
              Anwendungsbereich
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Drastische Reduzierung des Scope
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Nur noch Unternehmen mit mehr als 1.000 Mitarbeitern UND mehr als 450 Mio. €
              Nettoumsatz sind verpflichtend berichtspflichtig. Börsennotierte KMU werden
              vollständig aus der Pflicht entlassen. Geschätzter EU-Scope sinkt von ca. 50.000
              auf ca. 5.500 Unternehmen.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-green-700 mb-2">
              Freiwilligkeit
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Vereinfachte Standards für freiwillige Berichterstatter
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Unternehmen, die nicht mehr unter die Pflicht fallen, können freiwillig nach
              vereinfachten Standards (Voluntary SME Standard — VSME) berichten. Das sichert
              den Zugang zu grüner Finanzierung und erfüllt Informationswünsche der Lieferkette,
              ohne den vollen ESRS-Aufwand.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-green-700 mb-2">
              Zeitplan
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Verschiebung der Anwendungszeitpunkte
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Wave 2 (große Unternehmen) wird um zwei Jahre auf das Geschäftsjahr 2027
              verschoben, Wave 3 (börsennotierte KMU) auf 2028. Wave 1 (große PIEs &gt;500 MA)
              bleibt unberührt und berichtet bereits seit dem Geschäftsjahr 2024.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-green-700 mb-2">
              Vereinfachung
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Datenpunkte und Taxonomie-Anforderungen reduziert
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Die Kommission kündigt eine Reduktion der obligatorischen ESRS-Datenpunkte um
              bis zu 70–80 % an. Die EU-Taxonomie-Berichterstattung soll vereinfacht und
              sektorspezifische Standards vorerst ausgesetzt werden. Das Value-Chain-Reporting
              wird auf die direkte Lieferkette begrenzt.
            </p>
          </motion.div>
        </div>

        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/40 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-amber-700 mb-1">
                Wichtig: Omnibus I ist noch ein Entwurf
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                COM(2025) 80 ist ein Vorschlag der EU-Kommission und muss noch das ordentliche
                Gesetzgebungsverfahren durchlaufen (Europäisches Parlament und Rat der EU).
                Änderungen am Entwurf sind wahrscheinlich. Bis zum Inkrafttreten des Omnibus
                gelten die <strong>aktuellen CSRD-Schwellenwerte und -Fristen</strong> fort.
                Unternehmen sollten ihre Vorbereitungen fortsetzen und flexibel planen.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 5. ESRS STANDARDS ═══════════════════ */}
      <Section id="esrs-standards" title="ESRS Standards im Überblick">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Die <strong>European Sustainability Reporting Standards (ESRS)</strong>
          <SourceRef id={2} sources={sources} accent="#16a34a" /> bilden das inhaltliche Gerüst
          der CSRD-Berichterstattung. Entwickelt von der EFRAG<SourceRef id={5} sources={sources} accent="#16a34a" />,
          umfassen sie 12 Standards in vier Gruppen:
        </p>

        <div className="space-y-6">
          {/* Cross-cutting */}
          <div>
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-green-700 mb-3 px-1">
              Querschnittsstandards
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { code: "ESRS 1", name: "Allgemeine Anforderungen", desc: "Grundlegende Prinzipien, Struktur und Konventionen der Berichterstattung" },
                { code: "ESRS 2", name: "Allgemeine Angaben", desc: "Pflichtangaben zu Governance, Strategie, Wesentlichkeitsanalyse und Metriken (für alle Unternehmen verpflichtend)" },
              ].map((item) => (
                <motion.div
                  key={item.code}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border-2 border-green-200 bg-green-50/30 p-5"
                >
                  <div className="font-mono text-[11px] font-bold text-green-700 mb-1">{item.code}</div>
                  <h4 className="font-[Syne] font-bold text-[14px] text-[#060c1a] mb-1">{item.name}</h4>
                  <p className="text-[13px] text-[#5a6a8a] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Environment */}
          <div>
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-emerald-700 mb-3 px-1">
              Umwelt (Environment)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { code: "E1", name: "Klimawandel", desc: "THG-Emissionen (Scope 1–3), Transitionsplan, physische Risiken" },
                { code: "E2", name: "Umweltverschmutzung", desc: "Emissionen in Luft, Wasser und Boden, Schadstoffe" },
                { code: "E3", name: "Wasser- und Meeresressourcen", desc: "Wasserverbrauch, -entnahme und Auswirkungen auf Gewässer" },
                { code: "E4", name: "Biologische Vielfalt", desc: "Auswirkungen auf Ökosysteme, Landnutzung, Artenvielfalt" },
                { code: "E5", name: "Ressourcennutzung und Kreislaufwirtschaft", desc: "Materialströme, Abfall, Kreislaufwirtschaftsstrategien" },
              ].map((item) => (
                <motion.div
                  key={item.code}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-[#d8dff0] bg-white p-5"
                >
                  <div className="font-mono text-[11px] font-bold text-emerald-600 mb-1">{item.code}</div>
                  <h4 className="font-[Syne] font-bold text-[14px] text-[#060c1a] mb-1">{item.name}</h4>
                  <p className="text-[13px] text-[#5a6a8a] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-blue-700 mb-3 px-1">
              Soziales (Social)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { code: "S1", name: "Eigene Belegschaft", desc: "Arbeitsbedingungen, Gesundheit, Diversität, Vergütung" },
                { code: "S2", name: "Beschäftigte in der Wertschöpfungskette", desc: "Arbeitnehmerrechte bei Lieferanten und Subunternehmern" },
                { code: "S3", name: "Betroffene Gemeinschaften", desc: "Auswirkungen auf lokale Gemeinden und indigene Völker" },
                { code: "S4", name: "Verbraucher und Endnutzer", desc: "Produktsicherheit, Datenschutz, Zugang zu Produkten" },
              ].map((item) => (
                <motion.div
                  key={item.code}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-[#d8dff0] bg-white p-5"
                >
                  <div className="font-mono text-[11px] font-bold text-blue-600 mb-1">{item.code}</div>
                  <h4 className="font-[Syne] font-bold text-[14px] text-[#060c1a] mb-1">{item.name}</h4>
                  <p className="text-[13px] text-[#5a6a8a] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Governance */}
          <div>
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-violet-700 mb-3 px-1">
              Governance
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-[#d8dff0] bg-white p-5"
              >
                <div className="font-mono text-[11px] font-bold text-violet-600 mb-1">G1</div>
                <h4 className="font-[Syne] font-bold text-[14px] text-[#060c1a] mb-1">Unternehmenspolitik</h4>
                <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
                  Unternehmenskultur, Antikorruption, Lobbying, Zahlungspraktiken,
                  politische Einflussnahme und Lieferantenbeziehungen
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5 mt-6">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Wesentlichkeitsprinzip:</strong> Nur ESRS 2
            (Allgemeine Angaben) ist für alle berichtspflichtigen Unternehmen verpflichtend.
            Die thematischen Standards E1–E5, S1–S4 und G1 müssen nur berichtet werden, wenn
            das jeweilige Thema in der doppelten Wesentlichkeitsanalyse als wesentlich
            identifiziert wurde.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 6. DOPPELTE WESENTLICHKEIT ═══════════════════ */}
      <Section id="wesentlichkeit" title="Doppelte Wesentlichkeit (Double Materiality)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Die <strong>doppelte Wesentlichkeitsanalyse</strong> ist das Herzstück der CSRD-Berichterstattung.
          Unternehmen müssen jeden ESG-Aspekt aus zwei Perspektiven bewerten — und berichten,
          wenn mindestens eine Dimension wesentlich ist:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl border-2 border-green-300 bg-green-50/40 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-green-700">
                Inside-Out
              </div>
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Impact Materiality
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Welche <strong>tatsächlichen oder potenziellen Auswirkungen</strong> hat die
              Geschäftstätigkeit des Unternehmens auf Umwelt und Gesellschaft? Dabei werden
              sowohl positive als auch negative Auswirkungen berücksichtigt — kurz-, mittel-
              und langfristig.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-blue-300 bg-blue-50/40 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-blue-700">
                Outside-In
              </div>
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Financial Materiality
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Welche <strong>finanziellen Risiken und Chancen</strong> entstehen für das
              Unternehmen aus Nachhaltigkeitsaspekten? Zum Beispiel: Kosten durch
              CO2-Bepreisung, Umsatzchancen durch nachhaltige Produkte oder
              Reputationsrisiken bei Umweltskandalen.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-green-50/60 border border-green-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-green-700 mb-1">
                Beide Dimensionen prüfen
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                Ein Nachhaltigkeitsaspekt ist berichtspflichtig, wenn er unter <strong>mindestens
                einer</strong> der beiden Dimensionen als wesentlich eingestuft wird. Auch wenn
                ein Thema finanziell unerheblich erscheint, kann es aufgrund seiner
                Auswirkung auf Umwelt oder Gesellschaft berichtspflichtig sein — und umgekehrt.
                Die Wesentlichkeitsanalyse muss dokumentiert und vom Wirtschaftsprüfer
                überprüft werden.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 7. BERICHTSPFLICHTEN ═══════════════════ */}
      <Section id="berichtspflichten" title="Berichtspflichten & Format">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Die CSRD stellt hohe Anforderungen an Format, Inhalt und Integration des
          Nachhaltigkeitsberichts in die bestehende Unternehmensberichterstattung:
        </p>

        <AccordionSection
          accent="#16a34a"
          items={[
            {
              title: "Integration in den Lagebericht",
              content: (
                <p>
                  Der Nachhaltigkeitsbericht wird als eigenständiger Abschnitt in den
                  Lagebericht (Management Report) integriert — nicht als separater Bericht.
                  Dies unterstreicht die Gleichwertigkeit von Finanz- und Nachhaltigkeits-
                  informationen und stellt sicher, dass der Bericht denselben Veröffentlichungs-
                  und Prüfungspflichten unterliegt wie der Jahresabschluss.
                </p>
              ),
            },
            {
              title: "Digitales Format: XHTML und iXBRL-Tagging",
              content: (
                <div>
                  <p className="mb-3">
                    Der Lagebericht muss im ESEF-konformen XHTML-Format erstellt werden.
                    Nachhaltigkeitsinformationen müssen digital getaggt werden (iXBRL —
                    Inline eXtensible Business Reporting Language), damit sie maschinenlesbar
                    und automatisch auswertbar sind.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>ESEF-Verordnung (Single Electronic Reporting Format)</li>
                    <li>iXBRL-Tags für alle quantitativen und ausgewählte qualitative Angaben</li>
                    <li>Ermöglicht automatisierte Vergleichbarkeit über Unternehmen und Jahre hinweg</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Quantitative und qualitative Angaben",
              content: (
                <div>
                  <p className="mb-3">
                    Die ESRS verlangen eine Mischung aus numerischen Kennzahlen (KPIs),
                    narrativen Beschreibungen und strategischen Zielen:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>Metriken:</strong> THG-Emissionen (Scope 1–3), Energieverbrauch, Wasserentnahme, Gender Pay Gap etc.</li>
                    <li><strong>Policies:</strong> Dokumentierte Richtlinien zu jedem wesentlichen Thema</li>
                    <li><strong>Targets:</strong> Messbare Ziele mit Zeitrahmen und Basisjahr</li>
                    <li><strong>Actions:</strong> Beschreibung konkreter Maßnahmen und deren Fortschritt</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Zukunftsgerichtete Informationen",
              content: (
                <p>
                  Die CSRD verlangt nicht nur rückblickende Daten, sondern auch
                  zukunftsgerichtete Informationen: Transitionspläne (insbesondere für
                  Klimaziele), mittel- und langfristige Zielsetzungen, Szenarioanalysen
                  und erwartete finanzielle Auswirkungen von Nachhaltigkeitsrisiken und
                  -chancen. Für Klimarisiken wird der Abgleich mit dem 1,5-Grad-Ziel des
                  Pariser Abkommens erwartet.
                </p>
              ),
            },
            {
              title: "Wertschöpfungskette (Value Chain)",
              content: (
                <p>
                  Die Berichterstattung erstreckt sich auf die gesamte Wertschöpfungskette —
                  sowohl upstream (Lieferanten, Rohstoffe) als auch downstream (Kunden,
                  Endnutzer). Der Omnibus-I-Vorschlag sieht eine Begrenzung auf die
                  direkte Lieferkette vor, um den Erhebungsaufwand zu reduzieren. Bis zur
                  Verabschiedung gilt der volle Value-Chain-Scope.
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 8. EXTERNE PRÜFUNG ═══════════════════ */}
      <Section id="pruefung" title="Externe Prüfung (Assurance)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Eine der wichtigsten Neuerungen der CSRD: Der Nachhaltigkeitsbericht muss
          <strong> extern geprüft</strong> werden — erstmals in der Geschichte der EU-Nachhaltigkeitsberichterstattung.
        </p>

        <AccordionSection
          accent="#16a34a"
          items={[
            {
              title: "Limited Assurance (erste Phase)",
              content: (
                <div>
                  <p className="mb-3">
                    In der ersten Phase ist eine Prüfung mit <strong>begrenzter Sicherheit
                    (Limited Assurance)</strong> vorgesehen. Das Prüfniveau entspricht in etwa
                    einem Review — der Prüfer gibt an, dass ihm keine wesentlichen Fehler
                    aufgefallen sind.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Weniger umfangreich als die Prüfung des Jahresabschlusses</li>
                    <li>Fokus auf Plausibilität, Konsistenz und Vollständigkeit</li>
                    <li>Prüfung der Wesentlichkeitsanalyse und der angewandten Methodik</li>
                    <li>Negative Bestätigung: Keine wesentlichen Fehler festgestellt</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Reasonable Assurance (geplant für die Zukunft)",
              content: (
                <p>
                  Die CSRD sieht vor, dass die EU-Kommission bis 2028 prüft, ob ein Übergang
                  zu <strong>hinreichender Sicherheit (Reasonable Assurance)</strong> möglich
                  und sinnvoll ist. Reasonable Assurance entspricht dem Prüfniveau des
                  Jahresabschlusses und würde eine positive Bestätigung erfordern — deutlich
                  aufwändiger und kostenintensiver als Limited Assurance. Der Omnibus-I-Vorschlag
                  macht diesen Übergang vorerst unwahrscheinlicher.
                </p>
              ),
            },
            {
              title: "Wer darf prüfen?",
              content: (
                <div>
                  <p className="mb-3">
                    In Österreich sind in erster Linie <strong>Wirtschaftsprüfer</strong> und
                    Wirtschaftsprüfungsgesellschaften zur Prüfung des Nachhaltigkeitsberichts
                    befugt. Die Mitgliedstaaten können zusätzlich unabhängige Assurance-Anbieter
                    (IASP) zulassen.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Prüfer müssen über Nachhaltigkeits-Fachkenntnisse verfügen</li>
                    <li>Unabhängigkeitsanforderungen analog zur Abschlussprüfung</li>
                    <li>Der gleiche Prüfer kann Jahresabschluss und Nachhaltigkeitsbericht prüfen</li>
                    <li>Prüfung der iXBRL-Tags und der maschinenlesbaren Aufbereitung</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 9. STRAFEN ═══════════════════ */}
      <Section id="strafen" title="Bußgelder & Strafen">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Die CSRD selbst definiert keine konkreten Bußgeldobergrenzen — dies liegt in der
          Zuständigkeit der Mitgliedstaaten. In Österreich sieht das NaBeG
          <SourceRef id={3} sources={sources} accent="#16a34a" /> empfindliche Sanktionen vor:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <StatCard value="100.000 €" label="Maximale Geldstrafe (AT)" accent="#dc2626" />
          <StatCard value="2x" label="Bei Wiederholung" accent="#ea580c" />
          <StatCard value="Persönlich" label="Organhaftung" accent="#b91c1c" />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-red-200 bg-red-50/30 p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Geldstrafen nach NaBeG
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Das NaBeG sieht Geldstrafen von <strong>bis zu 100.000 €</strong> für
              Verstöße gegen die Berichtspflichten vor. Bei wiederholten Verstößen kann
              sich die Strafe verdoppeln. Sanktioniert werden insbesondere: unterlassene
              oder verspätete Berichterstattung, wesentliche Fehler im Bericht, Verstoß
              gegen die Prüfungspflicht und fehlende oder unzureichende Wesentlichkeitsanalyse.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Zivilrechtliche Haftung
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Neben den verwaltungsrechtlichen Strafen können Organmitglieder (Vorstand,
              Geschäftsführer, Aufsichtsrat) für Schäden aus fehlerhafter oder unterlassener
              Nachhaltigkeitsberichterstattung <strong>persönlich haftbar</strong> gemacht
              werden. Die Haftung ergibt sich aus der allgemeinen Sorgfaltspflicht nach{" "}
              <LawRef law="GmbHG" paragraph="25" /> bzw.{" "}
              <LawRef law="AktG" paragraph="84" />.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Reputationsschäden
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Über die rechtlichen Sanktionen hinaus drohen erhebliche Reputationsschäden:
              Investoren, Kunden und Geschäftspartner erwarten zunehmend transparente
              ESG-Berichterstattung. Ein fehlender oder mangelhafter Bericht kann den
              Zugang zu Kapital (ESG-Fonds, Green Bonds) und öffentlichen Aufträgen
              erschweren und das Arbeitgeberimage beschädigen.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 10. ÖSTERREICH ═══════════════════ */}
      <Section id="oesterreich" title="CSRD in Österreich (NaBeG)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Österreich setzt die CSRD durch das <strong>Nachhaltigkeitsberichterstattungsgesetz
          (NaBeG)</strong><SourceRef id={3} sources={sources} accent="#16a34a" /> in nationales Recht
          um. Die WKO<SourceRef id={6} sources={sources} accent="#16a34a" /> bietet begleitende
          Praxisleitfäden für österreichische Unternehmen.
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}>
                <span className="text-white text-sm font-bold">AT</span>
              </div>
              <div>
                <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
                  NaBeG — Nationale Umsetzung
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
                  Das NaBeG übernimmt die CSRD-Anforderungen in das österreichische
                  Unternehmensrecht (UGB). Es regelt die Berichtspflichten, die
                  Prüfungsanforderungen und die Sanktionen für österreichische Unternehmen.
                  Die Anwendungszeitpunkte richten sich nach den CSRD-Waves und werden
                  gegebenenfalls an den Omnibus-I-Beschluss angepasst.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-green-50 text-green-700 font-mono border border-green-200">UGB-Integration</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-green-50 text-green-700 font-mono border border-green-200">Prüfungspflicht</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-green-50 text-green-700 font-mono border border-green-200">Sanktionsregime</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              WKO-Unterstützung
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Die Wirtschaftskammer Österreich (WKO) bietet umfangreiche Praxisleitfäden,
              Webinare und Beratungsangebote zur CSRD-Umsetzung an. Besonders für KMU, die
              als Teil der Lieferkette indirekt betroffen sind, gibt es spezifische
              Hilfestellungen zur freiwilligen Berichterstattung nach dem VSME-Standard.
            </p>
          </div>

          <div className="rounded-2xl bg-green-50/60 border border-green-200/50 p-5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-[Syne] font-bold text-sm text-green-700 mb-1">
                  Aktueller Status der Umsetzung
                </p>
                <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                  Die österreichische Umsetzung ist eng mit dem Fortgang des Omnibus-I-
                  Verfahrens auf EU-Ebene verknüpft. Der Gesetzgeber hat signalisiert, die
                  nationalen Anwendungszeitpunkte an die endgültige EU-Regelung anzupassen,
                  um doppelte Umstellungen für Unternehmen zu vermeiden. Unternehmen der
                  Wave 1 (große PIEs &gt;500 MA) berichten bereits für das Geschäftsjahr 2024
                  nach ESRS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 11. COMPLIANCE-FAHRPLAN ═══════════════════ */}
      <Section id="fahrplan" title="Ihr Compliance-Fahrplan">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          In fünf Phasen zum CSRD-konformen Nachhaltigkeitsbericht. Unabhängig vom
          Omnibus-I-Ausgang sollten betroffene Unternehmen jetzt mit der Vorbereitung
          beginnen — Datenerhebung und Prozessaufbau brauchen Zeit.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <RoadmapStep
            phase="Phase 1 — Sofort"
            title="Gap-Analyse & Betroffenheit"
            accent="#16a34a"
            items={[
              "CSRD-Betroffenheit klären (Wave 1, 2 oder 3?)",
              "Omnibus-I-Status beobachten und einplanen",
              "Bestehendes Reporting auf ESRS-Lücken analysieren",
              "Projektteam aufsetzen (Finanzen, Nachhaltigkeit, IT)",
            ]}
          />
          <RoadmapStep
            phase="Phase 2 — Monat 1–3"
            title="Doppelte Wesentlichkeitsanalyse"
            accent="#15803d"
            items={[
              "Stakeholder-Mapping und -Befragung durchführen",
              "Impact Materiality bewerten (Inside-Out)",
              "Financial Materiality bewerten (Outside-In)",
              "Wesentliche ESRS-Themen identifizieren und dokumentieren",
            ]}
          />
          <RoadmapStep
            phase="Phase 3 — Monat 3–9"
            title="Datenerhebung & Systeme"
            accent="#059669"
            items={[
              "Datenanforderungen je wesentlichem ESRS-Thema definieren",
              "Datenquellen identifizieren (intern + Lieferkette)",
              "ESG-Datenmanagement-System auswählen und implementieren",
              "Baseline-Daten erheben und Datenlücken schließen",
            ]}
          />
          <RoadmapStep
            phase="Phase 4 — Monat 9–12"
            title="Berichtserstellung"
            accent="#0d9488"
            items={[
              "ESRS-konformen Berichtsentwurf erstellen",
              "iXBRL-Tagging vorbereiten (ESEF-Konformität)",
              "Integration in den Lagebericht sicherstellen",
              "Internes Review durch Fachabteilungen",
            ]}
          />
          <RoadmapStep
            phase="Phase 5 — Laufend"
            title="Prüfung & Veröffentlichung"
            accent="#0891b2"
            items={[
              "Wirtschaftsprüfer für Limited Assurance beauftragen",
              "Prüfungsprozess durchführen und Feststellungen beheben",
              "Bericht veröffentlichen (mit Lagebericht)",
              "Lessons Learned und Prozessoptimierung für das Folgejahr",
            ]}
          />
        </div>

        <ToolRecommendation regulationKey="csrd" accent="#16a34a" />
      </Section>

      {/* ═══════════════════ 12. FAQ ═══════════════════ */}
      <Section id="faq" title="Häufige Fragen (FAQ)">
        <AccordionSection
          accent="#16a34a"
          allowMultiple
          items={[
            {
              title: "Muss unser Unternehmen bereits jetzt nach CSRD berichten?",
              content: (
                <p>
                  Das hängt von Ihrer Wave-Zuordnung ab. <strong>Wave 1</strong> (große PIEs
                  mit &gt;500 MA, die bereits unter die NFRD fielen) berichtet seit dem
                  Geschäftsjahr 2024. <strong>Wave 2</strong> (alle großen Unternehmen) ist
                  formal ab Geschäftsjahr 2025 dran, der Omnibus-I-Vorschlag sieht aber eine
                  Verschiebung auf 2027 vor. Prüfen Sie Ihre Betroffenheit anhand der
                  aktuellen und der vorgeschlagenen Schwellenwerte.
                </p>
              ),
            },
            {
              title: "Was bedeutet Omnibus I konkret für unser Unternehmen?",
              content: (
                <div>
                  <p className="mb-3">
                    Falls der Omnibus-I-Vorschlag in der aktuellen Form angenommen wird:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Unternehmen unter 1.000 Mitarbeitern oder unter 450 Mio. € Umsatz fallen aus der Pflicht</li>
                    <li>Wave 2 und Wave 3 werden um jeweils zwei Jahre verschoben</li>
                    <li>Freiwillige Berichterstattung nach vereinfachtem VSME-Standard bleibt möglich</li>
                    <li>Weniger Datenpunkte und vereinfachte Taxonomie-Angaben</li>
                  </ul>
                  <p className="mt-3 text-[13px] text-[#7a8db0]">
                    Achtung: Der Omnibus ist noch nicht beschlossen. Unternehmen sollten die
                    Entwicklung genau beobachten und flexibel planen.
                  </p>
                </div>
              ),
            },
            {
              title: "Brauchen wir einen Wirtschaftsprüfer für den Nachhaltigkeitsbericht?",
              content: (
                <p>
                  Ja. Die CSRD verlangt eine externe Prüfung (Assurance) des Nachhaltigkeits-
                  berichts. In der ersten Phase ist Limited Assurance vorgesehen — ein
                  geringeres Prüfniveau als beim Jahresabschluss, aber dennoch eine
                  unabhängige Überprüfung durch einen zugelassenen Wirtschaftsprüfer. Der
                  gleiche Prüfer, der den Jahresabschluss prüft, kann auch den Nachhaltigkeits-
                  bericht prüfen.
                </p>
              ),
            },
            {
              title: "Was ist der Unterschied zwischen CSRD und EU-Taxonomie?",
              content: (
                <p>
                  Die CSRD regelt <strong>was</strong> und <strong>wie</strong> Unternehmen
                  über Nachhaltigkeit berichten müssen (Berichterstattungsrahmen). Die
                  EU-Taxonomie ist ein <strong>Klassifikationssystem</strong>, das definiert,
                  welche Wirtschaftstätigkeiten als ökologisch nachhaltig gelten. Beide greifen
                  ineinander: Im Rahmen der CSRD-Berichterstattung müssen Unternehmen auch
                  Taxonomie-Kennzahlen offenlegen (Umsatz, CapEx, OpEx aus taxonomiekonformen
                  Aktivitäten).
                </p>
              ),
            },
            {
              title: "Welche Daten müssen wir aus der Lieferkette erheben?",
              content: (
                <div>
                  <p className="mb-3">
                    Die ESRS verlangen Informationen über die gesamte Wertschöpfungskette:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Scope-3-THG-Emissionen (indirekte Emissionen der Lieferkette)</li>
                    <li>Arbeitsbedingungen bei Lieferanten (ESRS S2)</li>
                    <li>Menschenrechtliche Sorgfaltspflichten</li>
                    <li>Umweltauswirkungen vorgelagerter Aktivitäten</li>
                  </ul>
                  <p className="mt-3 text-[13px] text-[#7a8db0]">
                    Der Omnibus-I-Vorschlag sieht eine Begrenzung auf die direkte Lieferkette
                    vor (Tier 1). Falls Primärdaten nicht verfügbar sind, können sektorspezifische
                    Durchschnittswerte und Schätzungen verwendet werden.
                  </p>
                </div>
              ),
            },
            {
              title: "Können KMU freiwillig berichten?",
              content: (
                <p>
                  Ja. Die EFRAG hat einen eigenen vereinfachten Standard für freiwillige
                  Berichterstatter entwickelt (VSME — Voluntary Standard for SMEs). Dieser
                  umfasst deutlich weniger Datenpunkte als die vollen ESRS und ist speziell
                  auf die Ressourcen kleinerer Unternehmen zugeschnitten. Freiwillige
                  Berichterstattung kann strategisch sinnvoll sein, um Anforderungen von
                  Banken, Investoren und großen Kunden in der Lieferkette zu erfüllen.
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ QUELLEN ═══════════════════ */}
      <Section id="quellen" title="Quellen & Offizielle Dokumente">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Alle Informationen in diesem Guide basieren auf den offiziellen EU- und
          Österreich-Dokumenten. Hier finden Sie die Primärquellen:
        </p>

        <SourceList sources={sources} accent="#16a34a" />

        <div className="mt-6 rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Hinweis:</strong> Dieser Guide dient der Information
            und ersetzt keine Rechtsberatung. Die verlinkten Dokumente sind die offiziellen
            Rechtstexte. Bei Fragen zur konkreten Anwendung auf Ihr Unternehmen empfehlen wir
            die Beratung durch spezialisierte Rechtsanwälte, Wirtschaftsprüfer oder
            Nachhaltigkeitsberater. Der Omnibus-I-Prozess ist zum Zeitpunkt der letzten
            Aktualisierung (Februar 2026) noch nicht abgeschlossen.
          </p>
        </div>
      </Section>
    </GuidePageLayout>
  );
}
