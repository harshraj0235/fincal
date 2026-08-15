import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanAgreementGuideClient';

export const metadata: Metadata = {
  title: 'Loan Agreement Guide | MoneyCal India',
  description: "Explore Loan Agreement Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/loan-agreement-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
