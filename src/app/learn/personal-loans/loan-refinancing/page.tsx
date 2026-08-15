import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanRefinancingClient';

export const metadata: Metadata = {
  title: 'Loan Refinancing | MoneyCal India',
  description: "Explore Loan Refinancing on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/personal-loans/loan-refinancing'
  }
};

export default function Page() {
  return <ClientComponent />;
}
