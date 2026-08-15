import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './NewsCategoryPageClient';

export const metadata: Metadata = {
  title: 'News Category Page | MoneyCal India',
  description: "Explore News Category Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/news/news-category-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
