import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AstroFinanceGemstoneCalculatorClient';

export const metadata: Metadata = {
  title: 'Astro Finance Gemstone Calculator | MoneyCal India',
  description: "Explore Astro Finance Gemstone Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/astro-finance-gemstone-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
