import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SwitchMFTaxCalculatorClient';

export const metadata: Metadata = {
  title: 'Switch MFTax Calculator | MoneyCal India',
  description: "Explore Switch MFTax Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/switch-mftax-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
