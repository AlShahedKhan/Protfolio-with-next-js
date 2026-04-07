import Link from 'next/link';
import PublicProjectCard from '@/components/projects/PublicProjectCard';
import { getFeaturedPublicProjects } from '@/lib/public-projects';

export default async function Projects() {
  const { projects, error } = await getFeaturedPublicProjects(3);

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="container-max">
        <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300">
              Selected Work
            </span>
            <h2 className="section-title">Featured projects now load from the Laravel backend.</h2>
          </div>

          <div className="space-y-3">
            <p className="max-w-xl text-slate-600 dark:text-slate-400">
              The homepage pulls public projects from Laravel, then highlights the strongest three
              so the portfolio stays focused while still keeping the full archive available.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
            >
              View all public projects
            </Link>
          </div>
        </div>

        {error ? (
          <div className="rounded-[2rem] border border-amber-500/30 bg-amber-500/10 px-6 py-5 text-sm text-amber-100">
            {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white/80 px-6 py-8 text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
            No public projects are available yet.
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {projects.map((project, index) => (
              <PublicProjectCard
                key={project.slug}
                project={project}
                index={index}
                showIndexBadge
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
