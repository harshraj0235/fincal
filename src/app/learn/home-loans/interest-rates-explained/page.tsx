import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InterestRatesExplainedClient';

export const metadata: Metadata = {
  title: 'Interest Rates Explained | MoneyCal India',
  description: "Explore Interest Rates Explained on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/home-loans/interest-rates-explained'
  }
};

export default function Page() {
  return <ClientComponent />;
}
