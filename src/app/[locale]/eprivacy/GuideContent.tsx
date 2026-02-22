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
    title: "Richtlinie 2002/58/EG — ePrivacy-Richtlinie (Volltext)",
    url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32002L0058",
    desc: "Offizieller Volltext der ePrivacy-Richtlinie",
    type: "Richtlinie",
  },
  {
    id: 2,
    title: "EuGH C-673/17 — Planet49 (Cookie-Einwilligung)",
    url: "https://curia.europa.eu/juris/liste.jsf?num=C-673/17",
    desc: "Leitureil des EuGH zur aktiven Cookie-Einwilligung (Opt-in)",
    type: "Urteil",
  },
  {
    id: 3,
    title: "TKG 2021 — Telekommunikationsgesetz (Österreich)",
    url: "https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20011678",
    desc: "Österreichische Umsetzung der ePrivacy-Richtlinie, §§ 165–167",
    type: "Gesetz",
  },
  {
    id: 4,
    title: "TDDDG — Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz (Deutschland)",
    url: "https://www.gesetze-im-internet.de/ttdsg/",
    desc: "Deutsche Umsetzung der ePrivacy-Richtlinie, § 25 (Cookie-Regeln)",
    type: "Gesetz",
  },
  {
    id: 5,
    title: "EDPB Guidelines 2/2023 — Scope of Art. 5(3) ePrivacy",
    url: "https://www.edpb.europa.eu/our-work-tools/general-guidance/guidelines-recommendations-best-practices_en",
    desc: "Leitlinien des Europäischen Datenschutzausschusses zu Cookies und Tracking",
    type: "Leitlinie",
  },
  {
    id: 6,
    title: "EU-Kommission — ePrivacy Regulation Proposal",
    url: "https://digital-strategy.ec.europa.eu/en/policies/eprivacy-regulation",
    desc: "Status des ePrivacy-Verordnungsvorschlags (seit 2017 in Verhandlung)",
    type: "Behörde",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Überblick" },
  { id: "rechtslage", label: "Aktuelle Rechtslage" },
  { id: "cookies", label: "Cookie-Einwilligung" },
  { id: "tracking", label: "Tracking & Technologien" },
  { id: "direktmarketing", label: "Direktmarketing-Regeln" },
  { id: "dsgvo-eprivacy", label: "DSGVO vs. ePrivacy" },
  { id: "oesterreich", label: "ePrivacy in Österreich" },
  { id: "deutschland", label: "ePrivacy in Deutschland" },
  { id: "cmp", label: "Consent Management Platforms" },
  { id: "zukunft", label: "ePrivacy-Verordnung (Zukunft)" },
  { id: "zusammenspiel", label: "Zusammenspiel mit anderen Gesetzen" },
  { id: "fahrplan", label: "Compliance-Fahrplan" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Rechtsgrundlage", value: "RL 2002/58/EG" },
  { label: "Cookie-Regel", value: "Opt-in Pflicht" },
  { label: "AT-Umsetzung", value: "TKG 2021" },
  { label: "DE-Umsetzung", value: "TDDDG § 25" },
  { label: "Strafe (DSGVO)", value: "20 Mio. / 4 %" },
  { label: "ePR Status", value: "Noch in Verhandlung" },
];

/* ─────────────────── Accent ─────────────────── */
const ACCENT = "#a855f7";

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
  const fontSize = value.length <= 5 ? "text-xl sm:text-2xl" : value.length <= 10 ? "text-lg sm:text-xl" : "text-base sm:text-lg";
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

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════ */
export default function EPrivacyGuideContent() {
  return (
    <GuidePageLayout
      title="ePrivacy – Cookie-Recht & Tracking"
      subtitle="Cookie-Einwilligung, Tracking-Regeln und Direktmarketing — die Spezialregelung neben der DSGVO."
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      regulationKey="eprivacy"
      href="/eprivacy"
    >
      {/* ═══════════════ 1. ÜBERBLICK ═══════════════ */}
      <Section id="ueberblick" title="Überblick: Was ist ePrivacy?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Die <strong>ePrivacy-Richtlinie</strong> (2002/58/EG, geändert durch 2009/136/EG) ist die
          EU-Spezialregelung für den Schutz der Privatsphäre in der elektronischen Kommunikation.
          Sie ist die &quot;Cookie-Richtlinie&quot; — aber ihr Anwendungsbereich geht weit darüber hinaus:
          Tracking-Technologien, Direktmarketing, Standortdaten und Vertraulichkeit der Kommunikation.
          <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-4">
          Als <strong>Richtlinie</strong> muss sie von jedem EU-Mitgliedstaat in nationales Recht
          umgesetzt werden — daher unterscheiden sich die konkreten Regeln: In Österreich gilt das
          <strong> TKG 2021</strong> (§§ 165–167), in Deutschland das <strong>TDDDG</strong> (§ 25).
        </p>
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die ePrivacy-Richtlinie ist die <strong>lex specialis</strong> zur DSGVO: Für Cookies,
          Tracking und elektronisches Marketing gelten die ePrivacy-Regeln vorrangig. Die DSGVO
          greift ergänzend — insbesondere für die Rechtsgrundlage der anschließenden Datenverarbeitung.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <StatCard value="Opt-in" label="Cookie-Einwilligung Pflicht" />
          <StatCard value="2002" label="Richtlinie seit" />
          <StatCard value="20 Mio." label="DSGVO-Bußgeld möglich" />
        </div>
        <p className="text-[#3a4a6b] text-sm leading-relaxed bg-purple-50 border border-purple-200 rounded-xl p-4">
          <strong>Status der ePrivacy-Verordnung:</strong> Seit 2017 verhandelt die EU an einer neuen
          ePrivacy-Verordnung (ePR), die die Richtlinie ersetzen soll. Die Verhandlungen sind festgefahren.
          Bis zur Einigung gilt weiterhin die bestehende Richtlinie — verschärft durch EuGH-Urteile und DSGVO-Bußgelder.
          <SourceRef id={6} sources={sources} accent={ACCENT} />
        </p>
      </Section>

      {/* ═══════════════ 2. RECHTSLAGE ═══════════════ */}
      <Section id="rechtslage" title="Aktuelle Rechtslage (2026)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die ePrivacy-Landschaft wird durch drei Rechtsquellen geprägt:
        </p>
        <AccordionSection
          items={[
            {
              title: "1. ePrivacy-Richtlinie (EU-Ebene)",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Art. 5 Abs. 3 der ePrivacy-Richtlinie ist die Kernvorschrift: Das Speichern von
                  Informationen auf dem Endgerät eines Nutzers (Cookies, Fingerprinting, Local Storage)
                  erfordert eine informierte Einwilligung — außer bei technisch notwendigen Cookies.
                </p>
              ),
            },
            {
              title: "2. Nationale Umsetzungsgesetze",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Jeder Mitgliedstaat hat eigene Umsetzungsgesetze: Österreich (TKG 2021), Deutschland
                  (TDDDG), Frankreich (LCEN/CNIL-Leitlinien), Italien (Codice Privacy). Die konkreten
                  Anforderungen und Sanktionen unterscheiden sich teilweise erheblich.
                </p>
              ),
            },
            {
              title: "3. EuGH-Rechtsprechung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der EuGH hat die Regeln in Leiturteilen verschärft: <strong>Planet49</strong> (C-673/17):
                  Vorausgewählte Cookie-Checkboxen sind keine gültige Einwilligung.
                  <strong> CNIL/Google</strong>: 150 Mio. € Strafe für Cookie-Verstöße.
                  <strong> Meta/Facebook</strong>: Kein &quot;berechtigtes Interesse&quot; für Werbe-Tracking.
                  <SourceRef id={2} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 3. COOKIES ═══════════════ */}
      <Section id="cookies" title="Cookie-Einwilligung: Die Regeln">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die Cookie-Regeln sind das Herzstück der ePrivacy-Compliance:
        </p>
        <AccordionSection
          items={[
            {
              title: "Grundsatz: Opt-in vor dem Setzen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Bevor Cookies (oder ähnliche Technologien) auf dem Endgerät eines Nutzers gespeichert
                  werden, braucht es eine <strong>aktive, informierte, freiwillige Einwilligung</strong>.
                  Vorausgewählte Checkboxen, implizite Einwilligungen (&quot;Durch Weitersurfen stimmen
                  Sie zu&quot;) oder Cookie Walls sind nicht zulässig.
                </p>
              ),
            },
            {
              title: "Ausnahme: Technisch notwendige Cookies",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Keine Einwilligung erforderlich für Cookies, die <strong>unbedingt erforderlich</strong>
                  sind: Session-Cookies, Warenkorb-Cookies, Load-Balancing, Sicherheits-Cookies (CSRF),
                  Sprach- und Barrierefreiheits-Einstellungen. Auch Analytics-Cookies mit geringem
                  Eingriffsrisiko können je nach Mitgliedstaat ausgenommen sein (z. B. in Deutschland
                  unter bestimmten Bedingungen).
                </p>
              ),
            },
            {
              title: "Anforderungen an die Einwilligung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Einwilligung muss DSGVO-konform sein (Art. 4 Nr. 11, Art. 7 DSGVO): <strong>aktiv</strong>
                  (keine Pre-Checks), <strong>informiert</strong> (welche Cookies, welcher Zweck,
                  welche Empfänger), <strong>freiwillig</strong> (kein Kopplungsverbot), <strong>widerrufbar</strong>
                  (genauso einfach wie die Erteilung). Der Widerruf muss jederzeit möglich sein.
                </p>
              ),
            },
            {
              title: "Cookie Walls: Verboten oder nicht?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  &quot;Pay or Consent&quot;-Modelle sind umstritten. Der EDPB hat Leitlinien erlassen, die
                  Cookie Walls grundsätzlich als unzulässig betrachten — die Einwilligung ist nicht
                  freiwillig, wenn die Alternative der vollständige Ausschluss vom Dienst ist.
                  Einige Datenschutzbehörden tolerieren jedoch kostenpflichtige Alternativen
                  (z. B. CNIL für Medienverlage).
                  <SourceRef id={5} sources={sources} accent={ACCENT} />
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 4. TRACKING ═══════════════ */}
      <Section id="tracking" title="Tracking-Technologien & Alternativen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die ePrivacy-Regeln gelten nicht nur für Cookies, sondern für alle Endgerätezugriffe:
        </p>
        <AccordionSection
          items={[
            {
              title: "Browser-Fingerprinting",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Das Auslesen von Geräteeigenschaften (Browser-Version, Bildschirmauflösung, installierte
                  Schriften) zur Identifikation fällt unter Art. 5 Abs. 3 ePrivacy-Richtlinie —
                  erfordert also Einwilligung, auch wenn keine Cookies gesetzt werden.
                </p>
              ),
            },
            {
              title: "Server-Side Tracking",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Server-Side Tracking (z. B. über Server-Side GTM, JENTIS, Stape) verlagert die
                  Datenerhebung vom Browser auf den Server. Dies umgeht <em>technisch</em> das
                  Cookie-Setzen — aber nicht die DSGVO-Einwilligung für die Verarbeitung
                  personenbezogener Daten. Die Rechtslage ist komplex und Aufsichtsbehörden
                  verschärfen ihre Position.
                </p>
              ),
            },
            {
              title: "Cookieless Analytics",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Datenschutzfreundliche Alternativen: <strong>Plausible</strong> und <strong>Umami</strong>
                  (DSGVO-konform ohne Cookies), <strong>Matomo</strong> (konfigurierbar ohne Einwilligung
                  bei Verzicht auf Drittanbieter-Cookies). Für DACH-Unternehmen empfohlen: Plausible
                  oder Matomo Self-Hosted.
                </p>
              ),
            },
            {
              title: "Pixel & Web Beacons",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Tracking-Pixel (Meta Pixel, LinkedIn Insight Tag) setzen Drittanbieter-Cookies und
                  erfordern daher eine ausdrückliche Einwilligung. First-Party-Pixel mit Server-Side-
                  Einbindung erfordern immer noch eine DSGVO-Rechtsgrundlage.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 5. DIREKTMARKETING ═══════════════ */}
      <Section id="direktmarketing" title="Direktmarketing-Regeln">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die ePrivacy-Richtlinie regelt auch elektronisches Direktmarketing (E-Mail, SMS, Telefonanrufe):
        </p>
        <AccordionSection
          items={[
            {
              title: "E-Mail-Marketing: Grundsatz Opt-in",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Für elektronische Werbung (E-Mail, SMS, Messenger) ist grundsätzlich eine
                  vorherige Einwilligung erforderlich. Double-Opt-in ist Best Practice und
                  in Österreich (TKG 2021 § 174) sowie Deutschland de facto Standard.
                </p>
              ),
            },
            {
              title: "Soft-Opt-in für Bestandskunden",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Ausnahme für bestehende Kundenbeziehungen (Art. 13 Abs. 2 ePrivacy-RL): Wenn ein
                  Kunde im Rahmen eines Kaufs seine E-Mail-Adresse angegeben hat, darf der Verkäufer
                  für <strong>ähnliche eigene Produkte</strong> werben — sofern bei jeder E-Mail eine
                  einfache Abmeldemöglichkeit besteht und die erste Kontaktaufnahme den Hinweis enthielt.
                </p>
              ),
            },
            {
              title: "B2B-Marketing: Länderspezifisch",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Im B2B-Bereich unterscheiden sich die Regeln: In Österreich ist auch B2B-E-Mail-Marketing
                  grundsätzlich einwilligungspflichtig (§ 174 TKG 2021). In Deutschland ist B2B-Marketing
                  unter strengeren Voraussetzungen ohne Einwilligung möglich (UWG § 7 Abs. 2 Nr. 3).
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 6. DSGVO VS EPRIVACY ═══════════════ */}
      <Section id="dsgvo-eprivacy" title="DSGVO vs. ePrivacy: Wie sie zusammenspielen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Das Verhältnis ist oft verwirrend — hier die Klarstellung:
        </p>
        <AccordionSection
          items={[
            {
              title: "Lex specialis: ePrivacy geht vor",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Für den <strong>Zugriff auf das Endgerät</strong> (Cookies setzen/lesen) gilt
                  ePrivacy vorrangig. Für die <strong>anschließende Verarbeitung</strong> der
                  erhobenen Daten gilt die DSGVO. Zwei Prüfungsschritte: (1) ePrivacy-Einwilligung
                  für das Cookie, (2) DSGVO-Rechtsgrundlage für die Datenverarbeitung.
                </p>
              ),
            },
            {
              title: "Doppelte Rechtsgrundlage nötig",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  In der Praxis deckt die Cookie-Einwilligung nach ePrivacy meist auch die
                  DSGVO-Einwilligung ab — wenn sie den DSGVO-Anforderungen genügt (informiert,
                  freiwillig, aktiv, widerrufbar). Aber: für technisch notwendige Cookies
                  (keine ePrivacy-Einwilligung nötig) braucht die Verarbeitung trotzdem eine
                  DSGVO-Rechtsgrundlage (meist Art. 6 Abs. 1 lit. f — berechtigtes Interesse).
                </p>
              ),
            },
            {
              title: "Bußgelder: DSGVO-Niveau",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Da Cookie-Verstöße fast immer auch DSGVO-Verstöße sind (fehlende Rechtsgrundlage
                  für Datenverarbeitung), greifen die DSGVO-Bußgelder: bis 20 Mio. EUR oder 4 %
                  des weltweiten Jahresumsatzes. Die CNIL (Frankreich) hat dies mehrfach demonstriert:
                  150 Mio. € gegen Google, 60 Mio. € gegen Microsoft — wegen Cookie-Verstößen.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 7. ÖSTERREICH ═══════════════ */}
      <Section id="oesterreich" title="ePrivacy in Österreich: TKG 2021">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          In Österreich sind die ePrivacy-Regeln im TKG 2021 umgesetzt:
          <SourceRef id={3} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "§ 165 TKG 2021: Cookies & Tracking",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Einwilligung erforderlich für das Speichern und Auslesen von Informationen auf
                  Endgeräten — außer bei technischer Notwendigkeit. Die DSB (Datenschutzbehörde)
                  ist zuständig für die Durchsetzung der DSGVO-Aspekte.
                </p>
              ),
            },
            {
              title: "§ 174 TKG 2021: Elektronisches Marketing",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  E-Mail-Werbung nur mit Einwilligung. Soft-Opt-in für ähnliche Produkte an
                  Bestandskunden. B2B-E-Mail-Marketing ebenfalls einwilligungspflichtig. Cold
                  E-Mails an Geschäftskunden grundsätzlich nicht erlaubt.
                </p>
              ),
            },
            {
              title: "Zuständigkeit: RTR und DSB",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die RTR (Rundfunk und Telekom Regulierungs-GmbH) ist für telekommunikationsspezifische
                  Verstöße zuständig. Die DSB für datenschutzrechtliche Aspekte. In der Praxis kommt
                  es oft zu Überschneidungen — Beschwerden können bei beiden eingereicht werden.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 8. DEUTSCHLAND ═══════════════ */}
      <Section id="deutschland" title="ePrivacy in Deutschland: TDDDG">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Deutschland hat die ePrivacy-Regeln im TDDDG umgesetzt:
          <SourceRef id={4} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "§ 25 TDDDG: Die Cookie-Norm",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  § 25 Abs. 1 TDDDG: Einwilligung erforderlich für das Speichern und Auslesen von
                  Informationen auf Endgeräten. § 25 Abs. 2: Ausnahme für technisch notwendige Zugriffe
                  (enge Auslegung). Die Einwilligung muss DSGVO-konform sein.
                </p>
              ),
            },
            {
              title: "PIMS: Personal Information Management Services",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Das TDDDG sieht die Möglichkeit von &quot;anerkannten Diensten zur Einwilligungsverwaltung&quot;
                  (PIMS) vor — Dienste, die für den Nutzer die Cookie-Einwilligungen zentral verwalten.
                  Die konkrete Umsetzung steht noch aus, könnte aber Cookie-Banner langfristig ersetzen.
                </p>
              ),
            },
            {
              title: "Zuständigkeit: BfDI und Landesbehörden",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Die Bundesnetzagentur ist für die TDDDG-spezifischen Vorschriften zuständig.
                  Für die DSGVO-Aspekte (Datenverarbeitung nach Cookie-Setzung) sind die
                  Landesbeauftragten für Datenschutz zuständig.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 9. CMP ═══════════════ */}
      <Section id="cmp" title="Consent Management Platforms (CMPs)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Eine Consent Management Platform ist für die meisten Websites unverzichtbar:
        </p>
        <AccordionSection
          items={[
            {
              title: "Was eine CMP leisten muss",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Rechtskonformer Cookie-Banner: echte Wahl (Akzeptieren/Ablehnen gleich prominent),
                  granulare Zweckauswahl, Erst-/Drittanbieter-Unterscheidung, Widerruf jederzeit
                  möglich, Einwilligungsnachweis (Dokumentation), TCF 2.2 kompatibel (für
                  programmatische Werbung).
                </p>
              ),
            },
            {
              title: "DACH-empfohlene CMPs",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  <strong>Usercentrics</strong> (München, EU-Server, TCF 2.2, ab 49 €/Monat),
                  <strong> Cookiebot</strong> (Dänemark, DSGVO-konform, ab 12 €/Monat),
                  <strong> Consentmanager</strong> (Hamburg, TCF 2.2, ab 18 €/Monat),
                  <strong> Borlabs Cookie</strong> (WordPress, einmalig 39 €).
                  Für österreichische Unternehmen: EU-Server-Standort und DSGVO-AVV wichtig.
                </p>
              ),
            },
            {
              title: "Häufige CMP-Fehler",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  &quot;Akzeptieren&quot; prominent, &quot;Ablehnen&quot; versteckt → Dark Pattern, rechtswidrig.
                  Cookies vor Einwilligung gesetzt → technischer Verstoß. &quot;Berechtigtes Interesse&quot; als
                  Standardeinstellung für Marketing-Cookies → nicht zulässig. Fehlende Widerrufsmöglichkeit
                  → DSGVO-Verstoß. Einwilligungen nicht dokumentiert → Beweislastproblem.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 10. ZUKUNFT ═══════════════ */}
      <Section id="zukunft" title="ePrivacy-Verordnung: Der lange Weg">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Seit 2017 verhandelt die EU an einer neuen ePrivacy-Verordnung — bisher ohne Ergebnis:
          <SourceRef id={6} sources={sources} accent={ACCENT} />
        </p>
        <AccordionSection
          items={[
            {
              title: "Was die ePR ändern würde",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Einheitliche Regeln als Verordnung (keine nationale Umsetzung mehr). Browser-basierte
                  Einwilligungsverwaltung (einmal einstellen statt auf jeder Website). Erweiterte
                  Ausnahmen für statistische Analysen. Klare Regeln für IoT- und M2M-Kommunikation.
                  Metadaten-Nutzung geregelt.
                </p>
              ),
            },
            {
              title: "Warum es stockt",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Fundamentaler Interessenkonflikt: Datenschutz-Befürworter wollen strengere Regeln,
                  die Werbeindustrie und Telekombranche wollen mehr Flexibilität. Streitpunkte:
                  Cookie-Wall-Verbot, Browser-basierter Consent, Metadaten-Verarbeitung,
                  Server-Side-Tracking-Klassifikation.
                </p>
              ),
            },
            {
              title: "Praktische Konsequenz",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Bis die ePR kommt, gelten die nationalen Umsetzungsgesetze der bestehenden Richtlinie.
                  Unternehmen sollten sich an der strengsten Auslegung orientieren (EuGH-Rechtsprechung
                  + EDPB-Leitlinien) und nicht auf die ePR warten.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 11. ZUSAMMENSPIEL ═══════════════ */}
      <Section id="zusammenspiel" title="Zusammenspiel mit anderen EU-Gesetzen">
        <AccordionSection
          items={[
            {
              title: "DSGVO — Datenschutz-Grundverordnung",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  ePrivacy als lex specialis geht vor bei Endgerätezugriffen. DSGVO ergänzt bei
                  der anschließenden Datenverarbeitung. DSGVO-Bußgelder gelten für Cookie-Verstöße.
                </p>
              ),
            },
            {
              title: "DSA — Digital Services Act",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Der DSA ergänzt ePrivacy bei der Werbetransparenz: Art. 26 DSA verbietet
                  Targeting basierend auf besonderen Datenkategorien. ePrivacy regelt die
                  technische Einwilligung (Cookie), DSA die Transparenz der Anzeige.
                </p>
              ),
            },
            {
              title: "AI Act — Profiling & Targeting",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  KI-basiertes Werbe-Targeting muss sowohl ePrivacy-Einwilligungen als auch
                  AI-Act-Transparenzpflichten erfüllen. Manipulative KI-Systeme (Art. 5 AI Act)
                  dürfen keine ePrivacy-Daten nutzen.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 12. FAHRPLAN ═══════════════ */}
      <Section id="fahrplan" title="Compliance-Fahrplan">
        <AccordionSection
          items={[
            {
              title: "Phase 1: Cookie-Audit",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Alle Cookies und Tracking-Technologien auf Ihrer Website inventarisieren.
                  Klassifizierung: notwendig / Analytics / Marketing / Social Media. Prüfen, welche
                  Cookies wirklich vor Einwilligung gesetzt werden. Tool-Empfehlung: CookieBot Scan
                  oder Ghostery.
                </p>
              ),
            },
            {
              title: "Phase 2: CMP implementieren",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Professionelle Consent Management Platform einrichten. Cookie-Banner mit echtem
                  Ablehnen-Button (gleich prominent wie Akzeptieren). Granulare Zweckauswahl.
                  Einwilligungsnachweis konfigurieren. Cookie-Richtlinien-Seite erstellen.
                </p>
              ),
            },
            {
              title: "Phase 3: Tracking-Stack überprüfen",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Google Analytics → Alternative prüfen (Plausible, Matomo). Meta Pixel → Server-Side
                  Conversion API mit CMP-Integration. Google Tag Manager → Server-Side GTM evaluieren.
                  Alle Marketing-Pixel auf CMP-Consent-Gating prüfen.
                </p>
              ),
            },
            {
              title: "Phase 4: Laufende Compliance",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Regelmäßige Cookie-Scans (vierteljährlich). CMP-Consent-Raten monitoren (Benchmark:
                  40–70 % Accept-Rate). Rechtsprechungs-Updates verfolgen. Neue EuGH-Urteile und
                  EDPB-Leitlinien zeitnah umsetzen.
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
              title: "Brauche ich einen Cookie-Banner, wenn ich nur technisch notwendige Cookies setze?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Nein, für rein technisch notwendige Cookies (Session, Warenkorb, Sicherheit) ist
                  keine Einwilligung und damit kein Banner erforderlich. Sie müssen aber in Ihrer
                  Datenschutzerklärung darüber informieren.
                </p>
              ),
            },
            {
              title: "Ist Google Analytics ohne Einwilligung erlaubt?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  In der Standardkonfiguration: Nein. Google Analytics setzt Cookies und überträgt
                  Daten in die USA. Alternative: Google Analytics im Server-Side-Modus mit IP-Anonymisierung
                  und EU-Datenverarbeitung — aber auch dann ist die Einwilligung erforderlich, da Cookies
                  gesetzt werden. Empfehlung: Plausible oder Umami als cookieloses Alternative.
                </p>
              ),
            },
            {
              title: "Was droht bei Cookie-Verstößen?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  DSGVO-Bußgelder bis 20 Mio. EUR oder 4 % des Jahresumsatzes. Abmahnungen durch
                  Verbraucherschutzverbände. Zivilrechtliche Schadensersatzansprüche. Die CNIL
                  (Frankreich) verhängte 2022 insgesamt über 300 Mio. EUR an Cookie-bezogenen
                  Bußgeldern — auch gegen nicht-französische Unternehmen.
                </p>
              ),
            },
            {
              title: "Ist Server-Side Tracking die Lösung für Cookie-Consent?",
              content: (
                <p className="text-[#3a4a6b] text-sm leading-relaxed">
                  Teilweise. Server-Side Tracking umgeht das Setzen von Drittanbieter-Cookies. Aber:
                  (1) Erstanbieter-Cookies benötigen weiterhin Einwilligung, (2) die Verarbeitung
                  personenbezogener Daten erfordert eine DSGVO-Rechtsgrundlage, (3) Aufsichtsbehörden
                  verschärfen ihre Position zu Server-Side Tracking zunehmend.
                </p>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════════ VERWANDTE REGULIERUNGEN ═══════════════════ */}
      <RelatedGuides currentGuide="eprivacy" accent="#6d28d9" />

      {/* ═══════════════ TOOL RECOMMENDATION ═══════════════ */}
      <ToolRecommendation regulationKey="eprivacy" accent={ACCENT} />

      {/* ═══════════════ QUELLEN ═══════════════ */}
      <Section id="quellen" title="Quellen & weiterführende Links">
        <SourceList sources={sources} />
      </Section>
    </GuidePageLayout>
  );
}
