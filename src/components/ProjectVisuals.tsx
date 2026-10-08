import React from 'react';

// ==========================================
// 1. PULSECARE PLATFORM VISUALS
// ==========================================

export const PulseCareHeroVisual: React.FC = () => (
  <div className="w-full h-full min-h-[320px] bg-gradient-to-br from-[#0B1528] via-[#08101E] to-[#040810] p-5 sm:p-7 flex flex-col justify-between select-none relative overflow-hidden">
    {/* Ambient Glow */}
    <div className="absolute -top-16 -right-16 w-56 h-56 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

    {/* Header bar */}
    <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center font-black text-black text-sm">
          +
        </div>
        <div>
          <div className="text-white font-bold text-sm tracking-wide">PulseCare Ghana</div>
          <div className="text-[10px] text-cyan-400 font-mono">Real-time Pharmacy Network · Accra</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] text-emerald-400 font-mono uppercase tracking-wider">42 Dispensaries Active</span>
      </div>
    </div>

    {/* Search & Results Mockup */}
    <div className="my-auto space-y-3 relative z-10 py-4">
      {/* Search Input Mock */}
      <div className="w-full p-3 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="text-cyan-400 font-mono">🔍</span>
          <span className="font-mono text-white">Amoxicillin 500mg Capsules</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
          Instant Match
        </span>
      </div>

      {/* Pharmacy Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="p-3 rounded-xl bg-white/[0.03] border border-cyan-400/30">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-white">MedPlus Pharmacy Legon</div>
              <div className="text-[10px] text-slate-400">0.8 km · Near UG Main Gate</div>
            </div>
            <span className="text-emerald-400 text-xs font-mono font-bold">GH₵ 38.00</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
            <span className="text-emerald-400">✓ In Stock (24 packs)</span>
            <span className="text-slate-400">Reserve ↗</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-white">TopMart Dispensary East Legon</div>
              <div className="text-[10px] text-slate-400">2.1 km · Boundary Road</div>
            </div>
            <span className="text-emerald-400 text-xs font-mono font-bold">GH₵ 40.00</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
            <span className="text-emerald-400">✓ In Stock (15 packs)</span>
            <span className="text-slate-400">Reserve ↗</span>
          </div>
        </div>
      </div>
    </div>

    {/* Footer status */}
    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-white/10 pt-3 relative z-10">
      <span>Geo-Inventory Sync v2.4</span>
      <span className="text-cyan-400">Zero Stockout Mission</span>
    </div>
  </div>
);

export const PulseCareMobileVisual: React.FC = () => (
  <div className="w-full h-full bg-[#0A1220] p-4 flex flex-col justify-between select-none relative overflow-hidden">
    <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400">
      <span>PULSECARE MOBILE</span>
      <span className="text-emerald-400">GPS ACTIVE</span>
    </div>
    <div className="my-auto space-y-2">
      <div className="text-xs font-bold text-white">Prescription Discovery</div>
      <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] text-slate-300">
        📍 14 Verified Pharmacies within 3km of Legon Campus
      </div>
    </div>
    <div className="text-[9px] font-mono text-slate-500">Optimistic Cache-First UI</div>
  </div>
);

export const PulseCareAnalyticsVisual: React.FC = () => (
  <div className="w-full h-full bg-[#070E1A] p-4 flex flex-col justify-between select-none relative overflow-hidden">
    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
      <span>DISPENSARY AUDIT</span>
      <span className="text-cyan-400">LIVE SYNC</span>
    </div>
    <div className="my-auto space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-lg font-mono font-bold text-white">99.4%</span>
        <span className="text-[10px] text-emerald-400 font-mono">Stock Accuracy</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="w-[92%] h-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
      </div>
    </div>
    <div className="text-[9px] font-mono text-slate-500">Firebase Firestore Real-time Listeners</div>
  </div>
);


// ==========================================
// 2. UG CAMPUS NAVIGATOR VISUALS
// ==========================================

