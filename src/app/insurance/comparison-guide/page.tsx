import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ComparisonGuideClient';

export const metadata: Metadata = {
  title: 'Comparison Guide | MoneyCal India',
  description: "Explore Comparison Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/insurance/comparison-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
