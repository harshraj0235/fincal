import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BankReturnsOptimizerClient';

export const metadata: Metadata = {
  title: 'Bank Returns Optimizer | MoneyCal India',
  description: "Explore Bank Returns Optimizer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/bank-returns-optimizer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
