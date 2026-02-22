"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCountry } from "@/i18n/country-context";
import { COUNTRY_META } from "@/i18n/country";

/* ══════════════════════════════════════════════════════════════
   Glossary Data
   ══════════════════════════════════════════════════════════════ */

interface GlossaryEntry {
  term: string;
  definition: string;
  /** Internal link to guide page, if applicable */
  href?: string;
  /** Category tag */
  category: string;
}

const CATEGORIES = [
  "Alle",
  "Datenschutz",
  "Cybersecurity",
  "KI",
  "Finanzsektor",
  "Nachhaltigkeit",
  "Plattform",
  "Allgemein",
] as const;

type Category = (typeof CATEGORIES)[number];

const GLOSSARY: GlossaryEntry[] = [
  // A
  { term: "Angemessenheitsbeschluss", definition: "Entscheidung der EU-Kommission, dass ein Drittland ein angemessenes Datenschutzniveau bietet. Ermöglicht Datenübermittlungen ohne zusätzliche Schutzmaßnahmen gemäß DSGVO Art. 45.", category: "Datenschutz", href: "/dsgvo" },
  { term: "AI Act (KI-Verordnung)", definition: "EU-Verordnung 2024/1689 zur Regulierung von Künstlicher Intelligenz. Klassifiziert KI-Systeme nach Risikoklassen: verboten, hochrisiko, begrenzt und minimal. Ab August 2025 gelten die ersten Verbote.", category: "KI", href: "/eu-ai-act" },
  { term: "AI Literacy", definition: "Pflicht aus dem EU AI Act (Art. 4): Anbieter und Betreiber von KI-Systemen müssen sicherstellen, dass ihr Personal über ausreichende KI-Kompetenz verfügt.", category: "KI", href: "/eu-ai-act" },
  { term: "Auftragsverarbeiter (AV)", definition: "Natürliche oder juristische Person, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet. Muss per AVV (Auftragsverarbeitungsvertrag) gebunden werden.", category: "Datenschutz", href: "/dsgvo" },
  // B
  { term: "BaFG (Barrierefreiheitsstärkungsgesetz)", definition: "Österreichische Umsetzung des European Accessibility Act. Verpflichtet Unternehmen ab 28. Juni 2025 zur Barrierefreiheit digitaler Produkte und Dienstleistungen.", category: "Allgemein", href: "/bafg" },
  { term: "BCM (Business Continuity Management)", definition: "Systematischer Prozess zur Sicherstellung der Betriebskontinuität bei Störungen. Pflichtbestandteil unter NIS2 und DORA.", category: "Cybersecurity" },
  { term: "Betroffenenrechte", definition: "DSGVO-Rechte der betroffenen Personen: Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21).", category: "Datenschutz", href: "/dsgvo" },
  // C
  { term: "CE-Kennzeichnung", definition: "Konformitätskennzeichen für Produkte im EU-Binnenmarkt. Unter dem CRA wird sie auch für Software und IoT-Produkte relevant.", category: "Allgemein", href: "/cra" },
  { term: "CRA (Cyber Resilience Act)", definition: "EU-Verordnung 2024/2847 zu Cybersicherheitsanforderungen für Produkte mit digitalen Elementen. Hersteller müssen Security-by-Design umsetzen und Schwachstellen aktiv managen.", category: "Cybersecurity", href: "/cra" },
  { term: "CSRD (Corporate Sustainability Reporting Directive)", definition: "EU-Richtlinie 2022/2464 zur Nachhaltigkeitsberichterstattung. Verpflichtet große Unternehmen zur Berichterstattung nach ESRS-Standards mit externer Prüfung.", category: "Nachhaltigkeit", href: "/csrd-esg" },
  { term: "Cyber Threat Intelligence (CTI)", definition: "Strukturierte Informationen über aktuelle und potenzielle Cyberbedrohungen. NIS2 Art. 29 fördert den Austausch von CTI zwischen Einrichtungen.", category: "Cybersecurity", href: "/nisg-2026" },
  // D
  { term: "Data Act", definition: "EU-Verordnung 2023/2854 über faire Datenzugangs- und Datennutzungsregeln. Regelt den Zugang zu IoT-Daten und Cloud-Switching. Anwendbar ab September 2025.", category: "Allgemein", href: "/data-act" },
  { term: "Datenschutz-Folgenabschätzung (DSFA)", definition: "Pflichtbewertung nach DSGVO Art. 35 bei Verarbeitungstätigkeiten mit hohem Risiko für die Rechte betroffener Personen. Muss vor Beginn der Verarbeitung durchgeführt werden.", category: "Datenschutz", href: "/dsgvo" },
  { term: "DMA (Digital Markets Act)", definition: "EU-Verordnung über bestreitbare und faire Märkte im digitalen Sektor. Regelt das Verhalten von Gatekeepern wie Google, Apple, Amazon, Meta.", category: "Plattform" },
  { term: "DORA (Digital Operational Resilience Act)", definition: "EU-Verordnung 2022/2554 zur digitalen operationellen Resilienz im Finanzsektor. Seit 17. Januar 2025 verbindlich für Banken, Versicherungen, Wertpapierfirmen und IKT-Drittanbieter.", category: "Finanzsektor", href: "/dora" },
  { term: "Doppelte Wesentlichkeit", definition: "CSRD-Kernprinzip: Unternehmen müssen sowohl die Auswirkungen auf Umwelt/Gesellschaft (Impact Materiality) als auch die finanziellen Risiken (Financial Materiality) bewerten.", category: "Nachhaltigkeit", href: "/csrd-esg" },
  { term: "DSA (Digital Services Act)", definition: "EU-Verordnung 2022/2065 über digitale Dienste. Regelt Haftung und Pflichten von Online-Plattformen, Hosting-Diensten und Suchmaschinen. Enthält Transparenzpflichten und Content-Moderation-Vorgaben.", category: "Plattform", href: "/dsa" },
  { term: "DSGVO (Datenschutz-Grundverordnung)", definition: "EU-Verordnung 2016/679 zum Schutz personenbezogener Daten. Gilt seit 25. Mai 2018 und ist das zentrale Datenschutzgesetz in der EU mit Strafen bis 20 Mio. Euro oder 4% des Jahresumsatzes.", category: "Datenschutz", href: "/dsgvo" },
  // E
  { term: "EHDS (European Health Data Space)", definition: "EU-Verordnung zum Europäischen Gesundheitsdatenraum. Regelt die Primär- und Sekundärnutzung von Gesundheitsdaten zur Verbesserung der Gesundheitsversorgung und Forschung.", category: "Datenschutz", href: "/ehds" },
  { term: "eIDAS 2.0", definition: "Novelle der EU-Verordnung über elektronische Identifizierung. Führt die European Digital Identity Wallet ein, mit der Bürger sich EU-weit digital ausweisen können.", category: "Allgemein", href: "/eidas" },
  { term: "ENISA", definition: "EU-Agentur für Cybersicherheit. Unterstützt EU-Mitgliedstaaten bei der Umsetzung von NIS2 und koordiniert grenzübergreifende Cybersecurity-Aktivitäten.", category: "Cybersecurity" },
  { term: "ESRS (European Sustainability Reporting Standards)", definition: "Berichtsstandards der EFRAG für die CSRD-Berichterstattung. Umfassen 12 thematische Standards zu Umwelt (E1-E5), Soziales (S1-S4) und Governance (G1).", category: "Nachhaltigkeit", href: "/csrd-esg" },
  { term: "EU-Taxonomie", definition: "EU-Klassifikationssystem für ökologisch nachhaltige Wirtschaftstätigkeiten. Definiert technische Bewertungskriterien für sechs Umweltziele.", category: "Nachhaltigkeit", href: "/csrd-esg" },
  // G
  { term: "Green Claims Directive", definition: "EU-Richtlinie gegen irreführende Umweltaussagen (Greenwashing). Unternehmen müssen Umweltbehauptungen wissenschaftlich belegen und unabhängig prüfen lassen.", category: "Nachhaltigkeit", href: "/green-claims" },
  // H
  { term: "Hochrisiko-KI-System", definition: "KI-System nach AI Act Anhang III, das in sensiblen Bereichen eingesetzt wird (z.B. Personalauswahl, Kreditscoring, Gesundheit). Unterliegt strengen Anforderungen an Dokumentation, Tests und menschliche Aufsicht.", category: "KI", href: "/eu-ai-act" },
  { term: "HSchG (Hinweisgeberschutzgesetz)", definition: "Österreichische Umsetzung der EU-Whistleblower-Richtlinie. Verpflichtet Unternehmen ab 50 Mitarbeitern zur Einrichtung interner Meldekanäle für Hinweisgeber.", category: "Allgemein", href: "/hschg" },
  // I
  { term: "IKT (Informations- und Kommunikationstechnologie)", definition: "Oberbegriff für alle technologischen Systeme zur Informationsverarbeitung. In DORA und NIS2 zentral für die Definition des Anwendungsbereichs.", category: "Cybersecurity" },
  { term: "Incident Response", definition: "Strukturierter Prozess zur Erkennung, Analyse und Reaktion auf Sicherheitsvorfälle. NIS2 verlangt eine 72-Stunden-Meldefrist an die zuständige Behörde.", category: "Cybersecurity", href: "/nisg-2026" },
  // K
  { term: "Konformitätsbewertung", definition: "Verfahren zum Nachweis, dass ein Produkt oder KI-System die geltenden EU-Anforderungen erfüllt. Kann durch Selbstbewertung oder notifizierte Stellen erfolgen.", category: "Allgemein" },
  // M
  { term: "MFA (Multi-Faktor-Authentifizierung)", definition: "Sicherheitsverfahren mit mindestens zwei unabhängigen Authentifizierungsfaktoren. Unter NIS2 als technische Mindestmaßnahme für wesentliche und wichtige Einrichtungen vorgeschrieben.", category: "Cybersecurity", href: "/nisg-2026" },
  { term: "MiCA (Markets in Crypto-Assets)", definition: "EU-Verordnung 2023/1114 zur Regulierung von Kryptowerten. Schafft einheitlichen Rechtsrahmen für Stablecoins, Utility Tokens und Krypto-Dienstleister (CASPs) in der EU.", category: "Finanzsektor", href: "/mica" },
  // N
  { term: "NIS2-Richtlinie", definition: "EU-Richtlinie 2022/2555 zur Netz- und Informationssicherheit. Erweitert den Anwendungsbereich auf 18 Sektoren und unterscheidet zwischen wesentlichen und wichtigen Einrichtungen.", category: "Cybersecurity", href: "/nisg-2026" },
  { term: "NISG 2026", definition: "Österreichisches Netz- und Informationssystemsicherheitsgesetz 2026. Nationale Umsetzung der NIS2-Richtlinie mit Registrierungspflicht beim BMI und Strafen bis 10 Mio. Euro.", category: "Cybersecurity", href: "/nisg-2026" },
  // P
  { term: "Privacy by Design", definition: "DSGVO-Grundsatz (Art. 25): Datenschutz muss bereits bei der Konzeption von Systemen und Prozessen berücksichtigt werden, nicht erst nachträglich.", category: "Datenschutz", href: "/dsgvo" },
  { term: "Produkthaftungsrichtlinie", definition: "Überarbeitete EU-Richtlinie 2024/2853 zur Produkthaftung. Erstmals werden auch Software und KI-Systeme als Produkte erfasst. Beweislasterleichterung bei komplexen Produkten.", category: "Allgemein", href: "/produkthaftung" },
  // R
  { term: "Registrierungspflicht", definition: "NIS2/NISG 2026 verpflichtet betroffene Einrichtungen zur Registrierung bei der nationalen Behörde (in AT: BMI). Frist: 3 Monate nach Inkrafttreten.", category: "Cybersecurity", href: "/nisg-2026" },
  { term: "Risikomanagement", definition: "Systematischer Prozess zur Identifikation, Bewertung und Behandlung von Risiken. Kernpflicht in NIS2 (Art. 21), DORA (Art. 6), AI Act und DSGVO.", category: "Allgemein" },
  // S
  { term: "SBOM (Software Bill of Materials)", definition: "Maschinenlesbares Inventar aller Softwarekomponenten eines Produkts. Unter dem CRA verpflichtend, um Schwachstellen in Abhängigkeiten nachvollziehen zu können.", category: "Cybersecurity", href: "/cra" },
  { term: "Scope 1/2/3 Emissionen", definition: "Kategorisierung von Treibhausgasemissionen: Scope 1 (direkt), Scope 2 (Energiebezug), Scope 3 (Lieferkette). CSRD/ESRS erfordert die Berichterstattung aller drei Scopes.", category: "Nachhaltigkeit", href: "/csrd-esg" },
  { term: "Security by Design", definition: "Entwicklungsprinzip im CRA: Sicherheit muss von Anfang an in die Produktentwicklung integriert werden — nicht als nachträgliche Ergänzung.", category: "Cybersecurity", href: "/cra" },
  { term: "Supply Chain Security", definition: "Sicherheit der Lieferkette. NIS2 Art. 21(2)(d) verpflichtet Einrichtungen, die Cybersicherheit ihrer Lieferanten und Dienstleister zu bewerten und zu überwachen.", category: "Cybersecurity", href: "/nisg-2026" },
  // T
  { term: "TLPT (Threat-Led Penetration Testing)", definition: "Unter DORA vorgeschriebene Methode für bedrohungsgeleitete Sicherheitstests. Große Finanzinstitute müssen alle 3 Jahre externe TLPT durchführen lassen.", category: "Finanzsektor", href: "/dora" },
  { term: "TOMs (Technisch-Organisatorische Maßnahmen)", definition: "DSGVO Art. 32: Verantwortliche müssen geeignete technische (Verschlüsselung, Pseudonymisierung) und organisatorische (Zugangskontrollen, Schulungen) Maßnahmen zum Datenschutz implementieren.", category: "Datenschutz", href: "/dsgvo" },
  // V
  { term: "Verarbeitungsverzeichnis", definition: "DSGVO Art. 30: Dokumentation aller Verarbeitungstätigkeiten personenbezogener Daten. Pflicht für Verantwortliche und Auftragsverarbeiter mit mehr als 250 Beschäftigten (mit Ausnahmen).", category: "Datenschutz", href: "/dsgvo" },
  // W
  { term: "Wesentliche Einrichtung", definition: "NIS2-Kategorie für Einrichtungen in kritischen Sektoren (Energie, Transport, Gesundheit etc.) ab 250 MA oder 50 Mio. Euro Umsatz. Unterliegen proaktiver Aufsicht.", category: "Cybersecurity", href: "/nisg-2026" },
  { term: "Wichtige Einrichtung", definition: "NIS2-Kategorie für Einrichtungen in weiteren Sektoren ab 50 MA oder 10 Mio. Euro Umsatz. Unterliegen reaktiver Aufsicht (nur bei Hinweisen auf Verstöße).", category: "Cybersecurity", href: "/nisg-2026" },
  { term: "Whistleblower", definition: "Person, die Verstöße gegen EU-Recht meldet. Durch die EU-Whistleblower-Richtlinie 2019/1937 und nationale Gesetze (HSchG) vor Vergeltungsmaßnahmen geschützt.", category: "Allgemein", href: "/hschg" },
  // Z
  { term: "Zero Trust", definition: "Sicherheitsmodell nach dem Prinzip 'Vertraue niemandem, überprüfe alles'. Jeder Zugriff wird unabhängig vom Netzwerkstandort authentifiziert und autorisiert. Empfohlen unter NIS2 und DORA.", category: "Cybersecurity" },
  // Additional terms
  { term: "Accountability-Prinzip", definition: "DSGVO-Grundsatz (Art. 5 Abs. 2): Der Verantwortliche muss die Einhaltung aller Datenschutzgrundsätze nachweisen können (Rechenschaftspflicht).", category: "Datenschutz", href: "/dsgvo" },
  { term: "Algorithmic Auditing", definition: "Überprüfung von KI-Systemen auf Fairness, Transparenz und Diskriminierungsfreiheit. Unter dem AI Act für Hochrisiko-KI als Teil der Konformitätsbewertung erforderlich.", category: "KI", href: "/eu-ai-act" },
  { term: "Binding Corporate Rules (BCR)", definition: "Verbindliche unternehmensinterne Datenschutzvorschriften für internationale Konzerne. Ermöglichen Datenübermittlungen in Drittländer ohne Angemessenheitsbeschluss gemäß DSGVO Art. 47.", category: "Datenschutz", href: "/dsgvo" },
  { term: "CASP (Crypto-Asset Service Provider)", definition: "Krypto-Dienstleister unter MiCA: Börsen, Verwahrer, Berater und andere Anbieter von Krypto-Diensten. Müssen eine EU-weite Lizenz beantragen.", category: "Finanzsektor", href: "/mica" },
  { term: "Cloud-Switching", definition: "Data Act-Recht: Kunden müssen ihren Cloud-Anbieter ohne übermäßige Hürden wechseln können. Anbieter müssen Datenportabilität sicherstellen und Wechselgebühren bis 2027 abschaffen.", category: "Allgemein", href: "/data-act" },
  { term: "CSIRT (Computer Security Incident Response Team)", definition: "Spezialisiertes Team für die Reaktion auf Cybersicherheitsvorfälle. Jeder EU-Mitgliedstaat muss unter NIS2 ein nationales CSIRT betreiben.", category: "Cybersecurity", href: "/nisg-2026" },
  { term: "Cyberversicherung", definition: "Versicherungsprodukt zur Absicherung gegen Schäden durch Cyberangriffe. NIS2-Compliance kann die Versicherungsbedingungen und Prämien positiv beeinflussen.", category: "Cybersecurity" },
  { term: "Dateninventar", definition: "Umfassende Bestandsaufnahme aller im Unternehmen verarbeiteten Daten. Basis für DSGVO-Verarbeitungsverzeichnis und CSRD-Nachhaltigkeitsberichterstattung.", category: "Datenschutz" },
  { term: "Digital Operational Resilience Testing", definition: "DORA-Anforderung: Finanzunternehmen müssen ihre IKT-Systeme regelmäßig durch Penetrationstests, Szenarioanalysen und Stresstests prüfen.", category: "Finanzsektor", href: "/dora" },
  { term: "Digitaler Produktpass (DPP)", definition: "Elektronischer Datensatz mit Nachhaltigkeits- und Lebenszyklusinformationen eines Produkts. Ab 2027 für Batterien, danach schrittweise für Textilien und weitere Produktkategorien.", category: "Nachhaltigkeit", href: "/digitaler-produktpass" },
  { term: "EDPB (European Data Protection Board)", definition: "Europäischer Datenschutzausschuss. Sichert die einheitliche Anwendung der DSGVO durch Leitlinien, Empfehlungen und bindende Beschlüsse.", category: "Datenschutz" },
  { term: "Explainability (Erklärbarkeit)", definition: "AI Act-Anforderung: Nutzer von Hochrisiko-KI müssen die Funktionsweise und Entscheidungen des Systems nachvollziehen können. Eng verbunden mit Transparenzpflichten.", category: "KI", href: "/eu-ai-act" },
  { term: "Foundation Model", definition: "Großes, auf breiten Daten vortrainiertes KI-Modell (z.B. GPT, Claude). Im AI Act als 'General-Purpose AI' (GPAI) reguliert mit Transparenz- und ggf. systemischen Risikopflichten.", category: "KI", href: "/eu-ai-act" },
  { term: "Gatekeeper", definition: "Unter dem DMA als marktbeherrschend eingestufte Plattformen (z.B. Google, Apple, Meta, Amazon). Unterliegen besonderen Verhaltenspflichten für fairen Wettbewerb.", category: "Plattform" },
  { term: "Greenwashing", definition: "Irreführende Vermarktung von Produkten oder Unternehmen als umweltfreundlich. Die Green Claims Directive verlangt künftig wissenschaftliche Belege für alle Umweltaussagen.", category: "Nachhaltigkeit", href: "/green-claims" },
  { term: "ICT Risk Management (IKT-Risikomanagement)", definition: "DORA Art. 6-16: Systematischer Rahmen zur Identifikation, Bewertung und Minderung von IKT-bezogenen Risiken im Finanzsektor.", category: "Finanzsektor", href: "/dora" },
  { term: "Informationssicherheits-Managementsystem (ISMS)", definition: "Systematischer Ansatz zum Management sensibler Informationen. ISO 27001 ist der wichtigste Standard. Unter NIS2 als Nachweis angemessener Maßnahmen anerkannt.", category: "Cybersecurity", href: "/nisg-2026" },
  { term: "Joint Controllership (Gemeinsame Verantwortlichkeit)", definition: "DSGVO Art. 26: Wenn zwei oder mehr Verantwortliche gemeinsam Zweck und Mittel einer Datenverarbeitung festlegen, müssen sie eine Vereinbarung über ihre Pflichten treffen.", category: "Datenschutz", href: "/dsgvo" },
  { term: "Notifizierte Stelle", definition: "Von EU-Mitgliedstaaten benannte Organisation für Konformitätsbewertungen. Unter CRA und AI Act prüfen sie, ob Produkte und KI-Systeme die EU-Anforderungen erfüllen.", category: "Allgemein" },
  { term: "Penetrationstest", definition: "Kontrollierter Angriff auf IT-Systeme zur Aufdeckung von Schwachstellen. NIS2 verlangt regelmäßige Sicherheitstests, DORA fordert speziell TLPT für systemrelevante Institute.", category: "Cybersecurity" },
  { term: "Standardvertragsklauseln (SCCs)", definition: "Von der EU-Kommission genehmigte Vertragsvorlagen für Datenübermittlungen in Drittländer. Seit Juni 2021 gelten die neuen SCCs (Durchführungsbeschluss 2021/914).", category: "Datenschutz", href: "/dsgvo" },
  { term: "Stablecoin", definition: "Kryptowert, der an einen stabilen Vermögenswert (z.B. Euro, USD) gekoppelt ist. Unter MiCA unterliegen Stablecoins strengen Reserveanforderungen und Emittentenpflichten.", category: "Finanzsektor", href: "/mica" },
  { term: "Transparenzpflichten", definition: "Übergreifende Anforderung in DSGVO (Art. 13/14), AI Act (Art. 50), DSA und CSRD: Unternehmen müssen klar und verständlich über ihre Praktiken informieren.", category: "Allgemein" },
  { term: "Vulnerability Disclosure (Schwachstellenmeldung)", definition: "CRA-Pflicht: Hersteller müssen aktiv ausgenutzte Schwachstellen innerhalb von 24 Stunden an die ENISA melden. Koordinierte Offenlegung ist vorgeschrieben.", category: "Cybersecurity", href: "/cra" },
  { term: "WCAG (Web Content Accessibility Guidelines)", definition: "Internationale Richtlinien für barrierefreie Webinhalte. Stufe AA ist unter dem BaFG/European Accessibility Act als Mindeststandard vorgeschrieben.", category: "Allgemein", href: "/bafg" },
].sort((a, b) => a.term.localeCompare(b.term, "de"));

