import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolioData';
import { ArrowUpRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';

import { Profile, TraitItem } from '../types/portfolio';

interface AboutMeSectionProps {
  onOpenCV: () => void;
  profile?: Profile;
  traits?: TraitItem[];
}

export function AboutMeSection({ onOpenCV, profile: propProfile, traits: propTraits }: AboutMeSectionProps) {
  const { isDarkMode } = useTheme();
  const profile = propProfile || portfolioData.profile;
  const traits = propTraits || portfolioData.traits || [];

  const displayName = profile.name.toUpperCase();

  // Interactive Trait Deck state (rotating cards on click)
  const [traitIndex, setTraitIndex] = useState(0);
  const customPhoto = (() => {
    try {
      return localStorage.getItem('evans_custom_photo_url') || '/evans_cutout.svg';
    } catch {
      return '/evans_cutout.svg';
    }
  })();

  const cycleTrait = () => {
    setTraitIndex((prev) => (prev + 1) % traits.length);
  };

  return (
    <section 
      id="about" 
      className={`py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300 ${
        isDarkMode ? 'text-white' : 'text-neutral-900'
      }`}
    >
      {/* Section Header */}
      <div className="mb-12">
        <span className={`text-[11px] font-mono tracking-[0.2em] uppercase font-bold ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          ABOUT ME
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-1">
          Analytical Engineer. Systems Builder.
        </h2>
      </div>

      {/* Main Profile Bento Card (Matching video 00:18 - 00:21) */}
      <div className={`p-8 sm:p-10 rounded-3xl border transition-all duration-300 ${
        isDarkMode ? 'bg-[#111111] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          
          {/* Avatar Thumbnail */}
          <div className="relative shrink-0">
            <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border p-1 shadow-md ${
              isDarkMode ? 'bg-neutral-900 border-neutral-700' : 'bg-neutral-100 border-neutral-300'
            }`}>
              <div className="w-full h-full rounded-xl overflow-hidden bg-neutral-900/60 flex items-center justify-center p-1">
                <img 
                  src={customPhoto} 
                  alt={displayName} 
                  className="w-full h-full object-contain object-bottom"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Details & Stat Counters */}
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              {displayName}
            </h3>

            {/* Stat Badges Row */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 mt-3 pt-3 border-t border-neutral-500/10">
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-wider block ${
                  isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                  PROJECTS
                </span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                  {profile.stats?.projectsCount || '20+'}
                </span>
              </div>

              <div>
                <span className={`text-[10px] font-mono uppercase tracking-wider block ${
                  isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                  CERTIFICATES
                </span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-blue-400">
                  {profile.stats?.certificatesCount || '9'}
                </span>
              </div>

              <div>
                <span className={`text-[10px] font-mono uppercase tracking-wider block ${
                  isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                  SOFTWARE TESTED
                </span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
                  {profile.stats?.softwareTestedYear || '2025'}
                </span>
              </div>
            </div>

            {/* Bio Paragraph */}
            <p className={`mt-5 text-sm sm:text-base leading-relaxed ${
              isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {profile.bioParagraph1} {profile.bioParagraph2} {profile.bioParagraph3}
            </p>

            {/* Resume Trigger */}
            <div className="mt-5">
              <button
                onClick={onOpenCV}
                className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold underline underline-offset-4 transition-colors cursor-pointer ${
                  isDarkMode ? 'text-white hover:text-neutral-300' : 'text-black hover:text-neutral-600'
                }`}
              >
                <span>Want to know more about my experience? Download my resume</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Currently Columns + Interactive Trait Deck (00:21 in video) */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Currently Sub-card (Building, Exploring, Learning) */}
        <div className={`md:col-span-7 p-8 rounded-3xl border flex flex-col justify-between transition-colors ${
          isDarkMode ? 'bg-[#111111] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
        }`}>
          <span className={`text-[11px] font-mono tracking-[0.2em] uppercase font-bold ${
            isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
          }`}>
            CURRENTLY
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <div>
              <span className={`text-xs font-mono uppercase tracking-wider block ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                Building
              </span>
              <p className="mt-1 text-sm font-bold text-blue-400">
                PulseCare & Forex Platform
              </p>
            </div>

            <div>
              <span className={`text-xs font-mono uppercase tracking-wider block ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                Exploring
              </span>
              <p className="mt-1 text-sm font-bold text-emerald-400">
                Algorithms & Discrete Math
              </p>
            </div>

            <div>
              <span className={`text-xs font-mono uppercase tracking-wider block ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                Designing
              </span>
              <p className="mt-1 text-sm font-bold text-violet-400">
                Data Models & ADRs
              </p>
            </div>
          </div>
        </div>

        {/* Right: Interactive Trait Deck (Matching video 00:21 - 00:23) */}
        <div className={`md:col-span-5 p-8 rounded-3xl border flex flex-col justify-between relative overflow-hidden transition-colors ${
          isDarkMode ? 'bg-[#111111] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`text-[11px] font-mono tracking-[0.2em] uppercase font-bold ${
              isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
              TRAIT
            </span>
            <span className="text-[10px] text-neutral-500 font-mono">
              Click to cycle ({traitIndex + 1}/{traits.length})
            </span>
          </div>

          {/* Interactive Stack of Trait Cards */}
          <div 
            onClick={cycleTrait}
            className="relative w-full h-36 flex items-center justify-center cursor-pointer select-none group"
          >
            {traits.map((trait, index) => {
              const relIndex = (index - traitIndex + traits.length) % traits.length;
              // Visual stacking styling
              const isTop = relIndex === 0;
              const isSecond = relIndex === 1;
              const isThird = relIndex === 2;

              let translateY = 0;
              let scale = 1;
              let rotate = 0;
              let opacity = 0;
              let zIndex = 0;

              if (isTop) {
                translateY = 0;
                scale = 1;
                rotate = 0;
                opacity = 1;
                zIndex = 30;
              } else if (isSecond) {
                translateY = 8;
                scale = 0.95;
                rotate = 4;
                opacity = 0.8;
                zIndex = 20;
              } else if (isThird) {
                translateY = 16;
                scale = 0.9;
                rotate = -4;
                opacity = 0.5;
                zIndex = 10;
              }

              return (
                <div
                  key={trait.id}
                  className={`absolute inset-0 p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 shadow-lg ${
                    isDarkMode 
                      ? 'bg-neutral-900 border-neutral-700 text-white' 
                      : 'bg-neutral-100 border-neutral-300 text-neutral-900'
                  }`}
                  style={{
                    transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                    opacity,
                    zIndex,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold tracking-tight">
                      {trait.title}
                    </span>
                    <Sparkles size={16} className="text-amber-400" />
                  </div>
                  <p className={`text-xs leading-relaxed ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    {trait.tagline}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
