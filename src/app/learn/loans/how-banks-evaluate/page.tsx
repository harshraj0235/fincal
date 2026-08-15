import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './HowBanksEvaluateClient';

export const metadata: Metadata = {
  title: 'How Banks Evaluate | MoneyCal India',
  description: "Explore How Banks Evaluate on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/loans/how-banks-evaluate'
  }
};

export default function Page() {
  return <ClientComponent />;
}
