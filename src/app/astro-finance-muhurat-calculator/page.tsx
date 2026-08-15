import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AstroFinanceMuhuratCalculatorClient';

export const metadata: Metadata = {
  title: 'Astro Finance Muhurat Calculator | MoneyCal India',
  description: "Explore Astro Finance Muhurat Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/astro-finance-muhurat-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
