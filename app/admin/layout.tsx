'use client';

import { useState } from 'react';
import { LogOut, Menu, X, Home } from 'lucide-react';
import Link from 'next/link';

const adminNavItems = [
  { name: 'Dashboard', href: '/admin', icon: 'home' },
  { name: 'Projects', href: '/admin/projects', icon: 'briefcase' },
  { name: 'Skills', href: '/admin/skills', icon: 'code' },
  { name: 'Experience', href: '/admin/experience', icon: 'award' },
  { name: 'Testimonials', href: '/admin/testimonials', icon: 'quote' },
  { name: 'Blog Posts', href: '/admin/blog', icon: 'edit' },
  { name: 'Settings', href: '/admin/settings', icon: 'settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 border-r border-slate-800 transition-all duration-300 overflow-y-auto`}
      >
        <div className="p-6 border-b border-slate-800">
          <Link
            href="/"
            className="flex items-center gap-3 hover:text-cyan-400 transition-colors duration-300"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-slate-950">
              L
            </div>
            {sidebarOpen && <span className="font-bold">Admin</span>}
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {adminNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors duration-300 group"
            >
              <span className="w-5 h-5">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-300"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors duration-300">
              <Home size={20} />
              <span className="text-sm">View Site</span>
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors duration-300">
              <LogOut size={20} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
