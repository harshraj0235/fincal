import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TopUpLoansClient';

export const metadata: Metadata = {
  title: 'Top Up Loans | MoneyCal India',
  description: "Explore Top Up Loans on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/home-loans/top-up-loans'
  }
};

export default function Page() {
  return <ClientComponent />;
}
