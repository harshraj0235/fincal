import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CalculateTrueCostClient';

export const metadata: Metadata = {
  title: 'Calculate True Cost | MoneyCal India',
  description: "Explore Calculate True Cost on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/calculate-true-cost'
  }
};

export default function Page() {
  return <ClientComponent />;
}
