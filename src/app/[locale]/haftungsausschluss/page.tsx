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
    title: "Haftungsausschluss \u2013 EU Compliance Hub",
    description:
      "Haftungsausschluss des EU Compliance Hub: Keine Rechtsberatung, Haftungsbeschr\u00e4nkung f\u00fcr redaktionelle Inhalte, externe Links und regulatorische Informationen gem\u00e4\u00df ECG.",
  },
  en: {
    title: "Disclaimer \u2013 EU Compliance Hub",
    description:
      "Disclaimer for EU Compliance Hub: No legal advice, liability limitation for editorial content, external links and regulatory information pursuant to ECG.",
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

  const slug = "haftungsausschluss";
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

export default async function HaftungsausschlussPage({
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
        name: "Haftungsausschluss",
        item: `${BASE_URL}/${locale}/haftungsausschluss`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LegalPageLayout title="Haftungsausschluss" subtitle="Disclaimer und Haftungsbeschr\u00e4nkung" locale={locale}>
        <h2>1. Keine Rechtsberatung</h2>
        <p>
          Die auf dieser Website bereitgestellten Informationen dienen
          ausschlie\u00dflich der allgemeinen Information und stellen keine
          Rechtsberatung dar. Die Inhalte ersetzen nicht die individuelle
          juristische Beratung durch eine qualifizierte Rechtsanw\u00e4ltin oder einen
          qualifizierten Rechtsanwalt.
        </p>
        <p>
          Obwohl wir uns bem\u00fchen, die Informationen aktuell, vollst\u00e4ndig und
          richtig bereitzustellen, k\u00f6nnen wir keine Gew\u00e4hr f\u00fcr die Richtigkeit,
          Vollst\u00e4ndigkeit oder Aktualit\u00e4t der Inhalte \u00fcbernehmen. Die Anwendung
          der Informationen auf individuelle Sachverhalte erfolgt auf eigenes
          Risiko.
        </p>

        <h2>2. Haftung f\u00fcr Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gem\u00e4\u00df \u00a7 7 Abs. 1 ECG f\u00fcr eigene Inhalte
          auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
          \u00a7\u00a7 8 bis 10 ECG sind wir jedoch nicht verpflichtet, \u00fcbermittelte oder
          gespeicherte fremde Informationen zu \u00fcberwachen oder nach Umst\u00e4nden zu
          forschen, die auf eine rechtswidrige T\u00e4tigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon unber\u00fchrt.
          Eine diesbez\u00fcgliche Haftung ist jedoch erst ab dem Zeitpunkt der
          Kenntnis einer konkreten Rechtsverletzung m\u00f6glich.
        </p>

        <h2>3. Haftung f\u00fcr Links</h2>
        <p>
          Unser Angebot enth\u00e4lt Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb k\u00f6nnen wir f\u00fcr diese fremden
          Inhalte auch keine Gew\u00e4hr \u00fcbernehmen. F\u00fcr die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich.
        </p>
        <p>
          Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf m\u00f6gliche
          Rechtsverst\u00f6\u00dfe \u00fcberpr\u00fcft. Rechtswidrige Inhalte waren zum Zeitpunkt der
          Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der
          verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung
          nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
          derartige Links umgehend entfernen.
        </p>

        <h2>4. Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem \u00f6sterreichischen Urheberrecht. Die
          Vervielf\u00e4ltigung, Bearbeitung, Verbreitung und jede Art der Verwertung
          au\u00dferhalb der Grenzen des Urheberrechts bed\u00fcrfen der schriftlichen
          Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien
          dieser Seite sind nur f\u00fcr den privaten, nicht kommerziellen Gebrauch
          gestattet.
        </p>

        <h2>5. Regulierungsinformationen</h2>
        <p>
          Die auf dieser Website dargestellten Informationen zu EU-Regulierungen
          (NISG 2026, EU AI Act, DORA, CRA und andere) basieren auf \u00f6ffentlich
          zug\u00e4nglichen Gesetzestexten, Verordnungen und offiziellen Quellen der
          Europ\u00e4ischen Union und der Republik \u00d6sterreich.
        </p>
        <p>
          Wir weisen ausdr\u00fccklich darauf hin, dass:
        </p>
        <ul>
          <li>Sich Gesetze und Verordnungen \u00e4ndern k\u00f6nnen und \u00dcbergangsfristen gelten k\u00f6nnen</li>
          <li>Die Auslegung durch Beh\u00f6rden und Gerichte von unserer Darstellung abweichen kann</li>
          <li>Nationale Umsetzungen (z.B. des NISG in \u00d6sterreich) Besonderheiten aufweisen k\u00f6nnen</li>
          <li>Fristen und Strafen sich durch Gesetzesnovellen \u00e4ndern k\u00f6nnen</li>
        </ul>
        <p>
          F\u00fcr verbindliche Rechtsauskunft wenden Sie sich bitte an eine
          Rechtsanwaltskanzlei oder die zust\u00e4ndige Beh\u00f6rde.
        </p>

        <h2>6. Interaktive Tools und Berechnungen</h2>
        <p>
          Die auf dieser Website angebotenen interaktiven Tools (darunter
          Regulierung-Finder, NIS2-Betroffenheits-Check, Compliance-Checkliste,
          Haftungs-Pr\u00fcfer, Bu\u00dfgeld-Rechner, Kosten-Kalkulator, Reifegrad-Check)
          dienen ausschlie\u00dflich der unverbindlichen Erstorientierung.
        </p>
        <p>
          Insbesondere weisen wir darauf hin:
        </p>
        <ul>
          <li>Bu\u00dfgeld-Berechnungen zeigen theoretische H\u00f6chstrahmen. Tats\u00e4chliche Strafen werden von zust\u00e4ndigen Beh\u00f6rden im Einzelfall festgelegt.</li>
          <li>Kosten-Kalkulationen basieren auf Durchschnittswerten und Marktbeobachtungen. Reale Implementierungskosten variieren erheblich.</li>
          <li>Betroffenheits-Checks ersetzen keine rechtliche Pr\u00fcfung der konkreten Anwendbarkeit einer Regulierung.</li>
          <li>Checklisten decken typische Anforderungen ab, k\u00f6nnen aber nicht alle branchenspezifischen oder unternehmensspezifischen Besonderheiten ber\u00fccksichtigen.</li>
        </ul>

        <h2>7. Software-Vergleiche und Empfehlungen</h2>
        <p>
          Die auf dieser Website dargestellten Software-Vergleiche und
          Tool-Empfehlungen basieren auf \u00f6ffentlich zug\u00e4nglichen Informationen,
          Herstellerangaben und eigener Recherche. Wir \u00fcbernehmen keine Gew\u00e4hr
          f\u00fcr die Richtigkeit, Vollst\u00e4ndigkeit oder Aktualit\u00e4t dieser Angaben.
          Preise, Funktionsumf\u00e4nge und Verf\u00fcgbarkeiten k\u00f6nnen sich jederzeit
          \u00e4ndern.
        </p>

        <h2>8. Verf\u00fcgbarkeit</h2>
        <p>
          Wir bem\u00fchen uns um eine unterbrechungsfreie Verf\u00fcgbarkeit unserer
          Website. Es kann jedoch zu vor\u00fcbergehenden Unterbrechungen kommen, f\u00fcr
          die wir keine Haftung \u00fcbernehmen.
        </p>

        <h2>9. \u00c4nderungsvorbehalt</h2>
        <p>
          Wir behalten uns vor, diesen Haftungsausschluss jederzeit zu \u00e4ndern
          oder zu aktualisieren. Die jeweils aktuelle Version gilt ab dem
          Zeitpunkt ihrer Ver\u00f6ffentlichung auf dieser Website.
        </p>

        <hr />

        <p>
          <em>Stand: Februar 2026</em>
        </p>
      </LegalPageLayout>
    </>
  );
}
