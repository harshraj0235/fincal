import React from 'react';
import { Metadata } from 'next';
import InvoiceToCashCycleTracker from './InvoiceToCashCycleTrackerClient';

export const metadata: Metadata = {
  title: 'InvoiceToCashCycleTracker | MoneyCal India',
  description: 'Free online InvoiceToCashCycleTracker tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/invoice-to-cash-cycle-tracker',
  }
};

export default function Page() {
  return <InvoiceToCashCycleTracker />;
}
