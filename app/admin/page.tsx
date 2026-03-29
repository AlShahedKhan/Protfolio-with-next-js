'use client';

import { Briefcase, Code2, BookOpen, Users } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      label: 'Total Projects',
      value: '6',
      icon: Briefcase,
      color: 'from-cyan-400 to-blue-500',
    },
    {
      label: 'Skills Listed',
      value: '16',
      icon: Code2,
      color: 'from-purple-400 to-pink-500',
    },
    {
      label: 'Blog Posts',
      value: '3',
      icon: BookOpen,
      color: 'from-orange-400 to-red-500',
    },
    {
      label: 'Testimonials',
      value: '4',
      icon: Users,
      color: 'from-green-400 to-emerald-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Manage your portfolio content and settings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                  <Icon size={32} />
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Add Project', href: '/admin/projects/new' },
            { name: 'Add Skill', href: '/admin/skills/new' },
            { name: 'Add Experience', href: '/admin/experience/new' },
            { name: 'Write Blog Post', href: '/admin/blog/new' },
          ].map((action) => (
            <a
              key={action.name}
              href={action.href}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300 text-center"
            >
              {action.name}
            </a>
          ))}
        </div>
      </div>

      {/* Content Overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Projects</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors duration-300">
                <div>
                  <p className="font-semibold text-white">Project {i}</p>
                  <p className="text-sm text-slate-400">Updated 2 days ago</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-lg text-sm font-medium text-cyan-400 hover:bg-cyan-500/10 transition-colors duration-300">
                    Edit
                  </button>
                  <button className="px-3 py-1 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors duration-300">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Stats</h2>
          <div className="space-y-4">
            {[
              { label: 'Portfolio Views', value: '1,234' },
              { label: 'Contact Messages', value: '12' },
              { label: 'Download CV', value: '45' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-lg bg-slate-800/50">
                <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-cyan-400">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
