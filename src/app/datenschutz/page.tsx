import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – EU Compliance Hub",
  description: "Datenschutzerklärung gemäß DSGVO Art. 13 & 14. Informationen zur Datenerhebung, Cookies und Ihren Rechten.",
};

export default function DatenschutzPage() {
  return (
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

      <h3>2.2 Fristen-Radar (E-Mail-Benachrichtigungen)</h3>
      <p>
        Wenn Sie sich für unseren Fristen-Radar anmelden, speichern wir Ihre
        E-Mail-Adresse zum Zweck des Versands von Compliance-Fristen-Benachrichtigungen.
        Die Anmeldung erfolgt über ein Double-Opt-In-Verfahren. Rechtsgrundlage ist
        Ihre Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre
        Einwilligung jederzeit über den Abmelde-Link in jeder E-Mail widerrufen.
        Der Versand erfolgt maximal 3× pro Monat und nur bei kritischen Ereignissen.
      </p>

      <h3>2.3 Kontaktaufnahme</h3>
      <p>
        Wenn Sie uns per E-Mail kontaktieren, speichern wir Ihre Nachricht und
        Kontaktdaten zur Bearbeitung Ihres Anliegens. Rechtsgrundlage ist
        Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung bzw. -durchführung).
      </p>

      <h2>3. Cookies und Tracking</h2>
      <h3>3.1 Technisch notwendige Cookies</h3>
      <p>
        Wir setzen technisch notwendige Cookies ein, die für den Betrieb der
        Website erforderlich sind (z.B. Cookie-Consent-Präferenz). Diese Cookies
        erfordern keine Einwilligung (§ 165 Abs. 3 TKG 2021).
      </p>

      <h3>3.2 Analyse und Werbung</h3>
      <p>
        Analyse- und Werbe-Cookies (z.B. Google Analytics, Google Ads) werden
        nur mit Ihrer ausdrücklichen Einwilligung gesetzt. Sie können Ihre
        Einwilligung im Cookie-Banner jederzeit widerrufen oder anpassen.
      </p>

      <h2>4. Hosting</h2>
      <p>
        Unsere Website wird bei <strong>Vercel Inc.</strong> (San Francisco, USA) gehostet.
        Die Datenübertragung in die USA erfolgt auf Grundlage der
        EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO) sowie des
        EU-US Data Privacy Framework.
      </p>

      <h2>5. Datenweitergabe</h2>
      <p>
        Eine Weitergabe Ihrer Daten an Dritte erfolgt nur, wenn:
      </p>
      <ul>
        <li>Sie ausdrücklich eingewilligt haben (Art. 6 Abs. 1 lit. a DSGVO)</li>
        <li>Dies zur Vertragserfüllung erforderlich ist (Art. 6 Abs. 1 lit. b DSGVO)</li>
        <li>Eine gesetzliche Verpflichtung besteht (Art. 6 Abs. 1 lit. c DSGVO)</li>
      </ul>

      <h2>6. Speicherdauer</h2>
      <p>
        Personenbezogene Daten werden gelöscht, sobald der Zweck der Speicherung
        entfällt und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        Server-Logdaten werden nach maximal 30 Tagen gelöscht.
      </p>

      <h2>7. Ihre Rechte</h2>
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

      <h2>8. Adblocker-Erkennung</h2>
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

      <h2>9. Beschwerderecht</h2>
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
  );
}
