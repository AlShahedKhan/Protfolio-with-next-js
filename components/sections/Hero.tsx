import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { getPortfolioOwner } from '@/lib/content';

const portfolioOwner = getPortfolioOwner();

const proofItems = [
  { value: `${portfolioOwner.yearsExperience}+ Years`, label: 'Professional Laravel work' },
  { value: '30%+ Gains', label: 'Performance improvements delivered' },
  { value: '80+ Repositories', label: 'On GitHub' },
];

const focusAreas = [
  'Scalable Laravel APIs with JWT authentication and RBAC',
  'Performance-focused backend systems with Redis and query tuning',
  'AI, education, and payment-heavy platform delivery',
];

const heroStars = [
  { id: 'star-01', top: '8%', left: '6%', size: 5, delay: '0s', duration: '16s' },
  { id: 'star-02', top: '14%', left: '16%', size: 4, delay: '1.5s', duration: '13s' },
  { id: 'star-03', top: '10%', left: '31%', size: 6, delay: '0.8s', duration: '17s' },
  { id: 'star-04', top: '18%', left: '46%', size: 4, delay: '2.1s', duration: '15s' },
  { id: 'star-05', top: '12%', left: '63%', size: 5, delay: '1.1s', duration: '18s' },
  { id: 'star-06', top: '16%', left: '79%', size: 4, delay: '2.6s', duration: '14s' },
  { id: 'star-07', top: '28%', left: '11%', size: 4, delay: '0.4s', duration: '16s' },
  { id: 'star-08', top: '36%', left: '23%', size: 3, delay: '1.9s', duration: '12s' },
  { id: 'star-09', top: '31%', left: '38%', size: 6, delay: '2.4s', duration: '19s' },
  { id: 'star-10', top: '26%', left: '56%', size: 4, delay: '0.9s', duration: '13s' },
  { id: 'star-11', top: '40%', left: '68%', size: 5, delay: '3.2s', duration: '18s' },
  { id: 'star-12', top: '34%', left: '84%', size: 4, delay: '1.7s', duration: '15s' },
  { id: 'star-13', top: '56%', left: '10%', size: 6, delay: '2.8s', duration: '17s' },
  { id: 'star-14', top: '66%', left: '28%', size: 4, delay: '1.2s', duration: '15s' },
  { id: 'star-15', top: '58%', left: '46%', size: 5, delay: '0.5s', duration: '18s' },
  { id: 'star-16', top: '72%', left: '62%', size: 4, delay: '2.2s', duration: '14s' },
  { id: 'star-17', top: '78%', left: '77%', size: 6, delay: '3s', duration: '16s' },
  { id: 'star-18', top: '84%', left: '90%', size: 4, delay: '1.4s', duration: '13s' },
];

const heroStreaks = [
  { id: 'streak-01', top: '12%', left: '-6%', width: '10rem', delay: '0.6s', duration: '9s' },
  { id: 'streak-02', top: '32%', left: '-10%', width: '8rem', delay: '3.8s', duration: '8.5s' },
  { id: 'streak-03', top: '64%', left: '-8%', width: '11rem', delay: '6.2s', duration: '10s' },
];

const heroMotionStyle = (delayMs: number): CSSProperties => ({
  animationDelay: `${delayMs}ms`,
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_38%),radial-gradient(circle_at_78%_68%,_rgba(59,130,246,0.12),_transparent_32%)]" />
        <div className="hero-orb absolute left-0 top-0 h-[32rem] w-[32rem] rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="hero-orb hero-orb-alt absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="hero-beam absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent" />

        <div className="absolute inset-0">
          {heroStars.map((star) => (
            <span
              key={star.id}
              className="hero-star"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: star.delay,
                animationDuration: star.duration,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0">
          {heroStreaks.map((streak) => (
            <span
              key={streak.id}
              className="hero-streak"
              style={{
                top: streak.top,
                left: streak.left,
                width: streak.width,
                animationDelay: streak.delay,
                animationDuration: streak.duration,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container-max">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div
              className="hero-enter inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-700 backdrop-blur-sm dark:text-cyan-300"
              style={heroMotionStyle(40)}
            >
              <span className="size-2 rounded-full bg-cyan-400" />
              Dhaka-based and open to remote Laravel work
            </div>

            <div className="hero-enter space-y-5" style={heroMotionStyle(160)}>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
                {portfolioOwner.name}
              </p>

              <div className="relative">
                <span className="hero-title-aura absolute -left-6 top-8 h-40 w-56 rounded-full bg-cyan-400/18 blur-3xl md:h-56 md:w-80" />
                <h1 className="relative max-w-4xl text-5xl font-bold tracking-tight text-slate-950 md:text-7xl dark:text-white">
                  {portfolioOwner.title}
                  <span className="block bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    building scalable systems for global clients.
                  </span>
                </h1>
              </div>

              <p className="max-w-2xl text-lg leading-8 text-slate-700 md:text-xl dark:text-slate-300">
                I build secure, scalable Laravel backends and production-ready APIs with a strong
                focus on performance, clean architecture, and dependable delivery.
              </p>
            </div>

            <div className="hero-enter flex flex-col gap-4 sm:flex-row" style={heroMotionStyle(280)}>
              <Link href="#projects" className="btn-primary inline-flex items-center justify-center gap-2">
                See Selected Work
                <ArrowRight size={18} />
              </Link>
              <Link href="#contact" className="btn-secondary inline-flex items-center justify-center gap-2">
                Start a Conversation
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {proofItems.map((item, index) => (
                <div
                  key={item.label}
                  className="hero-enter panel-hover rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/70"
                  style={heroMotionStyle(380 + index * 110)}
                >
                  <p className="text-lg font-semibold text-slate-950 dark:text-white">{item.value}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="hero-enter flex items-center gap-4 pt-2" style={heroMotionStyle(620)}>
              {portfolioOwner.github && (
                <a
                  href={portfolioOwner.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel-hover rounded-full border border-slate-200 bg-white/80 p-3 transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 dark:border-slate-800 dark:bg-slate-900/70"
                  aria-label="GitHub"
                >
                  <Github size={22} className="text-slate-700 dark:text-slate-300" />
                </a>
              )}
              {portfolioOwner.linkedin && (
                <a
                  href={portfolioOwner.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel-hover rounded-full border border-slate-200 bg-white/80 p-3 transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 dark:border-slate-800 dark:bg-slate-900/70"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} className="text-slate-700 dark:text-slate-300" />
                </a>
              )}
              <a
                href={`mailto:${portfolioOwner.email}`}
                className="panel-hover rounded-full border border-slate-200 bg-white/80 p-3 transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 dark:border-slate-800 dark:bg-slate-900/70"
                aria-label="Email"
              >
                <Mail size={22} className="text-slate-700 dark:text-slate-300" />
              </a>
            </div>
          </div>

          <div className="hero-enter hero-card-float relative" style={heroMotionStyle(220)}>
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-2xl" />
            <div className="glass-effect panel-hover relative space-y-8 rounded-[2rem] p-8 md:p-10">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300">
                  What You Get
                </p>
                <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
                  A practical builder for product-facing Laravel work.
                </h2>
              </div>

              <div className="space-y-4">
                {focusAreas.map((item) => (
                  <div
                    key={item}
                    className="panel-hover rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="panel-hover rounded-2xl border border-slate-200 bg-white/90 p-5 dark:border-slate-800 dark:bg-slate-950/60">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Based in</p>
                <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                  {portfolioOwner.location}
                </p>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                  Best fit for teams that need a senior Laravel engineer for API architecture,
                  optimization, and production-grade backend delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
