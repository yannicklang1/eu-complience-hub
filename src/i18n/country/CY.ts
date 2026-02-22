import type { CountryData } from "./types";

const CY: CountryData = {
  code: "CY",
  nameLocal: "Κύπρος",
  nameEN: "Cyprus",
  nameDE: "Zypern",
  flag: "🇨🇾",
  languages: ["el"],
  euMemberSince: 2004,
  dpaName: "Γραφείο Επιτρόπου Προστασίας Δεδομένων Προσωπικού Χαρακτήρα",
  dpaUrl: "https://www.dataprotection.gov.cy",
  csirtName: "CSIRT-CY / DITS",
  csirtUrl: "https://csirt.cy",
  regulations: {
    nis2: {
      authority: "Αρχή Ψηφιακής Ασφάλειας (ΑΨΑ) / CSIRT-CY",
      authorityUrl: "https://csirt.cy",
      implementationStatus: "pending",
    },
    dora: {
      authority: "Κεντρική Τράπεζα Κύπρου (ΚΤΚ) / CySEC",
      authorityUrl: "https://www.centralbank.cy",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Ο Περί της Προστασίας των Φυσικών Προσώπων Νόμος",
      authority: "Γραφείο Επιτρόπου Προστασίας Δεδομένων",
      authorityUrl: "https://www.dataprotection.gov.cy",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Γραφείο Επιτρόπου Ηλεκτρονικών Επικοινωνιών",
      authorityUrl: "https://www.ocecpr.org.cy",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Cyprus Securities and Exchange Commission (CySEC)",
      authorityUrl: "https://www.cysec.gov.cy",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Αρχή Ψηφιακής Ασφάλειας (ΑΨΑ)",
      authorityUrl: "https://www.dsa.cy",
      implementationStatus: "pending",
      nationalNotes: "Zypern designiert nationale Aufsichtsbehörden für den AI Act.",
    },
    csrd: {
      authority: "Cyprus Securities and Exchange Commission (CySEC)",
      authorityUrl: "https://www.cysec.gov.cy",
      implementationStatus: "implemented",
      nationalNotes: "Zypern hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "Αρχή Ψηφιακής Ασφάλειας (ΑΨΑ) / CSIRT-CY",
      authorityUrl: "https://csirt.cy",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). ΑΨΑ wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Τμήμα Εργασίας / Υπουργείο Εργασίας",
      authorityUrl: "https://www.mlsi.gov.cy",
      implementationStatus: "pending",
      nationalNotes: "Zypern setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Υπηρεσία Προστασίας Καταναλωτή",
      authorityUrl: "https://www.consumer.gov.cy",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. Die Verbraucherschutzbehörde führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Γραφείο Επιτρόπου Προστασίας Δεδομένων / ΓΕΗΕ",
      authorityUrl: "https://www.dataprotection.gov.cy",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. Nationale Durchsetzungsbehörden werden koordiniert.",
    },
    eprivacy: {
      authority: "Γραφείο Επιτρόπου Προστασίας Δεδομένων",
      authorityUrl: "https://www.dataprotection.gov.cy",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Zypern wendet das Gesetz über elektronische Kommunikation an.",
    },
    eidas: {
      authority: "Τμήμα Υπηρεσιών Πληροφορικής (DITS)",
      authorityUrl: "https://dits.dmrid.gov.cy",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Zypern baut digitale Identitätslösungen über DITS auf.",
    },
    ehds: {
      authority: "Υπουργείο Υγείας",
      authorityUrl: "https://www.moh.gov.cy",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Zypern baut auf dem nationalen Gesundheitssystem (GeSY) auf.",
    },
    "green-claims": {
      authority: "Υπηρεσία Προστασίας Καταναλωτή",
      authorityUrl: "https://www.consumer.gov.cy",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in zyprisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Υπουργείο Δικαιοσύνης και Δημόσιας Τάξεως",
      authorityUrl: "https://www.mjpo.gov.cy",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "Τμήμα Περιβάλλοντος",
      authorityUrl: "https://www.moa.gov.cy",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default CY;
