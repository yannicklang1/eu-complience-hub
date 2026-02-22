import type { CountryData } from "./types";

const SE: CountryData = {
  code: "SE",
  nameLocal: "Sverige",
  nameEN: "Sweden",
  nameDE: "Schweden",
  flag: "🇸🇪",
  languages: ["sv"],
  euMemberSince: 1995,
  dpaName: "Integritetsskyddsmyndigheten (IMY)",
  dpaUrl: "https://www.imy.se",
  csirtName: "NCSC-SE / CERT-SE",
  csirtUrl: "https://www.ncsc.se",
  regulations: {
    nis2: {
      nationalLawName: "Lag om cybersäkerhet (Cybersäkerhetslagen)",
      authority: "Myndigheten för samhällsskydd och beredskap (MSB)",
      authorityUrl: "https://www.msb.se",
      implementationStatus: "implemented",
      nationalNotes: "Schweden hat NIS2 durch das Cybersäkerhetslagen umgesetzt.",
    },
    dora: {
      authority: "Finansinspektionen (FI)",
      authorityUrl: "https://www.fi.se",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Lag (2018:218) med kompletterande bestämmelser till EU:s dataskyddsförordning",
      authority: "Integritetsskyddsmyndigheten (IMY)",
      authorityUrl: "https://www.imy.se",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Post- och telestyrelsen (PTS)",
      authorityUrl: "https://www.pts.se",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Finansinspektionen (FI)",
      authorityUrl: "https://www.fi.se",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Integritetsskyddsmyndigheten (IMY) / Myndigheten för digital förvaltning (DIGG)",
      authorityUrl: "https://www.imy.se",
      implementationStatus: "pending",
      nationalNotes: "Schweden designiert nationale Aufsichtsbehörden für den AI Act. IMY und DIGG koordinieren.",
    },
    csrd: {
      authority: "Finansinspektionen (FI)",
      authorityUrl: "https://www.fi.se",
      implementationStatus: "implemented",
      nationalNotes: "Schweden hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "Myndigheten för samhällsskydd och beredskap (MSB)",
      authorityUrl: "https://www.msb.se",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). MSB wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Upphandlingsmyndigheten / Arbetsmiljöverket",
      authorityUrl: "https://www.upphandlingsmyndigheten.se",
      implementationStatus: "pending",
      nationalNotes: "Schweden setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Konsumentverket / Marknadskontrollrådet",
      authorityUrl: "https://www.konsumentverket.se",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. Konsumentverket führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Integritetsskyddsmyndigheten (IMY) / Post- och telestyrelsen (PTS)",
      authorityUrl: "https://www.imy.se",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. IMY und PTS koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Integritetsskyddsmyndigheten (IMY)",
      authorityUrl: "https://www.imy.se",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Schweden wendet das Gesetz über elektronische Kommunikation (LEK) an.",
    },
    eidas: {
      authority: "Myndigheten för digital förvaltning (DIGG)",
      authorityUrl: "https://www.digg.se",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Schweden nutzt BankID als weit verbreitete digitale Identitätslösung.",
    },
    ehds: {
      authority: "E-hälsomyndigheten / Socialstyrelsen",
      authorityUrl: "https://www.ehalsomyndigheten.se",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Schweden baut auf der E-hälsomyndigheten als nationale Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "Konsumentverket",
      authorityUrl: "https://www.konsumentverket.se",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in schwedisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Justitiedepartementet",
      authorityUrl: "https://www.regeringen.se",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden. Das schwedische Produkthaftungsgesetz (Produktansvarslagen) wird angepasst.",
    },
    dpp: {
      authority: "Naturvårdsverket",
      authorityUrl: "https://www.naturvardsverket.se",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default SE;
