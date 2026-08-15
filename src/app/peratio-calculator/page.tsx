import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PERatioCalculatorClient';

export const metadata: Metadata = {
  title: 'PERatio Calculator | MoneyCal India',
  description: "Explore PERatio Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/peratio-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
