'use client';

import { Code2, Database, Globe, Zap } from 'lucide-react';
import { aboutData, portfolioOwner, projectsData, testimonialsData } from '@/lib/portfolio-data';

export default function About() {
  const highlights = [
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Writing maintainable, well-structured code following SOLID principles and Laravel best practices',
    },
    {
      icon: Database,
      title: 'Database Design',
      description: 'Expert in designing efficient database schemas and optimizing queries for performance',
    },
    {
      icon: Globe,
      title: 'Full Stack',
      description: 'Building complete web applications from backend APIs to responsive frontend interfaces',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing applications for speed and scalability with caching and best practices',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-slate-900/50 relative overflow-hidden">
      <div className="container-max">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-cyan-400 font-semibold text-sm tracking-wide uppercase">About Me</span>
              <h2 className="section-title">{aboutData.intro}</h2>
              <p className="section-subtitle">
                {aboutData.description}
              </p>
            </div>

            <p className="text-slate-300 leading-relaxed">
              {"I'm proficient in Laravel, PHP, JavaScript/TypeScript, React, and modern database technologies. I love collaborating with teams, learning new technologies, and pushing myself to build better solutions."}
            </p>

            <div className="flex gap-6 pt-4">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-cyan-400">{projectsData.length}+</div>
                <p className="text-slate-400">Projects Completed</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-cyan-400">{testimonialsData.length}+</div>
                <p className="text-slate-400">Happy Clients</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-cyan-400">{portfolioOwner.yearsExperience}</div>
                <p className="text-slate-400">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Right - Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={index}
                  className="glass-effect p-6 card-hover group"
                >
                  <Icon className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-white mb-2">{highlight.title}</h3>
                  <p className="text-sm text-slate-400">{highlight.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
