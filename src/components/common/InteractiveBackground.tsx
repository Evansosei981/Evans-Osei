import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  symbol?: string;
  isSymbol: boolean;
  baseX: number;
  baseY: number;
}

const MATH_SYMBOLS = ['∑', '∫', 'λ', 'π', '∞', '∂', '∇', 'dx', 'f(x)', '∈', '∀', '⊕', 'Δ', 'θ'];

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const animFrameRef = useRef<number | null>(null);

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
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((width * height) / 22000), 55);

      for (let i = 0; i < particleCount; i++) {
        const isSymbol = Math.random() < 0.28;
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          size: isSymbol ? 13 : Math.random() * 2 + 1.2,
          alpha: isSymbol ? Math.random() * 0.35 + 0.15 : Math.random() * 0.4 + 0.2,
          symbol: isSymbol ? MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)] : undefined,
          isSymbol
        });
      }
    };

    initParticles();

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle futuristic grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.018)';
      ctx.lineWidth = 1;
      const gridSize = 64;
      const startX = 0;
      const startY = 0;

      for (let x = startX; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = startY; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }

        // Mouse proximity deflection
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 140;

        let drawX = p.x;
        let drawY = p.y;

        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 16;
          drawX -= (dx / dist) * force;
          drawY -= (dy / dist) * force;
        }

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distNodes = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distNodes < 110) {
            const lineAlpha = (1 - distNodes / 110) * 0.12;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        if (p.isSymbol && p.symbol) {
          ctx.font = `500 ${p.size}px 'JetBrains Mono', monospace`;
          ctx.fillStyle = `rgba(147, 197, 253, ${p.alpha})`;
          ctx.fillText(p.symbol, drawX, drawY);
        } else {
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Draw subtle ambient glow near cursor
      if (mx > 0 && my > 0 && mx < width && my < height) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 280);
        gradient.addColorStop(0, 'rgba(56, 189, 248, 0.045)');
        gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.02)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
};
