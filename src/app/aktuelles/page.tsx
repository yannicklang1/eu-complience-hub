import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import AktuellesContent from "./AktuellesContent";

export const metadata: Metadata = {
  title: "Aktuelles – EU-Compliance News & Regulierungsupdates",
  description:
    "Aktuelle Nachrichten zu EU-Regulierungen: NIS2, AI Act, DORA, DSGVO, CRA, CSRD und mehr. Gesetzesänderungen, Fristen und Entwicklungen auf einen Blick.",
  keywords:
    "EU Compliance News, NIS2 Aktuelles, AI Act Update, DORA News, Compliance Nachrichten, EU Regulierung Updates, DSGVO News, CRA Updates",
  openGraph: {
    title: "Aktuelles – EU-Compliance News & Updates",
    description:
      "Aktuelle Nachrichten und Updates zu EU-Regulierungen auf einen Blick.",
    url: `${BASE_URL}/aktuelles`,
  },
  alternates: {
    canonical: `${BASE_URL}/aktuelles`,
  },
};

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  regulation: string;
  type: "gesetz" | "frist" | "urteil" | "update" | "leitlinie";
  href?: string;
  important?: boolean;
}

export const newsItems: NewsItem[] = [
  {
    id: "nisg-2026-veroeffentlicht",
    date: "2025-06-25",
    title: "NISG 2026 im Bundesgesetzblatt veröffentlicht",
    summary:
      "Das Netz- und Informationssystemsicherheitsgesetz 2026 (BGBl. I Nr. 94/2025) wurde offiziell kundgemacht. Inkrafttreten am 1. Oktober 2026. Registrierungspflicht bis 31. Dezember 2026.",
    regulation: "NIS2",
    type: "gesetz",
    href: "/nisg-2026",
    important: true,
  },
  {
    id: "bafg-inkrafttreten",
    date: "2025-06-28",
    title: "Barrierefreiheitsgesetz (BaFG) tritt in Kraft",
    summary:
      "Ab dem 28. Juni 2025 müssen digitale Produkte und Dienstleistungen barrierefrei sein. Betroffen sind E-Commerce, Banking, Telekommunikation und Transportdienste.",
    regulation: "BaFG",
    type: "frist",
    href: "/bafg",
    important: true,
  },
  {
    id: "ai-act-verbote-anwendbar",
    date: "2025-02-02",
    title: "EU AI Act: Verbotene KI-Praktiken ab sofort anwendbar",
    summary:
      "Kapitel II des EU AI Act ist seit dem 2. Februar 2025 anwendbar. Verboten sind u.a. Social Scoring, unterschwellige Manipulation und biometrische Echtzeit-Kategorisierung in öffentlichen Räumen.",
    regulation: "AI Act",
    type: "frist",
    href: "/eu-ai-act",
    important: true,
  },
  {
    id: "ai-act-gpai-regeln",
    date: "2025-08-02",
    title: "AI Act: Regeln für General-Purpose AI ab August 2025",
    summary:
      "Ab August 2025 gelten Transparenzpflichten für Anbieter von Allzweck-KI-Modellen (GPAI). Modelle mit systemischem Risiko unterliegen zusätzlichen Evaluierungspflichten.",
    regulation: "AI Act",
    type: "frist",
    href: "/eu-ai-act",
  },
  {
    id: "dora-anwendbar",
    date: "2025-01-17",
    title: "DORA seit 17. Januar 2025 vollständig anwendbar",
    summary:
      "Der Digital Operational Resilience Act gilt nun für alle Finanzunternehmen in der EU. IKT-Risikomanagement, Vorfallsmeldungen und Digital Operational Resilience Testing sind Pflicht.",
    regulation: "DORA",
    type: "frist",
    href: "/dora",
    important: true,
  },
  {
    id: "data-act-anwendbar",
    date: "2025-09-12",
    title: "Data Act ab September 2025 anwendbar",
    summary:
      "Der EU Data Act wird ab dem 12. September 2025 anwendbar. IoT-Hersteller müssen Nutzern Zugang zu generierten Daten gewähren. Cloud-Switching-Regeln greifen ebenfalls.",
    regulation: "Data Act",
    type: "frist",
    href: "/data-act",
  },
  {
    id: "cra-meldepflichten",
    date: "2026-09-11",
    title: "CRA Phase 1: Meldepflichten für Schwachstellen",
    summary:
      "Ab September 2026 müssen Hersteller aktiv ausgenutzte Schwachstellen innerhalb von 24 Stunden an die ENISA melden. Die vollständigen Anforderungen greifen ab 2027.",
    regulation: "CRA",
    type: "frist",
    href: "/cra",
  },
  {
    id: "csrd-at-umsetzung",
    date: "2025-12-31",
    title: "CSRD: Erste AT-Berichte für große Unternehmen fällig",
    summary:
      "Große kapitalmarktorientierte Unternehmen mit über 500 Mitarbeitern müssen erstmals nach den European Sustainability Reporting Standards (ESRS) berichten.",
    regulation: "CSRD",
    type: "frist",
    href: "/csrd-esg",
  },
  {
    id: "eidas-wallet-timeline",
    date: "2026-05-20",
    title: "eIDAS 2.0: EU Digital Identity Wallet ab Mai 2026",
    summary:
      "Mitgliedstaaten müssen bis Mai 2026 eine EU Digital Identity Wallet bereitstellen. Bürger können dann EU-weit einen digitalen Identitätsnachweis nutzen.",
    regulation: "eIDAS",
    type: "frist",
    href: "/eidas",
  },
  {
    id: "mica-vollregulierung",
    date: "2024-12-30",
    title: "MiCA: Krypto-Asset-Regulierung vollständig in Kraft",
    summary:
      "Die Markets in Crypto-Assets Regulation ist seit Ende Dezember 2024 vollständig anwendbar. Krypto-Dienstleister benötigen nun eine Lizenz in der EU.",
    regulation: "MiCA",
    type: "gesetz",
    href: "/mica",
  },
  {
    id: "dsa-kmu-pflichten",
    date: "2024-02-17",
    title: "DSA: Pflichten für alle Online-Vermittlungsdienste",
    summary:
      "Der Digital Services Act gilt seit Februar 2024 für alle Online-Vermittlungsdienste — auch KMUs. Pflichten umfassen Transparenzberichte, Beschwerdemechanismen und Inhalte-Moderation.",
    regulation: "DSA",
    type: "gesetz",
    href: "/dsa",
  },
  {
    id: "produkthaftung-software",
    date: "2027-12-09",
    title: "Neue Produkthaftungsrichtlinie: Software als Produkt",
    summary:
      "Ab Dezember 2027 gilt Software explizit als Produkt im Sinne der Produkthaftungsrichtlinie. Hersteller haften für Schäden durch fehlerhafte Software und KI-Systeme.",
    regulation: "PLD",
    type: "frist",
    href: "/produkthaftung",
  },
  {
    id: "green-claims-richtlinie",
    date: "2026-03-27",
    title: "Green Claims: Greenwashing wird strafbar",
    summary:
      "Die EU-Richtlinie gegen Greenwashing verbietet pauschale Umweltaussagen wie 'klimaneutral' ohne wissenschaftlichen Nachweis. Mitgliedstaaten müssen bis März 2026 umsetzen.",
    regulation: "Green Claims",
    type: "gesetz",
    href: "/green-claims",
  },
  {
    id: "dpp-batterien",
    date: "2027-02-18",
    title: "Digitaler Produktpass: Erst für Batterien, dann für alle",
    summary:
      "Ab Februar 2027 müssen Industriebatterien mit einem digitalen Produktpass (DPP) ausgestattet werden. Weitere Produktkategorien folgen ab 2028.",
    regulation: "DPP",
    type: "frist",
    href: "/digitaler-produktpass",
  },
  {
    id: "eprivacy-verordnung-status",
    date: "2025-03-15",
    title: "ePrivacy-Verordnung: Weiterhin im Trilog-Verfahren",
    summary:
      "Die geplante ePrivacy-Verordnung steckt weiterhin im EU-Gesetzgebungsverfahren fest. Bis zum Inkrafttreten bleibt die ePrivacy-Richtlinie von 2002 (geändert 2009) der geltende Rechtsrahmen für elektronische Kommunikation.",
    regulation: "ePrivacy",
    type: "update",
    href: "/eprivacy",
  },
  {
    id: "hschg-evaluierung",
    date: "2025-07-17",
    title: "HSchG: 2-Jahres-Evaluierung abgeschlossen",
    summary:
      "Das Hinweisgeberschutzgesetz (HSchG) ist seit Februar 2023 in Kraft. Die EU-Kommission evaluiert die Umsetzung der Whistleblower-Richtlinie in den Mitgliedstaaten — erste Verschärfungen werden diskutiert.",
    regulation: "HSchG",
    type: "update",
    href: "/hschg",
  },
  {
    id: "ai-act-hochrisiko-2026",
    date: "2026-08-02",
    title: "AI Act: Hochrisiko-KI-Systeme vollständig reguliert",
    summary:
      "Ab August 2026 gelten alle Pflichten für Hochrisiko-KI-Systeme nach Anhang III des AI Act: Konformitätsbewertung, CE-Kennzeichnung, technische Dokumentation und Post-Market-Monitoring.",
    regulation: "AI Act",
    type: "frist",
    href: "/eu-ai-act",
    important: true,
  },
  {
    id: "nisg-registrierung-frist",
    date: "2026-12-31",
    title: "NISG 2026: Registrierungsfrist für betroffene Einrichtungen",
    summary:
      "Bis Ende Dezember 2026 müssen sich alle wesentlichen und wichtigen Einrichtungen beim BMI registrieren. Die Registrierungsplattform wird voraussichtlich ab Oktober 2026 verfügbar sein.",
    regulation: "NIS2",
    type: "frist",
    href: "/nisg-2026",
    important: true,
  },
  {
    id: "ehds-verabschiedet",
    date: "2025-03-11",
    title: "EHDS: Europäischer Gesundheitsdatenraum verabschiedet",
    summary:
      "Das EU-Parlament hat den European Health Data Space (EHDS) verabschiedet. Patienten erhalten EU-weiten Zugang zu ihren Gesundheitsdaten. Für Sekundärnutzung gelten strenge Pseudonymisierungspflichten.",
    regulation: "EHDS",
    type: "gesetz",
    href: "/ehds",
  },
  {
    id: "csrd-kmu-welle",
    date: "2026-01-01",
    title: "CSRD: Zweite Welle — große nicht-kapitalmarktnahe Unternehmen",
    summary:
      "Ab Januar 2026 müssen auch große Unternehmen (über 250 Mitarbeiter, über 50 Mio. Umsatz) die CSRD-Berichtspflichten erfüllen — unabhängig von einer Kapitalmarktnotierung.",
    regulation: "CSRD",
    type: "frist",
    href: "/csrd-esg",
    important: true,
  },
  {
    id: "dsgvo-ai-enforcement",
    date: "2025-05-20",
    title: "DSGVO: Datenschutzbehörden verstärken KI-Aufsicht",
    summary:
      "Europäische Datenschutzbehörden intensivieren die Prüfung von KI-Systemen im Hinblick auf DSGVO-Konformität. Schwerpunkte sind automatisierte Entscheidungsfindung, Zweckbindung bei Trainingsdaten und Recht auf Erklärung.",
    regulation: "DSGVO",
    type: "update",
    href: "/dsgvo",
  },
  {
    id: "dpp-textil-2027",
    date: "2027-07-01",
    title: "Digitaler Produktpass: Textilbranche ab Mitte 2027",
    summary:
      "Nach Batterien wird der Digitale Produktpass (DPP) auf die Textilbranche ausgeweitet. Hersteller müssen Nachhaltigkeitsdaten entlang der gesamten Lieferkette digital bereitstellen.",
    regulation: "DPP",
    type: "frist",
    href: "/digitaler-produktpass",
  },
  {
    id: "dsa-vlops-enforcement",
    date: "2025-04-10",
    title: "DSA: EU-Kommission verhängt erste Sanktionen gegen VLOPs",
    summary:
      "Die EU-Kommission hat erstmals formelle Verfahren gegen Very Large Online Platforms (VLOPs) wegen DSA-Verstößen eingeleitet. Betroffen sind systemische Risikobewertungen und Transparenzberichte.",
    regulation: "DSA",
    type: "update",
    href: "/dsa",
  },
  {
    id: "cra-sbom-standard",
    date: "2025-07-15",
    title: "CRA: EU einigt sich auf SBOM-Standardformat",
    summary:
      "Die EU-Kommission empfiehlt CycloneDX als bevorzugtes Format für die unter dem Cyber Resilience Act verpflichtende Software Bill of Materials (SBOM). Hersteller sollten schon jetzt SBOM-Prozesse aufsetzen.",
    regulation: "CRA",
    type: "leitlinie",
    href: "/cra",
  },
  {
    id: "dora-ikt-register-frist",
    date: "2026-03-13",
    title: "DORA: Frist für IKT-Drittparteienregister",
    summary:
      "Finanzunternehmen müssen bis zum 13. März 2026 ein vollständiges Register aller IKT-Drittanbieter bei der Aufsichtsbehörde einreichen. Die FMA hat Meldeformulare veröffentlicht.",
    regulation: "DORA",
    type: "frist",
    important: true,
    href: "/dora",
  },
  {
    id: "mica-stablecoin-reserven",
    date: "2025-06-30",
    title: "MiCA: Neue Leitlinien für Stablecoin-Reserveanforderungen",
    summary:
      "Die EBA hat detaillierte technische Standards für Asset-Referenced Tokens veröffentlicht. Stablecoin-Emittenten müssen Reserven bei EU-Kreditinstituten halten und regelmäßig melden.",
    regulation: "MiCA",
    type: "leitlinie",
    href: "/mica",
  },
  {
    id: "ai-act-sandbox-at",
    date: "2025-08-01",
    title: "AI Act: Österreich plant KI-Regulierungssandbox",
    summary:
      "Das BMF plant eine regulatorische Sandbox für KI-Innovation in Österreich. Unternehmen können KI-Systeme unter Aufsicht testen, bevor die Vollpflichten des AI Act greifen.",
    regulation: "AI Act",
    type: "update",
    href: "/eu-ai-act",
  },
  {
    id: "nisg-bmf-leitfaden",
    date: "2025-09-01",
    title: "NISG 2026: BMI veröffentlicht Registrierungsleitfaden",
    summary:
      "Das Bundesministerium für Inneres hat einen Praxisleitfaden zur NISG-Registrierung veröffentlicht. Enthalten sind Checklisten, FAQs und das elektronische Registrierungsformular für betroffene Einrichtungen.",
    regulation: "NIS2",
    type: "leitlinie",
    important: true,
    href: "/nisg-2026",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: SITE_NAME, item: BASE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Aktuelles",
      item: `${BASE_URL}/aktuelles`,
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "EU-Compliance News & Updates",
  description: "Aktuelle Nachrichten zu EU-Regulierungen: Gesetzesänderungen, Fristen und Entwicklungen.",
  numberOfItems: newsItems.length,
  itemListElement: newsItems
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.title,
      url: item.href ? `${BASE_URL}${item.href}` : undefined,
    })),
};

export default function AktuellesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <AktuellesContent newsItems={newsItems} />
    </>
  );
}
