import React from 'react';
import { Metadata } from 'next';
import HighDividendTaxImpactCalculator from './HighDividendTaxImpactCalculator';

export const metadata: Metadata = {
  title: 'High Dividend Tax Impact Calculator | MoneyCal India',
  description: 'Use our free High Dividend Tax Impact Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/high-dividend-tax-impact-calculator'
  }
};

export default function Page() {
  return <HighDividendTaxImpactCalculator />;
}
