'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { portfolioOwner } from '@/lib/portfolio-data';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const getInitial = () => portfolioOwner.name.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
      <div className="container-max">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-slate-950 group-hover:scale-110 transition-transform duration-300">
              {getInitial()}
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity duration-300">
              {portfolioOwner.name.split(' ')[0]}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun size={20} className="text-slate-400" />
              ) : (
                <Moon size={20} className="text-slate-400" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} className="text-slate-400" />
              ) : (
                <Menu size={24} className="text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2 border-t border-slate-800 pt-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
