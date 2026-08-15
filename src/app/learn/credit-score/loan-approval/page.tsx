import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanApprovalClient';

export const metadata: Metadata = {
  title: 'Loan Approval | MoneyCal India',
  description: "Explore Loan Approval on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-score/loan-approval'
  }
};

export default function Page() {
  return <ClientComponent />;
}
