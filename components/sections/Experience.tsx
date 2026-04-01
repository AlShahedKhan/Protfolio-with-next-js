import { Briefcase, Calendar } from 'lucide-react';
import { getExperience } from '@/lib/content';

export default function Experience() {
  const experienceData = getExperience();

  return (
    <section id="experience" className="relative bg-slate-50/80 py-20 md:py-28 dark:bg-slate-900/40">
      <div className="container-max">
        <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300">Experience</span>
            <h2 className="section-title">Recent roles focused on product delivery and backend reliability.</h2>
          </div>
          <p className="max-w-xl text-slate-600 dark:text-slate-400">
            The common thread across these roles is building software that teams can ship, support, and improve without unnecessary complexity.
          </p>
        </div>

        <div className="mx-auto max-w-5xl space-y-6">
          {experienceData.map((exp) => (
            <article
              key={exp.id}
              className="glass-effect rounded-[2rem] p-6 md:p-8 transition-all duration-300 hover:border-cyan-500/40"
            >
              <div className="flex flex-col gap-6 md:flex-row md:justify-between">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3">
                      <Briefcase className="h-6 w-6 text-cyan-700 dark:text-cyan-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">{exp.position}</h3>
                      <p className="mt-1 text-base font-medium text-cyan-700 dark:text-cyan-300">{exp.company}</p>
                    </div>
                  </div>

                  <p className="max-w-2xl text-slate-600 dark:text-slate-400">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:min-w-[13rem]">
                  <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Calendar size={16} />
                      <span>
                        {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : '- Present'}
                      </span>
                    </div>
                    {exp.current && (
                      <span className="mt-4 inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                        Current Role
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
