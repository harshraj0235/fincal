import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanClosureProcessClient';

export const metadata: Metadata = {
  title: 'Loan Closure Process | MoneyCal India',
  description: "Explore Loan Closure Process on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/personal-loans/loan-closure-process'
  }
};

export default function Page() {
  return <ClientComponent />;
}
