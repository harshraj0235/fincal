import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './IndexFundReturnComparisonClient';

export const metadata: Metadata = {
  title: 'Index Fund Return Comparison | MoneyCal India',
  description: "Explore Index Fund Return Comparison on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/index-fund-return-comparison'
  }
};

export default function Page() {
  return <ClientComponent />;
}
