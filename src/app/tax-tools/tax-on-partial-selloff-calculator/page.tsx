import React from 'react';
import { Metadata } from 'next';
import TaxOnPartialSelloffCalculator from './TaxOnPartialSelloffCalculator';

export const metadata: Metadata = {
  title: 'Tax On Partial Selloff Calculator | MoneyCal India',
  description: 'Use our free Tax On Partial Selloff Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/tax-on-partial-selloff-calculator'
  }
};

export default function Page() {
  return <TaxOnPartialSelloffCalculator />;
}
