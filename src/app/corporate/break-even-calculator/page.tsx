import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BreakEvenCalculatorClient';

export const metadata: Metadata = {
  title: 'Break Even Calculator | MoneyCal India',
  description: "Explore Break Even Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/corporate/break-even-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
