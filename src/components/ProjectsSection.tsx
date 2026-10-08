import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { X, ExternalLink, Github, CheckCircle2, ArrowRight } from 'lucide-react';
import {
  PulseCareHeroVisual,
  PulseCareMobileVisual,
  PulseCareAnalyticsVisual,
  UGNavigatorHeroVisual,
  UGNavigatorScheduleVisual,
  UGNavigatorBuildingVisual,
  NeuroGraphHeroVisual,
  NeuroGraphActivationVisual,
  NeuroGraphMatrixVisual,
} from './ProjectVisuals';

export interface ProjectData {
  number: string;
  name: string;
  category: string;
  subtitle: string;
  overview: string;
  problem: string;
  solution: string;
  stack: string[];
  heroVisual: React.ReactNode;
  col1TopVisual: React.ReactNode;
  col1BottomVisual: React.ReactNode;
  liveUrl?: string;
  githubUrl?: string;
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    name: 'PulseCare Platform',
    category: 'Healthcare · Web Platform',
    subtitle: 'Digital Pharmacy & Prescription Discovery Engine in Ghana',
    overview:
      'PulseCare addresses the critical challenge in Ghana where patients travel between multiple dispensaries searching for essential medications that may be out of stock. It provides a real-time discovery engine connecting verified pharmacies with patients.',
    problem:
      'Pharmacies operate in fragmented information silos, leading to dangerous delays during medical emergencies when looking for critical prescriptions.',
    solution:
      'Engineered an offline-first reactive web application allowing geolocated proximity search, verified inventory lookups, prescription reservation, and transparent pricing comparisons.',
    stack: ['React', 'TypeScript', 'Node.js', 'Firebase Firestore', 'Tailwind CSS'],
    heroVisual: <PulseCareHeroVisual />,
    col1TopVisual: <PulseCareMobileVisual />,
    col1BottomVisual: <PulseCareAnalyticsVisual />,
    liveUrl: '#',
    githubUrl: 'https://github.com/evans-osei/pulsecare',
  },
  {
    number: '02',
    name: 'UG Campus Navigator',
    category: 'University · Graph Theory',
    subtitle: 'Algorithmic Campus Logistics & Timetable Pathfinding',
    overview:
      'Designed specifically for the University of Ghana, Legon campus. Navigating the expansive lecture halls between the Mathematics Department, CCB, and Balme Library is complex with tight 10-minute lecture transition intervals.',
    problem:
      'Static campus PDF maps are unintuitive and lack real-time shortest-path route computation between consecutive lectures.',
    solution:
      'Modeled campus pathways as a weighted graph, implementing client-side Dijkstra and A* pathfinding to compute accessible, shade-optimized walking routes.',
    stack: ['TypeScript', 'React', 'Graph Algorithms (A*, Dijkstra)', 'Vector Canvas', 'Local Storage'],
    heroVisual: <UGNavigatorHeroVisual />,
    col1TopVisual: <UGNavigatorScheduleVisual />,
    col1BottomVisual: <UGNavigatorBuildingVisual />,
    liveUrl: '#',
    githubUrl: 'https://github.com/evans-osei/ug-campus-nav',
  },
  {
    number: '03',
    name: 'NeuroGraph AI Engine',
    category: 'AI · Machine Learning',
    subtitle: 'Interactive Neural Network & Calculus Visualizer',
    overview:
      'A deep-learning educational workbench demonstrating how multi-layer perceptrons converge using gradient descent, backpropagation, and matrix calculus in real-time.',
    problem:
      'Many students struggle to intuitively bridge abstract multivariable calculus (chain rule, partial derivatives) with actual deep learning training loops.',
    solution:
      'Built a real-time WebGL interactive canvas where users configure layers, activations (ReLU, GELU, Sigmoid), and observe loss landscape contour convergence live at 60 FPS.',
    stack: ['Python', 'JavaScript', 'WebGL Shaders', 'Linear Algebra', 'HTML5 Canvas'],
    heroVisual: <NeuroGraphHeroVisual />,
    col1TopVisual: <NeuroGraphActivationVisual />,
    col1BottomVisual: <NeuroGraphMatrixVisual />,
    liveUrl: '#',
    githubUrl: 'https://github.com/evans-osei/neurograph',
  },
];

interface CardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onSelectProject: (proj: ProjectData) => void;
}

