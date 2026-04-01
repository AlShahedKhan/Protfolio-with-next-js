import Link from 'next/link';
import { ArrowUp, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { getPortfolioOwner } from '@/lib/content';

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const focusAreas = [
  'Laravel APIs',
  'Admin dashboards',
  'Internal tools',
  'Product rebuilds',
];

export default function Footer() {
  const portfolioOwner = getPortfolioOwner();
  const getInitial = () => portfolioOwner.name.charAt(0).toUpperCase();

  const socialLinks = [
    { icon: Github, href: portfolioOwner.github, label: 'GitHub' },
    { icon: Linkedin, href: portfolioOwner.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: portfolioOwner.twitter, label: 'Twitter' },
    { icon: Mail, href: `mailto:${portfolioOwner.email}`, label: 'Email' },
  ].filter((social) => Boolean(social.href));

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-max py-16">
        <div className="mb-12 grid gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 font-bold text-slate-950 transition-transform duration-300 group-hover:scale-105">
                {getInitial()}
              </div>
              <div>
                <p className="text-base font-semibold text-slate-950 dark:text-white">{portfolioOwner.name}</p>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Laravel Portfolio</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {portfolioOwner.title} focused on Laravel backends, dashboards, and clean product delivery.
            </p>
            <p className="text-xs text-slate-500">Based in {portfolioOwner.location}</p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-950 dark:text-white">Navigation</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors duration-300 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-950 dark:text-white">Focus</h3>
            <ul className="space-y-2">
              {focusAreas.map((item) => (
                <li key={item} className="text-sm text-slate-600 dark:text-slate-400">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-slate-950 dark:text-white">Connect</h3>
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
                    className="rounded-xl border border-slate-200 bg-white/80 p-2.5 transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 dark:border-slate-700 dark:bg-slate-900/70"
                    aria-label={social.label}
                  >
                    <Icon size={18} className="text-slate-700 dark:text-slate-300" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 py-8 md:flex-row dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Copyright {currentYear} {portfolioOwner.name}. All rights reserved.
          </p>

          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-700 transition-all duration-300 hover:border-cyan-500/40 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:text-cyan-300"
            aria-label="Scroll to top"
          >
            Back to Top
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
