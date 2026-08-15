import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './InvestingToolsHubClient';

export const metadata: Metadata = {
  title: 'Investing Tools Hub | MoneyCal India',
  description: "Explore Investing Tools Hub on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/investing-tools-hub'
  }
};

export default function Page() {
  return <ClientComponent />;
}
