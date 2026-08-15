import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './MutualFundPerformanceTrackerClient';

export const metadata: Metadata = {
  title: 'Mutual Fund Performance Tracker | MoneyCal India',
  description: "Explore Mutual Fund Performance Tracker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/mutual-fund-performance-tracker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
