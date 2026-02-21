import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import GuideContent from "./GuideContent";

export const metadata: Metadata = {
  title: "Green Claims Directive – Anti-Greenwashing Guide 2026",
  description:
    "Green Claims Directive komplett erklärt: Welche Werbeaussagen ab 2026/2027 illegal sind, Nachweispflichten, Zertifizierungen, Strafen bis 4% des Jahresumsatzes. Guide für Marketing & E-Commerce.",
  keywords:
    "Green Claims Directive, Anti-Greenwashing, Richtlinie 2024/825, klimaneutral illegal, nachhaltig Werbung EU, Greenwashing Strafe, Umweltaussagen Nachweis, LCA-Zertifizierung",
  openGraph: {
    title: "Green Claims Directive – Anti-Greenwashing Guide 2026",
    description:
      "Welche Umweltaussagen ab 2026/2027 illegal sind, Nachweispflichten und Compliance-Fahrplan für Marketing & E-Commerce.",
    url: `${BASE_URL}/green-claims`,
  },
  alternates: {
    canonical: `${BASE_URL}/green-claims`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Green Claims Directive – Anti-Greenwashing Guide 2026",
  description:
    "Green Claims Directive erklärt: Nachweispflichten für Umweltaussagen, verbotene Claims und Compliance-Fahrplan.",
  url: `${BASE_URL}/green-claims`,
  datePublished: "2026-02-19",
  dateModified: "2026-02-20",
  inLanguage: "de",
  author: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  publisher: { "@type": "Organization", name: "EU Compliance Hub", url: BASE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/green-claims` },
  about: {
    "@type": "Legislation",
    name: "Richtlinie (EU) 2024/825 – Empowering Consumers for the Green Transition",
    legislationIdentifier: "(EU) 2024/825",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist die Green Claims Directive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Green Claims Directive (Richtlinie (EU) 2024/825) ist eine EU-Richtlinie gegen Greenwashing. Sie verbietet irreführende Umweltaussagen in der Werbung und verlangt, dass Unternehmen Umweltbehauptungen durch unabhängige, wissenschaftlich fundierte Nachweise belegen müssen.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Umweltaussagen sind ab 2026 verboten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Verboten sind pauschale, unspezifische Aussagen wie 'klimaneutral', 'umweltfreundlich' oder 'grün' ohne konkreten Nachweis. Auch Umwelt-Labels, die nicht auf offiziellen Zertifizierungssystemen basieren, und CO₂-Kompensationsbasierte Klimaneutralitäts-Claims werden untersagt.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Strafen drohen bei Greenwashing nach der Green Claims Directive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Strafen können bis zu 4 % des Jahresumsatzes betragen. Zusätzlich drohen Unterlassungsverfügungen, öffentliche Bekanntmachung der Verstöße und der Ausschluss von öffentlichen Vergabeverfahren. Verbraucher können außerdem Schadensersatz über die Verbandsklagerichtlinie geltend machen.",
      },
    },
    {
      "@type": "Question",
      name: "Ab wann gilt die Green Claims Directive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Richtlinie (EU) 2024/825 zur Stärkung der Verbraucher für den ökologischen Wandel trat am 26. März 2024 in Kraft. Die Mitgliedstaaten müssen sie bis 27. März 2026 in nationales Recht umsetzen. Die weitergehende Green-Claims-Verordnung wird voraussichtlich 2027/2028 gelten.",
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
      name: "Green Claims Directive",
      item: `${BASE_URL}/green-claims`,
    },
  ],
};

export default function GreenClaimsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <GuideContent />
    </>
  );
}
