import React from 'react';
import { Metadata } from 'next';
import ClientWiseInvoiceHistoryVisualizer from './ClientWiseInvoiceHistoryVisualizer';

export const metadata: Metadata = {
  title: 'Client Wise Invoice History Visualizer | MoneyCal India',
  description: 'Use our free Client Wise Invoice History Visualizer to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/client-wise-invoice-history-visualizer'
  }
};

export default function Page() {
  return <ClientWiseInvoiceHistoryVisualizer />;
}
