import React from 'react';
import { Metadata } from 'next';
import OutstandingReceivableHeatmap from './OutstandingReceivableHeatmap';

export const metadata: Metadata = {
  title: 'Outstanding Receivable Heatmap | MoneyCal India',
  description: 'Use our free Outstanding Receivable Heatmap to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/outstanding-receivable-heatmap'
  }
};

export default function Page() {
  return <OutstandingReceivableHeatmap />;
}
