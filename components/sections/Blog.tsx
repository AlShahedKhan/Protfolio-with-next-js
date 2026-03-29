'use client';

import { Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { blogPostsData } from '@/lib/portfolio-data';

export default function Blog() {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section id="blog" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container-max">
        <div className="space-y-2 mb-16">
          <span className="text-cyan-400 font-semibold text-sm tracking-wide uppercase">Insights</span>
          <h2 className="section-title">Latest Articles</h2>
          <p className="section-subtitle">
            Sharing my knowledge and insights about web development, Laravel, and best practices
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPostsData.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="glass-effect overflow-hidden card-hover group flex flex-col h-full animate-fade-in">
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-semibold border border-cyan-500/30">
                    {post.tags[0]}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <span>{post.readTime} min read</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-slate-400 text-sm mb-4 flex-grow">{post.excerpt}</p>

                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm pt-4 border-t border-slate-700 group-hover:gap-4 transition-all duration-300">
                  Read Article
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link href="/blog" className="btn-primary">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
