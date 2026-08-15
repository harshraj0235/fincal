import React from 'react';
import { Metadata } from 'next';
import EMICalculator from './EMICalculator';

export const metadata: Metadata = {
  title: 'E M I Calculator | MoneyCal India',
  description: 'Use our free E M I Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/loan-tools/e-m-i-calculator'
  }
};

export default function Page() {
  return <EMICalculator />;
}
