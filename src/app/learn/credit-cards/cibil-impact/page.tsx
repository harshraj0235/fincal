import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CibilImpactClient';

export const metadata: Metadata = {
  title: 'Cibil Impact | MoneyCal India',
  description: "Explore Cibil Impact on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/cibil-impact'
  }
};

export default function Page() {
  return <ClientComponent />;
}
