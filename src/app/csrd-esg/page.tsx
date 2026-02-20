import type { Metadata } from "next";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "CSRD/ESG-Guide – Nachhaltigkeitsberichterstattung komplett erklärt",
  description:
    "CSRD vollständig erklärt: ESRS Standards, Doppelte Wesentlichkeit, Omnibus I Änderungen, NaBeG Österreich, Strafen bis 100.000 € und Compliance-Fahrplan. Praxisguide für Unternehmen.",
  keywords:
    "CSRD, ESG, Nachhaltigkeitsbericht, ESRS, Double Materiality, NaBeG, Sustainability Reporting, NFRD, Corporate Sustainability, Omnibus, Nachhaltigkeitsberichterstattung, Österreich",
  openGraph: {
    title: "CSRD/ESG-Guide – Nachhaltigkeitsberichterstattung komplett erklärt",
    description:
      "ESRS Standards, Doppelte Wesentlichkeit, Omnibus I, NaBeG & Compliance-Fahrplan der EU-Nachhaltigkeitsberichterstattung.",
    url: "https://eu-compliance-hub.eu/csrd-esg",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/csrd-esg",
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "CSRD/ESG-Guide – Nachhaltigkeitsberichterstattung komplett erklärt",
  description:
    "CSRD vollständig erklärt: ESRS Standards, Doppelte Wesentlichkeit, Omnibus I, NaBeG Österreich und Compliance-Fahrplan.",
  url: "https://eu-compliance-hub.eu/csrd-esg",
  datePublished: "2026-02-19",
  dateModified: "2026-02-19",
  inLanguage: "de",
  author: {
    "@type": "Organization",
    name: "EU Compliance Hub",
    url: "https://eu-compliance-hub.eu",
  },
  publisher: {
    "@type": "Organization",
    name: "EU Compliance Hub",
    url: "https://eu-compliance-hub.eu",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://eu-compliance-hub.eu/csrd-esg",
  },
  about: {
    "@type": "Legislation",
    name: "Richtlinie (EU) 2022/2464 – Corporate Sustainability Reporting Directive (CSRD)",
    legislationIdentifier: "(EU) 2022/2464",
  },
};

export default function CSRDESGPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GuideContent />
    </>
  );
}
