'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Award, BookOpen, Briefcase, Code2, Home, LayoutDashboard, Quote, Settings, X, Menu } from 'lucide-react';
import type { AdminUser } from '@/lib/admin-auth';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';

const adminNavItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/projects', icon: Briefcase },
  { name: 'Skills', href: '/admin/skills', icon: Code2 },
  { name: 'Experience', href: '/admin/experience', icon: Award },
  { name: 'Testimonials', href: '/admin/testimonials', icon: Quote },
  { name: 'Blog Posts', href: '/admin/blog', icon: BookOpen },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: AdminUser;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

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
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 rounded-lg px-4 py-3 transition-colors duration-300 ${
                  isActive ? 'bg-slate-800 text-cyan-300' : 'hover:bg-slate-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            );
          })}
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
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
            <AdminLogoutButton />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
