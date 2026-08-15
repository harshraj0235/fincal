import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InvoicingReceivablesHubClient';

export const metadata: Metadata = {
  title: 'Invoicing Receivables Hub | MoneyCal India',
  description: "Explore Invoicing Receivables Hub on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/invoicing-receivables-hub'
  }
};

export default function Page() {
  return <ClientComponent />;
}