/* ── Extract first letters for alphabet nav ── */
const ALPHABET = Array.from(new Set(GLOSSARY.map((g) => g.term[0].toUpperCase()))).sort((a, b) =>
  a.localeCompare(b, "de"),
);

/* ══════════════════════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════════════════════ */

export default function GlossarContent() {
  const { countryCode } = useCountry();
  const countryMeta = COUNTRY_META[countryCode];
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("Alle");

  const filtered = useMemo(() => {
    return GLOSSARY.filter((entry) => {
      const matchesCategory =
        activeCategory === "Alle" || entry.category === activeCategory;
      const matchesSearch =
        search.length < 2 ||
        entry.term.toLowerCase().includes(search.toLowerCase()) ||
        entry.definition.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  /* Group by first letter */
  const grouped = useMemo(() => {
    const map = new Map<string, GlossaryEntry[]>();
    for (const entry of filtered) {
      const letter = entry.term[0].toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(entry);
    }
    return map;
  }, [filtered]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#060c1a]">
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,92,246,0.08) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-400/10 border border-violet-400/20 text-violet-400 text-xs font-mono font-semibold tracking-wider uppercase">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                Nachschlagewerk
              </div>
              {countryMeta && (
                <div className="flex items-center gap-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] px-2.5 py-1">
                  <span className="text-sm leading-none">{countryMeta.flag}</span>
                  <span className="font-mono text-[10px] text-white/60 font-medium">{countryMeta.nameDE}</span>
                </div>
              )}
            </div>
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              Compliance-
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Glossar</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {GLOSSARY.length} Fachbegriffe aus EU-Compliance, Datenschutz, Cybersecurity und ESG. Verständlich erklärt mit Verweisen auf die relevanten Regulierungen.
            </p>
          </div>
        </section>

        {/* ── Search + Filter ── */}
        <section className="pb-4 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Search */}
            <div className="relative mb-6">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Begriff suchen..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-violet-400/40 transition-colors"
                aria-label="Glossar durchsuchen"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    background: activeCategory === cat ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.04)",
                    color: activeCategory === cat ? "#a78bfa" : "#94a3b8",
                    borderWidth: 1,
                    borderColor: activeCategory === cat ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.06)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Alphabet jump */}
            <div className="flex flex-wrap gap-1 mb-8">
              {ALPHABET.map((letter) => {
                const hasEntries = grouped.has(letter);
                return (
                  <a
                    key={letter}
                    href={hasEntries ? `#letter-${letter}` : undefined}
                    className="w-8 h-8 flex items-center justify-center rounded-md text-xs font-mono font-bold transition-colors"
                    style={{
                      color: hasEntries ? "#a78bfa" : "#334155",
                      background: hasEntries ? "rgba(139,92,246,0.08)" : "transparent",
                      cursor: hasEntries ? "pointer" : "default",
                    }}
                  >
                    {letter}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Glossary Entries ── */}
        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-slate-400 text-sm">
                  Kein Begriff gefunden. Versuchen Sie einen anderen Suchbegriff.
                </p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {Array.from(grouped.entries()).map(([letter, entries]) => (
                  <motion.div
                    key={letter}
                    id={`letter-${letter}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mb-8 scroll-mt-24"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-[Syne] font-extrabold text-3xl text-violet-400/30">
                        {letter}
                      </span>
                      <div className="flex-1 h-px bg-white/5" />
                    </div>

                    <div className="space-y-3">
                      {entries.map((entry) => (
                        <div
                          key={entry.term}
                          className="rounded-xl border border-white/5 bg-slate-900/40 p-5 hover:border-violet-400/15 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-2">
                                <h3 className="font-bold text-white text-sm">
                                  {entry.term}
                                </h3>
                                <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-semibold bg-white/5 text-slate-400">
                                  {entry.category}
                                </span>
                              </div>
                              <p className="text-sm text-slate-400 leading-relaxed">
                                {entry.definition}
                              </p>
                            </div>
                            {entry.href && (
                              <Link
                                href={entry.href}
                                className="flex-shrink-0 mt-1 text-violet-400 hover:text-violet-300 transition-colors"
                                title={`Zum ${entry.term} Leitfaden`}
                              >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
