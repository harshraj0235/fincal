import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CryptoArticlePostClient';

export const metadata: Metadata = {
  title: 'Crypto Article Post | MoneyCal India',
  description: "Explore Crypto Article Post on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/crypto-article-post'
  }
};

export default function Page() {
  return <ClientComponent />;
}
