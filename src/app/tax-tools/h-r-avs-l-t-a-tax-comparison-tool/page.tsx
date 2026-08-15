import React from 'react';
import { Metadata } from 'next';
import HRAvsLTATaxComparisonTool from './HRAvsLTATaxComparisonTool';

export const metadata: Metadata = {
  title: 'H R Avs L T A Tax Comparison Tool | MoneyCal India',
  description: 'Use our free H R Avs L T A Tax Comparison Tool to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/h-r-avs-l-t-a-tax-comparison-tool'
  }
};

export default function Page() {
  return <HRAvsLTATaxComparisonTool />;
}
