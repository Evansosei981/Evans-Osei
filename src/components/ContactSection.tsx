import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolioData';
import { Mail, Github, Linkedin, ArrowRight, Download, Check, Copy } from 'lucide-react';

import { Profile } from '../types/portfolio';

interface ContactSectionProps {
  onOpenMessageModal: () => void;
  onOpenCV: () => void;
  profile?: Profile;
}

export function ContactSection({ onOpenMessageModal, onOpenCV, profile: propProfile }: ContactSectionProps) {
  const { isDarkMode } = useTheme();
  const profile = propProfile || portfolioData.profile;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = profile.email;
  const github = profile.githubUrl.replace(/^https?:\/\//, '') || 'github.com/evans-osei';
  const linkedin = profile.linkedinUrl.replace(/^https?:\/\//, '') || 'linkedin.com/in/evans-osei';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section 
      id="contact" 
      className={`py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300 ${
        isDarkMode ? 'text-white' : 'text-neutral-900'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Heading + Description + Download Resume */}
        <div className="lg:col-span-6 flex flex-col">
          <span className={`text-[11px] font-mono tracking-[0.2em] uppercase font-bold ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            GET IN TOUCH
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mt-1 leading-none">
            LET'S WORK TOGETHER
          </h2>

          <p className="mt-8 text-lg sm:text-xl font-medium">
            Looking for the next problem worth solving.
          </p>

          <p className={`mt-3 text-sm sm:text-base leading-relaxed max-w-lg ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            I'm open to opportunities where I can contribute to software testing, web development, IT operations, and digital workflows.
          </p>

          {/* Download Resume Button (Matching video 00:40) */}
          <div className="mt-8">
            <button
              onClick={onOpenCV}
              className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                isDarkMode 
                  ? 'border-neutral-700 bg-neutral-900 text-white hover:bg-white hover:text-black hover:border-white shadow-sm' 
                  : 'border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white shadow-sm'
              }`}
            >
              <span>DOWNLOAD RESUME</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Column: Contact Cards 01, 02, 03 + "SEND ME A MESSAGE" (Matching video 00:40 - 00:43) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          {/* Card 01: Email */}
          <div 
            onClick={handleCopyEmail}
            className={`p-5 sm:p-6 rounded-2xl border flex items-center justify-between transition-all duration-200 cursor-pointer group ${
              isDarkMode 
                ? 'bg-[#111111] border-neutral-800 hover:border-neutral-600' 
                : 'bg-white border-neutral-200 hover:border-neutral-400 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-xl border ${
                isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
              }`}>
                <Mail size={18} />
              </div>
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-wider block ${
                  isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                  EMAIL
                </span>
                <span className="text-xs sm:text-sm font-mono font-medium">
                  {email}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                isDarkMode ? 'border-neutral-800 text-neutral-500' : 'border-neutral-200 text-neutral-400'
              }`}>
                01
              </span>
              <button 
                className="text-neutral-400 group-hover:text-white transition-colors"
                title="Copy Email"
              >
                {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Card 02: GitHub */}
          <a
            href={`https://${github}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-5 sm:p-6 rounded-2xl border flex items-center justify-between transition-all duration-200 group ${
              isDarkMode 
                ? 'bg-[#111111] border-neutral-800 hover:border-neutral-600' 
                : 'bg-white border-neutral-200 hover:border-neutral-400 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-xl border ${
                isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
              }`}>
                <Github size={18} />
              </div>
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-wider block ${
                  isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                  GITHUB
                </span>
                <span className="text-xs sm:text-sm font-mono font-medium">
                  {github}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                isDarkMode ? 'border-neutral-800 text-neutral-500' : 'border-neutral-200 text-neutral-400'
              }`}>
                02
              </span>
              <ArrowRight size={16} className="text-neutral-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Card 03: LinkedIn */}
          <a
            href={`https://${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-5 sm:p-6 rounded-2xl border flex items-center justify-between transition-all duration-200 group ${
              isDarkMode 
                ? 'bg-[#111111] border-neutral-800 hover:border-neutral-600' 
                : 'bg-white border-neutral-200 hover:border-neutral-400 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-xl border ${
                isDarkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
              }`}>
                <Linkedin size={18} />
              </div>
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-wider block ${
                  isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                  LINKEDIN
                </span>
                <span className="text-xs sm:text-sm font-mono font-medium truncate max-w-[200px] sm:max-w-none">
                  {linkedin}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                isDarkMode ? 'border-neutral-800 text-neutral-500' : 'border-neutral-200 text-neutral-400'
              }`}>
                03
              </span>
              <ArrowRight size={16} className="text-neutral-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* SEND ME A MESSAGE Button */}
          <div className="mt-4">
            <button
              onClick={onOpenMessageModal}
              className={`w-full py-4 rounded-full font-semibold text-xs tracking-wider uppercase border transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] shadow-md ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-neutral-200 border-white hover:shadow-white/10' 
                  : 'bg-neutral-900 text-white hover:bg-neutral-800 border-neutral-900 hover:shadow-neutral-900/20'
              }`}
            >
              SEND ME A MESSAGE →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
