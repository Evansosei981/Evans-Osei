import React, { useState, useEffect, useRef } from 'react';
import { FadeIn } from './FadeIn';
import { Compass, Cpu, Sparkles, Play, RotateCcw, Activity, Terminal, ArrowRight, Check } from 'lucide-react';

type LabTab = 'pathfinder' | 'neural' | 'physics';

interface CampusNode {
  id: string;
  name: string;
  x: number;
  y: number;
  type: string;
}

const UG_NODES: CampusNode[] = [
  { id: 'balme', name: 'Balme Library', x: 80, y: 70, type: 'Academic' },
  { id: 'math', name: 'Math Dept (UG)', x: 230, y: 50, type: 'CS & Math' },
  { id: 'ccb', name: 'CCB Auditoriums', x: 380, y: 80, type: 'Lecture Hall' },
  { id: 'night', name: 'Night Market', x: 120, y: 220, type: 'Hub' },
  { id: 'cw', name: 'Commonwealth Hall', x: 280, y: 210, type: 'Hall' },
  { id: 'cs', name: 'UG CS Labs', x: 420, y: 200, type: 'Tech' },
];

const UG_EDGES: [string, string, number][] = [
  ['balme', 'math', 210],
  ['math', 'ccb', 190],
  ['balme', 'night', 160],
  ['night', 'cw', 180],
  ['math', 'cw', 170],
  ['ccb', 'cs', 150],
  ['cw', 'cs', 190],
];

