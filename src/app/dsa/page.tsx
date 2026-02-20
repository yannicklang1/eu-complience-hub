import type { Metadata } from "next";
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
    url: "https://eu-compliance-hub.eu/dsa",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/dsa",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Digital Services Act (DSA) – Plattformregulierung Guide 2026",
  description:
    "DSA erklärt: Pflichten für Online-Plattformen, Hosting-Dienste und Suchmaschinen — Notice-and-Action, Transparenz und Enforcement.",
  url: "https://eu-compliance-hub.eu/dsa",
  datePublished: "2026-02-20",
  dateModified: "2026-02-20",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: "https://eu-compliance-hub.eu" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://eu-compliance-hub.eu/dsa" },
  about: {
    "@type": "Legislation",
    name: "Verordnung (EU) 2022/2065 – Digital Services Act",
    legislationIdentifier: "(EU) 2022/2065",
  },
};

export default function DSAPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GuideContent />
    </>
  );
}
