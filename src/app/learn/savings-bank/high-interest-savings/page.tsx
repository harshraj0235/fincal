import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './HighInterestSavingsClient';

export const metadata: Metadata = {
  title: 'High Interest Savings | MoneyCal India',
  description: "Explore High Interest Savings on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/savings-bank/high-interest-savings'
  }
};

export default function Page() {
  return <ClientComponent />;
}
