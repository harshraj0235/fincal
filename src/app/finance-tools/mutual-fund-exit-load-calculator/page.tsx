import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MutualFundExitLoadCalculatorClient';

export const metadata: Metadata = {
  title: 'Mutual Fund Exit Load Calculator | MoneyCal India',
  description: "Explore Mutual Fund Exit Load Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/mutual-fund-exit-load-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
