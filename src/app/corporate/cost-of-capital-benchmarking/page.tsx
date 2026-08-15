import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CostOfCapitalBenchmarkingClient';

export const metadata: Metadata = {
  title: 'Cost Of Capital Benchmarking | MoneyCal India',
  description: "Explore Cost Of Capital Benchmarking on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/corporate/cost-of-capital-benchmarking'
  }
};

export default function Page() {
  return <ClientComponent />;
}
