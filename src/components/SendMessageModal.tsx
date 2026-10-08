import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface SendMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitMessage?: (msg: { name: string; email: string; message: string }) => void;
}

export function SendMessageModal({ isOpen, onClose, onSubmitMessage }: SendMessageModalProps) {
  const { isDarkMode } = useTheme();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;
    if (onSubmitMessage) {
      onSubmitMessage({ name: fullName, email, message });
    }
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFullName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`relative w-full max-w-lg rounded-3xl border shadow-2xl p-6 sm:p-8 transition-colors ${
          isDarkMode ? 'bg-[#121212] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-500/10">
          <h3 className="text-xl font-bold tracking-tight">
            Send Me a Message
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-500/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close message modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content / Form */}
        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <CheckCircle2 size={48} className="text-emerald-400 mb-3 animate-bounce" />
            <h4 className="text-lg font-bold">Message Received!</h4>
            <p className="text-xs text-neutral-400 mt-1 max-w-xs">
              Thank you for reaching out. I'll get back to your inquiry promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-neutral-900 border-neutral-800 focus:border-white text-white placeholder-neutral-500' 
                    : 'bg-neutral-50 border-neutral-300 focus:border-black text-neutral-900 placeholder-neutral-400'
                }`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-neutral-900 border-neutral-800 focus:border-white text-white placeholder-neutral-500' 
                    : 'bg-neutral-50 border-neutral-300 focus:border-black text-neutral-900 placeholder-neutral-400'
                }`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Message
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell me about your project or inquiry..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none resize-none transition-colors ${
                  isDarkMode 
                    ? 'bg-neutral-900 border-neutral-800 focus:border-white text-white placeholder-neutral-500' 
                    : 'bg-neutral-50 border-neutral-300 focus:border-black text-neutral-900 placeholder-neutral-400'
                }`}
              />
            </div>

            <button
              type="submit"
              className={`mt-2 w-full py-3.5 rounded-full font-semibold text-xs tracking-wider uppercase border transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-neutral-200 border-white' 
                  : 'bg-neutral-900 text-white hover:bg-neutral-800 border-neutral-900'
              }`}
            >
              <span>SEND MESSAGE</span>
              <Send size={13} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
