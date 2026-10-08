import React, { useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, Printer, Download, Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

export const CVModal: React.FC = () => {
  const { data, activeModal, closeModal } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  if (activeModal.type !== 'cv') return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
      onClick={e => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="relative w-full max-w-4xl bg-[#090d16] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Sticky Header with Actions */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/10 bg-[#090d16]/95 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white text-base">Curriculum Vitae</span>
            <span className="text-xs text-slate-500 font-mono">· {data.profile.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={closeModal}
              className="p-1.5 text-slate-400 hover:text-white bg-white/[0.05] rounded-lg transition-colors"
              aria-label="Close CV"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Document View (Formatted like a high-end printable technical resume) */}
        <div id="printable-cv" className="p-8 sm:p-12 overflow-y-auto bg-[#070a12] text-slate-200 space-y-8 text-sm">
          {/* Header */}
          <div className="border-b border-white/10 pb-6">
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">
              {data.profile.name}
            </h1>
            <p className="text-cyan-300 font-medium text-sm mt-1">
              {data.profile.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono mt-3">
              <span>{data.education.institution}, Ghana</span>
              <span>·</span>
              <span>{data.profile.email}</span>
              <span>·</span>
              <span>{data.profile.location}</span>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold border-b border-white/10 pb-1 mb-3">
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
              <div>
                <h3 className="font-bold text-white text-base">{data.education.institution}</h3>
                <p className="text-slate-300">{data.education.degree}</p>
              </div>
              <span className="font-mono text-xs text-slate-400">{data.education.period}</span>
            </div>
            <div className="mt-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Coursework: </span>
              {data.education.coursework.join(', ')}
            </div>
          </div>

          {/* Featured Engineering Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold border-b border-white/10 pb-1 mb-3">
              Engineering Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className="font-bold text-white text-sm">
                      {proj.title} <span className="font-normal text-slate-400 text-xs">({proj.technologies.join(', ')})</span>
                    </span>
                    <span className="font-mono text-xs text-slate-400">{proj.date}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold border-b border-white/10 pb-1 mb-3">
              Technical Capabilities
            </h2>
            <div className="space-y-1.5 text-xs">
              <div>
                <span className="font-semibold text-slate-300">Languages: </span>
                <span className="text-slate-400">Python, Java, JavaScript (ES6+), TypeScript, SQL</span>
              </div>
              <div>
                <span className="font-semibold text-slate-300">Frameworks & Libraries: </span>
                <span className="text-slate-400">React, Node.js, Express.js, Tailwind CSS, WebGL, Canvas API</span>
              </div>
              <div>
                <span className="font-semibold text-slate-300">Databases & Cloud: </span>
                <span className="text-slate-400">PostgreSQL, Firebase Firestore, Supabase, SQLite, Sequelize</span>
              </div>
              <div>
                <span className="font-semibold text-slate-300">Developer Tools: </span>
                <span className="text-slate-400">Git, GitHub, Docker, Figma, Android Studio, VS Code, Linux</span>
              </div>
            </div>
          </div>

          {/* Recognition */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold border-b border-white/10 pb-1 mb-3">
              Honors & Distinctions
            </h2>
            <div className="space-y-2">
              {data.certificates.map(c => (
                <div key={c.id} className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-semibold text-slate-200">{c.title}</span> —{' '}
                    <span className="text-slate-400">{c.organization}</span>
                  </div>
                  <span className="font-mono text-slate-500">{c.issueDate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
