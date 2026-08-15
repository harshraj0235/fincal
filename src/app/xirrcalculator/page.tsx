import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './XIRRCalculatorClient';

export const metadata: Metadata = {
  title: 'XIRRCalculator | MoneyCal India',
  description: "Explore XIRRCalculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/xirrcalculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
