import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AlternativeInvestmentsClient';

export const metadata: Metadata = {
  title: 'Alternative Investments | MoneyCal India',
  description: "Explore Alternative Investments on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/advanced/alternative-investments'
  }
};

export default function Page() {
  return <ClientComponent />;
}
