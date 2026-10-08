import React, { useState } from 'react';
import { Moon, Sun, Menu, X, Sliders, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onHireMeClick: () => void;
  onOpenArchive: () => void;
  onOpenStudio?: () => void;
  isOwnerSignedIn?: boolean;
  onOwnerSignOut?: () => void;
}

export function Navbar({ 
  onHireMeClick, 
  onOpenArchive, 
  onOpenStudio, 
  isOwnerSignedIn = false,
  onOwnerSignOut
}: NavbarProps) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const displayName = 'EVANS';
  const monogram = 'E';

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'WHAT I CAN DO', href: '#capabilities' },
    { label: 'ABOUT', href: '#about' },
    { label: 'AWARDS', href: '#awards' },
    { label: 'TRAININGS', href: '#trainings' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-colors duration-300 backdrop-blur-md ${
      isDarkMode 
        ? 'bg-[#0C0C0C]/85 border-b border-neutral-800/80 text-white' 
        : 'bg-white/85 border-b border-neutral-200/80 text-neutral-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Left: Brand Monogram + Name */}
        <div className="flex items-center gap-3">
          <a 
            href="#hero" 
            className="flex items-center gap-2.5 group cursor-pointer"
            onClick={(e) => handleNavClick(e, '#hero')}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm tracking-wider transition-transform duration-300 group-hover:scale-105 shadow-sm ${
              isDarkMode 
                ? 'bg-neutral-900 text-white border border-neutral-700' 
                : 'bg-neutral-900 text-white border border-neutral-900'
            }`}>
              {monogram}
            </div>
            <span className="font-semibold tracking-wider text-sm uppercase">
              {displayName}
            </span>
          </a>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-[12px] font-medium tracking-widest uppercase transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-neutral-400 hover:text-white' 
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Owner Edit Button (When signed in) + Theme Toggle + Hire Me button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* SINGLE 'Edit Portfolio' Button — ONLY visible when owner is signed in */}
          {isOwnerSignedIn && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenStudio}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide uppercase bg-amber-500 hover:bg-amber-400 text-black shadow-md cursor-pointer transition-all duration-200 transform hover:scale-105 active:scale-95"
                title="Open Live Portfolio Studio CMS"
              >
                <Sliders size={13} />
                <span>Edit Portfolio</span>
              </button>

              {onOwnerSignOut && (
                <button
                  onClick={onOwnerSignOut}
                  className="p-1.5 rounded-full text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                  title="Sign out of Owner Mode"
                  aria-label="Sign out of Owner Mode"
                >
                  <LogOut size={14} />
                </button>
              )}
            </div>
          )}

          {/* Theme Toggle (Sun / Moon) with smooth transitions */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark and Light Mode"
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer transform hover:scale-110 active:scale-90 shadow-sm ${
              isDarkMode 
                ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600' 
                : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:text-black hover:border-neutral-400'
            }`}
          >
            {isDarkMode ? (
              <Sun size={17} className="transition-transform duration-500 rotate-0 hover:rotate-90 text-amber-400" />
            ) : (
              <Moon size={17} className="transition-transform duration-500 rotate-0 hover:-rotate-45 text-neutral-800" />
            )}
          </button>

          {/* Hire Me Button with micro-interaction */}
          <button
            onClick={onHireMeClick}
            className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 shadow-md ${
              isDarkMode
                ? 'bg-transparent text-white border-neutral-500 hover:bg-white hover:text-black hover:border-white hover:shadow-white/10'
                : 'bg-neutral-900 text-white border-neutral-900 hover:bg-black hover:shadow-neutral-900/20'
            }`}
          >
            Hire Me
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'border-neutral-800 text-neutral-300 hover:text-white' 
                : 'border-neutral-200 text-neutral-700 hover:text-black'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-6 py-6 border-b transition-colors ${
          isDarkMode ? 'bg-[#0E0E0E] border-neutral-800' : 'bg-white border-neutral-200'
        }`}>
          <div className="flex flex-col gap-4">
            {/* Owner banner in mobile drawer when logged in */}
            {isOwnerSignedIn && (
              <div className="pb-3 border-b border-amber-500/20 flex items-center justify-between">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenStudio) onOpenStudio();
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-amber-500 text-black hover:bg-amber-400 transition-colors"
                >
                  <Sliders size={14} />
                  <span>Edit Portfolio (CMS)</span>
                </button>
                {onOwnerSignOut && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOwnerSignOut();
                    }}
                    className="p-2 text-xs text-neutral-400 hover:text-red-400"
                    title="Sign Out"
                  >
                    <LogOut size={16} />
                  </button>
                )}
              </div>
            )}
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium tracking-wider uppercase py-1 ${
                  isDarkMode ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-black'
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenArchive();
              }}
              className="text-left text-sm font-medium tracking-wider uppercase py-1 text-amber-500 hover:underline"
            >
              All Projects Archive ↗
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
