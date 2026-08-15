import React from 'react';
import { Metadata } from 'next';
import SwitchMFTaxCalculator from './SwitchMFTaxCalculator';

export const metadata: Metadata = {
  title: 'Switch M F Tax Calculator | MoneyCal India',
  description: 'Use our free Switch M F Tax Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/switch-m-f-tax-calculator'
  }
};

export default function Page() {
  return <SwitchMFTaxCalculator />;
}
