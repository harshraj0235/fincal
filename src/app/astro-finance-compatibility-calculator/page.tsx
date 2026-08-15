import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AstroFinanceCompatibilityCalculatorClient';

export const metadata: Metadata = {
  title: 'Astro Finance Compatibility Calculator | MoneyCal India',
  description: "Explore Astro Finance Compatibility Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/astro-finance-compatibility-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
