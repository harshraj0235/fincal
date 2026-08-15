import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PropertyValuationClient';

export const metadata: Metadata = {
  title: 'Property Valuation | MoneyCal India',
  description: "Explore Property Valuation on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/home-loans/property-valuation'
  }
};

export default function Page() {
  return <ClientComponent />;
}
