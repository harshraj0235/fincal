import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CreditScoreCalculatorClient';

export const metadata: Metadata = {
  title: 'Credit Score Calculator | MoneyCal India',
  description: "Explore Credit Score Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/credit-score-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
