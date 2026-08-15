import React from 'react';
import { Metadata } from 'next';
import InvoiceDisputeTracker from './InvoiceDisputeTracker';

export const metadata: Metadata = {
  title: 'Invoice Dispute Tracker | MoneyCal India',
  description: 'Use our free Invoice Dispute Tracker to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/invoice-dispute-tracker'
  }
};

export default function Page() {
  return <InvoiceDisputeTracker />;
}
