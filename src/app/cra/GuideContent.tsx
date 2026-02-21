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
    title: "Verordnung (EU) 2024/2847 — Cyber Resilience Act (Volltext)",
    url: "https://eur-lex.europa.eu/eli/reg/2024/2847/oj/deu",
    desc: "Offizielle deutsche Fassung im EUR-Lex Portal",
    type: "Verordnung",
  },
  {
    id: 2,
    title: "CRA — englische Fassung",
    url: "https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng",
    desc: "Offizielle englische Fassung im EUR-Lex Portal",
    type: "Verordnung",
  },
  {
    id: 3,
    title: "EU-Kommission — Cyber Resilience Act",
    url: "https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act",
    desc: "Hintergrundinformationen, FAQ und Factsheets der EU-Kommission",
    type: "Behörde",
  },
  {
    id: 4,
    title: "ENISA — Schwachstellenmeldeplattform",
    url: "https://www.enisa.europa.eu",
    desc: "Europäische Agentur für Cybersicherheit — zentrale Meldeplattform",
    type: "EU-Behörde",
  },
  {
    id: 5,
    title: "Richtlinie (EU) 2024/2853 — Produkthaftung",
    url: "https://eur-lex.europa.eu/eli/dir/2024/2853/oj/deu",
    desc: "Neue EU-Produkthaftungsrichtlinie — erstreckt sich auf Software",
    type: "Richtlinie",
  },
];

/* ─────────────────── TOC Items ─────────────────── */
const tocItems: TocItem[] = [
  { id: "ueberblick", label: "Überblick" },
  { id: "timeline", label: "Timeline & Fristen" },
  { id: "betroffene", label: "Wer ist betroffen?" },
  { id: "kategorien", label: "Produktkategorien" },
  { id: "hersteller", label: "Pflichten Hersteller" },
  { id: "importeure", label: "Importeure & Händler" },
  { id: "sbom", label: "SBOM & Updates" },
  { id: "schwachstellen", label: "Schwachstellenmeldung" },
  { id: "konformitaet", label: "CE & Konformität" },
  { id: "opensource", label: "Open Source" },
  { id: "strafen", label: "Strafen" },
  { id: "zusammenspiel", label: "Zusammenspiel mit NIS2 & Co." },
  { id: "fahrplan", label: "Compliance-Fahrplan" },
  { id: "faq", label: "FAQ" },
  { id: "quellen", label: "Quellen" },
];

