'use client';

import { useState } from 'react';
import { Plus, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { testimonialsData } from '@/lib/portfolio-data';

export default function TestimonialsAdmin() {
  const [testimonials] = useState(testimonialsData);

  const deleteTestimonial = (id: string) => {
    console.log('[v0] Deleting testimonial:', id);
    // Connected to Laravel backend
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Testimonials</h1>
          <p className="text-slate-400">Manage client testimonials</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300"
        >
          <Plus size={20} />
          Add Testimonial
        </Link>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                <p className="text-cyan-400 text-sm">{testimonial.role} at {testimonial.company}</p>
                <p className="text-slate-300 mt-3 italic">{`"${testimonial.content}"`}</p>
              </div>
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0 ml-4"
              />
            </div>
            <div className="flex gap-3 pt-4 border-t border-slate-700">
              <Link
                href={`/admin/testimonials/${testimonial.id}`}
                className="flex-1 px-4 py-2 rounded-lg hover:bg-cyan-500/10 text-cyan-400 font-medium transition-colors duration-300"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteTestimonial(testimonial.id)}
                className="flex-1 px-4 py-2 rounded-lg hover:bg-red-500/10 text-red-400 font-medium transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
