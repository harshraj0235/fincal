import React from 'react';
import { Metadata } from 'next';
import InvoiceDueDateTracker from './InvoiceDueDateTrackerClient';

export const metadata: Metadata = {
  title: 'InvoiceDueDateTracker | MoneyCal India',
  description: 'Free online InvoiceDueDateTracker tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/invoice-due-date-tracker',
  }
};

export default function Page() {
  return <InvoiceDueDateTracker />;
}
