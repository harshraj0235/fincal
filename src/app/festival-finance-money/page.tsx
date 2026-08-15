import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FestivalFinanceMoneyClient';

export const metadata: Metadata = {
  title: 'Festival Finance Money | MoneyCal India',
  description: "Explore Festival Finance Money on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/festival-finance-money'
  }
};

export default function Page() {
  return <ClientComponent />;
}
