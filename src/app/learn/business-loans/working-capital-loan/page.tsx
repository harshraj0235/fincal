import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './WorkingCapitalLoanClient';

export const metadata: Metadata = {
  title: 'Working Capital Loan | MoneyCal India',
  description: "Explore Working Capital Loan on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/business-loans/working-capital-loan'
  }
};

export default function Page() {
  return <ClientComponent />;
}
