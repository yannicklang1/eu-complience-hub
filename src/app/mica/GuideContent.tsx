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
    title: "Verordnung (EU) 2023/1114 — Markets in Crypto-Assets (MiCA) Volltext",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32023R1114",
    desc: "Offizielle deutsche Fassung im EUR-Lex Portal",
    type: "Verordnung",
  },
  {
    id: 2,
    title: "ESMA — MiCA Level-2 Maßnahmen und Q&A",
    url: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica",
    desc: "Leitlinien, technische Standards und FAQs der europäischen Wertpapieraufsicht",
    type: "Behörde",
  },
  {
    id: 3,
    title: "EBA — MiCA für E-Geld-Token",
    url: "https://www.eba.europa.eu/regulation-and-policy/crypto-assets",
    desc: "Europäische Bankenaufsicht — Leitlinien zu E-Geld-Token und ART",
    type: "Behörde",
  },
  {
    id: 4,
    title: "BaFin — MiCA in Deutschland",
    url: "https://www.bafin.de/DE/RechtUndGrundsaetze/RechtlicheGrundlagen/Gesetze_Verordnungen/MiCA/mica_node.html",
    desc: "Bundesanstalt für Finanzdienstleistungsaufsicht — Nationale Umsetzung",
    type: "Behörde",
  },
  {
    id: 5,
    title: "EU-Kommission — Digital Finance Package",
    url: "https://finance.ec.europa.eu/digital-finance/digital-finance-package_en",
    desc: "Übersicht über das Digital Finance Paket der EU-Kommission",
    type: "Behörde",
  },
  {
    id: 6,
    title: "FATF — Crypto-Asset Guidance",
    url: "https://www.fatf-gafi.org/en/publications/Fatfrecommendations/guidance-rba-virtual-assets-2021.html",
    desc: "FATF-Leitlinien zu virtuellen Assets und Geldwäscheprävention",
    type: "Behörde",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Überblick" },
  { id: "timeline", label: "Timeline & Fristen" },
  { id: "token-typen", label: "Token-Typen" },
  { id: "casp", label: "Crypto-Asset-Dienstleister (CASP)" },
  { id: "whitepaper", label: "Whitepaper-Pflicht" },
  { id: "emittenten", label: "Emittenten-Pflichten" },
  { id: "art-emt", label: "ART & EMT-Sonderregeln" },
  { id: "aml", label: "Geldwäsche & AML" },
  { id: "marktmissbrauch", label: "Marktmissbrauch" },
  { id: "zulassung", label: "Zulassung & Lizenz" },
  { id: "strafen", label: "Strafen & Sanktionen" },
  { id: "drittstaaten", label: "Drittstaaten-Regelung" },
  { id: "fahrplan", label: "Compliance-Fahrplan" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Vollständig ab", value: "30. Dez. 2024" },
  { label: "ART/EMT ab", value: "30. Juni 2024" },
  { label: "Max. Strafe CASP", value: "700.000 € pers." },
  { label: "Min. Kapital CASP", value: "ab 50.000 €" },
  { label: "Whitepaper", value: "Pflicht (meiste Token)" },
  { label: "Lizenz", value: "EU-Passport möglich" },
];

/* ─────────────────── Accent ─────────────────── */
const ACCENT = "#f59e0b";

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
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "bg-[#f59e0b] border-[#f59e0b]" : active ? "bg-white border-[#f59e0b] ring-4 ring-amber-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done ? "text-[#f59e0b]" : active ? "text-[#f59e0b]" : "text-[#7a8db0]"}`}>
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
export default function MiCAGuideContent() {
  return (
    <GuidePageLayout
      title="MiCA — Markets in Crypto-Assets"
      subtitle="Das erste umfassende EU-Regelwerk für Krypto-Assets: Zulassungspflichten, Whitepaper, Marktmissbrauchsverbote und Anlegerschutz."
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      regulationKey="mica"
      href="/mica"
    >
      {/* ═══════════════ 1. ÜBERBLICK ═══════════════ */}
      <Section id="ueberblick" title="Überblick: Was ist MiCA?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Die <strong>Markets in Crypto-Assets Regulation (MiCA)</strong> ist die weltweit erste
          umfassende gesetzliche Regulierung für Krypto-Assets auf EU-Ebene. Sie trat am 29. Juni 2023
          in Kraft und ist in zwei Phasen anwendbar.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          MiCA schafft einen einheitlichen EU-Rechtsrahmen für die Ausgabe von Krypto-Assets und die
          Erbringung von Krypto-Dienstleistungen. Ziel ist Anlegerschutz, Marktintegrität und
          Finanzstabilität — ohne Innovation zu ersticken.
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Einmal zugelassene Anbieter erhalten einen <strong>EU-Passport</strong>: Sie können ihre
          Dienstleistungen in allen 27 EU-Mitgliedstaaten ohne zusätzliche nationale Zulassung anbieten.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="27" label="EU-Länder (Einheitlich)" />
          <StatCard value="2024" label="Vollständige Anwendung" />
          <StatCard value="3" label="Token-Kategorien" />
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-[#3a4a6b] text-sm leading-relaxed">
            <strong>NFTs und DeFi:</strong> Einzigartige, nicht fungible Token (NFTs) fallen grundsätzlich
            nicht unter MiCA. Auch vollständig dezentralisierte Protokolle ohne identifizierbaren Emittenten
            sind nicht erfasst. Dezentrales Finanzwesen (DeFi) wird separat beobachtet — ein
            Bericht der Kommission ist vorgesehen.
          </p>
        </div>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Fristen">
        <div className="space-y-0">
          <TimelineItem
            date="29. Juni 2023"
            title="MiCA tritt in Kraft"
            description="Die Verordnung wird im EU-Amtsblatt veröffentlicht und tritt 20 Tage später in Kraft."
            done
          />
          <TimelineItem
            date="30. Juni 2024"
            title="Anwendung für ART & EMT"
            description="Titel III (Asset-Referenced Token) und Titel IV (E-Geld-Token) werden anwendbar. Emittenten benötigen Zulassung der zuständigen Behörde."
            done
          />
          <TimelineItem
            date="30. Dez. 2024"
            title="Vollständige Anwendung"
            description="Alle weiteren MiCA-Titel werden anwendbar — insbesondere Titel V für Krypto-Asset-Dienstleister (CASP). Übergangsregelungen für bestehende Anbieter gelten bis zu 18 Monate."
            done
          />
          <TimelineItem
            date="bis Juni 2026"
            title="Ende der Übergangsfristen"
            description="Spätestens dann müssen alle Anbieter, die bereits vor MiCA tätig waren, eine vollständige MiCA-Zulassung haben."
            active
          />
          <TimelineItem
            date="2025/2026"
            title="MiCA II — mögliche Erweiterung"
            description="EU-Kommission soll Bericht über DeFi, NFTs und weitere Anpassungsbedarfe vorlegen. Mögliche Erweiterung des MiCA-Rahmens."
          />
        </div>
      </Section>

      {/* ═══════════════ 3. TOKEN-TYPEN ═══════════════ */}
      <Section id="token-typen" title="Token-Kategorien unter MiCA">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          MiCA unterscheidet drei Hauptkategorien von Krypto-Assets mit unterschiedlichen
          Anforderungen:
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "1. Asset-Referenced Token (ART) — Titel III",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Krypto-Assets, die ihren Wert durch Bezug auf mehrere Fiat-Währungen, Rohstoffe oder
                  andere Krypto-Assets stabil halten (z. B. klassische Stablecoins wie DAI-Typ).
                  Besonders strenge Anforderungen: Zulassung durch nationale Behörde, Mindestkapital,
                  Reservevermögen, Governance-Anforderungen. Emittenten müssen EU-ansässig sein.
                </p>
              ),
            },
            {
              title: "2. E-Geld-Token (EMT) — Titel IV",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Krypto-Assets, die auf eine einzelne Fiat-Währung referenzieren und als elektronisches
                  Geld gelten (z. B. USDC-Typ, EUROC). Nur Kreditinstitute und E-Geld-Institute dürfen
                  EMTs ausgeben. Inhaber haben ein Rücknahmerecht zum Nennwert. Zinszahlung ist verboten.
                  EBA hat besondere Aufsichtsbefugnisse für signifikante EMTs.
                  <SourceRef id={3} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "3. Sonstige Krypto-Assets (Utility Token) — Titel II",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Alle anderen Krypto-Assets, die nicht ART oder EMT sind und keinen Wertpapiercharakter
                  haben — typischerweise Utility Token, die Zugang zu einem Dienst oder Netzwerk gewähren.
                  Hauptpflicht: Whitepaper-Erstellung und -Veröffentlichung. Geringere Anforderungen
                  als ART/EMT, aber Marktmissbrauchsregeln gelten trotzdem.
                </p>
              ),
            },
            {
              title: "Ausnahmen vom MiCA-Anwendungsbereich",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nicht erfasst: Wertpapiere (MiFID II gilt), E-Geld nach E-Geld-Richtlinie, einzigartige
                  NFTs (wenn wirklich nicht fungibel), zentrale Bankwährungen (CBDC) und vollständig
                  dezentralisierte Protokolle ohne Emittenten. Einige Stablecoins können unter mehrere
                  Kategorien fallen — Einzelfallprüfung nötig.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 4. CASP ═══════════════ */}
      <Section id="casp" title="Crypto-Asset-Dienstleister (CASP)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Crypto-Asset-Dienstleister benötigen eine <strong>MiCA-Zulassung</strong> der zuständigen
          nationalen Behörde (in Deutschland: BaFin) und unterliegen laufenden Verhaltenspflichten.
          <SourceRef id={4} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <StatCard value="50K €" label="Min. Kapital Klasse 1" />
          <StatCard value="125K €" label="Min. Kapital Klasse 2" />
          <StatCard value="150K €" label="Min. Kapital Klasse 3" />
          <StatCard value="EU-Pass" label="Grenzüberschreitend" />
        </div>
        <AccordionSection
          items={[
            {
              title: "Zugelassene CASP-Dienstleistungen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  MiCA definiert neun Krypto-Dienstleistungen: (1) Verwahrung/Verwaltung, (2) Betrieb
                  einer Handelsplattform, (3) Tausch gegen Fiat-Währung, (4) Tausch gegen andere
                  Krypto-Assets, (5) Ausführung von Aufträgen, (6) Platzierung, (7) Annahme/Übermittlung
                  von Aufträgen, (8) Beratung, (9) Portfolio-Management und (10) Transfer-Services.
                  Für jede Dienstleistung ist eine separate Zulassung erforderlich.
                </p>
              ),
            },
            {
              title: "Anforderungen an Geschäftsleitung und Aktionäre",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Geschäftsleiter müssen ausreichende Kenntnisse, Erfahrungen und Fähigkeiten
                  (Fit & Proper) nachweisen. Qualifizierte Anteilseigner (ab 10 % Beteiligung) werden
                  auf Zuverlässigkeit und Integrität geprüft. Mindestens zwei Personen müssen die
                  Geschäftstätigkeit leiten. Gesellschaftssitz muss in der EU sein.
                </p>
              ),
            },
            {
              title: "Wohlverhaltensregeln",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  CASPs müssen: ehrlich, fair und professionell im besten Interesse der Kunden handeln,
                  klare und transparente Informationen bereitstellen, Interessenkonflikte erkennen und
                  managen, Best Execution sicherstellen und Kundenvermögen getrennt vom Eigenvermögen
                  halten. Kunden-Assets dürfen nicht für eigene Zwecke genutzt werden.
                </p>
              ),
            },
            {
              title: "Organisatorische Anforderungen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Robuste Governance-Strukturen, effektive Risikomanagementprozesse, angemessene
                  interne Kontrollen und Compliance-Funktion sind Pflicht. IKT-Sicherheit muss den
                  DORA-Anforderungen genügen. Notfallpläne für Geschäftskontinuität müssen vorliegen
                  und regelmäßig getestet werden.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 5. WHITEPAPER ═══════════════ */}
      <Section id="whitepaper" title="Whitepaper-Pflicht">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Emittenten von Krypto-Assets (außer bestimmten Ausnahmen) müssen ein <strong>Krypto-Asset-
          Whitepaper</strong> erstellen, bei der zuständigen Behörde notifizieren und veröffentlichen.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Pflichtinhalte des Whitepapers",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Das Whitepaper muss enthalten: Informationen über den Emittenten, das Krypto-Asset-
                  Projekt, das öffentliche Angebot, Zulassung zum Handel, Rechte und Pflichten der
                  Inhaber, verwendete Blockchain-Technologie und zugrunde liegende Protokolle,
                  Risiken und zugehörige Warnhinweise sowie Informationen zum Umwelt-Fußabdruck
                  (Konsensmechanismus).
                </p>
              ),
            },
            {
              title: "Ausnahmen von der Whitepaper-Pflicht",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Kein Whitepaper nötig bei: Angebot an weniger als 150 Personen pro Mitgliedstaat,
                  Gesamtgegenwert unter 1 Mio. € über 12 Monate, Angebote ausschließlich an
                  qualifizierte Anleger, kostenloses Mining/Staking-Belohnungen, einzigartigen NFTs
                  und Krypto-Assets für Dienstleistungsbelohnung (Treueprogramme ohne Sekundärmarkt).
                </p>
              ),
            },
            {
              title: "Haftung für das Whitepaper",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Emittenten haften für den Inhalt des Whitepapers. Anleger, die aufgrund irreführender
                  oder falscher Angaben im Whitepaper Verluste erleiden, haben einen Schadensersatz-
                  anspruch. Das Whitepaper muss eine klare Verantwortlichkeitserklärung enthalten.
                  Mindesthaftungszeitraum: während des öffentlichen Angebots.
                </p>
              ),
            },
            {
              title: "Notifizierung und Veröffentlichung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Das Whitepaper muss mindestens 20 Arbeitstage vor dem öffentlichen Angebot bei der
                  zuständigen nationalen Behörde notifiziert werden. Es muss auf der Website des
                  Emittenten veröffentlicht und für mindestens 10 Jahre zugänglich bleiben. Wesentliche
                  Änderungen erfordern ein aktualisiertes Whitepaper.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 6. EMITTENTEN ═══════════════ */}
      <Section id="emittenten" title="Emittenten-Pflichten (Titel II)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Emittenten von sonstigen Krypto-Assets (weder ART noch EMT) haben folgende Hauptpflichten:
        </p>
        <AccordionSection
          items={[
            {
              title: "Ehrliches, faires und professionelles Handeln",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Emittenten müssen im besten Interesse der Tokeninhaber handeln und dürfen keine
                  irreführenden Informationen verbreiten. Marketing-Kommunikation muss als solche
                  gekennzeichnet sein und mit dem Whitepaper übereinstimmen. Keine falschen oder
                  übertriebenen Versprechen über zukünftige Wertentwicklungen.
                </p>
              ),
            },
            {
              title: "Laufende Informationspflichten",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Wesentliche Änderungen am Projekt, die im Whitepaper beschrieben sind, müssen
                  unverzüglich auf der Website und ggf. in einem aktualisierten Whitepaper offengelegt
                  werden. Regelmäßige Updates über den Projektfortschritt fördern das Anlegervertrauen
                  und reduzieren rechtliche Risiken.
                </p>
              ),
            },
            {
              title: "Recht auf Rücknahme (Cooling-Off)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Anleger haben bei öffentlichen Angeboten von Krypto-Assets in der Regel ein
                  14-tägiges Widerrufsrecht, um ihre Investition ohne Angabe von Gründen rückgängig
                  zu machen. Ausnahmen: wenn der Token bereits zum Handel zugelassen ist. Emittenten
                  müssen klar über dieses Recht informieren.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 7. ART & EMT ═══════════════ */}
      <Section id="art-emt" title="Sonderregeln für ART & EMT">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Asset-Referenced Token und E-Geld-Token unterliegen deutlich strengeren Anforderungen
          aufgrund ihres Potenzials, die Finanzstabilität zu beeinflussen.
          <SourceRef id={3} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Zulassungspflicht für ART-Emittenten",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  ART-Emittenten benötigen eine explizite Zulassung der nationalen Behörde (kein bloßes
                  Notifizierungsverfahren). Anforderungen: Mindestkapital (350.000 €), detaillierter
                  Geschäftsplan, Governance-Rahmen, Interessenkonflikt-Management, Reservevermögen und
                  Rücknahmerecht für Inhaber. Nur EU-ansässige juristische Personen können ART ausgeben.
                </p>
              ),
            },
            {
              title: "Reservevermögen für ART",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  ART-Emittenten müssen ein Reservevermögen halten, das die ausgegebenen Token vollständig
                  deckt. Das Reservevermögen muss sicher und liquide sein, von einem Kreditinstitut
                  verwahrt werden und von den eigenen Vermögenswerten des Emittenten getrennt sein.
                  Anlageregeln und Konzentrationslimits gelten.
                </p>
              ),
            },
            {
              title: "Signifikante ART/EMT — ESMA/EBA-Aufsicht",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  ART oder EMT mit mehr als 10 Mio. Inhabern, einem umlaufenden Wert über 5 Mrd. € oder
                  mehr als 2,5 Mio. täglichen Transaktionen werden als &quot;signifikant&quot; eingestuft.
                  Signifikante Token unterliegen der direkten Aufsicht durch EBA (EMT) oder ESMA (ART) mit
                  strengeren Anforderungen und höheren Kapital- und Liquiditätspuffern.
                  <SourceRef id={2} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "Verbotene Zinszahlungen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  EMT-Inhaber dürfen keine Zinsen oder ähnliche Vorteile erhalten, die an die Haltedauer
                  geknüpft sind. Dies soll verhindern, dass EMTs als Bankeinlagen-Substitut wirken.
                  ART-Emittenten unterliegen ähnlichen, aber weniger strikten Beschränkungen bezüglich
                  Erträgen aus dem Reservevermögen.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 8. AML ═══════════════ */}
      <Section id="aml" title="Geldwäsche & AML-Anforderungen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          MiCA ergänzt die allgemeinen AML-Pflichten. CASPs sind verpflichtete Unternehmen nach der
          EU-Geldwäscherichtlinie und müssen umfassende Sorgfaltspflichten umsetzen.
          <SourceRef id={6} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Travel Rule für Krypto-Asset-Transfers",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die EU Transfer-of-Funds-Verordnung gilt auch für Krypto-Asset-Transfers: CASPs müssen
                  bei Transfers Informationen über Auftraggeber und Begünstigten erheben, verifizieren
                  und weiterleiten. Gilt ab dem ersten Euro (keine De-minimis-Schwelle). Transfers zu
                  und von nicht-verwahrten Wallets erfordern besondere Sorgfalt.
                </p>
              ),
            },
            {
              title: "KYC und Kundensorgfaltspflichten",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Vollständige Identifizierung und Verifizierung aller Kunden (KYC) vor Erbringung
                  von Dienstleistungen. Verstärkte Sorgfaltspflichten bei Hochrisiko-Kunden, politisch
                  exponierten Personen (PEPs) und Transaktionen aus Hochrisikodrittländern. Laufende
                  Transaktionsüberwachung und Meldung verdächtiger Aktivitäten an FIUs.
                </p>
              ),
            },
            {
              title: "EU AML-Behörde (AMLA)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die neue EU-Geldwäschebehörde AMLA (Anti-Money Laundering Authority) übernimmt die
                  direkte Aufsicht über bestimmte CASPs — insbesondere grenzüberschreitend tätige Anbieter.
                  AMLA wird Leitlinien und bindende technische Standards für die AML-Compliance von
                  CASPs entwickeln und direkte Prüfbefugnisse haben.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 9. MARKTMISSBRAUCH ═══════════════ */}
      <Section id="marktmissbrauch" title="Marktmissbrauchsregeln">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          MiCA führt für Krypto-Assets ein Marktmissbrauchsregime ein, das dem für traditionelle
          Finanzinstrumente (MAR) nachempfunden ist.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Verbotene Marktmanipulation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Verboten sind: wash trading (künstliches Handelsvolumen), pump-and-dump-Schemata,
                  spoofing (Scheinaufträge), Verbreitung falscher oder irreführender Informationen,
                  koordinierte Preisabsprachen. Auch das Ausnutzen von Algorithmen zur Marktverzerrung
                  ist explizit verboten.
                </p>
              ),
            },
            {
              title: "Insiderhandel",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Personen mit Insiderinformationen (z. B. Emittenten, CASPs, deren Mitarbeiter) dürfen
                  nicht auf Basis dieser Informationen handeln oder sie weitergeben. Insiderinformationen
                  müssen schnellstmöglich öffentlich gemacht werden. Marktmanipulations-Verdachts-
                  meldungen an Behörden sind für bestimmte Stellen verpflichtend.
                </p>
              ),
            },
            {
              title: "Market Sounding",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Vor größeren Transaktionen können CASPs und Emittenten Informationen an potenzielle
                  Investoren weitergeben (Market Sounding) — unter strengen Auflagen zur Dokumentation,
                  zur Bewertung, ob Informationen insider-relevant sind, und zur Einholung der
                  Vertraulichkeitszustimmung.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 10. ZULASSUNG ═══════════════ */}
      <Section id="zulassung" title="Zulassung & Lizenzverfahren">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Das Zulassungsverfahren für CASPs folgt einem strukturierten Prozess mit klaren Fristen:
        </p>
        <AccordionSection
          items={[
            {
              title: "Antragsinhalte",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der Zulassungsantrag muss enthalten: Geschäftsplan, Beschreibung der Governance-
                  Strukturen, Informationen zur Geschäftsleitung (Fit & Proper), Nachweis des
                  Anfangskapitals, Beschreibung der Risikomanagementprozesse, IKT-Sicherheitskonzept,
                  Kundensicherungskonzept und Informationen zu qualifizierten Anteilseignern.
                </p>
              ),
            },
            {
              title: "Bearbeitungsfristen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nach Eingang eines vollständigen Antrags hat die zuständige Behörde 25 Arbeitstage,
                  um die Vollständigkeit zu prüfen. Für die inhaltliche Prüfung stehen dann 60 Arbeitstage
                  zur Verfügung (verlängerbar). Der Gesamtprozess dauert typischerweise 3–6 Monate.
                </p>
              ),
            },
            {
              title: "EU-Passport-Mechanismus",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Eine MiCA-Zulassung in einem Mitgliedstaat berechtigt zur grenzüberschreitenden
                  Dienstleistungserbringung in der gesamten EU (Passport). Dazu muss der CASP die
                  zuständige Heimatbehörde informieren, die dann die Gaststaatbehörde benachrichtigt.
                  Dienstleistungen können nach Ablauf einer kurzen Wartefrist aufgenommen werden.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 11. STRAFEN ═══════════════ */}
      <Section id="strafen" title="Strafen & Sanktionen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          MiCA sieht ein zweistufiges Sanktionssystem vor: administrative Sanktionen durch Behörden
          und strafrechtliche Sanktionen durch Mitgliedstaaten.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <StatCard value="700K €" label="Max. Strafe Geschäftsleitung" />
          <StatCard value="5 Mio €" label="Max. Strafe Unternehmen" />
          <StatCard value="15 %" label="Alternativ: Gewinn-Abschöpfung" />
          <StatCard value="Entzug" label="Zulassungsentzug möglich" />
        </div>
        <AccordionSection
          items={[
            {
              title: "Administrative Sanktionen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Behörden können verhängen: öffentliche Bekanntmachung des Verstoßes, vorübergehende
                  Untersagung oder Verbot der CASP-Tätigkeit, Zulassungsentzug, vorübergehendes Verbot
                  für Leitungspersonen sowie Geldbußen bis zu 5 Mio. € für Unternehmen und 700.000 €
                  für natürliche Personen (oder höhere Beträge bei Gewinn-Abschöpfung).
                </p>
              ),
            },
            {
              title: "Marktmissbrauch-Sanktionen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Für Marktmanipulation und Insiderhandel können Mitgliedstaaten strafrechtliche
                  Sanktionen vorsehen. Administrative Sanktionen: bis zu 15 Mio. € oder 15 % des
                  Jahresumsatzes (jeweils der höhere Betrag). Natürliche Personen: bis zu 5 Mio. €.
                  Zusätzlich Gewinnabschöpfung in voller Höhe der erzielten Gewinne.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 12. DRITTSTAATEN ═══════════════ */}
      <Section id="drittstaaten" title="Drittstaaten-Regelung">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          MiCA hat klare Regeln für Anbieter aus Nicht-EU-Ländern, die EU-Kunden bedienen wollen.
        </p>
        <AccordionSection
          items={[
            {
              title: "Reverse Solicitation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Drittstaaten-CASPs dürfen Krypto-Dienstleistungen in der EU nur erbringen, wenn der
                  Kunde von sich aus (auf eigene Initiative) die Dienstleistung angefordert hat (Reverse
                  Solicitation). Aktive Werbung oder Vermarktung an EU-Kunden ist ohne EU-Zulassung
                  verboten. ESMA wird klarstellen, was als &quot;eigene Initiative&quot; gilt.
                </p>
              ),
            },
            {
              title: "Keine Äquivalenzregelung für CASPs",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Im Gegensatz zu anderen Finanzmarktregulierungen (MiFID II) gibt es für MiCA keine
                  allgemeine Äquivalenzregelung, die es Drittstaaten-CASPs erlauben würde, im EU-Markt
                  tätig zu werden. Drittstaaten-Anbieter müssen grundsätzlich eine EU-Niederlassung
                  gründen und eine MiCA-Zulassung beantragen.
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
          Für bestehende und neue Marktteilnehmer empfiehlt sich folgendes stufenweises Vorgehen:
        </p>
        <AccordionSection
          items={[
            {
              title: "Schritt 1: Klassifizierung der Aktivitäten",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Bestimmen Sie, ob Ihre Krypto-Assets als ART, EMT oder sonstige Token zu klassifizieren
                  sind. Prüfen Sie, ob Ihre Aktivitäten als CASP-Dienstleistungen gelten. Klären Sie,
                  ob Ihre Token möglicherweise als Wertpapiere (MiFID II) einzustufen sind — was MiCA
                  ausschließen würde. Holen Sie Rechtsrat für grenzwertige Fälle ein.
                </p>
              ),
            },
            {
              title: "Schritt 2: Gap-Analyse und Zulassungsantrag",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Vergleichen Sie Ihre aktuellen Prozesse, Governance-Strukturen und Kapitalausstattung
                  mit den MiCA-Anforderungen. Identifizieren Sie Lücken und erarbeiten Sie einen
                  Umsetzungsplan. Beginnen Sie frühzeitig mit dem Zulassungsantrag — die Behörden
                  sind ausgelastet und Bearbeitungszeiten können länger als die gesetzlichen Fristen sein.
                </p>
              ),
            },
            {
              title: "Schritt 3: Whitepaper und Compliance-Dokumentation",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Erstellen Sie MiCA-konforme Whitepapers für alle anzubietenden Krypto-Assets.
                  Entwickeln Sie Compliance-Handbücher, Richtlinien und Verfahren für alle
                  MiCA-Anforderungen. Implementieren Sie AML/KYC-Prozesse gemäß Travel Rule.
                  Schulen Sie Mitarbeiter zu MiCA-Anforderungen.
                </p>
              ),
            },
            {
              title: "Schritt 4: Laufende Compliance",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nach Zulassung: Regelmäßige Überprüfung der Compliance-Prozesse, Meldung wesentlicher
                  Änderungen an die zuständige Behörde, Aktualisierung der Whitepapers bei wesentlichen
                  Projektänderungen und laufendes Monitoring der ESMA/EBA-Leitlinien und Level-2-Maßnahmen.
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
              title: "Muss ich für jedes Land eine separate Lizenz beantragen?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nein. Eine MiCA-Zulassung in einem EU-Mitgliedstaat berechtigt zur Tätigkeit in der
                  gesamten EU (Passport-Prinzip). Sie müssen nur in dem Land eine Zulassung beantragen,
                  in dem Ihr Unternehmen seinen EU-Sitz hat. Für die grenzüberschreitende Tätigkeit
                  genügt eine Notifikation an die Heimatbehörde.
                </p>
              ),
            },
            {
              title: "Gilt MiCA auch für dezentralisierte Exchanges (DEX)?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Vollständig dezentralisierte Protokolle ohne identifizierbaren Emittenten oder
                  Dienstleistungsanbieter fallen grundsätzlich nicht unter MiCA. Wenn jedoch eine
                  natürliche oder juristische Person hinter dem Protokoll steht oder zentralisierte
                  Elemente vorhanden sind (z. B. Admin Keys), kann MiCA anwendbar sein. Die Grenze
                  ist fließend und wird durch ESMA-Leitlinien konkretisiert.
                </p>
              ),
            },
            {
              title: "Was passiert mit bestehenden Krypto-Unternehmen in der EU?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Bestehende Anbieter, die vor MiCA bereits in einem EU-Mitgliedstaat zugelassen waren,
                  profitieren von einer Übergangsregelung: Sie können ihre Tätigkeit bis zu 18 Monate
                  nach Anwendungsbeginn des jeweiligen MiCA-Titels fortsetzen, ohne vollständige
                  MiCA-Zulassung — sofern sie einen Zulassungsantrag stellen.
                </p>
              ),
            },
            {
              title: "Welche nationalen Behörden sind zuständig?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  In Deutschland ist die BaFin (Bundesanstalt für Finanzdienstleistungsaufsicht) die
                  zuständige Behörde für MiCA. Für die Beaufsichtigung von signifikanten ART und EMT
                  ist die ESMA (für ART) bzw. die EBA (für EMT) direkt zuständig.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════════ VERWANDTE REGULIERUNGEN ═══════════════════ */}
      <RelatedGuides currentGuide="mica" accent="#a16207" />

      {/* ═══════════════ TOOL RECOMMENDATION ═══════════════ */}
      <ToolRecommendation regulationKey="mica" accent={ACCENT} />

      {/* ═══════════════ QUELLEN ═══════════════ */}
      <Section id="quellen" title="Quellen & weiterführende Links">
        <SourceList sources={sources} />
      </Section>
    </GuidePageLayout>
  );
}
