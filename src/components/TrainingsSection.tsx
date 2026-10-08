import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolioData';
import { Calendar, Building2, Award } from 'lucide-react';

import { TrainingItem } from '../types/portfolio';

interface TrainingsSectionProps {
  trainings?: TrainingItem[];
}

export function TrainingsSection({ trainings: propTrainings }: TrainingsSectionProps) {
  const { isDarkMode } = useTheme();
  const trainings = propTrainings || portfolioData.trainings || [];

  return (
    <section 
      id="trainings" 
      className={`py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300 ${
        isDarkMode ? 'text-white' : 'text-neutral-900'
      }`}
    >
      {/* Section Header */}
      <div className="mb-14">
        <span className={`text-[11px] font-mono tracking-[0.2em] uppercase font-bold ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          GROWTH & EXPERIENCE
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-1">
          Trainings & Hackathons
        </h2>
        <p className={`mt-2 text-sm sm:text-base max-w-xl ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
        }`}>
          A collection of trainings, workshops, and hackathons that shaped my technical and collaborative skills.
        </p>
      </div>

      {/* Grid of Event Cards (Matching video 00:28 - 00:39) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {trainings.map((item, index) => {
          const isLarge = index === 0;

          return (
            <div
              key={item.id}
              className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                isLarge ? 'md:col-span-2' : 'md:col-span-1'
              } ${
                isDarkMode 
                  ? 'bg-[#111111] border-neutral-800 hover:border-neutral-700' 
                  : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'
              }`}
            >
              <div className={`p-6 sm:p-8 flex flex-col ${isLarge ? 'lg:flex-row gap-8 items-center' : 'gap-6'}`}>
                
                {/* Left/Main Event Details */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                      <Building2 size={13} />
                      {item.organization}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                      <Calendar size={13} />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {item.title}
                  </h3>
                  {item.category && (
                    <span className={`text-xs font-medium block mt-1 ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      {item.category}
                    </span>
                  )}

                  <p className={`mt-4 text-sm leading-relaxed ${
                    isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
                  }`}>
                    {item.description}
                  </p>

                  <div className="mt-5">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase px-3 py-1 rounded-full border ${
                      item.badge === 'MOST PROMISING PROTOTYPE'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 font-bold'
                        : isDarkMode
                          ? 'bg-neutral-900 border-neutral-800 text-neutral-400'
                          : 'bg-neutral-100 border-neutral-200 text-neutral-600'
                    }`}>
                      <Award size={12} />
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Event Photo / Certificate Preview */}
                <div className={`${isLarge ? 'w-full lg:w-[420px]' : 'w-full'} aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-800 shrink-0`}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
