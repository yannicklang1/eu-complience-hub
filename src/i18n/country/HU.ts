import type { CountryData } from "./types";

const HU: CountryData = {
  code: "HU",
  nameLocal: "Magyarország",
  nameEN: "Hungary",
  nameDE: "Ungarn",
  flag: "🇭🇺",
  languages: ["hu"],
  euMemberSince: 2004,
  dpaName: "Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)",
  dpaUrl: "https://www.naih.hu",
  csirtName: "SZTFH / NBSZ",
  csirtUrl: "https://www.nbsz.gov.hu",
  regulations: {
    nis2: {
      authority: "Szabályozott Tevékenységek Felügyeleti Hatósága (SZTFH)",
      authorityUrl: "https://www.sztfh.hu",
      implementationStatus: "implemented",
    },
    dora: {
      authority: "Magyar Nemzeti Bank (MNB)",
      authorityUrl: "https://www.mnb.hu",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Az információs önrendelkezési jogról és az információszabadságról szóló 2011. évi CXII. törvény",
      authority: "Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)",
      authorityUrl: "https://www.naih.hu",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Nemzeti Média- és Hírközlési Hatóság (NMHH)",
      authorityUrl: "https://nmhh.hu",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Magyar Nemzeti Bank (MNB)",
      authorityUrl: "https://www.mnb.hu",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Szabályozott Tevékenységek Felügyeleti Hatósága (SZTFH) / NAIH",
      authorityUrl: "https://www.sztfh.hu",
      implementationStatus: "pending",
      nationalNotes: "Ungarn designiert nationale Aufsichtsbehörden für den AI Act.",
    },
    csrd: {
      authority: "Magyar Nemzeti Bank (MNB)",
      authorityUrl: "https://www.mnb.hu",
      implementationStatus: "implemented",
      nationalNotes: "Ungarn hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "Szabályozott Tevékenységek Felügyeleti Hatósága (SZTFH)",
      authorityUrl: "https://www.sztfh.hu",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). SZTFH wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Innovációs és Technológiai Minisztérium (ITM)",
      authorityUrl: "https://www.kormany.hu",
      implementationStatus: "pending",
      nationalNotes: "Ungarn setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Fogyasztóvédelmi Hatóság / Innovációs és Technológiai Minisztérium",
      authorityUrl: "https://www.kormany.hu",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. Die Verbraucherschutzbehörde führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH) / NMHH",
      authorityUrl: "https://www.naih.hu",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. NAIH und NMHH koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)",
      authorityUrl: "https://www.naih.hu",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Ungarn wendet das Gesetz über elektronische Kommunikation an.",
    },
    eidas: {
      authority: "Belügyminisztérium / NISZ Nemzeti Infokommunikációs Szolgáltató Zrt.",
      authorityUrl: "https://www.kormany.hu",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Ungarn betreibt Ügyfélkapu als digitale Identitätslösung.",
    },
    ehds: {
      authority: "Belügyminisztérium / Nemzeti Egészségbiztosítási Alapkezelő (NEAK)",
      authorityUrl: "https://www.neak.gov.hu",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Ungarn baut auf dem EESZT-System als nationale Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "Fogyasztóvédelmi Hatóság",
      authorityUrl: "https://www.kormany.hu",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in ungarisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Igazságügyi Minisztérium",
      authorityUrl: "https://www.kormany.hu",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "Energiaügyi Minisztérium",
      authorityUrl: "https://www.kormany.hu",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default HU;
