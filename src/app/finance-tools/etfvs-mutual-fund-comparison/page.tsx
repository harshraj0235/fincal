import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ETFVsMutualFundComparisonClient';

export const metadata: Metadata = {
  title: 'ETFVs Mutual Fund Comparison | MoneyCal India',
  description: "Explore ETFVs Mutual Fund Comparison on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/etfvs-mutual-fund-comparison'
  }
};

export default function Page() {
  return <ClientComponent />;
}
