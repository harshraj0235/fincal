import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanFraudProtectionClient';

export const metadata: Metadata = {
  title: 'Loan Fraud Protection | MoneyCal India',
  description: "Explore Loan Fraud Protection on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/personal-loans/loan-fraud-protection'
  }
};

export default function Page() {
  return <ClientComponent />;
}
