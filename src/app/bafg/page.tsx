import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
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
    url: `${BASE_URL}/bafg`,
  },
  alternates: {
    canonical: `${BASE_URL}/bafg`,
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "BaFG-Guide – Barrierefreiheitsgesetz komplett erklärt",
  description:
    "BaFG / European Accessibility Act in Österreich: WCAG-Anforderungen, betroffene Produkte & Dienste, Strafen und Compliance-Fahrplan.",
  url: `${BASE_URL}/bafg`,
  datePublished: "2026-02-19",
  dateModified: "2026-02-20",
  inLanguage: "de",
  author: {
    "@type": "Organization",
    name: "EU Compliance Hub",
    url: BASE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "EU Compliance Hub",
    url: BASE_URL,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${BASE_URL}/bafg`,
  },
  about: {
    "@type": "Legislation",
    name: "Richtlinie (EU) 2019/882 – European Accessibility Act / BaFG",
    legislationIdentifier: "(EU) 2019/882",
  },
};

/* ── FAQ Schema for Rich Snippets ── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist das BaFG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das Barrierefreiheitsstärkungsgesetz (BaFG) ist Österreichs Umsetzung des European Accessibility Act (Richtlinie (EU) 2019/882). Es verpflichtet Unternehmen, digitale Produkte und Dienstleistungen barrierefrei nach WCAG 2.1 Level AA und EN 301 549 zu gestalten.",
      },
    },
    {
      "@type": "Question",
      name: "Wer ist vom BaFG betroffen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Alle Unternehmen, die digitale Produkte oder Dienstleistungen in Österreich anbieten — darunter E-Commerce, Online-Banking, Telekommunikation, E-Books, Ticketautomaten und interaktive Terminals. Kleinstunternehmen unter 10 Mitarbeitern und 2 Mio. € Umsatz sind ausgenommen.",
      },
    },
    {
      "@type": "Question",
      name: "Ab wann gilt das BaFG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das BaFG gilt seit dem 28. Juni 2025. Bestehende Produkte und Dienstleistungen, die vor diesem Datum auf dem Markt waren, haben eine Übergangsfrist bis 28. Juni 2030.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Strafen drohen bei BaFG-Verstößen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bei Verstößen drohen Verwaltungsstrafen von bis zu 80.000 € pro Verstoß. Wiederholte Verstöße können zum Verbot des Inverkehrbringens des Produkts führen. Das Sozialministeriumservice ist die zuständige Marktüberwachungsbehörde.",
      },
    },
  ],
};

/* ── Breadcrumb Schema ── */
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "EU Compliance Hub",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "BaFG",
      item: `${BASE_URL}/bafg`,
    },
  ],
};

export default function BaFGPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <GuideContent />
    </>
  );
}
