import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './StartupLoanClient';

export const metadata: Metadata = {
  title: 'Startup Loan | MoneyCal India',
  description: "Explore Startup Loan on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/business-loans/startup-loan'
  }
};

export default function Page() {
  return <ClientComponent />;
}
