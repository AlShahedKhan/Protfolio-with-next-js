import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Edit3, ExternalLink, Github, Plus, Sparkles } from 'lucide-react';
import DeleteProjectButton from '@/components/admin/DeleteProjectButton';
import { ADMIN_LOGIN_PATH } from '@/lib/admin-auth-constants';
import { getAdminSession, getLaravelApiUrl } from '@/lib/admin-auth';
import {
  extractAdminProjects,
  extractApiMessage,
  resolveAdminProjectImageUrl,
} from '@/lib/admin-projects';

type ProjectsAdminPageProps = {
  searchParams: Promise<{
    created?: string;
    updated?: string;
    deleted?: string;
  }>;
};

const chipClassName =
  'inline-flex rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-300';

async function getProjects() {
  const session = await getAdminSession();

  if (!session) {
    redirect(ADMIN_LOGIN_PATH);
  }

  try {
    const response = await fetch(getLaravelApiUrl('/api/v1/admin/projects'), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: 'no-store',
    });

    const payload = (await response.json().catch(() => null)) as unknown;

    if (!response.ok) {
      return {
        projects: [],
        error: extractApiMessage(payload, 'Unable to load projects from the Laravel backend.'),
      };
    }

    return {
      projects: extractAdminProjects(payload),
      error: null,
    };
  } catch {
    return {
      projects: [],
      error:
        'Unable to reach the Laravel projects endpoint right now. Check that the backend is running and reachable from the Next.js server.',
    };
  }
}

export default async function ProjectsAdmin({ searchParams }: ProjectsAdminPageProps) {
  const [{ projects, error }, params] = await Promise.all([getProjects(), searchParams]);
  const wasCreated = params.created === '1';
  const wasUpdated = params.updated === '1';
  const wasDeleted = params.deleted === '1';

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Projects</h1>
          <p className="max-w-2xl text-slate-400">
            These rows are now coming from your Laravel admin backend, not from local mock data.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-cyan-600 hover:to-blue-600"
        >
          <Plus size={20} />
          Add Project
        </Link>
      </div>

      {wasCreated && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          Project created successfully and stored in Laravel.
        </div>
      )}

      {wasUpdated && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          Project updated successfully in Laravel.
        </div>
      )}

      {wasDeleted && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          Project deleted successfully from Laravel.
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          {error}
        </div>
      )}

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-slate-800 bg-slate-900 py-16 text-center">
          <ExternalLink size={48} className="mb-4 text-slate-600" />
          <h2 className="text-xl font-semibold text-white">No projects in Laravel yet</h2>
          <p className="mt-2 max-w-md text-sm text-slate-400">
            Create your first project from the admin form and it will appear here immediately after
            the redirect.
          </p>
          <Link
            href="/admin/projects/new"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-cyan-600"
          >
            <Plus size={18} />
            Create first project
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/80">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Project
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Technologies
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Visibility
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Context
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Links
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-slate-800/80 align-top transition-colors duration-300 hover:bg-slate-800/40"
                  >
                    <td className="px-6 py-5">
                      <div className="flex gap-4">
                        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70">
                          {resolveAdminProjectImageUrl(project.image_url) ? (
                            <Image
                              src={resolveAdminProjectImageUrl(project.image_url) ?? ''}
                              alt={project.title}
                              fill
                              unoptimized
                              sizes="112px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                              No image
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-base font-semibold text-white">{project.title}</p>
                            {project.featured && (
                              <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                                <Sparkles size={12} />
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                            {project.slug}
                          </p>
                          <p className="max-w-xl text-sm leading-6 text-slate-400">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex max-w-sm flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                          <span key={technology} className={chipClassName}>
                            {technology}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            project.published
                              ? 'bg-emerald-500/10 text-emerald-300'
                              : 'bg-slate-700/60 text-slate-300'
                          }`}
                        >
                          {project.published ? 'Published' : 'Draft'}
                        </span>
                        {project.confidential && (
                          <span className="inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                            Confidential
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="space-y-2 text-sm text-slate-400">
                        {project.role && <p>{project.role}</p>}
                        {project.client_region && <p>{project.client_region}</p>}
                        <p>Sort order: {project.sort_order ?? 'not set'}</p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex flex-col items-start gap-2">
                        {project.live_url ? (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200"
                          >
                            <ExternalLink size={16} />
                            Live URL
                          </a>
                        ) : (
                          <span className="text-sm text-slate-500">No live URL</span>
                        )}

                        {project.github_url ? (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                          >
                            <Github size={16} />
                            GitHub
                          </a>
                        ) : (
                          <span className="text-sm text-slate-500">No GitHub URL</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex min-w-44 flex-col gap-3">
                        <Link
                          href={`/admin/projects/${encodeURIComponent(project.slug)}`}
                          className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-100 transition-colors hover:bg-cyan-500/20"
                        >
                          <Edit3 size={16} />
                          Edit
                        </Link>
                        <DeleteProjectButton slug={project.slug} title={project.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
