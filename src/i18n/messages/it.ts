/* ─────────────────── Italian UI Messages ─────────────────── */

import type { Messages } from "./de";

const it: Messages = {
  /* ── Meta ── */
  meta: {
    siteName: "EU Compliance Hub",
    siteDescription: "Regolamenti europei. Spiegati chiaramente.",
    tagline: "Traduciamo la legislazione di Bruxelles in misure concrete \u2014 per PMI, startup e grandi imprese.",
  },

  /* ── Navigation ── */
  nav: {
    regulations: "Regolamenti",
    tools: "Strumenti",
    industries: "Settori",
    knowledge: "Conoscenza",
    news: "Novit\u00e0",
    briefing: "Briefing conformit\u00e0",
    report: "Report di conformit\u00e0",
    reportCreate: "Crea report di conformit\u00e0",
    allTools: "Tutti gli strumenti",
    contact: "Contatto",
    faq: "FAQ",
    aboutUs: "Chi siamo",
    mobile: {
      openMenu: "Apri menu",
      closeMenu: "Chiudi menu",
    },
    groups: {
      coreRegulations: "Regolamenti principali",
      dataProtection: "Protezione dati & Conformit\u00e0",
      moreRegulations: "Altri regolamenti",
      digitalData: "Digitale & Dati",
      interactiveTools: "Strumenti interattivi",
      directoriesRadar: "Registri & Radar",
    },
  },

  /* ── Guide Page Layout ── */
  guide: {
    lastReview: "Ultima verifica:",
    officialSources: "fonti ufficiali",
    factChecked: "Verificato",
    quickFacts: "Fatti essenziali",
    disclaimer: "Non costituisce consulenza legale. Tutte le informazioni senza garanzia.",
    more: "Altro",
    toc: "Indice",
  },

  /* ── Guide CTA ── */
  cta: {
    getBriefing: "Ricevi il briefing di conformit\u00e0",
    frequency: "Solo per scadenze critiche e modifiche normative. Max. 3\u00d7/mese.",
    gdprNotice: "Conforme al GDPR. Annullabile in qualsiasi momento. Niente spam.",
    tools: "Strumenti di conformit\u00e0",
    toolsDesc: "8 strumenti gratuiti",
    comparison: "Confronto dei regolamenti",
    comparisonDesc: "Confronta fianco a fianco",
    faq: "Domande frequenti",
    faqDesc: "20+ risposte",
    report: "Report di conformit\u00e0",
    reportDesc: "Analisi gratuita per la tua azienda",
  },

  /* ── Forms ── */
  form: {
    emailPlaceholder: "tua@azienda.com",
    emailAriaLabel: "Indirizzo e-mail per il briefing di conformit\u00e0",
    subscribe: "Iscriviti",
    submitBriefing: "Attiva briefing",
    sending: "Invio in corso\u2026",
    invalidEmail: "Inserisci un indirizzo e-mail valido.",
    confirmEmail: "Quasi fatto! Conferma il tuo indirizzo e-mail.",
    success: "Quasi fatto!",
    error: "Si \u00e8 verificato un errore.",
    connectionError: "Errore di connessione. Riprova pi\u00f9 tardi.",
    disclaimer: "Solo per scadenze critiche e modifiche normative. Max. 3\u00d7/mese. Annullabile in qualsiasi momento. Conforme al GDPR. *Occasionalmente riceverai anche consigli su strumenti di conformit\u00e0 verificati (contrassegnati come pubblicit\u00e0).",
  },

  /* ── Social Share ── */
  share: {
    label: "Condividi la guida",
    sublabel: "Condividi questa guida con colleghi e decisori",
    copyLink: "Copia link",
    copied: "Copiato!",
    linkedin: "LinkedIn",
    twitter: "X / Twitter",
    email: "E-mail",
    emailBody: "Dai un\u2019occhiata a questa guida sulla conformit\u00e0:",
  },

  /* ── Breadcrumbs ── */
  breadcrumb: {
    home: "Home",
    ariaLabel: "Breadcrumb",
  },

  /* ── Cookie Consent ── */
  cookies: {
    title: "Impostazioni sulla privacy",
    description: "Utilizziamo cookie e tecnologie simili per offrirti la migliore esperienza possibile. Per maggiori informazioni, consulta la nostra",
    privacyLink: "Informativa sulla privacy",
    necessary: "Necessari",
    necessaryDesc: "Funzionamento del sito web. Non pu\u00f2 essere disattivato.",
    analytics: "Analisi",
    analyticsDesc: "Statistiche di utilizzo anonime per migliorare il sito web.",
    analyticsAriaLabel: "Cookie di analisi",
    marketing: "Marketing",
    marketingDesc: "Pubblicit\u00e0 e annunci personalizzati.",
    marketingAriaLabel: "Cookie di marketing",
    save: "Salva selezione",
    necessaryOnly: "Solo necessari",
    settings: "Impostazioni",
    acceptAll: "Accetta tutto",
  },

  /* ── Footer ── */
  footer: {
    description: "Regolamenti europei. Spiegati chiaramente. Traduciamo la legislazione di Bruxelles in misure concrete \u2014 per PMI, startup e grandi imprese.",
    regulations: "Regolamenti",
    tools: "Strumenti",
    aboutUs: "Chi siamo",
    news: "Novit\u00e0",
    faq: "FAQ",
    report: "Report di conformit\u00e0",
    impressum: "Note legali",
    privacy: "Privacy",
    disclaimerLink: "Esclusione di responsabilit\u00e0",
    cookieSettings: "Impostazioni cookie",
    legalDisclaimer: "EU Compliance Hub \u00e8 un portale informativo indipendente e non \u00e8 affiliato ad alcuna istituzione dell\u2019Unione europea o del Consiglio d\u2019Europa. Tutti i contenuti sono forniti a scopo puramente informativo e non costituiscono consulenza legale. \u00abUE\u00bb viene utilizzato in modo descrittivo per indicare l\u2019ambito dei regolamenti europei.",
    copyright: "EU Compliance Hub. Non costituisce consulenza legale. Tutte le informazioni senza garanzia.",
  },

  /* ── Accessibility ── */
  a11y: {
    mainNav: "Navigazione principale",
    contentInfo: "Pi\u00e8 di pagina",
    backToTop: "Torna in alto",
    skipToContent: "Vai al contenuto principale",
  },

  /* ── Search / Command Palette ── */
  search: {
    placeholder: "Cerca\u2026",
    hint: "Cmd+K per cercare",
    noResults: "Nessun risultato",
    categories: {
      regulations: "Regolamenti",
      tools: "Strumenti",
      knowledge: "Conoscenza",
      legal: "Giuridico",
    },
  },

  /* ── Country Picker ── */
  country: {
    title: "Seleziona il tuo paese",
    subtitle: "Ti mostreremo informazioni di conformit\u00e0 specifiche per il tuo paese",
    confirm: "Conferma",
    change: "Cambia paese",
    detected: "Rilevato:",
  },

  /* ── Common ── */
  common: {
    readMore: "Leggi di pi\u00f9",
    learnMore: "Scopri di pi\u00f9",
    download: "Scarica",
    close: "Chiudi",
    back: "Indietro",
    next: "Avanti",
    yes: "S\u00ec",
    no: "No",
    loading: "Caricamento\u2026",
    error: "Errore",
    retry: "Riprova",
  },

  /* ── Homepage ── */
  home: {
    /* Hero */
    hero: {
      title1: "Europea",
      title2: "Compliance.",
      title3: "Finalmente chiara.",
      subtitle: "18 regolamenti — da NIS2 all'AI Act a eIDAS — che riguardano direttamente la tua azienda. Traduciamo la Gazzetta ufficiale dell'UE in checklist concrete, scadenze chiare e soluzioni reali.",
      ctaPrimary: "Vedi tutte le normative",
      ctaSecondary: "Verifica responsabilità",
    scroll: "Scorri",
    },
    /* Countdown */
    countdown: {
      inForce: "In vigore",
      daysUntil: "giorni a",
    },
    /* Ticker */
    ticker: [
      "NIS2 2026 in vigore dal 1° ottobre 2026",
      "EU AI Act: obblighi completi dal 2 agosto 2026",
      "DORA: in vigore dal 17 gennaio 2025",
      "CRA Fase 1: obblighi di segnalazione da settembre 2026",
      "CSRD/ESG: rapporti di sostenibilità dal 2026 in AT",
      "EAA: obblighi di accessibilità dal 28 giugno 2025",
      "Protezione whistleblower: da 50 dipendenti",
      "Green Claims: \"Climate neutral\" senza prove presto illegale",
      "MiCA: licenze crypto obbligatorie da dicembre 2024",
      "DPP: Passaporto Digitale del Prodotto dal 2027 per le batterie",
      "PLD: software responsabile come prodotto da dicembre 2027",
      "DSA: regolamentazione piattaforme per tutti i servizi intermediari",
      "Data Act: accesso dati IoT e cambio cloud da settembre 2025",
      "eIDAS 2.0: EU Digital Identity Wallet da maggio 2026",
      "EHDS: Spazio europeo dei dati sanitari dal 2027",
      "ePrivacy: consenso cookie e regole di tracciamento",
      "~4.000 aziende AT interessate dalla NIS2",
      "Sanzioni NIS2: fino a 10 Mio. € o 2% del fatturato",
      "Sanzioni AI Act: fino a 35 Mio. € o 7% del fatturato",
    ],
    /* Stats */
    stats: {
      regulations: "Regolamenti",
      maxFine: "sanzione max. AI Act",
      countries: "Paesi",
      countryLabel: "interessati in tutta l'UE",
      complianceYear: "l'anno della conformità",
      inOverview: "in sintesi",
    },
    /* Regulation Pillars */
    pillars: {
      sectionLabel: "Pilastri principali",
      title1: "Cosa",
      title2: "ti riguarda.",
      subtitle: "Quattro regolamenti. Scadenze chiare. Sanzioni reali. Qui trovi tutto ciò che devi sapere ora.",
      filterAll: "Mostra tutto",
      filterLive: "Già attivo",
      filterUpcoming: "In arrivo",
      maxPenalty: "Sanzione max.",
      affects: "Riguarda",
    },
    /* Pillar data — translatable fields */
    pillarData: {
      nisg: {
        fullName: "Legge sulla sicurezza delle reti e dell'informazione 2026",
        tagline: "Attuazione austriaca della NIS2",
        statusLabel: "Dal 1° ott. 2026",
        affected: "~4.000 aziende AT",
        keyFacts: ["Registrazione entro il 31 dic. 2026", "Autodichiarazione entro il 31 dic. 2027", "Agenzia federale per la cybersicurezza", "BGBl. I Nr. 94/2025"],
      },
      aiact: {
        fullName: "Regolamento europeo sull'intelligenza artificiale",
        tagline: "Regolamentazione dell'IA per l'Europa",
        statusLabel: "Dal 2 ago. 2026",
        affected: "Tutti gli sviluppatori e utenti di IA",
        keyFacts: ["IA ad alto rischio: occupazione, credito", "Sistemi di IA vietati: immediatamente", "EU AI Office come supervisore", "Digital Omnibus: possibile rinvio"],
      },
      dora: {
        fullName: "Digital Operational Resilience Act",
        tagline: "Resilienza nel settore finanziario",
        statusLabel: "Dal 17 gen. 2025",
        affected: "Istituzioni finanziarie e fornitori ICT",
        keyFacts: ["Registro ICT: 13 marzo 2026", "Cicli di test TLPT in corso", "FMA come supervisore (AT)", "Si applica a 20+ entità finanziarie"],
      },
      cra: {
        fullName: "Cyber Resilience Act",
        tagline: "Sicurezza dei prodotti digitali",
        statusLabel: "Fase 1: set. 2026",
        affected: "Produttori di prodotti digitali",
        keyFacts: ["Fase 1: segnalazione set. 2026", "Fase 2: marcatura CE dic. 2027", "Segnalazione vulnerabilità entro 24h", "Obbligo di Security-by-Design"],
      },
    },
    /* Secondary regulations */
    secondary: {
      sectionLabel: "Altri regolamenti UE",
      title1: "Protezione dati, ESG, piattaforme, dati e",
      title2: "altro.",
      subtitle: "Dalla protezione dei dati alla sostenibilità all'identità digitale — tredici ulteriori regolamenti UE che riguardano la tua azienda.",
      readGuide: "Leggi la guida",
      regulations: {
        dsgvo: { tagline: "Protezione dati nell'era dell'IA", badge: "Aggiornamento 2026" },
        csrd: { tagline: "Rapporti di sostenibilità", badge: "NaBeG dal 2026" },
        bafg: { tagline: "Accessibilità digitale", badge: "In vigore" },
        hschg: { tagline: "Protezione whistleblower", badge: "In vigore" },
        greenClaims: { tagline: "Anti-greenwashing", badge: "Dal 2027" },
        mica: { tagline: "Regolamentazione cripto-attività", badge: "In vigore" },
        dpp: { tagline: "Passaporto Digitale del Prodotto", badge: "Dal 2027" },
        pld: { tagline: "Responsabilità prodotto software", badge: "Dal 2027" },
        dsa: { tagline: "Regolamentazione piattaforme", badge: "In vigore" },
        dataAct: { tagline: "Dati IoT e cloud", badge: "Da set. 2025" },
        eprivacy: { tagline: "Cookie e tracciamento", badge: "In vigore" },
        eidas: { tagline: "Identità digitale UE", badge: "Dal 2026" },
        ehds: { tagline: "Dati sanitari", badge: "Dal 2027" },
      },
    },
    /* Timeline preview */
    timeline: {
      sectionLabel: "Calendario 2025 – 2027",
      title1: "Compliance",
      title2: "Timeline.",
      subtitle: "Tutte le scadenze importanti in sintesi. Pianifica in anticipo.",
      days: "giorni",
      ctaTimeline: "Vedi la timeline completa",
      alreadyInForce: "già in vigore",
    },
    /* Trust signals */
    trust: {
      regulationsExplained: "Regolamenti UE spiegati",
      freeTools: "Strumenti gratuiti",
      glossaryEntries: "Voci del glossario",
      independentAdFree: "Indipendente e senza pubblicità",
    },
    /* Quick Start */
    quickStart: {
      sectionLabel: "3 passi verso la conformità",
      title: "Come iniziare",
      subtitle: "Dall'analisi iniziale al piano di attuazione — il nostro workflow ti guida sistematicamente attraverso il processo di conformità.",
      steps: [
        {
          title: "Identifica i regolamenti",
          desc: "Usa il Regulation Finder per scoprire in 3 minuti quali leggi UE si applicano alla tua azienda.",
          cta: "Inizia il quiz",
        },
        {
          title: "Verifica lo stato",
          desc: "Usa la Checklist di conformità per verificare quali requisiti soddisfi già — e dove ci sono lacune.",
          cta: "Apri checklist",
        },
        {
          title: "Pianifica budget e maturità",
          desc: "Calcola i costi di implementazione e misura il tuo attuale livello di maturità in materia di conformità.",
          cta: "Calcola i costi",
        },
      ],
    },
    /* Tools section */
    tools: {
      sectionLabel: "Guide e risorse",
      title1: "Passa",
      title2: "all'azione.",
      subtitle: "Comprendi la responsabilità personale, trova finanziamenti e scopri gli esperti giusti.",
      items: [
        { title: "Regulation Finder", desc: "Scopri in 3 minuti quali regolamenti UE sono rilevanti per la tua azienda — personalizzato per settore, dimensione e attività.", cta: "Inizia il quiz", badge: "Nuovo" },
        { title: "Checklist di conformità", desc: "Verifica punto per punto quali requisiti di conformità UE la tua azienda soddisfa già.", cta: "Inizia la checklist", badge: "Nuovo" },
        { title: "Guida alla responsabilità", desc: "Responsabilità dei dirigenti secondo NIS2, DORA, AI Act e CRA — rischi personali e strategie di tutela.", cta: "Leggi la guida", badge: "Nuovo" },
        { title: "Radar scadenze", desc: "Tutte le scadenze di conformità UE in sintesi — personalizzate per i tuoi regolamenti rilevanti.", cta: "Verifica scadenze", badge: "Interattivo" },
        { title: "Calcolatore costi", desc: "Stima i costi di conformità UE — su misura per dimensione aziendale, livello di maturità e regolamenti.", cta: "Calcola i costi", badge: "Nuovo" },
        { title: "Glossario conformità", desc: "Oltre 45 termini di conformità spiegati chiaramente — dall'AI Act al Zero Trust.", cta: "Apri glossario", badge: "Nuovo" },
      ],
    },
    /* Why Us */
    whyUs: {
      sectionLabel: "Perché EU Compliance Hub",
      title1: "Niente legalese.",
      title2: "Linguaggio chiaro.",
      subtitle: "I regolamenti UE sembrano Kafka in linguaggio giuridico. Li leggiamo per te — e distilliamo l'essenziale in passi d'azione chiari.",
      benefits: [
        { title: "Nessun abbonamento necessario", desc: "Tutte le informazioni di base disponibili gratuitamente" },
        { title: "Sempre aggiornato", desc: "Aggiornamenti in tempo reale sulle modifiche normative" },
        { title: "Per ogni dimensione aziendale", desc: "Da imprenditori individuali a grandi imprese" },
        { title: "Tutta l'UE", desc: "Tutti i 27 stati membri coperti" },
      ],
      freeBadge: "100% gratuito",
      cardRegulations: "Regolamenti",
      cardActive: "Attivo",
      regList: [
        { name: "NISG 2026", label: "Ott 2026" },
        { name: "EU AI Act", label: "Ago 2026" },
        { name: "DORA", label: "Attivo" },
        { name: "CRA", label: "Set 2026" },
        { name: "GDPR & IA", label: "Attivo" },
        { name: "CSRD / ESG", label: "2026" },
        { name: "EAA", label: "Attivo" },
        { name: "HSchG", label: "Attivo" },
        { name: "Green Claims", label: "2027" },
        { name: "MiCA", label: "Attivo" },
        { name: "DPP / ESPR", label: "2027" },
        { name: "PLD", label: "2027" },
        { name: "DSA", label: "Attivo" },
        { name: "Data Act", label: "Set 2025" },
        { name: "ePrivacy", label: "Attivo" },
        { name: "eIDAS 2.0", label: "2026" },
        { name: "EHDS", label: "2027" },
        { name: "Responsabilità dirigenti", label: "Attivo" },
      ],
    },
    /* News preview */
    news: {
      title: "Novità sulla conformità",
      subtitle: "Nuove leggi, scadenze imminenti e sviluppi importanti",
      ctaNews: "Vedi tutte le novità",
      ctaCompare: "Confronto regolamenti",
      items: [
        { date: "25 giugno 2025", label: "NIS2", title: "NISG 2026 pubblicato", desc: "In vigore dal 1° ottobre 2026, registrazione entro fine 2026" },
        { date: "28 giugno 2025", label: "EAA", title: "Legge sull'accessibilità in vigore", desc: "Prodotti e servizi digitali devono essere accessibili" },
        { date: "1 gen. 2026", label: "CSRD", title: "CSRD: seconda ondata per grandi aziende", desc: "Obbligo di rendicontazione da 250 dipendenti / 50 Mio. € di fatturato" },
      ],
    },
    /* Report CTA */
    report: {
      badge: "Il nostro strumento più importante",
      title1: "Il tuo",
      title2: "Report di conformità.",
      subtitle: "In 5 minuti riceverai un'analisi completa — quali regolamenti si applicano alla tua azienda, quali costi di implementazione e come migliorare il tuo livello di maturità.",
      benefit1Title: "14 regolamenti verificati",
      benefit1Desc: "Su misura per settore, dimensione e attività",
      benefit2Title: "Stima dei costi inclusa",
      benefit2Desc: "Suddivisa per regolamento e dimensione aziendale",
      benefit3Title: "Report PDF via e-mail",
      benefit3Desc: "Formattato professionalmente con raccomandazioni software",
      ctaCreate: "Crea report di conformità",
      ctaSubtitle: "Gratuito. Senza impegno. Pronto in 5 minuti.",
      previewTitle: "Report di conformità",
      previewCompany: "Esempio S.r.l. — Feb 2026",
      previewMaturity: "Maturità",
      previewMaturityLabel: "Maturità di conformità",
      previewRegulations: "Regolamenti applicabili",
      previewMore: "+3 altri",
      previewCost: "Costi stimati",
      previewCostRange: "€45.000 – €120.000",
      previewCostLabel: "Costi totali per tutti i regolamenti applicabili",
      pdfDownload: "Download PDF",
    },
    /* Newsletter CTA */
    newsletter: {
      title: "Attiva il briefing di conformità",
      subtitle: "Il tuo sistema di allarme normativo — solo per scadenze critiche e modifiche normative. Massimo 3× al mese.",
    },
    /* Aria labels for sections */
    aria: {
      hero: "Hero – EU Compliance Hub",
      stats: "Statistiche",
      regulations: "Panoramica delle normative",
      moreRegulations: "Altre normative UE",
      timeline: "Anteprima della timeline",
      trust: "La piattaforma in numeri",
      quickStart: "Avvio rapido",
      tools: "Strumenti di conformità",
      whyUs: "Perché EU Compliance Hub",
      news: "Attualità e confronto normativo",
      report: "Crea report di conformità",
      newsletter: "Newsletter Compliance Briefing",
    },
  },
} as const;

export default it;
