import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanAmortizationGeneratorClient';

export const metadata: Metadata = {
  title: 'Loan Amortization Generator | MoneyCal India',
  description: "Explore Loan Amortization Generator on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/corporate/loan-amortization-generator'
  }
};

export default function Page() {
  return <ClientComponent />;
}
