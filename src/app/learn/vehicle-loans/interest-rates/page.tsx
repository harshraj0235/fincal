import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InterestRatesClient';

export const metadata: Metadata = {
  title: 'Interest Rates | MoneyCal India',
  description: "Explore Interest Rates on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/vehicle-loans/interest-rates'
  }
};

export default function Page() {
  return <ClientComponent />;
}
