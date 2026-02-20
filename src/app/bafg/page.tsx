import type { Metadata } from "next";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "BaFG-Guide – Barrierefreiheitsgesetz komplett erklärt",
  description:
    "BaFG vollständig erklärt: European Accessibility Act, WCAG 2.1 AA, EN 301 549, betroffene Produkte & Dienste, Ausnahmen, Strafen bis 80.000 € und Compliance-Fahrplan. Praxisguide für österreichische Unternehmen.",
  keywords:
    "BaFG, Barrierefreiheitsgesetz, EAA, European Accessibility Act, WCAG, EN 301 549, Barrierefreiheit, Accessibility, digitale Barrierefreiheit, Österreich, E-Commerce",
  openGraph: {
    title: "BaFG-Guide – Barrierefreiheitsgesetz komplett erklärt",
    description:
      "European Accessibility Act in Österreich: WCAG-Anforderungen, betroffene Dienste, Ausnahmen & Compliance-Fahrplan.",
    url: "https://eu-compliance-hub.eu/bafg",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/bafg",
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "BaFG-Guide – Barrierefreiheitsgesetz komplett erklärt",
  description:
    "BaFG / European Accessibility Act in Österreich: WCAG-Anforderungen, betroffene Produkte & Dienste, Strafen und Compliance-Fahrplan.",
  url: "https://eu-compliance-hub.eu/bafg",
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
    "@id": "https://eu-compliance-hub.eu/bafg",
  },
  about: {
    "@type": "Legislation",
    name: "Richtlinie (EU) 2019/882 – European Accessibility Act / BaFG",
    legislationIdentifier: "(EU) 2019/882",
  },
};

export default function BaFGPage() {
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
