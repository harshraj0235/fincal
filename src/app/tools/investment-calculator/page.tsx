import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InvestmentCalculatorClient';

export const metadata: Metadata = {
  title: 'Investment Calculator | MoneyCal India',
  description: "Explore Investment Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/investment-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
