import type { Metadata } from "next";
import { LOCALES, LOCALE_OG, type Locale } from "@/i18n/config";
import dynamic from "next/dynamic";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import FAQContent from "./FAQContent";

const FAQContentEN = dynamic(() => import("./FAQContent.en"), { ssr: true });

/* Map locale -> component (fallback to DE) */
const CONTENT_MAP: Record<string, React.ComponentType<{ faqData: FAQItem[] }>> = {
  en: FAQContentEN as React.ComponentType<{ faqData: FAQItem[] }>,
};

function getFAQContent(locale: string): React.ComponentType<{ faqData: FAQItem[] }> {
  return CONTENT_MAP[locale] ?? FAQContent;
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/* -- Per-locale metadata -- */

interface MetaStrings {
  title: string;
  description: string;
  ogDescription: string;
  keywords: string;
}

const META: Partial<Record<Locale, MetaStrings>> = {
  de: {
    title: "H\u00e4ufige Fragen (FAQ) zur EU-Compliance",
    description:
      "\u00dcber 30 Antworten auf die h\u00e4ufigsten Fragen zu NIS2, DSGVO, AI Act, DORA, CRA, CSRD, MiCA und anderen EU-Regulierungen. Verst\u00e4ndlich erkl\u00e4rt f\u00fcr Unternehmen.",
    ogDescription:
      "Antworten auf die h\u00e4ufigsten Fragen zu EU-Regulierungen. Verst\u00e4ndlich erkl\u00e4rt.",
    keywords:
      "EU Compliance FAQ, NIS2 Fragen, DSGVO FAQ, AI Act Fragen, Compliance Unternehmen, EU Regulierung Fragen, DORA FAQ, CRA FAQ, MiCA FAQ, CSRD FAQ",
  },
  en: {
    title: "Frequently Asked Questions (FAQ) on EU Compliance",
    description:
      "Over 30 answers to the most common questions about NIS2, GDPR, AI Act, DORA, CRA, CSRD, MiCA and other EU regulations. Explained clearly for businesses.",
    ogDescription:
      "Answers to the most common questions about EU regulations. Explained clearly.",
    keywords:
      "EU compliance FAQ, NIS2 questions, GDPR FAQ, AI Act questions, compliance business, EU regulation questions, DORA FAQ, CRA FAQ, MiCA FAQ, CSRD FAQ",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const m = META[loc] ?? META.de!;

  const slug = "faq";
  const canonical = `${BASE_URL}/${locale}/${slug}`;

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE_URL}/${l}/${slug}`;
  }
  languages["x-default"] = `${BASE_URL}/de/${slug}`;

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    openGraph: {
      title: m.title,
      description: m.ogDescription,
      url: canonical,
      locale: LOCALE_OG[loc] ?? "de_AT",
      alternateLocale: LOCALES.filter((l) => l !== loc).map((l) => LOCALE_OG[l]),
    },
    alternates: {
      canonical,
      languages,
    },
  };
}

/* ── FAQ Data (also used for JSON-LD) ── */
export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqData: FAQItem[] = [
  /* ── Allgemein ── */
  {
    question: "Was ist EU-Compliance und warum ist sie wichtig?",
    answer: "EU-Compliance bezeichnet die Einhaltung aller relevanten EU-Regulierungen, Richtlinien und Verordnungen. Sie ist wichtig, weil Verst\u00f6\u00dfe zu erheblichen Bu\u00dfgeldern f\u00fchren k\u00f6nnen \u2014 bei der DSGVO bis zu 20 Mio. \u20ac oder 4% des weltweiten Jahresumsatzes, bei NIS2 bis zu 10 Mio. \u20ac oder 2% des Umsatzes. Zudem drohen pers\u00f6nliche Haftung f\u00fcr Gesch\u00e4ftsf\u00fchrer und Reputationssch\u00e4den.",
    category: "Allgemein",
  },
  {
    question: "Welche EU-Regulierungen gelten f\u00fcr mein Unternehmen?",
    answer: "Das h\u00e4ngt von Branche, Unternehmensgr\u00f6\u00dfe und T\u00e4tigkeit ab. Die DSGVO gilt praktisch f\u00fcr jedes Unternehmen, das personenbezogene Daten verarbeitet. NIS2 betrifft mittlere und gro\u00dfe Unternehmen in kritischen Sektoren. Der AI Act gilt f\u00fcr alle, die KI-Systeme entwickeln oder einsetzen. Nutzen Sie unseren kostenlosen Regulierung-Finder, um Ihre individuelle Betroffenheit zu ermitteln.",
    category: "Allgemein",
  },
  {
    question: "Wie unterscheiden sich EU-Verordnungen und EU-Richtlinien?",
    answer: "EU-Verordnungen (z.B. DSGVO, AI Act, DORA) gelten unmittelbar in allen Mitgliedstaaten \u2014 sie m\u00fcssen nicht erst in nationales Recht umgesetzt werden. EU-Richtlinien (z.B. NIS2) geben Mindeststandards vor und m\u00fcssen von jedem Mitgliedstaat in nationale Gesetze \u00fcberf\u00fchrt werden, in \u00d6sterreich z.B. als NISG 2026.",
    category: "Allgemein",
  },
  {
    question: "Gibt es \u00dcbergangsfristen f\u00fcr die neuen EU-Regulierungen?",
    answer: "Ja, die meisten Regulierungen sehen \u00dcbergangsfristen vor. Der AI Act wird stufenweise bis 2027 anwendbar. DORA gilt seit Januar 2025. NIS2 musste bis Oktober 2024 umgesetzt werden, in \u00d6sterreich tritt das NISG 2026 voraussichtlich Mitte 2026 in Kraft. Der CRA gew\u00e4hrt 36 Monate \u00dcbergangsfrist ab Inkrafttreten. Unser Fristen-Radar zeigt alle Deadlines auf einen Blick.",
    category: "Allgemein",
  },

  /* ── DSGVO ── */
  {
    question: "Was muss ich als KMU bei der DSGVO beachten?",
    answer: "Auch KMUs m\u00fcssen die DSGVO vollst\u00e4ndig einhalten. Mindestanforderungen: Verarbeitungsverzeichnis f\u00fchren, Datenschutzerkl\u00e4rung bereitstellen, Rechtsgrundlage f\u00fcr jede Verarbeitung sicherstellen, Betroffenenrechte erm\u00f6glichen, technische und organisatorische Ma\u00dfnahmen umsetzen, und bei Datenpannen innerhalb von 72 Stunden melden. Ab 20 Mitarbeitern, die regelm\u00e4\u00dfig personenbezogene Daten verarbeiten, ist ein Datenschutzbeauftragter Pflicht.",
    category: "DSGVO",
  },
  {
    question: "Wie hoch k\u00f6nnen DSGVO-Bu\u00dfgelder sein?",
    answer: "Bis zu 20 Millionen Euro oder 4% des weltweiten Jahresumsatzes \u2014 je nachdem, welcher Betrag h\u00f6her ist. In der Praxis liegen die meisten Bu\u00dfgelder niedriger, aber Rekordstrafen wie die 1,2 Mrd. \u20ac gegen Meta zeigen, dass die Beh\u00f6rden die volle Bandbreite nutzen. Auch KMUs erhalten regelm\u00e4\u00dfig Bu\u00dfgelder im f\u00fcnf- bis sechsstelligen Bereich.",
    category: "DSGVO",
  },

  /* ── NIS2 ── */
  {
    question: "Bin ich von NIS2 betroffen?",
    answer: "Sie sind betroffen, wenn Ihr Unternehmen mindestens 50 Mitarbeiter oder 10 Mio. \u20ac Jahresumsatz hat UND in einem der 18 kritischen Sektoren t\u00e4tig ist (z.B. Energie, Transport, Gesundheit, IT/TK, Finanzen, Wasserwirtschaft). Unabh\u00e4ngig von der Gr\u00f6\u00dfe sind auch DNS-Diensteanbieter, TLD-Namensregister, Cloud-Anbieter und Rechenzentren betroffen. Nutzen Sie unseren NIS2 Betroffenheits-Check f\u00fcr eine genaue Einsch\u00e4tzung.",
    category: "NIS2",
  },
  {
    question: "Was sind die wichtigsten NIS2-Pflichten?",
    answer: "Die Kernpflichten umfassen: Risikomanagement-Ma\u00dfnahmen implementieren, Vorf\u00e4lle innerhalb von 24 Stunden melden (Fr\u00fchwarnung) und innerhalb von 72 Stunden detailliert berichten, Lieferkettensicherheit gew\u00e4hrleisten, Gesch\u00e4ftsf\u00fchrer zur Cybersecurity-Schulung verpflichten, und regelm\u00e4\u00dfige Audits durchf\u00fchren. In \u00d6sterreich wird dies durch das NISG 2026 umgesetzt.",
    category: "NIS2",
  },
  {
    question: "Wann tritt NIS2 in \u00d6sterreich in Kraft?",
    answer: "Die EU-Richtlinie NIS2 h\u00e4tte bis Oktober 2024 umgesetzt werden m\u00fcssen. In \u00d6sterreich wird die nationale Umsetzung als NISG 2026 (Netz- und Informationssystemsicherheitsgesetz 2026) voraussichtlich Mitte 2026 in Kraft treten. Unternehmen sollten sich bereits jetzt vorbereiten, da die Ma\u00dfnahmen umfangreich sind.",
    category: "NIS2",
  },

  /* ── AI Act ── */
  {
    question: "Was regelt der EU AI Act?",
    answer: "Der AI Act ist das weltweit erste umfassende KI-Gesetz. Er klassifiziert KI-Systeme nach Risikostufen: verbotene Praktiken (Social Scoring, manipulative KI), Hochrisiko-Systeme (Bewerbungstools, Kreditentscheidungen, medizinische Ger\u00e4te), KI mit Transparenzpflichten (Chatbots, Deepfakes) und KI mit minimalem Risiko (Spamfilter). Je nach Risikostufe gelten unterschiedliche Anforderungen.",
    category: "AI Act",
  },
  {
    question: "Ab wann gilt der AI Act?",
    answer: "Der AI Act wird stufenweise anwendbar: Ab Februar 2025 gelten die Verbote (Kapitel II). Ab August 2025 die Regeln f\u00fcr General-Purpose-AI-Modelle (GPT-4, Gemini etc.). Ab August 2026 gelten die meisten Hochrisiko-Vorschriften. Ab August 2027 die restlichen Regeln f\u00fcr Hochrisiko-Systeme nach Anhang I (z.B. Medizingeräte).",
    category: "AI Act",
  },
  {
    question: "Brauche ich als KI-Nutzer eine Konformit\u00e4tsbewertung?",
    answer: "Als reiner Betreiber (Deployer) eines KI-Systems ben\u00f6tigen Sie keine eigene Konformit\u00e4tsbewertung \u2014 das ist Aufgabe des Anbieters. Allerdings m\u00fcssen Sie als Betreiber eines Hochrisiko-Systems: eine Datenschutz-Folgenabsch\u00e4tzung durchf\u00fchren, menschliche Aufsicht sicherstellen, Eingabedaten \u00fcberwachen, und betroffene Personen \u00fcber den KI-Einsatz informieren.",
    category: "AI Act",
  },

  /* ── DORA ── */
  {
    question: "Was ist DORA und wen betrifft es?",
    answer: "DORA (Digital Operational Resilience Act) ist eine EU-Verordnung zur digitalen Betriebsresilienz im Finanzsektor. Sie betrifft Banken, Versicherungen, Wertpapierfirmen, Zahlungsinstitute und andere Finanzunternehmen \u2014 sowie deren kritische IKT-Drittanbieter (z.B. Cloud-Provider, Software-Dienstleister). DORA gilt seit dem 17. Januar 2025.",
    category: "DORA",
  },
  {
    question: "Was muss ich als IKT-Dienstleister f\u00fcr Banken beachten?",
    answer: "Wenn Sie als kritischer IKT-Drittanbieter eingestuft werden, unterliegen Sie dem \u00dcberwachungsrahmenwerk der europ\u00e4ischen Aufsichtsbeh\u00f6rden. Sie m\u00fcssen: vertraglich bestimmte Sicherheitsstandards garantieren, Vorfallsmeldungen erm\u00f6glichen, Audit-Rechte einr\u00e4umen, Business-Continuity-Pl\u00e4ne vorhalten und Exit-Strategien bereitstellen.",
    category: "DORA",
  },

  /* ── CRA ── */
  {
    question: "Was ist der Cyber Resilience Act (CRA)?",
    answer: "Der CRA verpflichtet Hersteller von Produkten mit digitalen Elementen (Software und Hardware) zu Cybersicherheitsanforderungen \u00fcber den gesamten Produktlebenszyklus. Das umfasst: Sicherheitsdesign von Anfang an, keine bekannten Schwachstellen bei Auslieferung, kostenlose Sicherheitsupdates \u00fcber mindestens 5 Jahre, und Schwachstellenmeldepflichten. Die \u00dcbergangsfrist betr\u00e4gt 36 Monate.",
    category: "CRA",
  },
  {
    question: "Betrifft der CRA auch Open-Source-Software?",
    answer: "Nein, reine Open-Source-Projekte ohne kommerziellen Hintergrund sind vom CRA ausgenommen. Wenn jedoch ein Unternehmen Open-Source-Software in einem kommerziellen Produkt einsetzt und vertreibt, gelten die CRA-Pflichten f\u00fcr den Hersteller/Integrator dieses Produkts. Open-Source-Stewards haben spezielle, reduzierte Pflichten.",
    category: "CRA",
  },

  /* ── CSRD / ESG ── */
  {
    question: "Ab wann muss mein Unternehmen einen Nachhaltigkeitsbericht erstellen?",
    answer: "Das h\u00e4ngt von Ihrer Unternehmensgr\u00f6\u00dfe ab: Gro\u00dfe Unternehmen von \u00f6ffentlichem Interesse (> 500 MA) berichten ab Gesch\u00e4ftsjahr 2024. Alle gro\u00dfen Unternehmen (> 250 MA oder > 50 Mio. \u20ac Umsatz) ab GJ 2025. B\u00f6rsennotierte KMUs ab GJ 2026 mit Opt-out bis 2028. Nicht-EU-Unternehmen mit > 150 Mio. \u20ac EU-Umsatz ab GJ 2028.",
    category: "CSRD",
  },

  /* ── Haftung ── */
  {
    question: "Haftet der Gesch\u00e4ftsf\u00fchrer pers\u00f6nlich bei Compliance-Verst\u00f6\u00dfen?",
    answer: "Ja, bei mehreren Regulierungen ist eine pers\u00f6nliche Haftung vorgesehen. NIS2 sieht explizit vor, dass die Gesch\u00e4ftsleitung f\u00fcr die Umsetzung verantwortlich ist und bei Pflichtverletzungen pers\u00f6nlich haftet \u2014 bis hin zu tempor\u00e4ren T\u00e4tigkeitsverboten. Auch bei DSGVO-Verst\u00f6\u00dfen kann die Gesch\u00e4ftsf\u00fchrung unter bestimmten Umst\u00e4nden pers\u00f6nlich belangt werden.",
    category: "Haftung",
  },

  /* ── Kosten ── */
  {
    question: "Was kostet Compliance-Umsetzung f\u00fcr ein KMU?",
    answer: "Die Kosten variieren stark je nach Branche, Gr\u00f6\u00dfe und Reifegrad. Typische Bandbreiten f\u00fcr KMUs: DSGVO-Grundausstattung 5.000\u201320.000 \u20ac, NIS2-Umsetzung 30.000\u2013150.000 \u20ac, AI-Act-Konformit\u00e4t 10.000\u201350.000 \u20ac (als Deployer). Investitionen in Compliance zahlen sich aus \u2014 die Bu\u00dfgelder bei Verst\u00f6\u00dfen \u00fcbersteigen die Implementierungskosten meist um ein Vielfaches.",
    category: "Allgemein",
  },

  /* ── BaFG ── */
  {
    question: "Was fordert das Barrierefreiheitsst\u00e4rkungsgesetz (BaFG)?",
    answer: "Das BaFG setzt die EU-Richtlinie (EAA) in nationales Recht um und verpflichtet Anbieter bestimmter Produkte und Dienstleistungen, diese barrierefrei zu gestalten. Betroffen sind u.a. E-Commerce-Shops, Bankdienstleistungen, Telekommunikationsdienste, E-Books und Transportdienste. Die Anforderungen umfassen wahrnehmbare, bedienbare und verst\u00e4ndliche Gestaltung gem\u00e4\u00df WCAG-Standards. Das Gesetz gilt seit Juni 2025.",
    category: "BaFG",
  },

  /* ── Green Claims ── */
  {
    question: "Was \u00e4ndert sich durch die Green Claims Richtlinie?",
    answer: "Die EU-Richtlinie gegen Greenwashing verbietet pauschale Umweltaussagen wie \u2018klimaneutral\u2019, \u2018umweltfreundlich\u2019 oder \u2018gr\u00fcn\u2019 ohne wissenschaftlichen Nachweis. Unternehmen m\u00fcssen Umweltaussagen k\u00fcnftig mit \u00fcberpr\u00fcfbaren wissenschaftlichen Methoden belegen und von unabh\u00e4ngigen Stellen zertifizieren lassen. CO\u2082-Kompensation allein reicht nicht mehr als Begr\u00fcndung f\u00fcr \u2018klimaneutral\u2019. Umsetzungsfrist: M\u00e4rz 2026.",
    category: "Green Claims",
  },

  /* ── Data Act ── */
  {
    question: "Was bedeutet der Data Act f\u00fcr IoT-Hersteller?",
    answer: "Der EU Data Act (ab September 2025) verpflichtet Hersteller vernetzter Ger\u00e4te (IoT), den Nutzern Zugang zu den generierten Daten zu gew\u00e4hren \u2014 und zwar in einem maschinenlesbaren Format und in Echtzeit. Zudem m\u00fcssen Cloud-Kunden einen einfachen Anbieterwechsel (Cloud-Switching) durchf\u00fchren k\u00f6nnen. Gatekeeper d\u00fcrfen von Dateninhabern erhaltene Daten nicht f\u00fcr andere Zwecke nutzen.",
    category: "Data Act",
  },

  /* ── DPP ── */
  {
    question: "Was ist der Digitale Produktpass (DPP)?",
    answer: "Der Digitale Produktpass ist ein EU-weites System zur Erfassung von Nachhaltigkeitsdaten entlang der gesamten Wertsch\u00f6pfungskette. Er enth\u00e4lt Informationen zu Materialzusammensetzung, Recyclingf\u00e4higkeit, CO\u2082-Fu\u00dfabdruck und Reparierbarkeit. Ab 2027 gilt er zun\u00e4chst f\u00fcr Industriebatterien, danach schrittweise f\u00fcr Textilien, Elektronik und weitere Produktkategorien.",
    category: "DPP",
  },

  /* ── eIDAS ── */
  {
    question: "Was ist die EU Digital Identity Wallet?",
    answer: "Die EU Digital Identity Wallet (eIDAS 2.0) erm\u00f6glicht EU-B\u00fcrgern, sich digital auszuweisen \u2014 grenz\u00fcberschreitend und f\u00fcr private wie \u00f6ffentliche Dienste. Mitgliedstaaten m\u00fcssen die Wallet bis Mai 2026 bereitstellen. Unternehmen, die Online-Dienste anbieten, m\u00fcssen die Wallet als Identifizierungsmethode akzeptieren. Die Wallet speichert auch F\u00fchrerscheine, Diplome und andere verifizierte Dokumente.",
    category: "eIDAS",
  },

  /* ── MiCA ── */
  {
    question: "Was regelt die MiCA-Verordnung?",
    answer: "MiCA (Markets in Crypto-Assets) ist die EU-weite Regulierung f\u00fcr Kryptoassets. Sie schafft einheitliche Regeln f\u00fcr Emittenten von Kryptowerten und Dienstleister (CASPs). Stablecoin-Emittenten m\u00fcssen Reserven vorhalten und R\u00fccknahmerechte garantieren. CASPs ben\u00f6tigen eine Zulassung und m\u00fcssen Geldw\u00e4schepr\u00e4vention, Kundenschutz und Offenlegungspflichten erf\u00fcllen. MiCA gilt seit Dezember 2024 f\u00fcr Stablecoins und seit Juni 2025 vollst\u00e4ndig.",
    category: "MiCA",
  },
  {
    question: "Brauche ich als Krypto-Dienstleister eine MiCA-Lizenz?",
    answer: "Ja, seit Juni 2025 ben\u00f6tigen alle Crypto-Asset Service Provider (CASPs) in der EU eine MiCA-Zulassung. Das umfasst Kryptob\u00f6rsen, Wallet-Anbieter, Handelsplattformen, Verwahrer und Berater. Bestehende Anbieter mit nationaler Lizenz k\u00f6nnen eine \u00dcbergangsfrist von bis zu 18 Monaten nutzen. Ohne Zulassung drohen empfindliche Bu\u00dfgelder und ein T\u00e4tigkeitsverbot in der EU.",
    category: "MiCA",
  },

  /* ── EHDS ── */
  {
    question: "Was ist der European Health Data Space (EHDS)?",
    answer: "Der EHDS schafft einen einheitlichen EU-Rahmen f\u00fcr die Nutzung von Gesundheitsdaten. Er regelt die Prim\u00e4rnutzung (Patienten erhalten EU-weit Zugang zu ihren Gesundheitsdaten) und die Sekund\u00e4rnutzung (anonymisierte Daten f\u00fcr Forschung, Innovation und Gesundheitspolitik). Hersteller elektronischer Patientendatensysteme m\u00fcssen Interoperabilit\u00e4ts- und Zertifizierungsanforderungen erf\u00fcllen.",
    category: "EHDS",
  },

  /* ── ePrivacy ── */
  {
    question: "Was \u00e4ndert sich mit der ePrivacy-Verordnung gegen\u00fcber der DSGVO?",
    answer: "Die geplante ePrivacy-Verordnung soll die veraltete E-Privacy-Richtlinie abl\u00f6sen und die DSGVO im Bereich elektronischer Kommunikation erg\u00e4nzen. Sie regelt spezifisch Cookies, Tracking, Direktmarketing per E-Mail und Metadaten. Anders als die DSGVO, die allgemein personenbezogene Daten sch\u00fctzt, fokussiert ePrivacy auf den Schutz der Vertraulichkeit elektronischer Kommunikation \u2014 auch nicht-personenbezogene Inhalte sind gesch\u00fctzt.",
    category: "ePrivacy",
  },

  /* ── Produkthaftung ── */
  {
    question: "Was \u00e4ndert die neue EU-Produkthaftungsrichtlinie?",
    answer: "Die \u00fcberarbeitete Produkthaftungsrichtlinie (2024/2853) erweitert den Produktbegriff erstmals auf Software und KI-Systeme. Gesch\u00e4digte m\u00fcssen nicht mehr das Verschulden des Herstellers nachweisen (verschuldensunabh\u00e4ngige Haftung). Neu: digitale Fertigungsunterlagen wie 3D-Druck-Dateien fallen ebenfalls unter die Richtlinie. Die Beweislast wird bei technisch komplexen Produkten zugunsten der Gesch\u00e4digten erleichtert. Umsetzungsfrist: Dezember 2026.",
    category: "Produkthaftung",
  },

  /* ── NIS2 Deep Dive ── */
  {
    question: "Was passiert, wenn ich NIS2-Vorf\u00e4lle nicht melde?",
    answer: "Die Meldepflichten unter NIS2 sind streng: Eine Fr\u00fchwarnung muss binnen 24 Stunden, ein vollst\u00e4ndiger Bericht binnen 72 Stunden und ein Abschlussbericht binnen eines Monats erfolgen. Bei Nichtmeldung drohen Bu\u00dfgelder bis 10 Mio. \u20ac oder 2% des Jahresumsatzes. Zus\u00e4tzlich k\u00f6nnen die Aufsichtsbeh\u00f6rden die Gesch\u00e4ftsleitung tempor\u00e4r von ihren Aufgaben entheben.",
    category: "NIS2",
  },

  /* ── AI Act Deep Dive ── */
  {
    question: "Wie hoch sind die Bu\u00dfgelder beim AI Act?",
    answer: "Der AI Act sieht ein dreistufiges Bu\u00dfgeldsystem vor: Bis zu 35 Mio. \u20ac oder 7% des weltweiten Jahresumsatzes f\u00fcr verbotene KI-Praktiken. Bis zu 15 Mio. \u20ac oder 3% f\u00fcr Verst\u00f6\u00dfe gegen Hochrisiko-Anforderungen. Bis zu 7,5 Mio. \u20ac oder 1,5% f\u00fcr fehlerhafte Informationen an Beh\u00f6rden. F\u00fcr KMU und Start-ups gelten reduzierte Obergrenzen.",
    category: "AI Act",
  },

  /* ── CSRD Deep Dive ── */
  {
    question: "Was sind die ESRS und wie wende ich sie an?",
    answer: "Die European Sustainability Reporting Standards (ESRS) sind die verbindlichen Berichtsstandards unter der CSRD. Sie umfassen 12 Standards: 2 \u00fcbergreifende (ESRS 1, ESRS 2) und 10 themenspezifische zu Umwelt (E1-E5), Soziales (S1-S4) und Governance (G1). Der erste Schritt ist die doppelte Wesentlichkeitsanalyse: Welche Nachhaltigkeitsthemen sind f\u00fcr Ihr Unternehmen finanziell relevant und wo hat Ihr Unternehmen Auswirkungen auf Umwelt und Gesellschaft?",
    category: "CSRD",
  },

  /* ── DSGVO Deep Dive ── */
  {
    question: "Was ist eine Datenschutz-Folgenabsch\u00e4tzung (DSFA)?",
    answer: "Eine DSFA ist bei Datenverarbeitungen mit voraussichtlich hohem Risiko f\u00fcr Betroffene verpflichtend \u2014 etwa bei Profiling, umfangreicher Video\u00fcberwachung oder der Verarbeitung besonderer Kategorien personenbezogener Daten. Sie muss die Verarbeitungsvorg\u00e4nge, Risiken und Abhilfema\u00dfnahmen systematisch dokumentieren. Ergibt die DSFA ein hohes Restrisiko, muss vor der Verarbeitung die Datenschutzbeh\u00f6rde konsultiert werden.",
    category: "DSGVO",
  },

  /* ── DORA Deep Dive ── */
  {
    question: "Was ist das IKT-Drittanbieter-Register unter DORA?",
    answer: "DORA verpflichtet Finanzunternehmen, ein vollst\u00e4ndiges Register aller IKT-Drittanbieter-Vertr\u00e4ge zu f\u00fchren. Dieses Register muss u.a. den Anbieter, die erbrachten Dienste, Sub-Outsourcing-Ketten, Standorte der Datenverarbeitung und die Kritikalit\u00e4t der Funktion dokumentieren. Das Register wird den Aufsichtsbeh\u00f6rden auf Anforderung \u00fcbermittelt. Die erste vollst\u00e4ndige Meldung war bis 2025 f\u00e4llig.",
    category: "DORA",
  },

  /* ── Allgemein/Strategie ── */
  {
    question: "Wie starte ich am besten mit der EU-Compliance?",
    answer: "Ein systematischer Einstieg erfolgt in f\u00fcnf Schritten: 1. Betroffenheitsanalyse \u2014 welche Regulierungen sind relevant? Nutzen Sie unseren Regulierung-Finder. 2. Gap-Analyse \u2014 wo steht Ihr Unternehmen aktuell? Der Reifegrad-Check hilft. 3. Priorisierung \u2014 dringendste Fristen zuerst (Fristen-Radar). 4. Ma\u00dfnahmenplan mit Verantwortlichkeiten und Budget. 5. Laufende \u00dcberwachung und regelm\u00e4\u00dfige Audits. Beginnen Sie mit der Regulierung mit der n\u00e4chsten Frist.",
    category: "Allgemein",
  },

  /* ── Plattform ── */
  {
    question: "Ist EU Compliance Hub eine Rechtsberatung?",
    answer: "Nein. EU Compliance Hub ist ein unabh\u00e4ngiges Informationsportal. Alle Inhalte dienen der allgemeinen Information und stellen keine Rechtsberatung dar. F\u00fcr verbindliche Rechtsausk\u00fcnfte und die konkrete Umsetzung empfehlen wir die Konsultation spezialisierter Rechtsanw\u00e4lte oder Compliance-Berater. \u00dcber unseren kostenlosen Compliance-Report erhalten Sie eine personalisierte Analyse Ihrer regulatorischen Pflichten.",
    category: "Plattform",
  },
  {
    question: "Welche interaktiven Tools bietet die Plattform?",
    answer: "EU Compliance Hub bietet acht kostenlose Tools: Den Regulierung-Finder (ermittelt, welche EU-Gesetze f\u00fcr Sie gelten), die Compliance-Checkliste (interaktive Pflichten pro Regulierung), den Kosten-Kalkulator (sch\u00e4tzt Implementierungskosten), den Reifegrad-Check (bewertet Ihre Compliance-Reife), den NIS2-Betroffenheits-Check, den Haftungs-Pr\u00fcfer (pers\u00f6nliche Haftungsrisiken), den Bu\u00dfgeld-Rechner und den Regulierungsvergleich. Alle Tools sind ohne Registrierung nutzbar.",
    category: "Plattform",
  },
];

/* -- Per-locale JSON-LD -- */

function buildJsonLd(locale: string) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${BASE_URL}/${locale}/faq` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return { breadcrumbJsonLd, faqJsonLd };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const Content = getFAQContent(locale);
  const { breadcrumbJsonLd, faqJsonLd } = buildJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Content faqData={faqData} />
    </>
  );
}
