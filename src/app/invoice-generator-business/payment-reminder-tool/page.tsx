import React from 'react';
import { Metadata } from 'next';
import PaymentReminderTool from './PaymentReminderTool';

export const metadata: Metadata = {
  title: 'Payment Reminder Tool | MoneyCal India',
  description: 'Use our free Payment Reminder Tool to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/payment-reminder-tool'
  }
};

export default function Page() {
  return <PaymentReminderTool />;
}
