import React from 'react';
import { Metadata } from 'next';
import LoanAffordabilityCalculator from './LoanAffordabilityCalculator';

export const metadata: Metadata = {
  title: 'Loan Affordability Calculator | MoneyCal India',
  description: 'Use our free Loan Affordability Calculator to calculate and plan your finances accurately.',
  alternates: {
    canonical: 'https://moneycal.in/loan-tools/loan-affordability-calculator'
  }
};

export default function Page() {
  return <LoanAffordabilityCalculator />;
}
