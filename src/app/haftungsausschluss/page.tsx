import type { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Haftungsausschluss – EU Compliance Hub",
  description:
    "Haftungsausschluss des EU Compliance Hub: Keine Rechtsberatung, Haftungsbeschränkung für redaktionelle Inhalte, externe Links und regulatorische Informationen gemäß ECG.",
  openGraph: {
    title: "Haftungsausschluss – EU Compliance Hub",
    description:
      "Haftungsausschluss und Disclaimer für Compliance-Informationen gemäß ECG.",
    url: `${BASE_URL}/haftungsausschluss`,
  },
  alternates: { canonical: `${BASE_URL}/haftungsausschluss` },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: SITE_NAME, item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Haftungsausschluss", item: `${BASE_URL}/haftungsausschluss` },
  ],
};

export default function HaftungsausschlussPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    <LegalPageLayout title="Haftungsausschluss" subtitle="Disclaimer und Haftungsbeschränkung">
      <h2>1. Keine Rechtsberatung</h2>
      <p>
        Die auf dieser Website bereitgestellten Informationen dienen
        ausschließlich der allgemeinen Information und stellen keine
        Rechtsberatung dar. Die Inhalte ersetzen nicht die individuelle
        juristische Beratung durch eine qualifizierte Rechtsanwältin oder einen
        qualifizierten Rechtsanwalt.
      </p>
      <p>
        Obwohl wir uns bemühen, die Informationen aktuell, vollständig und
        richtig bereitzustellen, können wir keine Gewähr für die Richtigkeit,
        Vollständigkeit oder Aktualität der Inhalte übernehmen. Die Anwendung
        der Informationen auf individuelle Sachverhalte erfolgt auf eigenes
        Risiko.
      </p>

      <h2>2. Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 ECG für eigene Inhalte
        auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
        §§ 8 bis 10 ECG sind wir jedoch nicht verpflichtet, übermittelte oder
        gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
        forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>
      <p>
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
        Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
        Kenntnis einer konkreten Rechtsverletzung möglich.
      </p>

      <h2>3. Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich.
      </p>
      <p>
        Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
        Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
        Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der
        verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung
        nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
        derartige Links umgehend entfernen.
      </p>

      <h2>4. Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem österreichischen Urheberrecht. Die
        Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
        außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
        Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien
        dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch
        gestattet.
      </p>

      <h2>5. Regulierungsinformationen</h2>
      <p>
        Die auf dieser Website dargestellten Informationen zu EU-Regulierungen
        (NISG 2026, EU AI Act, DORA, CRA und andere) basieren auf öffentlich
        zugänglichen Gesetzestexten, Verordnungen und offiziellen Quellen der
        Europäischen Union und der Republik Österreich.
      </p>
      <p>
        Wir weisen ausdrücklich darauf hin, dass:
      </p>
      <ul>
        <li>Sich Gesetze und Verordnungen ändern können und Übergangsfristen gelten können</li>
        <li>Die Auslegung durch Behörden und Gerichte von unserer Darstellung abweichen kann</li>
        <li>Nationale Umsetzungen (z.B. des NISG in Österreich) Besonderheiten aufweisen können</li>
        <li>Fristen und Strafen sich durch Gesetzesnovellen ändern können</li>
      </ul>
      <p>
        Für verbindliche Rechtsauskunft wenden Sie sich bitte an eine
        Rechtsanwaltskanzlei oder die zuständige Behörde.
      </p>

      <h2>6. Interaktive Tools und Berechnungen</h2>
      <p>
        Die auf dieser Website angebotenen interaktiven Tools (darunter
        Regulierung-Finder, NIS2-Betroffenheits-Check, Compliance-Checkliste,
        Haftungs-Prüfer, Bußgeld-Rechner, Kosten-Kalkulator, Reifegrad-Check)
        dienen ausschließlich der unverbindlichen Erstorientierung.
      </p>
      <p>
        Insbesondere weisen wir darauf hin:
      </p>
      <ul>
        <li>Bußgeld-Berechnungen zeigen theoretische Höchstrahmen. Tatsächliche Strafen werden von zuständigen Behörden im Einzelfall festgelegt.</li>
        <li>Kosten-Kalkulationen basieren auf Durchschnittswerten und Marktbeobachtungen. Reale Implementierungskosten variieren erheblich.</li>
        <li>Betroffenheits-Checks ersetzen keine rechtliche Prüfung der konkreten Anwendbarkeit einer Regulierung.</li>
        <li>Checklisten decken typische Anforderungen ab, können aber nicht alle branchenspezifischen oder unternehmensspezifischen Besonderheiten berücksichtigen.</li>
      </ul>

      <h2>7. Software-Vergleiche und Empfehlungen</h2>
      <p>
        Die auf dieser Website dargestellten Software-Vergleiche und
        Tool-Empfehlungen basieren auf öffentlich zugänglichen Informationen,
        Herstellerangaben und eigener Recherche. Wir übernehmen keine Gewähr
        für die Richtigkeit, Vollständigkeit oder Aktualität dieser Angaben.
        Preise, Funktionsumfänge und Verfügbarkeiten können sich jederzeit
        ändern.
      </p>

      <h2>8. Verfügbarkeit</h2>
      <p>
        Wir bemühen uns um eine unterbrechungsfreie Verfügbarkeit unserer
        Website. Es kann jedoch zu vorübergehenden Unterbrechungen kommen, für
        die wir keine Haftung übernehmen.
      </p>

      <h2>9. Änderungsvorbehalt</h2>
      <p>
        Wir behalten uns vor, diesen Haftungsausschluss jederzeit zu ändern
        oder zu aktualisieren. Die jeweils aktuelle Version gilt ab dem
        Zeitpunkt ihrer Veröffentlichung auf dieser Website.
      </p>

      <hr />

      <p>
        <em>Stand: Februar 2026</em>
      </p>
    </LegalPageLayout>
    </>
  );
}
