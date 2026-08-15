import React from 'react';
import { Metadata } from 'next';
import TaxFilingDeadlineReminderWidget from './TaxFilingDeadlineReminderWidget';

export const metadata: Metadata = {
  title: 'Tax Filing Deadline Reminder Widget | MoneyCal India',
  description: 'Use our free Tax Filing Deadline Reminder Widget to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/tax-filing-deadline-reminder-widget'
  }
};

export default function Page() {
  return <TaxFilingDeadlineReminderWidget />;
}
