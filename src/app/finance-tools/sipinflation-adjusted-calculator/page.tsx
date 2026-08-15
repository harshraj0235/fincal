import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SIPInflationAdjustedCalculatorClient';

export const metadata: Metadata = {
  title: 'SIPInflation Adjusted Calculator | MoneyCal India',
  description: "Explore SIPInflation Adjusted Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/sipinflation-adjusted-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
