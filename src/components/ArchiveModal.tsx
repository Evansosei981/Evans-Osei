import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolioData';
import { TechnicalProjectItem, DigitalProjectItem } from '../types/portfolio';
import { X, ArrowUpRight, Github, ExternalLink, Search, FolderGit2, Palette, ArrowRight } from 'lucide-react';

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHireMe: () => void;
  technicalProjects?: TechnicalProjectItem[];
  digitalProjects?: DigitalProjectItem[];
}

export function ArchiveModal({
  isOpen,
  onClose,
  onHireMe,
  technicalProjects: propTech,
  digitalProjects: propDig
}: ArchiveModalProps) {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'technical' | 'digital'>('technical');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const technicalProjects = propTech || portfolioData.technicalProjects || [];
  const digitalProjects = propDig || portfolioData.digitalProjects || [];

  const filteredTechnical = technicalProjects.filter((p) => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md overflow-y-auto p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className={`relative w-full max-w-5xl rounded-3xl border shadow-2xl my-auto max-h-[92vh] flex flex-col overflow-hidden transition-colors ${
          isDarkMode ? 'bg-[#0E0E0E] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
        }`}
      >
        {/* Sticky Top Bar with Tabs and Close Button */}
        <div className={`p-6 border-b flex items-center justify-between shrink-0 ${
          isDarkMode ? 'bg-[#0E0E0E] border-neutral-800' : 'bg-white border-neutral-200'
        }`}>
          {/* Navigation Tabs: TECHNICAL | DIGITAL (Matching video 00:48, 00:56) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('technical')}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase font-bold transition-all cursor-pointer ${
                activeTab === 'technical'
                  ? isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
                  : isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black'
              }`}
            >
              TECHNICAL
            </button>
            <button
              onClick={() => setActiveTab('digital')}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase font-bold transition-all cursor-pointer ${
                activeTab === 'digital'
                  ? isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
                  : isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black'
              }`}
            >
              DIGITAL
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onHireMe}
              className={`hidden sm:inline-flex px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                isDarkMode 
                  ? 'border-neutral-700 bg-neutral-900 hover:bg-white hover:text-black hover:border-white' 
                  : 'border-neutral-300 bg-neutral-100 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              Hire Me
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-500/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Archive"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10">
          
          {/* TAB 1: TECHNICAL PROJECTS (Matching 00:48 - 00:55 in video) */}
          {activeTab === 'technical' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className={`text-[11px] font-mono tracking-[0.2em] uppercase font-bold ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    ARCHIVE
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">
                    Technical Projects
                  </h2>
                  <p className={`mt-2 text-sm max-w-xl ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    A complete collection of my technical work, systems, and digital projects.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                  <Search size={15} className="absolute left-3 top-3 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Search systems..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs font-medium border outline-none ${
                      isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-black'
                    }`}
                  />
                </div>
              </div>

              {/* List of Technical Projects with tags & links */}
              <div className="divide-y divide-neutral-500/10">
                {filteredTechnical.map((item) => (
                  <div 
                    key={item.id}
                    className="py-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-base font-bold tracking-tight group-hover:text-blue-400 transition-colors ${
                          isDarkMode ? 'text-white' : 'text-neutral-900'
                        }`}>
                          {item.title}
                        </h4>
                        {item.year && (
                          <span className="text-[10px] font-mono text-neutral-500">
                            {item.year}
                          </span>
                        )}
                      </div>

                      <p className={`mt-1.5 text-xs sm:text-sm leading-relaxed max-w-3xl ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        {item.description}
                      </p>

                      <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          isDarkMode ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-800'
                        }`}>
                          {item.framework}
                        </span>
                        {item.technologies.slice(0, 4).map((tech) => (
                          <span key={tech} className="text-[10px] font-mono text-neutral-500">
                            • {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* External & GitHub Action Links */}
                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-neutral-500/10 text-neutral-400 hover:text-white transition-colors"
                          title="View Source on GitHub"
                        >
                          <Github size={17} />
                        </a>
                      )}
                      <a
                        href={item.liveUrl || 'https://github.com/chard0xx'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-neutral-500/10 text-neutral-400 hover:text-white transition-colors"
                        title="View Project Details"
                      >
                        <ArrowUpRight size={17} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DIGITAL PROJECTS ("Beyond Code" - Matching 00:56 - 01:02 in video) */}
          {activeTab === 'digital' && (
            <div>
              <div className="mb-8">
                <span className={`text-[11px] font-mono tracking-[0.2em] uppercase font-bold ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  DIGITAL PROJECTS
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">
                  Beyond Code
                </h2>
                <p className={`mt-2 text-sm max-w-xl ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                  Creative, visual, content, and digital projects developed alongside my technical work.
                </p>
              </div>

              {/* Grid of Digital Project Showcase Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {digitalProjects.map((dp) => (
                  <div
                    key={dp.id}
                    className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                      isDarkMode ? 'bg-[#141414] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={dp.thumbnail}
                        alt={dp.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/75 backdrop-blur-sm text-[10px] font-mono text-white">
                        {dp.slidesCount ? `${dp.slidesCount} Assets` : 'Digital Kit'}
                      </div>
                    </div>

                    <div className="p-5">
                      <span className={`text-[10px] font-mono uppercase tracking-wider block ${
                        isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                      }`}>
                        {dp.category}
                      </span>
                      <h4 className="text-lg font-bold tracking-tight mt-0.5">
                        {dp.title}
                      </h4>
                      <p className={`mt-2 text-xs leading-relaxed ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        {dp.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {dp.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                              isDarkMode ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-800'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer CTA: "Let's build something useful." (Matching 01:02 in video) */}
          <div className={`mt-16 pt-12 border-t flex flex-col sm:flex-row items-center justify-between gap-6 ${
            isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
          }`}>
            <div>
              <span className={`text-[10px] font-mono uppercase tracking-widest block ${
                isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                HAVE A PROJECT IN MIND?
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
                Let's build something useful.
              </h3>
            </div>

            <button
              onClick={onHireMe}
              className={`px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-neutral-200 border-white' 
                  : 'bg-neutral-900 text-white hover:bg-neutral-800 border-neutral-900'
              }`}
            >
              <span>Hire Me</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
