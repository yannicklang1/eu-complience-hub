import type { Metadata } from "next";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "Digitaler Produktpass (DPP) – ESPR Guide 2026",
  description:
    "Digitaler Produktpass komplett erklärt: Welche Produkte ab wann betroffen sind, Datenanforderungen, QR-Code-Pflicht, ESPR-Verordnung, Strafen. Guide für Hersteller, Importeure & Händler.",
  keywords:
    "Digitaler Produktpass, DPP, ESPR, Ecodesign Regulation, Verordnung 2024/1781, Produktpass EU, Supply Chain Transparenz, Circulor, PLM Software",
  openGraph: {
    title: "Digitaler Produktpass (DPP) – ESPR Guide 2026",
    description:
      "Pflichtangaben, Produktkategorien, Fristen und Compliance-Fahrplan für den Digitalen Produktpass nach ESPR.",
    url: "https://eu-compliance-hub.eu/digitaler-produktpass",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/digitaler-produktpass",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Digitaler Produktpass (DPP) – ESPR Guide 2026",
  description:
    "Digitaler Produktpass: Produktkategorien, Datenanforderungen, QR-Code-Pflicht und Compliance-Fahrplan nach ESPR.",
  url: "https://eu-compliance-hub.eu/digitaler-produktpass",
  datePublished: "2026-02-19",
  dateModified: "2026-02-19",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://eu-compliance-hub.eu/digitaler-produktpass" },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2024/1781 – Ecodesign for Sustainable Products Regulation",
    legislationIdentifier: "(EU) 2024/1781",
  },
};

export default function DigitalerProduktpassPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GuideContent />
    </>
  );
}
