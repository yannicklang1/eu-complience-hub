import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "EHDS – Europäischer Gesundheitsdatenraum Guide 2026",
  description:
    "EHDS komplett erklärt: Pflichten für Gesundheitsdaten-Inhaber, EHR-Systeme, Primär- & Sekundärnutzung, Patientenrechte, Interoperabilität (HL7 FHIR). Guide für eHealth & Pharma.",
  keywords:
    "EHDS, European Health Data Space, Gesundheitsdatenraum, Verordnung 2025/327, eHealth Compliance, EHR System, Gesundheitsdaten EU, HL7 FHIR, Primärnutzung Sekundärnutzung",
  openGraph: {
    title: "EHDS – Europäischer Gesundheitsdatenraum Guide 2026",
    description:
      "EHDS-Pflichten: EHR-Systeme, Primär- & Sekundärnutzung von Gesundheitsdaten, Patientenrechte und Compliance-Fahrplan.",
    url: `${BASE_URL}/ehds`,
  },
  alternates: {
    canonical: `${BASE_URL}/ehds`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "EHDS – Europäischer Gesundheitsdatenraum Guide 2026",
  description:
    "EHDS erklärt: Pflichten für Gesundheitsdaten, EHR-Systeme, Patientenrechte und Interoperabilität nach HL7 FHIR.",
  url: `${BASE_URL}/ehds`,
  datePublished: "2026-02-20",
  dateModified: "2026-02-20",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/ehds` },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2025/327 – European Health Data Space",
    legislationIdentifier: "(EU) 2025/327",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist der EHDS (Europäischer Gesundheitsdatenraum)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der EHDS (Verordnung (EU) 2025/327) ist der European Health Data Space — ein EU-weiter Rahmen für den sicheren Austausch von Gesundheitsdaten. Er ermöglicht Patienten den grenzüberschreitenden Zugriff auf ihre Daten (Primärnutzung) und regelt die Nutzung anonymisierter Daten für Forschung und Innovation (Sekundärnutzung).",
      },
    },
    {
      "@type": "Question",
      name: "Wer ist vom EHDS betroffen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Betroffen sind: Hersteller von EHR-Systemen (elektronische Patientenakten), Krankenhäuser und Arztpraxen, Pharma- und Medizintechnik-Unternehmen, Gesundheits-Apps (Wellness-Apps mit Gesundheitsdaten), Forschungseinrichtungen und Krankenversicherungen.",
      },
    },
    {
      "@type": "Question",
      name: "Was bedeutet Primär- und Sekundärnutzung im EHDS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Primärnutzung bedeutet, dass Patienten EU-weit auf ihre Gesundheitsdaten zugreifen und sie mit Ärzten teilen können. Sekundärnutzung ermöglicht die Verwendung anonymisierter oder pseudonymisierter Gesundheitsdaten für Forschung, Innovation, Public Health und Politikgestaltung — über eine zentrale Zugangsstelle (Health Data Access Body).",
      },
    },
    {
      "@type": "Question",
      name: "Ab wann gilt der EHDS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die EHDS-Verordnung (EU) 2025/327 trat am 26. März 2025 in Kraft. Die Mitgliedstaaten haben unterschiedliche Übergangsfristen: Die Primärnutzung muss ab 2027 implementiert sein, die Sekundärnutzung ab 2029. EHR-Systeme müssen ab 2028/2029 die Interoperabilitätsanforderungen (HL7 FHIR) erfüllen.",
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
      name: "EHDS",
      item: `${BASE_URL}/ehds`,
    },
  ],
};

export default function EHDSPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <GuideContent />
    </>
  );
}
