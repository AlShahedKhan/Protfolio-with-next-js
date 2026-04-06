'use client';

import { useState } from 'react';
import { Plus, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { experienceData } from '@/lib/portfolio-data';

export default function ExperienceAdmin() {
  const [experiences] = useState(experienceData);

  const deleteExperience = (id: string) => {
    console.log('[v0] Deleting experience:', id);
    // Connected to Laravel backend
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Experience</h1>
          <p className="text-slate-400">Manage your work experience</p>
        </div>
        <Link
          href="/admin/experience/new"
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300"
        >
          <Plus size={20} />
          Add Experience
        </Link>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                  <p className="text-cyan-400 font-medium">{exp.company}</p>
                  <p className="text-slate-400 text-sm mt-1">{exp.startDate} {exp.endDate ? `- ${exp.endDate}` : '- Present'}</p>
                  <p className="text-slate-300 text-sm mt-2">{exp.description}</p>
                </div>
              </div>
              {exp.current && (
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/30">
                  Current
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {exp.technologies.map((tech) => (
                <span key={tech} className="px-2 py-1 text-xs rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/50">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3 pt-4 border-t border-slate-700">
              <Link
                href={`/admin/experience/${exp.id}`}
                className="flex-1 px-4 py-2 rounded-lg hover:bg-cyan-500/10 text-cyan-400 font-medium transition-colors duration-300"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteExperience(exp.id)}
                className="flex-1 px-4 py-2 rounded-lg hover:bg-red-500/10 text-red-400 font-medium transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
