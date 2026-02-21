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
    title: "Verordnung (EU) 2024/1183 — eIDAS 2.0 (Volltext)",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1183",
    desc: "Offizieller Volltext der eIDAS-2.0-Änderungsverordnung",
    type: "Verordnung",
  },
  {
    id: 2,
    title: "EU-Kommission — European Digital Identity",
    url: "https://commission.europa.eu/strategy-and-policy/priorities-2019-2024/europe-fit-digital-age/european-digital-identity_en",
    desc: "Offizielle Informationsseite der EU-Kommission zur EU Digital Identity",
    type: "Behörde",
  },
  {
    id: 3,
    title: "ID Austria — Digitale Identität Österreich",
    url: "https://www.oesterreich.gv.at/id-austria.html",
    desc: "Österreichs elektronischer Identitätsnachweis als eIDAS-Vorläufer",
    type: "Behörde",
  },
  {
    id: 4,
    title: "EU Digital Identity Wallet — Architecture Reference Framework",
    url: "https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework",
    desc: "Technische Architektur und Referenz-Framework für die EU Digital Identity Wallet",
    type: "Technisch",
  },
  {
    id: 5,
    title: "ETSI — Qualified Trust Services Standards",
    url: "https://www.etsi.org/technologies/electronic-signatures",
    desc: "Europäische Standards für elektronische Signaturen und Vertrauensdienste",
    type: "Norm",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Überblick" },
  { id: "timeline", label: "Timeline & Fristen" },
  { id: "wallet", label: "EU Digital Identity Wallet" },
  { id: "betroffene", label: "Wer ist betroffen?" },
  { id: "akzeptanz", label: "Akzeptanzpflichten" },
  { id: "trust-services", label: "Qualified Trust Services" },
  { id: "datenschutz", label: "Datenschutz & Selective Disclosure" },
  { id: "oesterreich", label: "eIDAS in Österreich (ID Austria)" },
  { id: "durchsetzung", label: "Durchsetzung & Sanktionen" },
  { id: "zusammenspiel", label: "Zusammenspiel mit anderen Gesetzen" },
  { id: "fahrplan", label: "Compliance-Fahrplan" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "In Kraft", value: "20. Mai 2024" },
  { label: "Wallet-Pflicht", value: "Ab 2026/2027" },
  { label: "Betrifft", value: "Plattformen & Banken" },
  { label: "EU-weit", value: "Gegenseitige Anerkennung" },
  { label: "Standard", value: "ISO 18013-5 / SD-JWT" },
  { label: "AT-Vorläufer", value: "ID Austria" },
];

/* ─────────────────── Accent ─────────────────── */
const ACCENT = "#0891b2";

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

function StatCard({ value, label, accent = ACCENT }: { value: string; label: string; accent?: string }) {
  return (
    <div className="rounded-2xl border border-[#d8dff0] bg-white p-5 text-center">
      <div className="font-[Syne] font-extrabold text-2xl sm:text-3xl mb-1" style={{ color: accent }}>{value}</div>
      <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider">{label}</div>
    </div>
  );
}

