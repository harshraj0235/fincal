import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AstroFinanceLuckyNumberGeneratorClient';

export const metadata: Metadata = {
  title: 'Astro Finance Lucky Number Generator | MoneyCal India',
  description: "Explore Astro Finance Lucky Number Generator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/astro-finance-lucky-number-generator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
