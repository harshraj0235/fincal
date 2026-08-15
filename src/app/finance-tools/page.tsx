import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FinanceToolsClient';

export const metadata: Metadata = {
  title: 'FINANCE TOOLS | MoneyCal',
  description: 'Explore the best financial tools and calculators for finance tools in India.',
  alternates: {
    canonical: 'https://moneycal.in/finance-tools'
  }
};

export default function HubPage() {
  return <ClientComponent />;
}
