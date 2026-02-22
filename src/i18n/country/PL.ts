import type { CountryData } from "./types";

const PL: CountryData = {
  code: "PL",
  nameLocal: "Polska",
  nameEN: "Poland",
  nameDE: "Polen",
  flag: "🇵🇱",
  languages: ["pl"],
  euMemberSince: 2004,
  dpaName: "Urząd Ochrony Danych Osobowych (UODO)",
  dpaUrl: "https://uodo.gov.pl",
  csirtName: "CERT Polska (CERT.PL)",
  csirtUrl: "https://cert.pl",
  regulations: {
    nis2: {
      nationalLawName: "Ustawa o krajowym systemie cyberbezpieczeństwa (nowelizacja KSC)",
      authority: "Urząd Komunikacji Elektronicznej (UKE) / CERT Polska",
      authorityUrl: "https://www.uke.gov.pl",
      implementationStatus: "pending",
      nationalNotes: "Polen setzt NIS2 durch eine Novelle des KSC-Gesetzes um.",
    },
    dora: {
      authority: "Komisja Nadzoru Finansowego (KNF)",
      authorityUrl: "https://www.knf.gov.pl",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Ustawa o ochronie danych osobowych (UODO)",
      authority: "Urząd Ochrony Danych Osobowych (UODO)",
      authorityUrl: "https://uodo.gov.pl",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Urząd Komunikacji Elektronicznej (UKE)",
      authorityUrl: "https://www.uke.gov.pl",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Komisja Nadzoru Finansowego (KNF)",
      authorityUrl: "https://www.knf.gov.pl",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Ministerstwo Cyfryzacji / Naukowa i Akademicka Sieć Komputerowa (NASK)",
      authorityUrl: "https://www.gov.pl/web/cyfryzacja",
      implementationStatus: "pending",
      nationalNotes: "Polen designiert nationale Aufsichtsbehörden für den AI Act. Das Ministerium für Digitalisierung koordiniert.",
    },
    csrd: {
      authority: "Komisja Nadzoru Finansowego (KNF)",
      authorityUrl: "https://www.knf.gov.pl",
      implementationStatus: "implemented",
      nationalNotes: "Polen hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "CERT Polska / NASK",
      authorityUrl: "https://cert.pl",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). CERT Polska wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Ministerstwo Rodziny, Pracy i Polityki Społecznej",
      authorityUrl: "https://www.gov.pl/web/rodzina",
      implementationStatus: "pending",
      nationalNotes: "Polen setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Urząd Ochrony Konkurencji i Konsumentów (UOKiK)",
      authorityUrl: "https://www.uokik.gov.pl",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. UOKiK führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Urząd Ochrony Danych Osobowych (UODO) / UKE",
      authorityUrl: "https://uodo.gov.pl",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. UODO und UKE koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Urząd Ochrony Danych Osobowych (UODO)",
      authorityUrl: "https://uodo.gov.pl",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Polen wendet das Telekommunikationsgesetz (Prawo telekomunikacyjne) an.",
    },
    eidas: {
      authority: "Ministerstwo Cyfryzacji",
      authorityUrl: "https://www.gov.pl/web/cyfryzacja",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Polen betreibt Profil Zaufany (Vertrauensprofil) als digitale Identitätslösung.",
    },
    ehds: {
      authority: "Ministerstwo Zdrowia / Centrum e-Zdrowia (CeZ)",
      authorityUrl: "https://cez.gov.pl",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Polen baut auf dem e-Zdrowie-System als nationale Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "Urząd Ochrony Konkurencji i Konsumentów (UOKiK)",
      authorityUrl: "https://www.uokik.gov.pl",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in polnisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Ministerstwo Sprawiedliwości",
      authorityUrl: "https://www.gov.pl/web/sprawiedliwosc",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "Ministerstwo Klimatu i Środowiska",
      authorityUrl: "https://www.gov.pl/web/klimat",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default PL;
