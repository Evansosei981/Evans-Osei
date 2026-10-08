import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, Terminal, Activity, Compass, Cpu, Layers, GitBranch, Database } from 'lucide-react';

interface MarqueeCardData {
  tag: string;
  title: string;
  subtitle: string;
  category: string;
  stat: string;
  accentColor: string;
  icon: React.ElementType;
  motionGifUrl: string;
}

const EVANS_PROJECT_TILES: MarqueeCardData[] = [
  {
    tag: 'HEALTHCARE · WEB',
    title: 'PulseCare Platform',
    subtitle: 'Geo-located pharmacy medicine inventory & verified dispensaries in Ghana',
    category: 'React · Firebase · Node',
    stat: '42+ Dispensaries',
    accentColor: '#38BDF8',
    icon: Activity,
    motionGifUrl: 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  },
  {
    tag: 'LOGISTICS · ALGORITHMS',
    title: 'UG Campus Navigator',
    subtitle: 'Graph theory pathfinding across University of Ghana lecture halls',
    category: 'A* & Dijkstra · Vector Canvas',
    stat: '510m Optimal Route',
    accentColor: '#818CF8',
    icon: Compass,
    motionGifUrl: 'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  },
  {
    tag: 'AI · MACHINE LEARNING',
    title: 'NeuroGraph Engine',
    subtitle: 'Real-time multi-layer perceptron gradient descent and loss visualizer',
    category: 'Python · WebGL · Calculus',
    stat: '60 FPS Convergence',
    accentColor: '#C084FC',
    icon: Cpu,
    motionGifUrl: 'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  },
  {
    tag: 'GAME TECH · SIMULATION',
    title: 'ChronoForge 2D',
    subtitle: 'Custom modular 2D physics engine with Separating Axis Theorem (SAT)',
    category: 'TypeScript · Canvas API',
    stat: 'O(N) Spatial Hash',
    accentColor: '#34D399',
    icon: Sparkles,
    motionGifUrl: 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  },
  {
    tag: 'BACKEND · FINANCIAL',
    title: 'LedgerFlow API',
    subtitle: 'Double-entry accounting microservice with row-level locks & ACID safety',
    category: 'PostgreSQL · Sequelize · Docker',
    stat: 'Zero Discrepancies',
    accentColor: '#F59E0B',
    icon: Database,
    motionGifUrl: 'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  },
  {
    tag: 'DESIGN · ACCESSIBILITY',
    title: 'Syntax Design System',
    subtitle: 'Dark-first, typography-driven component tokens for engineering tools',
    category: 'Figma · React · Tailwind',
    stat: 'WCAG AA Compliant',
    accentColor: '#F43F5E',
    icon: Layers,
    motionGifUrl: 'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  },
  {
    tag: 'ACADEMIA · RESEARCH',
    title: 'Discrete Math & Logic',
    subtitle: 'Proof techniques applied to software correctness and complexity bounds',
    category: 'University of Ghana, Legon',
    stat: 'BSc CS + Math',
    accentColor: '#38BDF8',
    icon: Terminal,
    motionGifUrl: 'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  },
  {
    tag: 'COMMUNITY · DEV',
    title: 'Campus Hackathon Finalist',
    subtitle: 'Algorithmic timetable transition optimizer and peer developer mentoring',
    category: 'Google DSC · Legon Chapter',
    stat: 'Campus Finalist',
    accentColor: '#A78BFA',
    icon: GitBranch,
    motionGifUrl: 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  },
];

// Tripled for seamless scrolling
const TRIPLED_ROW_1 = [...EVANS_PROJECT_TILES, ...EVANS_PROJECT_TILES, ...EVANS_PROJECT_TILES];
const TRIPLED_ROW_2 = [...EVANS_PROJECT_TILES].reverse().concat([...EVANS_PROJECT_TILES].reverse(), [...EVANS_PROJECT_TILES].reverse());

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(calculatedOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-4">
        {/* Row 1: Moves RIGHT on scroll (translateX(offset - 200)) */}
        <div
          className="flex gap-5 whitespace-nowrap"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {TRIPLED_ROW_1.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={`r1-${idx}`}
                href="#projects"
                className="w-[450px] h-[350px] shrink-0 rounded-3xl p-5 bg-gradient-to-br from-[#141416] via-[#101012] to-[#0A0A0C] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between shadow-2xl relative overflow-hidden group select-none block"
              >
                {/* Glow accent */}
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: item.accentColor }}
                />

                {/* Motion GIF Preview Frame */}
                <div className="relative w-full h-[160px] rounded-2xl overflow-hidden bg-black/60 border border-white/10 group-hover:border-white/20 transition-all mb-3 shrink-0">
                  <img
                    src={item.motionGifUrl}
                    alt={item.title}
                    className="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                    loading="lazy"
                  />
                  {/* Gradient shade over GIF */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-black/40" />

                  {/* Top Bar inside GIF Frame */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider text-slate-300">
                      <Icon className="w-3.5 h-3.5" style={{ color: item.accentColor }} />
                      <span>{item.tag}</span>
                    </div>

                    <span
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border bg-black/70 backdrop-blur-md"
                      style={{ borderColor: `${item.accentColor}60`, color: item.accentColor }}
                    >
                      {item.stat}
                    </span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="my-auto relative z-10 space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-wide text-white group-hover:text-cyan-200 transition-colors truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                {/* Footer Tag */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-white/10 pt-3 relative z-10 mt-auto">
                  <span className="truncate max-w-[280px]">{item.category}</span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Explore ↗
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Row 2: Moves LEFT on scroll (translateX(-(offset - 200))) */}
        <div
          className="flex gap-5 whitespace-nowrap"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {TRIPLED_ROW_2.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={`r2-${idx}`}
                href="#projects"
                className="w-[450px] h-[350px] shrink-0 rounded-3xl p-5 bg-gradient-to-br from-[#12141a] via-[#0E0F14] to-[#08080C] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between shadow-2xl relative overflow-hidden group select-none block"
              >
                {/* Glow accent */}
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: item.accentColor }}
                />

                {/* Motion GIF Preview Frame */}
                <div className="relative w-full h-[160px] rounded-2xl overflow-hidden bg-black/60 border border-white/10 group-hover:border-white/20 transition-all mb-3 shrink-0">
                  <img
                    src={item.motionGifUrl}
                    alt={item.title}
                    className="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                    loading="lazy"
                  />
                  {/* Gradient shade over GIF */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-black/40" />

                  {/* Top Bar inside GIF Frame */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider text-slate-300">
                      <Icon className="w-3.5 h-3.5" style={{ color: item.accentColor }} />
                      <span>{item.tag}</span>
                    </div>

                    <span
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border bg-black/70 backdrop-blur-md"
                      style={{ borderColor: `${item.accentColor}60`, color: item.accentColor }}
                    >
                      {item.stat}
                    </span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="my-auto relative z-10 space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-wide text-white group-hover:text-cyan-200 transition-colors truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                {/* Footer Tag */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-white/10 pt-3 relative z-10 mt-auto">
                  <span className="truncate max-w-[280px]">{item.category}</span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Explore ↗
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
