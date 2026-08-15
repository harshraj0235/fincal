import React from 'react';
import { Metadata } from 'next';
import InvoiceDueDateTracker from './InvoiceDueDateTracker';

export const metadata: Metadata = {
  title: 'Invoice Due Date Tracker | MoneyCal India',
  description: 'Use our free Invoice Due Date Tracker to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/invoice-due-date-tracker'
  }
};

export default function Page() {
  return <InvoiceDueDateTracker />;
}
