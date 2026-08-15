import React from 'react';
import { Metadata } from 'next';
import RecurringInvoiceScheduler from './RecurringInvoiceSchedulerClient';

export const metadata: Metadata = {
  title: 'RecurringInvoiceScheduler | MoneyCal India',
  description: 'Free online RecurringInvoiceScheduler tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/recurring-invoice-scheduler',
  }
};

export default function Page() {
  return <RecurringInvoiceScheduler />;
}
