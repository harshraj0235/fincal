import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './IntrinsicValueCalculatorClient';

export const metadata: Metadata = {
  title: 'Intrinsic Value Calculator | MoneyCal India',
  description: "Explore Intrinsic Value Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/intrinsic-value-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
