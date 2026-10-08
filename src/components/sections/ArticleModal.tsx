import React, { useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, Clock, Calendar, Tag, ArrowLeft, Share2 } from 'lucide-react';

export const ArticleModal: React.FC = () => {
  const { data, activeModal, closeModal } = usePortfolio();
  const article = data.articles.find(a => a.id === activeModal.id);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  if (activeModal.type !== 'article' || !article) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
      onClick={e => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="relative w-full max-w-3xl bg-[#090d16] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#090d16]/95 backdrop-blur-md">
          <button
            onClick={closeModal}
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </button>

          <button
            onClick={closeModal}
            className="p-2 text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] rounded-xl border border-white/10 transition-colors"
            aria-label="Close Article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10 lg:p-12 overflow-y-auto space-y-8">
          {/* Metadata banner */}
          <div className="space-y-4 border-b border-white/10 pb-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-mono">
              <span className="text-cyan-400">{article.category}</span>
              <span className="text-slate-600">·</span>
              <span>{article.date}</span>
              <span className="text-slate-600">·</span>
              <span>{article.readTime}</span>
              <span className="text-slate-600">·</span>
              <span>By {data.profile.name}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 italic">
              {article.summary}
            </p>
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-6 text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            {(Array.isArray(article.content) ? article.content : [article.content]).map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Article Footer & Tags */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-400">
              <span className="text-slate-500 mr-2">Tags:</span>
              <span>{article.tags.join(' · ')}</span>
            </div>

            <div className="text-xs font-mono text-slate-400">
              Evans Osei · Student & Software Developer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
