import React from 'react';
import { Metadata } from 'next';
import RefinancingCalculator from './RefinancingCalculator';

export const metadata: Metadata = {
  title: 'Refinancing Calculator | MoneyCal India',
  description: 'Use our free Refinancing Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/loan-tools/refinancing-calculator'
  }
};

export default function Page() {
  return <RefinancingCalculator />;
}
