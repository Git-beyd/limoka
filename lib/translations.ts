export type Lang = "fr" | "en";

export const translations = {
  nav: {
    platform: { fr: "Notre Vision", en: "Our Vision" },
    features: { fr: "Fonctionnement", en: "How it works" },
    network: { fr: "Pour qui ?", en: "For Whom?" },
    metrics: { fr: "Impact RDC", en: "DRC Impact" },
    cta: { fr: "Intégrer", en: "Integrate" },
    theme: { fr: "Thème", en: "Theme" },
  },

  hero: {
    label: {
      fr: "Plateforme Nationale de Paiement",
      en: "National Payment Platform",
    },
    words: {
      fr: ["Interopérable.", "Instantané.", "Inclusif."],
      en: ["Interoperable.", "Instant.", "Inclusive."],
    },
    sub: {
      fr: "Une infrastructure publique souveraine pour connecter tous les acteurs de la finance numérique en RDC : banques, fintechs, opérateurs mobiles, services publics.",
      en: "A sovereign public infrastructure to connect all digital finance players in the DRC: banks, fintechs, mobile operators, public services.",
    },
    cta1: { fr: "Intégrer LIMOKA", en: "Integrate LIMOKA" },
    cta2: { fr: "Notre Vision", en: "Our Vision" },
    scroll: { fr: "Découvrir", en: "Discover" },
    badge: { fr: "Initiative RDC", en: "DRC Initiative" },
  },

  platform: {
    label: { fr: "Notre Vision", en: "Our Vision" },
    headline: {
      fr: ["Bâtir un écosystème", "moderne et équitable."],
      en: ["Building a modern,", "fair ecosystem."],
    },
    sub: {
      fr: "LIMOKA a pour mission de garantir une interopérabilité nationale, favoriser l'innovation locale et renforcer la confiance dans les échanges financiers en RDC.",
      en: "LIMOKA's mission is to ensure national interoperability, foster local innovation, and build trust in financial exchanges across the DRC.",
    },
    features: {
      fr: [
        "Interopérabilité nationale garantie",
        "Paiements rapides, traçables et sécurisés",
        "Innovation numérique locale favorisée",
        "Confiance et transparence renforcées",
      ],
      en: [
        "Guaranteed national interoperability",
        "Fast, traceable, and secure payments",
        "Fostered local digital innovation",
        "Enhanced trust and transparency",
      ],
    },
    liveLabel: { fr: "Transactions en direct", en: "Live Transactions" },
    volumeLabel: { fr: "Volume total", en: "Total Volume" },
    txLabel: { fr: "Transactions", en: "Transactions" },
    successLabel: { fr: "Taux de succès", en: "Success Rate" },
    chartLabel: {
      fr: "Volume de transactions — Direct",
      en: "Transaction Volume — Live",
    },
  },

  features: {
    label: { fr: "Fonctionnement", en: "How it works" },
    headline: {
      fr: ["Une infrastructure", "ouverte et modulaire."],
      en: ["Open and modular", "infrastructure."],
    },
    items: [
      {
        label: { fr: "01 — Routage Intelligent", en: "01 — Smart Routing" },
        headline: { fr: "Switch\nNational", en: "National\nSwitch" },
        description: {
          fr: "Agit comme un switch national de paiement assurant une communication fluide entre tous les fournisseurs de services financiers.",
          en: "Acts as a national payment switch ensuring seamless communication between all financial service providers.",
        },
        stat: { fr: "24/7", en: "24/7" },
        statLabel: { fr: "Disponibilité", en: "Availability" },
      },
      {
        label: { fr: "02 — Sécurité Avancée", en: "02 — Advanced Security" },
        headline: { fr: "Anti-fraude\nIntégrée", en: "Built-in\nAnti-fraud" },
        description: {
          fr: "Protection maximale avec chiffrement de bout en bout, vérification des règles de conformité et détection des fraudes en temps réel.",
          en: "Maximum protection with end-to-end encryption, compliance rule verification, and real-time fraud detection.",
        },
        stat: { fr: "ISO", en: "ISO" },
        statLabel: { fr: "Normes", en: "Standards" },
      },
      {
        label: { fr: "03 — Transparence", en: "03 — Transparency" },
        headline: { fr: "Devis &\nSolde", en: "Quotes &\nBalance" },
        description: {
          fr: "Vérification instantanée des soldes et devis transparents des frais avant l'exécution de toute transaction.",
          en: "Instant balance verification and transparent fee quotes before any transaction is executed.",
        },
        stat: { fr: "0", en: "0" },
        statLabel: { fr: "Frais cachés", en: "Hidden fees" },
      },
      {
        label: { fr: "04 — Identification", en: "04 — Identification" },
        headline: { fr: "Recherche\nFacile", en: "Easy\nLookup" },
        description: {
          fr: "Retrouvez facilement les destinataires via leurs alias ou MSISDN grâce à des référentiels partagés centralisés.",
          en: "Easily find recipients via their aliases or MSISDNs through centralized shared directories.",
        },
        stat: { fr: "100%", en: "100%" },
        statLabel: { fr: "Précision", en: "Accuracy" },
      },
    ],
  },

  spatial: {
    label: { fr: "Supervision", en: "Monitoring" },
    headline: {
      fr: ["Supervision", "en temps", "réel."],
      en: ["Real-time", "supervision", "and control."],
    },
    sub: {
      fr: "Un point de connexion unique à tout l'écosystème avec une supervision en temps réel de vos flux et cas d'usage (P2P, P2M, G2P).",
      en: "A single connection point to the entire ecosystem with real-time monitoring of your flows and use cases (P2P, P2M, G2P).",
    },
    tx: {
      label: { fr: "Flux en direct", en: "Live Flows" },
      live: { fr: "Direct", en: "Live" },
    },
    network: {
      label: { fr: "Réseau national", en: "National Network" },
    },
    analytics: {
      label: { fr: "Statistiques", en: "Analytics" },
    },
  },

  metrics: {
    label: { fr: "Impact RDC", en: "DRC Impact" },
    headline: {
      fr: ["Un impact concret", "pour la nation."],
      en: ["Concrete impact", "for the nation."],
    },
    items: [
      {
        label: { fr: "Inclusion Financière", en: "Financial Inclusion" },
        sub: { fr: "Accélérée pour tous", en: "Accelerated for all" },
      },
      {
        label: { fr: "Paiements Publics", en: "Public Payments" },
        sub: { fr: "Modernisés (G2P/B2G)", en: "Modernized (G2P/B2G)" },
      },
      {
        label: { fr: "Traçabilité", en: "Traceability" },
        sub: {
          fr: "Moins de cash en circulation",
          en: "Less reliance on cash",
        },
      },
      {
        label: { fr: "Innovation", en: "Innovation" },
        sub: {
          fr: "Plus d'initiatives fintech",
          en: "More fintech initiatives",
        },
      },
    ],
    chart: {
      label: { fr: "Digitalisation", en: "Digitalization" },
      sub: { fr: "Évolution des paiements", en: "Payments evolution" },
      legend: {
        fr: ["Adoption", "Inclusion", "Sécurité"],
        en: ["Adoption", "Inclusion", "Security"],
      },
    },
  },

  network: {
    label: { fr: "Pour qui ?", en: "For Whom?" },
    headline: {
      fr: ["Un écosystème inclusif.", "Pour tous les acteurs."],
      en: ["An inclusive ecosystem.", "For all players."],
    },
    sub: {
      fr: "LIMOKA s'adresse aux Banques, Institutions de Microfinance, Fintechs, Opérateurs Mobile Money et Services Publics pour digitaliser les paiements.",
      en: "LIMOKA is designed for Banks, Microfinance Institutions, Fintechs, Mobile Money Operators, and Public Services to digitize payments.",
    },
    stats: {
      fr: [
        { value: "Banques", label: "Harmoniser" },
        { value: "Fintechs", label: "Innover" },
        { value: "Opérateurs", label: "Interopérer" },
      ],
      en: [
        { value: "Banks", label: "Harmonize" },
        { value: "Fintechs", label: "Innovate" },
        { value: "Operators", label: "Interoperate" },
      ],
    },
  },

  testimonials: {
    label: { fr: "Cas d'usage", en: "Use Cases" },
    headline: {
      fr: ["Des cas concrets,", "au service du quotidien."],
      en: ["Concrete cases,", "serving daily life."],
    },
    items: [
      {
        quote: {
          fr: "Transferts entre particuliers (P2P) : Envoyez de l'argent de n'importe quel portefeuille mobile vers un compte bancaire instantanément, ou interwallet.",
          en: "Peer-to-Peer (P2P) transfers: Send money from any mobile wallet to a bank account instantly, or cross-wallet.",
        },
        author: "P2P Interwallet",
        title: { fr: "Banque vers Mobile", en: "Bank to Mobile" },
        region: "Cas d'usage Particuliers",
        avatar: "P2P",
        color: "#00d4ff",
      },
      {
        quote: {
          fr: "Paiements marchands (P2M) : Payez en magasin par QR code, sur TPE ou en ligne avec votre portefeuille préféré en toute sécurité.",
          en: "Merchant Payments (P2M): Pay securely in-store via QR code, POS, or online with your preferred wallet.",
        },
        author: "P2M Marchands",
        title: { fr: "QR Code & POS", en: "QR Code & POS" },
        region: "Cas d'usage Commerce",
        avatar: "P2M",
        color: "#7c3aed",
      },
      {
        quote: {
          fr: "Paiements publics (G2P / B2G) : Simplifiez le paiement des aides sociales, la collecte des taxes et des frais d'inscription.",
          en: "Public Payments (G2P / B2G): Simplify the payment of social benefits, tax collection, and enrollment fees.",
        },
        author: "G2P / B2G",
        title: { fr: "Taxes & Aides", en: "Taxes & Benefits" },
        region: "Cas d'usage État",
        avatar: "G2P",
        color: "#f59e0b",
      },
      {
        quote: {
          fr: "Services financiers numériques : Facilitez l'accès à la microfinance, au e-commerce et soutenez le développement des coopératives.",
          en: "Digital Financial Services: Facilitate access to microfinance, e-commerce, and support cooperative development.",
        },
        author: "Services Financiers",
        title: { fr: "Microfinance", en: "Microfinance" },
        region: "Cas d'usage Innovation",
        avatar: "SFN",
        color: "#00d4ff",
      },
    ],
  },

  cta: {
    label: { fr: "Rejoindre LIMOKA", en: "Join LIMOKA" },
    headline: {
      fr: ["Prêt à", "rejoindre", "la plateforme ?"],
      en: ["Ready to", "join", "the platform?"],
    },
    sub: {
      fr: "Nous mettons à votre disposition une documentation complète, une sandbox pour vos tests et un accompagnement personnalisé.",
      en: "We provide comprehensive documentation, a sandbox for testing, and personalized support.",
    },
    cta1: { fr: "Documentation Technique", en: "Technical Docs" },
    cta2: { fr: "Nous Contacter", en: "Contact Us" },
    badges: {
      fr: [
        "APIs REST Standardisées",
        "Sandbox Disponible",
        "Supervision Temps Réel",
        "Sécurité de Bout en Bout",
      ],
      en: [
        "Standardized REST APIs",
        "Sandbox Available",
        "Real-Time Monitoring",
        "End-to-End Security",
      ],
    },
  },

  footer: {
    tagline: {
      fr: "LIMOKA est une initiative nationale souveraine soutenant la vision d'une RDC financièrement connectée, moderne et inclusive.",
      en: "LIMOKA is a sovereign national initiative supporting the vision of a financially connected, modern, and inclusive DRC.",
    },
    status: { fr: "Kinshasa, RDC", en: "Kinshasa, DRC" },
    links: {
      fr: {
        Platform: [
          "Documentation technique",
          "Sandbox de test",
          "API Reference",
          "Statut système",
        ],
        Entreprise: ["À propos", "Mission", "Cas d'usage", "Contact"],
        Légal: [
          "Confidentialité",
          "Conditions d'utilisation",
          "Conformité",
          "Sécurité",
        ],
        Contact: [
          "partenaires@limoka-rdc.org",
          "contact@limoka-rdc.org",
          "www.limoka-rdc.org",
          "Support",
        ],
      },
      en: {
        Platform: [
          "Technical Documentation",
          "Test Sandbox",
          "API Reference",
          "System Status",
        ],
        Company: ["About", "Mission", "Use Cases", "Contact"],
        Legal: ["Privacy", "Terms of Service", "Compliance", "Security"],
        Contact: [
          "partenaires@limoka-rdc.org",
          "contact@limoka-rdc.org",
          "www.limoka-rdc.org",
          "Support",
        ],
      },
    },
    rights: {
      fr: `© ${new Date().getFullYear()} LIMOKA RDC. Tous droits réservés.`,
      en: `© ${new Date().getFullYear()} LIMOKA DRC. All rights reserved.`,
    },
  },
} as const;
