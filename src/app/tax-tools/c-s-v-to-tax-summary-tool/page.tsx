import React from 'react';
import { Metadata } from 'next';
import CSVToTaxSummaryTool from './CSVToTaxSummaryTool';

export const metadata: Metadata = {
  title: 'C S V To Tax Summary Tool | MoneyCal India',
  description: 'Use our free C S V To Tax Summary Tool to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/c-s-v-to-tax-summary-tool'
  }
};

export default function Page() {
  return <CSVToTaxSummaryTool />;
}
