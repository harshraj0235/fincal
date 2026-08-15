import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TurnoverCalculatorITRClient';

export const metadata: Metadata = {
  title: 'Turnover Calculator ITR | MoneyCal India',
  description: "Explore Turnover Calculator ITR on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/turnover-calculator-itr'
  }
};

export default function Page() {
  return <ClientComponent />;
}
