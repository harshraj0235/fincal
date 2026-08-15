import React from 'react';
import { Metadata } from 'next';
import InvoiceEmailTracker from './InvoiceEmailTrackerClient';

export const metadata: Metadata = {
  title: 'InvoiceEmailTracker | MoneyCal India',
  description: 'Free online InvoiceEmailTracker tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/invoice-email-tracker',
  }
};

export default function Page() {
  return <InvoiceEmailTracker />;
}
