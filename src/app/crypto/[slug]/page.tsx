import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { cryptoBlogs } from '@/data/crypto';
import CryptoPostClient from './CryptoPostClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cryptoBlogs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = cryptoBlogs.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post Not Found | MoneyCal',
    };
  }

  return {
    title: `${post.title} | MoneyCal Crypto`,
    description: post.metaDescription || post.description,
    keywords: post.keywords?.join(', '),
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.description,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author],
      tags: post.tags,
    },
    alternates: {
      canonical: `https://moneycal.in/crypto/${post.slug}`,
    },
  };
}

export default async function CryptoPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = cryptoBlogs.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return <CryptoPostClient post={post} />;
}
