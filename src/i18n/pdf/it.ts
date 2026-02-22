/* ══════════════════════════════════════════════════════════════
   Italian (IT) — PDF Report translations
   ══════════════════════════════════════════════════════════════ */

import type { PDFMessages } from "./types";

const it: PDFMessages = {
  locale: "it",

  /* ── Cover Page ── */
  cover: {
    label: "EU Compliance Hub",
    title: "Il vostro",
    titleAccent: "Report di Compliance",
    preparedFor: "Preparato per",
    dateLabel: "Data: ",
    countryLabel: "Paese: ",
    referenceLabel: "Riferimento: ",
    confidential: "Riservato",
    disclaimer:
      "Questo report ha finalit\u00e0 orientativa e non costituisce consulenza legale. Le informazioni contenute si basano sui dati da voi forniti e sulle normative vigenti al momento della generazione.",
    branding: "eu-compliance-hub.eu",
    page: "Pagina 1",
  },

  /* ── Table of Contents ── */
  toc: {
    title: "Indice",
    subtitle: "Panoramica di tutte le sezioni del vostro report di compliance",
    methodologyTitle: "Metodologia",
    methodologyText:
      "Questo report si basa sull\u2019EU Compliance Hub Assessment Framework. La valutazione tiene conto dei dati aziendali forniti, dei testi ufficiali dei regolamenti UE e delle leggi nazionali di recepimento. Tutti i dati sulle sanzioni corrispondono ai massimali previsti dalla legge. Le sanzioni effettive variano in base allo Stato membro e al caso specifico.",
    reportNr: "Report n.",
  },

  /* ── Executive Summary ── */
  exec: {
    title: "Sintesi",
    subtitle: "Executive Summary \u2014 La vostra situazione di compliance in sintesi",
    cumulativeFineRisk: "Rischio sanzionatorio cumulativo",
    upTo: "fino a",
    basedOnRegs:
      "Basato su {{count}} regolamenti rilevanti e sul vostro fatturato annuo stimato",
    maturityLabel: "Maturit\u00e0",
    regulationsLabel: "Regolamenti",
    highMedLow: "{{high}} alto, {{medium}} medio, {{low}} basso",
    costEstLabel: "Costi (stima)",
    implementationCosts: "Costi di implementazione",
    nextDeadlineLabel: "Prossima scadenza",
    noUrgent: "Nessuna urgente",
    regOverview: "Panoramica regolamenti ({{count}} valutati)",
    criticalRisks: "Rischi critici",
    fineUpTo: "Sanzione fino a {{amount}}",
    priorityActions: "Azioni prioritarie",
    relevanceHigh: "Alta",
    relevanceMedium: "Media",
    relevanceLow: "Bassa",
    riskLevelCritical: "Critico",
    riskLevelHigh: "Alto",
    riskLevelMedium: "Medio",
  },

  /* ── Company Profile ── */
  profile: {
    title: "Profilo aziendale e ambito di valutazione",
    subtitle: "Base della vostra valutazione di compliance personalizzata",
    companyLabel: "Azienda",
    contactLabel: "Referente",
    sizeLabel: "Dimensione aziendale",
    revenueLabel: "Fatturato annuo (ca.)",
    industryLabel: "Settore",
    countryLabel: "Paese",
    sectorsTitle: "Settori e industrie",
    activitiesTitle: "Attivit\u00e0 e operazioni",
    dataTypesTitle: "Tipologie di dati trattati",
    regulationsEvaluated: "Regolamenti\nvalutati",
    highRelevance: "Rilevanza\nalta",
    mediumRelevance: "Rilevanza\nmedia",
    lowRelevance: "Rilevanza\nbassa",
    methodologyNote:
      "Basato sull\u2019EU Compliance Hub Assessment Framework. La valutazione della rilevanza tiene conto delle dimensioni aziendali, del settore, del trattamento dei dati e delle specifiche attivit\u00e0 commerciali, conformemente all\u2019ambito di applicazione ufficiale dei regolamenti UE.",
    sizeLabels: {
      micro: "Microimpresa (< 10 dipendenti)",
      small: "Piccola impresa (10\u201349 dipendenti)",
      medium: "Media impresa (50\u2013249 dipendenti)",
      large: "Grande impresa (250+ dipendenti)",
    },
    sectorLabels: {
      it: "IT / Software / Cloud",
      finance: "Servizi finanziari / Assicurazioni",
      health: "Sanit\u00e0 / Farmaceutica",
      energy: "Energia / Servizi pubblici",
      manufacturing: "Manifattura / Industria",
      transport: "Trasporti / Logistica",
      retail: "Commercio / E-Commerce",
      telecom: "Telecomunicazioni",
      public: "Settore pubblico",
      other: "Altro settore",
    },
    activityLabels: {
      ai: "Sistemi di IA",
      software: "Prodotti digitali",
      "critical-infra": "Infrastruttura critica",
      "online-platform": "Piattaforma online",
      esg: "Reporting ESG",
      crypto: "Cripto-asset",
      "cross-border": "Transfrontaliero",
      ecommerce: "E-Commerce",
      eid: "eID / Servizi fiduciari",
    },
    dataLabels: {
      personal: "Dati personali",
      sensitive: "Categorie particolari",
      children: "Dati di minori",
      financial: "Dati finanziari",
      b2b: "Dati B2B",
      iot: "Dati IoT / Sensori",
    },
    revenueLabels: {
      "< 2M": "< 2 mln EUR",
      "2-10M": "2\u201310 mln EUR",
      "10-50M": "10\u201350 mln EUR",
      "> 50M": "> 50 mln EUR",
    },
  },

  /* ── Risk Exposure ── */
  risk: {
    title: "Esposizione al rischio e rischio sanzionatorio",
    subtitle:
      "Rischi sanzionatori massimi basati sul vostro fatturato annuo stimato",
    cumulativeFineRisk: "Rischio sanzionatorio cumulativo",
    roiLabel: "ROI: Investimento in compliance",
    roiValue: "{{multiple}}x riduzione del rischio",
    complianceInvestment: "Investimento in compliance",
    complianceInvestmentDesc:
      "Costi di implementazione stimati per tutti i regolamenti rilevanti",
    fineRisk: "Rischio sanzionatorio",
    fineRiskDesc: "Sanzioni massime cumulative in caso di non conformit\u00e0",
    disclaimer:
      "Sanzioni massime ai sensi dei testi normativi UE. Per i regolamenti con la regola \"il valore pi\u00f9 elevato tra i due\", il calcolo si basa su un fatturato annuo stimato di {{revenue}}. Le sanzioni effettive variano in base allo Stato membro, alla gravit\u00e0 della violazione e al livello di cooperazione.",
    billion: "mld",
    million: "mln",
    calcPercent: "{{percent}}% del fatturato annuo ({{amount}})",
    calcFixed: "Importo fisso: {{amount}}",
    calcUpTo: "Fino a {{amount}}",
    calcUpToPercent: "Fino a {{percent}}% del fatturato annuo",
  },

  /* ── Regulation Section ── */
  regulation: {
    analysisTitle: "Analisi dei regolamenti",
    analysisSubtitle:
      "Valutazione dettagliata dei regolamenti UE rilevanti per la vostra azienda",
    countryFocus: "Focus paese: {{country}}",
    whyRelevant: "Perch\u00e9 rilevante",
    fineLabel: "Sanzione: ",
    checklistTitle: "Checklist di compliance",
    checklistStatus: "({{compliant}} conformi, {{partial}} parziali)",
    deadlineLabel: "Scadenza: ",
    authorityLabel: "Autorit\u00e0: ",
    nationalLawLabel: "Legge nazionale: ",
    nationalFinesLabel: "Sanzioni: ",
    guideLabel: "Guida dettagliata: ",
    legendCompliant: "Conforme",
    legendPartial: "Parziale",
    legendOpen: "Aperto",
    relevanceHighLabel: "Rilevanza alta",
    relevanceMediumLabel: "Rilevanza media",
    relevanceLowLabel: "Rilevanza bassa",
    priorityImmediate: "Immediata",
    priorityShortTerm: "Breve termine",
    priorityMediumTerm: "Medio termine",
  },

  /* ── Maturity Assessment ── */
  maturity: {
    title: "Valutazione della maturit\u00e0",
    subtitle: "Livello di maturit\u00e0 della compliance aziendale",
    categoryTitle: "Valutazione per categoria",
    points: "{{score}} / {{max}} Punti",
    scaleTitle: "Scala di valutazione",
    gradeLabels: [
      { letter: "A", label: "80\u2013100% Esemplare" },
      { letter: "B", label: "60\u201379% Avanzato" },
      { letter: "C", label: "40\u201359% Base" },
      { letter: "D", label: "20\u201339% Principiante" },
      { letter: "E", label: "0\u201319% Critico" },
    ],
    gradeLetterLabels: {
      A: "A \u2013 Esemplare",
      B: "B \u2013 Avanzato",
      C: "C \u2013 Base",
      D: "D \u2013 Principiante",
      E: "E \u2013 Critico",
    },
    categoryLabels: {
      governance: "Governance e organizzazione",
      datenschutz: "Protezione dei dati (GDPR)",
      cybersecurity: "Cybersicurezza (NIS2/CRA)",
      "ki-compliance": "IA e tecnologia (AI Act)",
      reporting: "Reporting e documentazione",
    },
    gradeExcellent:
      "La vostra azienda dimostra un livello di maturit\u00e0 esemplare in materia di compliance. Le basi per {{regulations}} sono solidamente implementate. Concentratevi sul miglioramento continuo e su audit regolari.",
    gradeGood:
      "Buoni progressi nell\u2019implementazione della compliance. Per {{regulations}} esistono gi\u00e0 strutture essenziali. {{weakAreas}}",
    gradeBasic:
      "Esistono strutture di compliance di base, ma permangono lacune significative per {{regulations}}. {{weakAreas}} Il rischio sanzionatorio \u00e8 elevato a questo livello di maturit\u00e0.",
    gradeBeginner:
      "La vostra maturit\u00e0 in materia di compliance presenta un notevole margine di miglioramento. Mancano misure centrali per {{regulations}}. {{weakAreas}} Si raccomanda vivamente di agire immediatamente per ridurre al minimo le sanzioni e i rischi di responsabilit\u00e0.",
    gradeCritical:
      "Intervento critico necessario: la vostra azienda ha implementato pochissime misure di compliance per {{regulations}}. Il rischio di sanzioni e di responsabilit\u00e0 personale per la dirigenza \u00e8 molto elevato. Si raccomanda urgentemente una consulenza professionale immediata.",
    recoGoodTitle: "Raccomandazione: Miglioramento continuo",
    recoGoodText:
      "Istituite revisioni di compliance regolari (trimestrali) e mantenete aggiornata la vostra documentazione. Formate sistematicamente i nuovi dipendenti e monitorate i cambiamenti normativi.",
    recoBasicTitle: "Raccomandazione: Sviluppo strutturato",
    recoBasicText:
      "Definite responsabilit\u00e0 chiare in materia di compliance e create un piano a 3 mesi. Iniziate dai regolamenti a pi\u00f9 alta rilevanza e colmate prima le lacune maggiori.",
    recoCriticalTitle: "Raccomandazione: Azione immediata necessaria",
    recoCriticalText:
      "A questo livello di maturit\u00e0 sussiste un rischio acuto di sanzioni. Nominate immediatamente un responsabile della compliance, commissionate un\u2019analisi professionale dei gap e date priorit\u00e0 ai regolamenti con il pi\u00f9 alto rischio sanzionatorio.",
  },

  /* ── Cost Estimation ── */
  cost: {
    title: "Stima dei costi",
    subtitle: "Costi di implementazione stimati \u2014 {{sizeLabel}}",
    totalCosts: "Costi totali stimati",
    regulationsCount: "{{count}} regolamenti",
    exclSynergies: "escl. sinergie",
    complianceInvestment: "Investimento in compliance",
    avgCostsLabel: "Costi medi di implementazione",
    fineRisk: "Rischio sanzionatorio",
    cumulativeFines: "Sanzioni massime cumulative",
    fineRiskIs: "Il rischio sanzionatorio \u00e8",
    timesHigher: "superiore all\u2019investimento in compliance",
    clearBusinessCase: "Business Case chiaro",
    synergiesTitle: "Effetti sinergici",
    sizeLabels: {
      micro: "Microimpresa",
      small: "Piccola impresa",
      medium: "Media impresa",
      large: "Grande impresa",
    },
    breakdownItems: {
      "dsgvo-0": "Registro dei trattamenti e analisi delle lacune",
      "dsgvo-1": "Informativa sulla privacy e contratti",
      "dsgvo-2": "Implementazione misure tecniche e organizzative",
      "dsgvo-3": "Formazione e sensibilizzazione",
      "dsgvo-4": "Responsabile protezione dati (esterno, annuale)",
      "nis2-0": "Gestione dei rischi e analisi delle lacune",
      "nis2-1": "Implementazione ISMS / ISO 27001",
      "nis2-2": "Processi di risposta agli incidenti",
      "nis2-3": "Sicurezza della catena di fornitura",
      "nis2-4": "Formazione dirigenziale e governance",
      "nis2-5": "Misure tecniche (monitoraggio, SIEM)",
      "ai-act-0": "Inventario IA e valutazione dei rischi",
      "ai-act-1": "Documentazione di conformità",
      "ai-act-2": "Test di bias e monitoraggio",
      "ai-act-3": "Misure di trasparenza",
      "ai-act-4": "Formazione (competenze IA)",
      "dora-0": "Framework di gestione dei rischi ICT",
      "dora-1": "Sistema di segnalazione degli incidenti",
      "dora-2": "Test di resilienza (TLPT)",
      "dora-3": "Gestione dei rischi di terze parti",
      "dora-4": "Framework di condivisione delle informazioni",
      "cra-0": "Revisione Security-by-Design",
      "cra-1": "Gestione delle vulnerabilità (SBOM)",
      "cra-2": "Valutazione di conformità",
      "cra-3": "Processi di aggiornamento sicurezza (5 anni)",
      "cra-4": "Documentazione e marcatura CE",
      "csrd-0": "Analisi di materialità (doppia materialità)",
      "csrd-1": "Raccolta dati ESG e KPI",
      "csrd-2": "Report conforme ESRS",
      "csrd-3": "Revisione da parte del revisore",
      "csrd-4": "Software e strumenti",
    },
  },

  /* ── Deadline Timeline ── */
  deadlines: {
    title: "Panoramica delle scadenze",
    subtitle: "Scadenze normative UE rilevanti per la vostra azienda",
    noDeadlines: "Nessuna scadenza rilevante identificata.",
    today: "OGGI",
    daysPassed: "{{days}} giorni fa",
    todayLabel: "Oggi",
    inDays: "tra {{days}} giorni",
    titles: {
      "DSA-2024-02-17": "DSA pienamente in vigore",
      "MiCA-2024-12-30": "MiCA pienamente in vigore",
      "DORA-2025-01-17": "DORA in vigore",
      "CSRD-2025-01-01": "CSRD Ondata 2",
      "AI Act-2025-02-02": "AI Act Divieti",
      "BaFG-2025-06-28": "Legge accessibilità in vigore",
      "AI Act-2025-08-02": "AI Act GPAI",
      "Data Act-2025-09-12": "Data Act in vigore",
      "DORA-2026-03-13": "DORA Registro TIC",
      "CSRD-2026-01-01": "NaBeG AT Fase 1",
      "eIDAS-2026-05-20": "eIDAS 2.0 Portafoglio",
      "AI Act-2026-08-02": "AI Act Alto rischio",
      "CRA-2026-09-11": "CRA Fase 1",
      "NISG-2026-10-01": "NIS2 Recepimento",
      "NISG-2026-12-31": "NIS2 Registrazione",
      "EHDS-2027-03-26": "EHDS Uso primario",
      "Green Claims-2027-03-27": "Green Claims Recepimento",
      "CSRD-2027-01-01": "CSRD Ondata 3",
      "DPP-2027-06-01": "DPP Batterie",
      "AI Act-2027-08-02": "AI Act Allegato I",
      "PLD-2027-12-09": "PLD Recepimento",
      "CRA-2027-12-11": "CRA Fase 2",
      "HSchG-2028-01-01": "Valutazione protezione segnalanti",
      "CSRD-2029-01-01": "CSRD Ondata 4",
      "DPP-2030-01-01": "DPP Tessili ed elettronica",
    },
    descs: {
      "DSA-2024-02-17": "Tutti i servizi di intermediazione devono rispettare gli obblighi del DSA.",
      "MiCA-2024-12-30": "Tutti gli obblighi per CASP ed emittenti di token si applicano.",
      "DORA-2025-01-17": "Pienamente applicabile a tutti gli istituti finanziari.",
      "CSRD-2025-01-01": "Le grandi imprese (>250 dipendenti) riferiscono per la prima volta.",
      "AI Act-2025-02-02": "Le pratiche di IA vietate entrano in vigore.",
      "BaFG-2025-06-28": "Obbligo di accessibilità per prodotti e servizi digitali.",
      "AI Act-2025-08-02": "Gli obblighi GPAI e le regole di governance si applicano.",
      "Data Act-2025-09-12": "Accesso dati IoT, cloud switching e regole dati B2B si applicano.",
      "DORA-2026-03-13": "Registro delle informazioni da presentare alla FMA.",
      "CSRD-2026-01-01": "Le grandi imprese PIE riferiscono secondo ESRS in Austria.",
      "eIDAS-2026-05-20": "I portafogli di identità digitale UE devono essere disponibili.",
      "AI Act-2026-08-02": "Obblighi completi per i sistemi di IA ad alto rischio.",
      "CRA-2026-09-11": "Obblighi di notifica 24h/72h all'ENISA.",
      "NISG-2026-10-01": "Tutti gli obblighi per le entità interessate.",
      "NISG-2026-12-31": "Registrazione presso il BSC obbligatoria.",
      "EHDS-2027-03-26": "Diritti dei pazienti e accesso ai dati sanitari personali.",
      "Green Claims-2027-03-27": "Recepimento nazionale della direttiva anti-greenwashing.",
      "CSRD-2027-01-01": "Le PMI quotate riferiscono per la prima volta secondo ESRS.",
      "DPP-2027-06-01": "Passaporto digitale dei prodotti per le batterie obbligatorio.",
      "AI Act-2027-08-02": "Sistemi ad alto rischio rimanenti (dispositivi medici ecc.) regolamentati.",
      "PLD-2027-12-09": "Recepimento nazionale della nuova direttiva sulla responsabilità dei prodotti.",
      "CRA-2027-12-11": "La marcatura CE diventa obbligatoria.",
      "HSchG-2028-01-01": "Valutazione delle misure di protezione dei segnalanti.",
      "CSRD-2029-01-01": "Le imprese extra-UE (>150 M EUR di fatturato UE) riferiscono.",
      "DPP-2030-01-01": "Passaporto prodotto per tessili ed elettronica obbligatorio.",
    },
  },

  /* ── Action Roadmap ── */
  roadmap: {
    title: "Piano d\u2019azione",
    subtitle:
      "Piano in 3 fasi con priorit\u00e0 per la vostra implementazione della compliance",
    phase1Label: "Fase 1",
    phase1Time: "Immediato (0\u201330 giorni)",
    phase2Label: "Fase 2",
    phase2Time: "Breve termine (1\u20133 mesi)",
    phase3Label: "Fase 3",
    phase3Time: "Medio termine (3\u20136 mesi)",
    effortLabel: "Impegno: ",
    effortLow: "Basso",
    effortMedium: "Medio",
    effortHigh: "Alto",
    quickWinsTitle: "Quick Wins",
    quickWinsText:
      "Iniziate con un\u2019analisi dei gap dei regolamenti pi\u00f9 importanti. Molte misure (ad es. formazione, documentazione, analisi dei rischi) sono trasversali ai regolamenti e generano effetti sinergici con un risparmio dei costi del 20\u201340%.",
  },

  /* ── Software Recommendations ── */
  software: {
    title: "Strumenti e software consigliati",
    subtitle:
      "Soluzioni selezionate per i vostri regolamenti rilevanti \u2014 ordinate per rilevanza DACH",
    dachFocus: "Focus DACH",
    dachPresent: "Presente in DACH",
    international: "Internazionale",
    disclaimerText:
      "Tutte le raccomandazioni sono indipendenti e selezionate dalla redazione. I prezzi sono indicativi e possono variare in base alle dimensioni aziendali e alla configurazione. Confronti dettagliati sono disponibili sul nostro sito web.",
    disclaimerUrl: "eu-compliance-hub.eu/tools",
  },

  /* ── Next Steps ── */
  nextSteps: {
    title: "Prossimi passi",
    subtitle: "Azioni consigliate per la vostra implementazione della compliance",
    guidesTitle: "Le vostre guide rilevanti",
    ctaTitle: "Vi supportiamo",
    ctaText:
      "Utilizzate i nostri strumenti interattivi gratuiti per un\u2019analisi approfondita. Iscrivetevi al nostro briefing di compliance per gli ultimi aggiornamenti normativi.",
    ctaToolsLabel: "Tutti gli strumenti",
    ctaNewsletterLabel: "Newsletter",
    ctaContactLabel: "Contatti",
    branding:
      "EU Compliance Hub \u2014 Il vostro navigatore nel panorama normativo dell\u2019UE",
  },

  /* ── Shared Footer ── */
  footer: {
    siteName: "EU Compliance Hub | eu-compliance-hub.eu",
    pageOf: "Pagina {{page}} di {{total}}",
    generatedAt: "Generato il {{date}} \u2014 Non costituisce consulenza legale",
  },

  /* ── TOC Section Names ── */
  tocSections: {
    executiveSummary: "Sintesi esecutiva",
    executiveSummaryDesc: "La vostra situazione di compliance in sintesi",
    companyProfile: "Profilo aziendale",
    companyProfileDesc: "Base di valutazione e contesto aziendale",
    riskExposure: "Esposizione al rischio",
    riskExposureDesc: "Rischio sanzionatorio e impatto finanziario",
    regulationAnalysis: "Analisi dei regolamenti",
    regulationAnalysisDesc:
      "Valutazione dettagliata di {{count}} regolamenti rilevanti",
    maturityAssessment: "Valutazione della maturit\u00e0",
    maturityAssessmentDesc: "Maturit\u00e0 della compliance per categoria",
    costEstimation: "Stima dei costi",
    costEstimationDesc: "Costi di implementazione stimati e ROI",
    deadlineOverview: "Panoramica delle scadenze",
    deadlineOverviewDesc:
      "Panoramica cronologica di tutte le scadenze rilevanti",
    actionPlan: "Piano d\u2019azione",
    actionPlanDesc: "Roadmap in 3 fasi per l\u2019implementazione della compliance",
    softwareRecs: "Raccomandazioni software",
    softwareRecsDesc: "Strumenti e soluzioni per i vostri regolamenti",
    nextSteps: "Prossimi passi",
    nextStepsDesc: "Azioni consigliate e risorse aggiuntive",
  },

  /* ── Report Engine Strings ── */
  engine: {
    appointComplianceOfficer:
      "Nominare un responsabile della compliance e istituire un comitato direttivo",
    deadlineUrgent:
      "{{title}}: scadenza tra {{days}} giorni \u2014 avviare misure immediate",
    gapAnalysis:
      "Condurre un\u2019analisi dei gap e un inventario per {{name}}",
    coreImplementation:
      "Implementare le misure fondamentali per la compliance {{name}}",
    trainingProgram:
      "Istituire un programma di formazione per dipendenti e dirigenti",
    assessAndPlan:
      "Valutare i requisiti {{name}} e pianificare l\u2019implementazione con priorit\u00e0",
    establishReviews:
      "Istituire revisioni di compliance regolari e cicli di audit",
    roleManagement: "Direzione",
    roleComplianceTeam: "Team Compliance",
    roleDeptIT: "Reparto specialistico + IT",
    roleHRCompliance: "HR / Compliance",
    phaseImmediate: "Immediato (0\u201330 giorni)",
    phaseShortTerm: "Breve termine (1\u20133 mesi)",
    phaseMediumTerm: "Medio termine (3\u20136 mesi)",
    governanceLabel: "Governance",
    trainingLabel: "Formazione",
    auditLabel: "Audit",
    defineResponsibilities:
      "Definire le responsabilit\u00e0 di compliance a livello dirigenziale e stanziare il budget",
    deadlinePriority:
      "{{title}} ha la massima priorit\u00e0 \u2014 scadenza tra {{days}} giorni",
    immediateMeasures: "Avviare misure immediate per {{names}}",
    minimizeFineRisk:
      "Ridurre al minimo il rischio sanzionatorio fino a {{amount}} attraverso una compliance proattiva",
    planBudget: "Prevedere un budget per la compliance di {{range}}",
    establishRegularReviews:
      "Istituire revisioni di compliance regolari e mantenere aggiornata la documentazione",
    synergyBasic:
      "L\u2019implementazione simultanea di pi\u00f9 regolamenti consente un risparmio del 20\u201340% dei costi grazie alle sinergie.",
    synergyTemplate:
      "L\u2019implementazione simultanea di {{examples}} consente un risparmio del 20\u201340% dei costi grazie alle sinergie. Misure comuni: {{measures}}.",
    synergyISMS: "Implementazione ISMS (NIS2 + DORA)",
    synergyRisk: "Framework di gestione del rischio",
    synergySecurity: "Processi Security-by-Design",
    synergySustainability: "Governance della sostenibilit\u00e0",
    synergyDefault: "Strutture di governance e formazione",
  },

  /* ── Regulation Names ── */
  regNames: {
    dsgvo: "GDPR",
    nis2: "NIS2",
    "ai-act": "EU AI Act",
    dora: "DORA",
    cra: "Cyber Resilience Act",
    csrd: "CSRD / ESG",
    dsa: "Digital Services Act",
    mica: "MiCA",
    "data-act": "Data Act",
    eprivacy: "ePrivacy",
    eidas: "eIDAS 2.0",
    produkthaftung: "Responsabilit\u00e0 da prodotto UE",
    ehds: "EHDS",
  },

  checklistItems: {
    /* NIS2 */
    "nis2-1": "Valutazione d\u2019impatto completata (settore, dimensione, fatturato)",
    "nis2-2": "Framework di gestione del rischio implementato",
    "nis2-3": "Piano di risposta agli incidenti predisposto (obbligo di segnalazione entro 72h)",
    "nis2-4": "Business Continuity Management (BCM) istituito",
    "nis2-5": "Sicurezza della catena di fornitura valutata",
    "nis2-6": "Dirigenza formata sulla cybersicurezza (responsabilit\u00e0!)",
    "nis2-7": "Misure tecniche: MFA, crittografia, segmentazione della rete",
    "nis2-8": "Obblighi di segnalazione e contatti con le autorit\u00e0 definiti",
    /* GDPR */
    "dsgvo-1": "Registro delle attivit\u00e0 di trattamento (art. 30) aggiornato e completo",
    "dsgvo-2": "Valutazione d\u2019impatto sulla protezione dei dati (DPIA) per trattamenti ad alto rischio",
    "dsgvo-3": "Accordi per il trattamento dei dati (DPA) con tutti i fornitori di servizi",
    "dsgvo-4": "Gestione del consenso (cookie banner, opt-in) conforme alla legge",
    "dsgvo-5": "Informativa sulla privacy aggiornata e completa",
    "dsgvo-6": "Processo per i diritti degli interessati implementato (accesso, cancellazione)",
    "dsgvo-7": "Misure tecniche e organizzative (TOMs) documentate",
    "dsgvo-8": "Notifica di violazione dei dati (72h) predisposta",
    /* AI Act */
    "ai-1": "Sistemi di IA inventariati e classe di rischio determinata",
    "ai-2": "Pratiche di IA vietate escluse (social scoring ecc.)",
    "ai-3": "Sistemi ad alto rischio con valutazione di conformit\u00e0",
    "ai-4": "Obblighi di trasparenza per chatbot/deepfake implementati",
    "ai-5": "Alfabetizzazione in materia di IA per i dipendenti garantita",
    "ai-6": "Obblighi di documentazione e documentazione tecnica predisposti",
    "ai-7": "Supervisione umana per le decisioni dell\u2019IA garantita",
    /* DORA */
    "dora-1": "Framework di gestione del rischio ICT istituito",
    "dora-2": "Segnalazione degli incidenti ICT all\u2019autorit\u00e0 di vigilanza predisposta",
    "dora-3": "Threat-Led Penetration Testing (TLPT) pianificato",
    "dora-4": "Gestione del rischio ICT di terze parti implementata",
    "dora-5": "Registro dei fornitori di servizi ICT critici mantenuto",
    "dora-6": "Piani di continuit\u00e0 operativa e disaster recovery testati",
    /* CRA */
    "cra-1": "Prodotti con elementi digitali identificati",
    "cra-2": "Security-by-Design integrato nel processo di sviluppo",
    "cra-3": "Processo di gestione delle vulnerabilit\u00e0 istituito",
    "cra-4": "Software Bill of Materials (SBOM) predisposto",
    "cra-5": "Aggiornamenti di sicurezza pianificati per il periodo di supporto",
    "cra-6": "Valutazione di conformit\u00e0 per la categoria di prodotto predisposta",
    /* CSRD */
    "csrd-1": "Applicabilit\u00e0 in base alle dimensioni aziendali verificata",
    "csrd-2": "Analisi della doppia materialit\u00e0 completata",
    "csrd-3": "Data point ESRS identificati e raccolti",
    "csrd-4": "Processi di raccolta dati ESG implementati",
    "csrd-5": "Revisore per il report di sostenibilit\u00e0 selezionato",
    "csrd-6": "Allineamento alla tassonomia delle attivit\u00e0 economiche verificato",
  },

  /* ── Regulation Subtitles ── */
  regSubtitles: {
    dsgvo: "Regolamento Generale sulla Protezione dei Dati",
    nis2: "Sicurezza delle reti e delle informazioni",
    "ai-act": "Regolamento sull\u2019intelligenza artificiale",
    dora: "Resilienza operativa digitale",
    cra: "Sicurezza informatica dei prodotti",
    csrd: "Rendicontazione di sostenibilit\u00e0",
    dsa: "Regolamento sulle piattaforme",
    mica: "Mercati delle cripto-attivit\u00e0",
    "data-act": "Regolamento sull\u2019accesso ai dati",
    eprivacy: "Privacy nelle comunicazioni elettroniche",
    eidas: "Identificazione elettronica",
    produkthaftung: "Nuova direttiva sulla responsabilit\u00e0 da prodotto",
    ehds: "Spazio europeo dei dati sanitari",
  },

  /* ── Regulation Evaluator Reason Templates ── */
  eval: {
    essentialEntity: "entit\u00e0 essenziale",
    importantEntity: "entit\u00e0 importante",

    dsgvoBase: "In qualit\u00e0 di {{sizeLabel}}, trattate {{dataTypes}} con ambito UE.",
    dsgvoSensitive: "Il trattamento di categorie particolari di dati comporta obblighi rafforzati (art. 9 GDPR), in particolare le valutazioni d\u2019impatto sulla protezione dei dati.",
    dsgvoStandard: "Ci\u00f2 include gli obblighi relativi al registro delle attivit\u00e0 di trattamento (art. 30), ai diritti degli interessati (artt. 15\u201322) e alle valutazioni d\u2019impatto per i trattamenti ad alto rischio.",

    nis2CriticalInfra: "In qualit\u00e0 di operatore di infrastruttura critica, siete classificati come \u00abentit\u00e0 essenziale\u00bb ai sensi dell\u2019art. 3 NIS2 e soggetti agli obblighi pi\u00f9 stringenti.",
    nis2SectorSize: "In qualit\u00e0 di {{sizeLabel}} nel settore {{sectors}}, siete classificati come \u00ab{{category}}\u00bb ai sensi dell\u2019art. 3 NIS2.",
    nis2Suffix: "Ci\u00f2 include la gestione del rischio (art. 21), la segnalazione degli incidenti entro 24h/72h (art. 23) e la responsabilit\u00e0 personale della dirigenza (art. 20).",
    nis2BelowThreshold: "Il vostro settore {{sectors}} rientra nella NIS2, ma in qualit\u00e0 di {{sizeLabel}} siete al di sotto delle soglie dimensionali (50 dipendenti / 10 mln EUR di fatturato). Monitorate le leggi nazionali di recepimento \u2014 alcuni Stati membri potrebbero fissare soglie inferiori.",

    aiActBase: "In qualit\u00e0 di {{sizeLabel}}, utilizzate o sviluppate sistemi di IA. L\u2019EU AI Act richiede la classificazione del rischio di tutti i sistemi di IA e classifica determinate applicazioni come ad alto rischio.",
    aiActSensitive: "Il trattamento di dati sensibili comporta probabilmente obblighi rafforzati di trasparenza e documentazione.",
    aiActBanned: "Le pratiche di IA vietate (art. 5) sono in vigore da febbraio 2025.",

    doraDirect: "In qualit\u00e0 di {{sizeLabel}} nel settore finanziario, rientrate direttamente nel campo di applicazione di DORA. Dovete istituire un framework di gestione del rischio ICT (artt. 6\u201316), segnalare gli incidenti alle autorit\u00e0 di vigilanza (artt. 17\u201323) e condurre test di penetrazione basati sulle minacce.",
    doraProvider: "In qualit\u00e0 di fornitore di servizi IT con accesso a dati finanziari, potreste qualificarvi come \u00abfornitore ICT terzo critico\u00bb ai sensi dell\u2019art. 31 DORA. Ci\u00f2 comporta la supervisione diretta da parte delle autorit\u00e0 finanziarie europee e requisiti contrattuali rigorosi.",

    craBase: "In qualit\u00e0 di produttore di prodotti con elementi digitali, rientrate nel Cyber Resilience Act. Dovete implementare la sicurezza fin dalla progettazione (art. 10), mantenere un SBOM (Software Bill of Materials) e fornire aggiornamenti di sicurezza per l\u2019intero periodo di supporto.",
    craManufacturing: "In qualit\u00e0 di azienda manifatturiera, si applicano requisiti aggiuntivi per i sistemi di produzione connessi.",

    csrdDirect: "In qualit\u00e0 di {{sizeLabel}} nell\u2019UE, siete tenuti alla rendicontazione di sostenibilit\u00e0 ai sensi della CSRD secondo gli standard ESRS. Ci\u00f2 include un\u2019analisi della doppia materialit\u00e0, le emissioni Scope 1/2/3 e l\u2019assurance esterna da parte di revisori.",
    csrdIndirect: "Attraverso le vostre attivit\u00e0 ESG/sostenibilit\u00e0 in qualit\u00e0 di {{sizeLabel}}, la rendicontazione CSRD potrebbe diventare rilevante tramite la catena di fornitura o su base volontaria. Dal 2026 saranno interessate anche le PMI quotate.",

    dsaReason: "In qualit\u00e0 di operatore di una piattaforma online o marketplace, rientrate nel DSA. Gli obblighi comprendono i rapporti di trasparenza (art. 15), un sistema di notifica e azione per i contenuti illegali (art. 16), le procedure di reclamo (art. 20) e il divieto di dark pattern (art. 25).",

    micaReason: "In qualit\u00e0 di {{sizeLabel}} nel settore cripto-attivit\u00e0/blockchain, dovete richiedere l\u2019autorizzazione come CASP (Crypto-Asset Service Provider) ai sensi di MiCA, soddisfare i requisiti AML/KYC e implementare la Travel Rule. I whitepaper per le emissioni di token richiedono l\u2019approvazione.",

    dataActIoT: "Trattate dati IoT/sensori e dovete garantire agli utenti l\u2019accesso ai dati generati ai sensi del Data Act (artt. 3\u20137). Ci\u00f2 include formati di dati standardizzati, condizioni contrattuali eque e il diritto di condividere i dati con terzi.",
    dataActManufacturer: "In qualit\u00e0 di produttore nel settore {{sectors}}, potrebbero applicarsi gli obblighi di accesso ai dati ai sensi del Data Act, in particolare se i vostri prodotti generano dati di utilizzo.",

    eprivacyDirect: "In qualit\u00e0 di azienda di e-commerce, si applicano gli obblighi ePrivacy relativi a cookie, tracciamento e marketing diretto elettronico. Un sistema di gestione del consenso conforme alla legge (cookie banner con opt-in) \u00e8 obbligatorio.",
    eprivacyIndirect: "Le regole ePrivacy su cookie e tracciamento si applicano anche al vostro sito web. Un cookie banner conforme al GDPR con opt-in effettivo \u00e8 obbligatorio.",

    eidasDirect: "In qualit\u00e0 di fornitore di servizi di identificazione elettronica o di servizi fiduciari, dovete soddisfare i requisiti di eIDAS 2.0, inclusa la compatibilit\u00e0 con l\u2019EU Digital Identity Wallet e le firme elettroniche qualificate.",
    eidasPublic: "Nel settore pubblico, l\u2019EU Digital Identity Wallet sar\u00e0 obbligatorio dal 2026. Preparate i vostri sistemi per l\u2019identificazione conforme a eIDAS 2.0.",

    produkthaftungReason: "La direttiva UE rivista sulla responsabilit\u00e0 da prodotto si estende ora al software e ai sistemi di IA come prodotti autonomi. In qualit\u00e0 di {{sizeLabel}} nel settore {{sectors}}, siete soggetti a responsabilit\u00e0 oggettiva per prodotti difettosi \u2014 l\u2019inversione dell\u2019onere della prova rafforza la tutela dei consumatori.",

    ehdsReason: "In qualit\u00e0 di {{sizeLabel}} nel settore sanitario, lo Spazio europeo dei dati sanitari (EHDS) diventa rilevante. L\u2019uso primario (portabilit\u00e0 dei pazienti) e l\u2019uso secondario (accesso alla ricerca) richiedono sistemi interoperabili e formati dati compatibili con FHIR.",
  },
};

export default it;
