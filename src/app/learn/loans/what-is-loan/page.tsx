import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './WhatIsLoanClient';

export const metadata: Metadata = {
  title: 'What Is Loan | MoneyCal India',
  description: "Explore What Is Loan on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/what-is-loan'
  }
};

export default function Page() {
  return <ClientComponent />;
}
