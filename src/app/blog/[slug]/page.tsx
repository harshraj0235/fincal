import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { allBlogPosts, getBlogPostBySlug, getRelatedPosts } from '../../../data/allBlogData';
import BlogArticleContent from './BlogArticleContent';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;
export const dynamicParams = true;

/** Return empty to avoid OOM on Cloudflare. All posts generated on-demand. */
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post | MoneyCal India' };
  const p = post as {
    title?: string;
    excerpt?: string;
    description?: string;
    openGraph?: { image?: string };
    coverImage?: string;
  };
  const title = p.title || 'Blog | MoneyCal India';
  const description = (p.excerpt || p.description || '').slice(0, 160);
  const ogImage = p.openGraph?.image || p.coverImage || 'https://moneycal.in/android-chrome-512x512.png';
  const url = `https://moneycal.in/blog/${slug}`;
  return {
    title: `${title} | MoneyCal India`,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'MoneyCal India',
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: url },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  const p = post as {
    title?: string;
    date?: string;
    lastUpdated?: string;
    content?: unknown;
  };
  const title = p.title || 'Blog post';
  const date = p.lastUpdated || p.date;
  const content = Array.isArray(p.content) ? p.content : [];
  const related = getRelatedPosts(slug, 4);

  return (
    <article className="container mx-auto px-4 py-6 max-w-4xl" aria-label="Blog post">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {date && (
          <time dateTime={new Date(date).toISOString()} className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString('en-IN', { dateStyle: 'long' })}
          </time>
        )}
      </header>
      <BlogArticleContent content={content} />
      {related.length > 0 && (
        <section className="mt-10 pt-6 border-t border-gray-200" aria-label="Related articles">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related articles</h2>
          <ul className="space-y-2">
            {related.map((r: { slug?: string; title?: string }) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}`} className="text-blue-600 hover:underline">
                  {(r as { title?: string }).title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
