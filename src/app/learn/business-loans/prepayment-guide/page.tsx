import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './PrepaymentGuideClient';

export const metadata: Metadata = {
  title: 'Prepayment Guide | MoneyCal India',
  description: "Explore Prepayment Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/business-loans/prepayment-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
