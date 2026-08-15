import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DiscoverArticlePageClient from '../../discover-article-page/DiscoverArticlePageClient';

// We only need the metadata types for routing and SEO
import { discoverMetadata } from '@/data/discover/metadata';

export async function generateStaticParams() {
  return discoverMetadata.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = discoverMetadata.find(a => a.slug === resolvedParams.slug);
  
  if (!article) {
    return { title: 'Article Not Found | MoneyCal' };
  }

  const title = `${article.title} | MoneyCal Discover`;
  const description = article.snippet || article.title;
  const url = `https://moneycal.in/discover/${article.slug}/`;
  const imageUrl = `https://moneycal.in${article.coverImage}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'MoneyCal India',
      locale: 'en_IN',
      type: 'article',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    }
  };
}

export default async function DiscoverArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = discoverMetadata.find(a => a.slug === resolvedParams.slug);
  
  if (!article) {
    notFound();
  }

  return <DiscoverArticlePageClient />;
}
