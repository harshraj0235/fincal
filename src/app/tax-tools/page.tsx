import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TaxToolsHubClient';

export const metadata: Metadata = {
  title: 'TAX TOOLS | MoneyCal',
  description: 'Explore the best financial tools and calculators for tax tools in India.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools'
  }
};

export default function HubPage() {
  return <ClientComponent />;
}
