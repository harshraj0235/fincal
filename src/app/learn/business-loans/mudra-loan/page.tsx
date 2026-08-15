import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MudraLoanClient';

export const metadata: Metadata = {
  title: 'Mudra Loan | MoneyCal India',
  description: "Explore Mudra Loan on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/business-loans/mudra-loan'
  }
};

export default function Page() {
  return <ClientComponent />;
}
