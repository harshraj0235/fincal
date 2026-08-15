import React from 'react';
import { Metadata } from 'next';
import InvoiceAgeingReportVisualizer from './InvoiceAgeingReportVisualizerClient';

export const metadata: Metadata = {
  title: 'InvoiceAgeingReportVisualizer | MoneyCal India',
  description: 'Free online InvoiceAgeingReportVisualizer tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/invoicing-tools/invoice-ageing-report-visualizer',
  }
};

export default function Page() {
  return <InvoiceAgeingReportVisualizer />;
}
