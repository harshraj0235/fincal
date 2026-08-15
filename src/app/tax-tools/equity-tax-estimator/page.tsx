import React from 'react';
import { Metadata } from 'next';
import EquityTaxEstimator from './EquityTaxEstimator';

export const metadata: Metadata = {
  title: 'Equity Tax Estimator | MoneyCal India',
  description: 'Use our free Equity Tax Estimator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/equity-tax-estimator'
  }
};

export default function Page() {
  return <EquityTaxEstimator />;
}
