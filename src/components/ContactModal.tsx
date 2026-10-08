import React, { useState } from 'react';
import { X, Mail, MapPin, CheckCircle2, Github, Linkedin, ExternalLink } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-[#111111] border-2 border-[#D7E2EA]/30 rounded-[32px] p-6 sm:p-8 text-[#D7E2EA] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:bg-white/10 transition-colors"
          aria-label="Close Contact Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-wide text-white">
              Message Transmitted
            </h3>
            <p className="text-sm text-[#D7E2EA]/70 max-w-sm mx-auto font-light">
              Thanks for reaching out! Evans has received your inquiry and will connect back promptly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', message: '' });
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-white text-black font-medium text-xs uppercase tracking-widest hover:bg-white/90 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-2">
              <span className="text-xs uppercase font-medium tracking-widest text-[#D7E2EA]/60 font-mono">
                University of Ghana · Computer Science &amp; Math
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1">
                Let&apos;s Connect
              </h3>
              <p className="text-xs text-[#D7E2EA]/60 font-light mt-0.5">
                Have a project, collaboration, or software opportunity?
              </p>
            </div>

            {/* Quick Details */}
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between text-xs text-[#D7E2EA]/70 gap-2">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>evans.osei.dev@gmail.com</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Legon, Ghana</span>
              </span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ama Mensah"
                className="w-full px-4 py-3 rounded-2xl bg-[#1c1c1c] border border-white/10 text-white placeholder-[#D7E2EA]/30 text-sm focus:outline-none focus:border-[#D7E2EA]/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-2xl bg-[#1c1c1c] border border-white/10 text-white placeholder-[#D7E2EA]/30 text-sm focus:outline-none focus:border-[#D7E2EA]/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1">
                Message / Idea
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about what you are building or looking to collaborate on..."
                className="w-full px-4 py-3 rounded-2xl bg-[#1c1c1c] border border-white/10 text-white placeholder-[#D7E2EA]/30 text-sm focus:outline-none focus:border-[#D7E2EA]/60 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full font-medium uppercase tracking-widest text-white text-sm transition-all duration-300 cursor-pointer shadow-lg active:scale-98"
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                outline: '2px solid white',
                outlineOffset: '-3px',
              }}
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
