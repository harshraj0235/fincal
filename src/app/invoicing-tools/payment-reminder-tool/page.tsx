import React from 'react';
import { Metadata } from 'next';
import PaymentReminderTool from './PaymentReminderToolClient';

export const metadata: Metadata = {
  title: 'PaymentReminderTool | MoneyCal India',
  description: 'Free online PaymentReminderTool tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/payment-reminder-tool',
  }
};

export default function Page() {
  return <PaymentReminderTool />;
}
