import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getPublicProjectBySlug } from '@/lib/public-projects';

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const isRealProjectLink = (link?: string | null) =>
  Boolean(link && !link.includes('example.com') && link !== 'https://github.com');

const normalizeSiteUrl = (value?: string) => value?.trim().replace(/\/+$/, '');

const toAbsoluteUrl = (value: string, siteUrl?: string) => {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  if (!siteUrl || !value.startsWith('/')) {
    return undefined;
  }

  return `${siteUrl}${value}`;
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { project } = await getPublicProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  const canonicalUrl = siteUrl ? `${siteUrl}/projects/${project.slug}` : undefined;
  const imageUrl = toAbsoluteUrl(project.imageSrc, siteUrl);

  return {
    title: `${project.title} | Projects`,
    description: project.description,
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
    openGraph: {
      title: `${project.title} | Projects`,
      description: project.description,
      type: 'article',
      url: canonicalUrl,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title: `${project.title} | Projects`,
      description: project.description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { project, error } = await getPublicProjectBySlug(slug);

  if (!project && !error) {
    notFound();
  }

  const showLiveLink = isRealProjectLink(project?.live_url);
  const showCodeLink = isRealProjectLink(project?.github_url);
  const hasStorySections = Boolean(project?.problem || project?.solution || project?.outcome);
  const summaryItems = project
    ? [
        {
          label: 'Role',
          value: project.role ?? 'Laravel delivery',
        },
        {
          label: 'Region',
          value: project.client_region ?? 'Global',
        },
        {
          label: 'Tech stack',
          value: `${project.technologies.length} technologies`,
        },
        {
          label: 'Access',
          value: project.confidential ? 'Private client work' : 'Public case study',
        },
      ]
    : [];

  return (
    <main id="top" className="bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Header />

      <section className="border-b border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/85">
        <div className="container-max flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
          >
            <ArrowLeft size={16} />
            All projects
          </Link>

          <Link
            href="/#projects"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-300"
          >
            Back to homepage
          </Link>
        </div>
      </section>

      {!project ? (
        <section className="py-16">
          <div className="container-max">
            <div className="rounded-[2rem] border border-amber-500/30 bg-amber-500/10 px-6 py-5 text-sm text-amber-100">
              {error ?? 'Unable to load this project right now.'}
            </div>
          </div>
        </section>
      ) : (
        <article className="py-12 md:py-20">
          <div className="container-max">
            <div className="mx-auto max-w-6xl space-y-10">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    {project.featured && (
                      <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                        Featured project
                      </span>
                    )}
                    {project.confidential && (
                      <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
                        Confidential client work
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                      {project.title}
                    </h1>
                    <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm">
                    {project.role && (
                      <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                        {project.role}
                      </span>
                    )}
                    {project.client_region && (
                      <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                        {project.client_region}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {showLiveLink && (
                      <a
                        href={project.live_url ?? undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-700 transition-colors hover:bg-cyan-500/20 dark:text-cyan-300"
                      >
                        <ExternalLink size={16} />
                        Open live project
                      </a>
                    )}

                    {showCodeLink && (
                      <a
                        href={project.github_url ?? undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-500/30 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-cyan-300"
                      >
                        <Github size={16} />
                        View code
                      </a>
                    )}
                  </div>

                  {project.confidential && !showLiveLink && !showCodeLink && (
                    <div className="rounded-[1.5rem] border border-amber-500/20 bg-amber-500/10 px-5 py-4 text-sm leading-7 text-amber-800 dark:text-amber-200">
                      External links are intentionally hidden for this confidential client project,
                      but the case study still shows the business context, technical approach, and
                      outcome.
                    </div>
                  )}
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 shadow-[0_30px_80px_rgba(148,163,184,0.16)] dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-[0_30px_80px_rgba(2,6,23,0.28)]">
                  <div className="relative h-[320px]">
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      fill
                      unoptimized
                      priority
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-4 p-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {summaryItems.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60"
                        >
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                            {item.label}
                          </p>
                          <p className="mt-2 font-semibold text-slate-950 dark:text-white">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {hasStorySections ? (
                <div className="grid gap-6 lg:grid-cols-3">
                  {project.problem && (
                    <section className="rounded-[2rem] border border-slate-200 bg-white/85 p-6 dark:border-slate-800 dark:bg-slate-900/70">
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
                        Challenge
                      </p>
                      <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                        {project.problem}
                      </p>
                    </section>
                  )}

                  {project.solution && (
                    <section className="rounded-[2rem] border border-slate-200 bg-white/85 p-6 dark:border-slate-800 dark:bg-slate-900/70">
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
                        Approach
                      </p>
                      <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                        {project.solution}
                      </p>
                    </section>
                  )}

                  {project.outcome && (
                    <section className="rounded-[2rem] border border-slate-200 bg-white/85 p-6 dark:border-slate-800 dark:bg-slate-900/70">
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
                        Outcome
                      </p>
                      <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                        {project.outcome}
                      </p>
                    </section>
                  )}
                </div>
              ) : (
                <section className="rounded-[2rem] border border-slate-200 bg-white/85 p-6 dark:border-slate-800 dark:bg-slate-900/70">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
                    Project overview
                  </p>
                  <p className="mt-4 max-w-4xl leading-8 text-slate-600 dark:text-slate-400">
                    {project.description}
                  </p>
                </section>
              )}
            </div>
          </div>
        </article>
      )}

      <Footer />
    </main>
  );
}
