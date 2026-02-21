import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
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
    url: `${BASE_URL}/dora`,
  },
  alternates: {
    canonical: `${BASE_URL}/dora`,
  },
};

/* ── JSON-LD Article Schema ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "DORA – Digital Operational Resilience Act komplett erklärt",
  description:
    "DORA vollständig erklärt: IKT-Risikomanagement, Incident Reporting, Resilience Testing und Third-Party-Management für den Finanzsektor.",
  url: `${BASE_URL}/dora`,
  datePublished: "2026-02-18",
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
    "@id": `${BASE_URL}/dora`,
  },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2022/2554 – Digital Operational Resilience Act",
    legislationIdentifier: "(EU) 2022/2554",
  },
};

/* ── FAQ Schema for Rich Snippets ── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist DORA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DORA (Digital Operational Resilience Act, Verordnung (EU) 2022/2554) ist eine EU-Verordnung, die einheitliche Anforderungen an die digitale Betriebsstabilität im Finanzsektor festlegt. Sie umfasst IKT-Risikomanagement, Incident Reporting, Resilience Testing und Third-Party-Management.",
      },
    },
    {
      "@type": "Question",
      name: "Wer ist von DORA betroffen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Alle regulierten Finanzunternehmen in der EU: Banken, Versicherungen, Wertpapierfirmen, Zahlungsinstitute, Krypto-Dienstleister, sowie kritische IKT-Drittdienstleister (Cloud-Provider, SaaS-Anbieter). In Österreich überwacht die FMA die Einhaltung.",
      },
    },
    {
      "@type": "Question",
      name: "Ab wann gilt DORA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DORA gilt seit dem 17. Januar 2025. Die Verordnung ist unmittelbar anwendbar — keine nationale Umsetzung erforderlich. Betroffene Unternehmen müssen seit diesem Datum vollständig compliant sein.",
      },
    },
    {
      "@type": "Question",
      name: "Was sind die Strafen bei DORA-Verstößen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Strafen richten sich nach nationalem Recht. In Österreich kann die FMA Bußgelder verhängen und Maßnahmen wie den Entzug der Konzession anordnen. Für kritische IKT-Drittdienstleister sind EU-weit Strafzahlungen von bis zu 1% des durchschnittlichen weltweiten Tagesumsatzes pro Tag vorgesehen.",
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
      name: "DORA",
      item: `${BASE_URL}/dora`,
    },
  ],
};

export default function DORAPage() {
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
