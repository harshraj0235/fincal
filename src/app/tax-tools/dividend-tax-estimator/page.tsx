import React from 'react';
import { Metadata } from 'next';
import DividendTaxEstimator from './DividendTaxEstimator';

export const metadata: Metadata = {
  title: 'Dividend Tax Estimator | MoneyCal India',
  description: 'Use our free Dividend Tax Estimator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/dividend-tax-estimator'
  }
};

export default function Page() {
  return <DividendTaxEstimator />;
}
