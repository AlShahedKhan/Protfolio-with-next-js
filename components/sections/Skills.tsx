import { getSkills } from '@/lib/content';

export default function Skills() {
  const skillsData = getSkills();
  const skillsByCategory = skillsData.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skillsData>);

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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category} className="glass-effect p-6 animate-fade-in">
              <h3 className="text-lg font-bold text-white mb-6 pb-4 border-b border-slate-700">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => {
                  return (
                    <span
                      key={skill.id}
                      className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-sm text-slate-200"
                    >
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 glass-effect p-8">
          <h3 className="text-xl font-bold text-white mb-6">Other Proficiencies</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'API Testing (Postman, Insomnia)',
              'Version Control (Git, GitHub)',
              'Code Review & Optimization',
              'Secure API Design',
              'Webhook Security',
              'Stripe & PayPal Integration',
              'Database Indexing',
              'Agile Delivery',
              'CI/CD Pipelines',
              'Cloud Deployment (AWS, DigitalOcean)',
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
