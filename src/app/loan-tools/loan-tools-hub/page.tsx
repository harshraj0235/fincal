import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './LoanToolsHubClient';

export const metadata: Metadata = {
  title: 'Loan Tools Hub | MoneyCal India',
  description: "Explore Loan Tools Hub on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/loan-tools/loan-tools-hub'
  }
};

export default function Page() {
  return <ClientComponent />;
}
