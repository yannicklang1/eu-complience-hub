/* ─────────────────── French UI Messages ─────────────────── */

import type { Messages } from "./de";

const fr: Messages = {
  /* ── Meta ── */
  meta: {
    siteName: "EU Compliance Hub",
    siteDescription: "R\u00e9glementations europ\u00e9ennes. Clairement expliqu\u00e9es.",
    tagline: "Nous traduisons la l\u00e9gislation de Bruxelles en mesures concr\u00e8tes \u2014 pour les PME, les startups et les grandes entreprises.",
  },

  /* ── Navigation ── */
  nav: {
    regulations: "R\u00e9glementations",
    tools: "Outils",
    industries: "Secteurs",
    knowledge: "Savoir",
    news: "Actualit\u00e9s",
    briefing: "Briefing Conformit\u00e9",
    report: "Rapport de conformit\u00e9",
    reportCreate: "Cr\u00e9er un rapport de conformit\u00e9",
    allTools: "Tous les outils",
    contact: "Contact",
    faq: "FAQ",
    aboutUs: "\u00c0 propos",
    mobile: {
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
    },
    groups: {
      coreRegulations: "R\u00e9glementations principales",
      dataProtection: "Protection des donn\u00e9es & Conformit\u00e9",
      moreRegulations: "Autres r\u00e9glementations",
      digitalData: "Num\u00e9rique & Donn\u00e9es",
      interactiveTools: "Outils interactifs",
      directoriesRadar: "R\u00e9pertoires & Radar",
    },
  },

  /* ── Guide Page Layout ── */
  guide: {
    lastReview: "Derni\u00e8re v\u00e9rification :",
    officialSources: "sources officielles",
    factChecked: "V\u00e9rifi\u00e9",
    quickFacts: "Faits essentiels",
    disclaimer: "Ne constitue pas un conseil juridique. Toutes les informations sans garantie.",
    more: "Plus",
    toc: "Sommaire",
  },

  /* ── Guide CTA ── */
  cta: {
    getBriefing: "Recevoir le briefing conformit\u00e9",
    frequency: "Uniquement pour les \u00e9ch\u00e9ances critiques et les \u00e9volutions r\u00e9glementaires. Max. 3\u00d7/mois.",
    gdprNotice: "Conforme au RGPD. R\u00e9siliable \u00e0 tout moment. Pas de spam.",
    tools: "Outils de conformit\u00e9",
    toolsDesc: "8 outils gratuits",
    comparison: "Comparaison des r\u00e9glementations",
    comparisonDesc: "Comparer c\u00f4te \u00e0 c\u00f4te",
    faq: "Questions fr\u00e9quentes",
    faqDesc: "20+ r\u00e9ponses",
    report: "Rapport de conformit\u00e9",
    reportDesc: "Analyse gratuite pour votre entreprise",
  },

  /* ── Forms ── */
  form: {
    emailPlaceholder: "votre@entreprise.com",
    emailAriaLabel: "Adresse e-mail pour le briefing conformit\u00e9",
    subscribe: "S\u2019inscrire",
    submitBriefing: "Activer le briefing",
    sending: "Envoi en cours\u2026",
    invalidEmail: "Veuillez saisir une adresse e-mail valide.",
    confirmEmail: "Presque termin\u00e9 ! Veuillez confirmer votre adresse e-mail.",
    success: "Presque termin\u00e9 !",
    error: "Une erreur est survenue.",
    connectionError: "Erreur de connexion. Veuillez r\u00e9essayer plus tard.",
    disclaimer: "Uniquement pour les \u00e9ch\u00e9ances critiques et les \u00e9volutions r\u00e9glementaires. Max. 3\u00d7/mois. R\u00e9siliable \u00e0 tout moment. Conforme au RGPD. *Vous recevrez \u00e9galement occasionnellement des recommandations pour des outils de conformit\u00e9 v\u00e9rifi\u00e9s (signal\u00e9s comme publicit\u00e9).",
  },

  /* ── Social Share ── */
  share: {
    label: "Partager le guide",
    sublabel: "Partagez ce guide avec vos coll\u00e8gues et d\u00e9cideurs",
    copyLink: "Copier le lien",
    copied: "Copi\u00e9 !",
    linkedin: "LinkedIn",
    twitter: "X / Twitter",
    email: "E-mail",
    emailBody: "D\u00e9couvrez ce guide de conformit\u00e9 :",
  },

  /* ── Breadcrumbs ── */
  breadcrumb: {
    home: "Accueil",
    ariaLabel: "Fil d\u2019Ariane",
  },

  /* ── Cookie Consent ── */
  cookies: {
    title: "Param\u00e8tres de confidentialit\u00e9",
    description: "Nous utilisons des cookies et des technologies similaires pour vous offrir la meilleure exp\u00e9rience possible. Pour plus d\u2019informations, consultez notre",
    privacyLink: "Politique de confidentialit\u00e9",
    necessary: "N\u00e9cessaires",
    necessaryDesc: "Fonctionnement du site. Ne peut pas \u00eatre d\u00e9sactiv\u00e9.",
    analytics: "Analytiques",
    analyticsDesc: "Statistiques d\u2019utilisation anonymes pour am\u00e9liorer le site.",
    analyticsAriaLabel: "Cookies analytiques",
    marketing: "Marketing",
    marketingDesc: "Publicit\u00e9 et annonces personnalis\u00e9es.",
    marketingAriaLabel: "Cookies marketing",
    save: "Enregistrer la s\u00e9lection",
    necessaryOnly: "N\u00e9cessaires uniquement",
    settings: "Param\u00e8tres",
    acceptAll: "Tout accepter",
  },

  /* ── Footer ── */
  footer: {
    description: "R\u00e9glementations europ\u00e9ennes. Clairement expliqu\u00e9es. Nous traduisons la l\u00e9gislation de Bruxelles en mesures concr\u00e8tes \u2014 pour les PME, les startups et les grandes entreprises.",
    regulations: "R\u00e9glementations",
    tools: "Outils",
    aboutUs: "\u00c0 propos",
    news: "Actualit\u00e9s",
    faq: "FAQ",
    report: "Rapport de conformit\u00e9",
    impressum: "Mentions l\u00e9gales",
    privacy: "Confidentialit\u00e9",
    disclaimerLink: "Avertissement",
    cookieSettings: "Param\u00e8tres des cookies",
    legalDisclaimer: "EU Compliance Hub est un portail d\u2019information ind\u00e9pendant et n\u2019est affili\u00e9 \u00e0 aucune institution de l\u2019Union europ\u00e9enne ni du Conseil de l\u2019Europe. Tous les contenus sont fournis \u00e0 titre d\u2019information g\u00e9n\u00e9rale et ne constituent pas un conseil juridique. \u00ab UE \u00bb est utilis\u00e9 de mani\u00e8re descriptive pour d\u00e9signer le domaine des r\u00e9glementations europ\u00e9ennes.",
    copyright: "EU Compliance Hub. Ne constitue pas un conseil juridique. Toutes les informations sans garantie.",
  },

  /* ── Accessibility ── */
  a11y: {
    mainNav: "Navigation principale",
    contentInfo: "Pied de page",
    backToTop: "Retour en haut",
    skipToContent: "Aller au contenu principal",
  },

  /* ── Search / Command Palette ── */
  search: {
    placeholder: "Rechercher\u2026",
    hint: "Cmd+K pour rechercher",
    noResults: "Aucun r\u00e9sultat",
    categories: {
      regulations: "R\u00e9glementations",
      tools: "Outils",
      knowledge: "Savoir",
      legal: "Juridique",
    },
  },

  /* ── Country Picker ── */
  country: {
    title: "S\u00e9lectionnez votre pays",
    subtitle: "Nous vous montrerons des informations de conformit\u00e9 sp\u00e9cifiques \u00e0 votre pays",
    confirm: "Confirmer",
    change: "Changer de pays",
    detected: "D\u00e9tect\u00e9 :",
  },

  /* ── Common ── */
  common: {
    readMore: "Lire la suite",
    learnMore: "En savoir plus",
    download: "T\u00e9l\u00e9charger",
    close: "Fermer",
    back: "Retour",
    next: "Suivant",
    yes: "Oui",
    no: "Non",
    loading: "Chargement\u2026",
    error: "Erreur",
    retry: "R\u00e9essayer",
  },

  /* ── Homepage ── */
  home: {
    /* Hero */
    hero: {
      title1: "Européenne",
      title2: "Compliance.",
      title3: "Enfin claire.",
      subtitle: "18 réglementations — de NIS2 à l'AI Act en passant par eIDAS — qui affectent directement votre entreprise. Nous traduisons le Journal officiel de l'UE en checklists concrètes, échéances claires et solutions réelles.",
      ctaPrimary: "Voir toutes les réglementations",
      ctaSecondary: "Vérifier la responsabilité",
      scroll: "Défiler",
    },
    /* Countdown */
    countdown: {
      inForce: "En vigueur",
      daysUntil: "jours avant",
    },
    /* Ticker */
    ticker: [
      "NISG 2026 en vigueur à partir du 1er octobre 2026",
      "EU AI Act : Obligations complètes à partir du 2 août 2026",
      "DORA : En vigueur depuis le 17 janvier 2025",
      "CRA Phase 1 : Obligations de déclaration à partir de septembre 2026",
      "CSRD/ESG : Rapports de durabilité à partir de 2026 en AT",
      "EAA : Obligations d'accessibilité depuis le 28 juin 2025",
      "Protection des lanceurs d'alerte : À partir de 50 employés",
      "Green Claims : « Neutre en carbone » sans preuve bientôt illégal",
      "MiCA : Licences crypto obligatoires depuis décembre 2024",
      "DPP : Passeport numérique des produits à partir de 2027 pour les batteries",
      "PLD : Logiciel responsable en tant que produit à partir de décembre 2027",
      "DSA : Réglementation des plateformes pour tous les services intermédiaires",
      "Data Act : Accès aux données IoT & migration cloud à partir de septembre 2025",
      "eIDAS 2.0 : Portefeuille d'identité numérique UE à partir de mai 2026",
      "EHDS : Espace européen des données de santé à partir de 2027",
      "ePrivacy : Consentement aux cookies et règles de suivi",
      "~4 000 entreprises AT concernées par NIS2",
      "Amendes NIS2 : jusqu'à 10 M€ ou 2 % du chiffre d'affaires",
      "Amendes AI Act : jusqu'à 35 M€ ou 7 % du chiffre d'affaires",
    ],
    /* Stats */
    stats: {
      regulations: "Réglementations",
      maxFine: "amende max. AI Act",
      countries: "Pays",
      countryLabel: "Concernés dans l'UE",
      complianceYear: "l'année de la conformité",
      inOverview: "en un coup d'œil",
    },
    /* Regulation Pillars */
    pillars: {
      sectionLabel: "Piliers principaux",
      title1: "Ce qui",
      title2: "vous concerne.",
      subtitle: "Quatre réglementations. Des échéances claires. De vraies amendes. Tout ce que vous devez savoir maintenant.",
      filterAll: "Tout afficher",
      filterLive: "Déjà actif",
      filterUpcoming: "Bientôt actif",
      maxPenalty: "Amende max.",
      affects: "Concerne",
    },
    /* Pillar data — translatable fields */
    pillarData: {
      nisg: {
        fullName: "Loi sur la sécurité des réseaux et de l'information 2026",
        tagline: "Transposition NIS2 de l'Autriche",
        statusLabel: "À partir du 1er oct. 2026",
        affected: "~4 000 entreprises AT",
        keyFacts: ["Enregistrement avant le 31 déc. 2026", "Auto-déclaration avant le 31 déc. 2027", "Office fédéral de cybersécurité", "BGBl. I No. 94/2025"],
      },
      aiact: {
        fullName: "EU Artificial Intelligence Act",
        tagline: "Réglementation IA pour l'Europe",
        statusLabel: "À partir du 2 août 2026",
        affected: "Tous les développeurs et utilisateurs d'IA",
        keyFacts: ["IA à haut risque : emploi, crédit", "Systèmes d'IA interdits : immédiat", "EU AI Office comme superviseur", "Digital Omnibus : report possible"],
      },
      dora: {
        fullName: "Digital Operational Resilience Act",
        tagline: "Résilience du secteur financier",
        statusLabel: "Depuis le 17 jan. 2025",
        affected: "Institutions financières & fournisseurs TIC",
        keyFacts: ["Registre TIC : 13 mars 2026", "Cycles de tests TLPT en cours", "FMA comme superviseur (AT)", "S'applique à 20+ entités financières"],
      },
      cra: {
        fullName: "Cyber Resilience Act",
        tagline: "Sécurité des produits numériques",
        statusLabel: "Phase 1 : sept. 2026",
        affected: "Fabricants de produits numériques",
        keyFacts: ["Phase 1 : Déclarations sept. 2026", "Phase 2 : Marquage CE déc. 2027", "Signalement de vulnérabilité sous 24h", "Obligation Security-by-Design"],
      },
    },
    /* Secondary regulations */
    secondary: {
      sectionLabel: "Autres réglementations UE",
      title1: "Protection des données, ESG, plateformes, données &",
      title2: "plus encore.",
      subtitle: "De la protection des données à la durabilité en passant par l'identité numérique — treize autres réglementations UE qui affectent votre entreprise.",
      readGuide: "Lire le guide",
      regulations: {
        dsgvo: { tagline: "Protection des données à l'ère de l'IA", badge: "Mise à jour 2026" },
        csrd: { tagline: "Rapports de durabilité", badge: "NaBeG à partir de 2026" },
        bafg: { tagline: "Accessibilité numérique", badge: "En vigueur" },
        hschg: { tagline: "Protection des lanceurs d'alerte", badge: "En vigueur" },
        greenClaims: { tagline: "Anti-greenwashing", badge: "À partir de 2027" },
        mica: { tagline: "Réglementation crypto-actifs", badge: "En vigueur" },
        dpp: { tagline: "Passeport numérique des produits", badge: "À partir de 2027" },
        pld: { tagline: "Responsabilité produit logiciel", badge: "À partir de 2027" },
        dsa: { tagline: "Réglementation des plateformes", badge: "En vigueur" },
        dataAct: { tagline: "IoT & données cloud", badge: "À partir de sept. 2025" },
        eprivacy: { tagline: "Cookies & suivi", badge: "En vigueur" },
        eidas: { tagline: "Identité numérique UE", badge: "À partir de 2026" },
        ehds: { tagline: "Données de santé", badge: "À partir de 2027" },
      },
    },
    /* Timeline preview */
    timeline: {
      sectionLabel: "Calendrier 2025 – 2027",
      title1: "Compliance",
      title2: "Timeline.",
      subtitle: "Toutes les échéances importantes en un coup d'œil. Anticipez.",
      days: "jours",
      ctaTimeline: "Voir la timeline complète",
      alreadyInForce: "déjà en vigueur",
    },
    /* Trust signals */
    trust: {
      regulationsExplained: "Réglementations UE expliquées",
      freeTools: "Outils gratuits",
      glossaryEntries: "Entrées du glossaire",
      independentAdFree: "Indépendant & sans publicité",
    },
    /* Quick Start */
    quickStart: {
      sectionLabel: "3 étapes vers la conformité",
      title: "Comment commencer",
      subtitle: "De l'analyse initiale au plan de mise en œuvre — notre workflow vous guide systématiquement à travers le processus de conformité.",
      steps: [
        {
          title: "Identifier les réglementations",
          desc: "Utilisez le Regulation Finder pour découvrir en 3 minutes quelles lois européennes s'appliquent à votre entreprise.",
          cta: "Démarrer le quiz",
        },
        {
          title: "Vérifier le statut",
          desc: "Utilisez la Compliance Checklist pour vérifier quelles exigences vous remplissez déjà — et où se trouvent les lacunes.",
          cta: "Ouvrir la checklist",
        },
        {
          title: "Planifier budget & maturité",
          desc: "Calculez les coûts de mise en œuvre et mesurez votre niveau actuel de maturité en conformité.",
          cta: "Calculer les coûts",
        },
      ],
    },
    /* Tools section */
    tools: {
      sectionLabel: "Guides & Ressources",
      title1: "Passez à",
      title2: "l'action.",
      subtitle: "Comprenez la responsabilité personnelle, trouvez des financements et découvrez les bons experts.",
      items: [
        { title: "Regulation Finder", desc: "Découvrez en 3 minutes quelles réglementations UE sont pertinentes pour votre entreprise — personnalisé par secteur, taille et activité.", cta: "Démarrer le quiz", badge: "Nouveau" },
        { title: "Compliance Checklist", desc: "Vérifiez point par point quelles exigences de conformité UE votre entreprise remplit déjà.", cta: "Démarrer la checklist", badge: "Nouveau" },
        { title: "Guide Responsabilité", desc: "Responsabilité des dirigeants sous NIS2, DORA, AI Act & CRA — risques personnels et stratégies de protection.", cta: "Lire le guide", badge: "Nouveau" },
        { title: "Radar des échéances", desc: "Toutes les échéances de conformité UE en un coup d'œil — personnalisé selon vos réglementations pertinentes.", cta: "Vérifier les échéances", badge: "Interactif" },
        { title: "Calculateur de coûts", desc: "Estimez les coûts de conformité UE — adapté à la taille de l'entreprise, au niveau de maturité et aux réglementations.", cta: "Calculer les coûts", badge: "Nouveau" },
        { title: "Glossaire Conformité", desc: "Plus de 45 termes de conformité expliqués clairement — de AI Act à Zero Trust.", cta: "Ouvrir le glossaire", badge: "Nouveau" },
      ],
    },
    /* Why Us */
    whyUs: {
      sectionLabel: "Pourquoi EU Compliance Hub",
      title1: "Pas de jargon.",
      title2: "Un langage clair.",
      subtitle: "Les règlements européens se lisent comme du Kafka juridique. Nous les lisons pour vous — et en distillons l'essentiel en étapes d'action claires.",
      benefits: [
        { title: "Pas d'abonnement requis", desc: "Toutes les informations de base gratuitement disponibles" },
        { title: "Toujours à jour", desc: "Mises à jour en temps réel sur les évolutions réglementaires" },
        { title: "Pour toute taille d'entreprise", desc: "Des auto-entrepreneurs aux grandes entreprises" },
        { title: "Toute l'UE", desc: "Les 27 États membres couverts" },
      ],
      freeBadge: "100 % gratuit",
      cardRegulations: "Réglementations",
      cardActive: "Actif",
      regList: [
        { name: "NISG 2026", label: "Oct 2026" },
        { name: "EU AI Act", label: "Août 2026" },
        { name: "DORA", label: "Actif" },
        { name: "CRA", label: "Sep 2026" },
        { name: "RGPD & IA", label: "Actif" },
        { name: "CSRD / ESG", label: "2026" },
        { name: "EAA", label: "Actif" },
        { name: "HSchG", label: "Actif" },
        { name: "Green Claims", label: "2027" },
        { name: "MiCA", label: "Actif" },
        { name: "DPP / ESPR", label: "2027" },
        { name: "PLD", label: "2027" },
        { name: "DSA", label: "Actif" },
        { name: "Data Act", label: "Sep 2025" },
        { name: "ePrivacy", label: "Actif" },
        { name: "eIDAS 2.0", label: "2026" },
        { name: "EHDS", label: "2027" },
        { name: "Responsabilité des dirigeants", label: "Actif" },
      ],
    },
    /* News preview */
    news: {
      title: "Actualités conformité",
      subtitle: "Nouvelles lois, échéances à venir et développements importants",
      ctaNews: "Voir toutes les actualités",
      ctaCompare: "Comparaison des réglementations",
      items: [
        { date: "25 juin 2025", label: "NIS2", title: "NISG 2026 publié", desc: "En vigueur le 1er octobre 2026, enregistrement avant fin 2026" },
        { date: "28 juin 2025", label: "EAA", title: "Loi sur l'accessibilité en vigueur", desc: "Les produits et services numériques doivent être accessibles" },
        { date: "1er jan. 2026", label: "CSRD", title: "CSRD : Deuxième vague pour les grandes entreprises", desc: "Obligation de rapport à partir de 250 employés / 50 M€ de CA" },
      ],
    },
    /* Report CTA */
    report: {
      badge: "Notre outil le plus important",
      title1: "Votre",
      title2: "Rapport de conformité.",
      subtitle: "En 5 minutes, vous recevrez une analyse complète — quelles réglementations s'appliquent à votre entreprise, quels coûts de mise en œuvre et comment améliorer votre niveau de maturité.",
      benefit1Title: "14 réglementations vérifiées",
      benefit1Desc: "Adapté au secteur, à la taille & à l'activité",
      benefit2Title: "Estimation des coûts incluse",
      benefit2Desc: "Ventilée par réglementation & taille d'entreprise",
      benefit3Title: "Rapport PDF par e-mail",
      benefit3Desc: "Formaté professionnellement avec recommandations logicielles",
      ctaCreate: "Créer un rapport de conformité",
      ctaSubtitle: "Gratuit. Sans engagement. En 5 minutes.",
      previewTitle: "Rapport de conformité",
      previewCompany: "Exemple SARL — Fév. 2026",
      previewMaturity: "Maturité",
      previewMaturityLabel: "Maturité de conformité",
      previewRegulations: "Réglementations applicables",
      previewMore: "+3 autres",
      previewCost: "Coûts estimés",
      previewCostRange: "45 000 € – 120 000 €",
      previewCostLabel: "Coûts totaux pour toutes les réglementations applicables",
      pdfDownload: "Téléchargement PDF",
    },
    /* Newsletter CTA */
    newsletter: {
      title: "Activer le briefing conformité",
      subtitle: "Votre système d'alerte réglementaire — uniquement pour les échéances critiques et les évolutions législatives. Maximum 3× par mois.",
    },
    /* Aria labels for sections */
    aria: {
      hero: "Hero – EU Compliance Hub",
      stats: "Statistiques",
      regulations: "Aperçu des réglementations",
      moreRegulations: "Autres réglementations européennes",
      timeline: "Aperçu de la timeline",
      trust: "La plateforme en chiffres",
      quickStart: "Démarrage rapide",
      tools: "Outils de conformité",
      whyUs: "Pourquoi EU Compliance Hub",
      news: "Actualités et comparaison réglementaire",
      report: "Créer un rapport de conformité",
      newsletter: "Newsletter Compliance Briefing",
    },
  },
} as const;

export default fr;
