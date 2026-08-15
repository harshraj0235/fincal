import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CAGRCalculatorClient';

export const metadata: Metadata = {
  title: 'CAGRCalculator | MoneyCal India',
  description: "Explore CAGRCalculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/cagrcalculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
