import type { CountryData } from "./types";

const HR: CountryData = {
  code: "HR",
  nameLocal: "Hrvatska",
  nameEN: "Croatia",
  nameDE: "Kroatien",
  flag: "🇭🇷",
  languages: ["hr"],
  euMemberSince: 2013,
  dpaName: "Agencija za zaštitu osobnih podataka (AZOP)",
  dpaUrl: "https://azop.hr",
  csirtName: "CARNET CERT / SOA",
  csirtUrl: "https://www.cert.hr",
  regulations: {
    nis2: {
      authority: "Sigurnosno-obavještajna agencija (SOA) / HAKOM",
      authorityUrl: "https://www.soa.hr",
      implementationStatus: "pending",
    },
    dora: {
      authority: "Hrvatska narodna banka (HNB) / HANFA",
      authorityUrl: "https://www.hnb.hr",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Zakon o provedbi Opće uredbe o zaštiti podataka",
      authority: "Agencija za zaštitu osobnih podataka (AZOP)",
      authorityUrl: "https://azop.hr",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Hrvatska regulatorna agencija za mrežne djelatnosti (HAKOM)",
      authorityUrl: "https://www.hakom.hr",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Hrvatska agencija za nadzor financijskih usluga (HANFA)",
      authorityUrl: "https://www.hanfa.hr",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Hrvatska regulatorna agencija za mrežne djelatnosti (HAKOM)",
      authorityUrl: "https://www.hakom.hr",
      implementationStatus: "pending",
      nationalNotes: "Kroatien designiert nationale Aufsichtsbehörden für den AI Act.",
    },
    csrd: {
      authority: "Hrvatska agencija za nadzor financijskih usluga (HANFA)",
      authorityUrl: "https://www.hanfa.hr",
      implementationStatus: "implemented",
      nationalNotes: "Kroatien hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "CARNET CERT / SOA",
      authorityUrl: "https://www.cert.hr",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). CARNET CERT wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Ministarstvo rada, mirovinskoga sustava, obitelji i socijalne politike",
      authorityUrl: "https://www.mrosp.gov.hr",
      implementationStatus: "pending",
      nationalNotes: "Kroatien setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Državni inspektorat Republike Hrvatske",
      authorityUrl: "https://www.dirh.hr",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. Der Staatsinspektorat führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Agencija za zaštitu osobnih podataka (AZOP) / HAKOM",
      authorityUrl: "https://azop.hr",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. AZOP und HAKOM koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Agencija za zaštitu osobnih podataka (AZOP)",
      authorityUrl: "https://azop.hr",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Kroatien wendet das Gesetz über elektronische Kommunikation an.",
    },
    eidas: {
      authority: "FINA / Ministarstvo pravosuđa i uprave",
      authorityUrl: "https://www.fina.hr",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Kroatien betreibt e-Građani als nationale digitale Plattform.",
    },
    ehds: {
      authority: "Ministarstvo zdravstva / HZZO",
      authorityUrl: "https://www.miz.hr",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Kroatien baut auf dem CEZIH-System als nationale Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "Državni inspektorat Republike Hrvatske",
      authorityUrl: "https://www.dirh.hr",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in kroatisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Ministarstvo pravosuđa i uprave",
      authorityUrl: "https://www.mpu.gov.hr",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "Ministarstvo gospodarstva i održivog razvoja",
      authorityUrl: "https://www.mingo.gov.hr",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default HR;
