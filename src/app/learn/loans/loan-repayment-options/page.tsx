import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanRepaymentOptionsClient';

export const metadata: Metadata = {
  title: 'Loan Repayment Options | MoneyCal India',
  description: "Explore Loan Repayment Options on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/loan-repayment-options'
  }
};

export default function Page() {
  return <ClientComponent />;
}
