import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanComparisonToolsClient';

export const metadata: Metadata = {
  title: 'Loan Comparison Tools | MoneyCal India',
  description: "Explore Loan Comparison Tools on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/personal-loans/loan-comparison-tools'
  }
};

export default function Page() {
  return <ClientComponent />;
}
