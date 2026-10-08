import { PortfolioData } from '../types/portfolio';

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: "Evans Osei",
    tagline: "Computer Science & Mathematics Student | Software Developer | AI & Game Development Enthusiast",
    headline: "I build digital experiences, intelligent systems, and ideas into reality.",
    supportingText: "I'm a Computer Science & Mathematics student at the University of Ghana, passionate about software engineering, artificial intelligence, and game development.",
    bioParagraph1: "I'm Evans Osei, a Computer Science and Mathematics student at the University of Ghana with a strong interest in building technology that solves real problems.",
    bioParagraph2: "My interests span software engineering, artificial intelligence, web development, backend systems, and game development. I enjoy taking an idea from a concept and turning it into a functional digital product.",
    bioParagraph3: "I'm continuously learning, experimenting with new technologies, and building projects that strengthen both my technical and problem-solving abilities.",
    university: "University of Ghana",
    degree: "BSc Computer Science & Mathematics",
    location: "Ghana",
    email: "evans.osei.dev@gmail.com",
    phone: "+233 50 000 0000",
    githubUrl: "https://github.com/evans-osei",
    linkedinUrl: "https://linkedin.com/in/evans-osei",
    twitterUrl: "https://x.com/evans_codes",
    cvDownloadFileName: "Evans_Osei_CV.pdf"
  },
  projects: [
    {
      id: "pulsecare",
      title: "PulseCare",
      subtitle: "Digital Healthcare & Pharmacy Discovery Platform",
      category: "Web",
      technologies: ["React", "TypeScript", "Node.js", "Firebase", "Tailwind CSS"],
      role: "Lead Full-Stack Developer & UI Architect",
      description: "A digital healthcare/pharmacy platform designed to improve how users discover medicines and access pharmacy-related services with real-time inventory verification.",
      fullOverview: "PulseCare was born from a widespread challenge in Ghana: patients and caregivers frequently travel between multiple pharmacies searching for critical medications that may be out of stock. PulseCare bridges this gap by offering a centralized discovery engine connecting licensed pharmacies with patients.",
      problem: "In many metropolitan and regional areas, pharmacies operate in information silos. Finding essential prescriptions often requires physically visiting multiple pharmacies across the city, wasting critical hours during health emergencies.",
      solution: "Engineered a reactive platform allowing patients to search medications by active ingredient or brand, verify real-time inventory at nearby verified dispensaries, compare transparent pricing, and reserve for pickup or delivery.",
      keyFeatures: [
        "Real-time pharmacy inventory lookup with geolocated proximity search",
        "Direct verified pharmacy chat and prescription verification gateway",
        "Secure patient order reservation and fulfillment notification system",
        "Pharmacy dashboard for real-time inventory stock management and audits"
      ],
      challenges: "Handling real-time stock synchronization under intermittent cellular connections and ensuring strict data privacy for sensitive health inquiries.",
      learnings: "Mastered distributed Firebase Firestore listener patterns, offline cache-first optimistic UI updates, and building zero-friction search interfaces for stressful contexts.",
      githubUrl: "https://github.com/evans-osei/pulsecare",
      liveUrl: "https://pulsecare-demo.web.app",
      figmaUrl: "https://figma.com/@evansosei/pulsecare-system",
      featured: true,
      date: "2026"
    },
    {
      id: "ug-campus-navigator",
      title: "UG Campus Navigator",
      subtitle: "Smart Venue & Academic Timetable Routing System",
      category: "University",
      technologies: ["TypeScript", "React", "Graph Algorithms", "Tailwind CSS", "Local Storage"],
      role: "Sole Creator & Algorithm Engineer",
      description: "An interactive campus logistics engine mapping University of Ghana lecture halls, departments, and libraries with algorithmic optimal walking paths.",
      fullOverview: "Navigating the sprawling University of Ghana, Legon campus is a notorious challenge for freshmen and cross-departmental students balancing lectures between the Mathematics Department, CCB, and Balme Library. This project transforms static campus maps into a dynamic routing tool.",
      problem: "Traditional campus PDF maps are cumbersome and lack route computation between consecutive lectures with tight 10-minute transition windows.",
      solution: "Modeled the Legon campus walkways as an undirected weighted graph, running client-side Dijkstra and A* pathfinding to compute accessible, shade-optimized walking routes between lecture theaters.",
      keyFeatures: [
        "Interactive vector campus map with high-contrast building footprints",
        "Automated lecture transition timetable with route duration estimates",
        "Offline-capable PWA caching for zero-data campus walking guidance",
        "Facility search covering study zones, Wi-Fi hotspots, and examination centers"
      ],
      challenges: "Balancing precision geographical coordinates with lightweight vector rendering without relying on external paid map APIs.",
      learnings: "Deepened practical application of graph theory, spatial distance calculation using Haversine formulas, and canvas-based path rendering.",
      githubUrl: "https://github.com/evans-osei/ug-campus-nav",
      liveUrl: "https://ug-navigator.demo",
      featured: true,
      date: "2025"
    },
    {
      id: "neurograph-ai",
      title: "NeuroGraph AI",
      subtitle: "Interactive Neural Network & Algorithm Visualizer",
      category: "AI",
      technologies: ["Python", "JavaScript", "HTML5 Canvas", "Linear Algebra", "WebGL"],
      role: "Machine Learning & Visualization Developer",
      description: "An interactive educational workbench demonstrating how multi-layer perceptrons learn through gradient descent, backpropagation, and matrix calculus.",
      fullOverview: "Bridging the gap between pure mathematics and code, NeuroGraph AI lets students and engineers construct neural network architectures visually and watch weight tensors adapt in real-time as loss surfaces converge.",
      problem: "Many learners struggle to intuitively connect calculus concepts (partial derivatives, chain rule) with modern machine learning training loops.",
      solution: "Developed an interactive canvas where users adjust activation functions (ReLU, Sigmoid, GELU), learning rates, and hidden layers, visualizing decision boundary contours morphing live.",
      keyFeatures: [
        "Real-time step-by-step forward pass and backpropagation inspection",
        "Dynamic 2D decision boundary heatmaps rendered via WebGL shaders",
        "Mathematical formula breakdowns corresponding to active neuron layers",
        "Preset classification datasets: XOR, concentric spirals, and Gaussian clusters"
      ],
      challenges: "Optimizing matrix operations in pure JavaScript/WebGL so training loops run smoothly at 60 FPS while visualizing hundreds of weights.",
      learnings: "Solidified understanding of matrix calculus, numerical stability in gradient descent, and high-performance WebGL graphics pipeline programming.",
      githubUrl: "https://github.com/evans-osei/neurograph-engine",
      liveUrl: "https://neurograph.demo",
      featured: true,
      date: "2025"
    },
    {
      id: "chronoforge-game",
      title: "ChronoForge 2D",
      subtitle: "Experimental WebGL Physics & Game Architecture",
      category: "Web",
      technologies: ["TypeScript", "Canvas API", "WebGL", "OOP", "Spatial Hashing"],
      role: "Game Engine Developer",
      description: "A lightweight, modular 2D game engine built from scratch in TypeScript, featuring custom rigid-body collision detection, state machines, and particle systems.",
      fullOverview: "Built as an exploration into real-time interactive systems and low-level computer science architecture, ChronoForge implements core game loop mechanics without reliance on heavyweight external engines.",
      problem: "Commercial engines often abstract away the mathematical and memory principles that govern real-time simulation and game physics.",
      solution: "Implemented an Entity-Component-System (ECS) architecture with Separating Axis Theorem (SAT) collision detection, spatial hash grids for broadphase pruning, and decoupled render loops.",
      keyFeatures: [
        "Custom SAT collision resolution with restitution and friction modeling",
        "Spatial grid partitioning delivering O(N) broadphase query performance",
        "Configurable particle emitter system for dynamic atmospheric visual effects",
        "State-driven entity animation controller and keyframe timeline"
      ],
      challenges: "Preventing garbage collection pauses during high entity counts through object pooling and typed array buffers.",
      learnings: "Deep insights into frame budgets, spatial data structures (quadtrees and hash grids), and mathematical physics simulation.",
      githubUrl: "https://github.com/evans-osei/chronoforge",
      liveUrl: "https://chronoforge.demo",
      featured: false,
      date: "2025"
    },
    {
      id: "ledgerflow-backend",
      title: "LedgerFlow API",
      subtitle: "High-Throughput Financial Ledger & Auth Microservice",
      category: "Backend",
      technologies: ["Node.js", "Express.js", "PostgreSQL", "Sequelize", "Docker", "JWT"],
      role: "Backend Architect",
      description: "A double-entry accounting ledger backend service ensuring ACID compliance, atomic balance transfers, and idempotent transaction processing.",
      fullOverview: "Designed to explore fintech backend engineering challenges, LedgerFlow enforces strict transactional invariants where money cannot be created or destroyed, only transferred across balanced ledger entries.",
      problem: "Naive payment systems suffer from race conditions, double-spending bugs, and inconsistent balance calculations under concurrent write operations.",
      solution: "Engineered database transactions utilizing PostgreSQL row-level locks (`SELECT FOR UPDATE`), immutable audit trails, and strict schema constraints managed via Sequelize migrations.",
      keyFeatures: [
        "Strict double-entry bookkeeping architecture with zero floating balance discrepancies",
        "Idempotency keys ensuring replay protection on distributed network retries",
        "Role-based access control (RBAC) with rotating JWTs and bcrypt salted hashes",
        "Comprehensive automated integration test suite with high coverage"
      ],
      challenges: "Eliminating deadlocks during high-concurrency cross-account simultaneous transfers.",
      learnings: "Mastered isolation levels (READ COMMITTED vs SERIALIZABLE), query optimization with PostgreSQL indices, and robust error envelope designs.",
      githubUrl: "https://github.com/evans-osei/ledgerflow-core",
      featured: false,
      date: "2025"
    },
    {
      id: "syntax-ui-kit",
      title: "Syntax Design System",
      subtitle: "Minimalist Accessible UI Framework",
      category: "UI/UX",
      technologies: ["Figma", "React", "TypeScript", "Tailwind CSS", "ARIA"],
      role: "UI/UX Designer & Frontend Engineer",
      description: "A dark-first, typography-driven component library created to standardize design fidelity, keyboard accessibility, and micro-interactions.",
      fullOverview: "A personal design system built to eliminate UI inconsistencies across student and professional software projects. Rooted in WCAG 2.1 AA accessibility standards and high-density information displays.",
      problem: "Off-the-shelf component kits often come loaded with bloated styles, inconsistent padding math, and low keyboard accessibility.",
      solution: "Designed tokens from first principles in Figma and translated them into headless, accessible React components with zero unnecessary styling overhead.",
      keyFeatures: [
        "Strict 4px/8px spatial rhythm and mathematically balanced type scales",
        "Full keyboard navigation with visible focus rings and screen-reader compliance",
        "Zero-runtime footprint optimized for sub-100ms first contentful paint",
        "Interactive component playground with live variant switching"
      ],
      challenges: "Designing micro-interactions that feel responsive and organic while keeping bundle size negligible.",
      learnings: "Deepened mastery of design tokens, accessible dialog focus trapping, and ergonomic component API design.",
      githubUrl: "https://github.com/evans-osei/syntax-ui",
      figmaUrl: "https://figma.com/@evansosei/syntax-tokens",
      featured: false,
      date: "2024"
    }
  ],
  skills: [
    // Programming
    {
      id: "python",
      name: "Python",
      category: "Programming",
      description: "Data analysis, machine learning prototypes, algorithmic problem solving, scripting.",
      context: "Core language for scientific computing and AI experimentation.",
      icon: "Code2"
    },
    {
      id: "java",
      name: "Java",
      category: "Programming",
      description: "Object-oriented design, enterprise patterns, concurrency, algorithms.",
      context: "Primary university engineering language for systems and data structures.",
      icon: "Coffee"
    },
    {
      id: "javascript",
      name: "JavaScript",
      category: "Programming",
      description: "ES6+, asynchronous programming, event loop mechanics, browser APIs.",
      context: "Daily full-stack development and client-side application logic.",
      icon: "FileCode"
    },
    {
      id: "sql",
      name: "SQL",
      category: "Programming",
      description: "Relational queries, complex joins, indexing strategies, transaction management.",
      context: "Designing and querying relational database architectures.",
      icon: "Database"
    },
    // Web Development
    {
      id: "html5",
      name: "HTML5 & Semantic Web",
      category: "Web Development",
      description: "Accessible structure, modern web standards, microdata, SEO optimization.",
      context: "Rock-solid foundational markup for high-performance applications.",
      icon: "Layout"
    },
    {
      id: "css3-tailwind",
      name: "CSS / Tailwind CSS",
      category: "Web Development",
      description: "Modern layout engines (Flexbox, Grid), animations, design tokens, utility-first styling.",
      context: "Crafting fluid, high-end responsive interfaces with zero visual clunkiness.",
      icon: "Palette"
    },
    {
      id: "react",
      name: "React",
      category: "Web Development",
      description: "Hooks, functional patterns, component lifecycles, state orchestration.",
      context: "Primary frontend framework for interactive web applications.",
      icon: "Atom"
    },
    {
      id: "nodejs",
      name: "Node.js",
      category: "Web Development",
      description: "Event-driven architecture, non-blocking I/O, microservices, CLI tools.",
      context: "High-performance server-side runtimes and tooling.",
      icon: "Server"
    },
    {
      id: "express",
      name: "Express.js",
      category: "Web Development",
      description: "RESTful API routing, middleware chains, authentication pipelines, CORS.",
      context: "Building clean, maintainable backend service endpoints.",
      icon: "Network"
    },
    // Backend & Database
    {
      id: "firebase",
      name: "Firebase",
      category: "Backend & Database",
      description: "Firestore, Authentication, Cloud Storage, real-time listeners, security rules.",
      context: "Rapid reactive application infrastructure and real-time synchronization.",
      icon: "Flame"
    },
    {
      id: "supabase",
      name: "Supabase",
      category: "Backend & Database",
      description: "Postgres-backed BaaS, Row-Level Security (RLS), real-time database subscriptions.",
      context: "Serverless relational data modeling with built-in auth.",
      icon: "Zap"
    },
    {
      id: "sqlite",
      name: "SQLite",
      category: "Backend & Database",
      description: "Embedded zero-configuration databases, local testing, offline caching.",
      context: "Lightweight storage for desktop, mobile, and rapid prototypes.",
      icon: "HardDrive"
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      category: "Backend & Database",
      description: "ACID transactions, relational schema design, JSONB storage, query optimization.",
      context: "Production-grade database for complex relational data models.",
      icon: "Database"
    },
    {
      id: "sequelize",
      name: "Sequelize",
      category: "Backend & Database",
      description: "ORM modeling, automated migrations, association mapping, transaction management.",
      context: "Structured data access layers for Node.js enterprise backends.",
      icon: "Layers"
    },
    // Tools
    {
      id: "git",
      name: "Git",
      category: "Tools",
      description: "Version control, branching strategies, interactive rebasing, merge resolutions.",
      context: "Clean development history and disciplined team collaboration.",
      icon: "GitBranch"
    },
    {
      id: "github",
      name: "GitHub",
      category: "Tools",
      description: "Pull request reviews, GitHub Actions, project management, open-source workflow.",
      context: "Repository hosting, automation pipelines, and portfolio code showcase.",
      icon: "Github"
    },
    {
      id: "figma",
      name: "Figma",
      category: "Tools",
      description: "Design systems, auto-layout prototypes, wireframing, interactive user journeys.",
      context: "Turning abstract ideas into refined UI specifications before writing code.",
      icon: "Framer"
    },
    {
      id: "docker",
      name: "Docker",
      category: "Tools",
      description: "Containerization, Dockerfiles, multi-stage builds, consistent local environments.",
      context: "Ensuring reproducibility between local development and deployment.",
      icon: "Box"
    },
    {
      id: "android-studio",
      name: "Android Studio",
      category: "Tools",
      description: "Mobile debugging, emulator profiling, Gradle builds, layout inspection.",
      context: "Native and cross-platform mobile application development.",
      icon: "Smartphone"
    },
    {
      id: "vscode",
      name: "VS Code",
      category: "Tools",
      description: "Advanced editor setups, debugging configurations, workspace extensions, linting.",
      context: "Daily engineering workspace optimized for speed and focus.",
      icon: "Terminal"
    },
    // Concepts
    {
      id: "artificial-intelligence",
      name: "Artificial Intelligence",
      category: "Concepts",
      description: "Neural network principles, supervised learning, optimization algorithms, loss functions.",
      context: "Applying mathematical intuition to intelligent decision-making systems.",
      icon: "Cpu"
    },
    {
      id: "algorithms",
      name: "Algorithms",
      category: "Concepts",
      description: "Asymptotic complexity (Big-O), dynamic programming, divide & conquer, graph search.",
      context: "Engineering computationally efficient solutions to complex problems.",
      icon: "Binary"
    },
    {
      id: "data-structures",
      name: "Data Structures",
      category: "Concepts",
      description: "Trees (BST, AVL), heaps, hash tables, graphs, linked structures, memory layouts.",
      context: "Selecting the optimal data organization for algorithmic throughput.",
      icon: "GitFork"
    },
    {
      id: "ui-ux",
      name: "UI/UX Design",
      category: "Concepts",
      description: "Information hierarchy, spatial balance, micro-interactions, accessibility (a11y).",
      context: "Building software that feels intuitive, respectful, and joyful to use.",
      icon: "Sparkles"
    },
    {
      id: "software-engineering",
      name: "Software Engineering",
      category: "Concepts",
      description: "SOLID principles, modularity, defensive programming, automated testing, DRY.",
      context: "Architecting software that is maintainable, scalable, and resilient.",
      icon: "Wrench"
    }
  ],
  experiences: [
    {
      id: "exp-2026",
      period: "2026 — Present",
      title: "Software Engineering & Advanced University Projects",
      role: "Lead Student Engineer & Systems Developer",
      organization: "University of Ghana Projects & Independent Engineering",
      location: "Accra, Ghana",
      description: "Directing technical development on full-stack web platforms, leading student team collaborations, and building production-ready architectures that bridge academic theory with real-world utility.",
      points: [
        "Architected and deployed PulseCare, a digital pharmacy search platform with real-time inventory queries.",
        "Engineered backend REST APIs with PostgreSQL, row-level locking, and transactional integrity guarantees.",
        "Mentored junior Computer Science peers in Git collaboration, algorithmic problem-solving, and clean code principles.",
        "Researched WebGL and Canvas 2D graphics performance for educational algorithm simulations."
      ],
      tags: ["Full-Stack", "Architecture", "PostgreSQL", "React", "TypeScript", "Team Collaboration"]
    },
    {
      id: "exp-2025",
      period: "2025",
      title: "Algorithmic Research & Campus Tech Initiatives",
      role: "Developer & Algorithm Specialist",
      organization: "Department of Computer Science & Mathematics",
      location: "Legon, Ghana",
      description: "Conducted deep-dive implementations into graph traversal algorithms, numerical calculus solvers, and student community tooling at the University of Ghana.",
      points: [
        "Built UG Campus Navigator, implementing client-side Dijkstra pathfinding across university walkways.",
        "Developed custom educational simulations demonstrating gradient descent convergence on multidimensional functions.",
        "Collaborated on open-source repositories and participated in campus developer hackathons.",
        "Maintained high academic standing while actively shipping functional software experiments."
      ],
      tags: ["Algorithms", "Graph Theory", "Python", "Data Structures", "Campus Logistics"]
    },
    {
      id: "exp-2024",
      period: "2024",
      title: "Foundational Software Development & Mathematics Study",
      role: "Aspiring Software Developer",
      organization: "Self-Directed Engineering & Academic Foundations",
      location: "Ghana",
      description: "Built foundational mastery in Object-Oriented Programming (Java), computational mathematics, web standards, and UNIX command-line environments.",
      points: [
        "Constructed multiple full-featured web utilities utilizing modern JavaScript and responsive CSS.",
        "Mastered linear algebra, calculus, and discrete mathematics foundations underlying computer science.",
        "Participated in regional coding workshops and technical study cohorts.",
        "Designed first complete design system prototype in Figma."
      ],
      tags: ["Java", "OOP", "JavaScript", "Calculus", "Figma"]
    }
  ],
  education: {
    id: "ug-bsc-cs-math",
    institution: "University of Ghana",
    degree: "BSc Computer Science & Mathematics",
    period: "2025 – Present",
    location: "Legon, Accra, Ghana",
    standing: "High Academic Standing",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (Java)",
      "Discrete Mathematics & Logic",
      "Linear Algebra & Matrix Theory",
      "Multivariable Calculus",
      "Database Systems & Relational Theory",
      "Computer Architecture & Organization",
      "Probability & Statistics for Computing",
      "Software Engineering Methodologies"
    ],
    academicInterests: [
      "Computational Complexity & Algorithm Optimization",
      "Mathematical Foundations of Machine Learning & Neural Networks",
      "Real-Time Graphics & Game Physics Simulation",
      "Distributed Systems & Fault-Tolerant Backend Architecture"
    ],
    highlights: [
      "Synthesizing pure mathematical logic with pragmatic software engineering",
      "Active participant in University of Ghana developer community sessions",
      "Peer problem-solver for complex algorithmic and calculus problem sets"
    ]
  },
  exploring: [
    {
      id: "exp-ai",
      title: "Artificial Intelligence & Neural Networks",
      subtitle: "Mathematical modeling of intelligence",
      description: "Delving deeper into tensor calculus, backpropagation mechanics, attention architectures, and transformer math.",
      focusArea: "Deep Learning Foundations",
      icon: "Cpu"
    },
    {
      id: "exp-ml",
      title: "Machine Learning in Practice",
      subtitle: "Statistical inference & real-world predictive models",
      description: "Experimenting with supervised classifiers, regression models, scikit-learn, and model deployment strategies.",
      focusArea: "Applied Machine Learning",
      icon: "Binary"
    },
    {
      id: "exp-java",
      title: "Advanced Java & Concurrency",
      subtitle: "Multithreading & memory models",
      description: "Mastering Java virtual machine internals, memory optimization, lock-free data structures, and asynchronous pipelines.",
      focusArea: "Systems & Concurrency",
      icon: "Coffee"
    },
    {
      id: "exp-dsa",
      title: "Competitive DSA & Advanced Graphs",
      subtitle: "Algorithmic mastery & asymptotic limits",
      description: "Tackling hard dynamic programming, segment trees, union-find algorithms, and network flow problems.",
      focusArea: "Problem Solving",
      icon: "GitBranch"
    },
    {
      id: "exp-backend",
      title: "Distributed Backend Architecture",
      subtitle: "Fault tolerance & high-availability",
      description: "Studying event sourcing, CQRS patterns, message queues (Kafka/RabbitMQ), and database partitioning strategies.",
      focusArea: "Cloud & Distributed Systems",
      icon: "Server"
    },
    {
      id: "exp-gamedev",
      title: "Game Engine Mechanics & Physics",
      subtitle: "Real-time interactive rendering",
      description: "Exploring WebGL fragment shaders, 2D/3D physics collision manifolds, raymarching, and spatial partitioning.",
      focusArea: "Game Tech & WebGL",
      icon: "Sparkles"
    },
    {
      id: "exp-math",
      title: "Advanced Discrete Mathematics",
      subtitle: "Graph theory, combinatorics & number theory",
      description: "Applying rigorous mathematical proofs to algorithm correctness, cryptographic primitives, and computational bounds.",
      focusArea: "Pure & Applied Mathematics",
      icon: "Sigma"
    }
  ],
  articles: [
    {
      id: "art-1",
      slug: "lessons-from-building-my-first-web-application",
      title: "Lessons From Building My First Web Application",
      summary: "What moving beyond tutorial code taught me about state management, unexpected race conditions, and writing code for real people.",
      content: [
        "Every developer remembers the moment their code transitions from controlled classroom exercises into a live application that real human beings interact with. When I started building my first major project, I thought knowing the syntax was 80% of the battle. I quickly learned syntax is merely the vocabulary; communication, architecture, and resilience are the actual conversation.",
        "One of the biggest eye-openers was state synchronization. In local test environments, network latency is effectively zero and user inputs arrive in polite sequential order. In the real world, users double-tap buttons, connection drops midway through requests, and mobile viewports expose subtle CSS layout assumptions.",
        "I had to shift from thinking 'does this function work?' to 'what happens when this network request fails halfway through?' Embracing optimistic UI updates, defensive error envelopes, and clear feedback states transformed not just my code, but my mindset as an aspiring engineer.",
        "The most lasting lesson was empathy for the user. Clean code is beautiful, but software exists to solve a human need. If an interface causes confusion during a stressful moment, the most elegant algorithm in the world has failed its primary objective."
      ],
      date: "March 2026",
      readTime: "5 min read",
      category: "Software Engineering",
      tags: ["Web Development", "Engineering Mindset", "Architecture", "Lessons"],
      published: true
    },
    {
      id: "art-2",
      slug: "how-im-approaching-ai-as-a-computer-science-student",
      title: "How I'm Approaching AI as a Computer Science Student",
      summary: "Why understanding the linear algebra and calculus under the hood matters far more than just calling pre-trained APIs.",
      content: [
        "In the current tech landscape, it is easy to be dazzled by the rapid influx of generative AI tools and assume that software development is simply becoming an exercise in API orchestration. But as a student studying both Computer Science and Mathematics, I believe the true advantage lies in understanding the mathematical mechanics beneath the abstraction.",
        "When you strip away the marketing, a neural network is an elaborate optimization problem over a high-dimensional loss surface. Concepts like gradient descent, partial derivatives, eigenvalues, and matrix multiplication aren't arbitrary academic hurdles; they are the literal language of machine intelligence.",
        "By writing toy neural networks from scratch in Python and inspecting the weight matrices during backpropagation, I discovered that training failures are rarely mysterious bugs. They are vanishing gradients, suboptimal learning rates, or poorly conditioned covariance matrices. Mathematics demystifies the black box.",
        "My goal isn't just to consume AI tools, but to understand their algorithmic constraints, their memory requirements, and their theoretical bounds so that I can build intelligent systems that are reliable, performant, and accountable."
      ],
      date: "February 2026",
      readTime: "6 min read",
      category: "Artificial Intelligence",
      tags: ["AI", "Mathematics", "Machine Learning", "Computer Science"],
      published: true
    },
    {
      id: "art-3",
      slug: "why-mathematics-matters-in-computer-science",
      title: "Why Mathematics Matters in Computer Science",
      summary: "Reflections on how proof techniques, graph theory, and discrete math sharpen your software engineering intuition.",
      content: [
        "There is a persistent debate in online developer communities about whether software engineers actually need mathematics. Having spent the last two years immersed in both disciplines at the University of Ghana, my answer is unequivocal: mathematics is the gym for engineering intuition.",
        "Writing a mathematical proof forces you to account for every single edge case, every boundary condition, and every assumption before claiming a proposition is true. Is that not the exact discipline required to write secure, bug-free production software?",
        "When you study graph theory, routing problems on a campus map or dependency resolution in a package manager cease to be novel puzzles; they become familiar variations of topological sorting and shortest-path trees. When you study discrete probability, caching strategies and randomized algorithms suddenly make intuitive sense.",
        "Mathematics teaches you not just how to calculate, but how to abstract. And abstraction is the primary tool software engineers use to build complex, manageable systems."
      ],
      date: "January 2026",
      readTime: "7 min read",
      category: "Mathematics",
      tags: ["Mathematics", "Algorithms", "Logic", "Computer Science"],
      published: true
    },
    {
      id: "art-4",
      slug: "building-software-that-solves-real-problems",
      title: "Building Software That Solves Real Problems",
      summary: "Moving from toy projects to meaningful community impact: the philosophy behind projects like PulseCare.",
      content: [
        "It is tempting as a student developer to build yet another generic todo list or clone of an existing social network. While these exercises are great for learning basic syntax, they rarely test your problem-solving capacity because the requirements are already pre-solved.",
        "When I set out to architect PulseCare, the motivation came from a real, palpable frustration in our communities: watching relatives travel from pharmacy to pharmacy under scorching sun or late at night looking for specific medication that may not even be in stock.",
        "Real problems come with messy realities. Internet connectivity isn't always reliable. Data formats vary wildly between independent shops. Users may not be tech-savvy. Addressing these real-world constraints demands thoughtful engineering: offline-first architectures, clear typography, and zero extraneous steps between the user and their solution.",
        "Software engineering at its best is service. When you build with genuine human empathy, every line of code carries purpose."
      ],
      date: "December 2025",
      readTime: "5 min read",
      category: "Product & Impact",
      tags: ["Product Design", "Healthcare", "Community", "Engineering"],
      published: true
    }
  ],
  gallery: [
    {
      id: "gal-1",
      title: "University of Ghana Great Hall",
      caption: "The iconic architectural landmark of Legon campus where academic ceremonies and milestones take place.",
      category: "University",
      date: "2025",
      location: "Legon Campus, Accra"
    },
    {
      id: "gal-2",
      title: "PulseCare Architecture Blueprint",
      caption: "Early whiteboard system design exploring database caching layers and real-time pharmacy inventory sync.",
      category: "Projects",
      date: "2026",
      location: "Computer Science Lab"
    },
    {
      id: "gal-3",
      title: "Balme Library Study Session",
      caption: "Deep focus hours diving into multi-variable calculus problem sets and discrete mathematics proofs.",
      category: "University",
      date: "2025",
      location: "Balme Library, Legon"
    },
    {
      id: "gal-4",
      title: "Campus Developer Hackathon",
      caption: "Collaborating with fellow student engineers to build campus accessibility and logistics tools.",
      category: "Events",
      date: "2025",
      location: "Department of Computer Science"
    },
    {
      id: "gal-5",
      title: "Neural Network Visualization Rig",
      caption: "Interactive real-time decision boundary testbench developed for NeuroGraph AI engine.",
      category: "Technology",
      date: "2025",
      location: "Workstation"
    },
    {
      id: "gal-6",
      title: "Academic Honor Distinction",
      caption: "Recognition for academic excellence in foundational computer science and mathematics coursework.",
      category: "Achievements",
      date: "2025",
      location: "University of Ghana"
    }
  ],
  certificates: [
    {
      id: "cert-1",
      title: "Academic Excellence Distinction",
      organization: "University of Ghana",
      issueDate: "2025",
      description: "Recognized for exemplary academic standing across Computer Science and Mathematics departmental coursework.",
      type: "Academic",
      credentialUrl: "https://ug.edu.gh"
    },
    {
      id: "cert-2",
      title: "Campus Innovation Hackathon Finalist",
      organization: "Google Developer Student Clubs (GDSC UG)",
      issueDate: "2025",
      description: "Selected as a finalist for designing an algorithmic campus venue navigation and timetable synchronization system.",
      type: "Competition"
    },
    {
      id: "cert-3",
      title: "Data Structures & Algorithmic Problem Solving",
      organization: "Computer Science Specialization",
      issueDate: "2025",
      description: "Demonstrated advanced proficiency in graph theory, dynamic programming, and asymptotic complexity analysis.",
      type: "Certificate",
      credentialId: "DSA-UG-2025-EO"
    },
    {
      id: "cert-4",
      title: "Full-Stack Web Development & Modern Architecture",
      organization: "Professional Engineering Program",
      issueDate: "2024",
      description: "Comprehensive mastery of React, Node.js, relational database modeling, and RESTful API standards.",
      type: "Certificate",
      credentialId: "FS-ARCH-2024-91"
    }
  ],
  messages: [
    {
      id: "msg-welcome",
      name: "Dr. K. Mensah",
      email: "kmensah@ug.edu.gh",
      subject: "Collaboration on Algorithmic Logistics Research",
      message: "Impressive work on the campus navigation graph project! Let's discuss expanding the graph optimization model for university-wide logistical planning next semester.",
      createdAt: "2026-03-12T10:30:00.000Z",
      read: true
    }
  ],
  thinkingSteps: [
    {
      step: 1,
      label: "IDEA",
      tagline: "Pinpoint Real Inefficiencies",
      description: "Observe daily friction points in human workflows and formulate a precise hypothesis of how software can solve it.",
      execution: "Identify the exact bottleneck, define user personas, and frame the problem mathematically before writing any code."
    },
    {
      step: 2,
      label: "RESEARCH",
      tagline: "Explore Prior Art & Algorithmic Bounds",
      description: "Investigate theoretical foundations, study existing implementations, and evaluate algorithmic time/space trade-offs.",
      execution: "Map out data flow requirements, query complexity (Big-O), and architectural paradigms suited to the problem."
    },
    {
      step: 3,
      label: "DESIGN",
      tagline: "Architecture & User Experience",
      description: "Craft clear component boundaries, relational database schemas, and intuitive Figma wireframes.",
      execution: "Establish typography, accessibility contracts, responsive breakpoints, and REST/GraphQL API specifications."
    },
    {
      step: 4,
      label: "BUILD",
      tagline: "Disciplined Modular Engineering",
      description: "Write clean, type-safe, maintainable code with strict separation of concerns and reusable component abstractions.",
      execution: "Implement incrementally with Git versioning, type safety in TypeScript, and robust database constraints."
    },
    {
      step: 5,
      label: "TEST",
      tagline: "Defensive Verification & Edge Cases",
      description: "Stress-test edge cases, handle network latency gracefully, and verify accessibility across varied screen sizes.",
      execution: "Audit against unexpected inputs, race conditions, WCAG AA contrast standards, and mobile interaction limits."
    },
    {
      step: 6,
      label: "IMPROVE",
      tagline: "Continuous Iteration & Measurement",
      description: "Gather real user feedback, inspect performance bottlenecks, optimize bundle sizes, and refine features.",
      execution: "Refactor based on empirical behavior, monitor query latency, and continuously elevate the polish bar."
    }
  ]
};
