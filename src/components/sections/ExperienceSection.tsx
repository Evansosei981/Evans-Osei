import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="experience" className="py-24 px-6 md:px-10 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <span>05</span>
          <span className="text-slate-600">/</span>
          <span>JOURNEY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
          Experience & engineering trajectory.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
          Academic engineering leadership, team development, and technical experimentation.
        </p>
      </div>

      {/* Modern Vertical Timeline */}
      <div className="relative border-l border-white/10 ml-4 md:ml-32 pl-6 md:pl-10 space-y-12">
        {data.experiences.map((exp, idx) => (
          <div key={exp.id} className="relative group">
            {/* Glowing Timeline Node */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#07090e] border-2 border-cyan-400 group-hover:border-cyan-300 group-hover:scale-125 transition-all duration-300 shadow-sm shadow-cyan-400/50" />

            {/* Desktop Period Tag left of timeline */}
            <div className="md:absolute md:-left-40 md:top-1 text-xs font-mono text-cyan-400/80 mb-2 md:mb-0 md:w-28 md:text-right">
              {exp.period}
            </div>

            {/* Content Card */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-400/30 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {exp.title}
                </h3>
              </div>

              {/* Unboxed Metadata Line */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-mono mb-4">
                <span className="text-slate-300">{exp.role}</span>
                <span className="text-slate-600">·</span>
                <span>{exp.organization}</span>
                <span className="text-slate-600">·</span>
                <span>{exp.location}</span>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                {exp.description}
              </p>

              {/* Bullet Points */}
              <div className="space-y-2.5 mb-6">
                {exp.points.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <span className="text-cyan-400 mt-1 font-mono text-xs">▹</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Tags - Unboxed text with typographic separators */}
              <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-slate-400">
                <span className="text-slate-500 mr-2">Focus:</span>
                <span>{exp.tags.join(' · ')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
