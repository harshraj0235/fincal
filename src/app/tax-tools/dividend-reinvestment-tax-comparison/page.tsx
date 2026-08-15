import React from 'react';
import { Metadata } from 'next';
import DividendReinvestmentTaxComparison from './DividendReinvestmentTaxComparison';

export const metadata: Metadata = {
  title: 'Dividend Reinvestment Tax Comparison | MoneyCal India',
  description: 'Use our free Dividend Reinvestment Tax Comparison to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/dividend-reinvestment-tax-comparison'
  }
};

export default function Page() {
  return <DividendReinvestmentTaxComparison />;
}
