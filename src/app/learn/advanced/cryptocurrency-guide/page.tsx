import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CryptocurrencyGuideClient';

export const metadata: Metadata = {
  title: 'Cryptocurrency Guide | MoneyCal India',
  description: "Explore Cryptocurrency Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/advanced/cryptocurrency-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
