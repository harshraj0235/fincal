import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanMythsDebunkedClient';

export const metadata: Metadata = {
  title: 'Loan Myths Debunked | MoneyCal India',
  description: "Explore Loan Myths Debunked on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/personal-loans/loan-myths-debunked'
  }
};

export default function Page() {
  return <ClientComponent />;
}
