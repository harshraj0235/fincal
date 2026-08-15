import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './FixedDepositsGuideClient';

export const metadata: Metadata = {
  title: 'Fixed Deposits Guide | MoneyCal India',
  description: "Explore Fixed Deposits Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/savings-bank/fixed-deposits-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
