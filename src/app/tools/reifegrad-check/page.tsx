import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import ReifegradTool from "./ReifegradTool";

export const metadata: Metadata = {
  title: "Compliance-Reifegrad-Check — Wie gut sind Sie aufgestellt?",
  description:
    "Bewerten Sie den Compliance-Reifegrad Ihres Unternehmens in 5 Kategorien. Erhalten Sie eine visuelle Auswertung mit konkreten Handlungsempfehlungen.",
  keywords:
    "Compliance Reifegrad, Compliance Assessment, Compliance Maturity, ISMS Reifegrad, Compliance Selbstbewertung, EU Compliance Score",
  openGraph: {
    title: "Compliance-Reifegrad-Check — Wie gut sind Sie aufgestellt?",
    description:
      "Bewerten Sie den Reifegrad Ihrer Compliance in 5 Kategorien. Kostenloser Selbst-Check.",
    url: `${BASE_URL}/tools/reifegrad-check`,
  },
  alternates: {
    canonical: `${BASE_URL}/tools/reifegrad-check`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Compliance-Reifegrad-Check",
  url: `${BASE_URL}/tools/reifegrad-check`,
  description: "Bewerten Sie den Compliance-Reifegrad Ihres Unternehmens mit konkreten Handlungsempfehlungen.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  author: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: SITE_NAME, item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
    { "@type": "ListItem", position: 3, name: "Reifegrad-Check", item: `${BASE_URL}/tools/reifegrad-check` },
  ],
};

export default function ReifegradCheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ReifegradTool />
    </>
  );
}
