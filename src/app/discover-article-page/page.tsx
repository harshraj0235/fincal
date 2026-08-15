import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DiscoverArticlePageClient';

export const metadata: Metadata = {
  title: 'Discover Article Page | MoneyCal India',
  description: "Explore Discover Article Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/discover-article-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
