import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { MapPin, GraduationCap, Code, Layers, Sparkles, BookOpen, UserCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({ projects: 0, tech: 0 });
  const sectionRef = useRef<HTMLElement | null>(null);

  const totalProjects = data.projects.length;
  const totalSkills = data.skills.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters
          const duration = 1200;
          const steps = 30;
          const stepTime = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            setCounts({
              projects: Math.round(progress * totalProjects),
              tech: Math.round(progress * totalSkills),
            });

            if (currentStep >= steps) {
              clearInterval(timer);
              setCounts({
                projects: totalProjects,
                tech: totalSkills,
              });
            }
          }, stepTime);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, totalProjects, totalSkills]);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 md:px-10 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <span>01</span>
          <span className="text-slate-600">/</span>
          <span>IDENTITY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
          A little about me.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Stylized Portrait & High-Tech Frame */}
        <div className="lg:col-span-5 relative group">
          <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/10 p-2 shadow-2xl">
            {/* Visual Portrait Frame Container */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-br from-[#0c1427] via-[#101b33] to-[#07090e] flex flex-col items-center justify-between p-6">
              {/* Subtle background tech matrix */}
              <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

              {/* Top ambient status tag */}
              <div className="relative z-10 w-full flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/[0.08] pb-3">
                <span className="text-cyan-400">EVANS_OSEI</span>
                <span>LEGON // GHANA</span>
              </div>

              {/* Avatar Center Graphic */}
              <div className="relative z-10 flex flex-col items-center text-center my-auto">
                <div className="relative w-36 h-36 rounded-2xl border-2 border-cyan-400/40 p-1.5 shadow-xl shadow-cyan-950/50 mb-5 bg-[#091122]">
                  {/* Inner stylized avatar element */}
                  <div className="w-full h-full rounded-xl bg-gradient-to-tr from-cyan-900/60 to-indigo-900/60 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    {/* Stylized Avatar Illustration */}
                    <svg viewBox="0 0 100 100" className="w-24 h-24 text-cyan-200">
                      <circle cx="50" cy="38" r="20" fill="currentColor" opacity="0.9" />
                      <path
                        d="M20 86 C20 66, 32 58, 50 58 C68 58, 80 66, 80 86 Z"
                        fill="currentColor"
                        opacity="0.9"
                      />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#091122] via-transparent to-transparent opacity-60" />
                  </div>

                  <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-cyan-500 text-[10px] font-mono font-bold text-slate-950 shadow-md">
                    CS + MATH
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-1">
                  {data.profile.name}
                </h3>
                <p className="text-xs text-slate-400 max-w-[240px]">
                  Software Developer · AI & Game Enthusiast
                </p>
              </div>

              {/* Bottom Quick Affordances */}
              <div className="relative z-10 w-full pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Builder
                </span>
                <span>University of Ghana</span>
              </div>
            </div>

            {/* Glowing corner brackets */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400/70" />
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400/70" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400/70" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400/70" />
          </div>
        </div>

        {/* Right Column: Biography & Dynamic Metric Cards */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-5 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            <p className="text-white font-medium text-lg sm:text-xl">
              {data.profile.bioParagraph1}
            </p>
            <p>
              {data.profile.bioParagraph2}
            </p>
            <p className="text-slate-400">
              {data.profile.bioParagraph3}
            </p>
          </div>

          {/* Dynamic Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10">
            {/* Stat 1: Education */}
            <div className="p-4 rounded-xl glass-panel border border-white/[0.08] hover:border-cyan-500/30 transition-colors">
              <GraduationCap className="w-5 h-5 text-cyan-400 mb-2" />
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Academic</div>
              <div className="text-sm font-semibold text-white mt-1 leading-snug">CS & Math</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Univ. of Ghana</div>
            </div>

            {/* Stat 2: Dynamic Project Count */}
            <div className="p-4 rounded-xl glass-panel border border-white/[0.08] hover:border-cyan-500/30 transition-colors">
              <Code className="w-5 h-5 text-indigo-400 mb-2" />
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Shipped</div>
              <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
                {counts.projects}+
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Projects & Tools</div>
            </div>

            {/* Stat 3: Dynamic Tech Count */}
            <div className="p-4 rounded-xl glass-panel border border-white/[0.08] hover:border-cyan-500/30 transition-colors">
              <Layers className="w-5 h-5 text-teal-400 mb-2" />
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Proficiency</div>
              <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
                {counts.tech}+
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Technologies</div>
            </div>

            {/* Stat 4: Location */}
            <div className="p-4 rounded-xl glass-panel border border-white/[0.08] hover:border-cyan-500/30 transition-colors">
              <MapPin className="w-5 h-5 text-rose-400 mb-2" />
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">Based in</div>
              <div className="text-sm font-semibold text-white mt-1 leading-snug">Ghana</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Accra / Legon</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
