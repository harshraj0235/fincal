import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CommonLoanTermsClient';

export const metadata: Metadata = {
  title: 'Common Loan Terms | MoneyCal India',
  description: "Explore Common Loan Terms on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/common-loan-terms'
  }
};

export default function Page() {
  return <ClientComponent />;
}