export const UGNavigatorHeroVisual: React.FC = () => (
  <div className="w-full h-full min-h-[320px] bg-gradient-to-br from-[#0F1420] via-[#090D17] to-[#04060B] p-5 sm:p-7 flex flex-col justify-between select-none relative overflow-hidden">
    {/* Map Grid Background */}
    <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="ug-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(215, 226, 234, 0.25)" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ug-grid)" />
      {/* Waypoint connections */}
      <polyline points="40,240 140,160 260,190 380,90 520,130" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="6 4" />
      <circle cx="40" cy="240" r="6" fill="#F43F5E" />
      <circle cx="140" cy="160" r="5" fill="#38BDF8" />
      <circle cx="260" cy="190" r="5" fill="#38BDF8" />
      <circle cx="380" cy="90" r="5" fill="#38BDF8" />
      <circle cx="520" cy="130" r="7" fill="#10B981" />
    </svg>

    {/* Header */}
    <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center font-bold text-black text-xs font-mono">
          UG
        </div>
        <div>
          <div className="text-white font-bold text-sm tracking-wide">UG Campus Navigator</div>
          <div className="text-[10px] text-sky-400 font-mono">University of Ghana, Legon · Graph Engine</div>
        </div>
      </div>
      <span className="text-[11px] text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
        A* Optimal Path
      </span>
    </div>

    {/* Route Demonstration */}
    <div className="my-auto space-y-3 relative z-10 py-4 max-w-md">
      <div className="p-4 rounded-2xl bg-black/60 border border-sky-400/40 backdrop-blur-md space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-rose-400">Start: Dept of Mathematics</span>
          <span className="text-slate-400">➔</span>
          <span className="text-emerald-400">End: Balme Library</span>
        </div>
        <div className="flex items-baseline gap-4 pt-1">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">Walking Duration</div>
            <div className="text-lg font-bold text-white font-mono">6 min 40 sec</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">Total Distance</div>
            <div className="text-lg font-bold text-sky-300 font-mono">510 meters</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">Shade Level</div>
            <div className="text-lg font-bold text-emerald-400 font-mono">85%</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
        <span className="w-2 h-2 rounded-full bg-sky-400" />
        <span>Waypoints: Math Lawn ➔ CCB Walkway ➔ Central Court ➔ Balme Main Gate</span>
      </div>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-white/10 pt-3 relative z-10">
      <span>Undirected Weighted Graph Engine</span>
      <span className="text-sky-400">Offline PWA Supported</span>
    </div>
  </div>
);

export const UGNavigatorScheduleVisual: React.FC = () => (
  <div className="w-full h-full bg-[#0C121D] p-4 flex flex-col justify-between select-none relative overflow-hidden">
    <div className="flex items-center justify-between text-[10px] font-mono text-sky-400">
      <span>TRANSITION WARNING</span>
      <span className="text-amber-400">10 MIN WINDOW</span>
    </div>
    <div className="my-auto space-y-1">
      <div className="text-xs font-bold text-white">MATH 221 (CS Dept) ➔ STAT 223 (CCB)</div>
      <div className="text-[11px] text-slate-400 font-mono">Route computation: 4.2 min via shaded path</div>
    </div>
    <div className="text-[9px] font-mono text-slate-500">Dijkstra & Haversine Distance</div>
  </div>
);

export const UGNavigatorBuildingVisual: React.FC = () => (
  <div className="w-full h-full bg-[#080E18] p-4 flex flex-col justify-between select-none relative overflow-hidden">
    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
      <span>CAMPUS DATABASE</span>
      <span className="text-emerald-400">68 BUILDINGS</span>
    </div>
    <div className="my-auto space-y-1">
      <div className="text-xs font-bold text-white">Balme Library & Great Hall</div>
      <div className="text-[11px] text-slate-300">Wi-Fi zones, study halls, accessibility ramps</div>
    </div>
    <div className="text-[9px] font-mono text-slate-500">Vector Coordinates Layer</div>
  </div>
);


// ==========================================
// 3. NEUROGRAPH AI VISUALS
// ==========================================

