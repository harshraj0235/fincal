import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './IndexFundsETFsClient';

export const metadata: Metadata = {
  title: 'Index Funds ETFs | MoneyCal India',
  description: "Explore Index Funds ETFs on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/investing/index-funds-etfs'
  }
};

export default function Page() {
  return <ClientComponent />;
}
