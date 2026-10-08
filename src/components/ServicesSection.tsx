import React from 'react';
import { FadeIn } from './FadeIn';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    name: 'Software Engineering',
    description:
      'Full-stack web applications, scalable backend systems, and robust API architectures engineered with clean code, type safety, and real-world reliability.',
  },
  {
    number: '02',
    name: 'Artificial Intelligence',
    description:
      'Designing intelligent systems, neural networks, and interactive algorithm visualizers grounded in linear algebra, multivariable calculus, and machine learning.',
  },
  {
    number: '03',
    name: 'Game Development',
    description:
      'Real-time interactive 2D/3D systems, physics simulations, WebGL shaders, collision engines, and custom game architecture built from first principles.',
  },
  {
    number: '04',
    name: 'UI/UX & Web Design',
    description:
      'Crafting clean, modern, dark-first, and high-performance digital interfaces with meticulous typographic hierarchy, micro-interactions, and accessibility.',
  },
  {
    number: '05',
    name: 'Algorithms & Math',
    description:
      'High-performance data structures, graph theory traversal algorithms (Dijkstra, A*), and numerical calculus solvers delivering optimal computational efficiency.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-0"
    >
      {/* Heading */}
      <div className="text-center mb-16 sm:mb-20 md:mb-28">
        <FadeIn delay={0} y={30} duration={0.7}>
          <h2
            className="font-black uppercase tracking-tight leading-none text-[#0C0C0C]"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Capabilities
          </h2>
        </FadeIn>
      </div>

      {/* Services List */}
      <div className="max-w-5xl mx-auto divide-y divide-[#0C0C0C]/15 border-t border-b border-[#0C0C0C]/15">
        {SERVICES.map((service, index) => (
          <FadeIn
            key={service.number}
            delay={index * 0.1}
            y={30}
            duration={0.7}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-12 py-8 sm:py-10 md:py-12 group transition-colors duration-300">
              {/* Big Number */}
              <div
                className="font-black text-[#0C0C0C] leading-none shrink-0 tracking-tighter"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-2 md:gap-3 flex-1">
                <h3
                  className="font-medium uppercase text-[#0C0C0C] tracking-wide"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]/60"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
