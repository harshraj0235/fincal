import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EMICalculatorClient';

export const metadata: Metadata = {
  title: 'EMICalculator | MoneyCal India',
  description: "Explore EMICalculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/education-loans/emicalculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
