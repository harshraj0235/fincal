import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InterestRatesChargesClient';

export const metadata: Metadata = {
  title: 'Interest Rates Charges | MoneyCal India',
  description: "Explore Interest Rates Charges on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/interest-rates-charges'
  }
};

export default function Page() {
  return <ClientComponent />;
}
