import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FinanceWordleClient';

export const metadata: Metadata = {
  title: 'Finance Wordle | MoneyCal India',
  description: "Explore Finance Wordle on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/games/finance-wordle'
  }
};

export default function Page() {
  return <ClientComponent />;
}
