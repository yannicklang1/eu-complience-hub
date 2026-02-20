import type { Metadata } from "next";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "EHDS – Europäischer Gesundheitsdatenraum Guide 2026",
  description:
    "EHDS komplett erklärt: Pflichten für Gesundheitsdaten-Inhaber, EHR-Systeme, Primär- & Sekundärnutzung, Patientenrechte, Interoperabilität (HL7 FHIR). Guide für eHealth & Pharma.",
  keywords:
    "EHDS, European Health Data Space, Gesundheitsdatenraum, Verordnung 2025/327, eHealth Compliance, EHR System, Gesundheitsdaten EU, HL7 FHIR, Primärnutzung Sekundärnutzung",
  openGraph: {
    title: "EHDS – Europäischer Gesundheitsdatenraum Guide 2026",
    description:
      "EHDS-Pflichten: EHR-Systeme, Primär- & Sekundärnutzung von Gesundheitsdaten, Patientenrechte und Compliance-Fahrplan.",
    url: "https://eu-compliance-hub.eu/ehds",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/ehds",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EHDS – Europäischer Gesundheitsdatenraum Guide 2026",
  description:
    "EHDS erklärt: Pflichten für Gesundheitsdaten, EHR-Systeme, Patientenrechte und Interoperabilität nach HL7 FHIR.",
  url: "https://eu-compliance-hub.eu/ehds",
  datePublished: "2026-02-20",
  dateModified: "2026-02-20",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://eu-compliance-hub.eu/ehds" },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2025/327 – European Health Data Space",
    legislationIdentifier: "(EU) 2025/327",
  },
};

export default function EHDSPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GuideContent />
    </>
  );
}
