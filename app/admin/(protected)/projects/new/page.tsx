import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
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
          <h1 className="text-4xl font-bold text-white">Add Project</h1>
          <p className="max-w-3xl text-slate-400">
            Create a new project in Laravel using your authenticated admin session. The browser
            submits to a local Next.js route, and the server forwards the request securely with
            your bearer token.
          </p>
        </div>
      </div>

      <ProjectForm />
    </div>
  );
}
