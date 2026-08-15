import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PortfolioAnalyzerClient';

export const metadata: Metadata = {
  title: 'Portfolio Analyzer | MoneyCal India',
  description: "Explore Portfolio Analyzer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/portfolio-analyzer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