function TimelineItem({
  date, title, description, active = false, done = false,
}: { date: string; title: string; description: React.ReactNode; active?: boolean; done?: boolean }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "bg-[#0891b2] border-[#0891b2]" : active ? "bg-white border-[#0891b2] ring-4 ring-cyan-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done ? "text-[#0891b2]" : active ? "text-[#0891b2]" : "text-[#7a8db0]"}`}>
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
export default function EIDASGuideContent() {
  return (
    <GuidePageLayout
      title="eIDAS 2.0 – EU Digital Identity"
      subtitle="Die EU Digital Identity Wallet kommt: Akzeptanzpflichten für Plattformen, Banken und Behörden."
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      regulationKey="eidas"
      href="/eidas"
    >
      {/* ═══════════════ 1. ÜBERBLICK ═══════════════ */}
      <Section id="ueberblick" title="Überblick: Was ist eIDAS 2.0?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          <strong>eIDAS 2.0</strong> — Verordnung (EU) 2024/1183 — ist die grundlegende Überarbeitung
          der EU-Verordnung für elektronische Identifizierung und Vertrauensdienste. Das Herzstück:
          Jeder EU-Bürger soll eine <strong>EU Digital Identity Wallet (EUDIW)</strong> erhalten — eine
          Smartphone-App, die Personalausweis, Führerschein, Diplome, Gesundheitsdaten und mehr digital
          speichert.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Die ursprüngliche eIDAS-Verordnung (910/2014) hat elektronische Signaturen und
          Vertrauensdienste harmonisiert, aber bei der elektronischen Identifizierung nur die
          gegenseitige Anerkennung nationaler Systeme vorgesehen. eIDAS 2.0 geht radikal weiter:
          Die EU-Wallet wird zur universellen digitalen Identität — verpflichtend akzeptiert von
          Plattformen, Banken, Telekomanbietern und Behörden.
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Für Unternehmen bedeutet dies: Wer Online-Dienste anbietet, muss die EU-Wallet als
          Identifizierungsmethode akzeptieren — inklusive Altersverifikation, KYC-Prozesse und
          Qualifikationsnachweise.
          <SourceRef id={2} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="450 Mio." label="EU-Bürger mit Wallet-Recht" />
          <StatCard value="2026/27" label="Wallet-Bereitstellung" />
          <StatCard value="100 %" label="Kostenlos für Bürger" />
        </div>
        <p className="text-[#3a4a6b] text-sm leading-relaxed bg-cyan-50 border border-cyan-200 rounded-xl p-4">
          <strong>Wichtig:</strong> Die Verordnung trat am 20. Mai 2024 in Kraft. Mitgliedstaaten
          haben 24 Monate (bis Mai 2026) um die Wallet-Infrastruktur aufzubauen. Akzeptanzpflichten
          für Unternehmen folgen stufenweise. Österreichs ID Austria ist ein direkter Vorläufer.
        </p>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Fristen">
        <div className="space-y-0">
          <TimelineItem
            date="20. Mai 2024"
            title="Inkrafttreten eIDAS 2.0"
            description="Verordnung (EU) 2024/1183 tritt in Kraft. Durchführungsrechtsakte werden vorbereitet."
            done
          />
          <TimelineItem
            date="Nov. 2024"
            title="Technische Spezifikationen"
            description="EU-Kommission erlässt erste Durchführungsrechtsakte: Wallet-Architektur, Sicherheitsstandards, Interoperabilitätsprotokoll."
            done
          />
          <TimelineItem
            date="Mai 2026"
            title="Wallet-Bereitstellung"
            description="Mitgliedstaaten müssen mindestens eine EU Digital Identity Wallet kostenlos anbieten."
            active
          />
          <TimelineItem
            date="2026/2027"
            title="Akzeptanzpflichten Phase 1"
            description="Öffentliche Verwaltung, große Online-Plattformen (VLOPs) und Banken müssen die EU-Wallet akzeptieren."
          />
          <TimelineItem
            date="2027/2028"
            title="Akzeptanzpflichten Phase 2"
            description="Erweiterung auf Telekombranche, Gesundheitswesen, Transportsektor und Bildung. Elektronische Attestierungen von Attributen (EAA) werden breit verfügbar."
          />
        </div>
      </Section>

      {/* ═══════════════ 3. WALLET ═══════════════ */}
      <Section id="wallet" title="EU Digital Identity Wallet (EUDIW)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die Wallet ist das Herzstück von eIDAS 2.0 — eine sichere App auf dem Smartphone:
          <SourceRef id={4} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Person Identification Data (PID)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Wallet speichert die Kernidentitätsdaten: Vor- und Nachname, Geburtsdatum,
                  Nationalität und eine eindeutige Kennung. Diese Daten werden vom Mitgliedstaat
                  ausgestellt und haben die gleiche Rechtswirkung wie ein physischer Ausweis.
                </p>
              ),
            },
            {
              title: "Electronic Attestations of Attributes (EAA)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Über die Basisidentität hinaus können Attribute attestiert werden:
                  <strong> Führerschein</strong> (mDL), <strong>Diplome und Qualifikationen</strong>,
                  <strong> Gesundheitsdaten</strong> (eRezepte, Impfzertifikate),
                  <strong> Firmenzugehörigkeit</strong> und <strong>Bankdaten</strong>.
                  Qualifizierte EAA haben die gleiche Rechtswirkung wie behördlich ausgestellte Dokumente.
                </p>
              ),
            },
            {
              title: "Qualified Electronic Signatures (QES)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Wallet ermöglicht qualifizierte elektronische Signaturen — kostenlos für
                  natürliche Personen. QES haben die gleiche Rechtswirkung wie handschriftliche
                  Unterschriften. Unternehmen können Verträge, Anträge und Dokumente vollständig
                  digital abwickeln.
                </p>
              ),
            },
            {
              title: "Technische Architektur",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Wallet basiert auf einer standardisierten Architektur: <strong>ISO 18013-5</strong>
                  (Mobile Driving License), <strong>SD-JWT</strong> (Selective Disclosure JWT),
                  <strong> OpenID4VP/OpenID4VCI</strong> (Verifiable Credentials Austausch).
                  Kryptographische Sicherheit auf Hardware-Level (Secure Element oder TEE).
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 4. BETROFFENE ═══════════════ */}
      <Section id="betroffene" title="Wer ist betroffen?">
        <AccordionSection
          items={[
            {
              title: "Öffentliche Verwaltung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Alle öffentlichen Stellen müssen die EU-Wallet als Identifizierungsmethode
                  akzeptieren. E-Government-Dienste, Behördengänge und öffentliche Ausschreibungen
                  müssen Wallet-kompatibel sein.
                </p>
              ),
            },
            {
              title: "Banken & Finanzdienstleister",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Für KYC-Prozesse (Know Your Customer) und Kontoeröffnungen muss die EU-Wallet
                  als Identifizierungsmethode akzeptiert werden. Die Wallet kann die Video-Ident-
                  oder Post-Ident-Verfahren ersetzen.
                </p>
              ),
            },
            {
              title: "Große Online-Plattformen (VLOPs)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Very Large Online Platforms (VLOPs im Sinne des DSA, 45 Mio.+ Nutzer in der EU)
                  müssen die EU-Wallet als Login- und Verifizierungsoption anbieten. Auch für
                  Altersverifikation relevant.
                </p>
              ),
            },
            {
              title: "Telekommunikationsanbieter",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Telekomfirmen müssen die Wallet für die Registrierung von Prepaid-SIM-Karten
                  und Vertragsabschlüsse akzeptieren. Die eIDAS-Wallet ersetzt den Personalausweis-
                  Scan im Shop.
                </p>
              ),
            },
            {
              title: "Gesundheitswesen & Bildung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Gesundheitsdienstleister akzeptieren die Wallet für Patienten-Identifikation
                  und elektronische Rezepte (Synergien mit EHDS). Bildungseinrichtungen für
                  Anmeldungen und digitale Zeugnisse/Diplome.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 5. AKZEPTANZ ═══════════════ */}
      <Section id="akzeptanz" title="Akzeptanzpflichten für Unternehmen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Unternehmen in regulierten Sektoren müssen die EU-Wallet als Identifizierungsoption einbinden:
        </p>
        <AccordionSection
          items={[
            {
              title: "Relying Party: Was bedeutet das?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Eine &quot;Relying Party&quot; ist ein Dienst, der Wallet-Daten zur Identifizierung oder
                  Attribut-Verifikation nutzt. Relying Parties müssen sich registrieren, ihren
                  Datenbedarf deklarieren und dürfen nur die minimal notwendigen Daten abfragen.
                  Die Registrierung erfolgt bei der nationalen Aufsichtsbehörde.
                </p>
              ),
            },
            {
              title: "Technische Integration",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Integration erfolgt über standardisierte Protokolle: OpenID4VP für die
                  Präsentation von Credentials, OpenID4VCI für die Ausstellung. SDKs und
                  Referenzimplementierungen werden von der EU bereitgestellt. Die meisten
                  Identity-Verification-Provider (IDnow, Veriff, Jumio) werden Wallet-Integration
                  anbieten.
                </p>
              ),
            },
            {
              title: "Kosten & Implementierung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Für die meisten Unternehmen wird die Integration über bestehende Identity-Provider
                  laufen. Geschätzte Kosten: 10.000–50.000 € für die initiale Integration bei
                  mittelgroßen Plattformen. Große Unternehmen mit eigenem IAM: 100.000–500.000 €.
                  Die EU-Wallet-Verifizierung ist für Relying Parties grundsätzlich kostenlos.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 6. TRUST SERVICES ═══════════════ */}
      <Section id="trust-services" title="Qualified Trust Services">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          eIDAS 2.0 erweitert das Spektrum qualifizierter Vertrauensdienste:
          <SourceRef id={5} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Elektronische Signaturen & Siegel",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Qualifizierte elektronische Signaturen (QES) für natürliche Personen und
                  qualifizierte elektronische Siegel für juristische Personen behalten ihre
                  Rechtswirkung. Neu: Kostenlose QES über die EU-Wallet für alle Bürger.
                </p>
              ),
            },
            {
              title: "Elektronische Attestierungen (Neu)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Neue Vertrauensdienst-Kategorie: Qualifizierte Attestierungen von Attributen
                  (QEAA). Verlässliche digitale Nachweise für Qualifikationen, Befugnisse oder
                  Eigenschaften — ausgestellt von qualifizierten Vertrauensdiensteanbietern.
                </p>
              ),
            },
            {
              title: "Elektronische Archivierung (Neu)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Neuer qualifizierter Dienst für die langfristige Aufbewahrung elektronischer
                  Dokumente und Signaturen. Sichert die Beweiskraft elektronisch signierter
                  Dokumente über Jahrzehnte hinweg.
                </p>
              ),
            },
            {
              title: "Elektronische Ledger (Neu)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Neuer qualifizierter Dienst für elektronische Register (Blockchain-basiert
                  oder konventionell). Ermöglicht rechtssichere Aufzeichnungen von Transaktionen,
                  Eigentumsübertragungen und Zeitstempeln.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 7. DATENSCHUTZ ═══════════════ */}
      <Section id="datenschutz" title="Datenschutz & Selective Disclosure">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          eIDAS 2.0 enthält starke Datenschutzgarantien — stärker als viele bisherige Identity-Lösungen:
        </p>
        <AccordionSection
          items={[
            {
              title: "Selective Disclosure",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nutzer können gezielt nur die Attribute teilen, die der Dienst benötigt.
                  Beispiel: Ein Online-Shop fragt nach dem Alter → die Wallet bestätigt nur
                  &quot;über 18&quot;, ohne Name, Adresse oder Geburtsdatum preiszugeben.
                </p>
              ),
            },
            {
              title: "Unlinkability",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Wallet verhindert, dass verschiedene Dienste die Nutzung eines Bürgers
                  korrelieren können. Unterschiedliche Transaktionen sollen nicht miteinander
                  verknüpfbar sein — kein &quot;Super-Cookie&quot; für die digitale Identität.
                </p>
              ),
            },
            {
              title: "Dashboard & Transparenz",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Wallet enthält ein Dashboard, das dem Nutzer zeigt: Wer hat welche Daten
                  wann abgefragt? Welche Attribute wurden geteilt? Der Nutzer behält volle
                  Kontrolle über seine digitale Identität.
                </p>
              ),
            },
            {
              title: "DSGVO-Konformität",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Wallet-Architektur ist DSGVO-konform by Design: Datenminimierung (Selective
                  Disclosure), Zweckbindung (registrierte Relying Parties), Transparenz (Dashboard),
                  Nutzerkontrolle (Einwilligung pro Transaktion). Wallet-Daten werden lokal auf dem
                  Gerät gespeichert, nicht zentral.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 8. ÖSTERREICH ═══════════════ */}
      <Section id="oesterreich" title="eIDAS in Österreich: ID Austria als Fundament">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Österreich hat mit <strong>ID Austria</strong> (Nachfolger der Handy-Signatur) bereits
          eine der fortschrittlichsten eID-Infrastrukturen in der EU:
          <SourceRef id={3} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "ID Austria als Vorläufer",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  ID Austria ermöglicht bereits digitale Identifikation, qualifizierte elektronische
                  Signaturen und E-Government-Zugang. Über 4 Millionen Österreicher nutzen ID Austria.
                  Das System wird zur EU Digital Identity Wallet weiterentwickelt.
                </p>
              ),
            },
            {
              title: "Migration zur EU-Wallet",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Österreich plant, ID Austria nahtlos in die EU-Wallet zu überführen. Bestehende
                  ID-Austria-Nutzer sollen automatisch Zugang zur erweiterten Wallet erhalten.
                  Die technische Migration umfasst: Wallet-App-Update, Credential-Migration und
                  neue Attribute (Führerschein, Gesundheitsdaten).
                </p>
              ),
            },
            {
              title: "Deutschland: AusweisApp2 & BundID",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Deutschland hat mit der AusweisApp2 (Online-Ausweisfunktion des Personalausweises)
                  und BundID (einheitliches Bürgerkonto) eine vergleichbare Ausgangslage. Die
                  Integration in die EU-Wallet erfolgt parallel. Die Akzeptanz ist bisher geringer
                  als in Österreich.
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
              title: "Nationale Aufsichtsbehörden",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Jeder Mitgliedstaat benennt eine Aufsichtsbehörde für Vertrauensdienste und
                  die Wallet-Infrastruktur. In Österreich ist das die RTR. Qualifizierte
                  Vertrauensdiensteanbieter werden regelmäßig auditiert.
                </p>
              ),
            },
            {
              title: "Sanktionsrahmen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Sanktionen werden von den Mitgliedstaaten festgelegt und müssen wirksam,
                  verhältnismäßig und abschreckend sein. Vertrauensdiensteanbieter, die die
                  Qualitätsanforderungen nicht erfüllen, können ihre Qualifizierung verlieren.
                  Unternehmen, die die Wallet-Akzeptanz verweigern, können sanktioniert werden.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 10. ZUSAMMENSPIEL ═══════════════ */}
      <Section id="zusammenspiel" title="Zusammenspiel mit anderen EU-Gesetzen">
        <AccordionSection
          items={[
            {
              title: "DSGVO — Datenschutz",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die EU-Wallet ist DSGVO-konform by Design. Selective Disclosure und lokale
                  Datenspeicherung minimieren Datenschutzrisiken. Die Verarbeitung von Wallet-Daten
                  durch Relying Parties unterliegt vollständig der DSGVO.
                </p>
              ),
            },
            {
              title: "DSA — Altersverifikation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  VLOPs müssen Minderjährige schützen (Art. 28 DSA). Die EU-Wallet bietet eine
                  datenschutzfreundliche Altersverifikation: Bestätigung &quot;über 18&quot; ohne
                  Weitergabe des Geburtsdatums. Löst das bisherige Dilemma zwischen
                  Jugendschutz und Datenminimierung.
                </p>
              ),
            },
            {
              title: "AML / KYC — Geldwäscheprävention",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die EU-Wallet kann KYC-Prozesse (Know Your Customer) in der Finanzbranche
                  revolutionieren: Sofortige, verifizierte Identitätsprüfung ohne Video-Ident.
                  Integration in bestehende AML-Compliance-Systeme möglich.
                </p>
              ),
            },
            {
              title: "EHDS — Gesundheitsdaten",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die EU-Wallet kann als Patienten-Identifikation im EHDS dienen. Elektronische
                  Verschreibungen und Gesundheitsattribute können über die Wallet grenzüberschreitend
                  geteilt werden.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 11. FAHRPLAN ═══════════════ */}
      <Section id="fahrplan" title="Compliance-Fahrplan">
        <AccordionSection
          items={[
            {
              title: "Verpflichtete Sektoren: Jetzt vorbereiten",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Banken, Telekomfirmen, VLOPs und öffentliche Verwaltung: Bewerten Sie, welche
                  Prozesse durch die EU-Wallet betroffen sind (KYC, Altersverifikation, Login).
                  Evaluieren Sie Identity-Verification-Provider auf Wallet-Readiness. Planen Sie
                  Budget für die technische Integration.
                </p>
              ),
            },
            {
              title: "Online-Dienste: Wallet als Login-Option",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Planen Sie die EU-Wallet als zusätzliche Login-Option neben bestehenden Methoden.
                  Die Integration erfolgt über standardisierte APIs (OpenID4VP). Testen Sie mit
                  den EU-Referenz-Wallets, die als Open Source verfügbar sind.
                </p>
              ),
            },
            {
              title: "Vertrauensdiensteanbieter: Neue Dienste",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Evaluieren Sie neue Geschäftsmöglichkeiten: Qualifizierte Attestierungen (QEAA),
                  elektronische Archivierung und Ledger-Dienste. Die Qualifizierung erfolgt über
                  die nationale Aufsichtsbehörde.
                </p>
              ),
            },
            {
              title: "Alle Unternehmen: Digitale Signatur nutzen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Prüfen Sie, welche Prozesse durch QES digitalisiert werden können: Verträge,
                  Bestellungen, HR-Dokumente, Protokolle. Kostenlose QES über die EU-Wallet
                  senkt die Einstiegshürde erheblich.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 12. FAQ ═══════════════ */}
      <Section id="faq" title="Häufige Fragen (FAQ)">
        <AccordionSection
          items={[
            {
              title: "Muss ich die EU-Wallet als Login akzeptieren?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nur wenn Sie in einem verpflichteten Sektor tätig sind (öffentliche Verwaltung,
                  Banken, Telekom, VLOPs). Andere Online-Dienste können die Wallet freiwillig
                  integrieren — es wird aber erwartet, dass die Wallet zum De-facto-Standard wird.
                </p>
              ),
            },
            {
              title: "Kann die EU-Wallet meinen Personalausweis ersetzen?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Ja, die PID (Person Identification Data) in der Wallet hat die gleiche Rechtswirkung
                  wie ein physischer Ausweis — für Online-Transaktionen. Für physische Grenzkontrollen
                  bleibt der physische Ausweis vorerst erforderlich, aber auch hier sind Pilotprojekte
                  geplant.
                </p>
              ),
            },
            {
              title: "Was passiert mit ID Austria?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  ID Austria wird in die EU-Wallet überführt. Bestehende Funktionen (E-Government,
                  QES) bleiben erhalten und werden erweitert (Führerschein, Gesundheitsdaten,
                  grenzüberschreitende Nutzung). Für Nutzer soll der Übergang nahtlos sein.
                </p>
              ),
            },
            {
              title: "Wie sicher ist die EU-Wallet?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Wallet nutzt Hardware-basierte Sicherheit (Secure Element oder Trusted
                  Execution Environment). Kryptographische Schlüssel verlassen das Gerät nie.
                  Die Architektur wird regelmäßig auditiert. Das Sicherheitsniveau ist höher als
                  bei herkömmlichen Username/Passwort-Systemen oder Social-Login.
                </p>
              ),
            },
            {
              title: "Können Unternehmen eigene Wallets anbieten?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nein. Die EU-Wallet wird von den Mitgliedstaaten bereitgestellt (oder von
                  beauftragten Anbietern). Private Wallet-Anbieter können jedoch als qualifizierte
                  Vertrauensdiensteanbieter EAA ausstellen oder Wallet-Infrastruktur-Dienste anbieten.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════════ VERWANDTE REGULIERUNGEN ═══════════════════ */}
      <RelatedGuides currentGuide="eidas" accent="#0e7490" />

      {/* ═══════════════ TOOL RECOMMENDATION ═══════════════ */}
      <ToolRecommendation regulationKey="eidas" accent={ACCENT} />

      {/* ═══════════════ QUELLEN ═══════════════ */}
      <Section id="quellen" title="Quellen & weiterführende Links">
        <SourceList sources={sources} />
      </Section>
    </GuidePageLayout>
  );
}
