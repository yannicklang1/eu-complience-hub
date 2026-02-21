import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
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
    url: `${BASE_URL}/csrd-esg`,
  },
  alternates: {
    canonical: `${BASE_URL}/csrd-esg`,
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "CSRD/ESG-Guide – Nachhaltigkeitsberichterstattung komplett erklärt",
  description:
    "CSRD vollständig erklärt: ESRS Standards, Doppelte Wesentlichkeit, Omnibus I, NaBeG Österreich und Compliance-Fahrplan.",
  url: `${BASE_URL}/csrd-esg`,
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
    "@id": `${BASE_URL}/csrd-esg`,
  },
  about: {
    "@type": "Legislation",
    name: "Richtlinie (EU) 2022/2464 – Corporate Sustainability Reporting Directive (CSRD)",
    legislationIdentifier: "(EU) 2022/2464",
  },
};

/* ── FAQ Schema for Rich Snippets ── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist die CSRD?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Corporate Sustainability Reporting Directive (CSRD, Richtlinie (EU) 2022/2464) verpflichtet Unternehmen zu standardisierter Nachhaltigkeitsberichterstattung nach den European Sustainability Reporting Standards (ESRS). Sie ersetzt die NFRD und erweitert den Kreis der berichtspflichtigen Unternehmen erheblich.",
      },
    },
    {
      "@type": "Question",
      name: "Wer muss nach CSRD berichten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Große Unternehmen (ab 250 Mitarbeiter oder 50 Mio. € Umsatz oder 25 Mio. € Bilanzsumme), börsennotierte KMUs sowie EU-Tochtergesellschaften von Drittstaatskonzernen ab 150 Mio. € EU-Umsatz. In Österreich ist das NaBeG die nationale Umsetzung.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist die Doppelte Wesentlichkeit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Doppelte Wesentlichkeit (Double Materiality) verlangt, dass Unternehmen sowohl die Auswirkungen ihrer Tätigkeit auf Umwelt und Gesellschaft (Impact Materiality) als auch die Risiken und Chancen durch Nachhaltigkeitsthemen für das Unternehmen selbst (Financial Materiality) berichten.",
      },
    },
    {
      "@type": "Question",
      name: "Was hat sich durch Omnibus I geändert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Omnibus-I-Vorschlag der EU-Kommission vom Februar 2025 sieht Erleichterungen vor: Anhebung der Schwellenwerte (1.000 Mitarbeiter), Vereinfachung der ESRS, Aufschub für bestimmte Unternehmen und reduzierte Berichtsanforderungen für KMUs.",
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
      name: "CSRD & ESG",
      item: `${BASE_URL}/csrd-esg`,
    },
  ],
};

export default function CSRDESGPage() {
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