export const NeuroGraphHeroVisual: React.FC = () => (
  <div className="w-full h-full min-h-[320px] bg-gradient-to-br from-[#120B20] via-[#0B0715] to-[#040208] p-5 sm:p-7 flex flex-col justify-between select-none relative overflow-hidden">
    {/* Background Neural Matrix */}
    <div className="absolute inset-0 opacity-25 pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <line x1="80" y1="60" x2="220" y2="100" stroke="#A855F7" strokeWidth="1.5" />
        <line x1="80" y1="140" x2="220" y2="100" stroke="#38BDF8" strokeWidth="1.5" />
        <line x1="80" y1="220" x2="220" y2="100" stroke="#A855F7" strokeWidth="1.5" />
        <line x1="80" y1="60" x2="220" y2="180" stroke="#38BDF8" strokeWidth="1.5" />
        <line x1="80" y1="140" x2="220" y2="180" stroke="#A855F7" strokeWidth="1.5" />
        <line x1="80" y1="220" x2="220" y2="180" stroke="#38BDF8" strokeWidth="1.5" />
        <line x1="220" y1="100" x2="360" y2="140" stroke="#38BDF8" strokeWidth="2" />
        <line x1="220" y1="180" x2="360" y2="140" stroke="#A855F7" strokeWidth="2" />

        <circle cx="80" cy="60" r="10" fill="#38BDF8" />
        <circle cx="80" cy="140" r="10" fill="#38BDF8" />
        <circle cx="80" cy="220" r="10" fill="#38BDF8" />
        <circle cx="220" cy="100" r="12" fill="#A855F7" />
        <circle cx="220" cy="180" r="12" fill="#A855F7" />
        <circle cx="360" cy="140" r="14" fill="#EC4899" />
      </svg>
    </div>

    {/* Header */}
    <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-xs font-mono">
          Ψ
        </div>
        <div>
          <div className="text-white font-bold text-sm tracking-wide">NeuroGraph AI Engine</div>
          <div className="text-[10px] text-purple-400 font-mono">Matrix Calculus &amp; Loss Visualizer</div>
        </div>
      </div>
      <span className="text-[11px] text-pink-400 font-mono bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/30">
        Epoch 142 / 200 · Loss: 0.0142
      </span>
    </div>

    {/* Math and Convergence card */}
    <div className="my-auto space-y-3 relative z-10 py-4 max-w-lg">
      <div className="p-4 rounded-2xl bg-black/60 border border-purple-500/30 backdrop-blur-md flex flex-col gap-2">
        <div className="text-xs font-mono text-purple-300">
          Forward Pass: <span className="text-white font-bold">a[l] = σ(W[l] · a[l-1] + b[l])</span>
        </div>
        <div className="text-xs font-mono text-cyan-300">
          Gradient Update: <span className="text-white font-bold">W := W - η · (∂L / ∂W)</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
          <span className="text-slate-400">Convergence Rate: η = 0.025</span>
          <span className="text-emerald-400 font-bold">✓ Decision Boundary Stable</span>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-white/10 pt-3 relative z-10">
      <span>WebGL GPU Shader Computation</span>
      <span className="text-purple-400">Pure Python / TypeScript Core</span>
    </div>
  </div>
);

export const NeuroGraphActivationVisual: React.FC = () => (
  <div className="w-full h-full bg-[#140D24] p-4 flex flex-col justify-between select-none relative overflow-hidden">
    <div className="flex items-center justify-between text-[10px] font-mono text-purple-400">
      <span>ACTIVATION LAYER</span>
      <span className="text-cyan-400">GELU / RELU</span>
    </div>
    <div className="my-auto space-y-1">
      <div className="text-xs font-bold text-white">Non-Linear Transformation</div>
      <div className="text-[11px] text-slate-300 font-mono">f(x) = max(0, x) · Vanishing Gradient Guard</div>
    </div>
    <div className="text-[9px] font-mono text-slate-500">60 FPS WebGL Decision Map</div>
  </div>
);

export const NeuroGraphMatrixVisual: React.FC = () => (
  <div className="w-full h-full bg-[#0D0718] p-4 flex flex-col justify-between select-none relative overflow-hidden">
    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
      <span>TENSOR MATRIX</span>
      <span className="text-pink-400">DIM [128, 64]</span>
    </div>
    <div className="my-auto space-y-1">
      <div className="text-xs font-bold text-white">Backpropagation Jacobian</div>
      <div className="text-[11px] text-slate-300 font-mono">Chain rule partial derivatives</div>
    </div>
    <div className="text-[9px] font-mono text-slate-500">Numerical Calculus Engine</div>
  </div>
);
