import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanTenureExplainedClient';

export const metadata: Metadata = {
  title: 'Loan Tenure Explained | MoneyCal India',
  description: "Explore Loan Tenure Explained on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/loan-tenure-explained'
  }
};

export default function Page() {
  return <ClientComponent />;
}
