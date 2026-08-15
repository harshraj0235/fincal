import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ULIPCalculatorClient';

export const metadata: Metadata = {
  title: 'ULIPCalculator | MoneyCal India',
  description: "Explore ULIPCalculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/insurance/ulipcalculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
