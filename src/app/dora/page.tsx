import type { Metadata } from "next";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "DORA – Digital Operational Resilience Act komplett erklärt",
  description:
    "DORA vollständig erklärt: IKT-Risikomanagement, Incident Reporting, Resilience Testing, Third-Party-Management. Guide für den europäischen Finanzsektor.",
  keywords:
    "DORA, Digital Operational Resilience Act, IKT-Risikomanagement, Finanzsektor, Cyber-Resilienz, FMA, Incident Reporting, TLPT, Third-Party",
  openGraph: {
    title: "DORA – Digital Operational Resilience Act komplett erklärt",
    description:
      "IKT-Risikomanagement, Incident Reporting, TLPT & Third-Party-Management für den Finanzsektor.",
    url: "https://eu-compliance-hub.eu/dora",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/dora",
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "DORA – Digital Operational Resilience Act komplett erklärt",
  description:
    "DORA vollständig erklärt: IKT-Risikomanagement, Incident Reporting, Resilience Testing und Third-Party-Management für den Finanzsektor.",
  url: "https://eu-compliance-hub.eu/dora",
  datePublished: "2026-02-18",
  dateModified: "2026-02-18",
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
    "@id": "https://eu-compliance-hub.eu/dora",
  },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2022/2554 – Digital Operational Resilience Act",
    legislationIdentifier: "(EU) 2022/2554",
  },
};

export default function DORAPage() {
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
