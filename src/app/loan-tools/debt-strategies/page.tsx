import React from 'react';
import { Metadata } from 'next';
import DebtStrategies from './DebtStrategies';

export const metadata: Metadata = {
  title: 'Debt Strategies | MoneyCal India',
  description: 'Use our free Debt Strategies to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/loan-tools/debt-strategies'
  }
};

export default function Page() {
  return <DebtStrategies />;
}
