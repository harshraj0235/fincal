import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SweepInAccountsClient';

export const metadata: Metadata = {
  title: 'Sweep In Accounts | MoneyCal India',
  description: "Explore Sweep In Accounts on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/savings-bank/sweep-in-accounts'
  }
};

export default function Page() {
  return <ClientComponent />;
}
