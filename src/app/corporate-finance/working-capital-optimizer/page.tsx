import React from 'react';
import { Metadata } from 'next';
import WorkingCapitalOptimizer from './WorkingCapitalOptimizerClient';

export const metadata: Metadata = {
  title: 'WorkingCapitalOptimizer | MoneyCal India',
  description: 'Free online WorkingCapitalOptimizer tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/corporate-finance/working-capital-optimizer',
  }
};

export default function Page() {
  return <WorkingCapitalOptimizer />;
}
