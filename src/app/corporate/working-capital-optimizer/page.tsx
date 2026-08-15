import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './WorkingCapitalOptimizerClient';

export const metadata: Metadata = {
  title: 'Working Capital Optimizer | MoneyCal India',
  description: "Explore Working Capital Optimizer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/corporate/working-capital-optimizer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
