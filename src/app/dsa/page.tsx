import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "Digital Services Act (DSA) – Plattformregulierung Guide 2026",
  description:
    "DSA komplett erklärt: Pflichten für Online-Plattformen, Hosting-Dienste und Suchmaschinen. Notice-and-Action, Transparenzberichte, Werbetransparenz, Minderjährigenschutz. Strafen bis 6% des Umsatzes.",
  keywords:
    "Digital Services Act, DSA, Verordnung 2022/2065, Plattformregulierung EU, Notice-and-Action, Content Moderation, Transparenzbericht, VLOP, Online-Plattform Pflichten, DSA Compliance",
  openGraph: {
    title: "Digital Services Act (DSA) – Plattformregulierung Guide 2026",
    description:
      "DSA-Pflichten für Plattformen: Notice-and-Action, Transparenzberichte, Werbetransparenz und Compliance-Fahrplan.",
    url: `${BASE_URL}/dsa`,
  },
  alternates: {
    canonical: `${BASE_URL}/dsa`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Digital Services Act (DSA) – Plattformregulierung Guide 2026",
  description:
    "DSA erklärt: Pflichten für Online-Plattformen, Hosting-Dienste und Suchmaschinen — Notice-and-Action, Transparenz und Enforcement.",
  url: `${BASE_URL}/dsa`,
  datePublished: "2026-02-20",
  dateModified: "2026-02-20",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/dsa` },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2022/2065 – Digital Services Act",
    legislationIdentifier: "(EU) 2022/2065",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist der Digital Services Act (DSA)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der Digital Services Act (Verordnung (EU) 2022/2065) ist die EU-Verordnung zur Regulierung digitaler Dienste. Er legt Sorgfaltspflichten für Online-Plattformen, Hosting-Dienste und Suchmaschinen fest, darunter Notice-and-Action-Verfahren, Transparenzberichte und Werbetransparenz.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Unternehmen sind vom DSA betroffen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der DSA betrifft alle Vermittlungsdienste in der EU in vier Stufen: (1) reine Durchleitungsdienste (ISPs), (2) Caching-Dienste, (3) Hosting-Dienste (Cloud, Webhosting) und (4) Online-Plattformen (Marktplätze, Social Media, App Stores). Very Large Online Platforms (VLOPs) mit über 45 Mio. EU-Nutzern haben verschärfte Pflichten.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Strafen drohen bei DSA-Verstößen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bei Verstößen gegen den DSA drohen Bußgelder von bis zu 6 % des weltweiten Jahresumsatzes. Bei fortgesetzten Verstößen können periodische Strafzahlungen von bis zu 5 % des durchschnittlichen Tagesumsatzes verhängt werden. Die Europäische Kommission überwacht VLOPs direkt.",
      },
    },
    {
      "@type": "Question",
      name: "Seit wann gilt der DSA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der DSA gilt seit dem 17. Februar 2024 vollständig für alle betroffenen Dienste. Very Large Online Platforms (VLOPs) und Very Large Online Search Engines (VLOSEs) mussten die Pflichten bereits seit August 2023 einhalten.",
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
      name: "DSA",
      item: `${BASE_URL}/dsa`,
    },
  ],
};

export default function DSAPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <GuideContent />
    </>
  );
}
