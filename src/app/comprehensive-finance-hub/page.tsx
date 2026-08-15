import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './ComprehensiveFinanceHubClient';

export const metadata: Metadata = {
  title: 'Comprehensive Finance Hub | MoneyCal India',
  description: "Explore Comprehensive Finance Hub on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/comprehensive-finance-hub'
  }
};

export default function Page() {
  return <ClientComponent />;
}
