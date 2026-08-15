import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BestBanksClient';

export const metadata: Metadata = {
  title: 'Best Banks | MoneyCal India',
  description: "Explore Best Banks on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/business-loans/best-banks'
  }
};

export default function Page() {
  return <ClientComponent />;
}
