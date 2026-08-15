import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TopSectorAllocationAnalyzerClient';

export const metadata: Metadata = {
  title: 'Top Sector Allocation Analyzer | MoneyCal India',
  description: "Explore Top Sector Allocation Analyzer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/top-sector-allocation-analyzer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
