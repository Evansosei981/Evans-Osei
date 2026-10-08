import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowUp, Github, Linkedin, Twitter, Mail, Shield } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { data } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#05070c] relative z-10 pt-16 pb-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Identity */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl text-cyan-400">EO</span>
              <span className="font-display font-bold text-xl text-white">
                {data.profile.name}
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {data.profile.tagline}
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-2">
              <span>University of Ghana</span>
              <span>·</span>
              <span>Accra, Ghana</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase font-mono text-slate-400 tracking-wider block mb-3">
              Navigation
            </span>
            <div className="flex flex-col space-y-2 text-sm text-slate-400">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#skills" className="hover:text-white transition-colors">Skills & Stack</a>
              <a href="#projects" className="hover:text-white transition-colors">Things I've Built</a>
              <a href="#experience" className="hover:text-white transition-colors">Trajectory</a>
              <a href="#blog" className="hover:text-white transition-colors">Writings & Articles</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          {/* Connect & Admin */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase font-mono text-slate-400 tracking-wider block mb-3">
              Channels
            </span>
            <div className="flex flex-col space-y-2 text-sm text-slate-400">
              <a
                href={data.profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4 text-slate-400" />
                <span>GitHub</span>
              </a>
              <a
                href={data.profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4 text-slate-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${data.profile.email}`}
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{data.profile.email}</span>
              </a>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 {data.profile.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Built with React · TypeScript · Tailwind</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
