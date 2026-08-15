import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FixedVsFloatingRatesClient';

export const metadata: Metadata = {
  title: 'Fixed Vs Floating Rates | MoneyCal India',
  description: "Explore Fixed Vs Floating Rates on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/fixed-vs-floating-rates'
  }
};

export default function Page() {
  return <ClientComponent />;
}
