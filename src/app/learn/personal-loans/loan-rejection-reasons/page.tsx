import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanRejectionReasonsClient';

export const metadata: Metadata = {
  title: 'Loan Rejection Reasons | MoneyCal India',
  description: "Explore Loan Rejection Reasons on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/personal-loans/loan-rejection-reasons'
  }
};

export default function Page() {
  return <ClientComponent />;
}
