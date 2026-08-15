import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AstroFinanceNakshatraCalculatorClient';

export const metadata: Metadata = {
  title: 'Astro Finance Nakshatra Calculator | MoneyCal India',
  description: "Explore Astro Finance Nakshatra Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/astro-finance-nakshatra-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
