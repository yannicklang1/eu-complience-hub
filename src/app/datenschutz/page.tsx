import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – EU Compliance Hub",
  description:
    "Datenschutzerklärung gemäß DSGVO Art. 13 & 14 für den EU Compliance Hub. Informationen zur Datenerhebung, Cookies, Analyse-Tools und Ihren Betroffenenrechten. DSGVO-konform.",
  openGraph: {
    title: "Datenschutzerklärung – EU Compliance Hub",
    description:
      "DSGVO-konforme Datenschutzerklärung: Datenerhebung, Cookies und Ihre Rechte.",
    url: `${BASE_URL}/datenschutz`,
  },
  alternates: { canonical: `${BASE_URL}/datenschutz` },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: SITE_NAME, item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Datenschutzerklärung", item: `${BASE_URL}/datenschutz` },
  ],
};

export default function DatenschutzPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <LegalPageLayout title="Datenschutzerklärung" subtitle="Informationen gemäß DSGVO Art. 13 & 14">
      <h2>1. Verantwortlicher</h2>
      <p>
        <strong>[Vollständiger Name / Firma]</strong><br />
        [Straße und Hausnummer]<br />
        [PLZ Ort], Österreich<br />
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
        kritischen Compliance-Fristen und Gesetzesänderungen.
        Die Aktivierung erfolgt über ein Double-Opt-In-Verfahren. Rechtsgrundlage ist
        Ihre Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre
        Einwilligung jederzeit über den Abmelde-Link in jeder E-Mail widerrufen.
        Der Versand erfolgt maximal 3× pro Monat und nur bei kritischen Ereignissen.
      </p>

      <h3 id="werbe-inhalte">2.3 Werbe- und Affiliate-Inhalte</h3>
      <p>
        Unsere Website enthält Empfehlungen für Compliance-Software-Tools mit
        sogenannten Affiliate-Links. Diese Links sind als <strong>{"\u201EAnzeige\u201D"}</strong> gekennzeichnet
        (§&nbsp;26 MedienG, §&nbsp;5a UWG, §&nbsp;6 DDG). Wenn Sie über einen solchen Link ein Produkt
        erwerben, erhalten wir möglicherweise eine Provision vom Anbieter. Für Sie entstehen
        keine Mehrkosten.
      </p>
      <p>
        Im Rahmen des Compliance-Briefings können optional auch Hinweise auf geprüfte
        Compliance-Tools versendet werden. Solche kommerziellen Inhalte werden in jeder E-Mail
        klar als <strong>{"\u201EAnzeige\u201D"}</strong> gekennzeichnet. Der Versand kommerzieller Inhalte
        erfolgt nur, wenn Sie bei der Anmeldung die separate Einwilligung hierfür erteilt haben
        (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO, §&nbsp;174 TKG 2021). Sie können diese Einwilligung
        jederzeit widerrufen.
      </p>

      <h3>2.4 Kontaktaufnahme</h3>
      <p>
        Wenn Sie uns per E-Mail kontaktieren, speichern wir Ihre Nachricht und
        Kontaktdaten zur Bearbeitung Ihres Anliegens. Rechtsgrundlage ist
        Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung bzw. -durchführung).
      </p>

      <h2>3. Cookies und Tracking</h2>
      <p>
        Unser Cookie-Banner bietet Ihnen granulare Kontrolle über drei
        Kategorien. Sie können Ihre Einstellungen jederzeit über den Link
        {"\u201ECookie-Einstellungen\u201D"} im Fußbereich der Website ändern.
      </p>

      <h3>3.1 Technisch notwendige Cookies</h3>
      <p>
        Für den Betrieb der Website erforderlich (z.B. Cookie-Consent-Präferenz,
        Adblocker-Status). Diese Cookies erfordern keine Einwilligung
        (§&nbsp;165 Abs.&nbsp;3 TKG 2021) und können nicht deaktiviert werden.
      </p>
      <ul>
        <li><strong>eu-compliance-hub-cookie-consent-v2</strong> — Ihre Cookie-Einstellungen (localStorage, unbegrenzt)</li>
        <li><strong>eu-compliance-hub-adblock</strong> — Adblocker-Status (localStorage, 24h)</li>
      </ul>

      <h3>3.2 Analyse-Cookies</h3>
      <p>
        Anonyme Nutzungsstatistiken zur Verbesserung der Website. Werden nur mit
        Ihrer ausdrücklichen Einwilligung gesetzt.
      </p>
      <ul>
        <li><strong>Google Analytics 4</strong> — Anonymisierte Seitenaufrufe und Nutzungsverhalten (IP-Anonymisierung aktiviert). Anbieter: Google Ireland Ltd. Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO.</li>
      </ul>

      <h3>3.3 Werbe-Cookies</h3>
      <p>
        Personalisierte Werbung und Anzeigen. Werden nur mit Ihrer
        ausdrücklichen Einwilligung gesetzt.
      </p>
      <ul>
        <li><strong>Google AdSense</strong> — Einblendung relevanter Werbeanzeigen. Anbieter: Google Ireland Ltd. Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO.</li>
      </ul>

      <h3>3.4 Interaktive Tools</h3>
      <p>
        Unsere interaktiven Compliance-Tools (Regulierung-Finder, NIS2-Check,
        Bußgeld-Rechner, Kosten-Kalkulator, Reifegrad-Check, Compliance-Checkliste,
        Haftungs-Prüfer) verarbeiten alle Eingaben ausschließlich clientseitig in Ihrem
        Browser. Es werden keine Eingabedaten an unsere Server übertragen, sofern
        Sie nicht das optionale Ergebnis-per-E-Mail-Formular nutzen.
      </p>
      <p>
        Wenn Sie Ihre Tool-Ergebnisse per E-Mail erhalten möchten, werden die
        Ergebnisdaten zusammen mit Ihrer E-Mail-Adresse an unseren Server
        übermittelt und verarbeitet. Rechtsgrundlage ist Ihre Einwilligung gem.
        Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO.
      </p>

      <h2>4. Auftragsverarbeiter</h2>
      <p>
        Zur Bereitstellung unserer Dienste setzen wir folgende Auftragsverarbeiter ein:
      </p>
      <ul>
        <li><strong>Vercel Inc.</strong> (USA) — Hosting der Website. Grundlage: EU-Standardvertragsklauseln, EU-US Data Privacy Framework.</li>
        <li><strong>Supabase Inc.</strong> (USA) — Datenbankspeicherung für Newsletter-Anmeldungen und Lead-Daten. Grundlage: EU-Standardvertragsklauseln.</li>
        <li><strong>Resend Inc.</strong> (USA) — Transaktionaler E-Mail-Versand (Double-Opt-In-Bestätigung, Welcome-E-Mails). Grundlage: EU-Standardvertragsklauseln.</li>
        <li><strong>Google Ireland Ltd.</strong> (Irland) — Analyse (Google Analytics 4) und Werbung (Google AdSense), jeweils nur mit Ihrer Einwilligung.</li>
      </ul>

      <h2>5. Hosting</h2>
      <p>
        Unsere Website wird bei <strong>Vercel Inc.</strong> (San Francisco, USA) gehostet.
        Die Datenübertragung in die USA erfolgt auf Grundlage der
        EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO) sowie des
        EU-US Data Privacy Framework.
      </p>

      <h2>6. Datenweitergabe</h2>
      <p>
        Eine Weitergabe Ihrer Daten an Dritte erfolgt nur, wenn:
      </p>
      <ul>
        <li>Sie ausdrücklich eingewilligt haben (Art. 6 Abs. 1 lit. a DSGVO)</li>
        <li>Dies zur Vertragserfüllung erforderlich ist (Art. 6 Abs. 1 lit. b DSGVO)</li>
        <li>Eine gesetzliche Verpflichtung besteht (Art. 6 Abs. 1 lit. c DSGVO)</li>
      </ul>

      <h2>7. Speicherdauer</h2>
      <p>
        Personenbezogene Daten werden gelöscht, sobald der Zweck der Speicherung
        entfällt und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        Server-Logdaten werden nach maximal 30 Tagen gelöscht.
      </p>

      <h2>8. Ihre Rechte</h2>
      <p>
        Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
      </p>
      <ul>
        <li><strong>Auskunft</strong> (Art. 15 DSGVO) – Welche Daten wir über Sie speichern</li>
        <li><strong>Berichtigung</strong> (Art. 16 DSGVO) – Korrektur unrichtiger Daten</li>
        <li><strong>Löschung</strong> (Art. 17 DSGVO) – Recht auf Vergessenwerden</li>
        <li><strong>Einschränkung</strong> (Art. 18 DSGVO) – Einschränkung der Verarbeitung</li>
        <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO) – Export Ihrer Daten</li>
        <li><strong>Widerspruch</strong> (Art. 21 DSGVO) – Widerspruch gegen Verarbeitung</li>
      </ul>
      <p>
        Zur Ausübung Ihrer Rechte kontaktieren Sie uns unter{" "}
        <a href="mailto:datenschutz@eu-compliance-hub.eu">datenschutz@eu-compliance-hub.eu</a>.
      </p>

      <h2>9. Adblocker-Erkennung</h2>
      <p>
        Wir setzen eine clientseitige Adblocker-Erkennung ein, um Nutzer auf die
        Bedeutung von Werbeeinnahmen für unser kostenloses Angebot hinzuweisen.
      </p>
      <p>
        Die Erkennung erfolgt ausschließlich im Browser des Nutzers. Es werden
        dabei keine personenbezogenen Daten erhoben, gespeichert oder an Server
        übertragen. Die Erkennung verwendet:
      </p>
      <ul>
        <li>Ein HTML-Element mit Werbeklassen-Bezeichnungen zur Prüfung, ob Elemente ausgeblendet werden</li>
        <li>Einen Ladeversuche einer JavaScript-Datei mit werbetypischem Dateinamen</li>
        <li>Einen Netzwerk-Request zu einer lokalen Ressource</li>
      </ul>
      <p>
        Die Ergebnis-Präferenz (Anzahl der Schließvorgänge des Hinweises) wird
        ausschließlich in Ihrem lokalen Browser-Speicher (localStorage)
        gespeichert und nach 24 Stunden automatisch zurückgesetzt. Es findet
        keine Nutzer-Identifikation statt. Die Rechtsgrundlage ist Art. 6 Abs. 1
        lit. f DSGVO (berechtigtes Interesse an der Finanzierung des Angebots).
      </p>

      <h2>10. Beschwerderecht</h2>
      <p>
        Sie haben das Recht, eine Beschwerde bei der zuständigen
        Aufsichtsbehörde einzureichen:
      </p>
      <p>
        <strong>Österreichische Datenschutzbehörde</strong><br />
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
