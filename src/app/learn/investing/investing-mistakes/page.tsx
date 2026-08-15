import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InvestingMistakesClient';

export const metadata: Metadata = {
  title: 'Investing Mistakes | MoneyCal India',
  description: "Explore Investing Mistakes on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/investing/investing-mistakes'
  }
};

export default function Page() {
  return <ClientComponent />;
}
