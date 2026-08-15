import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CapitalGainsTaxClient';

export const metadata: Metadata = {
  title: 'Capital Gains Tax | MoneyCal India',
  description: "Explore Capital Gains Tax on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/taxation/capital-gains-tax'
  }
};

export default function Page() {
  return <ClientComponent />;
}
