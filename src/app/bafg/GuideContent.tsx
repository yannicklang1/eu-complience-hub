"use client";

import { motion } from "framer-motion";
import GuidePageLayout from "@/components/GuidePageLayout";
import type { TocItem } from "@/components/TableOfContents";
import type { QuickFact } from "@/components/GuidePageLayout";
import AccordionSection from "@/components/AccordionSection";
import LawRef from "@/components/LawRef";
import { SourceRef, SourceList, type Source } from "@/components/SourceRef";
import ToolRecommendation from "@/components/ToolRecommendation";
import RelatedGuides from "@/components/RelatedGuides";

/* ─────────────────── Sources ─────────────────── */
const sources: Source[] = [
  {
    id: 1,
    title: "Richtlinie (EU) 2019/882 — European Accessibility Act (Volltext)",
    url: "https://eur-lex.europa.eu/eli/dir/2019/882/oj/deu",
    desc: "Offizielle deutsche Fassung der EAA-Richtlinie im EUR-Lex Portal",
    type: "Richtlinie",
  },
  {
    id: 2,
    title: "BaFG — Barrierefreiheitsstärkungsgesetz (RIS)",
    url: "https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20012387",
    desc: "Österreichisches Barrierefreiheitsstärkungsgesetz, BGBl. I Nr. 76/2023",
    type: "Nat. Gesetz",
  },
  {
    id: 3,
    title: "EN 301 549 — ICT Accessibility Standard",
    url: "https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf",
    desc: "Europäischer Standard für barrierefreie IKT-Produkte und -Dienste",
    type: "Standard",
  },
  {
    id: 4,
    title: "WCAG 2.1 — Web Content Accessibility Guidelines",
    url: "https://www.w3.org/TR/WCAG21/",
    desc: "W3C-Richtlinien für barrierefreie Webinhalte — Level AA als Mindeststandard",
    type: "Standard",
  },
  {
    id: 5,
    title: "Sozialministeriumservice — Barrierefreiheit",
    url: "https://www.sozialministeriumservice.at/Ueber_uns/Barrierefreiheit/Barrierefreiheit.de.html",
    desc: "Aufsichtsbehörde für die Umsetzung des BaFG in Österreich",
    type: "Aufsicht AT",
  },
  {
    id: 6,
    title: "WKO — Barrierefreiheitsstärkungsgesetz",
    url: "https://www.wko.at/service/wirtschaftsrecht-gewerberecht/barrierefreiheitsstaerkungsgesetz",
    desc: "Praxisleitfaden der Wirtschaftskammer Österreich zum BaFG",
    type: "Praxisleitfaden",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Überblick" },
  { id: "eaa-vs-bafg", label: "EAA vs. BaFG" },
  { id: "timeline", label: "Timeline & Fristen" },
  { id: "betroffene", label: "Wer ist betroffen?" },
  { id: "ausnahmen", label: "Ausnahmen & Befreiungen" },
  { id: "anforderungen", label: "Anforderungen im Detail" },
  { id: "produkte-dienste", label: "Digitale Produkte & Dienste" },
  { id: "wcag", label: "WCAG & EN 301 549" },
  { id: "strafen", label: "Strafen" },
  { id: "oesterreich", label: "BaFG in Österreich" },
  { id: "fahrplan", label: "Compliance-Fahrplan" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Strafe", value: "bis 80.000 €" },
  { label: "In Kraft seit", value: "28. Juni 2025" },
  { label: "Betrifft", value: "Digitale Produkte & Dienste" },
  { label: "Ausnahme", value: "Kleinstunternehmen" },
  { label: "Standard", value: "WCAG 2.1 AA" },
  { label: "Rechtsgrundlage", value: "RL (EU) 2019/882" },
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
  accent = "#2563eb",
}: {
  value: string;
  label: string;
  accent?: string;
}) {
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
        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
          done ? "bg-blue-600 border-blue-600" : active ? "bg-blue-600 border-blue-600 animate-pulse" : "bg-white border-[#d8dff0]"
        }`} />
        <div className="w-px flex-1 bg-[#e8ecf4] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] font-semibold text-[#7a8db0]">{date}</span>
          {done && <span className="text-[9px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-mono font-bold border border-blue-200">Erledigt</span>}
          {active && <span className="text-[9px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-mono font-bold border border-blue-200">Aktiv</span>}
        </div>
        <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">{title}</div>
        <p className="text-[14px] text-[#5a6a8a] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ─────────────────── Roadmap step ─────────────────── */
function RoadmapStep({
  phase, title, items, accent = "#2563eb",
}: { phase: string; title: string; items: string[]; accent?: string }) {
  return (
    <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full" style={{ background: accent }} />
      <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: accent }}>{phase}</div>
      <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
      title="BaFG"
      subtitle="Barrierefreiheitsstärkungsgesetz: EU-weite Barrierefreiheitspflicht für digitale Produkte und Dienstleistungen, WCAG-Standards und Compliance-Fahrplan für österreichische Unternehmen."
      regulationKey="Richtlinie (EU) 2019/882"
      accent="#2563eb"
      badgeLabel="In Kraft seit Juni 2025"
      badgeColor="#1d4ed8"
      quickFacts={quickFacts}
      tocItems={tocItems}
      trustBadge={{ lastReview: "19.02.2026", sourceCount: 6 }}
      heroIcon={
        <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      }
      href="/bafg"
    >
      {/* ═══════════════════ 1. ÜBERBLICK ═══════════════════ */}
      <Section id="ueberblick" title="Überblick: Was ist das BaFG?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Das <strong>Barrierefreiheitsstärkungsgesetz (BaFG)</strong><SourceRef id={2} sources={sources} accent="#2563eb" /> ist
          die österreichische Umsetzung der EU-Richtlinie (EU) 2019/882, dem sogenannten <strong>European
          Accessibility Act (EAA)</strong>.<SourceRef id={1} sources={sources} accent="#2563eb" /> Seit dem{" "}
          <strong>28. Juni 2025</strong> verpflichtet das BaFG Unternehmen, digitale Produkte und
          Dienstleistungen barrierefrei zu gestalten.
        </p>
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          In der EU leben rund <strong>87 Millionen Menschen mit Behinderungen</strong>. Gemeinsam mit
          der alternden Bevölkerung profitieren weit über 100 Millionen EU-Bürger von barrierefreien
          digitalen Angeboten. Das BaFG schafft einheitliche Standards für Barrierefreiheit und
          beseitigt die Fragmentierung nationaler Regelungen im Binnenmarkt.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard value="Juni 2025" label="In Kraft" accent="#1d4ed8" />
          <StatCard value="87 Mio." label="Betroffene EU" accent="#2563eb" />
          <StatCard value="80.000 €" label="Max. Strafe" accent="#dc2626" />
          <StatCard value="WCAG 2.1 AA" label="Standard" accent="#2563eb" />
        </div>

        <div className="rounded-2xl bg-blue-50/60 border border-blue-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-blue-700 mb-1">
                Achtung: Dieses Gesetz gilt JETZT
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                Das BaFG ist seit dem 28. Juni 2025 geltendes Recht. Unternehmen, die digitale Produkte
                oder Dienstleistungen auf den Markt bringen, müssen die Barrierefreiheitsanforderungen
                bereits erfüllen. Für neue Produkte und Dienste gibt es keine allgemeine Übergangsfrist
                mehr. Nur für bestimmte Bestandsverträge gelten Übergangsregelungen bis 2030.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 2. EAA vs. BaFG ═══════════════════ */}
      <Section id="eaa-vs-bafg" title="EAA vs. BaFG: EU-Richtlinie und nationale Umsetzung">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Der <strong>European Accessibility Act</strong> (Richtlinie (EU) 2019/882)<SourceRef id={1} sources={sources} accent="#2563eb" />{" "}
          ist eine EU-Richtlinie und musste von jedem Mitgliedstaat in nationales Recht umgesetzt
          werden. Österreich hat dies mit dem <strong>Barrierefreiheitsstärkungsgesetz (BaFG)</strong> getan,
          das im Juli 2023 als BGBl. I Nr. 76/2023 beschlossen wurde.<SourceRef id={2} sources={sources} accent="#2563eb" />
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border border-[#d8dff0] bg-white p-6"
          >
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#7a8db0] mb-2">
              EU-Ebene
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              European Accessibility Act (EAA)
            </h3>
            <ul className="space-y-2">
              {[
                "Richtlinie (EU) 2019/882",
                "Angenommen am 17. Juni 2019",
                "Umsetzungsfrist bis 28. Juni 2022",
                "Harmonisierung der Barrierefreiheitsanforderungen",
                "Mindeststandards — nationale Verschärfung möglich",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-2" />
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border-2 border-blue-300 bg-blue-50/30 p-6"
          >
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-blue-700 mb-2">
              Österreich
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              BaFG (BGBl. I Nr. 76/2023)
            </h3>
            <ul className="space-y-2">
              {[
                "Nationale Umsetzung des EAA",
                "Beschlossen im Juli 2023",
                "In Kraft seit 28. Juni 2025",
                "Aufsicht: Sozialministeriumservice",
                "Verwaltungsstrafen bis 80.000 €",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-700 flex-shrink-0 mt-2" />
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Wichtig für B2B-Unternehmen:</strong> Anders als bei der{" "}
            <LawRef law="DSGVO">DSGVO</LawRef> handelt es sich beim EAA um eine Richtlinie, nicht um eine
            Verordnung. Die konkreten Anforderungen können je nach Mitgliedstaat geringfügig variieren.
            Für den österreichischen Markt ist das BaFG maßgeblich. Wenn Sie EU-weit tätig sind,
            prüfen Sie die jeweiligen nationalen Umsetzungen.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 3. TIMELINE ═══════════════════ */}
      <Section id="timeline" title="Timeline & Fristen">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Von der Verabschiedung des EAA bis zur vollen Anwendbarkeit des BaFG — die wichtigsten Meilensteine:
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8">
          <TimelineItem
            date="17. Juni 2019"
            title="EAA im Amtsblatt veröffentlicht"
            description={<>Die Richtlinie (EU) 2019/882 wird im Amtsblatt der Europäischen Union veröffentlicht. Mitgliedstaaten haben bis Juni 2022 Zeit für die nationale Umsetzung.<SourceRef id={1} sources={sources} accent="#2563eb" /></>}
            done
          />
          <TimelineItem
            date="Juli 2023"
            title="BaFG in Österreich beschlossen"
            description={<>Österreich setzt den EAA verspätet um: Das Barrierefreiheitsstärkungsgesetz (BGBl. I Nr. 76/2023) wird beschlossen und im Bundesgesetzblatt veröffentlicht.<SourceRef id={2} sources={sources} accent="#2563eb" /></>}
            done
          />
          <TimelineItem
            date="28. Juni 2025"
            title="BaFG in Kraft — volle Anwendbarkeit"
            description="Alle Barrierefreiheitsanforderungen gelten ab sofort für neue Produkte und Dienstleistungen. Unternehmen müssen die Konformität sicherstellen."
            active
          />
          <TimelineItem
            date="Bis 28. Juni 2030"
            title="Übergangsfrist für Bestandsverträge"
            description="Dienstleistungsverträge, die vor dem 28. Juni 2025 geschlossen wurden, dürfen bis längstens 28. Juni 2030 unverändert weitergeführt werden. Selbstbedienungsterminals, die bereits in Betrieb sind, dürfen bis zum Ende ihrer wirtschaftlichen Nutzungsdauer weiterverwendet werden (max. 20 Jahre)."
          />
        </div>
      </Section>

      {/* ═══════════════════ 4. WER IST BETROFFEN? ═══════════════════ */}
      <Section id="betroffene" title="Wer ist betroffen?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Das BaFG betrifft <strong>Wirtschaftsakteure</strong>, die bestimmte Produkte herstellen, importieren
          oder vertreiben bzw. bestimmte Dienstleistungen erbringen. Entscheidend ist, dass die Produkte
          oder Dienste auf dem österreichischen bzw. EU-Markt angeboten werden.<SourceRef id={6} sources={sources} accent="#2563eb" />
        </p>

        <AccordionSection
          accent="#2563eb"
          items={[
            {
              title: "Hersteller, Importeure & Händler (Produkte)",
              content: (
                <div>
                  <p className="mb-3">
                    Hersteller tragen die Hauptverantwortung. Importeure und Händler haben
                    Sorgfalts- und Prüfpflichten. Betroffene Produktkategorien:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Computer und Betriebssysteme (Desktops, Laptops, Tablets)</li>
                    <li>Smartphones und Mobilgeräte</li>
                    <li>Selbstbedienungsterminals: Geldautomaten, Fahrkartenautomaten, Check-in-Automaten</li>
                    <li>Zahlungsterminals (POS-Geräte)</li>
                    <li>E-Book-Lesegeräte (E-Reader)</li>
                    <li>TV-Geräte mit digitalen Diensten</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Dienstleistungserbringer",
              content: (
                <div>
                  <p className="mb-3">Erbringer folgender Dienstleistungen müssen Barrierefreiheit gewährleisten:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>E-Commerce — Online-Shops und Marktplätze</li>
                    <li>Bankdienstleistungen für Verbraucher (Online-Banking, Banking-Apps)</li>
                    <li>Elektronische Kommunikationsdienste (Telefonie, Messaging)</li>
                    <li>Dienste für den Zugang zu audiovisuellen Mediendiensten</li>
                    <li>E-Books und spezialisierte digitale Lesedienste</li>
                    <li>Personenbeförderungsdienste (Ticketing, Echtzeit-Reiseinformationen)</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Relevanz für B2B-Unternehmen",
              content: (
                <div>
                  <p className="mb-3">
                    Auch wenn das BaFG primär auf B2C-Produkte und -Dienste abzielt, hat es
                    erhebliche Auswirkungen auf B2B-Unternehmen:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>Zulieferer:</strong> Wer Softwarekomponenten an B2C-Unternehmen liefert, muss sicherstellen, dass die Endprodukte BaFG-konform sein können</li>
                    <li><strong>White-Label-Anbieter:</strong> Webshops, Apps oder Zahlungslösungen unter fremder Marke müssen barrierefrei sein</li>
                    <li><strong>SaaS-Anbieter:</strong> Wird Ihr Produkt als Verbraucherkanal genutzt, wird Barrierefreiheit zur vertraglichen Anforderung</li>
                    <li><strong>Ausschreibungen:</strong> Öffentliche Auftraggeber und große Unternehmen verlangen zunehmend Barrierefreiheitsnachweise</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 5. AUSNAHMEN ═══════════════════ */}
      <Section id="ausnahmen" title="Ausnahmen & Befreiungen">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Das BaFG sieht zwei wesentliche Ausnahmetatbestände vor: die Kleinstunternehmen-Befreiung
          und die unverhältnismäßige Belastung. Diese Ausnahmen sind eng gefasst und müssen
          sorgfältig dokumentiert werden.
        </p>

        <div className="space-y-4 mb-6">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Kleinstunternehmen (nur bei Dienstleistungen)
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-4">
              Kleinstunternehmen, die <strong>Dienstleistungen</strong> erbringen, sind vom BaFG
              ausgenommen. Für <strong>Produkthersteller</strong> gilt diese Ausnahme nicht — unabhängig
              von der Unternehmensgröße.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl bg-blue-50/60 border border-blue-100 p-4">
                <div className="font-mono text-[10px] font-bold text-blue-600 uppercase mb-1">Kriterium 1</div>
                <div className="font-[Syne] font-bold text-[15px] text-[#060c1a]">Weniger als 10 Beschäftigte</div>
              </div>
              <div className="rounded-xl bg-blue-50/60 border border-blue-100 p-4">
                <div className="font-mono text-[10px] font-bold text-blue-600 uppercase mb-1">Kriterium 2</div>
                <div className="font-[Syne] font-bold text-[15px] text-[#060c1a]">Jahresumsatz oder Bilanzsumme &le; 2 Mio. €</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/40 p-5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <p className="font-[Syne] font-bold text-sm text-amber-700 mb-1">
                  Achtung: BEIDE Kriterien müssen erfüllt sein (kumulativ)
                </p>
                <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                  Die Kleinstunternehmen-Ausnahme greift nur, wenn <strong>beide</strong> Kriterien
                  gleichzeitig erfüllt sind. Ein Unternehmen mit 8 Mitarbeitern aber 3 Mio. € Umsatz
                  ist <strong>kein</strong> Kleinstunternehmen im Sinne des BaFG und muss die
                  Barrierefreiheitsanforderungen erfüllen.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Unverhältnismäßige Belastung
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
              Wirtschaftsakteure können einzelne Barrierefreiheitsanforderungen als unverhältnismäßige
              Belastung geltend machen, wenn deren Erfüllung eine grundlegende Veränderung des Produkts
              erfordern würde oder eine unverhältnismäßige finanzielle Belastung darstellt.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px] text-[#5a6a8a]">
              <li>Muss im Einzelfall dokumentiert und begründet werden</li>
              <li>Die Bewertung muss mindestens alle 5 Jahre erneuert werden</li>
              <li>Auf Verlangen der Behörde vorzulegen</li>
              <li>Befreit nicht von der Pflicht, alle übrigen Anforderungen zu erfüllen</li>
              <li>Bei Inanspruchnahme öffentlicher Fördermittel: Berufung auf diese Ausnahme nicht möglich</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Reine B2B-Dienstleistungen:</strong> Dienstleistungen,
            die ausschließlich für andere Unternehmen erbracht werden und keinen Verbraucherkontakt haben,
            fallen grundsätzlich nicht unter das BaFG. Sobald jedoch ein Verbraucherkanal existiert
            (z. B. ein Endkunden-Portal), greifen die Pflichten.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 6. ANFORDERUNGEN ═══════════════════ */}
      <Section id="anforderungen" title="Anforderungen im Detail: Die POUR-Prinzipien">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Die Barrierefreiheitsanforderungen des BaFG basieren auf den vier Grundprinzipien der
          WCAG<SourceRef id={4} sources={sources} accent="#2563eb" /> — bekannt als <strong>POUR</strong>:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border bg-white p-6 relative overflow-hidden"
            style={{ borderColor: "#2563eb30" }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#2563eb]" />
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-1 text-[#2563eb]">
              Prinzip 1
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">Wahrnehmbar (Perceivable)</h3>
            <p className="text-[13px] text-[#7a8db0] leading-relaxed mb-3">Informationen müssen für alle Sinne zugänglich sein.</p>
            <div className="space-y-1.5">
              {["Textalternativen für Bilder (Alt-Texte)", "Untertitel für Videos", "Farbkontrast mind. 4.5:1", "Skalierbare Textgrößen"].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb] flex-shrink-0 mt-1.5" />
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border bg-white p-6 relative overflow-hidden"
            style={{ borderColor: "#1d4ed830" }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#1d4ed8]" />
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-1 text-[#1d4ed8]">
              Prinzip 2
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">Bedienbar (Operable)</h3>
            <p className="text-[13px] text-[#7a8db0] leading-relaxed mb-3">Alle Funktionen müssen per Tastatur und assistiver Technologie nutzbar sein.</p>
            <div className="space-y-1.5">
              {["Vollständige Tastaturbedienbarkeit", "Keine Zeitlimits oder Abschaltmöglichkeit", "Keine blinkenden Inhalte (Epilepsie-Risiko)", "Klare Navigation und Fokusreihenfolge"].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8] flex-shrink-0 mt-1.5" />
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border bg-white p-6 relative overflow-hidden"
            style={{ borderColor: "#1e40af30" }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#1e40af]" />
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-1 text-[#1e40af]">
              Prinzip 3
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">Verständlich (Understandable)</h3>
            <p className="text-[13px] text-[#7a8db0] leading-relaxed mb-3">Inhalte und Bedienung müssen klar und vorhersehbar sein.</p>
            <div className="space-y-1.5">
              {["Klare, einfache Sprache", "Konsistente Navigation", "Fehlermeldungen mit Lösungshinweisen", "Formulare mit Beschriftungen und Hilfe"].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1e40af] flex-shrink-0 mt-1.5" />
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, ease: [0.23, 1, 0.32, 1] as const }}
            className="rounded-2xl border bg-white p-6 relative overflow-hidden"
            style={{ borderColor: "#1e3a5f30" }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#1e3a5f]" />
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-1 text-[#1e3a5f]">
              Prinzip 4
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">Robust (Robust)</h3>
            <p className="text-[13px] text-[#7a8db0] leading-relaxed mb-3">Inhalte müssen mit verschiedenen assistiven Technologien kompatibel sein.</p>
            <div className="space-y-1.5">
              {["Screenreader-Kompatibilität", "Korrekte semantische Auszeichnung (HTML)", "WAI-ARIA für dynamische Inhalte", "Kompatibilität mit Vergrößerungssoftware"].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f] flex-shrink-0 mt-1.5" />
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════ 7. PRODUKTE & DIENSTE ═══════════════════ */}
      <Section id="produkte-dienste" title="Digitale Produkte & Dienste im Detail">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Das BaFG definiert konkrete Anforderungen für verschiedene Kategorien digitaler Produkte
          und Dienstleistungen. Hier die wichtigsten Bereiche mit ihren spezifischen Pflichten:
        </p>

        <AccordionSection
          accent="#2563eb"
          items={[
            {
              title: "E-Commerce (Online-Shops & Marktplätze)",
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Barrierefreie Produktbeschreibungen und Bilder mit Alternativtexten</li>
                    <li>Zugänglicher Bestellprozess inkl. Warenkorb und Checkout</li>
                    <li>Barrierefreie Zahlungsvorgänge und Formulare</li>
                    <li>Zugängliche Such-, Filter- und Sortierfunktionen</li>
                    <li>Barrierefreie Kundenkommunikation (Chat, Kontaktformulare)</li>
                    <li>Kompatibilität mit Screenreadern und Tastaturnavigation</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Banking & Zahlungsdienste",
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Barrierefreies Online-Banking und Mobile-Banking-Apps</li>
                    <li>Zugängliche Überweisungs- und Zahlungsprozesse</li>
                    <li>Barrierefreie Kontoübersichten und Kontoauszüge</li>
                    <li>Zugängliche Authentifizierungsverfahren (2FA muss barrierefrei sein)</li>
                    <li>Barrierefreie Geldautomaten (Sprachausgabe, taktile Markierungen)</li>
                    <li>Barrierefreie Zahlungsterminals (POS)</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "E-Books & E-Reader",
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>E-Books müssen mit assistiven Technologien kompatibel sein</li>
                    <li>Navigierbare Inhaltsverzeichnisse</li>
                    <li>Einstellbare Schriftgrößen und Kontraste</li>
                    <li>Text-to-Speech-Kompatibilität</li>
                    <li>DRM darf Barrierefreiheitsfunktionen nicht blockieren</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Ticketing & Personenbeförderung",
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Barrierefreie Fahrkartenautomaten (Sprachausgabe, Kontraste)</li>
                    <li>Zugängliche Online-Buchungssysteme</li>
                    <li>Barrierefreie Echtzeit-Reiseinformationen</li>
                    <li>Zugängliche Check-in-Terminals an Flughäfen</li>
                    <li>Barrierefreie mobile Apps für Fahrplanauskunft</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Telekommunikation",
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Zugängliche Telefondienste inkl. Notrufdienste</li>
                    <li>Barrierefreie Messaging-Dienste</li>
                    <li>Echtzeit-Text (RTT) als Alternative zu Sprache</li>
                    <li>Barrierefreie Kundenportale und Self-Service</li>
                    <li>Zugängliche Vertragsinformationen</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Selbstbedienungsterminals",
              content: (
                <div>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Sprachausgabe für Bildschirminhalte</li>
                    <li>Taktile Markierungen und ertastbare Bedienelemente</li>
                    <li>Ausreichender Farbkontrast am Bildschirm</li>
                    <li>Angemessene Bedienhöhe (Rollstuhlzugänglichkeit)</li>
                    <li>Kompatibilität mit Kopfhörern (private Audioausgabe)</li>
                    <li>Zeitliche Flexibilität bei der Bedienung</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 8. WCAG & EN 301 549 ═══════════════════ */}
      <Section id="wcag" title="WCAG 2.1 & EN 301 549: Technische Standards">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Die technische Grundlage der BaFG-Anforderungen bilden zwei zentrale Standards:
          die <strong>Web Content Accessibility Guidelines (WCAG) 2.1</strong><SourceRef id={4} sources={sources} accent="#2563eb" />{" "}
          und die europäische Norm <strong>EN 301 549</strong>.<SourceRef id={3} sources={sources} accent="#2563eb" />
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">WCAG 2.1</h3>
            <p className="text-[13px] text-[#5a6a8a] leading-relaxed mb-3">
              Die international anerkannten Richtlinien für barrierefreie Webinhalte.{" "}
              <strong>Level AA</strong> ist der Mindeststandard für das BaFG.
            </p>
            <div className="space-y-2">
              {[
                "78 Erfolgskriterien insgesamt",
                "Level A: 30 Basiskriterien",
                "Level AA: 20 weitere Kriterien (BaFG-Minimum)",
                "Level AAA: 28 erweiterte Kriterien (optional)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">EN 301 549</h3>
            <p className="text-[13px] text-[#5a6a8a] leading-relaxed mb-3">
              Der europäische Standard für barrierefreie IKT. Geht über Webinhalte hinaus und
              umfasst auch Hardware, Software und Dokumente.
            </p>
            <div className="space-y-2">
              {[
                "Enthält alle WCAG 2.1 AA-Kriterien",
                "Erweitert um Hardware-Anforderungen",
                "Anforderungen an Dokumente (PDF, Office)",
                "Vorgaben für Telekommunikation",
                "Anforderungen an Selbstbedienungsterminals",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-700 flex-shrink-0 mt-2" />
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <AccordionSection
          accent="#2563eb"
          items={[
            {
              title: "Level A — Grundlegende Barrierefreiheit",
              content: (
                <div>
                  <p className="mb-3">Die absoluten Mindestanforderungen. Ohne Level A ist eine Website für viele Nutzer mit Behinderungen schlicht unbenutzbar.</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Textalternativen für Nicht-Text-Inhalte</li>
                    <li>Untertitel für voraufgezeichnete Audio-/Videoinhalte</li>
                    <li>Inhalte in sinnvoller Reihenfolge strukturiert</li>
                    <li>Alle Funktionen per Tastatur erreichbar</li>
                    <li>Keine Tastaturfallen</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Level AA — BaFG-Mindeststandard",
              content: (
                <div>
                  <p className="mb-3">Dieses Level ist der <strong>Mindeststandard</strong> für BaFG-Konformität:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>Kontrast 4.5:1</strong> für normalen Text (3:1 für großen Text)</li>
                    <li>Text um 200% vergrößerbar ohne Inhaltsverlust</li>
                    <li>Bilder von Text vermeiden (echten Text verwenden)</li>
                    <li>Mehrere Navigationswege anbieten (Menü, Suche, Sitemap)</li>
                    <li>Überschriften und Labels beschreiben den Zweck</li>
                    <li>Konsistente Navigation und Identifikation</li>
                    <li>Fehler werden identifiziert und korrigierende Vorschläge gemacht</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Level AAA — Empfohlen, nicht verpflichtend",
              content: (
                <div>
                  <p className="mb-3">Level AAA ist nicht gesetzlich vorgeschrieben, bietet aber einen höheren Grad an Zugänglichkeit:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Kontrast 7:1 für normalen Text</li>
                    <li>Gebärdensprachvideo für Audioinhalte</li>
                    <li>Leichte Sprache für komplexe Texte</li>
                    <li>Keine Zeitlimits (überhaupt)</li>
                  </ul>
                  <p className="mt-3 text-[13px] italic">Empfehlung: Streben Sie AAA an, wo es wirtschaftlich vertretbar ist — es verbessert die Nutzererfahrung für alle.</p>
                </div>
              ),
            },
          ]}
        />

        <div className="rounded-2xl bg-blue-50/60 border border-blue-200/50 p-5 mt-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-blue-700 mb-1">
                Vermutungswirkung
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                Wer die harmonisierte Norm EN 301 549 erfüllt, profitiert von einer{" "}
                <strong>Konformitätsvermutung</strong> gemäß dem BaFG. Das bedeutet: Es wird angenommen,
                dass die Barrierefreiheitsanforderungen erfüllt sind, solange nicht das Gegenteil
                nachgewiesen wird.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 9. STRAFEN ═══════════════════ */}
      <Section id="strafen" title="Bußgelder & Strafen">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Das BaFG sieht empfindliche Verwaltungsstrafen vor. Das{" "}
          <strong>Sozialministeriumservice</strong><SourceRef id={5} sources={sources} accent="#2563eb" />{" "}
          überwacht die Einhaltung und kann bei Verstößen Sanktionen verhängen.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <StatCard value="80.000 €" label="Max. Strafe pro Verstoß" accent="#dc2626" />
          <StatCard value="Marktverbot" label="bei schweren Verstößen" accent="#ea580c" />
          <StatCard value="Fortlaufend" label="Marktüberwachung" accent="#2563eb" />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Sanktionsmaßnahmen
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Verwaltungsstrafe bis 80.000 €",
                "Anordnung zur Herstellung der Konformität",
                "Rücknahme des Produkts vom Markt",
                "Beschränkung der Bereitstellung",
                "Öffentliche Bekanntmachung von Verstößen",
                "Wiederholte Verstöße: erhöhte Strafen",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border-2 border-red-200 bg-red-50/30 p-5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <p className="font-[Syne] font-bold text-sm text-red-700 mb-1">
                  Vorsicht bei wiederholten Verstößen
                </p>
                <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                  Bei wiederholten oder schwerwiegenden Verstößen können die Strafen deutlich erhöht
                  werden. Zudem können Verbraucher und Verbände Beschwerden beim Sozialministeriumservice
                  einlegen, was zu Überprüfungen und Verfahren führt. Auch Schadenersatzansprüche
                  betroffener Verbraucher sind möglich.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 10. ÖSTERREICH ═══════════════════ */}
      <Section id="oesterreich" title="BaFG in Österreich">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Die österreichische Umsetzung des EAA bringt einige nationale Besonderheiten mit sich.
          Die Aufsicht liegt beim <strong>Sozialministeriumservice</strong><SourceRef id={5} sources={sources} accent="#2563eb" />,
          einer nachgeordneten Dienststelle des Bundesministeriums für Soziales, Gesundheit, Pflege
          und Konsumentenschutz.
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}>
                <span className="text-white text-lg font-bold">AT</span>
              </div>
              <div>
                <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
                  Sozialministeriumservice (SMS)
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
                  Das Sozialministeriumservice ist die zuständige Marktüberwachungsbehörde für die
                  Einhaltung des BaFG in Österreich. Es prüft die Konformität von Produkten und
                  Dienstleistungen, geht Beschwerden nach und kann Verwaltungsstrafen verhängen.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-mono border border-blue-200">Marktüberwachung</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-mono border border-blue-200">Beschwerderecht</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-mono border border-blue-200">Verwaltungsstrafen</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Beschwerderecht der Verbraucher
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
              Verbraucher und deren Interessenvertretungen können beim Sozialministeriumservice
              Beschwerde einlegen, wenn sie auf Barrierefreiheitsmängel stoßen.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px] text-[#5a6a8a]">
              <li>Jeder Verbraucher kann Beschwerde einlegen</li>
              <li>Behindertenverbände haben ein Verbandsklagerecht</li>
              <li>Beschwerden können online eingereicht werden</li>
              <li>Das SMS informiert den Beschwerdeführer über das Ergebnis</li>
              <li>Schlichtungsverfahren und gerichtlicher Rechtsweg möglich</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-blue-50/60 border border-blue-200/50 p-5">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-[Syne] font-bold text-sm text-blue-700 mb-1">
                  Praxistipp: WKO-Leitfaden nutzen
                </p>
                <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                  Die Wirtschaftskammer Österreich (WKO)<SourceRef id={6} sources={sources} accent="#2563eb" /> hat einen umfassenden
                  Praxisleitfaden zum BaFG veröffentlicht, der Unternehmen bei der Umsetzung
                  unterstützt. Dieser enthält praxisnahe Erläuterungen und Checklisten für
                  verschiedene Branchen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 11. COMPLIANCE-FAHRPLAN ═══════════════════ */}
      <Section id="fahrplan" title="Ihr Compliance-Fahrplan">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          Das BaFG gilt seit dem 28. Juni 2025. Fünf Phasen, um Ihre digitalen Produkte und
          Dienste konform aufzustellen:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <RoadmapStep
            phase="Phase 1 — Accessibility Audit"
            title="Ist-Zustand erheben"
            accent="#2563eb"
            items={[
              "Bestandsaufnahme aller digitalen Produkte und Dienste",
              "Automatisierte Barrierefreiheitsprüfung (z. B. axe, WAVE, Lighthouse)",
              "Manuelle Prüfung mit Screenreader und Tastaturnavigation",
              "WCAG 2.1 AA-Konformitätsbericht erstellen",
            ]}
          />
          <RoadmapStep
            phase="Phase 2 — Gap-Analyse & Priorisierung"
            title="Lücken identifizieren"
            accent="#1d4ed8"
            items={[
              "Abgleich des Ist-Zustands mit BaFG-Anforderungen",
              "Kritische Barrieren priorisieren (Checkout, Login, Navigation)",
              "Betroffene Nutzergruppen identifizieren",
              "Aufwandsschätzung und Umsetzungs-Roadmap erstellen",
            ]}
          />
          <RoadmapStep
            phase="Phase 3 — Remediation (Fix)"
            title="Barrieren beseitigen"
            accent="#1e40af"
            items={[
              "Technische Barrieren beheben (Kontraste, Alt-Texte, Fokusreihenfolge)",
              "Formulare und interaktive Elemente barrierefrei gestalten",
              "Barrierefreiheitserklärung veröffentlichen",
              "Content-Richtlinien für barrierefreie Inhalte erstellen",
            ]}
          />
          <RoadmapStep
            phase="Phase 4 — Testing"
            title="Automatisiert + manuell testen"
            accent="#1e3a5f"
            items={[
              "Automatisierte Tests in CI/CD-Pipeline integrieren",
              "Manuelle Tests mit echten Nutzern mit Behinderungen",
              "Regressionstests bei jedem Release",
              "Konformitätsprüfung gegen EN 301 549",
            ]}
          />
        </div>

        <RoadmapStep
          phase="Phase 5 — Monitoring & Schulung"
          title="Dauerhaft konform bleiben"
          accent="#2563eb"
          items={[
            "Laufendes Monitoring der Barrierefreiheit bei jedem Release",
            "Schulung für Entwickler, Designer und Content-Ersteller",
            "Barrierefreiheitsbeauftragten benennen",
            "Feedback-Kanal für Nutzer mit Behinderungen einrichten",
            "Jährliches Re-Audit durch externe Prüfstelle",
          ]}
        />

        <div className="mt-8">
          <ToolRecommendation regulationKey="bafg" accent="#2563eb" />
        </div>
      </Section>

      {/* ═══════════════════ 12. FAQ ═══════════════════ */}
      <Section id="faq" title="Häufige Fragen (FAQ)">
        <AccordionSection
          accent="#2563eb"
          allowMultiple
          items={[
            {
              title: "Gilt das BaFG auch für reine B2B-Angebote?",
              content: (
                <p>
                  Grundsätzlich zielt das BaFG auf Produkte und Dienstleistungen ab, die für
                  Verbraucher bestimmt sind. Reine B2B-Dienstleistungen ohne Verbraucherkontakt
                  fallen nicht direkt unter das BaFG. Allerdings: Wenn Ihre Software oder Plattform
                  von Ihren B2B-Kunden als Verbraucherkanal genutzt wird (z. B. ein White-Label-Webshop),
                  müssen die Barrierefreiheitsanforderungen erfüllt werden. Zudem fordern immer
                  mehr Unternehmen und öffentliche Auftraggeber Barrierefreiheit auch in B2B-Verträgen.
                </p>
              ),
            },
            {
              title: "Was ist der Unterschied zwischen WCAG, EN 301 549 und BaFG?",
              content: (
                <p>
                  Die <strong>WCAG 2.1</strong><SourceRef id={4} sources={sources} accent="#2563eb" /> sind internationale
                  technische Richtlinien für barrierefreie Webinhalte (W3C). Die{" "}
                  <strong>EN 301 549</strong><SourceRef id={3} sources={sources} accent="#2563eb" /> ist eine europäische Norm,
                  die die WCAG-Kriterien enthält und um Anforderungen für Hardware, Software und
                  Dokumente erweitert. Das <strong>BaFG</strong> ist das österreichische Gesetz, das die
                  Einhaltung dieser Standards rechtlich verpflichtend macht. Die Einhaltung der EN 301 549
                  löst eine Konformitätsvermutung aus.
                </p>
              ),
            },
            {
              title: "Mein Unternehmen hat weniger als 10 Mitarbeiter — bin ich ausgenommen?",
              content: (
                <p>
                  Nicht unbedingt. Die Kleinstunternehmen-Ausnahme gilt nur für{" "}
                  <strong>Dienstleistungserbringer</strong>, die <strong>beide</strong> Kriterien
                  gleichzeitig erfüllen: weniger als 10 Beschäftigte UND höchstens 2 Mio. €
                  Jahresumsatz/Bilanzsumme. Für <strong>Produkthersteller</strong> (Hardware) gilt diese
                  Ausnahme nicht. Auch als befreites Kleinstunternehmen ist es ratsam,
                  Barrierefreiheit umzusetzen — es verbessert die Nutzerfreundlichkeit und öffnet Märkte.
                </p>
              ),
            },
            {
              title: "Welche Konsequenzen drohen bei Nicht-Einhaltung?",
              content: (
                <div>
                  <p className="mb-3">Die Konsequenzen sind mehrstufig:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Verwaltungsstrafen bis 80.000 € pro Verstoß</li>
                    <li>Anordnung, das Produkt/die Dienstleistung vom Markt zu nehmen</li>
                    <li>Verbraucherbeschwerden und negative Medienberichterstattung</li>
                    <li>Verlust von Ausschreibungen (insbesondere öffentliche Aufträge)</li>
                    <li>Reputationsschäden bei zunehmend sensibilisierter Öffentlichkeit</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Muss ich eine Barrierefreiheitserklärung veröffentlichen?",
              content: (
                <p>
                  Ja. Dienstleistungserbringer müssen eine Barrierefreiheitserklärung veröffentlichen,
                  die beschreibt, wie ihr Angebot die Barrierefreiheitsanforderungen erfüllt. Bei Produkten
                  muss der Hersteller in der Gebrauchsanleitung oder auf der Website Informationen über die
                  Barrierefreiheitsmerkmale bereitstellen. Die Erklärung muss in einem barrierefreien Format
                  verfügbar und leicht auffindbar sein.
                </p>
              ),
            },
            {
              title: "Gibt es Übergangsfristen für bestehende Produkte?",
              content: (
                <div>
                  <p className="mb-3">Für bestehende Produkte und Dienstleistungen gelten differenzierte Übergangsfristen:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>Neue Produkte/Dienste ab 28. Juni 2025:</strong> Müssen sofort barrierefrei sein</li>
                    <li><strong>Bestehende Dienstverträge:</strong> Übergangszeit bis maximal 28. Juni 2030</li>
                    <li><strong>Selbstbedienungsterminals:</strong> Bereits in Betrieb genommene Terminals dürfen bis
                    zum Ende ihrer wirtschaftlichen Nutzungsdauer weiterverwendet werden (max. 20 Jahre)</li>
                    <li><strong>Grundsatz:</strong> Bei wesentlichen Änderungen an bestehenden Produkten/Diensten
                    greifen die Barrierefreiheitsanforderungen sofort</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ VERWANDTE REGULIERUNGEN ═══════════════════ */}
      <RelatedGuides currentGuide="bafg" accent="#7e22ce" />

      {/* ═══════════════════ QUELLEN ═══════════════════ */}
      <Section id="quellen" title="Quellen & Offizielle Dokumente">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Alle Informationen in diesem Guide basieren auf den offiziellen EU- und österreichischen
          Rechtstexten sowie anerkannten Standards. Hier finden Sie die Primärquellen:
        </p>

        <SourceList sources={sources} accent="#2563eb" />

        <div className="mt-6 rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Hinweis:</strong> Dieser Guide dient der Information
            und ersetzt keine Rechtsberatung. Die verlinkten Dokumente sind die offiziellen
            Rechtstexte und Standards. Bei Fragen zur konkreten Anwendung auf Ihr Unternehmen empfehlen wir
            die Beratung durch spezialisierte Rechtsanwälte oder Barrierefreiheitsberater.
          </p>
        </div>
      </Section>
    </GuidePageLayout>
  );
}
