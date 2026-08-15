import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './OnlineBankingGuideClient';

export const metadata: Metadata = {
  title: 'Online Banking Guide | MoneyCal India',
  description: "Explore Online Banking Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/fintech/online-banking-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
