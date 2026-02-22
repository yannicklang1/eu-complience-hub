import type { CountryData } from "./types";

const FI: CountryData = {
  code: "FI",
  nameLocal: "Suomi",
  nameEN: "Finland",
  nameDE: "Finnland",
  flag: "🇫🇮",
  languages: ["fi", "sv"],
  euMemberSince: 1995,
  dpaName: "Tietosuojavaltuutetun toimisto (TSV)",
  dpaUrl: "https://tietosuoja.fi",
  csirtName: "TRAFICOM / NCSC-FI",
  csirtUrl: "https://www.kyberturvallisuuskeskus.fi",
  regulations: {
    nis2: {
      nationalLawName: "Kyberturvallisuuslaki",
      authority: "Liikenne- ja viestintävirasto Traficom (NCSC-FI)",
      authorityUrl: "https://www.traficom.fi",
      implementationStatus: "implemented",
    },
    dora: {
      authority: "Finanssivalvonta (Fiva)",
      authorityUrl: "https://www.finanssivalvonta.fi",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Tietosuojalaki (1050/2018)",
      authority: "Tietosuojavaltuutetun toimisto (TSV)",
      authorityUrl: "https://tietosuoja.fi",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Liikenne- ja viestintävirasto Traficom",
      authorityUrl: "https://www.traficom.fi",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Finanssivalvonta (Fiva)",
      authorityUrl: "https://www.finanssivalvonta.fi",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Liikenne- ja viestintävirasto Traficom / Tietosuojavaltuutetun toimisto",
      authorityUrl: "https://www.traficom.fi",
      implementationStatus: "pending",
      nationalNotes: "Finnland designiert nationale Aufsichtsbehörden für den AI Act. Traficom koordiniert.",
    },
    csrd: {
      authority: "Finanssivalvonta (Fiva)",
      authorityUrl: "https://www.finanssivalvonta.fi",
      implementationStatus: "implemented",
      nationalNotes: "Finnland hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "Liikenne- ja viestintävirasto Traficom (NCSC-FI)",
      authorityUrl: "https://www.traficom.fi",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). Traficom wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Työ- ja elinkeinoministeriö (TEM)",
      authorityUrl: "https://tem.fi",
      implementationStatus: "pending",
      nationalNotes: "Finnland setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Turvallisuus- ja kemikaalivirasto (Tukes)",
      authorityUrl: "https://tukes.fi",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. Tukes führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Tietosuojavaltuutetun toimisto (TSV) / Traficom",
      authorityUrl: "https://tietosuoja.fi",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. TSV und Traficom koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Tietosuojavaltuutetun toimisto (TSV)",
      authorityUrl: "https://tietosuoja.fi",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Finnland wendet die Bestimmungen des Gesetzes über elektronische Kommunikationsdienste an.",
    },
    eidas: {
      authority: "Digi- ja väestötietovirasto (DVV)",
      authorityUrl: "https://dvv.fi",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Finnland betreibt Suomi.fi als nationale digitale Identitätslösung.",
    },
    ehds: {
      authority: "Sosiaali- ja terveysministeriö (STM) / THL",
      authorityUrl: "https://stm.fi",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Finnland baut auf dem Kanta-System als nationale Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "Kuluttaja-asiamies / Kilpailu- ja kuluttajavirasto (KKV)",
      authorityUrl: "https://www.kkv.fi",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in finnisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Oikeusministeriö",
      authorityUrl: "https://oikeusministerio.fi",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden. Das finnische Produkthaftungsgesetz (Tuotevastuulaki) wird angepasst.",
    },
    dpp: {
      authority: "Ympäristöministeriö",
      authorityUrl: "https://ym.fi",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default FI;
