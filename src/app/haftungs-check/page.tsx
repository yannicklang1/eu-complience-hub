import type { Metadata } from "next";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "Geschäftsführer-Haftung – Persönliche Risiken bei EU-Compliance-Verstößen",
  description:
    "Geschäftsführer-Haftung bei NIS2, DORA, AI Act & CRA: Wann haften Sie persönlich? Organhaftung, Bußgelder, Sorgfaltspflichten und Enthaftungsstrategien im Überblick.",
  keywords:
    "Geschäftsführer-Haftung, Organhaftung, persönliche Haftung, NIS2, NISG 2026, DORA, AI Act, CRA, Compliance, Sorgfaltspflicht, Geschäftsleitung, Vorstand",
  openGraph: {
    title: "Geschäftsführer-Haftung – Persönliche Risiken bei EU-Compliance-Verstößen",
    description:
      "NIS2, DORA, AI Act, CRA: Wann haften Geschäftsführer persönlich? Organhaftung, Bußgelder & Enthaftungsstrategien.",
    url: "https://eu-compliance-hub.eu/haftungs-check",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/haftungs-check",
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Geschäftsführer-Haftung bei EU-Compliance-Verstößen",
  description:
    "Geschäftsführer-Haftung bei NIS2, DORA, AI Act & CRA: Organhaftung, Bußgelder, Sorgfaltspflichten und Enthaftungsstrategien.",
  url: "https://eu-compliance-hub.eu/haftungs-check",
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
    "@id": "https://eu-compliance-hub.eu/haftungs-check",
  },
};

export default function HaftungsCheckPage() {
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
