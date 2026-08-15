import React from 'react';
import { Metadata } from 'next';
import InvoiceToCashCycleTracker from './InvoiceToCashCycleTracker';

export const metadata: Metadata = {
  title: 'Invoice To Cash Cycle Tracker | MoneyCal India',
  description: 'Use our free Invoice To Cash Cycle Tracker to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/invoice-to-cash-cycle-tracker'
  }
};

export default function Page() {
  return <InvoiceToCashCycleTracker />;
}
