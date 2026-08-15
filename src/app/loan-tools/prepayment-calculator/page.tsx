import React from 'react';
import { Metadata } from 'next';
import PrepaymentCalculator from './PrepaymentCalculator';

export const metadata: Metadata = {
  title: 'Prepayment Calculator | MoneyCal India',
  description: 'Use our free Prepayment Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/loan-tools/prepayment-calculator'
  }
};

export default function Page() {
  return <PrepaymentCalculator />;
}
