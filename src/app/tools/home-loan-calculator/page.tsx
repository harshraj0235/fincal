import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './HomeLoanCalculatorClient';

export const metadata: Metadata = {
  title: 'Home Loan Calculator | MoneyCal India',
  description: "Explore Home Loan Calculator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/home-loan-calculator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
