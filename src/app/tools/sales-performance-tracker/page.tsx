import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './SalesPerformanceTrackerClient';

export const metadata: Metadata = {
  title: 'Sales Performance Tracker | MoneyCal India',
  description: "Explore Sales Performance Tracker on MoneyCal, India's most comprehensive financial tools and calculators platform.",
  alternates: {
    canonical: 'https://moneycal.in/tools/sales-performance-tracker'
  }
};

export default function Page() {
  return <ClientComponent />;
}
