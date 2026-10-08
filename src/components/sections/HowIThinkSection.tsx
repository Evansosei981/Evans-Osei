import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Lightbulb, Search, PenTool, Cpu, CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react';

export const HowIThinkSection: React.FC = () => {
  const { data } = usePortfolio();
  const [activeStep, setActiveStep] = useState<number>(0);

  const icons = [Lightbulb, Search, PenTool, Cpu, CheckCircle2, RefreshCw];

  return (
    <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto relative">
      <div className="border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 glass-panel relative overflow-hidden">
        {/* Ambient background blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>02</span>
            <span className="text-slate-600">/</span>
            <span>METHODOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            How I think.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            My engineering philosophy for transforming abstract concepts into reliable, production-ready software.
          </p>
        </div>

        {/* Step Flow Indicators (Interactive Horizontal Bar) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-10">
          {data.thinkingSteps.map((step, idx) => {
            const Icon = icons[idx] || Lightbulb;
            const isActive = activeStep === idx;

            return (
              <button
                key={step.label}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                className={`group text-left p-3.5 sm:p-4 rounded-xl transition-all duration-200 border relative ${
                  isActive
                    ? 'bg-gradient-to-b from-cyan-950/60 to-slate-900/90 border-cyan-400/50 shadow-lg shadow-cyan-950/30'
                    : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.06] hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-semibold ${
                      isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-400'
                    }`}
                  >
                    0{step.step}
                  </span>
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  />
                </div>
                <div
                  className={`text-xs sm:text-sm font-display font-bold tracking-tight ${
                    isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}
                >
                  {step.label}
                </div>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Focused Active Step Detail Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4 mb-6">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                Stage 0{data.thinkingSteps[activeStep].step} · {data.thinkingSteps[activeStep].label}
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                {data.thinkingSteps[activeStep].tagline}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Iterative Feedback Loop</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <div className="text-xs uppercase font-medium tracking-wider text-slate-400 mb-2">
                Conceptual Approach
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {data.thinkingSteps[activeStep].description}
              </p>
            </div>

            <div>
              <div className="text-xs uppercase font-medium tracking-wider text-slate-400 mb-2">
                Practical Execution
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.04]">
                {data.thinkingSteps[activeStep].execution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
