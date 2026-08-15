import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FiveYCAGRVsVolatilityAnalyzerClient';

export const metadata: Metadata = {
  title: 'Five YCAGRVs Volatility Analyzer | MoneyCal India',
  description: "Explore Five YCAGRVs Volatility Analyzer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/five-ycagrvs-volatility-analyzer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
