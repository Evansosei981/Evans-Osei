import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Cpu, Binary, Coffee, GitBranch, Server, Sparkles, Sigma, Compass } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu,
  Binary,
  Coffee,
  GitBranch,
  Server,
  Sparkles,
  Sigma,
};

export const CurrentlyLearningSection: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto relative">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <span>07</span>
          <span className="text-slate-600">/</span>
          <span>FRONTIERS</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Currently exploring.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Active technical pursuits & deep-dive domains
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.exploring.map((topic, idx) => {
          const Icon = (topic.icon && ICON_MAP[topic.icon]) || Compass;

          return (
            <div
              key={topic.id}
              className="group p-5 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-400/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300/80 uppercase">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-base font-display font-bold text-white group-hover:text-cyan-200 transition-colors mb-1">
                  {topic.title}
                </h3>
                <p className="text-xs text-cyan-400/80 font-medium mb-3">
                  {topic.subtitle}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {topic.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Domain</span>
                <span className="text-slate-300">{topic.focusArea}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
