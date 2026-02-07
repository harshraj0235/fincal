import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { allBlogPosts, getBlogPostBySlug } from '../../data/allBlogData';

const App = dynamic(() => import('../../App'), { ssr: false });

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  return allBlogPosts
    .filter((p: { slug?: string }) => p.slug)
    .map((p: { slug: string }) => ({ slug: p.slug }));
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
  const title = (post as { title?: string }).title || 'Blog post';
  const date = (post as { date?: string; lastUpdated?: string }).lastUpdated || (post as { date?: string }).date;
  return (
    <>
      <article className="container mx-auto px-4 py-6 max-w-4xl" aria-label="Blog post">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {date && (
            <time dateTime={new Date(date).toISOString()} className="text-sm text-gray-500">
              {new Date(date).toLocaleDateString('en-IN', { dateStyle: 'long' })}
            </time>
          )}
        </header>
      </article>
      <App pathname={`/blog/${slug}`} skipLayout />
    </>
  );
}
