import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CheckLoanEligibilityClient';

export const metadata: Metadata = {
  title: 'Check Loan Eligibility | MoneyCal India',
  description: "Explore Check Loan Eligibility on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/check-loan-eligibility'
  }
};

export default function Page() {
  return <ClientComponent />;
}
