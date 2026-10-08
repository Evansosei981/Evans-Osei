import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Linkedin, Twitter, ArrowRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data, submitContactMessage } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      submitContactMessage(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-10 max-w-7xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Direct Inquiries & Details */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <span>11</span>
              <span className="text-slate-600">/</span>
              <span>GET IN TOUCH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Let's build something meaningful.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
              Have an idea, project, collaboration or opportunity? I'd love to hear from you.
            </p>
          </div>

          {/* Direct channels */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <a
              href={`mailto:${data.profile.email}`}
              className="group flex items-center gap-4 p-4 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-400/30 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-400/30 text-cyan-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase font-mono text-slate-400">Direct Email</div>
                <div className="text-sm font-semibold text-white group-hover:text-cyan-200 transition-colors">
                  {data.profile.email}
                </div>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel border border-white/[0.08]">
              <div className="w-10 h-10 rounded-xl bg-indigo-950/40 border border-indigo-400/30 text-indigo-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase font-mono text-slate-400">Location</div>
                <div className="text-sm font-semibold text-white">
                  University of Ghana, Legon · {data.profile.location}
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
              Professional Profiles
            </span>
            <div className="flex items-center gap-3">
              {data.profile.githubUrl && (
                <a
                  href={data.profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {data.profile.linkedinUrl && (
                <a
                  href={data.profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {data.profile.twitterUrl && (
                <a
                  href={data.profile.twitterUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-colors"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 lg:p-10 rounded-3xl glass-panel border border-white/10 shadow-2xl relative">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Message Transmitted!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Your note has been securely recorded and dispatched directly to Evans's workspace inbox.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-semibold text-white transition-colors"
                >
                  <span>Send Another Message</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ama Mensah"
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@organization.com"
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Opportunity / Collaboration"
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about what you are building or how we can collaborate..."
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                {errorMsg && (
                  <div className="text-xs text-rose-400 font-mono">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
