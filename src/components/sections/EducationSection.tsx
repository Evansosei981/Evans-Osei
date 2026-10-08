import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GraduationCap, BookOpen, Award, CheckCircle2 } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { data } = usePortfolio();
  const edu = data.education;

  return (
    <section id="education" className="py-20 px-6 md:px-10 max-w-7xl mx-auto relative">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <span>06</span>
          <span className="text-slate-600">/</span>
          <span>ACADEMIA</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Education & rigor.
        </h2>
      </div>

      <div className="p-8 sm:p-10 lg:p-12 rounded-3xl glass-panel border border-white/10 relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Degree & Institutional Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>

              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                {edu.period}
              </span>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                {edu.institution}
              </h3>
              <p className="text-base text-cyan-200/90 font-medium mb-4">
                {edu.degree}
              </p>

              {/* Unboxed Metadata Line */}
              <div className="text-xs text-slate-400 font-mono space-x-2 pb-6 border-b border-white/10">
                <span>{edu.location}</span>
                <span className="text-slate-600">·</span>
                <span className="text-emerald-400">{edu.standing}</span>
              </div>
            </div>

            {/* Academic Philosophy Note */}
            <div className="pt-6">
              <span className="text-xs uppercase tracking-wider font-mono text-slate-400 block mb-2">
                Academic Synergies
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Combining rigorous mathematical proof mechanisms with practical systems programming to build software that is both theoretically sound and highly performant.
              </p>
            </div>
          </div>

          {/* Right Column: Coursework Grid & Focus Areas */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-slate-400 mb-4">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Relevant Departmental Coursework</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {edu.coursework.map((course, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs sm:text-sm text-slate-200 flex items-center gap-2 hover:border-white/15 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-3">
                Core Academic Interests
              </div>
              <div className="space-y-2">
                {edu.academicInterests.map((interest, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <span className="text-cyan-400 font-mono mt-0.5">▹</span>
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
