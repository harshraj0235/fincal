import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TaxSavingCalculatorClient';

export const metadata: Metadata = {
  title: 'Tax Saving Calculator | MoneyCal India',
  description: "Explore Tax Saving Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/tax-saving-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
