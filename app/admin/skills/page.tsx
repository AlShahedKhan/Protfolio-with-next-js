'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { skillsData } from '@/lib/portfolio-data';

export default function SkillsAdmin() {
  const [skills] = useState(skillsData);

  const getLevelColor = (level: string) => {
    const colors = {
      beginner: 'bg-blue-500/10 text-blue-400',
      intermediate: 'bg-yellow-500/10 text-yellow-400',
      advanced: 'bg-orange-500/10 text-orange-400',
      expert: 'bg-green-500/10 text-green-400',
    };
    return colors[level as keyof typeof colors] || 'bg-slate-700/50 text-slate-400';
  };

  // Group by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skillsData>);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Skills</h1>
          <p className="text-slate-400">Manage your technical skills</p>
        </div>
        <Link
          href="/admin/skills/new"
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300"
        >
          <Plus size={20} />
          Add Skill
        </Link>
      </div>

      {/* Skills by Category */}
      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-xl font-bold text-cyan-400">{category}</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-800/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Skill Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Level</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categorySkills.map((skill) => (
                      <tr key={skill.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors duration-300">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-white">{skill.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs rounded-full font-medium ${getLevelColor(skill.level)}`}>
                            {skill.level}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                            <Link href={`/admin/skills/${skill.id}`} className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-300 text-cyan-400">
                              <Edit2 size={18} />
                            </Link>
                            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-300 text-red-400">
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
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="glass-effect p-6 text-center">
          <div className="text-3xl font-bold text-cyan-400 mb-2">{skills.length}</div>
          <p className="text-slate-400 text-sm">Total Skills</p>
        </div>
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="glass-effect p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{categorySkills.length}</div>
            <p className="text-slate-400 text-sm">{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
