import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './DividendPolicyImpactToolClient';

export const metadata: Metadata = {
  title: 'Dividend Policy Impact Tool | MoneyCal India',
  description: "Explore Dividend Policy Impact Tool on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/corporate/dividend-policy-impact-tool'
  }
};

export default function Page() {
  return <ClientComponent />;
}
