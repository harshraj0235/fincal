import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RealVsNominalReturnCalculatorClient';

export const metadata: Metadata = {
  title: 'Real Vs Nominal Return Calculator | MoneyCal India',
  description: "Explore Real Vs Nominal Return Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/real-vs-nominal-return-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
