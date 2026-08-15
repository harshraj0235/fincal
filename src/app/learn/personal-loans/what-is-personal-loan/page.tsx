import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './WhatIsPersonalLoanClient';

export const metadata: Metadata = {
  title: 'What Is Personal Loan | MoneyCal India',
  description: "Explore What Is Personal Loan on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/personal-loans/what-is-personal-loan'
  }
};

export default function Page() {
  return <ClientComponent />;
}
