import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BusinessLoanBasicsClient';

export const metadata: Metadata = {
  title: 'Business Loan Basics | MoneyCal India',
  description: "Explore Business Loan Basics on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/business-loans/business-loan-basics'
  }
};

export default function Page() {
  return <ClientComponent />;
}
