'use client';

import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioOwner } from '@/lib/portfolio-data';

const proofItems = [
  { value: 'Laravel', label: 'Backend focus' },
  { value: 'React', label: 'Frontend delivery' },
  { value: 'API-first', label: 'Product thinking' },
];

const focusAreas = [
  'Laravel APIs and internal tools',
  'Dashboards that teams actually enjoy using',
  'Clean delivery with maintainable code',
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[32rem] w-[32rem] rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      </div>

      <div className="container-max">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-sm">
              <span className="size-2 rounded-full bg-cyan-400" />
              Open for Laravel and product work
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
                {portfolioOwner.name}
              </p>
              <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl">
                {portfolioOwner.title}
                <span className="block bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  built for clarity, speed, and growth.
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                I design Laravel backends, admin dashboards, and full-stack workflows that help teams ship cleanly and keep scaling without turning the codebase into a mess.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="#projects" className="btn-primary inline-flex items-center justify-center gap-2">
                See Selected Work
                <ArrowRight size={18} />
              </Link>
              <Link href="#contact" className="btn-secondary inline-flex items-center justify-center gap-2">
                Start a Conversation
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {proofItems.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <p className="text-lg font-semibold text-white">{item.value}</p>
                  <p className="text-sm text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-2">
              {portfolioOwner.github && (
                <a
                  href={portfolioOwner.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-slate-800 bg-slate-900/70 p-3 transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/10"
                  aria-label="GitHub"
                >
                  <Github size={22} className="text-slate-300" />
                </a>
              )}
              {portfolioOwner.linkedin && (
                <a
                  href={portfolioOwner.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-slate-800 bg-slate-900/70 p-3 transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/10"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} className="text-slate-300" />
                </a>
              )}
              <a
                href={`mailto:${portfolioOwner.email}`}
                className="rounded-full border border-slate-800 bg-slate-900/70 p-3 transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/10"
                aria-label="Email"
              >
                <Mail size={22} className="text-slate-300" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-2xl" />
            <div className="glass-effect relative space-y-8 rounded-[2rem] p-8 md:p-10">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                  What You Get
                </p>
                <h2 className="text-2xl font-semibold text-white">
                  A practical builder for product-facing Laravel work.
                </h2>
              </div>

              <div className="space-y-4">
                {focusAreas.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-4 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Based in</p>
                <p className="mt-2 text-lg font-semibold text-white">{portfolioOwner.location}</p>
                <p className="mt-3 text-sm text-slate-400">
                  Best fit for teams that need clear communication, dependable delivery, and a product mindset instead of just ticket output.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
