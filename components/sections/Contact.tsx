'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { portfolioOwner } from '@/lib/portfolio-data';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const locationQuery = encodeURIComponent(portfolioOwner.location);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: portfolioOwner.email,
      link: `mailto:${portfolioOwner.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: portfolioOwner.phone,
      link: `tel:${portfolioOwner.phone.replace(/[^+\d]/g, '')}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: portfolioOwner.location,
      link: `https://www.google.com/maps/search/?api=1&query=${locationQuery}`,
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-slate-900/50 relative overflow-hidden">
      <div className="container-max">
        <div className="space-y-2 mb-16">
          <span className="text-cyan-400 font-semibold text-sm tracking-wide uppercase">Get in Touch</span>
          <h2 className="section-title">{"Let's Work Together"}</h2>
          <p className="section-subtitle">
            {"Have a project in mind? I'd love to hear from you. Send me a message and I'll get back to you as soon as possible."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <a
                key={index}
                href={info.link}
                className="glass-effect p-6 card-hover group"
              >
                <Icon className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold text-white mb-2">{info.label}</h3>
                <p className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-300">
                  {info.value}
                </p>
              </a>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto glass-effect p-8 md:p-12">
          {submitted ? (
            <div className="text-center space-y-4 py-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Message Sent!</h3>
              <p className="text-slate-400">{"Thanks for reaching out. I'll get back to you soon."}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                  placeholder="Project Discussion"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2 group"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
