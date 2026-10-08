import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Code2, 
  CheckCircle2, 
  Database, 
  Terminal, 
  Cpu, 
  Layers, 
  Globe, 
  FileText, 
  Search, 
  Share2, 
  FolderKanban,
  Check
} from 'lucide-react';

export function WhatICanDoSection() {
  const { isDarkMode } = useTheme();

  // Tech stack icons grid (16 tiles matching 4x4 grid)
  const techIcons = [
    { name: 'React', color: '#61DAFB', symbol: '⚛' },
    { name: 'Tailwind', color: '#38BDF8', symbol: 'TW' },
    { name: 'TypeScript', color: '#3178C6', symbol: 'TS' },
    { name: 'JavaScript', color: '#F7DF1E', symbol: 'JS' },
    { name: 'Firebase', color: '#FFCA28', symbol: '🔥' },
    { name: 'PostgreSQL', color: '#336791', symbol: 'SQL' },
    { name: 'Algorithms', color: '#10B981', symbol: 'Algo' },
    { name: 'Discrete Math', color: '#8B5CF6', symbol: 'Math' },
    { name: 'REST APIs', color: '#EC4899', symbol: 'API' },
    { name: 'Figma', color: '#F24E1E', symbol: 'Fg' },
    { name: 'Data Models', color: '#06B6D4', symbol: 'ERD' },
    { name: 'ADRs', color: '#14B8A6', symbol: 'ADR' },
    { name: 'Git', color: '#F05032', symbol: 'Git' },
    { name: 'GitHub', color: '#E2E8F0', symbol: 'Hub' },
    { name: 'Vercel', color: '#FFFFFF', symbol: '▲' },
    { name: 'HTML5/CSS3', color: '#E34F26', symbol: 'Web' },
  ];

  const theoryAndFrontendSkills = [
    'Algorithms & Data Structures',
    'Discrete Mathematics',
    'Computational Logic',
    'Algorithm Optimization',
    'Data Modeling',
    'React',
    'JavaScript (ES6+)',
    'Tailwind CSS',
    'Responsive Design',
  ];

  const systemsAndDevOpsSkills = [
    'Firebase (Auth, Firestore)',
    'PostgreSQL',
    'RESTful API Architecture',
    'Figma UI/UX Prototyping',
    'Architectural Decision Records (ADRs)',
    'Entity-Relationship Modeling (ERDs)',
    'Git & GitHub',
    'Vercel CI/CD Pipelines',
  ];

  return (
    <section 
      id="capabilities" 
      className={`py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300 ${
        isDarkMode ? 'text-white' : 'text-neutral-900'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        
        {/* Left Column: Heading + Description + 4x4 Tech Icons Grid */}
        <div className="lg:col-span-5 flex flex-col">
          <span className={`text-[11px] font-mono tracking-[0.2em] uppercase font-bold ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            TECHNICAL & QUANTITATIVE SKILLS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-1">
            What I Can Do
          </h2>
          <p className={`mt-4 text-sm sm:text-base leading-relaxed ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Combines strong mathematical rigor in algorithms, discrete structures, and logic with modern full-stack development across React, Tailwind CSS, PostgreSQL, and Firebase.
          </p>

          {/* 4x4 Tech Stack Icons Grid */}
          <div className="mt-8 grid grid-cols-4 gap-3 max-w-xs sm:max-w-sm">
            {techIcons.map((tech) => (
              <div
                key={tech.name}
                className={`group relative aspect-square rounded-2xl flex flex-col items-center justify-center p-2 border transition-all duration-300 transform hover:scale-105 cursor-default ${
                  isDarkMode 
                    ? 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800/90 shadow-sm' 
                    : 'bg-white border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 shadow-sm'
                }`}
              >
                <span 
                  className="font-mono text-sm sm:text-base font-bold tracking-tight transition-transform duration-200 group-hover:scale-110"
                  style={{ color: tech.color }}
                >
                  {tech.symbol}
                </span>
                <span className={`text-[9px] tracking-tight mt-1 truncate max-w-full font-medium ${
                  isDarkMode ? 'text-neutral-400 group-hover:text-white' : 'text-neutral-600 group-hover:text-black'
                }`}>
                  {tech.name}
                </span>

                {/* Subtle glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                  style={{ backgroundColor: tech.color }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Numbered Service / Capability Cards (01 & 02) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Card 01: THEORY & FRONTEND */}
          <div className={`p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 ${
            isDarkMode 
              ? 'bg-[#111111] border-neutral-800 hover:border-neutral-700' 
              : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'
          }`}>
            <div>
              <div className="flex items-start justify-between">
                <span className={`text-4xl sm:text-5xl font-mono font-bold ${
                  isDarkMode ? 'text-neutral-300' : 'text-neutral-900'
                }`}>
                  01
                </span>
                <div className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                  isDarkMode ? 'border-neutral-800 bg-neutral-900 text-neutral-400' : 'border-neutral-200 bg-neutral-100 text-neutral-600'
                }`}>
                  THEORY & FRONTEND
                </div>
              </div>

              <p className={`mt-6 text-sm leading-relaxed ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                Deep foundation in discrete mathematics, computational logic, and algorithmic optimizations, paired with responsive React and Tailwind CSS engineering.
              </p>
            </div>

            {/* Capability Tag Pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {theoryAndFrontendSkills.map((skill) => (
                <span
                  key={skill}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700' 
                      : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-black hover:border-neutral-300'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Card 02: SYSTEMS & ARCHITECTURE */}
          <div className={`p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 ${
            isDarkMode 
              ? 'bg-[#111111] border-neutral-800 hover:border-neutral-700' 
              : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'
          }`}>
            <div>
              <div className="flex items-start justify-between">
                <span className={`text-4xl sm:text-5xl font-mono font-bold ${
                  isDarkMode ? 'text-neutral-300' : 'text-neutral-900'
                }`}>
                  02
                </span>
                <div className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                  isDarkMode ? 'border-neutral-800 bg-neutral-900 text-neutral-400' : 'border-neutral-200 bg-neutral-100 text-neutral-600'
                }`}>
                  SYSTEMS & ARCHITECTURE
                </div>
              </div>

              <p className={`mt-6 text-sm leading-relaxed ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                Designing scalable database schemas (ERDs), drafting Architectural Decision Records (ADRs), prototyping user flows in Figma, and automating CI/CD on Vercel.
              </p>
            </div>

            {/* Capability Tag Pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {systemsAndDevOpsSkills.map((skill) => (
                <span
                  key={skill}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700' 
                      : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-black hover:border-neutral-300'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
