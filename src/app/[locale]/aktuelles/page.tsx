import { createElement } from "react";
import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import dynamic from "next/dynamic";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import AktuellesContent from "./AktuellesContent";

const AktuellesContentEN = dynamic(() => import("./AktuellesContent.en"), { ssr: true });

/* Map locale -> component (fallback to DE) */
const CONTENT_MAP: Record<string, React.ComponentType<{ newsItems: NewsItem[] }>> = {
  en: AktuellesContentEN as React.ComponentType<{ newsItems: NewsItem[] }>,
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/* -- Per-locale metadata -- */

interface MetaStrings {
  title: string;
  description: string;
  ogDescription: string;
  keywords: string;
}

const META: Partial<Record<Locale, MetaStrings>> = {
  de: {
    title: "Aktuelles \u2013 EU-Compliance News & Regulierungsupdates",
    description:
      "Aktuelle Nachrichten zu EU-Regulierungen: NIS2, AI Act, DORA, DSGVO, CRA, CSRD und mehr. Gesetzesänderungen, Fristen und Entwicklungen auf einen Blick.",
    ogDescription:
      "Aktuelle Nachrichten und Updates zu EU-Regulierungen auf einen Blick.",
    keywords:
      "EU Compliance News, NIS2 Aktuelles, AI Act Update, DORA News, Compliance Nachrichten, EU Regulierung Updates, DSGVO News, CRA Updates",
  },
  en: {
    title: "News \u2013 EU Compliance News & Regulatory Updates",
    description:
      "Latest news on EU regulations: NIS2, AI Act, DORA, GDPR, CRA, CSRD and more. Legislative changes, deadlines and developments at a glance.",
    ogDescription:
      "Latest news and updates on EU regulations at a glance.",
    keywords:
      "EU compliance news, NIS2 news, AI Act update, DORA news, compliance news, EU regulation updates, GDPR news, CRA updates",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const m = META[loc] ?? META.de!;

  const slug = "aktuelles";
  const canonical = `${BASE_URL}/${locale}/${slug}`;

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE_URL}/${l}/${slug}`;
  }
  languages["x-default"] = `${BASE_URL}/de/${slug}`;

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    openGraph: {
      title: m.title,
      description: m.ogDescription,
      url: canonical,
      locale: LOCALE_OG[loc] ?? "de_AT",
      alternateLocale: LOCALES.filter((l) => l !== loc).map((l) => LOCALE_OG[l]),
    },
    alternates: {
      canonical,
      languages,
    },
  };
}

/* ── News Data ── */

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
    title: "NISG 2026 im Bundesgesetzblatt ver\u00f6ffentlicht",
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
      "Ab dem 28. Juni 2025 m\u00fcssen digitale Produkte und Dienstleistungen barrierefrei sein. Betroffen sind E-Commerce, Banking, Telekommunikation und Transportdienste.",
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
      "Kapitel II des EU AI Act ist seit dem 2. Februar 2025 anwendbar. Verboten sind u.a. Social Scoring, unterschwellige Manipulation und biometrische Echtzeit-Kategorisierung in \u00f6ffentlichen R\u00e4umen.",
    regulation: "AI Act",
    type: "frist",
    href: "/eu-ai-act",
    important: true,
  },
  {
    id: "ai-act-gpai-regeln",
    date: "2025-08-02",
    title: "AI Act: Regeln f\u00fcr General-Purpose AI ab August 2025",
    summary:
      "Ab August 2025 gelten Transparenzpflichten f\u00fcr Anbieter von Allzweck-KI-Modellen (GPAI). Modelle mit systemischem Risiko unterliegen zus\u00e4tzlichen Evaluierungspflichten.",
    regulation: "AI Act",
    type: "frist",
    href: "/eu-ai-act",
  },
  {
    id: "dora-anwendbar",
    date: "2025-01-17",
    title: "DORA seit 17. Januar 2025 vollst\u00e4ndig anwendbar",
    summary:
      "Der Digital Operational Resilience Act gilt nun f\u00fcr alle Finanzunternehmen in der EU. IKT-Risikomanagement, Vorfallsmeldungen und Digital Operational Resilience Testing sind Pflicht.",
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
      "Der EU Data Act wird ab dem 12. September 2025 anwendbar. IoT-Hersteller m\u00fcssen Nutzern Zugang zu generierten Daten gew\u00e4hren. Cloud-Switching-Regeln greifen ebenfalls.",
    regulation: "Data Act",
    type: "frist",
    href: "/data-act",
  },
  {
    id: "cra-meldepflichten",
    date: "2026-09-11",
    title: "CRA Phase 1: Meldepflichten f\u00fcr Schwachstellen",
    summary:
      "Ab September 2026 m\u00fcssen Hersteller aktiv ausgenutzte Schwachstellen innerhalb von 24 Stunden an die ENISA melden. Die vollst\u00e4ndigen Anforderungen greifen ab 2027.",
    regulation: "CRA",
    type: "frist",
    href: "/cra",
  },
  {
    id: "csrd-at-umsetzung",
    date: "2025-12-31",
    title: "CSRD: Erste AT-Berichte f\u00fcr gro\u00dfe Unternehmen f\u00e4llig",
    summary:
      "Gro\u00dfe kapitalmarktorientierte Unternehmen mit \u00fcber 500 Mitarbeitern m\u00fcssen erstmals nach den European Sustainability Reporting Standards (ESRS) berichten.",
    regulation: "CSRD",
    type: "frist",
    href: "/csrd-esg",
  },
  {
    id: "eidas-wallet-timeline",
    date: "2026-05-20",
    title: "eIDAS 2.0: EU Digital Identity Wallet ab Mai 2026",
    summary:
      "Mitgliedstaaten m\u00fcssen bis Mai 2026 eine EU Digital Identity Wallet bereitstellen. B\u00fcrger k\u00f6nnen dann EU-weit einen digitalen Identit\u00e4tsnachweis nutzen.",
    regulation: "eIDAS",
    type: "frist",
    href: "/eidas",
  },
  {
    id: "mica-vollregulierung",
    date: "2024-12-30",
    title: "MiCA: Krypto-Asset-Regulierung vollst\u00e4ndig in Kraft",
    summary:
      "Die Markets in Crypto-Assets Regulation ist seit Ende Dezember 2024 vollst\u00e4ndig anwendbar. Krypto-Dienstleister ben\u00f6tigen nun eine Lizenz in der EU.",
    regulation: "MiCA",
    type: "gesetz",
    href: "/mica",
  },
  {
    id: "dsa-kmu-pflichten",
    date: "2024-02-17",
    title: "DSA: Pflichten f\u00fcr alle Online-Vermittlungsdienste",
    summary:
      "Der Digital Services Act gilt seit Februar 2024 f\u00fcr alle Online-Vermittlungsdienste \u2014 auch KMUs. Pflichten umfassen Transparenzberichte, Beschwerdemechanismen und Inhalte-Moderation.",
    regulation: "DSA",
    type: "gesetz",
    href: "/dsa",
  },
  {
    id: "produkthaftung-software",
    date: "2027-12-09",
    title: "Neue Produkthaftungsrichtlinie: Software als Produkt",
    summary:
      "Ab Dezember 2027 gilt Software explizit als Produkt im Sinne der Produkthaftungsrichtlinie. Hersteller haften f\u00fcr Sch\u00e4den durch fehlerhafte Software und KI-Systeme.",
    regulation: "PLD",
    type: "frist",
    href: "/produkthaftung",
  },
  {
    id: "green-claims-richtlinie",
    date: "2026-03-27",
    title: "Green Claims: Greenwashing wird strafbar",
    summary:
      "Die EU-Richtlinie gegen Greenwashing verbietet pauschale Umweltaussagen wie \u2018klimaneutral\u2019 ohne wissenschaftlichen Nachweis. Mitgliedstaaten m\u00fcssen bis M\u00e4rz 2026 umsetzen.",
    regulation: "Green Claims",
    type: "gesetz",
    href: "/green-claims",
  },
  {
    id: "dpp-batterien",
    date: "2027-02-18",
    title: "Digitaler Produktpass: Erst f\u00fcr Batterien, dann f\u00fcr alle",
    summary:
      "Ab Februar 2027 m\u00fcssen Industriebatterien mit einem digitalen Produktpass (DPP) ausgestattet werden. Weitere Produktkategorien folgen ab 2028.",
    regulation: "DPP",
    type: "frist",
    href: "/digitaler-produktpass",
  },
  {
    id: "eprivacy-verordnung-status",
    date: "2025-03-15",
    title: "ePrivacy-Verordnung: Weiterhin im Trilog-Verfahren",
    summary:
      "Die geplante ePrivacy-Verordnung steckt weiterhin im EU-Gesetzgebungsverfahren fest. Bis zum Inkrafttreten bleibt die ePrivacy-Richtlinie von 2002 (ge\u00e4ndert 2009) der geltende Rechtsrahmen f\u00fcr elektronische Kommunikation.",
    regulation: "ePrivacy",
    type: "update",
    href: "/eprivacy",
  },
  {
    id: "hschg-evaluierung",
    date: "2025-07-17",
    title: "HSchG: 2-Jahres-Evaluierung abgeschlossen",
    summary:
      "Das Hinweisgeberschutzgesetz (HSchG) ist seit Februar 2023 in Kraft. Die EU-Kommission evaluiert die Umsetzung der Whistleblower-Richtlinie in den Mitgliedstaaten \u2014 erste Versch\u00e4rfungen werden diskutiert.",
    regulation: "HSchG",
    type: "update",
    href: "/hschg",
  },
  {
    id: "ai-act-hochrisiko-2026",
    date: "2026-08-02",
    title: "AI Act: Hochrisiko-KI-Systeme vollst\u00e4ndig reguliert",
    summary:
      "Ab August 2026 gelten alle Pflichten f\u00fcr Hochrisiko-KI-Systeme nach Anhang III des AI Act: Konformit\u00e4tsbewertung, CE-Kennzeichnung, technische Dokumentation und Post-Market-Monitoring.",
    regulation: "AI Act",
    type: "frist",
    href: "/eu-ai-act",
    important: true,
  },
  {
    id: "nisg-registrierung-frist",
    date: "2026-12-31",
    title: "NISG 2026: Registrierungsfrist f\u00fcr betroffene Einrichtungen",
    summary:
      "Bis Ende Dezember 2026 m\u00fcssen sich alle wesentlichen und wichtigen Einrichtungen beim BMI registrieren. Die Registrierungsplattform wird voraussichtlich ab Oktober 2026 verf\u00fcgbar sein.",
    regulation: "NIS2",
    type: "frist",
    href: "/nisg-2026",
    important: true,
  },
  {
    id: "ehds-verabschiedet",
    date: "2025-03-11",
    title: "EHDS: Europ\u00e4ischer Gesundheitsdatenraum verabschiedet",
    summary:
      "Das EU-Parlament hat den European Health Data Space (EHDS) verabschiedet. Patienten erhalten EU-weiten Zugang zu ihren Gesundheitsdaten. F\u00fcr Sekund\u00e4rnutzung gelten strenge Pseudonymisierungspflichten.",
    regulation: "EHDS",
    type: "gesetz",
    href: "/ehds",
  },
  {
    id: "csrd-kmu-welle",
    date: "2026-01-01",
    title: "CSRD: Zweite Welle \u2014 gro\u00dfe nicht-kapitalmarktnahe Unternehmen",
    summary:
      "Ab Januar 2026 m\u00fcssen auch gro\u00dfe Unternehmen (\u00fcber 250 Mitarbeiter, \u00fcber 50 Mio. Umsatz) die CSRD-Berichtspflichten erf\u00fcllen \u2014 unabh\u00e4ngig von einer Kapitalmarktnotierung.",
    regulation: "CSRD",
    type: "frist",
    href: "/csrd-esg",
    important: true,
  },
  {
    id: "dsgvo-ai-enforcement",
    date: "2025-05-20",
    title: "DSGVO: Datenschutzbeh\u00f6rden verst\u00e4rken KI-Aufsicht",
    summary:
      "Europ\u00e4ische Datenschutzbeh\u00f6rden intensivieren die Pr\u00fcfung von KI-Systemen im Hinblick auf DSGVO-Konformit\u00e4t. Schwerpunkte sind automatisierte Entscheidungsfindung, Zweckbindung bei Trainingsdaten und Recht auf Erkl\u00e4rung.",
    regulation: "DSGVO",
    type: "update",
    href: "/dsgvo",
  },
  {
    id: "dpp-textil-2027",
    date: "2027-07-01",
    title: "Digitaler Produktpass: Textilbranche ab Mitte 2027",
    summary:
      "Nach Batterien wird der Digitale Produktpass (DPP) auf die Textilbranche ausgeweitet. Hersteller m\u00fcssen Nachhaltigkeitsdaten entlang der gesamten Lieferkette digital bereitstellen.",
    regulation: "DPP",
    type: "frist",
    href: "/digitaler-produktpass",
  },
  {
    id: "dsa-vlops-enforcement",
    date: "2025-04-10",
    title: "DSA: EU-Kommission verh\u00e4ngt erste Sanktionen gegen VLOPs",
    summary:
      "Die EU-Kommission hat erstmals formelle Verfahren gegen Very Large Online Platforms (VLOPs) wegen DSA-Verst\u00f6\u00dfen eingeleitet. Betroffen sind systemische Risikobewertungen und Transparenzberichte.",
    regulation: "DSA",
    type: "update",
    href: "/dsa",
  },
  {
    id: "cra-sbom-standard",
    date: "2025-07-15",
    title: "CRA: EU einigt sich auf SBOM-Standardformat",
    summary:
      "Die EU-Kommission empfiehlt CycloneDX als bevorzugtes Format f\u00fcr die unter dem Cyber Resilience Act verpflichtende Software Bill of Materials (SBOM). Hersteller sollten schon jetzt SBOM-Prozesse aufsetzen.",
    regulation: "CRA",
    type: "leitlinie",
    href: "/cra",
  },
  {
    id: "dora-ikt-register-frist",
    date: "2026-03-13",
    title: "DORA: Frist f\u00fcr IKT-Drittparteienregister",
    summary:
      "Finanzunternehmen m\u00fcssen bis zum 13. M\u00e4rz 2026 ein vollst\u00e4ndiges Register aller IKT-Drittanbieter bei der Aufsichtsbeh\u00f6rde einreichen. Die FMA hat Meldeformulare ver\u00f6ffentlicht.",
    regulation: "DORA",
    type: "frist",
    important: true,
    href: "/dora",
  },
  {
    id: "mica-stablecoin-reserven",
    date: "2025-06-30",
    title: "MiCA: Neue Leitlinien f\u00fcr Stablecoin-Reserveanforderungen",
    summary:
      "Die EBA hat detaillierte technische Standards f\u00fcr Asset-Referenced Tokens ver\u00f6ffentlicht. Stablecoin-Emittenten m\u00fcssen Reserven bei EU-Kreditinstituten halten und regelm\u00e4\u00dfig melden.",
    regulation: "MiCA",
    type: "leitlinie",
    href: "/mica",
  },
  {
    id: "ai-act-sandbox-at",
    date: "2025-08-01",
    title: "AI Act: \u00d6sterreich plant KI-Regulierungssandbox",
    summary:
      "Das BMF plant eine regulatorische Sandbox f\u00fcr KI-Innovation in \u00d6sterreich. Unternehmen k\u00f6nnen KI-Systeme unter Aufsicht testen, bevor die Vollpflichten des AI Act greifen.",
    regulation: "AI Act",
    type: "update",
    href: "/eu-ai-act",
  },
  {
    id: "nisg-bmf-leitfaden",
    date: "2025-09-01",
    title: "NISG 2026: BMI ver\u00f6ffentlicht Registrierungsleitfaden",
    summary:
      "Das Bundesministerium f\u00fcr Inneres hat einen Praxisleitfaden zur NISG-Registrierung ver\u00f6ffentlicht. Enthalten sind Checklisten, FAQs und das elektronische Registrierungsformular f\u00fcr betroffene Einrichtungen.",
    regulation: "NIS2",
    type: "leitlinie",
    important: true,
    href: "/nisg-2026",
  },
];

/* -- Per-locale JSON-LD -- */

function buildJsonLd(locale: string) {
  const isEn = locale === "en";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${BASE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: isEn ? "News" : "Aktuelles",
        item: `${BASE_URL}/${locale}/aktuelles`,
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isEn ? "EU Compliance News & Updates" : "EU-Compliance News & Updates",
    description: isEn
      ? "Latest news on EU regulations: legislative changes, deadlines and developments."
      : "Aktuelle Nachrichten zu EU-Regulierungen: Gesetz\u00e4nderungen, Fristen und Entwicklungen.",
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

  return { breadcrumbJsonLd, itemListJsonLd };
}

export default async function AktuellesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { breadcrumbJsonLd, itemListJsonLd } = buildJsonLd(locale);

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
      {createElement(CONTENT_MAP[locale] ?? AktuellesContent, { newsItems })}
    </>
  );
}
