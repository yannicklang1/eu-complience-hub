import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import VergleichContent from "./VergleichContent";

export const metadata: Metadata = {
  title: "Regulierungsvergleich – EU-Compliance im Überblick",
  description:
    "Vergleichen Sie 9 EU-Regulierungen wie NIS2, AI Act, DORA, DSGVO, CRA, CSRD, MiCA, Data Act und BaFG auf einen Blick: Anwendungsbereich, Bußgelder, Fristen, Pflichten und betroffene Unternehmen.",
  keywords:
    "EU Regulierung Vergleich, NIS2 vs DORA, AI Act Vergleich, Compliance Vergleich, EU Gesetze Übersicht, Bußgelder Vergleich, DSGVO NIS2 Unterschied, MiCA Vergleich, Data Act Vergleich",
  openGraph: {
    title: "Regulierungsvergleich – EU-Compliance im Überblick",
    description:
      "Vergleichen Sie EU-Regulierungen auf einen Blick: Bußgelder, Fristen, Pflichten.",
    url: `${BASE_URL}/vergleich`,
  },
  alternates: {
    canonical: `${BASE_URL}/vergleich`,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: SITE_NAME, item: BASE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Regulierungsvergleich",
      item: `${BASE_URL}/vergleich`,
    },
  ],
};

export default function VergleichPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <VergleichContent />
    </>
  );
}
