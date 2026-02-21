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
    title: "Verordnung (EU) 2025/327 — European Health Data Space (Volltext)",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32025R0327",
    desc: "Offizieller Volltext der EHDS-Verordnung im EU-Amtsblatt",
    type: "Verordnung",
  },
  {
    id: 2,
    title: "EU-Kommission — European Health Data Space",
    url: "https://health.ec.europa.eu/ehealth-digital-health-and-care/european-health-data-space_en",
    desc: "Offizielle Informationsseite der EU-Kommission zum EHDS",
    type: "Behörde",
  },
  {
    id: 3,
    title: "ELGA GmbH — Elektronische Gesundheitsakte Österreich",
    url: "https://www.elga.gv.at/",
    desc: "Österreichische E-Health-Infrastruktur als EHDS-Vorläufer",
    type: "Behörde",
  },
  {
    id: 4,
    title: "HL7 FHIR Standard — Interoperabilität",
    url: "https://www.hl7.org/fhir/",
    desc: "Der internationale Standard für Gesundheitsdaten-Austausch",
    type: "Norm",
  },
  {
    id: 5,
    title: "EU-Kommission — eHealth Network",
    url: "https://health.ec.europa.eu/ehealth-digital-health-and-care/ehealth-and-covid-19_en",
    desc: "Zusammenarbeit der EU-Mitgliedstaaten im Bereich eHealth",
    type: "Behörde",
  },
  {
    id: 6,
    title: "DSGVO Art. 9 — Gesundheitsdaten als besondere Kategorie",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32016R0679#art_9",
    desc: "Verarbeitung besonderer Kategorien personenbezogener Daten nach DSGVO",
    type: "Verordnung",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Überblick" },
  { id: "timeline", label: "Timeline & Fristen" },
  { id: "betroffene", label: "Wer ist betroffen?" },
  { id: "primaernutzung", label: "Primärnutzung" },
  { id: "sekundaernutzung", label: "Sekundärnutzung" },
  { id: "ehr-systeme", label: "EHR-Systeme" },
  { id: "interoperabilitaet", label: "Interoperabilität" },
  { id: "patientenrechte", label: "Patientenrechte" },
  { id: "durchsetzung", label: "Durchsetzung & Sanktionen" },
  { id: "oesterreich", label: "EHDS in Österreich (ELGA)" },
  { id: "zusammenspiel", label: "Zusammenspiel mit anderen Gesetzen" },
  { id: "fahrplan", label: "Compliance-Fahrplan" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "In Kraft", value: "März 2025" },
  { label: "Anwendung", value: "2027–2031 (stufenweise)" },
  { label: "Standard", value: "HL7 FHIR" },
  { label: "Betrifft", value: "eHealth & Pharma" },
  { label: "Primärnutzung", value: "Patientenzugang" },
  { label: "Sekundärnutzung", value: "Forschung & KI" },
];

