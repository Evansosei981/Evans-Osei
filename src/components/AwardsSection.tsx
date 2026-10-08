import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolioData';
import { Trophy, Award, Medal, Star, CheckCircle } from 'lucide-react';

import { AwardItem } from '../types/portfolio';

interface AwardsSectionProps {
  awards?: AwardItem[];
}

export function AwardsSection({ awards: propAwards }: AwardsSectionProps) {
  const { isDarkMode } = useTheme();
  const awards = propAwards || portfolioData.awards || [];

  const getAwardIcon = (icon: string) => {
    switch (icon) {
      case 'trophy':
        return <Trophy className="text-amber-400" size={22} />;
      case 'medal':
        return <Medal className="text-emerald-400" size={22} />;
      case 'ribbon':
        return <Award className="text-blue-400" size={22} />;
      default:
        return <Star className="text-purple-400" size={22} />;
    }
  };

  return (
    <section 
      id="awards" 
      className={`py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300 ${
        isDarkMode ? 'text-white' : 'text-neutral-900'
      }`}
    >
      {/* Section Header */}
      <div className="mb-14">
        <span className={`text-[11px] font-mono tracking-[0.2em] uppercase font-bold ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          RECOGNITION
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-1">
          Awards and Achievements
        </h2>
        <p className={`mt-2 text-sm sm:text-base max-w-xl ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
        }`}>
          A collection of academic and professional recognitions that reflect my dedication to excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Photo Collage / Bento (Matching video 00:24 - 00:27) */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
          
          {/* Main Graduation Regalia Photo */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-neutral-800 shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"
              alt="Graduation Academic Recognition"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-medium text-white">Academic Honors & Commencement</span>
            </div>
          </div>

          {/* Right Sub-grid: 2 Stacked Photos */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Capstone Defense Presentation Photo */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-neutral-800 shadow-md group">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80"
                alt="Capstone Defense & Award Presentation"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-medium text-white">Best Capstone System Showcase</span>
              </div>
            </div>

            {/* Award Plaque / Team Photo */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-neutral-800 shadow-md group">
              <img
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80"
                alt="Recognition Ceremony with Faculty"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-medium text-white">Dean's Honor Roll Ceremony</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Stack of Recognition Cards */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {awards.map((award) => (
            <div
              key={award.id}
              className={`p-6 rounded-3xl border flex items-start gap-5 transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-[#111111] border-neutral-800 hover:border-neutral-700' 
                  : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'
              }`}
            >
              {/* Icon Container */}
              <div className={`p-3.5 rounded-2xl shrink-0 ${
                isDarkMode ? 'bg-neutral-900 border border-neutral-800' : 'bg-neutral-100 border border-neutral-200'
              }`}>
                {getAwardIcon(award.icon)}
              </div>

              {/* Award Details */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold tracking-tight">
                    {award.title}
                  </h3>
                  <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-400' : 'bg-neutral-100 border-neutral-200 text-neutral-600'
                  }`}>
                    {award.year}
                  </span>
                </div>

                <p className={`mt-2 text-sm leading-relaxed ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                  {award.subtitle}
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-xs font-mono text-neutral-500">
                  <CheckCircle size={13} className="text-emerald-500" />
                  <span>{award.issuer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
