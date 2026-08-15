import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MutualFundSwitchCalculatorClient';

export const metadata: Metadata = {
  title: 'Mutual Fund Switch Calculator | MoneyCal India',
  description: "Explore Mutual Fund Switch Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/mutual-fund-switch-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
