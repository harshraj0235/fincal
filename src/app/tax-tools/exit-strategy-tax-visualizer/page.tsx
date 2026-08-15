import React from 'react';
import { Metadata } from 'next';
import ExitStrategyTaxVisualizer from './ExitStrategyTaxVisualizer';

export const metadata: Metadata = {
  title: 'Exit Strategy Tax Visualizer | MoneyCal India',
  description: 'Use our free Exit Strategy Tax Visualizer to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/exit-strategy-tax-visualizer'
  }
};

export default function Page() {
  return <ExitStrategyTaxVisualizer />;
}
