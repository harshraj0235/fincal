import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './StockAnalyzerClient';

export const metadata: Metadata = {
  title: 'Stock Analyzer | MoneyCal India',
  description: "Explore Stock Analyzer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/stock-analyzer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
