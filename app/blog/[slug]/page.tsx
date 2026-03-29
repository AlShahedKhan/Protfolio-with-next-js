import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { blogPostsData, portfolioOwner } from '@/lib/portfolio-data';
import { formatDate } from '@/lib/format-date';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const getPostBySlug = (slug: string) => blogPostsData.find((post) => post.slug === slug);

export function generateStaticParams() {
  return blogPostsData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} | ${portfolioOwner.name}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleBody =
    post.content === 'Full blog post content here...'
      ? `${post.excerpt} This starter currently ships with summary-only content, so this page is the place to drop in your full article body or hydrate it from your backend API.`
      : post.content;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="container-max py-8 flex items-center justify-between gap-4">
          <Link href="/blog" className="btn-secondary inline-flex items-center gap-2">
            <ArrowLeft size={18} />
            All Articles
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-300 transition-colors duration-300 hover:text-cyan-300">
            Back Home
          </Link>
        </div>
      </section>

      <article className="py-12 md:py-20">
        <div className="container-max">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-5">
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{post.title}</h1>
              <p className="max-w-3xl text-lg text-slate-400">{post.excerpt}</p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <Calendar size={14} />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock size={14} />
                  {post.readTime} min read
                </span>
                <span>By {portfolioOwner.name}</span>
              </div>
            </div>

            <div className="relative h-[340px] overflow-hidden rounded-3xl border border-slate-800">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 md:p-10">
              <div className="prose prose-invert max-w-none">
                <p>{articleBody}</p>
                <p>
                  Replace this sample copy with your full article body, or connect the route to your Laravel backend and fetch the
                  real post content by slug.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
