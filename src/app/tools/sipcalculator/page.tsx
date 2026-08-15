import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SIPCalculatorClient';

export const metadata: Metadata = {
  title: 'SIPCalculator | MoneyCal India',
  description: "Explore SIPCalculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/sipcalculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
