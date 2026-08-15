import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MutualFundAnalyzerClient';

export const metadata: Metadata = {
  title: 'Mutual Fund Analyzer | MoneyCal India',
  description: "Explore Mutual Fund Analyzer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/mutual-fund-analyzer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
