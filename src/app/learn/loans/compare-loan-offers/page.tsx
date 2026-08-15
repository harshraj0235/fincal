import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CompareLoanOffersClient';

export const metadata: Metadata = {
  title: 'Compare Loan Offers | MoneyCal India',
  description: "Explore Compare Loan Offers on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/compare-loan-offers'
  }
};

export default function Page() {
  return <ClientComponent />;
}
