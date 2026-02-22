import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import LegalPageLayout from "@/components/LegalPageLayout";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/* -- Per-locale metadata -- */

const META: Partial<Record<Locale, { title: string; description: string }>> = {
  de: {
    title: "Impressum \u2013 EU Compliance Hub",
    description:
      "Impressum des EU Compliance Hub gem\u00e4\u00df \u00a7 5 ECG und \u00a7 25 MedienG. Angaben zum Diensteanbieter, Kontakt, Unternehmensgegenstand und anwendbare Rechtsvorschriften.",
  },
  en: {
    title: "Legal Notice \u2013 EU Compliance Hub",
    description:
      "Legal notice for EU Compliance Hub pursuant to \u00a7 5 ECG and \u00a7 25 MedienG. Information on service provider, contact, business purpose and applicable legal provisions.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const m = META[loc] ?? META.de!;

  const slug = "impressum";
  const canonical = `${BASE_URL}/${locale}/${slug}`;

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE_URL}/${l}/${slug}`;
  }
  languages["x-default"] = `${BASE_URL}/de/${slug}`;

  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      url: canonical,
      locale: LOCALE_OG[loc] ?? "de_AT",
      alternateLocale: LOCALES.filter((l) => l !== loc).map((l) => LOCALE_OG[l]),
    },
    alternates: {
      canonical,
      languages,
    },
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${BASE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Impressum",
        item: `${BASE_URL}/${locale}/impressum`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LegalPageLayout title="Impressum" subtitle="Angaben gem\u00e4\u00df \u00a7 5 ECG / \u00a7 25 MedienG">
        <h2>Diensteanbieter</h2>
        <p>
          <strong>[Vollst\u00e4ndiger Name / Firma]</strong><br />
          [Stra\u00dfe und Hausnummer]<br />
          [PLZ Ort]<br />
          \u00d6sterreich
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href="mailto:kontakt@eu-compliance-hub.eu">kontakt@eu-compliance-hub.eu</a><br />
          Telefon: [Telefonnummer]
        </p>

        <h2>Unternehmensgegenstand</h2>
        <p>
          Informationsportal f\u00fcr europ\u00e4ische Compliance-Regulierungen.
          Bereitstellung von redaktionellen Inhalten, \u00dcbersichten, Checklisten und
          Tools rund um EU-Verordnungen und deren nationale Umsetzung.
        </p>

        <h2>Anwendbare Rechtsvorschriften</h2>
        <ul>
          <li>E-Commerce-Gesetz (ECG), BGBl. I Nr. 152/2001</li>
          <li>Mediengesetz (MedienG), BGBl. Nr. 314/1981</li>
          <li>Gewerbeordnung (GewO), BGBl. Nr. 194/1994</li>
        </ul>

        <h2>Beh\u00f6rde gem. ECG</h2>
        <p>
          Bezirkshauptmannschaft [zust\u00e4ndige BH]
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die Inhalte dieser Website sind urheberrechtlich gesch\u00fctzt. Die
          Vervielf\u00e4ltigung, Bearbeitung, Verbreitung und jede Art der Verwertung
          au\u00dferhalb der Grenzen des Urheberrechts bed\u00fcrfen der schriftlichen
          Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>

        <h2>Haftungshinweis</h2>
        <p>
          Trotz sorgf\u00e4ltiger inhaltlicher Kontrolle \u00fcbernehmen wir keine Haftung
          f\u00fcr die Inhalte externer Links. F\u00fcr den Inhalt der verlinkten Seiten
          sind ausschlie\u00dflich deren Betreiber verantwortlich. Weitere Details
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
