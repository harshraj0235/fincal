import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanToValueRatioClient';

export const metadata: Metadata = {
  title: 'Loan To Value Ratio | MoneyCal India',
  description: "Explore Loan To Value Ratio on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/home-loans/loan-to-value-ratio'
  }
};

export default function Page() {
  return <ClientComponent />;
}
