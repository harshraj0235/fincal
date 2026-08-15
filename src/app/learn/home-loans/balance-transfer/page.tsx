import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BalanceTransferClient';

export const metadata: Metadata = {
  title: 'Balance Transfer | MoneyCal India',
  description: "Explore Balance Transfer on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/home-loans/balance-transfer'
  }
};

export default function Page() {
  return <ClientComponent />;
}
