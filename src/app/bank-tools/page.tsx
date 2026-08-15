import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BankToolsClient';

export const metadata: Metadata = {
  title: 'Bank Tools | MoneyCal India',
  description: "Explore Bank Tools on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/bank-tools'
  }
};

export default function Page() {
  return <ClientComponent />;
}
