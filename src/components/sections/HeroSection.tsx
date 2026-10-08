import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowRight, Sparkles, Download, Mail, Terminal, Cpu, Code2, Globe } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { data, openCVModal } = usePortfolio();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMouseOffset({
      x: (clientX - centerX) / 45,
      y: (clientY - centerY) / 45,
    });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-6 md:px-10 overflow-hidden"
    >
      {/* Ambient gradient glow in background */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/15 to-transparent blur-[120px] rounded-full"
        style={{
          transform: `translate(calc(-50% + ${mouseOffset.x * 0.7}px), calc(-50% + ${mouseOffset.y * 0.7}px))`,
        }}
      />

      <div className="relative max-w-5xl mx-auto w-full text-center flex flex-col items-center z-10">
        {/* Subtitle / Status tag - unboxed metadata */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-xs text-slate-300 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-cyan-300">University of Ghana</span>
          <span className="text-slate-500">·</span>
          <span>Computer Science & Mathematics</span>
          <span className="text-slate-500">·</span>
          <span>Available for 2026 Opportunities</span>
        </div>

        {/* Small greeting */}
        <p className="text-base md:text-lg font-medium text-cyan-400 font-mono tracking-wide mb-3 animate-in fade-in slide-in-from-bottom-4 duration-600">
          Hi, I'm {data.profile.name}.
        </p>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl mb-6 text-balance animate-in fade-in slide-in-from-bottom-5 duration-700">
          I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">digital experiences</span>, intelligent systems, and ideas into reality.
        </h1>

        {/* Supporting text */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10 text-balance font-normal animate-in fade-in slide-in-from-bottom-6 duration-800">
          {data.profile.supportingText}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16 animate-in fade-in slide-in-from-bottom-7 duration-900">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            <span>Explore My Work</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 active:scale-95 backdrop-blur-sm"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Let's Connect</span>
          </a>

          <button
            onClick={openCVModal}
            className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-300 hover:text-white bg-transparent hover:bg-white/[0.04] border border-white/[0.08] hover:border-cyan-500/30 rounded-xl transition-all duration-200 active:scale-95"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Download CV</span>
          </button>
        </div>

        {/* Floating tech snapshot card with subtle 3D tilt */}
        <div
          className="w-full max-w-3xl glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 shadow-2xl shadow-black/40 transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${-mouseOffset.y * 0.4}deg) rotateY(${mouseOffset.x * 0.4}deg)`,
          }}
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 text-slate-400">~/evans-osei/core-stack</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-slate-400">
              <span>TypeScript</span>
              <span>·</span>
              <span>Python</span>
              <span>·</span>
              <span>Algorithms</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Code2 className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Core</span>
              </div>
              <p className="text-sm font-semibold text-slate-200">Full-Stack Dev</p>
              <p className="text-xs text-slate-400 mt-0.5">React · Node · Express</p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-center gap-2 text-indigo-400 mb-1">
                <Cpu className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Intelligence</span>
              </div>
              <p className="text-sm font-semibold text-slate-200">AI & Math</p>
              <p className="text-xs text-slate-400 mt-0.5">Python · Linear Algebra</p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Terminal className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Storage</span>
              </div>
              <p className="text-sm font-semibold text-slate-200">Databases</p>
              <p className="text-xs text-slate-400 mt-0.5">Postgres · Firebase</p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-center gap-2 text-sky-400 mb-1">
                <Globe className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Focus</span>
              </div>
              <p className="text-sm font-semibold text-slate-200">Game Tech</p>
              <p className="text-xs text-slate-400 mt-0.5">WebGL · Canvas · Physics</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
