import React from 'react';
import { Metadata } from 'next';
import PFvsNPSTaxGrowthComparison from './PFvsNPSTaxGrowthComparison';

export const metadata: Metadata = {
  title: 'P Fvs N P S Tax Growth Comparison | MoneyCal India',
  description: 'Use our free P Fvs N P S Tax Growth Comparison to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/p-fvs-n-p-s-tax-growth-comparison'
  }
};

export default function Page() {
  return <PFvsNPSTaxGrowthComparison />;
}
