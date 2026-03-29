import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { blogPostsData, portfolioOwner } from '@/lib/portfolio-data';

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="container-max py-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Journal</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Articles by {portfolioOwner.name}</h1>
          </div>
          <Link href="/" className="btn-secondary inline-flex items-center gap-2">
            <ArrowLeft size={18} />
            Back Home
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-max">
          <div className="max-w-2xl mb-12 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">Writing about Laravel, architecture, and product work</h2>
            <p className="text-slate-400 text-lg">
              These starter articles are wired up as real routes now, so you can replace the sample content with your own posts or swap the page over to your Laravel API later.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {blogPostsData.map((post) => (
              <article key={post.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-[0_30px_80px_rgba(2,6,23,0.35)]">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1280px) 28vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute left-5 top-5 rounded-full border border-cyan-400/30 bg-slate-950/70 px-3 py-1 text-xs font-semibold text-cyan-300">
                      {post.tags[0]}
                    </div>
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                      <span className="inline-flex items-center gap-2">
                        <Calendar size={14} />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock size={14} />
                        {post.readTime} min read
                      </span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-cyan-300">
                        {post.title}
                      </h3>
                      <p className="text-slate-400">{post.excerpt}</p>
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                      Open article
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
