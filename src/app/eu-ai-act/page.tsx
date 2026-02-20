import type { Metadata } from "next";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "EU AI Act – Vollständiger Guide 2026",
  description:
    "EU AI Act komplett erklärt: Risikostufen, Fristen, Strafen bis 35 Mio. €, Pflichten für Hochrisiko-KI, Österreich-spezifische Umsetzung (RTR). Alles für Ihr Unternehmen.",
  keywords:
    "EU AI Act, KI-Verordnung, AI Act Österreich, Hochrisiko KI, KI Regulierung, AI Act Fristen, AI Act Strafen, RTR KI-Servicestelle, GPAI, KI Compliance",
  openGraph: {
    title: "EU AI Act – Vollständiger Guide 2026",
    description:
      "Risikostufen, Fristen, Pflichten & Strafen der EU KI-Verordnung. Für österreichische und europäische Unternehmen.",
    url: "https://eu-compliance-hub.eu/eu-ai-act",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/eu-ai-act",
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EU AI Act – Vollständiger Guide 2026",
  description:
    "EU AI Act komplett erklärt: Risikostufen, Fristen, Strafen bis 35 Mio. €, Pflichten für Hochrisiko-KI und Österreich-spezifische Umsetzung.",
  url: "https://eu-compliance-hub.eu/eu-ai-act",
  datePublished: "2026-02-01",
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
    "@id": "https://eu-compliance-hub.eu/eu-ai-act",
  },
  about: {
    "@type": "Legislation",
    name: "Regulation (EU) 2024/1689 – Artificial Intelligence Act",
    legislationIdentifier: "(EU) 2024/1689",
  },
};

export default function EuAiActPage() {
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
