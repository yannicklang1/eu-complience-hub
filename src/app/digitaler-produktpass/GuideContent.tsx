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
    title: "Verordnung (EU) 2024/1781 — Ökodesign für nachhaltige Produkte (ESPR)",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R1781",
    desc: "Rechtsgrundlage für den Digitalen Produktpass — in Kraft seit Juli 2024",
    type: "Verordnung",
  },
  {
    id: 2,
    title: "EU-Kommission — Digital Product Passport",
    url: "https://environment.ec.europa.eu/topics/circular-economy/digital-product-passport_en",
    desc: "Offizielle Informationsseite der EU-Kommission zum DPP",
    type: "Behörde",
  },
  {
    id: 3,
    title: "Verordnung (EU) 2023/1542 — Batterien-Verordnung (DPP für Batterien)",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32023R1542",
    desc: "Erste Produktgruppe mit DPP-Pflicht ab Februar 2027",
    type: "Verordnung",
  },
  {
    id: 4,
    title: "ECOS — Digital Product Passport Position Paper",
    url: "https://ecostandard.org/wp-content/uploads/2023/03/ECOS-DPP-Position-Paper.pdf",
    desc: "Technische Analyse des DPP-Konzepts",
    type: "Studie",
  },
  {
    id: 5,
    title: "GS1 — Digital Product Passport Standards",
    url: "https://www.gs1.org/standards/digital-product-passport",
    desc: "Industriestandards für DPP-Implementierung (Barcode, RFID, QR-Code)",
    type: "Norm",
  },
  {
    id: 6,
    title: "Textilfaser-Verordnung — DPP für Textilien",
    url: "https://environment.ec.europa.eu/topics/circular-economy/textiles_en",
    desc: "EU-Strategie für nachhaltige Textilien und DPP-Anforderungen",
    type: "Behörde",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Überblick" },
  { id: "timeline", label: "Timeline & Fristen" },
  { id: "betroffene", label: "Wer ist betroffen?" },
  { id: "produktgruppen", label: "Produktgruppen" },
  { id: "dateninhalte", label: "Dateninhalte & Pflichtfelder" },
  { id: "traegermedien", label: "Datenträger & Zugang" },
  { id: "batterien", label: "Batterie-DPP (2027)" },
  { id: "textilien", label: "Textilien-DPP" },
  { id: "technische-umsetzung", label: "Technische Umsetzung" },
  { id: "datenschutz", label: "Datenschutz & Zugriffsrechte" },
  { id: "marktüberwachung", label: "Marktüberwachung" },
  { id: "zusammenspiel", label: "Zusammenspiel mit anderen Gesetzen" },
  { id: "fahrplan", label: "Compliance-Fahrplan" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "ESPR in Kraft", value: "Juli 2024" },
  { label: "Batterien DPP ab", value: "Feb. 2027" },
  { label: "Textilien DPP ab", value: "2027/2028 (geplant)" },
  { label: "Betrifft", value: "Hersteller, Importeure" },
  { label: "Datenträger", value: "QR-Code / RFID / NFC" },
  { label: "Speicher", value: "Dezentral, 10+ Jahre" },
];

