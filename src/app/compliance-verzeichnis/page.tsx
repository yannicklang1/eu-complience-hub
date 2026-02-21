import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import VerzeichnisContent from "./VerzeichnisContent";

export const metadata: Metadata = {
  title: "Compliance-Verzeichnis – Software, Auditoren, Kanzleien & Berater | EU Compliance Hub",
  description:
    "Kuratiertes Verzeichnis: Compliance-Software, zertifizierte Auditoren, IT-Recht-Kanzleien und Cybersecurity-Berater für NIS2, DORA, AI Act, CRA und DSGVO in Österreich und der DACH-Region.",
  keywords:
    "Compliance-Verzeichnis, NIS2 Berater, DORA Audit, AI Act Kanzlei, Compliance Software, Auditoren Österreich, IT-Recht Kanzlei Wien, Cybersecurity Beratung DACH",
  openGraph: {
    title: "Compliance-Verzeichnis – Software, Auditoren, Kanzleien & Berater",
    description:
      "Finden Sie den passenden Partner für Ihre EU-Compliance: Software, Auditoren, Kanzleien und Berater — kuratiert und filterbar.",
    url: `${BASE_URL}/compliance-verzeichnis`,
  },
  alternates: {
    canonical: `${BASE_URL}/compliance-verzeichnis`,
  },
};

/* ── JSON-LD ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Compliance-Verzeichnis",
  description:
    "Kuratiertes Verzeichnis von Compliance-Software, Auditoren, Kanzleien und Beratern für EU-Regulierungen.",
  url: `${BASE_URL}/compliance-verzeichnis`,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Compliance-Software",
        description: "Digitale Plattformen für automatisierte Compliance",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Zertifizierte Auditoren",
        description: "Akkreditierte Prüfstellen für ISO 27001, NIS2 und DORA",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Kanzleien & Rechtsberatung",
        description: "Spezialisierte Kanzleien für IT-Recht und Datenschutz",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Compliance-Berater",
        description: "Cybersecurity- und Compliance-Consultants",
      },
    ],
  },
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
    { "@type": "ListItem", position: 2, name: "Compliance-Verzeichnis", item: `${BASE_URL}/compliance-verzeichnis` },
  ],
};

export default function ComplianceVerzeichnisPage() {
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
      <VerzeichnisContent />
    </>
  );
}
