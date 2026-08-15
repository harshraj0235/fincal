import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TaxSavingsWithSection54EC54FClient';

export const metadata: Metadata = {
  title: 'Tax Savings With Section54EC54F | MoneyCal India',
  description: "Explore Tax Savings With Section54EC54F on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/tax-savings-with-section54ec54f'
  }
};

export default function Page() {
  return <ClientComponent />;
}
