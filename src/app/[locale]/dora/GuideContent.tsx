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
    title: "Verordnung (EU) 2022/2554 — DORA (Volltext)",
    url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj/deu",
    desc: "Offizielle deutsche Fassung im EUR-Lex Portal",
    type: "Verordnung",
  },
  {
    id: 2,
    title: "DORA — englische Fassung",
    url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng",
    desc: "Offizielle englische Fassung im EUR-Lex Portal",
    type: "Verordnung",
  },
  {
    id: 3,
    title: "FMA — DORA-Informationsseite",
    url: "https://www.fma.gv.at/querschnittsthemen/dora/",
    desc: "Finanzmarktaufsicht Österreich — Leitfäden, Rundschreiben und FAQs zu DORA",
    type: "Aufsicht AT",
  },
  {
    id: 4,
    title: "EBA — DORA Regulierungsstandards",
    url: "https://www.eba.europa.eu/activities/direct-supervisory-powers/digital-operational-resilience-act",
    desc: "EBA: Regulierungsstandards und Durchführungsstandards zu DORA",
    type: "Behörde",
  },
  {
    id: 5,
    title: "OeNB — TIBER-AT",
    url: "https://www.oenb.at",
    desc: "Oesterreichische Nationalbank — TIBER-Framework für Penetrationstests",
    type: "Aufsicht AT",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Überblick" },
  { id: "timeline", label: "Timeline & Fristen" },
  { id: "betroffene", label: "Wer ist betroffen?" },
  { id: "saeulen", label: "Die 5 Säulen" },
  { id: "ikt-risiko", label: "IKT-Risikomanagement" },
  { id: "incident", label: "Incident Reporting" },
  { id: "testing", label: "Resilience Testing" },
  { id: "third-party", label: "Third-Party-Management" },
  { id: "strafen", label: "Strafen & Aufsicht" },
  { id: "oesterreich", label: "Österreich" },
  { id: "fahrplan", label: "Compliance-Fahrplan" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Gilt seit", value: "17. Januar 2025" },
  { label: "Verordnungstyp", value: "EU-Verordnung (direkt)" },
  { label: "Betroffene Sektoren", value: "21 Finanzkategorien" },
  { label: "Aufsicht (AT)", value: "FMA" },
  { label: "TLPT-Pflicht", value: "Alle 3 Jahre" },
  { label: "Meldepflicht", value: "4h / 72h / 1 Monat" },
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
  accent = "#10b981",
}: {
  value: string;
  label: string;
  accent?: string;
}) {
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

/* ─────────────────── Timeline item ─────────────────── */
function TimelineItem({
  date, title, description, active = false, done = false,
}: { date: string; title: string; description: React.ReactNode; active?: boolean; done?: boolean }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
          done ? "bg-emerald-500 border-emerald-500" : active ? "bg-emerald-500 border-emerald-500 animate-pulse" : "bg-white border-[#d8dff0]"
        }`} />
        <div className="w-px flex-1 bg-[#e8ecf4] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[11px] font-semibold text-[#7a8db0]">{date}</span>
          {done && <span className="text-[9px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-mono font-bold border border-emerald-200">Erledigt</span>}
          {active && <span className="text-[9px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-mono font-bold border border-emerald-200">Aktiv</span>}
        </div>
        <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">{title}</div>
        <p className="text-[14px] text-[#5a6a8a] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ─────────────────── Pillar card ─────────────────── */
function PillarCard({
  number, title, description, color, items,
}: { number: string; title: string; description: string; color: string; items: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border bg-white p-6 relative overflow-hidden"
      style={{ borderColor: `${color}30` }}
    >
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: color }} />
      <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color }}>
        Säule {number}
      </div>
      <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">{title}</h3>
      <p className="text-[13px] text-[#7a8db0] leading-relaxed mb-4">{description}</p>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: color }} />
            <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────── Roadmap step ─────────────────── */
function RoadmapStep({
  phase, title, items, accent = "#10b981",
}: { phase: string; title: string; items: string[]; accent?: string }) {
  return (
    <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full" style={{ background: accent }} />
      <div className="font-mono text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: accent }}>{phase}</div>
      <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
      title="DORA"
      subtitle="Digital Operational Resilience Act im Detail: IKT-Risikomanagement, Incident Reporting, Resilience Testing und Third-Party-Management für den europäischen Finanzsektor."
      regulationKey="Verordnung (EU) 2022/2554"
      accent="#10b981"
      badgeLabel="Gilt seit Jan 2025"
      badgeColor="#059669"
      quickFacts={quickFacts}
      tocItems={tocItems}
      trustBadge={{ lastReview: "18.02.2026", sourceCount: 5 }}
      heroIcon={
        <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      }
      href="/dora"
    >
      {/* ═══════════════════ 1. ÜBERBLICK ═══════════════════ */}
      <Section id="ueberblick" title="Überblick: Was ist DORA?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Der <strong>Digital Operational Resilience Act</strong> (Verordnung (EU) 2022/2554)<SourceRef id={1} sources={sources} accent="#10b981" /> ist
          das EU-weite Regelwerk für die digitale Betriebsstabilität des Finanzsektors. Als
          EU-Verordnung gilt DORA <strong>direkt in allen Mitgliedstaaten</strong> — ohne
          nationale Umsetzung. Seit dem <strong>17. Januar 2025</strong> ist DORA vollständig
          anwendbar.
        </p>
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          DORA schafft einen einheitlichen Rahmen für das <strong>IKT-Risikomanagement</strong>{" "}
          im gesamten europäischen Finanzsektor. Das Ziel: Finanzunternehmen sollen
          IKT-bezogene Störungen und Cyberangriffe widerstehen, darauf reagieren und sich
          davon erholen können — ohne Unterbrechung kritischer Finanzdienstleistungen.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard value="Jan 2025" label="Gilt seit" accent="#059669" />
          <StatCard value="21" label="Finanzkategorien" />
          <StatCard value="5" label="Kernbereiche" accent="#10b981" />
          <StatCard value="4h" label="Erstmeldung" accent="#dc2626" />
        </div>

        <div className="rounded-2xl bg-emerald-50/60 border border-emerald-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-emerald-700 mb-1">
                DORA vs. NIS2: Lex Specialis
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                DORA ist das Spezialgesetz für den Finanzsektor und hat Vorrang vor <LawRef law="NIS2">NIS2</LawRef>.
                Finanzunternehmen, die unter DORA fallen, müssen die DORA-Anforderungen erfüllen —
                nicht die NIS2-Anforderungen. DORA enthält in vielen Bereichen strengere oder
                spezifischere Pflichten als NIS2.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 2. TIMELINE ═══════════════════ */}
      <Section id="timeline" title="Timeline & Fristen">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          DORA ist bereits vollständig in Kraft. Die wichtigsten Meilensteine:
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8">
          <TimelineItem
            date="27. Dezember 2022"
            title="DORA veröffentlicht im Amtsblatt"
            description="Die Verordnung (EU) 2022/2554 wird im Amtsblatt der Europäischen Union veröffentlicht."
            done
          />
          <TimelineItem
            date="16. Januar 2023"
            title="DORA tritt in Kraft"
            description="20 Tage nach der Veröffentlichung tritt DORA in Kraft. Ab jetzt läuft die 24-monatige Umsetzungsfrist."
            done
          />
          <TimelineItem
            date="2024"
            title="RTS & ITS veröffentlicht"
            description={<>Die Europäischen Aufsichtsbehörden (ESAs: EBA, EIOPA, ESMA) veröffentlichen technische Regulierungsstandards (RTS) und Durchführungsstandards (ITS) mit detaillierten Anforderungen.<SourceRef id={4} sources={sources} accent="#10b981" /></>}
            done
          />
          <TimelineItem
            date="17. Januar 2025"
            title="DORA voll anwendbar"
            description="Alle DORA-Anforderungen gelten ab diesem Datum. Finanzunternehmen müssen das IKT-Risikomanagement-Framework, Meldeprozesse, Testing-Programme und Third-Party-Management vollständig implementiert haben."
            active
          />
          <TimelineItem
            date="2025–2028"
            title="TLPT-Durchführung"
            description="Bedrohungsgeleitete Penetrationstests (TLPT) müssen alle 3 Jahre durchgeführt werden. Die Aufsichtsbehörden identifizieren die pflichtigen Finanzunternehmen."
          />
        </div>
      </Section>

      {/* ═══════════════════ 3. WER IST BETROFFEN? ═══════════════════ */}
      <Section id="betroffene" title="Wer ist betroffen?">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          DORA gilt für nahezu den <strong>gesamten regulierten Finanzsektor</strong> der EU —
          von Banken über Versicherungen bis zu Krypto-Dienstleistern. Insgesamt definiert
          die Verordnung <strong>21 Kategorien</strong> von Finanzunternehmen.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {[
            { icon: "🏦", name: "Kreditinstitute", desc: "Banken, Sparkassen" },
            { icon: "📊", name: "Wertpapierfirmen", desc: "Broker, Investmentbanken" },
            { icon: "🏛️", name: "Zahlungsinstitute", desc: "Payment Service Provider" },
            { icon: "💳", name: "E-Geld-Institute", desc: "E-Money-Anbieter" },
            { icon: "🛡️", name: "Versicherungen", desc: "Versicherungs- und Rückversicherungsunternehmen" },
            { icon: "📈", name: "Fondsmanager", desc: "OGAW, AIFM, Verwaltungsgesellschaften" },
            { icon: "🔗", name: "Krypto-Dienstleister", desc: "Krypto-Asset-Service-Provider (CASPs)" },
            { icon: "⚙️", name: "Marktinfrastruktur", desc: "Börsen, CCPs, CSDs, Handelsplätze" },
            { icon: "📋", name: "Ratingagenturen", desc: "Kreditratingagenturen" },
            { icon: "🔍", name: "Wirtschaftsprüfer", desc: "Gesetzliche Abschlussprüfer" },
            { icon: "📑", name: "Crowdfunding", desc: "Crowdfunding-Dienstleister" },
            { icon: "☁️", name: "IKT-Drittanbieter", desc: "Kritische IKT-Drittdienstleister (Cloud, SaaS)" },
          ].map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-[#d8dff0] bg-white p-4 hover:border-emerald-200 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <div className="font-[Syne] font-bold text-[13px] text-[#060c1a]">{item.name}</div>
                  <div className="text-[11px] text-[#7a8db0]">{item.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-amber-50/60 border border-amber-200/50 p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div>
              <p className="font-[Syne] font-bold text-sm text-amber-700 mb-1">
                Besonders: Kritische IKT-Drittanbieter
              </p>
              <p className="text-[13px] text-[#3a4a6b] leading-relaxed">
                DORA betrifft nicht nur Finanzunternehmen selbst, sondern auch deren
                <strong> kritische IKT-Drittdienstleister</strong> (z.B. Cloud-Provider,
                SaaS-Anbieter, Rechenzentren). Diese werden direkt von den europäischen
                Aufsichtsbehörden (ESAs) überwacht — ein Novum in der Finanzregulierung.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 4. DIE 5 SÄULEN ═══════════════════ */}
      <Section id="saeulen" title="Die 5 Säulen von DORA">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          DORA ist um fünf zentrale Bereiche strukturiert. Jede Säule enthält spezifische
          Anforderungen, die Finanzunternehmen umsetzen müssen:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <PillarCard
            number="I"
            title="IKT-Risikomanagement"
            description="Umfassender Rahmen für die Identifikation, Steuerung und Überwachung von IKT-Risiken."
            color="#10b981"
            items={[
              "IKT-Risikomanagement-Framework",
              "Governance & Verantwortlichkeiten",
              "Identifikation & Klassifikation",
              "Schutz & Prävention",
              "Erkennung & Reaktion",
              "Wiederherstellung & Lernen",
            ]}
          />
          <PillarCard
            number="II"
            title="Incident Management"
            description="Klassifizierung, Meldung und Management von IKT-bezogenen Vorfällen."
            color="#059669"
            items={[
              "Vorfallklassifizierung",
              "Gestufte Meldepflichten",
              "4h Erstmeldung (major incidents)",
              "Freiwillige Cyber-Threat-Meldungen",
            ]}
          />
          <PillarCard
            number="III"
            title="Resilience Testing"
            description="Regelmäßige Tests der digitalen operationellen Widerstandsfähigkeit."
            color="#0d9488"
            items={[
              "Jährliche Basis-Tests",
              "TLPT alle 3 Jahre (für Systemrelevante)",
              "Schwachstellenscans",
              "Szenariobasierte Tests",
            ]}
          />
          <PillarCard
            number="IV"
            title="Third-Party-Risiko"
            description="Management der Risiken aus IKT-Drittanbieterbeziehungen."
            color="#0891b2"
            items={[
              "Vertragliche Mindestanforderungen",
              "Drittanbieter-Register",
              "Exit-Strategien",
              "Konzentrationsrisiken bewerten",
            ]}
          />
          <PillarCard
            number="V"
            title="Informationsaustausch"
            description="Freiwilliger Austausch von Cyber-Bedrohungsinformationen."
            color="#0284c7"
            items={[
              "Threat Intelligence Sharing",
              "Vertrauensgemeinschaften",
              "Anonymisierte Vorfallsdaten",
              "Best-Practice-Austausch",
            ]}
          />
        </div>
      </Section>

      {/* ═══════════════════ 5. IKT-RISIKOMANAGEMENT ═══════════════════ */}
      <Section id="ikt-risiko" title="IKT-Risikomanagement (Säule I)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Das IKT-Risikomanagement-Framework ist das Herzstück von DORA. Es muss vom
          <strong> Leitungsorgan</strong> genehmigt und überwacht werden — ähnlich wie bei <LawRef law="NIS2">NIS2</LawRef>{" "}
          trägt das Management die persönliche Verantwortung.
        </p>

        <AccordionSection
          accent="#10b981"
          items={[
            {
              title: "Governance & Organisation",
              content: (
                <div>
                  <p className="mb-3">
                    Das Leitungsorgan trägt die Endverantwortung für das IKT-Risikomanagement.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>IKT-Risikomanagement-Framework definieren, genehmigen und überwachen</li>
                    <li>Ausreichendes Budget für IKT-Sicherheit bereitstellen</li>
                    <li>IKT-Risikomanagement-Funktion mit ausreichender Autorität etablieren</li>
                    <li>Regelmäßige Schulungen des Leitungsorgans zu IKT-Risiken</li>
                    <li>Mindestens jährliche Überprüfung der IKT-Risikostrategie</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Identifikation & Klassifikation",
              content: (
                <div>
                  <p className="mb-3">
                    Vollständige Identifikation und Klassifikation aller IKT-Assets und -Abhängigkeiten.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Inventar aller IKT-Assets, Systeme und Schnittstellen</li>
                    <li>Mapping der Abhängigkeiten zwischen Systemen und Geschäftsprozessen</li>
                    <li>Identifikation aller IKT-Drittanbieter und deren Kritikalität</li>
                    <li>Regelmäßige Aktualisierung (mindestens jährlich)</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Schutz & Prävention",
              content: (
                <div>
                  <p className="mb-3">
                    Technische und organisatorische Maßnahmen zur Risikominimierung.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Netzwerksicherheit, Zugangssteuerung, Verschlüsselung</li>
                    <li>Patch-Management und Schwachstellenmanagement</li>
                    <li>Identity & Access Management (IAM)</li>
                    <li>Physische Sicherheit der IKT-Infrastruktur</li>
                    <li>Security Awareness Training für alle Mitarbeiter</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Erkennung & Reaktion",
              content: (
                <div>
                  <p className="mb-3">
                    Fähigkeiten zur schnellen Erkennung und Reaktion auf Anomalien und Angriffe.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Kontinuierliches Monitoring aller kritischen Systeme</li>
                    <li>Anomalie-Erkennung und Threat Detection</li>
                    <li>Security Operations Center (SOC) oder vergleichbare Funktion</li>
                    <li>Definierte Incident-Response-Prozesse mit klaren Eskalationswegen</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Wiederherstellung & Lernprozess",
              content: (
                <div>
                  <p className="mb-3">
                    Fähigkeit zur schnellen Wiederherstellung und systematisches Lernen aus Vorfällen.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Business Continuity Plans für alle kritischen Funktionen</li>
                    <li>Disaster Recovery mit definierten RTO und RPO</li>
                    <li>Regelmäßige Tests der Backup- und Recovery-Prozesse</li>
                    <li>Post-Incident-Reviews mit dokumentierten Lessons Learned</li>
                    <li>Kommunikationspläne für interne und externe Stakeholder</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 6. INCIDENT REPORTING ═══════════════════ */}
      <Section id="incident" title="Incident Reporting (Säule II)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          DORA definiert ein strenges Meldesystem für <strong>schwerwiegende IKT-bezogene
          Vorfälle</strong>. Die Klassifizierung basiert auf Kriterien wie betroffene Kunden,
          Dauer, geografische Ausbreitung, Datenverlust und wirtschaftliche Auswirkungen.
        </p>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6 sm:p-8 space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 text-xl">🚨</div>
            <div className="pb-4 border-b border-[#e8ecf4]">
              <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-red-600 mb-1">Innerhalb von 4 Stunden</div>
              <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">Erstmeldung</div>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                Erste Benachrichtigung der zuständigen Behörde über den schwerwiegenden Vorfall.
                Muss erfolgen, sobald der Vorfall als &quot;major&quot; klassifiziert wird.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 text-xl">📝</div>
            <div className="pb-4 border-b border-[#e8ecf4]">
              <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-orange-600 mb-1">Innerhalb von 72 Stunden</div>
              <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">Zwischenbericht</div>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                Aktualisierung mit Informationen zur Schwere, Auswirkung, Grundursache
                (soweit bekannt) und ergriffenen Gegenmaßnahmen.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 text-xl">📋</div>
            <div>
              <div className="font-mono text-[11px] font-bold tracking-wider uppercase text-emerald-600 mb-1">Innerhalb von 1 Monat</div>
              <div className="font-[Syne] font-bold text-[15px] text-[#060c1a] mb-1">Abschlussbericht</div>
              <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
                Umfassender Abschlussbericht mit Root-Cause-Analyse, tatsächlichen
                Auswirkungen, ergriffenen Maßnahmen und Lessons Learned.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5 mt-6">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">DORA vs. NIS2 Meldepflichten:</strong> DORA
            verlangt die Erstmeldung innerhalb von <strong>4 Stunden</strong> (<LawRef law="NIS2">NIS2</LawRef>: 24 Stunden).
            Die Klassifizierungskriterien sind spezifischer auf den Finanzsektor zugeschnitten.
            Zudem sieht DORA die freiwillige Meldung von Cyber-Bedrohungen (nicht nur Vorfällen) vor.
          </p>
        </div>
      </Section>

      {/* ═══════════════════ 7. RESILIENCE TESTING ═══════════════════ */}
      <Section id="testing" title="Resilience Testing (Säule III)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          DORA verpflichtet Finanzunternehmen zu regelmäßigen Tests ihrer digitalen
          Widerstandsfähigkeit. Das Testing-Programm umfasst zwei Ebenen:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#10b981] mb-2">
              Basis-Tests (alle Unternehmen)
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Jährliche Pflicht
            </h3>
            <ul className="space-y-2">
              {[
                "Schwachstellenscans und -assessments",
                "Open-Source-Analysen",
                "Netzwerksicherheitsüberprüfungen",
                "Gap-Analysen",
                "Überprüfung der physischen Sicherheit",
                "Szenariobasierte Tests",
                "Kompatibilitätstests",
                "Performancetests",
                "End-to-End-Tests",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-2" />
                  <span className="text-[14px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/30 p-6">
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-emerald-700 mb-2">
              TLPT — Threat-Led Penetration Testing
            </div>
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Alle 3 Jahre (systemrelevante Unternehmen)
            </h3>
            <ul className="space-y-2">
              {[
                "Bedrohungsgeleitete Penetrationstests",
                "Basiert auf TIBER-EU-Framework",
                "Umfasst kritische Live-Produktionssysteme",
                "Durchführung durch externe Red Teams",
                "Einbeziehung kritischer IKT-Drittanbieter",
                "Ergebnisse an Aufsichtsbehörde melden",
                "Gemeinsames TLPT mit Drittanbietern möglich",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-700 flex-shrink-0 mt-2" />
                  <span className="text-[14px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 8. THIRD-PARTY ═══════════════════ */}
      <Section id="third-party" title="Third-Party-Risk-Management (Säule IV)">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          DORA setzt erstmals umfassende Anforderungen an das Management von IKT-Drittanbieterrisiken.
          Finanzunternehmen müssen ihre Abhängigkeiten von externen IKT-Dienstleistern
          systematisch identifizieren, bewerten und steuern.
        </p>

        <AccordionSection
          accent="#10b981"
          items={[
            {
              title: "Register aller IKT-Drittanbieter",
              content: (
                <div>
                  <p className="mb-3">
                    Finanzunternehmen müssen ein vollständiges Register aller vertraglichen
                    Vereinbarungen mit IKT-Drittanbietern führen und der Aufsicht auf Verlangen vorlegen.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Alle IKT-Dienstleistungsverträge erfassen</li>
                    <li>Kritikalität jeder Dienstleistung bewerten</li>
                    <li>Sub-Outsourcing dokumentieren</li>
                    <li>Regelmäßige Aktualisierung des Registers</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Vertragliche Mindestanforderungen",
              content: (
                <div>
                  <p className="mb-3">
                    DORA definiert verbindliche Mindestklauseln, die in allen IKT-Dienstleistungsverträgen enthalten sein müssen.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Service Level Agreements (SLAs) mit quantitativen Zielen</li>
                    <li>Audit- und Zugangsrechte für das Finanzunternehmen und die Aufsicht</li>
                    <li>Vorfallmeldepflichten des Drittanbieters</li>
                    <li>Datenlokalisierung und -verarbeitung</li>
                    <li>Exit-Klauseln und Übergangszeiträume</li>
                    <li>Business-Continuity-Anforderungen</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Exit-Strategien",
              content: (
                <p>
                  Für alle kritischen IKT-Drittanbieter müssen umsetzbare Exit-Strategien
                  existieren. Diese müssen eine geordnete Beendigung der Geschäftsbeziehung
                  ermöglichen, ohne die Geschäftskontinuität zu gefährden, die Einhaltung
                  regulatorischer Anforderungen zu beeinträchtigen oder die Qualität der
                  Dienstleistungen an Kunden zu mindern.
                </p>
              ),
            },
            {
              title: "Aufsicht über kritische IKT-Drittanbieter",
              content: (
                <div>
                  <p className="mb-3">
                    Ein absolutes Novum: Die europäischen Aufsichtsbehörden (ESAs) können IKT-Drittanbieter
                    als &quot;kritisch&quot; einstufen und direkt beaufsichtigen.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Direkte Aufsicht durch einen &quot;Lead Overseer&quot; (ESA)</li>
                    <li>Vor-Ort-Inspektionen beim IKT-Anbieter</li>
                    <li>Empfehlungen und Maßnahmen bei Mängeln</li>
                    <li>Kritierienkatalog: Systemrelevanz, Konzentrationsrisiko, Substituierbarkeit</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ 9. STRAFEN ═══════════════════ */}
      <Section id="strafen" title="Strafen & Aufsicht">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          DORA selbst definiert keine festen Bußgeldobergrenzen — dies liegt in der
          Zuständigkeit der nationalen Aufsichtsbehörden. Die Sanktionsregime sind
          allerdings empfindlich und umfassen verschiedene Maßnahmen.
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-3">
              Aufsichtsbefugnisse der zuständigen Behörden
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Anordnung der Mängelbehebung",
                "Verhängung von Geldstrafen",
                "Öffentliche Bekanntmachung von Verstößen",
                "Einstweilige Anordnungen",
                "Vor-Ort-Prüfungen und Inspektionen",
                "Anforderung von Berichten und Dokumenten",
                "Vorübergehende Suspendierung von Funktionen",
                "Strafzuschläge bei Dauerverstößen",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[13px] text-[#5a6a8a] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border-2 border-red-200 bg-red-50/30 p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              Für kritische IKT-Drittanbieter
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
              Der Lead Overseer kann bei Nicht-Einhaltung tägliche Strafzahlungen von
              bis zu <strong>1% des durchschnittlichen weltweiten Tagesumsatzes</strong>{" "}
              des IKT-Drittanbieters verhängen — und das für maximal 6 Monate.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 10. ÖSTERREICH ═══════════════════ */}
      <Section id="oesterreich" title="Umsetzung in Österreich">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Als EU-Verordnung gilt DORA direkt in Österreich — ohne nationales Umsetzungsgesetz.
          Die <strong>Finanzmarktaufsicht (FMA)</strong><SourceRef id={3} sources={sources} accent="#10b981" /> ist die zuständige Aufsichtsbehörde.
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                <span className="text-xl">🇦🇹</span>
              </div>
              <div>
                <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
                  Finanzmarktaufsicht (FMA)
                </h3>
                <p className="text-[14px] text-[#5a6a8a] leading-relaxed mb-3">
                  Die FMA ist für die Aufsicht über alle österreichischen Finanzunternehmen
                  im Rahmen von DORA zuständig. Sie hat bereits umfangreiche Leitfäden und
                  Rundschreiben zu den DORA-Anforderungen veröffentlicht und führt laufend
                  Prüfungen durch.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">Aufsicht & Prüfung</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">Vorfallmeldungen</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">TLPT-Koordination</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-base text-[#060c1a] mb-2">
              OeNB (Oesterreichische Nationalbank)
            </h3>
            <p className="text-[14px] text-[#5a6a8a] leading-relaxed">
              Die OeNB unterstützt die FMA bei der Aufsicht über den Bankensektor und spielt
              eine wichtige Rolle bei der Umsetzung des TIBER-AT-Frameworks (österreichische
              Adaption von TIBER-EU) für bedrohungsgeleitete Penetrationstests.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════════ 11. COMPLIANCE-FAHRPLAN ═══════════════════ */}
      <Section id="fahrplan" title="Ihr Compliance-Fahrplan">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8">
          DORA gilt seit 17. Januar 2025 vollständig. Falls Ihr Unternehmen noch Lücken hat,
          sollten Sie diese priorisiert schließen.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RoadmapStep
            phase="Phase 1 — Sofort"
            title="Gap-Analyse & Priorisierung"
            accent="#10b981"
            items={[
              "DORA-Betroffenheit bestätigen",
              "Gap-Analyse gegen alle 5 DORA-Säulen",
              "Kritische IKT-Drittanbieter identifizieren",
              "Leitungsorgan einbinden und informieren",
            ]}
          />
          <RoadmapStep
            phase="Phase 2 — Monat 1–3"
            title="Framework & Governance"
            accent="#059669"
            items={[
              "IKT-Risikomanagement-Framework etablieren",
              "Incident-Response-Prozess aufbauen (4h-fähig)",
              "IKT-Drittanbieter-Register erstellen",
              "Testing-Programm planen",
            ]}
          />
          <RoadmapStep
            phase="Phase 3 — Monat 3–6"
            title="Umsetzung & Verträge"
            accent="#0d9488"
            items={[
              "Vertragliche Anpassungen mit IKT-Drittanbietern",
              "Exit-Strategien für kritische Anbieter",
              "Erste Schwachstellenscans und Tests",
              "Schulungsprogramm für Leitungsorgan",
            ]}
          />
          <RoadmapStep
            phase="Phase 4 — Laufend"
            title="Betrieb & Optimierung"
            accent="#0891b2"
            items={[
              "Jährliche Basis-Tests durchführen",
              "TLPT-Planung (falls systemrelevant)",
              "Drittanbieter-Register aktuell halten",
              "Regelmäßige Management-Reviews",
            ]}
          />
        </div>
      </Section>

      {/* ═══════════════════ 12. FAQ ═══════════════════ */}
      <Section id="faq" title="Häufige Fragen (FAQ)">
        <AccordionSection
          accent="#10b981"
          allowMultiple
          items={[
            {
              title: "Muss unser Unternehmen DORA oder NIS2 einhalten?",
              content: (
                <p>
                  Wenn Ihr Unternehmen ein reguliertes Finanzunternehmen ist (Bank, Versicherung,
                  Wertpapierfirma etc.), gilt DORA als Spezialgesetz (lex specialis). Sie müssen
                  die DORA-Anforderungen erfüllen, nicht <LawRef law="NIS2">NIS2</LawRef>. Für Finanzunternehmen, die auch
                  unter NIS2 fallen würden, ersetzt DORA die NIS2-Pflichten im IKT-Bereich.
                </p>
              ),
            },
            {
              title: "Sind auch kleine Finanzunternehmen betroffen?",
              content: (
                <p>
                  Grundsätzlich ja — DORA gilt für alle 21 Kategorien von Finanzunternehmen
                  unabhängig von der Größe. Allerdings gilt der Proportionalitätsgrundsatz:
                  Kleinere Unternehmen können vereinfachte Frameworks umsetzen. Mikro-Unternehmen
                  (unter 10 Mitarbeiter und 2 Mio. € Umsatz) unterliegen einem vereinfachten
                  IKT-Risikomanagement-Framework nach <LawRef law="DORA" article="16">Art. 16</LawRef>.
                </p>
              ),
            },
            {
              title: "Was bedeutet DORA für unsere Cloud-Nutzung?",
              content: (
                <div>
                  <p className="mb-3">Cloud-Nutzung ist unter DORA weiterhin möglich, aber streng reguliert:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li>Der Cloud-Provider muss ins IKT-Drittanbieter-Register aufgenommen werden</li>
                    <li>Der Vertrag muss alle DORA-Mindestklauseln enthalten (Audit-Rechte, SLAs, Exit-Klausel)</li>
                    <li>Konzentrationsrisiken müssen bewertet werden (zu viel bei einem Anbieter)</li>
                    <li>Wenn der Provider als &quot;kritisch&quot; eingestuft wird, unterliegt er direkter EU-Aufsicht</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Müssen wir TLPT durchführen?",
              content: (
                <p>
                  TLPT (Threat-Led Penetration Testing) ist nicht für alle Finanzunternehmen
                  Pflicht. Die zuständigen Behörden identifizieren diejenigen Unternehmen, die
                  aufgrund ihrer Systemrelevanz TLPT durchführen müssen. Typischerweise betrifft
                  dies große Banken, zentrale Marktinfrastrukturen und systemrelevante
                  Versicherungsunternehmen. Alle anderen müssen die jährlichen Basis-Tests durchführen.
                </p>
              ),
            },
            {
              title: "Wie unterscheidet sich die DORA-Meldepflicht von NIS2?",
              content: (
                <div>
                  <p className="mb-3">Die wesentlichen Unterschiede:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
                    <li><strong>Erstmeldung:</strong> DORA verlangt 4 Stunden (<LawRef law="NIS2">NIS2</LawRef>: 24 Stunden)</li>
                    <li><strong>Klassifizierung:</strong> DORA nutzt finanzspezifische Kriterien (betroffene Kunden, Transaktionsvolumen)</li>
                    <li><strong>Freiwillige Meldungen:</strong> DORA sieht auch die Meldung von Cyber-Bedrohungen vor (nicht nur Vorfällen)</li>
                    <li><strong>Behörde:</strong> Meldung an die Finanzaufsicht (FMA), nicht ans CSIRT</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Ist der Vorstand persönlich haftbar?",
              content: (
                <p>
                  Ja. DORA verpflichtet das Leitungsorgan, das IKT-Risikomanagement-Framework
                  zu genehmigen und dessen Umsetzung zu überwachen. Bei Versäumnissen können
                  individuelle Sanktionen greifen, einschließlich der vorübergehenden Suspendierung
                  von Leitungsfunktionen. Die Haftung ähnelt der <LawRef law="NIS2">NIS2</LawRef>-Geschäftsführerhaftung,
                  ist aber auf den Finanzsektor zugeschnitten.
                </p>
              ),
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ VERWANDTE REGULIERUNGEN ═══════════════════ */}
      <RelatedGuides currentGuide="dora" accent="#0369a1" />

      {/* ═══════════════════ SOFTWARE-EMPFEHLUNGEN ═══════════════════ */}
      <ToolRecommendation regulationKey="dora" accent="#10b981" />

      {/* ═══════════════════ QUELLEN ═══════════════════ */}
      <Section id="quellen" title="Quellen & Offizielle Dokumente">
        <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-6">
          Alle Informationen in diesem Guide basieren auf den offiziellen EU-Dokumenten.
          Hier finden Sie die Primärquellen:
        </p>

        <SourceList sources={sources} accent="#10b981" />

        <div className="mt-6 rounded-2xl bg-[#f8f9fd] border border-[#e8ecf4] p-5">
          <p className="text-[13px] text-[#5a6a8a] leading-relaxed">
            <strong className="text-[#060c1a]">Hinweis:</strong> Dieser Guide dient der Information
            und ersetzt keine Rechtsberatung. Die verlinkten Dokumente sind die offiziellen
            Rechtstexte. Bei Fragen zur konkreten Anwendung auf Ihr Unternehmen empfehlen wir
            die Beratung durch spezialisierte Rechtsanwälte oder Compliance-Berater.
          </p>
        </div>
      </Section>
    </GuidePageLayout>
  );
}
