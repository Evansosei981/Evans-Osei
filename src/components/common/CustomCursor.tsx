import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices with fine pointers
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('button, a, input, textarea, select, [role="button"], [data-cursor-interactive]')
        );
        setIsHovered(isClickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    let animationFrameId: number;
    const animateTrailing = () => {
      setTrailing(prev => ({
        x: prev.x + (position.x - prev.x) * 0.22,
        y: prev.y + (position.y - prev.y) * 0.22,
      }));
      animationFrameId = requestAnimationFrame(animateTrailing);
    };
    animationFrameId = requestAnimationFrame(animateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Precision center dot */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '6px' : '4px',
          height: isHovered ? '6px' : '4px',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.6 : 1})`,
        }}
      />
      {/* Smooth trailing glow ring */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ease-out ${
          isHovered
            ? 'scale-150 border-cyan-400/60 bg-cyan-500/10'
            : 'border-white/20 bg-transparent'
        } ${isClicking ? 'scale-90 opacity-60' : 'opacity-100'}`}
        style={{
          left: `${trailing.x}px`,
          top: `${trailing.y}px`,
          width: '32px',
          height: '32px',
          transform: 'translate(-50%, -50%)',
          backdropFilter: isHovered ? 'blur(1px)' : 'none',
        }}
      />
    </div>
  );
};
