import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Coffee, ArrowDown, Send } from 'lucide-react';

interface HeroSectionProps {
  onScrollToWork: () => void;
  onHireMeClick?: () => void;
}

export function HeroSection({ onScrollToWork, onHireMeClick }: HeroSectionProps) {
  const { isDarkMode } = useTheme();
  const [coffeeCount, setCoffeeCount] = useState(308);
  const [hasClickedCoffee, setHasClickedCoffee] = useState(false);
  const [customPhoto] = useState<string | null>(() => {
    try {
      return localStorage.getItem('evans_custom_photo_url') || '/evans_cutout.svg';
    } catch {
      return '/evans_cutout.svg';
    }
  });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const fullName = 'EVANS OSEI';
  const roleTitle = 'Software Developer & Systems Engineer';
  const roleSub = 'BSc Computer Science & Mathematics · University of Ghana, Legon';

  // Subtle mouse parallax for desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // only run parallax on larger screens to preserve mobile performance
      if (window.innerWidth < 768) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCoffeeClick = () => {
    setCoffeeCount((prev) => prev + 1);
    setHasClickedCoffee(true);
    setTimeout(() => setHasClickedCoffee(false), 900);
  };

  return (
    <section 
      id="hero" 
      className={`relative w-full min-h-[680px] sm:min-h-[760px] md:min-h-[820px] flex flex-col items-center justify-between overflow-hidden pt-8 pb-12 px-4 sm:px-6 transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-[#0C0C0C] text-[#EDEDED] bg-grid-pattern-dark' 
          : 'bg-[#F8F9FA] text-[#111827] bg-grid-pattern-light'
      }`}
    >
      {/* 1. ATMOSPHERIC BACKGROUND GRADIENTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {isDarkMode ? (
          <>
            {/* Deep Indigo/Cyan Ambient Radial Glows */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[500px] rounded-full bg-gradient-to-b from-blue-900/20 via-indigo-950/15 to-transparent blur-3xl opacity-75" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-emerald-950/15 blur-3xl opacity-60" />
            <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-950/15 blur-3xl opacity-50" />
          </>
        ) : (
          <>
            {/* Soft Ambient Warm Glows for Light Mode */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[500px] rounded-full bg-gradient-to-b from-blue-100/70 via-indigo-50/50 to-transparent blur-3xl opacity-90" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-emerald-50/60 blur-3xl opacity-70" />
            <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] rounded-full bg-sky-50/60 blur-3xl opacity-60" />
          </>
        )}
      </div>

      {/* 2. TOP SUB-HEADER: Availability & Discipline Badge */}
      <div className="relative z-20 flex flex-col items-center text-center pt-1 animate-hero-slide-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono mb-2 transition-all duration-300 border backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>
            Available for Software Engineering &amp; Systems Roles
          </span>
        </div>
        <p className={`text-xs sm:text-sm font-mono tracking-wider transition-colors duration-300 ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
        }`}>
          {roleTitle} · {roleSub}
        </p>
      </div>

      {/* 3. HERO CENTERSTAGE: LARGE 'EVANS OSEI' NAME TEXT & OVERLAPPING CLEAN CUTOUT PHOTO */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px] md:min-h-[500px] my-2 sm:my-4">
        {/* Large 'EVANS OSEI' Typography Positioned Directly Behind Cutout Photo */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
          style={{
            transform: `translateX(${mousePos.x * -16}px) translateY(${mousePos.y * -8}px)`,
            transition: 'transform 0.25s ease-out'
          }}
        >
          <div className="animate-hero-slide-up opacity-80 sm:opacity-85">
            <h1 
              className={`text-[15vw] sm:text-[16vw] md:text-[17vw] lg:text-[18vw] font-black uppercase tracking-tight whitespace-nowrap leading-none block select-none ${
                isDarkMode ? 'outline-text-dark' : 'outline-text-light'
              }`}
              style={{
                fontFamily: "'Kanit', sans-serif",
                letterSpacing: '0.04em'
              }}
            >
              {fullName}
            </h1>
          </div>
        </div>

        {/* CLEAN CUTOUT PHOTO OF EVANS OSEI (Positioned in front of/overlapping the large 'EVANS OSEI' name text) */}
        <div 
          className="relative z-10 flex flex-col items-center justify-end w-full max-w-xl px-4 pointer-events-auto"
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 2.5}deg) rotateX(${mousePos.y * -2.5}deg)`,
            transition: 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          {/* Pure cutout photo: No logos, icons, or extra graphics — just the cutout photo and name typography */}
          <div className="animate-hero-avatar-in">
            <div className="animate-hero-avatar-bob">
              <div className="relative w-[280px] sm:w-[360px] md:w-[430px] lg:w-[480px] aspect-[4/5] flex items-end justify-center">
                <img
                  src={customPhoto || '/evans_cutout.svg'}
                  alt="Evans Osei — Software Engineer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)] select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. ACTIONS ROW (Hire Me & Selected Work) */}
      <div className="relative z-20 flex flex-wrap items-center justify-center gap-3 my-2 animate-hero-slide-up">
        {onHireMeClick && (
          <button
            onClick={onHireMeClick}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 shadow-md ${
              isDarkMode
                ? 'bg-white text-black border-white hover:bg-neutral-200 hover:shadow-white/10'
                : 'bg-neutral-900 text-white border-neutral-900 hover:bg-black hover:shadow-neutral-900/20'
            }`}
          >
            <Send size={13} />
            <span>Hire Me</span>
          </button>
        )}

        <button
          onClick={onScrollToWork}
          className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
            isDarkMode
              ? 'bg-neutral-900/80 border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500'
              : 'bg-white border-neutral-300 text-neutral-700 hover:text-black hover:border-neutral-400'
          }`}
        >
          <span>Selected Work</span>
          <ArrowDown size={13} />
        </button>
      </div>

      {/* 5. BOTTOM CONTROLS BAR: 'Get me a coffee' + 'SCROLL DOWN' (Positioned safely away from avatar on mobile) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between px-2 sm:px-4 mt-auto">
        {/* Floating Coffee Button with hover/press micro-interactions */}
        <div className="flex items-center">
          <button
            onClick={handleCoffeeClick}
            className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium border shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95 ${
              isDarkMode 
                ? 'bg-neutral-900/90 border-neutral-800 text-neutral-300 hover:text-white hover:border-amber-500/50 hover:shadow-amber-500/10' 
                : 'bg-white/95 border-neutral-300 text-neutral-800 hover:border-amber-500/60 hover:shadow-amber-500/15'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span>Get me a coffee</span>
              <span className="text-base">☕</span>
            </span>
            <span className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold transition-colors ${
              isDarkMode ? 'bg-neutral-800 text-amber-400' : 'bg-neutral-100 text-amber-600'
            }`}>
              {coffeeCount}
            </span>
            {hasClickedCoffee && (
              <span className="animate-ping absolute -top-1 -right-1 flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            )}
          </button>
        </div>

        {/* Vertical Scroll Down Indicator */}
        <div 
          onClick={onScrollToWork}
          className="flex items-center gap-2 cursor-pointer group select-none py-1 px-2 rounded-lg transition-colors hover:opacity-100"
        >
          <span className={`text-[10px] uppercase tracking-[0.2em] font-mono font-semibold transition-colors ${
            isDarkMode ? 'text-neutral-500 group-hover:text-white' : 'text-neutral-500 group-hover:text-black'
          }`}>
            SCROLL DOWN
          </span>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:translate-y-1 ${
            isDarkMode ? 'border-neutral-700 group-hover:border-white' : 'border-neutral-300 group-hover:border-black'
          }`}>
            <ArrowDown size={11} className={isDarkMode ? 'text-neutral-400 group-hover:text-white' : 'text-neutral-600 group-hover:text-black'} />
          </div>
        </div>
      </div>
    </section>
  );
}
