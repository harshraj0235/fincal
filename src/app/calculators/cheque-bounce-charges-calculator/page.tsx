import React from 'react';
import { Metadata } from 'next';
import ChequeBounceChargesCalculator from './ChequeBounceChargesCalculatorClient';

export const metadata: Metadata = {
  title: 'ChequeBounceChargesCalculator | MoneyCal India',
  description: 'Free online ChequeBounceChargesCalculator tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/calculators/cheque-bounce-charges-calculator',
  }
};

export default function Page() {
  return <ChequeBounceChargesCalculator />;
}
