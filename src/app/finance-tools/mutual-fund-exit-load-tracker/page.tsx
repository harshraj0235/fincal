import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MutualFundExitLoadTrackerClient';

export const metadata: Metadata = {
  title: 'Mutual Fund Exit Load Tracker | MoneyCal India',
  description: "Explore Mutual Fund Exit Load Tracker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/mutual-fund-exit-load-tracker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
