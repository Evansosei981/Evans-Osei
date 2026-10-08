import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Award, ExternalLink, ShieldCheck, Trophy, Scroll } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto relative">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
          <span>10</span>
          <span className="text-slate-600">/</span>
          <span>RECOGNITION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Achievements & credentials.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
          Academic honors, competition distinctions, and verified engineering certifications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.certificates.map(cert => (
          <div
            key={cert.id}
            className="p-6 sm:p-7 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-400/30 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-400/30 text-cyan-400 flex items-center justify-center">
                  {cert.type === 'Award' || cert.type === 'Competition' ? (
                    <Trophy className="w-5 h-5" />
                  ) : cert.type === 'Academic' ? (
                    <Award className="w-5 h-5" />
                  ) : (
                    <Scroll className="w-5 h-5" />
                  )}
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-cyan-400 block">{cert.issueDate}</span>
                  <span className="text-[11px] font-mono text-slate-500 uppercase">{cert.type}</span>
                </div>
              </div>

              <h3 className="text-lg font-display font-bold text-white mb-1">
                {cert.title}
              </h3>
              <p className="text-xs font-mono text-cyan-300/80 mb-3">
                {cert.organization}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {cert.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-between text-xs font-mono text-slate-400">
              {cert.credentialId ? (
                <span>ID: {cert.credentialId}</span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Record
                </span>
              )}

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Verification</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
