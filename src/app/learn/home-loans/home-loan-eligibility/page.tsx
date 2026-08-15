import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './HomeLoanEligibilityClient';

export const metadata: Metadata = {
  title: 'Home Loan Eligibility | MoneyCal India',
  description: "Explore Home Loan Eligibility on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/home-loans/home-loan-eligibility'
  }
};

export default function Page() {
  return <ClientComponent />;
}
