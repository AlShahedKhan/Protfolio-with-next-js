'use client';

import { ArrowRight, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { portfolioOwner } from '@/lib/portfolio-data';

const locationQuery = encodeURIComponent(portfolioOwner.location);

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: portfolioOwner.email,
    href: `mailto:${portfolioOwner.email}`,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: portfolioOwner.phone,
    href: `tel:${portfolioOwner.phone.replace(/[^+\d]/g, '')}`,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: portfolioOwner.location,
    href: `https://www.google.com/maps/search/?api=1&query=${locationQuery}`,
  },
];

const primaryActions = [
  {
    icon: Mail,
    label: 'Send an email',
    href: `mailto:${portfolioOwner.email}`,
  },
  {
    icon: Linkedin,
    label: 'Connect on LinkedIn',
    href: portfolioOwner.linkedin,
  },
  {
    icon: Github,
    label: 'View GitHub',
    href: portfolioOwner.github,
  },
].filter((item) => Boolean(item.href));

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="container-max">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Contact</span>
              <h2 className="section-title">If the work needs to be clean, useful, and maintainable, let&apos;s talk.</h2>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                I&apos;d rather make it easy to reach me than hide behind a fake contact form. If you have a Laravel product, internal tool, dashboard, or API-heavy build in mind, send a message directly.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              {primaryActions.map((action) => {
                const Icon = action.icon;
                const isExternal = !action.href.startsWith('mailto:');

                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-5 py-3 font-medium text-white transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10"
                  >
                    <Icon size={18} />
                    {action.label}
                    <ArrowRight size={16} />
                  </a>
                );
              })}
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Best fit projects</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {['Laravel backends', 'Dashboards', 'Internal tools', 'API integrations', 'Product rebuilds'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-[2rem] p-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Reach out directly</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">Simple contact details, no dead-end form.</h3>
              </div>

              <div className="space-y-4">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const isExternal = !item.href.startsWith('mailto:') && !item.href.startsWith('tel:');

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition-all duration-300 hover:border-cyan-500/40"
                    >
                      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                        <p className="mt-2 text-base font-medium text-white">{item.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-sm text-slate-400">
                Prefer email for project inquiries and LinkedIn for quick introductions. Once your real details are added to the data file, this section will be ready to go.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
