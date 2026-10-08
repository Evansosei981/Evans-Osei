import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Download, Menu, X, Shield, ExternalLink } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const { data, openCVModal } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'blog', 'gallery', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Blog', href: '#blog' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#07090e]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-lg shadow-black/20'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#hero"
            className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors"
          >
            <span className="font-display font-extrabold tracking-wider text-cyan-400">EO</span>
            <span className="hidden sm:inline font-display text-slate-200 group-hover:text-white transition-colors">
              {data.profile.name}
            </span>
          </a>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-white ${
                    isActive ? 'text-cyan-400' : 'text-slate-400'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary action button + Admin link */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCVModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-cyan-400/40 rounded-lg transition-all duration-200 whitespace-nowrap active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download CV</span>
            </button>

            <button
              onClick={onOpenAdmin}
              title="Admin Dashboard"
              aria-label="Admin Portal"
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-white/[0.05] border border-transparent hover:border-white/10 rounded-lg transition-colors"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-slate-300 hover:text-white bg-white/[0.05] border border-white/10 rounded-lg"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden bg-black/70 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8 animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex flex-col gap-4">
            <div className="pb-3 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-400">Navigation</span>
            </div>
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-display font-medium text-slate-200 hover:text-cyan-400 transition-colors py-2 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-slate-500 font-mono">0{navLinks.indexOf(link) + 1}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCVModal();
              }}
              className="w-full py-3 px-4 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-xl shadow-lg shadow-cyan-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 px-4 flex items-center justify-center gap-2 text-xs font-medium text-slate-400 hover:text-white bg-white/[0.03] border border-white/10 rounded-xl"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Management Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
