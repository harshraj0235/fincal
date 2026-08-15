import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ChooseBestLoanClient';

export const metadata: Metadata = {
  title: 'Choose Best Loan | MoneyCal India',
  description: "Explore Choose Best Loan on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/home-loans/choose-best-loan'
  }
};

export default function Page() {
  return <ClientComponent />;
}
