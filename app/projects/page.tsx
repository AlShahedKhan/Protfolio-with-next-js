import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PublicProjectCard from '@/components/projects/PublicProjectCard';
import {
  getPublicProjectsPage,
  getPublicProjectsPageHref,
  PUBLIC_PROJECTS_PER_PAGE,
} from '@/lib/public-projects';

export const metadata = {
  title: 'Projects',
  description: 'Public project archive powered by the Laravel backend.',
};

type ProjectsIndexPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const parsePageNumber = (value: string | undefined) => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return Math.floor(parsed);
};

export default async function ProjectsIndexPage({ searchParams }: ProjectsIndexPageProps) {
  const params = await searchParams;
  const currentPage = parsePageNumber(params.page);
  const { projects, error, pagination } = await getPublicProjectsPage({
    page: currentPage,
    perPage: PUBLIC_PROJECTS_PER_PAGE,
  });
  const resolvedCurrentPage = pagination?.current_page ?? currentPage;
  const lastPage = pagination?.last_page ?? resolvedCurrentPage;
  const hasPreviousPage = resolvedCurrentPage > 1;
  const hasNextPage = resolvedCurrentPage < lastPage;
  const numberedLinks =
    pagination?.links?.filter(
      (link) => typeof link.page === 'number' && link.page > 0 && /^\d+$/.test(link.label.trim())
    ) ?? [];

  return (
    <main id="top" className="bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Header />

      <section className="border-b border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/85">
        <div className="container-max flex flex-col gap-5 py-12 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300">
              Public Projects
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Laravel-powered project archive
            </h1>
            <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-400">
              This page reads directly from your public Laravel endpoints so the homepage highlights
              and the full archive stay in sync.
            </p>
          </div>

          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
          >
            <ArrowLeft size={16} />
            Back to homepage projects
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-max">
          {error ? (
            <div className="rounded-[2rem] border border-amber-500/30 bg-amber-500/10 px-6 py-5 text-sm text-amber-100">
              {error}
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-[2rem] border border-slate-200 bg-white/80 px-6 py-8 text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
              No public projects are available yet.
            </div>
          ) : (
            <div className="space-y-10">
              <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
                {projects.map((project, index) => (
                  <PublicProjectCard key={project.slug} project={project} index={index} />
                ))}
              </div>

              <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white/80 px-6 py-5 dark:border-slate-800 dark:bg-slate-900/70 md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Showing{' '}
                  <span className="font-semibold text-slate-950 dark:text-white">
                    {pagination?.from ?? 0}
                  </span>{' '}
                  to{' '}
                  <span className="font-semibold text-slate-950 dark:text-white">
                    {pagination?.to ?? projects.length}
                  </span>{' '}
                  of{' '}
                  <span className="font-semibold text-slate-950 dark:text-white">
                    {pagination?.total ?? projects.length}
                  </span>{' '}
                  public projects.
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={
                      hasPreviousPage ? getPublicProjectsPageHref(resolvedCurrentPage - 1) : '#'
                    }
                    aria-disabled={!hasPreviousPage}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                      hasPreviousPage
                        ? 'border-slate-300 text-slate-700 hover:border-cyan-500/40 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-cyan-300'
                        : 'pointer-events-none border-slate-200 text-slate-400 dark:border-slate-800 dark:text-slate-600'
                    }`}
                  >
                    <ArrowLeft size={16} />
                    Previous
                  </Link>

                  {numberedLinks.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {numberedLinks.map((link) => (
                        <Link
                          key={`${link.label}-${link.page}`}
                          href={link.href ?? '#'}
                          aria-current={link.active ? 'page' : undefined}
                          aria-disabled={!link.href}
                          className={`inline-flex min-w-10 items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                            link.active
                              ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300'
                              : 'border-slate-300 text-slate-700 hover:border-cyan-500/40 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-cyan-300'
                          } ${link.href ? '' : 'pointer-events-none opacity-60'}`}
                        >
                          {link.page}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Page {resolvedCurrentPage} of {lastPage}
                    </span>
                  )}

                  <Link
                    href={hasNextPage ? getPublicProjectsPageHref(resolvedCurrentPage + 1) : '#'}
                    aria-disabled={!hasNextPage}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                      hasNextPage
                        ? 'border-slate-300 text-slate-700 hover:border-cyan-500/40 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-cyan-300'
                        : 'pointer-events-none border-slate-200 text-slate-400 dark:border-slate-800 dark:text-slate-600'
                    }`}
                  >
                    Next
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
