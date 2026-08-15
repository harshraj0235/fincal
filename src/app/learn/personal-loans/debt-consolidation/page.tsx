import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DebtConsolidationClient';

export const metadata: Metadata = {
  title: 'Debt Consolidation | MoneyCal India',
  description: "Explore Debt Consolidation on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/personal-loans/debt-consolidation'
  }
};

export default function Page() {
  return <ClientComponent />;
}
