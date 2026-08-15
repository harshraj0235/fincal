import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CollateralRequirementsClient';

export const metadata: Metadata = {
  title: 'Collateral Requirements | MoneyCal India',
  description: "Explore Collateral Requirements on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/business-loans/collateral-requirements'
  }
};

export default function Page() {
  return <ClientComponent />;
}
