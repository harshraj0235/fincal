import React from 'react';
import { Metadata } from 'next';
import TaxLossHarvestingCalculator from './TaxLossHarvestingCalculator';

export const metadata: Metadata = {
  title: 'Tax Loss Harvesting Calculator | MoneyCal India',
  description: 'Use our free Tax Loss Harvesting Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/tax-loss-harvesting-calculator'
  }
};

export default function Page() {
  return <TaxLossHarvestingCalculator />;
}
