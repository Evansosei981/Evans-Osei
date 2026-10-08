import React, { useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, ExternalLink, Github, Figma, CheckCircle2, AlertTriangle, Lightbulb, UserCheck, Calendar } from 'lucide-react';

export const ProjectModal: React.FC = () => {
  const { data, activeModal, closeModal } = usePortfolio();

  const project = data.projects.find(p => p.id === activeModal.id);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  if (activeModal.type !== 'project' || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
      onClick={e => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="relative w-full max-w-4xl bg-[#090d16] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#090d16]/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Case Study
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 font-mono">{project.category}</span>
          </div>

          <button
            onClick={closeModal}
            className="p-2 text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] rounded-xl border border-white/10 transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-10 overflow-y-auto">
          {/* Title & Hero Overview */}
          <div>
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white">
                {project.title}
              </h2>
              <span className="text-xs text-slate-400 font-mono">Completed {project.date}</span>
            </div>
            <p className="text-base sm:text-lg text-cyan-200/90 font-medium">
              {project.subtitle}
            </p>

            {/* Unboxed Metadata Strip */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-4 pt-4 border-t border-white/10 font-mono">
              <span className="text-slate-300">Role: {project.role}</span>
              <span className="text-slate-600">/</span>
              <span>Stack: {project.technologies.join(' · ')}</span>
            </div>
          </div>

          {/* Action Links Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors shadow-lg shadow-cyan-500/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Live Demo</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-medium text-xs sm:text-sm transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}

            {project.figmaUrl && (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-medium text-xs sm:text-sm transition-colors"
              >
                <Figma className="w-4 h-4 text-purple-400" />
                <span>Figma System</span>
              </a>
            )}
          </div>

          {/* Full Overview Narrative */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Project Overview
            </h3>
            <p className="text-slate-200 text-base leading-relaxed">
              {project.fullOverview || project.description}
            </p>
          </div>

          {/* Problem vs Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-red-950/15 border border-red-500/20">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm mb-3">
                <AlertTriangle className="w-4 h-4" />
                <span>The Problem</span>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/15 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Engineering Solution</span>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Architectural Features */}
          <div>
            <h3 className="text-lg font-display font-bold text-white mb-4">
              Key Capabilities & Architecture
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3"
                >
                  <span className="font-mono text-xs text-cyan-400 mt-0.5">0{idx + 1}</span>
                  <span className="text-sm text-slate-300">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Challenges & Takeaways */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Technical Challenges</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.challenges}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-2">
                <Lightbulb className="w-4 h-4" />
                <span>What I Learned</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.learnings}
              </p>
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-6 sm:px-8 py-4 bg-[#07090e] border-t border-white/10 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Evans Osei · Case Study Archive</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
