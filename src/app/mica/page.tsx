import type { Metadata } from "next";
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
    url: "https://eu-compliance-hub.eu/mica",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/mica",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "MiCA – Markets in Crypto-Assets Regulation Guide 2026",
  description:
    "MiCA erklärt: CASP-Lizenz, Whitepaper-Pflicht, Asset-Referenced Token, E-Money Token und Compliance-Fahrplan.",
  url: "https://eu-compliance-hub.eu/mica",
  datePublished: "2026-02-19",
  dateModified: "2026-02-19",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://eu-compliance-hub.eu/mica" },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2023/1114 – Markets in Crypto-Assets",
    legislationIdentifier: "(EU) 2023/1114",
  },
};

export default function MiCAPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GuideContent />
    </>
  );
}
