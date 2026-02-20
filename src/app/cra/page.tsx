import type { Metadata } from "next";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "Cyber Resilience Act (CRA) – Vollständiger Guide",
  description:
    "Cyber Resilience Act komplett erklärt: Security by Design, SBOM-Pflicht, Produktkategorien, CE-Kennzeichnung, Schwachstellenmanagement, Strafen bis 15 Mio. €. Guide für Hersteller, Importeure & Händler.",
  keywords:
    "CRA, Cyber Resilience Act, Verordnung 2024/2847, Security by Design, SBOM, CE-Kennzeichnung, IoT-Sicherheit, Produktsicherheit, Schwachstellenmanagement, EU Cybersecurity",
  openGraph: {
    title: "Cyber Resilience Act (CRA) – Vollständiger Guide",
    description:
      "Security by Design, SBOM-Pflicht, Produktkategorien, Strafen & Compliance-Fahrplan des Cyber Resilience Act.",
    url: "https://eu-compliance-hub.eu/cra",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/cra",
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Cyber Resilience Act (CRA) – Vollständiger Guide",
  description:
    "Cyber Resilience Act komplett erklärt: Security by Design, SBOM-Pflicht, Produktkategorien, CE-Kennzeichnung und Compliance-Fahrplan.",
  url: "https://eu-compliance-hub.eu/cra",
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
    "@id": "https://eu-compliance-hub.eu/cra",
  },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2024/2847 – Cyber Resilience Act",
    legislationIdentifier: "(EU) 2024/2847",
  },
};

export default function CRAPage() {
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
