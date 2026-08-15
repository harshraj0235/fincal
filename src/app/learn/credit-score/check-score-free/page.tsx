import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CheckScoreFreeClient';

export const metadata: Metadata = {
  title: 'Check Score Free | MoneyCal India',
  description: "Explore Check Score Free on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-score/check-score-free'
  }
};

export default function Page() {
  return <ClientComponent />;
}
