import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PersonalLoanEligibilityClient';

export const metadata: Metadata = {
  title: 'Personal Loan Eligibility | MoneyCal India',
  description: "Explore Personal Loan Eligibility on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/personal-loans/personal-loan-eligibility'
  }
};

export default function Page() {
  return <ClientComponent />;
}
