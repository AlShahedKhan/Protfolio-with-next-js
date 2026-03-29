'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { projectsData } from '@/lib/portfolio-data';

export default function ProjectsAdmin() {
  const [projects] = useState(projectsData);

  const deleteProject = (id: string) => {
    console.log('[v0] Deleting project:', id);
    // This will be connected to your Laravel backend
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
          <p className="text-slate-400">Manage your portfolio projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300"
        >
          <Plus size={20} />
          Add Project
        </Link>
      </div>

      {/* Projects Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Technologies</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Featured</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors duration-300">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-white">{project.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-400 text-sm truncate">{project.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 flex-wrap">
                      {project.technologies.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 2 && (
                        <span className="text-xs text-slate-400">+{project.technologies.length - 2} more</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      project.featured
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-slate-700/50 text-slate-400'
                    }`}>
                      {project.featured ? 'Featured' : 'Standard'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-300 text-cyan-400"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-300 text-red-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 bg-slate-900 border border-slate-800 rounded-2xl">
          <ExternalLink size={48} className="text-slate-600 mb-4" />
          <h3 className="text-lg font-semibold text-slate-300 mb-2">No projects yet</h3>
          <p className="text-slate-400 mb-6">Create your first project to get started</p>
          <Link
            href="/admin/projects/new"
            className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition-colors duration-300"
          >
            Add Project
          </Link>
        </div>
      )}
    </div>
  );
}
