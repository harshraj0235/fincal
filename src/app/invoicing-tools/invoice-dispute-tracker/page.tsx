import React from 'react';
import { Metadata } from 'next';
import InvoiceDisputeTracker from './InvoiceDisputeTrackerClient';

export const metadata: Metadata = {
  title: 'InvoiceDisputeTracker | MoneyCal India',
  description: 'Free online InvoiceDisputeTracker tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/invoice-dispute-tracker',
  }
};

export default function Page() {
  return <InvoiceDisputeTracker />;
}
