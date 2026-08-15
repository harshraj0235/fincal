import React from 'react';
import { Metadata } from 'next';
import PFWithdrawalTaxPreview from './PFWithdrawalTaxPreview';

export const metadata: Metadata = {
  title: 'P F Withdrawal Tax Preview | MoneyCal India',
  description: 'Use our free P F Withdrawal Tax Preview to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/p-f-withdrawal-tax-preview'
  }
};

export default function Page() {
  return <PFWithdrawalTaxPreview />;
}
