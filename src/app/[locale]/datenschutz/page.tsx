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
    title: "Datenschutzerkl\u00e4rung \u2013 EU Compliance Hub",
    description:
      "Datenschutzerkl\u00e4rung gem\u00e4\u00df DSGVO Art. 13 & 14 f\u00fcr den EU Compliance Hub. Informationen zur Datenerhebung, Cookies, Analyse-Tools und Ihren Betroffenenrechten. DSGVO-konform.",
  },
  en: {
    title: "Privacy Policy \u2013 EU Compliance Hub",
    description:
      "Privacy policy pursuant to GDPR Art. 13 & 14 for EU Compliance Hub. Information on data collection, cookies, analytics tools and your rights. GDPR-compliant.",
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

  const slug = "datenschutz";
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

export default async function DatenschutzPage({
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
        name: "Datenschutzerkl\u00e4rung",
        item: `${BASE_URL}/${locale}/datenschutz`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LegalPageLayout title="Datenschutzerkl\u00e4rung" subtitle="Informationen gem\u00e4\u00df DSGVO Art. 13 & 14">
        <h2>1. Verantwortlicher</h2>
        <p>
          <strong>[Vollst\u00e4ndiger Name / Firma]</strong><br />
          [Stra\u00dfe und Hausnummer]<br />
          [PLZ Ort], \u00d6sterreich<br />
          E-Mail: <a href="mailto:datenschutz@eu-compliance-hub.eu">datenschutz@eu-compliance-hub.eu</a>
        </p>

        <h2>2. Erhobene Daten</h2>
        <h3>2.1 Automatisch erfasste Daten</h3>
        <p>
          Beim Besuch unserer Website werden automatisch folgende Daten durch
          unseren Hosting-Anbieter (Vercel Inc.) erfasst:
        </p>
        <ul>
          <li>IP-Adresse (anonymisiert gespeichert)</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>Angeforderte URL und Referrer-URL</li>
          <li>Browser-Typ und Betriebssystem</li>
        </ul>
        <p>
          Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an der Bereitstellung und Absicherung der Website).
        </p>

        <h3>2.2 Compliance-Briefing (E-Mail-Benachrichtigungen)</h3>
        <p>
          Wenn Sie das Compliance-Briefing aktivieren, speichern wir Ihre
          E-Mail-Adresse zum Zweck des Versands von regulatorischen Briefings zu
          kritischen Compliance-Fristen und Gesetz\u00e4nderungen.
          Die Aktivierung erfolgt \u00fcber ein Double-Opt-In-Verfahren. Rechtsgrundlage ist
          Ihre Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO. Sie k\u00f6nnen Ihre
          Einwilligung jederzeit \u00fcber den Abmelde-Link in jeder E-Mail widerrufen.
          Der Versand erfolgt maximal 3\u00d7 pro Monat und nur bei kritischen Ereignissen.
        </p>

        <h3 id="werbe-inhalte">2.3 Werbe- und Affiliate-Inhalte</h3>
        <p>
          Unsere Website enth\u00e4lt Empfehlungen f\u00fcr Compliance-Software-Tools mit
          sogenannten Affiliate-Links. Diese Links sind als <strong>{"\u201eAnzeige\u201c"}</strong> gekennzeichnet
          (\u00a7&nbsp;26 MedienG, \u00a7&nbsp;5a UWG, \u00a7&nbsp;6 DDG). Wenn Sie \u00fcber einen solchen Link ein Produkt
          erwerben, erhalten wir m\u00f6glicherweise eine Provision vom Anbieter. F\u00fcr Sie entstehen
          keine Mehrkosten.
        </p>
        <p>
          Im Rahmen des Compliance-Briefings k\u00f6nnen optional auch Hinweise auf gepr\u00fcfte
          Compliance-Tools versendet werden. Solche kommerziellen Inhalte werden in jeder E-Mail
          klar als <strong>{"\u201eAnzeige\u201c"}</strong> gekennzeichnet. Der Versand kommerzieller Inhalte
          erfolgt nur, wenn Sie bei der Anmeldung die separate Einwilligung hierf\u00fcr erteilt haben
          (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO, \u00a7&nbsp;174 TKG 2021). Sie k\u00f6nnen diese Einwilligung
          jederzeit widerrufen.
        </p>

        <h3>2.4 Kontaktaufnahme</h3>
        <p>
          Wenn Sie uns per E-Mail kontaktieren, speichern wir Ihre Nachricht und
          Kontaktdaten zur Bearbeitung Ihres Anliegens. Rechtsgrundlage ist
          Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung bzw. -durchf\u00fchrung).
        </p>

        <h2>3. Cookies und Tracking</h2>
        <p>
          Unser Cookie-Banner bietet Ihnen granulare Kontrolle \u00fcber drei
          Kategorien. Sie k\u00f6nnen Ihre Einstellungen jederzeit \u00fcber den Link
          {"\u201eCookie-Einstellungen\u201c"} im Fu\u00dfbereich der Website \u00e4ndern.
        </p>

        <h3>3.1 Technisch notwendige Cookies</h3>
        <p>
          F\u00fcr den Betrieb der Website erforderlich (z.B. Cookie-Consent-Pr\u00e4ferenz,
          Adblocker-Status). Diese Cookies erfordern keine Einwilligung
          (\u00a7&nbsp;165 Abs.&nbsp;3 TKG 2021) und k\u00f6nnen nicht deaktiviert werden.
        </p>
        <ul>
          <li><strong>eu-compliance-hub-cookie-consent-v2</strong> \u2014 Ihre Cookie-Einstellungen (localStorage, unbegrenzt)</li>
          <li><strong>eu-compliance-hub-adblock</strong> \u2014 Adblocker-Status (localStorage, 24h)</li>
        </ul>

        <h3>3.2 Analyse-Cookies</h3>
        <p>
          Anonyme Nutzungsstatistiken zur Verbesserung der Website. Werden nur mit
          Ihrer ausdr\u00fccklichen Einwilligung gesetzt.
        </p>
        <ul>
          <li><strong>Google Analytics 4</strong> \u2014 Anonymisierte Seitenaufrufe und Nutzungsverhalten (IP-Anonymisierung aktiviert). Anbieter: Google Ireland Ltd. Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO.</li>
        </ul>

        <h3>3.3 Werbe-Cookies</h3>
        <p>
          Personalisierte Werbung und Anzeigen. Werden nur mit Ihrer
          ausdr\u00fccklichen Einwilligung gesetzt.
        </p>
        <ul>
          <li><strong>Google AdSense</strong> \u2014 Einblendung relevanter Werbeanzeigen. Anbieter: Google Ireland Ltd. Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO.</li>
        </ul>

        <h3>3.4 Interaktive Tools</h3>
        <p>
          Unsere interaktiven Compliance-Tools (Regulierung-Finder, NIS2-Check,
          Bu\u00dfgeld-Rechner, Kosten-Kalkulator, Reifegrad-Check, Compliance-Checkliste,
          Haftungs-Pr\u00fcfer) verarbeiten alle Eingaben ausschlie\u00dflich clientseitig in Ihrem
          Browser. Es werden keine Eingabedaten an unsere Server \u00fcbertragen, sofern
          Sie nicht das optionale Ergebnis-per-E-Mail-Formular nutzen.
        </p>
        <p>
          Wenn Sie Ihre Tool-Ergebnisse per E-Mail erhalten m\u00f6chten, werden die
          Ergebnisdaten zusammen mit Ihrer E-Mail-Adresse an unseren Server
          \u00fcbermittelt und verarbeitet. Rechtsgrundlage ist Ihre Einwilligung gem.
          Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO.
        </p>

        <h2>4. Auftragsverarbeiter</h2>
        <p>
          Zur Bereitstellung unserer Dienste setzen wir folgende Auftragsverarbeiter ein:
        </p>
        <ul>
          <li><strong>Vercel Inc.</strong> (USA) \u2014 Hosting der Website. Grundlage: EU-Standardvertragsklauseln, EU-US Data Privacy Framework.</li>
          <li><strong>Supabase Inc.</strong> (USA) \u2014 Datenbankspeicherung f\u00fcr Newsletter-Anmeldungen und Lead-Daten. Grundlage: EU-Standardvertragsklauseln.</li>
          <li><strong>Resend Inc.</strong> (USA) \u2014 Transaktionaler E-Mail-Versand (Double-Opt-In-Best\u00e4tigung, Welcome-E-Mails). Grundlage: EU-Standardvertragsklauseln.</li>
          <li><strong>Google Ireland Ltd.</strong> (Irland) \u2014 Analyse (Google Analytics 4) und Werbung (Google AdSense), jeweils nur mit Ihrer Einwilligung.</li>
        </ul>

        <h2>5. Hosting</h2>
        <p>
          Unsere Website wird bei <strong>Vercel Inc.</strong> (San Francisco, USA) gehostet.
          Die Daten\u00fcbertragung in die USA erfolgt auf Grundlage der
          EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO) sowie des
          EU-US Data Privacy Framework.
        </p>

        <h2>6. Datenweitergabe</h2>
        <p>
          Eine Weitergabe Ihrer Daten an Dritte erfolgt nur, wenn:
        </p>
        <ul>
          <li>Sie ausdr\u00fccklich eingewilligt haben (Art. 6 Abs. 1 lit. a DSGVO)</li>
          <li>Dies zur Vertragserf\u00fcllung erforderlich ist (Art. 6 Abs. 1 lit. b DSGVO)</li>
          <li>Eine gesetzliche Verpflichtung besteht (Art. 6 Abs. 1 lit. c DSGVO)</li>
        </ul>

        <h2>7. Speicherdauer</h2>
        <p>
          Personenbezogene Daten werden gel\u00f6scht, sobald der Zweck der Speicherung
          entf\u00e4llt und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          Server-Logdaten werden nach maximal 30 Tagen gel\u00f6scht.
        </p>

        <h2>8. Ihre Rechte</h2>
        <p>
          Sie haben folgende Rechte bez\u00fcglich Ihrer personenbezogenen Daten:
        </p>
        <ul>
          <li><strong>Auskunft</strong> (Art. 15 DSGVO) \u2013 Welche Daten wir \u00fcber Sie speichern</li>
          <li><strong>Berichtigung</strong> (Art. 16 DSGVO) \u2013 Korrektur unrichtiger Daten</li>
          <li><strong>L\u00f6schung</strong> (Art. 17 DSGVO) \u2013 Recht auf Vergessenwerden</li>
          <li><strong>Einschr\u00e4nkung</strong> (Art. 18 DSGVO) \u2013 Einschr\u00e4nkung der Verarbeitung</li>
          <li><strong>Daten\u00fcbertragbarkeit</strong> (Art. 20 DSGVO) \u2013 Export Ihrer Daten</li>
          <li><strong>Widerspruch</strong> (Art. 21 DSGVO) \u2013 Widerspruch gegen Verarbeitung</li>
        </ul>
        <p>
          Zur Aus\u00fcbung Ihrer Rechte kontaktieren Sie uns unter{" "}
          <a href="mailto:datenschutz@eu-compliance-hub.eu">datenschutz@eu-compliance-hub.eu</a>.
        </p>

        <h2>9. Adblocker-Erkennung</h2>
        <p>
          Wir setzen eine clientseitige Adblocker-Erkennung ein, um Nutzer auf die
          Bedeutung von Werbeeinnahmen f\u00fcr unser kostenloses Angebot hinzuweisen.
        </p>
        <p>
          Die Erkennung erfolgt ausschlie\u00dflich im Browser des Nutzers. Es werden
          dabei keine personenbezogenen Daten erhoben, gespeichert oder an Server
          \u00fcbertragen. Die Erkennung verwendet:
        </p>
        <ul>
          <li>Ein HTML-Element mit Werbeklassen-Bezeichnungen zur Pr\u00fcfung, ob Elemente ausgeblendet werden</li>
          <li>Einen Ladeversuche einer JavaScript-Datei mit werbetypischem Dateinamen</li>
          <li>Einen Netzwerk-Request zu einer lokalen Ressource</li>
        </ul>
        <p>
          Die Ergebnis-Pr\u00e4ferenz (Anzahl der Schlie\u00dfvorg\u00e4nge des Hinweises) wird
          ausschlie\u00dflich in Ihrem lokalen Browser-Speicher (localStorage)
          gespeichert und nach 24 Stunden automatisch zur\u00fcckgesetzt. Es findet
          keine Nutzer-Identifikation statt. Die Rechtsgrundlage ist Art. 6 Abs. 1
          lit. f DSGVO (berechtigtes Interesse an der Finanzierung des Angebots).
        </p>

        <h2>10. Beschwerderecht</h2>
        <p>
          Sie haben das Recht, eine Beschwerde bei der zust\u00e4ndigen
          Aufsichtsbeh\u00f6rde einzureichen:
        </p>
        <p>
          <strong>\u00d6sterreichische Datenschutzbeh\u00f6rde</strong><br />
          Barichgasse 40-42, 1030 Wien<br />
          E-Mail: dsb@dsb.gv.at<br />
          Website: <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer">www.dsb.gv.at</a>
        </p>

        <hr />

        <p>
          <em>Stand: Februar 2026</em>
        </p>
      </LegalPageLayout>
    </>
  );
}
