import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CreditVsDebitClient';

export const metadata: Metadata = {
  title: 'Credit Vs Debit | MoneyCal India',
  description: "Explore Credit Vs Debit on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/credit-vs-debit'
  }
};

export default function Page() {
  return <ClientComponent />;
}
