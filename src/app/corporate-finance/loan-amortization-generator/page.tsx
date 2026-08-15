import React from 'react';
import { Metadata } from 'next';
import LoanAmortizationGenerator from './LoanAmortizationGeneratorClient';

export const metadata: Metadata = {
  title: 'LoanAmortizationGenerator | MoneyCal India',
  description: 'Free online LoanAmortizationGenerator tool by MoneyCal India.',
  alternates: {
    canonical: 'https://moneycal.in/corporate-finance/loan-amortization-generator',
  }
};

export default function Page() {
  return <LoanAmortizationGenerator />;
}
