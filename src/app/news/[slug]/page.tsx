import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NewsArticlePageClient from '../news-article-page/NewsArticlePageClient';

import { contentRegistry } from '@/cms-content/contentRegistry';

export async function generateStaticParams() {
  return contentRegistry.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = contentRegistry.find(a => a.slug === resolvedParams.slug);
  
  if (!article) {
    return { title: 'News Not Found | MoneyCal' };
  }

  const title = `${article.title} | MoneyCal News`;
  const description = article.excerpt || article.title;
  const url = `https://moneycal.in/news/${article.slug}/`;
  const imageUrl = article.image;

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

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = contentRegistry.find(a => a.slug === resolvedParams.slug);
  
  if (!article) {
    notFound();
  }

  return <NewsArticlePageClient />;
}
