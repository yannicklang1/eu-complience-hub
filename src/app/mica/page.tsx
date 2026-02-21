import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "MiCA – Markets in Crypto-Assets Regulation Guide 2026",
  description:
    "MiCA komplett erklärt: Lizenzpflichten für Krypto-Dienstleister, CASP-Lizenz, Asset-Referenced Token, E-Money Token, Whitepaper-Pflicht, Strafen bis 15 Mio. €. Guide für Krypto-Startups & FinTechs.",
  keywords:
    "MiCA, Markets in Crypto-Assets, Verordnung 2023/1114, CASP Lizenz, Krypto Regulierung EU, Asset-Referenced Token, E-Money Token, Krypto Compliance, VASP EU",
  openGraph: {
    title: "MiCA – Markets in Crypto-Assets Regulation Guide 2026",
    description:
      "CASP-Lizenzpflichten, Whitepaper-Anforderungen, ART/EMT-Regeln und Compliance-Fahrplan für Krypto-Unternehmen in der EU.",
    url: `${BASE_URL}/mica`,
  },
  alternates: {
    canonical: `${BASE_URL}/mica`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "MiCA – Markets in Crypto-Assets Regulation Guide 2026",
  description:
    "MiCA erklärt: CASP-Lizenz, Whitepaper-Pflicht, Asset-Referenced Token, E-Money Token und Compliance-Fahrplan.",
  url: `${BASE_URL}/mica`,
  datePublished: "2026-02-19",
  dateModified: "2026-02-20",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/mica` },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2023/1114 – Markets in Crypto-Assets",
    legislationIdentifier: "(EU) 2023/1114",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist MiCA und wen betrifft die Verordnung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MiCA (Markets in Crypto-Assets Regulation, Verordnung (EU) 2023/1114) ist das erste umfassende EU-Regulierungsrahmenwerk für Krypto-Assets. Es betrifft alle Anbieter von Krypto-Dienstleistungen (CASPs), Emittenten von Asset-Referenced Tokens (ARTs) und E-Money Tokens (EMTs) sowie Krypto-Börsen in der EU.",
      },
    },
    {
      "@type": "Question",
      name: "Brauche ich eine CASP-Lizenz unter MiCA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, alle Crypto-Asset Service Provider (CASPs) benötigen seit dem 30. Dezember 2024 eine Lizenz. Dazu zählen Krypto-Börsen, Custody-Anbieter, Broker, Berater und Portfolioverwalter. Bestehende Anbieter mit nationaler Genehmigung können eine Übergangsfrist von bis zu 18 Monaten nutzen.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Strafen drohen bei MiCA-Verstößen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bei Verstößen gegen MiCA drohen Bußgelder von bis zu 15 Mio. Euro oder 12,5 % des Jahresumsatzes (je nachdem, welcher Betrag höher ist). Für bestimmte Verstöße bei ARTs können die Strafen bis zu 5 Mio. Euro oder 3 % des Umsatzes betragen.",
      },
    },
    {
      "@type": "Question",
      name: "Seit wann gilt MiCA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MiCA trat stufenweise in Kraft: Die Vorschriften für Stablecoins (ARTs und EMTs) gelten seit dem 30. Juni 2024. Alle übrigen Bestimmungen — insbesondere die CASP-Lizenzpflicht — gelten seit dem 30. Dezember 2024. Nationale Übergangsfristen können bis Juni 2026 laufen.",
      },
    },
  ],
};

/* ── Breadcrumb Schema ── */
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "EU Compliance Hub",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "MiCA",
      item: `${BASE_URL}/mica`,
    },
  ],
};

export default function MiCAPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <GuideContent />
    </>
  );
}
