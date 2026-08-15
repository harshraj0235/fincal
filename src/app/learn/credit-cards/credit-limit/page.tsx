import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './CreditLimitClient';

export const metadata: Metadata = {
  title: 'Credit Limit | MoneyCal India',
  description: "Explore Credit Limit on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/credit-limit'
  }
};

export default function Page() {
  return <ClientComponent />;
}
