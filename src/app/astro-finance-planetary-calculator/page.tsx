import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AstroFinancePlanetaryCalculatorClient';

export const metadata: Metadata = {
  title: 'Astro Finance Planetary Calculator | MoneyCal India',
  description: "Explore Astro Finance Planetary Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/astro-finance-planetary-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
