import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TwoWheelerLoanClient';

export const metadata: Metadata = {
  title: 'Two Wheeler Loan | MoneyCal India',
  description: "Explore Two Wheeler Loan on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/vehicle-loans/two-wheeler-loan'
  }
};

export default function Page() {
  return <ClientComponent />;
}
