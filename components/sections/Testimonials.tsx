import { Star } from 'lucide-react';
import Image from 'next/image';
import { getTestimonials } from '@/lib/content';

export default function Testimonials() {
  const testimonialsData = getTestimonials();

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-slate-900/50 relative overflow-hidden">
      <div className="container-max">
        <div className="space-y-2 mb-16">
          <span className="text-cyan-400 font-semibold text-sm tracking-wide uppercase">Testimonials</span>
          <h2 className="section-title">What Others Say</h2>
          <p className="section-subtitle">
            {"Kind words from clients and colleagues I've had the pleasure to work with"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="glass-effect p-6 card-hover flex flex-col animate-fade-in">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-slate-300 mb-6 flex-grow italic">{`"${testimonial.content}"`}</p>

              <div className="border-t border-slate-700 pt-4 flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                  <p className="text-slate-400 text-xs">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-950/60 p-6 text-center text-sm text-slate-400">
          Additional client references and private project details can be shared during serious project discussions.
        </div>
      </div>
    </section>
  );
}
