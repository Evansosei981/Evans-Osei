import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { GalleryProject } from '../types/portfolio';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Layers, 
  Grid, 
  ChevronRight, 
  ChevronLeft, 
  Code2, 
  Cpu, 
  Activity, 
  Compass, 
  Terminal 
} from 'lucide-react';

interface WorkGallerySectionProps {
  projects: GalleryProject[];
  onOpenProjectDetail: (project: GalleryProject) => void;
  onOpenArchive: () => void;
}

// Fallback project cards in case of empty props
const DEFAULT_PROJECT_CARDS: GalleryProject[] = [
  {
    id: "pulsecare",
    title: "PulseCare - Digital Healthcare & Pharmacy Discovery Platform",
    description: "A centralized digital healthcare engine connecting patients with licensed pharmacies across Ghana. Features real-time prescription inventory verification, geolocation dispensary search, and secure order reservations to eliminate medicine shortages during emergencies.",
    badge: "Featured HealthTech",
    category: "Full-Stack Web & HealthTech",
    technologies: ["React", "TypeScript", "Node.js", "Firebase", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format&fit=crop&q=80",
    githubUrl: "https://github.com/evans-osei/pulsecare",
    liveUrl: "https://pulsecare-demo.web.app",
    accentColor: "#2563eb",
    mockupType: "dashboard",
    stats: [
      { label: "Search Latency", value: "< 180ms" },
      { label: "Pharmacies", value: "45+ Verified" },
      { label: "Stock Accuracy", value: "99.4%" }
    ],
    features: [
      "Real-time pharmacy prescription inventory lookup with geolocated proximity search",
      "Direct verified pharmacist chat and prescription verification gateway",
      "Offline-first caching architecture for intermittent mobile cellular networks"
    ]
  },
  {
    id: "ug-campus-nav",
    title: "UG Campus Navigator - Walkway Graph Dijkstra Router",
    description: "An algorithmic campus navigation engine for University of Ghana, Legon. Models campus pedestrian walkways, lecture theaters (CCB, JQB, Balme Library, Math Department), and facilities as an undirected weighted graph to calculate optimal, shade-optimized walking routes.",
    badge: "Algorithm Capstone",
    category: "Graph Theory & Campus Tech",
    technologies: ["TypeScript", "React", "Graph Algorithms", "Canvas API", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&auto=format&fit=crop&q=80",
    githubUrl: "https://github.com/evans-osei/ug-campus-nav",
    liveUrl: "https://ug-navigator.demo",
    accentColor: "#059669",
    mockupType: "terminal",
    stats: [
      { label: "Graph Nodes", value: "140+ Points" },
      { label: "Route Calc", value: "< 12ms" },
      { label: "Time Saved", value: "~18 min/day" }
    ],
    features: [
      "Client-side Dijkstra and A* pathfinding running on vectorized campus coordinates",
      "Automated lecture transition timetable with route duration and pace recommendations",
      "Interactive high-contrast vector map covering study zones and examination halls"
    ]
  },
  {
    id: "neurograph-ai",
    title: "NeuroGraph AI - Neural Network & Loss Curve Workbench",
    description: "An educational machine learning workbench that visualizes multi-layer perceptron training loops, backpropagation, and matrix calculus in real time. Enables students to adjust hidden layers, learning rates, and activation functions while observing decision boundaries adapt dynamically.",
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
      "Mathematical formula breakdowns corresponding to active neuron weights and biases"
    ]
  },
  {
    id: "chronoforge-game",
    title: "ChronoForge 2D - Experimental WebGL Physics & Game Engine",
    description: "A lightweight 2D game architecture featuring custom Separating Axis Theorem (SAT) collision detection, rigid-body momentum conservation, particle dynamics, and spatial partitioning algorithms built from scratch without bulky external physics engines.",
    badge: "Game Dev & Math",
    category: "Interactive Physics & Graphics",
    technologies: ["TypeScript", "WebGL", "Canvas 2D", "SAT Collision", "Vector Math"],
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80",
    githubUrl: "https://github.com/evans-osei/chronoforge-2d",
    liveUrl: "https://chronoforge.demo",
    accentColor: "#ea580c",
    mockupType: "card-deck",
    stats: [
      { label: "Physics Tick", value: "120 Hz" },
      { label: "Sim. Particles", value: "5,000+" },
      { label: "Collision Check", value: "O(n log n)" }
    ],
    features: [
      "Custom Separating Axis Theorem (SAT) collision resolution for convex polygons",
      "Spatial grid partitioning algorithm reducing collision complexity at scale",
      "Dynamic particle emitter with gravity wells and velocity vectors"
    ]
  },
  {
    id: "sikatrack",
    title: "SikaTrack - Mobile Money (MoMo) & Cashflow Analytics",
    description: "A tailored personal finance and expense analytics engine designed for the Ghanaian financial landscape, featuring smart categorizers for MTN MoMo and Vodafone Cash SMS notifications, budget forecasting, and interactive financial health scores.",
    badge: "FinTech & Utilities",
    category: "FinTech & Analytics",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Web Crypto"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
    githubUrl: "https://github.com/evans-osei/sikatrack",
    liveUrl: "https://sikatrack.demo",
    accentColor: "#0284c7",
    mockupType: "dashboard",
    stats: [
      { label: "MoMo Parsers", value: "99.8% Acc" },
      { label: "Privacy", value: "100% Client-side" },
      { label: "Charts", value: "Monthly Trends" }
    ],
    features: [
      "Smart regex parsing engine for Mobile Money SMS transaction alerts",
      "Client-side encrypted vault ensuring sensitive financial records never leave the device",
      "Automated spending categorization with monthly cashflow burn-rate forecasts"
    ]
  },
  {
    id: "docutrack-ug",
    title: "DocuTrack UG - Academic Document & Transcript Clearance Pipeline",
    description: "A multi-stage document workflow and clearance verification portal for university departments, allowing students to trace transcript requests, grade dispute resolutions, and dean recommendations with cryptographic verification timestamps.",
    badge: "Systems & Security",
    category: "Full-Stack Web & University Systems",
    technologies: ["TypeScript", "Next.js", "PostgreSQL", "Tailwind CSS", "PDFKit"],
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&auto=format&fit=crop&q=80",
    githubUrl: "https://github.com/evans-osei/docutrack-ug",
    liveUrl: "https://docutrack.demo",
    accentColor: "#0d9488",
    mockupType: "terminal",
    stats: [
      { label: "Clearance Time", value: "-70% Hours" },
      { label: "Audit Log", value: "Tamper-Evident" },
      { label: "Departments", value: "8 Connected" }
    ],
    features: [
      "Role-based clearance signoffs for Department Heads, Exams Officers, and Registrars",
      "Instant SMS/Email notification dispatch upon status progression",
      "Cryptographically signed verification QR codes on student clearance slips"
    ]
  }
];

export function WorkGallerySection({
  projects,
  onOpenProjectDetail,
  onOpenArchive,
}: WorkGallerySectionProps) {
  const { isDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Guarantee actual project cards even if parent state was empty
  const projectList = (projects && projects.length > 0) ? projects : DEFAULT_PROJECT_CARDS;

  // Staggered scroll-in view observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = ['All', 'HealthTech', 'Algorithms', 'AI / ML', 'Game Dev & Physics', 'FinTech'];

  const filteredProjects = projectList.filter((proj) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'HealthTech') return proj.category.includes('Health') || proj.title.includes('Pulse');
    if (activeCategory === 'Algorithms') return proj.category.includes('Graph') || proj.title.includes('Navigator');
    if (activeCategory === 'AI / ML') return proj.category.includes('Machine') || proj.title.includes('Neuro');
    if (activeCategory === 'Game Dev & Physics') return proj.category.includes('Physics') || proj.title.includes('Chrono');
    if (activeCategory === 'FinTech') return proj.category.includes('FinTech') || proj.title.includes('Sika');
    return true;
  });

  const activeCarouselProject = filteredProjects[carouselIndex] || filteredProjects[0] || projectList[0];

  return (
    <section 
      id="work" 
      ref={sectionRef}
      className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-500 ${
        isDarkMode ? 'text-white' : 'text-neutral-900'
      }`}
    >
      {/* 1. SECTION HEADER ROW */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className={`text-[11px] font-mono tracking-[0.25em] uppercase font-bold ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              SELECTED WORK
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Featured Systems &amp; Projects
          </h2>
          <p className={`mt-2 text-sm sm:text-base max-w-2xl font-normal leading-relaxed ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Production web platforms, graph pathfinding engines, and machine learning visualizers built by Evans Osei.
          </p>
        </div>

        {/* View Mode Toggle + View Archive Button */}
        <div className="flex items-center gap-3">
          {/* Mode Switcher */}
          <div className={`p-1 rounded-xl flex items-center border ${
            isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
          }`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
                viewMode === 'grid'
                  ? isDarkMode ? 'bg-neutral-800 text-white shadow-sm' : 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="Grid of project cards"
            >
              <Grid size={14} />
              <span>Cards Grid</span>
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
                viewMode === 'carousel'
                  ? isDarkMode ? 'bg-neutral-800 text-white shadow-sm' : 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="3D Coverflow presentation"
            >
              <Layers size={14} />
              <span>3D Deck</span>
            </button>
          </div>

          {/* View More Archive Button */}
          <button
            onClick={onOpenArchive}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 shadow-sm ${
              isDarkMode 
                ? 'border-neutral-700 bg-neutral-900 text-white hover:bg-white hover:text-black hover:border-white' 
                : 'border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white hover:border-neutral-900'
            }`}
          >
            <span>All Projects</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* 2. CATEGORY FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCarouselIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              activeCategory === cat
                ? isDarkMode
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-neutral-900 text-white font-semibold shadow-md'
                : isDarkMode
                  ? 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  : 'bg-neutral-100 text-neutral-600 hover:text-black border border-neutral-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. ACTUAL PROJECT CARDS GRID (Populated with images, titles, descriptions, links, and staggered fade-in) */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            return (
              <div
                key={project.id}
                style={{
                  animationDelay: `${index * 120}ms`
                }}
                className={`group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${
                  isDarkMode 
                    ? 'bg-[#121214] border-neutral-800/90 hover:border-neutral-600 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
                    : 'bg-white border-neutral-200 hover:border-neutral-400 shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
                }`}
                onClick={() => onOpenProjectDetail(project)}
              >
                {/* Card Image Area with Zoom effect and Overlay Badges */}
                <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-neutral-950">
                  <img
                    src={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80'}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md bg-black/60 text-white border border-white/20 shadow-sm">
                      {project.badge || 'Engineering'}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>

                  {/* Bottom Category Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-neutral-300 font-semibold drop-shadow">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight line-clamp-1 group-hover:text-blue-400 transition-colors duration-200">
                      {project.title.split(' - ')[0]}
                    </h3>

                    {/* Subtitle / Tagline */}
                    <p className={`text-xs font-mono font-medium mt-1 mb-2.5 line-clamp-1 ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      {project.title.split(' - ')[1] || project.category}
                    </p>

                    {/* Short Description */}
                    <p className={`text-xs sm:text-sm line-clamp-3 leading-relaxed ${
                      isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
                    }`}>
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack pills & Links Footer */}
                  <div className="mt-5 pt-4 border-t border-inherit">
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                            isDarkMode
                              ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
                              : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[10px] font-mono text-neutral-500">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Card Actions (Link & Case Study) */}
                    <div className="flex items-center justify-between text-xs font-semibold pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenProjectDetail(project);
                        }}
                        className={`hover:underline flex items-center gap-1 cursor-pointer ${
                          isDarkMode ? 'text-white' : 'text-neutral-900'
                        }`}
                      >
                        <span>Case Study</span>
                        <ChevronRight size={13} />
                      </button>

                      <div className="flex items-center gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`p-1.5 rounded-lg border transition-all duration-200 transform hover:scale-110 ${
                              isDarkMode
                                ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600'
                                : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:text-black hover:border-neutral-400'
                            }`}
                            title="GitHub Repository"
                          >
                            <Github size={13} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`p-1.5 rounded-lg border transition-all duration-200 transform hover:scale-110 ${
                              isDarkMode
                                ? 'bg-blue-950/40 border-blue-800/60 text-blue-300 hover:text-blue-100 hover:border-blue-600'
                                : 'bg-blue-50 border-blue-200 text-blue-700 hover:text-blue-900 hover:border-blue-300'
                            }`}
                            title="Live Demo"
                          >
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 4. 3D COVERFLOW PRESENTATION */
        <div className="relative w-full flex flex-col items-center">
          <div className="relative w-full max-w-4xl h-[340px] sm:h-[400px] flex items-center justify-center perspective-[1200px]">
            {filteredProjects.map((proj, idx) => {
              const offset = idx - carouselIndex;
              const isCenter = offset === 0;
              const isLeft = offset === -1 || (offset > 1 && offset === -(filteredProjects.length - 1));
              const isRight = offset === 1 || (offset < -1 && offset === (filteredProjects.length - 1));
              
              let transform = '';
              let zIndex = 0;
              let opacity = 0;
              let pointerEvents = 'none';

              if (isCenter) {
                transform = 'translateX(0%) scale(1) translateZ(60px) rotateY(0deg)';
                zIndex = 30;
                opacity = 1;
                pointerEvents = 'auto';
              } else if (isLeft) {
                transform = 'translateX(-45%) scale(0.85) translateZ(-40px) rotateY(18deg)';
                zIndex = 20;
                opacity = 0.65;
                pointerEvents = 'auto';
              } else if (isRight) {
                transform = 'translateX(45%) scale(0.85) translateZ(-40px) rotateY(-18deg)';
                zIndex = 20;
                opacity = 0.65;
                pointerEvents = 'auto';
              } else {
                transform = 'translateX(0%) scale(0.6) translateZ(-160px)';
                zIndex = 5;
                opacity = 0;
              }

              return (
                <div
                  key={proj.id}
                  onClick={() => {
                    if (isCenter) onOpenProjectDetail(proj);
                    else setCarouselIndex(idx);
                  }}
                  className={`absolute w-[290px] sm:w-[380px] md:w-[440px] h-[260px] sm:h-[320px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-out cursor-pointer select-none border ${
                    isDarkMode ? 'bg-[#151518] border-neutral-700' : 'bg-white border-neutral-300'
                  }`}
                  style={{
                    transform,
                    zIndex,
                    opacity,
                    pointerEvents: pointerEvents as any,
                  }}
                >
                  <div className="relative w-full h-full flex flex-col">
                    <img
                      src={proj.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80'}
                      alt={proj.title}
                      className="w-full h-1/2 object-cover object-center"
                    />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                          <span className="text-blue-400 font-bold uppercase">{proj.badge}</span>
                          <span className="text-neutral-500">{proj.category}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold line-clamp-1">{proj.title}</h4>
                        <p className="text-xs text-neutral-400 line-clamp-2 mt-1">{proj.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-inherit text-xs">
                        <span className="text-neutral-500 font-mono text-[10px]">Click to inspect case study</span>
                        <span className="font-semibold text-blue-400 flex items-center gap-0.5">
                          Open <ArrowUpRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setCarouselIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1))}
              className={`p-2.5 rounded-full border transition-all duration-200 cursor-pointer transform hover:scale-110 active:scale-95 ${
                isDarkMode ? 'border-neutral-700 bg-neutral-900 text-white' : 'border-neutral-300 bg-white text-neutral-900'
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs font-mono text-neutral-500">
              {carouselIndex + 1} / {filteredProjects.length}
            </span>
            <button
              onClick={() => setCarouselIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0))}
              className={`p-2.5 rounded-full border transition-all duration-200 cursor-pointer transform hover:scale-110 active:scale-95 ${
                isDarkMode ? 'border-neutral-700 bg-neutral-900 text-white' : 'border-neutral-300 bg-white text-neutral-900'
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
