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
    title: "Verordnung (EU) 2022/2065 — Digital Services Act (Volltext)",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32022R2065",
    desc: "Offizieller Volltext des Digital Services Act im EU-Amtsblatt",
    type: "Verordnung",
  },
  {
    id: 2,
    title: "EU-Kommission — Digital Services Act Package",
    url: "https://digital-strategy.ec.europa.eu/en/policies/digital-services-act-package",
    desc: "Offizielle Informationsseite der EU-Kommission zum DSA",
    type: "Behörde",
  },
  {
    id: 3,
    title: "DSA Transparency Database",
    url: "https://transparency.dsa.ec.europa.eu/",
    desc: "Öffentliche EU-Datenbank für Moderationsentscheidungen nach Art. 17 DSA",
    type: "Datenbank",
  },
  {
    id: 4,
    title: "KommAustria — Digital Services Coordinator Österreich",
    url: "https://www.rtr.at/medien/aktuelles/entscheidungen/dsc.de.html",
    desc: "RTR/KommAustria als österreichischer Koordinator für digitale Dienste",
    type: "Behörde",
  },
  {
    id: 5,
    title: "Digitale-Dienste-Gesetz (DDG) — Deutschland",
    url: "https://www.gesetze-im-internet.de/ddg/",
    desc: "Deutsches Durchführungsgesetz zum Digital Services Act",
    type: "Gesetz",
  },
  {
    id: 6,
    title: "EU-Kommission — VLOP/VLOSE Designations",
    url: "https://digital-strategy.ec.europa.eu/en/policies/list-designated-vlops-and-vloses",
    desc: "Liste der designierten Very Large Online Platforms und Suchmaschinen",
    type: "Behörde",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Überblick" },
  { id: "timeline", label: "Timeline & Fristen" },
  { id: "betroffene", label: "Wer ist betroffen?" },
  { id: "pflichten-alle", label: "Pflichten: Alle Vermittlungsdienste" },
  { id: "pflichten-hosting", label: "Pflichten: Hosting-Dienste" },
  { id: "pflichten-plattformen", label: "Pflichten: Online-Plattformen" },
  { id: "pflichten-vlop", label: "Pflichten: VLOPs & VLOSEs" },
  { id: "werbung", label: "Werbetransparenz" },
  { id: "minderjaehrige", label: "Minderjährigenschutz" },
  { id: "durchsetzung", label: "Durchsetzung & Sanktionen" },
  { id: "oesterreich", label: "DSA in Österreich & DACH" },
  { id: "zusammenspiel", label: "Zusammenspiel mit anderen Gesetzen" },
  { id: "fahrplan", label: "Compliance-Fahrplan" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Strafe", value: "6 % des Umsatzes" },
  { label: "In Kraft seit", value: "17. Feb. 2024" },
  { label: "VLOP-Schwelle", value: "45 Mio. Nutzer" },
  { label: "Betrifft", value: "Online-Plattformen" },
  { label: "Transparenz", value: "Halbjährlich" },
  { label: "Koordinator AT", value: "KommAustria" },
];

/* ─────────────────── Accent ─────────────────── */
const ACCENT = "#6366f1";

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
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "bg-[#6366f1] border-[#6366f1]" : active ? "bg-white border-[#6366f1] ring-4 ring-indigo-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done ? "text-[#6366f1]" : active ? "text-[#6366f1]" : "text-[#7a8db0]"}`}>
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
export default function DSAGuideContent() {
  return (
    <GuidePageLayout
      title="Digital Services Act (DSA)"
      subtitle="EU-Plattformregulierung: Sorgfaltspflichten für Online-Dienste — von Notice-and-Action bis Werbetransparenz."
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      regulationKey="dsa"
      href="/dsa"
    >
      {/* ═══════════════ 1. ÜBERBLICK ═══════════════ */}
      <Section id="ueberblick" title="Überblick: Was ist der Digital Services Act?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Der <strong>Digital Services Act (DSA)</strong> — Verordnung (EU) 2022/2065 — ist das zentrale
          EU-Gesetz zur Regulierung von Online-Plattformen und digitalen Diensten. Er verpflichtet
          Vermittlungsdienste, Hosting-Provider und Online-Plattformen zu umfassenden Sorgfaltspflichten
          beim Umgang mit illegalen Inhalten, Werbetransparenz und Nutzerrechten.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Der DSA folgt dem Prinzip <strong>&quot;Was offline illegal ist, muss auch online illegal sein&quot;</strong> und
          ersetzt die 20 Jahre alte E-Commerce-Richtlinie (2000/31/EG) teilweise. Das Haftungsprivileg
          für neutrale Vermittler bleibt bestehen, aber die Pflichten zur aktiven Bekämpfung illegaler
          Inhalte steigen erheblich.
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Der DSA gilt als <strong>EU-Verordnung</strong> unmittelbar in allen 27 Mitgliedstaaten — ohne
          nationale Umsetzung. Für die Durchsetzung wurden in jedem Land Koordinatoren für digitale
          Dienste (Digital Services Coordinators) ernannt.
          <SourceRef id={2} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="6 %" label="Max. Strafe vom Umsatz" />
          <StatCard value="45 Mio." label="VLOP-Schwelle (Nutzer)" />
          <StatCard value="Feb 2024" label="Gilt für alle Plattformen" />
        </div>
        <p className="text-[#3a4a6b] text-sm leading-relaxed bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <strong>Wichtig:</strong> Der DSA gilt bereits seit dem 17. Februar 2024 für alle betroffenen Dienste —
          auch für kleine und mittlere Plattformen. Für designierte VLOPs/VLOSEs (z. B. Google, Meta, Amazon,
          TikTok) gelten die schärfsten Pflichten bereits seit August 2023.
        </p>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Fristen">
        <div className="space-y-0">
          <TimelineItem
            date="15. Dez. 2020"
            title="Kommissionsvorschlag"
            description="Die EU-Kommission legt den DSA-Entwurf als Teil des Digital Services Package vor."
            done
          />
          <TimelineItem
            date="19. Okt. 2022"
            title="Veröffentlichung im Amtsblatt"
            description="Verordnung (EU) 2022/2065 wird im EU-Amtsblatt veröffentlicht und tritt am 16. November 2022 in Kraft."
            done
          />
          <TimelineItem
            date="25. Aug. 2023"
            title="VLOPs/VLOSEs: Volle Anwendung"
            description="17 designierte Very Large Online Platforms (VLOPs) und Very Large Online Search Engines (VLOSEs) müssen alle DSA-Pflichten erfüllen."
            done
          />
          <TimelineItem
            date="17. Feb. 2024"
            title="Alle Vermittlungsdienste: Volle Anwendung"
            description="Der DSA gilt vollständig für alle Vermittlungsdienste, Hosting-Provider und Online-Plattformen — unabhängig von ihrer Größe."
            done
          />
          <TimelineItem
            date="2025/2026"
            title="Erste Enforcement-Welle"
            description="EU-Kommission und nationale Koordinatoren verstärken Prüfungen. Erste Verfahren gegen Plattformen laufen bereits."
            active
          />
          <TimelineItem
            date="Laufend"
            title="Halbjährliche Transparenzberichte"
            description="Online-Plattformen müssen mindestens halbjährlich Transparenzberichte zu Content-Moderation veröffentlichen."
          />
        </div>
      </Section>

      {/* ═══════════════ 3. BETROFFENE ═══════════════ */}
      <Section id="betroffene" title="Wer ist betroffen?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Der DSA verwendet ein <strong>abgestuftes System</strong>: Je größer die Plattform und je
          höher das Risiko, desto mehr Pflichten gelten. Vier Kategorien von Diensten werden unterschieden:
        </p>
        <AccordionSection
          items={[
            {
              title: "Vermittlungsdienste (alle) — Art. 11–15 DSA",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  <strong>Betrifft:</strong> Alle digitalen Dienste, die als Vermittler agieren — Internetzugangsanbieter (ISPs),
                  Domain-Registrare, CDNs, VPN-Dienste, Suchmaschinen und Cloud-Infrastruktur.
                  <br /><br />
                  <strong>Haftungsprivileg:</strong> Reine Durchleitung (Art. 4), Caching (Art. 5) und Hosting (Art. 6)
                  genießen weiterhin eine bedingte Haftungsfreistellung — solange der Anbieter keine Kenntnis von
                  illegalen Inhalten hat oder bei Kenntnis unverzüglich handelt.
                </p>
              ),
            },
            {
              title: "Hosting-Dienste — Art. 16–18 DSA",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  <strong>Betrifft:</strong> Alle Dienste, die nutzergenerierte Inhalte speichern — Cloud-Speicher,
                  Webhosting, Datenbanken, aber auch SaaS-Plattformen mit User-Content-Funktionen
                  (Kommentare, Uploads, Profile).
                  <br /><br />
                  <strong>Zusätzliche Pflichten:</strong> Notice-and-Action-Verfahren (Art. 16), Begründungspflicht
                  bei Entscheidungen (Art. 17), Meldepflicht bei Verdacht auf Straftaten (Art. 18).
                </p>
              ),
            },
            {
              title: "Online-Plattformen — Art. 19–32 DSA",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  <strong>Betrifft:</strong> Hosting-Dienste, die Inhalte öffentlich verbreiten — soziale Netzwerke,
                  Online-Marktplätze, App-Stores, Bewertungsportale, Reisebuchungs-Plattformen, Foren
                  mit öffentlicher Reichweite.
                  <br /><br />
                  <strong>Zusätzliche Pflichten:</strong> Internes Beschwerdemanagement (Art. 20), außergerichtliche
                  Streitbeilegung (Art. 21), Trusted-Flagger-System (Art. 22), Maßnahmen gegen Missbrauch (Art. 23),
                  Werbetransparenz (Art. 26), Empfehlungssysteme-Transparenz (Art. 27).
                  <br /><br />
                  <strong>KMU-Ausnahme:</strong> Mikro- und Kleinunternehmen (unter 50 Mitarbeiter und unter 10 Mio. €
                  Umsatz) sind von einigen Online-Plattform-Pflichten ausgenommen.
                </p>
              ),
            },
            {
              title: "VLOPs & VLOSEs — Art. 33–48 DSA",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  <strong>Betrifft:</strong> Plattformen und Suchmaschinen mit mindestens 45 Millionen monatlich
                  aktiven Nutzern in der EU. Designiert durch die EU-Kommission.
                  <br /><br />
                  <strong>Designierte VLOPs (Auswahl):</strong> Amazon, Apple App Store, Booking.com, Facebook,
                  Google Maps, Google Play, Google Shopping, Instagram, LinkedIn, Pinterest, Snapchat, TikTok,
                  X (Twitter), Wikipedia, YouTube, Zalando, AliExpress, Temu, Shein.
                  <SourceRef id={6} sources={sources} accent={ACCENT} />
                  <br /><br />
                  <strong>Designierte VLOSEs:</strong> Google Search, Bing.
                  <br /><br />
                  <strong>Schärfste Pflichten:</strong> Jährliche Risikobewertung (Art. 34), Risikominderungsmaßnahmen
                  (Art. 35), Krisenreaktion (Art. 36), unabhängiges Audit (Art. 37), Empfehlungssysteme ohne Profiling
                  (Art. 38), Datenzugang für Forscher (Art. 40), Compliance-Officer (Art. 41).
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 4. PFLICHTEN ALLE ═══════════════ */}
      <Section id="pflichten-alle" title="Pflichten: Alle Vermittlungsdienste">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die Basispflichten gelten für <em>jeden</em> Vermittlungsdienst, unabhängig von Größe oder Art:
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Kontaktstelle & Rechtsvertreter (Art. 11–13)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Jeder Vermittlungsdienst muss eine zentrale Kontaktstelle für Behörden und Nutzer benennen.
                  Nicht-EU-Anbieter brauchen einen Rechtsvertreter in der EU. Diese Angaben müssen öffentlich
                  und leicht zugänglich sein.
                </p>
              ),
            },
            {
              title: "AGB-Transparenz (Art. 14)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Allgemeinen Geschäftsbedingungen müssen klar, verständlich und in der Sprache der
                  Nutzer verfügbar sein. Änderungen müssen rechtzeitig mitgeteilt werden. AGB müssen
                  Informationen über Content-Moderation-Richtlinien, algorithmische Entscheidungen und
                  Beschwerdemöglichkeiten enthalten.
                </p>
              ),
            },
            {
              title: "Transparenzberichte (Art. 15)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Mindestens jährlich (für VLOPs halbjährlich) müssen öffentliche Berichte veröffentlicht
                  werden über: Anzahl behördlicher Anordnungen, Notice-and-Action-Statistiken, eigene
                  Content-Moderation-Maßnahmen, Nutzung automatisierter Systeme zur Inhalteerkennung.
                </p>
              ),
            },
            {
              title: "Zusammenarbeit mit Behörden (Art. 9–10)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Behördliche Anordnungen zur Entfernung illegaler Inhalte oder zur Herausgabe von
                  Informationen müssen unverzüglich bearbeitet werden. Der Dienst muss Behörden über
                  die ergriffenen Maßnahmen informieren.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 5. PFLICHTEN HOSTING ═══════════════ */}
      <Section id="pflichten-hosting" title="Pflichten: Hosting-Dienste">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Hosting-Dienste, die Nutzerinhalte speichern, haben zusätzlich zu den Basispflichten
          folgende Verpflichtungen:
        </p>
        <AccordionSection
          items={[
            {
              title: "Notice-and-Action-Verfahren (Art. 16)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Hosting-Dienste müssen ein einfaches, elektronisches Verfahren einrichten, über das
                  jede Person illegale Inhalte melden kann. Die Meldung muss eine Erklärung enthalten,
                  warum der Inhalt illegal ist, sowie die URL. Der Dienst muss zeitnah und sorgfältig
                  entscheiden — und den Meldenden über das Ergebnis informieren.
                </p>
              ),
            },
            {
              title: "Begründungspflicht (Art. 17)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Wenn ein Hosting-Dienst Inhalte einschränkt oder entfernt, muss er den betroffenen
                  Nutzer mit einer klaren und spezifischen Begründung informieren. Die Begründung muss
                  den konkreten Verstoß benennen und über Rechtsbehelfe aufklären. Alle Entscheidungen
                  werden in der DSA Transparency Database der EU-Kommission veröffentlicht.
                  <SourceRef id={3} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
            {
              title: "Meldepflicht bei Straftatverdacht (Art. 18)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Bei Verdacht auf schwere Straftaten, die das Leben oder die Sicherheit von Personen
                  bedrohen, müssen Hosting-Dienste die zuständigen Strafverfolgungsbehörden unverzüglich
                  informieren.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 6. PFLICHTEN PLATTFORMEN ═══════════════ */}
      <Section id="pflichten-plattformen" title="Pflichten: Online-Plattformen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Online-Plattformen — Dienste, die Inhalte öffentlich verbreiten — unterliegen dem
          umfangreichsten Pflichtenkatalog unterhalb der VLOP-Schwelle:
        </p>
        <AccordionSection
          items={[
            {
              title: "Internes Beschwerdemanagement (Art. 20)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nutzer müssen über ein internes System Einspruch gegen Moderationsentscheidungen
                  einlegen können — kostenlos, elektronisch und innerhalb von 6 Monaten. Die Plattform
                  muss Beschwerden durch qualifiziertes Personal prüfen (nicht nur automatisiert) und
                  zeitnah entscheiden.
                </p>
              ),
            },
            {
              title: "Außergerichtliche Streitbeilegung (Art. 21)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nutzer haben das Recht, zertifizierte außergerichtliche Streitbeilegungsstellen
                  anzurufen. Diese Stellen sind unabhängig und ihre Entscheidungen zwar nicht bindend,
                  aber die Plattform muss sich mit dem Ergebnis auseinandersetzen.
                </p>
              ),
            },
            {
              title: "Trusted Flaggers (Art. 22)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Vom Digital Services Coordinator benannte vertrauenswürdige Hinweisgeber (Trusted Flaggers)
                  erhalten vorrangige Behandlung ihrer Meldungen. In Österreich werden diese von der
                  KommAustria zertifiziert. Plattformen müssen Meldungen von Trusted Flaggers
                  prioritär und innerhalb kürzerer Fristen bearbeiten.
                </p>
              ),
            },
            {
              title: "Dark-Patterns-Verbot (Art. 25)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Plattformen dürfen ihre Nutzeroberflächen nicht so gestalten, dass Nutzer manipuliert,
                  getäuscht oder in ihrer Entscheidungsfreiheit beeinträchtigt werden (Dark Patterns).
                  Dazu gehören: versteckte Abmelde-Optionen, erzwungene Zustimmungen, irreführende
                  Standardeinstellungen und manipulative Gestaltung von Cookie-Bannern.
                </p>
              ),
            },
            {
              title: "Online-Marktplatz-Pflichten (Art. 30–32)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Online-Marktplätze müssen Händler vor Vertragsschluss identifizieren (Know Your Business
                  Customer). Dazu gehören: Firmenbuchauszug, Kontaktdaten, Umsatzsteuer-ID und
                  Produktsicherheitsangaben. Zufallsstichproben in offiziellen Datenbanken sind Pflicht.
                  Bei gefälschten oder gefährlichen Produkten muss die Plattform proaktiv handeln.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 7. VLOP/VLOSE ═══════════════ */}
      <Section id="pflichten-vlop" title="Pflichten: VLOPs & VLOSEs (45 Mio.+ Nutzer)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Very Large Online Platforms (VLOPs) und Very Large Online Search Engines (VLOSEs) mit
          mindestens 45 Millionen monatlich aktiven Nutzern in der EU tragen die höchsten Pflichten:
          <SourceRef id={6} sources={sources} accent={ACCENT} />
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="Jährlich" label="Risikobewertung Pflicht" />
          <StatCard value="Audit" label="Unabhängige Prüfung" />
          <StatCard value="Echtzeit" label="Datenzugang für Forscher" />
        </div>
        <AccordionSection
          items={[
            {
              title: "Systemische Risikobewertung (Art. 34)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  VLOPs müssen mindestens jährlich eine umfassende Risikobewertung durchführen:
                  Risiken durch Verbreitung illegaler Inhalte, negative Auswirkungen auf Grundrechte
                  (Meinungsfreiheit, Privatsphäre, Nichtdiskriminierung), Manipulation (Wahlbeeinflussung,
                  Desinformation) und Auswirkungen auf Minderjährige und die öffentliche Gesundheit.
                </p>
              ),
            },
            {
              title: "Risikominderungsmaßnahmen (Art. 35)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Basierend auf der Risikobewertung müssen VLOPs angemessene Maßnahmen ergreifen:
                  Anpassung von Algorithmen, Moderations-Verstärkung, Kooperation mit Trusted Flaggers,
                  Sensibilisierungsmaßnahmen und Zugang zu Prüf-APIs für unabhängige Forscher.
                </p>
              ),
            },
            {
              title: "Krisenreaktion (Art. 36)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Bei Krisen (Pandemien, bewaffneten Konflikten, Terroranschlägen) kann die EU-Kommission
                  VLOPs zu verstärkten Maßnahmen verpflichten — z. B. Priorisierung offizieller Informationen,
                  verstärkte Moderation von Desinformation oder temporäre Einschränkung viraler Verbreitung.
                </p>
              ),
            },
            {
              title: "Unabhängiges Audit (Art. 37)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Mindestens jährlich muss ein unabhängiges Audit durch EU-zertifizierte Prüfer
                  durchgeführt werden. Das Audit umfasst: Risikobewertung, Moderationspraktiken,
                  Werbetransparenz, algorithmische Systeme und Einhaltung des DSA insgesamt.
                  Die Ergebnisse sind öffentlich.
                </p>
              ),
            },
            {
              title: "Datenzugang für Forscher (Art. 40)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  VLOPs müssen überprüften Forschern Zugang zu ihren Daten gewähren — für die
                  Erforschung systemischer Risiken. Die EU-Kommission kann den Zugang erzwingen.
                  Dies umfasst öffentlich zugängliche Daten, aber auch aggregierte Nutzungsdaten.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 8. WERBUNG ═══════════════ */}
      <Section id="werbung" title="Werbetransparenz (Art. 26–28)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Der DSA enthält strenge Regeln für Online-Werbung, die weit über die DSGVO hinausgehen:
        </p>
        <AccordionSection
          items={[
            {
              title: "Kennzeichnungspflicht (Art. 26)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Jede Werbeanzeige auf einer Plattform muss klar als solche erkennbar sein. Nutzer müssen
                  in Echtzeit sehen können: (1) dass es sich um Werbung handelt, (2) in wessen Namen die
                  Werbung geschaltet wird, (3) wer dafür bezahlt hat, und (4) die wichtigsten Parameter
                  für das Targeting. Diese Informationen müssen direkt an der Anzeige sichtbar sein.
                </p>
              ),
            },
            {
              title: "Verbot von Profiling-basierter Werbung an Minderjährige (Art. 28)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Plattformen dürfen Minderjährigen keine auf Profiling basierende Werbung anzeigen.
                  Wenn die Plattform mit hinreichender Sicherheit erkennen kann, dass ein Nutzer
                  minderjährig ist, ist jegliches Werbe-Profiling verboten.
                </p>
              ),
            },
            {
              title: "Verbot sensibler Targeting-Kategorien (Art. 26 Abs. 3)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Werbe-Targeting basierend auf besonderen Kategorien personenbezogener Daten (DSGVO Art. 9)
                  ist verboten — also kein Targeting nach Gesundheitszustand, politischer Überzeugung,
                  ethnischer Herkunft, sexueller Orientierung oder religiöser Überzeugung.
                </p>
              ),
            },
            {
              title: "VLOP: Werbearchiv (Art. 39)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  VLOPs müssen ein öffentliches, durchsuchbares Werbearchiv führen — ein Jahr nach
                  der letzten Ausspielung. Das Archiv muss enthalten: Inhalt der Werbung, Auftraggeber,
                  Zeitraum, Targeting-Parameter, erreichte Nutzergruppen und Gesamtreichweite.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 9. MINDERJÄHRIGE ═══════════════ */}
      <Section id="minderjaehrige" title="Minderjährigenschutz">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Der DSA enthält spezifische Schutzmaßnahmen für Minderjährige:
        </p>
        <AccordionSection
          items={[
            {
              title: "Hohes Schutzniveau (Art. 28)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Plattformen müssen ein hohes Schutzniveau für die Privatsphäre, Sicherheit und das
                  Wohlbefinden von Minderjährigen gewährleisten. Dies umfasst altersspezifische
                  Standardeinstellungen, Einschränkungen bei Empfehlungssystemen und den Verzicht auf
                  Manipulationstechniken, die Minderjährige ausnutzen.
                </p>
              ),
            },
            {
              title: "Kein Profiling-Targeting",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Werbung basierend auf Profiling ist für Minderjährige komplett verboten. Plattformen
                  müssen angemessene Maßnahmen treffen, um das Alter ihrer Nutzer festzustellen —
                  ohne dabei unverhältnismäßig viele Daten zu erheben.
                </p>
              ),
            },
            {
              title: "VLOPs: Spezielle Risikobewertung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  VLOPs müssen in ihrer jährlichen Risikobewertung (Art. 34) ausdrücklich die
                  Auswirkungen auf Minderjährige analysieren — insbesondere bei Algorithmen,
                  die süchtig machende Nutzungsmuster fördern könnten.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 10. DURCHSETZUNG ═══════════════ */}
      <Section id="durchsetzung" title="Durchsetzung & Sanktionen">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="6 %" label="Max. Strafe vom Jahresumsatz" />
          <StatCard value="1 %" label="Strafe für falsche Auskünfte" />
          <StatCard value="5 %" label="Zwangsgeld pro Tag" />
        </div>
        <AccordionSection
          items={[
            {
              title: "Sanktionsrahmen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Bei Verstößen drohen Geldbußen von bis zu <strong>6 % des weltweiten Jahresumsatzes</strong>.
                  Falsche, unvollständige oder irreführende Auskünfte gegenüber Behörden: bis zu 1 % des
                  Jahresumsatzes. Nichtbeachtung einstweiliger Maßnahmen: Zwangsgelder bis 5 % des
                  durchschnittlichen Tagesumsatzes pro Tag.
                </p>
              ),
            },
            {
              title: "Dual-Enforcement-System",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  <strong>VLOPs/VLOSEs:</strong> Direkte Aufsicht durch die EU-Kommission. Die Kommission
                  kann selbst Verfahren einleiten, Audits anordnen und Bußgelder verhängen.
                  <br /><br />
                  <strong>Alle anderen:</strong> Nationale Digital Services Coordinators (DSCs) sind zuständig.
                  In Österreich ist das die KommAustria/RTR, in Deutschland die Bundesnetzagentur.
                </p>
              ),
            },
            {
              title: "Grenzüberschreitende Zusammenarbeit",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Das Europäische Gremium für digitale Dienste (European Board for Digital Services)
                  koordiniert die Zusammenarbeit zwischen nationalen DSCs. Jeder DSC kann den DSC
                  eines anderen Mitgliedstaats um Amtshilfe ersuchen.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 11. ÖSTERREICH ═══════════════ */}
      <Section id="oesterreich" title="DSA in Österreich & DACH">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Obwohl der DSA als EU-Verordnung direkt gilt, haben die Mitgliedstaaten
          Durchführungsgesetze erlassen:
          <SourceRef id={4} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Österreich: KommAustria als DSC",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  In Österreich wurde die <strong>KommAustria</strong> (Kommunikationsbehörde Austria)
                  als Digital Services Coordinator benannt. Sie ist bei der RTR (Rundfunk und Telekom
                  Regulierungs-GmbH) angesiedelt. Die KommAustria war zuvor bereits für das
                  KommunikationsPlattformen-Gesetz (KoPl-G) zuständig — das durch den DSA faktisch
                  abgelöst wurde.
                  <br /><br />
                  Zuständigkeiten: Aufsicht über in Österreich niedergelassene Plattformen, Zertifizierung
                  von Trusted Flaggers und außergerichtlichen Streitbeilegungsstellen, Beschwerdeentgegennahme
                  von österreichischen Nutzern.
                </p>
              ),
            },
            {
              title: "Deutschland: Bundesnetzagentur als DSC",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Deutschland hat das <strong>Digitale-Dienste-Gesetz (DDG)</strong> als Durchführungsgesetz
                  erlassen. Die <strong>Bundesnetzagentur (BNetzA)</strong> ist der Digital Services Coordinator.
                  Das NetzDG (Netzwerkdurchsetzungsgesetz) wurde durch den DSA weitgehend abgelöst.
                  <SourceRef id={5} sources={sources} accent={ACCENT} />
                  <br /><br />
                  Bußgelder: Deutschland hat einen nationalen Sanktionsrahmen mit Geldbußen bis 10 Mio. EUR
                  für bestimmte Verstöße festgelegt.
                </p>
              ),
            },
            {
              title: "Schweiz: Nicht direkt betroffen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Schweiz ist als Nicht-EU-Staat nicht direkt vom DSA erfasst. Schweizer Plattformen,
                  die EU-Nutzer bedienen, sind jedoch betroffen, wenn sie als Vermittlungsdienst in der
                  EU tätig sind — sie müssen dann einen Rechtsvertreter in der EU benennen (Art. 13).
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
          Der DSA ist Teil eines umfassenden EU-Regulierungspakets für die digitale Wirtschaft:
        </p>
        <AccordionSection
          items={[
            {
              title: "DSGVO — Datenschutz-Grundverordnung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der DSA ergänzt die DSGVO: Werbetransparenz (Art. 26 DSA) baut auf den
                  DSGVO-Einwilligungsregeln auf. Art. 26 Abs. 3 DSA verbietet Werbe-Targeting
                  auf Basis besonderer Datenkategorien (Art. 9 DSGVO). Daten aus
                  Content-Moderation unterliegen den DSGVO-Aufbewahrungsfristen.
                </p>
              ),
            },
            {
              title: "AI Act — KI-Regulierung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Automatisierte Content-Moderation-Systeme und Empfehlungsalgorithmen können
                  unter den AI Act fallen. VLOPs, die KI für Moderation einsetzen, müssen sowohl
                  DSA-Transparenzpflichten als auch AI-Act-Anforderungen erfüllen.
                </p>
              ),
            },
            {
              title: "Digital Markets Act (DMA)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der DMA reguliert die Marktmacht großer Plattformen (&quot;Gatekeeper&quot;), während
                  der DSA die Sorgfaltspflichten regelt. Viele VLOPs sind gleichzeitig DMA-Gatekeeper.
                  Die Pflichten sind kumulativ.
                </p>
              ),
            },
            {
              title: "ePrivacy / TDDDG / TKG 2021",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Cookie-Consent und Tracking werden weiterhin durch nationale Umsetzungen der ePrivacy-Richtlinie
                  geregelt (Österreich: TKG 2021, Deutschland: TDDDG). Der DSA ergänzt dies durch
                  Transparenzpflichten bei Werbe-Targeting.
                </p>
              ),
            },
            {
              title: "P2B-Verordnung (2019/1150)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Platform-to-Business-Verordnung schützt gewerbliche Nutzer von Plattformen.
                  Der DSA erweitert diesen Schutz auf alle Nutzer (einschließlich Verbraucher)
                  und verschärft die Transparenzpflichten bei Ranking und Empfehlungssystemen.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 13. FAHRPLAN ═══════════════ */}
      <Section id="fahrplan" title="Compliance-Fahrplan für Plattformbetreiber">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Der DSA gilt bereits — Plattformbetreiber müssen jetzt handeln:
        </p>
        <AccordionSection
          items={[
            {
              title: "Phase 1 (Sofort): Bestandsaufnahme & Kontaktstelle",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Bestimmen Sie Ihre Kategorie (Vermittlungsdienst / Hosting / Plattform / VLOP).
                  Benennen Sie eine Kontaktstelle für Behörden und Nutzer. Prüfen Sie, ob Sie
                  einen Rechtsvertreter in der EU benötigen. Passen Sie Ihre AGB an die
                  DSA-Transparenzanforderungen an.
                </p>
              ),
            },
            {
              title: "Phase 2 (Kurzfristig): Notice-and-Action einrichten",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Implementieren Sie ein elektronisches Meldesystem für illegale Inhalte. Definieren
                  Sie interne Prozesse und SLAs für die Bearbeitung von Meldungen. Erstellen Sie
                  Templates für Begründungen (Art. 17). Schulen Sie Ihr Moderationsteam.
                </p>
              ),
            },
            {
              title: "Phase 3 (Mittelfristig): Beschwerdesystem & Werbetransparenz",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Richten Sie ein internes Beschwerdemanagement ein (Art. 20). Stellen Sie sicher,
                  dass Werbung korrekt gekennzeichnet ist (Art. 26). Prüfen Sie Targeting-Praktiken
                  auf DSA-Konformität (keine sensiblen Kategorien, kein Profiling für Minderjährige).
                </p>
              ),
            },
            {
              title: "Phase 4 (Laufend): Transparenzberichte & Monitoring",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Veröffentlichen Sie jährliche (Plattformen: halbjährliche) Transparenzberichte.
                  Überwachen Sie Dark-Pattern-Compliance in UI-Änderungen. Halten Sie sich über
                  neue Durchführungsrechtsakte und Leitlinien der EU-Kommission auf dem Laufenden.
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
              title: "Gilt der DSA auch für mein kleines SaaS mit Community-Features?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Ja, wenn Nutzer Inhalte erstellen und diese für andere sichtbar sind, handelt es sich
                  um eine Online-Plattform. Mikro- und Kleinunternehmen (unter 50 Mitarbeiter, unter
                  10 Mio. € Umsatz) sind von einigen Plattform-Pflichten ausgenommen, müssen aber
                  die Basispflichten (Kontaktstelle, AGB-Transparenz, Notice-and-Action) einhalten.
                </p>
              ),
            },
            {
              title: "Was ist der Unterschied zwischen DSA und NetzDG?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Das deutsche NetzDG galt nur für soziale Netzwerke mit über 2 Millionen Nutzern in
                  Deutschland. Der DSA ist wesentlich breiter: Er gilt für alle Vermittlungsdienste EU-weit,
                  hat ein abgestuftes Pflichtensystem und harmonisiert die Regeln in allen 27 Mitgliedstaaten.
                  Das NetzDG wurde durch den DSA weitgehend abgelöst.
                </p>
              ),
            },
            {
              title: "Muss ich als Hosting-Provider alle gemeldeten Inhalte sofort löschen?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nein. Der DSA verlangt eine sorgfältige Prüfung, keine automatische Löschung. Sie müssen
                  Meldungen zeitnah bearbeiten, eine eigenständige Bewertung vornehmen und den Meldenden
                  sowie den Inhalteanbieter über Ihre Entscheidung informieren. Over-Blocking kann selbst
                  ein DSA-Verstoß sein (Beeinträchtigung der Meinungsfreiheit).
                </p>
              ),
            },
            {
              title: "Wie erfahre ich, ob mein Unternehmen als VLOP eingestuft wird?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die EU-Kommission designiert VLOPs basierend auf der Zahl der monatlich aktiven Nutzer
                  in der EU (Schwelle: 45 Millionen). Plattformen müssen ihre Nutzerzahlen berechnen und
                  auf Anfrage an die Kommission übermitteln. Die Liste der designierten Plattformen wird
                  öffentlich geführt.
                </p>
              ),
            },
            {
              title: "Was kostet die DSA-Compliance?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Kosten variieren stark nach Kategorie. Kleine Plattformen: 5.000–20.000 € für
                  Anpassung der AGB, Meldesysteme und erste Transparenzberichte. Mittelgroße Plattformen:
                  50.000–200.000 € für vollständige Compliance (Beschwerdesystem, Werbetransparenz, Moderation).
                  VLOPs: Millionenbeträge für Risikobewertungen, Audits, Compliance-Teams und technische
                  Infrastruktur.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════════ VERWANDTE REGULIERUNGEN ═══════════════════ */}
      <RelatedGuides currentGuide="dsa" accent="#4338ca" />

      {/* ═══════════════ TOOL RECOMMENDATION ═══════════════ */}
      <ToolRecommendation regulationKey="dsa" accent={ACCENT} />

      {/* ═══════════════ QUELLEN ═══════════════ */}
      <Section id="quellen" title="Quellen & weiterführende Links">
        <SourceList sources={sources} />
      </Section>
    </GuidePageLayout>
  );
}
