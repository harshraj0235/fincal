import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AuthorPageClient';

export const metadata: Metadata = {
  title: 'Author Page | MoneyCal India',
  description: "Explore Author Page on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/news/author-page'
  }
};

export default function Page() {
  return <ClientComponent />;
}
