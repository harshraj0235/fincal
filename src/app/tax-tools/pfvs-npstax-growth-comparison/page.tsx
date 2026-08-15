import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PFvsNPSTaxGrowthComparisonClient';

export const metadata: Metadata = {
  title: 'PFvs NPSTax Growth Comparison | MoneyCal India',
  description: "Explore PFvs NPSTax Growth Comparison on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/pfvs-npstax-growth-comparison'
  }
};

export default function Page() {
  return <ClientComponent />;
}
