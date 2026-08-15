import React from 'react';
import { Metadata } from 'next';
import OutstandingReceivableHeatmap from './OutstandingReceivableHeatmapClient';

export const metadata: Metadata = {
  title: 'OutstandingReceivableHeatmap | MoneyCal India',
  description: 'Free online OutstandingReceivableHeatmap tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/outstanding-receivable-heatmap',
  }
};

export default function Page() {
  return <OutstandingReceivableHeatmap />;
}
