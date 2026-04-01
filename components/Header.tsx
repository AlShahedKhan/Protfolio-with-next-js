'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { getPortfolioOwner } from '@/lib/content';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const portfolioOwner = getPortfolioOwner();

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const getInitial = () => portfolioOwner.name.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/85 backdrop-blur-xl">
      <div className="container-max">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 font-bold text-slate-950 transition-transform duration-300 group-hover:scale-105">
              {getInitial()}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{portfolioOwner.name}</p>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Laravel Portfolio</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-400 transition-colors duration-300 hover:text-cyan-300"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition-colors duration-300 hover:bg-cyan-500/20 md:inline-flex"
            >
              Let&apos;s Talk
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full border border-slate-800 p-2.5 transition-colors duration-300 hover:bg-slate-800 md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} className="text-slate-300" /> : <Menu size={20} className="text-slate-300" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="space-y-2 border-t border-slate-800 pb-4 pt-4 md:hidden">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-slate-300 transition-colors duration-300 hover:bg-slate-900 hover:text-cyan-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 block rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-center font-medium text-cyan-300"
              onClick={() => setIsOpen(false)}
            >
              Let&apos;s Talk
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
