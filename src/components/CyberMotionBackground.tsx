import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Video, Eye, Sparkles, Volume2, VolumeX, Shield, Terminal } from 'lucide-react';

export type AtmosphereMode = 'cyber-dev' | 'glitch-reality' | 'deep-matrix';

interface CyberMotionBackgroundProps {
  mode?: AtmosphereMode;
}

export const CyberMotionBackground: React.FC<CyberMotionBackgroundProps> = ({ mode = 'cyber-dev' }) => {
  const [currentMode, setCurrentMode] = useState<AtmosphereMode>(mode);
  const [isVideoActive, setIsVideoActive] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);
  const [scanlines, setScanlines] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  // Sound generator (ambient synth hum when toggled)
  useEffect(() => {
    if (!soundEnabled) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, ctx.currentTime); // Low A hum

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, ctx.currentTime);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
    } catch {
      // Audio not permitted without user interaction
    }

    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, [soundEnabled]);

  // Canvas particle and HUD graphics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Floating particles & code symbols
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      symbol?: string;
      color: string;
      glitchOffset: number;
    }

    const GLITCH_GLYPHS = ['01', 'λ', '∑', '∫', '404', 'REALITY', 'EXEC', 'Ψ', '0x1F', '∇', '[]', '<dev/>'];

    const getModeColor = (m: AtmosphereMode) => {
      if (m === 'cyber-dev') return ['rgba(239, 68, 68, ', 'rgba(56, 189, 248, ', 'rgba(244, 63, 94, '];
      if (m === 'glitch-reality') return ['rgba(168, 85, 247, ', 'rgba(56, 189, 248, ', 'rgba(236, 72, 153, '];
      return ['rgba(16, 185, 129, ', 'rgba(52, 211, 153, ', 'rgba(6, 182, 212, '];
    };

    const particles: Particle[] = [];
    const count = Math.min(Math.floor((width * height) / 20000), 60);

    for (let i = 0; i < count; i++) {
      const isGlyph = Math.random() < 0.35;
      const palette = getModeColor(currentMode);
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: isGlyph ? 11 : Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        symbol: isGlyph ? GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)] : undefined,
        color: palette[Math.floor(Math.random() * palette.length)],
        glitchOffset: 0
      });
    }

    let animId: number;

    const render = () => {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw subtle perspective digital grid
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = currentMode === 'cyber-dev' ? 'rgba(239, 68, 68, 0.03)' : 'rgba(56, 189, 248, 0.03)';
      const gridSize = 60;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw particles & glyphs
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        // Occasional random glitch jitter
        if (Math.random() < 0.02) {
          p.glitchOffset = (Math.random() - 0.5) * 12;
        } else {
          p.glitchOffset *= 0.8;
        }

        const drawX = p.x + p.glitchOffset;
        const drawY = p.y;

        // Interactive mouse deflection
        const dx = mx - drawX;
        const dy = my - drawY;
        const dist = Math.hypot(dx, dy);
        if (dist < 130 && dist > 0) {
          const force = (1 - dist / 130) * 15;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distBetween < 110) {
            const lineAlpha = (1 - distBetween / 110) * 0.12;
            ctx.strokeStyle = `${p.color}${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        if (p.symbol) {
          ctx.font = `600 ${p.size}px 'JetBrains Mono', monospace`;
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.fillText(p.symbol, drawX, drawY);
        } else {
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = `${p.color}0.5)`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Cursor Atmospheric Halo
      if (mx > 0 && my > 0) {
        const glowColor =
          currentMode === 'cyber-dev'
            ? 'rgba(239, 68, 68, 0.04)'
            : currentMode === 'glitch-reality'
            ? 'rgba(168, 85, 247, 0.05)'
            : 'rgba(16, 185, 129, 0.04)';
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 320);
        grad.addColorStop(0, glowColor);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [currentMode]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* 1. Seamless Video Background Loop */}
      {isVideoActive && (
        <div className="absolute inset-0 w-full h-full opacity-35 mix-blend-screen transition-opacity duration-1000 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 filter contrast-125 brightness-75"
            poster="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%230C0C0C'/></svg>"
          >
            {/* High reliability cyber tech video stream sources */}
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-graphs-and-data-31913-large.mp4"
              type="video/mp4"
            />
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-digital-interface-31910-large.mp4"
              type="video/mp4"
            />
          </video>
          {/* Subtle gradient vignette to blend seamlessly into #0C0C0C */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-[#0C0C0C]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C] via-transparent to-[#0C0C0C]" />
        </div>
      )}

      {/* 2. Interactive Generative HUD & Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-90"
      />

      {/* 3. CRT Scanline & Glitch Grid Texture */}
      {scanlines && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.6) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
            backgroundSize: '100% 3px, 6px 100%',
          }}
        />
      )}

      {/* 4. Cyber Corner UI Brackets matching "GLITCH REALITY" reference */}
      <div className="absolute top-6 left-6 text-white/20 font-mono text-[10px] tracking-widest hidden sm:block">
        ┌ SYSTEM://EVANS_OSEI_V26 · ONLINE
      </div>
      <div className="absolute top-6 right-6 text-white/20 font-mono text-[10px] tracking-widest hidden sm:block">
        REALITY_OVERRATED · [HUD_ACTIVE] ┐
      </div>
      <div className="absolute bottom-6 left-6 text-white/20 font-mono text-[10px] tracking-widest hidden sm:block">
        └ UNIV_OF_GHANA // LEGON_CAMPUS
      </div>
      <div className="absolute bottom-6 right-6 text-white/20 font-mono text-[10px] tracking-widest hidden sm:block">
        NOT_EVERYTHING_IS_REAL ┘
      </div>

      {/* 5. Floating Atmosphere Control Dock (Bottom Left on Desktop, pointer-events-auto) */}
      <div className="absolute bottom-5 left-5 z-40 pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-black/80 border border-white/15 backdrop-blur-md text-xs font-mono text-slate-300 shadow-2xl">
        {/* Mode Switcher */}
        <button
          onClick={() => {
            const nextMode: AtmosphereMode =
              currentMode === 'cyber-dev'
                ? 'glitch-reality'
                : currentMode === 'glitch-reality'
                ? 'deep-matrix'
                : 'cyber-dev';
            setCurrentMode(nextMode);
          }}
          className="px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-white/10 text-[11px] text-cyan-300 flex items-center gap-1.5 transition-colors"
          title="Switch atmospheric aesthetic"
        >
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span className="capitalize">{currentMode.replace('-', ' ')}</span>
        </button>

        {/* Video Toggle */}
        <button
          onClick={() => setIsVideoActive(!isVideoActive)}
          className={`p-1.5 rounded-full transition-colors ${
            isVideoActive ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 hover:text-slate-300'
          }`}
          title={isVideoActive ? 'Pause Video Background' : 'Resume Video Background'}
        >
          <Video className="w-3.5 h-3.5" />
        </button>

        {/* Scanlines Toggle */}
        <button
          onClick={() => setScanlines(!scanlines)}
          className={`p-1.5 rounded-full transition-colors ${
            scanlines ? 'text-purple-400 bg-purple-500/10' : 'text-slate-500 hover:text-slate-300'
          }`}
          title="Toggle CRT Glitch Scanlines"
        >
          <Terminal className="w-3.5 h-3.5" />
        </button>

        {/* Ambient Sound Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-1.5 rounded-full transition-colors ${
            soundEnabled ? 'text-amber-400 bg-amber-500/10' : 'text-slate-500 hover:text-slate-300'
          }`}
          title={soundEnabled ? 'Mute Cyber Audio' : 'Enable Cyber Audio Hum'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
