import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  profile: {
    name: "Evans Osei",
    tagline: "Software Engineer | Computer Science & Mathematics",
    headline: "Software Engineer | Computer Science & Mathematics",
    supportingText: "Analytical software engineer and Computer Science & Mathematics undergraduate at the University of Ghana. Combines strong mathematical rigor in algorithms and logic with modern full-stack development.",
    bioParagraph1: "Analytical software engineer and Computer Science & Mathematics undergraduate at the University of Ghana.",
    bioParagraph2: "Combines strong mathematical rigor in algorithms, discrete structures, and logic with modern full-stack development skills across React, Tailwind CSS, PostgreSQL, and Firebase.",
    bioParagraph3: "Experienced in building responsive web applications, designing scalable data schemas, and transforming complex requirements into clean, user-friendly digital systems.",
    university: "University of Ghana, Legon",
    degree: "B.Sc. in Computer Science and Mathematics",
    location: "Accra, Ghana",
    email: "batsonbilly981@gmail.com",
    phone: "+233 50 000 0000",
    githubUrl: "https://github.com/evans-osei",
    linkedinUrl: "https://linkedin.com/in/evans-osei",
    twitterUrl: "https://x.com/evans_codes",
    cvDownloadFileName: "Evans_Osei_CV.pdf",
    stats: {
      projectsCount: "15+",
      certificatesCount: "8",
      softwareTestedYear: "2026"
    }
  },

  galleryProjects: [
    {
      id: "pulsecare",
      title: "PulseCare Pharmacy Management System",
      description: "Full-stack healthcare web application delivering an end-to-end pharmacy operations platform with secure role-based access control, prescription tracking, and remote consultation booking. Features modular state workflows, Firebase Authentication, and scalable ERD schemas.",
      badge: "Featured HealthTech",
      category: "Full-Stack Healthcare Web Application",
      technologies: ["React", "Tailwind CSS", "Firebase", "Firestore", "REST APIs"],
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format&fit=crop&q=80",
      githubUrl: "https://github.com/evans-osei/pulsecare",
      liveUrl: "https://pulsecare-demo.web.app",
      accentColor: "#2563eb",
      mockupType: "dashboard",
      stats: [
        { label: "Search Latency", value: "< 180ms" },
        { label: "Auth Flow", value: "Firebase Auth" },
        { label: "Inventory Accuracy", value: "99.4%" }
      ],
      features: [
        "End-to-end pharmacy operations platform with secure role-based access control (RBAC)",
        "Real-time prescription inventory tracking and remote consultation booking engine",
        "Modular state workflows and frictionless Firebase Google Authentication onboarding",
        "Comprehensive architectural decision records (ADRs) and entity-relationship diagrams (ERDs)"
      ]
    },
    {
      id: "bcorp-forex",
      title: "B-Corp Forex Platform",
      description: "Financial tracking and market analysis dashboard engineered with React and Tailwind CSS. Provides structured financial rate displays, intuitive client-side data filtering, responsive layout optimizations, and automated CI/CD pipelines on Vercel.",
      badge: "Featured FinTech",
      category: "Financial Tracking & Market Analysis Tool",
      technologies: ["React", "Tailwind CSS", "RESTful APIs", "Vercel"],
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&auto=format&fit=crop&q=80",
      githubUrl: "https://github.com/evans-osei/bcorp-forex",
      liveUrl: "https://bcorp-forex.vercel.app",
      accentColor: "#059669",
      mockupType: "analytics",
      stats: [
        { label: "Data Refresh", value: "Real-time" },
        { label: "Deployment", value: "Vercel CI/CD" },
        { label: "Breakpoint Flow", value: "100% Responsive" }
      ],
      features: [
        "Interactive forex analytics dashboard with structured financial currency rate displays",
        "Intuitive client-side rate filtering, historical spread views, and volatility tracking",
        "Layout performance optimizations across mobile, tablet, and desktop breakpoints",
        "Automated continuous integration and deployment pipelines on Vercel for fast production releases"
      ]
    },
    {
      id: "tonaton-redesign",
      title: "Tonaton Ghana Marketplace UI/UX Redesign",
      description: "Marketplace platform architecture and interactive prototype in Figma addressing transaction friction across mobile classified listings in Ghana with high-clarity filtering, modular component libraries, and user flow modeling.",
      badge: "Featured UI/UX",
      category: "Marketplace Platform Architecture & Prototype",
      technologies: ["Figma", "User Flow Modeling", "UX Research", "ERD Modeling"],
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80",
      githubUrl: "https://github.com/evans-osei/tonaton-redesign",
      liveUrl: "https://figma.com/@evans-osei/tonaton-redesign",
      accentColor: "#8b5cf6",
      mockupType: "card-deck",
      stats: [
        { label: "Friction Points", value: "-65% Steps" },
        { label: "Design System", value: "Figma Tokens" },
        { label: "Prototype", value: "Click-Through" }
      ],
      features: [
        "Analyzed user transaction friction points across mobile classified listings",
        "Rebuilt the layout around high-clarity filtering and accessibility for local buyers and sellers",
        "Designed modular UI components and responsive modern grid layouts in Figma",
        "Built interactive click-through prototypes to streamline frictionless buyer-to-seller interactions"
      ]
    },
    {
      id: "ug-campus-nav",
      title: "UG Campus Navigator - Walkway Dijkstra Router",
      description: "An algorithmic campus navigation engine for University of Ghana, Legon. Models campus pedestrian walkways, lecture theaters (CCB, JQB, Balme Library, Math Department), and facilities as an undirected weighted graph to calculate optimal walking routes.",
      badge: "Algorithm Capstone",
      category: "Graph Theory & Campus Tech",
      technologies: ["TypeScript", "React", "Graph Algorithms (Dijkstra/A*)", "Tailwind CSS", "Canvas API"],
      imageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&auto=format&fit=crop&q=80",
      githubUrl: "https://github.com/evans-osei/ug-campus-nav",
      liveUrl: "https://ug-navigator.demo",
      accentColor: "#0284c7",
      mockupType: "terminal",
      stats: [
        { label: "Graph Nodes", value: "140+ Points" },
        { label: "Route Calc", value: "< 12ms" },
        { label: "Time Saved", value: "~18 min/day" }
      ],
      features: [
        "Client-side Dijkstra and A* pathfinding running on vectorized campus coordinates",
        "Automated lecture transition timetable with route duration and pace recommendations",
        "Interactive high-contrast vector map covering study zones and examination halls",
        "Zero-data offline PWA mode for reliable navigation without cellular data bundles"
      ]
    },
    {
      id: "neurograph-ai",
      title: "NeuroGraph AI - Neural Network & Loss Curve Workbench",
      description: "An educational machine learning workbench visualising multi-layer perceptron training loops, backpropagation, and matrix calculus in real time. Enables students to adjust hidden layers, learning rates, and activation functions.",
      badge: "Applied AI",
      category: "Machine Learning & WebGL",
      technologies: ["Python", "JavaScript", "HTML5 Canvas", "WebGL", "Linear Algebra"],
      imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1000&auto=format&fit=crop&q=80",
      githubUrl: "https://github.com/evans-osei/neurograph-engine",
      liveUrl: "https://neurograph.demo",
      accentColor: "#7c3aed",
      mockupType: "analytics",
      stats: [
        { label: "Render Rate", value: "60 FPS" },
        { label: "Activations", value: "GELU, ReLU, Sig" },
        { label: "Matrix Speed", value: "Hardware Accel" }
      ],
      features: [
        "Real-time forward pass and backpropagation inspection with step-by-step tensor visualization",
        "Interactive 2D decision boundary heatmaps rendered via WebGL fragment shaders",
        "Mathematical formula breakdowns corresponding to active neuron weights and biases",
        "Preset classification datasets: XOR, concentric spirals, and Gaussian clusters"
      ]
    },
    {
      id: "sikatrack",
      title: "SikaTrack - Mobile Money (MoMo) & Cashflow Analytics Engine",
      description: "A tailored personal finance and expense analytics engine designed for the Ghanaian financial landscape, featuring smart categorizers for MTN MoMo and Vodafone Cash SMS notifications, budget forecasting, and interactive financial health scores.",
      badge: "FinTech & Utilities",
      category: "FinTech & Analytics",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Local Encrypted Storage"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
      githubUrl: "https://github.com/evans-osei/sikatrack",
      liveUrl: "https://sikatrack.demo",
      accentColor: "#ea580c",
      mockupType: "dashboard",
      stats: [
        { label: "MoMo Parsers", value: "99.8% Acc" },
        { label: "Privacy", value: "100% Client-side" },
        { label: "Charts", value: "Monthly Trends" }
      ],
      features: [
        "Smart regex parsing engine for Mobile Money SMS transaction alerts",
        "Client-side encrypted vault ensuring sensitive financial records never leave the device",
        "Automated spending categorization with monthly cashflow burn-rate forecasts",
        "Interactive budget allocation charts and emergency fund target trackers"
      ]
    }
  ],

  technicalProjects: [
    {
      id: "tech-1",
      title: "PulseCare Pharmacy Management System",
      description: "End-to-end pharmacy operations platform with secure role-based access control, prescription tracking, and remote consultation booking.",
      framework: "React / Firebase",
      technologies: ["React", "Tailwind CSS", "Firebase", "Firestore", "REST APIs"],
      githubUrl: "https://github.com/evans-osei/pulsecare",
      liveUrl: "https://pulsecare-demo.web.app",
      year: "2026"
    },
    {
      id: "tech-2",
      title: "B-Corp Forex Platform",
      description: "Interactive forex analytics dashboard providing structured financial rate displays, client-side data filtering, and automated Vercel CI/CD.",
      framework: "React / Vercel",
      technologies: ["React", "Tailwind CSS", "RESTful APIs", "Vercel"],
      githubUrl: "https://github.com/evans-osei/bcorp-forex",
      liveUrl: "https://bcorp-forex.vercel.app",
      year: "2026"
    },
    {
      id: "tech-3",
      title: "Tonaton Ghana Marketplace UI/UX Redesign",
      description: "Classifieds marketplace redesign addressing user friction through modular components, high-clarity filtering, and interactive prototypes.",
      framework: "Figma / UX Research",
      technologies: ["Figma", "User Flow Modeling", "UX Research", "ERD Modeling"],
      githubUrl: "https://github.com/evans-osei/tonaton-redesign",
      liveUrl: "https://figma.com/@evans-osei/tonaton-redesign",
      year: "2025"
    },
    {
      id: "tech-4",
      title: "UG Campus Navigator - Dijkstra Walkway Router",
      description: "Algorithmic pathfinding system modeling University of Ghana campus walkways as an undirected graph with Dijkstra and A* route computation.",
      framework: "TypeScript / React",
      technologies: ["TypeScript", "React", "Graph Theory", "Dijkstra Algorithm", "Canvas"],
      githubUrl: "https://github.com/evans-osei/ug-campus-nav",
      liveUrl: "https://ug-navigator.demo",
      year: "2025"
    },
    {
      id: "tech-5",
      title: "NeuroGraph AI - Neural Network & Loss Curve Workbench",
      description: "Educational machine learning workbench with real-time backpropagation, matrix calculus, and WebGL shader decision boundary visualizers.",
      framework: "Python / WebGL",
      technologies: ["Python", "JavaScript", "WebGL", "Linear Algebra", "HTML5 Canvas"],
      githubUrl: "https://github.com/evans-osei/neurograph-engine",
      liveUrl: "https://neurograph.demo",
      year: "2025"
    },
    {
      id: "tech-6",
      title: "SikaTrack - MoMo Financial Analytics Engine",
      description: "Client-side encrypted personal finance tracker with automated Ghanaian Mobile Money transaction parsing and cashflow forecasting.",
      framework: "React / TypeScript",
      technologies: ["React", "TypeScript", "Recharts", "Tailwind CSS", "Cryptography"],
      githubUrl: "https://github.com/evans-osei/sikatrack",
      liveUrl: "https://sikatrack.demo",
      year: "2025"
    }
  ],

  digitalProjects: [
    {
      id: "dig-1",
      title: "Tonaton Ghana Marketplace UI Kit & Design System",
      description: "Modular component library, accessible color systems, and user transaction flow wireframes in Figma.",
      category: "Product & UI/UX",
      thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
      tags: ["Figma", "UX Research", "Design System", "Marketplace"],
      slidesCount: 20
    },
    {
      id: "dig-2",
      title: "PulseCare Architecture & ERD System Models",
      description: "Architectural Decision Records (ADRs) and Entity-Relationship Diagrams (ERDs) for scalable pharmacy health operations.",
      category: "System Architecture",
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
      tags: ["ERD", "ADR", "Architecture", "Firebase"],
      slidesCount: 16
    },
    {
      id: "dig-3",
      title: "UG Legon Campus Walkway Vector Mapping",
      description: "Vector cartography and spatial node datasets mapping walkways, lecture halls, and shade paths across Legon.",
      category: "Cartography & Graph Data",
      thumbnail: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80",
      tags: ["SVG", "Spatial Data", "Graph Theory", "University of Ghana"],
      slidesCount: 14
    }
  ],

  awards: [
    {
      id: "award-1",
      title: "Dean's Honor Roll",
      subtitle: "Recognized for consistent academic excellence and top percentile scholastic ranking in Computer Science & Mathematics.",
      icon: "trophy",
      year: "2024 - 2026",
      issuer: "College of Basic and Applied Sciences, University of Ghana"
    },
    {
      id: "award-2",
      title: "Best Algorithm Capstone System",
      subtitle: "Awarded 1st Place for UG Campus Navigator, praised for mathematical modeling, graph optimization, and real campus utility.",
      icon: "ribbon",
      year: "2025",
      issuer: "Department of Computer Science Capstone Committee"
    },
    {
      id: "award-3",
      title: "UG Tech Innovation Showcase",
      subtitle: "Honored for PulseCare digital healthcare prototype, highlighting practical healthcare impact and resilient architecture.",
      icon: "medal",
      year: "2025",
      issuer: "University of Ghana Student Tech Showcase"
    }
  ],

  trainings: [
    {
      id: "training-1",
      title: "Google Developer Student Club (GDSC) - Tech Lead",
      category: "Advanced Web & Cloud Engineering",
      organization: "GDSC University of Ghana Chapter",
      date: "2024 - 2026",
      description: "Mentored peers and led hands-on technical workshops covering modern React frameworks, Firebase architecture, and algorithmic problem-solving. Facilitated university-wide study jams and hackathons.",
      badge: "TECH LEAD & MENTOR",
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "training-2",
      title: "National Civic Tech Hackathon",
      category: "Community Healthcare Solutions",
      organization: "Hacklab Foundation Ghana",
      date: "November 2025",
      description: "Built the prototype for PulseCare Pharmacy Management System, addressing medicine discovery friction with role-based authentication and prescription tracking.",
      badge: "MOST PROMISING PROTOTYPE",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
    },
    {
      id: "training-3",
      title: "Applied AI & Deep Learning Workshop",
      category: "Neural Architectures & Matrix Calculus",
      organization: "AI Ghana & Data Science Network",
      date: "September 2025",
      description: "Participated in technical deep-dives on the mathematical foundations of deep learning, gradient convergence behaviors, and training neural models.",
      badge: "CERTIFICATE OF COMPLETION",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80"
    }
  ],

  traits: [
    {
      id: "trait-1",
      title: "Analytical Problem Solver",
      tagline: "Translating complex mathematical concepts and logic into clean, user-friendly digital systems.",
      color: "#0f172a"
    },
    {
      id: "trait-2",
      title: "Mathematical Rigor",
      tagline: "Strong foundation in algorithms, discrete mathematics, linear algebra, and computational logic.",
      color: "#1e1b4b"
    },
    {
      id: "trait-3",
      title: "Scalable System Architect",
      tagline: "Designing robust ERDs, architectural decision records (ADRs), and role-based data models.",
      color: "#064e3b"
    },
    {
      id: "trait-4",
      title: "Full-Stack Craftsman",
      tagline: "Building responsive web applications across React, Tailwind CSS, PostgreSQL, and Firebase.",
      color: "#311042"
    }
  ],

  projects: [
    {
      id: "proj-pulsecare",
      title: "PulseCare Pharmacy Management System",
      subtitle: "Full-Stack Healthcare Web Application",
      category: "Web",
      technologies: ["React", "Tailwind CSS", "Firebase", "Firestore", "REST APIs"],
      role: "Lead Full-Stack Developer",
      description: "Built an end-to-end pharmacy operations platform with secure role-based access control, prescription tracking, and remote consultation booking.",
      fullOverview: "PulseCare tackles healthcare logistical friction by combining real-time pharmacy inventory tracking, secure role-based access control (RBAC), and prescription reservations into an intuitive web platform.",
      problem: "Patients frequently experience severe delays and visit multiple dispensaries during emergencies only to find vital medications out of stock.",
      solution: "A full-stack healthcare operations platform featuring real-time prescription tracking, remote consultation booking, and verified pharmacist accounts.",
      keyFeatures: [
        "End-to-end pharmacy operations with role-based access control (RBAC)",
        "Prescription tracking and remote consultation booking",
        "Modular state workflows with Firebase Google Authentication",
        "Architectural documentation and Entity-Relationship Diagrams (ERDs)"
      ],
      challenges: "Designing multi-role permission hierarchies and maintaining reliable state sync across patient and pharmacist workflows.",
      learnings: "Architectural Decision Records (ADRs), Firestore security rules, and user-friendly onboarding flows.",
      githubUrl: "https://github.com/evans-osei/pulsecare",
      liveUrl: "https://pulsecare-demo.web.app",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format&fit=crop&q=80",
      featured: true,
      date: "2026"
    },
    {
      id: "proj-bcorp-forex",
      title: "B-Corp Forex Platform",
      subtitle: "Financial Tracking & Market Analysis Tool",
      category: "Web",
      technologies: ["React", "Tailwind CSS", "RESTful APIs", "Vercel"],
      role: "Frontend Engineer",
      description: "Engineered an interactive forex analytics dashboard providing structured financial rate displays and intuitive client-side data filtering.",
      fullOverview: "A financial tracking and market rate analysis tool designed to give users real-time currency visibility, structured market spreads, and smooth interactive filtering across global and regional currency pairs.",
      problem: "Forex market rate displays are often cluttered, slow to respond, and poorly optimized for quick mobile inspections.",
      solution: "An interactive, performant forex analytics dashboard with client-side rate filtering, responsive layout optimizations, and automated CI/CD deployments on Vercel.",
      keyFeatures: [
        "Interactive forex analytics dashboard with structured rate displays",
        "Intuitive client-side data filtering and currency pair comparisons",
        "Responsive UI rendering optimizations across mobile and desktop breakpoints",
        "Automated CI/CD deployment pipelines on Vercel"
      ],
      challenges: "Optimizing render passes for high-frequency financial rate updates without layout jitter on mobile screens.",
      learnings: "Modern React state memoization, responsive CSS grid choreography, and Vercel automated preview pipelines.",
      githubUrl: "https://github.com/evans-osei/bcorp-forex",
      liveUrl: "https://bcorp-forex.vercel.app",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&auto=format&fit=crop&q=80",
      featured: true,
      date: "2026"
    },
    {
      id: "proj-tonaton-redesign",
      title: "Tonaton Ghana Marketplace UI/UX Redesign",
      subtitle: "Marketplace Platform Architecture & Prototype",
      category: "UI/UX",
      technologies: ["Figma", "User Flow Modeling", "UX Research", "ERD Modeling"],
      role: "Product & UI/UX Designer",
      description: "Analyzed user transaction friction points across mobile classified listings and rebuilt the layout around high-clarity filtering and accessibility.",
      fullOverview: "A comprehensive redesign and architectural blueprint of the Tonaton Ghana classified marketplace platform, streamlining discovery, buyer-seller messaging, and item trust verification.",
      problem: "Mobile classifieds users faced high navigation friction, difficult search filters, and cluttered listing cards that slowed transactions.",
      solution: "Modular UI component architecture, accessible high-clarity filtering systems, and interactive click-through prototypes.",
      keyFeatures: [
        "In-depth user flow research identifying key transaction drop-off points",
        "Rebuilt mobile and desktop layouts focused on rapid listing filtering",
        "Modular UI component design system and atomic Figma tokens",
        "Interactive click-through prototypes for seamless buyer-to-seller interactions"
      ],
      challenges: "Balancing information density for item specs with clean, thumb-friendly mobile browsing zones.",
      learnings: "Quantitative UX heuristics, ergonomic mobile interface design, and design-to-code component mapping.",
      githubUrl: "https://github.com/evans-osei/tonaton-redesign",
      liveUrl: "https://figma.com/@evans-osei/tonaton-redesign",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80",
      featured: true,
      date: "2025"
    },
    {
      id: "proj-ug-campus-nav",
      title: "UG Campus Navigator",
      subtitle: "Walkway Graph Dijkstra Router & Timetable Guide",
      category: "University",
      technologies: ["TypeScript", "React", "Graph Theory", "Canvas API", "Tailwind CSS"],
      role: "Algorithm & Systems Developer",
      description: "Interactive campus navigation engine computing optimal, shade-optimized walking routes across University of Ghana, Legon.",
      fullOverview: "A student-centric navigation system modeling 140+ pedestrian paths, lecture halls, and departmental facilities as a weighted graph.",
      problem: "Students with back-to-back lectures between Balme Library, CCB, and JQB struggled to calculate optimal transit times under tropical heat.",
      solution: "Client-side Dijkstra and A* pathfinding incorporating shade weights and lecture timetable reminders.",
      keyFeatures: ["Dijkstra & A* algorithms", "Vector campus map", "Lecture timetable synchronization", "Zero-data PWA mode"],
      challenges: "Efficiently vectorizing large physical campus coordinates without external heavy tile servers.",
      learnings: "Advanced graph representation algorithms, spatial indexing, and high-performance Canvas rendering.",
      githubUrl: "https://github.com/evans-osei/ug-campus-nav",
      liveUrl: "https://ug-navigator.demo",
      imageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&auto=format&fit=crop&q=80",
      featured: true,
      date: "2025"
    },
    {
      id: "proj-neurograph-ai",
      title: "NeuroGraph AI",
      subtitle: "Neural Network Loss & Tensor Calculus Workbench",
      category: "AI",
      technologies: ["Python", "JavaScript", "HTML5 Canvas", "WebGL", "Linear Algebra"],
      role: "AI Developer",
      description: "Interactive visual simulator demonstrating multi-layer perceptron forward propagation, gradient descent, and decision boundary convergence.",
      fullOverview: "Designed as an intuitive visual workbench for students studying machine learning and matrix calculus.",
      problem: "Deep learning mathematical concepts can feel abstract without instant visual feedback of weights, activations, and loss curves.",
      solution: "A zero-dependency browser workbench calculating gradients in real-time with customizable activation functions.",
      keyFeatures: ["Real-time backprop visualization", "GELU, ReLU, Sigmoid toggles", "WebGL decision surfaces", "Interactive 2D datasets"],
      challenges: "Maintaining 60 FPS while updating continuous heatmaps in the browser.",
      learnings: "GPU fragment shader pipelines and efficient matrix multiplication routines.",
      githubUrl: "https://github.com/evans-osei/neurograph-engine",
      liveUrl: "https://neurograph.demo",
      imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1000&auto=format&fit=crop&q=80",
      featured: true,
      date: "2025"
    },
    {
      id: "proj-sikatrack",
      title: "SikaTrack",
      subtitle: "Mobile Money & Cashflow Analytics Engine",
      category: "Web",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Web Crypto API"],
      role: "Frontend & Security Developer",
      description: "Personal finance and cashflow tracker engineered specifically for MTN MoMo and Vodafone Cash transactions in Ghana.",
      fullOverview: "Provides automated transaction parsing, localized budget forecasting, and encrypted client-side data isolation.",
      problem: "Global budgeting tools lack support for mobile money SMS patterns and Ghanaian cedi currency specifics.",
      solution: "A privacy-first web application parsing transaction SMS patterns with zero server uploads.",
      keyFeatures: ["MoMo SMS regex parsers", "Client-side encrypted vault", "Monthly cashflow burn-rate charts", "Offline budgeting"],
      challenges: "Handling irregular SMS syntax variations across telecom networks.",
      learnings: "Client-side encryption using Web Crypto API and flexible regex parsers.",
      githubUrl: "https://github.com/evans-osei/sikatrack",
      liveUrl: "https://sikatrack.demo",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
      featured: true,
      date: "2025"
    }
  ],

  skills: [
    {
      id: "skill-1",
      name: "Core Strengths & Theory",
      category: "Concepts",
      description: "Algorithms & Data Structures, Discrete Mathematics, Computational Logic, Algorithm Optimization, Data Modeling",
      context: "Mathematical Rigor & CS Fundamentals",
      icon: "Cpu"
    },
    {
      id: "skill-2",
      name: "Frontend Development",
      category: "Web Development",
      description: "React, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Responsive Design",
      context: "Modern Responsive Web UI",
      icon: "Code2"
    },
    {
      id: "skill-3",
      name: "Backend & Systems",
      category: "Backend & Database",
      description: "Firebase (Auth, Firestore), PostgreSQL, RESTful API Design & Architecture",
      context: "Scalable Data Storage & APIs",
      icon: "Database"
    },
    {
      id: "skill-4",
      name: "Design & Architecture",
      category: "Tools",
      description: "Figma, Architectural Decision Records (ADRs), Entity-Relationship Modeling (ERDs), UI/UX Prototyping",
      context: "Interface & Data Modeling",
      icon: "Figma"
    },
    {
      id: "skill-5",
      name: "DevOps & Tooling",
      category: "Tools",
      description: "Git, GitHub, Vercel",
      context: "CI/CD & Source Control",
      icon: "Terminal"
    }
  ],

  experiences: [
    {
      id: "exp-1",
      period: "2024 - Present",
      title: "Undergraduate Software Engineer & Tech Lead",
      role: "Software Engineering & Applied Theory",
      organization: "University of Ghana, Legon",
      location: "Accra, Ghana",
      description: "Developing robust full-stack web applications, designing scalable data schemas, and applying mathematical modeling to real-world software platforms.",
      points: [
        "Built PulseCare Pharmacy Management System with role-based access control, prescription tracking, and Firebase Authentication.",
        "Engineered the B-Corp Forex analytics dashboard with client-side rate filtering and Vercel automated CI/CD.",
        "Redesigned the Tonaton Ghana marketplace architecture in Figma with modular UI components and streamlined transaction flows.",
        "Developed UG Campus Navigator modeling campus walkway networks as weighted graphs using Dijkstra's algorithm."
      ],
      tags: ["React", "Tailwind CSS", "Firebase", "PostgreSQL", "Algorithms", "Discrete Math"]
    }
  ],

  education: {
    institution: "University of Ghana, Legon",
    degree: "B.Sc. in Computer Science and Mathematics",
    period: "Undergraduate (2022 - 2026)",
    location: "Accra, Ghana",
    standing: "Dean's Honor Roll",
    coursework: [
      "Data Structures & Algorithms",
      "Discrete Mathematics",
      "Database Systems",
      "Linear Algebra",
      "Mathematical Analysis",
      "Software Engineering",
      "Human-Computer Interaction"
    ],
    academicInterests: [
      "Algorithms & Optimization",
      "Computational Logic",
      "Full-Stack Web Systems",
      "Data Modeling & Schemas",
      "UI/UX Architecture"
    ],
    highlights: [
      "Dean's Honor Roll",
      "Best Algorithm Capstone System (UG Campus Navigator)",
      "Tech Showcase Winner (PulseCare)"
    ]
  },

  exploringTopics: [],
  exploring: [],
  thinkingSteps: [],
  articles: [],
  gallery: [],
  certificates: [],
  messages: []
};
