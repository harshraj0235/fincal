import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './HowCalculatedClient';

export const metadata: Metadata = {
  title: 'How Calculated | MoneyCal India',
  description: "Explore How Calculated on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-score/how-calculated'
  }
};

export default function Page() {
  return <ClientComponent />;
}
