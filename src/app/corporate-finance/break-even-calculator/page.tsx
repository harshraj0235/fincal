import React from 'react';
import { Metadata } from 'next';
import BreakEvenCalculator from './BreakEvenCalculatorClient';

export const metadata: Metadata = {
  title: 'BreakEvenCalculator | MoneyCal India',
  description: 'Free online BreakEvenCalculator tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/corporate-finance/break-even-calculator',
  }
};

export default function Page() {
  return <BreakEvenCalculator />;
}
