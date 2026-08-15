import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LumpsumCalculatorClient';

export const metadata: Metadata = {
  title: 'Lumpsum Calculator | MoneyCal India',
  description: "Explore Lumpsum Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/lumpsum-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
