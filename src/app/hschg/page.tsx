import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "HSchG-Guide – Hinweisgeberschutz komplett erklärt",
  description:
    "HSchG vollständig erklärt: EU-Whistleblower-Richtlinie, interne Meldekanäle, Schutz für Hinweisgeber, Strafen bis 40.000 € und Compliance-Fahrplan. Praxisguide für österreichische Unternehmen ab 50 Mitarbeitern.",
  keywords:
    "HSchG, HinweisgeberInnenschutzgesetz, Whistleblower, Hinweisgeberschutz, Meldekanal, Whistleblower-Richtlinie, BAK, Korruptionsbekämpfung, Österreich, interne Meldestelle",
  openGraph: {
    title: "HSchG-Guide – Hinweisgeberschutz komplett erklärt",
    description:
      "EU-Whistleblower-Richtlinie in Österreich: Meldekanäle, Schutzrechte, Strafen & Compliance-Fahrplan.",
    url: `${BASE_URL}/hschg`,
  },
  alternates: {
    canonical: `${BASE_URL}/hschg`,
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "HSchG-Guide – Hinweisgeberschutz komplett erklärt",
  description:
    "HSchG / EU-Whistleblower-Richtlinie in Österreich: Interne Meldekanäle, Schutz für Hinweisgeber, Strafen und Compliance-Fahrplan.",
  url: `${BASE_URL}/hschg`,
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
    "@id": `${BASE_URL}/hschg`,
  },
  about: {
    "@type": "Legislation",
    name: "Richtlinie (EU) 2019/1937 – EU-Whistleblower-Richtlinie / HSchG",
    legislationIdentifier: "(EU) 2019/1937",
  },
};

/* ── FAQ Schema for Rich Snippets ── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist das HSchG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das HinweisgeberInnenschutzgesetz (HSchG) ist Österreichs Umsetzung der EU-Whistleblower-Richtlinie (2019/1937). Es schützt Personen, die Verstöße gegen EU-Recht in ihrem beruflichen Umfeld melden, vor Vergeltungsmaßnahmen wie Kündigung, Versetzung oder Mobbing.",
      },
    },
    {
      "@type": "Question",
      name: "Ab welcher Unternehmensgröße gilt das HSchG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Alle Unternehmen ab 50 Mitarbeitern müssen einen internen Meldekanal einrichten. Unternehmen ab 250 Mitarbeitern mussten dies bereits seit Februar 2023. Für Unternehmen mit 50-249 Mitarbeitern gilt die Pflicht seit Dezember 2023.",
      },
    },
    {
      "@type": "Question",
      name: "Was muss ein interner Meldekanal leisten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Meldekanal muss schriftliche und mündliche Meldungen ermöglichen, die Vertraulichkeit der meldenden Person gewährleisten, innerhalb von 7 Tagen eine Eingangsbestätigung senden und innerhalb von 3 Monaten Feedback über Folgemaßnahmen geben.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Strafen drohen bei HSchG-Verstößen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bis zu 20.000 € für das Behindern von Meldungen oder das Ergreifen von Vergeltungsmaßnahmen. Bis zu 40.000 € bei Wiederholungstätern. Die Bundesanstalt für Korruptionsbekämpfung (BAK) ist externe Meldestelle.",
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
      name: "HSchG",
      item: `${BASE_URL}/hschg`,
    },
  ],
};

export default function HSchGPage() {
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
