import React from 'react';
import { Metadata } from 'next';
import CostOfCapitalBenchmarking from './CostOfCapitalBenchmarking';

export const metadata: Metadata = {
  title: 'Cost Of Capital Benchmarking | MoneyCal India',
  description: 'Use our free Cost Of Capital Benchmarking to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/corporate-finance/cost-of-capital-benchmarking'
  }
};

export default function Page() {
  return <CostOfCapitalBenchmarking />;
}
