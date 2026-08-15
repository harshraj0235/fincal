import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RetirementCalculatorClient';

export const metadata: Metadata = {
  title: 'Retirement Calculator | MoneyCal India',
  description: "Explore Retirement Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/retirement-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
