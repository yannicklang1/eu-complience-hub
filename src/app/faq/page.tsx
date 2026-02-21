import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import FAQContent from "./FAQContent";

export const metadata: Metadata = {
  title: "Häufige Fragen (FAQ) zur EU-Compliance",
  description:
    "Über 30 Antworten auf die häufigsten Fragen zu NIS2, DSGVO, AI Act, DORA, CRA, CSRD, MiCA und anderen EU-Regulierungen. Verständlich erklärt für Unternehmen.",
  keywords:
    "EU Compliance FAQ, NIS2 Fragen, DSGVO FAQ, AI Act Fragen, Compliance Unternehmen, EU Regulierung Fragen, DORA FAQ, CRA FAQ, MiCA FAQ, CSRD FAQ",
  openGraph: {
    title: "Häufige Fragen (FAQ) zur EU-Compliance",
    description:
      "Antworten auf die häufigsten Fragen zu EU-Regulierungen. Verständlich erklärt.",
    url: `${BASE_URL}/faq`,
  },
  alternates: {
    canonical: `${BASE_URL}/faq`,
  },
};

/* ── FAQ Data (also used for JSON-LD) ── */
export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqData: FAQItem[] = [
  /* ── Allgemein ── */
  {
    question: "Was ist EU-Compliance und warum ist sie wichtig?",
    answer: "EU-Compliance bezeichnet die Einhaltung aller relevanten EU-Regulierungen, Richtlinien und Verordnungen. Sie ist wichtig, weil Verstöße zu erheblichen Bußgeldern führen können — bei der DSGVO bis zu 20 Mio. € oder 4% des weltweiten Jahresumsatzes, bei NIS2 bis zu 10 Mio. € oder 2% des Umsatzes. Zudem drohen persönliche Haftung für Geschäftsführer und Reputationsschäden.",
    category: "Allgemein",
  },
  {
    question: "Welche EU-Regulierungen gelten für mein Unternehmen?",
    answer: "Das hängt von Branche, Unternehmensgröße und Tätigkeit ab. Die DSGVO gilt praktisch für jedes Unternehmen, das personenbezogene Daten verarbeitet. NIS2 betrifft mittlere und große Unternehmen in kritischen Sektoren. Der AI Act gilt für alle, die KI-Systeme entwickeln oder einsetzen. Nutzen Sie unseren kostenlosen Regulierung-Finder, um Ihre individuelle Betroffenheit zu ermitteln.",
    category: "Allgemein",
  },
  {
    question: "Wie unterscheiden sich EU-Verordnungen und EU-Richtlinien?",
    answer: "EU-Verordnungen (z.B. DSGVO, AI Act, DORA) gelten unmittelbar in allen Mitgliedstaaten — sie müssen nicht erst in nationales Recht umgesetzt werden. EU-Richtlinien (z.B. NIS2) geben Mindeststandards vor und müssen von jedem Mitgliedstaat in nationale Gesetze überführt werden, in Österreich z.B. als NISG 2026.",
    category: "Allgemein",
  },
  {
    question: "Gibt es Übergangsfristen für die neuen EU-Regulierungen?",
    answer: "Ja, die meisten Regulierungen sehen Übergangsfristen vor. Der AI Act wird stufenweise bis 2027 anwendbar. DORA gilt seit Januar 2025. NIS2 musste bis Oktober 2024 umgesetzt werden, in Österreich tritt das NISG 2026 voraussichtlich Mitte 2026 in Kraft. Der CRA gewährt 36 Monate Übergangsfrist ab Inkrafttreten. Unser Fristen-Radar zeigt alle Deadlines auf einen Blick.",
    category: "Allgemein",
  },

  /* ── DSGVO ── */
  {
    question: "Was muss ich als KMU bei der DSGVO beachten?",
    answer: "Auch KMUs müssen die DSGVO vollständig einhalten. Mindestanforderungen: Verarbeitungsverzeichnis führen, Datenschutzerklärung bereitstellen, Rechtsgrundlage für jede Verarbeitung sicherstellen, Betroffenenrechte ermöglichen, technische und organisatorische Maßnahmen umsetzen, und bei Datenpannen innerhalb von 72 Stunden melden. Ab 20 Mitarbeitern, die regelmäßig personenbezogene Daten verarbeiten, ist ein Datenschutzbeauftragter Pflicht.",
    category: "DSGVO",
  },
  {
    question: "Wie hoch können DSGVO-Bußgelder sein?",
    answer: "Bis zu 20 Millionen Euro oder 4% des weltweiten Jahresumsatzes — je nachdem, welcher Betrag höher ist. In der Praxis liegen die meisten Bußgelder niedriger, aber Rekordstrafen wie die 1,2 Mrd. € gegen Meta zeigen, dass die Behörden die volle Bandbreite nutzen. Auch KMUs erhalten regelmäßig Bußgelder im fünf- bis sechsstelligen Bereich.",
    category: "DSGVO",
  },

  /* ── NIS2 ── */
  {
    question: "Bin ich von NIS2 betroffen?",
    answer: "Sie sind betroffen, wenn Ihr Unternehmen mindestens 50 Mitarbeiter oder 10 Mio. € Jahresumsatz hat UND in einem der 18 kritischen Sektoren tätig ist (z.B. Energie, Transport, Gesundheit, IT/TK, Finanzen, Wasserwirtschaft). Unabhängig von der Größe sind auch DNS-Diensteanbieter, TLD-Namensregister, Cloud-Anbieter und Rechenzentren betroffen. Nutzen Sie unseren NIS2 Betroffenheits-Check für eine genaue Einschätzung.",
    category: "NIS2",
  },
  {
    question: "Was sind die wichtigsten NIS2-Pflichten?",
    answer: "Die Kernpflichten umfassen: Risikomanagement-Maßnahmen implementieren, Vorfälle innerhalb von 24 Stunden melden (Frühwarnung) und innerhalb von 72 Stunden detailliert berichten, Lieferkettensicherheit gewährleisten, Geschäftsführer zur Cybersecurity-Schulung verpflichten, und regelmäßige Audits durchführen. In Österreich wird dies durch das NISG 2026 umgesetzt.",
    category: "NIS2",
  },
  {
    question: "Wann tritt NIS2 in Österreich in Kraft?",
    answer: "Die EU-Richtlinie NIS2 hätte bis Oktober 2024 umgesetzt werden müssen. In Österreich wird die nationale Umsetzung als NISG 2026 (Netz- und Informationssystemsicherheitsgesetz 2026) voraussichtlich Mitte 2026 in Kraft treten. Unternehmen sollten sich bereits jetzt vorbereiten, da die Maßnahmen umfangreich sind.",
    category: "NIS2",
  },

  /* ── AI Act ── */
  {
    question: "Was regelt der EU AI Act?",
    answer: "Der AI Act ist das weltweit erste umfassende KI-Gesetz. Er klassifiziert KI-Systeme nach Risikostufen: verbotene Praktiken (Social Scoring, manipulative KI), Hochrisiko-Systeme (Bewerbungstools, Kreditentscheidungen, medizinische Geräte), KI mit Transparenzpflichten (Chatbots, Deepfakes) und KI mit minimalem Risiko (Spamfilter). Je nach Risikostufe gelten unterschiedliche Anforderungen.",
    category: "AI Act",
  },
  {
    question: "Ab wann gilt der AI Act?",
    answer: "Der AI Act wird stufenweise anwendbar: Ab Februar 2025 gelten die Verbote (Kapitel II). Ab August 2025 die Regeln für General-Purpose-AI-Modelle (GPT-4, Gemini etc.). Ab August 2026 gelten die meisten Hochrisiko-Vorschriften. Ab August 2027 die restlichen Regeln für Hochrisiko-Systeme nach Anhang I (z.B. Medizingeräte).",
    category: "AI Act",
  },
  {
    question: "Brauche ich als KI-Nutzer eine Konformitätsbewertung?",
    answer: "Als reiner Betreiber (Deployer) eines KI-Systems benötigen Sie keine eigene Konformitätsbewertung — das ist Aufgabe des Anbieters. Allerdings müssen Sie als Betreiber eines Hochrisiko-Systems: eine Datenschutz-Folgenabschätzung durchführen, menschliche Aufsicht sicherstellen, Eingabedaten überwachen, und betroffene Personen über den KI-Einsatz informieren.",
    category: "AI Act",
  },

  /* ── DORA ── */
  {
    question: "Was ist DORA und wen betrifft es?",
    answer: "DORA (Digital Operational Resilience Act) ist eine EU-Verordnung zur digitalen Betriebsresilienz im Finanzsektor. Sie betrifft Banken, Versicherungen, Wertpapierfirmen, Zahlungsinstitute und andere Finanzunternehmen — sowie deren kritische IKT-Drittanbieter (z.B. Cloud-Provider, Software-Dienstleister). DORA gilt seit dem 17. Januar 2025.",
    category: "DORA",
  },
  {
    question: "Was muss ich als IKT-Dienstleister für Banken beachten?",
    answer: "Wenn Sie als kritischer IKT-Drittanbieter eingestuft werden, unterliegen Sie dem Überwachungsrahmenwerk der europäischen Aufsichtsbehörden. Sie müssen: vertraglich bestimmte Sicherheitsstandards garantieren, Vorfallsmeldungen ermöglichen, Audit-Rechte einräumen, Business-Continuity-Pläne vorhalten und Exit-Strategien bereitstellen.",
    category: "DORA",
  },

  /* ── CRA ── */
  {
    question: "Was ist der Cyber Resilience Act (CRA)?",
    answer: "Der CRA verpflichtet Hersteller von Produkten mit digitalen Elementen (Software und Hardware) zu Cybersicherheitsanforderungen über den gesamten Produktlebenszyklus. Das umfasst: Sicherheitsdesign von Anfang an, keine bekannten Schwachstellen bei Auslieferung, kostenlose Sicherheitsupdates über mindestens 5 Jahre, und Schwachstellenmeldepflichten. Die Übergangsfrist beträgt 36 Monate.",
    category: "CRA",
  },
  {
    question: "Betrifft der CRA auch Open-Source-Software?",
    answer: "Nein, reine Open-Source-Projekte ohne kommerziellen Hintergrund sind vom CRA ausgenommen. Wenn jedoch ein Unternehmen Open-Source-Software in einem kommerziellen Produkt einsetzt und vertreibt, gelten die CRA-Pflichten für den Hersteller/Integrator dieses Produkts. Open-Source-Stewards haben spezielle, reduzierte Pflichten.",
    category: "CRA",
  },

  /* ── CSRD / ESG ── */
  {
    question: "Ab wann muss mein Unternehmen einen Nachhaltigkeitsbericht erstellen?",
    answer: "Das hängt von Ihrer Unternehmensgröße ab: Große Unternehmen von öffentlichem Interesse (> 500 MA) berichten ab Geschäftsjahr 2024. Alle großen Unternehmen (> 250 MA oder > 50 Mio. € Umsatz) ab GJ 2025. Börsennotierte KMUs ab GJ 2026 mit Opt-out bis 2028. Nicht-EU-Unternehmen mit > 150 Mio. € EU-Umsatz ab GJ 2028.",
    category: "CSRD",
  },

  /* ── Haftung ── */
  {
    question: "Haftet der Geschäftsführer persönlich bei Compliance-Verstößen?",
    answer: "Ja, bei mehreren Regulierungen ist eine persönliche Haftung vorgesehen. NIS2 sieht explizit vor, dass die Geschäftsleitung für die Umsetzung verantwortlich ist und bei Pflichtverletzungen persönlich haftet — bis hin zu temporären Tätigkeitsverboten. Auch bei DSGVO-Verstößen kann die Geschäftsführung unter bestimmten Umständen persönlich belangt werden.",
    category: "Haftung",
  },

  /* ── Kosten ── */
  {
    question: "Was kostet Compliance-Umsetzung für ein KMU?",
    answer: "Die Kosten variieren stark je nach Branche, Größe und Reifegrad. Typische Bandbreiten für KMUs: DSGVO-Grundausstattung 5.000–20.000 €, NIS2-Umsetzung 30.000–150.000 €, AI-Act-Konformität 10.000–50.000 € (als Deployer). Investitionen in Compliance zahlen sich aus — die Bußgelder bei Verstößen übersteigen die Implementierungskosten meist um ein Vielfaches.",
    category: "Allgemein",
  },

  /* ── BaFG ── */
  {
    question: "Was fordert das Barrierefreiheitsstärkungsgesetz (BaFG)?",
    answer: "Das BaFG setzt die EU-Richtlinie (EAA) in nationales Recht um und verpflichtet Anbieter bestimmter Produkte und Dienstleistungen, diese barrierefrei zu gestalten. Betroffen sind u.a. E-Commerce-Shops, Bankdienstleistungen, Telekommunikationsdienste, E-Books und Transportdienste. Die Anforderungen umfassen wahrnehmbare, bedienbare und verständliche Gestaltung gemäß WCAG-Standards. Das Gesetz gilt seit Juni 2025.",
    category: "BaFG",
  },

  /* ── Green Claims ── */
  {
    question: "Was ändert sich durch die Green Claims Richtlinie?",
    answer: "Die EU-Richtlinie gegen Greenwashing verbietet pauschale Umweltaussagen wie 'klimaneutral', 'umweltfreundlich' oder 'grün' ohne wissenschaftlichen Nachweis. Unternehmen müssen Umweltaussagen künftig mit überprüfbaren wissenschaftlichen Methoden belegen und von unabhängigen Stellen zertifizieren lassen. CO₂-Kompensation allein reicht nicht mehr als Begründung für 'klimaneutral'. Umsetzungsfrist: März 2026.",
    category: "Green Claims",
  },

  /* ── Data Act ── */
  {
    question: "Was bedeutet der Data Act für IoT-Hersteller?",
    answer: "Der EU Data Act (ab September 2025) verpflichtet Hersteller vernetzter Geräte (IoT), den Nutzern Zugang zu den generierten Daten zu gewähren — und zwar in einem maschinenlesbaren Format und in Echtzeit. Zudem müssen Cloud-Kunden einen einfachen Anbieterwechsel (Cloud-Switching) durchführen können. Gatekeeper dürfen von Dateninhabern erhaltene Daten nicht für andere Zwecke nutzen.",
    category: "Data Act",
  },

  /* ── DPP ── */
  {
    question: "Was ist der Digitale Produktpass (DPP)?",
    answer: "Der Digitale Produktpass ist ein EU-weites System zur Erfassung von Nachhaltigkeitsdaten entlang der gesamten Wertschöpfungskette. Er enthält Informationen zu Materialzusammensetzung, Recyclingfähigkeit, CO₂-Fußabdruck und Reparierbarkeit. Ab 2027 gilt er zunächst für Industriebatterien, danach schrittweise für Textilien, Elektronik und weitere Produktkategorien.",
    category: "DPP",
  },

  /* ── eIDAS ── */
  {
    question: "Was ist die EU Digital Identity Wallet?",
    answer: "Die EU Digital Identity Wallet (eIDAS 2.0) ermöglicht EU-Bürgern, sich digital auszuweisen — grenzüberschreitend und für private wie öffentliche Dienste. Mitgliedstaaten müssen die Wallet bis Mai 2026 bereitstellen. Unternehmen, die Online-Dienste anbieten, müssen die Wallet als Identifizierungsmethode akzeptieren. Die Wallet speichert auch Führerscheine, Diplome und andere verifizierte Dokumente.",
    category: "eIDAS",
  },

  /* ── MiCA ── */
  {
    question: "Was regelt die MiCA-Verordnung?",
    answer: "MiCA (Markets in Crypto-Assets) ist die EU-weite Regulierung für Kryptoassets. Sie schafft einheitliche Regeln für Emittenten von Kryptowerten und Dienstleister (CASPs). Stablecoin-Emittenten müssen Reserven vorhalten und Rücknahmerechte garantieren. CASPs benötigen eine Zulassung und müssen Geldwäscheprävention, Kundenschutz und Offenlegungspflichten erfüllen. MiCA gilt seit Dezember 2024 für Stablecoins und seit Juni 2025 vollständig.",
    category: "MiCA",
  },
  {
    question: "Brauche ich als Krypto-Dienstleister eine MiCA-Lizenz?",
    answer: "Ja, seit Juni 2025 benötigen alle Crypto-Asset Service Provider (CASPs) in der EU eine MiCA-Zulassung. Das umfasst Kryptobörsen, Wallet-Anbieter, Handelsplattformen, Verwahrer und Berater. Bestehende Anbieter mit nationaler Lizenz können eine Übergangsfrist von bis zu 18 Monaten nutzen. Ohne Zulassung drohen empfindliche Bußgelder und ein Tätigkeitsverbot in der EU.",
    category: "MiCA",
  },

  /* ── EHDS ── */
  {
    question: "Was ist der European Health Data Space (EHDS)?",
    answer: "Der EHDS schafft einen einheitlichen EU-Rahmen für die Nutzung von Gesundheitsdaten. Er regelt die Primärnutzung (Patienten erhalten EU-weit Zugang zu ihren Gesundheitsdaten) und die Sekundärnutzung (anonymisierte Daten für Forschung, Innovation und Gesundheitspolitik). Hersteller elektronischer Patientendatensysteme müssen Interoperabilitäts- und Zertifizierungsanforderungen erfüllen.",
    category: "EHDS",
  },

  /* ── ePrivacy ── */
  {
    question: "Was ändert sich mit der ePrivacy-Verordnung gegenüber der DSGVO?",
    answer: "Die geplante ePrivacy-Verordnung soll die veraltete E-Privacy-Richtlinie ablösen und die DSGVO im Bereich elektronischer Kommunikation ergänzen. Sie regelt spezifisch Cookies, Tracking, Direktmarketing per E-Mail und Metadaten. Anders als die DSGVO, die allgemein personenbezogene Daten schützt, fokussiert ePrivacy auf den Schutz der Vertraulichkeit elektronischer Kommunikation — auch nicht-personenbezogene Inhalte sind geschützt.",
    category: "ePrivacy",
  },

  /* ── Produkthaftung ── */
  {
    question: "Was ändert die neue EU-Produkthaftungsrichtlinie?",
    answer: "Die überarbeitete Produkthaftungsrichtlinie (2024/2853) erweitert den Produktbegriff erstmals auf Software und KI-Systeme. Geschädigte müssen nicht mehr das Verschulden des Herstellers nachweisen (verschuldensunabhängige Haftung). Neu: digitale Fertigungsunterlagen wie 3D-Druck-Dateien fallen ebenfalls unter die Richtlinie. Die Beweislast wird bei technisch komplexen Produkten zugunsten der Geschädigten erleichtert. Umsetzungsfrist: Dezember 2026.",
    category: "Produkthaftung",
  },

  /* ── NIS2 Deep Dive ── */
  {
    question: "Was passiert, wenn ich NIS2-Vorfälle nicht melde?",
    answer: "Die Meldepflichten unter NIS2 sind streng: Eine Frühwarnung muss binnen 24 Stunden, ein vollständiger Bericht binnen 72 Stunden und ein Abschlussbericht binnen eines Monats erfolgen. Bei Nichtmeldung drohen Bußgelder bis 10 Mio. € oder 2% des Jahresumsatzes. Zusätzlich können die Aufsichtsbehörden die Geschäftsleitung temporär von ihren Aufgaben entheben.",
    category: "NIS2",
  },

  /* ── AI Act Deep Dive ── */
  {
    question: "Wie hoch sind die Bußgelder beim AI Act?",
    answer: "Der AI Act sieht ein dreistufiges Bußgeldsystem vor: Bis zu 35 Mio. € oder 7% des weltweiten Jahresumsatzes für verbotene KI-Praktiken. Bis zu 15 Mio. € oder 3% für Verstöße gegen Hochrisiko-Anforderungen. Bis zu 7,5 Mio. € oder 1,5% für fehlerhafte Informationen an Behörden. Für KMU und Start-ups gelten reduzierte Obergrenzen.",
    category: "AI Act",
  },

  /* ── CSRD Deep Dive ── */
  {
    question: "Was sind die ESRS und wie wende ich sie an?",
    answer: "Die European Sustainability Reporting Standards (ESRS) sind die verbindlichen Berichtsstandards unter der CSRD. Sie umfassen 12 Standards: 2 übergreifende (ESRS 1, ESRS 2) und 10 themenspezifische zu Umwelt (E1-E5), Soziales (S1-S4) und Governance (G1). Der erste Schritt ist die doppelte Wesentlichkeitsanalyse: Welche Nachhaltigkeitsthemen sind für Ihr Unternehmen finanziell relevant und wo hat Ihr Unternehmen Auswirkungen auf Umwelt und Gesellschaft?",
    category: "CSRD",
  },

  /* ── DSGVO Deep Dive ── */
  {
    question: "Was ist eine Datenschutz-Folgenabschätzung (DSFA)?",
    answer: "Eine DSFA ist bei Datenverarbeitungen mit voraussichtlich hohem Risiko für Betroffene verpflichtend — etwa bei Profiling, umfangreicher Videoüberwachung oder der Verarbeitung besonderer Kategorien personenbezogener Daten. Sie muss die Verarbeitungsvorgänge, Risiken und Abhilfemaßnahmen systematisch dokumentieren. Ergibt die DSFA ein hohes Restrisiko, muss vor der Verarbeitung die Datenschutzbehörde konsultiert werden.",
    category: "DSGVO",
  },

  /* ── DORA Deep Dive ── */
  {
    question: "Was ist das IKT-Drittanbieter-Register unter DORA?",
    answer: "DORA verpflichtet Finanzunternehmen, ein vollständiges Register aller IKT-Drittanbieter-Verträge zu führen. Dieses Register muss u.a. den Anbieter, die erbrachten Dienste, Sub-Outsourcing-Ketten, Standorte der Datenverarbeitung und die Kritikalität der Funktion dokumentieren. Das Register wird den Aufsichtsbehörden auf Anforderung übermittelt. Die erste vollständige Meldung war bis 2025 fällig.",
    category: "DORA",
  },

  /* ── Allgemein/Strategie ── */
  {
    question: "Wie starte ich am besten mit der EU-Compliance?",
    answer: "Ein systematischer Einstieg erfolgt in fünf Schritten: 1. Betroffenheitsanalyse — welche Regulierungen sind relevant? Nutzen Sie unseren Regulierung-Finder. 2. Gap-Analyse — wo steht Ihr Unternehmen aktuell? Der Reifegrad-Check hilft. 3. Priorisierung — dringendste Fristen zuerst (Fristen-Radar). 4. Maßnahmenplan mit Verantwortlichkeiten und Budget. 5. Laufende Überwachung und regelmäßige Audits. Beginnen Sie mit der Regulierung mit der nächsten Frist.",
    category: "Allgemein",
  },

  /* ── Plattform ── */
  {
    question: "Ist EU Compliance Hub eine Rechtsberatung?",
    answer: "Nein. EU Compliance Hub ist ein unabhängiges Informationsportal. Alle Inhalte dienen der allgemeinen Information und stellen keine Rechtsberatung dar. Für verbindliche Rechtsauskünfte und die konkrete Umsetzung empfehlen wir die Konsultation spezialisierter Rechtsanwälte oder Compliance-Berater. Über unsere Kontaktseite können Sie eine kostenlose Ersteinschätzung anfragen.",
    category: "Plattform",
  },
  {
    question: "Welche interaktiven Tools bietet die Plattform?",
    answer: "EU Compliance Hub bietet acht kostenlose Tools: Den Regulierung-Finder (ermittelt, welche EU-Gesetze für Sie gelten), die Compliance-Checkliste (interaktive Pflichten pro Regulierung), den Kosten-Kalkulator (schätzt Implementierungskosten), den Reifegrad-Check (bewertet Ihre Compliance-Reife), den NIS2-Betroffenheits-Check, den Haftungs-Prüfer (persönliche Haftungsrisiken), den Bußgeld-Rechner und den Regulierungsvergleich. Alle Tools sind ohne Registrierung nutzbar.",
    category: "Plattform",
  },
];

/* ── FAQ JSON-LD ── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: SITE_NAME, item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "FAQ", item: `${BASE_URL}/faq` },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FAQContent faqData={faqData} />
    </>
  );
}
