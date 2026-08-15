import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TaxSimplifierClient';

export const metadata: Metadata = {
  title: 'Tax Simplifier | MoneyCal India',
  description: "Explore Tax Simplifier on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tax-simplifier'
  }
};

export default function Page() {
  return <ClientComponent />;
}
