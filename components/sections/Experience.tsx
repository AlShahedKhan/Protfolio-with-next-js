'use client';

import { Briefcase, Calendar } from 'lucide-react';
import { experienceData } from '@/lib/portfolio-data';

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container-max">
        <div className="space-y-2 mb-16">
          <span className="text-cyan-400 font-semibold text-sm tracking-wide uppercase">Career Path</span>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            2 years of progressive growth and impactful contributions
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {experienceData.map((exp) => (
            <div key={exp.id} className="glass-effect p-6 md:p-8 card-hover group animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex items-start gap-4 mb-4 md:mb-0">
                  <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors duration-300">
                    <Briefcase className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {exp.position}
                    </h3>
                    <p className="text-cyan-400 font-medium">{exp.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Calendar size={16} />
                  <span>{exp.startDate} {exp.endDate ? `- ${exp.endDate}` : '- Present'}</span>
                </div>
              </div>

              <p className="text-slate-400 mb-4">{exp.description}</p>

              {/* Status Badge */}
              {exp.current && (
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-medium border border-cyan-500/30">
                    Current Position
                  </span>
                </div>
              )}

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
