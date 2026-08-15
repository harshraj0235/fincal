import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MarketAnalysisClient';

export const metadata: Metadata = {
  title: 'Market Analysis | MoneyCal India',
  description: "Explore Market Analysis on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/market-analysis'
  }
};

export default function Page() {
  return <ClientComponent />;
}
