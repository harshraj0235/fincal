import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './HomeLoanInsuranceClient';

export const metadata: Metadata = {
  title: 'Home Loan Insurance | MoneyCal India',
  description: "Explore Home Loan Insurance on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/home-loans/home-loan-insurance'
  }
};

export default function Page() {
  return <ClientComponent />;
}
