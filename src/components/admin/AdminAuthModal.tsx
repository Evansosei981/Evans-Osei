import React, { useState } from 'react';
import { Lock, KeyRound, AlertCircle, X, ShieldCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export function AdminAuthModal({ isOpen, onClose, onAuthenticated }: AdminAuthModalProps) {
  const { isDarkMode } = useTheme();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default passcodes for Evans
    const validCodes = ['evans', 'evans2026', 'admin', 'osei'];
    if (validCodes.includes(passcode.trim().toLowerCase())) {
      setError('');
      setPasscode('');
      onAuthenticated();
    } else {
      setError('Invalid passkey. Access is restricted to Evans Osei.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className={`w-full max-w-sm rounded-2xl border p-6 shadow-2xl relative transition-all ${
          isDarkMode 
            ? 'bg-[#121212] border-neutral-800 text-white' 
            : 'bg-white border-neutral-200 text-neutral-900'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
            <Lock size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold font-mono tracking-tight">Portfolio Admin</h3>
            <p className="text-xs text-neutral-400">Owner Content Management System</p>
          </div>
        </div>

        <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
          This portal allows Evans Osei to update projects, metrics, and biography without modifying codebase files. Enter your passkey to proceed.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError('');
                }}
                autoFocus
                placeholder="Enter passkey (e.g. evans)"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border font-mono outline-none transition-all ${
                  isDarkMode
                    ? 'bg-neutral-900 border-neutral-700 text-white placeholder-neutral-500 focus:border-amber-500'
                    : 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-neutral-900'
                }`}
              />
            </div>
            {error && (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-red-500">
                <AlertCircle size={13} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-colors ${
                isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase bg-amber-500 hover:bg-amber-400 text-black flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ShieldCheck size={14} />
              <span>Unlock CMS</span>
            </button>
          </div>
        </form>

        <div className="mt-5 pt-4 border-t border-neutral-800/60 text-[11px] font-mono text-neutral-400 text-center">
          Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px]">Ctrl+Shift+E</kbd> anywhere on the site.
        </div>
      </div>
    </div>
  );
}
