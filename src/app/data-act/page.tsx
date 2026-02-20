import type { Metadata } from "next";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "EU Data Act – Datenzugangsrechte & Cloud-Switching Guide 2026",
  description:
    "Data Act komplett erklärt: IoT-Datenzugang, B2B-Datenweitergabe, Cloud-Switching, faire Vertragsklauseln, Notfall-Datenzugang für Behörden. Gilt ab 12. September 2025.",
  keywords:
    "Data Act, Verordnung 2023/2854, IoT Daten EU, Cloud Switching, Datenzugang Recht, B2B Datenweitergabe, FRAND, Smart Products Daten, Data Act Compliance",
  openGraph: {
    title: "EU Data Act – Datenzugangsrechte & Cloud-Switching Guide 2026",
    description:
      "Data-Act-Pflichten: IoT-Datenzugang, Cloud-Switching-Recht, faire Vertragsklauseln und Compliance-Fahrplan.",
    url: "https://eu-compliance-hub.eu/data-act",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/data-act",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EU Data Act – Datenzugangsrechte & Cloud-Switching Guide 2026",
  description:
    "Data Act erklärt: IoT-Datenzugang, B2B-Datenweitergabe, Cloud-Switching und Interoperabilität.",
  url: "https://eu-compliance-hub.eu/data-act",
  datePublished: "2026-02-20",
  dateModified: "2026-02-20",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://eu-compliance-hub.eu/data-act" },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2023/2854 – Data Act",
    legislationIdentifier: "(EU) 2023/2854",
  },
};

export default function DataActPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GuideContent />
    </>
  );
}
