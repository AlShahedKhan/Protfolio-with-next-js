import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ProjectForm from '@/components/admin/ProjectForm';
import { ADMIN_LOGIN_PATH } from '@/lib/admin-auth-constants';
import { getAdminSession, getLaravelApiUrl } from '@/lib/admin-auth';
import { adminProjectSlugSchema, extractAdminProject, extractApiMessage } from '@/lib/admin-projects';

type ProjectEditPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getProject(slug: string) {
  const session = await getAdminSession();

  if (!session) {
    redirect(ADMIN_LOGIN_PATH);
  }

  try {
    const response = await fetch(getLaravelApiUrl(`/api/v1/admin/projects/${encodeURIComponent(slug)}`), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: 'no-store',
    });

    const payload = (await response.json().catch(() => null)) as unknown;

    if (response.status === 404) {
      notFound();
    }

    if (!response.ok) {
      return {
        project: null,
        error: extractApiMessage(payload, 'Unable to load this project from the Laravel backend.'),
      };
    }

    return {
      project: extractAdminProject(payload),
      error: null,
    };
  } catch {
    return {
      project: null,
      error:
        'Unable to reach the Laravel backend right now. Check that the admin API is running and reachable from the Next.js server.',
    };
  }
}

export default async function EditProjectPage({ params }: ProjectEditPageProps) {
  const { slug } = adminProjectSlugSchema.parse(await params);
  const { project, error } = await getProject(slug);

  if (!project) {
    return (
      <div className="space-y-8">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-cyan-300"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>

        <div className="rounded-[2rem] border border-amber-500/30 bg-amber-500/10 p-6 text-amber-100">
          {error ?? 'Unable to load the project right now.'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-cyan-300"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Edit Project</h1>
          <p className="max-w-3xl text-slate-400">
            Update this project in Laravel using the slug route key. Changes are submitted through a
            secure local admin API route.
          </p>
        </div>
      </div>

      <ProjectForm mode="edit" project={project} projectSlug={slug} />
    </div>
  );
}