export const EngineeringLabSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabTab>('pathfinder');

  // 1. PATHFINDER STATE
  const [startNode, setStartNode] = useState<string>('balme');
  const [endNode, setEndNode] = useState<string>('cs');
  const [activePath, setActivePath] = useState<string[]>([]);
  const [totalDist, setTotalDist] = useState<number>(0);

  // Dijkstra calculation
  useEffect(() => {
    if (startNode === endNode) {
      setActivePath([startNode]);
      setTotalDist(0);
      return;
    }

    const dist: Record<string, number> = {};
    const prev: Record<string, string | null> = {};
    const unvisited = new Set<string>();

    UG_NODES.forEach((n) => {
      dist[n.id] = Infinity;
      prev[n.id] = null;
      unvisited.add(n.id);
    });

    dist[startNode] = 0;

    while (unvisited.size > 0) {
      let current: string | null = null;
      let minD = Infinity;

      unvisited.forEach((id) => {
        if (dist[id] < minD) {
          minD = dist[id];
          current = id;
        }
      });

      if (!current || minD === Infinity) break;
      if (current === endNode) break;

      unvisited.delete(current);

      UG_EDGES.forEach(([u, v, weight]) => {
        let neighbor: string | null = null;
        if (u === current) neighbor = v;
        if (v === current) neighbor = u;

        if (neighbor && unvisited.has(neighbor)) {
          const alt = dist[current!] + weight;
          if (alt < dist[neighbor]) {
            dist[neighbor] = alt;
            prev[neighbor] = current;
          }
        }
      });
    }

    const path: string[] = [];
    let curr: string | null = endNode;
    while (curr) {
      path.unshift(curr);
      curr = prev[curr];
    }

    if (path.length > 0 && path[0] === startNode) {
      setActivePath(path);
      setTotalDist(dist[endNode]);
    } else {
      setActivePath([]);
      setTotalDist(0);
    }
  }, [startNode, endNode]);

  // 2. NEURAL NETWORK STATE
  const [activation, setActivation] = useState<'relu' | 'gelu' | 'sigmoid'>('gelu');
  const [inputValue, setInputValue] = useState<number>(1.2);
  const neuralCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Neural Canvas Renderer
  useEffect(() => {
    if (activeTab !== 'neural') return;
    const canvas = neuralCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = 500);
    const height = (canvas.height = 260);

    ctx.clearRect(0, 0, width, height);

    // Coordinate grid
    ctx.strokeStyle = 'rgba(215, 226, 234, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Plot activation curve
    const fn = (x: number) => {
      if (activation === 'relu') return Math.max(0, x);
      if (activation === 'sigmoid') return 1 / (1 + Math.exp(-x));
      // GELU approximation
      return 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * Math.pow(x, 3))));
    };

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();

    const scaleX = 40;
    const scaleY = activation === 'sigmoid' ? 120 : 35;
    const originX = width / 2;
    const originY = activation === 'sigmoid' ? height - 30 : height / 2;

    for (let px = 0; px < width; px++) {
      const x = (px - originX) / scaleX;
      const y = fn(x);
      const py = originY - y * scaleY;
      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Plot selected point
    const currX = inputValue;
    const currY = fn(currX);
    const ptX = originX + currX * scaleX;
    const ptY = originY - currY * scaleY;

    // Glowing point
    ctx.fillStyle = '#f43f5e';
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#f43f5e';
    ctx.beginPath();
    ctx.arc(ptX, ptY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Guide lines
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)';
    ctx.beginPath();
    ctx.moveTo(ptX, originY);
    ctx.lineTo(ptX, ptY);
    ctx.lineTo(originX, ptY);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [activeTab, activation, inputValue]);

  // 3. GAME PHYSICS SIMULATOR
  const physicsCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (activeTab !== 'physics') return;
    const canvas = physicsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = 500);
    let height = (canvas.height = 260);

    interface Ball {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }

    const balls: Ball[] = [
      { x: 100, y: 80, vx: 2.5, vy: 1.2, radius: 18, color: '#38bdf8' },
      { x: 240, y: 140, vx: -1.8, vy: 2.1, radius: 24, color: '#818cf8' },
      { x: 380, y: 90, vx: -2.2, vy: -1.5, radius: 16, color: '#34d399' },
      { x: 160, y: 190, vx: 1.6, vy: -2.3, radius: 20, color: '#f59e0b' },
    ];

    let animId: number;

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Boundary box
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.strokeRect(0, 0, width, height);

      // Update & Render balls
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        b.x += b.vx;
        b.y += b.vy;

        // Bounce walls
        if (b.x - b.radius < 0) {
          b.x = b.radius;
          b.vx *= -1;
        }
        if (b.x + b.radius > width) {
          b.x = width - b.radius;
          b.vx *= -1;
        }
        if (b.y - b.radius < 0) {
          b.y = b.radius;
          b.vy *= -1;
        }
        if (b.y + b.radius > height) {
          b.y = height - b.radius;
          b.vy *= -1;
        }

        // Ball vs Ball elastic collision
        for (let j = i + 1; j < balls.length; j++) {
          const b2 = balls[j];
          const dx = b2.x - b.x;
          const dy = b2.y - b.y;
          const dist = Math.hypot(dx, dy);
          const minDist = b.radius + b2.radius;

          if (dist < minDist && dist > 0) {
            // Collision normal
            const nx = dx / dist;
            const ny = dy / dist;

            // Separate
            const overlap = minDist - dist;
            b.x -= nx * (overlap / 2);
            b.y -= ny * (overlap / 2);
            b2.x += nx * (overlap / 2);
            b2.y += ny * (overlap / 2);

            // Velocity swap normal
            const kx = b.vx - b2.vx;
            const ky = b.vy - b2.vy;
            const p = 2 * (nx * kx + ny * ky) / 2;

            b.vx -= p * nx;
            b.vy -= p * ny;
            b2.vx += p * nx;
            b2.vy += p * ny;

            // SAT normal contact line
            ctx.strokeStyle = '#f43f5e';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(b.x, b.y);
            ctx.lineTo(b2.x, b2.y);
            ctx.stroke();
          }
        }

        // Draw Ball
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();

        // Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeTab]);

  return (
    <section className="relative w-full bg-[#0C0C0C] py-20 px-5 sm:px-8 md:px-10 border-t border-b border-white/10 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>Interactive Engineering Laboratory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              Code, Math &amp; Systems Live
            </h2>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md self-start md:self-auto">
            <button
              onClick={() => setActiveTab('pathfinder')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                activeTab === 'pathfinder'
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Dijkstra Pathfinder</span>
            </button>
            <button
              onClick={() => setActiveTab('neural')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                activeTab === 'neural'
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Neural Loss &amp; Activation</span>
            </button>
            <button
              onClick={() => setActiveTab('physics')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                activeTab === 'physics'
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>2D Game SAT Physics</span>
            </button>
          </div>
        </div>

        {/* LAB CONTAINER */}
        <div className="rounded-[32px] sm:rounded-[40px] border border-white/15 bg-gradient-to-br from-[#12141a] via-[#0E0F14] to-[#0A0A0C] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* TAB 1: DIJKSTRA PATHFINDER */}
          {activeTab === 'pathfinder' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Controls & Analytics */}
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono">
                  <span>Graph Theory · O(E + V log V)</span>
                </div>

                <h3 className="text-2xl font-bold uppercase tracking-wide text-white">
                  UG Campus Dijkstra Optimizer
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Real-time shortest path computation between lecture halls and labs at the University of Ghana. Select origin and target nodes to watch the graph relaxation.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                      Origin Node
                    </label>
                    <select
                      value={startNode}
                      onChange={(e) => setStartNode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                    >
                      {UG_NODES.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                      Destination Node
                    </label>
                    <select
                      value={endNode}
                      onChange={(e) => setEndNode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                    >
                      {UG_NODES.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Computed Path:</span>
                    <span className="text-cyan-400 font-bold">
                      {activePath.map((id) => UG_NODES.find((n) => n.id === id)?.name).join(' → ')}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Optimal Distance:</span>
                    <span className="text-emerald-400 font-bold">{totalDist} meters</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Walking Time:</span>
                    <span className="text-amber-400 font-bold">
                      {Math.ceil(totalDist / 80)} minutes
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Interactive Vector Graph Visualizer */}
              <div className="lg:col-span-7 rounded-3xl bg-black/70 border border-white/10 p-4 h-[300px] sm:h-[320px] relative overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 500 300" className="w-full h-full select-none">
                  {/* Grid background */}
                  <defs>
                    <pattern id="graphGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                      <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="500" height="300" fill="url(#graphGrid)" />

                  {/* Edges */}
                  {UG_EDGES.map(([u, v, weight], idx) => {
                    const nodeU = UG_NODES.find((n) => n.id === u)!;
                    const nodeV = UG_NODES.find((n) => n.id === v)!;

                    // Check if edge is in active path
                    let isPathEdge = false;
                    for (let i = 0; i < activePath.length - 1; i++) {
                      if (
                        (activePath[i] === u && activePath[i + 1] === v) ||
                        (activePath[i] === v && activePath[i + 1] === u)
                      ) {
                        isPathEdge = true;
                        break;
                      }
                    }

                    return (
                      <g key={idx}>
                        <line
                          x1={nodeU.x}
                          y1={nodeU.y}
                          x2={nodeV.x}
                          y2={nodeV.y}
                          stroke={isPathEdge ? '#38bdf8' : 'rgba(215, 226, 234, 0.2)'}
                          strokeWidth={isPathEdge ? 3.5 : 1.5}
                          strokeDasharray={isPathEdge ? 'none' : '4 4'}
                        />
                        <text
                          x={(nodeU.x + nodeV.x) / 2}
                          y={(nodeU.y + nodeV.y) / 2 - 6}
                          fill={isPathEdge ? '#38bdf8' : '#64748b'}
                          fontSize="9"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {weight}m
                        </text>
                      </g>
                    );
                  })}

                  {/* Nodes */}
                  {UG_NODES.map((node) => {
                    const isSelected = node.id === startNode || node.id === endNode;
                    const isInPath = activePath.includes(node.id);

                    return (
                      <g
                        key={node.id}
                        className="cursor-pointer transition-transform hover:scale-110"
                        onClick={() => {
                          if (startNode !== node.id) setEndNode(node.id);
                        }}
                      >
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isSelected ? 14 : isInPath ? 10 : 8}
                          fill={isSelected ? '#38bdf8' : isInPath ? '#818cf8' : '#1e293b'}
                          stroke={isSelected ? '#ffffff' : '#38bdf8'}
                          strokeWidth={2}
                          className="drop-shadow-lg"
                        />
                        <text
                          x={node.x}
                          y={node.y + 24}
                          fill={isSelected ? '#38bdf8' : '#e2e8f0'}
                          fontSize="10"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          fontFamily="sans-serif"
                          textAnchor="middle"
                        >
                          {node.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          )}

          {/* TAB 2: NEURAL NETWORK ACTIVATION EXPLORER */}
          {activeTab === 'neural' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Controls */}
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-mono">
                  <span>Calculus &amp; Deep Learning · f(x) &amp; ∂L/∂w</span>
                </div>

                <h3 className="text-2xl font-bold uppercase tracking-wide text-white">
                  Neural Activation Function Analyzer
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interactive real-time visualization of non-linear activation functions used in transformer architectures and deep neural networks.
                </p>

                {/* Activation selector */}
                <div className="flex gap-2 pt-1">
                  {(['gelu', 'relu', 'sigmoid'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setActivation(mode)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
                        activation === mode
                          ? 'bg-purple-500 text-white font-bold'
                          : 'bg-black/50 text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                {/* Input Value Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>Input Scalar (x):</span>
                    <span className="text-cyan-400 font-bold">{inputValue.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-4"
                    max="4"
                    step="0.05"
                    value={inputValue}
                    onChange={(e) => setInputValue(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 bg-white/10 rounded-lg h-1.5 cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Activation Formula:</span>
                    <span className="text-slate-200">
                      {activation === 'gelu'
                        ? 'x · Φ(x)'
                        : activation === 'relu'
                        ? 'max(0, x)'
                        : '1 / (1 + e^-x)'}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Derivative (Gradient Flow):</span>
                    <span className="text-emerald-400 font-bold">Non-zero gradient</span>
                  </div>
                </div>
              </div>

              {/* Right Canvas */}
              <div className="lg:col-span-7 rounded-3xl bg-black/80 border border-white/10 p-4 flex items-center justify-center">
                <canvas
                  ref={neuralCanvasRef}
                  className="w-full h-[260px] rounded-2xl"
                />
              </div>
            </div>
          )}

          {/* TAB 3: 2D GAME SAT PHYSICS */}
          {activeTab === 'physics' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Controls */}
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-mono">
                  <span>Game Architecture · SAT Theorem</span>
                </div>

                <h3 className="text-2xl font-bold uppercase tracking-wide text-white">
                  Real-Time Collision Physics Engine
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Demonstration of the Separating Axis Theorem (SAT) and elastic impulse resolution implemented in Evans's ChronoForge 2D engine with 60 FPS tick rate.
                </p>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Collision Method:</span>
                    <span className="text-cyan-400 font-bold">Separating Axis Theorem</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Simulation Tick:</span>
                    <span className="text-emerald-400 font-bold">60 Hz Fixed Timestep</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Restitution (e):</span>
                    <span className="text-amber-400 font-bold">1.00 (Elastic Momentum)</span>
                  </div>
                </div>
              </div>

              {/* Right Canvas */}
              <div className="lg:col-span-7 rounded-3xl bg-black/80 border border-white/10 p-4 flex items-center justify-center">
                <canvas
                  ref={physicsCanvasRef}
                  className="w-full h-[260px] rounded-2xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
