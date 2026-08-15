import React from 'react';
import { Metadata } from 'next';
import FlatRateCalculator from './FlatRateCalculator';

export const metadata: Metadata = {
  title: 'Flat Rate Calculator | MoneyCal India',
  description: 'Use our free Flat Rate Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/loan-tools/flat-rate-calculator'
  }
};

export default function Page() {
  return <FlatRateCalculator />;
}
