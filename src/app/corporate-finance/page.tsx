import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CorporateFinanceClient';

export const metadata: Metadata = {
  title: 'CORPORATE FINANCE | MoneyCal',
  description: 'Explore the best financial tools and calculators for corporate finance in India.',
  alternates: {
    canonical: 'https://moneycal.in/corporate-finance'
  }
};

export default function HubPage() {
  return <ClientComponent />;
}
