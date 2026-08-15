import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AccountsReceivableTrackerClient';

export const metadata: Metadata = {
  title: 'Accounts Receivable Tracker | MoneyCal India',
  description: "Explore Accounts Receivable Tracker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/accounts-receivable-tracker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
