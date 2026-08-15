import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './NPSGuideClient';

export const metadata: Metadata = {
  title: 'NPSGuide | MoneyCal India',
  description: "Explore NPSGuide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/insurance/npsguide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
