import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './StockMarketBasicsClient';

export const metadata: Metadata = {
  title: 'Stock Market Basics | MoneyCal India',
  description: "Explore Stock Market Basics on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/investing/stock-market-basics'
  }
};

export default function Page() {
  return <ClientComponent />;
}
