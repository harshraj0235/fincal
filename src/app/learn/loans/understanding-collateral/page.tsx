import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './UnderstandingCollateralClient';

export const metadata: Metadata = {
  title: 'Understanding Collateral | MoneyCal India',
  description: "Explore Understanding Collateral on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/understanding-collateral'
  }
};

export default function Page() {
  return <ClientComponent />;
}
