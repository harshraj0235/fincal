import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MSMELoanGuideClient';

export const metadata: Metadata = {
  title: 'MSMELoan Guide | MoneyCal India',
  description: "Explore MSMELoan Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/business-loans/msmeloan-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