/* ─────────────────── Accent ─────────────────── */
const ACCENT = "#14b8a6";

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
  const fontSize = value.length > 14 ? "text-lg sm:text-xl" : value.length > 8 ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl";
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
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "bg-[#14b8a6] border-[#14b8a6]" : active ? "bg-white border-[#14b8a6] ring-4 ring-teal-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done ? "text-[#14b8a6]" : active ? "text-[#14b8a6]" : "text-[#7a8db0]"}`}>
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
export default function DppGuideContent() {
  return (
    <GuidePageLayout
      title="Digitaler Produktpass (DPP)"
      subtitle="Der EU-weite digitale Ausweis für Produkte: Nachhaltigkeitsdaten, Reparierbarkeit und Kreislaufwirtschaftsinformationen auf einen Scan."
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      regulationKey="dpp"
      href="/digitaler-produktpass"
    >
      {/* ═══════════════ 1. ÜBERBLICK ═══════════════ */}
      <Section id="ueberblick" title="Überblick: Was ist der Digitale Produktpass?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Der <strong>Digitale Produktpass (DPP)</strong> ist eine EU-weite digitale Datenstruktur,
          die produktbezogene Informationen über den gesamten Lebenszyklus eines Produkts zugänglich
          macht — von der Rohstoffgewinnung über die Produktion bis zur Entsorgung.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Rechtsgrundlage ist die <strong>Ökodesign-Verordnung für nachhaltige Produkte (ESPR)</strong>
          (EU 2024/1781), die im Juli 2024 in Kraft trat. Der DPP ist kein einheitliches System, sondern
          wird für jede Produktgruppe durch delegierte Rechtsakte spezifiziert.
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Ziel des DPP ist die Förderung der Kreislaufwirtschaft: Verbraucher, Reparaturbetriebe,
          Recycler und Behörden erhalten strukturierten Zugang zu Informationen über Materialien,
          Reparierbarkeit, Ersatzteile und ordnungsgemäße Entsorgung.
          <SourceRef id={2} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="30+" label="Geplante Produktgruppen" />
          <StatCard value="10 J." label="Mindestspeicherdauer" />
          <StatCard value="2027" label="Erste DPP-Pflicht (Batterien)" />
        </div>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Fristen">
        <div className="space-y-0">
          <TimelineItem
            date="Juli 2024"
            title="ESPR tritt in Kraft"
            description="Die Ökodesign-Verordnung für nachhaltige Produkte (EU 2024/1781) tritt in Kraft. Sie bildet die Rechtsgrundlage für alle produktgruppenspezifischen DPP-Anforderungen."
            done
          />
          <TimelineItem
            date="2025–2026"
            title="Delegierte Rechtsakte für erste Produktgruppen"
            description="Die EU-Kommission erarbeitet delegierte Rechtsakte für prioritäre Produktgruppen (Textilien, Elektronik, Möbel, Stahl, Zement, Chemikalien)."
            active
          />
          <TimelineItem
            date="18. Feb. 2027"
            title="DPP-Pflicht für Batterien"
            description="Alle Industriebatterien über 2 kWh und Elektrofahrzeugbatterien müssen einen DPP haben (Batterien-Verordnung EU 2023/1542). Für andere Batteriekategorien folgen spätere Fristen."
          />
          <TimelineItem
            date="2027/2028"
            title="DPP für Textilien & Bekleidung"
            description="Erwartete Einführung des DPP für Textilprodukte, nach Verabschiedung des delegierten Rechtsakts."
          />
          <TimelineItem
            date="2030+"
            title="Vollständige Produktabdeckung"
            description="Schrittweise Einführung für alle weiteren Produktgruppen gemäß ESPR-Arbeitsprogramm der Kommission."
          />
        </div>
      </Section>

      {/* ═══════════════ 3. BETROFFENE ═══════════════ */}
      <Section id="betroffene" title="Wer ist betroffen?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Der DPP betrifft alle Akteure in der Lieferkette — mit unterschiedlichen Rollen
          und Verantwortlichkeiten:
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Hersteller",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Hersteller sind die primär Verantwortlichen: Sie müssen den DPP erstellen, mit Daten
                  befüllen und für den gesamten Produktlebenszyklus zugänglich halten. Bei wesentlichen
                  Produktänderungen müssen die DPP-Daten aktualisiert werden. Hersteller haften für die
                  Richtigkeit der DPP-Daten.
                </p>
              ),
            },
            {
              title: "Importeure und Händler",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Importeure und Händler müssen sicherstellen, dass Produkte, die sie in Verkehr bringen,
                  einen DPP haben. Sie dürfen keine Produkte ohne DPP verkaufen, wenn dieser vorgeschrieben
                  ist. Sie sind auch für die Weitergabe von DPP-Daten an die nächste Stufe der Lieferkette
                  verantwortlich.
                </p>
              ),
            },
            {
              title: "Zulieferer und Lieferkette",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Zulieferer werden Daten für den DPP liefern müssen — auch wenn sie selbst nicht direkt
                  verpflichtet sind. Hersteller werden vertragliche Anforderungen an ihre Zulieferer
                  stellen, um die notwendigen Daten (Materialzusammensetzung, CO₂-Fußabdruck, Herkunft)
                  zu erhalten.
                </p>
              ),
            },
            {
              title: "Reparaturbetriebe, Recycler, Behörden",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Diese Akteure sind primär Nutzer des DPP. Reparaturbetriebe benötigen Informationen
                  zu Demontage und Ersatzteilen. Recycler brauchen Materialinformationen für eine
                  optimale Rohstoffwiedergewinnung. Marktüberwachungsbehörden nutzen den DPP für
                  Konformitätsprüfungen.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 4. PRODUKTGRUPPEN ═══════════════ */}
      <Section id="produktgruppen" title="Prioritäre Produktgruppen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die ESPR sieht eine schrittweise Einführung vor. Die EU-Kommission hat folgende
          Prioritäten gesetzt:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { group: "Batterien & Akkumulatoren", year: "2027", priority: "Hoch" },
            { group: "Textilien & Bekleidung", year: "2027/28", priority: "Hoch" },
            { group: "Elektronik & IKT", year: "2028", priority: "Hoch" },
            { group: "Möbel & Holzprodukte", year: "2028/29", priority: "Mittel" },
            { group: "Stahl, Zement, Aluminium", year: "2028/29", priority: "Mittel" },
            { group: "Chemikalien & Reinigungsmittel", year: "2029+", priority: "Mittel" },
          ].map((item) => (
            <div key={item.group} className="rounded-xl border border-[#d8dff0] bg-white p-4">
              <div className="flex justify-between items-start mb-1">
                <span className="font-[Syne] font-bold text-sm text-[#060c1a]">{item.group}</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-teal-50 text-[#14b8a6]">{item.priority}</span>
              </div>
              <div className="font-mono text-xs text-[#7a8db0]">Geplant ab: {item.year}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 5. DATENINHALTE ═══════════════ */}
      <Section id="dateninhalte" title="Dateninhalte & Pflichtfelder">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Der genaue Dateninhalt wird für jede Produktgruppe durch delegierte Rechtsakte bestimmt.
          Die ESPR definiert jedoch Kategorien von Informationen, die grundsätzlich im DPP enthalten
          sein können:
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Allgemeine Produktinformationen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Eindeutige Produktkennung (Unique Product Identifier, UPI), Hersteller und Kontaktdaten,
                  Produktbezeichnung, -modell und -variante, EAN/GTIN oder andere Produktcodes,
                  Produktionsdatum und -ort, relevante Konformitätsnachweise und CE-Kennzeichnung.
                </p>
              ),
            },
            {
              title: "Materialien & Inhaltsstoffe",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Materialzusammensetzung (Werkstoffe, Gewichtsanteile), Einsatz von recycelten
                  Materialien (Rezyklatanteil), Vorhandensein von Schadstoffen oder besorgniserregenden
                  Stoffen (SVHC), Herkunft kritischer Rohstoffe. Detailtiefe abhängig von der
                  Produktgruppe.
                </p>
              ),
            },
            {
              title: "Umweltleistung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  CO₂-Fußabdruck (Product Carbon Footprint, PCF) nach anerkannter Methodik,
                  Wasserverbrauch, Haltbarkeitsklasse, Energieeffizienzklasse, Umweltdeklaration
                  (EPD). Für manche Produktgruppen: vollständiger Environmental Product Footprint (PEF).
                </p>
              ),
            },
            {
              title: "Reparierbarkeit & Ersatzteile",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Reparierbarkeitsindex oder -bewertung, Verfügbarkeit von Ersatzteilen und deren
                  Bezugsquellen, Demontageanleitung für Reparaturbetriebe, Informationen zu Software-
                  Updates und deren Verfügbarkeit, erwartete Produktlebensdauer.
                </p>
              ),
            },
            {
              title: "End-of-Life & Recycling",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Entsorgungshinweise für Verbraucher, Informationen zur Demontage für Recycler,
                  Rücknahmesysteme und -adressen, Verwertbarkeitsgrad, Informationen zu gefährlichen
                  Materialien, die bei der Entsorgung besondere Behandlung erfordern.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 6. TRÄGERMEDIEN ═══════════════ */}
      <Section id="traegermedien" title="Datenträger & Zugangssysteme">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Der DPP-Datenträger auf dem Produkt oder der Verpackung ermöglicht den physischen Zugang
          zu den digitalen Daten. Die ESPR erlaubt verschiedene Technologien.
          <SourceRef id={5} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Zulässige Datenträger",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  QR-Code (am häufigsten erwartet), RFID-Tag, NFC-Chip, Data Matrix Code, Barcode
                  (EAN/GS1). Datenträger muss direkt auf dem Produkt oder der Verpackung angebracht
                  sein und für die gesamte Produktlebensdauer lesbar bleiben. Bei kleinen Produkten
                  können Ausnahmeregelungen gelten.
                </p>
              ),
            },
            {
              title: "Zugriffsrechte und Sichtbarkeiten",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nicht alle DPP-Daten sind für alle Nutzer sichtbar. Das System unterscheidet:
                  öffentlich zugängliche Daten (für Verbraucher), beschränkt zugängliche Daten
                  (nur für Reparaturbetriebe, Recycler, Behörden) und vertrauliche Geschäftsdaten
                  (nur für Behörden). Zugriffsrechte werden durch technische Systeme und Rollen
                  verwaltet.
                </p>
              ),
            },
            {
              title: "Datenspeicherung und -hoheit",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Daten müssen nicht zentral gespeichert werden. Der DPP funktioniert als dezentrales
                  System: Der Datenträger enthält einen Unique Product Identifier (UPI), der auf die
                  Daten beim Hersteller oder einem beauftragten Datenbetreiber verweist. Hersteller
                  behalten die Datenkontrolle, müssen aber Verfügbarkeit und Integrität sicherstellen.
                </p>
              ),
            },
            {
              title: "EU-Registry-System",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die EU-Kommission entwickelt ein zentrales Registry-System (Ecodesign for Sustainable
                  Products Registry, ESPR-Registry), das UIDs registriert und Verweise auf die Datenhalter
                  speichert. Dies ermöglicht interoperablen Zugriff, ohne alle Daten zentral zu speichern.
                  Details sind noch in Entwicklung.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 7. BATTERIEN ═══════════════ */}
      <Section id="batterien" title="Batterie-DPP: Erste verpflichtende Umsetzung">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Die <strong>Batterien-Verordnung (EU 2023/1542)</strong> ist die erste EU-Verordnung mit
          einer expliziten, termingebundenen DPP-Pflicht ab dem <strong>18. Februar 2027</strong>.
          <SourceRef id={3} sources={sources} accent={ACCENT} />
        </p>
        <div className="rounded-2xl border border-teal-200 bg-teal-50 p-6 mb-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3">Betroffene Batteriekategorien</h3>
          <ul className="list-disc list-inside space-y-1 text-[#3a4a6b] text-sm">
            <li>Industriebatterien mit einer Kapazität &gt; 2 kWh</li>
            <li>Elektrofahrzeugbatterien (EV-Batterien)</li>
            <li>Leichte Verkehrsmittelbatterien (E-Bikes, E-Scooter)</li>
            <li>Starterbatterien (spätere Frist)</li>
          </ul>
        </div>
        <AccordionSection
          items={[
            {
              title: "Pflichtinhalte des Batterie-DPP",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der Batterie-DPP muss enthalten: Kapazität, Energiedichte und Leistungsdaten,
                  CO₂-Fußabdruck (nach EU-Berechnungsmethode), Rezyklatanteil (Kobalt, Lithium,
                  Nickel, Blei), Zellchemie, Due-Diligence-Bericht zur Rohstofflieferkette,
                  Konformitätsnachweise und Informationen zu Rückgabe- und Recyclingprogrammen.
                </p>
              ),
            },
            {
              title: "Carbon Footprint Declaration für Batterien",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Ab Februar 2027 müssen EV-Batterien und Industriebatterien eine Carbon Footprint
                  Declaration (CFD) haben, die im DPP verlinkt ist. Ab 2028 werden CO₂-Grenzwerte
                  eingeführt: Batterien, die diese überschreiten, dürfen nicht mehr in Verkehr
                  gebracht werden. Die EU-Kommission legt die Grenzwerte in delegierten Rechtsakten fest.
                </p>
              ),
            },
            {
              title: "Lieferketten-Due-Diligence",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Für bestimmte kritische Rohstoffe (Kobalt, Lithium, Graphit, Nickel) müssen
                  Hersteller eine Lieferketten-Due-Diligence durchführen und im DPP offenlegen.
                  Die Due-Diligence muss Risiken für Menschenrechte und Umwelt in der Rohstoffkette
                  adressieren und von einem unabhängigen Dritten geprüft werden.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 8. TEXTILIEN ═══════════════ */}
      <Section id="textilien" title="Textilien-DPP">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Textilien und Bekleidung sind eine weitere prioritäre Produktgruppe mit hoher
          Umweltrelevanz — die Branche ist für ca. 10 % der globalen CO₂-Emissionen verantwortlich.
          <SourceRef id={6} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Erwartete Datenanforderungen für Textilien",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Voraussichtlich Pflicht: Faserzusammensetzung (Materialanteil in %), Herkunftsland
                  der Rohstoffe und der Verarbeitung, Umweltzertifikate (GOTS, OEKO-TEX etc.),
                  Pflegehinweise für maximale Lebensdauer, Informationen zur Reparierbarkeit und
                  Rücknahmeprogramme, CO₂-Fußabdruck und Wasserverbrauch.
                </p>
              ),
            },
            {
              title: "Verbindung mit der Ökodesign-Anforderung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der Textilien-DPP ist Teil eines breiteren ESPR-delegierten Rechtsakts für Textilien,
                  der auch Mindestanforderungen an Haltbarkeit, Recyclingfähigkeit, Rezyklatanteil und
                  Schadstoffbeschränkungen umfassen wird. Unternehmen müssen beides zusammen planen.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 9. TECHNISCHE UMSETZUNG ═══════════════ */}
      <Section id="technische-umsetzung" title="Technische Umsetzung">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Die technische DPP-Implementierung erfordert Systeme für Datenerstellung, -speicherung,
          -verwaltung und -übermittlung über den Produktlebenszyklus.
          <SourceRef id={4} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Datenmodell und -formate",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die EU entwickelt Interoperabilitätsstandards basierend auf bestehenden Ansätzen
                  (Asset Administration Shell — AAS, GS1-Standards, W3C-Verifiable Credentials).
                  Hersteller sollten auf offene, standardisierte Datenformate setzen. Proprietäre
                  Systeme können die Interoperabilität mit Behörden und Partnern einschränken.
                </p>
              ),
            },
            {
              title: "Systemintegration",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  DPP-Daten müssen aus verschiedenen internen Systemen aggregiert werden: PLM-Systeme
                  (Produktdaten), ERP (Produktionsdaten), Lieferkettenmanagementsysteme (Zulieferer-
                  daten) und Umweltmanagementsysteme (Emissionsdaten). API-Schnittstellen zu Zulieferern
                  für automatisierte Datenübertragung sind empfehlenswert.
                </p>
              ),
            },
            {
              title: "Datenpflege und -aktualisierung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  DPP-Daten müssen über den gesamten Lebenszyklus aktuell gehalten werden. Bei
                  Produktänderungen, neuen Lieferanten oder aktualisierten Umweltdaten ist eine
                  Aktualisierung erforderlich. Systeme sollten Versionierung und Änderungshistorie
                  unterstützen. Mindestens 10 Jahre Datenverfügbarkeit nach letztem Inverkehrbringen.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 10. DATENSCHUTZ ═══════════════ */}
      <Section id="datenschutz" title="Datenschutz & Zugriffsrechte">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Der DPP enthält auch vertrauliche Geschäftsinformationen. Die ESPR sieht differenzierte
          Zugriffsrechte vor, die mit der DSGVO kompatibel sein müssen.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Dreistufiges Zugriffsmodell",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Ebene 1 (Öffentlich): Grundlegende Produktinformationen, Umwelteigenschaften,
                  Entsorgungshinweise. Für alle zugänglich ohne Authentifizierung.
                  Ebene 2 (Beschränkt): Technische Demontageinformationen für Reparaturbetriebe,
                  detaillierte Materialinformationen für Recycler. Zugang nach Rollenverifikation.
                  Ebene 3 (Vertraulich): Geschäftsgeheimnisse, nur für Behörden im Rahmen der
                  Marktüberwachung zugänglich.
                </p>
              ),
            },
            {
              title: "DSGVO und personenbezogene Daten",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  DPP-Daten dürfen grundsätzlich keine personenbezogenen Daten über Endverbraucher
                  enthalten oder solche ermöglichen (Tracking-Problematik). Wenn ein DPP-System
                  Nutzungsdaten erfasst, gelten DSGVO-Anforderungen. Hersteller müssen eine
                  Datenschutzfolgenabschätzung (DPIA) für ihr DPP-System durchführen.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 11. MARKTÜBERWACHUNG ═══════════════ */}
      <Section id="marktüberwachung" title="Marktüberwachung & Sanktionen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Marktüberwachungsbehörden erhalten durch den DPP deutlich bessere Werkzeuge für
          Produktkonformitätsprüfungen.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="Digitaler" label="Zugang für Behörden" />
          <StatCard value="Sofort" label="Abrufbar vor Ort" />
          <StatCard value="EU-weit" label="Harmonisierte Prüfung" />
        </div>
        <AccordionSection
          items={[
            {
              title: "Behördliche Prüfrechte",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Marktüberwachungsbehörden haben das Recht, auf alle DPP-Daten zuzugreifen —
                  auch auf vertrauliche Informationen. Sie können Hersteller auffordern, DPP-Daten
                  zu korrigieren oder zu ergänzen. Bei festgestellten Verstößen können sie den
                  Verkauf von Produkten ohne korrekten DPP untersagen.
                </p>
              ),
            },
            {
              title: "Sanktionen bei DPP-Verstößen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die ESPR verpflichtet Mitgliedstaaten zur Einführung wirksamer, verhältnismäßiger
                  und abschreckender Sanktionen. Die konkrete Sanktionshöhe wird national festgelegt.
                  Typische Maßnahmen: Bußgelder, Rückrufanordnungen, Verkaufsverbote für
                  nicht-konforme Produkte.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 12. ZUSAMMENSPIEL ═══════════════ */}
      <Section id="zusammenspiel" title="Zusammenspiel mit anderen EU-Gesetzen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Der DPP ist Teil eines breiten EU-Regulierungsrahmens für nachhaltige Produkte
          und Kreislaufwirtschaft:
        </p>
        <AccordionSection
          items={[
            {
              title: "Green Claims Directive",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der DPP kann als technische Grundlage für Green Claims dienen — er stellt die
                  Datenbasis bereit, auf der Umweltaussagen beruhen können. Unternehmen, die DPP-Daten
                  für ihre Nachhaltigkeitskommunikation nutzen, müssen die Anforderungen der
                  Green Claims Directive beachten.
                </p>
              ),
            },
            {
              title: "CSRD — Nachhaltigkeitsberichterstattung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  DPP-Daten (insbesondere Produktumweltdaten, CO₂-Fußabdrücke) können direkt in die
                  CSRD-Berichterstattung einfließen. Unternehmen, die beide Systeme implementieren,
                  sollten eine gemeinsame Datenbasis nutzen, um Doppelarbeit zu vermeiden und
                  Konsistenz sicherzustellen.
                </p>
              ),
            },
            {
              title: "Lieferkettensorgfaltspflichten (CSDDD)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die DPP-Datenanforderungen zur Lieferkette (Rohstoffherkunft, Due-Diligence-Berichte)
                  überschneiden sich mit den Anforderungen der CSDDD. Eine integrierte Lieferketten-
                  daten-Strategie hilft, beide Regulierungen effizient zu erfüllen.
                </p>
              ),
            },
            {
              title: "CE-Kennzeichnung & Konformitätsbewertung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der DPP enthält Verweise auf die CE-Konformitätsnachweise und technische
                  Dokumentation. Er ergänzt die bestehenden CE-Prozesse, ersetzt sie aber nicht.
                  Konformitätserklärungen müssen über den DPP leicht zugänglich sein.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 13. FAHRPLAN ═══════════════ */}
      <Section id="fahrplan" title="Compliance-Fahrplan">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Angesichts der Komplexität des DPP empfehlen wir folgendes gestuftes Vorgehen:
        </p>
        <AccordionSection
          items={[
            {
              title: "Phase 1 (Jetzt): Betroffenheitsanalyse",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Prüfen Sie, welche Ihrer Produkte wann von DPP-Pflichten betroffen sein werden.
                  Verfolgen Sie die Entwicklung der delegierten Rechtsakte für Ihre Produktgruppen.
                  Starten Sie mit Pilotprojekten für prioritäre Produktgruppen (Batterien, Textilien).
                </p>
              ),
            },
            {
              title: "Phase 2 (Kurzfristig): Datenstrategie entwickeln",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Identifizieren Sie, welche Daten Sie heute haben und welche noch erhoben werden müssen.
                  Analysieren Sie Ihre bestehenden IT-Systeme auf DPP-Integrationsfähigkeit. Beginnen
                  Sie mit dem Aufbau von Datenerhebungsprozessen für die Lieferkette. Wählen Sie
                  ein DPP-Plattform-Konzept (Eigenentwicklung vs. Standardsoftware vs. SaaS).
                </p>
              ),
            },
            {
              title: "Phase 3 (Mittelfristig): Technische Umsetzung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Implementieren Sie DPP-Systeme für prioritäre Produktgruppen. Integrieren Sie
                  Zulieferer-Schnittstellen für automatisierte Datenübertragung. Testen Sie
                  Datenträger-Konzepte (QR-Code, NFC) und Zugriffsrechte-Management. Führen Sie
                  eine DSGVO-Datenschutzfolgenabschätzung durch.
                </p>
              ),
            },
            {
              title: "Phase 4 (Langfristig): Vollständige Implementierung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Ausweitung auf alle betroffenen Produktgruppen. Sicherstellen der langfristigen
                  Datenverfügbarkeit (10+ Jahre). Integration mit CSRD-Berichterstattung und
                  Green Claims Dokumentation. Etablierung von Prozessen für laufende Datenpflege
                  und Aktualisierung.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 14. FAQ ═══════════════ */}
      <Section id="faq" title="Häufige Fragen (FAQ)">
        <AccordionSection
          items={[
            {
              title: "Muss jedes einzelne Produkt einen eigenen DPP haben?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Es kommt auf die Produktgruppe an. Für serialisierte Produkte (z. B. EV-Batterien)
                  wird ein eindeutiger Identifier pro Einheit erwartet. Für Massenprodukte (z. B.
                  Textilien) wird wahrscheinlich ein Modell-Level-DPP ausreichen, der für alle
                  Produkte eines Modells gilt. Die delegierten Rechtsakte werden dies konkretisieren.
                </p>
              ),
            },
            {
              title: "Wer zahlt für die DPP-Implementierung?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Implementierungskosten tragen die Hersteller. Die EU-Kommission schätzt
                  die Einmalkosten auf 3.000–10.000 € pro Unternehmen für einfache Systeme,
                  bei komplexen Produktgruppen deutlich mehr. Langfristig sollen Effizienzgewinne
                  durch bessere Datennutzung die Kosten überwiegen.
                </p>
              ),
            },
            {
              title: "Gilt der DPP auch für Import-Produkte?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Ja. Alle Produkte, die in der EU in Verkehr gebracht werden, müssen die DPP-
                  Anforderungen erfüllen — unabhängig vom Herstellungsort. Importeure sind
                  verantwortlich, wenn der Hersteller außerhalb der EU sitzt. Das schafft
                  einen Wettbewerbsvorteil für EU-Produzenten, die bereits Erfahrung haben.
                </p>
              ),
            },
            {
              title: "Wie lange muss der DPP verfügbar bleiben?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Mindestens während der erwarteten Produktlebensdauer, mindestens aber 10 Jahre
                  nach Inverkehrbringen des letzten Exemplars eines Modells. Für langlebige
                  Produkte wie Industrie-Batterien kann die Anforderung deutlich länger sein.
                  Unternehmen müssen Datenverfügbarkeit auch nach Geschäftsaufgabe sicherstellen.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════════ VERWANDTE REGULIERUNGEN ═══════════════════ */}
      <RelatedGuides currentGuide="digitaler-produktpass" accent="#166534" />

      {/* ═══════════════ TOOL RECOMMENDATION ═══════════════ */}
      <ToolRecommendation regulationKey="dpp" accent={ACCENT} />

      {/* ═══════════════ QUELLEN ═══════════════ */}
      <Section id="quellen" title="Quellen & weiterführende Links">
        <SourceList sources={sources} />
      </Section>
    </GuidePageLayout>
  );
}
