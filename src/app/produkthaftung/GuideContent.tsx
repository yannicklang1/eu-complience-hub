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
    title: "Richtlinie (EU) 2024/2853 — Produkthaftung (Volltext)",
    url: "https://eur-lex.europa.eu/eli/dir/2024/2853/oj/deu",
    desc: "Offizielle deutsche Fassung der neuen EU-Produkthaftungsrichtlinie",
    type: "Richtlinie",
  },
  {
    id: 2,
    title: "EU-Kommission — Neue Produkthaftungsrichtlinie",
    url: "https://commission.europa.eu/business-economy-euro/product-safety-and-requirements/product-liability_de",
    desc: "Offizielle Informationsseite der Kommission mit FAQ",
    type: "Behörde",
  },
  {
    id: 3,
    title: "Bundesministerium der Justiz — Umsetzung PLD in Deutschland",
    url: "https://www.bmj.de/DE/Themen/GerichteUndRechtsstaat/Produkthaftung/produkthaftung_node.html",
    desc: "Informationen zur deutschen Umsetzung der neuen Produkthaftungsrichtlinie",
    type: "Behörde",
  },
  {
    id: 4,
    title: "EU AI Act (EU) 2024/1689 — KI-Haftungskomponente",
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/deu",
    desc: "EU AI Act: Zusammenspiel mit der neuen Produkthaftung für KI-Systeme",
    type: "Verordnung",
  },
  {
    id: 5,
    title: "Cyber Resilience Act (EU) 2024/2847",
    url: "https://eur-lex.europa.eu/eli/reg/2024/2847/oj/deu",
    desc: "CRA: Sicherheitsanforderungen die Produkthaftungsrisiken reduzieren",
    type: "Verordnung",
  },
  {
    id: 6,
    title: "GDV — Cyber-Versicherung und neue Produkthaftung",
    url: "https://www.gdv.de/de/themen/news/was-unternehmen-zur-neuen-eu-produkthaftung-wissen-muessen-126864",
    desc: "Gesamtverband der Deutschen Versicherungswirtschaft: Auswirkungen auf Versicherungspflicht",
    type: "Behörde",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Überblick" },
  { id: "timeline", label: "Timeline & Fristen" },
  { id: "software-als-produkt", label: "Software als Produkt" },
  { id: "ki-haftung", label: "KI & Algorithmen" },
  { id: "beweislast", label: "Beweislastumkehr" },
  { id: "betroffene", label: "Wer haftet?" },
  { id: "haftungsumfang", label: "Haftungsumfang" },
  { id: "open-source", label: "Open Source" },
  { id: "versicherung", label: "Versicherung" },
  { id: "praevention", label: "Haftungsprävention" },
  { id: "fahrplan", label: "Compliance-Fahrplan" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Haftungsdeckel", value: "Kein Deckel" },
  { label: "Umsetzung DE", value: "9. Dez. 2026" },
  { label: "Software betroffen", value: "Ja (auch SaaS)" },
  { label: "KI-Systeme", value: "Ja (Hochrisiko)" },
  { label: "Beweislast", value: "Umgekehrt (Kläger)" },
  { label: "Verjährung", value: "10 Jahre (Personensch.)" },
];

/* ─────────────────── Helpers ─────────────────── */
const ACCENT = "#ef4444";

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
      <div className="font-[Syne] font-extrabold text-2xl sm:text-3xl mb-1" style={{ color: accent }}>
        {value}
      </div>
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
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "border-[#ef4444] bg-[#ef4444]" : active ? "bg-white border-[#ef4444] ring-4 ring-red-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done || active ? "text-[#ef4444]" : "text-[#7a8db0]"}`}>
          {date} {done && "✓"}
        </span>
        <h3 className="font-[Syne] font-bold text-[#060c1a] mt-0.5">{title}</h3>
        <p className="text-[#3a4a6b] text-sm mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function RiskCard({
  risk, level, description,
}: { risk: string; level: "Hoch" | "Mittel" | "Gering"; description: string }) {
  const colors = { Hoch: "#dc2626", Mittel: "#f59e0b", Gering: "#059669" };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-[#d8dff0] bg-white p-6"
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className="px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{ background: colors[level] }}
        >
          {level}
        </span>
        <h3 className="font-[Syne] font-bold text-[#060c1a]">{risk}</h3>
      </div>
      <p className="text-[#3a4a6b] text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   GUIDE CONTENT
   ══════════════════════════════════════════════════════ */
export default function GuideContent() {
  return (
    <GuidePageLayout
      title="Neue EU-Produkthaftung (PLD)"
      subtitle="Richtlinie (EU) 2024/2853: Software als Produkt, KI-Haftung und Beweislastumkehr — was Entwickler und SaaS-Anbieter jetzt wissen müssen"
      regulationKey="Richtlinie (EU) 2024/2853"
      accent={ACCENT}
      tocItems={tocItems}
      quickFacts={quickFacts}
      trustBadge={{ lastReview: "19.02.2026", sourceCount: 6, factChecked: true }}
    >

      {/* ═══════════════ 1. ÜBERBLICK ═══════════════ */}
      <Section id="ueberblick" title="Was ändert die neue Produkthaftungsrichtlinie?">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          Die <strong>neue Produkthaftungsrichtlinie (EU) 2024/2853 (PLD)</strong> ersetzt die 40 Jahre alte
          Richtlinie von 1985 und revolutioniert die Haftung für digitale Produkte. Das entscheidende Novum:
          <strong> Software gilt erstmals ausdrücklich als Produkt</strong> — einschließlich SaaS, KI-Systeme
          und automatische Softwareupdates. <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          Bisher war Software im deutschen Recht ein Graubereich — meist als Dienstleistung eingestuft
          und damit nur bei Vorsatz oder grober Fahrlässigkeit haftbar. Die neue PLD schafft eine
          <strong> verschuldensunabhängige Gefährdungshaftung</strong>: Wer ein fehlerhaftes Produkt
          in Verkehr bringt, haftet — unabhängig davon, ob er schuldhaft gehandelt hat. <SourceRef id={2} sources={sources} accent={ACCENT} />
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <StatCard value="Unbegrenzt" label="Haftung (kein Deckel bei Personenschäden)" />
          <StatCard value="9. Dez. 2026" label="Umsetzung in nationales Recht" />
          <StatCard value="SaaS betroffen" label="Auch Cloud-Software = Produkt" />
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 mb-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3">Was sich fundamental ändert</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-sm mb-2 text-[#060c1a]">Alte Richtlinie (1985)</h4>
              <ul className="space-y-1">
                {["Software = Dienstleistung (meist)", "Klägerin muss Verschulden beweisen", "Immaterialgüterschäden ausgeschlossen", "10 Jahre Verjährung (Produkt)"].map((item) => (
                  <li key={item} className="text-xs text-[#3a4a6b] flex items-start gap-1"><span>✗</span> {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-2 text-[#060c1a]">Neue PLD (2024)</h4>
              <ul className="space-y-1">
                {["Software = Produkt (immer)", "Beweislastumkehr zugunsten Kläger", "Datenverlust und digitale Schäden eingeschlossen", "25 Jahre Verjährung (latente Schäden)"].map((item) => (
                  <li key={item} className="text-xs text-[#3a4a6b] flex items-start gap-1"><span>✓</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Fristen">
        <div className="space-y-0">
          <TimelineItem
            date="23. Oktober 2024"
            title="PLD im EU-Amtsblatt veröffentlicht"
            description="Richtlinie (EU) 2024/2853 tritt in Kraft. 25-monatige Umsetzungsfrist für Mitgliedsstaaten beginnt."
            done
          />
          <TimelineItem
            date="9. Dezember 2026"
            title="Nationale Umsetzung — Deadline"
            description="Mitgliedsstaaten müssen die PLD in nationales Recht umgesetzt haben. In Deutschland: Anpassung des ProdHaftG."
            active
          />
          <TimelineItem
            date="Ab 10. Dezember 2026"
            title="Neue PLD gilt für alle neuen Produkte"
            description="Für Produkte, die ab diesem Datum in Verkehr gebracht werden, gilt die neue Haftungsordnung vollständig."
          />
          <TimelineItem
            date="Laufend"
            title="KI-Haftungsrichtlinie (AILD)"
            description="Die geplante KI-Haftungsrichtlinie (AILD) soll die PLD ergänzen und Beweislasterleichterungen für KI-Schäden spezifizieren. Status: in Verhandlung."
          />
        </div>
      </Section>

      {/* ═══════════════ 3. SOFTWARE ALS PRODUKT ═══════════════ */}
      <Section id="software-als-produkt" title="Software als Produkt — der Paradigmenwechsel">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          <LawRef law="Produkthaftungsrichtlinie" article="4" absatz="1" /> definiert Software ausdrücklich als Produkt.
          Das gilt für alle Vertriebsmodelle — nicht nur für verkaufte Software, sondern auch für
          SaaS, APIs und automatische Updates. <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>

        <div className="grid gap-4 mb-8">
          <RiskCard risk="On-Premises Software" level="Hoch" description="Klassische installierte Software: Fehler in der Software = Produktfehler. Hersteller haftet verschuldensunabhängig für Schäden durch Softwarebugs." />
          <RiskCard risk="SaaS / Cloud-Software" level="Hoch" description="Ausdrücklich als Produkt definiert. Updates, die einen Fehler einführen, können Produkthaftung auslösen — auch wenn der Fehler nur kurzzeitig bestand." />
          <RiskCard risk="Automatische Softwareupdates" level="Hoch" description="Wenn ein automatisches Update einen Fehler einführt, kann dies Produkthaftung auslösen — auch wenn das ursprüngliche Produkt fehlerfrei war." />
          <RiskCard risk="Open-Source-Software" level="Mittel" description="Wer OSS kommerziell vertreibt oder in sein Produkt integriert, haftet als Hersteller. Reine Community-OSS ohne kommerziellen Hintergrund ist tendenziell ausgenommen." />
          <RiskCard risk="Interne Unternehmenssoftware" level="Gering" description="Software, die nur intern genutzt und nicht in Verkehr gebracht wird, fällt nicht unter die PLD. Sobald Dritte Zugang erhalten, kann Haftung entstehen." />
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2">Was ist ein &quot;Produktfehler&quot; bei Software?</h3>
          <p className="text-[#3a4a6b] text-sm leading-relaxed">
            Ein Softwareprodukt ist fehlerhaft, wenn es nicht die Sicherheit bietet, die Nutzer
            berechtigterweise erwarten dürfen. Dies umfasst: Sicherheitslücken, Datenverlust durch Bugs,
            fehlerhafte Berechnungen, Abstürze in sicherheitskritischen Systemen und — neu — auch die
            Nichtbereitstellung von Sicherheitsupdates nach Bekanntwerden von Schwachstellen.
          </p>
        </div>
      </Section>

      {/* ═══════════════ 4. KI-HAFTUNG ═══════════════ */}
      <Section id="ki-haftung" title="KI-Systeme & Algorithmen">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          KI-Systeme gelten als Produkte im Sinne der PLD. Das hat weitreichende Konsequenzen
          für KI-Entwickler und -Anbieter. <SourceRef id={4} sources={sources} accent={ACCENT} />
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { icon: "🤖", title: "Hochrisiko-KI (EU AI Act)", text: "Für Hochrisiko-KI-Systeme nach AI Act (z.B. Medizin, Kreditvergabe, Personalauswahl) gelten verschärfte Haftungsregeln: Beweislastumkehr bei vermuteten Fehlern." },
            { icon: "💊", title: "KI in Medizinprodukten", text: "KI-Diagnosetools, medizinische Bildauswertung: Unbegrenzte Haftung bei Körperschäden durch fehlerhafte KI-Entscheidungen." },
            { icon: "🚗", title: "Autonome Systeme", text: "Autonomous Driving Software, Roboter, Drohnen: Jeder durch Softwarefehler verursachte Schaden fällt unter PLD." },
            { icon: "📊", title: "Entscheidungsalgorithmen", text: "Kreditscoring, Risikomodelle, Preisalgorithmen: Diskriminierende oder fehlerhafte Entscheidungen können Schäden begründen." },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-[#d8dff0] bg-white p-6">
              <div className="text-2xl mb-3">{card.icon}</div>
              <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2">{card.title}</h3>
              <p className="text-[#3a4a6b] text-sm leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 5. BEWEISLAST ═══════════════ */}
      <Section id="beweislast" title="Beweislastumkehr — der praktische Unterschied">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          Die Beweislastumkehr ist das gefährlichste Instrument der neuen PLD für Hersteller.
          <LawRef law="Produkthaftungsrichtlinie" article="9" /> <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white overflow-hidden mb-8">
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#d8dff0]">
            <div className="p-6">
              <h3 className="font-[Syne] font-bold text-[#060c1a] mb-4 text-red-600">Alt: Kläger muss beweisen</h3>
              <p className="text-[#3a4a6b] text-sm leading-relaxed mb-4">
                Unter altem Recht musste der Geschädigte beweisen:
              </p>
              <ul className="space-y-2">
                {["Produktfehler vorhanden", "Schaden entstanden", "Kausalität zwischen Fehler und Schaden"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
                    <span className="text-red-500">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6">
              <h3 className="font-[Syne] font-bold mb-4" style={{ color: ACCENT }}>Neu: Erleichterte Beweislast</h3>
              <p className="text-[#3a4a6b] text-sm leading-relaxed mb-4">
                Bei technischer Komplexität vermutet das Gericht Fehler und Kausalität, wenn:
              </p>
              <ul className="space-y-2">
                {[
                  "Produkt nicht dem Stand der Technik entspricht",
                  "Offensichtlicher Zusammenhang zwischen Fehler und Schaden",
                  "Hersteller Beweise nicht herausgibt (Disclosure-Pflicht)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
                    <span style={{ color: ACCENT }}>•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2">Disclosure-Pflicht: Neues Risiko</h3>
          <p className="text-[#3a4a6b] text-sm leading-relaxed">
            Gerichte können Hersteller verpflichten, interne Dokumente, Logs, Testberichte und
            Qualitätsdaten offenzulegen. Wer diese nicht vorhalten kann (z.B. keine Audit Trails),
            riskiert die Vermutung des Produktfehlers. Dokumentation wird damit zur Haftungsabwehr.
          </p>
        </div>
      </Section>

      {/* ═══════════════ 6. BETROFFENE ═══════════════ */}
      <Section id="betroffene" title="Wer haftet?">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          Die PLD definiert eine Haftungskaskade — von Herstellern über Importeure bis zu Händlern. <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>

        <div className="space-y-3 mb-8">
          {[
            { prio: "1. Priorität", title: "Hersteller (EU-ansässig)", desc: "Primär haftbar. Wer das Produkt herstellt und in Verkehr bringt, haftet verschuldensunabhängig." },
            { prio: "2. Priorität", title: "Importeure (bei Non-EU-Herstellern)", desc: "Wenn der Hersteller außerhalb der EU sitzt und kein EU-Bevollmächtigter benannt ist, haftet der Importeur wie ein Hersteller." },
            { prio: "3. Priorität", title: "Bevollmächtigte Vertreter", desc: "EU-Bevollmächtigte von Non-EU-Herstellern haften subsidiär." },
            { prio: "4. Priorität", title: "Händler", desc: "Händler haften, wenn keiner der vorgenannten Akteure innerhalb von 1 Monat benannt wird — oder wenn sie das Produkt selbst modifiziert haben." },
          ].map((item) => (
            <div key={item.prio} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#d8dff0]">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white shrink-0" style={{ background: ACCENT }}>
                {item.prio}
              </span>
              <div>
                <h3 className="font-[Syne] font-bold text-[#060c1a]">{item.title}</h3>
                <p className="text-[#3a4a6b] text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 7. HAFTUNGSUMFANG ═══════════════ */}
      <Section id="haftungsumfang" title="Haftungsumfang & ersatzfähige Schäden">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          Die neue PLD erweitert die ersatzfähigen Schäden erheblich — insbesondere für digitale Schäden. <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { icon: "🏥", title: "Personenschäden", text: "Tod, Körperverletzung, Gesundheitsschäden. Kein Haftungsdeckel. Unbegrenzte Haftung.", color: "#dc2626" },
            { icon: "💻", title: "Datenverlust", text: "Neu: Verlust oder Beschädigung von Daten ist ersatzfähiger Schaden — auch wenn kein physisches Produkt betroffen.", color: ACCENT },
            { icon: "🏠", title: "Sachschäden", text: "Schäden an privat genutzten Sachen über 1.000 € Selbstbehalt. Untergrenze schützt vor Kleinstschäden.", color: "#f59e0b" },
            { icon: "🧠", title: "Psychische Schäden", text: "Schwere psychische Schäden durch fehlerhafte Produkte können künftig ersetzt werden.", color: "#7c3aed" },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-[#d8dff0] bg-white overflow-hidden">
              <div className="h-1.5" style={{ background: card.color }} />
              <div className="p-6">
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2">{card.title}</h3>
                <p className="text-[#3a4a6b] text-sm leading-relaxed">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 8. OPEN SOURCE ═══════════════ */}
      <Section id="open-source" title="Open-Source-Software">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          Open-Source-Software ist teilweise von der PLD ausgenommen — aber mit wichtigen Grenzen. <SourceRef id={1} sources={sources} accent={ACCENT} />
        </p>

        <AccordionSection
          items={[
            {
              title: "Wann ist OSS ausgenommen?",
              content: (
                <div>
                  <p className="text-[#3a4a6b] text-sm leading-relaxed mb-3">OSS ist ausgenommen, wenn sie:</p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2 text-sm text-[#3a4a6b]"><span style={{ color: ACCENT }}>✓</span> Kostenlos und ohne kommerziellen Hintergrund bereitgestellt wird</li>
                    <li className="flex items-start gap-2 text-sm text-[#3a4a6b]"><span style={{ color: ACCENT }}>✓</span> Nicht Teil eines kommerziellen Produkts oder einer kommerziellen Dienstleistung ist</li>
                    <li className="flex items-start gap-2 text-sm text-[#3a4a6b]"><span style={{ color: ACCENT }}>✓</span> Nicht von einem Unternehmen im Rahmen seiner wirtschaftlichen Tätigkeit entwickelt wird</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Wann haftet OSS-Maintainer trotzdem?",
              content: (
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-sm text-[#3a4a6b]"><span className="text-red-500">⚠</span> Wenn OSS kommerziell genutzt wird (z.B. SaaS auf OSS-Basis)</li>
                  <li className="flex items-start gap-2 text-sm text-[#3a4a6b]"><span className="text-red-500">⚠</span> Wenn das Unternehmen OSS in sein proprietäres Produkt integriert</li>
                  <li className="flex items-start gap-2 text-sm text-[#3a4a6b]"><span className="text-red-500">⚠</span> Wenn OSS im Rahmen eines kommerziellen Supports bereitgestellt wird</li>
                  <li className="flex items-start gap-2 text-sm text-[#3a4a6b]"><span className="text-red-500">⚠</span> Wenn der Maintainer Vergütung für Pflege und Wartung erhält</li>
                </ul>
              ),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════ 9. VERSICHERUNG ═══════════════ */}
      <Section id="versicherung" title="Versicherung & Risikotransfer">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          Die neue PLD erzeugt erheblichen Versicherungsbedarf — besonders für Software- und KI-Unternehmen. <SourceRef id={6} sources={sources} accent={ACCENT} />
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3">Produkthaftpflicht</h3>
            <p className="text-[#3a4a6b] text-sm leading-relaxed mb-3">Deckt Schäden durch fehlerhafte Produkte. Muss auf Software erweitert werden — viele Policen sind noch nicht angepasst.</p>
            <span className="text-xs font-bold" style={{ color: ACCENT }}>Deckung prüfen!</span>
          </div>
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3">Cyber-Versicherung</h3>
            <p className="text-[#3a4a6b] text-sm leading-relaxed mb-3">Deckt Datenverlust und Cyberangriffe. Ergänzt Produkthaftpflicht für den Datenschadensbereich der PLD.</p>
            <span className="text-xs font-bold" style={{ color: ACCENT }}>Kombination empfohlen</span>
          </div>
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3">D&O-Versicherung</h3>
            <p className="text-[#3a4a6b] text-sm leading-relaxed mb-3">Schützt Geschäftsführer vor persönlicher Haftung bei Pflichtverletzungen — auch bei PLD-Compliance-Versagen.</p>
            <span className="text-xs font-bold text-amber-600">Ergänzend prüfen</span>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 10. PRÄVENTION ═══════════════ */}
      <Section id="praevention" title="Haftungsprävention: Was Unternehmen jetzt tun müssen">
        <p className="text-[#3a4a6b] leading-relaxed mb-6">
          Die beste Haftungsabwehr ist ein lückenloses Qualitäts- und Dokumentationssystem. <SourceRef id={5} sources={sources} accent={ACCENT} />
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { icon: "📋", title: "Dokumentation", items: ["Vollständige Audit Trails für alle Software-Versionen", "Testberichte und Code-Reviews archivieren", "Release Notes und Änderungshistorie", "Incident Response-Protokolle"] },
            { icon: "🔒", title: "Security by Design", items: ["CRA-konforme Sicherheitsarchitektur", "Vulnerability Management-Prozess", "SBOM (Software Bill of Materials)", "Penetrationstests vor Releases"] },
            { icon: "🔄", title: "Update-Management", items: ["Kontrollierter Update-Rollout mit Rollback-Option", "Automatische Updates nur mit klarem Kill-Switch", "Nutzerbenachrichtigung bei sicherheitskritischen Updates", "Patch-SLAs definieren und einhalten"] },
            { icon: "⚖️", title: "Vertragliche Absicherung", items: ["AGB auf neue PLD anpassen", "Lieferantenverträge mit Haftungsrückgriff", "Software-Lizenzverträge überprüfen", "Supply-Chain-Haftungsvereinbarungen"] },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-[#d8dff0] bg-white p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{card.icon}</span>
                <h3 className="font-[Syne] font-bold text-[#060c1a]">{card.title}</h3>
              </div>
              <ul className="space-y-2">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
                    <span style={{ color: ACCENT }} className="mt-0.5 shrink-0">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 11. FAHRPLAN ═══════════════ */}
      <Section id="fahrplan" title="Compliance-Fahrplan">
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { phase: "Phase 1 (sofort)", title: "Risikoanalyse", items: ["Alle Softwareprodukte auf PLD-Relevanz prüfen", "KI-Systeme auf Hochrisiko-Einordnung prüfen", "Bestehende Versicherungen auf Softwareschäden prüfen"] },
            { phase: "Phase 2 (3 Monate)", title: "Dokumentation", items: ["Audit Trail-System implementieren", "SBOM für alle Produkte erstellen", "AGB und Verträge aktualisieren"] },
            { phase: "Phase 3 (6 Monate)", title: "Security & Qualität", items: ["CRA-Anforderungen implementieren", "Penetrationstests einplanen", "Update-Prozesse formalisieren"] },
            { phase: "Phase 4 (laufend)", title: "Monitoring", items: ["Neue Rechtsprechung verfolgen", "Versicherungsdeckung jährlich prüfen", "Lieferantenhaftung regelmäßig überprüfen"] },
          ].map((phase) => (
            <div key={phase.phase} className="rounded-2xl border border-[#d8dff0] bg-white p-6">
              <span className="font-mono text-xs font-bold text-[#ef4444]">{phase.phase}</span>
              <h3 className="font-[Syne] font-bold text-[#060c1a] mt-1 mb-3">{phase.title}</h3>
              <ul className="space-y-1.5">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
                    <span style={{ color: ACCENT }} className="shrink-0 mt-0.5">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 12. FAQ ═══════════════ */}
      <Section id="faq" title="FAQ">
        <AccordionSection
          items={[
            {
              title: "Haftet mein SaaS-Unternehmen nach der neuen PLD?",
              content: (<p className="text-[#3a4a6b] text-sm leading-relaxed">Ja — SaaS-Software gilt als Produkt. Wenn Ihre Software einen Fehler hat und dadurch Schäden (Datenverlust, Personenschaden, Sachschaden) entstehen, haften Sie verschuldensunabhängig. Dies war bisher nicht so klar.</p>),
            },
            {
              title: "Kann ich die Haftung in meinen AGB ausschließen?",
              content: (<p className="text-[#3a4a6b] text-sm leading-relaxed">Nein. Die PLD-Haftung ist zwingend und kann nicht durch AGB ausgeschlossen werden. Was möglich ist: Haftung im B2B-Bereich vertraglich zwischen Unternehmen zu verschieben (Lieferantenregress).</p>),
            },
            {
              title: "Was bedeutet die neue PLD für GitHub-Projekte?",
              content: (<p className="text-[#3a4a6b] text-sm leading-relaxed">Reine Community-OSS ohne kommerziellen Hintergrund ist tendenziell ausgenommen. Sobald Sie das Projekt kommerziell nutzen, in Produkte integrieren oder dafür bezahlt werden, kann PLD anwendbar sein.</p>),
            },
            {
              title: "Wann genau gilt die neue PLD in Deutschland?",
              content: (<p className="text-[#3a4a6b] text-sm leading-relaxed">Deutschland muss die Richtlinie bis 9. Dezember 2026 in nationales Recht umsetzen (Anpassung des ProdHaftG). Die neue Haftungsordnung gilt dann für alle Produkte, die ab diesem Datum in Verkehr gebracht werden.</p>),
            },
            {
              title: "Wie unterscheidet sich PLD von der KI-Haftungsrichtlinie (AILD)?",
              content: (<p className="text-[#3a4a6b] text-sm leading-relaxed">PLD regelt die verschuldensunabhängige Produkthaftung für alle Produkte (inkl. KI-Systeme). Die AILD (noch in Verhandlung) soll ergänzend spezifische Beweiserleichterungen für KI-Schäden bei der verschuldensabhängigen Haftung einführen.</p>),
            },
          ]}
          accent={ACCENT}
        />
      </Section>

      {/* ═══════════════════ SOFTWARE-EMPFEHLUNGEN ═══════════════════ */}
      <ToolRecommendation regulationKey="pld" accent={ACCENT} />

      {/* ═══════════════════ QUELLEN ═══════════════════ */}
      <Section id="quellen" title="Quellen & Nachweise">
        <SourceList sources={sources} />
      </Section>

    </GuidePageLayout>
  );
}
