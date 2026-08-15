import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './IncomeTaxCalculatorClient';

export const metadata: Metadata = {
  title: 'Income Tax Calculator | MoneyCal India',
  description: "Explore Income Tax Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/income-tax-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
