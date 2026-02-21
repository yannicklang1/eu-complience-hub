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
    title: "Richtlinie (EU) 2024/825 — Green Claims Directive (Volltext)",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A52023PC0166",
    desc: "Offizieller Richtlinienvorschlag der EU-Kommission vom März 2023",
    type: "Richtlinie",
  },
  {
    id: 2,
    title: "EU-Kommission — Green Claims Initiative",
    url: "https://environment.ec.europa.eu/topics/circular-economy/green-claims_en",
    desc: "Hintergrundinformationen und offizielle Dokumente der EU-Kommission",
    type: "Behörde",
  },
  {
    id: 3,
    title: "Richtlinie (EU) 2024/825 — Empowering Consumers",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024L0825",
    desc: "Verbraucherschutzrichtlinie zu Greenwashing, in Kraft seit März 2024",
    type: "Richtlinie",
  },
  {
    id: 4,
    title: "BEUC — Green Claims: What Consumers Need",
    url: "https://www.beuc.eu/sites/default/files/publications/beuc-x-2023-046_green_claims_directive.pdf",
    desc: "Europäischer Verbraucherverband zur Green Claims Directive",
    type: "Studie",
  },
  {
    id: 5,
    title: "ISO 14021 — Umweltbezogene Kennzeichnung",
    url: "https://www.iso.org/standard/66652.html",
    desc: "Internationale Norm für selbst deklarierte Umweltaussagen",
    type: "Norm",
  },
  {
    id: 6,
    title: "ISO 14044 — Lebenszyklusanalyse (LCA)",
    url: "https://www.iso.org/standard/38498.html",
    desc: "Norm für die Anforderungen an Lebenszyklusanalysen",
    type: "Norm",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Überblick" },
  { id: "timeline", label: "Timeline & Fristen" },
  { id: "betroffene", label: "Wer ist betroffen?" },
  { id: "verbote", label: "Verbotene Praktiken" },
  { id: "anforderungen", label: "Substantiierungspflichten" },
  { id: "zertifizierung", label: "Prüfung & Zertifizierung" },
  { id: "siegel", label: "Umweltsiegel & Labels" },
  { id: "lca", label: "Lebenszyklusanalyse" },
  { id: "kommunikation", label: "Kommunikation & Marketing" },
  { id: "durchsetzung", label: "Marktüberwachung & Sanktionen" },
  { id: "zusammenspiel", label: "Zusammenspiel mit anderen Gesetzen" },
  { id: "fahrplan", label: "Compliance-Fahrplan" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Strafe", value: "4% des Umsatzes" },
  { label: "In Kraft", value: "2026/2027 (geplant)" },
  { label: "Vorverifikation", value: "Pflicht vor Werbung" },
  { label: "Betrifft", value: "B2C-Unternehmen" },
  { label: "LCA", value: "Empfohlen/Pflicht" },
  { label: "Siegel-Pflicht", value: "Nur akkreditierte" },
];

/* ─────────────────── Accent ─────────────────── */
const ACCENT = "#059669";

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
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "bg-[#059669] border-[#059669]" : active ? "bg-white border-[#059669] ring-4 ring-emerald-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done ? "text-[#059669]" : active ? "text-[#059669]" : "text-[#7a8db0]"}`}>
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
export default function GreenClaimsGuideContent() {
  return (
    <GuidePageLayout
      title="Green Claims Directive"
      subtitle="EU-Richtlinie gegen Greenwashing: Umweltwerbung muss wissenschaftlich belegt sein — bevor sie veröffentlicht wird."
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      regulationKey="green-claims"
      href="/green-claims"
    >
      {/* ═══════════════ 1. ÜBERBLICK ═══════════════ */}
      <Section id="ueberblick" title="Überblick: Was ist die Green Claims Directive?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Die <strong>Green Claims Directive (GCD)</strong> ist ein EU-Richtlinienvorschlag der Kommission
          vom März 2023, der Unternehmen verpflichtet, Umweltaussagen in ihrer Werbung <em>vor der
          Veröffentlichung</em> wissenschaftlich zu substantiieren und von unabhängigen Dritten prüfen zu lassen.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Hintergrund: Laut EU-Kommission sind über <strong>53 % aller Umweltaussagen</strong> in der EU
          vage, irreführend oder unbegründet. Die Richtlinie soll diese Praxis beenden und fairen Wettbewerb
          für nachhaltige Unternehmen sicherstellen.
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Parallel dazu ist die <strong>Empowering Consumers Directive</strong> (EU 2024/825) bereits in Kraft
          getreten, die Greenwashing als unlautere Geschäftspraktik verbietet.
          <SourceRef id={3} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="53 %" label="Umweltaussagen irreführend" />
          <StatCard value="4 %" label="Max. Umsatzstrafe" />
          <StatCard value="2026+" label="Geplantes Inkrafttreten" />
        </div>
        <p className="text-[#3a4a6b] text-sm leading-relaxed bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <strong>Wichtig:</strong> Die GCD befindet sich noch im Gesetzgebungsverfahren (Stand: Frühjahr 2025).
          Der Zeitplan kann sich verschieben. Unternehmen sollten aber bereits jetzt ihre Umweltkommunikation
          überprüfen, da die Empowering Consumers Directive bereits gilt.
        </p>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Fristen">
        <div className="space-y-0">
          <TimelineItem
            date="März 2023"
            title="Kommissionsvorschlag"
            description="Die EU-Kommission veröffentlicht den Richtlinienvorschlag zur Green Claims Directive."
            done
          />
          <TimelineItem
            date="März 2024"
            title="Empowering Consumers Directive in Kraft"
            description="EU 2024/825 tritt in Kraft — Greenwashing als unlautere Praxis verboten. Mitgliedstaaten haben 24 Monate zur Umsetzung."
            done
          />
          <TimelineItem
            date="2024/2025"
            title="Trilog-Verhandlungen"
            description="Parlament, Rat und Kommission verhandeln den finalen Text der Green Claims Directive."
            active
          />
          <TimelineItem
            date="2025/2026"
            title="Erwartete Verabschiedung"
            description="Nach Einigung im Trilog: Veröffentlichung im EU-Amtsblatt, Beginn der Umsetzungsfrist (voraussichtlich 18–24 Monate)."
          />
          <TimelineItem
            date="2027 (erwartet)"
            title="Vollständige Anwendung"
            description="Alle Unternehmen im B2C-Bereich müssen Umweltaussagen vorab verifiziert haben und dürfen nur noch zugelassene Siegel verwenden."
          />
        </div>
      </Section>

      {/* ═══════════════ 3. BETROFFENE ═══════════════ */}
      <Section id="betroffene" title="Wer ist betroffen?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Die Green Claims Directive richtet sich an <strong>alle Unternehmen</strong>, die im B2C-Bereich
          tätig sind und Umweltaussagen über ihre Produkte oder Dienstleistungen machen — unabhängig von
          Größe oder Branche.
        </p>
        <AccordionSection
          items={[
            {
              title: "Betroffene Unternehmen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Alle Unternehmen mit B2C-Geschäft in der EU: Hersteller, Händler, Dienstleister,
                  Online-Plattformen. Auch Unternehmen aus Drittstaaten, die ihre Produkte in der EU vermarkten.
                  Ausgenommen: reine B2B-Unternehmen ohne Endverbraucherkontakt (nationale Regelungen können abweichen).
                </p>
              ),
            },
            {
              title: "Betroffene Aussagen und Kanäle",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Alle freiwilligen Umweltaussagen auf Produkten, Verpackungen, in der Werbung (online/offline),
                  auf Websites und in sozialen Medien. Beispiele: &quot;klimaneutral&quot;, &quot;nachhaltig&quot;,
                  &quot;CO₂-kompensiert&quot;, &quot;umweltfreundlich&quot;, &quot;recycelt&quot;, &quot;biologisch abbaubar&quot;.
                </p>
              ),
            },
            {
              title: "KMU-Sonderregelungen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Kleinstunternehmen (&lt; 10 Mitarbeiter, &lt; 2 Mio. € Umsatz) sind von der Vorverifikationspflicht
                  ausgenommen. Für kleine und mittlere Unternehmen sind vereinfachte Verfahren und längere Übergangsfristen
                  vorgesehen. Das Verbot irreführender Aussagen gilt jedoch für alle.
                </p>
              ),
            },
            {
              title: "Nicht betroffene Bereiche",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Gesetzlich vorgeschriebene Umweltkennzeichnungen (z. B. Energielabel) fallen nicht unter
                  die GCD. Auch reine B2B-Transaktionen ohne Verbraucherkontakt sind ausgenommen. Nationale
                  Mindeststandards bleiben unberührt.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 4. VERBOTE ═══════════════ */}
      <Section id="verbote" title="Verbotene Greenwashing-Praktiken">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die Richtlinie listet explizit verbotene Praktiken auf, die als irreführende Umweltwerbung gelten:
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Vage und allgemeine Umweltaussagen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Begriffe wie &quot;grün&quot;, &quot;umweltfreundlich&quot;, &quot;ökologisch&quot;,
                  &quot;nachhaltig&quot; oder &quot;natürlich&quot; ohne klare, belegbare Grundlage
                  sind verboten. Aussagen müssen spezifisch sein und sich auf konkrete, nachweisbare
                  Umweltaspekte beziehen.
                </p>
              ),
            },
            {
              title: "CO₂-Neutralitäts- und Klimaneutralitätsversprechen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Aussagen wie &quot;klimaneutral&quot; oder &quot;netto null&quot;, die ausschließlich
                  auf CO₂-Kompensation (Offsets) basieren, ohne tatsächliche Emissionsreduzierung, sind
                  verboten. Kompensation darf nur als ergänzende Maßnahme kommuniziert werden, nicht als
                  alleiniger Beweis für Klimaneutralität.
                </p>
              ),
            },
            {
              title: "Nicht anerkannte oder selbst erstellte Siegel",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Verwendung von Umweltsiegeln, die nicht von akkreditierten Stellen vergeben werden,
                  ist verboten. Das gilt auch für Siegel, die Unternehmen sich selbst verleihen (z. B.
                  eigene &quot;Grün-Sterne&quot;). Nur EU-weit anerkannte oder notifizierte Zertifizierungssysteme
                  sind erlaubt.
                </p>
              ),
            },
            {
              title: "Selektive Kommunikation und Ablenkung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Es ist verboten, nur positive Umweltaspekte hervorzuheben und wesentliche negative
                  Auswirkungen zu verschweigen. Beispiel: Ein Produkt als &quot;recycelt&quot; zu bewerben,
                  obwohl die Produktion stark umweltschädlich ist. Die Gesamtumweltbilanz muss angemessen
                  dargestellt werden.
                </p>
              ),
            },
            {
              title: "Zukunftsversprechen ohne Plan",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Umweltversprechen für die Zukunft (z. B. &quot;klimaneutral bis 2030&quot;) sind nur
                  erlaubt, wenn ein konkreter, glaubwürdiger und zeitgebundener Umsetzungsplan vorliegt.
                  Vage Ziele ohne Maßnahmenplan sind verboten.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 5. ANFORDERUNGEN ═══════════════ */}
      <Section id="anforderungen" title="Substantiierungspflichten">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Das Kernprinzip der GCD: Jede Umweltaussage muss <strong>vor der Veröffentlichung</strong>
          wissenschaftlich belegt und von einer unabhängigen Stelle überprüft werden.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Wissenschaftliche Grundlage",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Aussagen müssen auf anerkannten wissenschaftlichen Erkenntnissen, internationalen Normen
                  (z. B. ISO 14020er-Serie, EN-Normen) oder EU-Methoden (z. B. Product Environmental Footprint)
                  basieren. Eigenentwickelte Methoden müssen transparent und peer-reviewed sein.
                </p>
              ),
            },
            {
              title: "Lebenszyklusbetrachtung (LCA)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Aussagen über die Gesamtumweltbilanz eines Produkts erfordern eine vollständige
                  Lebenszyklusanalyse nach ISO 14040/44. Die LCA muss alle wesentlichen Umweltaspekte
                  (Rohstoffe, Produktion, Transport, Nutzung, Entsorgung) umfassen.
                  <SourceRef id={6} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "Unabhängige Drittprüfung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Vor der Veröffentlichung muss eine akkreditierte Konformitätsbewertungsstelle die
                  Aussage und ihre Grundlagen prüfen und bestätigen. Die Prüfstelle darf keine
                  wirtschaftlichen Interessen am Ergebnis haben. Das Prüfzertifikat muss öffentlich
                  zugänglich sein.
                </p>
              ),
            },
            {
              title: "Dokumentationspflichten",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Unternehmen müssen die gesamte Evidenzbasis für jede Aussage dokumentieren und für
                  Behörden verfügbar halten: Studien, LCA-Berichte, Prüfzertifikate, Berechnungsgrundlagen.
                  Aufbewahrungsfrist: Mindestens 5 Jahre nach letzter Verwendung der Aussage.
                </p>
              ),
            },
            {
              title: "Vergleichende Umweltaussagen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Aussagen wie &quot;um X % klimafreundlicher als Y&quot; unterliegen besonders strengen
                  Anforderungen: Vergleichsbasis und -methode müssen transparent sein, gleichwertige
                  Produkte verglichen werden, und die Daten müssen aktuell (max. 5 Jahre alt) sein.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 6. ZERTIFIZIERUNG ═══════════════ */}
      <Section id="zertifizierung" title="Prüfung & Zertifizierung">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die GCD sieht ein zweistufiges Prüfsystem vor: unabhängige Vorverifikation und behördliche
          Marktüberwachung nach der Veröffentlichung.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <StatCard value="Vor" label="Veröffentlichung (Vorverifikation)" />
          <StatCard value="Nach" label="Marktüberwachung (ex-post)" />
        </div>
        <AccordionSection
          items={[
            {
              title: "Akkreditierte Prüfstellen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Prüfstellen müssen nach ISO/IEC 17065 akkreditiert sein. Akkreditierung durch die
                  nationale Akkreditierungsstelle (in Deutschland: DAkkS). Die EU-Kommission wird eine
                  Liste notifizierter Stellen führen. Unternehmenseigene Stellen sind grundsätzlich
                  nicht zugelassen.
                </p>
              ),
            },
            {
              title: "Konformitätsbescheinigung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nach erfolgreicher Prüfung stellt die akkreditierte Stelle eine Konformitätsbescheinigung
                  aus, die die Aussage, ihre Grundlage, die Prüfmethode und den Gültigkeitszeitraum enthält.
                  Diese Bescheinigung muss öffentlich zugänglich gemacht werden (z. B. via QR-Code
                  oder Website).
                </p>
              ),
            },
            {
              title: "Gültigkeitsdauer und Erneuerung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Konformitätsbescheinigungen haben eine begrenzte Laufzeit (voraussichtlich 3–5 Jahre).
                  Bei wesentlichen Änderungen am Produkt, der Produktion oder der Datenlage muss die
                  Aussage neu bewertet und zertifiziert werden.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 7. SIEGEL ═══════════════ */}
      <Section id="siegel" title="Umweltsiegel & Labels">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Die GCD schränkt die Verwendung von Umweltsiegeln massiv ein. Nur noch anerkannte
          Systeme sind erlaubt.
          <SourceRef id={2} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Erlaubte Siegel",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nur Siegel aus EU-weit anerkannten oder behördlich notifizierten Zertifizierungssystemen
                  sind zulässig. Dazu gehören derzeit: EU Ecolabel, EU Bio-Logo, Blauer Engel (national
                  anerkannt), FSC, PEFC sowie weitere nach einem EU-Anerkennungsverfahren zugelassene Systeme.
                </p>
              ),
            },
            {
              title: "Verbotene Siegel",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Unternehmensinterne Siegel ohne externe Akkreditierung sind verboten. Siegel aus
                  Systemen, die keine ausreichenden Anforderungen an Drittprüfung, Transparenz und
                  Ambitionsniveau erfüllen, werden nicht anerkannt. Bestehende Siegel können ihren
                  Status verlieren, wenn sie die neuen Anforderungen nicht erfüllen.
                </p>
              ),
            },
            {
              title: "Anforderungen an Zertifizierungssysteme",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Anerkannte Systeme müssen: wissenschaftlich fundierte Kriterien haben, unabhängige
                  Drittprüfung vorschreiben, transparent sein (öffentliche Kriteriendokumente), regelmäßig
                  überprüft und aktualisiert werden sowie ein Beschwerdeverfahren vorhalten.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 8. LCA ═══════════════ */}
      <Section id="lca" title="Lebenszyklusanalyse (LCA) als Grundlage">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Für umfassende Umweltaussagen ist eine Lebenszyklusanalyse (LCA) nach ISO 14040/44 die
          bevorzugte oder in vielen Fällen verpflichtende Methode.
          <SourceRef id={6} sources={sources} accent={ACCENT} />
        </p>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 mb-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3">LCA-Phasen nach ISO 14040/44</h3>
          <ol className="list-decimal list-inside space-y-2 text-[#3a4a6b] text-sm">
            <li><strong>Ziel und Untersuchungsrahmen:</strong> Definition des Systemumfangs und der funktionellen Einheit</li>
            <li><strong>Sachbilanz (LCI):</strong> Erfassung aller Stoff- und Energieströme</li>
            <li><strong>Wirkungsabschätzung (LCIA):</strong> Bewertung der Umweltwirkungen in verschiedenen Kategorien</li>
            <li><strong>Auswertung:</strong> Schlussfolgerungen, Empfehlungen und kritische Überprüfung</li>
          </ol>
        </div>
        <AccordionSection
          items={[
            {
              title: "Product Environmental Footprint (PEF)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die EU hat mit dem Product Environmental Footprint (PEF) eine standardisierte LCA-Methode
                  entwickelt, die für verschiedene Produktkategorien (Category Rules, PEFCR) spezifiziert wurde.
                  PEF-basierte Aussagen werden von der GCD bevorzugt behandelt und sind leichter zu substantiieren.
                </p>
              ),
            },
            {
              title: "Kosten und Aufwand einer LCA",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Eine vollständige, ISO-konforme LCA kostet typischerweise 10.000–50.000 € pro Produktlinie,
                  je nach Komplexität der Lieferkette. Screening-LCAs oder sektorspezifische Tools können
                  günstiger sein (2.000–10.000 €). Für KMU gibt es vereinfachte Ansätze und Fördermöglichkeiten.
                </p>
              ),
            },
            {
              title: "Critical Review",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Für vergleichende Aussagen und für Aussagen, die im Rahmen der GCD verwendet werden sollen,
                  ist ein Critical Review der LCA durch externe Experten Pflicht (ISO 14044, Abschnitt 6).
                  Der Critical Review sichert die wissenschaftliche Validität und Replizierbarkeit.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 9. KOMMUNIKATION ═══════════════ */}
      <Section id="kommunikation" title="Kommunikation & Marketing-Anforderungen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Neben der Substantiierung stellt die GCD konkrete Anforderungen an die Art und Weise,
          wie Umweltaussagen kommuniziert werden dürfen.
        </p>
        <AccordionSection
          items={[
            {
              title: "Transparenzanforderungen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Zu jeder Umweltaussage müssen folgende Informationen leicht zugänglich sein: die genaue
                  Aussage, auf welchen Aspekt sie sich bezieht, die verwendete Bewertungsmethode,
                  das Verifikationszertifikat und ggf. der Vergleichsmaßstab. QR-Codes oder Links zu
                  Detail-Informationen sind ein empfohlener Weg.
                </p>
              ),
            },
            {
              title: "Verbot von Ablenkung und Cherry-Picking",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Unternehmen dürfen nicht einzelne positive Aspekte hervorheben, wenn das Gesamtbild
                  negativ ist. Die Kommunikation muss ein ausgewogenes Bild der Umweltleistung vermitteln.
                  Auch die Formulierung (z. B. Schriftgröße, Platzierung) darf nicht irreführend sein.
                </p>
              ),
            },
            {
              title: "Digitale Produktpässe als Unterstützung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der EU Digital Product Passport (DPP) kann als Träger für Umweltin­forma­tionen dienen
                  und die Transparenzpflichten der GCD erfüllen helfen. Besonders für Produkte, für die
                  ein DPP ohnehin verpflichtend wird (z. B. Batterien, Textilien), bietet sich eine
                  Integration an.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 10. DURCHSETZUNG ═══════════════ */}
      <Section id="durchsetzung" title="Marktüberwachung & Sanktionen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Die GCD sieht wirksame, verhältnismäßige und abschreckende Sanktionen vor. Die Durchsetzung
          liegt bei nationalen Behörden.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="4 %" label="Max. Jahresumsatz (Strafe)" />
          <StatCard value="Öffentlich" label="Bekanntmachung der Verstöße" />
          <StatCard value="Rückruf" label="Beendigung der Aussage möglich" />
        </div>
        <AccordionSection
          items={[
            {
              title: "Sanktionen im Überblick",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Mindeststrafe: 4 % des Jahresumsatzes bei EU-weiten Verstößen. Dazu kommen mögliche
                  Gewinnabschöpfung, öffentliche Bekanntmachung des Verstoßes (Name-and-Shame) sowie
                  vorübergehende Untersagung der Marktbeteiligung bei Ausschreibungen.
                </p>
              ),
            },
            {
              title: "Zuständige Behörden",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Marktüberwachungsbehörden der Mitgliedstaaten sind für die Durchsetzung zuständig.
                  In Deutschland wahrscheinlich Umweltbundesamt, Wettbewerbsbehörden und Verbraucherschutzbehörden.
                  Koordination auf EU-Ebene durch das European Product Compliance Network (EPCN).
                </p>
              ),
            },
            {
              title: "Verbraucher- und Wettbewerberklagen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Parallel zur behördlichen Durchsetzung können Wettbewerber über das UWG (Gesetz gegen
                  unlauteren Wettbewerb) und Verbraucherschutzorganisationen über die Verbandsklage
                  (DIRL-Umsetzung) gegen Greenwashing vorgehen. Abmahnrisiko ist bereits heute hoch.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 11. ZUSAMMENSPIEL ═══════════════ */}
      <Section id="zusammenspiel" title="Zusammenspiel mit anderen EU-Gesetzen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die Green Claims Directive ist Teil eines breiten EU-Regelwerks für nachhaltige Produkte
          und Unternehmensführung:
        </p>
        <AccordionSection
          items={[
            {
              title: "CSRD — Nachhaltigkeitsberichterstattung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die CSRD verpflichtet große Unternehmen zur Offenlegung von Nachhaltigkeitsdaten.
                  Diese Daten können als Grundlage für Green Claims dienen — müssen aber im Einklang
                  mit den GCD-Anforderungen stehen. Widersprüche zwischen CSRD-Berichten und Marketing-
                  aussagen sind ein Haftungsrisiko.
                </p>
              ),
            },
            {
              title: "Digitaler Produktpass (DPP)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der DPP wird für viele Produktkategorien die technische Infrastruktur für
                  Umweltinformationen bereitstellen. Green Claims können über den DPP kommuniziert
                  und verifiziert werden. Synergien nutzen: Wer den DPP implementiert, erleichtert
                  die GCD-Compliance erheblich.
                </p>
              ),
            },
            {
              title: "EU Taxonomy / Sustainable Finance",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Unternehmen, die sich als &quot;taxonomiekonform&quot; oder &quot;nachhaltig&quot;
                  im Finanzmarktkontext vermarkten, müssen sicherstellen, dass diese Aussagen auch
                  den GCD-Standards entsprechen. Greenwashing im Finanzbereich wird parallel durch
                  die SFDR und die Taxonomieverordnung reguliert.
                </p>
              ),
            },
            {
              title: "Empowering Consumers Directive (bereits in Kraft)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Richtlinie EU 2024/825 ist bereits in nationales Recht umzusetzen (Frist: März 2026).
                  Sie verbietet explizit generische Umweltaussagen, nicht belegte Zukunftsversprechen und
                  nicht anerkannte Siegel. Unternehmen sollten ihre Werbung jetzt schon anpassen.
                  <SourceRef id={3} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 12. FAHRPLAN ═══════════════ */}
      <Section id="fahrplan" title="Compliance-Fahrplan für Unternehmen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Auch wenn die GCD noch nicht final verabschiedet ist, sollten Unternehmen jetzt handeln —
          die Empowering Consumers Directive gilt bereits:
        </p>
        <AccordionSection
          items={[
            {
              title: "Phase 1 (Sofort): Bestandsaufnahme",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Inventarisieren Sie alle aktuellen Umweltaussagen in Werbung, auf Verpackungen und
                  auf der Website. Prüfen Sie, welche dieser Aussagen bereits heute substantiiert und
                  dokumentiert sind. Identifizieren Sie Risiko-Aussagen (vage, unbelegte, vergleichende).
                </p>
              ),
            },
            {
              title: "Phase 2 (Kurzfristig): Sofortige Risikominimierung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Streichen oder überarbeiten Sie nicht belegbare Aussagen. Ersetzen Sie vage Begriffe
                  durch spezifische, belegte Aussagen. Entfernen Sie nicht anerkannte Siegel. Schulen
                  Sie Marketing- und Kommunikationsteams zu den neuen Anforderungen.
                </p>
              ),
            },
            {
              title: "Phase 3 (Mittelfristig): Methodenaufbau",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Beauftragen Sie LCAs für die wichtigsten Produktlinien. Wählen Sie anerkannte
                  Zertifizierungssysteme (EU Ecolabel, Blauer Engel etc.). Bauen Sie interne Prozesse
                  für die Datenerhebung und Dokumentation auf. Identifizieren Sie akkreditierte
                  Prüfstellen für die Vorverifikation.
                </p>
              ),
            },
            {
              title: "Phase 4 (Langfristig): Systemintegration",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Integrieren Sie Umweltdaten in Produktentwicklungsprozesse. Verknüpfen Sie
                  CSRD-Berichterstattung mit Green-Claims-Dokumentation. Bereiten Sie sich auf die
                  digitale Offenlegung (DPP, QR-Codes) vor. Etablieren Sie ein kontinuierliches
                  Monitoring der kommunizierten Aussagen.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 13. FAQ ═══════════════ */}
      <Section id="faq" title="Häufige Fragen (FAQ)">
        <AccordionSection
          items={[
            {
              title: "Gilt die Green Claims Directive auch für kleine Unternehmen?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Kleinstunternehmen (weniger als 10 Mitarbeiter und weniger als 2 Mio. € Umsatz)
                  sind von der Vorverifikationspflicht ausgenommen. Das Verbot irreführender Aussagen
                  gilt jedoch für alle Unternehmen — auch Kleinstunternehmen dürfen keine falschen
                  oder irreführenden Umweltaussagen machen.
                </p>
              ),
            },
            {
              title: "Darf ich noch &quot;klimaneutral&quot; auf meinem Produkt stehen haben?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nur wenn die Aussage wissenschaftlich belegt, von einer akkreditierten Stelle
                  verifiziert und nicht allein auf CO₂-Kompensation basiert. Reine Offset-basierte
                  Klimaneutralitätsaussagen werden unter der GCD verboten. Empfehlung: Bereits jetzt
                  zu präziseren Aussagen (z. B. &quot;X % CO₂ reduziert seit 2020&quot;) wechseln.
                </p>
              ),
            },
            {
              title: "Was kostet die Compliance mit der Green Claims Directive?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die EU-Kommission schätzt Kosten von 1.000–2.500 € pro Aussage für die Vorverifikation.
                  LCAs kosten zusätzlich 10.000–50.000 € pro Produktlinie. Unternehmen mit wenigen,
                  spezifischen Umweltaussagen kommen günstiger weg als solche mit breiter Nachhaltigkeits-
                  kommunikation.
                </p>
              ),
            },
            {
              title: "Wann tritt die Green Claims Directive in Kraft?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der endgültige Zeitplan hängt vom Abschluss der Trilog-Verhandlungen ab. Nach
                  Veröffentlichung im EU-Amtsblatt haben Mitgliedstaaten voraussichtlich 18–24 Monate
                  zur Umsetzung. Eine vollständige Anwendung ist frühestens 2027 zu erwarten. Die
                  Empowering Consumers Directive (Greenwashing-Verbot) gilt bereits seit März 2024.
                </p>
              ),
            },
            {
              title: "Wie unterscheidet sich die GCD von bestehenden Werberegeln?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Bisherige Werberegeln (UWG, Richtlinie über unlautere Geschäftspraktiken) basieren
                  auf einer Ex-post-Kontrolle — Behörden oder Wettbewerber müssen einen Verstoß
                  nachweisen. Die GCD führt eine Ex-ante-Pflicht ein: Unternehmen müssen vor der
                  Veröffentlichung beweisen, dass ihre Aussagen korrekt sind.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════════ VERWANDTE REGULIERUNGEN ═══════════════════ */}
      <RelatedGuides currentGuide="green-claims" accent="#15803d" />

      {/* ═══════════════ TOOL RECOMMENDATION ═══════════════ */}
      <ToolRecommendation regulationKey="green-claims" accent={ACCENT} />

      {/* ═══════════════ QUELLEN ═══════════════ */}
      <Section id="quellen" title="Quellen & weiterführende Links">
        <SourceList sources={sources} />
      </Section>
    </GuidePageLayout>
  );
}
