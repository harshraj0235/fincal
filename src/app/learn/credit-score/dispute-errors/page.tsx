import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DisputeErrorsClient';

export const metadata: Metadata = {
  title: 'Dispute Errors | MoneyCal India',
  description: "Explore Dispute Errors on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/credit-score/dispute-errors'
  }
};

export default function Page() {
  return <ClientComponent />;
}
