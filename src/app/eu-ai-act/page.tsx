import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
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
    url: `${BASE_URL}/eu-ai-act`,
  },
  alternates: {
    canonical: `${BASE_URL}/eu-ai-act`,
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EU AI Act – Vollständiger Guide 2026",
  description:
    "EU AI Act komplett erklärt: Risikostufen, Fristen, Strafen bis 35 Mio. €, Pflichten für Hochrisiko-KI und Österreich-spezifische Umsetzung.",
  url: `${BASE_URL}/eu-ai-act`,
  datePublished: "2026-02-01",
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
    "@id": `${BASE_URL}/eu-ai-act`,
  },
  about: {
    "@type": "Legislation",
    name: "Regulation (EU) 2024/1689 – Artificial Intelligence Act",
    legislationIdentifier: "(EU) 2024/1689",
  },
};

/* ── FAQ Schema for Rich Snippets ── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist der EU AI Act?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der EU AI Act (Verordnung (EU) 2024/1689) ist die weltweit erste umfassende KI-Regulierung. Er klassifiziert KI-Systeme nach Risikostufen (verboten, Hochrisiko, begrenzt, minimal) und legt je nach Stufe konkrete Pflichten für Anbieter und Betreiber fest.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Strafen drohen bei Verstößen gegen den AI Act?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bis zu 35 Mio. € oder 7% des weltweiten Jahresumsatzes für verbotene KI-Praktiken. Bis zu 15 Mio. € oder 3% für Verstöße bei Hochrisiko-KI. Bis zu 7,5 Mio. € oder 1,5% für falsche Angaben gegenüber Behörden.",
      },
    },
    {
      "@type": "Question",
      name: "Ab wann gilt der EU AI Act?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der AI Act ist am 1. August 2024 in Kraft getreten. Verbotene KI-Praktiken gelten ab Februar 2025. Hochrisiko-KI-Pflichten greifen ab August 2026. GPAI-Modell-Pflichten ab August 2025.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist Hochrisiko-KI laut AI Act?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hochrisiko-KI umfasst KI-Systeme in kritischen Bereichen wie biometrische Identifizierung, kritische Infrastruktur, Bildung, Beschäftigung, Strafverfolgung und Migration. Diese Systeme erfordern ein Konformitätsbewertungsverfahren, Risikomanagementsystem und menschliche Aufsicht.",
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
      name: "EU AI Act",
      item: `${BASE_URL}/eu-ai-act`,
    },
  ],
};

export default function EuAiActPage() {
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
