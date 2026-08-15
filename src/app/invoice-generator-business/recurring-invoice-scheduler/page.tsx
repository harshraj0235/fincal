import React from 'react';
import { Metadata } from 'next';
import RecurringInvoiceScheduler from './RecurringInvoiceScheduler';

export const metadata: Metadata = {
  title: 'Recurring Invoice Scheduler | MoneyCal India',
  description: 'Use our free Recurring Invoice Scheduler to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/recurring-invoice-scheduler'
  }
};

export default function Page() {
  return <RecurringInvoiceScheduler />;
}
