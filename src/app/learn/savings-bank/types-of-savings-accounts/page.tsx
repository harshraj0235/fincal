import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TypesOfSavingsAccountsClient';

export const metadata: Metadata = {
  title: 'Types Of Savings Accounts | MoneyCal India',
  description: "Explore Types Of Savings Accounts on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/savings-bank/types-of-savings-accounts'
  }
};

export default function Page() {
  return <ClientComponent />;
}