/* ─────────────────── Accent ─────────────────── */
const ACCENT = "#ec4899";

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
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "bg-[#ec4899] border-[#ec4899]" : active ? "bg-white border-[#ec4899] ring-4 ring-pink-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done ? "text-[#ec4899]" : active ? "text-[#ec4899]" : "text-[#7a8db0]"}`}>
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
export default function EHDSGuideContent() {
  return (
    <GuidePageLayout
      title="EHDS – Europäischer Gesundheitsdatenraum"
      subtitle="EU-Verordnung für den sicheren Austausch elektronischer Gesundheitsdaten — von Patientenakten bis Forschungszugang."
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      regulationKey="ehds"
      href="/ehds"
    >
      {/* ═══════════════ 1. ÜBERBLICK ═══════════════ */}
      <Section id="ueberblick" title="Überblick: Was ist der EHDS?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Der <strong>European Health Data Space (EHDS)</strong> — Verordnung (EU) 2025/327 — schafft
          einen einheitlichen europäischen Raum für die Nutzung elektronischer Gesundheitsdaten. Die
          Verordnung regelt sowohl die <strong>Primärnutzung</strong> (Patientenversorgung) als auch die
          <strong> Sekundärnutzung</strong> (Forschung, Innovation, Politikgestaltung) von Gesundheitsdaten.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Der EHDS gibt Patienten erstmals EU-weit das Recht, auf ihre elektronischen Gesundheitsdaten
          zuzugreifen, sie zu übertragen und ihre Nutzung einzuschränken. Gleichzeitig ermöglicht er
          Forschern und KI-Entwicklern unter strengen Auflagen den Zugang zu pseudonymisierten
          Gesundheitsdaten.
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Für die Gesundheitsbranche bedeutet dies massive Investitionen in Interoperabilität,
          Datenqualität und Cybersicherheit — aber auch enorme Chancen durch grenzüberschreitenden
          Datenaustausch und evidenzbasierte Innovation.
          <SourceRef id={2} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="2027" label="Primärnutzung ab" />
          <StatCard value="2029" label="Sekundärnutzung ab" />
          <StatCard value="27 EU" label="Länder vernetzt" />
        </div>
        <p className="text-[#3a4a6b] text-sm leading-relaxed bg-pink-50 border border-pink-200 rounded-xl p-4">
          <strong>Wichtig:</strong> Die EHDS-Verordnung ist im März 2025 in Kraft getreten, wird aber
          stufenweise angewendet. Erste Pflichten zur Primärnutzung gelten ab 2027, die Sekundärnutzung
          ab 2029. Hersteller von EHR-Systemen müssen ihre Produkte bis dahin konform machen.
        </p>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Fristen">
        <div className="space-y-0">
          <TimelineItem
            date="Mai 2022"
            title="Kommissionsvorschlag"
            description="Die EU-Kommission legt den EHDS-Verordnungsvorschlag vor."
            done
          />
          <TimelineItem
            date="März 2025"
            title="Inkrafttreten"
            description="Verordnung (EU) 2025/327 tritt in Kraft. Übergangsfristen beginnen."
            done
          />
          <TimelineItem
            date="2026"
            title="Nationale Behörden etablieren"
            description="Mitgliedstaaten müssen Digital Health Authorities und Health Data Access Bodies (HDAB) benennen."
            active
          />
          <TimelineItem
            date="2027"
            title="Primärnutzung: Patientenzugang"
            description="Patienten erhalten EU-weiten Zugang zu ihren elektronischen Gesundheitsdaten. EHR-Systeme müssen interoperabel sein."
          />
          <TimelineItem
            date="2029"
            title="Sekundärnutzung: Forschungszugang"
            description="Health Data Access Bodies ermöglichen Forschern und Innovatoren den Zugang zu pseudonymisierten Gesundheitsdaten."
          />
          <TimelineItem
            date="2031"
            title="Volle Anwendung"
            description="Alle Bestimmungen der EHDS-Verordnung gelten vollständig. Cross-Border-Infrastruktur (HealthData@EU) voll operativ."
          />
        </div>
      </Section>

      {/* ═══════════════ 3. BETROFFENE ═══════════════ */}
      <Section id="betroffene" title="Wer ist betroffen?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Der EHDS betrifft ein breites Spektrum an Akteuren im Gesundheitswesen:
        </p>
        <AccordionSection
          items={[
            {
              title: "Gesundheitsdienstleister",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Krankenhäuser, Arztpraxen, Apotheken, Labore und alle Einrichtungen, die Gesundheitsdaten
                  elektronisch verarbeiten. Sie müssen Patientendaten über interoperable Systeme bereitstellen
                  und Patientenrechte (Zugang, Übertragbarkeit, Opt-out für Sekundärnutzung) gewährleisten.
                </p>
              ),
            },
            {
              title: "EHR-System-Hersteller",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Hersteller von elektronischen Patientenakten-Systemen (EHR — Electronic Health Records)
                  müssen EU-Konformität nachweisen: Interoperabilität (HL7 FHIR, IHE-Profile), Sicherheit,
                  Datenschutz by Design und EU-Selbstdeklaration. Nicht-konforme Systeme dürfen ab den
                  Anwendungsfristen nicht mehr in Betrieb genommen werden.
                  <SourceRef id={4} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "Pharma & Medizinprodukte",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Pharmaunternehmen können über HDAB Zugang zu Real-World-Daten für klinische
                  Studien, Pharmakovigilanz und Arzneimittelentwicklung erhalten. Gleichzeitig
                  werden sie als Gesundheitsdaten-Inhaber selbst zu Datengebern.
                </p>
              ),
            },
            {
              title: "Health-App- & Wearable-Entwickler",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Wellness-Apps und Wearables, die Gesundheitsdaten generieren (Herzfrequenz,
                  Schlaftracking, Blutzucker), fallen unter den EHDS, wenn sie als EHR-System
                  klassifiziert werden oder Daten in das EHR-Ökosystem einspeisen.
                </p>
              ),
            },
            {
              title: "Forscher & KI-Entwickler",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Universitäten, Forschungseinrichtungen und KI-Unternehmen können über HDAB
                  Zugang zu pseudonymisierten Gesundheitsdaten beantragen — für Forschung,
                  Training von KI-Modellen, Epidemiologie und Gesundheitspolitik-Analyse.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 4. PRIMÄRNUTZUNG ═══════════════ */}
      <Section id="primaernutzung" title="Primärnutzung: Patientenversorgung">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die Primärnutzung betrifft den Zugang zu und die Nutzung von Gesundheitsdaten für die
          direkte Patientenversorgung:
        </p>
        <AccordionSection
          items={[
            {
              title: "Prioritäre Datenkategorien",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der EHDS definiert prioritäre elektronische Gesundheitsdatenkategorien, die
                  EU-weit austauschbar sein müssen: <strong>Patientenzusammenfassungen</strong>,
                  <strong> E-Verschreibungen / E-Dispensierungen</strong>,
                  <strong> Laborbefunde</strong>, <strong>Entlassungsberichte</strong>,
                  <strong> Bildgebungsbefunde</strong> und <strong>medizinische Bilder</strong>.
                  Diese Kategorien werden schrittweise erweitert.
                </p>
              ),
            },
            {
              title: "Grenzüberschreitender Datenzugang",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Ein Patient aus Österreich, der in Portugal ins Krankenhaus kommt, soll dort
                  Zugang zu seiner Patientenzusammenfassung und seinen aktuellen Verschreibungen
                  haben. Die EU-Infrastruktur MyHealth@EU verbindet die nationalen Systeme.
                </p>
              ),
            },
            {
              title: "Patienten-Identifikation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Für den grenzüberschreitenden Datenzugang wird ein EU-weites System zur
                  Patienten-Identifikation aufgebaut. Mitgliedstaaten müssen sicherstellen,
                  dass ihre Bürger eindeutig und sicher identifiziert werden können —
                  unter Wahrung der Datenschutzrechte.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 5. SEKUNDÄRNUTZUNG ═══════════════ */}
      <Section id="sekundaernutzung" title="Sekundärnutzung: Forschung & Innovation">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die Sekundärnutzung ermöglicht die Verwendung von Gesundheitsdaten jenseits der
          direkten Patientenversorgung — unter strengen Auflagen:
        </p>
        <AccordionSection
          items={[
            {
              title: "Health Data Access Bodies (HDAB)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Jeder Mitgliedstaat muss mindestens eine unabhängige Zugangsstelle (HDAB) einrichten.
                  Diese prüft Anträge auf Datenzugang, stellt Datengenehmigungen aus und stellt
                  pseudonymisierte oder anonymisierte Datensätze in sicheren Verarbeitungsumgebungen bereit.
                </p>
              ),
            },
            {
              title: "Erlaubte Zwecke",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Zugang wird gewährt für: öffentliches Gesundheitsinteresse, Forschung und Entwicklung,
                  Training von KI-Systemen (auch für Medizinprodukte), Pharmakovigilanz, Regulierung,
                  personalisierte Medizin, offizielle Statistiken und Bildung/Lehre.
                </p>
              ),
            },
            {
              title: "Verbotene Zwecke",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Ausdrücklich verboten sind: Entscheidungen zum Nachteil natürlicher Personen (Versicherungsausschluss,
                  Kreditwürdigkeit), Werbung an Gesundheitsfachkräfte für Arzneimittel,
                  Entwicklung schädlicher Produkte (Suchtmittel, Waffen) und Weiterleitung an Dritte
                  außerhalb der Genehmigung.
                </p>
              ),
            },
            {
              title: "Sichere Verarbeitungsumgebung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Daten werden nicht &quot;heruntergeladen&quot;, sondern in einer sicheren, isolierten
                  Verarbeitungsumgebung bereitgestellt. Forscher können Analysen durchführen und
                  Ergebnisse exportieren — aber keine Rohdaten. Strenge Logging- und Audit-Trails
                  stellen die Nachverfolgbarkeit sicher.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 6. EHR-SYSTEME ═══════════════ */}
      <Section id="ehr-systeme" title="EHR-Systeme: Anforderungen & Zertifizierung">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Hersteller von elektronischen Patientenakten-Systemen (EHR) stehen vor weitreichenden
          neuen Pflichten:
        </p>
        <AccordionSection
          items={[
            {
              title: "EU-Konformitätserklärung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  EHR-Systeme müssen eine EU-Selbstdeklaration der Konformität ausstellen. Technische
                  Dokumentation, Risikobewertung und Nachweise der Interoperabilität müssen vorliegen.
                  Die Marktzulassung wird von nationalen Marktüberwachungsbehörden kontrolliert.
                </p>
              ),
            },
            {
              title: "Interoperabilitäts-Standards",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  EHR-Systeme müssen das <strong>europäische EHR-Austauschformat</strong> unterstützen,
                  das auf <strong>HL7 FHIR</strong> basiert. Dazu kommen IHE-Profile (Integrating the
                  Healthcare Enterprise), SNOMED CT (Terminologie), LOINC (Labordaten) und weitere
                  EU-definierte Standards.
                  <SourceRef id={4} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "Security by Design",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  EHR-Systeme müssen Sicherheitsanforderungen erfüllen: Verschlüsselung, Zugriffskontrollen,
                  Audit-Logging, Identitätsmanagement und Resilienz. Die Anforderungen orientieren sich
                  an EN ISO 27799 (Informationssicherheit im Gesundheitswesen) und den NIS2-Anforderungen.
                </p>
              ),
            },
            {
              title: "Kennzeichnung & EU-Label",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Konforme EHR-Systeme erhalten ein EU-Konformitätskennzeichen. Dieses muss in der
                  technischen Dokumentation und bei der Vermarktung angezeigt werden. Nicht-konforme
                  Systeme dürfen nach Ablauf der Übergangsfristen nicht mehr vertrieben werden.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 7. INTEROPERABILITÄT ═══════════════ */}
      <Section id="interoperabilitaet" title="Interoperabilität & Infrastruktur">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Der EHDS baut auf zwei EU-weiten Infrastrukturen auf:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <StatCard value="MyHealth@EU" label="Primärnutzung Cross-Border" />
          <StatCard value="HealthData@EU" label="Sekundärnutzung Cross-Border" />
        </div>
        <AccordionSection
          items={[
            {
              title: "MyHealth@EU — Patientenversorgung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die bestehende Infrastruktur für den grenzüberschreitenden Austausch von
                  Patientenzusammenfassungen und E-Verschreibungen wird ausgebaut. Nationale
                  Kontaktstellen (National Contact Points for eHealth) sind die technischen
                  Gateways. Österreichs ELGA ist bereits teilweise angebunden.
                </p>
              ),
            },
            {
              title: "HealthData@EU — Forschungszugang",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Neue dezentrale Infrastruktur für den grenzüberschreitenden Zugang zu
                  pseudonymisierten Gesundheitsdaten für die Sekundärnutzung. Verbindet die
                  nationalen HDAB miteinander. Ermöglicht Multi-Country-Forschung ohne
                  physischen Datentransfer (Federated Analysis).
                </p>
              ),
            },
            {
              title: "Europäisches EHR-Austauschformat",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Ein standardisiertes Datenformat für die prioritären Kategorien, basierend auf
                  HL7 FHIR-Profilen. Die EU-Kommission erlässt Durchführungsrechtsakte, die das
                  exakte Format, Terminologien (SNOMED CT, ICD-10/11, LOINC) und Transportprotokolle
                  festlegen.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 8. PATIENTENRECHTE ═══════════════ */}
      <Section id="patientenrechte" title="Patientenrechte im EHDS">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Der EHDS stärkt die Rechte der Patienten im digitalen Gesundheitswesen erheblich:
        </p>
        <AccordionSection
          items={[
            {
              title: "Zugangsrecht",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Patienten haben das Recht, kostenlos und unverzüglich auf ihre elektronischen
                  Gesundheitsdaten zuzugreifen — in einem lesbaren, maschinenlesbaren Format.
                  Dies geht über das DSGVO-Auskunftsrecht hinaus und umfasst alle Daten im EHR.
                </p>
              ),
            },
            {
              title: "Datenübertragbarkeit",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Patienten können ihre Daten von einem Gesundheitsdienstleister zu einem anderen
                  übertragen lassen — auch grenzüberschreitend innerhalb der EU. Die Daten müssen
                  im europäischen EHR-Austauschformat bereitgestellt werden.
                </p>
              ),
            },
            {
              title: "Opt-out für Sekundärnutzung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Patienten können der Sekundärnutzung ihrer Daten widersprechen (Opt-out). Dieser
                  Widerspruch muss einfach und kostenlos möglich sein. Allerdings kann der Widerspruch
                  in bestimmten Fällen (öffentliche Gesundheit, gesetzliche Statistiken) eingeschränkt sein.
                </p>
              ),
            },
            {
              title: "Transparenz & Kontrolle",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Patienten müssen informiert werden, wenn ihre Daten für die Sekundärnutzung
                  zugänglich gemacht werden. Sie haben das Recht zu erfahren, wer Zugang
                  beantragt hat und zu welchem Zweck.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 9. DURCHSETZUNG ═══════════════ */}
      <Section id="durchsetzung" title="Durchsetzung & Sanktionen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die Durchsetzung erfolgt auf nationaler Ebene durch spezifische Behörden:
        </p>
        <AccordionSection
          items={[
            {
              title: "Zuständige Behörden",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Jeder Mitgliedstaat benennt eine <strong>Digital Health Authority</strong> für die
                  Primärnutzung und einen <strong>Health Data Access Body (HDAB)</strong> für die
                  Sekundärnutzung. Zusätzlich überwachen <strong>Marktüberwachungsbehörden</strong> die
                  EHR-System-Konformität.
                </p>
              ),
            },
            {
              title: "Sanktionsrahmen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die konkreten Sanktionen werden von den Mitgliedstaaten festgelegt und müssen
                  wirksam, verhältnismäßig und abschreckend sein. Verstöße gegen die Sekundärnutzung
                  (unerlaubte Datenverwendung) können zudem DSGVO-Bußgelder nach sich ziehen — bis zu
                  20 Mio. EUR oder 4 % des weltweiten Jahresumsatzes.
                  <SourceRef id={6} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "EHR-System-Marktüberwachung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nicht-konforme EHR-Systeme können vom Markt genommen werden. Hersteller können
                  zu Nachbesserungen, Rückrufen oder dem Entzug der EU-Konformitätserklärung
                  verpflichtet werden.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 10. ÖSTERREICH ═══════════════ */}
      <Section id="oesterreich" title="EHDS in Österreich: ELGA als Fundament">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Österreich hat mit der <strong>ELGA (Elektronische Gesundheitsakte)</strong> bereits eine
          gut ausgebaute eHealth-Infrastruktur, die als Fundament für den EHDS dient:
          <SourceRef id={3} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "ELGA als Vorläufer",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  ELGA ist seit 2015 in Betrieb und umfasst Entlassungsbriefe, Laborbefunde,
                  Befunde der bildgebenden Diagnostik und die E-Medikation. Sie verbindet über
                  14.000 Gesundheitsdienstleister in Österreich. ELGA wird als nationale
                  Kontaktstelle für MyHealth@EU fungieren.
                </p>
              ),
            },
            {
              title: "E-Medikation & E-Impfpass",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Österreichs E-Medikation und der elektronische Impfpass sind bereits
                  EHDS-relevante Datenkategorien. Die Systeme müssen auf das europäische
                  EHR-Austauschformat umgestellt werden, um grenzüberschreitend kompatibel zu sein.
                </p>
              ),
            },
            {
              title: "Anpassungsbedarf",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Trotz der guten Ausgangslage besteht Anpassungsbedarf: HL7 FHIR-Konformität
                  der ELGA-Schnittstellen, Etablierung eines HDAB für die Sekundärnutzung,
                  Patienten-Opt-out-Mechanismen und Integration in HealthData@EU.
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
          Der EHDS interagiert mit zahlreichen EU-Regulierungen:
        </p>
        <AccordionSection
          items={[
            {
              title: "DSGVO — Besondere Datenkategorien (Art. 9)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Gesundheitsdaten sind besondere Kategorien nach Art. 9 DSGVO. Der EHDS schafft
                  spezifische Rechtsgrundlagen für die Primär- und Sekundärnutzung (Art. 6 Abs. 1
                  lit. e und Art. 9 Abs. 2 lit. i DSGVO). DSGVO-Rechte (Auskunft, Löschung) bleiben
                  vollständig bestehen.
                </p>
              ),
            },
            {
              title: "AI Act — Hochrisiko-KI in der Medizin",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  KI-Systeme, die mit EHDS-Daten trainiert werden, fallen unter die Hochrisiko-Kategorie
                  des AI Act (Anhang III — Gesundheitsversorgung). Doppelte Compliance: EHDS für den
                  Datenzugang, AI Act für das KI-System selbst.
                </p>
              ),
            },
            {
              title: "MDR — Medizinprodukteverordnung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  EHR-Systeme, die als Medizinprodukt klassifiziert werden, unterliegen zusätzlich
                  der MDR (EU 2017/745). Der EHDS vermeidet Doppelregulierung, indem MDR-konforme
                  Produkte bestimmte EHDS-Anforderungen bereits erfüllen.
                </p>
              ),
            },
            {
              title: "NIS2 / NISG — Cybersicherheit",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Gesundheitsdienstleister fallen als &quot;wesentliche Einrichtungen&quot; unter NIS2.
                  Die Cybersicherheitsanforderungen des EHDS an EHR-Systeme ergänzen die NIS2-Pflichten
                  für Gesundheitseinrichtungen.
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
          Je nach Rolle unterscheiden sich die Handlungsschritte:
        </p>
        <AccordionSection
          items={[
            {
              title: "EHR-System-Hersteller: Jetzt handeln",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Gap-Analyse der aktuellen HL7 FHIR-Konformität durchführen. EU-EHR-Austauschformat
                  implementieren. Technische Dokumentation für die EU-Konformitätserklärung vorbereiten.
                  Security-by-Design-Review. Timeline: bis 2027 für Primärnutzung.
                </p>
              ),
            },
            {
              title: "Gesundheitsdienstleister: Systeme upgraden",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Prüfen, ob Ihre EHR-Systeme EHDS-konform sind (oder Upgrade-Pläne mit Herstellern
                  abstimmen). Prozesse für Patientenzugang und Datenübertragbarkeit einrichten.
                  Opt-out-Mechanismen für die Sekundärnutzung implementieren. Mitarbeiter schulen.
                </p>
              ),
            },
            {
              title: "Forscher & KI-Entwickler: Strukturen aufbauen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  HDAB-Antragsverfahren kennenlernen. Datenmanagementpläne EHDS-konform gestalten.
                  Sichere Verarbeitungsumgebungen evaluieren. Ethik-Anforderungen mit EHDS-Auflagen
                  abgleichen. Timeline: ab 2029 für Sekundärnutzung.
                </p>
              ),
            },
            {
              title: "Health-App-Entwickler: Einordnung klären",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Prüfen, ob Ihre App als EHR-System gilt. Wenn ja: Interoperabilitäts-Standards
                  implementieren. Wenn nein: Prüfen, ob Datenaustausch mit dem EHR-Ökosystem
                  gewünscht/erforderlich ist. API-Kompatibilität mit HL7 FHIR sicherstellen.
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
              title: "Können Versicherungen meine Gesundheitsdaten nutzen?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nein. Die Sekundärnutzung für Entscheidungen zum Nachteil natürlicher Personen
                  ist ausdrücklich verboten. Versicherungen dürfen EHDS-Daten nicht für Risikobewertungen,
                  Prämienberechnung oder den Ausschluss von Leistungen verwenden.
                </p>
              ),
            },
            {
              title: "Was passiert mit meinen ELGA-Daten?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  ELGA wird als Österreichs nationale EHR-Infrastruktur in den EHDS integriert. Ihre
                  bestehenden Daten in ELGA werden Teil des EHDS-Ökosystems. Sie behalten alle bisherigen
                  Rechte (inkl. Widerspruch gegen ELGA) und erhalten zusätzlich die EHDS-Rechte
                  (grenzüberschreitender Zugang, Sekundärnutzungs-Opt-out).
                </p>
              ),
            },
            {
              title: "Gilt der EHDS auch für Wellness-Apps (Fitbit, Apple Health)?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nur wenn diese Apps als EHR-System klassifiziert werden oder Daten in ein EHR-System
                  einspeisen. Reine Wellness-Tracker ohne medizinischen Anspruch fallen nicht direkt
                  unter den EHDS, können aber durch nationale Umsetzungsvorschriften erfasst werden.
                </p>
              ),
            },
            {
              title: "Wie teuer wird die EHDS-Compliance?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Für EHR-System-Hersteller: 100.000–500.000 € für HL7 FHIR-Konformität und
                  Zertifizierungsdokumentation. Für Krankenhäuser: Abhängig vom bestehenden
                  Digitalisierungsgrad — von 50.000 € (System-Upgrade) bis mehrere Millionen
                  (komplette EHR-Einführung). Die EU stellt Fördermittel bereit (Digital Europe Programme).
                </p>
              ),
            },
            {
              title: "Können KI-Modelle mit EHDS-Daten trainiert werden?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Ja, unter strengen Auflagen. KI-Training mit Gesundheitsdaten ist ein explizit
                  erlaubter Sekundärnutzungszweck. Voraussetzung: Genehmigung durch den HDAB,
                  Verarbeitung in sicherer Umgebung, Pseudonymisierung der Daten und Einhaltung
                  des AI Act (Hochrisiko-Klassifikation).
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════════ VERWANDTE REGULIERUNGEN ═══════════════════ */}
      <RelatedGuides currentGuide="ehds" accent="#be123c" />

      {/* ═══════════════ TOOL RECOMMENDATION ═══════════════ */}
      <ToolRecommendation regulationKey="ehds" accent={ACCENT} />

      {/* ═══════════════ QUELLEN ═══════════════ */}
      <Section id="quellen" title="Quellen & weiterführende Links">
        <SourceList sources={sources} />
      </Section>
    </GuidePageLayout>
  );
}
