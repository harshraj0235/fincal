import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './StockScreenerClient';

export const metadata: Metadata = {
  title: 'Stock Screener | MoneyCal India',
  description: "Explore Stock Screener on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/stock-screener'
  }
};

export default function Page() {
  return <ClientComponent />;
}
