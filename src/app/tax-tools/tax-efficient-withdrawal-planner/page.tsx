import React from 'react';
import { Metadata } from 'next';
import TaxEfficientWithdrawalPlanner from './TaxEfficientWithdrawalPlanner';

export const metadata: Metadata = {
  title: 'Tax Efficient Withdrawal Planner | MoneyCal India',
  description: 'Use our free Tax Efficient Withdrawal Planner to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/tax-tools/tax-efficient-withdrawal-planner'
  }
};

export default function Page() {
  return <TaxEfficientWithdrawalPlanner />;
}
