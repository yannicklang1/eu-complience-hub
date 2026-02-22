import type { CountryData } from "./types";

const PT: CountryData = {
  code: "PT",
  nameLocal: "Portugal",
  nameEN: "Portugal",
  nameDE: "Portugal",
  flag: "🇵🇹",
  languages: ["pt"],
  euMemberSince: 1986,
  dpaName: "Comissão Nacional de Proteção de Dados (CNPD)",
  dpaUrl: "https://www.cnpd.pt",
  csirtName: "CNCS / CERT.PT",
  csirtUrl: "https://www.cncs.gov.pt",
  regulations: {
    nis2: {
      nationalLawName: "Lei da Cibersegurança (revisão)",
      authority: "Centro Nacional de Cibersegurança (CNCS)",
      authorityUrl: "https://www.cncs.gov.pt",
      implementationStatus: "pending",
    },
    dora: {
      authority: "Banco de Portugal / CMVM",
      authorityUrl: "https://www.bportugal.pt",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Lei n.º 58/2019",
      authority: "Comissão Nacional de Proteção de Dados (CNPD)",
      authorityUrl: "https://www.cnpd.pt",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Autoridade Nacional de Comunicações (ANACOM)",
      authorityUrl: "https://www.anacom.pt",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Comissão do Mercado de Valores Mobiliários (CMVM)",
      authorityUrl: "https://www.cmvm.pt",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Autoridade Nacional de Comunicações (ANACOM) / CNPD",
      authorityUrl: "https://www.anacom.pt",
      implementationStatus: "pending",
      nationalNotes: "Portugal designiert nationale Aufsichtsbehörden für den AI Act.",
    },
    csrd: {
      authority: "Comissão do Mercado de Valores Mobiliários (CMVM)",
      authorityUrl: "https://www.cmvm.pt",
      implementationStatus: "implemented",
      nationalNotes: "Portugal hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "Centro Nacional de Cibersegurança (CNCS)",
      authorityUrl: "https://www.cncs.gov.pt",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). CNCS wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Autoridade para as Condições do Trabalho (ACT)",
      authorityUrl: "https://www.act.gov.pt",
      implementationStatus: "pending",
      nationalNotes: "Portugal setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Autoridade de Segurança Alimentar e Económica (ASAE)",
      authorityUrl: "https://www.asae.gov.pt",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. ASAE führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Comissão Nacional de Proteção de Dados (CNPD) / ANACOM",
      authorityUrl: "https://www.cnpd.pt",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. CNPD und ANACOM koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Comissão Nacional de Proteção de Dados (CNPD)",
      authorityUrl: "https://www.cnpd.pt",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Portugal wendet die Lei das Comunicações Eletrónicas an.",
    },
    eidas: {
      authority: "Agência para a Modernização Administrativa (AMA)",
      authorityUrl: "https://www.ama.gov.pt",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Portugal betreibt den Cartão de Cidadão und Chave Móvel Digital als digitale Identitätslösungen.",
    },
    ehds: {
      authority: "Serviços Partilhados do Ministério da Saúde (SPMS)",
      authorityUrl: "https://www.spms.min-saude.pt",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Portugal baut auf dem SNS-Portal als nationale Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "Autoridade de Segurança Alimentar e Económica (ASAE)",
      authorityUrl: "https://www.asae.gov.pt",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in portugiesisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Ministério da Justiça",
      authorityUrl: "https://www.justica.gov.pt",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "Agência Portuguesa do Ambiente (APA)",
      authorityUrl: "https://www.apambiente.pt",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default PT;
