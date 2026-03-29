'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { portfolioOwner } from '@/lib/portfolio-data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getInitial = () => portfolioOwner.name.charAt(0).toUpperCase();

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
  ];

  const socialLinks = [
    { icon: Github, href: portfolioOwner.github, label: 'GitHub' },
    { icon: Linkedin, href: portfolioOwner.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: portfolioOwner.twitter, label: 'Twitter' },
    { icon: Mail, href: `mailto:${portfolioOwner.email}`, label: 'Email' },
  ].filter((social) => Boolean(social.href));

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="container-max py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-slate-950 group-hover:scale-110 transition-transform duration-300">
                {getInitial()}
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity duration-300">
                {portfolioOwner.name.split(' ')[0]}
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {portfolioOwner.title} with {portfolioOwner.yearsExperience} years of experience building beautiful, scalable web applications.
            </p>
            <p className="text-slate-500 text-xs">Based in {portfolioOwner.location}</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { name: 'Blog', href: '#blog' },
                { name: 'Resume', href: '#' },
                { name: 'Privacy Policy', href: '#' },
                { name: 'Terms of Service', href: '#' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                const isExternal = !social.href.startsWith('mailto:');

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="p-2 rounded-lg bg-slate-800/50 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={20} className="text-slate-400 hover:text-cyan-400" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            Copyright {currentYear} {portfolioOwner.name}. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 text-slate-400 hover:text-cyan-400"
            aria-label="Scroll to top"
          >
            Back to Top
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
