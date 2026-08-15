import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './StockMarketClient';

export const metadata: Metadata = {
  title: 'Stock Market | MoneyCal India',
  description: "Explore Stock Market on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/stock-market'
  }
};

export default function Page() {
  return <ClientComponent />;
}
