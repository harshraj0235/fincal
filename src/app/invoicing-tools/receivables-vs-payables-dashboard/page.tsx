import React from 'react';
import { Metadata } from 'next';
import ReceivablesVsPayablesDashboard from './ReceivablesVsPayablesDashboardClient';

export const metadata: Metadata = {
  title: 'ReceivablesVsPayablesDashboard | MoneyCal India',
  description: 'Free online ReceivablesVsPayablesDashboard tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/receivables-vs-payables-dashboard',
  }
};

export default function Page() {
  return <ReceivablesVsPayablesDashboard />;
}
