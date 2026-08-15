import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BankChargesClient';

export const metadata: Metadata = {
  title: 'Bank Charges | MoneyCal India',
  description: "Explore Bank Charges on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/savings-bank/bank-charges'
  }
};

export default function Page() {
  return <ClientComponent />;
}
