import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MutualFundOverlapCheckerClient';

export const metadata: Metadata = {
  title: 'Mutual Fund Overlap Checker | MoneyCal India',
  description: "Explore Mutual Fund Overlap Checker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/mutual-fund-overlap-checker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
