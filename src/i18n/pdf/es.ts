/* ══════════════════════════════════════════════════════════════
   Spanish (ES) — PDF Report translations
   ══════════════════════════════════════════════════════════════ */

import type { PDFMessages } from "./types";

const es: PDFMessages = {
  locale: "es",

  /* ── Cover Page ── */
  cover: {
    label: "EU Compliance Hub",
    title: "Su informe personalizado de",
    titleAccent: "Compliance",
    preparedFor: "Preparado para",
    dateLabel: "Fecha de creaci\u00f3n: ",
    countryLabel: "Pa\u00eds: ",
    referenceLabel: "Referencia: ",
    confidential: "Confidencial",
    disclaimer:
      "Este informe tiene fines orientativos y no constituye asesoramiento jur\u00eddico. La informaci\u00f3n se basa en sus datos y en la normativa vigente en el momento de su elaboraci\u00f3n.",
    branding: "eu-compliance-hub.eu",
    page: "P\u00e1gina 1",
  },

  /* ── Table of Contents ── */
  toc: {
    title: "\u00cdndice",
    subtitle: "Visi\u00f3n general de todas las secciones de su informe de compliance",
    methodologyTitle: "Metodolog\u00eda",
    methodologyText:
      "Este informe se basa en el EU Compliance Hub Assessment Framework. La evaluaci\u00f3n tiene en cuenta los datos de su empresa, los textos oficiales de los reglamentos de la UE y las leyes nacionales de transposici\u00f3n. Todos los datos sobre sanciones corresponden a los l\u00edmites m\u00e1ximos legales. Las sanciones reales var\u00edan seg\u00fan el Estado miembro y el caso concreto.",
    reportNr: "Informe n.\u00ba",
  },

  /* ── Executive Summary ── */
  exec: {
    title: "De un vistazo",
    subtitle: "Resumen ejecutivo \u2014 Su situaci\u00f3n de compliance de un vistazo",
    cumulativeFineRisk: "Riesgo acumulado de sanciones",
    upTo: "hasta",
    basedOnRegs:
      "Basado en {{count}} regulaciones relevantes y su facturaci\u00f3n anual estimada",
    maturityLabel: "Madurez",
    regulationsLabel: "Regulaciones",
    highMedLow: "{{high}} alta, {{medium}} media, {{low}} baja",
    costEstLabel: "Coste (est.)",
    implementationCosts: "Costes de implementaci\u00f3n",
    nextDeadlineLabel: "Pr\u00f3ximo plazo",
    noUrgent: "Ninguno urgente",
    regOverview: "Resumen de regulaciones ({{count}} evaluadas)",
    criticalRisks: "Riesgos cr\u00edticos",
    fineUpTo: "Sanci\u00f3n de hasta {{amount}}",
    priorityActions: "Acciones prioritarias",
    relevanceHigh: "Alta",
    relevanceMedium: "Media",
    relevanceLow: "Baja",
    riskLevelCritical: "Crítico",
    riskLevelHigh: "Alto",
    riskLevelMedium: "Medio",
  },

  /* ── Company Profile ── */
  profile: {
    title: "Perfil de la empresa y alcance de la evaluaci\u00f3n",
    subtitle: "Base de su evaluaci\u00f3n personalizada de compliance",
    companyLabel: "Empresa",
    contactLabel: "Persona de contacto",
    sizeLabel: "Tama\u00f1o de la empresa",
    revenueLabel: "Facturaci\u00f3n anual (aprox.)",
    industryLabel: "Sector",
    countryLabel: "Pa\u00eds",
    sectorsTitle: "Sectores e industrias",
    activitiesTitle: "Actividades y operaciones",
    dataTypesTitle: "Tipos de datos tratados",
    regulationsEvaluated: "Regulaciones\nevaluadas",
    highRelevance: "Relevancia\nalta",
    mediumRelevance: "Relevancia\nmedia",
    lowRelevance: "Relevancia\nbaja",
    methodologyNote:
      "Basado en el EU Compliance Hub Assessment Framework. La evaluaci\u00f3n de relevancia tiene en cuenta el tama\u00f1o de la empresa, el sector, el tratamiento de datos y las actividades empresariales espec\u00edficas conforme al \u00e1mbito de aplicaci\u00f3n oficial de los reglamentos de la UE.",
    sizeLabels: {
      micro: "Microempresa (< 10 empleados)",
      small: "Peque\u00f1a empresa (10\u201349 empleados)",
      medium: "Mediana empresa (50\u2013249 empleados)",
      large: "Gran empresa (250+ empleados)",
    },
    sectorLabels: {
      it: "TI / Software / Cloud",
      finance: "Servicios financieros / Seguros",
      health: "Sanidad / Farmacia",
      energy: "Energ\u00eda / Suministros",
      manufacturing: "Fabricaci\u00f3n / Industria",
      transport: "Transporte / Log\u00edstica",
      retail: "Comercio / E-Commerce",
      telecom: "Telecomunicaciones",
      public: "Sector p\u00fablico",
      other: "Otro sector",
    },
    activityLabels: {
      ai: "Sistemas de IA",
      software: "Productos digitales",
      "critical-infra": "Infraestructura cr\u00edtica",
      "online-platform": "Plataforma en l\u00ednea",
      esg: "Informes ESG",
      crypto: "Criptoactivos",
      "cross-border": "Transfronterizo",
      ecommerce: "E-Commerce",
      eid: "eID / Servicios de confianza",
    },
    dataLabels: {
      personal: "Datos personales",
      sensitive: "Categor\u00edas especiales",
      children: "Datos de menores",
      financial: "Datos financieros",
      b2b: "Datos B2B",
      iot: "Datos IoT / Sensores",
    },
    revenueLabels: {
      "< 2M": "< 2 M EUR",
      "2-10M": "2\u201310 M EUR",
      "10-50M": "10\u201350 M EUR",
      "> 50M": "> 50 M EUR",
    },
  },

  /* ── Risk Exposure ── */
  risk: {
    title: "Exposici\u00f3n al riesgo y riesgo de sanciones",
    subtitle:
      "Riesgos m\u00e1ximos de sanciones basados en su facturaci\u00f3n anual estimada",
    cumulativeFineRisk: "Riesgo acumulado de sanciones",
    roiLabel: "ROI: Inversi\u00f3n en compliance",
    roiValue: "{{multiple}}x Reducci\u00f3n del riesgo",
    complianceInvestment: "Inversi\u00f3n en compliance",
    complianceInvestmentDesc:
      "Costes estimados de implementaci\u00f3n para todas las regulaciones relevantes",
    fineRisk: "Riesgo de sanci\u00f3n",
    fineRiskDesc: "Sanciones m\u00e1ximas acumuladas por incumplimiento",
    disclaimer:
      "Sanciones m\u00e1ximas seg\u00fan los textos de los reglamentos de la UE. Para regulaciones con la regla \"la cifra que sea mayor\", los c\u00e1lculos se basan en una facturaci\u00f3n anual estimada de {{revenue}}. Las sanciones reales var\u00edan seg\u00fan el Estado miembro, la gravedad de la infracci\u00f3n y el grado de cooperaci\u00f3n.",
    billion: "Mrd.",
    million: "M",
    calcPercent: "{{percent}}% de la facturaci\u00f3n anual ({{amount}})",
    calcFixed: "Importe fijo: {{amount}}",
    calcUpTo: "Hasta {{amount}}",
    calcUpToPercent: "Hasta {{percent}}% de la facturaci\u00f3n anual",
  },

  /* ── Regulation Section ── */
  regulation: {
    analysisTitle: "An\u00e1lisis regulatorio",
    analysisSubtitle:
      "Evaluaci\u00f3n detallada de las regulaciones de la UE relevantes para usted",
    countryFocus: "Enfoque por pa\u00eds: {{country}}",
    whyRelevant: "Por qu\u00e9 es relevante",
    fineLabel: "Sanci\u00f3n: ",
    checklistTitle: "Lista de verificaci\u00f3n de compliance",
    checklistStatus: "({{compliant}} cumplidos, {{partial}} parciales)",
    deadlineLabel: "Plazo: ",
    authorityLabel: "Autoridad: ",
    nationalLawLabel: "Ley nacional: ",
    nationalFinesLabel: "Sanciones: ",
    guideLabel: "Gu\u00eda detallada: ",
    legendCompliant: "Cumplido",
    legendPartial: "Parcial",
    legendOpen: "Pendiente",
    relevanceHighLabel: "Relevancia alta",
    relevanceMediumLabel: "Relevancia media",
    relevanceLowLabel: "Relevancia baja",
    priorityImmediate: "Inmediata",
    priorityShortTerm: "A corto plazo",
    priorityMediumTerm: "A medio plazo",
  },

  /* ── Maturity Assessment ── */
  maturity: {
    title: "Evaluaci\u00f3n de madurez",
    subtitle: "Nivel de madurez de compliance de su empresa",
    categoryTitle: "Evaluaci\u00f3n por categor\u00eda",
    points: "{{score}} / {{max}} Puntos",
    scaleTitle: "Escala de valoraci\u00f3n",
    gradeLabels: [
      { letter: "A", label: "80\u2013100% Ejemplar" },
      { letter: "B", label: "60\u201379% Avanzado" },
      { letter: "C", label: "40\u201359% B\u00e1sico" },
      { letter: "D", label: "20\u201339% Principiante" },
      { letter: "E", label: "0\u201319% Cr\u00edtico" },
    ],
    gradeLetterLabels: {
      A: "A \u2013 Ejemplar",
      B: "B \u2013 Avanzado",
      C: "C \u2013 B\u00e1sico",
      D: "D \u2013 Principiante",
      E: "E \u2013 Cr\u00edtico",
    },
    categoryLabels: {
      governance: "Gobernanza y organizaci\u00f3n",
      datenschutz: "Protecci\u00f3n de datos (RGPD)",
      cybersecurity: "Ciberseguridad (NIS2/CRA)",
      "ki-compliance": "IA y tecnolog\u00eda (AI Act)",
      reporting: "Informes y documentaci\u00f3n",
    },
    gradeExcellent:
      "Su empresa demuestra un nivel de madurez de compliance ejemplar. Las bases para {{regulations}} est\u00e1n s\u00f3lidamente implementadas. C\u00e9ntrese en la mejora continua y las auditor\u00edas peri\u00f3dicas.",
    gradeGood:
      "Buen avance en la implementaci\u00f3n del compliance. Ya existen estructuras esenciales para {{regulations}}. {{weakAreas}}",
    gradeBasic:
      "Existen estructuras b\u00e1sicas de compliance, pero quedan lagunas significativas en {{regulations}}. {{weakAreas}} El riesgo de sanciones es elevado en este nivel de madurez.",
    gradeBeginner:
      "Su nivel de madurez de compliance presenta una necesidad considerable de mejora. Faltan medidas clave para {{regulations}}. {{weakAreas}} Se recomienda encarecidamente actuar de inmediato para minimizar sanciones y riesgos de responsabilidad.",
    gradeCritical:
      "Se requiere acci\u00f3n cr\u00edtica: su empresa apenas ha implementado medidas de compliance para {{regulations}}. El riesgo de sanciones y de responsabilidad personal de la direcci\u00f3n es muy elevado. Se recomienda encarecidamente solicitar asesoramiento profesional de inmediato.",
    recoGoodTitle: "Recomendaci\u00f3n: Mejora continua",
    recoGoodText:
      "Establezca revisiones peri\u00f3dicas de compliance (trimestrales) y mantenga su documentaci\u00f3n actualizada. Forme sistem\u00e1ticamente a los nuevos empleados y supervise los cambios normativos.",
    recoBasicTitle: "Recomendaci\u00f3n: Desarrollo estructurado",
    recoBasicText:
      "Defina responsabilidades claras de compliance y elabore un plan a 3 meses. Comience por las regulaciones de mayor relevancia y cierre primero las lagunas m\u00e1s importantes.",
    recoCriticalTitle: "Recomendaci\u00f3n: Acci\u00f3n inmediata necesaria",
    recoCriticalText:
      "En este nivel de madurez existe un riesgo agudo de sanciones. Nombre de inmediato a un responsable de compliance, encargue un an\u00e1lisis profesional de deficiencias y priorice las regulaciones con mayor riesgo de sanci\u00f3n.",
  },

  /* ── Cost Estimation ── */
  cost: {
    title: "Estimaci\u00f3n de costes",
    subtitle: "Costes estimados de implementaci\u00f3n \u2014 {{sizeLabel}}",
    totalCosts: "Costes totales estimados",
    regulationsCount: "{{count}} Regulaciones",
    exclSynergies: "sin sinergias",
    complianceInvestment: "Inversi\u00f3n en compliance",
    avgCostsLabel: "Costes medios de implementaci\u00f3n",
    fineRisk: "Riesgo de sanci\u00f3n",
    cumulativeFines: "Sanciones m\u00e1ximas acumuladas",
    fineRiskIs: "El riesgo de sanci\u00f3n es",
    timesHigher: "veces superior a la inversi\u00f3n en compliance",
    clearBusinessCase: "Caso de negocio claro",
    synergiesTitle: "Efectos de sinergia",
    sizeLabels: {
      micro: "Microempresa",
      small: "Peque\u00f1a empresa",
      medium: "Mediana empresa",
      large: "Gran empresa",
    },
    breakdownItems: {
      "dsgvo-0": "Registro de tratamiento y an\u00e1lisis de brechas",
      "dsgvo-1": "Pol\u00edtica de privacidad y contratos",
      "dsgvo-2": "Implementaci\u00f3n de medidas t\u00e9cnicas y organizativas",
      "dsgvo-3": "Formaci\u00f3n y concienciaci\u00f3n",
      "dsgvo-4": "Delegado de protecci\u00f3n de datos (externo, anual)",
      "nis2-0": "Gesti\u00f3n de riesgos y an\u00e1lisis de brechas",
      "nis2-1": "Implementaci\u00f3n SGSI / ISO 27001",
      "nis2-2": "Procesos de respuesta a incidentes",
      "nis2-3": "Seguridad de la cadena de suministro",
      "nis2-4": "Formaci\u00f3n de direcci\u00f3n y gobernanza",
      "nis2-5": "Medidas t\u00e9cnicas (monitorizaci\u00f3n, SIEM)",
      "ai-act-0": "Inventario de IA y evaluaci\u00f3n de riesgos",
      "ai-act-1": "Documentaci\u00f3n de conformidad",
      "ai-act-2": "Pruebas de sesgo y monitorizaci\u00f3n",
      "ai-act-3": "Medidas de transparencia",
      "ai-act-4": "Formaci\u00f3n (competencias en IA)",
      "dora-0": "Marco de gesti\u00f3n de riesgos TIC",
      "dora-1": "Sistema de notificaci\u00f3n de incidentes",
      "dora-2": "Pruebas de resiliencia (TLPT)",
      "dora-3": "Gesti\u00f3n de riesgos de terceros",
      "dora-4": "Marco de intercambio de informaci\u00f3n",
      "cra-0": "Revisi\u00f3n Security-by-Design",
      "cra-1": "Gesti\u00f3n de vulnerabilidades (SBOM)",
      "cra-2": "Evaluaci\u00f3n de conformidad",
      "cra-3": "Procesos de actualizaci\u00f3n de seguridad (5 a\u00f1os)",
      "cra-4": "Documentaci\u00f3n y marcado CE",
      "csrd-0": "An\u00e1lisis de materialidad (doble materialidad)",
      "csrd-1": "Recopilaci\u00f3n de datos ESG y KPIs",
      "csrd-2": "Informe conforme a ESRS",
      "csrd-3": "Auditor\u00eda por auditor externo",
      "csrd-4": "Software y herramientas",
    },
  },

  /* ── Deadline Timeline ── */
  deadlines: {
    title: "Resumen de sus plazos",
    subtitle: "Plazos relevantes de regulaciones de la UE para su empresa",
    noDeadlines: "No se han identificado plazos relevantes.",
    today: "HOY",
    daysPassed: "hace {{days}} d\u00edas",
    todayLabel: "Hoy",
    inDays: "en {{days}} d\u00edas",
    titles: {
      "DSA-2024-02-17": "DSA plenamente en vigor",
      "MiCA-2024-12-30": "MiCA plenamente en vigor",
      "DORA-2025-01-17": "DORA en vigor",
      "CSRD-2025-01-01": "CSRD Oleada 2",
      "AI Act-2025-02-02": "AI Act Prohibiciones",
      "BaFG-2025-06-28": "Ley de accesibilidad en vigor",
      "AI Act-2025-08-02": "AI Act GPAI",
      "Data Act-2025-09-12": "Data Act en vigor",
      "DORA-2026-03-13": "DORA Registro TIC",
      "CSRD-2026-01-01": "NaBeG AT Fase 1",
      "eIDAS-2026-05-20": "eIDAS 2.0 Cartera",
      "AI Act-2026-08-02": "AI Act Alto riesgo",
      "CRA-2026-09-11": "CRA Fase 1",
      "NISG-2026-10-01": "NIS2 Transposici\u00f3n",
      "NISG-2026-12-31": "NIS2 Registro",
      "EHDS-2027-03-26": "EHDS Uso primario",
      "Green Claims-2027-03-27": "Green Claims Transposici\u00f3n",
      "CSRD-2027-01-01": "CSRD Oleada 3",
      "DPP-2027-06-01": "DPP Bater\u00edas",
      "AI Act-2027-08-02": "AI Act Anexo I",
      "PLD-2027-12-09": "PLD Transposici\u00f3n",
      "CRA-2027-12-11": "CRA Fase 2",
      "HSchG-2028-01-01": "Evaluaci\u00f3n protecci\u00f3n de denunciantes",
      "CSRD-2029-01-01": "CSRD Oleada 4",
      "DPP-2030-01-01": "DPP Textiles y electr\u00f3nica",
    },
    descs: {
      "DSA-2024-02-17": "Todos los servicios de intermediaci\u00f3n deben cumplir las obligaciones del DSA.",
      "MiCA-2024-12-30": "Todas las obligaciones para CASP y emisores de tokens se aplican.",
      "DORA-2025-01-17": "Plenamente aplicable a todas las instituciones financieras.",
      "CSRD-2025-01-01": "Las grandes empresas (>250 empleados) informan por primera vez.",
      "AI Act-2025-02-02": "Las pr\u00e1cticas de IA prohibidas entran en vigor.",
      "BaFG-2025-06-28": "Obligaci\u00f3n de accesibilidad para productos y servicios digitales.",
      "AI Act-2025-08-02": "Las obligaciones GPAI y las normas de gobernanza se aplican.",
      "Data Act-2025-09-12": "Acceso a datos IoT, cambio de nube y normas de datos B2B se aplican.",
      "DORA-2026-03-13": "Registro de informaci\u00f3n a presentar ante la FMA.",
      "CSRD-2026-01-01": "Las grandes empresas PIE informan seg\u00fan ESRS en Austria.",
      "eIDAS-2026-05-20": "Las carteras de identidad digital de la UE deben estar disponibles.",
      "AI Act-2026-08-02": "Obligaciones completas para sistemas de IA de alto riesgo.",
      "CRA-2026-09-11": "Obligaciones de notificaci\u00f3n 24h/72h a ENISA.",
      "NISG-2026-10-01": "Todas las obligaciones para las entidades afectadas.",
      "NISG-2026-12-31": "Registro ante el BSC obligatorio.",
      "EHDS-2027-03-26": "Derechos de los pacientes y acceso a datos de salud personales.",
      "Green Claims-2027-03-27": "Transposici\u00f3n nacional de la directiva anti-greenwashing.",
      "CSRD-2027-01-01": "Las PYME cotizadas informan por primera vez seg\u00fan ESRS.",
      "DPP-2027-06-01": "Pasaporte digital de producto para bater\u00edas obligatorio.",
      "AI Act-2027-08-02": "Sistemas de alto riesgo restantes (dispositivos m\u00e9dicos etc.) regulados.",
      "PLD-2027-12-09": "Transposici\u00f3n nacional de la nueva directiva de responsabilidad de productos.",
      "CRA-2027-12-11": "El marcado CE se vuelve obligatorio.",
      "HSchG-2028-01-01": "Evaluaci\u00f3n de las medidas de protecci\u00f3n de denunciantes.",
      "CSRD-2029-01-01": "Las empresas no comunitarias (>150 M EUR facturaci\u00f3n UE) informan.",
      "DPP-2030-01-01": "Pasaporte de producto para textiles y electr\u00f3nica obligatorio.",
    },
  },

  /* ── Action Roadmap ── */
  roadmap: {
    title: "Plan de acci\u00f3n",
    subtitle:
      "Plan priorizado en 3 fases para su implementaci\u00f3n de compliance",
    phase1Label: "Fase 1",
    phase1Time: "Inmediato (0\u201330 d\u00edas)",
    phase2Label: "Fase 2",
    phase2Time: "A corto plazo (1\u20133 meses)",
    phase3Label: "Fase 3",
    phase3Time: "A medio plazo (3\u20136 meses)",
    effortLabel: "Esfuerzo: ",
    effortLow: "Bajo",
    effortMedium: "Medio",
    effortHigh: "Alto",
    quickWinsTitle: "Quick Wins",
    quickWinsText:
      "Comience con un an\u00e1lisis de deficiencias de las regulaciones m\u00e1s importantes. Muchas medidas (p. ej. formaci\u00f3n, documentaci\u00f3n, an\u00e1lisis de riesgos) se aplican de forma transversal a varias regulaciones y generan sinergias con un ahorro del 20\u201340% de los costes.",
  },

  /* ── Software Recommendations ── */
  software: {
    title: "Herramientas y software recomendados",
    subtitle:
      "Soluciones seleccionadas para sus regulaciones relevantes \u2014 ordenadas por relevancia DACH",
    dachFocus: "Enfoque DACH",
    dachPresent: "Presencia DACH",
    international: "Internacional",
    disclaimerText:
      "Todas las recomendaciones son independientes y seleccionadas editorialmente. Los precios son orientativos y pueden variar seg\u00fan el tama\u00f1o de la empresa y la configuraci\u00f3n. Las comparaciones detalladas est\u00e1n disponibles en nuestra web.",
    disclaimerUrl: "eu-compliance-hub.eu/tools",
  },

  /* ── Next Steps ── */
  nextSteps: {
    title: "Pr\u00f3ximos pasos",
    subtitle: "Acciones recomendadas para su implementaci\u00f3n de compliance",
    guidesTitle: "Sus gu\u00edas relevantes",
    ctaTitle: "Le apoyamos",
    ctaText:
      "Utilice nuestras herramientas interactivas gratuitas para un an\u00e1lisis en profundidad. Suscr\u00edbase a nuestro bolet\u00edn de compliance para recibir las \u00faltimas actualizaciones normativas.",
    ctaToolsLabel: "Todas las herramientas",
    ctaNewsletterLabel: "Bolet\u00edn",
    ctaContactLabel: "Contacto",
    branding:
      "EU Compliance Hub \u2014 Su navegador por el panorama normativo de la UE",
  },

  /* ── Shared Footer ── */
  footer: {
    siteName: "EU Compliance Hub | eu-compliance-hub.eu",
    pageOf: "P\u00e1gina {{page}} de {{total}}",
    generatedAt: "Generado el {{date}} \u2014 No constituye asesoramiento jur\u00eddico",
  },

  /* ── TOC Section Names ── */
  tocSections: {
    executiveSummary: "Resumen ejecutivo",
    executiveSummaryDesc: "Su situaci\u00f3n de compliance de un vistazo",
    companyProfile: "Perfil de la empresa",
    companyProfileDesc: "Base de la evaluaci\u00f3n y contexto empresarial",
    riskExposure: "Exposici\u00f3n al riesgo",
    riskExposureDesc: "Riesgo de sanciones e impacto financiero",
    regulationAnalysis: "An\u00e1lisis regulatorio",
    regulationAnalysisDesc:
      "Evaluaci\u00f3n detallada de {{count}} regulaciones relevantes",
    maturityAssessment: "Evaluaci\u00f3n de madurez",
    maturityAssessmentDesc: "Madurez de compliance por categor\u00eda",
    costEstimation: "Estimaci\u00f3n de costes",
    costEstimationDesc: "Costes estimados de implementaci\u00f3n y ROI",
    deadlineOverview: "Resumen de plazos",
    deadlineOverviewDesc:
      "Visi\u00f3n cronol\u00f3gica de todos los plazos relevantes",
    actionPlan: "Plan de acci\u00f3n",
    actionPlanDesc: "Hoja de ruta en 3 fases para la implementaci\u00f3n de compliance",
    softwareRecs: "Recomendaciones de software",
    softwareRecsDesc: "Herramientas y soluciones para sus regulaciones",
    nextSteps: "Pr\u00f3ximos pasos",
    nextStepsDesc: "Acciones recomendadas y recursos adicionales",
  },

  /* ── Report Engine Strings ── */
  engine: {
    appointComplianceOfficer:
      "Designar un responsable de compliance y establecer un comit\u00e9 de direcci\u00f3n",
    deadlineUrgent:
      "{{title}}: Plazo en {{days}} d\u00edas \u2014 iniciar medidas inmediatas",
    gapAnalysis:
      "Realizar un an\u00e1lisis de deficiencias e inventario para {{name}}",
    coreImplementation:
      "Implementar las medidas fundamentales de compliance de {{name}}",
    trainingProgram:
      "Establecer un programa de formaci\u00f3n para empleados y directivos",
    assessAndPlan:
      "Evaluar los requisitos de {{name}} y planificar la implementaci\u00f3n priorizada",
    establishReviews:
      "Establecer revisiones peri\u00f3dicas de compliance y ciclos de auditor\u00eda",
    roleManagement: "Direcci\u00f3n",
    roleComplianceTeam: "Equipo de compliance",
    roleDeptIT: "Departamento + TI",
    roleHRCompliance: "RRHH / Compliance",
    phaseImmediate: "Inmediato (0\u201330 d\u00edas)",
    phaseShortTerm: "A corto plazo (1\u20133 meses)",
    phaseMediumTerm: "A medio plazo (3\u20136 meses)",
    governanceLabel: "Gobernanza",
    trainingLabel: "Formaci\u00f3n",
    auditLabel: "Auditor\u00eda",
    defineResponsibilities:
      "Definir responsabilidades de compliance a nivel directivo y asignar presupuesto",
    deadlinePriority:
      "{{title}} tiene la m\u00e1xima prioridad \u2014 plazo en {{days}} d\u00edas",
    immediateMeasures: "Iniciar medidas inmediatas para {{names}}",
    minimizeFineRisk:
      "Minimizar el riesgo de sanciones de hasta {{amount}} mediante un compliance proactivo",
    planBudget: "Presupuestar una inversi\u00f3n en compliance de {{range}}",
    establishRegularReviews:
      "Establecer revisiones peri\u00f3dicas de compliance y mantener la documentaci\u00f3n",
    synergyBasic:
      "La implementaci\u00f3n simult\u00e1nea de varias regulaciones puede ahorrar entre un 20\u201340% de los costes gracias a las sinergias.",
    synergyTemplate:
      "La implementaci\u00f3n simult\u00e1nea de {{examples}} puede ahorrar entre un 20\u201340% de los costes gracias a las sinergias. Medidas comunes: {{measures}}.",
    synergyISMS: "Implantaci\u00f3n de ISMS (NIS2 + DORA)",
    synergyRisk: "Marco de gesti\u00f3n de riesgos",
    synergySecurity: "Procesos de Security-by-Design",
    synergySustainability: "Gobernanza de sostenibilidad",
    synergyDefault: "Estructuras de gobernanza y formaci\u00f3n",
  },

  /* ── Regulation Names ── */
  regNames: {
    dsgvo: "RGPD",
    nis2: "NIS2",
    "ai-act": "Ley de IA de la UE",
    dora: "DORA",
    cra: "Ley de Ciberresiliencia",
    csrd: "CSRD / ESG",
    dsa: "Ley de Servicios Digitales",
    mica: "MiCA",
    "data-act": "Ley de Datos",
    eprivacy: "ePrivacy",
    eidas: "eIDAS 2.0",
    produkthaftung: "Responsabilidad por productos de la UE",
    ehds: "EHDS",
  },

  checklistItems: {
    /* NIS2 */
    "nis2-1": "Evaluaci\u00f3n de impacto completada (sector, tama\u00f1o, facturaci\u00f3n)",
    "nis2-2": "Marco de gesti\u00f3n de riesgos implementado",
    "nis2-3": "Plan de respuesta a incidentes creado (plazo de notificaci\u00f3n de 72h)",
    "nis2-4": "Gesti\u00f3n de continuidad del negocio (BCM) establecida",
    "nis2-5": "Seguridad de la cadena de suministro evaluada",
    "nis2-6": "Direcci\u00f3n formada en ciberseguridad (\u00a1responsabilidad!)",
    "nis2-7": "Medidas t\u00e9cnicas: MFA, cifrado, segmentaci\u00f3n de red",
    "nis2-8": "Obligaciones de notificaci\u00f3n y contactos con autoridades definidos",
    /* RGPD */
    "dsgvo-1": "Registro de actividades de tratamiento (Art. 30) actualizado y completo",
    "dsgvo-2": "Evaluaci\u00f3n de impacto (DPIA) para tratamientos de alto riesgo",
    "dsgvo-3": "Acuerdos de encargado del tratamiento (DPA) con todos los proveedores",
    "dsgvo-4": "Gesti\u00f3n del consentimiento (banner de cookies, opt-in) conforme a derecho",
    "dsgvo-5": "Pol\u00edtica de privacidad actualizada y completa",
    "dsgvo-6": "Proceso de derechos de los interesados implementado (acceso, supresi\u00f3n)",
    "dsgvo-7": "Medidas t\u00e9cnicas y organizativas (TOMs) documentadas",
    "dsgvo-8": "Notificaci\u00f3n de violaci\u00f3n de datos (72h) preparada",
    /* Ley de IA */
    "ai-1": "Sistemas de IA inventariados y clase de riesgo determinada",
    "ai-2": "Pr\u00e1cticas de IA prohibidas excluidas (puntuaci\u00f3n social, etc.)",
    "ai-3": "Sistemas de alto riesgo con evaluaci\u00f3n de conformidad",
    "ai-4": "Obligaciones de transparencia para chatbots/deepfakes implementadas",
    "ai-5": "Alfabetizaci\u00f3n en IA de los empleados asegurada",
    "ai-6": "Obligaciones de documentaci\u00f3n y documentaci\u00f3n t\u00e9cnica creadas",
    "ai-7": "Supervisi\u00f3n humana de las decisiones de IA garantizada",
    /* DORA */
    "dora-1": "Marco de gesti\u00f3n de riesgos TIC establecido",
    "dora-2": "Notificaci\u00f3n de incidentes TIC a la autoridad supervisora preparada",
    "dora-3": "Pruebas de penetraci\u00f3n basadas en amenazas (TLPT) planificadas",
    "dora-4": "Gesti\u00f3n de riesgos de terceros TIC implementada",
    "dora-5": "Registro de proveedores cr\u00edticos de servicios TIC mantenido",
    "dora-6": "Planes de continuidad del negocio y recuperaci\u00f3n ante desastres probados",
    /* CRA */
    "cra-1": "Productos con elementos digitales identificados",
    "cra-2": "Seguridad por dise\u00f1o integrada en el proceso de desarrollo",
    "cra-3": "Proceso de gesti\u00f3n de vulnerabilidades establecido",
    "cra-4": "Lista de materiales de software (SBOM) creada",
    "cra-5": "Actualizaciones de seguridad planificadas para el per\u00edodo de soporte",
    "cra-6": "Evaluaci\u00f3n de conformidad para la categor\u00eda de producto preparada",
    /* CSRD */
    "csrd-1": "Aplicabilidad verificada seg\u00fan tama\u00f1o de la empresa",
    "csrd-2": "An\u00e1lisis de doble materialidad completado",
    "csrd-3": "Puntos de datos ESRS identificados y recopilados",
    "csrd-4": "Procesos de recogida de datos ESG establecidos",
    "csrd-5": "Auditor para el informe de sostenibilidad seleccionado",
    "csrd-6": "Alineaci\u00f3n taxon\u00f3mica de las actividades econ\u00f3micas verificada",
  },

  /* ── Regulation Subtitles ── */
  regSubtitles: {
    dsgvo: "Reglamento General de Protecci\u00f3n de Datos",
    nis2: "Seguridad de las redes y de la informaci\u00f3n",
    "ai-act": "Regulaci\u00f3n de la inteligencia artificial",
    dora: "Resiliencia operativa digital",
    cra: "Ciberseguridad para productos",
    csrd: "Informes de sostenibilidad",
    dsa: "Regulaci\u00f3n de plataformas",
    mica: "Mercados de criptoactivos",
    "data-act": "Regulaci\u00f3n del acceso a datos",
    eprivacy: "Privacidad en las comunicaciones electr\u00f3nicas",
    eidas: "Identificaci\u00f3n electr\u00f3nica",
    produkthaftung: "Nueva Directiva de responsabilidad por productos",
    ehds: "Espacio Europeo de Datos Sanitarios",
  },

  /* ── Regulation Evaluator Reason Templates ── */
  eval: {
    essentialEntity: "entidad esencial",
    importantEntity: "entidad importante",

    dsgvoBase:
      "Como {{sizeLabel}}, usted trata {{dataTypes}} con alcance en la UE.",
    dsgvoSensitive:
      "El tratamiento de categor\u00edas especiales de datos activa obligaciones reforzadas (art. 9 RGPD), en particular evaluaciones de impacto relativas a la protecci\u00f3n de datos.",
    dsgvoStandard:
      "Esto incluye obligaciones relativas al registro de actividades de tratamiento (art. 30), los derechos de los interesados (arts. 15\u201322) y evaluaciones de impacto para tratamientos de alto riesgo.",

    nis2CriticalInfra:
      "Como operador de infraestructura cr\u00edtica, usted se clasifica como \u00abentidad esencial\u00bb conforme al art. 3 de NIS2, sujeta a las obligaciones m\u00e1s estrictas.",
    nis2SectorSize:
      "Como {{sizeLabel}} en el sector {{sectors}}, usted se clasifica como \u00ab{{category}}\u00bb conforme al art. 3 de NIS2.",
    nis2Suffix:
      "Esto incluye gesti\u00f3n de riesgos (art. 21), notificaci\u00f3n de incidentes en 24h/72h (art. 23) y responsabilidad personal de la direcci\u00f3n (art. 20).",
    nis2BelowThreshold:
      "Su sector {{sectors}} est\u00e1 cubierto por NIS2, pero como {{sizeLabel}} se encuentra por debajo de los umbrales (50 empleados / 10\u00a0M\u00a0EUR de facturaci\u00f3n). Supervise las leyes nacionales de transposici\u00f3n: algunos Estados miembros pueden establecer umbrales m\u00e1s bajos.",

    aiActBase:
      "Como {{sizeLabel}}, usted utiliza o desarrolla sistemas de IA. La Ley de IA de la UE exige la clasificaci\u00f3n de riesgo de todos los sistemas de IA y califica ciertas aplicaciones como de alto riesgo.",
    aiActSensitive:
      "El tratamiento de datos sensibles probablemente active obligaciones reforzadas de transparencia y documentaci\u00f3n.",
    aiActBanned:
      "Las pr\u00e1cticas de IA prohibidas (art. 5) est\u00e1n en vigor desde febrero de 2025.",

    doraDirect:
      "Como {{sizeLabel}} en el sector financiero, usted est\u00e1 directamente sujeto a DORA. Debe establecer un marco de gesti\u00f3n de riesgos TIC (arts. 6\u201316), notificar incidentes a las autoridades supervisoras (arts. 17\u201323) y realizar pruebas de penetraci\u00f3n basadas en amenazas.",
    doraProvider:
      "Como proveedor de servicios TI con acceso a datos financieros, usted puede calificarse como \u00abproveedor tercero cr\u00edtico de TIC\u00bb conforme al art. 31 de DORA. Esto conlleva la supervisi\u00f3n directa por las autoridades financieras europeas y requisitos contractuales estrictos.",

    craBase:
      "Como fabricante de productos con elementos digitales, usted est\u00e1 sujeto a la Ley de Ciberresiliencia. Debe implementar seguridad por dise\u00f1o (art. 10), mantener un SBOM (lista de materiales de software) y proporcionar actualizaciones de seguridad durante todo el per\u00edodo de soporte.",
    craManufacturing:
      "Como empresa manufacturera, se aplican requisitos adicionales para los sistemas de producci\u00f3n conectados.",

    csrdDirect:
      "Como {{sizeLabel}} en la UE, usted est\u00e1 obligado a informar sobre sostenibilidad conforme a la CSRD utilizando las normas ESRS. Esto incluye un an\u00e1lisis de doble materialidad, emisiones de alcance 1/2/3 y verificaci\u00f3n externa por auditores.",
    csrdIndirect:
      "A trav\u00e9s de sus actividades ESG/sostenibilidad como {{sizeLabel}}, la presentaci\u00f3n de informes CSRD puede resultar relevante a trav\u00e9s de la cadena de suministro o de forma voluntaria. A partir de 2026, las pymes cotizadas tambi\u00e9n estar\u00e1n afectadas.",

    dsaReason:
      "Como operador de una plataforma en l\u00ednea o mercado digital, usted est\u00e1 sujeto a la DSA. Las obligaciones incluyen informes de transparencia (art. 15), un sistema de notificaci\u00f3n y acci\u00f3n para contenido ilegal (art. 16), procedimientos de reclamaci\u00f3n (art. 20) y la prohibici\u00f3n de patrones oscuros (art. 25).",

    micaReason:
      "Como {{sizeLabel}} en el sector de criptoactivos/blockchain, debe solicitar autorizaci\u00f3n como CASP (proveedor de servicios de criptoactivos) conforme a MiCA, cumplir los requisitos AML/KYC e implementar la Travel Rule. Los libros blancos para emisiones de tokens requieren aprobaci\u00f3n.",

    dataActIoT:
      "Usted trata datos IoT/sensores y debe conceder a los usuarios acceso a los datos generados conforme a la Ley de Datos (arts. 3\u20137). Esto incluye formatos de datos estandarizados, condiciones contractuales justas y el derecho a compartir datos con terceros.",
    dataActManufacturer:
      "Como fabricante de productos en el sector {{sectors}}, pueden aplicarse obligaciones de acceso a datos conforme a la Ley de Datos, especialmente si sus productos generan datos de uso.",

    eprivacyDirect:
      "Como empresa de comercio electr\u00f3nico, las obligaciones de ePrivacy relativas a cookies, seguimiento y marketing directo electr\u00f3nico le son aplicables. Es obligatorio disponer de un sistema de gesti\u00f3n de consentimiento conforme a la ley (banner de cookies con opt-in).",
    eprivacyIndirect:
      "Las normas de ePrivacy sobre cookies y seguimiento tambi\u00e9n se aplican a su sitio web. Se requiere un banner de cookies conforme al RGPD con un verdadero opt-in.",

    eidasDirect:
      "Como proveedor de identificaci\u00f3n electr\u00f3nica o servicios de confianza, debe cumplir los requisitos de eIDAS 2.0, incluida la compatibilidad con la Cartera de Identidad Digital de la UE y las firmas electr\u00f3nicas cualificadas.",
    eidasPublic:
      "En el sector p\u00fablico, la Cartera de Identidad Digital de la UE ser\u00e1 obligatoria a partir de 2026. Prepare sus sistemas para la identificaci\u00f3n conforme a eIDAS 2.0.",

    produkthaftungReason:
      "La Directiva revisada de responsabilidad por productos de la UE ahora se extiende al software y los sistemas de IA como productos aut\u00f3nomos. Como {{sizeLabel}} en el sector {{sectors}}, usted asume responsabilidad objetiva por productos defectuosos: la inversi\u00f3n de la carga de la prueba refuerza la protecci\u00f3n del consumidor.",

    ehdsReason:
      "Como {{sizeLabel}} en el sector sanitario, el Espacio Europeo de Datos Sanitarios (EHDS) resulta relevante. El uso primario (portabilidad del paciente) y el uso secundario (acceso para investigaci\u00f3n) requieren sistemas interoperables y formatos de datos compatibles con FHIR.",
  },
};

export default es;
