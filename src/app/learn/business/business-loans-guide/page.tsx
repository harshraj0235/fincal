import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './BusinessLoansGuideClient';

export const metadata: Metadata = {
  title: 'Business Loans Guide | MoneyCal India',
  description: "Explore Business Loans Guide on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/business/business-loans-guide'
  }
};

export default function Page() {
  return <ClientComponent />;
}
