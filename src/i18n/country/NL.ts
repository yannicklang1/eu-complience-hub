import type { CountryData } from "./types";

const NL: CountryData = {
  code: "NL",
  nameLocal: "Nederland",
  nameEN: "Netherlands",
  nameDE: "Niederlande",
  flag: "🇳🇱",
  languages: ["nl"],
  euMemberSince: 1957,
  dpaName: "Autoriteit Persoonsgegevens (AP)",
  dpaUrl: "https://www.autoriteitpersoonsgegevens.nl",
  csirtName: "NCSC-NL",
  csirtUrl: "https://www.ncsc.nl",
  regulations: {
    nis2: {
      nationalLawName: "Cyberbeveiligingswet (CBW)",
      authority: "Rijksinspectie Digitale Infrastructuur (RDI) / NCSC",
      authorityUrl: "https://www.rdi.nl",
      implementationStatus: "implemented",
      nationalNotes: "Die Niederlande haben NIS2 durch das Cyberbeveiligingswet umgesetzt.",
    },
    dora: {
      authority: "De Nederlandsche Bank (DNB) / AFM",
      authorityUrl: "https://www.dnb.nl",
      implementationStatus: "implemented",
      nationalNotes: "DORA seit Januar 2025 unmittelbar anwendbar. DNB und AFM beaufsichtigen niederländische Finanzunternehmen.",
    },
    dsgvo: {
      nationalLawName: "Uitvoeringswet Algemene verordening gegevensbescherming (UAVG)",
      authority: "Autoriteit Persoonsgegevens (AP)",
      authorityUrl: "https://www.autoriteitpersoonsgegevens.nl",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Autoriteit Consument & Markt (ACM)",
      authorityUrl: "https://www.acm.nl",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Autoriteit Financiële Markten (AFM) / DNB",
      authorityUrl: "https://www.afm.nl",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Autoriteit Persoonsgegevens (AP) als Koordinator / Autoriteit Consument & Markt (ACM)",
      authorityUrl: "https://www.autoriteitpersoonsgegevens.nl",
      implementationStatus: "pending",
      nationalNotes: "Die Niederlande designieren die AP als koordinierende Aufsichtsbehörde für den AI Act.",
    },
    csrd: {
      authority: "Autoriteit Financiële Markten (AFM)",
      authorityUrl: "https://www.afm.nl",
      implementationStatus: "implemented",
      nationalNotes: "Die Niederlande haben die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "Rijksinspectie Digitale Infrastructuur (RDI)",
      authorityUrl: "https://www.rdi.nl",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). RDI wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Ministerie van Buitenlandse Handel en Ontwikkelingssamenwerking",
      authorityUrl: "https://www.rijksoverheid.nl",
      implementationStatus: "pending",
      nationalNotes: "Die Niederlande setzen die EU-Lieferkettenrichtlinie (CSDDD) um. Ergänzend besteht bereits das Wet zorgplicht kinderarbeid.",
    },
    hschg: {
      authority: "Nederlandse Voedsel- en Warenautoriteit (NVWA) / RDI",
      authorityUrl: "https://www.nvwa.nl",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. NVWA und RDI führen Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Autoriteit Persoonsgegevens (AP) / ACM",
      authorityUrl: "https://www.autoriteitpersoonsgegevens.nl",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. AP und ACM koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Autoriteit Persoonsgegevens (AP)",
      authorityUrl: "https://www.autoriteitpersoonsgegevens.nl",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Die Niederlande wenden die Telecommunicatiewet an.",
    },
    eidas: {
      authority: "Ministerie van Binnenlandse Zaken en Koninkrijksrelaties (BZK)",
      authorityUrl: "https://www.rijksoverheid.nl",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Die Niederlande betreiben DigiD als nationale digitale Identitätslösung.",
    },
    ehds: {
      authority: "Ministerie van Volksgezondheid, Welzijn en Sport (VWS)",
      authorityUrl: "https://www.rijksoverheid.nl",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Die Niederlande bauen auf der bestehenden Gesundheitsdateninfrastruktur (PGO / Persoonlijke Gezondheidsomgeving) auf.",
    },
    "green-claims": {
      authority: "Autoriteit Consument & Markt (ACM)",
      authorityUrl: "https://www.acm.nl",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in niederländisches Recht umgesetzt. ACM geht bereits aktiv gegen Greenwashing vor.",
    },
    produkthaftung: {
      authority: "Ministerie van Justitie en Veiligheid",
      authorityUrl: "https://www.rijksoverheid.nl",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "Ministerie van Infrastructuur en Waterstaat (IenW)",
      authorityUrl: "https://www.rijksoverheid.nl",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default NL;
