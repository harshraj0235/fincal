import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EMICalculatorGuideClient';

export const metadata: Metadata = {
  title: 'EMICalculator Guide | MoneyCal India',
  description: "Explore EMICalculator Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/home-loans/emicalculator-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
