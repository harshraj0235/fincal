import React from 'react';
import { Metadata } from 'next';
import DebtFundTaxCalculator from './DebtFundTaxCalculator';

export const metadata: Metadata = {
  title: 'Debt Fund Tax Calculator | MoneyCal India',
  description: 'Use our free Debt Fund Tax Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/debt-fund-tax-calculator'
  }
};

export default function Page() {
  return <DebtFundTaxCalculator />;
}
