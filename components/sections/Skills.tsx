'use client';

import { skillsData } from '@/lib/portfolio-data';

export default function Skills() {
  // Group skills by category
  const skillsByCategory = skillsData.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skillsData>);

  const getLevelPercentage = (level: string) => {
    const levels = {
      'beginner': 40,
      'intermediate': 65,
      'advanced': 85,
      'expert': 95,
    };
    return levels[level as keyof typeof levels];
  };

  return (
    <section id="skills" className="py-20 md:py-32 bg-slate-900/50 relative overflow-hidden">
      <div className="container-max">
        <div className="space-y-2 mb-16">
          <span className="text-cyan-400 font-semibold text-sm tracking-wide uppercase">Expertise</span>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            A comprehensive overview of my technical proficiency across different areas
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category} className="glass-effect p-6 animate-fade-in">
              <h3 className="text-lg font-bold text-white mb-6 pb-4 border-b border-slate-700">
                {category}
              </h3>
              <div className="space-y-5">
                {skills.map((skill) => {
                  const percentage = getLevelPercentage(skill.level);
                  return (
                    <div key={skill.id}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                        <span className="text-xs text-cyan-400 font-semibold">{skill.level}</span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-12 glass-effect p-8">
          <h3 className="text-xl font-bold text-white mb-6">Other Proficiencies</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'API Testing (Postman, Insomnia)',
              'Version Control (Git, GitHub)',
              'Agile Methodology',
              'Code Review & Optimization',
              'Testing (PHPUnit, Jest)',
              'CI/CD Pipelines',
              'Cloud Deployment',
              'Performance Optimization',
            ].map((skill) => (
              <div
                key={skill}
                className="px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 text-sm text-center hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
