import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EMICalculatorCompleteGuideClient';

export const metadata: Metadata = {
  title: 'EMICalculator Complete Guide | MoneyCal India',
  description: "Explore EMICalculator Complete Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/emicalculator-complete-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