/* ─────────────────── Quick Facts ─────────────────── */
const quickFacts: QuickFact[] = [
  { label: "Max. Strafe", value: "15 Mio. € oder 2,5%" },
  { label: "Hauptdeadline", value: "11. Dezember 2027" },
  { label: "Meldepflicht ab", value: "11. September 2026" },
  { label: "Verordnungstyp", value: "EU-Verordnung (direkt)" },
  { label: "SBOM-Pflicht", value: "Ja (maschinenlesbar)" },
  { label: "Update-Pflicht", value: "Min. 5 Jahre" },
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
  accent = "#8b5cf6",
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
        <div className={`w-4 h-4 rounded-full border-2 mt-1 ${done ? "bg-[#8b5cf6] border-[#8b5cf6]" : active ? "bg-white border-[#8b5cf6] ring-4 ring-violet-100" : "bg-white border-[#d8dff0]"}`} />
        <div className="w-0.5 h-full bg-[#d8dff0] min-h-[40px]" />
      </div>
      <div className="pb-8">
        <span className={`font-mono text-xs font-medium ${done ? "text-[#8b5cf6]" : active ? "text-[#8b5cf6]" : "text-[#7a8db0]"}`}>
          {date} {done && "✓"}
        </span>
        <h3 className="font-[Syne] font-bold text-[#060c1a] mt-0.5">{title}</h3>
        <p className="text-[#3a4a6b] text-sm mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ─────────────────── Product Category Card ─────────────────── */
function CategoryCard({
  level,
  color,
  title,
  description,
  examples,
  assessment,
}: {
  level: string;
  color: string;
  title: string;
  description: string;
  examples: string[];
  assessment: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-[#d8dff0] bg-white overflow-hidden"
    >
      <div className="h-1.5" style={{ background: color }} />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: color }}>
            {level}
          </span>
          <h3 className="font-[Syne] font-bold text-[#060c1a]">{title}</h3>
        </div>
        <p className="text-[#3a4a6b] text-sm leading-relaxed mb-4">{description}</p>
        <div className="mb-4">
          <h4 className="text-xs font-bold text-[#7a8db0] uppercase tracking-wider mb-2">Beispiele</h4>
          <div className="flex flex-wrap gap-1.5">
            {examples.map((ex) => (
              <span key={ex} className="px-2.5 py-1 bg-[#f4f6fc] text-[#3a4a6b] text-xs rounded-lg">{ex}</span>
            ))}
          </div>
        </div>
        <div className="pt-3 border-t border-[#d8dff0]">
          <span className="text-xs font-medium text-[#7a8db0]">Konformitätsbewertung: </span>
          <span className="text-xs font-bold" style={{ color }}>{assessment}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────── Obligation Card ─────────────────── */
function ObligationCard({
  icon,
  title,
  items,
}: {
  icon: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-[Syne] font-bold text-[#060c1a]">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
            <span className="text-[#8b5cf6] mt-0.5 shrink-0">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────── Reporting Step ─────────────────── */
function ReportingStep({
  icon,
  time,
  title,
  description,
}: {
  icon: string;
  time: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#d8dff0]">
      <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-2xl shrink-0">
        {icon}
      </div>
      <div>
        <div className="font-mono text-xs font-bold text-[#8b5cf6] mb-1">{time}</div>
        <h3 className="font-[Syne] font-bold text-[#060c1a] text-sm">{title}</h3>
        <p className="text-[#3a4a6b] text-sm mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════
   GUIDE CONTENT
   ══════════════════════════════════════════════════════ */

export default function GuideContent() {
  return (
    <GuidePageLayout
      title="Cyber Resilience Act"
      subtitle="Security by Design für alle Produkte mit digitalen Elementen — von IoT-Geräten bis Enterprise-Software"
      regulationKey="Verordnung (EU) 2024/2847"
      accent="#8b5cf6"
      tocItems={tocItems}
      quickFacts={quickFacts}
      trustBadge={{ lastReview: "18.02.2026", sourceCount: 5 }}
      href="/cra"
    >
      {/* ═══════════════ 1. ÜBERBLICK ═══════════════ */}
      <Section id="ueberblick" title="Was ist der Cyber Resilience Act?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Der <strong>Cyber Resilience Act (CRA)</strong><SourceRef id={1} sources={sources} accent="#8b5cf6" /> ist die erste EU-weite horizontale Verordnung,
          die verbindliche Cybersecurity-Anforderungen für <strong>alle Produkte mit digitalen Elementen</strong> einführt.
          Ob Smart-Home-Gerät, Betriebssystem, Firewall oder industrielle Steuerung — wer ein solches Produkt
          auf den EU-Binnenmarkt bringt, muss künftig nachweisen, dass es <em>von Anfang an sicher</em> konzipiert wurde.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard value="15 Mio. €" label="oder 2,5 % — max. Strafe" />
          <StatCard value="Dez 2027" label="Hauptdeadline" />
          <StatCard value="4" label="Produktkategorien" />
          <StatCard value="5 Jahre" label="min. Update-Pflicht" />
        </div>

        <div className="rounded-2xl border border-violet-200 bg-violet-50/40 p-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 flex items-center gap-2">
            <span className="text-lg">🔑</span> Das Wichtigste in Kürze
          </h3>
          <ul className="space-y-2 text-sm text-[#3a4a6b]">
            <li className="flex items-start gap-2">
              <span className="text-[#8b5cf6] mt-0.5">▸</span>
              <span><strong>Horizontale Verordnung</strong> — gilt EU-weit direkt, keine nationale Umsetzung nötig</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8b5cf6] mt-0.5">▸</span>
              <span><strong>Betrifft Hardware und Software</strong> — jedes Produkt mit digitaler Komponente, das eine Datenverbindung hat</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8b5cf6] mt-0.5">▸</span>
              <span><strong>Lebenszyklusansatz</strong> — Pflichten von der Entwicklung über den Vertrieb bis zum End-of-Life</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8b5cf6] mt-0.5">▸</span>
              <span><strong>CE-Kennzeichnung</strong> — ohne Konformitätsnachweis darf kein Produkt mehr verkauft werden</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8b5cf6] mt-0.5">▸</span>
              <span><strong>Ergänzt NIS2</strong> — <LawRef law="NIS2">NIS2</LawRef> sichert Unternehmen ab, CRA sichert deren Produkte ab</span>
            </li>
          </ul>
        </div>
      </Section>

      {/* ═══════════════ 2. TIMELINE ═══════════════ */}
      <Section id="timeline" title="Timeline & Fristen">
        <p className="text-[#3a4a6b] text-sm leading-relaxed mb-8">
          Der CRA wurde am 20. November 2024 im Amtsblatt der EU veröffentlicht und trat am
          10. Dezember 2024 in Kraft. Die Pflichten greifen gestaffelt:
        </p>

        <div className="space-y-0">
          <TimelineItem
            date="10. Dezember 2024"
            title="Inkrafttreten"
            description="Veröffentlichung im Amtsblatt. 36-monatige Übergangsfrist beginnt."
            done
          />
          <TimelineItem
            date="11. Juni 2026"
            title="Konformitätsbewertungsstellen"
            description="Notifizierte Stellen für Drittanbieter-Bewertungen müssen operativ sein. EU-Kommission kann harmonisierte Standards annehmen."
            active
          />
          <TimelineItem
            date="11. September 2026"
            title="Meldepflichten aktiv"
            description="Hersteller müssen aktiv ausgenutzte Schwachstellen und schwerwiegende Sicherheitsvorfälle innerhalb von 24h an ENISA/CSIRTs melden."
          />
          <TimelineItem
            date="11. Dezember 2027"
            title="Vollständige Anwendung"
            description="Alle Pflichten greifen: Security by Design, SBOM, Update-Pflicht, CE-Kennzeichnung. Produkte ohne Konformität dürfen nicht mehr in Verkehr gebracht werden."
          />
          <TimelineItem
            date="Laufend"
            title="Harmonisierte Standards"
            description={<>CEN/CENELEC arbeiten an harmonisierten Normen (EN-Standards). Bis diese vorliegen, gelten die Anforderungen aus <LawRef law="CRA" annex="I">Anhang I</LawRef> direkt.</>}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
          <p className="text-sm text-amber-900 flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">⚠️</span>
            <span>
              <strong>Wichtig:</strong> Bereits vor dem 11.12.2027 auf den Markt gebrachte Produkte
              müssen den CRA nicht rückwirkend erfüllen — außer es wird eine wesentliche Änderung
              am Produkt vorgenommen. Neue Produktversionen oder Major Updates lösen CRA-Pflichten aus.
            </span>
          </p>
        </div>
      </Section>

      {/* ═══════════════ 3. WER IST BETROFFEN ═══════════════ */}
      <Section id="betroffene" title="Wer ist betroffen?">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Der CRA definiert <strong>vier Wirtschaftsakteure</strong> mit je eigenen Pflichten. Entscheidend ist,
          in welcher Rolle Sie ein Produkt mit digitalen Elementen auf den EU-Markt bringen:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <ObligationCard
            icon="🏭"
            title="Hersteller"
            items={[
              "Trägt die Hauptverantwortung für CRA-Konformität",
              "Muss Security by Design umsetzen (Anhang I)",
              "Erstellt technische Dokumentation + SBOM",
              "Führt Konformitätsbewertung durch",
              "Stellt Sicherheitsupdates für min. 5 Jahre bereit",
              "Meldet aktiv ausgenutzte Schwachstellen an ENISA",
            ]}
          />
          <ObligationCard
            icon="📦"
            title="Importeur"
            items={[
              "Prüft, ob Hersteller Konformitätsbewertung durchgeführt hat",
              "Stellt sicher, dass CE-Kennzeichnung vorhanden ist",
              "Prüft Verfügbarkeit der technischen Dokumentation",
              "Vergewissert sich, dass Kontaktdaten am Produkt sind",
              "Informiert Hersteller bei Verdacht auf Nicht-Konformität",
            ]}
          />
          <ObligationCard
            icon="🏪"
            title="Händler"
            items={[
              "Prüft CE-Kennzeichnung und EU-Konformitätserklärung",
              "Vergewissert sich, dass Hersteller/Importeur identifizierbar sind",
              "Informiert Marktaufsicht bei Sicherheitsrisiken",
              "Gewährleistet korrekte Lager- und Transportbedingungen",
            ]}
          />
          <ObligationCard
            icon="⚙️"
            title="Open-Source-Verwalter"
            items={[
              "Neue Rolle: Open-Source Software Steward",
              "Gilt für juristische Personen, die OS-Entwicklung systematisch unterstützen",
              "Muss Cybersecurity-Policy dokumentieren",
              "Kooperiert bei Schwachstellenbehandlung",
              "Leichtere Pflichten als Hersteller (kein CE-Marking)",
            ]}
          />
        </div>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 text-sm">Was ist ein {"\u201EProdukt mit digitalen Elementen\u201D"}?</h3>
          <p className="text-sm text-[#3a4a6b] leading-relaxed mb-4">
            Jedes Hardware- oder Softwareprodukt, das direkt oder indirekt mit einem Gerät oder Netzwerk
            verbunden ist oder verbunden werden kann. Dazu gehören auch <strong>Remote-Datenverarbeitungslösungen</strong>,
            wenn sie für die Kernfunktion des Produkts notwendig sind (<LawRef law="CRA" article="3">Art. 3 Nr. 1 CRA</LawRef>).
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "📱", label: "Smart Devices" },
              { icon: "💻", label: "Software & Apps" },
              { icon: "🔐", label: "Firewalls & VPN" },
              { icon: "🏠", label: "Smart Home" },
              { icon: "🤖", label: "Industrielle IoT" },
              { icon: "🎮", label: "Spielekonsolen" },
              { icon: "⌚", label: "Wearables" },
              { icon: "🗄️", label: "Betriebssysteme" },
            ].map((item) => (
              <div key={item.label} className="text-center p-3 rounded-xl bg-[#f4f6fc]">
                <span className="text-xl">{item.icon}</span>
                <div className="text-xs text-[#3a4a6b] mt-1 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════ 4. PRODUKTKATEGORIEN ═══════════════ */}
      <Section id="kategorien" title="Produktkategorien & Risikoklassen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Der CRA teilt Produkte in <strong>vier Kategorien</strong> ein. Je höher die Kategorie,
          desto strenger die Konformitätsbewertung. Die Mehrheit aller Produkte (~90 %) fällt unter
          die Standardkategorie mit Selbstbewertung.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <CategoryCard
            level="Standard"
            color="#22c55e"
            title="Standardprodukte"
            description="Die große Mehrheit aller Produkte. Hersteller kann Konformität selbst bewerten (Modul A — interne Fertigungskontrolle)."
            examples={["Smart-TVs", "Spielzeug mit WLAN", "Lautsprecher", "Foto-Apps", "Textverarbeitungssoftware"]}
            assessment="Selbstbewertung (Modul A)"
          />
          <CategoryCard
            level="Wichtig Kl. I"
            color="#f59e0b"
            title="Wichtige Produkte — Klasse I"
            description="Produkte mit erhöhtem Risiko. Selbstbewertung möglich, wenn harmonisierte Normen eingehalten werden — sonst Drittanbieter-Bewertung."
            examples={["Browser", "Passwort-Manager", "VPN-Software", "Netzwerk-Management", "SIEM-Systeme", "Boot-Manager"]}
            assessment="Selbst (mit hEN) oder Drittanbieter"
          />
          <CategoryCard
            level="Wichtig Kl. II"
            color="#f97316"
            title="Wichtige Produkte — Klasse II"
            description="Produkte mit hohem Risiko für die Cybersicherheit. Drittanbieter-Konformitätsbewertung ist zwingend erforderlich."
            examples={["Firewalls", "IDS/IPS-Systeme", "Hypervisoren", "Container-Runtime", "Mikroprozessoren", "Industrielle Firewalls"]}
            assessment="Drittanbieter-Bewertung Pflicht"
          />
          <CategoryCard
            level="Kritisch"
            color="#ef4444"
            title="Kritische Produkte"
            description="Höchste Risikoklasse. Produkte, die für wesentliche Dienste und kritische Infrastruktur zentral sind. EU-Zertifizierung (EUCC) erforderlich."
            examples={["Smart Meter Gateways", "Smartcards", "Hardware-Sicherheitsmodule (HSM)", "Sichere Kryptogeräte"]}
            assessment="EU-Cybersecurity-Zertifizierung"
          />
        </div>

        <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50/40 p-5">
          <p className="text-sm text-[#3a4a6b] flex items-start gap-2">
            <span className="text-[#8b5cf6] mt-0.5">💡</span>
            <span>
              <strong>Nicht vom CRA erfasst</strong> sind unter anderem: Medizinprodukte (MDR/IVDR),
              Kraftfahrzeuge (UNECE R155/R156), Luftfahrt (EASA-Vorschriften), militärische Produkte
              und SaaS-Lösungen <em>ohne</em> On-Premise-Komponente. Auch rein nicht-kommerzielle
              Open-Source-Software ist ausgenommen.
            </span>
          </p>
        </div>
      </Section>

      {/* ═══════════════ 5. PFLICHTEN HERSTELLER ═══════════════ */}
      <Section id="hersteller" title="Pflichten für Hersteller (Anhang I)">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          <LawRef law="CRA" annex="I">Anhang I</LawRef> des CRA definiert die <strong>wesentlichen Cybersecurity-Anforderungen</strong>.
          Hersteller müssen diese über den gesamten Produktlebenszyklus erfüllen — von der Konzeption
          bis zum End-of-Life.
        </p>

        <AccordionSection
          items={[
            {
              title: "1. Security by Design & Default",
              content:
                "Produkte müssen mit einem angemessenen Cybersicherheitsniveau konzipiert, entwickelt und hergestellt werden. Die Standardkonfiguration muss die sicherste sein (Secure by Default). Keine bekannten ausnutzbaren Schwachstellen bei Inverkehrbringen. Zugangskontrolle, Verschlüsselung und minimale Angriffsfläche sind Pflicht.",
            },
            {
              title: <span>2. Risikobewertung (<LawRef law="CRA" article="13" />)</span>,
              content:
                "Vor dem Inverkehrbringen muss eine Cybersicherheits-Risikobewertung durchgeführt und dokumentiert werden. Diese muss bei wesentlichen Änderungen am Produkt aktualisiert werden. Die Risikobewertung fließt in Planung, Entwicklung, Produktion und Schwachstellenbehandlung ein.",
            },
            {
              title: <span>3. Technische Dokumentation (<LawRef law="CRA" article="31" />)</span>,
              content:
                "Umfassende technische Dokumentation muss vor Inverkehrbringen erstellt werden. Enthält: Produktbeschreibung, Cybersecurity-Risikobewertung, Beschreibung der angewandten Normen und Lösungen, SBOM, Konformitätsbewertungsbericht. Muss 10 Jahre aufbewahrt werden.",
            },
            {
              title: "4. Schutz der Vertraulichkeit (Daten)",
              content:
                "Schutz der Vertraulichkeit gespeicherter, übermittelter und verarbeiteter Daten (verschlüsselt oder anderweitig). Schutz der Integrität aller Daten, Befehle und Konfigurationen. Minimierung der Datenverarbeitung (Datensparsamkeit).",
            },
            {
              title: "5. Verfügbarkeit & Resilienz",
              content:
                "Produkte müssen auch unter widrigen Bedingungen (z. B. DoS-Angriffe) so weit wie möglich funktionsfähig bleiben. Wesentliche Funktionen dürfen nicht ohne Grund eingeschränkt werden. Nach einem Vorfall muss die Wiederherstellung erleichtert werden.",
            },
            {
              title: "6. Minimierung der Angriffsfläche",
              content:
                "Externe Schnittstellen auf das Notwendige beschränken. Nicht benötigte Ports und Protokolle standardmäßig deaktivieren. Hardware-Angriffsflächen minimieren. Komponentenisolierung und Zugangskontrolle implementieren.",
            },
            {
              title: "7. Secure Update-Mechanismus",
              content:
                "Automatischer und sicherer Update-Mechanismus ist Pflicht. Updates müssen für mindestens 5 Jahre (oder die erwartete Produktlebensdauer, wenn länger) bereitgestellt werden. Sicherheitsupdates müssen kostenfrei sein und getrennt von Funktionsupdates ausgeliefert werden können.",
            },
            {
              title: <span>8. Schwachstellenbehandlung (<LawRef law="CRA" annex="I">Anhang I</LawRef> Teil II)</span>,
              content:
                "Hersteller müssen einen dokumentierten Prozess zur Identifikation, Dokumentation und Behebung von Schwachstellen etablieren. Dazu gehören: regelmäßige Tests (Penetrationstests, Reviews), koordinierte Offenlegung (Coordinated Vulnerability Disclosure), Kontaktmöglichkeit für Schwachstellenmeldungen und zeitnahe kostenfreie Patches.",
            },
          ]}
        />
      </Section>

      {/* ═══════════════ 6. IMPORTEURE & HÄNDLER ═══════════════ */}
      <Section id="importeure" title="Pflichten für Importeure & Händler">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Auch wer Produkte nicht selbst herstellt, sondern nur auf den EU-Markt bringt oder vertreibt,
          hat <strong>eigene Sorgfaltspflichten</strong>:
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-4 flex items-center gap-2">
              <span className="text-lg">📦</span> Importeure (<LawRef law="CRA" article="19" />)
            </h3>
            <ul className="space-y-3 text-sm text-[#3a4a6b]">
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">01</span>
                Nur konforme Produkte auf den Markt bringen (Konformitätsbewertung durch Hersteller prüfen)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">02</span>
                CE-Kennzeichnung und EU-Konformitätserklärung verifizieren
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">03</span>
                Eigenen Namen und Kontaktadresse am Produkt oder der Verpackung anbringen
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">04</span>
                Marktaufsichtsbehörde informieren, wenn ein Produkt ein Cybersicherheitsrisiko darstellt
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">05</span>
                Technische Dokumentation 10 Jahre aufbewahren und bei Anfrage bereitstellen
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-4 flex items-center gap-2">
              <span className="text-lg">🏪</span> Händler (<LawRef law="CRA" article="20" />)
            </h3>
            <ul className="space-y-3 text-sm text-[#3a4a6b]">
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">01</span>
                Vor Bereitstellung auf dem Markt: CE-Kennzeichnung und Sicherheitsinformationen prüfen
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">02</span>
                Prüfen, ob Hersteller und Importeur identifizierbar und kontaktierbar sind
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">03</span>
                Bei Kenntnis von Nicht-Konformität: Produkt nicht bereitstellen oder korrigierende Maßnahmen ergreifen
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8b5cf6] font-bold shrink-0">04</span>
                Marktaufsichtsbehörde über Risiken informieren
              </li>
            </ul>

            <div className="mt-5 p-4 rounded-xl bg-violet-50/60 border border-violet-100">
              <p className="text-xs text-[#3a4a6b]">
                <strong>Achtung:</strong> Importeure und Händler, die ein Produkt unter eigenem Namen
                oder einer eigenen Marke auf den Markt bringen oder wesentliche Änderungen vornehmen,
                gelten als <strong>Hersteller</strong> und müssen alle Herstellerpflichten erfüllen (<LawRef law="CRA" article="21">Art. 21 CRA</LawRef>).
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 7. SBOM & UPDATES ═══════════════ */}
      <Section id="sbom" title="SBOM-Pflicht & Update-Anforderungen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Zwei der einflussreichsten Neuerungen des CRA: die Pflicht zur Erstellung
          einer <strong>Software Bill of Materials</strong> und die gesetzlich verankerte <strong>Update-Pflicht</strong>.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 flex items-center gap-2">
              <span className="text-lg">📋</span> Software Bill of Materials (SBOM)
            </h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed mb-4">
              Hersteller müssen eine maschinenlesbare SBOM erstellen und pflegen, die alle Top-Level-Abhängigkeiten
              des Produkts dokumentiert (<LawRef law="CRA" article="13" absatz="5">Art. 13 Abs. 5</LawRef>, <LawRef law="CRA" annex="I">Anhang I</LawRef> Teil II Nr. 1).
            </p>
            <div className="space-y-2">
              {[
                "Maschinenlesbares Format (z. B. CycloneDX, SPDX)",
                "Mindestens alle Top-Level-Dependencies",
                "Muss regelmäßig aktualisiert werden",
                "Teil der technischen Dokumentation",
                "Muss nicht öffentlich sein, aber auf Anfrage verfügbar",
                "Erleichtert Schwachstellen-Tracking (CVE-Matching)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
                  <span className="text-[#8b5cf6] mt-0.5">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 flex items-center gap-2">
              <span className="text-lg">🔄</span> Update-Pflicht
            </h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed mb-4">
              Sicherheitsupdates müssen für den gesamten Support-Zeitraum bereitgestellt werden —
              mindestens 5 Jahre oder die erwartete Produktlebensdauer, wenn diese länger ist.
            </p>
            <div className="space-y-2">
              {[
                "Kostenfreie Sicherheitsupdates — Pflicht",
                "Mindestens 5 Jahre ab Inverkehrbringen",
                "Automatischer Update-Mechanismus erforderlich",
                "Sicherheitsupdates getrennt von Feature-Updates",
                "Nutzer müssen über verfügbare Updates informiert werden",
                "Support-Ende muss klar kommuniziert werden",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
                  <span className="text-[#8b5cf6] mt-0.5">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 8. SCHWACHSTELLENMELDUNG ═══════════════ */}
      <Section id="schwachstellen" title="Schwachstellen- & Vorfallsmeldung">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Ab dem <strong>11. September 2026</strong> müssen Hersteller aktiv ausgenutzte Schwachstellen
          und schwerwiegende Sicherheitsvorfälle melden. Die Meldung erfolgt über eine zentrale
          EU-Meldeplattform, die von <strong>ENISA</strong><SourceRef id={4} sources={sources} accent="#8b5cf6" /> betrieben wird.
        </p>

        <div className="space-y-4 mb-8">
          <ReportingStep
            icon="🚨"
            time="INNERHALB VON 24 STUNDEN"
            title="Frühwarnung (Early Warning)"
            description="Erste Meldung an ENISA und das zuständige nationale CSIRT: welche Schwachstelle, ob aktiv ausgenutzt, ob andere Produkte betroffen sein könnten."
          />
          <ReportingStep
            icon="📊"
            time="INNERHALB VON 72 STUNDEN"
            title="Schwachstellenmeldung"
            description="Detaillierte Beschreibung der Schwachstelle: Art, Schweregrad, betroffene Versionen, Status der Behebung. Ggf. vorläufige Gegenmaßnahmen."
          />
          <ReportingStep
            icon="📝"
            time="14 TAGE NACH KORREKTURMASSNAHME"
            title="Abschlussbericht"
            description="Fällig 14 Tage nachdem eine Korrekturmaßnahme verfügbar ist. Vollständiger Bericht mit: Analyse der Grundursache, ergriffene und geplante Korrekturmaßnahmen, Verbreitung der Schwachstelle."
          />
        </div>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 text-sm">Wer meldet an wen?</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-[#f4f6fc]">
              <span className="text-2xl block mb-2">🏭</span>
              <div className="text-xs font-bold text-[#060c1a] mb-1">Hersteller</div>
              <div className="text-xs text-[#7a8db0]">Meldet Schwachstelle</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-violet-50">
              <span className="text-2xl block mb-2">→</span>
              <div className="text-xs font-bold text-[#8b5cf6] mb-1">ENISA-Plattform</div>
              <div className="text-xs text-[#7a8db0]">Zentrale EU-Meldestelle</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-[#f4f6fc]">
              <span className="text-2xl block mb-2">🏛️</span>
              <div className="text-xs font-bold text-[#060c1a] mb-1">CSIRT + Marktaufsicht</div>
              <div className="text-xs text-[#7a8db0]">Werden von ENISA informiert</div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 9. CE & KONFORMITÄT ═══════════════ */}
      <Section id="konformitaet" title="CE-Kennzeichnung & Konformitätsbewertung">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Produkte mit digitalen Elementen dürfen nur mit gültiger <strong>CE-Kennzeichnung</strong> in der EU
          verkauft werden. Welches Konformitätsbewertungsverfahren gilt, hängt von der Produktkategorie ab:
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#f4f6fc]">
                <th className="text-left p-4 font-[Syne] font-bold text-[#060c1a] rounded-tl-xl">Kategorie</th>
                <th className="text-left p-4 font-[Syne] font-bold text-[#060c1a]">Bewertungsverfahren</th>
                <th className="text-left p-4 font-[Syne] font-bold text-[#060c1a] rounded-tr-xl">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d8dff0]">
              <tr>
                <td className="p-4 font-medium text-[#060c1a]">Standard</td>
                <td className="p-4 text-[#3a4a6b]">Modul A — Selbstbewertung</td>
                <td className="p-4 text-[#3a4a6b]">Hersteller bewertet selbst, ob Anforderungen erfüllt</td>
              </tr>
              <tr className="bg-[#fefce8]/30">
                <td className="p-4 font-medium text-[#060c1a]">Wichtig Kl. I</td>
                <td className="p-4 text-[#3a4a6b]">Selbst (mit hEN) oder Drittanbieter</td>
                <td className="p-4 text-[#3a4a6b]">Bei Anwendung harmonisierter Normen: Selbstbewertung. Sonst: notifizierte Stelle</td>
              </tr>
              <tr className="bg-[#fff7ed]/30">
                <td className="p-4 font-medium text-[#060c1a]">Wichtig Kl. II</td>
                <td className="p-4 text-[#3a4a6b]">Drittanbieter-Bewertung</td>
                <td className="p-4 text-[#3a4a6b]">Modul H (umfassendes QM) oder Modul B+C (Baumusterprüfung)</td>
              </tr>
              <tr className="bg-[#fef2f2]/30">
                <td className="p-4 font-medium text-[#060c1a]">Kritisch</td>
                <td className="p-4 text-[#3a4a6b]">EU-Cybersecurity-Zertifizierung</td>
                <td className="p-4 text-[#3a4a6b]">EUCC-Schema oder gleichwertiges EU-Zertifizierungsschema</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-5">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 text-sm">EU-Konformitätserklärung</h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed">
              Jeder Hersteller muss eine EU-Konformitätserklärung erstellen (<LawRef law="CRA" article="28">Art. 28</LawRef>), die bestätigt,
              dass das Produkt alle Anforderungen des CRA erfüllt. Diese muss 10 Jahre aufbewahrt werden
              und der Marktaufsicht auf Verlangen zur Verfügung gestellt werden.
            </p>
          </div>
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-5">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 text-sm">Supportzeitraum am Produkt</h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed">
              Neben der CE-Kennzeichnung muss auch das voraussichtliche <strong>Ende des Supportzeitraums</strong> klar
              und verständlich am Produkt oder in der Dokumentation angegeben werden — damit Nutzer wissen,
              wie lange sie Sicherheitsupdates erwarten können.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 10. OPEN SOURCE ═══════════════ */}
      <Section id="opensource" title="Open Source & der CRA">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die Behandlung von Open-Source-Software war einer der umstrittensten Punkte. Die finale
          Fassung schafft eine <strong>differenzierte Regelung</strong>:
        </p>

        <div className="space-y-4 mb-8">
          <div className="rounded-2xl border border-green-200 bg-green-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-green-900 mb-2 flex items-center gap-2">
              <span>✅</span> Vom CRA ausgenommen
            </h3>
            <p className="text-sm text-green-800 leading-relaxed">
              Open-Source-Software, die <strong>außerhalb einer kommerziellen Tätigkeit</strong> entwickelt
              und bereitgestellt wird. Das bedeutet: Hobby-Projekte, universitäre Forschung und
              Community-Projekte ohne gewerblichen Charakter fallen nicht unter den CRA, auch wenn
              sie von Unternehmen genutzt werden.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-amber-900 mb-2 flex items-center gap-2">
              <span>⚠️</span> Unter den CRA fallend
            </h3>
            <p className="text-sm text-amber-800 leading-relaxed mb-3">
              Open-Source-Software, die <strong>im Rahmen einer kommerziellen Tätigkeit</strong> auf den Markt
              gebracht wird. Indikatoren für kommerzielle Tätigkeit sind:
            </p>
            <ul className="space-y-1 text-sm text-amber-800">
              <li className="flex items-start gap-2"><span>•</span> Kostenpflichtiger Support oder Premium-Features</li>
              <li className="flex items-start gap-2"><span>•</span> Nutzung als Teil eines kommerziellen Produkts</li>
              <li className="flex items-start gap-2"><span>•</span> Gezielte Verarbeitung personenbezogener Daten für nicht-sicherheitsrelevante Zwecke</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-violet-200 bg-violet-50/40 p-6">
            <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 flex items-center gap-2">
              <span>🆕</span> Neue Rolle: Open-Source-Verwalter (Steward)
            </h3>
            <p className="text-sm text-[#3a4a6b] leading-relaxed mb-3">
              <LawRef law="CRA" article="24">Art. 24 CRA</LawRef> führt den <strong>Open-Source Software Steward</strong> ein — eine juristische Person,
              die die Entwicklung von kommerziell genutzter Open-Source-Software systematisch unterstützt
              (z. B. Stiftungen wie die Apache Foundation, Eclipse Foundation).
            </p>
            <ul className="space-y-1 text-sm text-[#3a4a6b]">
              <li className="flex items-start gap-2"><span className="text-[#8b5cf6]">▸</span> Muss Cybersecurity-Policy dokumentieren und veröffentlichen</li>
              <li className="flex items-start gap-2"><span className="text-[#8b5cf6]">▸</span> Kooperiert bei Schwachstellenbehandlung</li>
              <li className="flex items-start gap-2"><span className="text-[#8b5cf6]">▸</span> Leichtere Pflichten als Hersteller — keine Konformitätsbewertung, kein CE</li>
              <li className="flex items-start gap-2"><span className="text-[#8b5cf6]">▸</span> Von Geldbußen ausgenommen (<LawRef law="CRA" article="64" absatz="10">Art. 64 Abs. 10 CRA</LawRef>)</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-5">
          <p className="text-sm text-[#3a4a6b]">
            <strong>Praxistipp:</strong> Wenn Ihr Unternehmen Open-Source-Komponenten in eigenen Produkten
            einsetzt, haften <em>Sie</em> als Hersteller für die CRA-Konformität — nicht der
            Open-Source-Entwickler. Ihre SBOM muss diese Abhängigkeiten vollständig erfassen.
          </p>
        </div>
      </Section>

      {/* ═══════════════ 11. STRAFEN ═══════════════ */}
      <Section id="strafen" title="Strafen & Durchsetzung">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Die Marktaufsichtsbehörden der Mitgliedstaaten überwachen die Einhaltung. Die Bußgelder
          sind <strong>dreistufig</strong> gestaffelt:
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border-2 border-red-200 bg-red-50/30 p-6 text-center"
          >
            <div className="font-[Syne] font-extrabold text-3xl text-red-600 mb-1">15 Mio. €</div>
            <div className="font-mono text-xs text-red-400 mb-3">oder 2,5 % des weltweiten Jahresumsatzes</div>
            <p className="text-sm text-[#3a4a6b]">
              Verstöße gegen die wesentlichen Cybersecurity-Anforderungen (<LawRef law="CRA" annex="I">Anhang I</LawRef>)
              und Herstellerpflichten (<LawRef law="CRA" article="13">Art. 13</LawRef>, <LawRef law="CRA" article="14">14</LawRef>)
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border-2 border-orange-200 bg-orange-50/30 p-6 text-center"
          >
            <div className="font-[Syne] font-extrabold text-3xl text-orange-600 mb-1">10 Mio. €</div>
            <div className="font-mono text-xs text-orange-400 mb-3">oder 2 % des weltweiten Jahresumsatzes</div>
            <p className="text-sm text-[#3a4a6b]">
              Verstöße gegen sonstige Herstellerpflichten und Pflichten
              für Importeure und Händler
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border-2 border-amber-200 bg-amber-50/30 p-6 text-center"
          >
            <div className="font-[Syne] font-extrabold text-3xl text-amber-600 mb-1">5 Mio. €</div>
            <div className="font-mono text-xs text-amber-400 mb-3">oder 1 % des weltweiten Jahresumsatzes</div>
            <p className="text-sm text-[#3a4a6b]">
              Falsche, unvollständige oder irreführende Angaben
              gegenüber notifizierten Stellen und Marktaufsichtsbehörden
            </p>
          </motion.div>
        </div>

        <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
          <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3 text-sm">Weitere Durchsetzungsmaßnahmen</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "🚫", title: "Marktverbot", desc: "Produkte können vom Markt genommen oder deren Bereitstellung untersagt werden" },
              { icon: "🔄", title: "Rückruf", desc: "Verpflichtender Produktrückruf bei ernsthaften Cybersicherheitsrisiken" },
              { icon: "📢", title: "Öffentliche Warnung", desc: "Behörden können öffentlich vor unsicheren Produkten warnen" },
              { icon: "⏱️", title: "Korrekturfristen", desc: "Hersteller können Fristen zur Herstellung der Konformität gesetzt bekommen" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-3 rounded-xl bg-[#f4f6fc]">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <div className="text-sm font-bold text-[#060c1a]">{item.title}</div>
                  <div className="text-xs text-[#3a4a6b] mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════ 12. ZUSAMMENSPIEL MIT NIS2 & CO. ═══════════════ */}
      <Section id="zusammenspiel" title="Zusammenspiel mit NIS2 & anderen Regulierungen">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Der CRA steht nicht isoliert. Er ergänzt und interagiert mit mehreren EU-Regulierungen:
        </p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: "#0ea5e9" }}>NIS2</div>
              <h3 className="font-[Syne] font-bold text-[#060c1a]">NIS2-Richtlinie / NISG 2026</h3>
            </div>
            <p className="text-sm text-[#3a4a6b] leading-relaxed">
              <strong>NIS2 sichert Unternehmen, CRA sichert Produkte.</strong><SourceRef id={3} sources={sources} accent="#8b5cf6" /> NIS2 verpflichtet wesentliche und
              wichtige Einrichtungen, sichere Produkte einzusetzen. Der CRA stellt sicher, dass die Produkte,
              die diese Einrichtungen kaufen, auch tatsächlich sicher sind. Hersteller, die NIS2-pflichtig sind
              und eigene Produkte nutzen, müssen beide Regulierungen gleichzeitig erfüllen.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8dff0] bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: "#0A2540" }}>AI</div>
              <h3 className="font-[Syne] font-bold text-[#060c1a]">EU AI Act</h3>
            </div>
            <p className="text-sm text-[#3a4a6b] leading-relaxed">
              KI-Systeme, die als {"\u201EProdukt mit digitalen Elementen\u201D"} gelten, müssen sowohl den AI Act als auch den
              CRA erfüllen. Die Cybersecurity-Anforderungen des CRA gelten zusätzlich zu den KI-spezifischen
              Anforderungen. Hochrisiko-KI-Systeme mit CRA-Konformität erfüllen die Cybersecurity-Anforderung
              des AI Act (<LawRef law="AI Act" article="15">Art. 15</LawRef>) automatisch.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#d8dff0] bg-white p-5">
              <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 text-sm">RED — Funkgeräterichtlinie</h3>
              <p className="text-xs text-[#3a4a6b] leading-relaxed">
                Die delegierten Rechtsakte der RED zu Cybersecurity (Art. 3(3)(d/e/f))
                werden durch den CRA ersetzt. Ab Dezember 2027 gilt nur noch der CRA für
                die Cybersicherheit von Funkgeräten.
              </p>
            </div>
            <div className="rounded-2xl border border-[#d8dff0] bg-white p-5">
              <h3 className="font-[Syne] font-bold text-[#060c1a] mb-2 text-sm">Produkthaftungsrichtlinie</h3>
              <p className="text-xs text-[#3a4a6b] leading-relaxed">
                Die neue EU-Produkthaftungsrichtlinie (2024/2853)<SourceRef id={5} sources={sources} accent="#8b5cf6" /> ergänzt den CRA mit
                zivilrechtlicher Haftung. Geschädigte können Schadensersatz fordern,
                wenn ein Produkt wegen mangelnder Cybersicherheit Schäden verursacht.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 13. COMPLIANCE-FAHRPLAN ═══════════════ */}
      <Section id="fahrplan" title="Compliance-Fahrplan">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-8">
          Vier Phasen, um Ihr Unternehmen rechtzeitig CRA-konform aufzustellen:
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              phase: "Phase 1",
              title: "Bestandsaufnahme",
              period: "Sofort beginnen",
              color: "#8b5cf6",
              items: [
                "Alle Produkte mit digitalen Elementen identifizieren",
                "Produktkategorie (Standard / Wichtig I / Wichtig II / Kritisch) bestimmen",
                "Bestehende Cybersecurity-Maßnahmen dokumentieren",
                "Gap-Analyse gegen Anhang I Anforderungen durchführen",
                "Lieferantenlandschaft für Drittkomponenten erfassen",
              ],
            },
            {
              phase: "Phase 2",
              title: "Prozesse & Dokumentation",
              period: "H1 2026",
              color: "#7c3aed",
              items: [
                "Secure Development Lifecycle (SDLC) etablieren",
                "SBOM-Erstellungsprozess implementieren (CycloneDX/SPDX)",
                "Schwachstellenmanagement-Prozess aufsetzen",
                "Coordinated Vulnerability Disclosure Policy veröffentlichen",
                "Technische Dokumentation vorbereiten",
              ],
            },
            {
              phase: "Phase 3",
              title: "Meldepflicht & Test",
              period: "Bis Sep 2026",
              color: "#6d28d9",
              items: [
                "Meldeprozess für ENISA-Plattform einrichten",
                "Zuständigkeiten für 24h-Meldung klären",
                "Sicherheitstests (Penetrationstests, Code Reviews) durchführen",
                "Konformitätsbewertungsverfahren wählen und vorbereiten",
                "Ggf. notifizierte Stelle kontaktieren",
              ],
            },
            {
              phase: "Phase 4",
              title: "Konformität & Monitoring",
              period: "Bis Dez 2027",
              color: "#5b21b6",
              items: [
                "Konformitätsbewertung abschließen",
                "EU-Konformitätserklärung erstellen",
                "CE-Kennzeichnung und Supportzeitraum am Produkt anbringen",
                "Laufendes Schwachstellen-Monitoring etablieren",
                "Update-Pipeline für 5+ Jahre sicherstellen",
              ],
            },
          ].map((phase) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#d8dff0] bg-white overflow-hidden"
            >
              <div className="h-1.5" style={{ background: phase.color }} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: phase.color }}>
                    {phase.phase}
                  </span>
                  <span className="font-mono text-xs text-[#7a8db0]">{phase.period}</span>
                </div>
                <h3 className="font-[Syne] font-bold text-[#060c1a] mb-3">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#3a4a6b]">
                      <span className="mt-0.5 shrink-0" style={{ color: phase.color }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 14. FAQ ═══════════════ */}
      <Section id="faq" title="Häufige Fragen">
        <AccordionSection
          items={[
            {
              title: "Gilt der CRA auch für reine Software ohne Hardware?",
              content:
                "Ja. Der CRA erfasst alle Produkte mit digitalen Elementen \u2014 das umfasst sowohl Hardware mit eingebetteter Software als auch eigenst\u00E4ndige Software, die eine direkte oder indirekte Datenverbindung hat. Betriebssysteme, Browser, Firewalls und VPN-Clients sind typische Beispiele f\u00FCr reine Softwareprodukte unter dem CRA.",
            },
            {
              title: "Was passiert mit Produkten, die vor Dezember 2027 auf den Markt kamen?",
              content:
                "Bereits in Verkehr gebrachte Produkte müssen den CRA nicht rückwirkend erfüllen. Aber: Sobald eine wesentliche Änderung am Produkt vorgenommen wird (z. B. ein Major Update), wird das Produkt als neues Inverkehrbringen betrachtet und muss CRA-konform sein. Auch neue Versionen oder Varianten müssen die Anforderungen erfüllen.",
            },
            {
              title: "Sind Cloud-Dienste (SaaS) vom CRA betroffen?",
              content:
                "Reine SaaS-Lösungen, die vollständig in der Cloud laufen und keine On-Premise-Komponente haben, fallen grundsätzlich nicht unter den CRA. Allerdings: Wenn eine SaaS-Lösung eine Remote-Datenverarbeitungskomponente ist, die für die Kernfunktion eines Produkts mit digitalen Elementen erforderlich ist, kann sie indirekt unter den CRA fallen.",
            },
            {
              title: "Was ist eine SBOM und wie erstelle ich eine?",
              content:
                "Eine Software Bill of Materials (SBOM) ist ein maschinenlesbares Inventar aller Software-Komponenten eines Produkts — vergleichbar mit einer Zutatenliste. Gängige Formate sind CycloneDX und SPDX. Tools wie Syft, Trivy oder OWASP Dependency-Track können SBOMs automatisiert aus Build-Prozessen generieren. Die SBOM muss mindestens alle Top-Level-Abhängigkeiten enthalten.",
            },
            {
              title: "Mein Produkt nutzt Open-Source-Bibliotheken — wer haftet?",
              content:
                "Sie als Hersteller. Wenn Sie Open-Source-Komponenten in Ihr kommerzielles Produkt integrieren, sind Sie für die CRA-Konformität des Gesamtprodukts verantwortlich — unabhängig davon, wer die Komponente entwickelt hat. Deshalb ist eine vollständige SBOM und laufendes Schwachstellen-Monitoring für alle Abhängigkeiten so wichtig.",
            },
            {
              title: "Brauche ich eine notifizierte Stelle für die Konformitätsbewertung?",
              content:
                "Das hängt von der Produktkategorie ab. Standardprodukte (~90 % aller Produkte) können per Selbstbewertung (Modul A) geprüft werden. Wichtige Produkte Klasse I können sich selbst bewerten, wenn harmonisierte Normen angewendet werden. Wichtige Produkte Klasse II und kritische Produkte benötigen zwingend eine Drittanbieter-Bewertung durch eine notifizierte Stelle.",
            },
            {
              title: "Wie interagiert der CRA mit der Maschinenverordnung?",
              content:
                "Produkte, die sowohl unter den CRA als auch unter die Maschinenverordnung (2023/1230) fallen, müssen beide erfüllen. Die Cybersecurity-Anforderungen des CRA gelten ergänzend. Wenn ein Produkt die CRA-Konformitätsbewertung bestanden hat, gilt die Cybersecurity-Anforderung der Maschinenverordnung als erfüllt (Vermutungswirkung).",
            },
            {
              title: "Was passiert, wenn ich Schwachstellen nicht rechtzeitig melde?",
              content:
                "Die Nichtmeldung aktiv ausgenutzter Schwachstellen oder schwerwiegender Vorfälle innerhalb der vorgeschriebenen Fristen (24h Frühwarnung, 72h Detail, 14 Tage Abschluss) kann mit Bußgeldern von bis zu 15 Mio. € oder 2,5 % des weltweiten Jahresumsatzes geahndet werden — da es sich um eine Verletzung der Herstellerpflichten handelt.",
            },
          ]}
        />
      </Section>

      {/* ═══════════════════ VERWANDTE REGULIERUNGEN ═══════════════════ */}
      <RelatedGuides currentGuide="cra" accent="#dc2626" />

      {/* ═══════════════════ SOFTWARE-EMPFEHLUNGEN ═══════════════════ */}
      <ToolRecommendation regulationKey="cra" accent="#8b5cf6" />

      {/* ═══════════════════ QUELLEN ═══════════════════ */}
      <Section id="quellen" title="Quellen & Offizielle Dokumente">
        <p className="text-[#3a4a6b] text-base leading-relaxed mb-6">
          Alle Informationen in diesem Guide basieren auf den offiziellen EU-Dokumenten.
          Hier finden Sie die Primärquellen:
        </p>

        <SourceList sources={sources} accent="#8b5cf6" />

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
