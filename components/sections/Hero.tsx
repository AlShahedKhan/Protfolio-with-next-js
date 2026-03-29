'use client';

import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioOwner } from '@/lib/portfolio-data';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container-max">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm animate-fade-in">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-cyan-400">Available for opportunities</span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="gradient-text">{portfolioOwner.name}</span>
              <br />
              <span className="text-slate-200">{portfolioOwner.title}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Full-stack developer with {portfolioOwner.yearsExperience} years of professional experience crafting beautiful, scalable web applications using Laravel, PHP, React, and modern technologies.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="#projects" className="btn-primary inline-flex items-center justify-center gap-2">
              View My Work
              <ArrowRight size={20} />
            </Link>
            <Link href="#contact" className="btn-secondary inline-flex items-center justify-center gap-2">
              Get in Touch
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 pt-8">
            {portfolioOwner.github && (
              <a
                href={portfolioOwner.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800/50 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group"
                aria-label="GitHub"
              >
                <Github size={24} className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
              </a>
            )}
            {portfolioOwner.linkedin && (
              <a
                href={portfolioOwner.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800/50 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
              </a>
            )}
            <a
              href={`mailto:${portfolioOwner.email}`}
              className="p-3 rounded-full bg-slate-800/50 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group"
              aria-label="Email"
            >
              <Mail size={24} className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-slate-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
