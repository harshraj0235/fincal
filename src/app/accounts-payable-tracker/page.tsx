import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './AccountsPayableTrackerClient';

export const metadata: Metadata = {
  title: 'Accounts Payable Tracker | MoneyCal India',
  description: "Explore Accounts Payable Tracker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/accounts-payable-tracker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
