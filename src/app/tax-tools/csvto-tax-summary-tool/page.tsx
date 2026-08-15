import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CSVToTaxSummaryToolClient';

export const metadata: Metadata = {
  title: 'CSVTo Tax Summary Tool | MoneyCal India',
  description: "Explore CSVTo Tax Summary Tool on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/csvto-tax-summary-tool'
  }
};

export default function Page() {
  return <ClientComponent />;
}
