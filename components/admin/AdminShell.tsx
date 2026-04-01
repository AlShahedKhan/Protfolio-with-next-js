'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, LogOut, Menu, X } from 'lucide-react';

const adminNavItems = [
  { name: 'Dashboard', href: '/admin', icon: 'home' },
  { name: 'Projects', href: '/admin/projects', icon: 'briefcase' },
  { name: 'Skills', href: '/admin/skills', icon: 'code' },
  { name: 'Experience', href: '/admin/experience', icon: 'award' },
  { name: 'Testimonials', href: '/admin/testimonials', icon: 'quote' },
  { name: 'Blog Posts', href: '/admin/blog', icon: 'edit' },
  { name: 'Settings', href: '/admin/settings', icon: 'settings' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } overflow-y-auto border-r border-slate-800 bg-slate-900 transition-all duration-300`}
      >
        <div className="border-b border-slate-800 p-6">
          <Link
            href="/"
            className="flex items-center gap-3 transition-colors duration-300 hover:text-cyan-400"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 font-bold text-slate-950">
              L
            </div>
            {sidebarOpen && <span className="font-bold">Admin</span>}
          </Link>
        </div>

        <nav className="space-y-2 p-4">
          {adminNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center gap-3 rounded-lg px-4 py-3 transition-colors duration-300 hover:bg-slate-800"
            >
              <span className="h-5 w-5">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 transition-colors duration-300 hover:bg-slate-800"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-slate-800"
            >
              <Home size={20} />
              <span className="text-sm">View Site</span>
            </Link>
            <button className="flex items-center gap-2 rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-slate-800">
              <LogOut size={20} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
