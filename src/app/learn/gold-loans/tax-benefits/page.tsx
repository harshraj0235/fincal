import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TaxBenefitsClient';

export const metadata: Metadata = {
  title: 'Tax Benefits | MoneyCal India',
  description: "Explore Tax Benefits on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/gold-loans/tax-benefits'
  }
};

export default function Page() {
  return <ClientComponent />;
}
