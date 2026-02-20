import type { Metadata } from "next";
import FristenRadarPage from "./FristenRadarPage";

export const metadata: Metadata = {
  title: "Fristen-Radar – Keine Compliance-Frist verpassen | EU Compliance Hub",
  description:
    "Melden Sie sich zum Fristen-Radar an: Nur bei kritischen Compliance-Fristen, Gesetzesänderungen und neuen Förderprogrammen. Kein Spam. Maximal 3× pro Monat.",
  keywords:
    "Fristen-Radar, Compliance Fristen, NIS2 Fristen, DORA Deadlines, AI Act Termine, EU Regulierungen Updates, Compliance Newsletter Österreich",
  openGraph: {
    title: "Fristen-Radar – Keine Compliance-Frist verpassen",
    description:
      "Nur bei kritischen Fristen und neuen Fördergeldern. Kein Spam. Maximal 3× pro Monat.",
    url: "https://eu-compliance-hub.eu/fristen-radar",
  },
  alternates: {
    canonical: "https://eu-compliance-hub.eu/fristen-radar",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Fristen-Radar – Compliance-Updates",
  description:
    "Registrieren Sie sich für den Fristen-Radar und erhalten Sie Benachrichtigungen bei kritischen EU-Compliance-Fristen.",
  url: "https://eu-compliance-hub.eu/fristen-radar",
  publisher: {
    "@type": "Organization",
    name: "EU Compliance Hub",
    url: "https://eu-compliance-hub.eu",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FristenRadarPage />
    </>
  );
}
