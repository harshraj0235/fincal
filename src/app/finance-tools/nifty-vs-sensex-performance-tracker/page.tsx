import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './NiftyVsSensexPerformanceTrackerClient';

export const metadata: Metadata = {
  title: 'Nifty Vs Sensex Performance Tracker | MoneyCal India',
  description: "Explore Nifty Vs Sensex Performance Tracker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/finance-tools/nifty-vs-sensex-performance-tracker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
