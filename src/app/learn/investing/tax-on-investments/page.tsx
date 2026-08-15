import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TaxOnInvestmentsClient';

export const metadata: Metadata = {
  title: 'Tax On Investments | MoneyCal India',
  description: "Explore Tax On Investments on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/investing/tax-on-investments'
  }
};

export default function Page() {
  return <ClientComponent />;
}
