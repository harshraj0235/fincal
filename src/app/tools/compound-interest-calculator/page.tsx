import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CompoundInterestCalculatorClient';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator | MoneyCal India',
  description: "Explore Compound Interest Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/compound-interest-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
