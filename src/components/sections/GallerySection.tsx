import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GalleryCategory, GalleryItem } from '../../types/portfolio';
import { X, MapPin, Calendar, Camera, Maximize2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories: ('All' | GalleryCategory)[] = [
    'All',
    'University',
    'Projects',
    'Technology',
    'Events',
    'Achievements',
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return data.gallery;
    return data.gallery.filter(item => item.category === activeCategory);
  }, [data.gallery, activeCategory]);

  return (
    <section id="gallery" className="py-24 px-6 md:px-10 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>09</span>
            <span className="text-slate-600">/</span>
            <span>SNAPSHOTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Personal archive & campus life.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            Moments, architectural blueprints, hackathon collaborations, and university milestones at Legon.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-xl overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            onClick={() => setActiveLightboxItem(item)}
            className="group relative cursor-pointer rounded-2xl overflow-hidden glass-panel border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            {/* Stylized Visual Frame */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-[#0e172a] via-[#091020] to-[#060810] p-6 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-cyan-400">{item.category}</span>
                <span>{item.date}</span>
              </div>

              {/* Center Domain Graphic */}
              <div className="relative z-10 my-auto text-center">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5 text-cyan-400" />
                </div>
                <h4 className="text-base font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {item.title}
                </h4>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{item.location || 'Accra, Ghana'}</span>
                <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <Maximize2 className="w-3 h-3" />
                  <span>Enlarge</span>
                </span>
              </div>
            </div>

            {/* Caption text */}
            <div className="p-4 bg-white/[0.02] border-t border-white/[0.06]">
              <p className="text-xs text-slate-300 line-clamp-2">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#090d16] border border-white/15 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="text-xs font-mono text-cyan-400 uppercase">
                {activeLightboxItem.category} · {activeLightboxItem.date}
              </div>
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg bg-white/[0.05]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video rounded-xl bg-gradient-to-tr from-[#0d1629] to-[#070b14] border border-white/10 p-6 flex flex-col items-center justify-center mb-6 relative">
              <Camera className="w-12 h-12 text-cyan-400/80 mb-3" />
              <div className="text-lg font-display font-bold text-white text-center">
                {activeLightboxItem.title}
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                {activeLightboxItem.location}
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              {activeLightboxItem.caption}
            </p>

            <div className="text-xs font-mono text-slate-500 pt-4 border-t border-white/10 flex items-center justify-between">
              <span>Archive Entry #{activeLightboxItem.id}</span>
              <span>Press anywhere to close</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
