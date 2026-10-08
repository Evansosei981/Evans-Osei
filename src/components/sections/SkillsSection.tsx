import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SkillCategory } from '../../types/portfolio';
import {
  Code2,
  Coffee,
  FileCode,
  Database,
  Layout,
  Palette,
  Atom,
  Server,
  Network,
  Flame,
  Zap,
  HardDrive,
  Layers,
  GitBranch,
  Github,
  Framer,
  Box,
  Smartphone,
  Terminal,
  Cpu,
  Binary,
  GitFork,
  Sparkles,
  Wrench,
  Search,
  Filter
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  Coffee,
  FileCode,
  Database,
  Layout,
  Palette,
  Atom,
  Server,
  Network,
  Flame,
  Zap,
  HardDrive,
  Layers,
  GitBranch,
  Github,
  Framer,
  Box,
  Smartphone,
  Terminal,
  Cpu,
  Binary,
  GitFork,
  Sparkles,
  Wrench,
};

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ('All' | SkillCategory)[] = [
    'All',
    'Programming',
    'Web Development',
    'Backend & Database',
    'Tools',
    'Concepts'
  ];

  const filteredSkills = useMemo(() => {
    return data.skills.filter(skill => {
      const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.context.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [data.skills, activeCategory, searchQuery]);

  return (
    <section id="skills" className="py-24 px-6 md:px-10 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>03</span>
            <span className="text-slate-600">/</span>
            <span>CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Technical skills.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            A practical toolkit built through continuous problem-solving, university coursework, and real-world system implementations.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search skills & tools..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map(cat => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-transparent'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSkills.map(skill => {
          const Icon = ICON_MAP[skill.icon] || Code2;

          return (
            <div
              key={skill.id}
              className="group relative p-5 rounded-2xl glass-panel border border-white/[0.07] hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between"
            >
              {/* Subtle top indicator bar */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-cyan-400/40 group-hover:bg-cyan-950/30 flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5 text-slate-300 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300" />
                </div>
                {/* Quiet unboxed text metadata */}
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
                  {skill.category}
                </span>
              </div>

              <div>
                <h3 className="text-base font-display font-bold text-white group-hover:text-cyan-200 transition-colors mb-2">
                  {skill.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {skill.description}
                </p>
              </div>

              {/* Context application note */}
              <div className="pt-3 border-t border-white/[0.06] mt-2">
                <div className="text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors leading-normal flex items-start gap-1.5">
                  <span className="text-cyan-400/80 font-mono text-[10px] mt-0.5">↳</span>
                  <span>{skill.context}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="p-12 text-center rounded-2xl border border-dashed border-white/10">
          <p className="text-slate-400 text-sm">No skills matching "{searchQuery}".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="mt-3 text-xs text-cyan-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
};
