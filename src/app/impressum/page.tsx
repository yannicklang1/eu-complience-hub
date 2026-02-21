import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Impressum – EU Compliance Hub",
  description:
    "Impressum des EU Compliance Hub gemäß § 5 ECG und § 25 MedienG. Angaben zum Diensteanbieter, Kontakt, Unternehmensgegenstand und anwendbare Rechtsvorschriften.",
  openGraph: {
    title: "Impressum – EU Compliance Hub",
    description:
      "Impressum gemäß § 5 ECG / § 25 MedienG – Diensteanbieter und Kontaktdaten.",
    url: `${BASE_URL}/impressum`,
  },
  alternates: { canonical: `${BASE_URL}/impressum` },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: SITE_NAME, item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Impressum", item: `${BASE_URL}/impressum` },
  ],
};

export default function ImpressumPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <LegalPageLayout title="Impressum" subtitle="Angaben gemäß § 5 ECG / § 25 MedienG">
      <h2>Diensteanbieter</h2>
      <p>
        <strong>[Vollständiger Name / Firma]</strong><br />
        [Straße und Hausnummer]<br />
        [PLZ Ort]<br />
        Österreich
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href="mailto:kontakt@eu-compliance-hub.eu">kontakt@eu-compliance-hub.eu</a><br />
        Telefon: [Telefonnummer]
      </p>

      <h2>Unternehmensgegenstand</h2>
      <p>
        Informationsportal für europäische Compliance-Regulierungen.
        Bereitstellung von redaktionellen Inhalten, Übersichten, Checklisten und
        Tools rund um EU-Verordnungen und deren nationale Umsetzung.
      </p>

      <h2>Anwendbare Rechtsvorschriften</h2>
      <ul>
        <li>E-Commerce-Gesetz (ECG), BGBl. I Nr. 152/2001</li>
        <li>Mediengesetz (MedienG), BGBl. Nr. 314/1981</li>
        <li>Gewerbeordnung (GewO), BGBl. Nr. 194/1994</li>
      </ul>

      <h2>Behörde gem. ECG</h2>
      <p>
        Bezirkshauptmannschaft [zuständige BH]
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die Inhalte dieser Website sind urheberrechtlich geschützt. Die
        Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
        außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
        Zustimmung des jeweiligen Autors bzw. Erstellers.
      </p>

      <h2>Haftungshinweis</h2>
      <p>
        Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
        für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten
        sind ausschließlich deren Betreiber verantwortlich. Weitere Details
        finden Sie in unserem{" "}
        <a href="/haftungsausschluss">Haftungsausschluss</a>.
      </p>

      <hr />

      <p>
        <em>Stand: Februar 2026</em>
      </p>
    </LegalPageLayout>
    </>
  );
}
