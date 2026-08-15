import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InsuranceCalculatorClient';

export const metadata: Metadata = {
  title: 'Insurance Calculator | MoneyCal India',
  description: "Explore Insurance Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/insurance-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
