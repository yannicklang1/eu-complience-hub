import type { CountryData } from "./types";

const GR: CountryData = {
  code: "GR",
  nameLocal: "Ελλάδα",
  nameEN: "Greece",
  nameDE: "Griechenland",
  flag: "🇬🇷",
  languages: ["el"],
  euMemberSince: 1981,
  dpaName: "Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ)",
  dpaUrl: "https://www.dpa.gr",
  csirtName: "GSOC / GR-CERT",
  csirtUrl: "https://www.gsoc.gr",
  regulations: {
    nis2: {
      nationalLawName: "Νόμος για την κυβερνοασφάλεια (σε εξέλιξη)",
      authority: "Εθνική Αρχή Κυβερνοασφάλειας (ENISA GR) / GSOC",
      authorityUrl: "https://www.gsoc.gr",
      implementationStatus: "pending",
    },
    dora: {
      authority: "Τράπεζα της Ελλάδος / Επιτροπή Κεφαλαιαγοράς",
      authorityUrl: "https://www.bankofgreece.gr",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Νόμος 4624/2019",
      authority: "Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ)",
      authorityUrl: "https://www.dpa.gr",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Εθνική Επιτροπή Τηλεπικοινωνιών και Ταχυδρομείων (ΕΕΤΤ)",
      authorityUrl: "https://www.eett.gr",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Επιτροπή Κεφαλαιαγοράς",
      authorityUrl: "https://www.hcmc.gr",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Εθνική Επιτροπή Τηλεπικοινωνιών και Ταχυδρομείων (ΕΕΤΤ) / Υπουργείο Ψηφιακής Διακυβέρνησης",
      authorityUrl: "https://www.eett.gr",
      implementationStatus: "pending",
      nationalNotes: "Griechenland designiert nationale Aufsichtsbehörden für den AI Act.",
    },
    csrd: {
      authority: "Επιτροπή Κεφαλαιαγοράς",
      authorityUrl: "https://www.hcmc.gr",
      implementationStatus: "implemented",
      nationalNotes: "Griechenland hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "Εθνική Αρχή Κυβερνοασφάλειας / GSOC",
      authorityUrl: "https://www.gsoc.gr",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). GSOC wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Υπουργείο Εργασίας και Κοινωνικής Ασφάλισης",
      authorityUrl: "https://www.ypergasias.gov.gr",
      implementationStatus: "pending",
      nationalNotes: "Griechenland setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Γενική Γραμματεία Εμπορίου / Γενική Γραμματεία Βιομηχανίας",
      authorityUrl: "https://www.mindev.gov.gr",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. Marktüberwachung durch die Generalsekretariate für Handel und Industrie.",
    },
    "data-act": {
      authority: "Αρχή Προστασίας Δεδομένων (ΑΠΔΠΧ) / ΕΕΤΤ",
      authorityUrl: "https://www.dpa.gr",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. Die griechische Datenschutzbehörde und ΕΕΤΤ koordinieren die Durchsetzung.",
    },
    eprivacy: {
      authority: "Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (ΑΠΔΠΧ)",
      authorityUrl: "https://www.dpa.gr",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Griechenland wendet das Gesetz über elektronische Kommunikation an.",
    },
    eidas: {
      authority: "Υπουργείο Ψηφιακής Διακυβέρνησης",
      authorityUrl: "https://www.mindigital.gr",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Griechenland betreibt gov.gr als nationale digitale Plattform.",
    },
    ehds: {
      authority: "Υπουργείο Υγείας / ΗΔΙΚΑ",
      authorityUrl: "https://www.moh.gov.gr",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Griechenland baut auf dem ΗΔΙΚΑ-System als nationale Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "Γενική Γραμματεία Εμπορίου",
      authorityUrl: "https://www.mindev.gov.gr",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in griechisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Υπουργείο Δικαιοσύνης",
      authorityUrl: "https://www.ministryofjustice.gr",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "Υπουργείο Περιβάλλοντος και Ενέργειας",
      authorityUrl: "https://ypen.gov.gr",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default GR;
