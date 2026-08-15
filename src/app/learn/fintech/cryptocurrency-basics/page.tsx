import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CryptocurrencyBasicsClient';

export const metadata: Metadata = {
  title: 'Cryptocurrency Basics | MoneyCal India',
  description: "Explore Cryptocurrency Basics on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/fintech/cryptocurrency-basics'
  }
};

export default function Page() {
  return <ClientComponent />;
}
