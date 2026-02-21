import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import FristenRadarPage from "./FristenRadarPage";

export const metadata: Metadata = {
  title: "Fristen-Radar & Compliance-Briefing – Alle EU-Deadlines im Blick | EU Compliance Hub",
  description:
    "Interaktiver Fristen-Radar: Alle EU-Compliance-Deadlines filtern nach Regulierung, Jahr und Status. Plus Compliance-Briefing — Ihr Frühwarnsystem bei kritischen Fristen.",
  keywords:
    "Fristen-Radar, Compliance-Briefing, Compliance Fristen, NIS2 Fristen, DORA Deadlines, AI Act Termine, EU Regulierungen Updates, Compliance Österreich",
  openGraph: {
    title: "Fristen-Radar & Compliance-Briefing – Alle EU-Deadlines im Blick",
    description:
      "Interaktiver Fristen-Radar mit 20+ EU-Deadlines. Compliance-Briefing aktivieren — nur bei kritischen Fristen. Max. 3×/Monat.",
    url: `${BASE_URL}/fristen-radar`,
  },
  alternates: {
    canonical: `${BASE_URL}/fristen-radar`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Fristen-Radar – EU Compliance Deadlines",
  description:
    "Interaktives Tool zum Filtern und Verfolgen aller EU-Compliance-Fristen. Compliance-Briefing für kritische regulatorische Updates.",
  url: `${BASE_URL}/fristen-radar`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  publisher: {
    "@type": "Organization",
    name: "EU Compliance Hub",
    url: BASE_URL,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "EU Compliance Hub", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Fristen-Radar", item: `${BASE_URL}/fristen-radar` },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FristenRadarPage />
    </>
  );
}
