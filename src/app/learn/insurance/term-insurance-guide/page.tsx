import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TermInsuranceGuideClient';

export const metadata: Metadata = {
  title: 'Term Insurance Guide | MoneyCal India',
  description: "Explore Term Insurance Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/insurance/term-insurance-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
