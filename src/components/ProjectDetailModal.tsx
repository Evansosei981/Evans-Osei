import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { GalleryProject } from '../types/portfolio';
import { X, ExternalLink, Github, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react';

interface ProjectDetailModalProps {
  project: GalleryProject | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const { isDarkMode } = useTheme();

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto transition-colors ${
          isDarkMode ? 'bg-[#121212] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-500/10">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                isDarkMode ? 'bg-neutral-900 border-neutral-800 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}>
                {project.category}
              </span>
              {project.badge && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                  {project.badge}
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-2">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-500/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close project modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Overview */}
        <div className="mt-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
            System Overview
          </h4>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            {project.description}
          </p>
        </div>

        {/* Stats */}
        {project.stats && (
          <div className="mt-6 grid grid-cols-3 gap-3">
            {project.stats.map((s) => (
              <div 
                key={s.label}
                className={`p-3 rounded-2xl border text-center ${
                  isDarkMode ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                }`}
              >
                <div className="text-xs text-neutral-400 font-mono">{s.label}</div>
                <div className="text-base sm:text-lg font-bold font-mono text-emerald-400 mt-0.5">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Key Features */}
        {project.features && (
          <div className="mt-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
              Core Capabilities & Implementation
            </h4>
            <div className="space-y-2">
              {project.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Stack */}
        <div className="mt-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
            Technologies & Libraries
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className={`text-xs px-3 py-1 rounded-lg font-mono border ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="mt-8 pt-6 border-t border-neutral-500/10 flex items-center justify-end gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-colors ${
                isDarkMode 
                  ? 'border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800' 
                  : 'border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Github size={14} />
              <span>GitHub Repo</span>
            </a>
          )}
          <a
            href={project.liveUrl || 'https://github.com/chard0xx'}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-colors ${
              isDarkMode 
                ? 'bg-white text-black hover:bg-neutral-200 border-white' 
                : 'bg-neutral-900 text-white hover:bg-neutral-800 border-neutral-900'
            }`}
          >
            <span>Live Demonstration</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
