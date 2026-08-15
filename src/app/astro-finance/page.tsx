import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AstroFinanceClient';

export const metadata: Metadata = {
  title: 'Astro Finance | MoneyCal India',
  description: "Explore Astro Finance on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/astro-finance'
  }
};

export default function Page() {
  return <ClientComponent />;
}
