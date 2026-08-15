import React from 'react';
import { Metadata } from 'next';
import DebtConsolidationCalculator from './DebtConsolidationCalculator';

export const metadata: Metadata = {
  title: 'Debt Consolidation Calculator | MoneyCal India',
  description: 'Use our free Debt Consolidation Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/loan-tools/debt-consolidation-calculator'
  }
};

export default function Page() {
  return <DebtConsolidationCalculator />;
}
