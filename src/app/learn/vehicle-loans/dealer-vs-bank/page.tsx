import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DealerVsBankClient';

export const metadata: Metadata = {
  title: 'Dealer Vs Bank | MoneyCal India',
  description: "Explore Dealer Vs Bank on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/vehicle-loans/dealer-vs-bank'
  }
};

export default function Page() {
  return <ClientComponent />;
}
