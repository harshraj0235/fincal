import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CollateralVsNonCollateralClient';

export const metadata: Metadata = {
  title: 'Collateral Vs Non Collateral | MoneyCal India',
  description: "Explore Collateral Vs Non Collateral on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/education-loans/collateral-vs-non-collateral'
  }
};

export default function Page() {
  return <ClientComponent />;
}
