import React from 'react';
import { Metadata } from 'next';
import InvoiceEmailTracker from './InvoiceEmailTracker';

export const metadata: Metadata = {
  title: 'Invoice Email Tracker | MoneyCal India',
  description: 'Use our free Invoice Email Tracker to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/invoice-email-tracker'
  }
};

export default function Page() {
  return <InvoiceEmailTracker />;
}
