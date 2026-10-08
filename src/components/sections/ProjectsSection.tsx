import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectCategory, Project } from '../../types/portfolio';
import { ExternalLink, Github, Figma, ArrowUpRight, BookOpen, Sparkles } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data, openProjectModal } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');

  const filters: ProjectCategory[] = ['All', 'Web', 'AI', 'Backend', 'UI/UX', 'University'];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return data.projects;
    return data.projects.filter(p => p.category === activeFilter);
  }, [data.projects, activeFilter]);

  const featuredProjects = useMemo(() => {
    return filteredProjects.filter(p => p.featured);
  }, [filteredProjects]);

  const regularProjects = useMemo(() => {
    return filteredProjects.filter(p => !p.featured);
  }, [filteredProjects]);

  return (
    <section id="projects" className="py-24 px-6 md:px-10 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>04</span>
            <span className="text-slate-600">/</span>
            <span>PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Things I've built.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            A selection of projects, experiments, systems, and university engineering work.
          </p>
        </div>

        {/* Filter Bar (Functional interactive buttons) */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-xl overflow-x-auto no-scrollbar">
          {filters.map(filter => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Projects - Large Horizontal Case-Study Layout */}
      {featuredProjects.length > 0 && (
        <div className="space-y-8 mb-12">
          {featuredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="group relative rounded-3xl glass-panel border border-white/10 hover:border-cyan-400/40 transition-all duration-300 overflow-hidden p-6 sm:p-8 lg:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Text Content */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata Header */}
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
                      <span>Featured 0{idx + 1}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-400">{project.category}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-500">{project.date}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-cyan-400/90 mb-4">
                      {project.subtitle}
                    </p>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Unboxed tech stack text */}
                    <div className="text-xs text-slate-400 font-mono mb-6">
                      <span className="text-slate-500 uppercase tracking-wider text-[11px] block mb-1">
                        Architecture & Stack
                      </span>
                      <span className="text-slate-300">
                        {project.technologies.join('  ·  ')}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => openProjectModal(project.id)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white font-medium text-xs sm:text-sm transition-all duration-200 group/btn"
                    >
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                        title="GitHub Code"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Frame: Stylized High-Fidelity Project Mockup / Blueprint */}
                <div
                  onClick={() => openProjectModal(project.id)}
                  className="lg:col-span-5 aspect-[16/10] rounded-2xl bg-gradient-to-br from-[#0c1527] via-[#091020] to-[#05070d] border border-white/10 p-5 flex flex-col justify-between cursor-pointer group-hover:border-cyan-400/40 transition-colors shadow-xl"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/[0.08] pb-2">
                    <span className="text-cyan-400">BUILD://{project.id}</span>
                    <span className="text-emerald-400">ACTIVE</span>
                  </div>

                  <div className="my-auto text-center p-4">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <div className="text-lg font-display font-bold text-white mb-1">
                      {project.title}
                    </div>
                    <div className="text-xs text-slate-400">
                      {project.role}
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-slate-500 flex items-center justify-between pt-2 border-t border-white/[0.06]">
                    <span>Click to open architectural breakdown</span>
                    <span className="text-cyan-400">View ↗</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid of Other Projects */}
      {regularProjects.length > 0 && (
        <div>
          <div className="text-xs uppercase tracking-wider font-mono text-slate-400 mb-6">
            Other Technical Projects & Experiments
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProjects.map(project => (
              <div
                key={project.id}
                className="group p-6 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                    <span className="text-cyan-400">{project.category}</span>
                    <span>{project.date}</span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-cyan-300/80 mb-3 font-medium">
                    {project.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="text-xs text-slate-400 font-mono mb-4 pt-3 border-t border-white/[0.06]">
                    {project.technologies.slice(0, 4).join(' · ')}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <button
                    onClick={() => openProjectModal(project.id)}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 group/btn"
                  >
                    <span>Read Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-400 hover:text-white transition-colors"
                        title="GitHub Repository"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-400 hover:text-white transition-colors"
                        title="Live Demo"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
