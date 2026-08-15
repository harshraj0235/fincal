import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CoreMarketConceptsClient';

export const metadata: Metadata = {
  title: 'Core Market Concepts | MoneyCal India',
  description: "Explore Core Market Concepts on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/core-market-concepts'
  }
};

export default function Page() {
  return <ClientComponent />;
}
