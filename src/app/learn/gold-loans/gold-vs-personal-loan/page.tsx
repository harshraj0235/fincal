import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './GoldVsPersonalLoanClient';

export const metadata: Metadata = {
  title: 'Gold Vs Personal Loan | MoneyCal India',
  description: "Explore Gold Vs Personal Loan on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/gold-loans/gold-vs-personal-loan'
  }
};

export default function Page() {
  return <ClientComponent />;
}
