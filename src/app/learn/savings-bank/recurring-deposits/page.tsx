import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './RecurringDepositsClient';

export const metadata: Metadata = {
  title: 'Recurring Deposits | MoneyCal India',
  description: "Explore Recurring Deposits on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/savings-bank/recurring-deposits'
  }
};

export default function Page() {
  return <ClientComponent />;
}
