import { Code2, Database, Globe } from 'lucide-react';
import { getAboutData } from '@/lib/content';

const aboutData = getAboutData();

const strengths = [
  {
    icon: Code2,
    title: 'Architecture that scales',
    description: 'I design Laravel systems with clear service boundaries and maintainable patterns for long-term product growth.',
  },
  {
    icon: Database,
    title: 'Backend performance thinking',
    description: 'I improve real-world performance with Redis caching, query optimization, and robust API design.',
  },
  {
    icon: Globe,
    title: 'Security-first implementation',
    description: 'JWT authentication, RBAC, and secure webhook handling are built into the architecture from day one.',
  },
];

const coreStack = ['Laravel 8-13', 'PHP', 'REST APIs', 'MySQL', 'PostgreSQL', 'Redis', 'Docker', 'CI/CD', 'AWS', 'Stripe', 'PayPal', 'OpenAI API'];

export default function About() {
  return (
    <section id="about" className="relative bg-slate-50/80 py-20 md:py-28 dark:bg-slate-900/40">
      <div className="container-max">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300">About</span>
              <h2 className="section-title max-w-2xl">
                {aboutData.intro}
              </h2>
            </div>

            <div className="space-y-4 text-lg leading-8 text-slate-700 dark:text-slate-300">
              <p>
                {aboutData.description}
              </p>
              <p>
                My background includes AI platforms, online education systems, fintech payment flows, and internal business systems. I focus on backend architecture that stays secure, fast, and maintainable in production.
              </p>
            </div>

            <div className="panel-hover rounded-3xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-950/60">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Core Stack</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {coreStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-800">
                <div className="flex flex-wrap gap-3">
                  {aboutData.highlights.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-800 dark:border-cyan-500/20 dark:text-cyan-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            {strengths.map((strength) => {
              const Icon = strength.icon;

              return (
                <div
                  key={strength.title}
                  className="glass-effect panel-hover rounded-3xl p-6 transition-all duration-300 hover:border-cyan-500/40"
                >
                  <div className="mb-4 inline-flex rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3">
                    <Icon className="h-6 w-6 text-cyan-700 dark:text-cyan-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{strength.title}</h3>
                  <p className="mt-3 text-slate-600 dark:text-slate-400">{strength.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
