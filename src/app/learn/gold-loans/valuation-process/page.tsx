import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ValuationProcessClient';

export const metadata: Metadata = {
  title: 'Valuation Process | MoneyCal India',
  description: "Explore Valuation Process on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/gold-loans/valuation-process'
  }
};

export default function Page() {
  return <ClientComponent />;
}
