import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './NewsArticlePageClient';

export const metadata: Metadata = {
  title: 'News Article Page | MoneyCal India',
  description: "Explore News Article Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/news/news-article-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
