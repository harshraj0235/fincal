import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './EVLoanSubsidyClient';

export const metadata: Metadata = {
  title: 'EVLoan Subsidy | MoneyCal India',
  description: "Explore EVLoan Subsidy on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/vehicle-loans/evloan-subsidy'
  }
};

export default function Page() {
  return <ClientComponent />;
}
