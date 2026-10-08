import React, { useState, useEffect, useRef } from 'react';
import { Camera, Sparkles, RefreshCw, Upload, Link, Eye, Check } from 'lucide-react';

interface EvansHeroPortraitProps {
  className?: string;
}

const AVATAR_STORAGE_KEY = 'evans_custom_photo_url';

export const EvansHeroPortrait: React.FC<EvansHeroPortraitProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [customPhoto, setCustomPhoto] = useState<string | null>(() => {
    try {
      return localStorage.getItem(AVATAR_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  // viewMode: '3d-realistic' | '3d-cyber' | 'photo'
  const [viewMode, setViewMode] = useState<'3d-realistic' | '3d-cyber' | 'photo'>(
    customPhoto ? 'photo' : '3d-realistic'
  );
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [tempUrl, setTempUrl] = useState('');

  // 3D Parallax Tilt state
  const [tilt, setTilt] = useState({ pitch: 0, yaw: 0, lightX: 50, lightY: 40 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Track mouse for 3D head rotation & lighting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const diffX = e.clientX - centerX;
      const diffY = e.clientY - centerY;

      // Calculate tilt angles (clamped for natural feel)
      const yaw = Math.max(-18, Math.min(18, (diffX / centerX) * 22));
      const pitch = Math.max(-14, Math.min(14, -(diffY / centerY) * 16));

      // Light source coordinates (percentage 20% to 80%)
      const lightX = 50 + (diffX / centerX) * 30;
      const lightY = 40 + (diffY / centerY) * 25;

      setTilt({ pitch, yaw, lightX, lightY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cyber Wireframe Head Canvas Simulation
  useEffect(() => {
    if (viewMode !== '3d-cyber') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = 440);
    const height = (canvas.height = 440);

    // 3D Head Mesh Vertices (Sphere / Head shaped points)
    const points: { x: number; y: number; z: number; origX: number; origY: number; origZ: number }[] = [];
    const numLat = 14;
    const numLon = 18;
    const radiusX = 110;
    const radiusY = 140;
    const radiusZ = 100;

    for (let i = 0; i <= numLat; i++) {
      const theta = (i * Math.PI) / numLat;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let j = 0; j <= numLon; j++) {
        const phi = (j * 2 * Math.PI) / numLon;
        const x = radiusX * sinTheta * Math.cos(phi);
        const y = -radiusY * cosTheta + 20; // center head
        const z = radiusZ * sinTheta * Math.sin(phi);

        points.push({ x, y, z, origX: x, origY: y, origZ: z });
      }
    }

    let frame = 0;

    const renderCyberMesh = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Rotate points based on mouse tilt
      const radYaw = (tilt.yaw * Math.PI) / 180 + Math.sin(frame * 0.02) * 0.05;
      const radPitch = (tilt.pitch * Math.PI) / 180;

      const cosY = Math.cos(radYaw);
      const sinY = Math.sin(radYaw);
      const cosX = Math.cos(radPitch);
      const sinX = Math.sin(radPitch);

      const projected: { px: number; py: number; pz: number; depth: number }[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Rotate Y (Yaw)
        let x1 = p.origX * cosY - p.origZ * sinY;
        let z1 = p.origZ * cosY + p.origX * sinY;

        // Rotate X (Pitch)
        let y2 = p.origY * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.origY * sinX;

        // Perspective projection
        const fov = 350;
        const scale = fov / (fov + z2 + 180);
        const px = width / 2 + x1 * scale;
        const py = height / 2 + y2 * scale;

        projected.push({ px, py, pz: z2, depth: scale });
      }

      // Draw connection lines
      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        const p1 = projected[i];
        if (p1.pz < -20) continue; // cull back faces

        const nextLon = i + 1;
        if (nextLon < points.length && (i % (numLon + 1)) !== numLon) {
          const p2 = projected[nextLon];
          const alpha = Math.max(0.1, Math.min(0.8, (p1.depth - 0.4) * 1.5));
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.stroke();
        }

        const nextLat = i + (numLon + 1);
        if (nextLat < points.length) {
          const p3 = projected[nextLat];
          const alpha = Math.max(0.1, Math.min(0.8, (p1.depth - 0.4) * 1.5));
          ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.7})`;
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p3.px, p3.py);
          ctx.stroke();
        }

        // Draw luminous vertex dots
        if (p1.depth > 0.7) {
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(p1.px, p1.py, 1.8 * p1.depth, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(renderCyberMesh);
    };

    renderCyberMesh();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [viewMode, tilt]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setCustomPhoto(result);
        setViewMode('photo');
        try {
          localStorage.setItem(AVATAR_STORAGE_KEY, result);
        } catch {
          // ignore quota
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveUrl = () => {
    if (tempUrl.trim()) {
      setCustomPhoto(tempUrl.trim());
      setViewMode('photo');
      setShowUrlInput(false);
      try {
        localStorage.setItem(AVATAR_STORAGE_KEY, tempUrl.trim());
      } catch {
        // ignore
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center select-none ${className}`}
    >
      {/* 3D Magnet Head Container with real-time cursor perspective */}
      <div
        className="relative w-full max-w-[440px] aspect-square flex items-center justify-center transition-transform duration-100 ease-out"
        style={{
          transform: `perspective(900px) rotateX(${tilt.pitch}deg) rotateY(${tilt.yaw}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Luminous Ambient Halo & Rim Reflector */}
        <div
          className="absolute inset-2 rounded-full blur-3xl pointer-events-none transition-all duration-300 opacity-30"
          style={{
            background: `radial-gradient(circle at ${tilt.lightX}% ${tilt.lightY}%, #38bdf8 0%, #818cf8 35%, transparent 70%)`,
          }}
        />

        {/* MODE 1: HIGH-FIDELITY 3D STYLIZED HEAD SCULPT */}
        {viewMode === '3d-realistic' && (
          <div className="relative w-full h-full flex items-center justify-center drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full filter"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Dynamic 3D Skin Gradients driven by cursor position */}
                <radialGradient
                  id="evansSkin3D"
                  cx={`${tilt.lightX}%`}
                  cy={`${tilt.lightY}%`}
                  r="60%"
                >
                  <stop offset="0%" stopColor="#8d563e" />
                  <stop offset="45%" stopColor="#673c2a" />
                  <stop offset="80%" stopColor="#432417" />
                  <stop offset="100%" stopColor="#25130b" />
                </radialGradient>

                <linearGradient id="skinRimCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                  <stop offset="35%" stopColor="#0284c7" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </linearGradient>

                <radialGradient id="hairCurls" cx="50%" cy="25%" r="65%">
                  <stop offset="0%" stopColor="#2c2830" />
                  <stop offset="60%" stopColor="#17141b" />
                  <stop offset="100%" stopColor="#0a080d" />
                </radialGradient>

                <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="55%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>

                <linearGradient id="silverChain" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#94a3b8" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>

                {/* Cyber Scanner Clip Path */}
                <clipPath id="headClip">
                  <path d="M178,210 C175,130 325,130 322,210 C320,270 300,328 250,328 C200,328 180,270 178,210 Z" />
                </clipPath>
              </defs>

              {/* Decorative Tech Ring Orbit (Figma 3D Creator aesthetic) */}
              <circle
                cx="250"
                cy="250"
                r="215"
                fill="none"
                stroke="#D7E2EA"
                strokeWidth="4"
                opacity="0.25"
                strokeDasharray="6 12"
              />
              <circle
                cx="250"
                cy="250"
                r="205"
                fill="#0C0C0C"
                stroke="#38bdf8"
                strokeWidth="2.5"
                opacity="0.85"
              />

              {/* Holographic grid background ring */}
              <g opacity="0.15" stroke="#38bdf8" strokeWidth="1">
                <line x1="250" y1="45" x2="250" y2="455" />
                <line x1="45" y1="250" x2="455" y2="250" />
                <circle cx="250" cy="250" r="140" fill="none" />
              </g>

              {/* Shoulders & White Collared Shirt */}
              <g id="body-3d">
                <path
                  d="M135,490 C145,395 190,365 250,365 C310,365 355,395 365,490 Z"
                  fill="url(#shirtGrad)"
                />
                {/* Shirt Collar Right */}
                <polygon points="250,372 320,355 285,430 248,390" fill="#f8fafc" />
                {/* Shirt Collar Left */}
                <polygon points="250,372 180,355 215,430 252,390" fill="#f1f5f9" />
                {/* Collar Inner Shadow */}
                <path d="M215,430 L250,448 L285,430 L250,390 Z" fill="#64748b" opacity="0.35" />

                {/* Silver Chain Necklace */}
                <path
                  d="M212,395 C228,428 272,428 288,395"
                  fill="none"
                  stroke="url(#silverChain)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </g>

              {/* Neck & Musculature */}
              <g id="neck-3d">
                <path d="M212,305 L288,305 L295,375 L205,375 Z" fill="url(#evansSkin3D)" />
                {/* Realistic Jaw Shadow Under Chin */}
                <ellipse cx="250" cy="322" rx="46" ry="18" fill="#1b0c06" opacity="0.75" />
              </g>

              {/* Main 3D Head Sculpt of Evans Osei */}
              <g id="head-3d">
                {/* Ears */}
                <ellipse cx="166" cy="245" rx="16" ry="25" fill="#5c3422" />
                <ellipse cx="167" cy="245" rx="9" ry="15" fill="#351a0e" />
                <ellipse cx="334" cy="245" rx="16" ry="25" fill="#5c3422" />
                <ellipse cx="333" cy="245" rx="9" ry="15" fill="#351a0e" />

                {/* 3D Facial Structure */}
                <path
                  d="M178,210 C175,130 325,130 322,210 C320,270 300,328 250,328 C200,328 180,270 178,210 Z"
                  fill="url(#evansSkin3D)"
                />

                {/* Cheek Contour & Occlusion */}
                <path
                  d="M178,210 C175,140 222,150 222,270 C202,280 180,260 178,210 Z"
                  fill="#30180d"
                  opacity="0.38"
                />

                {/* Dynamic Specular Cyan Edge Rim Reflection */}
                <path
                  d="M322,210 C320,270 300,328 250,328 C290,320 318,270 320,210 Z"
                  fill="url(#skinRimCyan)"
                  opacity="0.45"
                />

                {/* Confident Eyebrows */}
                <path
                  d="M192,197 Q218,188 238,197"
                  fill="none"
                  stroke="#120e11"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
                <path
                  d="M308,197 Q282,188 262,197"
                  fill="none"
                  stroke="#120e11"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />

                {/* Intelligent Eyes with Specular Sparkle */}
                {/* Left Eye */}
                <ellipse cx="215" cy="214" rx="14.5" ry="8.5" fill="#f8fafc" />
                <circle cx="216" cy="214" r="6.2" fill="#1b1009" />
                <circle
                  cx={216 + (tilt.yaw / 18) * 3}
                  cy={214 - (tilt.pitch / 14) * 2}
                  r="2.2"
                  fill="#ffffff"
                />

                {/* Right Eye */}
                <ellipse cx="285" cy="214" rx="14.5" ry="8.5" fill="#f8fafc" />
                <circle cx="284" cy="214" r="6.2" fill="#1b1009" />
                <circle
                  cx={284 + (tilt.yaw / 18) * 3}
                  cy={214 - (tilt.pitch / 14) * 2}
                  r="2.2"
                  fill="#ffffff"
                />

                {/* 3D Nose Bridge & Natural Wing Flairs */}
                <path
                  d="M250,200 L245,248 L236,256 Q250,261 264,256 L255,248 Z"
                  fill="#3d2013"
                  opacity="0.8"
                />
                <ellipse cx="250" cy="254" rx="12" ry="6" fill="#673924" />
                <circle cx="241" cy="255" r="2.8" fill="#1e0e07" />
                <circle cx="259" cy="255" r="2.8" fill="#1e0e07" />

                {/* Sculpted Lips with Warm Highlights */}
                <path d="M231,282 Q250,278 269,282 Q250,287 231,282 Z" fill="#582f21" />
                <path d="M233,283 Q250,289 267,283 Q250,298 233,283 Z" fill="#7a4430" />

                {/* Realistic Textured Curly Fade Hair of Evans */}
                <path
                  d="M172,195 C158,168 162,110 210,88 C232,78 268,78 290,88 C338,110 342,168 328,195 C336,178 322,126 285,114 C250,108 220,114 185,142 C175,158 170,178 172,195 Z"
                  fill="url(#hairCurls)"
                />
                {/* Hair Volume Texture Spheres */}
                <circle cx="195" cy="118" r="18" fill="#1d1922" />
                <circle cx="225" cy="96" r="20" fill="#24202b" />
                <circle cx="250" cy="90" r="21" fill="#1d1922" />
                <circle cx="275" cy="96" r="20" fill="#24202b" />
                <circle cx="305" cy="118" r="18" fill="#18151c" />
                <circle cx="210" cy="138" r="15" fill="#151218" />
                <circle cx="290" cy="138" r="15" fill="#151218" />
              </g>

              {/* Dynamic Scanning Laser Bar */}
              <line
                x1="180"
                y1={240 + Math.sin(tilt.yaw * 0.2) * 40}
                x2="320"
                y2={240 + Math.sin(tilt.yaw * 0.2) * 40}
                stroke="#38bdf8"
                strokeWidth="1.5"
                opacity="0.6"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
        )}

        {/* MODE 2: 3D CYBER WIREFRAME HEAD (Interactive Holographic Mesh) */}
        {viewMode === '3d-cyber' && (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Luminous circular backdrop */}
            <div className="absolute w-[360px] h-[360px] rounded-full border border-cyan-400/30 bg-[#0C0C0C]/90 shadow-[0_0_60px_rgba(56,189,248,0.25)] flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-full pointer-events-none"
              />
            </div>
          </div>
        )}

        {/* MODE 3: REALISTIC PHOTO AVATAR */}
        {viewMode === 'photo' && (
          <div className="relative w-full h-full flex items-center justify-center p-3">
            <div className="relative w-72 sm:w-80 md:w-96 aspect-square rounded-full p-2 bg-gradient-to-tr from-cyan-400 via-white/20 to-purple-500 shadow-[0_0_60px_rgba(56,189,248,0.4)]">
              {customPhoto ? (
                <img
                  src={customPhoto}
                  alt="Evans Osei"
                  className="w-full h-full object-cover rounded-full select-none pointer-events-none"
                />
              ) : (
                /* Fallback realistic editorial portrait styling */
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#1c2230] to-[#0c0e14] flex flex-col items-center justify-center text-center p-6 border border-cyan-400/40">
                  <div className="w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center mb-3 text-cyan-300">
                    <Camera className="w-10 h-10" />
                  </div>
                  <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1">
                    Evans Osei
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Software Developer · Univ. of Ghana
                  </p>
                  <label className="px-4 py-2 rounded-full bg-cyan-500 text-black font-bold text-xs cursor-pointer hover:bg-cyan-400 transition-colors shadow-lg">
                    Upload Your Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Switcher Dock */}
      <div className="mt-3 flex items-center gap-1.5 p-1.5 rounded-full bg-black/80 border border-white/15 backdrop-blur-md z-30 shadow-2xl">
        <button
          onClick={() => setViewMode('3d-realistic')}
          className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider transition-colors ${
            viewMode === '3d-realistic'
              ? 'bg-cyan-500 text-black font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Switch to 3D Realistic Head Sculpt"
        >
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>3D Head</span>
          </span>
        </button>

        <button
          onClick={() => setViewMode('3d-cyber')}
          className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider transition-colors ${
            viewMode === '3d-cyber'
              ? 'bg-cyan-500 text-black font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Switch to Holographic Cyber Wireframe Mesh"
        >
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>Cyber Mesh</span>
          </span>
        </button>

        <button
          onClick={() => setViewMode('photo')}
          className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider transition-colors ${
            viewMode === 'photo'
              ? 'bg-cyan-500 text-black font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Switch to Photo View"
        >
          <span>Photo</span>
        </button>

        {/* Upload local image */}
        <label
          title="Upload photo from device"
          className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-cyan-400 cursor-pointer transition-colors"
        >
          <Camera className="w-3.5 h-3.5" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
        </label>

        {/* Enter Photo URL */}
        <button
          onClick={() => setShowUrlInput(!showUrlInput)}
          title="Paste image URL directly"
          className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <Link className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Optional Photo URL Popover */}
      {showUrlInput && (
        <div className="absolute -bottom-14 z-40 flex items-center gap-2 p-2 bg-[#121620] border border-cyan-400/30 rounded-xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
          <input
            type="url"
            placeholder="Paste direct image link..."
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            className="px-3 py-1.5 text-xs bg-black/60 border border-white/15 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-52 font-mono"
          />
          <button
            onClick={handleSaveUrl}
            className="px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply</span>
          </button>
        </div>
      )}
    </div>
  );
};

