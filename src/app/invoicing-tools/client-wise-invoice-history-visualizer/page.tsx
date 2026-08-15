import React from 'react';
import { Metadata } from 'next';
import ClientWiseInvoiceHistoryVisualizer from './ClientWiseInvoiceHistoryVisualizerClient';

export const metadata: Metadata = {
  title: 'ClientWiseInvoiceHistoryVisualizer | MoneyCal India',
  description: 'Free online ClientWiseInvoiceHistoryVisualizer tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/client-wise-invoice-history-visualizer',
  }
};

export default function Page() {
  return <ClientWiseInvoiceHistoryVisualizer />;
}
