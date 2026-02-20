"use client";

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
    title: "Verordnung (EU) 2023/2854 — Data Act (Volltext)",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32023R2854",
    desc: "Offizieller Volltext des Data Act im EU-Amtsblatt",
    type: "Verordnung",
  },
  {
    id: 2,
    title: "EU-Kommission — European Data Strategy",
    url: "https://digital-strategy.ec.europa.eu/en/policies/data-act",
    desc: "Offizielle Informationsseite der EU-Kommission zum Data Act",
    type: "Behörde",
  },
  {
    id: 3,
    title: "EU-Kommission — Data Act FAQ",
    url: "https://digital-strategy.ec.europa.eu/en/faqs/data-act-questions-and-answers",
    desc: "Offizielle FAQ der EU-Kommission zum Data Act",
    type: "Behörde",
  },
  {
    id: 4,
    title: "DSGVO — Datenschutz-Grundverordnung",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32016R0679",
    desc: "Zusammenspiel Data Act und DSGVO bei personenbezogenen Daten",
    type: "Verordnung",
  },
  {
    id: 5,
    title: "EU Data Governance Act — Verordnung 2022/868",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32022R0868",
    desc: "Komplementäre Verordnung zum Data Act für öffentliche Daten",
    type: "Verordnung",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Überblick" },
  { id: "timeline", label: "Timeline & Fristen" },
  { id: "betroffene", label: "Wer ist betroffen?" },
  { id: "iot-zugang", label: "IoT-Datenzugang (B2C)" },
  { id: "b2b-sharing", label: "B2B-Datenweitergabe" },
  { id: "unfaire-klauseln", label: "Unfaire Vertragsklauseln" },
  { id: "cloud-switching", label: "Cloud-Switching & Interop." },
  { id: "behoerden", label: "Behörden-Datenzugang" },
  { id: "durchsetzung", label: "Durchsetzung & Sanktionen" },
  { id: "oesterreich", label: "Data Act in Österreich & DACH" },
  { id: "zusammenspiel", label: "Zusammenspiel mit anderen Gesetzen" },
  { id: "fahrplan", label: "Compliance-Fahrplan" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Gilt ab", value: "12. Sep. 2025" },
  { label: "Betrifft", value: "IoT & Cloud" },
  { label: "Switching", value: "Max. 45 Tage" },
  { label: "Switching-Gebühr", value: "0 € ab 2027" },
  { label: "FRAND", value: "Fair & Angemessen" },
  { label: "Verordnung", value: "Direkt anwendbar" },
];

/* ─────────────────── Accent ─────────────────── */
const ACCENT = "#0ea5e9";

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
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "bg-[#0ea5e9] border-[#0ea5e9]" : active ? "bg-white border-[#0ea5e9] ring-4 ring-sky-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done ? "text-[#0ea5e9]" : active ? "text-[#0ea5e9]" : "text-[#7a8db0]"}`}>
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
export default function DataActGuideContent() {
  return (
    <GuidePageLayout
      title="EU Data Act"
      subtitle="Datenzugangsrechte für IoT-Nutzer, Cloud-Switching-Freiheit und faire B2B-Datenverträge — ab September 2025."
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      regulationKey="data-act"
    >
      {/* ═══════════════ 1. ÜBERBLICK ═══════════════ */}
      <Section id="ueberblick" title="Überblick: Was ist der Data Act?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Der <strong>Data Act</strong> — Verordnung (EU) 2023/2854 — ist das zentrale EU-Gesetz
          für Datenzugangsrechte in der vernetzten Wirtschaft. Er regelt, wer auf Daten von
          IoT-Geräten (Smart Products) zugreifen darf, wie Cloud-Switching funktionieren muss
          und welche Vertragsklauseln bei B2B-Datenweitergabe unfair sind.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Das Kernprinzip: <strong>&quot;Wer Daten generiert, soll von ihnen profitieren können&quot;</strong>.
          Bisher blieben IoT-Daten meist beim Hersteller. Der Data Act gibt Nutzern und
          Unternehmen ein einklagbares Recht auf Zugang zu den Daten, die ihre Geräte erzeugen.
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Als EU-Verordnung gilt der Data Act unmittelbar in allen 27 Mitgliedstaaten —
          ohne nationale Umsetzung. Er tritt am <strong>12. September 2025</strong> vollständig
          in Anwendung.
          <SourceRef id={2} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="Sep 2025" label="Vollständige Anwendung" />
          <StatCard value="IoT" label="Vernetzte Produkte" />
          <StatCard value="0 €" label="Cloud-Switch-Gebühr ab 2027" />
        </div>
        <p className="text-[#3a4a6b] text-sm leading-relaxed bg-sky-50 border border-sky-200 rounded-xl p-4">
          <strong>Wichtig:</strong> Der Data Act ist die umfassendste EU-Regulierung für den Datenzugang
          in der IoT-Wirtschaft. Er betrifft Hersteller von Smart Products (Autos, Industriemaschinen,
          Haushaltsgeräte), Cloud-Anbieter und jedes Unternehmen, das IoT-Daten nutzt oder weitergibt.
        </p>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Fristen">
        <div className="space-y-0">
          <TimelineItem
            date="23. Feb. 2022"
            title="Kommissionsvorschlag"
            description="Die EU-Kommission legt den Data-Act-Entwurf als Teil der European Data Strategy vor."
            done
          />
          <TimelineItem
            date="11. Jan. 2024"
            title="Inkrafttreten"
            description="Verordnung (EU) 2023/2854 tritt offiziell in Kraft. 20-monatige Übergangsfrist beginnt."
            done
          />
          <TimelineItem
            date="12. Sep. 2025"
            title="Vollständige Anwendung"
            description="Alle Bestimmungen des Data Act gelten — IoT-Datenzugang, B2B-Regeln, unfaire Klauseln, Cloud-Switching."
            active
          />
          <TimelineItem
            date="12. Sep. 2026"
            title="Cloud-Switching: Reduzierte Gebühren"
            description="Cloud-Provider müssen Wechselgebühren auf die tatsächlichen Kosten des Wechsels begrenzen."
          />
          <TimelineItem
            date="12. Sep. 2027"
            title="Cloud-Switching: Null Gebühren"
            description="Wechselgebühren für Cloud-Dienste werden auf null reduziert. Maximale Switching-Dauer: 45 Tage."
          />
        </div>
      </Section>

      {/* ═══════════════ 3. BETROFFENE ═══════════════ */}
      <Section id="betroffene" title="Wer ist betroffen?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Der Data Act betrifft zahlreiche Akteure in der digitalen und physischen Wirtschaft:
        </p>
        <AccordionSection
          items={[
            {
              title: "IoT-Hersteller (Dateninhaber)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Hersteller von vernetzten Produkten: Industriemaschinen, Smart-Home-Geräte, vernetzte
                  Fahrzeuge, landwirtschaftliche Maschinen, medizinische Geräte, Wearables.
                  Sie müssen Nutzern Zugang zu den generierten Daten gewähren und Produkte so
                  gestalten, dass der Datenzugang technisch einfach möglich ist (Data Access by Design).
                </p>
              ),
            },
            {
              title: "Nutzer (natürliche und juristische Personen)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Jeder, der ein vernetztes Produkt kauft oder nutzt, erhält ein einklagbares Recht
                  auf Zugang zu den von diesem Produkt generierten Daten — kostenlos, zeitnah und
                  in einem maschinenlesbaren Format. Nutzer können diese Daten auch an Dritte
                  weitergeben lassen.
                </p>
              ),
            },
            {
              title: "Cloud-/SaaS-/Edge-Anbieter",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Alle Anbieter von Cloud-Computing, Edge-Computing und SaaS-Diensten müssen
                  ihren Kunden den Wechsel zu einem anderen Anbieter erleichtern: keine Lock-in-Strategien,
                  Datenportabilität in Standardformaten und ab 2027 keine Wechselgebühren mehr.
                </p>
              ),
            },
            {
              title: "B2B-Datenempfänger",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Unternehmen, die IoT-Daten von Nutzern erhalten (z. B. Werkstätten, die
                  Fahrzeugdaten auslesen, oder Dienstleister, die Maschinendaten analysieren),
                  dürfen diese Daten nur für den vereinbarten Zweck nutzen — nicht für
                  konkurrierende Produkte oder zur Ableitung von Geschäftsgeheimnissen.
                </p>
              ),
            },
            {
              title: "KMU-Schutz",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  KMU sind vor missbräuchlichen Datenzugangsanforderungen geschützt. Unfaire
                  Vertragsklauseln in B2B-Datenverträgen sind nichtig. Dateninhaber, die
                  Kleinstunternehmen sind, sind von der B2C-Datenzugangspflicht ausgenommen.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 4. IoT-ZUGANG ═══════════════ */}
      <Section id="iot-zugang" title="IoT-Datenzugang: Rechte der Nutzer (Kapitel II)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Das Herzstück des Data Act — Nutzer erhalten Zugang zu den Daten ihrer vernetzten Geräte:
        </p>
        <AccordionSection
          items={[
            {
              title: "Data Access by Design (Art. 3)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Vernetzte Produkte müssen so konzipiert sein, dass Produktdaten für den Nutzer
                  direkt, einfach, sicher und kostenlos zugänglich sind. Hersteller müssen vor dem
                  Kauf transparent informieren: welche Daten erzeugt werden, wie der Zugang funktioniert
                  und ob Daten an Dritte gehen.
                </p>
              ),
            },
            {
              title: "Zugangspflicht des Dateninhabers (Art. 4–5)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der Dateninhaber (meist der Hersteller) muss dem Nutzer die Produktdaten unverzüglich,
                  kostenlos und in einem umfassenden, strukturierten, gängigen und maschinenlesbaren
                  Format bereitstellen. Der Nutzer kann verlangen, dass die Daten an einen Dritten
                  seiner Wahl übermittelt werden.
                </p>
              ),
            },
            {
              title: "Einschränkungen für Datenempfänger (Art. 6)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Dritte, die Daten vom Nutzer erhalten, dürfen diese nur für den vereinbarten Zweck
                  nutzen. Verboten: Nutzung für die Entwicklung eines konkurrierenden vernetzten
                  Produkts, Profiling, Weitergabe an weitere Dritte ohne Zustimmung.
                </p>
              ),
            },
            {
              title: "Geschäftsgeheimnisschutz (Art. 4 Abs. 6–8)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Geschäftsgeheimnisse müssen gewahrt werden. Der Dateninhaber kann angemessene
                  technische Schutzmaßnahmen verlangen. In Ausnahmefällen kann der Zugang zu
                  bestimmten Daten eingeschränkt werden, wenn die Offenlegung ernsthafte wirtschaftliche
                  Schäden durch Verlust von Geschäftsgeheimnissen verursachen würde.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 5. B2B ═══════════════ */}
      <Section id="b2b-sharing" title="B2B-Datenweitergabe (Kapitel III)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Der Data Act schafft Regeln für die verpflichtende Datenweitergabe zwischen Unternehmen:
        </p>
        <AccordionSection
          items={[
            {
              title: "FRAND-Bedingungen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Wenn der Dateninhaber Daten an Dritte weitergeben muss (auf Wunsch des Nutzers),
                  darf er dafür eine angemessene Vergütung verlangen — zu <strong>FRAND-Bedingungen</strong>
                  (Fair, Reasonable And Non-Discriminatory). Die Vergütung darf die Kosten der
                  Bereitstellung plus eine angemessene Marge nicht übersteigen.
                </p>
              ),
            },
            {
              title: "KMU-Sonderkonditionen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Ist der Datenempfänger ein KMU, dürfen die Kosten nicht über den direkten
                  Bereitstellungskosten liegen — keine Marge für KMU-Empfänger. Die EU-Kommission
                  wird Muster-Vertragsklauseln für B2B-Datenweitergabe veröffentlichen.
                  <SourceRef id={3} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "Kein Gatekeeper-Datenzugang",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Gatekeeper im Sinne des Digital Markets Act (Art. 2 Nr. 8 DMA) dürfen nicht als
                  Datenempfänger benannt werden. Dies verhindert, dass Big Tech über den Data Act
                  zusätzliche Datenzugänge erhält.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 6. UNFAIRE KLAUSELN ═══════════════ */}
      <Section id="unfaire-klauseln" title="Unfaire Vertragsklauseln (Kapitel IV)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Der Data Act schützt KMU vor einseitigen B2B-Datenverträgen:
        </p>
        <AccordionSection
          items={[
            {
              title: "Per-se-unfaire Klauseln (Black List)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Automatisch nichtig sind Klauseln, die: (1) die Haftung der datenzugangsgewährenden
                  Partei für vorsätzliches oder grob fahrlässiges Handeln ausschließen, (2) die
                  Rechtsbehelfe bei Nichterfüllung ausschließen, (3) der datenzugangsgewährenden
                  Partei das Recht geben, die Daten einseitig auszulegen oder zu ändern.
                </p>
              ),
            },
            {
              title: "Vermutung der Unfairness (Grey List)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Als unfair gelten Klauseln, die: den Datenzugang unangemessen einschränken,
                  überlange Kündigungsfristen vorsehen, einseitige Änderungsrechte enthalten oder
                  unverhältnismäßige Haftungsverschiebungen bewirken. Diese können im Einzelfall
                  widerlegt werden.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 7. CLOUD SWITCHING ═══════════════ */}
      <Section id="cloud-switching" title="Cloud-Switching & Interoperabilität (Kapitel VI)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Der Data Act beendet das Cloud-Lock-in und schafft Portabilität:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="45 Tage" label="Max. Switching-Dauer" />
          <StatCard value="0 €" label="Wechselgebühr ab Sep 2027" />
          <StatCard value="30 Tage" label="Gratis Parallelzugang" />
        </div>
        <AccordionSection
          items={[
            {
              title: "Wechselrecht & Datenportabilität",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Kunden haben das Recht, von einem Cloud-/SaaS-/Edge-Anbieter zu einem anderen
                  zu wechseln. Der abgebende Anbieter muss alle Daten, Anwendungen und digitalen
                  Assets exportieren — in einem interoperablen, maschinenlesbaren Standardformat.
                  Der maximale Zeitraum für den Wechsel beträgt 45 Tage.
                </p>
              ),
            },
            {
              title: "Gebührenreduzierung & Abschaffung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  <strong>Ab Sep 2025:</strong> Wechselgebühren müssen transparent und im Vertrag
                  ausgewiesen sein.<br />
                  <strong>Ab Sep 2026:</strong> Gebühren dürfen nur die direkten Kosten des Wechsels
                  decken (keine Marge).<br />
                  <strong>Ab Sep 2027:</strong> Wechselgebühren werden komplett abgeschafft (0 €).
                </p>
              ),
            },
            {
              title: "Funktionale Äquivalenz",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Cloud-Anbieter müssen Kunden dabei unterstützen, funktionale Äquivalenz beim neuen
                  Anbieter herzustellen. Offene Standards und APIs müssen verwendet werden, um
                  Datenportabilität und Anwendungskompatibilität sicherzustellen.
                </p>
              ),
            },
            {
              title: "Multi-Cloud & Parallelzugang",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Cloud-Anbieter dürfen den parallelen Betrieb bei mehreren Anbietern nicht behindern.
                  Während des Wechsels muss der alte Anbieter mindestens 30 Tage kostenlosen
                  Zugang zum Dienst gewährleisten (Transitionsphase).
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 8. BEHÖRDEN ═══════════════ */}
      <Section id="behoerden" title="Behörden-Datenzugang in Notfällen (Kapitel V)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Öffentliche Stellen können unter bestimmten Bedingungen Zugang zu privaten Daten verlangen:
        </p>
        <AccordionSection
          items={[
            {
              title: "Ausnahmetatbestände",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Behörden dürfen Datenzugang nur verlangen bei: (1) öffentlichen Notfällen (Pandemien,
                  Naturkatastrophen), (2) Notwendigkeit zur Erfüllung gesetzlicher Aufgaben, wenn keine
                  anderen Mittel verfügbar sind. Routinemäßiger Datenzugang ist ausdrücklich nicht
                  vorgesehen.
                </p>
              ),
            },
            {
              title: "Verhältnismäßigkeit & Zweckbindung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der Datenanfrage muss verhältnismäßig sein — nur die minimal notwendigen Daten
                  dürfen angefragt werden. Die Daten dürfen ausschließlich für den genannten Zweck
                  verwendet werden und müssen nach Zweckerfüllung gelöscht werden.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 9. DURCHSETZUNG ═══════════════ */}
      <Section id="durchsetzung" title="Durchsetzung & Sanktionen">
        <AccordionSection
          items={[
            {
              title: "Nationale Durchsetzungsbehörden",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Jeder Mitgliedstaat benennt zuständige Behörden für die Durchsetzung. Diese können
                  Untersuchungen einleiten, Korrekturmaßnahmen anordnen und Geldbußen verhängen.
                  Die konkreten Sanktionshöhen werden von den Mitgliedstaaten festgelegt — sie
                  müssen wirksam, verhältnismäßig und abschreckend sein.
                </p>
              ),
            },
            {
              title: "Streitbeilegung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Streitigkeiten über den Datenzugang können vor eine zertifizierte Streitbeilegungsstelle
                  gebracht werden. Diese bietet eine schnellere und günstigere Alternative zum Gerichtsweg.
                  Zusätzlich steht der ordentliche Rechtsweg offen.
                </p>
              ),
            },
            {
              title: "Interoperabilitäts-Aufsicht",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Für Cloud-Switching und Interoperabilität überwachen die Marktüberwachungsbehörden
                  die Einhaltung. Die EU-Kommission kann Durchführungsrechtsakte zu technischen Standards
                  und Interoperabilitätsspezifikationen erlassen.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 10. ÖSTERREICH ═══════════════ */}
      <Section id="oesterreich" title="Data Act in Österreich & DACH">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Als EU-Verordnung gilt der Data Act direkt — aber die nationale Umsetzung betrifft
          die Behördenstruktur:
        </p>
        <AccordionSection
          items={[
            {
              title: "Österreich: Zuständige Behörden",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Österreich muss eine zuständige Behörde für die Data-Act-Durchsetzung benennen.
                  Für den Datenschutz-Teil bleibt die DSB (Datenschutzbehörde) zuständig.
                  Für Cloud-Switching und Interoperabilität wird voraussichtlich die RTR oder
                  eine Marktüberwachungsbehörde zuständig.
                </p>
              ),
            },
            {
              title: "Deutschland: BNetzA und BFDI",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  In Deutschland wird die Zuständigkeit voraussichtlich zwischen dem BFDI
                  (Bundesbeauftragter für Datenschutz) für personenbezogene Daten und der
                  Bundesnetzagentur für Cloud-Switching und Interoperabilität aufgeteilt.
                </p>
              ),
            },
            {
              title: "Auswirkungen auf DACH-Industrie",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die DACH-Region mit ihrer starken Industrie- und Maschinenbau-Tradition ist
                  besonders betroffen. Hersteller von Industriemaschinen (Siemens, ABB, TRUMPF)
                  und IoT-Systemen müssen Data Access by Design implementieren. Die Cloud-
                  Switching-Regeln betreffen alle SaaS- und Cloud-Anbieter.
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
          Der Data Act ist Teil der EU-Datenstrategie und ergänzt bestehende Regulierungen:
        </p>
        <AccordionSection
          items={[
            {
              title: "DSGVO — Datenschutz",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der Data Act berührt die DSGVO nicht — bei personenbezogenen Daten gelten weiterhin
                  alle DSGVO-Anforderungen. Wenn IoT-Daten personenbezogen sind (z. B. Fahrzeugdaten
                  eines identifizierbaren Fahrers), braucht der Datenzugang eine DSGVO-Rechtsgrundlage.
                  <SourceRef id={4} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "AI Act — Trainingsdaten",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  IoT-Daten, die über den Data Act zugänglich werden, können für KI-Training genutzt
                  werden — sofern der Nutzer zustimmt und die AI-Act-Anforderungen (Datenqualität,
                  Dokumentation) eingehalten werden.
                </p>
              ),
            },
            {
              title: "DPP / ESPR — Produktdaten",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der Digitale Produktpass (DPP) erfasst Produkteigenschaften, der Data Act die
                  Nutzungsdaten. Beide ergänzen sich: DPP für statische Produktinformationen,
                  Data Act für dynamische Nutzungsdaten.
                </p>
              ),
            },
            {
              title: "Data Governance Act (DGA)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der DGA regelt die Wiederverwendung öffentlicher Daten und Datenaltruismus,
                  der Data Act den privaten Datenzugang. Zusammen bilden sie die EU-Datenstrategie.
                  <SourceRef id={5} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 12. FAHRPLAN ═══════════════ */}
      <Section id="fahrplan" title="Compliance-Fahrplan">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Der Data Act gilt ab September 2025 — Unternehmen müssen jetzt handeln:
        </p>
        <AccordionSection
          items={[
            {
              title: "IoT-Hersteller: Data Access by Design",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Prüfen Sie, welche Daten Ihre vernetzten Produkte generieren. Implementieren Sie
                  sichere Datenzugangsschnittstellen (APIs). Aktualisieren Sie Produktinformationen
                  (welche Daten, wie zugänglich, an wen weitergegeben). Passen Sie Nutzungsbedingungen
                  an Data-Act-Anforderungen an.
                </p>
              ),
            },
            {
              title: "Cloud-Anbieter: Switching & Portabilität",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Prüfen Sie Ihre Verträge auf Lock-in-Klauseln. Implementieren Sie
                  Datenexport-Funktionen in Standardformaten. Planen Sie die Gebührenreduzierung
                  (kostendeckend ab 2026, kostenlos ab 2027). Dokumentieren Sie den Switching-Prozess
                  transparent.
                </p>
              ),
            },
            {
              title: "B2B-Datennutzer: Verträge anpassen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Prüfen Sie bestehende B2B-Datenverträge auf unfaire Klauseln. Stellen Sie sicher,
                  dass Vergütungen FRAND-konform sind. Dokumentieren Sie Datenzugangsanfragen und
                  ihre Bearbeitung.
                </p>
              ),
            },
            {
              title: "Alle Unternehmen: Bestandsaufnahme",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Identifizieren Sie Ihre Rolle im Data-Act-Ökosystem (Dateninhaber, Nutzer,
                  Empfänger, Cloud-Anbieter). Prüfen Sie, welche Datenflüsse vom Data Act betroffen
                  sind. Klären Sie Geschäftsgeheimnisschutz für sensible Daten.
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
              title: "Muss ich als Maschinenhersteller alle Sensordaten herausgeben?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Sie müssen dem Nutzer Zugang zu den Daten gewähren, die sein konkretes Gerät
                  erzeugt. Aggregierte Daten mehrerer Nutzer oder rein interne Verarbeitungsdaten
                  (z. B. Software-Algorithmen) sind nicht umfasst. Geschäftsgeheimnisse können
                  geschützt werden — aber nicht als Ausrede für eine generelle Zugangsverweigerung.
                </p>
              ),
            },
            {
              title: "Kann mein Cloud-Anbieter mir den Wechsel verweigern?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nein. Ab September 2025 haben Sie ein gesetzliches Recht auf Cloud-Switching.
                  Der Anbieter muss aktiv unterstützen: Datenexport, API-Zugang für den neuen
                  Anbieter, 30 Tage Parallelzugang. Vertragsklauseln, die den Wechsel behindern,
                  sind nichtig.
                </p>
              ),
            },
            {
              title: "Wie verhält sich der Data Act zur DSGVO bei Smart-Home-Daten?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Smart-Home-Daten sind oft personenbezogen (Bewegungsmuster, Energieverbrauch).
                  Der Data Act gibt Ihnen das Recht auf Datenzugang — die DSGVO regelt zusätzlich,
                  wie diese Daten verarbeitet werden dürfen. Beide gelten parallel.
                </p>
              ),
            },
            {
              title: "Betrifft der Data Act auch Software ohne IoT-Bezug?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die IoT-Datenzugangsrechte (Kapitel II/III) gelten nur für Daten von vernetzten
                  Produkten. Das Cloud-Switching (Kapitel VI) und die unfairen Vertragsklauseln
                  (Kapitel IV) gelten jedoch für alle Cloud-/SaaS-Dienste — auch ohne IoT-Bezug.
                </p>
              ),
            },
            {
              title: "Was passiert, wenn mein IoT-Anbieter außerhalb der EU sitzt?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der Data Act gilt für vernetzte Produkte, die in der EU auf den Markt gebracht
                  werden — unabhängig vom Sitz des Herstellers. Nicht-EU-Hersteller müssen einen
                  Bevollmächtigten in der EU benennen.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ TOOL RECOMMENDATION ═══════════════ */}
      <ToolRecommendation regulationKey="data-act" accent={ACCENT} />

      {/* ═══════════════ QUELLEN ═══════════════ */}
      <Section id="quellen" title="Quellen & weiterführende Links">
        <SourceList sources={sources} />
      </Section>
    </GuidePageLayout>
  );
}
