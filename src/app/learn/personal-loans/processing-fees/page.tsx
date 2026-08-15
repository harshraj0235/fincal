import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ProcessingFeesClient';

export const metadata: Metadata = {
  title: 'Processing Fees | MoneyCal India',
  description: "Explore Processing Fees on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/personal-loans/processing-fees'
  }
};

export default function Page() {
  return <ClientComponent />;
}
