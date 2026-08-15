import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MutualFundTrackerClient';

export const metadata: Metadata = {
  title: 'Mutual Fund Tracker | MoneyCal India',
  description: "Explore Mutual Fund Tracker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/mutual-fund-tracker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
