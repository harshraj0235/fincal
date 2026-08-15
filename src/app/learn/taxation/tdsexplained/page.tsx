import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './TDSExplainedClient';

export const metadata: Metadata = {
  title: 'TDSExplained | MoneyCal India',
  description: "Explore TDSExplained on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/learn/taxation/tdsexplained'
  }
};

export default function Page() {
  return <ClientComponent />;
}
