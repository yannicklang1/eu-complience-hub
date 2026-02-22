import type { CountryData } from "./types";

const SI: CountryData = {
  code: "SI",
  nameLocal: "Slovenija",
  nameEN: "Slovenia",
  nameDE: "Slowenien",
  flag: "🇸🇮",
  languages: ["sl"],
  euMemberSince: 2004,
  dpaName: "Informacijski pooblaščenec (IP)",
  dpaUrl: "https://www.ip-rs.si",
  csirtName: "SI-CERT / ARNES",
  csirtUrl: "https://www.si-cert.si",
  regulations: {
    nis2: {
      authority: "Urad informacijskega pooblaščenca / AKOS",
      authorityUrl: "https://www.ip-rs.si",
      implementationStatus: "pending",
    },
    dora: {
      authority: "Banka Slovenije / Agencija za trg vrednostnih papirjev (ATVP)",
      authorityUrl: "https://www.bsi.si",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Zakon o varstvu osebnih podatkov (ZVOP-2)",
      authority: "Informacijski pooblaščenec (IP)",
      authorityUrl: "https://www.ip-rs.si",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Agencija za komunikacijska omrežja in storitve (AKOS)",
      authorityUrl: "https://www.akos-rs.si",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Agencija za trg vrednostnih papirjev (ATVP)",
      authorityUrl: "https://www.atvp.si",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Agencija za komunikacijska omrežja in storitve (AKOS) / IP",
      authorityUrl: "https://www.akos-rs.si",
      implementationStatus: "pending",
      nationalNotes: "Slowenien designiert nationale Aufsichtsbehörden für den AI Act.",
    },
    csrd: {
      authority: "Agencija za trg vrednostnih papirjev (ATVP)",
      authorityUrl: "https://www.atvp.si",
      implementationStatus: "implemented",
      nationalNotes: "Slowenien hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "SI-CERT / ARNES",
      authorityUrl: "https://www.si-cert.si",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). SI-CERT wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Ministrstvo za delo, družino, socialne zadeve in enake možnosti",
      authorityUrl: "https://www.gov.si/drzavni-organi/ministrstva/ministrstvo-za-delo-druzino-socialne-zadeve-in-enake-moznosti",
      implementationStatus: "pending",
      nationalNotes: "Slowenien setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Tržni inšpektorat Republike Slovenije (TIRS)",
      authorityUrl: "https://www.ti.gov.si",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. TIRS führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Informacijski pooblaščenec (IP) / AKOS",
      authorityUrl: "https://www.ip-rs.si",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. IP und AKOS koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Informacijski pooblaščenec (IP)",
      authorityUrl: "https://www.ip-rs.si",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Slowenien wendet das Gesetz über elektronische Kommunikation an.",
    },
    eidas: {
      authority: "Ministrstvo za digitalno preobrazbo",
      authorityUrl: "https://www.gov.si/drzavni-organi/ministrstva/ministrstvo-za-digitalno-preobrazbo",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Slowenien betreibt SI-PASS als nationale digitale Identitätslösung.",
    },
    ehds: {
      authority: "Ministrstvo za zdravje / NIJZ",
      authorityUrl: "https://www.gov.si/drzavni-organi/ministrstva/ministrstvo-za-zdravje",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Slowenien baut auf dem eZdravje-System als nationale Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "Tržni inšpektorat Republike Slovenije (TIRS)",
      authorityUrl: "https://www.ti.gov.si",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in slowenisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Ministrstvo za pravosodje",
      authorityUrl: "https://www.gov.si/drzavni-organi/ministrstva/ministrstvo-za-pravosodje",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "Ministrstvo za okolje, podnebje in energijo",
      authorityUrl: "https://www.gov.si/drzavni-organi/ministrstva/ministrstvo-za-okolje-podnebje-in-energijo",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default SI;
