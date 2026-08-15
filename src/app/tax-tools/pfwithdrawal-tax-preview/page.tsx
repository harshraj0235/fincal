import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PFWithdrawalTaxPreviewClient';

export const metadata: Metadata = {
  title: 'PFWithdrawal Tax Preview | MoneyCal India',
  description: "Explore PFWithdrawal Tax Preview on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/pfwithdrawal-tax-preview'
  }
};

export default function Page() {
  return <ClientComponent />;
}
