import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PersonalLoanCalculatorClient';

export const metadata: Metadata = {
  title: 'Personal Loan Calculator | MoneyCal India',
  description: "Explore Personal Loan Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/personal-loan-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
