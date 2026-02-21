import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "EU-Regulierungs-Timeline 2024–2030 – Alle Fristen chronologisch",
  description:
    "Chronologische Timeline aller EU-Compliance-Fristen von 2024 bis 2030. NISG, AI Act, DORA, CRA, CSRD, BaFG, MiCA und mehr — auf einen Blick.",
  keywords:
    "EU Compliance Timeline, Regulierungs-Zeitplan, NIS2 Fristen, AI Act Deadlines, DORA Timeline, EU Regulierungen 2025 2026 2027",
  openGraph: {
    title: "EU-Regulierungs-Timeline 2024–2030",
    description:
      "Alle EU-Compliance-Fristen chronologisch von 2024 bis 2030 — von DORA über AI Act bis NISG 2026.",
    url: `${BASE_URL}/timeline`,
  },
  alternates: {
    canonical: `${BASE_URL}/timeline`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "EU-Regulierungs-Timeline 2024–2030",
  description:
    "Chronologische Timeline aller EU-Compliance-Fristen von 2024 bis 2030.",
  url: `${BASE_URL}/timeline`,
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
    { "@type": "ListItem", position: 2, name: "Timeline", item: `${BASE_URL}/timeline` },
  ],
};

export default function TimelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      {children}
    </>
  );
}