const ProjectCard: React.FC<CardProps> = ({
  project,
  index,
  totalCards,
  progress,
  range,
  targetScale,
  onSelectProject,
}) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={cardContainerRef}
      className="h-[85vh] sticky top-24 md:top-32 flex items-start justify-center w-full"
    >
      <motion.div
        style={{
          scale,
          top: `${index * 28}px`,
        }}
        className="relative w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl origin-top"
      >
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-[#D7E2EA]/15">
          <div className="flex items-center gap-4 sm:gap-8">
            {/* Number */}
            <span
              className="font-black text-[#D7E2EA] leading-none tracking-tighter"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {project.number}
            </span>

            {/* Category & Name */}
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/60">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium uppercase tracking-wide text-[#D7E2EA]">
                {project.name}
              </h3>
            </div>
          </div>

          {/* Ghost Live Project Button */}
          <LiveProjectButton
            onClick={() => onSelectProject(project)}
          />
        </div>

        {/* Bottom Row: 2-Column Responsive UI Graphics Grid */}
        <div
          onClick={() => onSelectProject(project)}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch cursor-pointer group"
        >
          {/* Left Column (40% width / 5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6 justify-between">
            {/* Left Top Sub-system Preview */}
            <div
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616] group-hover:border group-hover:border-cyan-400/40 transition-all duration-300"
              style={{ minHeight: 'clamp(130px, 16vw, 230px)' }}
            >
              {project.col1TopVisual}
            </div>

            {/* Left Bottom Sub-system Preview */}
            <div
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616] group-hover:border group-hover:border-cyan-400/40 transition-all duration-300"
              style={{ minHeight: 'clamp(160px, 22vw, 340px)' }}
            >
              {project.col1BottomVisual}
            </div>
          </div>

          {/* Right Column (60% width / 7 cols) - Flagship Interactive Dashboard Mockup */}
          <div className="md:col-span-7 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616] min-h-[300px] md:min-h-full group-hover:border group-hover:border-cyan-400/40 transition-all duration-300 shadow-xl">
            {project.heroVisual}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const totalCards = PROJECTS.length;

  return (
    <>
      <section
        id="projects"
        ref={containerRef}
        className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32"
      >
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-20 md:mb-28">
          <FadeIn delay={0} y={40} duration={0.8}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              Projects
            </h2>
          </FadeIn>
        </div>

        {/* Sticky Project Cards Stack */}
        <div className="relative w-full flex flex-col items-center">
          {PROJECTS.map((project, index) => {
            const targetScale = 1 - (totalCards - 1 - index) * 0.03;
            const range: [number, number] = [index / totalCards, 1];

            return (
              <ProjectCard
                key={project.number}
                project={project}
                index={index}
                totalCards={totalCards}
                progress={scrollYProgress}
                range={range}
                targetScale={targetScale}
                onSelectProject={(proj) => setSelectedProject(proj)}
              />
            );
          })}
        </div>
      </section>

      {/* Project Case Study Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#0F0F0F] border-2 border-[#D7E2EA]/30 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 text-[#D7E2EA] shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#D7E2EA]/15 mb-6">
              <div>
                <span className="text-xs uppercase font-medium tracking-widest text-[#D7E2EA]/60 font-mono">
                  {selectedProject.category} · 0{selectedProject.number}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1">
                  {selectedProject.name}
                </h3>
                <p className="text-sm text-[#D7E2EA]/80 font-light mt-1">
                  {selectedProject.subtitle}
                </p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:bg-white/10 transition-colors"
                aria-label="Close Project Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overview & Details */}
            <div className="space-y-6 text-sm sm:text-base leading-relaxed">
              <div>
                <h4 className="text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/60 mb-2">
                  System Overview
                </h4>
                <p className="text-[#D7E2EA]/90 font-light">
                  {selectedProject.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h4 className="text-xs uppercase font-medium tracking-wider text-rose-300 mb-1">
                    The Problem
                  </h4>
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/80 font-light">
                    {selectedProject.problem}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h4 className="text-xs uppercase font-medium tracking-wider text-emerald-300 mb-1">
                    The Architecture
                  </h4>
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/80 font-light">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-xs uppercase font-medium tracking-wider text-[#D7E2EA]/60 mb-2">
                  Stack &amp; Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-white/[0.06] border border-white/10 text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#D7E2EA]/15 flex flex-wrap gap-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D7E2EA]/30 text-white text-xs uppercase tracking-wider hover:bg-white/10 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-full bg-white text-black font-medium text-xs uppercase tracking-wider hover:bg-white/90 transition-colors"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
