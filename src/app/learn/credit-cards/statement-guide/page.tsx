import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './StatementGuideClient';

export const metadata: Metadata = {
  title: 'Statement Guide | MoneyCal India',
  description: "Explore Statement Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-cards/statement-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
