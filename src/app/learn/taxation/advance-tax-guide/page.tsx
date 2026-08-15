import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AdvanceTaxGuideClient';

export const metadata: Metadata = {
  title: 'Advance Tax Guide | MoneyCal India',
  description: "Explore Advance Tax Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/taxation/advance-tax-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
