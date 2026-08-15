import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InstantLoanAppsClient';

export const metadata: Metadata = {
  title: 'Instant Loan Apps | MoneyCal India',
  description: "Explore Instant Loan Apps on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/personal-loans/instant-loan-apps'
  }
};

export default function Page() {
  return <ClientComponent />;
}
