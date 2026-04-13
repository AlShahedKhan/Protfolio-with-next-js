import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import type { PublicProject } from '@/lib/public-projects';

const isRealProjectLink = (link?: string | null) =>
  Boolean(link && !link.includes('example.com') && link !== 'https://github.com');

type PublicProjectCardProps = {
  project: PublicProject;
  index?: number;
  showIndexBadge?: boolean;
};

export default function PublicProjectCard({
  project,
  index = 0,
  showIndexBadge = false,
}: PublicProjectCardProps) {
  const showLiveLink = isRealProjectLink(project.live_url);
  const showCodeLink = isRealProjectLink(project.github_url);

  return (
    <article className="panel-hover group overflow-hidden rounded-[2rem] border border-slate-200 bg-white/85 shadow-[0_30px_80px_rgba(148,163,184,0.16)] transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/40 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-[0_30px_80px_rgba(2,6,23,0.28)]">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={project.imageSrc}
          alt={project.title}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cyan-500/18 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {showIndexBadge && (
          <div className="absolute left-5 top-5 rounded-full border border-cyan-400/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:bg-slate-950/75 dark:text-cyan-300">
            {String(index + 1).padStart(2, '0')}
          </div>
        )}
      </div>

      <div className="space-y-5 p-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">
              {project.title}
            </h3>
            {project.featured && (
              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Featured
              </span>
            )}
          </div>

          <p className="text-slate-600 dark:text-slate-400">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-300"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-400">
          {project.role && <span>{project.role}</span>}
          {project.client_region && <span>- {project.client_region}</span>}
        </div>

        <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-700 transition-colors duration-300 hover:bg-cyan-500/20 dark:text-cyan-300"
            >
              Read Case Study
              <ArrowRight size={16} />
            </Link>

            {showLiveLink && (
              <a
                href={project.live_url ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-300 hover:border-cyan-500/30 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:text-cyan-300"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}

            {showCodeLink && (
              <a
                href={project.github_url ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-300 hover:border-cyan-500/30 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:text-cyan-300"
              >
                <Github size={16} />
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
