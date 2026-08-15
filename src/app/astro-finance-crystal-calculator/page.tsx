import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AstroFinanceCrystalCalculatorClient';

export const metadata: Metadata = {
  title: 'Astro Finance Crystal Calculator | MoneyCal India',
  description: "Explore Astro Finance Crystal Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/astro-finance-crystal-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
