import React from 'react';
import { Metadata } from 'next';
import InvoiceAgeingReportVisualizer from './InvoiceAgeingReportVisualizer';

export const metadata: Metadata = {
  title: 'Invoice Ageing Report Visualizer | MoneyCal India',
  description: 'Use our free Invoice Ageing Report Visualizer to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business/invoice-ageing-report-visualizer'
  }
};

export default function Page() {
  return <InvoiceAgeingReportVisualizer />;
}
