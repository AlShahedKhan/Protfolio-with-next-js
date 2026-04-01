import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { getFeaturedProjects } from '@/lib/content';

const isRealProjectLink = (link?: string) =>
  Boolean(link && !link.includes('example.com') && link !== 'https://github.com');

export default function Projects() {
  const selectedProjects = getFeaturedProjects();

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="container-max">
        <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Selected Work</span>
            <h2 className="section-title">Three projects that show the kind of problems I like solving.</h2>
          </div>
          <p className="max-w-xl text-slate-400">
            I would rather show fewer projects with clearer thinking than a long wall of cards. These are the kinds of Laravel and product builds I want this portfolio to represent.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {selectedProjects.map((project, index) => {
            const showLiveLink = isRealProjectLink(project.link);
            const showCodeLink = isRealProjectLink(project.github);

            return (
              <article
                key={project.id}
                className="group overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/70 shadow-[0_30px_80px_rgba(2,6,23,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-cyan-400/20 bg-slate-950/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    0{index + 1}
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                    <p className="text-slate-400">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-slate-800 pt-4">
                    {showLiveLink || showCodeLink ? (
                      <div className="flex gap-3">
                        {showLiveLink && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition-colors duration-300 hover:bg-cyan-500/20"
                          >
                            <ExternalLink size={16} />
                            Live Demo
                          </a>
                        )}
                        {showCodeLink && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm font-medium text-slate-200 transition-colors duration-300 hover:border-cyan-500/30 hover:text-cyan-300"
                          >
                            <Github size={16} />
                            Code
                          </a>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">
                        Detailed case studies and private work samples can be shared on request for client projects.
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
