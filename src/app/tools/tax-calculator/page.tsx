import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TaxCalculatorClient';

export const metadata: Metadata = {
  title: 'Tax Calculator | MoneyCal India',
  description: "Explore Tax Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/tax-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
