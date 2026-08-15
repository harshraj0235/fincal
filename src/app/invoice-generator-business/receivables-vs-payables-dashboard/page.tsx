import React from 'react';
import { Metadata } from 'next';
import ReceivablesVsPayablesDashboard from './ReceivablesVsPayablesDashboard';

export const metadata: Metadata = {
  title: 'Receivables Vs Payables Dashboard | MoneyCal India',
  description: 'Use our free Receivables Vs Payables Dashboard to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/receivables-vs-payables-dashboard'
  }
};

export default function Page() {
  return <ReceivablesVsPayablesDashboard />;
}
