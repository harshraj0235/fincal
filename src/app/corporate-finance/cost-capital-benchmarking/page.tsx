import React from 'react';
import { Metadata } from 'next';
import CostOfCapitalBenchmarking from './CostOfCapitalBenchmarkingClient';

export const metadata: Metadata = {
  title: 'CostOfCapitalBenchmarking | MoneyCal India',
  description: 'Free online CostOfCapitalBenchmarking tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/corporate-finance/cost-capital-benchmarking',
  }
};

export default function Page() {
  return <CostOfCapitalBenchmarking />;
}
