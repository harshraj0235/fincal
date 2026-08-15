import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './NISMGuideClient';

export const metadata: Metadata = {
  title: 'NISMGuide | MoneyCal India',
  description: "Explore NISMGuide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/investing/nismguide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
