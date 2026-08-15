import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanApplicationProcessClient';

export const metadata: Metadata = {
  title: 'Loan Application Process | MoneyCal India',
  description: "Explore Loan Application Process on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/loan-application-process'
  }
};

export default function Page() {
  return <ClientComponent />;
}
