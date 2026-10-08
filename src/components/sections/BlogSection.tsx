import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowRight, Clock, Calendar, BookOpen } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { data, openArticleModal } = usePortfolio();

  const publishedArticles = data.articles.filter(a => a.published);

  return (
    <section id="blog" className="py-24 px-6 md:px-10 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>08</span>
            <span className="text-slate-600">/</span>
            <span>WRITING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Thinking, building, learning.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            Essays and reflections on software engineering, AI mathematics, and product design.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {publishedArticles.map((article, idx) => (
          <article
            key={article.id}
            onClick={() => openArticleModal(article.id)}
            className="group cursor-pointer p-7 sm:p-8 rounded-3xl glass-panel border border-white/[0.08] hover:border-cyan-400/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Unboxed Metadata Line */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
                <span className="text-cyan-400">{article.category}</span>
                <span className="text-slate-600">·</span>
                <span>{article.date}</span>
                <span className="text-slate-600">·</span>
                <span>{article.readTime}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors mb-3 leading-snug">
                {article.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {article.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                {article.tags.slice(0, 2).join(' · ')}
              </span>

              <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
