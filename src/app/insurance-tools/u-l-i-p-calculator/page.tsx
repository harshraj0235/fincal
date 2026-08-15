import React from 'react';
import { Metadata } from 'next';
import ULIPCalculator from './ULIPCalculator';

export const metadata: Metadata = {
  title: 'U L I P Calculator | MoneyCal India',
  description: 'Use our free U L I P Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/insurance-tools/u-l-i-p-calculator'
  }
};

export default function Page() {
  return <ULIPCalculator />;
}
