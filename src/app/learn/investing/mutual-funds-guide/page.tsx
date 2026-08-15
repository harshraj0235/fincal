import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MutualFundsGuideClient';

export const metadata: Metadata = {
  title: 'Mutual Funds Guide | MoneyCal India',
  description: "Explore Mutual Funds Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/investing/mutual-funds-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
