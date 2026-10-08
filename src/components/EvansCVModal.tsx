import React, { useEffect } from 'react';
import { X, Printer, Mail, MapPin, Globe, GraduationCap, Code2, Award, Briefcase } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolioData';
import { Profile } from '../types/portfolio';

interface EvansCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: Profile;
}

export const EvansCVModal: React.FC<EvansCVModalProps> = ({ isOpen, onClose, profile: propProfile }) => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const profile = propProfile || portfolioData.profile;
  const name = profile.name || "Evans Osei";
  const role = "Software Engineer | Computer Science & Mathematics";
  const email = profile.email || "batsonbilly981@gmail.com";
  const location = profile.location || "Accra, Ghana";
  const github = profile.githubUrl ? profile.githubUrl.replace(/^https?:\/\//, '') : 'github.com/evans-osei';
  const linkedin = profile.linkedinUrl ? profile.linkedinUrl.replace(/^https?:\/\//, '') : 'linkedin.com/in/evans-osei';

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col transition-colors ${
        isDarkMode ? 'bg-[#0E0E0E] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
      }`}>
        {/* Sticky Top Bar */}
        <div className={`sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-4 border-b ${
          isDarkMode ? 'border-neutral-800 bg-[#0E0E0E]/95' : 'border-neutral-200 bg-white/95'
        } backdrop-blur-md`}>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base uppercase tracking-wider">
              Curriculum Vitae
            </span>
            <span className="text-xs text-neutral-500 font-mono">· {name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-neutral-200' 
                  : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white bg-neutral-500/10 rounded-xl transition-colors cursor-pointer"
              aria-label="Close CV"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable CV Document Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 print:p-0 print:text-black">
          {/* Header Block */}
          <div className="border-b border-neutral-500/15 pb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {name}
            </h1>
            <p className="text-sm font-semibold text-blue-500 mt-1">
              {role}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-1"><MapPin size={13} /> {location}</span>
              <span className="flex items-center gap-1"><Mail size={13} /> {email}</span>
              <span className="flex items-center gap-1"><Globe size={13} /> https://{github}</span>
              <span className="flex items-center gap-1"><Globe size={13} /> https://{linkedin}</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-2">
              Executive Summary
            </h2>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Analytical software engineer and Computer Science & Mathematics undergraduate at the University of Ghana. Combines strong mathematical rigor in algorithms, discrete structures, and logic with modern full-stack development skills across React, Tailwind CSS, PostgreSQL, and Firebase. Experienced in building responsive web applications, designing scalable data schemas, and transforming complex requirements into clean, user-friendly digital systems.
            </p>
          </div>

          {/* Technical & Quantitative Skills */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-3">
              Technical & Quantitative Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-neutral-800 bg-neutral-900/40' : 'border-neutral-200 bg-neutral-50'}`}>
                <span className="font-bold block mb-1 text-blue-400">Core Strengths & Theory</span>
                <span className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>
                  Algorithms & Data Structures, Discrete Mathematics, Computational Logic, Algorithm Optimization, Data Modeling
                </span>
              </div>
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-neutral-800 bg-neutral-900/40' : 'border-neutral-200 bg-neutral-50'}`}>
                <span className="font-bold block mb-1 text-emerald-400">Frontend Development</span>
                <span className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>
                  React, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Responsive Design
                </span>
              </div>
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-neutral-800 bg-neutral-900/40' : 'border-neutral-200 bg-neutral-50'}`}>
                <span className="font-bold block mb-1 text-violet-400">Backend & Systems</span>
                <span className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>
                  Firebase (Auth, Firestore), PostgreSQL, RESTful API Design & Architecture
                </span>
              </div>
              <div className={`p-4 rounded-xl border ${isDarkMode ? 'border-neutral-800 bg-neutral-900/40' : 'border-neutral-200 bg-neutral-50'}`}>
                <span className="font-bold block mb-1 text-amber-400">Design & Architecture</span>
                <span className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>
                  Figma, Architectural Decision Records (ADRs), Entity-Relationship Modeling (ERDs), UI/UX Prototyping
                </span>
              </div>
              <div className={`p-4 rounded-xl border sm:col-span-2 ${isDarkMode ? 'border-neutral-800 bg-neutral-900/40' : 'border-neutral-200 bg-neutral-50'}`}>
                <span className="font-bold block mb-1 text-rose-400">DevOps & Tooling</span>
                <span className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>
                  Git, GitHub, Vercel
                </span>
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-3">
              Featured Projects
            </h2>
            <div className="space-y-4 text-xs">
              
              {/* Project 1 */}
              <div className="border-l-2 border-blue-500 pl-4 py-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-bold text-sm">PulseCare Pharmacy Management System</span>
                  <span className="text-blue-400 font-mono text-[11px]">React · Tailwind CSS · Firebase (Auth, Firestore) · REST APIs</span>
                </div>
                <p className="font-medium text-neutral-400 mt-0.5">Full-Stack Healthcare Web Application</p>
                <ul className={`list-disc list-inside mt-2 space-y-1 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  <li>Built an end-to-end pharmacy operations platform with secure role-based access control, prescription tracking, and remote consultation booking.</li>
                  <li>Designed modular state workflows and integrated Firebase Google Authentication for fast, frictionless user onboarding.</li>
                  <li>Drafted architectural documentation, system data schemas, and entity-relationship diagrams (ERDs) to ensure reliable backend scaling.</li>
                </ul>
              </div>

              {/* Project 2 */}
              <div className="border-l-2 border-emerald-500 pl-4 py-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-bold text-sm">B-Corp Forex Platform</span>
                  <span className="text-emerald-400 font-mono text-[11px]">React · Tailwind CSS · RESTful APIs · Vercel</span>
                </div>
                <p className="font-medium text-neutral-400 mt-0.5">Financial Tracking & Market Analysis Tool</p>
                <ul className={`list-disc list-inside mt-2 space-y-1 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  <li>Engineered an interactive forex analytics dashboard providing structured financial rate displays and intuitive client-side data filtering.</li>
                  <li>Handled responsive UI rendering and layout performance optimizations across mobile and desktop breakpoints.</li>
                  <li>Automated CI/CD deployment pipelines on Vercel for rapid production delivery.</li>
                </ul>
              </div>

              {/* Project 3 */}
              <div className="border-l-2 border-purple-500 pl-4 py-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-bold text-sm">Tonaton Ghana Marketplace UI/UX Redesign</span>
                  <span className="text-purple-400 font-mono text-[11px]">Figma · User Flow Modeling · UX Research · ERD Modeling</span>
                </div>
                <p className="font-medium text-neutral-400 mt-0.5">Marketplace Platform Architecture & Prototype</p>
                <ul className={`list-disc list-inside mt-2 space-y-1 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  <li>Analyzed user transaction friction points across mobile classified listings and rebuilt the layout around high-clarity filtering and accessibility.</li>
                  <li>Designed modular UI components, modern grid layouts, and interactive click-through prototypes to streamline buyer-to-seller interactions.</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-3">
              Education
            </h2>
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'border-neutral-800 bg-neutral-900/30' : 'border-neutral-200 bg-neutral-50'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-bold text-sm">B.Sc. in Computer Science and Mathematics</span>
                <span className="text-neutral-500 font-mono text-xs">University of Ghana, Legon</span>
              </div>
              <p className={`mt-2 text-xs leading-relaxed ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                <span className="font-semibold text-neutral-400">Relevant Coursework: </span>
                Data Structures & Algorithms, Discrete Mathematics, Database Systems, Linear Algebra, Mathematical Analysis, Software Engineering, Human-Computer Interaction.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
